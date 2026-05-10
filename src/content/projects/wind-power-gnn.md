---
title: 'Wind Power Forecasting with Graph Neural Networks'
summary: 'Short-term, turbine-level forecasting on the SDWPF dataset. Spatio-temporal product graphs with k-NN, ε-radius, and a wake-aware "dominant direction" graph across vanilla GCN, FastGCN, and Cluster-GCN.'
date: 2025-06-15
status: 'archived'
tags: ['ai', 'graph-neural-networks', 'pytorch', 'research', 'energy']
cover: '/projects/wind-power-gnn-cover.png'
coverPosition: 'center'
featured: true
bentoSize: 'sm'
links:
  - label: 'Repository'
    url: 'https://github.com/Chefcurry4/GML'
---

## Overview

A short-term, turbine-level wind power forecasting pipeline built on the SDWPF dataset. Accurate forecasts at the individual turbine level matter for integrating wind into modern power markets, but classical methods either rely on expensive physical simulations or ignore the spatial dependencies between turbines entirely.

## Method

The approach models a wind farm as a spatio-temporal **product graph** — combining the spatial layout of turbines with a temporal chain — and benchmarks several scalable GCN variants (vanilla GCN, FastGCN, Cluster-GCN) across three spatial graph constructions: **k-nearest neighbors**, **ε-radius**, and a wake-aware **"dominant direction"** graph that connects turbines along the prevailing wind axis. The wake graph is the most physically grounded of the three, encoding actual aerodynamic interactions instead of pure geometry.

## Pipeline

The full pipeline covers SCADA preprocessing with Tikhonov interpolation for missing values, configurable graph construction, training with early stopping and learning-rate scheduling, and a batch model runner that sweeps the full grid of graph types × architectures × hyperparameters. We compared 3 spatial graphs × 3 GNN architectures across multiple hidden dimensions, batch sizes, and neighborhood sizes — logged automatically to a single results CSV for analysis.

## Findings

The main finding: spatial graph design and GNN scalability matter, but pure GNNs struggle to capture temporal dependencies on their own. Without an explicit temporal module like a GRU or TCN, even well-tuned product-graph GCNs underperform dedicated sequence models — a useful negative result that points to hybrid spatio-temporal architectures as the natural next step.

## Stack

PyTorch, PyTorch Geometric, NetworkX, scikit-learn, pandas.
