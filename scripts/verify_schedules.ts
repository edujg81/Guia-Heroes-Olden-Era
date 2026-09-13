import { TEMPLE_56_DAY_BUILD_STEPS } from '../src/data/templeData';
import { NECROPOLIS_56_DAY_BUILD_STEPS } from '../src/data/necropolisData';
import { FULL_56_DAY_BUILD_STEPS } from '../src/data/dungeonData';
import { ARBOLEDA_56_DAY_BUILD_STEPS } from '../src/data/arboledaData';
import { CISMA_56_DAY_BUILD_STEPS } from '../src/data/cismaData';
import { ENJAMBRE_56_DAY_BUILD_STEPS } from '../src/data/enjambreData';

const factions = [
  ['Templo', TEMPLE_56_DAY_BUILD_STEPS],
  ['Necrópolis', NECROPOLIS_56_DAY_BUILD_STEPS],
  ['Mazmorra', FULL_56_DAY_BUILD_STEPS],
  ['Arboleda', ARBOLEDA_56_DAY_BUILD_STEPS],
  ['Cisma', CISMA_56_DAY_BUILD_STEPS],
  ['Enjambre', ENJAMBRE_56_DAY_BUILD_STEPS],
] as const;

let hasErrors = false;

for (const [name, steps] of factions) {
  console.log(`\n=================== ${name} (Total Steps: ${steps.length}) ===================`);
  if (steps.length !== 56) {
    console.error(`ERROR: ${name} does not have exactly 56 steps! Has ${steps.length}`);
    hasErrors = true;
  }

  // Check Days sequence 1 to 56
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    if (s.day !== i + 1) {
      console.error(`ERROR: ${name} step index ${i} has day ${s.day} instead of ${i + 1}`);
      hasErrors = true;
    }
    if (!s.cityScope) {
      console.error(`ERROR: ${name} Day ${s.day} missing cityScope!`);
      hasErrors = true;
    }
    if (!s.cityName) {
      console.error(`ERROR: ${name} Day ${s.day} missing cityName!`);
      hasErrors = true;
    }

    // Check English terms / parentheticals in title or building
    if (/\((Marksman|Austringer|Swordsman|Crusader|Zealot|Griffins|Angels|Treasury|Capitol|Mage Guild|Fort|Citadel|Castle)\)/i.test(s.title)) {
      console.error(`WARNING: English parenthetical detected in ${name} D${s.day} title: ${s.title}`);
    }
  }

  const principal = steps.filter(s => s.cityScope === 'Ciudad Principal');
  const secundaria = steps.filter(s => s.cityScope === 'Ciudad Secundaria');
  const tercera = steps.filter(s => s.cityScope === 'Tercera Ciudad');

  console.log(`- Ciudad Principal: ${principal.length} días (D${principal[0]?.day} - D${principal[principal.length-1]?.day})`);
  console.log(`- Ciudad Secundaria: ${secundaria.length} días (D${secundaria[0]?.day} - D${secundaria[secundaria.length-1]?.day})`);
  console.log(`- Tercera Ciudad: ${tercera.length} días (D${tercera[0]?.day} - D${tercera[tercera.length-1]?.day})`);
  console.log(`- Último día (tope máximo): Día ${steps[55].day}: ${steps[55].title}`);
}

if (hasErrors) {
  console.error('\nFAIL: Verification found errors.');
  process.exit(1);
} else {
  console.log('\nSUCCESS: All 6 factions strictly verified!');
}
