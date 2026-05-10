---
title: 'Hydrogen Turbine CFD at E2 Power Systems'
summary: 'A 3-month engagement with E2 Power Systems — a TU Delft hydrogen-turbine startup — establishing a proof of concept for an axial combustion turbine. ANSYS Fluent and CFX cross-validation, blade-shape optimization, and SolidWorks integration of the rotor and fuel-injection components.'
date: 2025-01-31
status: 'archived'
tags: ['cfd', 'turbomachinery', 'hydrogen', 'energy', 'ansys']
cover: '/projects/e2-power-hydrogen-turbine-cover.png'
coverPosition: 'center'
featured: true
bentoSize: 'sm'
links:
  - label: 'E2 Power Systems'
    url: 'https://e2powersystems.nl'
  - label: 'E2 Power Systems on LinkedIn'
    url: 'https://www.linkedin.com/company/e2-power-systems/'
---

## Overview

A 3-month side engagement with E2 Power Systems, a TU Delft spin-off building a next-generation hydrogen combustion turbine for heavy-duty mobility. I sat with the internal R&D team during the **validation phase**, establishing a proof of concept for the novel axial-turbine combustion system through CFD simulation, blade-shape optimization, and CAD integration.

## Method

The work centred on simulating the axial turbine in **ANSYS Fluent** to determine its power-generation potential under a hydrogen fuel cycle. Multiple turbine-blade configurations were modelled and tested, refining the curvature for maximum aerodynamic efficiency under the target operating range.

To guard against solver-specific artefacts, the same configurations were re-run in **ANSYS CFX** and the two solver outputs cross-validated — a small discipline that catches numerical-recipe bias before it becomes a design assumption.

Critical components were modelled in **SolidWorks** for structural analysis and integration into the broader propulsion system.

## CFD analysis

The simulations targeted three KPIs that drive turbine efficiency:

- **Velocity profiles and flow streamlines** — ensuring uniform flow distribution and minimising turbulence-induced losses.
- **Blade pressure distribution** — locating high-stress zones and feeding back into curvature optimization.
- **Downstream velocity distributions** — extrapolating stream velocities past the rotor to characterise energy extraction across the stage.

## Stack

ANSYS Fluent, ANSYS CFX, SolidWorks.
