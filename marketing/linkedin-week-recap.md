# LinkedIn — recap afgelopen weken (≈ 13 mei – 3 juni 2026)

> Plak-klaar. Alle highlights gebaseerd op de échte commits.
> Focus op vier tools: Open Calc Studio, Open CAD Studio, Open PDF Studio, Open Heatloss Studio.

---

🚀 De afgelopen weken bij de OpenAEC Foundation (i.o.) — **ruim 800 verbeteringen** door ons hele ecosysteem. Een greep uit de highlights:

🧮 **Open Calc Studio — v0.7.4**
➡️ **IBIS-TRAD import** — neem bestaande begrotingen rechtstreeks over
➡️ Uren naar rato verdelen over posten
➡️ Volledige API om calculaties te koppelen aan je eigen tooling

✏️ **Open CAD Studio** (community-project van Hakan Seven)
➡️ Nieuwe 3D-solid-modelleer-tab: primitives + boolean-operaties
➡️ Native GPU paper-space viewports
➡️ In-place tekst- & MTEXT-bewerking met live caret
➡️ 3D-solids selecteren door op de body te klikken

📄 **Open PDF Studio** — nieuwe render-engine onder de motorkap
➡️ Multi-process render-engine (pdfium-workers, gedeeld geheugen) — sneller en crash-bestendig
➡️ Continue scroll-weergave, ook bij documenten met gemengde paginaformaten
➡️ Cursor-verankerde Ctrl+scroll zoom + spring-naar-pagina

🔥 **Open Heatloss Studio** — volledige ISSO 53-implementatie
➡️ Per-ruimte "onverwarmd"-toggle + instelbare f_k
➡️ Ventilatie volgens BBL/bezetting-minimums, per-ruimte toevoer-q_v
➡️ ISSO 51 & 53 norm-conformiteit (twee audit-rondes)
➡️ Norm + instellingen opgeslagen in het bestandsformaat

📧 **Y-app — v0.21 → v0.23 (drie releases)**
➡️ Mail-performance overhaul: directe mail-open (250 ms vertraging eruit), body-preload, real-time push (IMAP IDLE + WebSocket)
➡️ Webmail: inline project aanmaken, gedeelde mailboxen in vault-modus
➡️ Facturatie: ERPNext-integratie, vaste-prijs-items per project, handtekening per account

…en daarnaast tientallen kleinere verbeteringen door het hele ecosysteem.

Alles open source. Alles gratis. Voor altijd.
👉 open-aec.com

#OpenSource #BIM #AEC #Bouw #Calculatie #ISSO #Rust #FOSS #OpenAEC

---

## English version

🚀 The past few weeks at the OpenAEC Foundation (in formation) — **over 800 improvements** across our whole ecosystem. A pick of the highlights:

🧮 **Open Calc Studio — v0.7.4**
➡️ **IBIS-TRAD import** — bring existing cost estimates straight in
➡️ Pro-rata hour allocation across line items
➡️ A full API to connect estimates to your own tooling

✏️ **Open CAD Studio** (community project by Hakan Seven)
➡️ New 3D solid-modelling tab: primitives + boolean ops
➡️ Native GPU paper-space viewports
➡️ In-place text & MTEXT editing with a live caret
➡️ Pick 3D solids by clicking their body

📄 **Open PDF Studio** — a brand-new rendering engine under the hood
➡️ Multi-process render engine (pdfium workers, shared memory) — faster and crash-resilient
➡️ Continuous scroll view, even for mixed-page-size documents
➡️ Cursor-anchored Ctrl+wheel zoom + jump-to-page

🔥 **Open Heatloss Studio** — full ISSO 53 implementation
➡️ Per-room "unheated" toggle + adjustable f_k
➡️ Ventilation per Dutch building-decree occupancy minimums, per-room supply q_v
➡️ ISSO 51 & 53 conformance (two audit rounds), persisted in the file format

📧 **Y-app — v0.21 → v0.23 (three releases)**
➡️ Mail performance overhaul: instant mail open, body preload, real-time push (IMAP IDLE + WebSocket)
➡️ Webmail: inline project creation, shared mailboxes in vault mode
➡️ Invoicing: ERPNext integration, fixed-price items per project, per-account signatures

…plus dozens of smaller improvements right across the ecosystem.

All open source. All free. Forever.
👉 open-aec.com

#OpenSource #BIM #AEC #Construction #CostEstimation #ISSO #Rust #FOSS #OpenAEC

---

## Notes before posting

- **The number is solid.** 794 public commits across the OpenAEC org in the past
  3 weeks (GitHub search API), + 260 on HakanSeven12/OpenCADStudio = ~1,050
  public commits. "Over 800 across the whole ecosystem" verifies on GitHub.
- **Deliberately left out:** Open Geotechniek Studio (the pile bearing-capacity
  calculation — not for publication yet).
- **Verified per-tool (3 weeks):** Open CAD Studio 260 commits, Open PDF Studio
  124, Y-app 91 (v0.21→v0.23), Open Heatloss Studio ~70+, Open Calc Studio
  v0.7.4 (IBIS-TRAD import, pro-rata hours, full API).
- Every bullet maps to a real commit/release — nothing invented. (The "import"
  you remembered was IBIS-TRAD in Open Calc Studio, not Open CAD Studio.)
