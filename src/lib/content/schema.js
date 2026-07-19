import { z } from 'zod';

const date = z.preprocess(
	(value) => {
		if (value instanceof Date) return value.toISOString().slice(0, 10);
		if (typeof value === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			const parsed = new Date(value);
			if (!Number.isNaN(parsed.valueOf())) return parsed.toISOString().slice(0, 10);
		}
		return value;
	},
	z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must use YYYY-MM-DD')
);

export const writingSchema = z
	.object({
		title: z.string().trim().min(1),
		description: z.string().trim().min(1).optional(),
		date,
		updated: date.optional(),
		kind: z.enum(['note', 'article']),
		draft: z.boolean()
	})
	.strict();

export const workSchema = z
	.object({
		title: z.string().trim().min(1),
		year: z.number().int().min(2000).max(2100),
		summary: z.string().trim().min(1),
		details: z.string().trim().min(1),
		role: z.string().trim().min(1),
		topics: z.array(z.string().trim().min(1)).default([]),
		draft: z.boolean(),
		links: z
			.object({
				live: z.string().url().optional(),
				source: z.string().url().optional()
			})
			.strict()
			.optional()
	})
	.strict();

/** @param {import('zod').ZodError} error */
export function formatZodError(error) {
	return error.issues
		.map((issue) => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`)
		.join('; ');
}
