Gallery photos live here as `.webp` only.

These files are processed by Astro's image pipeline (`astro:assets`) at
build time, which emits AVIF + WebP variants at multiple widths with a
`srcset` per consumer. That's why they live under `src/assets/` (which
Astro processes) instead of `/public/` (passthrough only — no srcset,
no AVIF, no responsive widths).

Each markdown entry under `src/content/gallery/` references the file via
a relative path:

  image: '../../assets/gallery/<filename>.webp'

The schema (src/content.config.ts) uses Astro's `image()` helper, so the
field validates as ImageMetadata at build time and the consumer
(<Image src={entry.data.image}>) gets a typed asset.

Workflow when adding a new photo:

  1. Drop the JPEG / JPG / PNG export anywhere outside the repo first.
  2. Convert to .webp at quality 75 — running scripts/images-to-webp.mjs
     against a temporary input dir is the easiest path. Aim for
     ~150–250KB per .webp (target ~1400px on the long edge).
  3. Move the .webp into this folder.
  4. Add or update the markdown entry under src/content/gallery/ with
     image: '../../assets/gallery/<filename>.webp'

Astro's pipeline does NOT generate sources for files in /public — they
ship as-is. The AboutCell portraits (src/assets/me.webp + in.png) also
go through the pipeline, via src/lib/portraits.ts.

Currently expected (referenced by markdown):
  III.webp
  boston-charles-skyline.webp
  lake-leman-aerial.webp
  maremma-beach.webp
  viareggio-apuan-alps.webp
