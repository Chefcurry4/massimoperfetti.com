# Setup guide

Step-by-step for turning a fresh fork of this template into your site. Estimated time end-to-end: **~30 minutes** for someone comfortable with the terminal — the first-run checklist below is the load-bearing 10 minutes; the rest is content you'd write anyway.

> Skip ahead: [First-run checklist](#first-run-checklist) · [Identity](#identity) · [Theme presets](#theme-presets) · [Content collections](#content-collections) · [Images](#images) · [Fonts](#fonts) · [Deploy](#deploy)

---

## First-run checklist

Run these in order on a fresh fork. Each step is independent — if you skip one and run `pnpm dev`, the site still boots; you'll just see leftover example content.

### 1. Replace identity

Edit four files in `src/data/`. Each is a single TypeScript object with inline comments — no schemas to look up.

```sh
$EDITOR src/data/site.ts        # name, firstName, URL, description, author, locale, Spotify, Cal.com, newsletter
$EDITOR src/data/about.ts       # headline, role, body paragraphs, photos
$EDITOR src/data/now.ts         # current status, location, availability
$EDITOR src/data/contacts.ts    # email(s), GitHub, LinkedIn, CV link, newsletter
```

Tips:

- `firstName` is used in casual possessive copy ("Anna's calendar", "Anna replies within a few days"). Keep it short; `author` is the full display name.
- Set `bookingUrl` to an empty string if you don't use [Cal.com](https://cal.com) — the `/book` page will hide gracefully.
- Set `spotifyEmbedUrl` to an empty string to hide the sidebar Spotify widget.
- **Omit** the `newsletter` field entirely if you don't have one — the bento Writing cell adapts to a plain `/writing` entry point with no subscribe CTA.
- `audience: 'academic'` on a contact entry hides it from the sidebar's compact icon row but keeps it on the contact page.

### 2. Wipe the example content

```sh
# all collections at once
rm src/content/projects/*.{md,mdx}
rm src/content/work/*.md
rm src/content/writing/*.{md,mdx}
rm src/content/places/*.md
rm src/content/gallery/*.md
```

Drop in your own. Schemas live in [`src/content.config.ts`](src/content.config.ts) — the same file Astro uses to validate frontmatter at build time, so a missing required field fails loud at `pnpm dev`.

Minimal placeholders to get a building site immediately (copy these, fill in real content later):

```sh
cat > src/content/projects/hello.md <<'EOF'
---
title: "Hello"
slug: "hello"
summary: "Replace this with a real project summary in 1–2 sentences."
date: 2025-01-01
status: "live"
tags: ["placeholder"]
cover: "/me.webp"
featured: true
bentoSize: "lg"
---

Replace this body with your project case study.
EOF

cat > src/content/work/example.md <<'EOF'
---
title: "Engineer"
org: "Example Co."
period:
  start: 2024-01-01
summary: "What you did, in one sentence."
tags: ["placeholder"]
featured: true
---
EOF

cat > src/content/writing/first.md <<'EOF'
---
title: "First note"
slug: "first"
date: 2025-01-01
summary: "A short sentence that previews the note."
tags: ["placeholder"]
---

Replace this with a real note.
EOF
```

`places/` and `gallery/` are optional — if you delete every file in either collection, the corresponding bento cell renders an empty state and the index page (`/places`, `/gallery`) returns 404 cleanly.

### 3. Replace personal images

```sh
# the avatar shown in the sidebar
mv ~/Pictures/your-headshot.webp public/me.webp

# about-page photos (referenced from src/data/about.ts)
rm public/about/*.jpg
cp ~/Pictures/your-photo-*.jpg public/about/

# work logos (optional — gradient initials render automatically if missing)
rm public/work/*.svg
```

The architecture handles missing media: cells with no cover image render a `--gradient-cool` placeholder hue-shifted from the entry's title (see [`src/lib/cover-color.ts`](src/lib/cover-color.ts)). You'll never see a broken-icon state.

For the favicon: replace `public/favicon.ico` and `public/favicon.svg` with your own. [Squoosh](https://squoosh.app) and [RealFaviconGenerator](https://realfavicongenerator.net) both work.

### 4. Pick a theme preset

Edit one line in [`src/styles/global.css`](src/styles/global.css):

```css
/* before */
@import './themes/_default.css';

/* after — pick one */
@import './themes/_linen.css';
@import './themes/_sapphire.css';
@import './themes/_forest.css';
```

Hot-reload picks it up instantly. See [Theme presets](#theme-presets) below for what each preset looks like and how to write your own.

### 5. Update the `<head>` defaults

```sh
$EDITOR src/data/site.ts         # set `url` to your real domain
$EDITOR public/robots.txt        # update the sitemap URL
$EDITOR astro.config.mjs         # set `site:` to your real domain (sitemap base)
```

### 6. Boot it

```sh
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321). The wall renders. Scroll horizontally on desktop, vertically on mobile. Click a poster — it morphs into the detail page. Click "← back" — it morphs back.

If something looks wrong, run `pnpm check` — Astro's strict TypeScript checker catches schema mismatches in seconds.

---

## Identity

Single source of truth: `src/data/site.ts`. Every page reads from this object — when you change `site.author`, every `Made by …` line, every OG image alt, every contact-page footer follows.

```ts
export const site: SiteConfig = {
  name: 'Your Name',
  url: 'https://yourdomain.com',
  title: 'Your Name — Role',
  description: 'One sentence. The first thing search engines and AI agents read.',
  author: 'Your Name',
  firstName: 'Your',                // casual possessive copy ("Your's calendar" — pick something short)
  defaultOgImage: '/og/home.png',   // auto-generated at build time
  locale: 'en',
  spotifyEmbedUrl: '',              // optional
  bookingUrl: '',                   // optional
  // newsletter is optional — omit the field entirely if you don't have one.
  // newsletter: { title: 'Your Newsletter', url: 'https://yours.beehiiv.com' },
};
```

`SiteConfig` is fully typed — your editor will autocomplete every field and flag missing ones.

---

## Theme presets

The design is fully tokenized in [`src/styles/tokens.css`](src/styles/tokens.css). Presets in [`src/styles/themes/`](src/styles/themes/) override 9 palette tokens — `--bg`, `--surface`, `--text`, `--text-muted`, `--accent`, `--border`, `--border-strong`, `--border-hover`, `--hover-shadow` — for both light and dark mode. Everything else (status colors, gradient, glass recipe, motion) is preset-invariant, so a new preset is one self-contained ~40-line file.

Bundled presets:

| Preset | Vibe | Dark accent | Light accent |
|---|---|---|---|
| `_default` | Editorial neon-on-coal | `#d4ff3a` (lime-yellow) | `#1a4dff` (electric blue) |
| `_linen` | Warm cream + ink | Deep amber | Burnt sienna |
| `_sapphire` | Deep blue + bone | Pale gold | Royal blue |
| `_forest` | Mossy green + parchment | Bright moss | Forest |

To write your own:

```sh
cp src/styles/themes/_default.css src/styles/themes/_yours.css
$EDITOR src/styles/themes/_yours.css     # edit the 9 palette tokens, both modes
```

Then point `global.css` at it:

```css
@import './themes/_yours.css';
```

The token discipline is enforced by stylelint — `pnpm lint:css` will yell if you hardcode a hex color anywhere outside `tokens.css` or `themes/*.css`. Trust it; it's saved me from regressions twice.

---

## Content collections

Five collections, all defined in [`src/content.config.ts`](src/content.config.ts) with strict Zod schemas:

| Collection | Path | Format | Drives |
|---|---|---|---|
| `projects` | `src/content/projects/*.{md,mdx}` | Markdown / MDX | `/projects/[slug]`, bento grid, `/projects` index, RSS-eligible |
| `work` | `src/content/work/*.md` | Markdown | `/work/[slug]`, bento grid, `/work` index |
| `writing` | `src/content/writing/*.{md,mdx}` | Markdown / MDX | `/writing/[slug]`, bento Writing cell links to your newsletter |
| `places` | `src/content/places/*.md` | Frontmatter-only | `/places` world map + index |
| `gallery` | `src/content/gallery/*.md` | Frontmatter-only | `/gallery`, `/gallery/[slug]`, bento auto-cycling cell |

For each, the schema is enforced at build — you literally cannot deploy a broken entry. Open the schema file once, then keep an existing entry open as a template and fill in your own.

### MDX body components

For richer project case studies, write `.mdx` and import the editorial components at the top:

```mdx
---
title: "My project"
# ... rest of frontmatter
---
import Figure from '../../components/mdx/Figure.astro';
import Pullquote from '../../components/mdx/Pullquote.astro';
import Aside from '../../components/mdx/Aside.astro';

# Heading

The first paragraph gets a drop cap automatically — no markup needed.

<Figure src="/projects/foo/diagram.png" alt="..." caption="..." aspect="16/9" />

<Pullquote attribution="thesis notes">
  A line worth pulling out of the body.
</Pullquote>
```

Default markdown elements (`>` blockquote, `---` hr, headings, lists, code, links) get the editorial `.prose` treatment automatically. See [`src/styles/global.css`](src/styles/global.css) `.prose` rules.

---

## Images

All images live under `public/` (served verbatim) or `src/assets/` (processed by Astro's image pipeline).

Naming convention used by the live site, not enforced anywhere:

```
public/
├── me.webp                       # sidebar avatar
├── favicon.{ico,svg}
├── robots.txt
├── about/                        # photos referenced from src/data/about.ts
├── projects/{slug}/              # project covers + body images
├── work/                         # work logos (optional)
├── places/{slug}/                # photos for /places/[slug] (none of the sample entries use these)
└── gallery/                      # photo originals (referenced from src/content/gallery/*.md)
```

Convert big JPGs to WebP before committing — `pnpm images:webp` walks `public/` and emits `.webp` siblings via [`sharp`](https://sharp.pixelplumbing.com). The script is idempotent.

Missing media is handled gracefully: every cover/avatar/logo has a gradient fallback, and broken paths log a warning at build but don't fail the build.

---

## Fonts

Fonts load via [Fontsource](https://fontsource.org). Currently bundled (in `package.json`):

- Lora Variable — display / titles
- Geist Variable — body / UI
- Geist Mono Variable — captions / code

To swap a family:

```sh
pnpm remove @fontsource-variable/lora
pnpm add @fontsource-variable/source-serif-4   # for example
```

Then update one line in [`src/styles/tokens.css`](src/styles/tokens.css):

```css
--font-display: "Source Serif 4 Variable", ui-serif, Georgia, serif;
```

And import the new package in [`src/layouts/Base.astro`](src/layouts/Base.astro) where the Fontsource imports live.

Self-hosting is non-negotiable — Google Fonts CDN couples your site to a third party and leaks visitor IPs. Don't.

---

## Deploy

### Netlify (recommended, what the live site uses)

1. Push your fork to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com), "Add new site" → "Import from Git" → pick the repo.
3. Netlify reads [`netlify.toml`](netlify.toml) — build command, publish directory, Node version. Don't override.
4. Click "Deploy". First build takes ~25 s.
5. Add your custom domain in Netlify → Domains. DNS records: one `CNAME` to `<site>.netlify.app`, or two `A` records if apex.

The contact form at `/contact` works automatically — Netlify Forms is declarative, no code or env vars. Submissions appear in your Netlify dashboard. Honeypot is wired in [`src/pages/contact.astro`](src/pages/contact.astro).

### Vercel / Cloudflare Pages

Both work — Astro builds to plain static `dist/`. The contact form won't work without porting to a serverless function (or you can swap to [Formspree](https://formspree.io) / [Basin](https://usebasin.com) — change the `<form>` action in `src/pages/contact.astro`).

### Optional integrations

| Service | Used by | Setup |
|---|---|---|
| [Cal.com](https://cal.com) | `/book`, sidebar Book CTA | Create an event type, paste its public URL into `site.bookingUrl`. |
| [Spotify](https://open.spotify.com) | sidebar widget | Use any embed URL — playlist, album, track. Pattern: `https://open.spotify.com/embed/playlist/{id}`. |
| Newsletter (e.g. [beehiiv](https://beehiiv.com)) | bento Writing cell | Paste your newsletter URL into `site.newsletter.url`. |

Every integration is opt-out — leave the URL empty in `site.ts` and the corresponding surface hides itself.

---

## What stays Massimo's

The repo is MIT-licensed for **code**. The following are not yours to republish:

- Anything under `src/content/*` — case studies, notes, place descriptions, gallery captions.
- Photos under `public/about/`, `public/me.webp`, `public/work/`.
- The OG-image generator's text content (auto-generated from your `site.ts`, but the original copy is Massimo's).

If you keep the example content while you're scaffolding, that's fine — replace it before you publish. See [`src/content/LICENSE-CONTENT.md`](src/content/LICENSE-CONTENT.md).

---

## Troubleshooting

- **`pnpm check` fails on a content entry.** The error message includes the file path and the failing field — the Zod schema is your contract. Open [`src/content.config.ts`](src/content.config.ts) and the failing file side by side.
- **Theme toggle doesn't persist.** Clear `localStorage` for the dev origin once; it stores `theme` and reads on first paint.
- **View Transitions don't fire.** Check that `<ClientRouter />` is still imported in [`src/layouts/Base.astro`](src/layouts/Base.astro). Without it, navigation is a hard reload and `transition:name` is a no-op.
- **Contact form 404s in dev.** Expected — Astro's dev server doesn't intercept POST. The form works on the deployed Netlify build.
- **A logo is missing for a work entry.** Either set `logo: '/work/your-logo.svg'` in the entry's frontmatter, or do nothing and the monogram fallback (initials over `--gradient-cool`) renders. Bespoke inline-SVG logos go in [`src/components/work/logos/`](src/components/work/logos/) and dispatch by slug from [`WorkLogo.astro`](src/components/work/WorkLogo.astro).
- **The welcome PR didn't open on your fresh fork.** Check repo Settings → Actions → General → "Workflow permissions". It must be set to **"Read and write permissions"** for [`peter-evans/create-pull-request`](https://github.com/peter-evans/create-pull-request) to open the PR. If you only just flipped the setting, manually re-trigger via Actions → "Template welcome (one-shot)" → "Run workflow".

Anything else: [open a `template-question` issue](https://github.com/Chefcurry4/massimoperfetti.com/issues/new?template=template-question.md).
