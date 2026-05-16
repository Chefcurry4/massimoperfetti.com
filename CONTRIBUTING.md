# Contributing

This is Massimo's personal site, with a template surface on top. The contribution model reflects that split.

## What I welcome

Pull requests that improve the **template scaffolding** — anything that helps the next forker:

- [`README.md`](README.md), [`SETUP.md`](SETUP.md), [`CONTRIBUTING.md`](CONTRIBUTING.md), [`LICENSE`](LICENSE), [`src/content/LICENSE-CONTENT.md`](src/content/LICENSE-CONTENT.md).
- Layout components, design tokens, theme presets in [`src/styles/themes/`](src/styles/themes/).
- Bug fixes — broken links, regressions, View Transitions glitches, accessibility issues.
- Performance wins — bundle-size reductions, Core Web Vitals improvements, smarter image loading.
- New theme presets that a non-trivial number of forkers might want.
- New issue templates if you spot a category of question I should be ready for.

Pull requests that touch the **content** of the live site — case studies, place descriptions, gallery captions, the about-page body, my personal photos — will be closed without merge. That's not template work; it's editing my voice. Please don't.

If you're not sure which side a change falls on, [open an issue](https://github.com/Chefcurry4/website/issues/new) before you spend time on it.

## How to propose a change

1. Open an issue first if the change is non-trivial — saves you and me a wasted round-trip.
2. Fork → branch (`feat/short-name` or `fix/short-name`) → small focused commits.
3. Run the local checks before pushing:

   ```sh
   pnpm install
   pnpm check       # astro type + template check
   pnpm lint:css    # stylelint — token discipline
   pnpm format:check
   pnpm build       # full production build
   ```

4. Open a PR. Title in conventional-commits style (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`). Body should answer: what changed, why, what I should test.
5. I'll review when I can. This is a side project; expect days, not hours.

## Coding standards

The repo's working agreement lives in [`CLAUDE.md`](CLAUDE.md) — those are the conventions Claude Code follows during sessions, and they apply equally to human contributors. Highlights:

- Tokens-first. No hardcoded hex colors, off-scale spacing, or off-scale border-radius outside [`src/styles/tokens.css`](src/styles/tokens.css). Stylelint enforces this.
- Type scale via component classes (`.text-h2`, `.text-body`, …) — never inline `font-size` overrides.
- Files stay under ~800 lines. Components stay under ~50 lines per function.
- View Transition names follow the `poster-{collection}-{slug}[-{element}]` pattern.
- Don't introduce React unless the interaction genuinely needs it. Static MPA is the design.

## What's explicitly off-limits in PRs

These are scope-locked; please don't propose changes to them:

- Adding a CMS (Contentful, Sanity, Strapi, …). Markdown + Zod is the design.
- Adding a database. The site is static.
- Adding heavy dependencies (Three.js, Framer Motion, GSAP, Spline, full UI libraries). Native View Transitions + a tiny CSS toolkit is the budget.
- Switching to dark-mode-only or light-mode-only. Both modes are intentional.
- Replacing Tailwind v4 / Astro 6 / Netlify / pnpm. The stack is locked — see [`CLAUDE.md`](CLAUDE.md) §Stack — locked decisions.

## Reporting a bug

If something on the live site is broken — bad link, broken layout on a viewport, content that no longer renders — open a [bug issue](.github/ISSUE_TEMPLATE/bug.md) with:

- URL.
- Browser + version.
- Viewport size or device.
- Screenshot or short video if visual.

If something in the template is broken — `pnpm dev` won't start on a fresh fork, schema rejects valid frontmatter, theme preset breaks — same template, but tag the issue `template-bug` so I prioritize it.

## Credit

If your PR ships, you'll be credited in the commit. No CLA, no formal contributor list — this is a small project.
