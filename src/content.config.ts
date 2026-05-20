import { defineCollection, z } from 'astro:content';


const articlesCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		author: z.string().optional(),
		tags: z.array(z.string()).optional(),
		img: z.string().optional(),
	}),
});

export const collections = {
	articles: articlesCollection,
};
