# Content license

Everything under the following paths is **personal content authored by Massimo Perfetti**, not template scaffolding:

- `src/content/projects/**` — project case studies and writeups.
- `src/content/work/**` — role descriptions and case studies.
- `src/content/writing/**` — notes and essays.
- `src/content/places/**` — place descriptions and travel notes.
- `src/content/gallery/**` — photo captions and metadata.
- `src/data/about.ts` — the about-page body copy.
- `src/assets/me.webp`, `src/assets/in.png`, `src/assets/gallery/**`, `public/work/**` — personal photographs and bespoke logos. (Note: third-party org logos under `public/work/` belong to their respective owners and are used here under fair use; they are not redistributable under either license.)

These are licensed under [Creative Commons BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

## What that means in plain English

You are free to:

- **Read** the content.
- **Study** how it's structured, what kinds of fields it uses, what it looks like rendered. This is why the example content stays in the template — so forkers can see a fully populated site.
- **Quote** short excerpts in articles, social posts, or reviews, with attribution.

You may not, without explicit written permission from Massimo:

- Republish the content on your own site or anywhere else.
- Use it commercially.
- Create derivative works (e.g. translations, edits, "remixes" of the writing).
- Pass it off as your own.

In particular, **do not deploy a fork of this repo with the example content still in place under your name.** That includes the project case studies, work entries, writing notes, place descriptions, gallery captions, the about-page body, and Massimo's personal photographs.

Replace the content with your own before you publish. The [SETUP.md](../../SETUP.md) first-run checklist walks through exactly which files to wipe.

## What is freely reusable

Everything **outside** the directories listed above — the Astro components, layouts, styles, scripts, configuration, schema definitions in `src/content.config.ts`, the design tokens in `src/styles/tokens.css`, the documentation files at the repo root — is MIT-licensed. See [`LICENSE`](../../LICENSE).

## Why two licenses

Code lives forever in derivative works; that's the point of MIT. Personal writing about your own thesis or your own travel doesn't transfer the same way — if I MIT'd this content, anyone could publish a verbatim copy under their name and it would be technically fine. CC BY-NC-ND is the standard separation: code is shared, voice is reserved.

This is the same model used by many engineer-author personal sites. If you want to use a piece of writing from this repo for something specific, [open an issue](https://github.com/Chefcurry4/website/issues/new) and ask. Most of the time the answer is yes with attribution.
