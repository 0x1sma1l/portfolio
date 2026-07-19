import { getWriting } from '$lib/content';
import { SITE } from '$lib/site';

export const prerender = true;

const escape = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');

export const GET = () => {
	const entries = getWriting({ includeDrafts: false });
	const items = entries
		.map((entry) => {
			const url = `${SITE.url}/writing/${entry.slug}`;
			return `<item>
  <title>${escape(entry.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(`${entry.date}T00:00:00Z`).toUTCString()}</pubDate>
  <category>${entry.kind}</category>
  <description>${escape(entry.description ?? entry.title)}</description>
</item>`;
		})
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escape(SITE.name)}</title>
  <link>${SITE.url}</link>
  <description>${escape(SITE.description)}</description>
  <language>en</language>
  <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	});
};
