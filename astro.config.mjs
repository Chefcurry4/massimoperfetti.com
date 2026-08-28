// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://massimoperfetti.com',
  integrations: [
    mdx(),
    sitemap({
      // /design is the internal design-system reference page; /thanks is a
      // post-submit success page. Both build (so they're reachable) but
      // stay out of the sitemap so crawlers don't surface them.
      filter: (page) => !page.includes('/design') && !page.includes('/thanks'),
    }),
  ],
  // Prefetch every internal link as it enters the viewport. Static MPA +
  // small HTML pages, so this is cheap — and the card→detail View
  // Transition otherwise blocks on a cold network fetch of the destination
  // (the "morph hangs then snaps" feel). Explicit data-astro-prefetch
  // attributes can still override per-link strategy.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
