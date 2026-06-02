# OSArch forum post — OpenAEC introduction

> For community.osarch.org — category: "Showcase" or "General".
> Light, honest, community tone. Discourse markdown. Ready to paste.

---

**Title:** Hi OSArch 👋 — we started a foundation (OpenAEC) and we'd love your eyes on it

---

Hey everyone,

Long-time lurker, first-time poster. A few of us in the Netherlands got a little carried away and started a small non-profit called the **OpenAEC Foundation** — basically "what if the Blender Foundation, but for the whole building + civil engineering chain." 🏗️

The honest pitch: we're shipping a lot of open source AEC tools, and we'd love some testers and contributors who actually know what they're doing (that's you).

A few things that might interest this crowd specifically:

- **Open CAD Studio** — a 2D + 3D CAD app written in **Rust** (wgpu for rendering) that reads *and writes* **DWG/DXF natively**, R13–R2018, no Autodesk libs. It's a community project by Hakan Seven and we think it's a lovely companion to FreeCAD. Starts in <1s, 30 MB. → https://www.open-aec.com/open-cad-studio/
- **IFCX in production** — we're implementing buildingSMART's JSON-LD format in real tools, not slides. Would genuinely love to compare notes with people here on namespace design. → https://www.open-aec.com/ifcx/
- **Open Geotechniek Studio** — GEF + BRO-XML viewer, Robertson SBT classification, exports an open `.ifcgis` format. MIT.
- **OpenAEC BIM Validator** — IFC validation against IDS, with BCF export.
- …and ~13 more (PDF, point clouds, heat-loss per NEN, ERP, speech-to-text, etc.). Full list + live stats: https://www.open-aec.com

None of this would exist without the foundations this community built. **IfcOpenShell** and **Bonsai** (and @Moult's work in general) are the bedrock — we're trying to fill gaps *around* that stack, not reinvent it. 🙏

**Where we could really use help:**
- 🧪 **Testers** — break our tools, file issues, tell us what's missing
- 🛠️ **Contributors** — PRs welcome everywhere, especially on IFCX
- 💬 **Honest feedback** — is any of this useful to you? What would make it useful?

Everything is LGPL / GPL / MIT, free forever, no strings. We fund development the Blender way — org partnerships, plus optional consultancy and AI-integration services through our commercial partner **Impertio Studio BV** (think hosting, SLAs, on-site implementation). The software itself stays 100% open no matter what; the paid bits are just for orgs that want a managed setup.

GitHub: https://github.com/OpenAEC-Foundation

Would love to hear what you think — and if any of it is duplicating something that already exists in the OSArch world, please tell us so we can join forces instead. 🤝

Cheers,
Maarten (OpenAEC Foundation)

---

### Notes for posting
- Replace `@Moult` with Dion's actual forum handle if different (check before posting — don't mis-tag).
- OSArch Discourse supports markdown + emoji natively; the above should paste cleanly.
- Best category: **Showcase** (project announcements) — or **General** if Showcase feels too grand for an intro.
- Reply quickly to the first few comments; engagement in the first 24h drives visibility.
- Don't drop more links in replies than necessary — the community dislikes anything that reads like a marketing funnel.
