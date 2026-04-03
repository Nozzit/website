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

  const contributorSet = new Set();
  let totalCommits = 0;

  for (const repo of publicRepos) {
    console.log(`  Processing ${repo.name}...`);
    try {
      const contributors = await fetchAllPages(
        `https://api.github.com/repos/${ORG}/${repo.name}/contributors?anon=false`
      );
      contributors.forEach(c => contributorSet.add(c.login));
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

  const newsItems = [];
  const today = new Date().toISOString().substring(0, 10);

  for (const repo of publicRepos) {
    try {
      const releases = await ghFetch(
        `https://api.github.com/repos/${ORG}/${repo.name}/releases?per_page=5`
      );
      repo._releases = releases.length;
      repo._latestRelease = releases[0]?.tag_name || null;
      repo._latestReleaseDate = releases[0]?.published_at?.substring(0, 10) || null;

      releases.forEach(rel => {
        const daysAgo = (Date.now() - new Date(rel.published_at).getTime()) / 86400000;
        if (daysAgo <= 7) {
          newsItems.push({
            type: 'release',
            repo: repo.name,
            title: `${repo.name} ${rel.tag_name} uitgebracht`,
            description: rel.name || `Nieuwe versie ${rel.tag_name}`,
            date: rel.published_at?.substring(0, 10),
            url: rel.html_url,
          });
        }
      });
    } catch (e) {
      repo._releases = 0;
      repo._latestRelease = null;
    }
  }

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

  newsItems.sort((a, b) => b.date.localeCompare(a.date));

  const langStats = {};
  publicRepos.forEach(r => {
    if (r.language) langStats[r.language] = (langStats[r.language] || 0) + 1;
  });

  const monthlyCreation = {};
  publicRepos.forEach(r => {
    const month = r.created_at.substring(0, 7);
    monthlyCreation[month] = (monthlyCreation[month] || 0) + 1;
  });

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
      estimatedLinesOfCode: Math.round(publicRepos.reduce((s, r) => s + r.size, 0) * 25),
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
    topByStars: [...publicRepos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5).map(r => ({ name: r.name, value: r.stargazers_count })),
    topByCommits: [...publicRepos].sort((a, b) => (b._commitCount || 0) - (a._commitCount || 0)).slice(0, 5).map(r => ({ name: r.name, value: r._commitCount })),
    topBySize: [...publicRepos].sort((a, b) => b.size - a.size).slice(0, 5).map(r => ({ name: r.name, value: Math.round(r.size / 1024) + ' MB' })),
  };

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
