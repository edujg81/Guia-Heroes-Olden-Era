const fs = require('fs');
const http = require('http');

const BASE = 'http://localhost:5176';

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

function escapeTS(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

function writeArtifactsFile(data) {
  let content = `import { ArtifactInfo } from '../types-api';\n\n`;
  content += `export interface ApiArtifact {\n`;
  content += `  id: string;\n  name: string;\n  localizedName: string;\n  icon: string;\n  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';\n  slot: string;\n  slotIcon: string;\n  raritySlotText: string;\n  description: string;\n  narrativeDescription?: string;\n  upgradeDescription?: string;\n  upgradeCost?: string;\n  upgradeCostNote?: string;\n  destroyReward?: string;\n  setBonus?: { setName: string; bonuses: { header: string; effect: string }[]; setItems: { artifactId: string; name: string; icon: string; slot: string }[]; };\n}\n\n`;
  content += `export interface ArtifactInfo extends ApiArtifact {\n  isOrphan?: boolean;\n  prefabPath?: string | null;\n  faction?: string;\n  idealSlot?: string;\n  metaTier?: string;\n  synergyTags?: string[];\n}\n\n`;
  content += `export const ARTIFACTS_DATA: ArtifactInfo[] = [\n`;
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    content += `  {\n`;
    content += `    id: '${escapeTS(item.id)}',\n`;
    content += `    name: '${escapeTS(item.name)}',\n`;
    content += `    localizedName: '${escapeTS(item.localizedName || item.name)}',\n`;
    content += `    rarity: '${escapeTS(item.rarity)}',\n`;
    content += `    slot: '${escapeTS(item.slot)}',\n`;
    content += `    slotIcon: '${escapeTS(item.slotIcon)}',\n`;
    content += `    raritySlotText: '${escapeTS(item.raritySlotText)}',\n`;
    content += `    icon: '${escapeTS(item.icon)}',\n`;
    content += `    description: '${escapeTS(item.description || '')}',\n`;
    if (item.narrativeDescription) content += `    narrativeDescription: '${escapeTS(item.narrativeDescription)}',\n`;
    if (item.upgradeDescription) content += `    upgradeDescription: '${escapeTS(item.upgradeDescription)}',\n`;
    if (item.upgradeCost) content += `    upgradeCost: '${escapeTS(item.upgradeCost)}',\n`;
    if (item.upgradeCostNote) content += `    upgradeCostNote: '${escapeTS(item.upgradeCostNote)}',\n`;
    if (item.destroyReward) content += `    destroyReward: '${escapeTS(item.destroyReward)}',\n`;
    if (item.setBonus) {
      content += `    setBonus: {\n`;
      content += `      setName: '${escapeTS(item.setBonus.setName)}',\n`;
      content += `      bonuses: [\n`;
      for (const b of item.setBonus.bonuses || []) {
        content += `        { header: '${escapeTS(b.header)}', effect: '${escapeTS(b.effect)}' },\n`;
      }
      content += `      ],\n`;
      content += `      setItems: [\n`;
      for (const s of item.setBonus.setItems || []) {
        content += `        { artifactId: '${escapeTS(s.artifactId)}', name: '${escapeTS(s.name)}', icon: '${escapeTS(s.icon)}', slot: '${escapeTS(s.slot)}' },\n`;
      }
      content += `      ],\n`;
      content += `    },\n`;
    }
    content += `    isOrphan: ${item.isOrphan ?? false},\n`;
    content += `    prefabPath: ${item.prefabPath === null ? 'null' : (item.prefabPath ? `'${escapeTS(item.prefabPath)}'` : 'null')},\n`;
    // Campos locales: usar valores por defecto vacíos (se completarán manualmente después)
    content += `    faction: '',\n`;
    content += `    idealSlot: '',\n`;
    content += `    metaTier: '',\n`;
    content += `    synergyTags: [],\n`;
    content += `  }${i < data.length - 1 ? ',' : ''}\n`;
  }
  content += `];\n\n`;
  content += `export const ARTIFACTS_COUNT = ARTIFACTS_DATA.length;\n\n`;
  content += `export function getArtifactById(id: string): ArtifactInfo | undefined {\n  return ARTIFACTS_DATA.find(a => a.id === id);\n}\n`;
  fs.writeFileSync('src/data/artifactsData.ts', content);
  console.log('✓ artifactsData.ts escrito con ' + data.length + ' registros');
}

