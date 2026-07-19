import { getWriting } from '$lib/content';
import { SITE } from '$lib/site';

export const prerender = true;

export const GET = () => {
	const staticPaths = ['', '/writing', '/work'];
	const writingPaths = getWriting({ includeDrafts: false }).map(({ slug }) => `/writing/${slug}`);
	const urls = [...staticPaths, ...writingPaths]
		.map((path) => `<url><loc>${SITE.url}${path || '/'}</loc></url>`)
		.join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{
			headers: { 'Content-Type': 'application/xml; charset=utf-8' }
		}
	);
};
