# Live Statistics & Auto-News Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a GitHub Actions pipeline that daily collects statistics and detects news (new releases, new repos) across all OpenAEC repos, writes them to JSON data files, and a statistics page + news feed that reads those files — so the website always has fresh data without client-side API calls.

**Architecture:**
- A GitHub Action (`.github/workflows/update-stats.yml`) runs daily at 06:00 and on manual trigger
- A Node.js script (`scripts/generate-stats.js`) fetches all org data via GitHub API (authenticated, 5000 req/hour)
- Output: `data/stats.json` (all repo stats), `data/news.json` (detected news items), `data/history/YYYY-MM-DD.json` (daily snapshots for trends)
- The statistieken page and homepage news section read these JSON files via `fetch('/data/stats.json')`
- Fallback: hardcoded values if JSON fails to load

**Tech Stack:** GitHub Actions, Node.js (runs in CI), vanilla JavaScript (client), GitHub REST API v3

---

### Task 1: Create the stats generator script

**Files:**
- Create: `scripts/generate-stats.js`

- [ ] **Step 1: Create scripts directory and generator**

```javascript
// scripts/generate-stats.js
// Runs in GitHub Actions with GITHUB_TOKEN for 5000 req/hour
const fs = require('fs');
const path = require('path');

const ORG = 'OpenAEC-Foundation';
const TOKEN = process.env.GITHUB_TOKEN;
const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'OpenAEC-Stats-Bot',
};
if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

async function ghFetch(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

async function fetchAllPages(baseUrl) {
  const results = [];
  let page = 1;
  while (true) {
    const sep = baseUrl.includes('?') ? '&' : '?';
    const data = await ghFetch(`${baseUrl}${sep}per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    page++;
  }
  return results;
}

