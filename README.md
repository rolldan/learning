# AI Toolkit for lærere

En nettside for lærere som vil oppdatere seg på AI i utdanning, basert på [Microsoft Education AI Toolkit](https://marketingassets.microsoft.com/gdc/gdciQrVYO/original).

## Funksjoner

- **Seksjonene** – Oversikt over de fem hoveddelene i toolkit (Oversikt, AI Navigators, Planlegg, Implementer, Forskning)
- **Fagplaner** – Konkrete 10-ukers AI-planer for 8 fag (Norsk, Matematikk, Engelsk, Naturfag, Samfunnsfag, KRLE, Kunst, Programfag)
- **Kompetanseheving** – 8 læringsmoduler med avkryssing og fremdriftssporing
- **Min oversikt** – Dashboard med anbefalte neste steg

Fremdrift lagres lokalt i nettleseren (localStorage).

## Kom i gang

Åpne `index.html` i en nettleser, eller kjør en lokal server:

```bash
python3 -m http.server 8080
```

Gå deretter til http://localhost:8080

## Struktur

```
index.html      – Hovedside
css/styles.css  – Styling
js/data.js      – Innhold (seksjoner, fag, moduler)
js/app.js       – Interaktivitet og lagring
```
