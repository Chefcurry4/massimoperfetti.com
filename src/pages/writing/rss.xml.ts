/**
 * RSS feed for /writing — emitted at /writing/rss.xml.
 *
 * Pulled from the `writing` content collection; drafts excluded; sorted
 * date-desc to match the bento + listing order.
 */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site as siteConfig } from '../../data/site';

export async function GET(context: APIContext) {
  const entries = await getCollection('writing', ({ data }) => !data.draft);
  const items = entries
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.summary,
      link: `/writing/${entry.id}/`,
    }));

  return rss({
    title: `${siteConfig.name} — writing`,
    description: 'Notes and essays.',
    site: context.site ?? siteConfig.url,
    items,
    customData: `<language>${siteConfig.locale}</language>`,
  });
}
