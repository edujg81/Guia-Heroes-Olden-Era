const fs = require('fs');
const files = [
  'd:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data/arboledaData.ts',
  'd:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data/dungeonData.ts',
  'd:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data/templeData.ts',
  'd:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data/necropolisData.ts',
  'd:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data/enjambreData.ts'
];

for (const p of files) {
  let s = fs.readFileSync(p, 'utf8');
  // Fix import: replace ExtrasHero import with HeroExtension import
  s = s.replace(/import \{ BuildStep, UnitInfo, ExtrasHero, TacticalScenario \} from '\.\.\/types';/g,
    "import { BuildStep, UnitInfo, TacticalScenario } from '../types';\nimport { mergeFactionHeroes, type HeroExtension } from './heroesDataProvider';");
  s = s.replace(/import \{ BuildStep, UnitInfo, HeroSkill, TacticalScenario, FactionLaw, RecommendedSpell, ExtrasHero \} from '\.\.\/types';/g,
    "import { BuildStep, UnitInfo, HeroSkill, TacticalScenario, FactionLaw, RecommendedSpell } from '../types';\nimport { mergeFactionHeroes, type HeroExtension } from './heroesDataProvider';");
  // Fix type declaration
  s = s.replace(/export const ([A-Z_]+_HEROES_LOCAL): ExtrasHero\[\] = \[/g, 'export const $1: HeroExtension[] = [');
  fs.writeFileSync(p, s);
  console.log('Fixed import/type:', p);
}
console.log('Done');
