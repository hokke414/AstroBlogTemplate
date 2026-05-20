export const TEMPLATE_CONFIG = {
	site: {
		title: 'StarterBlog',
		description: 'A starter Astro blog template.',
		url: 'https://example.com',
		basePath: '/',
		language: 'ja',
	},
	content: {
		markdownDir: 'src/content/blog',
		pageSize: 12,
		homeLatestCount: 6,
	},
	feed: {
		title: 'StarterBlog RSS',
		description: 'Latest posts from StarterBlog.',
	},
} as const;

export const isDraft = (draft: boolean | undefined) => draft === true;