function writeAbilitiesFile(data) {
  // Filtrar registros con abilityType inválido (no en el tipo permitido)
  const validAbilityTypes = ['Active', 'Passive', 'Triggered', 'Especial'];
  const filtered = data.filter(item => validAbilityTypes.includes(item.abilityType));
  
  let content = `import { AbilityInfo } from '../types-api';\n\n`;
  content += `export interface ApiAbility {\n`;
  content += `  id: string;\n  name: string;\n  nameSid: string;\n  abilityType: 'Active' | 'Passive' | 'Triggered' | 'Especial';\n  description: string;\n  rank: number;\n  energyCost: number;\n  abilityTypeSid: string;\n  immunities: any[] | null;\n  infoNotes: string[] | null;\n  icon: string;\n  sourceUnitIds: string[];\n  sourceUnitNames: string[];\n  statLabels: Record<string, string>;\n}\n\n`;
  content += `export interface AbilityInfo extends ApiAbility {\n  effect: string;\n  faction: string;\n  creatureType: string;\n}\n\n`;
  content += `export const ABILITIES_DATA: AbilityInfo[] = [\n`;
  
  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];
    content += `  {\n`;
    content += `    id: '${escapeTS(item.id)}',\n`;
    content += `    name: '${escapeTS(item.name)}',\n`;
    content += `    nameSid: '${escapeTS(item.nameSid || item.id)}',\n`;
    content += `    abilityType: '${escapeTS(item.abilityType)}',\n`;
    content += `    description: '${escapeTS(item.description || '')}',\n`;
    content += `    rank: ${item.rank || 1},\n`;
    content += `    energyCost: ${item.energyCost || 0},\n`;
    content += `    abilityTypeSid: '${escapeTS(item.abilityTypeSid || 'BaseClass')}',\n`;
    content += `    immunities: ${JSON.stringify(item.immunities || [])},\n`;
    content += `    infoNotes: ${JSON.stringify(item.infoNotes || [])},\n`;
    content += `    icon: '${escapeTS(item.icon)}',\n`;
    content += `    sourceUnitIds: ${JSON.stringify(item.sourceUnitIds || [])},\n`;
    content += `    sourceUnitNames: ${JSON.stringify(item.sourceUnitNames || [])},\n`;
    content += `    statLabels: ${JSON.stringify(item.statLabels || {})},\n`;
    // Campos locales: valores por defecto
    content += `    effect: 'Efecto sincronizado con /api/abilities.',\n`;
    content += `    faction: '',\n`;
    content += `    creatureType: '',\n`;
    content += `  }${i < filtered.length - 1 ? ',' : ''}\n`;
  }
  content += `];\n\n`;
  content += `export const ABILITIES_COUNT = ABILITIES_DATA.length;\n\n`;
  content += `export function getAbilityById(id: string): AbilityInfo | undefined {\n  return ABILITIES_DATA.find(a => a.id === id);\n}\n`;
  fs.writeFileSync('src/data/abilitiesData.ts', content);
  console.log('✓ abilitiesData.ts escrito con ' + filtered.length + ' registros (de ' + data.length + ' filtrados)');
}

function writeBuildingsFile(data) {
  let content = `import { ApiBuilding } from '../types-api';\n\n`;
  content += `export interface ApiCost { resourceName: string; amount: number; }\n`;
  content += `export interface ApiRequirement { buildingName: string; buildingId: string; iconPath: string; }\n`;
  content += `export interface ApiUpgradeOption { sid: string; iconPath: string; description: string; }\n\n`;
  content += `export interface ApiBuilding {\n`;
  content += `  id: string;\n  name: string;\n  faction: string;\n  factionDisplay: string;\n  factionIcon: string;\n  description: string;\n  iconPath: string;\n  costs: ApiCost[];\n  costLabel: string;\n  effects: string[] | null;\n  requirements: ApiRequirement[] | null;\n  requirementsLabel: string;\n  recruitableUnits: string[] | null;\n  recruitableUnitsLabel: string;\n  upgradeOptions: ApiUpgradeOption[] | null;\n  upgradesLabel: string;\n}\n\n`;
  content += `export const BUILDINGS_DATA: ApiBuilding[] = [\n`;
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    content += `  {\n`;
    content += `    id: '${escapeTS(item.id)}',\n`;
    content += `    name: '${escapeTS(item.name)}',\n`;
    content += `    faction: '${escapeTS(item.faction)}',\n`;
    content += `    factionDisplay: '${escapeTS(item.factionDisplay)}',\n`;
    content += `    factionIcon: '${escapeTS(item.factionIcon)}',\n`;
    content += `    description: '${escapeTS(item.description || '')}',\n`;
    content += `    iconPath: '${escapeTS(item.iconPath)}',\n`;
    content += `    costs: ${JSON.stringify(item.costs || [])},\n`;
    content += `    costLabel: '${escapeTS(item.costLabel || 'Coste de construcción:')}',\n`;
    content += `    effects: ${item.effects === null ? 'null' : JSON.stringify(item.effects || [])},\n`;
    content += `    requirements: ${item.requirements === null ? 'null' : JSON.stringify(item.requirements || [])},\n`;
    content += `    requirementsLabel: '${escapeTS(item.requirementsLabel || 'Edificios necesarios')}',\n`;
    content += `    recruitableUnits: ${item.recruitableUnits === null ? 'null' : JSON.stringify(item.recruitableUnits || [])},\n`;
    content += `    recruitableUnitsLabel: '${escapeTS(item.recruitableUnitsLabel || 'Reclutar criaturas')}',\n`;
    content += `    upgradeOptions: ${item.upgradeOptions === null ? 'null' : JSON.stringify(item.upgradeOptions || [])},\n`;
    content += `    upgradesLabel: '${escapeTS(item.upgradesLabel || 'Mejoras')}',\n`;
    content += `  }${i < data.length - 1 ? ',' : ''}\n`;
  }
  content += `];\n\n`;
  content += `export const BUILDINGS_COUNT = BUILDINGS_DATA.length;\n\n`;
  content += `export function getBuildingById(id: string): ApiBuilding | undefined {\n  return BUILDINGS_DATA.find(b => b.id === id);\n}\n`;
  fs.writeFileSync('src/data/buildingsData.ts', content);
  console.log('✓ buildingsData.ts escrito con ' + data.length + ' registros');
}

