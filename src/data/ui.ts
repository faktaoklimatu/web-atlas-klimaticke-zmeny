/**
 * UI microcopy for the Atlas — the fixed interface strings that live in code
 * (not the CMS): nav, feed chrome, detail sidebar labels, footer. Single source
 * so the whole interface can be reviewed or translated from one place.
 * CMS-managed text stays in site.json; chapter names/taglines in chapters.json;
 * site title and other SEO metadata in seo.json.
 */
export const ui = {
  a11y: {
    skipToContent: 'Přeskočit na obsah',
  },

  nav: {
    title: 'Atlas klimatické změny',
    subtitle: 'Vizuální průvodce vědou a daty',
    primaryLabel: 'Hlavní',
    about: 'O Atlasu',
    downloadPdf: 'Stáhni Atlas jako PDF',
    changeLanguage: 'Změnit jazyk',
    menu: 'Menu',
    closeMenu: 'Zavřít menu',
    languages: 'Jazyky',
  },

  feed: {
    contents: 'Obsah',
    closeContents: 'Zavřít obsah',
    tocLabel: 'Obsah',
    viewMode: 'Zobrazení',
    list: 'Seznam',
    grid: 'Mřížka',
  },

  detail: {
    back: 'Zpět domů',
    download: 'Stáhnout',
    underlyingData: 'Podkladová data',
    dataTable: 'Naše tabulka s daty',
    previousInfographic: 'Předchozí infografika',
    nextInfographic: 'Další infografika',
  },

  about: {
    externalLinks: 'Další odkazy',
  },

  notFound: {
    heading: '404',
    subheading: 'Stránka pod vodou',
    homeLabel: 'Zpět domů',
  },

  footer: {
    followUs: 'Sleduj nás na sociálních sítích',
    downloadPdf: 'Stáhni Atlas jako PDF',
    languageLabel: 'Dostupné jazykové verze',
    getInYourLanguage: 'Získej Atlas ve svém jazyce',
  },
} as const;
