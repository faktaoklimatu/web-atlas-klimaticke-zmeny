# Changelog

## 2026-09-10 — Lokalizace obsahu do češtiny

**Zdroj textů:** `atlas-zmeny-klimatu-online.pdf` — *Atlas klimatické změny: Vizuální
průvodce vědou a daty*, třetí revidované a rozšířené vydání (Fakta o klimatu, Brno,
září 2026, ISBN 978-80-909942-2-5).

**Zdroj obrázků:** Google Drive → *Fakta: Grafické práce* →
`2026-atlas-of-climate-change-remaster/infographics/cz/infografiky-export/PNG`.

---

### Změněno — infografiky nahrazeny českou verzí

21 souborů v `public/images/atlas/` přepsáno českým exportem. **Názvy souborů
zůstaly beze změny**, frontmatter `image` / `downloads` proto nebylo nutné upravovat.

| s. v PDF | soubor v repozitáři | zdrojový export |
| ---: | --- | --- |
| 5 | `atlas-_08.png` | `01-priciny-a-nasledky.png` |
| 7 | `atlas-_10.png` | `02-sto-let-vedy-o-klimatu.png` |
| 9 | `atlas-_12.png` | `03-koncentrace-co2.png` |
| 11 | `atlas-_14.png` | `04-menici-se-rovnovaha.png` |
| 13 | `atlas-_16.png` | `05-jak-moc-se-planeta-otepluje.png` |
| 15 | `atlas-_18.png` | `06-mapa-teplotnich-zmen.png` |
| 19 | `atlas-_20.png` | `08-oteplovani-od-doby-ledove.png` |
| 21 | `atlas-_22.png` | `09-prima-vazba-co2-teplota.png` |
| 23 | `atlas-_24.png` | `10-sklenikovy-efekt.png` |
| 25 | `atlas-_26.png` | `11-zrychlujici-vzestup-hladiny.png` |
| 27 | `atlas-_28.png` | `12-extremni-pocasi.png` |
| 29 | `atlas-_30.png` | `13-mapa-klimatickych-zlomu.png` |
| 31 | `atlas-_32.png` | `14-teplotni-prahy-body-zlomu.png` |
| 33 | `atlas-_34.png` | `15-na-jakych-sklenikovych-plynech-zalezi.png` |
| 35 | `atlas-_36.png` | `16-globalni-emise-rostou.png` |
| 37 | `atlas-_38.png` | `17-uhlikovy-rozpocet.png` |
| 39 | `atlas-_40.png` | `18-scenare-otepleni-v-roce-2100.png` |
| 41 | `atlas-_42.png` | `19-historie-mezinarodnich-dohod.png` |
| 43 | `atlas-_44.png` | `20-opatreni-sektory.png` |
| 45 | `atlas-_46.png` | `21-emise-vyvoj-eu.png` |
| 49 | `atlas-_48.png` | `22-emise-vyvoj-eu copy 2.png` |

Dva exporty byly ve zdrojové složce **pojmenované chybně** — obsah byl ověřen
otevřením souborů, nikoli podle názvu:

- `22-emise-vyvoj-eu copy 2.png` → ve skutečnosti *Kdo přináší změnu? Stát, firmy a lidé* (s. 49)
- `22-emise-vyvoj-eu copy.png` → ve skutečnosti *Jak se snižují emise v Česku?* (s. 47)

### Změněno — `title` a `lead` přeloženy do češtiny

21 souborů v `src/content/infographics/`. Přepsán pouze frontmatter; **texty
článků (body) zůstávají v angličtině.** Slugy souborů a URL se nezměnily.

#### `causes-and-effects-of-climate-change.md` (s. 5)

- **title:** ~~Causes and Effects of Climate Change~~ → **Příčiny a následky změny klimatu**
- **lead:** ~~Climate change is much more than rising temperatures. It is a long chain of interconnected causes and effects.~~ → **Klimatická změna je mnohem víc než jen nárůst teploty. Je to dlouhý řetězec vzájemně propojených příčin a následků.**

#### `century-of-climate-science.md` (s. 7)

- **title:** ~~Century of Climate Science~~ → **Sto let vědy o klimatu**
- **lead:** ~~We have known about climate change caused by CO₂ emissions for more than a hundred years.~~ → **O klimatické změně způsobené emisemi CO₂ víme více než 100 let.**

