# Open AEC Foundation - Presentatie Computational Design Dag Delft

## Slide 1: Titel
**Open AEC Foundation**
Open source software voor de volledige bouwketen
Computational Design Dag - Delft, 2026

---

## Slide 2: Het probleem in de AEC-sector

- Hoge licentiekosten voor software (Autodesk, Tekla, SCIA, etc.)
- Vendor lock-in: data opgesloten in proprietary formaten
- Beperkte mogelijkheden voor automatisering en AI-integratie
- Fragmentatie: elk pakket is een eiland
- Innovatie wordt bepaald door software-vendors, niet door gebruikers

---

## Slide 3: De Open AEC Foundation

**Missie:** Het ontwikkelen, ondersteunen en promoten van open source software voor de volledige bouwketen.

- Stichting in oprichting (opgericht 1 maart 2026)
- Gevestigd in Dordrecht
- Geinitieerd door Maarten Vroegindeweij
- Geinspireerd door de Blender Foundation

**Vier pijlers:**
1. **Ontwikkeling** - Coordineren en financieren van open source softwareontwikkeling
2. **Ondersteuning** - Beheer van licenties, API-koppelingen en integraties
3. **Educatie** - Stage- en opleidingsmogelijkheden voor studenten wereldwijd
4. **Advocacy** - Promoten van open source en open standaarden

---

## Slide 4: Waarom open source in de bouw?

1. **Kostenbesparing** - Geen licentiekosten, lagere advieskosten
2. **Geen vendor lock-in** - Open dataformaten garanderen blijvende leesbaarheid
3. **AI-ready** - Open source integreert beter met AI en automatisering
4. **Toekomstbestendig** - Community kan software onafhankelijk onderhouden
5. **Gebruikersgestuurd** - Ontwikkeling bepaald door gebruikers, niet door sales
6. **Educatie** - Studenten kunnen leren van en bijdragen aan echte software

---

## Slide 5: Het ecosysteem - Open source stack

De foundation bouwt op een volledig open source ecosysteem:

### Ontwerp & Modellering
- **Blender + Bonsai** - 3D modellering en BIM (vervanging van Revit/ArchiCAD)
- **FreeCAD** - Parametrisch 3D ontwerp
- **Open 2D Studio** - 2D tekenen en documentbeheer

### Samenwerking & Data
- **Nextcloud** - Bestands- en projectbeheer (vervanging van SharePoint/BIM360)
- **IfcGit** - Versiebeheer voor IFC-modellen via Git
- **Speckle** - Open platform voor data-uitwisseling

### Bedrijfsvoering
- **ERPNext** - Enterprise Resource Planning (vervanging van Exact/AFAS)
- Open facturatie, projectadministratie, HRM

### AI & Automatisering
- **Claude / LLM's** - AI-assistenten geintegreerd in de tools
- **MCP Servers** - Model Context Protocol voor tool-integratie

---

## Slide 6: OpenCompany246 & Impertio

### OpenCompany246
- Concept voor een volledig open source bedrijfsvoering
- Alle 246 bedrijfsprocessen afgedekt met open source tools
- Van offertes tot facturen, van tekeningen tot opleveringen
- ERPNext als ruggengraat, aangevuld met eigen tools

### Impertio
- Implementatiepartner en kenniscentrum
- Van kale PC tot AI-werkstation - deployment scripts en configuratie
- Uitrollen van het open source ecosysteem bij klanten en partners
- Training en begeleiding bij de transitie naar open source

### De verbinding
OpenCompany246 definieert WAT er nodig is, Impertio zorgt voor HOE het wordt uitgerold, en de Open AEC Foundation ontwikkelt de SOFTWARE.

---

## Slide 7: ERPNext - Open source ERP voor de bouw

ERPNext als alternatief voor Exact, AFAS, Twinfield:

- **Projectadministratie** - Projecten, taken, timesheets
- **Financieel** - Facturatie, boekhouding, bankintegratie
- **HRM** - Nederlandse salarisadministratie, verlof, CAO's
- **CRM** - Klantbeheer en offertes

**Eigen ontwikkelingen:**
- ERPNext Dashboard App (Electron desktop app)
- ERPNext Level Dashboard (alternatieve web-GUI)
- Nextcloud-integratie
- Claude AI Skills voor ERPNext development
- Nederlandse salarisadministratie module

---

## Slide 8: Blender & Bonsai - Open BIM

Blender als platform voor de bouw:

- **Bonsai (voorheen BlenderBIM)** - Volledige IFC-authoring in Blender
- **building.py** - Python library: code-based gebouwen genereren
- **Sverchok** - Visueel programmeren (vergelijkbaar met Grasshopper)
- **GIS-to-Blender** - Automatisch 3D-omgevingen genereren uit GIS-data

**Claude Skill Packages** voor AI-ondersteund ontwerp in Blender/Bonsai

