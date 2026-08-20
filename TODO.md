# Open items

Things noted while working, to resolve later.

> **When resolving any large item here, update `README.md` and `CLAUDE.md`** to
> reflect the change in the same pass.

## Fork ergonomics for new language versions

Two friction points surfaced when documenting the fork flow (see README →
*Creating a new language version*). Both currently require manual edits by
whoever forks the repo.

### 1. Hardcoded `base` in `astro.config.mjs`

The production `base` defaults to `/AtlasOfClimateChange`. A forker must edit it
by hand to match their repo name, or GitHub Pages will serve assets from the
wrong path. Consider deriving it automatically — e.g. from a `BASE_PATH`
environment variable set in the deploy workflow, or from the repo name via
`${{ github.event.repository.name }}` in `deploy.yml` — so a fork just works
without touching the config.

### 2. Shared Decap OAuth backend

`public/admin/config.yml` points `base_url` at a single Cloudflare Worker OAuth
proxy tied to one GitHub OAuth app. Each fork needs its **own** OAuth proxy +
GitHub OAuth app for CMS login; the shared one won't authorize other repos.
Options to smooth this out: document the Worker setup as a reusable template,
or provide a one-click/deployable OAuth proxy. Until then, forkers fall back to
`local_backend: true` or editing Markdown directly on GitHub.

## Deployment

### Custom domain

Currently deploys to the GitHub Pages project URL
(`https://<user>.github.io/<repo>/`). Set up the real custom domain before
launch: add a `CNAME`, point DNS at GitHub Pages, and set `site`/`base` in
`astro.config.mjs` to serve at the domain root (`base: '/'`).

## Placeholder content

Real content still needs to replace placeholders before launch:

- `src/components/feed/SiteFooter.astro` — social links are `href="#"`; wire up
  the real Facebook / Instagram / X / LinkedIn URLs.

## Deploy ownership

`astro.config.mjs` `site` points at a personal account
(`hiiampadik.github.io`) and the Decap OAuth proxy runs on a personal Cloudflare
Worker (`brona-musil.workers.dev`). Before launch, move the deploy + OAuth
backend to the production / organization account.

## SEO

Handle later: per-page `<title>`/meta descriptions, Open Graph + Twitter cards
(**including the 1200×630 social share image** — the favicon/app icons are
already done in `Layout.astro`), canonical URLs, `lang`/`hreflang` across
language versions, `sitemap.xml`, `robots.txt`, and structured data for
infographics.

## Accessibility (A11Y)

Handle later: full audit — keyboard navigation and focus order, focus-visible
states, colour contrast, image `alt` text, heading hierarchy, ARIA on the
overlays/menus, reduced-motion coverage, and screen-reader testing.

## Pre-launch cleanup

### Strip "still being built" notes from CLAUDE.md

Before deploy, clean CLAUDE.md of pre-launch phrasing — e.g. the *Working style*
notes referencing "The project is still being built (pre-deploy)" and
change-narration caveats that only make sense during the build phase.
