# Atlas of Climate Change

A visual guide to the science and data behind climate change, for
[Fakta o Klimatu](https://faktaoklimatu.cz). Static site built with **Astro 7**
and edited through **Decap CMS** (Git-based, GitHub backend). Deployed to GitHub
Pages.

## Requirements

- Node **>= 22.12**
- npm

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:4321/  (base path "/")
```

- `npm run dev` / `npm start` — runs the Astro dev server (`BASE_PATH=/`, so the
  Decap admin and CMS image previews resolve at the root) together with the
  Decap `local_backend` proxy (`decap-server`), via `concurrently`.
- `npm run dev:astro` — Astro dev server only, without the CMS proxy.
- `npm run build` — production build into `dist/` (base `/AtlasOfClimateChange`).
- `npm run preview` — serve the production build locally.

The CMS admin lives at `/admin/` (`public/admin/`). `local_backend: true` in
`config.yml` makes it read/write the local file system during development —
but only while `decap-server` (started by `npm run dev`) is running. If that
proxy isn't running, the CMS silently falls back to the GitHub backend
instead of local files.

## Project structure

```
public/
  admin/            Decap CMS (index.html + config.yml)
  images/atlas/     Infographic images (managed by the CMS)
src/
  pages/
    index.astro     Homepage feed (chapters → infographics, grid/list, TOC)
    [slug].astro    Infographic detail page (dynamic)
    about.astro     About page (static, CMS-edited content)
  layouts/Layout.astro
  components/        Nav, FancyBar, Button, Tag, CroppedInfographic, feed/*, icons/*
  scripts/           Page JS as ES modules (scroll-spy, overlays, nav)
  data/
    chapters.ts      Chapter interface + name lookup (loads chapters.json)
    chapters.json    CMS-managed chapter names / taglines / order
    infographics.ts  Feed assembly from the CMS collection
    ui.ts            All fixed UI microcopy (labels, buttons, aria-labels)
    site.json        CMS-managed external links (About sidebar), language switcher + footer
  content/infographics/   Markdown content (Decap collection)
  content/about/about.md  About page title + body (single-file Decap collection)
  content.config.ts       Collection schemas
  styles/            tokens.css, typography.css, global.css
```

Deployment is automated: pushing to `main`/`master` runs
`.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages.

## Editing content

- **Infographics** — CMS *Infographics* collection (`src/content/infographics/`).
- **About page** — CMS *About Page* collection (`src/content/about/about.md`).
- **Navigation & languages** — CMS *Settings → Navigation & Languages*
  (`src/data/site.json`). The language switcher reads from here, and the
  "External links" box in the About page's sidebar reads from `menuLinks`.
- **Chapter names / taglines** — CMS *Settings → Chapters* (`src/data/chapters.json`).
  Translate the name and tagline; keep each chapter's `id` unchanged (it links
  infographics to their chapter).
- **Fixed interface text** (labels, buttons, aria-labels) — `src/data/ui.ts`.

## Creating a new language version (fork)

Each language is its **own repository and its own GitHub Pages deployment**. To
spin up a new mutation on your GitHub account:

1. **Fork this repository** to your GitHub account (or use *Use this template* /
   create a new repo from a copy). Give it a clear name, e.g.
   `AtlasOfClimateChange-DE`.

2. **Point the build at your repo.** In `astro.config.mjs`:
   - `site` → `https://<your-user>.github.io`
   - the default `base` → `/<your-repo-name>` (must match the repo name, since
     GitHub Pages serves a project site at `/<repo-name>/`). If you deploy to a
     custom domain at the root, set `base` to `/` instead.

3. **Point the CMS at your repo.** In `public/admin/config.yml`:
   - `backend.repo` → `<your-user>/<your-repo-name>`
   - `backend.branch` → your default branch (`main` or `master`)
   - `backend.base_url` → your own Decap OAuth proxy. GitHub login for the CMS
     needs a small OAuth backend (e.g. a Cloudflare Worker) tied to a **GitHub
     OAuth app you create**. Until it's set up, edit content locally with
     `local_backend: true`, or commit Markdown directly on GitHub.

4. **Translate.** Replace the English text with your language:
   - `src/data/ui.ts` — all interface strings.
   - CMS *Settings → Chapters* (`src/data/chapters.json`) — chapter names and
     taglines (keep the `id`s unchanged).
   - `src/content/infographics/*.md` — titles, leads, and bodies (and swap in
     translated images under `public/images/atlas/` if needed).
   - `src/data/site.json` — the About page's external links, and the **language switcher links**:
     add an entry pointing back to every other language version so visitors can
     move between them.
   - `src/layouts/Layout.astro` — set `<html lang="…">` to your language code.

5. **Enable GitHub Pages.** In the fork's *Settings → Pages*, set the source to
   **GitHub Actions**. Pushing to the default branch then builds and deploys via
   the included workflow; your site appears at
   `https://<your-user>.github.io/<your-repo-name>/`.

6. **Cross-link the versions.** Once live, add the new site's URL to the
   `languages` list of every other language version (via their CMS *Settings →
   Navigation & Languages*) so the switcher lists it everywhere.
