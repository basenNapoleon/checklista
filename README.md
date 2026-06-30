# Dagens checklista

En liten PWA (Progressive Web App) — daglig checklista där du kan swipa till igår och imorgon, men huvudvyn är alltid dagens datum.

## Innehåll

```
index.html       — hela appen (HTML/CSS/JS i en fil)
manifest.json     — gör appen installerbar på hemskärmen
sw.js             — service worker, ger offline-stöd (cache-first)
build.js          — stämplar sw.js med en unik cache-nyckel vid varje deploy
package.json      — definierar byggsteget åt Vercel
vercel.json       — säger åt Vercel att köra byggsteget
icons/            — app-ikoner för hemskärm
```

## Hur auto-uppdateringen funkar

`sw.js` cachar appens filer första gången någon öppnar den (cache-first — snabbt och funkar offline). Problemet med cache-first är annars att gamla cachade filer kan leva kvar för evigt även efter att du pushat ändringar.

Lösningen: `build.js` körs automatiskt av Vercel vid varje deploy och byter ut en platshållare i `sw.js` mot en unik nyckel (Vercels commit-hash, eller dagens datum om den inte finns). Eftersom `sw.js`-filen då bokstavligen ändras varje gång, märker webbläsaren det och hämtar den nya versionen automatiskt — vilket i sin tur kastar ut den gamla cachen och hämtar alla filer på nytt. Allt sker utan att du behöver röra något manuellt; bara pusha till GitHub som vanligt.

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
