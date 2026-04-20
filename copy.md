---
title: Weighing animal minds
author: Henry Stanley
created: 2026-04-18
updated: 2026-04-18
---

It's hard to have a clear understanding of the experience of different farmed
animals. Do they feel pain, and how much? How much 'suffering' goes into each
animal's life, and how does that translate to what goes onto your plate? What
foods should you cut out first if you care about animal welfare?

The answers hinge on a number of assumptions. We're going to explore some of
them here. You can build your intuition, and see what assumptions your beliefs
hinge on.

# How much can animals suffer?

Different kinds of farmed animals are treated differently. They undergo
different procedures, they're kept in different conditions, they live for
different amounts of time. Each day of each animal's life might be better or
worse than others'. Not only this, but animals probably differ in their
internal experiences and their ability to feel pain.

There are many unanswered questions here. We're confident that vertebrates feel
pain, but how intensely? We're increasingly confident that crustaceans like
lobsters feel pain, and many countries have banned the practice of boiling them
animals alive[^1]. Can insects feel pain? How can we weigh up the pain a
chicken feels when it's being debeaked against a lamb being castrated?

[^1]: Switzerland banned the practice in 2018. The UK followed in 2022,
    recognising some crustaceans and cephalopods as sentient beings.

There are a few ways to tackle some of these questions.

# Comparing animal brains

Brain size is one proxy we can use to compare different animals' experiences.
If we assume that chickens and cows feel pain, we can use a few metrics to try
to establish how similar their experiences are.

A simple way to do this would be to compare the mass of each animal's brain.
Chickens have much smaller brains than cows -- we might assume then that
the amount they suffer would be proportionally smaller.

But the mass of a brain doesn't necessarily correlate to the number of neurons,
the basic machinery of the brain. A more sophisticated metric would be neuron
count -- twice as many neurons implies double the ability to feel pain.

But the parts of the brain that respond to pain are a small
proportion of the brain's overall mass. These parts of the brain are highly
conserved, as one would expect for something as important as sensing pain -- a
crucial function in keeping an animal alive and causing it to move away from
danger. The parts of the brain that evolved later might not be relevant in
considering an animal's capacity for pain.

But pain circuitry is a small, evolutionarily conserved sliver of the brain.
The structures that matter, like the brainstem, thalamus, and cingulate, are
broadly shared across vertebrates. Sensing injury is too useful to reinvent.
Most of the extra tissue in a cow's brain is running a larger body, not feeling
more pain. Counting every neuron treats all of it as pain-relevant, and it
almost certainly isn't.

Fish don't have a cortex like mammals[^2]. But there's increasing consensus that
they feel pain, too -- they have pain-like responses to things that might hurt
them, and they are intelligent enough to use tools, learn from their
experiences, and avoid locations where they've previously been hurt.

[^2]: Fish do have a pallium, sometimes treated as an analog to a cortex.

**Below you can explore some different ways to think about how different animals
might feel pain based on different assumptions** -- whether it's just neuron
count that matters, log neurons (which increases the weight given to smaller
animals), cortical neurons (which means that fish and shrimp don't count at
all).

We also include a weighting from the [Rethink Priorities Moral Weight
Project](https://rethinkpriorities.org/research-area/welfare-range-estimates/),
which combines evidence from across neuroscience and behavioural studies to
attempt to quantify different animals' moral weights.

{{widget:pain-model
  brain-mass: Implies double the brain size, double the amount of pain felt. But doesn't consider how many neurons are in the brain, or whether the extra parts of the brain in higher mammals are involved in feeling pain.
  linear-neurons: Twice as many neurons means twice as much potential suffering. More plausible than brain mass, but assumes that all neurons are involved in feeling pain. This would for example mean that cows suffer only 3% as much as humans for the same experience.
  cortical-neurons: Only the cortex (or its equivalent) matters for suffering. Fish and shrimp have no cortex, so they get no weight, although we know they respond to painful stimuli and learn to avoid them over time.
  neurons-squared: Pain capacity scales with the square of neuron count. A steep discount that makes small-brained animals nearly negligible.
  log-neurons: Pain capacity scales with the logarithm of neuron count. This gives a flatter curve that gives smaller-brained animals more moral weight. Plausible given that the brain structures involved in responding to pain represent a small amount of the total number of neurons.
  rp-welfare: Estimates from the Rethink Priorities Moral Weight Project, which combines neurophysiological and behavioural evidence into a weight for each animal.
}}

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
  lifedays: Combining the two, we see that shrimp, fish, eggs and chicken are by far the largest contributors to life-days.
}}

This is Part 1 of two. In Part 2, we'll combine these per-animal welfare
weights with real-world diet composition to see how much suffering different
diets actually cause -- and work through the surprising implications for what
to cut back on first.


# Sources and methodology

**Pain weighting models.** We use neuron counts from [Herculano-Houzel
(2009)](https://doi.org/10.3389/neuro.09.031.2009). Salmon neuron counts are
extrapolated from zebrafish data and are highly uncertain.

**Rethink Priorities welfare ranges.** The RP welfare range estimates are
midpoint values from the [Rethink Priorities Moral Weight
Project](https://rethinkpriorities.org/research-area/an-introduction-to-the-moral-weight-project/)
(Fischer et al., 2022), which combines neurophysiological and behavioural
evidence to estimate different species' capacity for welfare. Cows were not
directly studied by RP so we use the pig estimate (0.55) per [this
comment](https://forum.effectivealtruism.org/posts/tnSg6o7crcHFLc395/the-welfare-range-table?commentId=qkrSRQY6kSwkDmXZB)
from Fischer.

**Lifespan and yield data.** Farmed animal lifespans and edible yields are
drawn from [Tomasik (2007, updated
2018)](https://reducing-suffering.org/how-much-direct-suffering-is-caused-by-various-animal-foods/)
and USDA statistics. Dairy cow "edible kg" represents total milk yield over a
six-year lifespan. Egg yield is measured in individual eggs (assuming one egg
weighs 55g).
