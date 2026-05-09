# Massimo Perfetti — Personal Site

This file is the working agreement between the author and Claude Code. Read it at the start of every session. It captures decisions already made; do not re-litigate them unless explicitly asked.

---

## Author context

Massimo Perfetti. MSc at MIT and TU Delft, BSc at EPFL and Politecnico di Torino. Currently a researcher at MIT's van Rees Lab working on AI × CFD for his master thesis. Founder. Interests span NBA, chess, machine learning, logic games, reading, CFD, full-stack development, startups, AI.

Implication for tone and content: this is an academic-editorial profile, not a generic developer portfolio. The site should feel precise, technical, and quietly confident. Avoid: emoji-heavy copy, "🚀 passionate developer" framing, marketing language. Default to: dry precision, restrained typography, content over chrome.

---

## Project vision

A personal site shaped like a wall of posters. The home page is a horizontally-scrolling **bento grid** of variable-size cards on desktop, vertical on mobile. Each card is a "poster" — a project, a piece of writing, a place visited, a photo entry, a work item. Clicking a poster triggers a **shared-element zoom** transition into a full project page. Clicking back zooms out to the wall. A persistent **liquid-glass sidebar** holds the Now snippet, contacts, theme toggle, and a Spotify widget.

The aesthetic reference is editorial print design crossed with iOS 26 Liquid Glass. The functional reference is `gianmarcocavallo.com` (especially for the expandable world map of places visited).

---

## Stack — locked decisions

