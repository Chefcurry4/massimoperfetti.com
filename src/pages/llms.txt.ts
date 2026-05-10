/**
 * llms.txt — emerging convention (https://llmstxt.org) for guiding LLM
 * crawlers to the canonical, condensed view of a site. Generated at build
 * time so it stays in sync with the content collections; the alternative
 * is a static file that drifts the moment a project ships.
 *
 * Format: H1 with site/owner name, blockquote with one-line summary,
 * H2 sections with markdown links to canonical URLs.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { about } from '../data/about';
import { contacts } from '../data/contacts';

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const writing = await getCollection('writing', ({ data }) => !data.draft);
  const work = await getCollection('work', ({ data }) => !data.draft);

  const projectsSorted = [...projects].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const writingSorted = [...writing].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  // period.start is optional in the schema; entries without a start date
  // (currently-active, no historical anchor) sort to the top.
  const workSortKey = (start: Date | undefined): number =>
    start ? start.getTime() : Number.POSITIVE_INFINITY;
  const workSorted = [...work].sort(
    (a, b) => workSortKey(b.data.period.start) - workSortKey(a.data.period.start),
  );

  const url = (path: string): string => new URL(path, site.url).toString();

  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.description}`);
  lines.push('');

  lines.push('## About');
  lines.push('');
  lines.push(about.body[0]);
  lines.push('');
  lines.push(`Role: ${about.role}.`);
  lines.push('');
  lines.push(`- [Full bio](${url('/about')})`);
  lines.push(`- [Home (bento wall of work)](${url('/')})`);
  lines.push('');

  lines.push('## Projects');
  lines.push('');
  for (const p of projectsSorted) {
    lines.push(`- [${p.data.title}](${url(`/projects/${p.id}`)}): ${p.data.summary}`);
  }
  lines.push('');

  lines.push('## Work');
  lines.push('');
  for (const w of workSorted) {
    const startYear = w.data.period.start?.getFullYear().toString();
    const endYear = w.data.period.end?.getFullYear().toString() ?? 'present';
    const span = startYear ? `${startYear}–${endYear}` : endYear;
    lines.push(
      `- [${w.data.title} · ${w.data.org} (${span})](${url(`/work/${w.id}`)}): ${w.data.summary}`,
    );
  }
  lines.push('');

  lines.push('## Writing');
  lines.push('');
  for (const w of writingSorted) {
    lines.push(`- [${w.data.title}](${url(`/writing/${w.id}`)}): ${w.data.summary}`);
  }
  lines.push('');

  lines.push('## Other pages');
  lines.push('');
  lines.push(`- [Projects index](${url('/projects')})`);
  lines.push(`- [Work index](${url('/work')})`);
  lines.push(`- [Places visited](${url('/places')})`);
  lines.push(`- [Gallery](${url('/gallery')})`);
  lines.push(`- [Contact](${url('/contact')})`);
  lines.push(`- [Book a call](${url('/book')})`);
  lines.push('');

  lines.push('## Contact');
  lines.push('');
  for (const c of contacts.filter((x) => x.audience !== 'academic')) {
    // Display: emails as plain addresses (drop the mailto: scheme for
    // readability), relative paths absolutized so the file works as a
    // standalone document, everything else as-is.
    let display: string;
    if (c.kind === 'email') display = c.handle;
    else if (c.url.startsWith('/')) display = url(c.url);
    else display = c.url;
    lines.push(`- ${c.label}: ${display}`);
  }
  lines.push('');

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [RSS feed (writing)](${url('/writing/rss.xml')})`);
  lines.push(`- [Sitemap](${url('/sitemap-index.xml')})`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
