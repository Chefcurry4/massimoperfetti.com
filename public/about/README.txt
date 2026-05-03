Drop the three /about photos here with these exact filenames:

  mountains.jpg   — Apuan Alps view (landscape, ~3:4 or 4:3)
  orcas.jpg       — pod of killer whales (landscape)
  team-usa.jpg    — LeBron + Curry, Team USA (portrait)

The page uses lazy loading + a CSS gradient fallback, so missing files
won't break the layout — slots will just show the gradient placeholder.

If you want different filenames or to add more photos, edit the
`photos` array in src/data/about.ts and the page will pick them up.

Tip: keep each file under ~400 KB. A 1200px-wide JPEG at quality ~80
is plenty for the small frame (~220px on desktop, ~320px on mobile).
You can convert with:
  magick input.jpg -resize 1200x -quality 80 output.jpg
