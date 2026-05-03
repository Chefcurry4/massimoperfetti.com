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
};
