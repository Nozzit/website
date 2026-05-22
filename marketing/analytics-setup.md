# Analytics setup — wat we eerst moeten meten

> Zonder dit weten we niet of de rest van het marketingwerk effect heeft. Dit hoort prioriteit #1 te zijn.

## Wat ontbreekt nu

- ❌ Geen pageviews op `www.open-aec.com` of subdomeinen
- ❌ Geen klikgedrag op homepage (welke tool-tegel wordt het meest geopend?)
- ❌ Geen bron-tracking (komen mensen via LinkedIn, Google, direct?)
- ❌ Geen funnel-zicht (homepage → productpagina → download)

## Wat we wél hebben (en niet kwijt willen)

- ✅ GitHub stars per repo (`data/stats.json`)
- ✅ Downloads per release per platform (`data/downloads.json`)
- ✅ Commit / contributor counts (`data/stats.json`)

## Aanbeveling: Plausible Analytics

**Waarom Plausible** boven Google Analytics:
- 🟢 Geen cookies → geen cookie-banner nodig (GDPR-cleaner)
- 🟢 Open-source (kan eventueel later self-host bij eigen VPS)
- 🟢 Lichte payload (<1 kB script vs 47 kB voor GA4)
- 🟢 Eenvoudig dashboard zonder UX-rommel
- 🟢 Werkt met subdomeinen
- 🟢 Past bij positionering ("wij houden van open source en privacy")

**Kosten**: €9/maand cloud t/m 10k pageviews. Self-host: €0 op eigen VPS.

## Installatie — 10 minuten werk

### 1. Account aanmaken bij plausible.io
- Domein: `open-aec.com`
- Subdomeinen toevoegen op een `*` shared site: `open-pdf-studio.open-aec.com`, `open-geotechniek-studio.open-aec.com`, `open-calculations-studio.open-aec.com`, `open-2d-studio.open-aec.com`, etc.

### 2. Script aan `shared/nav.js` toevoegen
Zodat het automatisch op elke pagina staat (alle pagina's laden nav.js via `<script src="/shared/nav.js"></script>`).

```html
<!-- in shared/nav.js, na nav-injection: -->
<script defer data-domain="open-aec.com" src="https://plausible.io/js/script.outbound-links.js"></script>
```

Of beter: voeg het direct in elke `<head>` toe via een `shared/analytics.js` snippet, dat zorgt dat het vóór de nav laadt.

### 3. UTM-conventie afspraak

Voor elke handmatige link in externe content:

| Bron | utm_source | utm_medium |
|------|-----------|-----------|
| LinkedIn-post stichting | `linkedin` | `social-org` |
| LinkedIn-post Rick | `linkedin` | `social-personal` |
| Instagram link-in-bio | `instagram` | `social` |
| Instagram reel-link | `instagram` | `social-reel` |
| Mastodon | `mastodon` | `social` |
| Bluesky | `bluesky` | `social` |
| Newsletter | `newsletter` | `email` |
| Vakblad-artikel | `cobouw` / `bouwenict` / etc | `article` |
| Podcast-show notes | `bimpioneers` / etc | `podcast` |

Voorbeeld URL voor LinkedIn-post over Open PDF Studio:
```
https://www.open-aec.com/open-pdf-studio/?utm_source=linkedin&utm_medium=social-personal&utm_campaign=bluebeam-alternative-2026-06
```

Met UTM-tagging zien we in Plausible **per campagne** hoeveel bezoekers, hoeveel doorklikken naar een download, etc.

## Goals / events om te tracken

In Plausible kan je "Custom events" definiëren. Voorstel:

| Event | Trigger | Wat het meet |
|-------|---------|--------------|
| `Download Started` | Klik op een `releases/download/*.exe`/`.dmg`/`.deb` URL | Hoeveel mensen daadwerkelijk een installer downloaden |
| `Live Demo Opened` | Klik op een `https://*.open-aec.com/` link | Hoeveel mensen de live versie willen proberen |
| `Productpage Visited` | Pageview van `/<tool>/` URL | Welke tools populair zijn |
| `Newsletter Signup` | Form submission | Conversie van bezoeker → fan |
| `Quote Requested` | `/offerte/` form submit | Lead-generatie |
| `Supporter Click` | Klik op een supporter-logo | Reverse — wat verlaten mensen voor onze supporters |

## Dashboard-format (wekelijks bijhouden)

Maak een `marketing/dashboard.md` met dezelfde kolommen, elke maandagochtend gevuld:

```markdown
| Week | Visitors | Tool-pageviews | Downloads | LI-followers | IG-followers | GH-stars |
|------|---------:|---------------:|----------:|-------------:|-------------:|---------:|
| W21 |    -    |     -          |   5.380   |      ?       |       0      |    403   |
| W22 |  TBD    |    TBD         |   TBD     |     TBD      |      TBD     |    TBD   |
```

Met een dergelijk wekelijks logboek zie je trends. Eén meting heeft geen waarde, 12 metingen wel.

## Subdomain-analytics — extra aandacht

De live demos zitten op `*.open-aec.com` subdomeinen. Drie keuzes:

### Optie A: Plausible op alle subdomeinen (aanbevolen)
- Voeg Plausible-script toe aan de live demo apps zelf (één regel in hun `index.html`)
- Per subdomein een eigen Plausible-site, of gedeeld onder `open-aec.com` met page filter
- **Vereist**: toegang tot elke tool z'n source repo + redeploy

### Optie B: Nginx access log parsing
- Op de VPS waar de demos draaien: zet `goaccess` of `nginx amplify` op
- Geeft puur server-side metrics: requests, bytes, top URLs
- **Geen** front-end interactie-data
- **Voordeel**: privacy-vriendelijk (geen JS), gratis

### Optie C: Cloudflare ervoor zetten
- Verhuis DNS naar Cloudflare → Free plan biedt basic analytics
- Vereist: 5 minuten DNS-werk
- **Bonus**: ook gratis CDN + DDoS-bescherming
- Past goed bij self-host plausible later

Aanbeveling: **A + C combineren** — Cloudflare als DNS+CDN, Plausible als beslissings-data.

## Eerste actie

Maandag-ochtend:
1. Plausible-account aanmaken (10 min)
2. Snippet toevoegen aan `shared/nav.js` + commit + deploy (10 min)
3. Eerste UTM-link uittesten via LinkedIn-post deze week
4. Vrijdag: eerste dashboard-regel invullen

Daarna kan al het andere marketingwerk starten met meetbare baseline.