async function main() {
  console.log('Fetching all repos...');
  const repos = await fetchAllPages(`https://api.github.com/orgs/${ORG}/repos?type=all`);
  const publicRepos = repos.filter(r => !r.private);

  console.log(`Found ${repos.length} repos (${publicRepos.length} public)`);

  // Fetch contributors for each public repo
  const contributorSet = new Set();
  let totalCommits = 0;

  for (const repo of publicRepos) {
    console.log(`  Processing ${repo.name}...`);
    try {
      // Contributors
      const contributors = await fetchAllPages(
        `https://api.github.com/repos/${ORG}/${repo.name}/contributors?anon=false`
      );
      contributors.forEach(c => contributorSet.add(c.login));

      // Commit count (from default branch)
      const commits = await fetchAllPages(
        `https://api.github.com/repos/${ORG}/${repo.name}/commits?per_page=1`
      );
      // Use the Link header trick for count - but simpler: count contributors' contributions
      const repoCommits = contributors.reduce((s, c) => s + (c.contributions || 0), 0);
      totalCommits += repoCommits;
      repo._commitCount = repoCommits;
      repo._contributorCount = contributors.length;
    } catch (e) {
      console.warn(`  Warning: ${repo.name}: ${e.message}`);
      repo._commitCount = 0;
      repo._contributorCount = 0;
    }
  }

  // Fetch latest releases for news detection
  const newsItems = [];
  const today = new Date().toISOString().substring(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().substring(0, 10);

  for (const repo of publicRepos) {
    try {
      const releases = await ghFetch(
        `https://api.github.com/repos/${ORG}/${repo.name}/releases?per_page=5`
      );
      repo._releases = releases.length;
      repo._latestRelease = releases[0]?.tag_name || null;
      repo._latestReleaseDate = releases[0]?.published_at?.substring(0, 10) || null;

      // Detect new releases (last 7 days)
      releases.forEach(rel => {
        const relDate = rel.published_at?.substring(0, 10);
        const daysAgo = (Date.now() - new Date(rel.published_at).getTime()) / 86400000;
        if (daysAgo <= 7) {
          newsItems.push({
            type: 'release',
            repo: repo.name,
            title: `${repo.name} ${rel.tag_name} uitgebracht`,
            description: rel.name || `Nieuwe versie ${rel.tag_name}`,
            date: relDate,
            url: rel.html_url,
          });
        }
      });
    } catch (e) {
      repo._releases = 0;
      repo._latestRelease = null;
    }
  }

  // Detect new repos (created in last 7 days)
  publicRepos.forEach(repo => {
    const daysAgo = (Date.now() - new Date(repo.created_at).getTime()) / 86400000;
    if (daysAgo <= 7) {
      newsItems.push({
        type: 'new_repo',
        repo: repo.name,
        title: `Nieuwe repository: ${repo.name}`,
        description: repo.description || 'Nieuw project gestart',
        date: repo.created_at.substring(0, 10),
        url: repo.html_url,
      });
    }
  });

  // Sort news by date (newest first)
  newsItems.sort((a, b) => b.date.localeCompare(a.date));

  // Build language stats
  const langStats = {};
  publicRepos.forEach(r => {
    if (r.language) langStats[r.language] = (langStats[r.language] || 0) + 1;
  });

  // Build monthly creation stats
  const monthlyCreation = {};
  publicRepos.forEach(r => {
    const month = r.created_at.substring(0, 7);
    monthlyCreation[month] = (monthlyCreation[month] || 0) + 1;
  });

  // Build output
  const stats = {
    generated: new Date().toISOString(),
    summary: {
      totalRepos: repos.length,
      publicRepos: publicRepos.length,
      privateRepos: repos.length - publicRepos.length,
      totalStars: publicRepos.reduce((s, r) => s + r.stargazers_count, 0),
      totalForks: publicRepos.reduce((s, r) => s + r.forks_count, 0),
      totalOpenIssues: publicRepos.reduce((s, r) => s + r.open_issues_count, 0),
      totalSizeKB: publicRepos.reduce((s, r) => s + r.size, 0),
      estimatedLinesOfCode: Math.round(publicRepos.reduce((s, r) => s + r.size, 0) * 25), // rough: 25 lines/KB
      totalCommits: totalCommits,
      uniqueContributors: contributorSet.size,
      languages: Object.keys(langStats).length,
    },
    languageDistribution: langStats,
    monthlyRepoCreation: monthlyCreation,
    repos: publicRepos.map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      openIssues: r.open_issues_count,
      sizeKB: r.size,
      commits: r._commitCount,
      contributors: r._contributorCount,
      releases: r._releases,
      latestRelease: r._latestRelease,
      latestReleaseDate: r._latestReleaseDate,
      createdAt: r.created_at.substring(0, 10),
      updatedAt: r.updated_at.substring(0, 10),
      url: r.html_url,
    })).sort((a, b) => b.stars - a.stars),
    topByStars: publicRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5).map(r => ({ name: r.name, value: r.stargazers_count })),
    topByCommits: publicRepos.sort((a, b) => (b._commitCount || 0) - (a._commitCount || 0)).slice(0, 5).map(r => ({ name: r.name, value: r._commitCount })),
    topBySize: publicRepos.sort((a, b) => b.size - a.size).slice(0, 5).map(r => ({ name: r.name, value: Math.round(r.size / 1024) + ' MB' })),
  };

  // Write output files
  const dataDir = path.join(__dirname, '..', 'data');
  const historyDir = path.join(dataDir, 'history');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(historyDir, { recursive: true });

  fs.writeFileSync(path.join(dataDir, 'stats.json'), JSON.stringify(stats, null, 2));
  fs.writeFileSync(path.join(dataDir, 'news.json'), JSON.stringify(newsItems, null, 2));
  fs.writeFileSync(path.join(historyDir, `${today}.json`), JSON.stringify(stats.summary, null, 2));

  console.log(`\nDone! Written to data/stats.json, data/news.json, data/history/${today}.json`);
  console.log(`Summary: ${stats.summary.totalRepos} repos, ${stats.summary.totalStars} stars, ${stats.summary.uniqueContributors} contributors`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
```

- [ ] **Step 2: Commit**

```bash
git add scripts/generate-stats.js
git commit -m "feat: add GitHub stats generator script"
```

---

### Task 2: Create the GitHub Action workflow

**Files:**
- Create: `.github/workflows/update-stats.yml`

- [ ] **Step 1: Create the workflow file**

```yaml
name: Update Statistics & News

on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 06:00 UTC
  workflow_dispatch:       # Manual trigger

permissions:
  contents: write

jobs:
  update-stats:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout website repo
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Generate statistics
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: node scripts/generate-stats.js

      - name: Commit and push data
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/
          git diff --staged --quiet || git commit -m "chore: update statistics $(date +%Y-%m-%d)"
          git push
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/update-stats.yml
git commit -m "feat: add daily stats update GitHub Action"
```

---

### Task 3: Rewrite statistieken/index.html to read from data/stats.json

**Files:**
- Modify: `statistieken/index.html`

- [ ] **Step 1: Replace all hardcoded stats with placeholder elements**

Update highlight cards to 6 cards (3x2 grid):

```html
<div class="highlight-cards" style="grid-template-columns: repeat(3, 1fr);">
  <div class="highlight-card"><div class="number" id="s-repos">—</div><div class="label">Repositories</div></div>
  <div class="highlight-card"><div class="number" id="s-commits">—</div><div class="label">Commits</div></div>
  <div class="highlight-card"><div class="number" id="s-stars">—</div><div class="label">Stars</div></div>
  <div class="highlight-card"><div class="number" id="s-contributors">—</div><div class="label">Contributors</div></div>
  <div class="highlight-card"><div class="number" id="s-loc">—</div><div class="label">Regels code (est.)</div></div>
  <div class="highlight-card"><div class="number" id="s-languages">—</div><div class="label">Programmeertalen</div></div>
</div>
```

- [ ] **Step 2: Add chart sections after highlight cards**

```html
<!-- Charts -->
<section class="section" style="background: white;">
  <div class="stats-section">
    <h2>Repos per <span class="accent">maand</span></h2>
    <div id="chart-monthly" style="height: 300px;"></div>
  </div>
</section>
<section class="section" style="background: var(--concrete);">
  <div class="stats-section">
    <h2>Verdeling per <span class="accent">programmeertaal</span></h2>
    <div id="chart-langs" style="height: 300px;"></div>
  </div>
</section>
```

- [ ] **Step 3: Replace hardcoded table with dynamic tbody**

```html
<tbody id="repo-tbody">
  <tr><td colspan="6" style="text-align:center;color:var(--scaffold-gray);padding:var(--sp-8);">Laden...</td></tr>
</tbody>
```

Table headers: Repository, Taal, Commits, Releases, Stars, Aangemaakt

- [ ] **Step 4: Replace hardcoded top-repos with id targets**

```html
<div class="top-repos">
  <div class="top-repo-card"><h4>Meeste stars</h4><ol id="top-stars"></ol></div>
  <div class="top-repo-card"><h4>Meeste commits</h4><ol id="top-commits"></ol></div>
  <div class="top-repo-card"><h4>Grootste repos</h4><ol id="top-size"></ol></div>
</div>
```

- [ ] **Step 5: Add the rendering script**

```html
<script>
const LANG_COLORS = {
  TypeScript:'#3178C6', JavaScript:'#F1E05A', Python:'#3572A5',
  Rust:'#DEA584', HTML:'#E34C26', CSS:'#563D7C', 'C++':'#F34B7D'
};

fetch('/data/stats.json')
  .then(r => r.json())
  .then(renderStats)
  .catch(() => {
    document.getElementById('s-repos').textContent = '50+';
    document.getElementById('s-stars').textContent = '139+';
    document.getElementById('s-commits').textContent = '2.400+';
    document.getElementById('s-contributors').textContent = '10+';
    document.getElementById('s-loc').textContent = '—';
    document.getElementById('s-languages').textContent = '7+';
  });

function renderStats(data) {
  const s = data.summary;
  document.getElementById('s-repos').textContent = s.publicRepos;
  document.getElementById('s-commits').textContent = s.totalCommits.toLocaleString('nl-NL');
  document.getElementById('s-stars').textContent = s.totalStars;
  document.getElementById('s-contributors').textContent = s.uniqueContributors;
  document.getElementById('s-loc').textContent = s.estimatedLinesOfCode.toLocaleString('nl-NL');
  document.getElementById('s-languages').textContent = s.languages;

  // Table
  const tbody = document.getElementById('repo-tbody');
  tbody.innerHTML = data.repos.map(r => `<tr>
    <td><a href="${r.url}" target="_blank">${r.name}</a></td>
    <td><span class="lang-dot" style="background:${LANG_COLORS[r.language]||'#999'}"></span>${r.language||'—'}</td>
    <td>${r.commits}</td>
    <td>${r.releases}${r.latestRelease ? ' ('+r.latestRelease+')' : ''}</td>
    <td>${r.stars}</td>
    <td>${r.createdAt}</td>
  </tr>`).join('');

  // Top repos
  function topList(id, items) {
    document.getElementById(id).innerHTML = items.map(i =>
      `<li><span class="repo-name">${i.name}</span><span class="repo-val">${i.value}</span></li>`
    ).join('');
  }
  topList('top-stars', data.topByStars);
  topList('top-commits', data.topByCommits);
  topList('top-size', data.topBySize);

  // Charts
  barChart('chart-monthly', data.monthlyRepoCreation, 'var(--amber)');
  barChart('chart-langs', data.languageDistribution, LANG_COLORS);
}

function barChart(id, dataObj, colors) {
  const el = document.getElementById(id);
  const entries = Object.entries(dataObj).sort((a,b) => a[0].localeCompare(b[0]));
  const max = Math.max(...entries.map(e => e[1]));
  el.innerHTML = `<div style="display:flex;align-items:flex-end;gap:4px;height:260px;padding-top:20px;">
    ${entries.map(([k, v]) => {
      const h = Math.max(6, (v/max)*230);
      const c = typeof colors === 'object' && colors[k] ? colors[k] : colors;
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
        <span style="font-family:var(--font-code);font-size:0.7rem;color:var(--deep-forge);">${v}</span>
        <div style="width:100%;max-width:60px;height:${h}px;background:${c};border-radius:4px 4px 0 0;"></div>
        <span style="font-size:0.6rem;color:var(--scaffold-gray);text-align:center;overflow:hidden;text-overflow:ellipsis;max-width:70px;">${k}</span>
      </div>`;
    }).join('')}
  </div>`;
}
</script>
```

