import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { deployConfig } from './public/deploy.config.js';

// Deploy identity (site URL, base path, CMS repo) lives in one place —
// public/deploy.config.js — so a fork edits only that file. Local dev + the
// Decap admin run at the root (BASE_PATH=/ in the dev script) so CMS image
// previews, which don't know about Astro's base, resolve correctly — hence the
// env override, which wins over deployConfig.basePath in dev.
const base = process.env.BASE_PATH ?? deployConfig.basePath;

// Markdown cross-links are authored root-absolute (/slug/). Astro does NOT
// prefix Markdown link hrefs with `base`, so rewrite internal links here so
// they resolve under /AtlasOfClimateChange (prod) and / (dev) alike.
//
// Sätteri (Astro 7's default Markdown processor) uses a filtered-visitor plugin
// model instead of remark/rehype: `filter` selects tags in Rust, `visit` runs
// per matched node, and mutations go through `ctx.setProperty` rather than
// direct assignment. This is the HAST port of the former rehype plugin.
function satteriBaseLinks() {
  const prefix = base.replace(/\/$/, ''); // '' when base is '/'
  return {
    name: 'satteri-base-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        if (!prefix) return;
        const href = node.properties?.href;
        if (
          typeof href === 'string' &&
          href.startsWith('/') &&
          !href.startsWith('//') &&
          !href.startsWith(prefix + '/')
        ) {
          ctx.setProperty(node, 'href', prefix + href);
        }
      },
    },
  };
}

// Open external Markdown links (footnote references, sources, inline links in
// infographic bodies) in a new tab. External = absolute http(s) or
// protocol-relative; everything else is an in-site link handled above.
function satteriExternalLinks() {
  return {
    name: 'satteri-external-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (
          typeof href === 'string' &&
          (/^https?:\/\//.test(href) || href.startsWith('//'))
        ) {
          ctx.setProperty(node, 'target', '_blank');
          ctx.setProperty(node, 'rel', 'noopener noreferrer');
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: deployConfig.siteUrl,
  base,
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  markdown: {
    processor: satteri({ hastPlugins: [satteriBaseLinks(), satteriExternalLinks()] }),
  },
});
