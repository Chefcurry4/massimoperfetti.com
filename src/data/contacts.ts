/**
 * Singleton: contact channels. Surfaced in the sidebar (Phase 3) and on the
 * Contacts bento cell. Order is presentation order — most-preferred first.
 */

export type ContactKind =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'x'
  | 'scholar'
  | 'cv';

export interface Contact {
  readonly kind: ContactKind;
  readonly label: string;
  readonly handle: string;
  readonly url: string;
}

export const contacts: readonly Contact[] = [
  {
    kind: 'email',
    label: 'Email',
    handle: 'massimoperfetti4@gmail.com',
    url: 'mailto:massimoperfetti4@gmail.com',
  },
  // Placeholders — confirm handles before launch.
  {
    kind: 'github',
    label: 'GitHub',
    handle: '@massimoperfetti',
    url: 'https://github.com/massimoperfetti',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    handle: 'massimoperfetti',
    url: 'https://www.linkedin.com/in/massimoperfetti',
  },
];