- [ ] **Step 6: Add "Laatste update" indicator below the header**

```html
<p id="stats-updated" style="text-align:center;font-size:0.75rem;color:var(--scaffold-gray);margin-top:var(--sp-2);"></p>
```

In the script, after renderStats:
```javascript
document.getElementById('stats-updated').textContent = 'Laatste update: ' + data.generated.substring(0, 10);
```

- [ ] **Step 7: Commit**

```bash
git add statistieken/index.html
git commit -m "feat: statistics page reads from data/stats.json"
```

---

### Task 4: Add news feed to homepage

**Files:**
- Modify: `index.html` (homepage news section)

- [ ] **Step 1: Add a news feed container in the Nieuws section**

Find the existing Nieuws section on the homepage and add:

```html
<div id="news-feed" style="max-width:700px;margin:var(--sp-6) auto;"></div>
```

- [ ] **Step 2: Add news rendering script**

```javascript
fetch('/data/news.json')
  .then(r => r.json())
  .then(news => {
    const feed = document.getElementById('news-feed');
    if (!news.length) return;
    feed.innerHTML = news.slice(0, 5).map(item => `
      <div style="display:flex;gap:var(--sp-4);padding:var(--sp-3) 0;border-bottom:1px solid #E7E5E4;">
        <span style="font-family:var(--font-code);font-size:0.7rem;color:var(--scaffold-gray);white-space:nowrap;">${item.date}</span>
        <div>
          <a href="${item.url}" target="_blank" style="color:var(--deep-forge);font-weight:600;text-decoration:none;font-size:0.9rem;">${item.title}</a>
          <p style="font-size:0.8rem;color:var(--scaffold-gray);margin:2px 0 0;">${item.description}</p>
        </div>
      </div>
    `).join('');
  })
  .catch(() => {}); // Silent fail — news is optional
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: auto-generated news feed on homepage"
```

