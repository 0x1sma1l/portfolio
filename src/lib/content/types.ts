import type { Component } from 'svelte';
import type { z } from 'zod';
import type { workSchema, writingSchema } from './schema.js';

export type WritingMetadata = z.infer<typeof writingSchema> & { slug: string };
export type WorkMetadata = z.infer<typeof workSchema> & { slug: string };

export interface ContentModule<T> {
	default: Component;
	metadata: T;
}
