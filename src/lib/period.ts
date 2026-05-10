/**
 * Helpers for formatting and sorting work-entry periods.
 *
 * Centralized here so the schema-side decision to make `period.start`
 * optional only has one place to enforce its meaning:
 *
 *   - missing start  → currently active with no historical anchor; the label
 *                      reads simply "Present" and the sort key is "now",
 *                      which puts the entry at the top of date-desc lists.
 *   - start, no end  → "Mon YYYY — Present"
 *   - start and end  → "Mon YYYY — Mon YYYY"
 */

interface PeriodLike {
  readonly start?: Date;
  readonly end?: Date;
}

function fmt(d: Date): string {
  // Format in UTC: YAML dates like `2026-04-01` parse as UTC midnight, and
  // formatting in the build machine's local timezone (Eastern, UTC-4/5) would
  // shift them back a day → "Mar 2026" for what the file declares as April.
  // Pinning to UTC keeps the rendered month identical to the YAML date.
  return d.toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatPeriod(period: PeriodLike): string {
  if (!period.start) return 'Present';
  return `${fmt(period.start)} — ${period.end ? fmt(period.end) : 'Present'}`;
}

/** Numeric key for date-desc sorts; missing start is treated as "now". */
export function periodSortKey(period: PeriodLike): number {
  return period.start ? period.start.getTime() : Date.now();
}
