/**
 * Prettier 3 does NOT auto-load plugins — without this file the astro and
 * tailwindcss plugins in package.json were dead weight and `pnpm format`
 * had no parser for .astro files.
 *
 * Plugin order matters: prettier-plugin-tailwindcss must load last so its
 * class sorting composes with the astro parser.
 */
export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
};
