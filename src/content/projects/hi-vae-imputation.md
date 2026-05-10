---
title: 'Heterogeneous Missing-Data Imputation with HI-VAE'
summary: 'PyTorch reimplementation of HI-VAE (Nazabal et al. 2020) for tabular data with mixed real/count/categorical/ordinal columns, plus a head-to-head benchmark against GAIN, MICE, and mean/mode imputation.'
date: 2025-02-15
status: 'archived'
tags: ['ai', 'generative-models', 'pytorch', 'research']
cover: '/projects/hi-vae-imputation-cover.png'
coverPosition: 'center'
featured: true
bentoSize: 'sm'
links:
  - label: 'Repository'
    url: 'https://github.com/sgol13/tudelft-generative-modelling-hi-vae'
---

## Overview

A reimplementation and empirical study of the **Heterogeneous Incomplete Variational Autoencoder** (HI-VAE, Nazabal et al. 2020) for imputing missing values in tabular datasets where columns mix real, positive, count, categorical, and ordinal variables — a setting where standard VAEs and most off-the-shelf imputation methods break down.

## Method

The original HI-VAE codebase is in TensorFlow 1.x; I reimplemented the model end-to-end in **PyTorch** with cleaner modular components: encoder, decoder heads per data type, mask-aware batch normalization, Gumbel-Softmax annealing for the discrete latent, and a GMM prior over the continuous code.

Each variable has its own likelihood — Gaussian, log-normal, Poisson, categorical, ordinal — plugged into a shared latent space. Missingness is handled natively through a per-feature observation mask, so the encoder only sees what's observed, and the decoder is trained to reconstruct everything, including held-out entries used to score imputation quality.

## Benchmark

On top of that, I ran a comparative benchmark of HI-VAE against three baselines:

- **GAIN** — a GAN-based imputer, also implemented from scratch.
- **MICE** — multivariate imputation by chained equations.
- **Mean / mode** — the trivial baseline.

Across six benchmark datasets (Wine, Breast, Adult, Default Credit, Letter, Spam) at **0%, 10%, 20%, and 50%** missingness. The evaluation splits into nominal error (categorical / ordinal) and numerical error (NRMSE), with a downstream classification task on top — two heads, Deep Logistic Regression and a Conditional VAE classifier — to test whether better imputation actually translates into better predictive accuracy.

Hyperparameter sweeps over learning rate and epochs were used to find configurations that most closely match the paper's reported numbers, with deviation plotted per dataset and missingness level.

## Stack

PyTorch, NumPy, pandas, scikit-learn, Matplotlib.
