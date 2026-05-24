# StarterBlog Astro Template

## Quick Setup

1. Install dependencies.

```bash
npm install
```

2. Replace template settings in `src/config.ts`.

3. Put your posts in `src/content/blog/`.

4. Start development server.

```bash
npm run dev
```

5. Build and preview.

```bash
npm run build
npm run preview
```

## Replace These

Edit `src/config.ts` first:

- `site.title`
- `site.description`
- `site.url` (required for RSS and Sitemap)
- `site.basePath` (`/` for root, `/repo-name` for GitHub Pages project sites)

Also replace:

- `public/favicon.ico`
- Navigation/content text in `src/pages/*.astro`
- The sample post in `src/content/blog/example.md`

## Content Location

- Markdown directory: `src/content/blog/`
- Content schema: `src/content.config.ts`
- Runtime settings hub: `src/config.ts`

## Frontmatter

Example frontmatter:

```md
---
title: "Your article title"
description: "A short summary"
pubDate: 2026-05-11
author: "Your Name"
tags:
  - Astro
  - Blog
img: src/assets/thumbnail/my-thumb.png
draft: false
---
```

Notes:

- `pubDate` must be `YYYY-MM-DD`.
- `draft: true` posts are excluded from article lists and RSS.
- `img` is optional.

## Included Features

- Astro blog template with article list and pagination
- Tag filtering and keyword search on article list page
- RSS feed at `/rss.xml`
- Sitemap generation
- Draft support via frontmatter (`draft: true`)

## Deploy Support

This template supports static hosting and is ready for:

- GitHub Pages
- Vercel
- Cloudflare Pages

### GitHub Pages

Recommended settings:

- Set `site.url` to your Pages URL in `src/config.ts`
- If using project pages, set `basePath` to `/<repo-name>`
- Build command: `npm run build`
- Output directory: `dist`

### Vercel

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Set `site.url` in `src/config.ts` to your production domain

### Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Set `site.url` in `src/config.ts` to your production domain

## Scripts

- `npm run dev`: local development
- `npm run build`: production build
- `npm run preview`: preview built site locally


