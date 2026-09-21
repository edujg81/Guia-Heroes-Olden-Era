const fs = require('fs');
const path = 'src/data/templeData.ts';
let c = fs.readFileSync(path, 'utf8');

// Find TEMPLE_HEROES_LOCAL section
const startMarker = 'export const TEMPLE_HEROES_LOCAL: HeroExtension[] = [';
const endMarker = '];\nexport const TEMPLE_HEROES = mergeFactionHeroes';
const startIdx = c.indexOf(startMarker);
const endIdx = c.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find markers');
  process.exit(1);
}

const before = c.substring(0, startIdx);
const arrayContent = c.substring(startIdx + startMarker.length, endIdx);
const after = c.substring(endIdx);

// Split into hero objects by detecting { ... } blocks
// We'll process line by line, tracking depth
const lines = arrayContent.split('\n');
let result = [];
let depth = 0;
let heroLines = [];
let inHero = false;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed === '{') {
    depth = 1;
    inHero = true;
    heroLines = [line];
    continue;
  }
  if (inHero) {
    // Count braces
    for (const ch of trimmed) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    heroLines.push(line);
    if (depth === 0) {
      // End of hero object - filter out unwanted fields
      const heroText = heroLines.join('\n');
      const unwanted = [
        /^[ \t]*faction:.*$/gm,
        /^[ \t]*heroClass:.*$/gm,
        /^[ \t]*heroType:.*$/gm,
        /^[ \t]*specialtyName:.*$/gm,
        /^[ \t]*specialtyEffect:.*$/gm,
        /^[ \t]*initialSkills:.*$/gm,
        /^[ \t]*initialArmy:.*$/gm,
      ];
      let filtered = heroText;
      for (const r of unwanted) {
        filtered = filtered.replace(r, '');
      }
      // Clean up multiple blank lines within the hero
      filtered = filtered.replace(/\n{3,}/g, '\n\n');
      result.push(filtered);
      inHero = false;
      heroLines = [];
    }
  } else {
    result.push(line);
  }
}

const newArrayContent = result.join('\n');
const newContent = before + startMarker + '\n' + newArrayContent + after;

fs.writeFileSync(path, newContent);
console.log('Done! templeData.ts filtered');