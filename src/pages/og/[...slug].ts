/**
 * Per-page OpenGraph image generator.
 *
 * Routes:
 *   /og/home.png          → site name + role
 *   /og/about.png         → about headline
 *   /og/projects/{slug}.png
 *   /og/writing/{slug}.png
 *   /og/gallery/{slug}.png
 *   /og/work/{slug}.png
 *
 * Style: dark editorial — Lora display title left-aligned, Geist Sans
 * description below, accent rule at the block-end edge. No logo blob.
 *
 * Build-time only: astro-og-canvas runs during `astro build` and emits
 * static PNGs. Cached in `node_modules/.astro-og-canvas` between builds.
 */

import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { site as siteConfig } from '../../data/site';
import { about } from '../../data/about';

interface OGPage {
  readonly title: string;
  readonly description: string;
}

const projects = await getCollection('projects', ({ data }) => !data.draft);
const writing = await getCollection('writing', ({ data }) => !data.draft);
const gallery = await getCollection('gallery');
const places = await getCollection('places');
const work = await getCollection('work', ({ data }) => !data.draft);

const distinctCountries = new Set(places.map((p) => p.data.country)).size;

const pages: Record<string, OGPage> = {
  home: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
  about: {
    title: about.headline,
    description: siteConfig.description,
  },
  places: {
    title: 'Places visited',
    description: `${places.length} cities across ${distinctCountries} countries.`,
  },
  ...Object.fromEntries(
    projects.map((entry) => [
      `projects/${entry.id}`,
      { title: entry.data.title, description: entry.data.summary },
    ]),
  ),
  ...Object.fromEntries(
    writing.map((entry) => [
      `writing/${entry.id}`,
      { title: entry.data.title, description: entry.data.summary },
    ]),
  ),
  ...Object.fromEntries(
    gallery.map((entry) => [
      `gallery/${entry.id}`,
      {
        title: entry.data.title,
        description: entry.data.caption ?? entry.data.location ?? siteConfig.name,
      },
    ]),
  ),
  ...Object.fromEntries(
    work.map((entry) => [
      `work/${entry.id}`,
      {
        title: `${entry.data.title} — ${entry.data.org}`,
        description: entry.data.summary,
      },
    ]),
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'slug',
  pages,
  getImageOptions: (_path, page: OGPage) => ({
    title: page.title,
    description: page.description,
    // Dark editorial backdrop: matches `--bg` (#0a0a0a) with a subtle drop
    // toward `--surface` (#141414) so the image isn't a flat black block.
    bgGradient: [
      [10, 10, 10],
      [20, 20, 20],
    ],
    // Accent rule at the bottom — placeholder accent, swap when the final
    // dark-theme accent is confirmed (see CLAUDE.md open questions).
    border: { color: [212, 255, 58], width: 6, side: 'block-end' },
    padding: 80,
    font: {
      title: {
        color: [237, 237, 237],
        size: 72,
        lineHeight: 1.1,
        weight: 'Medium',
        families: ['Lora'],
      },
      description: {
        color: [138, 138, 138],
        size: 30,
        lineHeight: 1.45,
        weight: 'Normal',
        families: ['Geist Sans'],
      },
    },
    fonts: [
      './node_modules/@fontsource/lora/files/lora-latin-500-normal.woff',
      './node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff',
    ],
  }),
});