#### `co2-concentrations-at-an-800000-year-high.md` (s. 9)

- **title:** ~~CO₂ Concentrations at an 800,000-Year High~~ → **Koncentrace CO₂ na maximu za 800 000 let**
- **lead:** ~~The concentration of atmospheric CO₂ today is the highest since the dawn of humanity.~~ → **Dnešní koncentrace CO₂ dosahují hodnot, které na Zemi nebyly za celou dobu existence lidstva.**

#### `the-changing-balance-of-atmospheric-co2-and-o2.md` (s. 11)

- **title:** ~~The Changing Balance of Atmospheric CO₂ & O₂~~ → **Měnící se rovnováha CO₂ a O₂ v atmosféře**
- **lead:** ~~Changes in carbon dioxide and oxygen concentrations show annual cycles of respiration and photosynthesis, as well as the long-term effects of fossil fuel combustion.~~ → **Časový průběh koncentrací CO₂ a kyslíku ukazuje roční cykly fotosyntézy a dýchání rostlin i dlouhodobé důsledky spalování fosilních paliv.**

#### `how-much-is-the-planet-warming.md` (s. 13)

- **title:** ~~How Much Is the Planet Warming?~~ → **Jak moc se planeta otepluje?**
- **lead:** ~~The world is now approximately 1.3 °C warmer than in 1850–1900. Over the last thirty years, the warming rate has been around 0.25 °C per decade.~~ → **Svět je nyní o přibližně 1,3 °C teplejší než v letech 1850–1900. V posledních 30 letech se otepluje tempem okolo 0,25 °C za desetiletí.**

#### `global-map-of-temperature-changes.md` (s. 15)

- **title:** ~~Global Map of Temperature Changes~~ → **Mapa teplotních změn ve světě**
- **lead:** ~~The warming rate is not uniform around the globe. Continents warm faster than oceans, and the Northern Hemisphere faster than the Southern.~~ → **Mezi lety 1961 a 2025 probíhala změna klimatu na různých místech planety různě rychle. Kontinenty se oteplují rychleji než oceány a severní polokoule se otepluje rychleji než jižní.**

#### `warming-from-last-glacial-period-to-present.md` (s. 19)

- **title:** ~~Warming from the Last Glacial Period to the Present~~ → **Oteplování od doby ledové až po současnost**
- **lead:** ~~It took the planet at least 7,000 years to warm by 7 °C from the last glacial period. It took only the last 100 years to warm by 1.3 °C.~~ → **V přechodu od poslední doby ledové se planeta oteplovala tempem asi 1 °C za tisíciletí. V současnosti se otepluje více než desetkrát rychleji.**

#### `the-direct-link-between-co2-and-temperature.md` (s. 21)

- **title:** ~~The Direct Link Between CO₂ and Temperature~~ → **Přímá vazba mezi CO₂ a teplotou**
- **lead:** ~~The higher the CO₂ concentration in the atmosphere, the higher the Earth's temperature.~~ → **Čím vyšší jsou koncentrace CO₂ v atmosféře, tím vyšší je teplota planety. Jak vysoké koncentrace CO₂ v atmosféře budou, záleží na tom, kolik emisí lidstvo vypustí.**

#### `the-greenhouse-effect-and-energy-imbalance.md` (s. 23)

- **title:** ~~The Greenhouse Effect and Energy Imbalance~~ → **Skleníkový efekt a energetická nerovnováha Země**
- **lead:** ~~Earth's climate is set by a balance between energy from the Sun and energy radiated back to space. Human activity has now disrupted this equilibrium.~~ → **Klima Země určuje tepelná rovnováha mezi energií přijatou ze Slunce a energií vyzářenou zpět do vesmíru. Lidmi způsobené změny v atmosféře tuto rovnováhu narušily.**

#### `accelerating-sea-level-rise.md` (s. 25)

- **title:** ~~Accelerating Sea Level Rise~~ → **Zrychlující vzestup hladiny moří**
- **lead:** ~~From 1880 to 2025, global mean sea level rose by about 25 centimetres — and it will keep rising for centuries.~~ → **Mezi lety 1880 a 2025 vzrostla globální průměrná hladina moří přibližně o 25 cm. S rostoucí teplotou oceánů a táním ledovců bude hladina i nadále stoupat po celá staletí.**

