```
# StarterBlog — Astro template

This repository is a lightweight Astro-based blog starter template. It is intended to be forked and customized for publishing posts as Markdown.

**Quick Start**

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

**Add a new article (Markdown)**

Place a Markdown file under `src/pages/article/` and include the following frontmatter at the top:

```md
---
layout: ../../layouts/BlogPostLayout.astro
title: "Your article title"
pubDate: 2026-05-11
description: "Short description shown in list"
author: "Your Name"
tags:
	- Astro
	- Tutorial
img: src/assets/thumbnail/my-thumb.png
---

Content...
```

Notes:
- `pubDate` must be `YYYY-MM-DD`.
- `img` is optional; when omitted the template uses `src/assets/thumbnail/noimg.png`.

**Repository layout — file-by-file description**

- `astro.config.mjs`: Astro configuration file. Specifies integrations and build options.
- `tsconfig.json`: TypeScript configuration used by the project.
- `package-lock.json`: NPM lockfile for reproducible installs (name field set to a neutral value).
- `.gitignore`: Git ignore rules for node_modules, dist, etc.
- `.vscode/`: Optional editor settings for VS Code.

- `public/`:
	- `favicon.ico`: Default favicon used in the site.
	- `favicon.svg`: SVG favicon.

- `src/` — main site source code
	- `src/assets/`:
		- `background.svg`: Decorative background SVG used in layout or header.
		- `src/assets/thumbnail/noimg.png`: Placeholder thumbnail image used when an article has no image.
	- `src/components/`:
		- `ArticleCard.astro`: Component that renders a summary card for each article in lists and search results.
		- `slide.astro`: Small UI component previously used for sliders (kept as a minimal placeholder).
	- `src/layouts/`:
		- `Layout.astro`: Main site layout (header, navigation, footer). Edit site title, nav links, and footer here.
		- `BlogPostLayout.astro`: Layout used by individual article pages (renders post metadata and body).
	- `src/pages/`:
		- `index.astro`: Site homepage content and listing of featured items.
		- `about.astro`: About page placeholder.
		- `policy.astro`: Policy / legal page placeholder.
		- `article.astro`: Article listing page (search and tag filters).
		- `src/pages/article/`:
			- `example.md`: Example article used to verify build and frontmatter format.
			- `page/[page].astro`: Pagination route for article list.
	- `src/scripts/`:
		- `article-filter.ts`: Client-side script that handles article search and filtering behavior.
		- `stack-slider.ts`: Script for the skills/stack slider UI.
	- `src/styles/`:
		- `global.css`: Global CSS file for site styling.
	- `src/utils/`:
		- `articles.ts`: Utility that loads and exposes article data to the site.
		- `remark-callouts.mjs`: Remark plugin to transform callout syntax in Markdown.

- `README.md`: This file — a concise English guide and per-file descriptions.
- `これ読め.md`: Japanese guide; mirrors the same instructions in Japanese.

**Sanitization notes**

- `package.json` has been removed from the repository per project sanitization instructions.
- `package-lock.json` was updated and now uses a neutral project name (`starterblog`).
- Generated site output in `dist/` is not included in the template; if present, it can be safely removed.

**Recommended workflow**

1. Fork this repository.
2. Customize `src/layouts/Layout.astro` and `src/styles/global.css`.
3. Add articles to `src/pages/article/` using the frontmatter example above.
4. Run `npm run build` to verify production output.

**Commit & push suggestions**

Before pushing your sanitized template, ensure you do not include `dist/` or personal images. Example git commands:

```bash
git add -A
git commit -m "Sanitize and prepare StarterBlog template"
git push origin main
```

If you want me to create a recommended `.gitignore` or to commit these changes, tell me and I'll run the commands.

---

If anything needs adjustment (different neutral project name, change layout defaults, or include/exclude `dist/`), tell me which preference to apply.

This repository is a sanitized, reusable Astro blog template. It removes personal data and example articles so you can use it as a starting point for your own site.

## Quickstart

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## How to add or update articles (Markdown)

Place a Markdown file in `src/pages/article/` with the following frontmatter at the top:

```md
---
layout: ../../layouts/BlogPostLayout.astro
title: "Your post title"
pubDate: 2026-05-11
description: "Short description shown in the list"
author: "Your Name"
tags:
	- Astro
	- Tutorial
img: src/assets/thumbnail/my-thumb.png
---

Post content goes here.
```

- `pubDate` should be `YYYY-MM-DD`.
- `title` and `description` are recommended for list pages and SEO.
- `img` is optional — if omitted the template will use `src/assets/thumbnail/noimg.png`.

## Directory structure

Key folders and files:

- `src/pages/` — site pages and Markdown articles.
	- `article/` — place article Markdown files here.
- `src/layouts/` — layout components used by pages.
	- `BlogPostLayout.astro` — blog post layout used by article frontmatter.
	- `Layout.astro` — main site layout (brand, nav, footer).
- `src/components/` — reusable UI components (e.g., `ArticleCard.astro`).
- `src/assets/` — images and static assets. Keep `thumbnail/noimg.png` as the default placeholder.
- `public/` — static public files (favicon, robots.txt, etc.).

## How to update site metadata and appearance

- Edit `src/layouts/Layout.astro` to change the default site title and description passed to pages.
- Replace the favicon at `public/favicon.ico` to update the site icon.
- Styles are in `src/styles/global.css`.

## Updating Astro, dependencies and Markdown handling

- To update Astro or other dependencies, edit `package.json` and run `npm install`.
- This template uses `import.meta.glob` to load article Markdown files. Keep frontmatter keys consistent when updating the `articles` utilities in `src/utils/articles.ts`.

## What was removed

- Personal articles and profile images have been removed to create a neutral template.
- Build artifacts (`dist/`) were removed — build locally with `npm run build`.

## Next steps before publishing

1. Replace placeholder texts (site name, author details, contact) in `src/layouts/Layout.astro` and `src/pages/`.
2. Add your articles under `src/pages/article/`.
3. Add or replace images in `src/assets/thumbnail/` (keep `noimg.png` as a default placeholder).
4. Update `package.json` `repository` and `homepage` fields if you plan to publish the template.

When ready, commit and push to your remote repository.
