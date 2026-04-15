import { mount } from 'svelte';
import content from 'virtual:content';
import PainModel from './widgets/PainModel.svelte';
import LifeDays from './widgets/LifeDays.svelte';
import SufferingDays from './widgets/SufferingDays.svelte';
import './style.css';

const app = document.getElementById('app');
app.innerHTML = `<article class="prose">${content}</article>`;

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