function writeMapObjectsFile(data) {
  let content = `import { ApiMapObject } from '../types-api';\n\n`;
  content += `export interface ApiMapObjectVariant { rollChance: number; value: number; customGuardValue: number | null; guards: any[]; rewards: any; rewardApplyType: string; rewardOptions: any[] | null; }\n`;
  content += `export interface ApiGuard { unitId: string; unitName: string; amount: number; icon: string; minAmount: number | null; maxAmount: number | null; }\n`;
  content += `export interface ApiResource { resourceKey: string; displayName: string; amount: number; }\n\n`;
  content += `export interface ApiMapObject {\n`;
  content += `  id: string;\n  name: string;\n  description: string;\n  narrativeDescription?: string;\n  icon: string;\n  creatureBankInfo: {\n`;
  content += `    hasGuards: boolean;\n    visitType: string;\n    isBarracks?: boolean;\n    difficultyLevels: any[] | null;\n    difficultyLabel: string | null;\n    guardsLabel: string;\n    bankType: string;\n    variants: any[];\n  };\n}\n\n`;
  content += `export const MAP_OBJECTS_DATA: ApiMapObject[] = [\n`;
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    content += `  {\n`;
    content += `    id: '${escapeTS(item.id)}',\n`;
    content += `    name: '${escapeTS(item.name)}',\n`;
    content += `    description: '${escapeTS(item.description || '')}',\n`;
    content += `    narrativeDescription: ${item.narrativeDescription ? `'${escapeTS(item.narrativeDescription)}'` : 'undefined'},\n`;
    content += `    icon: '${escapeTS(item.icon)}',\n`;
    content += `    creatureBankInfo: {\n`;
    content += `      hasGuards: ${item.creatureBankInfo?.hasGuards ?? false},\n`;
    content += `      visitType: '${escapeTS(item.creatureBankInfo?.visitType || 'OneTime')}',\n`;
    content += `      isBarracks: ${item.creatureBankInfo?.isBarracks ?? false},\n`;
    content += `      difficultyLevels: ${JSON.stringify(item.creatureBankInfo?.difficultyLevels || [])},\n`;
    content += `      difficultyLabel: ${item.creatureBankInfo?.difficultyLabel ? `'${escapeTS(item.creatureBankInfo.difficultyLabel)}'` : 'null'},\n`;
    content += `      guardsLabel: '${escapeTS(item.creatureBankInfo?.guardsLabel || '')}',\n`;
    content += `      bankType: '${escapeTS(item.creatureBankInfo?.bankType || '')}',\n`;
    content += `      variants: ${JSON.stringify(item.creatureBankInfo?.variants || [])},\n`;
    content += `    },\n`;
    content += `  }${i < data.length - 1 ? ',' : ''}\n`;
  }
  content += `];\n\n`;
  content += `export const MAP_OBJECTS_COUNT = MAP_OBJECTS_DATA.length;\n\n`;
  content += `export function getMapObjectById(id: string): ApiMapObject | undefined {\n  return MAP_OBJECTS_DATA.find(o => o.id === id);\n}\n`;
  fs.writeFileSync('src/data/mapObjectsData.ts', content);
  console.log('✓ mapObjectsData.ts escrito con ' + data.length + ' registros');
}

(async () => {
  console.log('=== SINCRONIZACIÓN REAL DESDE API ===');
  
  const endpoints = [
    { path: '/api/artifacts', writer: writeArtifactsFile },
    { path: '/api/abilities', writer: writeAbilitiesFile },
    { path: '/api/buildings', writer: writeBuildingsFile },
    { path: '/api/map-objects', writer: writeMapObjectsFile },
  ];
  
  for (const ep of endpoints) {
    const res = await fetchJson(ep.path);
    if (!res.ok) {
      console.log('✗ ERROR en ' + ep.path + ': ' + res.error);
      continue;
    }
    const arr = Array.isArray(res.data) ? res.data : [];
    console.log('✓ ' + ep.path + ': ' + arr.length + ' registros');
    if (arr.length > 0) {
      ep.writer(arr);
    }
  }
  
  console.log('=== SINCRONIZACIÓN COMPLETADA ===');
})();