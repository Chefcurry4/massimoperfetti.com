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
│   │   │   ├── AboutCell.astro
│   │   │   ├── ContactsCell.astro
│   │   │   ├── WorkCell.astro
│   │   │   ├── WritingCell.astro
│   │   │   ├── ProjectsCell.astro  # 3-4 projects + "see all" button
│   │   │   ├── GalleryCell.astro
│   │   │   └── PlacesCell.astro    # expandable world map
│   │   ├── sidebar/
│   │   │   ├── Sidebar.astro       # persistent across navigations
│   │   │   ├── NowSnippet.astro
│   │   │   ├── ContactsCluster.astro
│   │   │   ├── ThemeToggle.astro
│   │   │   └── SpotifyWidget.astro
│   │   ├── ui/                     # primitives: Glass, Card, Tag, etc.
│   │   └── transitions/            # view-transition helpers
│   ├── pages/
│   │   ├── index.astro             # the bento wall (home)
│   │   ├── projects/[slug].astro   # project detail pages
│   │   ├── writing/[slug].astro
│   │   ├── places/index.astro      # full places map page
│   │   ├── gallery/index.astro     # full gallery page
│   │   ├── about.astro             # standalone about page (also used by popup)
│   │   └── contact.astro           # contact form (Netlify Forms)
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
  org: string,                     // institution / company
  period: { start: Date, end?: Date }, // end omitted = current
  location?: string,
  summary: string,
  links?: { label: string, url: string }[],
}
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

Type scale (pixels, rem in implementation):
- `display`: 56px / 1.05 / -0.02em — Lora 500
- `h1`: 40px / 1.1 / -0.015em — Lora 500
- `h2`: 28px / 1.2 — Lora 500
- `h3`: 20px / 1.3 — Geist 600
- `body`: 16px / 1.55 — Geist 400
- `small`: 14px / 1.5 — Geist 400
- `caption`: 12px / 1.4 / 0.02em uppercase — Geist Mono 400

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

## Sidebar

A single component, `src/components/sidebar/Sidebar.astro`, used in `Base.astro`. Marked `transition:persist="sidebar"` so it does not unmount across navigations — animations and state survive page changes.

Contents, top to bottom:
1. **Identity** — small avatar/initials + name + one-line role.
2. **Now snippet** — pulled from `src/data/now.ts`. Single sentence: what I'm working on, where I am, availability state. Updated by editing the file.
3. **Contacts cluster** — email, GitHub, LinkedIn, X, Scholar, etc. Icons only, with tooltip labels. From `src/data/contacts.ts`.
4. **Theme toggle** — sun/moon icon. Persists to `localStorage`. Reads `prefers-color-scheme` on first visit.
5. **Spotify widget** — embed of currently-playing or last-played. Use Spotify's official iframe embed (no API key, no backend). Lazy-loaded.

Style: glass surface, fixed left side on desktop (~280px wide), bottom drawer on mobile (or top hamburger — decide when we get there).

---

## Build order

This is the suggested phasing. Work top-down. Don't run ahead.

- [x] **Phase 0** — `pnpm create astro@latest`, Tailwind v4 install, design tokens scaffolded, fonts loaded, dark/light toggle works, `<ClientRouter />` enabled in `Base.astro`. _Done — commit `077bf71`._
- [x] **Phase 1** — Content collections defined in `src/content.config.ts` with schemas above. One sample entry per collection. _Done — commit `ccddd7f`._
- [x] **Phase 2** — Bento grid layout. 4-column wall (360 / 540 / 600 / 420 px) with per-column subgrids, 12 cells, real data + sparse stubs, proximity scroll snap, mobile re-ordering via CSS `order:`, scroll progress indicator, `role="region"` for keyboard a11y. New `.text-mono-small` type rung; `--glass-highlight` / `--glass-shadow` / `--on-cover` tokens. No transitions yet (Phase 4)._
- [x] **Phase 3** — Sidebar built and persisted. Identity (avatar + name + role), Now snippet with availability dot, public-audience contacts cluster (Tooltip-wrapped icon row), Spotify embed (iframe), theme toggle slotted in. Mobile = bottom drawer with Identity peek, scroll-position-preserving body lock, AbortController-managed listeners. Bento ContactsCell retired; AboutCell expanded to full col-1.
- [x] **Phase 4** — View Transitions. Card-to-detail morphs wired for projects (3-name: card/image/title), writing (2-name: card/title), gallery (2-name: card/image). Routes: /projects/[slug], /projects (list), /writing/[slug], /gallery/[slug]. Project detail uses a full-bleed split hero (cover left, meta right). Wall scrollLeft preserved across nav via sessionStorage. Cover-hue helper extracted to src/lib/cover-color.ts so source + destination gradients match continuously through the morph.
- [ ] **Phase 5** — Project detail pages. Layout, typography, transitions completing the round trip.
- [ ] **Phase 6** — Places: expandable world map. This is the highest-risk component — likely needs an island. Investigate `react-simple-maps` or a custom SVG world before committing. Reference: gianmarcocavallo.com.
- [ ] **Phase 7** — Gallery detail. Contact form (Netlify Forms). About popup.
- [ ] **Phase 8** — Polish: loading states, OG images, sitemap, RSS for `writing/`, accessibility audit, Lighthouse pass.
- [ ] **Phase 9** — Deploy to Netlify. Custom domain.

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

# format & lint (Prettier + ESLint, set up in Phase 0)
pnpm format
pnpm lint
```

---

## Deployment — Netlify

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