---

## Slide 9: Nextcloud - Open samenwerking

Nextcloud als vervanging van SharePoint / Google Workspace / BIM360:

- **Bestandsbeheer** met versiebeheer
- **IfcGit for Nextcloud** - IFC-modellen versiebeheren als Git-repos
- **Check-in/Check-out** - Vault-achtige functionaliteit voor engineers
- **Claude Bot** - AI-assistent in Nextcloud Talk
- **ERPNext-integratie** - Documenten koppelen aan projecten en facturen

---

## Slide 10: De tools - Overzicht in cijfers

**76 repositories** op GitHub (33 public, 43 private)

### Mature tools (met releases, actief gebruikt)
| Tool | Commits | Releases | Laatste versie |
|------|---------|----------|---------------|
| open-pdf-studio | 90 | 24 | v1.23.0 |
| open-2d-studio | 66 | 22 | v0.32.0 |
| monty-ifc-viewer | 11 | 2 | v1.0.1 |
| open-pointcloud-studio | 12 | 2 | v0.3.0 |
| open-energy-studio | 11 | 1 | v2026.2.0 |
| open-planner-studio | 10 | 1 | v2026.2.0 |

### Mature libraries
| Library | Commits | Status |
|---------|---------|--------|
| building-py | 764 | v0.1-beta, meest volwassen project |
| project-ocondat | 152 | Open bouwdata via WikiData |
| open-books | 109 | Digitale boekencollectie |

### Actief in ontwikkeling (nog geen releases)
| Tool | Commits | Beschrijving |
|------|---------|-------------|
| openaec-reports | 131 | Rapportage |
| dynlex | 98 | C++ tool |
| Open-Agents | 84 | Multi-agent orchestrator |
| warmteverliesberekening | 21 | ISSO 51:2023 rekenbibliotheek |

---

## Slide 11: De tools - Categorieen

### Viewers & Visualisatie
- **Open 2D Studio** - 2D document viewer (22 releases)
- **Open PDF Studio** - PDF workflows (24 releases)
- **Monty IFC Viewer** - Lightweight IFC viewer
- **Open Pointcloud Studio** - Puntenwolken
- **Open 3D Viewer** - 3D formaten viewer
- **CPT Viewer** - Geotechnische sonderingen

### Berekeningen & Engineering
- **Open Energy Studio** - Energieprestatie (NTA 8800)
- **Open FEM2D Studio** - 2D eindige elementen
- **Warmteverliesberekening** - ISSO 51:2023
- **Open U-value Studio** - U-waarde berekening
- **Ifc-Calc** - Grafische calculator
- **Open Structural Engineer Studio** - Constructief ontwerp
- **Open MPG Studio** - Milieuprestatie gebouwen
- **Dynlex** - C++ rekentool

### Documenten & Rapportage
- **Open Books** - Historische bouwboeken
- **OpenAEC Reports** - Rapportage tools

### Planning & Kostenraming
- **Open Planner Studio** - Projectplanning (Gantt)
- **Cutlist Optimizer** - Zaagplan optimalisatie

### BIM & Libraries
- **building.py** - Python gebouwen library
- **Ifc-Factory** - IFC library
- **WFC5** - IFC5 uitbreiding experiment

---

## Slide 12: Technologie & Architectuur

### Frontend
- **React 18 + TypeScript** - Moderne web UI's
- **Tauri 2** - Native desktop apps met Rust backend
- **Three.js + web-ifc** - 3D rendering in de browser

### Backend & Libraries
- **Rust** - High-performance rekenkernen (warmteverlies, Tauri)
- **Python** - Libraries, scripts, integraties
- **C++** - Rekenkernen (dynlex)

### AI & Integratie
- **Claude Code + Open Agents** - AI-gedreven development
- **MCP Servers** - Tool-integratie voor AI
- **Claude Skill Packages** - Herbruikbare AI-vaardigheden

### Standaarden
- IFC 4.3, Speckle, DXF, GeoJSON, WMS/WMTS
- NEN, Eurocode, NTA 8800, ISSO 51, BBL

---

## Slide 13: Open 2D Studio
**2D document viewer en tekenomgeving**
Open source alternatief voor 2D tekenprogramma's. Bekijk, annoteer en bewerk 2D-tekeningen in de browser. Ondersteunt extensies via het Open-2D-Studio-Extensions systeem.
- 66 commits | 22 releases | Laatste: v0.32.0
- Taal: TypeScript | Public

![Screenshot](open-2d-studio/screenshot.png)

---

## Slide 14: Open 2D Studio AEC Extension
**AEC extensie voor Open 2D Studio**
Specifieke AEC-functionaliteit als extensie bovenop Open 2D Studio. Bouwkundige symbolen, lagen en annotaties.
- 7 commits | 1 release | Laatste: v0.1.0
- Taal: TypeScript | Public

