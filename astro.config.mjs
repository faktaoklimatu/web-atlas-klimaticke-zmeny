import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

// The GitHub Pages project site lives under /AtlasOfClimateChange. Local dev +
// the Decap admin run at the root (BASE_PATH=/ in the dev script) so CMS image
// previews, which don't know about Astro's base, resolve correctly — and so dev
// matches the eventual custom-domain-at-root deployment. The production build
// keeps the /AtlasOfClimateChange base by default.
const base = process.env.BASE_PATH ?? '/AtlasOfClimateChange';

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

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://hiiampadik.github.io',
  base,
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  markdown: {
    processor: satteri({ hastPlugins: [satteriBaseLinks()] }),
  },
});