#### `extreme-weather-is-growing-more-severe.md` (s. 27)

- **title:** ~~Extreme Weather Is Growing More Severe~~ → **Extrémní počasí přibývá a sílí**
- **lead:** ~~Extreme weather events occur more frequently and with greater intensity with any rise in global temperature.~~ → **S každým nárůstem globální teploty budou extrémní projevy počasí častější a intenzivnější.**

#### `map-of-climate-tipping-points.md` (s. 29)

- **title:** ~~Map of Climate Tipping Points~~ → **Mapa klimatických bodů zlomu**
- **lead:** ~~Beyond certain critical thresholds, Earth's response to warming is no longer linear or predictable.~~ → **Nad kritickými teplotními prahy již Země nereaguje na oteplování lineárně ani předvídatelně. Aktivace těchto bodů zlomu přinese rozsáhlé a nevratné změny naší planety.**

#### `the-thresholds-of-climate-tipping-risks.md` (s. 31)

- **title:** ~~The Thresholds of Climate Tipping Risks~~ → **Teplotní prahy pro body zlomu**
- **lead:** ~~Five of Earth's vital climate components are already at risk of irreversible change.~~ → **U pěti klíčových složek klimatického systému Země již dnes hrozí nevratné změny. Při oteplení o 2 °C se spuštění sedmi bodů zlomu stává pravděpodobným, zatímco dalších šest se ocitá v pásmu rizika.**

#### `which-greenhouse-gases-matter-most.md` (s. 33)

- **title:** ~~Which Greenhouse Gases Matter Most?~~ → **Na jakých skleníkových plynech nejvíc záleží?**
- **lead:** ~~While CO₂ emissions are the dominant force behind warming, methane, nitrous oxide, and F-gases also play a significant role.~~ → **Zatímco emise CO₂ jsou hlavní příčinou globálního oteplování, významnou roli při posilování skleníkového efektu hrají také metan (CH₄), oxid dusný (N₂O) a fluorované plyny (F-plyny).**

#### `global-emissions-continue-to-grow.md` (s. 35)

- **title:** ~~Global Emissions Continue to Grow~~ → **Globální emise stále rostou**
- **lead:** ~~Global greenhouse gas emissions have nearly doubled over the past 55 years.~~ → **Globální emise skleníkových plynů se za posledních 55 let téměř zdvojnásobily. Jejich růst vrcholil v nultých letech (2000–2009), výrazně zpomalil v desátých letech (2010–2019), ale po roce 2020 začal opět zrychlovat.**

#### `the-carbon-budget-how-much-remains.md` (s. 37)

- **title:** ~~The Carbon Budget: How Much Remains?~~ → **Uhlíkový rozpočet: Kolik ještě zbývá?**
- **lead:** ~~If emissions continue at 2025 levels, the remaining carbon budget for staying below 1.5 °C will be exhausted in 2030.~~ → **Pokud emise CO₂ zůstanou na úrovni roku 2025, vyčerpá se uhlíkový rozpočet, při kterém se oteplení udrží pod 1,5 °C, už v roce 2030; pro hranici 2 °C v roce 2051.**

#### `projections-of-warming-in-2100.md` (s. 39)

- **title:** ~~Projections of Warming in 2100~~ → **Scénáře oteplení v roce 2100**
- **lead:** ~~With current policies, the world is on track for about 2.6 °C of warming by the end of this century.~~ → **Současná opatření směřují svět k oteplení o 2,6 °C do konce století. Pouze v případě, že státy dodrží všechny své klimatické přísliby, se podaří nárůst teploty omezit na zhruba 1,9 °C v roce 2100.**

#### `the-history-of-international-climate-agreements.md` (s. 41)

- **title:** ~~The History of International Climate Agreements~~ → **Historie mezinárodních klimatických dohod**
- **lead:** ~~Key milestones in the global effort to protect the climate — summits, panels, negotiations, and treaties.~~ → **Časová osa zachycuje klíčové události světového úsilí v ochraně klimatu – přehled hlavních mezinárodních klimatických setkání, jejich aktérů a výstupů.**

#### `climate-solutions-across-sectors.md` (s. 43)

