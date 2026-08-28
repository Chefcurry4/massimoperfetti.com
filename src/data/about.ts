/**
 * Singleton: about content. Used by the bento `AboutCell` and the standalone
 * `/about` page. Edit here, not in markdown — this changes too rarely to
 * deserve a content collection.
 *
 * `body` paragraphs render in order. (A `photos` array existed here for an
 * interleaved-photo layout that was never built — removed as dead data; two
 * of its three referenced files didn't even exist in /public/about.)
 */

export interface About {
  readonly headline: string;
  /** Single-line role/affiliation summary surfaced on the AboutCell. */
  readonly role: string;
  readonly body: readonly string[];
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
};
