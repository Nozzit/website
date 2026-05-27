# LinkedIn Post — Open CAD Studio

> 🇬🇧 English version below (scroll down to **"## 🇬🇧 English version"**).

## 🇳🇱 Nederlandse versie

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

Hat tip aan @Hakan Seven voor het volharden in dit project — 514 commits, 31 releases, v0.4.1 net uit. Dit is precies het soort werk dat we meer nodig hebben in de bouwsector.

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

> Native DWG/DXF read/write in een open-source CAD-app, gebouwd in Rust met GPU rendering. Geen Autodesk. Geen Bricsys. Geen abonnement. v0.4.1 net uit.
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

---

## 🇬🇧 English version

Today we're sharing **Open CAD Studio**: a modern, open-source 2D + 3D CAD application that reads and writes DWG and DXF natively — built in Rust, with GPU-accelerated rendering.

No Autodesk license. No Bricsys license. No converters. No workarounds. Just open, draw, save.

**What's in it:**

- **Native DWG & DXF (R13–R2018)** read/write — the de-facto industry-standard format, without third-party library licenses
- **Full 2D drafting** — LINE, PLINE, CIRCLE, ARC, ELLIPSE, SPLINE, HATCH, OFFSET, TRIM, EXTEND, FILLET, MIRROR, ARRAY, ROTATE, SCALE, EXPLODE… the entire AutoCAD-style command set
- **3D modelling with ACIS solids tessellation** — BOX, SPHERE, CYLINDER, EXTRUDE, REVOLVE, LOFT, SWEEP, ARRAY3D — and 3DSOLID/REGION/BODY entities from DWG render correctly
- **Paper space + layouts** — multi-tab model space, viewport projection with inline MSPACE overlay, VPORTS presets, plot styles (CTB/STB), PRINT directly to system printer
- **Full dimensioning** — linear, aligned, angular, radial, diameter, ordinate + DIMSTYLE with everything (DIMASZ, DIMSCALE, DIMEXO, DIMEXE…)
- **MLEADER, MTEXT, tables, GD&T tolerances, MLINE** — with dedicated style managers
- **STL, STEP AP203, OBJ import/export, PDF plot, WBLOCK, XREF** — everything you need to fit into an existing CAD chain
- **GPU-accelerated via wgpu** — scales smoothly to large models with many solids

Under the hood: **Rust** for memory safety and performance, **iced** for the UI, **wgpu** for the GPU rendering. Cross-platform: Windows, macOS, Linux. **GPL-3.0** license.

Important to mention: this is **not** a tool built by the OpenAEC Foundation itself. Open CAD Studio is an independent community project by **Hakan Seven** — and we see it as a natural addition to the open AEC ecosystem. Our mission is to promote open source software for the entire AEC chain, and projects like this deserve all the attention they can get.

Hat tip to @Hakan Seven for sticking with this — 514 commits, 31 releases, v0.4.1 just out. This is exactly the kind of work the construction sector needs more of.

→ Product page: https://www.open-aec.com/open-cad-studio/
→ Repo: github.com/HakanSeven12/OpenCADStudio
→ Releases: github.com/HakanSeven12/OpenCADStudio/releases

---

### 🔖 Tagging suggestions (English audience)

> Paste this into the LinkedIn editor and type `@` to pick each organization / person — LinkedIn will replace the text with a real @mention.

**Author (must-tag)**
- **@Hakan Seven** — the builder. github.com/HakanSeven12. Send a connection request first if needed.

**Open-source / Rust community**
- @Rust Foundation
- @iced — the GUI framework
- @wgpu — the GPU layer
- @FreeCAD project — Hakan has historical FreeCAD work; community overlap
- @LibreCAD project
- @QCAD
- @State of Open Con
- @FOSDEM

**Global AEC / BIM community**
- @buildingSMART International
- @AEC Magazine (UK)
- @BIM+
- @ENR — Engineering News-Record
- @Construction Dive
- @CAD Software Solutions
- @Civil Engineer Magazine

**Architecture firms (DWG-heavy audience)**
- @Foster + Partners
- @Zaha Hadid Architects
- @SOM — Skidmore, Owings & Merrill
- @Gensler
- @HOK
- @Perkins&Will
- @BIG — Bjarke Ingels Group

**Engineering firms (international)**
- @Arup
- @AECOM
- @Jacobs
- @WSP
- @Mott MacDonald
- @Buro Happold
- @Ramboll
- @Stantec

**Hashtags**
`#OpenSource #CAD #DWG #DXF #Rust #wgpu #AEC #BIM #Architecture #Construction #CivilEngineering #FOSS #OpenAEC #CommunityProject`

---

### ✍️ Short variant (300 chars — X / Bluesky / Mastodon)

> Native DWG/DXF read/write in an open-source CAD app, built in Rust with GPU rendering. No Autodesk. No Bricsys. No subscription. v0.4.1 just out.
>
> @Hakan Seven — chapeau 🎩
>
> open-aec.com/open-cad-studio/
> #OpenSource #CAD #Rust #AEC

---

### 📋 Practical tips

- **Tag Hakan Seven** — without that tag this is half a post. Find him on LinkedIn (github.com/HakanSeven12 → hopefully has LinkedIn in profile). No LinkedIn? At minimum DM him on GitHub with a link to your post.
- **Ask permission to tag/post** — out of professional courtesy a quick note: "Mind if I post about your project on LinkedIn? Will tag you."
- **First 80 chars** must hook your audience — "Today we're sharing Open CAD Studio: native DWG/DXF in Rust" — the DWG/DXF is the hook.
- **Put the link in the first comment** rather than in the post itself — LinkedIn's algorithm penalises external links in posts.
- **Time**: Tuesday or Wednesday, 08:30–10:00 CET for European AEC audience; or 09:00–11:00 EST for US/UK audience.
- **Image**: use `/shared/assets/screenshots/open-cad-studio.jpeg` (the road-design DWG) or `/shared/assets/screenshots/open-cad-studio-2.png` (the foundation drawing) — 1200×675 crop for optimal LinkedIn display.
