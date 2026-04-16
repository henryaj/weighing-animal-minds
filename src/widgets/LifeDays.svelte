<script>
  import { farmedAnimals } from '../data/farming.js';

  let { copy = {} } = $props();
  let chartVisible = $state([false, false, false]);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  function observeChart(node, idx) {
    if (isMobile) {
      chartVisible[idx] = true;
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          chartVisible[idx] = true;
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return { destroy: () => obs.disconnect() };
  }

  const byValue = (a, b) => b.value - a.value;
  const lifespanData = farmedAnimals.map(a => ({ name: a.name, value: a.lifespanDays, color: a.color })).sort(byValue);
  const edibleData = farmedAnimals.map(a => ({ name: a.name, value: a.edibleKg, color: a.color })).sort(byValue);
  const lifeDaysData = farmedAnimals.map(a => ({
    name: a.name,
    value: a.lifespanDays / a.edibleKg,
    color: a.color,
  })).sort(byValue);

  const charts = [
    { title: 'Average lifespan', unit: 'days', data: lifespanData, copy: copy.lifespan },
    { title: 'Edible food per animal', unit: 'kg', data: edibleData, clipMax: true, copy: copy.edible },
    { title: 'Life-days per kg', unit: 'days/kg', data: lifeDaysData, clipMax: true, copy: copy.lifedays },
  ];

  function chartMax(chart) {
    const values = chart.data.map(d => d.value).sort((a, b) => b - a);
    if (chart.clipMax && values.length > 1 && values[0] > values[1] * 3) {
      return values[1];
    }
    return values[0];
  }

  function formatVal(v) {
    if (v >= 1000) return Math.round(v).toLocaleString();
    if (v >= 10) return Math.round(v).toString();
    if (v >= 1) return v.toFixed(1);
    return v.toFixed(2);
  }
</script>

<div class="life-days-widget">
  {#each charts as chart, i}
    <div
      class="chart-panel"
      class:visible={chartVisible[i]}
      use:observeChart={i}
    >
      <h3 class="chart-title">{chart.title}</h3>
      {#if chart.copy}<p class="chart-copy">{chart.copy}</p>{/if}
      {#each chart.data as row}
        {@const max = chartMax(chart)}
        {@const pct = (row.value / max) * 100}
        {@const clipped = pct > 100}
        <div class="bar-row">
          <span class="bar-label">{row.name}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              class:clipped
              style="width: {Math.min(pct, 100)}%; background: {row.color}"
            ></div>
          </div>
          <span class="bar-value">{formatVal(row.value)} <span class="bar-unit">{chart.unit}</span></span>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .life-days-widget {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .chart-panel {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .chart-panel.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .chart-copy {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  .chart-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    color: #fff;
    margin-bottom: 0.75rem;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
  }

  .bar-label {
    flex: 0 0 100px;
    font-size: 0.75rem;
    color: #aaa;
    text-align: right;
  }

  .bar-track {
    flex: 1;
    height: 20px;
    background: #1a1a1a;
    border-radius: 3px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
    min-width: 2px;
  }

  .bar-fill.clipped {
    border-radius: 3px 0 0 3px;
    mask-image: linear-gradient(to right, black 80%, transparent);
    -webkit-mask-image: linear-gradient(to right, black 80%, transparent);
  }

  .bar-value {
    flex: 0 0 110px;
    font-size: 0.75rem;
    color: #888;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .bar-unit {
    color: #555;
  }

  @media (max-width: 1024px) {
    .bar-label {
      flex: 0 0 85px;
    }

    .bar-value {
      flex: 0 0 90px;
    }
  }

  @media (max-width: 768px) {
    .bar-label {
      flex: 0 0 85px;
    }
  }
</style>
