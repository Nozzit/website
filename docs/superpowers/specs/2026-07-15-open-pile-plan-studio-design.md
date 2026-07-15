# Open Pile Plan Studio op de OpenAEC-website

## Doel

Open Pile Plan Studio als volwaardig, beschikbaar product opnemen in de bestaande OpenAEC-productcatalogus. De toevoeging moet dezelfde vindbaarheid, presentatie en meertaligheid krijgen als vergelijkbare technische tools.

## Bron en status

- Repository: `OpenAEC-Foundation/open-pile-plan-studio`
- Productstatus: Beschikbaar en Beta
- Segment: GWW / Geotechniek
- AEC-categorieën: Engineering (`E`) en Infrastructure (`I`)

## Homepage

Voeg in `index.html` direct na Open Geotechniek Studio een nieuwe productkaart toe. De kaart volgt zonder nieuwe componenten of afwijkende stijlen het bestaande `tool-card`-patroon.

De kaart bevat:

- naam: Open Pile Plan Studio;
- badges: Beschikbaar, Beta en GWW / Geotechniek;
- omschrijving: “Maak en beheer paalplannen met positionering, nummering, maatvoering en technische uitvoer voor funderingsprojecten.”;
- link naar de eigen productpagina;
- link naar de live webapp als die in de repository of projectmetadata aantoonbaar beschikbaar is, anders een link naar GitHub Releases;
- GitHub-statistieken via `data-repo="open-pile-plan-studio"` en de bestaande generators;
- een representatieve afbeelding uit de repository, indien beschikbaar; anders een eenvoudige afbeelding in de bestaande OpenAEC-vormtaal.

Voeg de titel, omschrijving en linktekst toe aan alle vier bestaande taalobjecten: Nederlands, Engels, Frans en Turks. Voeg Open Pile Plan Studio ook toe aan de Schema.org-lijst op de homepage.

## Productpagina

Maak `/open-pile-plan-studio/` volgens het bestaande productpaginapatroon. De inhoud wordt gebaseerd op controleerbare repository-informatie en bevat minimaal:

- hero met productnaam, korte uitleg en status;
- primaire download- of gebruiksactie en GitHub-link;
- compacte uitleg van doel en doelgroep;
- de belangrijkste aantoonbare functies;
- technologie en platformondersteuning voor zover aantoonbaar;
- gedeelde navigatie, footer, release notes en meertaligheid volgens de bestaande siteconventies.

Niet-aantoonbare functies, versies, platformen en live-demo-URL’s worden niet verzonnen.

## Aanvullende website-integratie

Werk de bestaande afgeleide catalogusbestanden en vindbaarheid bij waar het projectpatroon dit vereist, waaronder de sitemap, tools-API en Markdown-mirrors. Gebruik daarvoor de bestaande generators waar mogelijk.

## Visuele richting

De bestaande OpenAEC-vormtaal blijft leidend: donkere technische hero, amberkleurig accent, compacte statusbadges en rustige witte contentblokken. De eigen signatuur van deze productpagina is een subtiel paalplanmotief in de hero of productafbeelding; geen nieuw of hybride designsysteem.

## Verificatie

- Valideer interne links, i18n-sleutels en de aanwezigheid van de vier talen.
- Controleer dat de statistiekengenerator de nieuwe `data-repo`-kaart herkent.
- Bouw of serveer de statische site met de bestaande projectcommando’s en controleer homepage en productpagina op desktop- en mobiele breedte.
- Controleer dat alleen bestanden binnen deze toevoeging worden gewijzigd; bestaande gebruikerswijzigingen blijven onaangeroerd.
