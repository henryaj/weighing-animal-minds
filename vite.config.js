import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import { marked } from 'marked';

function contentPlugin() {
  const virtualModuleId = 'virtual:content';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  const copyPath = 'copy.md';

  function parseFrontmatter(md) {
    const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: md };
    const meta = {};
    for (const line of match[1].split('\n')) {
      const i = line.indexOf(':');
      if (i !== -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    return { meta, body: match[2] };
  }

  function processMarkdown(md) {
    const { meta, body } = parseFrontmatter(md);

    // Replace {{widget:id ...}} blocks with mount-point divs and extract copy
    const widgetPattern = /\{\{widget:([a-z-]+)(?:\n([\s\S]*?))?\}\}/g;
    const widgetCopy = {};

    const processed = body.replace(widgetPattern, (_match, id, copyBlock) => {
      if (copyBlock) {
        const copy = {};
        for (const line of copyBlock.trim().split('\n')) {
          const i = line.indexOf(':');
          if (i !== -1) copy[line.slice(0, i).trim()] = line.slice(i + 1).trim();
        }
        widgetCopy[id] = copy;
      }
      return `<div id="widget-${id}" class="widget-mount"></div>`;
    });

    // Collect headings for TOC and add anchor IDs
    const headings = [];
    const renderer = new marked.Renderer();
    renderer.heading = function ({ text, depth }) {
      const slug = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ text, slug, depth });
      return `<h${depth} id="${slug}"><a href="#${slug}">${text}</a></h${depth}>`;
    };

    const html = marked(processed, { renderer, smartypants: true });
    return { html, headings, meta, widgetCopy };
  }

  return {
    name: 'content-plugin',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const md = fs.readFileSync(copyPath, 'utf-8');
        const { html, headings, meta, widgetCopy } = processMarkdown(md);
        return `export const html = ${JSON.stringify(html)};\nexport const headings = ${JSON.stringify(headings)};\nexport const meta = ${JSON.stringify(meta)};\nexport const widgetCopy = ${JSON.stringify(widgetCopy)};`;
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
