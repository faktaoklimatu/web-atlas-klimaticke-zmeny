/**
 * UI microcopy for the Atlas — the fixed interface strings that live in code
 * (not the CMS): nav, feed chrome, detail sidebar labels, footer. Single source
 * so the whole interface can be reviewed or translated from one place.
 * CMS-managed text stays in site.json; chapter names/taglines in chapters.json.
 */
export const ui = {
  /** Used for the homepage <title> and the detail-page title suffix. */
  siteTitle: 'Atlas of Climate Change',

  nav: {
    title: 'Atlas of climate change',
    subtitle: 'A Visual Guide to the Science and Data',
    primaryLabel: 'Primary',
    changeLanguage: 'Change language',
  },

  feed: {
    contents: 'Contents',
    closeContents: 'Close contents',
    tocLabel: 'Table of contents',
    viewMode: 'View mode',
    list: 'List',
    grid: 'Grid',
  },

  detail: {
    back: 'Back to homepage',
    download: 'Download',
    pdf: 'PDF',
    png: 'PNG',
    underlyingData: 'Underlying data',
    dataTable: 'Our data table',
    dataSource: 'Data source',
    moreArticles: 'More articles',
  },

  notFound: {
    heading: '404',
    subheading: 'Page Submerged',
    homeLabel: 'Back to homepage',
  },

  footer: {
    followUs: 'Follow us on social media',
    sponsorsLabel: 'Sponsors',
    sponsorPlaceholder: 'LOGO',
    languageLabel: 'Language',
    copyright: '© 2026 Otevřená data o klimatu, z.ú.',
    license: 'CC BY 4.0',
    email: 'info@faktaoklimatu.cz',
    social: {
      facebook: 'Facebook',
      instagram: 'Instagram',
      x: 'X',
      linkedin: 'LinkedIn',
    },
  },
} as const;
