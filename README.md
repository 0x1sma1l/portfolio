# heyismail.xyz

Ismail Muyideen's personal engineering notebook and work index.

The site is built with SvelteKit, MDsveX, and a small purpose-built stylesheet. Notes, articles, and work entries are Markdown files committed with the source. There is no CMS, animation framework, or client-side application shell.

## Commands

```sh
npm install
npm run dev
npm run content:check
npm run check
npm run build
```

`npm run content:check` validates filenames and frontmatter. It is also run automatically before checks and production builds.

## Content

```text
src/content/
├── writing/   notes and articles
├── work/      selected work and case studies
└── templates/ starter frontmatter and structures
```

The filename becomes the stable URL slug. For example:

```text
src/content/writing/tracing-a-system-call.svx
→ /writing/tracing-a-system-call
```

Writing requires:

```yaml
---
title: 'Tracing a system call'
date: 2026-07-19
kind: note
draft: true
---
```

Use `kind: note` for frequent observations and `kind: article` for longer, deliberate pieces. Drafts appear in local development and are excluded from production pages, route generation, RSS, and the sitemap.

## Architecture

- SvelteKit with the Netlify adapter
- MDsveX for build-time Markdown compilation
- Zod and a dedicated validation command for strict frontmatter
- Shiki through `rehype-pretty-code` for build-time syntax highlighting
- A persisted light/dark theme with a progressively enhanced View Transition reveal
- Repository-native Markdown content
- RSS and sitemap endpoints generated from published content
- Satoshi delivered through Fontshare's official web-font API
