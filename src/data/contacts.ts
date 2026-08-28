/**
 * Singleton: contact channels. Surfaced in the sidebar (Phase 3) and on the
 * Contacts bento cell. Order is presentation order — most-preferred first.
 *
 * `audience` lets the sidebar filter to public-only contacts (icons-only space
 * is tight) while the contact page can render the full list including academic
 * emails.
 */

// Kinds map 1:1 to icon paths in ContactsCluster.astro — add the icon
// there when adding a kind here.
export type ContactKind = "email" | "github" | "linkedin" | "x" | "cv";

export type ContactAudience = "public" | "academic";

export interface Contact {
  readonly kind: ContactKind;
  readonly label: string;
  readonly handle: string;
  readonly url: string;
  readonly audience?: ContactAudience; // default: 'public'
}

export const contacts: readonly Contact[] = [
  {
    kind: "email",
    label: "Email",
    handle: "massimoperfetti4@gmail.com",
    url: "mailto:massimoperfetti4@gmail.com",
  },
  {
    kind: "email",
    label: "Email (MIT)",
    handle: "massip77@mit.edu",
    url: "mailto:massip77@mit.edu",
    audience: "academic",
  },
  {
    kind: "email",
    label: "Email (TU Delft)",
    handle: "m.perfetti@student.tudelft.nl",
    url: "mailto:m.perfetti@student.tudelft.nl",
    audience: "academic",
  },
  {
    kind: "github",
    label: "GitHub",
    handle: "@Chefcurry4",
    url: "https://github.com/Chefcurry4",
  },
  {
    kind: "linkedin",
    label: "LinkedIn",
    handle: "mperfetti4",
    url: "https://www.linkedin.com/in/mperfetti4/",
  },
  {
    kind: "x",
    label: "X",
    handle: "@chefcurry4L",
    url: "https://x.com/chefcurry4L",
  },
  {
    kind: "cv",
    label: "CV (PDF)",
    handle: "download",
    // Served from public/cv/ — the space in the filename is URL-encoded so
    // the link is unambiguous across browsers. Rename both the file on disk
    // and this URL together.
    url: "/cv/Perfetti%20Resume.pdf",
  },
  // The newsletter icon was retired from the sidebar row (2026-08) — the
  // newsletter keeps its dedicated surface in the bento WritingCell via
  // site.newsletter, which is a better pitch than an unlabeled icon.
];
