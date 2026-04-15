export const animals = [
  {
    id: 'human',
    name: 'Human',
    totalNeurons: 86_000_000_000,
    corticalNeurons: 19_000_000_000,
    brainMass: 1350,
    rpWelfareRange: 1.0,
    rpIsProxy: false,
    uncertain: false,
  },
  {
    id: 'cow',
    name: 'Cow',
    totalNeurons: 3_000_000_000,
    corticalNeurons: 500_000_000, // midpoint of 300–700M estimate
    brainMass: 440,
    rpWelfareRange: 0.55,
    rpIsProxy: true, // RP didn't study cows; using pig estimate as proxy
    uncertain: false,
  },
  {
    id: 'pig',
    name: 'Pig',
    totalNeurons: 2_220_000_000,
    corticalNeurons: 430_000_000,
    brainMass: 180,
    rpWelfareRange: 0.55,
    rpIsProxy: false,
    uncertain: false,
  },
  {
    id: 'chicken',
    name: 'Chicken',
    totalNeurons: 220_000_000,
    corticalNeurons: 60_000_000, // pallium/DVR
    brainMass: 3.1,
    rpWelfareRange: 0.33,
    rpIsProxy: false,
    uncertain: false,
  },
  {
    id: 'salmon',
    name: 'Salmon',
    totalNeurons: 10_000_000,
    corticalNeurons: null, // fish have no cortex
    brainMass: 1.5,
    rpWelfareRange: 0.10,
    rpIsProxy: false,
    uncertain: true, // neuron count extrapolated from zebrafish
  },
];

export const HUMAN_NEURONS = 86_000_000_000;
export const HUMAN_CORTICAL = 19_000_000_000;
export const HUMAN_BRAIN_MASS = 1350;

// Heroicons outline 24px SVG paths
const icons = {
  scale: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z',
  barsArrowUp: 'M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21l3.75-3.75',
  arrowTrendingUp: 'M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941',
  arrowTrendingDown: 'M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181',
  cpuChip: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z',
  academicCap: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
};

export const weightingModes = [
  {
    id: 'brain-mass',
    title: 'Brain mass',
    icon: icons.scale,
    description: 'Pain capacity scales with brain mass. A simple physical proxy — bigger brain, more suffering.',
    fn: (animal) => animal.brainMass / HUMAN_BRAIN_MASS,
  },
  {
    id: 'linear-neurons',
    title: 'Linear neurons',
    icon: icons.barsArrowUp,
    description: 'Pain capacity scales with neuron count. Twice as many neurons means twice as much potential suffering.',
    fn: (animal) => animal.totalNeurons / HUMAN_NEURONS,
  },
  {
    id: 'neurons-squared',
    title: 'Neurons²',
    icon: icons.arrowTrendingUp,
    description: 'Pain capacity scales with the square of neuron count. A steep discount that makes small-brained animals nearly negligible.',
    fn: (animal) => (animal.totalNeurons / HUMAN_NEURONS) ** 2,
  },
  {
    id: 'log-neurons',
    title: 'Log neurons',
    icon: icons.arrowTrendingDown,
    description: 'Pain capacity scales with the logarithm of neuron count. A flatter curve that gives smaller-brained animals more moral weight.',
    fn: (animal) => Math.log10(animal.totalNeurons) / Math.log10(HUMAN_NEURONS),
  },
  {
    id: 'cortical-neurons',
    title: 'Cortical/pallial neurons',
    icon: icons.cpuChip,
    description: 'Only the cortex (or its equivalent) matters for suffering. Fish have no cortex, so they get no weight.',
    fn: (animal) => animal.corticalNeurons != null ? animal.corticalNeurons / HUMAN_CORTICAL : null,
  },
  {
    id: 'rp-welfare',
    title: 'RP welfare ranges',
    icon: icons.academicCap,
    description: 'Estimates from the Rethink Priorities Moral Weight Project, combining neurophysiological and behavioural evidence.',
    fn: (animal) => animal.rpWelfareRange,
  },
];
