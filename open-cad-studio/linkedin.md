# LinkedIn Post — Open CAD Studio

Vandaag delen we **Open CAD Studio**: een moderne, open-source 2D + 3D CAD-applicatie die native DWG en DXF leest en schrijft — gebouwd in Rust, met GPU-versnelde rendering.

Geen Autodesk-licentie. Geen Bricsys-licentie. Geen converters. Geen workarounds. Gewoon openen, tekenen, opslaan.

**Wat erin zit:**

- **Native DWG & DXF (R13–R2018)** read/write — het de-facto industriestandaard formaat, zonder library-licenties van derden
- **Volledig 2D drafting** — LINE, PLINE, CIRCLE, ARC, ELLIPSE, SPLINE, HATCH, OFFSET, TRIM, EXTEND, FILLET, MIRROR, ARRAY, ROTATE, SCALE, EXPLODE… de hele AutoCAD-commandoset
- **3D modelling met ACIS solids tessellation** — BOX, SPHERE, CYLINDER, EXTRUDE, REVOLVE, LOFT, SWEEP, ARRAY3D — en 3DSOLID/REGION/BODY entities uit DWG worden correct gerenderd
- **Paper space + layouts** — multi-tab model space, viewport projection met inline MSPACE-overlay, VPORTS presets, plot styles (CTB/STB), PRINT direct naar systeem-printer
- **Full dimensioning** — linear, aligned, angular, radial, diameter, ordinate + DIMSTYLE met alles erop en eraan (DIMASZ, DIMSCALE, DIMEXO, DIMEXE…)
- **MLEADER, MTEXT, tables, GD&T tolerances, MLINE** — met style managers per type
- **STL, STEP AP203, OBJ import/export, PDF plot, WBLOCK, XREF** — alles wat je nodig hebt om in een bestaande CAD-keten te passen
- **GPU-versneld via wgpu** — schalend tot grote modellen met veel solids

Onder de motorkap: **Rust** voor geheugen-veiligheid en performance, **iced** voor de UI, **wgpu** voor de GPU-rendering. Cross-platform: Windows, macOS, Linux. **GPL-3.0** licentie.

Belangrijk om te zeggen: dit is **niet** een tool van de OpenAEC Foundation zelf. Open CAD Studio is een onafhankelijk community-project van **Hakan Seven** — en wij zien het als een natuurlijke aanvulling op het open AEC-ecosysteem. Onze missie is open source software voor de hele AEC-keten promoten, en projecten als deze verdienen alle aandacht.

Hat tip aan @Hakan Seven voor het volharden in dit project — 484 commits, 30 releases, v0.4.0 net uit. Dit is precies het soort werk dat we meer nodig hebben in de bouwsector.

→ Productpagina: open-aec.com/open-cad-studio/
→ Repo: github.com/HakanSeven12/OpenCADStudio
→ Releases: github.com/HakanSeven12/OpenCADStudio/releases

---

## 🔖 Tagging-suggesties

> Plak deze in de LinkedIn-editor en typ `@` om elke organisatie / persoon te selecteren — LinkedIn vervangt de tekst dan door een echte @mention.

### Auteur (must-tag)
- **@Hakan Seven** — de bouwer. github.com/HakanSeven12. Op LinkedIn waarschijnlijk te vinden via Turkije-AEC/Rust netwerk. Stuur connectieverzoek vooraf als nodig.

### Open-source / Rust community
- @Rust Foundation
- @Tauri (geen Tauri hier, maar wgpu-publiek overlapt)
- @iced — het GUI-framework dat OpenCADStudio gebruikt
- @wgpu — de GPU-laag
- @FOSS (algemeen)
- @State of Open Con

### CAD / AEC sector NL
- @BIM Loket
- @buildingSMART Nederland
- @NLdigital
- @CROW
- @Bouwend Nederland
- @KIVI — sectie Bouw & Infra

### Bedrijven die DWG gebruiken (de doelgroep)
- @Royal HaskoningDHV
- @Witteveen+Bos
- @Arcadis
- @Sweco Nederland
- @Antea Group
- @TAUW
- @Movares
- @Iv-Groep
- @ABT
- @Pieters Bouwtechniek
- @Aronsohn raadgevende ingenieurs
- @Adviesbureau Lüning

### Architecten / tekenaars (DWG-zwaar publiek)
- @BNA — Branchevereniging Nederlandse Architectenbureaus
- @MVRDV
- @UNStudio
- @OMA
- @Mecanoo architecten
- @Inbo
- @cepezed
- @KAAN Architecten

### Onderwijs (TU's en HBO's, scriptie-publiek)
- @TU Delft — Architecture and the Built Environment
- @TU Delft — Civil Engineering & Geosciences
- @TU Eindhoven — Built Environment
- @TU Twente — Engineering Technology
- @Hanzehogeschool Groningen — Built Environment
- @Hogeschool van Amsterdam — Built Environment
- @Avans Hogeschool — Built Environment

### Concurrent-bewuste organisaties (open alternatieven zijn nieuws voor hen)
- @Autodesk Nederland — niet direct tagen, wel relevant
- @Bricsys
- @LibreCAD project
- @QCAD
- @FreeCAD project — Hakan Seven heeft historisch ook FreeCAD work gedaan; community-overlap

### Hashtags
`#OpenSource #CAD #DWG #DXF #Rust #wgpu #AEC #BIM #Architectuur #Construction #ConstructieTechniek #BouwICT #OpenAEC #CommunityProject #FOSS`

---

## ✍️ Korte variant (300 tekens — voor X/Bluesky/Mastodon)

> Native DWG/DXF read/write in een open-source CAD-app, gebouwd in Rust met GPU rendering. Geen Autodesk. Geen Bricsys. Geen abonnement. v0.4.0 net uit.
>
> @Hakan Seven — chapeau 🎩
>
> github.com/HakanSeven12/OpenCADStudio
> #OpenSource #CAD #Rust #AEC

---

## 📋 Praktische tips

- **Tag Hakan Seven** — zonder die tag is dit halfwerk. Zoek hem op LinkedIn (github.com/HakanSeven12 → hopelijk staat z'n LinkedIn in profiel). Geen LinkedIn? Stuur dan minstens DM op GitHub met link naar je post.
- **Vraag toestemming voor de tag/post** — uit professionele beleefdheid een korte note: "Mind if I post about your project on LinkedIn? Will tag you."
- **Eerste 80 tekens** moeten je publiek raken — "Vandaag delen we Open CAD Studio: native DWG/DXF in Rust" — de DWG/DXF is de hook.
- **Plaats de link in de eerste comment** in plaats van in de post zelf — LinkedIn-algoritme straft externe links in posts af.
- **Tijd**: dinsdag of woensdag, 08:30–10:00 NL-tijd voor de NL AEC-doelgroep.
- **Beeld**: gebruik `/shared/assets/screenshots/open-cad-studio.jpeg` (de wegontwerp-DWG screenshot) — 1200×675 crop voor optimale LinkedIn-weergave.
