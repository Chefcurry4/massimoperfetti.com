---
title: 'Flow-map learning for turbulent fluids'
summary: 'Neural surrogate models for Nek5000-generated CFD trajectories. Curriculum rollout with Sobolev loss and noise injection for long-horizon stability.'
date: 2026-04-12
status: 'in-progress'
tags: ['ai', 'cfd', 'research', 'pytorch']
cover: '/projects/flowmap-cover.png'
coverPosition: 'center'
featured: true
bentoSize: 'lg'
links:
  - label: 'Repository'
    url: 'https://github.com/example/flowmap'
  - label: 'Notes'
    url: 'https://example.com/flowmap-notes'
---

## Overview

A neural flow-map for incompressible turbulent flows, trained on Nek5000 simulations. The architecture learns a one-step push-forward operator and is composed at inference time to produce long-horizon predictions.

## Method

The training objective combines a primary `L2` step loss with a Sobolev penalty on velocity gradients and a noise-injection term that improves stability under autoregressive rollout. We adopt a curriculum that grows the rollout horizon as accuracy improves.

## Status

In progress as of May 2026. Master thesis at the MIT van Rees Lab.
