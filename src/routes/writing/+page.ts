import { getWriting } from '$lib/content';

export const prerender = true;

export const load = () => ({ entries: getWriting() });