- **title:** ~~Climate Solutions Across Sectors~~ → **Opatření a řešení napříč sektory**
- **lead:** ~~Stopping greenhouse gas emissions requires distinct strategies for different sectors of the economy.~~ → **Zastavení emisí skleníkových plynů vyžaduje odlišné strategie pro různá odvětví. Hluboká dekarbonizace většinou spoléhá na kombinaci několika řešení spíše než na jediný univerzální recept.**

#### `the-steady-decline-of-eu-emissions.md` (s. 45)

- **title:** ~~The Steady Decline of EU Emissions~~ → **Emise v EU dlouhodobě klesají**
- **lead:** ~~Between 1990 and 2024, EU emissions dropped by over one third — decreasing in every sector except transportation.~~ → **Mezi lety 1990 a 2024 klesly emise v EU o 36 %. Emise se snížily ve všech sektorech s výjimkou dopravy.**

#### `who-drives-change-state-business-and-people.md` (s. 49)

- **title:** ~~Who Drives Change? State, Business, and People~~ → **Kdo přináší změnu? Stát, firmy a lidé**
- **lead:** ~~Decarbonization involves three main groups of actors: the state, businesses, and people. Success depends on their cooperation.~~ → **Na dekarbonizaci se podílejí tři hlavní skupiny aktérů: stát, firmy a lidé. Úspěch závisí na jejich spolupráci, protože každá z těchto skupin disponuje jinými nástroji ke snižování emisí.**

### Přidáno — dvě infografiky, které anglické vydání nemá

Třetí, rozšířené vydání přidává dvě specificky české infografiky. Obě mají nyní
vlastní stránku; text článku je přepsán z příslušné dvoustrany PDF.

| s. v PDF | slug | kapitola | pořadí | obrázek |
| ---: | --- | --- | ---: | --- |
| 17 | `czechia-is-warming-faster-than-the-world` | `the-science` | 5 | `atlas-cesko-se-otepluje-rychleji.png` |
| 47 | `how-czech-emissions-are-falling` | `the-solutions` | 4 | `atlas-jak-se-snizuji-emise-v-cesku.png` |

Zdrojové exporty: `07-cesko-se-otepluje-rychleji.png` a `22-emise-vyvoj-eu copy.png`
(druhý je ve zdrojové složce pojmenován chybně, viz výše).

Nové obrázky **nepoužívají schéma `atlas-_NN.png`** — to odpovídá stránkování
anglického tisku, kde tyto infografiky neexistují. Místo toho mají popisný název.

### Změněno — přečíslování `order` v dotčených kapitolách

Vložením nových stránek se posunulo pořadí následujících položek tak, aby
kapitoly odpovídaly sledu stran v tištěném atlasu:

| slug | kapitola | order |
| --- | --- | --- |
| `warming-from-last-glacial-period-to-present` | `the-science` | 5 → 6 |
| `the-direct-link-between-co2-and-temperature` | `the-science` | 6 → 7 |
| `the-greenhouse-effect-and-energy-imbalance` | `the-science` | 7 → 8 |
| `who-drives-change-state-business-and-people` | `the-solutions` | 4 → 5 |

Po úpravě má web 23 infografik; v každé kapitole je `order` souvislá řada 1…n
a odpovídá pořadí stran v PDF.

*Poznámka: „Emise v EU dlouhodobě klesají“ (s. 45) chybí v obsahu na s. 3 PDF,
ale ve stránkování mezi s. 43 a 47 je — v `the-solutions` proto zůstává na pozici 3.*

### Nalezené problémy (neopraveno)

- `src/data/site.json` → `atlasPdfUrl` ukazuje na
  `ebook_cz_zelenina_kterou_vypestuje_kazdy.pdf` — nesouvisející soubor.
  Chybí cílové PDF atlasu, proto ponecháno beze změny.

---

## Zbývá udělat

### Zbytek webu je stále v angličtině

- těla článků v 21 původních souborech `src/content/infographics/*.md`
  (dvě nově přidané stránky už český text mají)
- `src/data/site.json` (menu, „Facts on Climate“, odkaz na factsonclimate.org)
- názvy kapitol, UI řetězce a `<title>` šablony (`… — Atlas of Climate Change`)
- slugy souborů a URL (`/the-carbon-budget-how-much-remains/`)

### PDF exporty

Složka `infografiky-export/PDF` obsahuje stejných 23 souborů ve formátu PDF.
Do repozitáře nebyly zkopírovány — v `src/` na ně nevede žádný odkaz.
