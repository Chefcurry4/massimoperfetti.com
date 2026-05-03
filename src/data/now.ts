/**
 * Singleton: "now" snippet. Surfaced in the persistent sidebar (Phase 3).
 * One sentence on what is happening right now: project, location, availability.
 *
 * Update by editing this file. Bump `updatedAt` whenever the line changes —
 * the sidebar surfaces "Last updated <relative>".
 */

export interface NowSnippet {
  readonly status: string;
  readonly location: string;
  readonly availability: 'available' | 'limited' | 'unavailable';
  readonly updatedAt: string;
}

export const now: NowSnippet = {
  status: 'Writing my master thesis on AI × CFD at the MIT van Rees Lab.',
  location: 'Cambridge, MA',
  availability: 'limited',
  updatedAt: '2026-05-03',
};
