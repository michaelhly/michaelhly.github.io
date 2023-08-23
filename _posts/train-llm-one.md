---
title: "How to train a LLM: Datasets and Preprocessing"
date: "2023-08-23T05:35:07.322Z"
---

In this series, we'll be using [BERT](<https://en.wikipedia.org/wiki/BERT_(language_model)>) as our underlying language model. Unlike [GPT](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer) based language models, BERT is a bidirectional transformer model, which considers both left and right context when making predictions. This makes BERT well suited for classification based tasks, where inference is needed on the meaning of the language structure and relationships between words. GPT models are better at next-token prediction, and performs better at tasks that require text generation.

The first thing to consider when training language models is the datasets we're working with. To supervise the machine learning process, we need to define the set of target outcomes we'd like our model to approximate when making inferences. To do this, we typically split up our data corpus into three sets: training set, test set, and validation set.

- Training set: ...
- Target set (labeled): ...
- Validation set (labeled): ...

When training our model, we want to aim for a good statistical fit so our model can make good predictions based on our inputs. We want to avoid a situation where our target set is too simple, and our model cannot make accurate generalizations on the data it has not seen before — this is called underfitting. We also want to avoid overfitting, where our target set contains too much noise where random fluctuations in the training data is picked up and learned as concepts by the model.

Finally, we must do some preprocessing to prepare our datasets for training. In the preprocessing step we divide our text into individual tokens. Our tokens, are then converted into numbers, which our model receives as inputs.

```python
import torch
```

From above we see that our BERT based tokenizer takes our sentence and spits out three sets of numbers:

- input_ids: are the indices corresponding to each token in the sentence.
- attention_mask: indicates whether a token should be attended to or not.
- token_type_ids: identifies which sequence a token belongs to when there is more than one sequence.

In the next part, we'll look at the training arguments we should set to train our model and explore metrics we should track to evaluate our training process.
