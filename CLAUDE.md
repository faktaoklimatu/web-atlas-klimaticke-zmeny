# Atlas of Climate Change

English "Atlas of Climate Change" for Fakta o Klimatu. Astro 7 static site + Decap CMS (GitHub backend). Node >= 22.12.

## Working style (important)

- **Few comments.** Comment only genuinely non-obvious intent — a browser-quirk workaround, a load-bearing specificity trick. No comments on trivial or self-explanatory edits.
- **No change-narration.** The project is still being built (pre-deploy), so don't write "this is new / we changed X / big refactor" in code. Keep commit messages factual and short.
- Match the surrounding code's naming and idiom. Build (`npm run build`) after changes.
- **Keep docs current.** After any larger change (new file/module, structural move, new convention), update the relevant section of both CLAUDE.md and README.md in the same pass.

## Commands

- `npm run dev` / `npm start` — runs Astro dev server (`BASE_PATH=/`) and the Decap `local_backend` proxy (`decap-server`) together via `concurrently`, so CMS image previews and links resolve. Admin: `/admin/index.html`. Without the proxy running, the CMS falls back to the GitHub backend instead of reading/writing local files. Run `npm run dev:astro` alone to skip the CMS proxy.
- `npm run build` — production build (base `/AtlasOfClimateChange`).

## Structure

- `src/pages/index.astro` — homepage feed: chapters → infographics, grid/list toggle, sticky TOC sidebar (desktop), mobile Contents overlay.
- `src/pages/[slug].astro` — infographic detail (dynamic; `getStaticPaths` over all infographics).
- `src/pages/components.astro` — component preview page.
- `src/pages/chapters-usage.json.ts` — static JSON endpoint listing chapter `id`s with an infographic count; read by the admin's chapter-delete guard.
- `src/pages/404.astro` — not-found page: compact nav on top, centred `404` heading + `Page Submerged` subheading and a mono secondary "back home" button, sized to the viewport (no scroll). Copy lives in `ui.ts` (`ui.notFound`).
- `src/pages/about.astro` — About page (own top-level CMS collection "About Page", `src/content/about/about.md`). Same two-column shell + split background as the homepage/detail page, no hero image, no sidebar border; sidebar column holds the "External links" box for now. Back button returns to the homepage top (not a specific article).
- `src/layouts/Layout.astro` — base HTML, font/style imports, `ClientRouter` (view transitions).
- `src/components/` — `Nav`, `FancyBar`, `Button`, `ButtonGroup`, `Tag`.
- `src/components/feed/` — `SideNav` (TOC), `ArticleCard` (list), `ArticleSmall` (grid), `RelatedCard`, `ViewToggle`, `SiteFooter`.
- `src/components/icons/` — SVG icon components.
- `src/scripts/*.ts` — page JS extracted into ES modules, imported via `<script>`: `feed-spy` (scroll-spy + toggle), `feed-overlay` (mobile Contents overlay), `nav` (scroll collapse + lang menu), `detail-meta` (mobile block relocation). Each registers on `astro:page-load` (re-runs after every navigation).
- `src/styles/` — `tokens.css` (colours, spacing, breakpoints), `typography.css` (`.type-*` classes), `global.css`.
- `src/data/` — `infographics.ts` (`getChapters`, `getFlatInfographics`), `chapters.ts` (`ChapterMeta` interface + `chapterName`; loads `chapters.json`), `chapters.json` (CMS-managed chapter name/tagline/order), `site.json`, `ui.ts` (all fixed UI microcopy — nav, feed chrome, detail sidebar labels, footer, aria-labels).
- `src/content/infographics/` — Markdown content (Decap collection). `src/content/about/about.md` — the About page's title + body (single-file Decap collection). `src/content.config.ts` — collection schemas.
- `src/utils/img.ts` — `imgUrl(image)` (bare filename or `/images/...`).
- `public/admin/` — Decap CMS config.

## Conventions

- **Breakpoints** live in `tokens.css` as `--bp-xs 480 / --bp-sm 640 / --bp-md 768 / --bp-lg 1024 / --bp-xl 1280`. Media queries repeat the literal px (CSS can't read custom props in `@media`); JS reads them via `getComputedStyle`. `--bp-lg` is the primary layout switch (below it: sidebars restructure, nav goes compact).
- **Layout:** centred 1280 column with flex spacers (`min-width: --size-9` = 36) as the outer gutter, matching the nav; full-bleed bands extend by `--edge` (spacer width), never `-100vw` (which breaks fixed elements in touch mode).
- **Nav/footer languages** come from `site.json` (CMS: Settings → Navigation) — the single source. `Nav` and `SiteFooter` receive them as a `siblings` prop; don't hardcode. The nav bar itself only ever shows a fixed "About" link (`ui.nav.about`) plus the language switcher — no CMS-driven nav links.
- **External links** (`site.json`'s `menuLinks`, CMS: Settings → Navigation) render as an "External links" box in the About page's sidebar (`src/pages/about.astro`), not in the header nav.
- **Footer** (`SiteFooter`, rendered on every page) reads `socialLinks` (name/URL/SVG icon triples), `atlasPdfUrl`, and `languageVersionsUrl` from `site.json` (CMS: Settings → Navigation). No sponsors block.
- **Chapter names/taglines** come from `chapters.json` (CMS: Settings → Chapters) so language forks translate them from the admin. `chapters.ts` only loads that JSON and exposes the `ChapterMeta` type + `chapterName` lookup. Chapter `id`s stay in code (the `chapter` enum in `content.config.ts` and select options in `config.yml`) — they're the stable join key with infographics, not translated. A `preSave` guard in `public/admin/index.html` blocks removing a chapter that still has infographics linked to it (usage read from the `chapters-usage.json` endpoint), so deleting one can't silently orphan content.
- **No hardcoded UI text.** Fixed interface strings (labels, button/link text, aria-labels, page titles) live in `src/data/ui.ts` as the `ui` object; import and reference it (`ui.nav.title`, …) rather than inlining copy. Editable content stays in the CMS; chapter names/taglines in `chapters.json` (CMS Settings → Chapters).
- Scoped Astro `<style>` per component; keep styles co-located with markup, not split into global CSS.
- Card hovers use `@media (hover: hover)` (never stick on touch).
