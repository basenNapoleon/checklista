# Dagens checklista

En liten PWA (Progressive Web App) — daglig checklista där du kan swipa till igår och imorgon, men huvudvyn är alltid dagens datum.

## Innehåll

```
index.html       — hela appen (HTML/CSS/JS i en fil)
manifest.json     — gör appen installerbar på hemskärmen
sw.js             — service worker, ger offline-stöd
icons/            — app-ikoner för hemskärm
```

## Deploya till Vercel (samma flöde som budgetappen)

1. Skapa ett nytt repo på GitHub, t.ex. `checklista`
2. Lägg in alla filer i den här mappen i repots rot
3. Gå till [vercel.com](https://vercel.com), "Add New Project" → importera repot
4. Inga build-inställningar behövs (static site) — bara Deploy
5. Du får en URL typ `checklista-ditt-namn.vercel.app`

## Lägg till på hemskärmen (iPhone)

1. Öppna URL:en i Safari (måste vara Safari, inte Chrome)
2. Tryck dela-ikonen ⬆️
3. "Lägg till på hemskärmen"

Appen öppnas då helskärm utan Safaris adressfält, och fungerar offline tack vare service workern.

## Hur datan sparas

Allt sparas i `localStorage` i telefonens webbläsare — alltså lokalt på just den enheten. Det finns ingen backend/databas, så om du byter telefon eller rensar webbläsardata försvinner listan. Säg till om du vill ha synk mellan flera enheter senare, då behövs en riktig databas (t.ex. Vercel KV eller Supabase) som nästa steg.

## Lokal utveckling

Inget byggsteg behövs. Öppna `index.html` direkt i en webbläsare, eller kör en enkel lokal server:

```bash
npx serve .
```
