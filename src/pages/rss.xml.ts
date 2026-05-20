import rss from '@astrojs/rss';
import { TEMPLATE_CONFIG } from '../config';
import { collectArticles } from '../utils/articles';

export async function GET(context: { site: string | undefined }) {
	const articles = await collectArticles();
	const site = context.site ?? TEMPLATE_CONFIG.site.url;

	return rss({
		title: TEMPLATE_CONFIG.feed.title,
		description: TEMPLATE_CONFIG.feed.description,
		site,
		items: articles.map((article) => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: new Date(article.data.pubDate),
			link: `/article/${article.slug}/`,
		})),
		customData: '<language>ja-jp</language>',
	});
}
