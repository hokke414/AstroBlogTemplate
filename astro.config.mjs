// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import remarkCallouts from './src/utils/remark-callouts.mjs';
import { TEMPLATE_CONFIG } from './src/config';

// https://astro.build/config
export default defineConfig({
	integrations: [sitemap()],
	site: TEMPLATE_CONFIG.site.url,
	base: TEMPLATE_CONFIG.site.basePath,
	markdown: {
		remarkPlugins: [remarkDirective, remarkCallouts],
	},
});
