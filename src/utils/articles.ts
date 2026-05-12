export type ArticleFrontmatter = {
	title: string;
	description: string;
	pubDate: string;
	author?: string;
	tags?: string[] | string;
	img?: string;
};

export type ArticleRecord = ArticleFrontmatter & {
	slug: string;
	tags: string[];
};

export const normalizeTags = (value: string[] | string | undefined) => {
	if (Array.isArray(value)) {
		return value;
	}

	if (typeof value === 'string' && value.trim().length > 0) {
		return [value.trim()];
	}

	return [];
};

export const collectArticles = (modules: Record<string, { frontmatter: ArticleFrontmatter }>) => {
	return Object.entries(modules)
		.map(([filePath, module]) => ({
			slug: filePath.split('/').pop()?.replace('.md', '') ?? '',
			...module.frontmatter,
			tags: normalizeTags(module.frontmatter.tags),
		}))
		.filter((article) => article.slug)
		.sort((left, right) => new Date(right.pubDate).getTime() - new Date(left.pubDate).getTime());
};

export const uniqueTags = (articles: ArticleRecord[]) => {
	return [...new Set(articles.flatMap((article) => article.tags))].sort((left, right) =>
		left.localeCompare(right, 'ja'),
	);
};

export const pickRelatedArticles = (articles: ArticleRecord[], currentSlug: string, count = 3) => {
	return articles
		.filter((article) => article.slug !== currentSlug)
		.sort(() => Math.random() - 0.5)
		.slice(0, count);
};