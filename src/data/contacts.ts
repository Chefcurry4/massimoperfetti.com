/**
 * Singleton: contact channels. Surfaced in the sidebar (Phase 3) and on the
 * Contacts bento cell. Order is presentation order — most-preferred first.
 *
 * `audience` lets the sidebar filter to public-only contacts (icons-only space
 * is tight) while the contact page can render the full list including academic
 * emails.
 */

// Kinds map 1:1 to icon paths in ContactsCluster.astro — add the icon
// there when adding a kind here. ('x' and 'scholar' were removed as dead:
// no contact entry used them and the x icon was a plain ✕, not the logo.)
export type ContactKind =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'cv'
  | 'newsletter';

export type ContactAudience = 'public' | 'academic';

export interface Contact {
  readonly kind: ContactKind;
  readonly label: string;
  readonly handle: string;
  readonly url: string;
  readonly audience?: ContactAudience; // default: 'public'
}

export const contacts: readonly Contact[] = [
  {
    kind: 'email',
    label: 'Email',
    handle: 'massimoperfetti4@gmail.com',
    url: 'mailto:massimoperfetti4@gmail.com',
  },
  {
    kind: 'email',
    label: 'Email (MIT)',
    handle: 'massip77@mit.edu',
    url: 'mailto:massip77@mit.edu',
    audience: 'academic',
  },
  {
    kind: 'email',
    label: 'Email (TU Delft)',
    handle: 'm.perfetti@student.tudelft.nl',
    url: 'mailto:m.perfetti@student.tudelft.nl',
    audience: 'academic',
  },
  {
    kind: 'github',
    label: 'GitHub',
    handle: '@Chefcurry4',
    url: 'https://github.com/Chefcurry4',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    handle: 'mperfetti4',
    url: 'https://www.linkedin.com/in/mperfetti4/',
  },
  // CV entry disabled until the PDF actually exists — public/cv/ contains
  // only a README, so this link 404'd from the persistent sidebar on every
  // page. Drop the file at public/cv/Perfetti%20Resume.pdf (URL-encoded
  // space) and uncomment to restore the sidebar icon.
  // {
  //   kind: 'cv',
  //   label: 'CV (PDF)',
  //   handle: 'download',
  //   url: '/cv/Perfetti%20Resume.pdf',
  // },
  {
    kind: 'newsletter',
    label: 'Newsletter',
    handle: 'perfettis-notes',
    url: 'https://perfettis-notes.beehiiv.com',
  },
];