![Screenshot](open-2D-studio-AEC-extension/screenshot.png)

---

## Slide 15: Open PDF Studio
**PDF-gebaseerde documentworkflows**
Bekijk, combineer en bewerk PDF-bestanden. Gebouwd voor de bouwsector waar PDF het primaire uitwisselingsformaat is voor tekeningen en rapporten.
- 90 commits | 24 releases | Laatste: v1.23.0
- Taal: JavaScript | Public

![Screenshot](open-pdf-studio/screenshot.png)

---

## Slide 16: Monty IFC Viewer
**Lightweight IFC model viewer**
Web-based IFC viewer gebouwd met Three.js en web-ifc. Snel en lichtgewicht bekijken van BIM-modellen zonder zware software.
- 11 commits | 2 releases | Laatste: v1.0.1
- Taal: TypeScript | Public

![Screenshot](monty-ifc-viewer/screenshot.png)

---

## Slide 17: Open Pointcloud Studio
**Puntenwolken bewerken en visualiseren**
Tool voor het bekijken en bewerken van pointclouds, essentieel bij renovatieprojecten en as-built opnames met laserscanning.
- 12 commits | 2 releases | Laatste: v0.3.0
- Taal: TypeScript | Public

![Screenshot](open-pointcloud-studio/screenshot.png)

---

## Slide 18: Open 3D Viewer
**3D viewer voor open formaten**
Universele 3D viewer voor alle niet-beveiligde 3D-formaten. Bekijk modellen direct in de browser zonder specifieke software.
- 7 commits | 1 release | Laatste: v0.1.0-alpha
- Taal: TypeScript | Private

![Screenshot](open-3d-viewer/screenshot.png)

---

## Slide 19: Open Energy Studio
**Energieprestatie berekeningen (NTA 8800)**
Tool voor het berekenen van de energieprestatie van gebouwen volgens de Nederlandse NTA 8800 norm. Desktop app gebouwd met Tauri 2 en React.
- 11 commits | 1 release | Laatste: v2026.2.0
- Taal: TypeScript/Rust | Private

![Screenshot](open-energy-studio/screenshot.png)

---

## Slide 20: Open Planner Studio
**Projectplanning met Gantt-charts**
Open source projectplanner voor de bouw. Gantt-chart weergave met Canvas 2D rendering. Desktop app met Tauri 2.
- 10 commits | 1 release | Laatste: v2026.2.0
- Taal: TypeScript/Rust | Private

![Screenshot](open-planner-studio/screenshot.png)

---

## Slide 21: Open FEM2D Studio
**2D Eindige Elementen Analyse**
Constructieve berekeningen met de eindige elementen methode. Voor het analyseren van 2D constructies en het bepalen van krachtsverdelingen.
- 13 commits | Geen releases
- Taal: TypeScript | Public

![Screenshot](open-fem2d-studio/screenshot.png)

---

## Slide 22: Open Structural Engineer Studio
**Constructief ontwerp tool**
Tool voor de constructeur om een gebouw te ontwerpen. Integreert constructieve berekeningen met het ontwerpproces.
- 1 commit | Geen releases | Nieuw project
- Taal: TypeScript | Private

![Screenshot](open-structural-engineer-studio/screenshot.png)

---

## Slide 23: Open MPG Studio
**Milieuprestatie Gebouwen**
Berekening van de milieuprestatie van gebouwen (MPG). Vereist voor vergunningaanvragen in Nederland.
- 2 commits | Geen releases | Nieuw project
- Taal: TypeScript | Private

![Screenshot](open-mpg-studio/screenshot.png)

---

## Slide 24: Open Calc Studio
**Open source rekentool**
Rekentool voor de bouwsector.
- Nieuw project | Geen releases
- Private

![Screenshot](open-calc-studio/screenshot.png)

---

## Slide 25: Warmteverliesberekening
**Rust rekenbibliotheek ISSO 51:2023**
High-performance rekenbibliotheek voor warmteverliesberekeningen volgens de ISSO 51:2023 norm. Geschreven in Rust voor snelheid en betrouwbaarheid.
- 21 commits | Geen releases
- Taal: Rust | Public

![Screenshot](warmteverliesberekening/screenshot.png)

---

## Slide 26: Open U-value Studio
**U-waarde berekening**
Tool voor het berekenen van de U-waarde (warmtedoorgangscoefficient) van wand-, dak- en vloerconstructies.
- Nieuw project | Geen releases
- Private

![Screenshot](Open-U-value-Studio/screenshot.png)

---

## Slide 27: Dynlex
**C++ rekentool**
High-performance rekentool geschreven in C++. Actief in ontwikkeling met veel commits.
- 98 commits | Geen releases
- Taal: C++ | Public

![Screenshot](dynlex/screenshot.png)

---

