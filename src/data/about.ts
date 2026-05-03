/**
 * Singleton: about content. Used by the bento `AboutCell` and the standalone
 * `/about` page. Edit here, not in markdown — this changes too rarely to
 * deserve a content collection.
 */

export interface About {
  readonly headline: string;
  readonly body: readonly string[];
}

export const about: About = {
  headline: 'Researcher at MIT van Rees Lab. AI × CFD, full-stack, founder.',
  body: [
    'MSc at MIT and TU Delft. BSc at EPFL and Politecnico di Torino.',
    'Currently working on AI methods for computational fluid dynamics for my master thesis.',
    'Interests: NBA, chess, machine learning, logic games, reading, CFD, full-stack development, startups, AI.',
  ],
};
