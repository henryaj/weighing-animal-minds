<script>
  import { animals } from '../data/animals.js';
  import { farmedAnimals, lifeDaysPerKg, products, presets } from '../data/farming.js';

  let { copy = {} } = $props();
  let activePreset = $state('european');

  // Use RP welfare ranges as the weighting
  const rpWeight = Object.fromEntries(
    animals.map(a => [a.id, a.rpWelfareRange])
  );

  let breakdown = $derived(
    products.map(p => {
      const kg = p.toKg(presets[activePreset].values[p.id]);
      const lifeDays = kg * lifeDaysPerKg[p.animalId];
      const farmed = farmedAnimals.find(a => a.id === p.animalId);
      const weight = rpWeight[farmed.painAnimalId] ?? 0;
      const sufferingDays = lifeDays * weight;
      return { id: p.id, label: p.label, sufferingDays, color: farmed.color };
    })
  );

  // Fixed scale: max across all presets
  const maxSufferingDays = Math.max(
    ...Object.keys(presets).map(key =>
      products.reduce((sum, p) => {
        const kg = p.toKg(presets[key].values[p.id]);
        const lifeDays = kg * lifeDaysPerKg[p.animalId];
        const farmed = farmedAnimals.find(a => a.id === p.animalId);
        const weight = rpWeight[farmed.painAnimalId] ?? 0;
        return sum + lifeDays * weight;
      }, 0)
    )
  );

  let total = $derived(breakdown.reduce((sum, b) => sum + b.sufferingDays, 0));

  function formatVal(v) {
    if (v >= 1000) return Math.round(v).toLocaleString();
    if (v >= 10) return Math.round(v).toString();
    if (v >= 1) return v.toFixed(1);
    if (v >= 0.01) return v.toFixed(2);
    if (v === 0) return '0';
    return v.toFixed(3);
  }
</script>

<div class="suffering-days">
  <h3 class="chart-title">Suffering-days in different diets</h3>
  <p class="chart-note">Weighted using Rethink Priorities welfare range estimates.</p>

  <div class="preset-buttons">
    {#each Object.entries(presets) as [key, preset]}
      <button
        class="preset-btn"
        class:active={activePreset === key}
        onclick={() => activePreset = key}
      >{preset.label}</button>
    {/each}
  </div>

  <div class="stacked-bar">
    {#each breakdown as segment}
      <div
        class="stacked-segment"
        style="width: {maxSufferingDays > 0 ? (segment.sufferingDays / maxSufferingDays) * 100 : 0}%; background: {segment.color}"
        title="{segment.label}: {formatVal(segment.sufferingDays)} suffering-days"
      ></div>
    {/each}
  </div>

  <div class="legend">
    {#each breakdown as segment}
      {#if segment.sufferingDays > 0}
        <div class="legend-item">
          <span class="legend-swatch" style="background: {segment.color}"></span>
          <span class="legend-label">{segment.label}</span>
          <span class="legend-value">{formatVal(segment.sufferingDays)}</span>
        </div>
      {/if}
    {/each}
  </div>

  <div class="total">
    <span class="total-label">Total suffering-days per year</span>
    <span class="total-value">{formatVal(total)}</span>
  </div>
</div>

<style>
  .chart-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    color: #fff;
    margin-bottom: 0.75rem;
  }

  .chart-note {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 1rem;
  }

  .preset-buttons {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 1.25rem;
  }

  .preset-btn {
    flex: 1;
    padding: 0.35rem 0.5rem;
    border: 1px solid #333;
    border-radius: 4px;
    background: none;
    color: #aaa;
    font-size: 0.8rem;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }

  .preset-btn:hover {
    border-color: #555;
    color: #fff;
  }

  .preset-btn.active {
    border-color: #4d9fff;
    color: #fff;
    background: rgba(77, 159, 255, 0.1);
  }

  .stacked-bar {
    display: flex;
    height: 36px;
    border-radius: 4px;
    overflow: hidden;
    background: #1a1a1a;
    margin-bottom: 1rem;
  }

  .stacked-segment {
    transition: width 0.4s ease;
    flex-shrink: 0;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
    margin-bottom: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.75rem;
  }

  .legend-swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .legend-label {
    color: #aaa;
  }

  .legend-value {
    color: #888;
    font-variant-numeric: tabular-nums;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-top: 1px solid #333;
    padding-top: 0.75rem;
  }

  .total-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: #ccc;
  }

  .total-value {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #fff;
  }
</style>
