/**
 * One-shot JPEG → WebP converter.
 *
 * Reads `public/me.jpeg` and `public/gallery/*.jpeg`, writes a sibling
 * `.webp` for each at quality 75, max-width 1400. JPEGs in /public are
 * transient inputs — delete them after conversion (only the .webp ships).
 *
 * Run with: `pnpm images:webp` (or `node scripts/images-to-webp.mjs`).
 *
 * Output sizing:
 *   Gallery feed thumbnails want a 800px-square crop max; bento cell
 *   shows ~360px wide; fullscreen wants the long edge ~2400. Generating
 *   one width=2000 webp covers all three cases via object-fit and is
 *   small enough that LCP improves substantially over the 320KB jpeg.
 *
 * me.jpeg is the AboutCell portrait: rendered ~360x540, so width=1080
 * (2x retina) is plenty.
 */

import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

// Gallery max-width 1400 covers fullscreen view (max-width: 1280px on
// /gallery/[slug]) without shipping 2x retina pixels for a bento tile that
// renders ~360px wide. Quality 75 — re-encodes the source JPEGs (already
// heavily compressed) into smaller webps that look indistinguishable at
// the rendered sizes. me.jpeg ships at 1080 (2x retina for the AboutCell
// portrait at ~360x540).
const TARGETS = [
  { dir: 'public/gallery', maxWidth: 1400, quality: 75 },
  { dir: 'public', maxWidth: 1080, quality: 85, only: ['me.jpeg'] },
];

async function convertOne(inputPath, maxWidth, quality) {
  const { dir, name } = parse(inputPath);
  const outputPath = join(dir, `${name}.webp`);
  const inputBytes = (await stat(inputPath)).size;
  await sharp(inputPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(outputPath);
  const outputBytes = (await stat(outputPath)).size;
  const saved = Math.round((1 - outputBytes / inputBytes) * 100);
  console.log(
    `${inputPath.padEnd(48)}  ${(inputBytes / 1024).toFixed(0).padStart(4)}KB → ${(outputBytes / 1024).toFixed(0).padStart(4)}KB  (-${saved}%)`,
  );
}

async function run() {
  for (const { dir, maxWidth, quality, only } of TARGETS) {
    let entries;
    if (only) {
      entries = only;
    } else {
      entries = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f));
    }
    for (const file of entries) {
      const full = join(dir, file);
      try {
        await convertOne(full, maxWidth, quality);
      } catch (err) {
        console.error(`failed: ${full}`, err.message);
      }
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
