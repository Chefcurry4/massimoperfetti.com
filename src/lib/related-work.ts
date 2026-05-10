/**
 * Related-work scoring — pure function, tag-overlap based.
 *
 * Mirrors `src/lib/related-projects.ts`. Used by
 * `src/components/detail/RelatedWork.astro` to surface 1–2 sibling roles at
 * the bottom of `/work/[slug]` without requiring a curated `related: …` field.
 */

import type { CollectionEntry } from 'astro:content';
import { periodSortKey } from './period';

type WorkEntry = CollectionEntry<'work'>;

interface Scored {
  readonly entry: WorkEntry;
  readonly score: number;
}

export function relatedWork(
  current: WorkEntry,
  all: readonly WorkEntry[],
  max = 3,
): readonly WorkEntry[] {
  const currentTags = new Set(current.data.tags);

  const scored: Scored[] = all
    .filter((e) => e.id !== current.id && !e.data.draft)
    .map((entry) => {
      let score = 0;
      for (const tag of entry.data.tags) {
        if (currentTags.has(tag)) score += 1;
      }
      return { entry, score };
    })
    .filter((s) => s.score > 0);

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return periodSortKey(b.entry.data.period) - periodSortKey(a.entry.data.period);
  });

  return scored.slice(0, max).map((s) => s.entry);
}
