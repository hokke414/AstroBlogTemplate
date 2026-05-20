import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TEMPLATE_CONFIG } from './config';


const blogCollection = defineCollection({
	loader: glob({
		base: `./${TEMPLATE_CONFIG.content.markdownDir}`,
		pattern: '**/*.md',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]),
		author: z.string().optional(),
		tags: z.array(z.string()).optional(),
		img: z.string().optional(),
		draft: z.boolean().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
};
