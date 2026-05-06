// scripts/build-homepage-stats.js
// Reads data/stats.json and updates index.html tool cards with current stats.
// This makes the stats STATIC in the HTML (instant load, no fetch).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const stats = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'stats.json'), 'utf8'));
const indexPath = path.join(ROOT, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Build repo lookup
const repoMap = {};
stats.repos.forEach(r => { repoMap[r.name.toLowerCase()] = r; });

function formatVersion(tag) {
  if (!tag) return null;
  const m = tag.match(/v?(\d+)\.(\d+)/);
  return m ? `v${m[1]}.${m[2]}` : tag;
}

const ICON_COMMIT = '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="3"/></svg>';
const ICON_VERSION = '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2h4l1 1v4l-1 1H2L1 7V3l1-1zm7 7h4l1 1v4l-1 1H9l-1-1v-4l1-1z"/></svg>';
const ICON_STAR = '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>';

function buildStatsHtml(repo) {
  const parts = [];
  if (repo.commits != null && repo.commits > 0) {
    parts.push(`<span class="tool-stat">${ICON_COMMIT} ${repo.commits} commits</span>`);
  }
  const ver = formatVersion(repo.latestRelease);
  if (ver) {
    parts.push(`<span class="tool-stat">${ICON_VERSION} ${ver}</span>`);
  }
  if (repo.stars != null && repo.stars > 0) {
    parts.push(`<span class="tool-stat">${ICON_STAR} ${repo.stars}</span>`);
  }
  return parts.length > 0
    ? `<div class="tool-stats">\n              ${parts.join('\n              ')}\n            </div>`
    : '';
}

let updates = 0;

// Find each <article class="tool-card" data-repo="..."> and inject/replace tool-stats
// We use a regex that matches the entire article block from <article ...> to </article>
const articleRegex = /<article class="tool-card"([^>]*?)data-repo="([^"]+)"([^>]*)>([\s\S]*?)<\/article>/g;

html = html.replace(articleRegex, (match, before, repoName, after, inner) => {
  const repo = repoMap[repoName.toLowerCase()];
  if (!repo) return match;

  const newStatsHtml = buildStatsHtml(repo);

  // Remove any existing <div class="tool-stats">...</div> block within this article
  let newInner = inner.replace(/<div class="tool-stats">[\s\S]*?<\/div>\s*/g, '');

  if (newStatsHtml) {
    // Insert the new stats block right after the description <p ...>...</p>
    const pMatch = newInner.match(/(<p[^>]*data-i18n="tools\.items\.[^"]+\.desc"[^>]*>[\s\S]*?<\/p>)/);
    if (pMatch) {
      newInner = newInner.replace(pMatch[1], pMatch[1] + '\n            ' + newStatsHtml);
      updates++;
    } else {
      // Fallback: insert before the closing </div> of the inner content wrapper
      const lastDivMatch = newInner.match(/(<\/p>)([^<]*<div class="tool-links">)/);
      if (lastDivMatch) {
        newInner = newInner.replace(lastDivMatch[0], lastDivMatch[1] + '\n            ' + newStatsHtml + '\n          </div>\n          ' + lastDivMatch[2].trim());
      }
    }
  }

  return `<article class="tool-card"${before}data-repo="${repoName}"${after}>${newInner}</article>`;
});

fs.writeFileSync(indexPath, html);
console.log(`Updated ${updates} tool cards with current GitHub stats`);
console.log(`Stats source: ${stats.generated}`);
