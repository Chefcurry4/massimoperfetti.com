/**
 * Schema.org / JSON-LD builders. Helpers are small and explicit on purpose —
 * AI agents and search engines parse this verbatim, so silent inference is
 * worse than a slightly verbose call site.
 *
 * Reference: https://schema.org and https://developers.google.com/search/docs/appearance/structured-data
 */
import { site } from '../data/site';
import { contacts } from '../data/contacts';
import { about } from '../data/about';

const absolute = (path: string): string => new URL(path, site.url).toString();

/**
 * `sameAs` per schema.org Person — list of canonical profile URLs that
 * identify the same entity. We deliberately exclude `mailto:` (`email` field
 * carries that), the local CV file (not a profile), and academic emails
 * (audience: 'academic' is filtered for the public-facing site).
 */
const personSameAs: readonly string[] = contacts
  .filter((c) => c.audience !== 'academic')
  .filter((c) => c.kind === 'github' || c.kind === 'linkedin' || c.kind === 'newsletter')
  .map((c) => c.url);

// Schema.org Person.email expects the bare address; the contacts list
// stores the `mailto:` URL for direct anchor use elsewhere, so strip it.
const personEmail = contacts.find(
  (c) => c.kind === 'email' && c.audience !== 'academic',
)?.handle;

interface PersonSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Person';
  readonly '@id': string;
  readonly name: string;
  readonly url: string;
  readonly image: string;
  readonly jobTitle: string;
  readonly description: string;
  readonly email?: string;
  readonly worksFor: { readonly '@type': 'Organization'; readonly name: string };
  readonly alumniOf: readonly { readonly '@type': 'CollegeOrUniversity'; readonly name: string }[];
  readonly knowsAbout: readonly string[];
  readonly sameAs: readonly string[];
}

export function personSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.author,
    url: site.url,
    image: absolute('/me.webp'),
    jobTitle: about.role,
    description: site.description,
    email: personEmail,
    worksFor: { '@type': 'Organization', name: 'MIT van Rees Lab' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Massachusetts Institute of Technology' },
      { '@type': 'CollegeOrUniversity', name: 'Delft University of Technology' },
      { '@type': 'CollegeOrUniversity', name: 'EPFL' },
      { '@type': 'CollegeOrUniversity', name: 'Politecnico di Torino' },
    ],
    knowsAbout: [
      'Computational Fluid Dynamics',
      'Machine Learning',
      'Mechanical Engineering',
      'Multiphase flows',
      'Full-stack development',
      'Agrivoltaics',
    ],
    sameAs: personSameAs,
  };
}

interface WebSiteSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'WebSite';
  readonly '@id': string;
  readonly url: string;
  readonly name: string;
  readonly description: string;
  readonly inLanguage: string;
  readonly author: { readonly '@id': string };
}

export function webSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.locale,
    author: { '@id': `${site.url}/#person` },
  };
}

interface ArticleInput {
  readonly title: string;
  readonly summary: string;
  readonly url: string;
  readonly datePublished: Date;
  readonly tags?: readonly string[];
  readonly image?: string;
}

interface ArticleSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Article';
  readonly headline: string;
  readonly description: string;
  readonly url: string;
  readonly datePublished: string;
  readonly inLanguage: string;
  readonly image?: string;
  readonly keywords?: string;
  readonly mainEntityOfPage: { readonly '@type': 'WebPage'; readonly '@id': string };
  readonly author: { readonly '@id': string };
  readonly publisher: { readonly '@id': string };
}

export function articleSchema(input: ArticleInput): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.summary,
    url: input.url,
    datePublished: input.datePublished.toISOString(),
    inLanguage: site.locale,
    image: input.image ? absolute(input.image) : undefined,
    keywords: input.tags && input.tags.length > 0 ? input.tags.join(', ') : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    author: { '@id': `${site.url}/#person` },
    publisher: { '@id': `${site.url}/#person` },
  };
}

interface CreativeWorkInput {
  readonly title: string;
  readonly summary: string;
  readonly url: string;
  readonly dateCreated: Date;
  readonly status: 'live' | 'archived' | 'in-progress';
  readonly tags?: readonly string[];
  readonly image?: string;
  readonly externalLinks?: readonly string[];
}

interface CreativeWorkSchema {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'CreativeWork';
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly dateCreated: string;
  readonly inLanguage: string;
  readonly creativeWorkStatus: string;
  readonly image?: string;
  readonly keywords?: string;
  readonly sameAs?: readonly string[];
  readonly mainEntityOfPage: { readonly '@type': 'WebPage'; readonly '@id': string };
  readonly creator: { readonly '@id': string };
}

export function creativeWorkSchema(input: CreativeWorkInput): CreativeWorkSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.summary,
    url: input.url,
    dateCreated: input.dateCreated.toISOString(),
    inLanguage: site.locale,
    creativeWorkStatus: input.status,
    image: input.image ? absolute(input.image) : undefined,
    keywords: input.tags && input.tags.length > 0 ? input.tags.join(', ') : undefined,
    sameAs: input.externalLinks && input.externalLinks.length > 0 ? input.externalLinks : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    creator: { '@id': `${site.url}/#person` },
  };
}
