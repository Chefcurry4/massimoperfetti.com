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
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
