# Nexiary 運用ガイド

このリポジトリは、記事を Markdown で追加すると一覧と詳細ページに自動反映される構成です。

## 記事追加の流れ

1. `src/pages/article/` に `slug.md` を追加します。
2. frontmatter を記入します。
3. `npm run build` でエラーがないことを確認します。

frontmatter の例:

```md
---
layout: ../../layouts/BlogPostLayout.astro
title: '記事タイトル'
pubDate: 2026-05-11
description: '記事一覧に表示する説明文'
author: 'your-name'
tags:
	- Astro
	- 開発メモ
img: src/assets/thumbnail/sample.png
---
```

## タグの作成方法

- `tags` は配列で記述します。
- タグは記事一覧のタグフィルターに自動表示されます。
- 同じタグ名を再利用すると同じフィルターにまとまります。

例:

```md
tags:
	- Unity
	- お知らせ
```

## サムネイルの設定

- サムネイル画像は `src/assets/thumbnail/` に置きます。
- frontmatter の `img` にパスを指定すると記事ページ上部に表示されます。
- 指定がない場合は `src/assets/thumbnail/noimg.png` が使われます。

例:

```md
img: src/assets/thumbnail/my-thumb.png
```

## コールアウト記法

記事本文では次のブロックが使えます。

### message（青・吹き出し）

```md
:::message
ここに補足メモを書く
:::
```

### alert（赤・注意）

```md
:::alert
ここに注意事項を書く
:::
```

## 記事更新時の注意点

- `pubDate` は `YYYY-MM-DD` 形式で書いてください。
- `title` と `description` は必須です。
- `tags` は文字列1つでも動きますが、基本は配列形式を推奨します。
- frontmatter のインデントにタブを使うとビルドエラーになります。スペースを使ってください。
- 画像ファイル名を変更した場合、`img` のパスも必ず更新してください。

## コマンド

```sh
npm install
npm run dev
npm run build
```
