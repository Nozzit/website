#!/usr/bin/env node
/**
 * build-release-notes-static.js
 *
 * Twee dingen die alleen met JavaScript gebeurden en daardoor onzichtbaar
 * waren voor crawlers en voor LLM's die geen JavaScript uitvoeren:
 *
 *  1. De uitgebreide changelog van de nieuwste versie. shared/release-notes.js
 *     haalt data/release-notes/<repo>.json client-side op en rendert die.
 *     Dit script schrijft dezelfde inhoud als statische HTML in de placeholder,
 *     tussen <!-- rn:start --> en <!-- rn:end -->. De widget overschrijft die
 *     inhoud zodra JavaScript draait, dus bezoekers zien exact hetzelfde.
 *
 *  2. softwareVersion in de SoftwareApplication-JSON-LD. Dat veld stond er
 *     bewust niet in omdat data/stats.json achterloopt en build-tags bevat
 *     ("untagged-<sha>", "0.1.1-pr13.alpha"). data/release-notes/<repo>.json
 *     heeft wél de juiste tag en wordt bij elke refresh bijgewerkt, dus die
 *     gebruiken we hier — daarmee is het veld zelf-corrigerend.
 *
 * Alleen pagina's met het attribuut data-release-notes-latest worden verwerkt.
 *
 * Inputs:  data/release-notes/<repo>.json, de productpagina's
 * Outputs: de productpagina's (in-place)
 *
 * Draaien: `node scripts/build-release-notes-static.js`
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['old', 'presentation foundation', '.git', '.claude', 'node_modules']);

function htmlFiles(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) htmlFiles(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Zelfde beperkte markdown-ondersteuning als in shared/release-notes.js:
// eerst alles escapen, daarna alleen koppen, lijsten, vet, code en links.
function renderMarkdown(md) {
  const inline = (s) => escapeHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  const out = [];
  let list = null, para = [];
  const flushList = () => { if (list && list.length) out.push(`<ul>${list.map(i => `<li>${inline(i)}</li>`).join('')}</ul>`); list = null; };
  const flushPara = () => { if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`); para = []; };

  for (const raw of md.split('\n')) {
    const line = raw.replace(/\s+$/, '');
    const heading = line.match(/^(#{3,4})\s+(.*)$/);
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (heading) { flushList(); flushPara(); out.push(`<h4>${inline(heading[2])}</h4>`); }
    else if (bullet) { flushPara(); if (!list) list = []; list.push(bullet[1]); }
    else if (!line.trim()) { flushList(); flushPara(); }
    else if (list) { list[list.length - 1] += ' ' + line.trim(); }
    else { para.push(line.trim()); }
  }
  flushList(); flushPara();
  return out.join('\n');
}

function staticBlock(data) {
  const rel = data.latestStable;
  if (!rel) return null;
  const body = data.latestChangelog
    ? `<div class="rn-changelog">${renderMarkdown(data.latestChangelog)}</div>`
    : '';
  if (!body) return null;
  return [
    '<!-- rn:start Gegenereerd door scripts/build-release-notes-static.js — niet met de hand bewerken -->',
    '<section class="rn-section"><div class="rn-container">',
    '<div class="rn-header-block">',
    '<h2 class="rn-title">Release notes</h2>',
    `<p class="rn-desc"><strong>${escapeHtml(rel.tag)}</strong> &middot; ${escapeHtml(rel.date || '')}</p>`,
    '</div>',
    '<div class="rn-groups"><div class="rn-group latest expanded"><div class="rn-group-body">',
    body,
    '</div></div></div>',
    `<p class="rn-viewall"><a href="https://github.com/OpenAEC-Foundation/${escapeHtml(data.repo)}/releases" target="_blank" rel="noopener">Bekijk alle releases op GitHub &rarr;</a></p>`,
    '</div></section>',
    '<!-- rn:end -->',
  ].join('\n');
}

// softwareVersion in het SoftwareApplication-blok zetten of bijwerken.
// Bestaat het veld al, dan alleen de waarde vervangen — anders groeit er bij
// elke run een regel bij.
function stampVersion(html, tag) {
  const version = JSON.stringify(String(tag).replace(/^v/, ''));
  if (/"softwareVersion"\s*:/.test(html)) {
    return html.replace(/("softwareVersion"\s*:\s*)"[^"]*"/, `$1${version}`);
  }
  // Anders invoegen direct na operatingSystem in het eerste JSON-LD-blok dat
  // het heeft; dat is per conventie het SoftwareApplication-blok.
  return html.replace(
    /\n(\s*)"operatingSystem":[^\n]*\n/,
    (line, indent) => `${line}${indent}"softwareVersion": ${version},\n`
  );
}

// Een eerder gegenereerd blok eerst volledig weghalen. Zonder deze stap zou
// een tweede run de placeholder-<div> matchen tot de eerste </div> ín het
// gegenereerde blok, en het bestand beschadigen.
const STALE = /\n?<!-- rn:start[\s\S]*?<!-- rn:end -->\n?/g;

let pages = 0, stamped = 0;
for (const file of htmlFiles(ROOT)) {
  let html = fs.readFileSync(file, 'utf8').replace(STALE, '');
  const m = html.match(/<div([^>]*\bdata-release-notes="([^"]+)"[^>]*)>\s*<\/div>/);
  if (!m || !/data-release-notes-latest/.test(m[1])) continue;

  const repo = m[2];
  const dataPath = path.join(ROOT, 'data', 'release-notes', `${repo}.json`);
  if (!fs.existsSync(dataPath)) { console.warn(`  ✗ geen data voor ${repo}`); continue; }
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const block = staticBlock(data);
  if (!block) { console.warn(`  ✗ ${repo}: geen latestChangelog, overgeslagen`); continue; }

  const original = fs.readFileSync(file, 'utf8');
  const opened = `<div${m[1]}>`;
  // Replacer as a FUNCTION, not a string: a changelog can contain a literal
  // "$" (e.g. IFC's null-value marker, described in prose), and a string
  // replacement argument treats "$&", "$$", "$1" etc. as special patterns —
  // "$&" in particular re-inserts the whole matched placeholder <div>,
  // corrupting the page. A function return value is inserted verbatim.
  html = html.replace(m[0], () => `${opened}\n${block}\n</div>`);
  const before = original;

  if (data.latestStable && data.latestStable.tag) {
    const v = stampVersion(html, data.latestStable.tag);
    if (v !== html) { html = v; stamped++; }
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    pages++;
    console.log(`  ✓ ${path.relative(ROOT, file)} — ${data.latestStable.tag}, ${data.latestChangelog.split('\n').length} regels changelog`);
  }
}
console.log(`\n${pages} pagina('s) bijgewerkt, ${stamped} met softwareVersion.`);
