/**
 * Cover-color helper — deterministic OKLCH hue pair for a given title.
 *
 * Used by:
 *   - src/components/bento/ProjectsCell.astro (bento card cover)
 *   - src/components/bento/GalleryCell.astro  (bento gallery frame)
 *   - src/pages/projects/[slug].astro         (detail page hero cover)
 *   - src/pages/gallery/[slug].astro          (detail page hero cover)
 *
 * Source and destination must agree on the hues so the View Transitions morph
 * (Phase 4) interpolates the cover continuously instead of cross-fading
 * through a different color.
 */

export function hashHue(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

export interface CoverHues {
  readonly hue: number;
  readonly hueAlt: number;
}

/**
 * Two hues: a primary derived from the title hash and a complementary
 * secondary 40° away for the gradient endpoints.
 */
export function coverHues(input: string): CoverHues {
  const hue = hashHue(input);
  return { hue, hueAlt: (hue + 40) % 360 };
}

/**
 * Returns the inline `style` string used to seed a cover's gradient via
 * CSS custom properties. Keeps the gradient definition itself in CSS
 * (theme-friendly) while letting the entry data parameterize the hue.
 */
export function coverHueVars(input: string): string {
  const { hue, hueAlt } = coverHues(input);
  return `--hue: ${hue}; --hue-alt: ${hueAlt};`;
}
