# Editorial bento — a forkable personal site

Source for [`massimoperfetti.com`](https://massimoperfetti.com), and the template behind it. An Astro + Tailwind v4 personal site shaped like a wall of posters: a horizontally-scrolling [bento grid](https://github.com/Ladvace/astro-bento-portfolio) of variable-size cards on desktop, vertical on mobile, with native View Transitions zooming each card into its own detail page. A persistent liquid-glass sidebar holds identity, contacts, and a Spotify link. Dark-only by design.

The aesthetic reference is editorial print crossed with iOS 26 Liquid Glass. The functional reference is [`gianmarcocavallo.com`](https://gianmarcocavallo.com) for the expandable map of places visited.

## Live demo

[`massimoperfetti.com`](https://massimoperfetti.com) — the canonical instance.

## Use this as a template

```sh
gh repo create my-portfolio --template Chefcurry4/massimoperfetti.com --public --clone
cd my-portfolio
pnpm install
# follow SETUP.md → "first-run checklist" (≈10 minutes)
pnpm dev   # http://localhost:4321
```

GitHub's "Use this template" button on the repo page does the same thing without the CLI.

On your first push, a one-shot workflow opens a **"Welcome — follow SETUP.md to scaffold your site"** PR. It renames the package, removes its own workflow file, and embeds the first-run checklist directly in the PR body so you don't have to hunt for it. Merging that PR finalizes the bootstrap.

## What you customize

Identity, content, and colors — without touching code:

- **Identity** — `src/data/site.ts`, `src/data/about.ts`, `src/data/contacts.ts`.
- **Content** — markdown in `src/content/{projects,work,writing,places,gallery}/`. Add a file, the bento grid and detail pages update automatically. Schemas are typed with [Zod](https://zod.dev) in [`src/content.config.ts`](src/content.config.ts).
- **Colors** — pick a preset (`default`, `linen`, `sapphire`, `forest`) by editing one `@import` line in `src/styles/global.css`. Custom palettes: duplicate any preset and edit the nine palette + accent-halo tokens (both light and dark blocks).
- **Images** — drop files into `public/`. Missing media falls back to gradient placeholders automatically — no broken-icon states.
- **Template credit** — the bottom-right "MIT-licensed template →" chip points at this repo by default; change `site.templateRepoUrl` to your fork's URL, or set it to an empty string to hide.

Full walkthrough: [`SETUP.md`](./SETUP.md). Architecture and stack-decision notes (intended for AI agents working in the codebase): [`CLAUDE.md`](./CLAUDE.md).

## Stack

- [Astro 6](https://astro.build) — HTML-first MPA, TypeScript strict, content collections, native [View Transitions](https://docs.astro.build/en/guides/view-transitions/).
- [Tailwind v4](https://tailwindcss.com) via the `@tailwindcss/vite` plugin — CSS-first config, design tokens in `src/styles/tokens.css`.
- [MDX](https://mdxjs.com) for project case studies with editorial components (Figure, Pullquote, Aside).
- [Netlify](https://netlify.com) hosting + [Netlify Forms](https://docs.netlify.com/forms/setup/) for the contact form (no backend).
- Fonts via [Fontsource](https://fontsource.org) — Lora, Geist Sans, Geist Mono. Self-hosted, no CDN coupling.
- [`d3-geo`](https://github.com/d3/d3-geo) + [`world-atlas`](https://github.com/topojson/world-atlas) for the SSR-rendered Places map. Zero client JS.
- pnpm 10, Node ≥ 22.12.

No CMS, no database, no React (except where genuinely needed — most cells are `.astro`). Static output, deploys to a CDN, build time under 30 s.

## Commands

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # → dist/
pnpm preview
pnpm check        # astro type + template check
pnpm lint:css     # stylelint — token discipline
pnpm format       # prettier
pnpm images:webp  # convert /public images to webp
```

## License

- Code: [MIT](./LICENSE) — fork freely, ship your own site, no attribution required (a kind word in the footer is appreciated, never demanded).
- Content under `src/content/*` and personal images under `public/about/`, `src/assets/me.webp`, `src/assets/in.png`, `public/work/`, etc.: © Massimo Perfetti, [CC BY-NC-ND 4.0](./src/content/LICENSE-CONTENT.md). Read for inspiration; replace with your own before publishing.

If something is unclear about what you can or can't reuse, [open a `template-question` issue](.github/ISSUE_TEMPLATE/template-question.md) and I'll clarify.

## Acknowledgements

Layout patterns studied from [`Ladvace/astro-bento-portfolio`](https://github.com/Ladvace/astro-bento-portfolio). View Transitions setup studied from [`Charca/astro-movies`](https://github.com/Charca/astro-movies). Liquid-glass technique adapted from [kube.io's CSS+SVG writeup](https://kube.io/blog/liquid-glass-css-svg/).
