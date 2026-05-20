author: "Your Name"
tags:
  - Astro
  - Blog
img: src/assets/thumbnail/my-thumb.png
draft: false
# StarterBlog — Astro テンプレート

簡潔な導入手順と差し替え箇所を先頭に配置しています。まずは `src/config.ts` を編集してください。

## Quick Setup

1. 依存をインストール:

```bash
npm install
```

2. `src/config.ts` を開いて必須値を更新:

- `site.title`
- `site.description`
- `site.url` — RSS と Sitemap に使います
- `site.basePath` — GitHub Pages のプロジェクト配下で必要

3. 投稿を `src/content/blog/` に追加します。

4. 開発サーバー起動:

```bash
npm run dev
```

5. 本番ビルドとプレビュー:

```bash
npm run build
npm run preview
```

## Replace These (first things to swap)

- サイト名・説明: `src/config.ts`
- ファビコン: `public/favicon.ico`
- サンプル記事: `src/content/blog/example.md`
- テキスト: `src/pages/*.astro` の文言

## Content & Config

- Markdown 配置: `src/content/blog/`
- スキーマ: `src/content.config.ts` (Zod)
- 設定のハブ: `src/config.ts`

## Frontmatter 例

```md
---
title: "記事タイトル"
description: "一覧に表示される短い説明"
pubDate: 2026-05-11
author: "あなたの名前"
tags:
  - Astro
  - チュートリアル
img: src/assets/thumbnail/my-thumb.png
draft: false
---
```

- `pubDate` は `YYYY-MM-DD` か Date を許容（内部で正規化します）。
- `draft: true` の記事は一覧と RSS から除外されます。

## 主要機能

- 記事一覧とページネーション
- タグフィルタ・キーワード検索
- RSS (`/rss.xml`) 自動生成
- Sitemap 自動生成 (`sitemap-index.xml` / `sitemap.xml`)
- Draft 対応（frontmatter の `draft`）

## デプロイ対応

対応済みホスティング:

- GitHub Pages
- Vercel
- Cloudflare Pages

推奨設定例:

- GitHub Pages (project pages): `site.basePath` を `/<repo>` に設定
- どのプロバイダでもビルドコマンドは `npm run build`、出力は `dist/`

## 追加メモ

- サイト URL を `src/config.ts` に正しく設定すると RSS と Sitemap が正しく生成されます。
- 変更後は `npm run build` でビルド検証してください。

---
ファイル一覧（主要）:

- `src/config.ts` — 単一設定ファイル（サイト情報・コンテンツ設定など）
- `src/content.config.ts` — Content Collection スキーマ
- `src/content/blog/` — 記事 Markdown
- `src/layouts/BlogPostLayout.astro` — 個別記事レイアウト
- `src/pages/rss.xml.ts` — RSS エンドポイント

ご希望なら、これらの変更をコミットしてリモートに push します。どのブランチにしますか？
