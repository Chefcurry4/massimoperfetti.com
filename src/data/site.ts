/**
 * Site-wide configuration. Single source of truth for metadata, owner, and
 * canonical links. Imported by `Base.astro` for <head> tags and by sidebar
 * components in later phases.
 *
 * Domain is a placeholder — confirm before deploy.
 */

export interface SocialLink {
  readonly label: string;
  readonly handle: string;
  readonly url: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly defaultOgImage: string;
  readonly locale: string;
  /**
   * Spotify oEmbed URL for the sidebar widget. Convert any
   * `open.spotify.com/playlist/{id}` link to `open.spotify.com/embed/playlist/{id}`
   * — the host accepts the embed path verbatim, no token, no API.
   */
  readonly spotifyEmbedUrl: string;
  /**
   * Cal.com booking URL — the public event-type link. Massimo's Cal.com
   * account owns the Google Calendar OAuth so this site stays static (no
   * functions, no token storage). Used by /book and the sidebar Book CTA.
   *
   * Replace the slug below with the real cal.com URL after the account is
   * created. `theme=auto` lets the embed match the visitor's system theme.
   */
  readonly bookingUrl: string;
}

export const site: SiteConfig = {
  name: 'Massimo Perfetti',
  url: 'https://massimoperfetti.com',
  title: 'Massimo Perfetti',
  description:
    'Researcher at MIT van Rees Lab. AI × CFD, full-stack, founder. MSc at MIT and TU Delft.',
  author: 'Massimo Perfetti',
  defaultOgImage: '/og-default.png',
  locale: 'en',
  spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/382H8jrG9erCxwOiL6naNd',
  bookingUrl: 'https://app.cal.com/massimo-perfetti',
};
