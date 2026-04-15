# Counting Animals — Reference Data

Compiled April 2026. All numbers should be cross-checked against primary sources before hardcoding into widgets. Fields marked [VERIFY] need confirmation from the cited source directly.

---

## 1. Per Capita Animal Product Consumption

### United States (per person per year, retail/boneless weight unless noted)

Source: USDA ERS Food Availability data; USDA WASDE projections.

| Product | Amount | Unit | Year | Notes |
|---|---|---|---|---|
| Broiler chicken | ~102 | lbs | 2024–25 | Retail weight. Most consumed meat in US. |
| Beef | ~58 | lbs | 2024–25 | Retail weight. Declining long-term trend. |
| Pork | ~50 | lbs | 2024–25 | Retail weight. Relatively stable over decades. |
| Turkey | ~13 | lbs | 2025 | Declining from ~15 lbs in 2021. |
| Fish & shellfish | ~19 | lbs | 2019 | Most recent ERS figure (edible weight). |
| Eggs | ~22 dozen | per year | 2025 | ~264 eggs/year. |
| Milk/dairy | ~655 | lbs | 2021 | All dairy products, milk-equivalent. [VERIFY] |
| **Total meat** | **~226** | **lbs** | **2025** | **Red meat + poultry combined.** |

### Europe (approximate, per person per year)

Source: FAO Food Balance Sheets; Eurostat.

| Product | Amount | Unit | Notes |
|---|---|---|---|
| Poultry | ~25 | kg (~55 lbs) | Lower than US. Varies hugely by country. |
| Pork | ~32 | kg (~70 lbs) | Higher than US; dominant meat in many EU countries. |
| Beef | ~15 | kg (~33 lbs) | About half US levels. |
| Fish & seafood | ~24 | kg (~53 lbs) | Higher than US, esp. Portugal, Spain, Scandinavia. |
| Eggs | ~220 | eggs/year | Roughly comparable to US. |

### UK specifically

Source: DEFRA Family Food Survey; AHDB.

| Product | Amount | Unit | Notes |
|---|---|---|---|
| Poultry | ~30 | kg/year | UK eats more chicken than EU average. |
| Beef | ~17 | kg/year | |
| Pork | ~22 | kg/year | Including bacon, ham. |
| Fish | ~20 | kg/year | |
| Eggs | ~200 | eggs/year | [VERIFY against latest DEFRA data] |

### Vegetarian & Vegan

For the widget presets, the vegetarian diet replaces all meat with increased dairy and eggs. Approximate annual consumption:

- **Lacto-ovo vegetarian**: 0 meat/fish, ~300 eggs/year, ~700 lbs dairy equivalent/year. Heavier reliance on cheese, yoghurt.
- **Pescatarian**: 0 land-animal meat, ~25 lbs fish/year, eggs and dairy similar to omnivore.
- **Vegan**: 0 animal products. Widget should output zero suffering-days (for farmed animals; wild-animal crop deaths are out of scope).

---

## 2. Farming Data Per Animal (for Widget 1: Suffering Days)

Source: Tomasik, "How Much Direct Suffering Is Caused by Various Animal Foods?" (2007, updated 2018). Cross-referenced with USDA data.

