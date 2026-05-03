---
title: 'Notes on rollout stability for learned PDE surrogates'
date: 2026-05-01
summary: 'Why one-step training error tells you almost nothing about long-horizon behavior, and three regularizers that actually move the needle.'
tags: ['ml', 'cfd', 'training']
readingTime: 6
---

## The single-step illusion

A flow-map model that achieves a small one-step `L2` error can still diverge catastrophically over hundreds of steps. The mismatch is usually traced to the model's lack of contraction in the high-frequency components of the latent field — even tiny errors compound under autoregressive composition.

## Three regularizers

1. **Curriculum rollout.** Train on increasingly long rollouts as one-step accuracy improves. Cheap, surprisingly effective.
2. **Sobolev loss.** Penalize gradient mismatch in addition to value mismatch. Aligns the model's spectral behavior with the simulator.
3. **Noise injection.** Perturb inputs during training. Encourages a contraction property under composition.

## Caveat

These do not fix systematic bias. If the model is missing the long-time invariants (energy spectrum, dissipation rate), no amount of regularization recovers them.
