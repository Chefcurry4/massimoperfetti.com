/**
 * Content collections — single source of truth for typed Markdown/MDX entries.
 *
 * Five collections per CLAUDE.md §Content architecture:
 *   - projects   case studies, drives the Projects bento cell
 *   - work       roles + institutions, drives the Work bento cell
 *   - writing    notes & essays, drives the Writing bento cell
 *   - places     visited cities, drives the world-map bento cell
 *   - gallery    photo entries, drives the Gallery bento cell
 *
 * All collections use Astro's content-layer `glob` loader so files are
 * picked up automatically when added or removed.
 *
 * Schemas are tightened versions of the CLAUDE.md pseudocode — explicit URL
 * validation on links, ISO date coercion, refinements on lat/lng ranges.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const linkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().optional(),
    summary: z.string().min(1),
    date: z.coerce.date(),
    status: z.enum(['live', 'archived', 'in-progress']),
    tags: z.array(z.string()).default([]),
    cover: z.string(),
    coverPosition: z.string().default('center'),
    links: z.array(linkSchema).optional(),
    featured: z.boolean().default(false),
    bentoSize: z.enum(['sm', 'md', 'lg']).optional(),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().optional(),
    org: z.string().min(1),
    period: z.object({
      start: z.coerce.date(),
      end: z.coerce.date().optional(),
    }),
    location: z.string().optional(),
    summary: z.string().min(1),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    logo: z.string().optional(),
    featured: z.boolean().default(false),
    links: z.array(linkSchema).optional(),
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().optional(),
    date: z.coerce.date(),
    summary: z.string().min(1),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    readingTime: z.number().int().positive().optional(),
  }),
});

const places = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/places' }),
  schema: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
    visitedOn: z.coerce.date(),
    notes: z.string().optional(),
    photos: z.array(z.string()).optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  // Schema-as-function so Astro injects the `image()` helper. `image()`
  // validates the path *and* returns ImageMetadata (src + dimensions +
  // format) for downstream <Image> consumers, unlocking AVIF/WebP/srcset
  // emission at build time. Files live in `src/assets/gallery/` because
  // /public is passthrough-only and never goes through the asset pipeline.
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      date: z.coerce.date(),
      image: image(),
      caption: z.string().optional(),
      location: z.string().optional(),
      exif: z
        .object({
          camera: z.string().optional(),
          lens: z.string().optional(),
          fStop: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = {
  projects,
  work,
  writing,
  places,
  gallery,
};
