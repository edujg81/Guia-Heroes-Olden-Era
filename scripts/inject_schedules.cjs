const fs = require('fs');
const path = require('path');

const { enjambreDays15To56, formatStep } = require('./build_schedules.js');
const { arboledaDays15To56 } = require('./build_all_schedules.js');
const { cismaDays15To56 } = require('./cisma_steps.js');

// 1. UPDATE ARBOLEDA DATA
function updateArboleda() {
  const filePath = path.join(__dirname, '../src/data/arboledaData.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  // Find start of ARBOLEDA_56_DAY_BUILD_STEPS
  const startIdx = content.indexOf('export const ARBOLEDA_56_DAY_BUILD_STEPS: BuildStep[] = [');
  const endIdx = content.indexOf('export const ARBOLEDA_UNITS: UnitInfo[] = [');

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not find boundaries for ARBOLEDA_56_DAY_BUILD_STEPS');
  }

  // We want to keep days 1-14 from the file
  // Let's find day 14 closing bracket
  const day14Marker = "title: 'Día 14: ¡TIER 7 OBTENIDO! - Pira (Pyre)',";
  const day14Pos = content.indexOf(day14Marker, startIdx);
  if (day14Pos === -1) throw new Error('Could not find Day 14 in arboleda');

  // Find closing bracket of day 14 step
  const day14Close = content.indexOf('  },', day14Pos) + 4;

  // Extract days 1-14 portion
  let days1To14 = content.slice(startIdx, day14Close);

  // In day 11, ensure alchemicalDust: 10 is present
  if (!days1To14.includes('alchemicalDust: 10')) {
    days1To14 = days1To14.replace(
      "cost: { gold: 2500, wood: 5 },",
      "cost: { gold: 2500, wood: 5, alchemicalDust: 10 },"
    );
  }

  // Format days 15 to 56
  const formatted15To56 = arboledaDays15To56.map(formatStep).join('\n');

  const newSection = `${days1To14}\n\n  // =========================================================================\n  // SEMANAS 3 A 8: CONSOLIDACIÓN, TIER 7 MEJORADO, COFRADÍA V Y VICTORIA (DÍAS 15-56)\n  // =========================================================================\n${formatted15To56}\n];\n\n`;

  const newContent = content.slice(0, startIdx) + newSection + content.slice(endIdx);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Arboleda updated successfully with 56 steps!');
}

// 2. UPDATE CISMA DATA
function updateCisma() {
  const filePath = path.join(__dirname, '../src/data/cismaData.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  const startIdx = content.indexOf('export const CISMA_56_DAY_BUILD_STEPS: BuildStep[] = [');
  const endIdx = content.indexOf('export const CISMA_UNITS: UnitInfo[] = [');

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not find boundaries for CISMA_56_DAY_BUILD_STEPS');
  }

  const day14Marker = "title: 'Día 14: ¡TIER 7 OBTENIDO! - Santuario del Abismo (Sanctum of the Deep - Enviado Abisal)',";
  const day14Pos = content.indexOf(day14Marker, startIdx);
  if (day14Pos === -1) throw new Error('Could not find Day 14 in cisma');

  const day14Close = content.indexOf('  },', day14Pos) + 4;

  let days1To14 = content.slice(startIdx, day14Close);

  // In day 11, ensure alchemicalDust: 15 is present for Tier 2 upgrade
  if (!days1To14.includes('alchemicalDust: 15')) {
    days1To14 = days1To14.replace(
      "cost: { gold: 2500, mercury: 2 },",
      "cost: { gold: 2500, mercury: 2, alchemicalDust: 15 },"
    );
  }

  const formatted15To56 = cismaDays15To56.map(formatStep).join('\n');

  const newSection = `${days1To14}\n\n  // =========================================================================\n  // SEMANAS 3 A 8: ÁRBITROS, SUPERVISORES ABISALES Y DOMINIO DEL ABISMO (DÍAS 15-56)\n  // =========================================================================\n${formatted15To56}\n];\n\n`;

  const newContent = content.slice(0, startIdx) + newSection + content.slice(endIdx);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Cisma updated successfully with 56 steps!');
}

// 3. UPDATE ENJAMBRE DATA
function updateEnjambre() {
  const filePath = path.join(__dirname, '../src/data/enjambreData.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  const startIdx = content.indexOf('export const ENJAMBRE_56_DAY_BUILD_STEPS: BuildStep[] = [');
  const endIdx = content.indexOf('export const ENJAMBRE_UNITS: UnitInfo[] = [');

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not find boundaries for ENJAMBRE_56_DAY_BUILD_STEPS');
  }

  const day14Marker = "title: 'Día 14: ¡TIER 7 OBTENIDO! - Torre del Amor (Tower of Love - Reina de la Colmena)',";
  const day14Pos = content.indexOf(day14Marker, startIdx);
  if (day14Pos === -1) throw new Error('Could not find Day 14 in enjambre');

  const day14Close = content.indexOf('  },', day14Pos) + 4;

  let days1To14 = content.slice(startIdx, day14Close);

  // Ensure day 11 has alchemicalDust: 25
  if (!days1To14.includes('alchemicalDust: 25')) {
    days1To14 = days1To14.replace(
      "cost: { gold: 3000, ore: 5, crystal: 2 },",
      "cost: { gold: 3000, ore: 5, crystal: 2, alchemicalDust: 25 },"
    );
  }

  const formatted15To56 = enjambreDays15To56.map(formatStep).join('\n');

  const newSection = `${days1To14}\n\n  // =========================================================================\n  // SEMANAS 3 A 8: WAURMS, METRÓPOLIS, TIER 7 MEJORADO Y DOMINIO DE JADAME (DÍAS 15-56)\n  // =========================================================================\n${formatted15To56}\n];\n\n`;

  const newContent = content.slice(0, startIdx) + newSection + content.slice(endIdx);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Enjambre updated successfully with 56 steps!');
}

updateArboleda();
updateCisma();
updateEnjambre();
