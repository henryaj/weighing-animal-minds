import { mount } from 'svelte';
import { html as content, headings } from 'virtual:content';
import PainModel from './widgets/PainModel.svelte';
import LifeDays from './widgets/LifeDays.svelte';
import SufferingDays from './widgets/SufferingDays.svelte';
import './style.css';

const app = document.getElementById('app');

// Split out the h1 for the hero section
const tmp = document.createElement('div');
tmp.innerHTML = content;
const h1 = tmp.querySelector('h1');
const heroHTML = h1 ? h1.outerHTML : '';
if (h1) h1.remove();
const bodyHTML = tmp.innerHTML;

// Build TOC from h2 headings
const tocItems = headings
  .filter(h => h.depth === 1)
  .map(h => `<li><a href="#${h.slug}">${h.text}</a></li>`)
  .join('\n');

app.innerHTML = `
  <div class="hero">
    <div class="hero-gradient"></div>
    <div class="hero-content">${heroHTML}</div>
  </div>
  <div class="layout">
    <nav class="toc">
      <ul>${tocItems}</ul>
    </nav>
    <article class="prose">${bodyHTML}</article>
  </div>
`;

// Mount widgets
const widgets = {
  'widget-pain-model': PainModel,
  'widget-life-days': LifeDays,
  'widget-suffering-days': SufferingDays,
};

for (const [id, Component] of Object.entries(widgets)) {
  const target = document.getElementById(id);
  if (target) {
    mount(Component, { target });
  }
}
