---
title: "The Line of Code that Shakes the Grid"
date: "2026-08-16T16:30:51.231Z"
---
Training a large language model is a few lines of code in a `for` loop. Run that loop on 100k GPUs, and one of the lines is why the Federal Energy Regulatory Commission (FERC) moved to put data centers into the [same reliability regime as power plants](https://www.ferc.gov/media/e-1-rd26-7-000).

## Gradients, from Scratch
A neural network is a function with billions of tunable parameters, and training is the process of nudging each one in the direction that makes the AI model’s predictions less wrong. Every parameter gets its own number, and that number answers one question: If I nudge this parameter up a little, does the model’s mistake get bigger or smaller, and by how much? That number is the gradient. 

We could get these numbers by brute force. Nudge one parameter, run the input through the entire model again, and measure what changed. For a model with billions of parameters, that would mean rerunning the entire model billions of times just to take one training step. Real training gets the same answer without trying every parameter one by one. It records the arithmetic that produces the answer, then walks that record backward with the chain rule. One forward pass and one backward pass get us every gradient at once. Here is what a parameter value looks like in Python:
```py
class Value:
    def __init__(self, data, children=(), local_grads=()):
        self.data = data              # the number
        self.grad = 0                 # d(loss)/d(this), filled in later
        self._children = children     # what produced this value
        self._local_grads = local_grads

    def __mul__(self, other):
        # d(a*b)/da = b, and d(a*b)/db = a
        return Value(self.data * other.data, (self, other),
                     (other.data, self.data))

    def __add__(self, other):
        return Value(self.data + other.data, (self, other), (1, 1))

    def backward(self):
        self.grad = 1  # d(loss)/d(loss) = 1
        for v in reversed(topological_order(self)):
            for child, local in zip(v._children, v._local_grads):
                child.grad += local * v.grad   # chain rule
```
Every multiply and add returns a new `Value` that remembers its inputs and the local derivative of the operation. Stack enough of these operations together, and their links form a computation graph. When we call `.backward()` on the final result, the chain rule walks that graph in reverse, depositing a gradient on every node it passes.
```py
a = Value(2.0)
b = Value(3.0)
loss = a * b + a      # loss = 8.0
loss.backward()
a.grad                # 4.0. nudge a up by 0.001, loss rises by ~0.004
b.grad                # 2.0
```
This mechanism is called [autograd](https://docs.pytorch.org/docs/2.13/notes/autograd.html). PyTorch’s `loss.backward()` is this exact algorithm, run over tensors instead of scalars, on hardware that does trillions of these multiply-and-add steps per second. 

## The Loop
With gradients in hand, training is essentially a four-line loop:
```py
for step in range(num_steps):
    logits = model(tokens)           # forward: predict the next token
    loss   = cross_entropy(logits)   # how surprised were we?
    loss.backward()                  # gradients for every parameter
    optimizer.step()                 # nudge each parameter downhill
```
Here, the forward pass runs the input through the model. The loss measures how poorly the model predicted the next token. Through the chain rule, the backward pass computes which direction each parameter should move and how far. And finally, the optimizer nudges all the parameters accordingly.

## 100k GPUs
A frontier model trains on trillions of tokens, far more than what one GPU can handle in any useful amount of time. We need 100k GPUs chewing through that pile at once, and we need them all training the same model. So we give every GPU its own complete copy of the model and hand each one a different slice of the tokens. And each GPU runs the same four-line loop on its own slice. This is called data parallelism.

But the copies have a fragile invariant because the models must stay identical. If one of the GPUs updates its parameters using only what it learned from its own slice of data, it now holds a slightly different model than from everyone else. Within a few hundred steps, we’re no longer training one model; we’re end up training a hundred thousand models that drifted apart. To address this issue, we add an extra step to our loop:
```diff
    loss.backward()             # every parameter now holds its .grad
+   all_reduce(model.grads)     # average gradients across every GPU
    optimizer.step()
```
`all_reduce(model.grads)` is a collective operation. Every GPU contributes the gradients it computed from its own slice, and those gradients get averaged together across the whole cluster. Then the same averaged result flows back to every GPU. However, we cannot compute an average until the last contribution arrives. The fastest GPU must wait for the slowest one in every single iteration, yet no line in the loop say to wait. The averaging creates a barrier, realigning the whole cluster to a common clock. This happens millions of times over the months a training run lasts. 


## The Waveform
Each loop iteration has two electrical modes. During the forward and backward passes, a GPU's tensor cores are saturated and the chip runs near full power at 1200 watts. During all-reduce, the chip is sharing gradients over the network and sits idle until the average comes back. Power falls by hundreds of watts. 

![GPU Waveform](/assets/training-waveform/single_gpu_square_wave.svg)

A training cluster is unlike any other load on the electric grid. Run a chatbot for millions of users on identical GPUs and the power draw fluctuates too, but the chat messages arrive at random moments, so the blips cancel out. The barrier removes the randomness. In every training iteration, `all_reduce(model.grads)` takes any GPU that drifted ahead and holds it until the cluster is back in formation. The synchronization isn't an accident that better engineering could remove. It's produced, deliberately and continuously, by the [definition of the training job](https://docs.pytorch.org/docs/2.13/notes/ddp.html#distributed-data-parallel). Every GPU peaks together and dips together, so the waves don't smooth each other out. They stack. The power draw appear and vanishes every second or so, oscillating with the rhythm of a for loop. The size of the power swings is manageable. The speed is the threat, which collides with how power plants work.

![Governor Control System](/assets/training-waveform/governor_control_system.png)

Every power plant has a governor, a mechanical feedback that senses the turbine slowing under load and opens the steam valve wider to compensate. But the training loop creates swings faster than what the valve can respond to in a few seconds. The turbine can't correct a swing it can't keep up with, so it absorbs it instead, speeding up and slowing down, vibrating.

![Training Frequence vs. Governor and Turbine Resonance](/assets/training-waveform/training_frequency_vs_governor_and_turbine_resonance.svg)

And like any large spinning object, a turbine shaft has speeds at which it naturally wants to shake, the way a wine glass rings at one particular pitch. Those natural rates sit right inside the range where training loops swing. A gradient update in one state can mechanically fatigue a turbine shaft in another.

## Shipping the Fix
In August 2025, Microsoft, OpenAI, and Nvidia published a joint paper, "Power Stablization for AI Training Datacenters", documenting the problem in their live clusters. Microsoft had co-developed a power-smoothing feature with Nvidia that enforces minimum power floors and ramp limits that keep a trough above the safe threshold.

![Training Run with Power Smoothing](/assets/training-waveform/training_run_with_smoothing.png)

Nvidia GPUs now ship a feature whose purpose is to waste electricity so a utility's turbine doesn't shake apart. Various companies have all implemented power stabilization measures across software, hardware and rack level stack. 

Then the problem escaped engineering. NERC, the body that polices grid reliability, stood up a Large Loads Task Force in 2024 and spent 2025 escalating through reports and alerts. In May 2026 it issued its highest-tier alert, citing large-load swings happening in seconds, too fast for operators to manually correct. Two months later, FERC ordered NERC to write mandatory reliability standards for what it now calls computational loads, pulling data-center operators toward the same reliability regime that has governed power plants for two decades. The AI power story is usually told as a bottleneck: not enough gigawatts, not enough interconnects, not enough turbines on backorder. But how much is only one of the questions. The model you asked a question this morning was trained on infrastructure like this. A 100,000-GPU training run doesn’t just consume power. It sculpts it, second by second, into a waveform the grid has never had to digest.