---

### Task 5: Generate initial data and push

- [ ] **Step 1: Run the generator locally to create initial data files**

```bash
export GITHUB_TOKEN=$(gh auth token)
node scripts/generate-stats.js
```

Expected: `data/stats.json`, `data/news.json`, `data/history/2026-04-03.json` created

- [ ] **Step 2: Verify the JSON files are valid**

```bash
cat data/stats.json | head -20
cat data/news.json | head -20
```

- [ ] **Step 3: Commit data files and push everything**

```bash
git add data/ scripts/ .github/ statistieken/index.html index.html
git commit -m "feat: complete statistics pipeline with GitHub Actions"
git push
```

- [ ] **Step 4: Manually trigger the GitHub Action to verify it works**

```bash
gh workflow run update-stats.yml
gh run watch
```

Expected: Workflow completes successfully, data/ files updated

---

### Task 6: Add .gitignore entry for history limit

- [ ] **Step 1: Prevent history folder from growing unbounded**

Add to the GitHub Action a cleanup step:

```yaml
      - name: Cleanup old history (keep 90 days)
        run: |
          find data/history -name "*.json" -mtime +90 -delete 2>/dev/null || true
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/update-stats.yml
git commit -m "chore: cleanup old stats history files (keep 90 days)"
git push
```
