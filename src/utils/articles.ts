type Frontmatter = {
	title: string;
	description: string;
	pubDate: string;
	author?: string;
	tags?: string[];
	img?: string;
};

export type ArticleRecord = {
	id: string;
	slug: string;
	data: Frontmatter;
	tags: string[];
	filePath?: string;
};

export const collectArticles = async (): Promise<ArticleRecord[]> => {
	// Load markdown files directly to avoid depending on Astro's getCollection during build
	const modules = import.meta.glob('../content/articles/*.md', { eager: true }) as Record<
		string,
		{ frontmatter: Frontmatter }
	>;

	const articles = Object.entries(modules).map(([filePath, mod]) => {
		const id = filePath.split('/').pop()?.replace('.md', '') ?? filePath;
		return {
			id,
			slug: id,
			data: mod.frontmatter,
			tags: mod.frontmatter.tags ?? [],
			filePath,
		} as ArticleRecord;
	});

	return articles.sort((left, right) => new Date(right.data.pubDate).getTime() - new Date(left.data.pubDate).getTime());
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