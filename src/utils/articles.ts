type Frontmatter = {
	title: string;
	description: string;
	pubDate: string;
	author?: string;
	tags?: string[];
	img?: string;
	draft?: boolean;
};

type RawFrontmatter = Omit<Frontmatter, 'pubDate'> & {
	pubDate: string | Date;
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
	const modules = import.meta.glob('../content/blog/**/*.md', { eager: true }) as Record<
		string,
		{ frontmatter: RawFrontmatter }
	>;

	const articles = Object.entries(modules).map(([filePath, mod]) => {
		const relativePath = filePath.split('/content/blog/')[1] ?? filePath;
		const id = relativePath.replace(/\.md$/, '');
		const normalizedPubDate =
			mod.frontmatter.pubDate instanceof Date
				? mod.frontmatter.pubDate.toISOString().slice(0, 10)
				: mod.frontmatter.pubDate;
		return {
			id,
			slug: id,
			data: {
				...mod.frontmatter,
				pubDate: normalizedPubDate,
			},
			tags: mod.frontmatter.tags ?? [],
			filePath,
		} as ArticleRecord;
	});

	return articles
		.filter((article) => article.data.draft !== true)
		.sort((left, right) => new Date(right.data.pubDate).getTime() - new Date(left.data.pubDate).getTime());
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