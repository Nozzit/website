// Auto-populate tool card stats from /data/stats.json
// Each tool card needs: <article class="tool-card" data-repo="repo-name">
(function() {
  function svgIcon(d) {
    return `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">${d}</svg>`;
  }
  const ICONS = {
    commit: svgIcon('<circle cx="8" cy="8" r="3"/>'),
    version: svgIcon('<path d="M2 2h4l1 1v4l-1 1H2L1 7V3l1-1zm7 7h4l1 1v4l-1 1H9l-1-1v-4l1-1z"/>'),
    star: svgIcon('<path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>'),
  };

  // Format version: v1.47.5 -> v1.47, v0.7.8 -> v0.7
  function formatVersion(tag) {
    if (!tag) return null;
    const m = tag.match(/v?(\d+)\.(\d+)/);
    return m ? `v${m[1]}.${m[2]}` : tag;
  }

  function buildStatsHtml(repo) {
    const parts = [];
    if (repo.commits != null && repo.commits > 0) {
      parts.push(`<span class="tool-stat">${ICONS.commit} ${repo.commits} commits</span>`);
    }
    const ver = formatVersion(repo.latestRelease);
    if (ver) {
      parts.push(`<span class="tool-stat">${ICONS.version} ${ver}</span>`);
    }
    if (repo.stars != null && repo.stars > 0) {
      parts.push(`<span class="tool-stat">${ICONS.star} ${repo.stars}</span>`);
    }
    return parts.join('');
  }

  fetch('/data/stats.json')
    .then(r => r.json())
    .then(data => {
      // Build lookup map (case-insensitive)
      const repoMap = {};
      data.repos.forEach(r => {
        repoMap[r.name.toLowerCase()] = r;
      });

      document.querySelectorAll('article.tool-card[data-repo]').forEach(card => {
        const repoName = card.getAttribute('data-repo');
        const repo = repoMap[repoName.toLowerCase()];
        if (!repo) return;

        const html = buildStatsHtml(repo);
        if (!html) return;

        // Find existing stats div, or create one
        let statsDiv = card.querySelector('.tool-stats');
        if (!statsDiv) {
          statsDiv = document.createElement('div');
          statsDiv.className = 'tool-stats';
          // Insert after the description <p>
          const desc = card.querySelector('p');
          if (desc) {
            desc.insertAdjacentElement('afterend', statsDiv);
          } else {
            card.appendChild(statsDiv);
          }
        }
        statsDiv.innerHTML = html;
      });
    })
    .catch(() => {});
})();
