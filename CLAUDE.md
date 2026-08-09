# Atlas of Climate Change

English "Atlas of Climate Change" for Fakta o Klimatu. Astro 7 static site + Decap CMS (GitHub backend). Node >= 22.12.

## Working style (important)

- **Few comments.** Comment only genuinely non-obvious intent — a browser-quirk workaround, a load-bearing specificity trick. No comments on trivial or self-explanatory edits.
- **No change-narration.** The project is still being built (pre-deploy), so don't write "this is new / we changed X / big refactor" in code. Keep commit messages factual and short.
- Match the surrounding code's naming and idiom. Build (`npm run build`) after changes.
- **Keep docs current.** After any larger change (new file/module, structural move, new convention), update the relevant section of both CLAUDE.md and README.md in the same pass.

## Commands

- `npm run dev` / `npm start` — dev server at root (`BASE_PATH=/`), so CMS image previews and links resolve. Admin: `/admin/index.html`.
- `npm run build` — production build (base `/AtlasOfClimateChange`).

## Structure

- `src/pages/index.astro` — homepage feed: chapters → infographics, grid/list toggle, sticky TOC sidebar (desktop), mobile Contents overlay.
- `src/pages/[slug].astro` — infographic detail (dynamic; `getStaticPaths` over all infographics).
- `src/pages/components.astro` — component preview page.
- `src/pages/chapters-usage.json.ts` — static JSON endpoint listing chapter `id`s with an infographic count; read by the admin's chapter-delete guard.
- `src/pages/404.astro` — not-found page: compact nav on top, centred `404` heading + `Page Submerged` subheading and a mono secondary "back home" button, sized to the viewport (no scroll). Copy lives in `ui.ts` (`ui.notFound`).
- `src/layouts/Layout.astro` — base HTML, font/style imports, `ClientRouter` (view transitions).
- `src/components/` — `Nav`, `FancyBar`, `Button`, `IconButton`, `ButtonGroup`, `Tag`.
- `src/components/feed/` — `SideNav` (TOC), `ArticleCard` (list), `ArticleSmall` (grid), `RelatedCard`, `ViewToggle`, `SiteFooter`.
- `src/components/icons/` — SVG icon components. `XIcon` is the X/Twitter logo; use `CloseIcon` for dismiss.
- `src/scripts/*.ts` — page JS extracted into ES modules, imported via `<script>`: `feed-spy` (scroll-spy + toggle), `feed-overlay` (mobile Contents overlay), `nav` (scroll collapse + lang menu), `detail-meta` (mobile block relocation). Each registers on `astro:page-load` (re-runs after every navigation).
- `src/styles/` — `tokens.css` (colours, spacing, breakpoints), `typography.css` (`.type-*` classes), `global.css`.
- `src/data/` — `infographics.ts` (`getChapters`, `getFlatInfographics`), `chapters.ts` (`ChapterMeta` interface + `chapterName`; loads `chapters.json`), `chapters.json` (CMS-managed chapter name/tagline/order), `site.json`, `ui.ts` (all fixed UI microcopy — nav, feed chrome, detail sidebar labels, footer, aria-labels).
- `src/content/infographics/` — Markdown content (Decap collection). `src/content.config.ts` — collection schema.
- `src/utils/img.ts` — `imgUrl(image)` (bare filename or `/images/...`).
- `public/admin/` — Decap CMS config.

## Conventions

- **Breakpoints** live in `tokens.css` as `--bp-xs 480 / --bp-sm 640 / --bp-md 768 / --bp-lg 1024 / --bp-xl 1280`. Media queries repeat the literal px (CSS can't read custom props in `@media`); JS reads them via `getComputedStyle`. `--bp-lg` is the primary layout switch (below it: sidebars restructure, nav goes compact).
- **Layout:** centred 1280 column with flex spacers (`min-width: --size-9` = 36) as the outer gutter, matching the nav; full-bleed bands extend by `--edge` (spacer width), never `-100vw` (which breaks fixed elements in touch mode).
- **Nav languages + menu links** come from `site.json` (CMS: Settings → Navigation) — the single source. `Nav` and `SiteFooter` receive them as props (`siblings` / `menuLinks`); don't hardcode.
- **Chapter names/taglines** come from `chapters.json` (CMS: Settings → Chapters) so language forks translate them from the admin. `chapters.ts` only loads that JSON and exposes the `ChapterMeta` type + `chapterName` lookup. Chapter `id`s stay in code (the `chapter` enum in `content.config.ts` and select options in `config.yml`) — they're the stable join key with infographics, not translated. A `preSave` guard in `public/admin/index.html` blocks removing a chapter that still has infographics linked to it (usage read from the `chapters-usage.json` endpoint), so deleting one can't silently orphan content.
- **No hardcoded UI text.** Fixed interface strings (labels, button/link text, aria-labels, page titles) live in `src/data/ui.ts` as the `ui` object; import and reference it (`ui.nav.title`, …) rather than inlining copy. Editable content stays in the CMS; chapter names/taglines in `chapters.json` (CMS Settings → Chapters).
- Scoped Astro `<style>` per component; keep styles co-located with markup, not split into global CSS.
- Card hovers use `@media (hover: hover)` (never stick on touch).
