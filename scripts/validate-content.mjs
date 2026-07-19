import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';
import { formatZodError, workSchema, writingSchema } from '../src/lib/content/schema.js';

const collections = [
	{ directory: 'src/content/writing', schema: writingSchema },
	{ directory: 'src/content/work', schema: workSchema }
];

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugs = new Set();
const errors = [];
let checked = 0;

for (const collection of collections) {
	const files = fs
		.readdirSync(collection.directory)
		.filter((filename) => filename.endsWith('.svx'))
		.sort();

	for (const filename of files) {
		checked += 1;
		const filepath = path.join(collection.directory, filename);
		const slug = filename.replace(/\.svx$/, '');

		if (!slugPattern.test(slug)) errors.push(`${filepath}: filename must be a kebab-case slug`);

		const key = `${collection.directory}:${slug}`;
		if (slugs.has(key)) errors.push(`${filepath}: duplicate slug "${slug}"`);
		slugs.add(key);

		try {
			const { data } = matter(fs.readFileSync(filepath, 'utf8'));
			const parsed = collection.schema.safeParse(data);

			if (!parsed.success) {
				errors.push(`${filepath}: ${formatZodError(parsed.error)}`);
			}
		} catch (error) {
			errors.push(`${filepath}: ${error instanceof Error ? error.message : String(error)}`);
		}
	}
}

if (errors.length > 0) {
	console.error(`Content validation failed:\n- ${errors.join('\n- ')}`);
	process.exit(1);
}

console.log(`Validated ${checked} content files.`);
