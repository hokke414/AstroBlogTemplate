## StarterBlog — Astro template

A lightweight Astro blog starter template, intended to be forked and customized.

---

## Prerequisites

- Node.js >= 22.12.0 (required by the lockfile and Astro in this template)
- Git (for pushing your fork)

---

## 導入手順 (Setup)

1. Clone or fork the repository.
2. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

---

## Content Collections & Frontmatter validation

This template uses Astro Content Collections to store and validate articles.

- Schema file: `src/content/config.ts` — contains the Zod schema that validates article frontmatter (title, description, `pubDate` format, optional `author`, optional `tags`, optional `img`).
- Collection folder: `src/content/articles/` — place your article Markdown files here.

When frontmatter does not match the schema, a validation error will be reported during `astro dev` or `astro build`. This prevents malformed metadata from being published.

---

## 記事追加手順 (Add an article)

1. Create a new Markdown file in `src/content/articles/` named with the desired slug, for example `my-first-post.md`.
2. Add frontmatter at the top matching the schema. Example:

```md
---
title: "Your article title"
description: "A short summary for lists and SEO"
pubDate: 2026-05-11
author: "Your Name"
tags:
  - Astro
  - Tutorial
img: src/assets/thumbnail/my-thumb.png
---

Your article content here.
```

Notes:
- `pubDate` must be `YYYY-MM-DD` (validated by the collection schema).
- `img` is optional — omit it to use the default `src/assets/thumbnail/noimg.png`.

After adding the file, run `npm run dev` to preview locally. If the frontmatter fails validation, the dev server or build will show a clear error explaining which field is invalid.

---

## File overview (key files)

- `src/content/config.ts` — Content Collection schema (Zod). Edit to change required fields or validation rules.
- `src/content/articles/` — Markdown files for articles.
- `src/layouts/BlogPostLayout.astro` — Renders the article pages.
- `src/pages/article.astro` and `src/pages/article/page/[page].astro` — Article listing and pagination (now backed by the content collection).
- `src/utils/articles.ts` — Utilities that read the collection and expose article lists/tags.

---

## Publishing checklist

1. Update `src/layouts/Layout.astro` with your site title and links.
2. Replace `public/favicon.ico` if needed.
3. Add articles to `src/content/articles/`.
4. Commit and push. Example:

```bash
git add -A
git commit -m "Prepare StarterBlog template with content collections"
git push origin main
```

If you want, I can commit these changes and push to your remote — tell me which branch and remote to use.
