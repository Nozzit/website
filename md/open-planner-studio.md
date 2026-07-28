# Open Planner Studio

> Open-source construction scheduling with Gantt charts, critical path (CPM), WBS, resource levelling, baselines and progress tracking. Uses IFC 4.3 as its native file format and ships a built-in MCP server so an AI assistant can read and edit the schedule.

**Status:** beta
**License:** LGPL-3.0
**Platforms:** Windows, macOS, Linux, Web
**Category:** Project Planning
**Current version:** v2026.7.12 (2026-07-23)
**Tool ID:** `open-planner-studio`
**GitHub repo:** `OpenAEC-Foundation/open-planner-studio`

## Live stats

- Stars: **7**
- Commits: **833**
- Forks: **1**
- Open issues: **5**
- Releases: **16**
- Total downloads: **278**
- Downloads by platform: Windows (157), Linux (deb) (72), Linux (AppImage) (25), Archive (10), Linux (rpm) (8), macOS (4), Linux (snap) (2)

## Key features

- Built-in MCP server: an AI client such as Claude Code can read and edit the schedule, with pause, read-only mode and automatic backups
- Interactive Gantt on HTML5 Canvas: drag and drop, vertical drag of a whole selection, collapsible non-working days, week numbers, Ctrl+click multi-select
- Critical path (CPM) with float, near-critical work, multiple critical paths and deadline analysis
- WBS with collapsible chapters and a spreadsheet-style table editor
- Native IFC 4.3 as the file format, with a built-in IFC code editor
- Resources (labour, equipment, subcontractors) with histogram and automatic levelling of overallocation
- Resource libraries: one shared pool across projects, with deviations flagged
- Multiple baselines and progress tracking with status date, actual start and progress line
- Construction calendars: public holidays, building recess, frost delay, inspection moments, phasing, hour-level planning
- Import and export of IFC, CSV, MS Project (.xml) and Primavera P6 (.xml)
- 4D BIM: link schedule tasks to elements in an IFC building model
- Reporting with live print preview, configurable font size, repeating header, multi-page timeline and PDF export at roughly 220 DPI
- Runs natively on Windows, macOS and Linux and fully in the browser, including open, save, auto-save and crash recovery
- In-app manual in all 14 interface languages, with three sample projects

## Tech stack

`Rust` · `TypeScript` · `Tauri 2`

## When to use this

Construction and civil engineering scheduling, as an open-source alternative to Microsoft Project, Primavera P6 or Asta Powerproject — especially when the schedule should stay in an open format (IFC 4.3), when 4D linkage to a BIM model matters, or when an AI assistant should be able to work on the schedule directly.

## Alternative to

- Microsoft Project
- Primavera P6
- Asta Powerproject
- TILOS

## Standards & integration

- IFC 4.3
- IFCX
- MS Project XML
- Primavera P6 XML
- MCP

All OpenAEC tools exchange data via the open **IFCX** format (based on IFC 4.3).

## Download & links

- Product page: https://open-aec.com/open-planner-studio/
- Live demo: https://open-planner-studio.open-aec.com/
- GitHub repo: https://github.com/OpenAEC-Foundation/open-planner-studio
- Latest stable release: https://github.com/OpenAEC-Foundation/open-planner-studio/releases/tag/v2026.7.13
- Nightly builds: https://github.com/OpenAEC-Foundation/open-planner-studio/releases/tag/nightly

## Direct downloads (most popular)

- [Windows · Open.Planner.Studio_2026.6.0_x64-setup.exe](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.6.0/Open.Planner.Studio_2026.6.0_x64-setup.exe) (v2026.6.0 — 4.6 MB)
- [Windows · Open.Planner.Studio_2026.7.10_x64-setup.exe](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.7.10/Open.Planner.Studio_2026.7.10_x64-setup.exe) (v2026.7.10 — 5.3 MB)
- [Windows · Open.Planner.Studio_2026.7.12_x64-setup.exe](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.7.12/Open.Planner.Studio_2026.7.12_x64-setup.exe) (v2026.7.12 — 6.3 MB)
- [Linux (deb) · Open.Planner.Studio_2026.6.0_amd64.deb](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.6.0/Open.Planner.Studio_2026.6.0_amd64.deb) (v2026.6.0 — 5.4 MB)
- [Windows · Open.Planner.Studio_2026.7.11_x64-setup.exe](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.7.11/Open.Planner.Studio_2026.7.11_x64-setup.exe) (v2026.7.11 — 5.3 MB)
- [Windows · Open.Planner.Studio_2026.7.10_x64-setup.nsis.zip](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.7.10/Open.Planner.Studio_2026.7.10_x64-setup.nsis.zip) (v2026.7.10 — 4.9 MB)
- [Linux (deb) · Open.Planner.Studio_2026.7.10_amd64.deb](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.7.10/Open.Planner.Studio_2026.7.10_amd64.deb) (v2026.7.10 — 5.9 MB)
- [Windows · Open.Planner.Studio_2026.7.11_x64-setup.nsis.zip](https://github.com/OpenAEC-Foundation/open-planner-studio/releases/download/v2026.7.11/Open.Planner.Studio_2026.7.11_x64-setup.nsis.zip) (v2026.7.11 — 4.9 MB)

---

Part of the [OpenAEC Foundation](https://open-aec.com/) ecosystem — open-source software for buildings, civil infrastructure (GWW) and civil engineering. All tools communicate through **IFCX**.
