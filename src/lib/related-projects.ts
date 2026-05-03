/**
 * Related-projects scoring — pure function, tag-overlap based.
 *
 * Used by `src/components/detail/RelatedProjects.astro` (Phase 5) to surface
 * 2–3 sibling projects at the bottom of `/projects/[slug]` without requiring
 * a curated `related: [slug, slug]` field in the schema.
 *
 * Algorithm:
 *   1. Filter `all` to non-draft entries excluding `current`.
 *   2. Score each remaining entry by the count of tags it shares with
 *      `current`.
 *   3. Drop entries with score 0 (no overlap = not related).
 *   4. Sort by score desc, then by date desc as the tiebreaker.
 *   5. Return up to `max` entries.
 *
 * If the collection grows large the O(n × tags) cost is fine — `getCollection`
 * already realises every entry server-side at build time.
 */

import type { CollectionEntry } from 'astro:content';

type ProjectEntry = CollectionEntry<'projects'>;

interface Scored {
  readonly entry: ProjectEntry;
  readonly score: number;
}

export function relatedProjects(
  current: ProjectEntry,
  all: readonly ProjectEntry[],
  max = 3,
): readonly ProjectEntry[] {
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
    return b.entry.data.date.getTime() - a.entry.data.date.getTime();
  });

  return scored.slice(0, max).map((s) => s.entry);
}
