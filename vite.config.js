import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import { marked } from 'marked';

function contentPlugin() {
  const virtualModuleId = 'virtual:content';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  const copyPath = 'copy.md';

  function processMarkdown(md) {
    // Replace --- WIDGET: <description> --- blocks with mount-point divs
    const widgetPattern = /---\s*WIDGET:\s*(.*?)(?:\n[\s\S]*?)---/g;
    let widgetIndex = 0;
    const widgetIds = ['pain-model', 'life-days', 'suffering-days'];

    const processed = md.replace(widgetPattern, (_match, _description) => {
      const id = widgetIds[widgetIndex] || `widget-${widgetIndex}`;
      widgetIndex++;
      return `<div id="widget-${id}" class="widget-mount"></div>`;
    });

    // Collect headings for TOC and add anchor IDs
    const headings = [];
    let isFirstH1 = true;
    const renderer = new marked.Renderer();
    renderer.heading = function ({ text, depth }) {
      const slug = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
      // First h1 is the page title (goes in hero, no anchor link)
      if (depth === 1 && isFirstH1) {
        isFirstH1 = false;
        return `<h1>${text}</h1>`;
      }
      headings.push({ text, slug, depth });
      return `<h${depth} id="${slug}"><a href="#${slug}">${text}</a></h${depth}>`;
    };

    const html = marked(processed, { renderer });
    return { html, headings };
  }

  return {
    name: 'content-plugin',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const md = fs.readFileSync(copyPath, 'utf-8');
        const { html, headings } = processMarkdown(md);
        return `export const html = ${JSON.stringify(html)};\nexport const headings = ${JSON.stringify(headings)};`;
      }
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('copy.md')) {
        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [contentPlugin(), svelte()],
});
