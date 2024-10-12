---
title: "How to Tune an LLM: Datasets and Preprocessing"
date: "2023-08-23T05:35:07.322Z"
hidden: true
---

Trying to get on the _e/acc_ bandwagon but don't know anything about AI. I guess I have to start somewhere ... here is me trying to fine-tune my own AI from a pre-trained language model.

In this series, we'll be using [BERT](<https://en.wikipedia.org/wiki/BERT_(language_model)>) as our underlying language model. Unlike [GPT](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer) based language models, BERT is a bidirectional transformer model, which makes predictions by examining words in sentences from both directions.

![Birectional context](https://michaelhly.github.io/assets/tune-llm-one/bidirectional-context.png)

This makes BERT well suited for classification-based tasks, where inference is needed on the meaning of the language structure and relationships between words. GPT models are optimized for next-token prediction and perform better at tasks that require text generation.

## Datasets

The first thing to consider when tuning language models is the datasets we're working with. To supervise the machine learning process, we need to define the set of target outcomes we'd like our model to approximate when making inferences. To do this, we typically split up our data corpus into three sets: training set, test set, and validation set.

> Training set: A set of examples used for learning, that is to fit the parameters of the classifier.
>
> Validation set: A set of examples used to tune the parameters of a classifier, for example to choose the number of hidden units in a neural network.
>
> Test set: A set of examples used only to assess the performance of a fully-specified classifier.

_— Brian Ripley, page 354, [Pattern Recognition and Neural Networks](https://a.co/d/9IutR4h), 1996_

When tuning (or training) our model, we want to aim for a good statistical fit so our model can make good predictions based on our inputs. We want to avoid a situation where our defined outcomes are too simple, and our model cannot make accurate generalizations on the data it has not seen before — this is called _underfitting_. We also want to avoid _overfitting_, where the target outcomes include too much noise, and the model picks up and learns random fluctuations in the training data as concepts.

_Overfitting vs. Underfitting_
![Statistical Fit](https://michaelhly.github.io/assets/tune-llm-one/statistical-fit.svg)

## Preprocessing

Next, we must do some preprocessing to prepare our datasets for our language model. In the preprocessing step, we divide our text into individual tokens, and then convert the tokens into numbers.

```python
>>> from transformers import AutoTokenizer
>>> sentence = "The quick brown fox jumps over the lazy dog."
>>> tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
>>> encoded_input = tokenizer(sentence)
>>> print(encoded_input)
{'input_ids': [101, 1109, 3613, 3058, 17594, 15457, 1166, 1103, 16688, 3676, 119, 102],
 'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
```

From above, we see that the `BertTokenizer` from [Hugging Face](https://huggingface.co/bert-base-cased) took our sentence and spat out three sets of numbers:

`input_ids`: The unique identifiers of the tokens in a sentence.\
`token_type_ids`: Identifiers describing which sequence a token belongs to if we provide the tokenizer with more than one sentence.\
`attention_mask`: Binary values indicating if the token should be acknowledged or ignored by the model.

- _1_ indicates a token that the model should acknowledge.
- _0_ indicates a padded token and should be ignored.

Our model will take in these sets of numbers as inputs during the tuning process.

In the [next part](https://michaelhly.com/posts/tune-llm-two), we'll look at some hyperparameters and explore metrics we should track to evaluate our tuning process.
