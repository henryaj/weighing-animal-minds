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
    // Match from "--- WIDGET:" to the next "---" on its own line
    const widgetPattern = /---\s*WIDGET:\s*(.*?)(?:\n[\s\S]*?)---/g;
    let widgetIndex = 0;
    const widgetIds = ['pain-model', 'life-days', 'suffering-days'];

    const processed = md.replace(widgetPattern, (_match, _description) => {
      const id = widgetIds[widgetIndex] || `widget-${widgetIndex}`;
      widgetIndex++;
      return `<div id="widget-${id}" class="widget-mount"></div>`;
    });

    return marked(processed);
  }

  return {
    name: 'content-plugin',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const md = fs.readFileSync(copyPath, 'utf-8');
        const html = processMarkdown(md);
        return `export default ${JSON.stringify(html)};`;
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