## Slide 28: Ifc-Calc
**Grafische calculator**
Grafische calculator voor berekeningen gekoppeld aan IFC-modellen. Combineer rekenwerk met BIM-data.
- 3 commits | Geen releases
- Taal: TypeScript | Public

![Screenshot](Ifc-Calc/screenshot.png)

---

## Slide 29: CPT Viewer
**Geotechnische sonderingen viewer**
Viewer voor het bekijken van grondonderzoek data. Ondersteunt GEF-bestanden en BRO-xml formaat van het PDOK.
- 3 commits | Geen releases
- Taal: JavaScript | Public

![Screenshot](cpt-viewer/screenshot.png)

---

## Slide 30: Cutlist Optimizer
**Zaagplan optimalisatie**
Optimaliseer zaagplannen voor 1D en 2D materialen. Minimaliseer verspilling bij het zagen van balken, platen en profielen.
- 7 commits | Geen releases
- Taal: JavaScript | Public

![Screenshot](cutlist-optimizer/screenshot.png)

---

## Slide 31: Bestekstool
**Bestekken schrijven**
Tool voor het opstellen van bestekken voor bouwprojecten.
- Nieuw project | Geen releases
- Private

![Screenshot](bestekstool/screenshot.png)

---

## Slide 32: Aerius Calculator
**Stikstof berekeningen**
Aerius calculator voor stikstofberekeningen bij bouwprojecten.
- Nieuw project | Geen releases
- Private

![Screenshot](aerius-calculator/screenshot.png)

---

## Slide 33: building.py
**Python library voor gebouwmodellering**
Het meest volwassen project van de foundation. Genereer gebouwen in Python en exporteer naar Blender, Revit, IFC, Struct4U, DXF en Speckle.
- 764 commits | 1 release | v0.1-beta
- Taal: Python | Public

![Screenshot](building-py/screenshot.png)

---

## Slide 34: Ifc-Factory
**IFC library**
TypeScript library voor het aanmaken en bewerken van IFC-bestanden. Bouwstenen voor BIM-applicaties.
- Geen releases
- Taal: TypeScript | Public

![Screenshot](Ifc-Factory/screenshot.png)

---

## Slide 35: OpenAEC Reports
**Rapportage tools**
Genereer rapporten en documentatie voor bouwprojecten. Actief in ontwikkeling met veel commits.
- 131 commits | Geen releases
- Taal: Python | Public

![Screenshot](openaec-reports/screenshot.png)

---

## Slide 36: Open Books
**Digitale collectie historische bouwboeken**
Inscannen en digitaal beschikbaar maken van oude bouwkundige boeken. Kennisbehoud voor de bouwsector.
- 109 commits | Geen releases
- Taal: HTML | Public

![Screenshot](open-books/screenshot.png)

---

## Slide 37: WFC5
**IFC5 uitbreiding naar compleet BIM-model**
Experiment om IFC5 te forken en uit te breiden naar een volledig BIM-model met modellen, tekeningen, rapporten, afbeeldingen, puntenwolken - alles in een formaat.
- Nieuw project | Geen releases
- Taal: TypeSpec | Private

![Screenshot](wfc5/screenshot.png)

---

## Slide 38: Project Ocondat
**Open bouwdata via WikiData**
Open building data met WikiData en andere databronnen. Koppel gebouwinformatie aan open datasets.
- 152 commits | Geen releases
- Taal: HTML/Python | Public

![Screenshot](project-ocondat/screenshot.png)

---

## Slide 39: Open Agents
**Multi-agent orchestrator voor Claude Code**
Spawn en coordineer AI-agents parallel via de CLI. Visueel canvas voor complexe workflows. Geen API-key nodig.
- 84 commits | Geen releases
- Taal: TypeScript | Public

![Screenshot](Open-Agents/screenshot.png)

---

## Slide 40: ERPNext
**Open source ERP voor de bouw**
ERPNext als alternatief voor Exact, AFAS, Twinfield. Eigen ontwikkelingen: Dashboard App, Level Dashboard, Nextcloud-integratie, Claude AI Skills, Nederlandse salarisadministratie.

![Screenshot](ERP-Next/screenshot.png)

---

## Slide 41: ERPNext Dashboard App
**Electron desktop dashboard voor ERPNext**
Moderne desktop applicatie met bankintegratie, facturatie en onkostenbeheer bovenop ERPNext.
- 16 commits | Geen releases
- Taal: TypeScript | Private

![Screenshot](erpnext-dashboard-app/screenshot.png)

---

## Slide 42: ERPNext Level Dashboard
**Alternatieve GUI voor ERPNext**
Interactief dashboard met afdelingen, medewerkers en AI-bots als alternatieve weergave van ERPNext data.
- Geen releases
- Taal: HTML | Public

![Screenshot](erpnext-level-dashboard/screenshot.png)
