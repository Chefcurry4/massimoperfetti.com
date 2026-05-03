/**
 * Singleton: about content. Used by the bento `AboutCell` and the standalone
 * `/about` page. Edit here, not in markdown — this changes too rarely to
 * deserve a content collection.
 *
 * `body` paragraphs render in order. `photos` are interleaved into the page
 * layout in the order they appear; CSS handles placement (alternating sides
 * on desktop, inline between paragraphs on mobile).
 */

export interface AboutPhoto {
  /** Path relative to /public, e.g. '/about/mountains.jpg'. */
  readonly src: string;
  readonly alt: string;
  /** Short editorial caption — mono small under the image. */
  readonly caption: string;
  /** Layout hint so the page can size the slot ahead of image load. */
  readonly aspect: 'landscape' | 'portrait';
}

export interface About {
  readonly headline: string;
  /** Single-line role/affiliation summary surfaced on the AboutCell. */
  readonly role: string;
  readonly body: readonly string[];
  readonly photos: readonly AboutPhoto[];
}

export const about: About = {
  headline:
    'Mechanical Engineer working at the intersection of fluid dynamics and machine learning.',
  role: 'Researcher · MIT van Rees Lab · MSc MIT + TU Delft',
  body: [
    'Hi. I’m a Mechanical Engineer with a passion for both fluid dynamics and machine learning.',
    'I’m currently pursuing my Master’s in Mechanical Engineering at MIT as a visiting researcher at the van Rees Lab. I completed my MSc at TU Delft and did my academic internship in Switzerland at Novelis Sierre, working on multiphase, multi-physics flows. My focus sits at the intersection of CFD and AI.',
    'I’m also Co-Founder & CTO of Dual Energy, a Swiss startup developing agrivoltaics technology.',
    'Outside the lab: NBA, chess, logic games, reading, full-stack development, startups, and vibe coding.',
    'This site collects my most significant projects and serves as my professional portfolio. Enjoy.',
  ],
  // Captions are placeholders — edit to taste. Files live in /public/about/.
  // Photos render between body paragraphs (1↔2, 2↔3, 3↔4) in this order.
  photos: [
    {
      src: '/about/mountains.jpg',
      alt: 'View from a mountain summit overlooking the Mediterranean coast.',
      caption: 'Apuane, Italy',
      aspect: 'landscape',
    },
    {
      src: '/about/orcas.jpg',
      alt: 'A pod of orcas surfacing near a coastline.',
      caption: 'Killer whales',
      aspect: 'landscape',
    },
    {
      src: '/about/team-usa.jpg',
      alt: 'LeBron James and Stephen Curry on Team USA.',
      caption: 'Team USA',
      aspect: 'portrait',
    },
  ],
};
