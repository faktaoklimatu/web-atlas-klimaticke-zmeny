/*
 * Přejmenuje kreslicí plátna na názvy, které používá web.
 * Spuštění: Illustrator → File → Scripts → Other Script… → vyber tento soubor.
 *
 * Nic neexportuje. Po přejmenování použij File → Export → Export for Screens,
 * které pojmenuje soubory podle pláten — takže vyjdou přesně ty názvy, které
 * leží v public/images/atlas/ (stav k 18. 9. 2026).
 *
 * Názvy nejsou odvozované, jsou vypsané níž natvrdo. Pořadí je pořadí Atlasu
 * (kapitola → pořadí v kapitole), tedy pořadí stránek v PDF: N-té plátno
 * dostane N-tý název ze seznamu.
 */

#target illustrator

// ─── Nastavení ────────────────────────────────────────────────────────
var OFFSET = 0;   // kolik pláten na začátku přeskočit (obálka, obsah…)
// ──────────────────────────────────────────────────────────────────────

var NAMES = [
  'priciny-a-nasledky-zmeny-klimatu',              // 1.1 Úvod
  'sto-let-vedy-o-klimatu',                        // 1.2
  'koncentrace-co2-na-maximu-za-800000-let',       // 2.1 Fyzikální základy
  'menici-se-rovnovaha-co2-a-o2-v-atmosfere',      // 2.2
  'jak-moc-se-planeta-otepluje',                   // 2.3
  'mapa-teplotnich-zmen-ve-svete',                 // 2.4
  'cesko-se-otepluje-rychleji-nez-svet',           // 2.5
  'oteplovani-od-doby-ledove-az-po-soucasnost',    // 2.6
  'prima-vazba-mezi-co2-a-teplotou',               // 2.7
  'sklenikovy-efekt-a-energeticka-nerovnovaha-zeme', // 2.8
  'zrychlujici-vzestup-hladiny-mori',              // 3.1 Dopady
  'extremni-pocasi-pribyva-a-sili',                // 3.2
  'mapa-klimatickych-bodu-zlomu',                  // 3.3
  'teplotni-prahy-pro-body-zlomu',                 // 3.4
  'na-jakych-sklenikovych-plynech-nejvic-zalezi',  // 4.1 Výhledy
  'globalni-emise-stale-rostou',                   // 4.2
  'uhlikovy-rozpocet-kolik-jeste-zbyva',           // 4.3
  'scenare-otepleni-v-roce-2100',                  // 4.4
  'historie-mezinarodnich-klimatickych-dohod',     // 5.1 Řešení
  'opatreni-a-reseni-napric-sektory',              // 5.2
  'emise-v-eu-dlouhodobe-klesaji',                 // 5.3
  'jak-se-snizuji-emise-v-cesku',                  // 5.4
  'kdo-prinasi-zmenu-stat-firmy-a-lide'            // 5.5
];

function main() {
  if (app.documents.length === 0) {
    alert('Nejdřív otevři dokument.');
    return;
  }
  var doc = app.activeDocument;

  // Názvy se přiřazují podle pořadí, takže sedící počet pláten je jediná
  // pojistka proti tomu, aby se celý seznam posunul o jedno a každé plátno
  // dostalo cizí jméno.
  if (doc.artboards.length - OFFSET !== NAMES.length) {
    alert(
      'Pozor: dokument má ' + doc.artboards.length + ' pláten' +
      (OFFSET ? ' (z toho ' + OFFSET + ' přeskočených)' : '') +
      ', ale názvů je ' + NAMES.length + '.\n\n' +
      'Uprav OFFSET nahoře ve skriptu, nebo seznam NAMES.'
    );
    return;
  }

  // Kontrola před zápisem — ať se omylem nepřejmenuje všech 23 pláten špatně.
  var preview = [];
  for (var p = 0; p < 3; p++) {
    preview.push('plátno ' + (p + 1 + OFFSET) + ' („' + doc.artboards[p + OFFSET].name + '“)  →  ' + NAMES[p]);
  }
  preview.push('…');
  preview.push('plátno ' + doc.artboards.length + ' („' + doc.artboards[doc.artboards.length - 1].name + '“)  →  ' + NAMES[NAMES.length - 1]);
  if (!confirm('Sedí pořadí?\n\n' + preview.join('\n') + '\n\nPřejmenovat?')) return;

  for (var i = 0; i < NAMES.length; i++) {
    doc.artboards[i + OFFSET].name = NAMES[i];
  }

  alert(
    'Přejmenováno: ' + NAMES.length + ' pláten.\n\n' +
    'Teď File → Export → Export for Screens, formát PNG.'
  );
}

main();
