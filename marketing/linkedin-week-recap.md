# LinkedIn — recap afgelopen weken (≈ 13 mei – 3 juni 2026)

> Plak-klaar. Alle highlights gebaseerd op de échte commits.
> Het getal klopt nu: 794 publieke org-commits in 3 weken (+260 Open CAD Studio).

---

🚀 De afgelopen weken bij de OpenAEC Foundation (i.o.) — **ruim 800 verbeteringen** door ons hele ecosysteem. Een greep uit wat er landde:

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

📄 **Open PDF Studio** — nieuwe render-engine onder de motorkap
➡️ Multi-process render-engine (pdfium-workers, gedeeld geheugen) — sneller en crash-bestendig
➡️ Continue scroll-weergave, ook bij documenten met gemengde paginaformaten
➡️ Cursor-verankerde Ctrl+scroll zoom + spring-naar-pagina

📧 **Y-app — v0.21 → v0.23 (drie releases)**
➡️ Mail-performance overhaul: directe mail-open (250 ms vertraging eruit), body-preload, real-time push (IMAP IDLE + WebSocket)
➡️ Webmail: inline project aanmaken, gedeelde mailboxen in vault-modus
➡️ Facturatie: ERPNext-integratie, vaste-prijs-items per project, handtekening per account

✏️ **Open CAD Studio** (community-project van Hakan Seven)
➡️ Nieuwe 3D-solid-modelleer-tab: primitives + boolean-operaties
➡️ Native GPU paper-space viewports
➡️ In-place tekst- & MTEXT-bewerking met live caret

…en daarnaast tientallen kleinere verbeteringen in Open Calc Studio, Open Calculations Studio en de rest van het ecosysteem.

Alles open source. Alles gratis. Voor altijd.
👉 open-aec.com

#OpenSource #BIM #AEC #Bouw #Geotechniek #ISSO #Rust #FOSS #OpenAEC

---

## English version

🚀 The past few weeks at the OpenAEC Foundation (in formation) — **over 800 improvements** across our whole ecosystem. A taste of what landed:

🏗️ **Open Geotechniek Studio — v0.3.0** — brand-new foundation design
➡️ Prefab concrete piles — bearing capacity Rc;d, ξ-factors, unity check
➡️ Settlement calculation (SLS/ULS) with spring stiffness
➡️ Interactive CPT chart: drag pile levels, 4D/8D zones, zoom & pan
➡️ Save to open **.ifcgeo** (IFCX schema 0.4), validated vs a 3BM CGEO1 reference

🔥 **Open Heatloss Studio** — full ISSO 53 implementation
➡️ Per-room "unheated" toggle + adjustable f_k
➡️ Ventilation per Dutch building-decree occupancy minimums, per-room supply q_v
➡️ ISSO 51 & 53 conformance (two audit rounds), persisted in the file format

📄 **Open PDF Studio** — a brand-new rendering engine under the hood
➡️ Multi-process render engine (pdfium workers, shared memory) — faster and crash-resilient
➡️ Continuous scroll view, even for mixed-page-size documents
➡️ Cursor-anchored Ctrl+wheel zoom + jump-to-page

📧 **Y-app — v0.21 → v0.23 (three releases)**
➡️ Mail performance overhaul: instant mail open, body preload, real-time push (IMAP IDLE + WebSocket)
➡️ Webmail: inline project creation, shared mailboxes in vault mode
➡️ Invoicing: ERPNext integration, fixed-price items per project, per-account signatures

✏️ **Open CAD Studio** (community project by Hakan Seven)
➡️ New 3D solid-modelling tab: primitives + boolean ops
➡️ Native GPU paper-space viewports
➡️ In-place text & MTEXT editing with a live caret

…plus dozens of smaller improvements across Open Calc Studio, Open Calculations Studio and the rest of the ecosystem.

All open source. All free. Forever.
👉 open-aec.com

#OpenSource #BIM #AEC #Construction #Geotechnics #Rust #FOSS #OpenAEC

---

## Notes before posting

- **The number is now solid.** 794 public commits across the OpenAEC org in the
  past 3 weeks (GitHub search API), + 260 on HakanSeven12/OpenCADStudio = ~1,050
  public commits. "Over 800 improvements in the past few weeks" is fully
  defensible — anyone can verify it on GitHub. (If you want strictly *this week*,
  it's ~265; that's why the framing is "the past few weeks".)
- **Verified per-tool commit counts (3 weeks):** Open PDF Studio 124, Open CAD
  Studio 260, Y-app 91, Open Heatloss Studio ~70+, Open Geotechniek Studio ~37+.
- **No invented features.** Every bullet maps to a real commit. The "import"
  feature you mentioned for Open CAD Studio still wasn't in the commit log, so
  it's left out.
- Open PDF Studio + Y-app did their heavy lifting 1–3 weeks ago (not the last 7
  days), which is exactly why the recap spans three weeks rather than one.
