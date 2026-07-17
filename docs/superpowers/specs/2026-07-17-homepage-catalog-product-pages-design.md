# Homepagecatalogus en productpagina's — ontwerp

## Doel

Maak de publieke websitecatalogus compacter en actualiseer twee productpresentaties zonder productpagina's, API-data of historische statistieken te verwijderen.

## Scope

- Verwijder de zichtbare homepagekaarten voor Open Energy Studio, Open 2D Studio, OpenAEC Cloud Platform en OpenAEC Docs.
- Behoud de bijbehorende productpagina's, bestanden, vertalingen en vermeldingen in `api/tools.json`.
- Voeg op de BIM Validator-productpagina een prominente GitHub-link toe.
- Toon op de BIM Validator-productpagina een zichtbare sectie met recente ontwikkelingen uit de laatste repositorywijzigingen. Behoud daarnaast de gedeelde release-notescomponent voor toekomstige formele releases.
- Verwijder het oude eerste screenshot uit de Speech Studio-galerij. De galerij bestaat daarna uit tekst-naar-spraak, modellen en instellingen.
- Gebruik het tekst-naar-spraakbeeld als nieuwe Speech Studio-thumbnail op de homepage.

## Visuele aanpak

De bestaande OpenAEC-huisstijl blijft leidend. De BIM Validator-knop gebruikt dezelfde knopvorm, typografie en amberaccenten als andere productpagina's. De recente ontwikkelingen worden als een rustige, scanbare tijdlijn weergegeven, zodat ze inhoudelijk opvallen zonder een nieuw designpatroon te introduceren.

## Datagedrag

De homepage-opruiming verandert alleen de HTML-catalogus. Generatoren mogen de verwijderde kaarten niet opnieuw aanmaken. Product- en statistiekdata blijven beschikbaar voor andere pagina's en machineleesbare interfaces.

## Verificatie

- Een automatische integratiecheck bewijst dat de vier homepagekaarten ontbreken.
- De check bewijst dat de vier product/API-vermeldingen behouden blijven.
- De check bewijst dat BIM Validator een repositorylink, recente-ontwikkelingensectie en release-notescomponent bevat.
- De check bewijst dat Speech Studio precies de drie nieuwe galerijbeelden gebruikt en dat de homepage-thumbnail naar het eerste nieuwe beeld verwijst.
- Alle JSON-bestanden blijven parseerbaar en `git diff --check` blijft schoon.
