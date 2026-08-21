# Open items

Things noted while working, to resolve later.

> **When resolving any large item here, update `README.md` and `CLAUDE.md`** to
> reflect the change in the same pass.

## Deployment

### Custom domain

Currently deploys to the GitHub Pages project URL
(`https://<user>.github.io/<repo>/`). Set up the real custom domain before
launch: add a `CNAME`, point DNS at GitHub Pages, and set `siteUrl`/`basePath`
in `public/deploy.config.js` to serve at the domain root (`basePath: '/'`).

## Deploy ownership

`public/deploy.config.js` defaults point at a personal account —
`siteUrl: https://hiiampadik.github.io` and the Decap OAuth proxy on a personal
Cloudflare Worker (`brona-musil.workers.dev`). Before launch, move the deploy +
OAuth backend to the production / organization account and update the defaults.

## Pre-launch cleanup

### Strip "still being built" notes from CLAUDE.md

Before deploy, clean CLAUDE.md of pre-launch phrasing — e.g. the *Working style*
notes referencing "The project is still being built (pre-deploy)" and
change-narration caveats that only make sense during the build phase.
