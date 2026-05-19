// scripts/generate-downloads.js
// Aggregates download counts per repo and per platform from GitHub Releases.
const fs = require('fs');
const path = require('path');

const ORG = 'OpenAEC-Foundation';
const TOKEN = process.env.GITHUB_TOKEN;
const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'OpenAEC-Downloads-Bot',
};
if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

// Tool repos to track downloads for
const TOOL_REPOS = [
  'open-pdf-studio',
  'open-2d-studio',
  'open-calc-studio',
  'open-energy-studio',
  'open-planner-studio',
  'open-pointcloud-studio',
  'open-heatloss-studio',
  'open-speech-studio',
  'Open-Field-Studio',
  'open-frame-studio',
  'monty-ifc-viewer',
  'OpenAEC-BIM-validator',
  'openaec-bcf-platform',
  'openaec-docs',
  'openaec-cloud',
  'Y-app',
];

// Classify asset filename into platform/format
function classify(name) {
  const n = name.toLowerCase();
  if (n.endsWith('.exe') || n.includes('_x64-setup') || n.includes('windows')) return 'Windows';
  if (n.endsWith('.msi') || n.endsWith('.msix')) return 'Windows (MSI)';
  if (n.endsWith('.dmg')) return 'macOS';
  if (n.endsWith('.pkg')) return 'macOS (pkg)';
  if (n.endsWith('.deb')) return 'Linux (deb)';
  if (n.endsWith('.rpm')) return 'Linux (rpm)';
  if (n.endsWith('.appimage')) return 'Linux (AppImage)';
  if (n.endsWith('.snap')) return 'Linux (snap)';
  if (n.endsWith('.flatpak')) return 'Linux (flatpak)';
  if (n.endsWith('.apk')) return 'Android';
  if (n.endsWith('.ipa')) return 'iOS';
  if (n.endsWith('.tar.gz') || n.endsWith('.tgz') || n.endsWith('.zip')) return 'Archive';
  if (n.endsWith('.sig') || n.endsWith('.pem') || n.endsWith('.asc')) return null; // skip sigs
  if (n === 'latest.json' || n.endsWith('.json')) return null; // skip updater manifests
  return 'Other';
}

async function ghFetch(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status}: ${url}`);
  return res.json();
}

async function fetchAllReleases(repo) {
  const all = [];
  let page = 1;
  while (true) {
    const data = await ghFetch(`https://api.github.com/repos/${ORG}/${repo}/releases?per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    page++;
  }
  return all;
}

async function processRepo(repo) {
  const releases = await fetchAllReleases(repo);

  let totalDownloads = 0;
  let totalAssets = 0;
  const byPlatform = {};
  const byVersion = {};
  const topAssets = [];

  releases.forEach(rel => {
    const isNightly = rel.tag_name === 'nightly' || rel.prerelease;
    (rel.assets || []).forEach(asset => {
      const platform = classify(asset.name);
      if (!platform) return; // skip signatures, manifests

      totalDownloads += asset.download_count;
      totalAssets++;

      byPlatform[platform] = (byPlatform[platform] || 0) + asset.download_count;
      if (!isNightly) {
        byVersion[rel.tag_name] = (byVersion[rel.tag_name] || 0) + asset.download_count;
      }

      if (asset.download_count > 0) {
        topAssets.push({
          tag: rel.tag_name,
          name: asset.name,
          platform: platform,
          downloads: asset.download_count,
          sizeMB: Math.round(asset.size / 1024 / 1024 * 10) / 10,
          date: asset.created_at?.substring(0, 10),
          url: asset.browser_download_url,
        });
      }
    });
  });

  topAssets.sort((a, b) => b.downloads - a.downloads);

  return {
    repo,
    totalDownloads,
    totalAssets,
    releases: releases.length,
    byPlatform,
    byVersion,
    topAssets: topAssets.slice(0, 10),
  };
}

async function main() {
  console.log('Fetching download stats for', TOOL_REPOS.length, 'tools...\n');
  const perTool = [];

  for (const repo of TOOL_REPOS) {
    try {
      const data = await processRepo(repo);
      perTool.push(data);
      console.log(`  ${repo.padEnd(35)} ${String(data.totalDownloads).padStart(6)} downloads across ${data.totalAssets} assets`);
    } catch (e) {
      console.warn(`  ${repo}: error - ${e.message}`);
    }
  }

  // Aggregate totals
  const grandTotal = perTool.reduce((s, t) => s + t.totalDownloads, 0);
  const platformTotals = {};
  perTool.forEach(t => {
    Object.entries(t.byPlatform).forEach(([p, n]) => {
      platformTotals[p] = (platformTotals[p] || 0) + n;
    });
  });

  // Top tools by downloads
  const ranked = [...perTool].sort((a, b) => b.totalDownloads - a.totalDownloads);

  const output = {
    generated: new Date().toISOString(),
    grandTotal,
    totalRepos: perTool.length,
    platformTotals,
    rankedByDownloads: ranked.map(t => ({ repo: t.repo, downloads: t.totalDownloads, releases: t.releases })),
    perTool,
  };

  const dataDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'downloads.json'), JSON.stringify(output, null, 2));

  console.log(`\nGrand total: ${grandTotal} downloads across ${perTool.length} tools`);
  console.log('Per platform:');
  Object.entries(platformTotals).sort((a, b) => b[1] - a[1]).forEach(([p, n]) => {
    console.log(`  ${p.padEnd(20)} ${n}`);
  });
  console.log('\nWritten to data/downloads.json');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