| Animal/Product | Avg lifespan (days) | Edible food per animal (kg) | Suffering per day (beef cow = 1) | Death pain equiv. (days) | Notes |
|---|---|---|---|---|---|
| Beef cow | 395 | 212 | 1 | 10 | ~13 months. Feedlot portion worst. |
| Dairy cow | ~2,190 | 30,000 kg milk lifetime | 2 | 10 | ~5 yr life, ~3 yr productive. [VERIFY suffering/day] |
| Pig | 183 | 65 | 3 | 10 | 6 months to slaughter. |
| Broiler chicken | 42 | 1.9 | 4 | 10 | 5–7 weeks. Rapid growth causes leg problems. |
| Layer hen (eggs) | 501 | 16 kg eggs (288 eggs) | 4 | 10 | Battery cage conditions. ~72 weeks. |
| Turkey | 133 | 9.6 | 3 | 10 | ~19 weeks. |
| Farmed salmon | 639 | 2.0 | 3 | 10 | ~1.75 years. [VERIFY suffering/day — Tomasik's estimates for fish are less confident] |
| Farmed catfish | 820 | 0.39 | 3 | 10 | ~27 months. |
| Farmed shrimp | ~120 | ~0.015–0.03 | [unknown] | [unknown] | Tomasik notes he hadn't analysed shrimp. Estimates needed from other sources. |

### Tomasik's Formula

```
suffering_days_per_kg = [(days_of_life + death_pain_days) × sentience_multiplier × suffering_per_day] / kg_per_animal
```

For per-calorie or per-portion conversion, divide by kcal/kg of the product.

### Approximate kcal per kg of product

| Product | kcal/kg | Source |
|---|---|---|
| Beef (lean) | 2,500 | USDA FoodData Central |
| Pork (lean) | 2,400 | |
| Chicken breast | 1,650 | |
| Eggs | 1,550 | ~155 kcal per 100g |
| Milk (whole) | 610 | Mostly water |
| Salmon | 2,080 | |
| Shrimp | 990 | |

### Portion sizes for widget (real food units)

| Item | Portion | Weight (g) | Approx kcal |
|---|---|---|---|
| Chicken breast | 1 breast | 170 | 280 |
| Egg | 1 egg | 55 | 78 |
| Beef steak | 1 steak | 225 | 560 |
| Pork chop | 1 chop | 170 | 290 |
| Salmon fillet | 1 fillet | 150 | 310 |
| Tin of tuna | 1 tin | 145 | 180 |
| Pint of milk | 1 pint | 568 | 370 |
| Slice of cheese | 1 slice | 28 | 110 |
| Prawns/shrimp | 1 serving | 100 | 99 |
| Tin of anchovies | 1 tin | 45 | 95 |

---

## 3. Neuron Counts and Brain Data (for Widget 2: Weighting)

Sources: Wikipedia "List of animals by number of neurons" (compiled from Herculano-Houzel et al.); UW faculty.washington.edu/chudler brain facts; Eukaryote Writes Blog; various papers as cited.

### Key species table

| Species | Total neurons (brain) | Cortical/pallial neurons | Brain mass (g) | Body mass (kg) | Source notes |
|---|---|---|---|---|---|
| **Human** | 86 billion | 16–21 billion | 1,350 | 70 | Herculano-Houzel 2009. Neocortical: 19–23bn (Pakkenberg). |
| **Cow** | ~3 billion | ~300–700 million [estimated] | 425–458 | 500–700 | Herculano-Houzel, *The Human Advantage* (2016), estimated via artiodactyl scaling rules. Not a direct count. Carl Shulman's EA Forum post cites this. Cortical estimate extrapolated from pig cortical:total ratio and cow brain mass — treat as order-of-magnitude only. |
| **Pig** | 2.22 billion | ~430 million | 180 | 80–120 | Herculano-Houzel et al. Domestic pig. |
| **Chicken** (Red junglefowl) | ~220 million | ~60 million (pallium/DVR) | 3.1 | 1–2 | Olkowicz et al. 2016. Birds pack neurons densely. |
| **Salmon** (Atlantic) | ~10 million [VERY UNCERTAIN] | N/A | ~1–2 | 3–5 | Only zebrafish (~0.75g) has been directly counted (~10M neurons). Extrapolation to larger salmonids is highly uncertain — see EA Forum post on neuron counts underweighting farmed fish. This is a known data gap. |
| **Carp** | ~10 million [VERY UNCERTAIN] | N/A | ~1 | 1–3 | Same zebrafish extrapolation problem. |
| **Octopus** | ~500 million | N/A (no cortex) | ~5–10 | 1–5 | Neurons distributed through arms. Hochner et al. |
| **Shrimp** | ~100,000 | N/A | <0.01 | 0.01–0.03 | Very rough estimate. Crustacean neuron counts poorly studied. |
| **Honeybee** | ~960,000 | 170,000 (mushroom bodies) | 0.001 | 0.0001 | Menzel & Giurfa 2001. Remarkably capable for neuron count. |
| **Black soldier fly** | ~100,000–200,000 [VERIFY] | ~50,000 (MB) | <0.001 | <0.001 | Few direct counts. Estimated from Diptera scaling. |
| **Fruit fly** | 100,000–139,000 | 2,500 (MB) | 0.001 | 0.0001 | Connectome fully mapped 2024. |

### Critical caveat: the fish neuron gap

The EA Forum post "Neuron Count-Based Measures May Currently Underweight Suffering in Farmed Fish" (Dec 2022) documents that the only empirical fish neuron counts come from very small species (<1g body weight, primarily zebrafish). Applying zebrafish counts to a 3kg salmon is almost certainly wrong — larger fish likely have substantially more neurons — but nobody has counted. This means any neuron-based weighting of farmed fish is operating on deeply uncertain data. The widget should flag this.

---

## 4. Moral Weighting Functions (for Widget 2)

### Function definitions

All weights are expressed as fraction-of-human. Human = 1.0.

#### A. Equal
Every sentient animal = 1.0. The sentientist-maximalist position.

`weight = 1.0` for all species

#### B. Linear total neurons
`weight = total_neurons / 86,000,000,000`

| Species | Weight |
|---|---|
| Human | 1.0 |
| Cow | 0.035 |
| Pig | 0.026 |
| Chicken | 0.0026 |
| Salmon | 0.00012 |
| Octopus | 0.0058 |
| Shrimp | 0.0000012 |
| Honeybee | 0.000011 |

#### C. Linear cortical/pallial neurons
`weight = cortical_neurons / 19,000,000,000` (using ~19bn human cortical)

| Species | Weight |
|---|---|
| Human | 1.0 |
| Cow | 0.016 |
| Pig | 0.023 |
| Chicken | 0.0032 |
| Salmon | N/A (no reliable data) |
| Octopus | N/A (no cortex) |
| Shrimp | N/A |
| Honeybee | 0.0000090 (mushroom bodies) |

Note: This function breaks down for species without cortical homologues. Widget should grey out or flag these species.

#### D. Neurons squared
`weight = (total_neurons / 86e9)²`

Steeper discount for small animals. Makes invertebrates negligible.

| Species | Weight |
|---|---|
| Human | 1.0 |
| Cow | 0.0012 |
| Pig | 0.00067 |
| Chicken | 0.0000065 |
| Shrimp | 1.4 × 10⁻¹² |

#### E. Log neurons
`weight = log₁₀(total_neurons) / log₁₀(86e9)`

Flatter curve. Makes insects still matter a bit.

| Species | Weight |
|---|---|
| Human | 1.0 |
| Cow | 0.87 |
| Pig | 0.85 |
| Chicken | 0.76 |
| Salmon | 0.64 |
| Shrimp | 0.46 |
| Honeybee | 0.55 |

Note: Log-neuron weighting is the most "animal-friendly" of the neuron-based approaches. Most people find it counterintuitively flat.

#### F. RP Welfare Ranges (median, probability-of-sentience-adjusted)

Source: Rethink Priorities Moral Weight Project, 2022. These are the 50th percentile estimates from their mixture model (30% neurophysiological, 10% equality, 60% simple additive). Values below are approximate composites from RP publications and secondary analyses (Nuno Sempere, Kyle Fish, Vasco Grilo). [VERIFY ALL AGAINST RP'S PUBLISHED SPREADSHEET]

**Cow is not included in RP's analysis.** Bob Fischer (lead author) explained on the EA Forum: "The numbers would be comparable to pigs, but because cows are farmed in such low numbers by comparison, we didn't prioritize them." For the widget, using the pig estimate as a proxy for cow is the best available option — flag this to the reader.

| Species | Median welfare range (relative to human = 1.0) | P5 | P95 | Prob. of sentience |
|---|---|---|---|---|
| Cow | *not studied — use pig as proxy* | — | — | >0.99 |
| Pig | ~0.55 | ~0.05 | ~0.95 | >0.99 |
| Chicken | ~0.33 | ~0.03 | ~0.85 | >0.99 |
| Carp | ~0.12 | ~0.01 | ~0.55 | >0.95 |
| Salmon | ~0.10 | ~0.01 | ~0.45 | >0.95 |
| Octopus | ~0.30 | ~0.02 | ~0.80 | >0.90 |
| Shrimp | ~0.03 | ~0.001 | ~0.20 | >0.50 |
| Crayfish | ~0.03 | ~0.001 | ~0.15 | >0.40 |
| Crab | ~0.03 | ~0.001 | ~0.15 | >0.40 |
| Honeybee | ~0.02 | ~0.001 | ~0.15 | >0.30 |
| Black soldier fly | ~0.01 | ~0.0005 | ~0.10 | >0.10 |
| Silkworm | ~0.01 | ~0.0005 | ~0.10 | >0.10 |

**Critical note**: These numbers are approximate reconstructions. RP's actual published estimates should be sourced from their spreadsheet at [https://docs.google.com/spreadsheets/d/1...] — search "Rethink Priorities moral weight project spreadsheet" for the canonical link.

RP themselves describe these as "placeholders — albeit, we submit, the best such placeholders available."

#### G. Threshold (common intuition baseline)
Binary/categorical approach approximating most people's revealed preferences.

| Category | Weight |
|---|---|
| Mammals | 1.0 |
| Birds | 1.0 |
| Fish | 0.1 |
| Cephalopods | 0.1 |
| Crustaceans | 0.01 |
| Insects | 0 |

---

## 5. Global Scale Numbers (for Widget 3)

### Animals farmed per year (slaughtered)

| Group | Annual slaughter (global) | Source |
|---|---|---|
| Chickens (broilers) | ~78–80 billion | FAO 2024; Faunalytics |
| Ducks | ~4.2 billion | FAO 2024 |
| Pigs | ~1.4 billion | FAO |
| Turkeys | ~626 million | FAO |
| Cattle | ~322 million | FAO |
| Sheep | ~600 million | FAO |
| Goats | ~495 million | FAO |
| **Total land animals** | **~88 billion** | **FAO 2024** |
| Farmed finfish | ~124–130 billion | Fishcount; Sentience Institute; ACE |
| Farmed crustaceans (mostly shrimp) | ~310–950 billion (midpoint ~630bn) | Fishcount 2022 estimate |
| Farmed insects (BSF + mealworm) | Low trillions (highly uncertain) | Rowe et al.; RP forecasting |
| **Humans alive** | **~8.1 billion** | **For comparison** |

### Animals alive on farms at any given moment

| Group | Alive at any time | Source |
|---|---|---|
| Broiler chickens | ~9–10 billion | RP 2025 forecast |
| Laying hens | ~8–9 billion | RP estimate |
| Pigs | ~700 million | FAO |
| Cattle | ~1 billion | FAO |
| Farmed fish | ~39–216 billion (midpoint ~77bn) | Sentience Institute |
| Farmed shrimp | Tens of billions [VERIFY] | RP shrimp sequence |
| Farmed insects | 127 billion–1.9 trillion (midpoint ~476bn) | RP 2025 forecast for 2033 |

### Key scale facts for the prose

- Chickens make up ~90% of all farmed land animals by headcount.
- More shrimp are farmed annually than all other farmed animals combined by headcount (if the Fishcount midpoint is right).
- Which group is "the biggest problem" flips at every step as you expand the circle of moral concern from mammals → birds → fish → crustaceans → insects.
- The RP 2025 forecasting report projects ~6 trillion farmed animals slaughtered in 2033, with invertebrates accounting for 95% of the total.

---

## 6. Key Sources and Further Reading

### Primary data sources
- **Tomasik**: "How Much Direct Suffering Is Caused by Various Animal Foods?" — https://reducing-suffering.org/how-much-direct-suffering-is-caused-by-various-animal-foods/
- **RP Moral Weight Project Sequence**: https://forum.effectivealtruism.org/s/y5n47MfgrKvTLE3pw — especially posts on welfare ranges, neuron counts, and the welfare range table.
- **RP Welfare Range Estimates (book chapter)**: Oxford Academic, "Weighing Animal Welfare" (2024).
- **RP "Why Neuron Counts Shouldn't Be Used as Proxies"**: https://forum.effectivealtruism.org/posts/Mfq7KxQRvkeLnJvoB
- **Wikipedia neuron list**: https://en.wikipedia.org/wiki/List_of_animals_by_number_of_neurons
- **Herculano-Houzel**: "The Human Advantage" (2016); various papers on isotropic fractionator method.
- **Our World in Data — Animal Welfare**: https://ourworldindata.org/animal-welfare
- **Faunalytics Global Slaughter Stats**: https://faunalytics.org/global-animal-slaughter-statistics-and-charts/
- **Sentience Institute estimates**: https://www.sentienceinstitute.org/global-animal-farming-estimates
- **Fishcount.org.uk**: Fish slaughter estimates.
- **USDA ERS Food Availability**: https://www.ers.usda.gov/data-products/food-availability-per-capita-data-system/
- **Sandhoefner's improved calculator** (builds on Tomasik): http://sandhoefner.github.io/animal_suffering_calculator

### Secondary analyses / critiques
- **"Is RP's Moral Weights Project too animal friendly?"** (Nick, EA Forum, Oct 2024) — four critical junctures critique.
- **Nuno Sempere, "A Bayesian Adjustment to RP's Welfare Range Estimates"** (Feb 2023).
- **"Net Global Welfare May Be Negative and Declining"** (Kyle Fish, EA Forum, Sep 2023) — uses RP weights to argue net welfare is negative.
- **"Weighing Animal Worth"** (Jeff Kaufman, EA Forum, Sep 2023) — argues RP estimates are selection-biased.
- **"Moral Weights of Animals, Considering Viewpoint Uncertainty"** (Seeds of Science, 2022) — Monte Carlo simulation across theories.
- **"Neuron Count-Based Measures May Currently Underweight Suffering in Farmed Fish"** (EA Forum, Dec 2022) — documents the zebrafish extrapolation problem.
- **Scott Alexander, "Cortical Neuron Number Matches Intuitive Perceptions of Moral Value Across Animals"** (SSC, Mar 2019; partially retracted).
- **"Perceived Moral Value of Animals and Cortical Neuron Count"** (EA Forum, Aug 2023) — replication study of Alexander's survey.

### Charities for closing section
- **The Humane League** — corporate campaigns for broiler welfare. ACE top charity.
- **Shrimp Welfare Project** — stunning advocacy for farmed shrimp.
- **Wild Animal Initiative** — research on wild animal welfare.
- **Arthropoda Foundation** — invertebrate welfare research.
- **Rethink Priorities** — research org behind the Moral Weight Project.
- **FarmKind** — compassion calculator / diet offset donations.

---

## 7. Known Data Gaps and Caveats

1. **Fish neuron counts are extrapolated from zebrafish.** No direct count exists for any commercially farmed fish species. This is the single largest data gap in the entire field.
2. **Shrimp/crustacean neuron counts are very rough.** Few direct counts; estimates are order-of-magnitude at best.
3. **Tomasik's suffering-per-day estimates are subjective.** They represent his personal judgment, not empirical measurement. The widget should let users see these assumptions but shouldn't present them as settled fact.
4. **RP welfare ranges are "placeholders".** RP's own language. The P5–P95 intervals are very wide — often spanning two orders of magnitude.
5. **Insect farming numbers are highly uncertain and growing fast.** Any figure from 2023 may be significantly outdated by 2026.
6. **"Suffering days" conflates very different experiences.** A day in a battery cage and a day in a feedlot are not equivalent even for the same species. Tomasik's suffering-per-day multiplier attempts to capture this but is necessarily crude.
7. **Dairy and eggs involve animals that live much longer per unit of food produced.** This makes them look *better* per suffering-day-per-kcal than meat from the same species, which is counterintuitive and worth flagging in the essay prose.
8. **Wild-animal suffering from crop agriculture is out of scope.** Including it would change the vegan preset from zero to some positive number, but the estimates are too uncertain to include without a separate essay.
9. **RP did not study cows.** The most widely consumed red-meat animal has no direct welfare range estimate. Fischer suggests using pig as proxy. Cow neuron counts are estimated via artiodactyl scaling by Herculano-Houzel (~3bn) rather than directly measured — plausible and from the leading authority, but not confirmed by isotropic fractionator.
