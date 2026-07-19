import { error } from '@sveltejs/kit';
import { getWriting } from '$lib/content';
import type { EntryGenerator } from './$types';

export const prerender = 'auto';

export const entries: EntryGenerator = () =>
	getWriting({ includeDrafts: false }).map(({ slug }) => ({ slug }));

export const load = ({ params }) => {
	const entry = getWriting().find(({ slug }) => slug === params.slug);

	if (!entry) error(404, 'Writing not found');

	return { entry };
};