- **Framework**: Astro 6.x (currently 6.2). HTML-first MPA. TypeScript strict, pinned to `^5.7` (Astro's transitive peer dep `tsconfck` does not yet accept TS 6).
- **Styling**: Tailwind v4 via the `@tailwindcss/vite` plugin (NOT the deprecated `@astrojs/tailwind` integration). CSS-first config — there is **no `tailwind.config.ts`**. Tokens are mapped into Tailwind utilities via the `@theme inline` directive in `src/styles/global.css`. Auto content-detection is disabled (`source(none)`) and re-pointed to `src/` only, so root-level `CLAUDE.md` examples don't leak into the bundle. With **discipline**: see Tailwind Discipline below.
- **Content**: Markdown / MDX in Astro Content Collections (content-layer API with `glob` loaders), typed with Zod imported from `'zod'` directly (the `astro:content` re-export of `z` is deprecated in v6). Config lives at `src/content.config.ts` — Astro 6 hard-removed the legacy `src/content/config.ts` location.
- **Transitions**: Native browser View Transitions API via Astro's `<ClientRouter />` from `astro:transitions` (this is the renamed `<ViewTransitions />`; the old name is still exported but deprecated). No Framer Motion unless we hit a wall the API cannot solve.
- **Hosting**: Netlify. Static output. Netlify Forms for the contact form (no functions, no DB). `NODE_VERSION = "22"` in `netlify.toml` (Astro 6 floor is Node ≥ 22.12).
- **Interactive islands**: Vanilla JS or a small React component, only where needed (theme toggle, Spotify widget, world map).
- **Package manager**: pnpm 10 (faster, less disk).

Do not introduce: Next.js, server components, a database, a CMS, shadcn/ui (would make the site look generic), Three.js, Spline, GSAP, or animation libraries beyond what the View Transitions API gives us natively. If something tempts you to add one of these, push back to Massimo first.

---

## Repository layout

```
.
├── CLAUDE.md                       # this file
├── .claude/
│   └── agents/                     # specialized subagents — see below
├── astro.config.mjs                # registers @tailwindcss/vite + mdx + sitemap
├── tsconfig.json
├── netlify.toml                    # build & deploy config (NODE_VERSION 22)
├── public/                         # static assets, favicon, og images
├── src/
│   ├── content.config.ts           # Zod schemas for all collections (Astro 6 path)
│   ├── content/
│   │   ├── projects/               # *.md / *.mdx — main projects
│   │   ├── work/                   # *.md — work entries
│   │   ├── writing/                # *.md / *.mdx — notes & essays
│   │   ├── places/                 # *.md — places visited (with coords)
│   │   └── gallery/                # *.md — photo entries
│   ├── data/
│   │   ├── about.ts                # singleton: about content
│   │   ├── now.ts                  # singleton: what I'm doing now
│   │   ├── contacts.ts             # singleton: socials & contact details
│   │   └── site.ts                 # site-wide config (name, links, meta)
│   ├── layouts/
│   │   ├── Base.astro              # html shell, head, view-transitions, sidebar
│   │   └── Project.astro           # project detail page wrapper
│   ├── components/
│   │   ├── bento/                  # bento cell components
│   │   │   ├── BentoGrid.astro     # the wall itself
│   │   │   ├── AboutCell.astro     # full column-1 hero (contacts moved to sidebar in Phase 3)
│   │   │   ├── WorkCell.astro      # clickable; morphs into /work/[slug] (post-Phase-8)
│   │   │   ├── WritingCell.astro
│   │   │   ├── ProjectsCell.astro  # 3-4 projects, lg + sm variants
│   │   │   ├── GalleryCell.astro
│   │   │   ├── PlacesCell.astro    # bento mini world-map (uses ../places/WorldMap)
│   │   │   ├── SeeAllCell.astro    # "see all projects" CTA tile
│   │   │   └── StubCell.astro      # intentional empty slot
│   │   ├── work/
│   │   │   ├── WorkLogo.astro      # dispatches a work entry to its inline-SVG logo
│   │   │   └── logos/              # per-org inline-SVG logos with mono/color variants
│   │   │       └── DualEnergyLogo.astro
│   │   ├── places/
│   │   │   └── WorldMap.astro      # SSR-rendered SVG world (d3-geo + topojson)
│   │   ├── sidebar/
│   │   │   ├── Sidebar.astro       # persistent; rail/panel hover-expand
│   │   │   ├── Identity.astro      # avatar + name + role + availability ring
│   │   │   ├── NowSnippet.astro
│   │   │   ├── ContactsCluster.astro  # contacts row + "Book a call" + email popover
│   │   │   └── SpotifyWidget.astro
│   │   └── ui/                     # primitives:
│   │       ├── Cell.astro          # bento cell wrapper (chrome, padding, hover-lift)
│   │       ├── ThemeToggle.astro   # sun/moon, persists to localStorage
│   │       └── Tooltip.astro       # site-wide hover label primitive
│   ├── pages/
│   │   ├── index.astro             # the bento wall (home)
│   │   ├── projects/[slug].astro   # project detail pages
│   │   ├── projects/index.astro    # full projects index
│   │   ├── work/[slug].astro       # work detail pages (logo hero or gradient fallback)
│   │   ├── work/index.astro        # full work index
│   │   ├── writing/[slug].astro
│   │   ├── gallery/index.astro     # Instagram-style photo feed
│   │   ├── gallery/[slug].astro    # fullscreen photo on liquid-glass
│   │   ├── about.astro             # standalone about page
│   │   ├── book.astro              # /book — Cal.com booking embed
│   │   ├── design.astro            # /design — internal design system reference (sitemap-excluded)
│   │   ├── places/index.astro      # full places map page (Phase 6)
│   │   └── contact.astro           # contact form (Phase 7, Netlify Forms)
│   └── styles/
│       ├── tokens.css              # CSS custom properties (theme tokens, both themes)
│       └── global.css              # @import 'tailwindcss' source(none); @theme inline; type scale + .glass; reset; font @imports
└── package.json
```

Tokens flow: `tokens.css` declares `--bg`, `--surface`, `--text`, `--font-display`, … on `:root` and inside `[data-theme='dark|light']`. `global.css` re-exposes them to Tailwind via `@theme inline { --color-bg: var(--bg); … }`, so utilities like `bg-bg`, `text-text-muted`, `font-display` flip with the theme attribute without conditional logic. See [Tailwind discipline](#tailwind-discipline).

This layout is the canonical map. If a need arises that doesn't fit, propose a change explicitly rather than silently scattering files.

---

## Content architecture

All long-form content lives in `src/content/`. Each collection has a strict Zod schema in `src/content/config.ts`. Adding a new project = drop a markdown file in the right folder; the bento grid and detail pages update automatically.

**Collection schemas** (canonical — keep in sync with `config.ts`):

### `projects/`
```ts
{
  title: string,
  slug: string,                    // auto from filename if omitted
  summary: string,                 // 1-2 sentences for the bento card
  date: Date,                      // primary sort key
  status: 'live' | 'archived' | 'in-progress',
  tags: string[],                  // e.g. ['ai', 'cfd', 'research']
  cover: string,                   // path under /public, used as poster image
  coverPosition?: string,          // CSS object-position, default 'center'
  links?: { label: string, url: string }[],
  featured?: boolean,              // shows in bento grid (3-4 max)
  bentoSize?: 'sm' | 'md' | 'lg',  // bento cell footprint hint
  draft?: boolean,
}
// body: full project case study in markdown/MDX
```

### `work/`
```ts
{
  title: string,                   // role / title
  slug?: string,                   // auto from filename if omitted
  org: string,                     // institution / company
  period: { start: Date, end?: Date }, // end omitted = current
  location?: string,
  summary: string,                 // 1-2 sentences for the bento card
  tags: string[],                  // e.g. ['founder', 'ai', 'energy']
  cover?: string,                  // optional path under /public
  logo?: string,                   // optional path under /public — when set,
                                   // detail-page hero shows the wordmark
                                   // (color variant) and bento WorkCell
                                   // shows it inline mono via <WorkLogo>
  featured?: boolean,              // shows in bento grid (2 max)
  links?: { label: string, url: string }[],
  draft?: boolean,
}
// body: optional case-study markdown / MDX rendered on /work/[slug]
```

### `writing/`
```ts
{
  title: string,
  slug: string,
  date: Date,
  summary: string,
  tags: string[],
  draft?: boolean,
  readingTime?: number,            // auto-computed if absent
}
```

### `places/`
```ts
{
  city: string,
  country: string,
  coordinates: { lat: number, lng: number },
  visitedOn: Date,                 // most recent visit
  notes?: string,                  // short impression
  photos?: string[],               // paths under /public
}
```

### `gallery/`
```ts
{
  title: string,
  date: Date,
  image: string,                   // path under /public
  caption?: string,
  location?: string,
  exif?: { camera?: string, lens?: string, fStop?: string },
}
```

### Singletons (`src/data/*.ts`)

`about.ts`, `now.ts`, `contacts.ts`, `site.ts` are typed TypeScript objects, not collections. They change too rarely to deserve markdown.

---

## Layout system

### Desktop — horizontal bento (≥ 1024px)

The home page is **one full-viewport-tall row** that scrolls horizontally. Cards are **deliberately variable in size** — uniform sizes kill the editorial feel. The horizontal axis flows roughly left-to-right by importance:

```
Column 1                Column 2                Column 3              Column 4
┌──────────────┐        ┌────────┬─────────┐    ┌─────────────┐      ┌──────────────┐
│              │        │        │         │    │             │      │              │
│   ABOUT      │        │  WORK  │  WORK   │    │  PROJECT 1  │      │   GALLERY    │
│   (popup     │        │  card  │  card   │    │             │      │   (top)      │
│   on click)  │        │  1     │  2      │    ├─────────────┤      │              │
│              │        │        │         │    │  PROJECT 2  │      │              │
├──────────────┤        ├────────┴─────────┤    │             │      ├──────────────┤
│              │        │                  │    ├──┬───┬──────┤      │              │
│  CONTACTS    │        │   WRITING/NOTES  │    │P3│ P4│  +   │      │  PLACES      │
│              │        │   (small)        │    │  │   │ all  │      │  (world map) │
└──────────────┘        └──────────────────┘    └──┴───┴──────┘      └──────────────┘
```

Concrete rules:
- Use CSS Grid with explicit `grid-template-columns` and `grid-template-rows`. Do NOT use a uniform auto-fit grid.
- Horizontal scroll with `scroll-snap-type: x proximity` on the outer container, snap points on column boundaries. Snap points should feel like "stations," not like a slideshow.
- Total width: roughly 200–250vw on desktop. Tune to taste.
- Hide native scrollbar but keep keyboard arrow + trackpad scroll working. Add a subtle progress indicator at the bottom of the viewport.
- Cards are not all rectangles of the same aspect ratio. Vary intentionally. Refer to the wireframe above for proportions.

### Mobile (< 1024px) — vertical stack

```
About → Work → Projects → Writing/notes → Gallery → Places → Contacts
```

Implementation: media query swaps `grid-auto-flow` from `column` to `row`, columns reflow to a single 1-column stack, horizontal scroll disabled. This is a layout switch, not a separate template — we maintain one source of truth.

### Card → page zoom

Every bento card that links somewhere participates in a View Transition. See the View Transitions Convention section below.

---

## Design system

### Theme

Dark by default. Toggle to light. Theme is persisted in `localStorage` and respects `prefers-color-scheme` on first load only.

Implement via `data-theme="dark" | "light"` attribute on `<html>`. All tokens are CSS custom properties defined in `src/styles/tokens.css` and re-read by Tailwind via `theme.extend.colors` referencing `var(--color-*)`. This means **Tailwind classes like `bg-surface` work in both themes without conditional logic**.

### Color tokens (illustrative — refine in tokens.css)

```css
[data-theme="dark"] {
  --bg:            #0a0a0a;
  --surface:       #141414;
  --surface-glass: rgba(20, 20, 20, 0.55);
  --border:        rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --text:          #ededed;
  --text-muted:    #8a8a8a;
  --accent:        #d4ff3a;     /* placeholder — Massimo to confirm */
}
[data-theme="light"] {
  --bg:            #f5f5f3;
  --surface:       #ffffff;
  --surface-glass: rgba(255, 255, 255, 0.65);
  --border:        rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.16);
  --text:          #0a0a0a;
  --text-muted:    #6a6a6a;
  --accent:        #1a4dff;     /* placeholder */
}
```

### Typography

- **Display / titles** — Lora (variable, serif). Weights 400, 500, 600. Optical sizing on.
- **Body / UI** — Geist Sans (variable). Weights 400, 500, 600.
- **Caption / numerics / technical labels** — Geist Mono. Weight 400.

Load via Fontsource or `@fontsource-variable/*` packages; do NOT load from Google Fonts CDN (privacy + perf). Subset to Latin + Latin-Extended.

Type scale (apply via `.text-*` component classes in `global.css`; never override `font-size` in components):
- `text-display`: 56px / 1.05 / -0.02em — Lora 500. Page hero (currently `/about`, `/_design`).
- `text-h1`: 40px / 1.1 / -0.015em — Lora 500. Page headlines (`/book`, hero portrait name).
- `text-h2`: 28px / 1.2 — Lora 500. Structural section headings only — NOT card titles.
- `text-h3`: 20px / 1.3 — Geist 600. Card titles, section sub-headings.
- `text-body`: 16px / 1.55 — Geist 400.
- `text-small`: 14px / 1.5 — Geist 400.
- `text-ui`: 13px / 1.3 / -0.005em — Geist 500. **Interactive control labels** (CTAs, buttons). Replaces ad-hoc 12.5px / 18px escapes.
- `text-caption`: 12px / 1.4 / 0.02em uppercase — Geist Mono 400. Eyebrows.
- `text-mono-small`: 11px / 1.4 — Geist Mono 400. Handles, tokens, status labels.

### Design tokens — scales

Beyond colors and motion, the system has four numeric scales. Components MUST consume these via `var(--*)` rather than raw values. See `src/pages/_design.astro` for live samples.

**Spacing** (multiples of 4px from a base of 4): `--space-1`..`--space-8` (4, 8, 12, 16, 24, 32, 48, 64). Use for `gap`, `padding`, `margin`. Off-scale values are a smell.

**Radius** (four values): `--radius-sm` 6px, `--radius-md` 14px, `--radius-lg` 18px, `--radius-pill` 999px. Stylelint enforces this scale.

**Z-index** (named layers, 10-unit gaps): `--z-progress` 30, `--z-sidebar` 40, `--z-modal` 50, `--z-tooltip` 60.

**Controls**: `--control-h-sm` 32px (icon links), `--control-h-md` 36px (primary controls). `--icon-sm` 18px, `--icon-xs` 12px.

**Gradients & scrims**: `--gradient-cool` (portrait/avatar fallback), `--gradient-cool-soft` (about photos backdrop), `--scrim-modal` (popover ::backdrop, mobile drawer scrim). One token, no duplication.

### Liquid glass

Used selectively, not on every surface. Best targets: the sidebar, the "+ all projects" button, modal popups (about), maybe the place-detail card.

The cross-browser-safe recipe (no SVG displacement, works everywhere):
```css
.glass {
  background: var(--surface-glass);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid var(--border-strong);
  box-shadow:
    0 1px 0 0 rgba(255,255,255,0.06) inset,
    0 8px 32px rgba(0,0,0,0.25);
}
```

The advanced recipe (refraction via SVG `feDisplacementMap`) is **Chromium-only**. Treat as a progressive enhancement. If we adopt it, gate it behind `@supports (filter: url(#glass-distortion))` and make sure the fallback above is always usable. Reference: `rdev/liquid-glass-react` (already noted in references) — Safari/Firefox only get partial support.

Do NOT crank blur to >24px or saturation to >160%. It looks like a teenager discovered Photoshop.

### Spacing & rhythm

Use Tailwind's default scale but **anchor on multiples of 4**. Avoid odd values like `gap-[7px]`. Generous whitespace is part of the editorial feel — err on the side of more space, not less.

---

## Tailwind discipline

Tailwind without rules → generic AI portfolio. The following are non-negotiable:

1. **All colors come from tokens.** Never write `bg-zinc-900` or `text-gray-300`. Use `bg-bg`, `bg-surface`, `text-text`, `text-text-muted`, `border-border`. These map to CSS variables that swap with theme.

2. **Type scale via component classes**, not utility soup. In `global.css`:
   ```css
   @layer components {
     .text-display { @apply font-display text-[56px] leading-[1.05] tracking-[-0.02em]; }
     .text-h1      { @apply font-display text-[40px] leading-[1.1] tracking-[-0.015em]; }
     /* ... */
   }
   ```
   Then use `<h1 class="text-h1">` — readable, reusable, refactorable.

3. **`@apply` is allowed for true reusable abstractions only** (`.glass`, `.text-h1`, `.bento-cell`). Not for one-off compositions.

4. **Component classes live in CSS files**, not inline. If you find yourself writing the same 8-class soup in three places, extract.

5. **No arbitrary values without a comment.** `mt-[37px]` is a code smell. Either it's part of the scale or it has a documented reason.

6. **Tokens-first rule.** No new component may introduce a hardcoded spacing, radius, color, or z-index value. If the design needs a value not in the scale, **add it to `tokens.css` first**, then consume it. Off-scale values require a comment justifying why (e.g. "matches Spotify iframe inner border, can't override"). Stylelint enforces hex colors, raw rgba backgrounds, and off-scale `border-radius` via `pnpm lint:css`. Run before commit.

6. **Group classes by category** when stacking utilities: layout → box → typography → color → effects → interaction. This is a readability convention, not a linter rule, but follow it.

---

## View Transitions convention

The bento → project zoom is the signature interaction. It is fragile to wrong naming. Stick to this scheme rigidly.

### Naming scheme

For a card linking to `/projects/foo-bar`:
```
view-transition-name: poster-projects-foo-bar          /* the whole card  */
view-transition-name: poster-projects-foo-bar-image    /* cover image     */
view-transition-name: poster-projects-foo-bar-title    /* project title   */
```

On the destination page (`/projects/foo-bar`), the matching elements use the same names.

For other collections, use the same pattern: `poster-{collection}-{slug}[-{element}]`.

Singletons (about, contacts) use stable names: `poster-about`, `poster-contacts`.

### Rules

- `<ClientRouter />` (from `astro:transitions`) must be present in the `<head>` of `Base.astro` for any of this to work. The legacy `<ViewTransitions />` import still works but emits a deprecation warning — don't use it.
- Set `transition:name` in Astro markup; Astro generates the underlying `view-transition-name` CSS rule and a unique `data-astro-transition-scope` attribute for you. Don't write `view-transition-name` declarations by hand.
- `view-transition-name` values must be **unique on the source page** at the time of navigation. Two visible cards with the same name = transition fails silently.
- The destination element must be **rendered on first paint**, not lazy-loaded after navigation. Otherwise the morph snaps.
- Default View Transitions duration: 280ms. Custom override only when justified.
- For the back-zoom, Astro's `astro:before-swap` event lets us tag the navigation direction; use it to flip the transition curve for "back" navigations so they feel like zoom-out.
- Scroll position: there's a known issue where `layoutId`-style transitions misalign after scroll. Astro's View Transitions handles this better than Framer, but test the back-navigation after scrolling. If it breaks, the fix is `transition:persist` on the scroll container + manual scroll restoration.

### Reference

The canonical study repo for our setup is `Charca/astro-movies` (see Reference Repos). When in doubt, look there first. `vito8916/Nextjs-ViewTransition-Demo` is the React 19 / Next equivalent — useful for understanding the naming patterns even though we're on Astro.

---

## MDX body components

For richer project bodies, write `.mdx` instead of `.md` and import the
Phase 5 components at the top of the file. Three are available:

```mdx
import Figure from '../../components/mdx/Figure.astro';
import Pullquote from '../../components/mdx/Pullquote.astro';
import Aside from '../../components/mdx/Aside.astro';

# Heading

Body paragraph here. The drop cap renders on the first letter of the
first paragraph automatically — no markup needed.

<Figure
  src="/projects/flowmap/training-curve.png"
  alt="Training-vs-rollout-error curve over 200 steps"
  caption="Long-horizon stability across 200 rollout steps."
  aspect="16/9"
/>

## Method

Body continues. A pullquote can punctuate a section:

<Pullquote attribution="thesis notes, MIT">
  Curriculum rollout + Sobolev loss together stabilize what either does alone.
</Pullquote>

<Aside>
  Side note that doesn't deserve its own paragraph.
</Aside>
```

- **`<Figure>`** — props: `src`, `alt` (required), `caption?`, `aspect?` (e.g. `16/9`). Layered gradient fallback covers missing images so a 404'd `src` shows the gradient, not a broken-icon. Source: `src/components/mdx/Figure.astro`.
- **`<Pullquote>`** — large display-serif quote pulled into the prose gutter via negative margin on desktop, inline on mobile. Optional `attribution` prop renders below as caption-mono. Source: `src/components/mdx/Pullquote.astro`.
- **`<Aside>`** — small editorial side-note, accent-tinted left border, sits inside the prose column. Source: `src/components/mdx/Aside.astro`.

Default markdown elements (`> blockquote`, `---` hr, headings, lists, code, links) get the editorial `.prose` treatment automatically — no component needed. See `.prose` rules in `src/styles/global.css`.

Project detail pages also auto-render:
- A **reading-progress bar** at the top edge (`<ReadingProgress />`).
- A **related projects** strip below the body (tag-overlap, hidden if no overlap).
- A **prev / next** nav row at the bottom (date-desc adjacency).

These are wired in `src/pages/projects/[slug].astro` — adding a new project entry surfaces them automatically once it has tag overlap or a date neighbor.

---

## Sidebar

A single component, `src/components/sidebar/Sidebar.astro`, used in `Base.astro`. Marked `transition:persist="sidebar"` so it does not unmount across navigations — animations and state survive page changes.

Contents, top to bottom:
1. **Identity** — avatar (with availability ring) + name + one-line role. The ring around the avatar is colored by `now.availability` so the collapsed rail still signals real-time state without needing to expand.
2. **Now snippet** — pulled from `src/data/now.ts`. Single sentence: what I'm working on, where I am, availability state. Updated by editing the file.
3. **Contacts cluster** — two subsections: a public-audience icon row (email, GitHub, LinkedIn, newsletter, LeetCode) wrapped in `<Tooltip side="right">`, and a "Book a 30-min call" CTA pill linking to `/book`. The email icon opens a popover listing all three addresses (personal / MIT / TU Delft); academic emails are folded back in only via that popover so the row stays compact.
4. **Spotify widget** — embed of currently-playing or last-played. Spotify's official iframe (no API key, no backend).
5. **Theme toggle** — sun/moon icon. Persists to `localStorage`. Reads `prefers-color-scheme` on first visit. Sits in the footer; on the collapsed rail it floats absolutely at bottom-center.

**Hover-rail model (desktop ≥ 1024px).** The sidebar has two states:
- **Collapsed (rail, `--sidebar-rail` = 64px):** avatar + a vertical accent edge on the right + a chevron trigger near the bottom + the theme toggle. The wall and `/book` page anchor their left margin to the rail width so they never reflow.
- **Expanded (panel, `--sidebar-width` = 280px):** full content. Triggered by clicking the chevron (or anywhere on the rail). Mouseleave schedules collapse after 1s; mouseenter cancels it; ESC collapses immediately. The expanded panel floats above the wall via `z-index: var(--z-sidebar)` with a soft shadow so the layout doesn't reflow.

**Mobile (< 1024px).** Bottom drawer with Identity peek and a drag-handle grip. Drawer expands to 80dvh on tap; body scroll is locked while open via window.scrollY preservation.

**Spacing.** Outer rhythm uses `--space-5` (24px) between top-level pieces; section dividers are `border-top: 1px solid var(--border)` with `padding-top: var(--space-4)` integrated into each section (no standalone `<hr>`). Editorial whitespace, not flat hairlines.

---

## Build order

This is the suggested phasing. Work top-down. Don't run ahead.

- [x] **Phase 0** — `pnpm create astro@latest`, Tailwind v4 install, design tokens scaffolded, fonts loaded, dark/light toggle works, `<ClientRouter />` enabled in `Base.astro`. _Done — commit `077bf71`._
- [x] **Phase 1** — Content collections defined in `src/content.config.ts` with schemas above. One sample entry per collection. _Done — commit `ccddd7f`._
- [x] **Phase 2** — Bento grid layout. 4-column wall (360 / 540 / 600 / 420 px) with per-column subgrids, 12 cells, real data + sparse stubs, proximity scroll snap, mobile re-ordering via CSS `order:`, scroll progress indicator, `role="region"` for keyboard a11y. New `.text-mono-small` type rung; `--glass-highlight` / `--glass-shadow` / `--on-cover` tokens. No transitions yet (Phase 4)._
- [x] **Phase 3** — Sidebar built and persisted. Identity (avatar + name + role), Now snippet with availability dot, public-audience contacts cluster (Tooltip-wrapped icon row), Spotify embed (iframe), theme toggle slotted in. Mobile = bottom drawer with Identity peek, scroll-position-preserving body lock, AbortController-managed listeners. Bento ContactsCell retired; AboutCell expanded to full col-1.
- [x] **Phase 4** — View Transitions. Card-to-detail morphs wired for projects (3-name: card/image/title), writing (2-name: card/title), gallery (2-name: card/image). Routes: /projects/[slug], /projects (list), /writing/[slug], /gallery/[slug]. Project detail uses a full-bleed split hero (cover left, meta right). Wall scrollLeft preserved across nav via sessionStorage. Cover-hue helper extracted to src/lib/cover-color.ts so source + destination gradients match continuously through the morph.
- [x] **Phase 5** — Project detail polish. Editorial `.prose` upgrade (drop cap on first paragraph, blockquote, figure/figcaption, hr, 17px body, tighter h2/h3 rhythm). New components: `RelatedProjects` (tag-overlap, transition:names match bento for cross-detail morphs), `NextPrev` (date-desc adjacency), `ReadingProgress` (top-edge bar, used on /projects/[slug] + /writing/[slug]). MDX body components: `<Figure>`, `<Pullquote>`, `<Aside>` (in `src/components/mdx/`, opt-in per .mdx file — see §MDX body components).
- [x] **Phase 6** — Places: world map at `/places`. Pure-Astro SSR — no React island. Build-time renders an SVG world via `d3-geo` (`geoNaturalEarth1` projection) + `topojson-client.feature()` over `world-atlas/countries-110m.json`; no client-side map library, zero bundle impact (Astro tree-shakes server-only imports). [`src/components/places/WorldMap.astro`](src/components/places/WorldMap.astro) is the reusable component (`variant: 'mini' | 'full'`, native `<title>` tooltips for accessibility); [`src/pages/places/index.astro`](src/pages/places/index.astro) is the full page with header + map + auto-fit grid of place cards sorted date-desc. Bento [`PlacesCell`](src/components/bento/PlacesCell.astro) replaces its hand-drawn placeholder with `<WorldMap variant="mini">` and links to `/places` via `transition:name="poster-places"` (singleton naming per §View Transitions). 14 entries in `src/content/places/` (Italy, Spain, UK, France, Netherlands, New York, Turkey, Germany, Malta, Ireland, Switzerland, Poland, Hungary + the existing Cambridge-MA). Lighthouse desktop on `/places`: Perf 95 / A11y 100 / BP 96 / SEO 100, LCP 1.2s, CLS 0. axe-clean.
- [x] **Phase 7** — Gallery: bento `GalleryCell` auto-cycles through every photo every 10s (crossfade, pause-on-hover/focus, off under prefers-reduced-motion); each tick rewrites `view-transition-name` on the link + frame so a click mid-cycle morphs into `/gallery/[slug]` for whichever photo is currently on screen. The detail page is a fullscreen photo on a liquid-glass backdrop (no exif page chrome — the page IS the zoomed view); its "all photos →" link leads to `/gallery`, an Instagram-style square-thumbnail feed; thumbnails morph back to the fullscreen view via the same `poster-gallery-{slug}` / `-image` names. Contact form at `/contact` (Netlify Forms, declarative, redirects to `/thanks`); CTA surfaced in the sidebar ContactsCluster next to the Book CTA. About: `<AboutContent />` extracted as a shared component used by `/about` only — the popup was reverted in favour of a single deep-linkable page (AboutCell `→ read more` links straight to `/about`).
- [x] **Phase 8** — Polish. OG image generator unblocked via `.npmrc` (`public-hoist-pattern[]=*canvaskit*` so pnpm hoists `canvaskit-wasm` and `astro-og-canvas` finds the wasm binary); 8 OG PNGs emit at build (`/og/home.png`, `/og/about.png`, `/og/projects/{slug}.png`, `/og/writing/{slug}.png`, `/og/gallery/{slug}.png`). RSS verified (`/writing/rss.xml`, valid feed) and sitemap verified (13 public URLs, `/design` + `/thanks` + `/og/*` excluded). Accessibility audit: axe-core/cli clean across `/`, `/about`, `/projects/flowmap`, `/gallery`, `/projects`, `/contact` (the only remaining violation is on `/book` and originates inside the Cal.com iframe — third-party). Bento home heading hierarchy fixed (`AboutCell` is now `<h1>`, all cell titles `<h2>`). Lighthouse desktop preset: Performance ≥ 94, Accessibility 100, Best Practices 96, SEO 100; LCP ≤ 1.4s, CLS ≤ 0.007 across `/`, `/about`, `/projects/flowmap`, `/gallery`. Loading states de-scoped (static MPA, gradient fallbacks already cover missing media).
- ~~**Phase 9** — Deploy to Netlify. Custom domain.~~ **Out of scope.** Massimo already owns the custom domain and handles the Netlify deploy himself. Do not propose deploy steps, DNS changes, Netlify CLI commands, or domain config — that lane is the author's. The repo's `netlify.toml` is the only deploy-side artifact we maintain.
- [x] **Post-Phase-8** — Work detail pages. The work collection now mirrors the project detail-page system: `WorkCell` is a clickable anchor with `poster-work-{slug}` morph names (card / image / title); `/work/[slug]` is a split-hero detail page (logo left when `entry.data.logo` is set, gradient + initial fallback otherwise — same `coverHueVars()` recipe as projects so the morph reads continuously); `/work` is a list view; `<RelatedWork>` and `<WorkNextPrev>` clone the project equivalents over the work fields. Schema extended additively (`slug`, `tags`, `cover`, `logo`, `featured`, `draft`, all optional; loader switched to `**/*.{md,mdx}`) — pre-existing entries unchanged. Per-org logos live in [`src/components/work/logos/*`](src/components/work/logos/) as inline SVGs with `mono` (currentColor) and `color` variants; [`WorkLogo.astro`](src/components/work/WorkLogo.astro) dispatches by slug. OG generator extended for `work/{slug}.png`.

Mark items done by editing this file when phases complete. Don't move on with TODOs left behind.

---

## Reference repos — canonical, return here often

These were vetted. Don't go searching for alternatives unless one of these has a known gap.

**Layout**
- [`Ladvace/astro-bento-portfolio`](https://github.com/Ladvace/astro-bento-portfolio) — closest stack match. Real, deployed personal site. Steal layout patterns, not branding.
- [`withaarzoo/bento-portfolio`](https://github.com/withaarzoo/bento-portfolio) — vanilla HTML/CSS/JS bento. Useful for understanding the grid math without framework noise.

**View Transitions**
- [`Charca/astro-movies`](https://github.com/Charca/astro-movies) — primary reference for our setup. Astro + shared-element transitions, including poster zoom.
- [`vito8916/Nextjs-ViewTransition-Demo`](https://github.com/vito8916/Nextjs-ViewTransition-Demo) — React 19 equivalent. Cross-reference for naming patterns.
- [`AKanparia/img-zoom-to-next-page`](https://github.com/AKanparia/img-zoom-to-next-page) — minimal card-zoom example (Framer Motion). For mental model only.
- [`a2rp/framer-motion-demos`](https://github.com/a2rp/framer-motion-demos) — broader pattern library. **Bookmark this.** Patterns to revisit: "grid → detail," "hero teleport," "command palette zoom-in."

**Liquid glass**
- [`rdev/liquid-glass-react`](https://github.com/rdev/liquid-glass-react) — drop-in component. Caveat: Chromium-only displacement.
- [`lucasromerodb/liquid-glass-effect-macos`](https://github.com/lucasromerodb/liquid-glass-effect-macos) — pure CSS+SVG, no JS.
- [kube.io's article on Liquid Glass in CSS+SVG](https://kube.io/blog/liquid-glass-css-svg/) — best technical writeup of the refraction math.

When picking up a new task, ask: "is there a pattern in one of these repos already?" before writing from scratch.

---

## Anti-patterns — refuse to ship

- Uniform-size bento cards. The variable footprint **is** the design.
- shadcn/ui imported wholesale. Cherry-pick patterns at most.
- Animated decorative SVGs that loop forever in the corner.
- Gradient text on hero. We are not in 2021.
- Three.js / Spline scenes. Heavyweight, off-brand for an academic profile.
- Emoji in the UI itself. (Markdown body content is fine if Massimo writes them.)
- "Hi 👋 I'm a passionate developer." Burn it.
- More than 24px of backdrop blur, more than 160% saturation.
- Page transitions that take >400ms or block input mid-flight.
- Color values hardcoded outside `tokens.css`.
- More than two visible accent colors at once.

If a request would require any of the above, push back before complying.

---

## Commands

```bash
# install
pnpm install

# dev
pnpm dev                # http://localhost:4321

# build
pnpm build              # output → dist/

# preview
pnpm preview

# typecheck
pnpm astro check

# format
pnpm format
pnpm format:check

# lint CSS (token discipline — fails on hex colors, off-scale radii, raw rgba backgrounds)
pnpm lint:css
```

---

## Deployment — Netlify

> **Author-owned lane.** Massimo deploys to Netlify and manages the custom domain himself. Claude maintains `netlify.toml` and the contact-form markup; Claude does **not** run Netlify CLI commands, edit DNS, propose redeploy steps, or chase build failures on the deployed site unless Massimo explicitly asks.

`netlify.toml` at repo root:
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  # Astro 6 requires Node ≥ 22.12. Bump again if Astro raises the floor.
  NODE_VERSION = "22"
  PNPM_VERSION = "10"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

Contact form uses Netlify Forms — declarative, no functions:
```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p hidden><label>Don't fill: <input name="bot-field" /></label></p>
  <!-- real fields here -->
</form>
```

---

## Working with Massimo

- He is at MIT and TU Delft. Don't over-explain. Skip the intro paragraphs.
- He values precision over speed. A wrong but fast answer wastes more time than a careful one.
- Push back when he's wrong or when a request will produce a worse outcome than the alternative. Sycophancy is a defect, not a feature.
- When proposing a design or implementation choice, name the tradeoff. "I picked X because Y, the cost is Z." Never decide silently.
- Reference the canonical repos when relevant. "I'm doing this the way `Charca/astro-movies` does it."
- Keep responses short. He reads code, not prose.

---

## Open questions / pending decisions

Surface these instead of inventing answers:
- Final accent color(s) for dark and light themes. Placeholders are in tokens.
- Third typeface interpretation: confirm Geist Mono vs. a second humanist serif (Source Serif 4) for "the rest."
- Spotify widget exact format: now-playing API (needs token rotation, more work) vs. embedded iframe of a curated playlist (zero-config, less personal).
- World map library for Places. Investigate before Phase 6.
- Mobile placement of the sidebar — bottom drawer vs. top sheet vs. hamburger.

When work touches one of these, surface the decision and propose options. Do not pick silently.
