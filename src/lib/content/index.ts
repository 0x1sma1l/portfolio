import { dev } from '$app/environment';
import { formatZodError, workSchema, writingSchema } from './schema.js';
import type { ContentModule, WorkMetadata, WritingMetadata } from './types';

const writingModules = import.meta.glob('/src/content/writing/*.svx', {
	eager: true
}) as Record<string, ContentModule<unknown>>;

const workModules = import.meta.glob('/src/content/work/*.svx', {
	eager: true
}) as Record<string, ContentModule<unknown>>;

const featuredWorkOrder = ['auritrack', 'status-kit', 'influx-ai'];

function slugFromPath(path: string): string {
	const filename = path.split('/').at(-1);

	if (!filename) throw new Error(`Could not derive a slug from ${path}`);

	return filename.replace(/\.svx$/, '');
}

function parseWriting(path: string, module: ContentModule<unknown>): WritingMetadata {
	const parsed = writingSchema.safeParse(module.metadata);

	if (!parsed.success) {
		throw new Error(`Invalid writing frontmatter in ${path}: ${formatZodError(parsed.error)}`);
	}

	return { ...parsed.data, slug: slugFromPath(path) };
}

function parseWork(path: string, module: ContentModule<unknown>): WorkMetadata {
	const parsed = workSchema.safeParse(module.metadata);

	if (!parsed.success) {
		throw new Error(`Invalid work frontmatter in ${path}: ${formatZodError(parsed.error)}`);
	}

	return { ...parsed.data, slug: slugFromPath(path) };
}

export function getWriting(options: { includeDrafts?: boolean } = {}): WritingMetadata[] {
	const includeDrafts = options.includeDrafts ?? dev;

	return Object.entries(writingModules)
		.map(([path, module]) => parseWriting(path, module))
		.filter((entry) => includeDrafts || !entry.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function getWork(options: { includeDrafts?: boolean } = {}): WorkMetadata[] {
	const includeDrafts = options.includeDrafts ?? dev;

	return Object.entries(workModules)
		.map(([path, module]) => parseWork(path, module))
		.filter((entry) => includeDrafts || !entry.draft)
		.sort((a, b) => {
			const aFeaturedIndex = featuredWorkOrder.indexOf(a.slug);
			const bFeaturedIndex = featuredWorkOrder.indexOf(b.slug);
			const aIsFeatured = aFeaturedIndex !== -1;
			const bIsFeatured = bFeaturedIndex !== -1;

			if (aIsFeatured && bIsFeatured) return aFeaturedIndex - bFeaturedIndex;
			if (aIsFeatured) return -1;
			if (bIsFeatured) return 1;

			return b.year - a.year || a.title.localeCompare(b.title);
		});
}
