---
title: 'Pedestrian Classifier for Intelligent Vehicles'
summary: 'A 3-month TU Delft project on real-time pedestrian detection, tracking, and motion planning for intelligent vehicles. CNN classifier with HOG/SVM fallback, Kalman + particle filters for tracking, 2D-to-3D bounding-box projection, and a Best-First-Search planner for constrained urban maneuvers.'
date: 2025-01-29
status: 'archived'
tags: ['computer-vision', 'deep-learning', 'autonomous-vehicles', 'research']
cover: '/projects/pedestrian-classifier-cover.png'
coverPosition: 'center'
featured: true
bentoSize: 'sm'
links:
  - label: 'Intelligent Vehicles Group, TU Delft'
    url: 'https://intelligent-vehicles.org/'
---

## Overview

A 3-month project at TU Delft on deep-learning-based pedestrian detection and motion planning for intelligent vehicles. The goal was a high-accuracy pedestrian classifier capable of real-time detection, tracking, and trajectory estimation in dynamic urban environments — combining perception, sensor fusion, and planning into one pipeline.

## Perception

Detection ran on Convolutional Neural Networks, benchmarked across **YOLOv9-based heads, custom CNNs, and MobileNet**, with a classical pipeline (Histogram of Oriented Gradients + SVM) as a fine-grained fallback. Training data came from the Intelligent Vehicle Group's in-house pedestrian dataset, augmented to extend coverage of occluded and partially-visible pedestrians.

## Tracking and 3D projection

Detected pedestrians were tracked across frames with **Kalman and Particle filters**, with multi-frame object aggregation to recover from short-term occlusions. From 2D bounding boxes the pipeline projected detections back into world coordinates — the `2d_bbox → 3d_bbox` step lifts perception out of pixel space and into the planner's coordinate frame, with results visualised in 3D using `k3d`.

## Motion planning

On the planning side, steering profiles were composed with splines for smooth trajectories, and a **Best-First Search** algorithm handled motion planning through constrained spaces — urban intersections and parking lots — where greedy or grid-based planners typically fail.

## Evaluation

Performance was scored end-to-end:

- **mAP** (mean Average Precision) across the full frame dataset
- **Confusion matrices** for FP / FN diagnostics
- **HOTA** (Higher Order Tracking Accuracy) for the tracking stage
- **ROC curves** and **F1 scores** for the classifier head

## Stack

CNN architectures (YOLOv9-derived heads, custom CNNs, MobileNet), HOG + SVM, Kalman and Particle filters, `k3d` for 3D visualisation, Best-First Search for path planning.

> Re-distribution of materials from this project is prohibited by TU Delft.
