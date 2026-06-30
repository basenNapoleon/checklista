// Körs automatiskt vid varje Vercel-deploy (se "build" i package.json).
// Ersätter __BUILD_ID__ i sw.js med ett unikt, daterat ID, så att
// service workerns cache-namn alltid ändras vid en ny deploy och
// gamla cachade filer kastas ut automatiskt hos alla som har appen.

const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, 'sw.js');
let sw = fs.readFileSync(swPath, 'utf8');

// Använd Vercels commit-hash om den finns (mest exakt — unik per push),
// annars dagens datum + tid som reserv.
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
const buildId = commitSha
  ? commitSha.slice(0, 8)
  : new Date().toISOString().replace(/[:.]/g, '-');

sw = sw.replace('__BUILD_ID__', buildId);
fs.writeFileSync(swPath, sw);

console.log(`sw.js stämplad med cache-nyckel: checklista-${buildId}`);
