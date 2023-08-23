---
title: "How to train a LLM: Datasets and Preprocessing"
date: "2023-08-23T05:35:07.322Z"
---

Trying to get on the e/acc bandwagon but don't know anything about an AI. I guess I have to start somewhere ... here is me trying to train my own AI.

In this series, we'll be using [BERT](<https://en.wikipedia.org/wiki/BERT_(language_model)>) as our underlying language model. Unlike [GPT](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer) based language models, BERT is a bidirectional transformer model, which makes predictions by examining words in sentences from both directions.

![Birectional context](/assets/train-llm-one/bidirectional-context.png)

This makes BERT well suited for classification based tasks, where inference is needed on the meaning of the language structure and relationships between words. GPT models are optimized for next-token prediction, and performs better at tasks that require text generation.

## Datasets

The first thing to consider when training language models is the datasets we're working with. To supervise the machine learning process, we need to define the set of target outcomes we'd like our model to approximate when making inferences. To do this, we typically split up our data corpus into three sets: training set, test set, and validation set.

> Training set: A set of examples used for learning, that is to fit the parameters of the classifier.
>
> Validation set: A set of examples used to tune the parameters of a classifier, for example to choose the number of hidden units in a neural network.
>
> Test set: A set of examples used only to assess the performance of a fully-specified classifier.

— Brian Ripley, page 354, [Pattern Recognition and Neural Networks](https://www.amazon.com/Pattern-Recognition-Neural-Networks-Ripley/dp/0521460867/ref=as_li_ss_tl?dchild=1&keywords=Pattern+Recognition+and+Neural+Networks&qid=1597365594&sr=8-3&linkCode=sl1&tag=inspiredalgor-20&linkId=2507606de5f6bab2d4dba3e797eac0e2&language=en_US), 1996

When training our model, we want to aim for a good statistical fit so our model can make good predictions based on our inputs. We want to avoid a situation where our target set is too simple, and our model cannot make accurate generalizations on the data it has not seen before — this is called _underfitting_. We also want to avoid _overfitting_, where our target set contains too much noise where random fluctuations in the training data is picked up and learned as concepts by the model.

_Overfitting vs. Underfitting_
![Statistical Fit](/assets/train-llm-one/statistical-fit.svg)

## Preprocessing

Next, we must do some preprocessing to prepare our datasets for training. In the preprocessing step, we divide our text into individual tokens, and then convert the tokens into numbers.

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

From above we see that the `BertTokenizer` from [Hugging Face](https://huggingface.co/bert-base-cased) took our sentence and spat out three sets of numbers:

- `input_ids`: The unique identifiers of the tokens in a sentence.
- `attention_mask`: Binary values indicating if the token should be acknowledged or ignored by the model. _1_ indicates a token that the model should acknowledge, _0_ indicates a padded token.
- `token_type_ids`: Identifiers describing which sequence a token belongs to if we provide the tokenizer more than one sentence.

Our model will take in these sets of numbers as inputs during the training process.

In the next part, we'll look at the training arguments we should set when trainiing our language model and explore metrics we should track to evaluate our training process.
