const fs = require('fs');
const http = require('http');

const BASE = 'http://localhost:5176';
const CONCURRENCY = 10;

function fetchJson(p) {
  return new Promise((resolve) => {
    http.get(BASE + p, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve({ ok: true, data: JSON.parse(body) }); }
        catch { resolve({ ok: false, error: body.slice(0, 200) }); }
      });
    }).on('error', e => resolve({ ok: false, error: e.message }));
  });
}

async function fetchAllWithConcurrency(urls, concurrency) {
  const results = new Array(urls.length);
  let index = 0;
  async function worker() {
    while (index < urls.length) {
      const i = index++;
      const [path, id] = urls[i];
      const res = await fetchJson(path + '/' + id);
      results[i] = { ok: res.ok, data: res.ok ? res.data : null, error: res.ok ? null : res.error, id };
    }
  }
  const workers = [];
  for (let i = 0; i < Math.min(concurrency, urls.length); i++) {
    workers.push(worker());
  }
  await Promise.all(workers);
  return results;
}

function escapeTS(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

function readLocalExtensions(filePath, fields) {
  const extensions = {};
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const field of fields) {
      const re = new RegExp(field + '\\s*:\\s*([^,\\n]+(?:\\[[^\\]]*\\])?)');
      const matches = content.match(re);
      if (matches) {
        try { extensions[field] = eval(matches[1].trim()); }
        catch { extensions[field] = matches[1].trim(); }
      }
    }
  } catch (e) { /* no existing file */ }
  return extensions;
}

function readAllLocalExtensions() {
  return {
    artifactsData: readLocalExtensions('src/data/artifactsData.ts', ['isOrphan', 'prefabPath', 'faction', 'idealSlot', 'metaTier', 'synergyTags']),
    abilitiesData: readLocalExtensions('src/data/abilitiesData.ts', ['effect', 'faction', 'creatureType']),
    buildingsData: {},
    mapObjectsData: {},
  };
}

async function syncArtifacts(listData) {
  const ext = readAllLocalExtensions().artifactsData;
  const ids = listData.map(d => d.id);
  console.log('  Consultando detalles de ' + ids.length + ' artefactos...');
  const details = await fetchAllWithConcurrency(ids.map(id => ['/api/artifacts', id]), CONCURRENCY);

  let content = "import { ArtifactInfo } from '../types-api';\n\n";
  content += "export const ARTIFACTS_DATA: ArtifactInfo[] = [\n";

  let written = 0;
  for (let i = 0; i < details.length; i++) {
    const d = details[i];
    if (!d.ok || !d.data) { console.log('  ✗ ' + d.id + ': ' + d.error); continue; }
    const item = d.data;
    const local = ext[item.id] || {};

    content += "  {\n";
    content += "    id: '" + escapeTS(item.id) + "',\n";
    content += "    name: '" + escapeTS(item.name) + "',\n";
    content += "    localizedName: '" + escapeTS(item.localizedName || item.name) + "',\n";
    content += "    rarity: '" + escapeTS(item.rarity) + "',\n";
    content += "    slot: '" + escapeTS(item.slot) + "',\n";
    content += "    slotIcon: '" + escapeTS(item.slotIcon || '') + "',\n";
    content += "    raritySlotText: '" + escapeTS(item.raritySlotText || '') + "',\n";
    content += "    icon: '" + escapeTS(item.icon) + "',\n";
    content += "    description: '" + escapeTS(item.description || '') + "',\n";
    if (item.narrativeDescription) content += "    narrativeDescription: '" + escapeTS(item.narrativeDescription) + "',\n";
    if (item.upgradeDescription) content += "    upgradeDescription: '" + escapeTS(item.upgradeDescription) + "',\n";
    if (item.upgradeCost) content += "    upgradeCost: '" + escapeTS(item.upgradeCost) + "',\n";
    if (item.upgradeCostNote != null) content += "    upgradeCostNote: '" + escapeTS(item.upgradeCostNote) + "',\n";
    if (item.destroyReward) content += "    destroyReward: '" + escapeTS(item.destroyReward) + "',\n";
    if (item.setBonus) {
      content += "    setBonus: {\n";
      content += "      setName: '" + escapeTS(item.setBonus.setName) + "',\n";
      content += "      bonuses: [\n";
      for (const b of item.setBonus.bonuses || []) {
        content += "        { header: '" + escapeTS(b.header) + "', effect: '" + escapeTS(b.effect) + "' },\n";
      }
      content += "      ],\n";
      content += "      setItems: [\n";
      for (const s of item.setBonus.setItems || []) {
        content += "        { artifactId: '" + escapeTS(s.artifactId) + "', name: '" + escapeTS(s.name) + "', icon: '" + escapeTS(s.icon) + "', slot: '" + escapeTS(s.slot) + "' },\n";
      }
      content += "      ],\n";
      content += "    },\n";
    }
    content += "    isOrphan: " + (local.isOrphan ?? false) + ",\n";
    content += "    prefabPath: " + (local.prefabPath === null ? 'null' : (local.prefabPath ? "'" + escapeTS(local.prefabPath) + "'" : 'null')) + ",\n";
    content += "    faction: '" + escapeTS(local.faction || '') + "',\n";
    content += "    idealSlot: '" + escapeTS(local.idealSlot || '') + "',\n";
    content += "    metaTier: '" + escapeTS(local.metaTier || '') + "',\n";
    content += "    synergyTags: " + JSON.stringify(local.synergyTags || []) + ",\n";
    content += "  }" + (i < details.length - 1 ? ',' : '') + "\n";
    written++;
  }
  content += "];\n\n";
  content += "export const ARTIFACTS_COUNT = ARTIFACTS_DATA.length;\n\n";
  content += "export function getArtifactById(id: string): ArtifactInfo | undefined {\n  return ARTIFACTS_DATA.find(a => a.id === id);\n}\n";
  fs.writeFileSync('src/data/artifactsData.ts', content);
  console.log('✓ artifactsData.ts escrito con ' + written + ' registros');
}

