# StrataLauncher Documentation Website Shell

The official shell for the StrataLauncher documentation website, built with Vite, React, TypeScript, Tailwind CSS v4, MDX, and Anime.js.

## Getting Started

### Prerequisites
- Node.js (verified on v22.x)
- npm (verified on v12.x)

### Commands
All commands can be executed either from the root or inside `website/`:

```bash
# Run local dev server with hot reload, search indexing, and sitemap generation
npm run dev

# Run linting (ESLint with eslint-plugin-jsx-a11y)
npm run lint

# Run TypeScript typecheck
npm run typecheck

# Build for production (includes search index generation and sitemap)
npm run build

# Preview production build locally
npm run preview
```

## Adding a Documentation Page

Documentation pages live as MDX files in `website/src/content/<group>/<slug>.mdx`.

### Frontmatter Schema
Every page requires YAML frontmatter:

```yaml
---
title: "Installing Fabric & Quilt"
group: "loaders"
order: 2
description: "How to configure Fabric or Quilt mod loaders in StrataLauncher."
---
```

### Automatic Registration
Adding an MDX file with the frontmatter above automatically:
1. Adds the page into the left sidebar under its group.
2. Registers lazy-loading routes at `/docs/<group>/<slug>`.
3. Indexes titles, headings, and plain text in MiniSearch (`public/search-index.json`).
4. Updates `sitemap.xml` and `robots.txt` at build time.
5. Links previous and next page navigation at the bottom of neighboring pages.

### Available MDX Components
- `<Note title="...">...</Note>`: Blue information box with Material Symbols icon.
- `<Tip title="...">...</Tip>`: Green tip box with lightbulb icon.
- `<Warning title="...">...</Warning>`: Amber warning callout with warning icon.
- Code blocks: Syntax highlighted in dual light/dark themes via Shiki with language labels and interactive copy-to-clipboard buttons.
- Markdown Tables: GFM responsive styled tables.

## Dependency Justifications

Every package is pinned to an exact stable release published at least 14 days ago:

- `react@19.3.1`: Declarative UI foundation for layout, pages, and interactive components.
- `react-dom@19.3.1`: DOM renderer for React web applications.
- `react-router-dom@7.18.4`: Client-side routing with nested routes, base URL support, and layout persistence.
- `@tailwindcss/vite@4.3.3`: Official Tailwind CSS v4 Vite integration for zero-config CSS processing.
- `tailwindcss@4.3.3`: Next-generation utility-first styling engine driven purely by CSS variables.
- `@mdx-js/rollup@3.1.1`: MDX compiler plugin for Vite bundling.
- `remark-gfm@4.0.1`: Adds GitHub-Flavored Markdown support (tables, autolinks, strikethrough).
- `remark-frontmatter@5.0.0`: Parses YAML frontmatter in MDX source files.
- `remark-mdx-frontmatter@6.0.0`: Exposes frontmatter variables as named ES module exports in MDX.
- `rehype-slug@6.0.0`: Adds slug IDs to markdown headings for anchor jumping and table of contents.
- `@stefanprobst/rehype-extract-toc@3.0.0`: Extracts structured heading trees with built-in MDX export helper (`@stefanprobst/rehype-extract-toc/mdx`) since standard `rehype-extract-toc` does not expose an MDX named export.
- `shiki@4.5.0`: Accurate code syntax highlighter engine.
- `@shikijs/rehype@4.5.0`: Dual light/dark code block syntax highlighter using CSS variables (`defaultColor: false`).
- `animejs@4.5.0`: Version 4 chosen for modular ES module imports (`animate`, `stagger`, `cubicBezier`), first-class TypeScript types, and direct cubic-bezier motion curve mapping.
- `minisearch@7.2.0`: Fast, lightweight full-text client-side search engine indexed at build time.
- `material-symbols@0.48.0`: Self-hosted Rounded Material Symbols font package with `font-display: swap` (raw font file: 5,397,756 bytes / ~5.4 MB).
- `@fontsource/dm-sans@5.3.0`: Self-hosted DM Sans font for UI typography matching original launcher app.
- `@fontsource/outfit@5.3.0`: Self-hosted Outfit font for bold headings matching original launcher app.
- `@fontsource/jetbrains-mono@5.3.0`: Self-hosted JetBrains Mono font for monospace code blocks matching original launcher app.
- `vite@8.3.4`: Fast frontend bundler and local development server.
- `@vitejs/plugin-react@6.1.2`: Fast Refresh and JSX transformation support for React in Vite.
- `typescript@5.9.3`: Strict type checker and developer tooling compiler compatible with typescript-eslint.
- `@types/react@19.3.0`: TypeScript definitions for React.
- `@types/react-dom@19.3.0`: TypeScript definitions for React DOM.
- `@types/node@22.20.5`: TypeScript definitions for Node build scripts.
- `eslint@9.39.5`: Linter for code quality and convention enforcement.
- `@eslint/js@9.39.5`: ESLint recommended JavaScript rules for flat config.
- `typescript-eslint@8.72.0`: TypeScript parser and lint rule suite for ESLint flat config.
- `eslint-plugin-jsx-a11y@6.10.2`: Accessibility linting rules for JSX elements and ARIA attributes.
- `prettier@3.9.10`: Opinionated code formatting tool.

## Known Gaps
- **Material Symbols Font Subsetting**: The bundled `material-symbols-rounded.woff2` font file currently weighs 5,397,756 bytes (~5.4 MB) because it includes the entire Unicode icon glyph set. In a future production optimization pass, glyph subsetting (e.g. using `glyphhanger` or `pyftsubset`) should be run to include only the icons actually referenced across the site (`search`, `close`, `menu`, `light_mode`, `dark_mode`, `code`, `description`, `format_list_bulleted`, `arrow_back`, `arrow_forward`, `info`, `lightbulb`, `warning`, `check`, `content_copy`, `terminal`, `window`, `laptop_mac`, `home`, `menu_book`, `search_off`, `rocket_launch`, `dns`, `code_blocks`, `chevron_right`, `download`, `progress_activity`), reducing file size to under ~30 KB.
- **Documentation Content**: The pages currently contain structural placeholders and styling proofs. Real documentation content will be authored in a future phase.
