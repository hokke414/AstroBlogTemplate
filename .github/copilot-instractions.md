# Copilot Instraction

## 前提

 - 回答は必ず日本語で行ってください。
 - コードの変更・追加にて、変更量が200行を超える可能性が高い場合は、事前に「この指示では変更量が200行を超える可能性がありますが実行しますか?」とユーザーに確認をとるようにして下さい。
 - 何か大きい変更を加える場合はまず何をするのか計画を立てたうえでユーザーに「このような計画で進めようと思います。」と提案してください。このとき修正を求められた場合は、計画を修正して再提案をお願いします。


## 概要

 - このプロジェクトではnexiary.comというドメインを使用した技術ブログです。
 - フレームワークとしてAstro.jsを使用し、Vercelにデプロイしています。
 - Markdownを使用して記事を公開します。メタ情報としてmarkdownに--- ---で囲みます。
    ・layout - 基本的なメタタグやお勧め記事表示機能などを実装したastroファイルを読み込む
    ・title - ページのタイトル
    ・pubDate - 公開日時をYYYY-MM-DDで指定
    ・description - SEO用のページの説明
    ・author - 著者名
    ・tags - 投稿を検索、絞り込みをするためのタグ情報

## 技術スタック

 - 言語 : HTML&CSS, Javascript, Typescript
 - フレームワーク : Astro
 - ビルドツール : Vite
 - 状態管理 : Git
 - デプロイ - Vercel


## ディレクトリ構成

src/
|--assets/
|    |---stacks/
|    |    |---<画像>
|    |
|    |---thumbnail/
|    |    |---<画像>
|    |
|    |---astro.svg
|    |---background.svg
|    |---hokke.jpeg
|
|--components/
|    |---ArticleCard.astro
|    |---slide.astro
|
|--layouts/
|    |---BlogPostLayout.astro
|    |---Layout.astro
|
|--pages/
|    |---article/
|    |    |--- <記事>
|    |
|    |---scripts/
|    |    |---article-filter.ts
|    |    |---stack-slider.ts
|    |
|    |---styles/
|    |    |---global.css
|    |
|    |---utils/
|    |    |---article.ts
|    |    |---remark-callouts.mjs
|    |    
|    |---about.astro
|    |---article.astro
|    |---hokke414.astro
|    |---index.astro
|    |---pilocy.astro
|
|--.gitignore
|--astro.config.mjs
|--package-lock.json
|--package.json
|--README.md
|--tsconfig.json
|
|
|
|
|
|