async function syncAbilities(listData) {
  const ext = readAllLocalExtensions().abilitiesData;
  const validAbilityTypes = ['Active', 'Passive', 'Triggered', 'Especial'];
  const filtered = listData.filter(item => validAbilityTypes.includes(item.abilityType));
  const ids = filtered.map(d => d.id);
  console.log('  Consultando detalles de ' + ids.length + ' habilidades...');
  const details = await fetchAllWithConcurrency(ids.map(id => ['/api/abilities', id]), CONCURRENCY);

  let content = "import { AbilityInfo } from '../types-api';\n\n";
  content += "export const ABILITIES_DATA: AbilityInfo[] = [\n";

  let written = 0;
  for (let i = 0; i < details.length; i++) {
    const d = details[i];
    if (!d.ok || !d.data) continue;
    const item = d.data;
    const local = ext[item.id] || {};

    content += "  {\n";
    content += "    id: '" + escapeTS(item.id) + "',\n";
    content += "    name: '" + escapeTS(item.name) + "',\n";
    content += "    nameSid: '" + escapeTS(item.nameSid || item.id) + "',\n";
    content += "    abilityType: '" + escapeTS(item.abilityType) + "',\n";
    content += "    description: '" + escapeTS(item.description || '') + "',\n";
    content += "    rank: " + (item.rank || 1) + ",\n";
    content += "    energyCost: " + (item.energyCost || 0) + ",\n";
    content += "    abilityTypeSid: '" + escapeTS(item.abilityTypeSid || 'BaseClass') + "',\n";
    content += "    immunities: " + JSON.stringify(item.immunities || []) + ",\n";
    content += "    infoNotes: " + JSON.stringify(item.infoNotes || []) + ",\n";
    content += "    icon: '" + escapeTS(item.icon) + "',\n";
    content += "    sourceUnitIds: " + JSON.stringify(item.sourceUnitIds || []) + ",\n";
    content += "    sourceUnitNames: " + JSON.stringify(item.sourceUnitNames || []) + ",\n";
    content += "    statLabels: " + JSON.stringify(item.statLabels || {}) + ",\n";
    content += "    effect: '" + escapeTS(local.effect || 'Efecto sincronizado con /api/abilities.') + "',\n";
    content += "    faction: '" + escapeTS(local.faction || '') + "',\n";
    content += "    creatureType: '" + escapeTS(local.creatureType || '') + "',\n";
    content += "  }" + (i < details.length - 1 ? ',' : '') + "\n";
    written++;
  }
  content += "];\n\n";
  content += "export const ABILITIES_COUNT = ABILITIES_DATA.length;\n\n";
  content += "export function getAbilityById(id: string): AbilityInfo | undefined {\n  return ABILITIES_DATA.find(a => a.id === id);\n}\n";
  fs.writeFileSync('src/data/abilitiesData.ts', content);
  console.log('✓ abilitiesData.ts escrito con ' + written + ' registros');
}

