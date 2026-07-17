# Homepage Catalog and Product Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove four retired homepage cards, update BIM Validator with GitHub and development notes, and refresh Speech Studio imagery.

**Architecture:** Keep the static-site structure intact. Express requirements in one Node integration check, make minimal HTML edits, then regenerate Markdown mirrors so human and machine-facing content remain aligned.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js assertion script, JSON-generated site data.

## Global Constraints

- Product pages and API entries for removed homepage cards must remain available.
- Reuse the existing OpenAEC design system without introducing a hybrid visual style.
- Repository content must not name external calculation software or include assistant conversation history.

---

### Task 1: Integration requirements

**Files:**
- Create: `scripts/check-homepage-catalog-product-pages.js`

**Interfaces:**
- Consumes: `index.html`, `bim-validator/index.html`, `open-speech-studio/index.html`, `api/tools.json`
- Produces: process exit code `0` only when all requested content rules hold

- [ ] **Step 1: Write the failing integration check**

  Assert that the four homepage `data-repo` cards are absent, their API/product files remain, BIM Validator contains its GitHub URL and both development/release sections, and Speech Studio uses exactly the three new screenshot paths.

- [ ] **Step 2: Run the check and verify RED**

  Run: `node scripts/check-homepage-catalog-product-pages.js`

  Expected: failure because the four cards, old Speech slide and missing BIM Validator content still violate the assertions.

### Task 2: Homepage catalog and Speech imagery

**Files:**
- Modify: `index.html`
- Modify: `open-speech-studio/index.html`

**Interfaces:**
- Consumes: existing `tool-card`, `media-slider` and screenshot asset conventions
- Produces: compact homepage catalog and three-slide Speech Studio gallery

- [ ] **Step 1: Remove the four complete homepage `<article>` blocks**

  Remove only cards whose `data-repo` values are `open-energy-studio`, `open-2d-studio`, `openaec-cloud`, and `openaec-docs`.

- [ ] **Step 2: Replace the Speech Studio homepage thumbnail**

  Set the card image to `/shared/assets/screenshots/open-speech-studio-tts.png`.

- [ ] **Step 3: Remove the old Speech Studio gallery slide**

  Leave only `open-speech-studio-tts.png`, `open-speech-studio-models.png`, and `open-speech-studio-settings.png` in that order.

### Task 3: BIM Validator product page

**Files:**
- Modify: `bim-validator/index.html`

**Interfaces:**
- Consumes: existing button, section and shared release-notes styles
- Produces: repository CTA, visible recent-development timeline and future release feed

- [ ] **Step 1: Add the repository CTA**

  Add a hero button linking to `https://github.com/OpenAEC-Foundation/OpenAEC-BIM-validator` with `target="_blank"` and `rel="noopener"`.

- [ ] **Step 2: Add recent developments**

  Add dated, plain-language entries for tenant-separated projects, project open/save support, dependency hardening, and interactive section planes, sourced from current repository history.

- [ ] **Step 3: Add the shared release notes component**

  Add `<div data-release-notes="OpenAEC-BIM-validator"></div>` and `/shared/release-notes.js` before the footer.

### Task 4: Generated mirrors and verification

**Files:**
- Modify: `md/index.md`
- Modify: `md/index.json`
- Modify: `md/bim-validator.md`
- Modify: `md/open-speech-studio.md`

**Interfaces:**
- Consumes: updated HTML pages
- Produces: synchronized Markdown catalog and product mirrors

- [ ] **Step 1: Run the Markdown generator**

  Run: `node scripts/build-markdown-mirrors.js`

  Expected: successful generation with no missing source pages.

- [ ] **Step 2: Run GREEN verification**

  Run: `node scripts/check-homepage-catalog-product-pages.js`

  Expected: `Homepage catalog and product pages: OK`.

- [ ] **Step 3: Run regression checks**

  Run: `node scripts/check-open-pile-plan-studio.js`

  Expected: `Open Pile Plan Studio website integration: OK`.

  Run: `git diff --check`

  Expected: exit code `0`.

- [ ] **Step 4: Verify visually**

  Inspect `/`, `/bim-validator/`, and `/open-speech-studio/` at desktop and mobile viewport widths.
