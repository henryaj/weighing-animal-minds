<script>
  import { animals, weightingModes } from '../data/animals.js';
  import { shared } from '../stores.svelte.js';

  let { copy = {} } = $props();

  let mode = $derived(weightingModes.find(m => m.id === shared.weightingMode));

  let visibleAnimals = $derived(animals.filter(a => a.id !== 'human'));

  let weights = $derived(
    visibleAnimals.map(a => ({ ...a, weight: mode.fn(a) }))
  );

  let maxWeight = $derived(Math.max(...weights.map(w => w.weight ?? 0)));

  function formatWeight(w) {
    if (w == null) return 'N/A';
    if (w >= 0.01) return w.toFixed(2);
    if (w >= 0.001) return w.toFixed(3);
    return w.toExponential(1);
  }
</script>

<div class="pain-model">
  <div class="controls">
    <div class="modes">
      {#each weightingModes as wm}
        <label class="mode-option" class:selected={shared.weightingMode === wm.id} class:recommended={wm.id === 'rp-welfare'}>
          <input
            type="radio"
            name="weighting-mode"
            value={wm.id}
            bind:group={shared.weightingMode}
          />
          <span class="mode-title">
            <svg class="mode-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d={wm.icon} />
            </svg>
            {wm.title}
          </span>
          {#if shared.weightingMode === wm.id}
            <span class="mode-desc">{wm.description}</span>
          {/if}
        </label>
      {/each}
    </div>
  </div>

  <div class="chart">
    <div class="bars">
    {#each weights as animal (animal.id)}
      <div class="bar-row">
        <span class="bar-label">
          {animal.name}
          {#if animal.uncertain}
            <span class="uncertain-flag" title="Neuron count extrapolated from zebrafish — highly uncertain">*</span>
          {/if}
          {#if animal.rpIsProxy && shared.weightingMode === 'rp-welfare'}
            <span class="proxy-flag" title="RP didn't study cows; using pig estimate as proxy">†</span>
          {/if}
        </span>
        <div class="bar-track" class:no-data={animal.weight == null}>
          {#if animal.weight != null}
            <div
              class="bar-fill"
              class:uncertain={animal.uncertain}
              class:proxy={animal.rpIsProxy && shared.weightingMode === 'rp-welfare'}
              style="width: {(animal.weight / maxWeight) * 100}%"
            ></div>
          {/if}
        </div>
        <span class="bar-value" class:no-data={animal.weight == null}>{formatWeight(animal.weight)}</span>
      </div>
    {/each}
    </div>

    <div class="chart-footnotes">
      <p class="footnote" class:hidden={!weights.some(a => a.uncertain)}>* Data highly uncertain</p>
      <p class="footnote" class:hidden={!(shared.weightingMode === 'rp-welfare' && weights.some(a => a.rpIsProxy))}>† Not directly studied by RP — using pig estimate as proxy</p>
    </div>
  </div>
</div>

<style>
  .pain-model {
    display: flex;
    gap: 2rem;
  }

  .controls {
    flex: 0 0 240px;
  }

  .modes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mode-option {
    display: block;
    padding: 0.75rem;
    border: 1px solid #333;
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .mode-option:hover {
    border-color: #555;
  }

  .mode-option.selected {
    border-color: #4d9fff;
    background: rgba(77, 159, 255, 0.08);
  }

  .mode-option.recommended {
    border-width: 2px;
    border-color: #6b5a2d;
    background: linear-gradient(135deg, rgba(200, 170, 50, 0.06) 0%, transparent 60%);
  }

  .mode-option.recommended.selected {
    border-color: #c8aa32;
    background: linear-gradient(135deg, rgba(200, 170, 50, 0.12) 0%, transparent 60%);
  }

  .mode-option input {
    display: none;
  }

  .mode-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    color: #fff;
    margin-bottom: 0.25rem;
  }

  .mode-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .mode-desc {
    display: block;
    font-size: 0.8rem;
    color: #888;
    line-height: 1.4;
  }


  .chart {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bars {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .bar-label {
    flex: 0 0 80px;
    font-size: 0.85rem;
    color: #ccc;
    text-align: right;
  }

  .uncertain-flag,
  .proxy-flag {
    color: #f0c040;
    cursor: help;
  }

  .bar-track {
    flex: 1;
    height: 28px;
    background: #1a1a1a;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background: #4d9fff;
    border-radius: 4px;
    transition: width 0.5s ease;
    min-width: 2px;
  }


  .bar-fill.uncertain {
    background: repeating-linear-gradient(
      -45deg,
      #4d9fff,
      #4d9fff 4px,
      #3a7acc 4px,
      #3a7acc 8px
    );
  }

  .bar-fill.proxy {
    border: 1px dashed #f0c040;
    background: rgba(77, 159, 255, 0.6);
  }

  .bar-value {
    flex: 0 0 55px;
    font-size: 0.8rem;
    color: #888;
    font-variant-numeric: tabular-nums;
  }

  .bar-track.no-data {
    opacity: 0.3;
  }

  .bar-value.no-data {
    color: #555;
    font-style: italic;
  }

  .chart-footnotes {
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .hidden {
    visibility: hidden;
  }

  .footnote {
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 0.25rem;
  }

  @media (max-width: 1024px) {
    .controls {
      flex: 0 0 200px;
    }
  }

  @media (max-width: 768px) {
    .pain-model {
      flex-direction: column;
    }

    .controls {
      flex: none;
    }

    .bar-label {
      flex: 0 0 65px;
      font-size: 0.8rem;
    }
  }
</style>
