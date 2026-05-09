Gallery photos live here as `.webp` only.

The site reads each markdown entry's `image:` path under
src/content/gallery/ and serves the matching file from this folder. If a
file is missing, the page falls back to a gradient placeholder (no
broken-image icon).

Workflow when adding a new photo:

  1. Drop the JPEG / JPG / PNG export into this folder. It's transient —
     a build input, not a tracked source.
  2. Run `pnpm images:webp` — converts every JPEG in /public/gallery (and
     /public/me.jpeg if present) to a sibling .webp at q75, max-width 1400.
  3. Delete the JPEG. Only the .webp ships.
  4. Add or update a markdown entry under src/content/gallery/ with
     `image: '/gallery/<filename>.webp'`.

The bento cell preloads the next photo each cycle; target ~150 KB per
.webp where you can. Keep your high-fidelity originals (RAW, full-res
JPEG) somewhere outside the repo — these .webps are exports, not masters.

Currently expected (referenced by markdown):
  III.webp
  boston-charles-skyline.webp
  lake-leman-aerial.webp
  maremma-beach.webp
  viareggio-apuan-alps.webp
