# AGENTS.md — StrataLauncher Documentation Site

Rules and conventions for AI agents and maintainers working on this website.

## Stack & Architecture
- **Framework**: Vite + React + TypeScript in `website/` with isolated package.json.
- **Routing**: React Router (`BrowserRouter`) using `import.meta.env.BASE_URL` as basename.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` mapped to CSS variables in `src/styles/tokens.css`.
- **Markdown / Content**: MDX via `@mdx-js/rollup` with `remark-gfm`, `remark-frontmatter`, `remark-mdx-frontmatter`, `rehype-slug`, `@stefanprobst/rehype-extract-toc` (with MDX export helper), and `@shikijs/rehype`.
- **Animation**: Anime.js v4 (`animejs@4.5.0`) with standard, emphasis, and express cubic-bezier curves mapped in `src/lib/motion.ts`. Always respect `prefers-reduced-motion`.
- **Search**: MiniSearch with precomputed index generated at build time (`scripts/build-search-index.mjs`).
- **Icons & Fonts**: Self-hosted Material Symbols (Rounded) with `font-display: swap` and self-hosted `@fontsource` packages (DM Sans, Outfit, JetBrains Mono). No runtime Google Fonts or external CDN requests.

## Key Rules
1. **Shell Only, No Real Content**: This repository houses the shell, layout, theme tokens, search, and navigation. Do not write full or unreviewed documentation content; placeholders and structural guides are used until officially authored.
2. **All Colors Come From tokens.css**: Components MUST NOT use hardcoded colors (no hex codes, no Tailwind hardcoded palette colors like `bg-blue-500` or `text-white`). Tailwind consumes CSS variables defined in `src/styles/tokens.css`. Restyling the site is performed by editing `tokens.css` alone.
3. **MDX Frontmatter Format**: Every docs page under `src/content/<group>/<slug>.mdx` must contain frontmatter:
   ```yaml
   ---
   title: Page Title
   group: group-slug
   order: 1
   description: Optional summary of page content.
   ---
   ```
   Adding a page with this frontmatter automatically populates the left sidebar, route lazy-loader, MiniSearch index, sitemap, and prev/next links.
4. **Commands**:
   - Build: `npm run build`
   - Dev: `npm run dev`
   - Preview: `npm run preview`
   - Lint: `npm run lint`
   - Typecheck: `npm run typecheck`
