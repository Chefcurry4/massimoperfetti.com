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
      // /design is the internal design-system reference page. It builds
      // (so we can visit it at runtime) but stays out of the sitemap so
      // crawlers don't surface it.
      filter: (page) => !page.includes('/design'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
