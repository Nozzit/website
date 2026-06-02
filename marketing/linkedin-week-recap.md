# LinkedIn — wekelijkse recap (week van 27 mei – 3 juni 2026)

> Plak-klaar. Highlights gebaseerd op de échte commits van deze week.
> Let op het getal — zie de noot onderaan.

---

🚀 Weer een knotsgekke week bij de OpenAEC Foundation (i.o.)

Ruim **800 verbeteringen** door ons hele ecosysteem deze week — publiek én privé. Een greep uit wat er landde:

🏗️ **Open Geotechniek Studio — v0.3.0**
Gloednieuwe funderingsberekening:
➡️ Prefab betonpalen — draagkracht Rc;d, ξ-factoren, unity check
➡️ Zettingsberekening (SLS/ULS) met veerstijfheid
➡️ Interactieve CPT-grafiek: paalniveaus slepen, 4D/8D-zones, zoom & pan
➡️ Opslaan in open **.ifcgeo** (IFCX schema 0.4)
➡️ Getoetst tegen een 3BM CGEO1-referentieberekening

🔥 **Open Heatloss Studio** — volledige ISSO 53-implementatie
➡️ Per-ruimte "onverwarmd"-toggle + instelbare f_k
➡️ Ventilatie volgens BBL/bezetting-minimums, per-ruimte toevoer-q_v
➡️ ISSO 51 & 53 norm-conformiteit (twee audit-rondes)
➡️ Norm + instellingen opgeslagen in het bestandsformaat

✏️ **Open CAD Studio** (community-project van Hakan Seven)
➡️ Nieuwe 3D-solid-modelleer-tab: primitives + boolean-operaties
➡️ Native GPU paper-space viewports
➡️ In-place tekst- & MTEXT-bewerking met live caret
➡️ 3D-solids selecteren door op de body te klikken

…en verder gestage verbeteringen in Open PDF Studio, Open Calc Studio, Open Calculations Studio en de Y-app.

Alles open source. Alles gratis. Voor altijd.
👉 open-aec.com

#OpenSource #BIM #AEC #Bouw #Geotechniek #ISSO #Rust #FOSS #OpenAEC

---

## Engelse versie

🚀 Another wild week at the OpenAEC Foundation (in formation)

Over **800 improvements** across our whole ecosystem this week — public and private. A taste of what landed:

🏗️ **Open Geotechniek Studio — v0.3.0**
Brand-new foundation design:
➡️ Prefab concrete piles — bearing capacity Rc;d, ξ-factors, unity check
➡️ Settlement calculation (SLS/ULS) with spring stiffness
➡️ Interactive CPT chart: drag pile levels, 4D/8D zones, zoom & pan
➡️ Save to open **.ifcgeo** (IFCX schema 0.4)
➡️ Validated against a 3BM CGEO1 reference calculation

🔥 **Open Heatloss Studio** — full ISSO 53 implementation
➡️ Per-room "unheated" toggle + adjustable f_k
➡️ Ventilation per Dutch building-decree occupancy minimums, per-room supply q_v
➡️ ISSO 51 & 53 conformance (two audit rounds)
➡️ Standard + settings persisted in the file format

✏️ **Open CAD Studio** (community project by Hakan Seven)
➡️ New 3D solid-modelling tab: primitives + boolean ops
➡️ Native GPU paper-space viewports
➡️ In-place text & MTEXT editing with a live caret
➡️ Pick 3D solids by clicking their body

…plus steady improvements across Open PDF Studio, Open Calc Studio, Open Calculations Studio and the Y-app.

All open source. All free. Forever.
👉 open-aec.com

#OpenSource #BIM #AEC #Construction #Geotechnics #Rust #FOSS #OpenAEC

---

## Notes before posting

- **The number.** Publicly verifiable commits this week ≈ 265 (166 across the
  org's public repos + 99 on HakanSeven12/OpenCADStudio), all on default
  branches. "Over 800" only holds if you also count the 49 private repos,
  feature/nightly branches and the website repo. Anyone on LinkedIn can check
  your public GitHub, so either (a) keep "over 800 (public + private)" as
  written, (b) swap in the exact figure from your own dashboard, or (c) drop to
  a safe "250+ improvements across our public repos."
- **Open CAD Studio "import".** You mentioned an import feature, but this week's
  CAD commits were 3D solids + paper space + text editing — no import work that
  I could find. Left it out rather than invent it. Add it back if it shipped on
  a branch I didn't see.
- **PDF Studio / Y-app / Open Calculations Studio.** No public main-branch
  commits this week, so they're grouped under a generic "steady improvements"
  line rather than given fake specifics. Add concrete items if you have them.
- Per-tool commit counts you can quote safely: Open CAD Studio ~99, Open
  Heatloss Studio ~70, Open Geotechniek Studio ~37.
