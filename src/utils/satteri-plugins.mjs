// Shared Sätteri (Astro 7 Markdown) HAST plugins, used by both the build
// config (astro.config.mjs) and inline string rendering (markdown.ts) so link
// handling can't drift between Markdown bodies and CMS text fields.

// Prefix Markdown-authored root-absolute links (/slug/) with the deploy base so
// they resolve under /AtlasOfClimateChange (prod) and / (dev) alike. Astro does
// not do this for Markdown link hrefs.
export function satteriBaseLinks(prefix) {
  const clean = prefix.replace(/\/$/, ''); // '' when base is '/'
  return {
    name: 'satteri-base-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        if (!clean) return;
        const href = node.properties?.href;
        if (
          typeof href === 'string' &&
          href.startsWith('/') &&
          !href.startsWith('//') &&
          !href.startsWith(clean + '/')
        ) {
          ctx.setProperty(node, 'href', clean + href);
        }
      },
    },
  };
}

// Open external links (absolute http(s) or protocol-relative) in a new tab.
export function satteriExternalLinks() {
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
