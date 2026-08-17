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
This mechanism is called [autograd](https://docs.pytorch.org/docs/2.13/notes/autograd.html). PyTorch’s `loss.backward()` does the same reverse walk over tensors instead of single numbers. Modern AI chips do the underlying multiply-adds by the trillions.

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
A frontier model trains on trillions of tokens, far more than one GPU can process in any useful amount of time. At that scale, we need 100k GPUs working through the pile at once. In the simplest version, every GPU holds a copy of the model and sees a different slice of the data. Each one runs the same training loop, computes its own gradients, and then the fleet combines what they found. This is called data parallelism.

But those copies come with a fragile invariant. They have to stay identical. If one of the GPUs updates its parameters using only what it learned from its own slice of data, it now holds a slightly different model from everyone else. Within a few hundred steps, we’re no longer training one model. We end up training 100k models that have drifted apart. So we add one more step to our loop:
```diff
    loss.backward()             # every parameter now holds its .grad
+   all_reduce(model.grads)     # average gradients across every GPU
    optimizer.step()
```
`all_reduce(model.grads)` is a collective operation. Each GPU sends out the gradients it learned from its own slice of data. The cluster averages those gradients together, then sends the shared result back so every GPU can update its copy of the model to stay in sync. But the average cannot finish until the last GPU contributes, so the fastest GPUs must wait for the slowest. In effect, the averaging step becomes a synchronization barrier, pulling the cluster back to the same clock every iteration. Over a months-long training run, the cluster repeats this synchronization millions of times.

## The Waveform
Each loop iteration has two electrical modes. During the forward and backward passes, a GPU's tensor cores are saturated and the chip runs near full power at 1200 watts. During `all_reduce`, the chip is sharing gradients over the network and sits idle until the average comes back. Power usage falls by hundreds of watts. 

![GPU Waveform](/assets/training-waveform/single_gpu_square_wave.svg)

A training cluster behaves unlike most loads on the electric grid. Serving a chatbot to millions of users also makes GPU power fluctuate, but the requests arrive at random moments, so most of those fluctuations cancel each other out. Training does not have the same randomness. In each iteration, `all_reduce(model.grads)` takes any GPU that has drifted ahead and holds it until the rest arrive. This forced alighnment is not an accident or a bug to engineering away; it is produced, deliberately and continuously, by the [definition of the training job](https://docs.pytorch.org/docs/2.13/notes/ddp.html#distributed-data-parallel). The GPUs ramps up in power consumption and tapers off together synchornously, so the waves do not cancel. They stack into a power draw that pulses every second or so, locked to the rhythm of the training loop. While the size of the swings are manageable, the speed is a threat because the pattern runs up against how power plants are designed to work.

![Governor Control System](/assets/training-waveform/governor_control_system.png)

Every power plant has a governor, a mechanical feedback that senses the turbine slowing under load and opens the steam valve wider to compensate. But the training loop creates swings faster than what the valve can respond to in a few seconds. The turbine can't correct a swing it can't keep up with, so it absorbs it instead, speeding up and slowing down, vibrating.

![Training Frequence vs. Governor and Turbine Resonance](/assets/training-waveform/training_frequency_vs_governor_and_turbine_resonance.svg)

And like any large spinning object, a turbine shaft has speeds at which it naturally wants to shake, the way a wine glass rings at one particular pitch. Those natural rates sit right inside the range where training loops swing. A gradient update in one state can mechanically fatigue a turbine shaft in another.

## Shipping the Fix
In August 2025, Microsoft, OpenAI, and Nvidia published a joint paper, "Power Stablization for AI Training Datacenters", documenting the problem in their live clusters. Microsoft had co-developed a power-smoothing feature with Nvidia that enforces minimum power floors and ramp limits that keep a trough above the safe threshold.

![Training Run with Power Smoothing](/assets/training-waveform/training_run_with_smoothing.png)

Nvidia GPUs now ship a feature whose purpose is to waste electricity so a utility's turbine doesn't shake apart. Various companies have all implemented power stabilization measures across software, hardware and rack level stack. 

Then the problem escaped engineering. NERC, the body that polices grid reliability, stood up a Large Loads Task Force in 2024 and spent 2025 escalating through reports and alerts. In May 2026 it issued its highest-tier alert, citing large-load swings happening in seconds, too fast for operators to manually correct. Two months later, FERC ordered NERC to write mandatory reliability standards for what it now calls computational loads, pulling data-center operators toward the same reliability regime that has governed power plants for two decades. The AI power story is usually told as a bottleneck: not enough gigawatts, not enough interconnects, not enough turbines on backorder. But how much is only one of the questions. The model you asked a question this morning was trained on infrastructure like this. A 100,000-GPU training run doesn’t just consume power. It sculpts it, second by second, into a waveform the grid has never had to digest.