async function syncBuildings(listData) {
  const ids = listData.map(d => d.id);
  console.log('  Consultando detalles de ' + ids.length + ' edificios...');
  const details = await fetchAllWithConcurrency(ids.map(id => ['/api/buildings', id]), CONCURRENCY);

  let content = "import { ApiBuilding } from '../types-api';\n\n";
  content += "export const BUILDINGS_DATA: ApiBuilding[] = [\n";

  let written = 0;
  for (let i = 0; i < details.length; i++) {
    const d = details[i];
    if (!d.ok || !d.data) continue;
    const item = d.data;

    content += "  {\n";
    content += "    id: '" + escapeTS(item.id) + "',\n";
    content += "    name: '" + escapeTS(item.name) + "',\n";
    content += "    faction: '" + escapeTS(item.faction) + "',\n";
    content += "    factionDisplay: '" + escapeTS(item.factionDisplay) + "',\n";
    content += "    factionIcon: '" + escapeTS(item.factionIcon || '') + "',\n";
    content += "    description: '" + escapeTS(item.description || '') + "',\n";
    content += "    iconPath: '" + escapeTS(item.iconPath) + "',\n";
    content += "    costs: " + JSON.stringify(item.costs || []) + ",\n";
    content += "    costLabel: '" + escapeTS(item.costLabel || 'Coste de construcción:') + "',\n";
    content += "    effects: " + (item.effects === null ? 'null' : JSON.stringify(item.effects || [])) + ",\n";
    content += "    requirements: " + (item.requirements === null ? 'null' : JSON.stringify(item.requirements || [])) + ",\n";
    content += "    requirementsLabel: '" + escapeTS(item.requirementsLabel || 'Edificios necesarios') + "',\n";
    content += "    recruitableUnits: " + (item.recruitableUnits === null ? 'null' : JSON.stringify(item.recruitableUnits || [])) + ",\n";
    content += "    recruitableUnitsLabel: '" + escapeTS(item.recruitableUnitsLabel || 'Reclutar criaturas') + "',\n";
    content += "    upgradeOptions: " + (item.upgradeOptions === null ? 'null' : JSON.stringify(item.upgradeOptions || [])) + ",\n";
    content += "    upgradesLabel: '" + escapeTS(item.upgradesLabel || 'Mejoras') + "',\n";
    content += "  }" + (i < details.length - 1 ? ',' : '') + "\n";
    written++;
  }
  content += "];\n\n";
  content += "export const BUILDINGS_COUNT = BUILDINGS_DATA.length;\n\n";
  content += "export function getBuildingById(id: string): ApiBuilding | undefined {\n  return BUILDINGS_DATA.find(b => b.id === id);\n}\n";
  fs.writeFileSync('src/data/buildingsData.ts', content);
  console.log('✓ buildingsData.ts escrito con ' + written + ' registros');
}

async function syncMapObjects(listData) {
  const ids = listData.map(d => d.id);
  console.log('  Consultando detalles de ' + ids.length + ' objetos de mapa...');
  const details = await fetchAllWithConcurrency(ids.map(id => ['/api/map-objects', id]), CONCURRENCY);

  let content = "import { ApiMapObject } from '../types-api';\n\n";
  content += "export const MAP_OBJECTS_DATA: ApiMapObject[] = [\n";

  let written = 0;
  for (let i = 0; i < details.length; i++) {
    const d = details[i];
    if (!d.ok || !d.data) continue;
    const item = d.data;

    content += "  {\n";
    content += "    id: '" + escapeTS(item.id) + "',\n";
    content += "    name: '" + escapeTS(item.name) + "',\n";
    content += "    description: '" + escapeTS(item.description || '') + "',\n";
    content += "    narrativeDescription: " + (item.narrativeDescription ? "'" + escapeTS(item.narrativeDescription) + "'" : 'undefined') + ",\n";
    content += "    icon: '" + escapeTS(item.icon) + "',\n";
    content += "    creatureBankInfo: {\n";
    content += "      hasGuards: " + (item.creatureBankInfo?.hasGuards ?? false) + ",\n";
    content += "      visitType: '" + escapeTS(item.creatureBankInfo?.visitType || 'OneTime') + "',\n";
    content += "      isBarracks: " + (item.creatureBankInfo?.isBarracks ?? false) + ",\n";
    content += "      difficultyLevels: " + JSON.stringify(item.creatureBankInfo?.difficultyLevels || []) + ",\n";
    content += "      difficultyLabel: " + (item.creatureBankInfo?.difficultyLabel ? "'" + escapeTS(item.creatureBankInfo.difficultyLabel) + "'" : 'null') + ",\n";
    content += "      guardsLabel: '" + escapeTS(item.creatureBankInfo?.guardsLabel || '') + "',\n";
    content += "      bankType: '" + escapeTS(item.creatureBankInfo?.bankType || '') + "',\n";
    content += "      variants: " + JSON.stringify(item.creatureBankInfo?.variants || []) + ",\n";
    content += "    },\n";
    content += "  }" + (i < details.length - 1 ? ',' : '') + "\n";
    written++;
  }
  content += "];\n\n";
  content += "export const MAP_OBJECTS_COUNT = MAP_OBJECTS_DATA.length;\n\n";
  content += "export function getMapObjectById(id: string): ApiMapObject | undefined {\n  return MAP_OBJECTS_DATA.find(o => o.id === id);\n}\n";
  fs.writeFileSync('src/data/mapObjectsData.ts', content);
  console.log('✓ mapObjectsData.ts escrito con ' + written + ' registros');
}

(async () => {
  console.log('=== SINCRONIZACIÓN POR DETALLE DESDE API ===');

  const endpoints = [
    { path: '/api/artifacts', writer: syncArtifacts },
    { path: '/api/abilities', writer: syncAbilities },
    { path: '/api/buildings', writer: syncBuildings },
    { path: '/api/map-objects', writer: syncMapObjects },
  ];

  for (const ep of endpoints) {
    console.log('\n' + ep.path + ':');
    const res = await fetchJson(ep.path);
    if (!res.ok) {
      console.log('  ✗ ERROR: ' + res.error);
      continue;
    }
    const arr = Array.isArray(res.data) ? res.data : [];
    console.log('  Lista: ' + arr.length + ' registros');
    if (arr.length > 0) {
      await ep.writer(arr);
    }
  }

  console.log('\n=== SINCRONIZACIÓN COMPLETADA ===');
})();