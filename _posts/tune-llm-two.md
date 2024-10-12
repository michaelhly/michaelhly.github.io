---
title: "How to Tune an LLM: Hyperparameters and Metrics"
date: "2023-08-25T12:00:00.000Z"
hidden: true
---

[Last time](https://michaelhly.com/posts/tune-llm-one) we figured out how to prepare data for our language model, and now we can initialize our BERT model for fine-tuning. But before diving into a bunch of [deep learning](https://en.wikipedia.org/wiki/Deep_learning) jargon on hyperparameters and metrics, I thought it would be useful to build our own mental model on what goes on during the fine-tuning process.

## Backpropagation

When training a language model, we're basically teaching the computer how to make guesses on an exam we wrote. We let the computer make guesses, observe how stupid it is, and fix it up to make better guesses.

We conduct this teaching process on a model (a.k.a. a [neural network](https://en.wikipedia.org/wiki/Neural_network)) through the following process:

1. We assign **weights** (a.k.a. probabilities) to our preprocessed training data and dump it on our model. The training inputs travel through multiple layers of computation nodes, each with its own set of weights, until it reaches the set of target outcomes we've defined. This step is called the _forward pass_.
2. Next, we calculate how different the model outcome is compared to the outcome we wanted. We can call this difference [loss](https://en.wikipedia.org/wiki/Loss_function) (a.k.a error rate).
3. We then [backpropagate](https://en.wikipedia.org/wiki/Backpropagation) from the weights of our output nodes to our input nodes to figure out how much each weight in the network contributed to the loss.
4. Now we change up the input weights we've assigned in step 1, attribute some [_bias_](https://en.wikipedia.org/wiki/Algorithmic_bias), and hope the model will do better next time in the next training session.

These four steps we described are commonly represented by a complicated diagram that looks like this:
![Deep Neural Network](https://michaelhly.github.io/assets/tune-llm-two/deep-neural-network.png)

If you want to go further into the computation behind the backpropagation step like a real pro, I'd watch this [video](https://youtu.be/q8SA3rM6ckI?si=o8JCEpnUNlCudNn-).

## Hyperparameters

Aside from the input weights we must assign, there are also other parameters we can control to influence the machine-learning process. Here are four that seemed the most important:

### learning_rate

The learning rate determines the pace we force our computer through the mundane training process we described earlier. We want to pick the right rate to help our model _minimize_ loss.

- Too small of a learning rate can lead to the model getting stuck. If you have a large dataset and limited computing resources the model can literally "give up" on you.
- Picking a large learning rate can create an unstable training/tuning process. As a result, the model will make suboptimal ("bad") guesses.

### weight_decay

The weight decay is a multiplier to discourage weights from getting too large. This parameter is mainly used to prevent overfitting. An excessive weight decay can lead to underfitting, where all the outcomes trend towards a [uniform distribution](https://en.wikipedia.org/wiki/Continuous_uniform_distribution).

### batch_size

The batch size refers to the number of training examples utilized in one iteration of the training process. You can read more about the reasoning behind this parameter [here](https://arxiv.org/pdf/1502.03167.pdf).

### num_train_epochs

The number of times you want to process your training data through your model.

## Metrics

An important metric to track is the [accuracy_score](https://scikit-learn.org/stable/modules/model_evaluation.html#accuracy-score). The accuracy score tells us the number of times our model made a correct guess.

I also found this neat helper from [scikit-learn](https://scikit-learn.org/stable/index.html) called [precision_recall_fscore_support](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_recall_fscore_support.html#sklearn-metrics-precision-recall-fscore-support).

The metrics are documented as follows:

> The `precision` is the ratio `tp / (tp + fp)` where\
> `tp` is the number of true positives\
> `fp` the number of false positives
>
> The precision is intuitively the ability of the classifier not to label a negative sample as positive

> The `recall` is the ratio `tp / (tp + fn)` where\
> `tp` is the number of true positives\
> `fn` the number of false negatives
>
> The recall is intuitively the ability of the classifier to find all the positive samples

> The `F-beta` score can be interpreted as a weighted harmonic mean of the precision and recall,
> where an F-beta score reaches its best value at 1 and worst score at 0
>
> The `F-beta` score weights recall more than precision by a factor of beta\
> `beta == 1.0` means recall and precision are equally important
>
> When `beta == 1.0`, the harmonic mean of `precision` and `recall` is calculated as: `F1 = 2 * (precision * recall) / (precision + recall)`

> The `support` is the number of occurrences of each class in our reference outcomes

## Probability Normalization

The metrics from scikit-learn seem great! But I had no idea how to actually apply the function ...

I flipped through some people's machine-learning homework and found an example of evaluation metrics computed with `precision_recall_fscore_support`:

```python
import numpy as np
from transformers import EvalPrediction
from sklearn.metrics import precision_recall_fscore_support

def compute_metrics(eval_pred: EvalPrediction):
    logits, targets = eval_pred
    predictions = np.argmax(logits, axis=-1)
    precision, recall, f1, support = precision_recall_fscore_support(targets, predictions)
    return {"precision": precision, "recall": recall, "f1": f1, "support": support}
```

With the help of my friend ChatGPT, I found out that [logits](https://en.wikipedia.org/wiki/Logit) refer to the raw, unnormalized predictions generated by a neural network before they are transformed into probabilities.

ChatGPT also gave me a step-by-step breakdown on what `np.argmax(logits, axis=-1)` did:
![argmax breakdown](https://michaelhly.github.io/assets/tune-llm-two/argmax-breakdown.png)

For more on probability normalization, I would also look into functions such as [softmax](https://en.wikipedia.org/wiki/Softmax_function), [sparsemax](https://arxiv.org/pdf/1602.02068.pdf), etc.

Now I think we're finally ready to do some fine-tuning!
