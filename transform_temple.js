const fs = require('fs');
let c = fs.readFileSync('src/data/templeData.ts', 'utf8');

// 1. Fix import
c = c.replace(
  "import { BuildStep, UnitInfo, DungeonHero, TacticalScenario } from '../types';",
  "import { BuildStep, UnitInfo, HeroSkill, TacticalScenario, FactionLaw, RecommendedSpell } from '../types';\nimport { mergeFactionHeroes, type HeroExtension } from './heroesDataProvider';"
);

// 2. Rename array and change type
c = c.replace('export const TEMPLE_HEROES: DungeonHero[] = [', 'export const TEMPLE_HEROES_LOCAL: HeroExtension[] = [');

// 3. Add merge export before combat tactics
c = c.replace(
  "\n// =========================================================================\n// ESCENARIOS TÁCTICOS Y DUELOS DE TEMPLO",
  "\nexport const TEMPLE_HEROES = mergeFactionHeroes('human', TEMPLE_HEROES_LOCAL);\n\n// =========================================================================\n// ESCENARIOS TÁCTICOS Y DUELOS DE TEMPLO"
);

// 4. For each hero object inside TEMPLE_HEROES_LOCAL, keep only required fields
const unwanted = [
  'faction:', 'heroClass:', 'heroType:', 'specialtyName:', 'specialtyEffect:',
  'initialSkills:', 'initialArmy:'
];
for (const u of unwanted) {
  const regex = new RegExp('^[ \\t]*' + u.replace(':', '\\:') + '.*$', 'gm');
  c = c.replace(regex, '');
}

// 5. Clean blank lines inside array
c = c.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync('src/data/templeData.ts', c);
console.log('templeData transformed');