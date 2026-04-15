# Animal welfare, visualized

It's hard to have a clear understanding of the experience of different farmed
animals. How much can they feel pain? How much 'suffering' goes into each
animal's life, and how does that translate to what goes onto your plate? What
foods should you cut out first if you care about animal welfare?

The answers hinge on a number of assumptions. We're going to explore some of
them here. You can build your intuition, and see what assumptions your beliefs
hinge on.

# Comparing animals' experiences

Different kinds of farmed animals are treated differently. They undergo
different procedures, they're kept in different conditions, they live for
different amounts of time.

Not only this, but animals probably differ in their internal experiences and
their ability to feel pain. There are many

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
Clearly chickens have much smaller brains than cows; we might assume then that
the amount they suffer the same amount of pain would be proportionally smaller.

One issue is that the mass of a brain doesn't necessarily correlate to the
number of neurons, the basic machinery of the brain. A more sophisticated
metric would be neuron count - twice as many neurons implies twice as much
pain.

This, too, is thorny: the parts of the brain that respond to pain are a small
proportion of the brain's overall mass. These parts of the brain are highly
conserved, as one would expect for something as important as sensing pain -- a
crucial function in keeping an animal alive and causing it to move away from
danger. The more sophisticated parts of the brain like the neocortex are less
involved in this.

Below, you can explore some different ways to think about how different animals
might feel pain based on different assumptions.

--- WIDGET: different ways to model animal pain levels. a histogram, with a bar
for each animal (ideally with an icon of each animal underneath, which the user
can mouse over to see the animal's name).

On the left, a set of radio buttons, each one with a title and text.

 - Brain mass - Animals feels pain in proportion to the mass of its brain.
 - Neuron count - Animals feel pain in proportion to the number of neurons.
 - equal, linear neurons, neurons², log neurons, cortical/pallial neurons only, RP welfare ranges

(create each of these with placeholder text which i will update)

---

# Animals are different sizes

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

--- WIDGET:

several bar charts, left to right. as the user scrolls, each bar chart appears
sequentially (on mobile they should be shown stacked and all visible). 

first shows the average lifespan of the different animals. second shows the
mass of food each animal produces in its life. third shows the product of each.

then, as the user scrolls, we see a grid of boxes, perhaps one each for fish
(kg), eggs, milk (litres), chicken (kg), beef (kg). the numbers are controlled
with sliders and default to the standard american diet. underneath there are
buttons where users can switch between average american diet, average european
diet, vegetarian diet, vegan diet. clicking them changes the numbers in the
boxes. on the right is a stacked bar graph - each layer in the stack shows how
many life-days per animal are in the diet.


---

This has some counterintuitive implications. Those aspiring to reduce suffering
in their diets should cut out fish and eggs first -- per kg these cause by far
the most amount of suffering. Cutting out beef should be done second last;
eliminating milk is the lowest-impact diet intervention.

A more sophisticated model would include both _how much_ each animal can
suffer, and _how many_ of them are in your diet.

--- WIDGET:

suffering in your diet. same as the final chart in widget 2, but with the
options for weighting on the left, before the diet numbers. now we have a
suffering-days per kg - not just life-days, but now weighted by how much we
think different animals are capable of suffering.

---

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

Likewise, we eat animals other than the ones listed here. Trillions of shrimp,
for example, are farmed every year. There is increasing consensus that they are
able to feel pain, and the procedures they are subjected to cause them to
suffer.

---

If this changed your mind about animal welfare, consider donating to effective
organisations which seek to reform the way we raise animals for food, pay for
'offsets' to cover the animals you consume, and consider changing your diet to
reduce the amount of suffering it causes.
