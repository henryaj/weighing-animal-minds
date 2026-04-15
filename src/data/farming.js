// Farming data from Tomasik (2007, updated 2018) and USDA
// See research.md section 2

export const farmedAnimals = [
  { id: 'dairy',   name: 'Dairy cow',      lifespanDays: 2190, edibleKg: 30000,  color: '#7f8c8d', painAnimalId: 'cow' },
  { id: 'salmon',  name: 'Farmed salmon',  lifespanDays: 639,  edibleKg: 2.0,    color: '#e67e22', painAnimalId: 'salmon' },
  { id: 'eggs',    name: 'Layer hen',      lifespanDays: 501,  edibleKg: 16,     color: '#f1c40f', painAnimalId: 'chicken' },
  { id: 'beef',    name: 'Beef cow',       lifespanDays: 395,  edibleKg: 212,    color: '#c0392b', painAnimalId: 'cow' },
  { id: 'pig',     name: 'Pig',            lifespanDays: 183,  edibleKg: 65,     color: '#e88e9e', painAnimalId: 'pig' },
  { id: 'shrimp',  name: 'Farmed shrimp',  lifespanDays: 120,  edibleKg: 0.02,   color: '#d35400', painAnimalId: 'shrimp' },
  { id: 'chicken', name: 'Broiler chicken', lifespanDays: 42,   edibleKg: 1.9,    color: '#f39c12', painAnimalId: 'chicken' },
];

// Derived: life-days per kg of product
export const lifeDaysPerKg = Object.fromEntries(
  farmedAnimals.map(a => [a.id, a.lifespanDays / a.edibleKg])
);

// Diet product definitions — maps product to the farmed animal it comes from
export const products = [
  { id: 'beef',    label: 'Beef',    unit: 'kg',   animalId: 'beef',    toKg: (v) => v },
  { id: 'pork',    label: 'Pork',    unit: 'kg',   animalId: 'pig',     toKg: (v) => v },
  { id: 'chicken', label: 'Chicken', unit: 'kg',   animalId: 'chicken', toKg: (v) => v },
  { id: 'fish',    label: 'Fish',    unit: 'kg',   animalId: 'salmon',  toKg: (v) => v },
  { id: 'eggs',    label: 'Eggs',    unit: 'eggs', animalId: 'eggs',    toKg: (v) => v * 0.055 },
  { id: 'milk',    label: 'Milk',    unit: 'L',    animalId: 'dairy',   toKg: (v) => v },
];

// Diet presets (annual per capita consumption)
export const presets = {
  european:    { label: 'European',    values: { beef: 15, pork: 32, chicken: 25, fish: 24, eggs: 220, milk: 250 } },
  american:    { label: 'American',    values: { beef: 26, pork: 23, chicken: 46, fish: 9,  eggs: 264, milk: 297 } },
  uk:          { label: 'British',          values: { beef: 17, pork: 22, chicken: 30, fish: 20, eggs: 200, milk: 250 } },
  vegetarian:  { label: 'Vegetarian',  values: { beef: 0,  pork: 0,  chicken: 0,  fish: 0,  eggs: 300, milk: 320 } },
  vegan:       { label: 'Vegan',       values: { beef: 0,  pork: 0,  chicken: 0,  fish: 0,  eggs: 0,   milk: 0   } },
};

// Slider max values
export const sliderMax = { beef: 60, pork: 60, chicken: 80, fish: 50, eggs: 500, milk: 500 };
