---
title: 'Unidiary'
summary: 'AI-guided study planner for university students. Where I learned full-stack: Next.js + Supabase + Clerk + Vercel, end to end.'
date: 2025-08-15
status: 'live'
tags: ['fullstack', 'nextjs', 'supabase', 'ai', 'edtech']
cover: '/projects/unidiary-cover.webp'
coverPosition: 'center'
featured: true
bentoSize: 'lg'
links:
  - label: 'Live'
    url: 'https://www.unidiary.ai/'
  - label: 'Repository'
    url: 'https://github.com/Chefcurry4/UniDiary'
---

## Overview

Unidiary is an AI-guided study planner for university students — the name is short for *University Diary*. The product helps students structure their academic year: course selection, study plan, schedule, deadlines. The tagline on the landing page says it plainly: "plan your studies smartly."

It's also the project that taught me full-stack. Every layer was built from scratch — auth, database, billing-adjacent flows, AI guidance, deployment — so each piece had to actually work in production before the next one mattered.

## Stack

- **Framework** — Next.js 14 (App Router). Server components for the catalog and dashboard reads, client components for the interactive planner.
- **Auth** — Clerk. Managed sign-in, session, and user metadata; saved me from rebuilding auth as an undergraduate side project.
- **Database / backend** — Supabase (Postgres + Row-Level Security). Schemas for users, programs, courses, study plans, weekly schedules.
- **Styling** — Tailwind CSS, with a terracotta-on-paper editorial aesthetic. Type pairing: Lora (serif), DM Mono, Instrument Sans.
- **AI** — LLM-driven study-plan generation, course discovery, and schedule fit. Prompts grounded in a structured catalog so the model never invents courses.
- **Hosting** — Vercel. Preview deployments per branch.

## What I built

- Onboarding flow that captures the student's program, year, constraints, and goals.
- Course catalog with structured filters (program, semester, ECTS, prerequisites).
- Study-plan generator that proposes a balanced weekly schedule and lets the student edit it cell by cell.
- Persistent diary view — the actual *journal* part — that logs what was studied, what's due, and what's blocking.
- Account, billing, and admin surfaces wired against Clerk + Supabase.

## What I learned

The lesson wasn't "how to use Supabase." It was how the layers compose: how an unindexed query in the planner page slows down server components in a way you only see in production; how Clerk metadata is the wrong place to keep program-level state once it's queried from three views; how an LLM call without a grounding catalog will hallucinate a confident-sounding nonsense course every time.

Most of all: it taught me that shipping a real product into the hands of students is the only honest measurement of whether the stack works.

> A real cover screenshot lives at `/projects/unidiary-cover.webp` once added; until then the gradient placeholder renders.
