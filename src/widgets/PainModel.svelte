<script>
  // Mounted at {{widget:pain-model}}.
  // Lets the reader compare farmed animals under different moral-weight models
  // (brain mass, linear/log/squared neurons, cortical neurons, RP welfare ranges).
  // Bar values are expressed as a percentage of a human. The `copy` prop carries
  // a per-mode editorial paragraph keyed by mode id; key order there also drives
  // the button order.
  import { fade } from 'svelte/transition';
  import { animals, weightingModes } from '../data/animals.js';
  import { shared } from '../stores.svelte.js';

  let { copy = {} } = $props();

  let orderedModes = $derived.by(() => {
    const copyKeys = Object.keys(copy);
    if (copyKeys.length === 0) return weightingModes;
    return [...weightingModes].sort((a, b) => {
      const ai = copyKeys.indexOf(a.id);
      const bi = copyKeys.indexOf(b.id);
      return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
    });
  });

  let mode = $derived(weightingModes.find(m => m.id === shared.weightingMode));

  let weights = $derived(
    animals.map(a => ({ ...a, weight: mode.fn(a) }))
  );

  let maxWeight = 1;

  function formatWeight(w) {
    if (w == null) return 'N/A';
    const pct = w * 100;
    if (pct >= 10) return `${pct.toFixed(0)}%`;
    if (pct >= 1) return `${pct.toFixed(1)}%`;
    if (pct >= 0.01) return `${pct.toFixed(2)}%`;
    return `<0.01%`;
  }
</script>

<div class="pain-model">
  <div class="controls">
    <div class="modes">
      {#each orderedModes as wm}
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
        </label>
      {/each}
    </div>
    <p class="controls-footnote">Values shown as % of a human (human = 100%).</p>
  </div>

  <div class="chart">
    {#if copy[mode.id]}
      {#key mode.id}
        <div class="editorial" in:fade={{ duration: 200 }}>{copy[mode.id]}</div>
      {/key}
    {/if}
    <div class="bars">
    {#each weights as animal (animal.id)}
      <div class="bar-row">
        <span class="bar-label">
          {animal.name}
          {#if animal.uncertain && animal.weight != null}
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
      <p class="footnote" class:hidden={!weights.some(a => a.uncertain && a.weight != null)}>* Data highly uncertain</p>
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
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .mode-option:hover {
    border-color: var(--text-ghost);
  }

  .mode-option.selected {
    border-color: var(--accent);
    background: var(--accent-bg);
  }

  .mode-option.recommended {
    border-width: 2px;
    border-color: var(--recommended-border);
    background: linear-gradient(135deg, var(--recommended-bg) 0%, transparent 60%);
  }

  .mode-option.recommended.selected {
    border-color: var(--recommended-border-selected);
    background: linear-gradient(135deg, var(--recommended-bg-selected) 0%, transparent 60%);
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
    color: var(--text-strong);
    margin-bottom: 0.25rem;
  }

  .controls-footnote {
    font-size: 0.75rem;
    color: var(--text-faint);
    margin-top: 1rem;
    line-height: 1.4;
  }

  .mode-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .mode-desc {
    display: block;
    font-size: 0.8rem;
    color: var(--text-faint);
    line-height: 1.4;
  }


  .chart {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .editorial {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--text-dim);
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    border-left: 2px solid var(--accent);
    background: var(--accent-bg-subtle);
    border-radius: 0 4px 4px 0;
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
    color: var(--text-muted);
    text-align: right;
  }

  .uncertain-flag,
  .proxy-flag {
    color: var(--flag);
    cursor: help;
  }

  .bar-track {
    flex: 1;
    height: 28px;
    background: var(--bg-subtle);
    border-radius: 4px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 4px;
    transition: width 0.5s ease;
    min-width: 2px;
  }


  .bar-fill.uncertain {
    background: repeating-linear-gradient(
      -45deg,
      var(--accent),
      var(--accent) 4px,
      var(--accent-stripe) 4px,
      var(--accent-stripe) 8px
    );
  }

  .bar-fill.proxy {
    border: 1px dashed var(--flag);
    background: var(--accent-bg-strong);
  }

  .bar-value {
    flex: 0 0 55px;
    font-size: 0.8rem;
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
  }

  .bar-track.no-data {
    opacity: 0.3;
  }

  .bar-value.no-data {
    color: var(--text-ghost);
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
    color: var(--text-faint);
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
