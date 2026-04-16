---
title: Animal welfare, visualized
author: Henry Stanley
created: 2026-04-14
updated: 2026-04-14
---

It's hard to have a clear understanding of the experience of different farmed
animals. How much can they feel pain? How much 'suffering' goes into each
animal's life, and how does that translate to what goes onto your plate? What
foods should you cut out first if you care about animal welfare?

The answers hinge on a number of assumptions. We're going to explore some of
them here. You can build your intuition, and see what assumptions your beliefs
hinge on.

# How much can animals suffer?

Different kinds of farmed animals are treated differently. They undergo
different procedures, they're kept in different conditions, they live for
different amounts of time. Not only this, but animals probably differ in their
internal experiences and their ability to feel pain.

There are many unanswered questions here: we're confident that vertebrates feel
pain, but how intensely? We're increasingly confident that cephalopods like
lobsters feel pain -- many countries have banned the practice of boiling these
animals alive. Can insects feel pain? How can we weigh up the pain a chicken
feels when it's being debeaked, versus a lamb being castrated?

There are a few ways to tackle some of these questions.

Brain size is one proxy we can use to compare different animals' experiences.
If we assume that chickens and cows feel pain, we can use a few metrics to try
to establish how similar their experiences are.

A simple way to do this would be to compare the mass of each animal's brain.
Clearly chickens have much smaller brains than cows -- we might assume then that
the amount they suffer would be proportionally smaller.

One issue is that the mass of a brain doesn't necessarily correlate to the
number of neurons, the basic machinery of the brain. A more sophisticated
metric would be neuron count -- twice as many neurons implies double the
ability to feel pain.

But the parts of the brain that respond to pain are a small
proportion of the brain's overall mass. These parts of the brain are highly
conserved, as one would expect for something as important as sensing pain -- a
crucial function in keeping an animal alive and causing it to move away from
danger. The parts of the brain that evolved later might not be relevant in
considering an animal's capacity for pain.

Fish, for example, don't have a cortex. But there's increasing consensus that
they feel pain, too -- they have pain-like responses to things that might hurt
them, and they are intelligent enough to use tools, learn from their
experiences, and avoid locations where they've previously been hurt.

Below, you can explore some different ways to think about how different animals
might feel pain based on different assumptions -- whether it's just neuron
count that matters, log neurons (which increases the weight given to smaller
animals), cortical neurons (which means that fish and shrimp don't count at
all).

We also include a midpoint weighting from Rethink Priorities research,
which combines evidence from across neuroscience and behavioural studies to
attempt to quantify different animals' moral weights.

{{widget:pain-model}}

# Counting life-days per animal

Farmed animals are very different sizes -- shrimp are tiny, and you could
consume a dozen in a single meal. Cows are very large; you might consume only a
small fraction of a cow in a single meal. 

One way to think about this is 'life-days'. Two animals might live similar
lives for the same length of time -- but if one is much larger than another,
each meal you have will have fewer life-days in it. A cow is much larger than a
chicken; if each lived for a year, a hamburger might represent only 1% of that
cow's life-days, but a chicken breast might represent 25% of the chicken's
life-days.

This means different diets can represent very different numbers of life-days.
If you eat a lot of chicken, this number could be very large. If you only eat
beef, it'll be much smaller.

{{widget:life-days
  lifespan: Dairy cows live for six years on average. Chickens raised for meat live for just 42 days.
  edible: Dairy cows produce a large amount of milk over their lifetime. Salmon, shrimp and chickens are small, so provide a tiny amount of food per animal.
  lifedays: Combining the two, we see that shrimp, fish and eggs are by far the largest contributors to life-days.
}}

Now that we know how many days of life different foods represent, what does a
whole year's diet look like?

# What's in a diet?

Eating a different diet will mean eating different animals. If some animals are smaller and live less long than others, what does that mean for how many animal life-days go into our diets?

Because some animals are so small, and each one makes a very slight contribution to our diets, most life-days are accounted for by smaller animals like shrimp, fish and chicken. The average American, European and British diets differ in their composition, which means different numbers of life-days for each.

{{widget:diet-calculator
  intro: Different diets translate to very different numbers of life-days per year. Brits and Europeans consume more fish than Americans, which translates into more life-days.
}}

The numbers here are surprising – because fish and chickens are so small, they make up almost all of the life-days in our diets. Cows make up a much smaller amount, and dairy almost none.

This has some counterintuitive implications. Those aspiring to reduce their
animal consumption should cut out fish and eggs first -- per kg these cause by
far the most amount of suffering. Cutting out beef should be done second last;
eliminating milk is the lowest-impact diet intervention.

# Putting it together

A more sophisticated model would include both _how much_ each animal can
suffer, and _how many_ of them are in your diet.

{{widget:suffering-days}}

These are relatively simple models -- considering how many animals get eaten in
a given diet, how many days of each animal's life that corresponds to, and how
much those animals suffer, giving us a final accounting of how much suffering
our diets cause.

Of course, animals are treated very differently. It's plausible that
pasture-raised cattle, for example, have enjoyable lives until they are
slaughtered. Dairy cows are also relatively well-treated, although they go
through regular cycles of artificial insemination, pregnancy, and having their
calves taken away. Pigs and chickens are subject to the most painful procedures
-- debeaking, castration without anesthetic, restrictions on movement. These
are not captured in the above models.

In Part 2, we'll attempt to consider what life is like for different animals,
and weave this into how their life-days ought to be weighed up, to give a
clearer picture of our food system.

---

If this changed your mind about animal welfare, consider [donating to effective
organisations](https://animalcharityevaluators.org/) which seek to reform the
way we raise animals for food, [pay for
'offsets'](https://www.farmkind.giving/) to cover the animals you consume, and
consider changing your diet to reduce the amount of suffering it causes.

# Sources and methodology

**Pain weighting models.** The neuron-based models (linear, log, squared, cortical) use neuron counts from [Herculano-Houzel (2009)](https://doi.org/10.3389/neuro.09.031.2009). Salmon neuron counts are extrapolated from zebrafish data and are highly uncertain. Shrimp neuron counts are rough estimates from the literature.

**Rethink Priorities welfare ranges.** The RP welfare range estimates are midpoint values from the [Rethink Priorities Moral Weight Project](https://rethinkpriorities.org/research-area/moral-weight/) (Fischer et al., 2022), which combines neurophysiological and behavioural evidence to estimate different species' capacity for welfare. Cows were not directly studied by RP -- we use the pig estimate (0.55) as a proxy.

**Lifespan and yield data.** Farmed animal lifespans and edible yields are drawn from [Tomasik (2007, updated 2018)](https://reducing-suffering.org/how-much-direct-suffering-is-caused-by-various-animal-foods/) and USDA statistics. Dairy cow "edible kg" represents total milk yield over a six-year lifespan. Egg yield is measured in eggs rather than kg (one egg ≈ 55g).

**Diet composition.** Per-capita consumption figures for European, American, and British diets are based on FAOSTAT and USDA food availability data. The vegetarian preset assumes eggs and dairy only; the vegan preset is zero for all animal products.
