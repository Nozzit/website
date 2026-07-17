# Open Pile Plan Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Open Pile Plan Studio as a complete, multilingual product to the OpenAEC homepage, product catalog, and its own product page.

**Architecture:** Follow the static HTML and shared JSON i18n patterns already used by adjacent OpenAEC product pages. Treat `pile-plan-studio` as the canonical GitHub repository while exposing `/open-pile-plan-studio/` as the public product URL; feed the existing stats, downloads, release-notes, API, and Markdown generators from that repository identifier.

**Tech Stack:** Static HTML/CSS/JavaScript, JSON translations, Node.js generator scripts, GitHub Pages.

## Global Constraints

- Public product name: `Open Pile Plan Studio`.
- GitHub repository: `OpenAEC-Foundation/pile-plan-studio`.
- Public product route and catalog ID: `open-pile-plan-studio`.
- Homepage status badges: Beschikbaar, Beta, GWW / Geotechniek.
- AEC categories: Engineering (`E`) and Infrastructure (`I`).
- Product claims must be traceable to the repository README or source tree.
- Preserve all unrelated user changes in the dirty worktree.
- Do not introduce names of external calculation products or conversation history into repository content.

---

### Task 1: Static integration contract

**Files:**
- Create: `scripts/check-open-pile-plan-studio.js`

**Interfaces:**
- Consumes: homepage HTML, product-page HTML, translation JSON, sitemap, generator source.
- Produces: a zero-exit verification command for all Open Pile Plan Studio website integration points.

- [ ] **Step 1: Write the failing contract test**

Create a Node script using `node:assert` and `node:fs` that asserts: the homepage contains `data-repo="pile-plan-studio"`, `/open-pile-plan-studio/`, all four homepage translation entries and Schema.org metadata; the product page and three external translation files exist; the sitemap contains the route; and the downloads, release notes, tools API, Markdown mirror, and category generators contain `pile-plan-studio`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node scripts/check-open-pile-plan-studio.js`

Expected: non-zero exit with the first missing integration point.

- [ ] **Step 3: Commit the contract test with the implementation batch**

The test remains red until Tasks 2–4 complete, then is committed together with the implementation so no knowingly failing intermediate commit is created.

### Task 2: Homepage catalog card and discoverability

**Files:**
- Modify: `index.html`
- Modify: `sitemap.xml`
- Create: `shared/assets/screenshots/open-pile-plan-studio.png`

**Interfaces:**
- Consumes: `pile-plan-studio` GitHub metadata and the existing `tool-card` markup contract.
- Produces: homepage card, product route, four-language copy, Schema.org entry, and a reusable product screenshot.

- [ ] **Step 1: Capture the verified live application visual**

Open `https://pile-plan-studio.open-aec.com/`, verify the loaded interface, and save a representative application screenshot as `shared/assets/screenshots/open-pile-plan-studio.png`.

- [ ] **Step 2: Add the homepage card**

Insert directly after Open Geotechniek Studio with `data-repo="pile-plan-studio"`, `data-categories="E,I"`, the approved badges, the screenshot, route `/open-pile-plan-studio/`, and live demo `https://pile-plan-studio.open-aec.com/`.

- [ ] **Step 3: Add homepage translations and structured data**

Add `openPilePlan` title/description/link entries to NL, EN, FR, and TR translation objects and a `SoftwareApplication` item to the Schema.org `ItemList`.

- [ ] **Step 4: Add the sitemap route**

Add `https://www.open-aec.com/open-pile-plan-studio/` with weekly change frequency and priority `0.9`.

### Task 3: Multilingual product page

**Files:**
- Create: `open-pile-plan-studio/index.html`
- Create: `shared/translations/open-pile-plan-studio.json`
- Create: `shared/translations/open-pile-plan-studio.fr.json`
- Create: `shared/translations/open-pile-plan-studio.tr.json`

