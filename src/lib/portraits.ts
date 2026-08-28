/**
 * Portrait variants for the AboutCell / Base preloads — single source of
 * truth for the getImage() parameters so the preload <link> in Base.astro
 * and the CSS background in AboutCell.astro can never drift apart.
 *
 * Both run at build time only; Astro dedupes identical getImage() calls,
 * so calling these from multiple components costs nothing.
 */
import { getImage } from 'astro:assets';
import type { GetImageResult } from 'astro';
import portraitDesktopSrc from '../assets/me.webp';
import portraitMobileSrc from '../assets/in.png';

/**
 * Desktop bento portrait — painted into a fixed 280×280 box in AboutCell;
 * 560px covers 2× DPR. Source is 1080×774, so this roughly quarters the
 * bytes of the old pass-through /public copy.
 */
export function getPortraitDesktop(): Promise<GetImageResult> {
  return getImage({ src: portraitDesktopSrc, width: 560, format: 'webp' });
}

/**
 * Mobile bento portrait — full-width 1:1 cell below 1024px. Source is
 * 800×800; requesting exactly 800 avoids the upscale-to-1200 the previous
 * inline call did (an upscaled webp is all bytes, no detail).
 */
export function getPortraitMobile(): Promise<GetImageResult> {
  return getImage({ src: portraitMobileSrc, width: 800, format: 'webp' });
}