**Interfaces:**
- Consumes: shared navigation, shared i18n loader, shared release-notes component, and the screenshot from Task 2.
- Produces: a responsive NL-default product page with complete EN, FR, and TR translations.

- [ ] **Step 1: Build the Dutch-default page shell**

Create Schema.org metadata, hero, status labels, browser-demo and GitHub actions, screenshot section, product explanation, limitations notice, feature grid, workflow, technology section, CTA, shared navigation, release notes using `pile-plan-studio`, and shared footer.

- [ ] **Step 2: Use only verified product functions**

Cover sample project loading; CSV/XLSX import for load points, CPTs, and foundation advice; automatic/manual CPT selection; pile-option comparison and assignment; utilization and estimated cost; greedy optimization with explicit limitations; IFCPP save/reopen; and shared Rust core across browser/WASM and desktop/Tauri.

- [ ] **Step 3: Add complete translations**

Mirror every `data-i18n` key in the EN, FR, and TR JSON files. Keep technical identifiers such as CPT, IFCPP, CSV, XLSX, Rust, WebAssembly, React, and Tauri unchanged.

- [ ] **Step 4: Validate translation JSON**

Run: `node -e "for (const f of ['shared/translations/open-pile-plan-studio.json','shared/translations/open-pile-plan-studio.fr.json','shared/translations/open-pile-plan-studio.tr.json']) JSON.parse(require('fs').readFileSync(f,'utf8')); console.log('translations valid')"`

Expected: `translations valid`.

### Task 4: Generators and machine-readable catalog

**Files:**
- Modify: `scripts/generate-downloads.js`
- Modify: `scripts/generate-release-notes.js`
- Modify: `scripts/build-tools-api.js`
- Modify: `scripts/build-markdown-mirrors.js`
- Modify: `scripts/add-category-tags.js`
- Regenerate: `api/tools.json`
- Regenerate: `md/open-pile-plan-studio.md`
- Regenerate: `md/index.md`
- Regenerate: `md/index.json`

**Interfaces:**
- Consumes: canonical repo `pile-plan-studio`, cached stats/download data, and product metadata.
- Produces: download/release tracking registration, API catalog entry, Markdown mirror, and category-map entry.

- [ ] **Step 1: Register repository tracking**

Add `pile-plan-studio` to the download and release-note repository arrays and map its homepage categories to `['E','I']`.

- [ ] **Step 2: Add catalog metadata without external product names**

Add Open Pile Plan Studio to both curated generator catalogs with category `Foundation Engineering`, status `beta`, license `LGPL-3.0-or-later`, platforms `Web` and `Windows`, stack `Rust`, `WebAssembly`, `React`, `TypeScript`, and `Tauri 2`, plus only README-verified features.

- [ ] **Step 3: Regenerate deterministic outputs**

Run: `node scripts/build-tools-api.js`

Expected: `api/tools.json` is written and contains `open-pile-plan-studio`.

Run: `node scripts/build-markdown-mirrors.js`

Expected: `md/open-pile-plan-studio.md`, `md/index.md`, and `md/index.json` are written.

### Task 5: Verification and focused commit

**Files:**
- Verify all files from Tasks 1–4.

**Interfaces:**
- Consumes: completed static website integration.
- Produces: evidence that the feature is coherent and ready for review.

- [ ] **Step 1: Run the static integration contract**

Run: `node scripts/check-open-pile-plan-studio.js`

Expected: `Open Pile Plan Studio website integration: OK`.

- [ ] **Step 2: Scan the changed content for forbidden references**

Run a focused `rg` scan over only the files changed by this feature and confirm no prohibited external product names or assistant-conversation references were introduced.

- [ ] **Step 3: Serve and inspect both pages**

Run a local static server, open `/` and `/open-pile-plan-studio/`, verify desktop and mobile layout, image loading, links, and at least NL and EN language switching.

- [ ] **Step 4: Review the diff and commit only feature files**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; unrelated pre-existing changes remain unstaged.

Commit message: `feat(home): add Open Pile Plan Studio`.
