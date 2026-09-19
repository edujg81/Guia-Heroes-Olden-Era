// =====================================================================
// TIPOS DE API (fuente de verdad: localhost:5176)
// Estos tipos representan las respuestas exactas de la API.
// Los campos locales extendidos (idealSlot, metaTier, etc.) se añaden
// en los data files mediante intersection types.
// =====================================================================

// --- ARTIFACTS (/api/artifacts) ---

export interface ApiArtifact {
  id: string;
  name: string;
  localizedName: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  slot: string;
  slotIcon: string;
  raritySlotText: string;
  description: string;
  narrativeDescription?: string;
  upgradeDescription?: string;
  upgradeCost?: string;
  upgradeCostNote?: string;
  destroyReward?: string;
  setBonus?: {
    setName: string;
    bonuses: { header: string; effect: string }[];
    setItems: { artifactId: string; name: string; icon: string; slot: string }[];
  };
}

// Campos locales extendidos (no en API, preservados en sincronización)
export interface ArtifactInfo extends ApiArtifact {
  isOrphan?: boolean;
  prefabPath?: string | null;
  faction?: string;
  idealSlot?: string;
  metaTier?: string;
  synergyTags?: string[];
}

// --- ABILITIES (/api/abilities) ---

export interface ApiAbility {
  id: string;
  name: string;
  nameSid: string;
  abilityType: 'Active' | 'Passive' | 'Triggered' | 'Especial';
  description: string;
  rank: number;
  energyCost: number;
  abilityTypeSid: string;
  immunities: any[] | null;
  infoNotes: string[] | null;
  icon: string;
  sourceUnitIds: string[];
  sourceUnitNames: string[];
  statLabels: Record<string, string>;
}

// Campos locales extendidos para abilitiesData.ts
export interface AbilityInfo extends ApiAbility {
  effect: string;
  faction: string;
  creatureType: string;
}

// --- BUILDINGS (/api/buildings) ---

export interface ApiBuilding {
  id: string;
  name: string;
  faction: string;
  factionDisplay: string;
  factionIcon: string;
  description: string;
  iconPath: string;
  costs: ApiCost[];
  costLabel: string;
  effects: string[] | null;
  requirements: ApiRequirement[] | null;
  requirementsLabel: string;
  recruitableUnits: string[] | null;
  recruitableUnitsLabel: string;
  upgradeOptions: ApiUpgradeOption[] | null;
  upgradesLabel: string;
}

export interface ApiCost {
  resourceName: string;
  amount: number;
}

export interface ApiRequirement {
  buildingName: string;
  buildingId: string;
  iconPath: string;
}

export interface ApiUpgradeOption {
  sid: string;
  iconPath: string;
  description: string;
}

// --- MAP OBJECTS (/api/map-objects) ---

export interface ApiMapObject {
  id: string;
  name: string;
  description: string;
  narrativeDescription?: string;
  icon: string;
  creatureBankInfo: {
    hasGuards: boolean;
    visitType: string;
    isBarracks?: boolean;
    difficultyLevels: any[] | null;
    difficultyLabel: string | null;
    guardsLabel: string;
    bankType: string;
    variants: ApiMapObjectVariant[];
  };
}

export interface ApiMapObjectVariant {
  rollChance: number;
  value: number;
  customGuardValue: number | null;
  guards: ApiGuard[];
  rewards: ApiMapObjectRewards;
  rewardApplyType: string;
  rewardOptions: any[] | null;
}

export interface ApiGuard {
  unitId: string;
  unitName: string;
  amount: number;
  icon: string;
  minAmount: number | null;
  maxAmount: number | null;
}

export interface ApiMapObjectRewards {
  resources: ApiResource[];
  artifactPools: any[];
  spellPools: any[];
  units: any[];
  experience: null;
  cursePools: any[] | null;
}

export interface ApiResource {
  resourceKey: string;
  displayName: string;
  amount: number;
}

// --- FACTION LAWS (/api/faction-laws) ---

export interface ApiFactionLaw {
  id: string;
  name: string;
  localizedName: string;
  faction: string;
  factionDisplay: string;
  factionIcon: string;
  icon: string;
  levels: ApiLawLevel[];
  statLabels: Record<string, string>;
  layout: ApiLawLayout;
}

export interface ApiLawLevel {
  level: number;
  cost: number;
  description: string;
}

export interface ApiLawLayout {
  countToUnlock: number;
  groups: ApiLawGroup[];
}

export interface ApiLawGroup {
  laws: ApiLawInGroup[];
}

export interface ApiLawInGroup {
  id: string;
  name: string;
  icon: string;
  levelCount: number;
}

// --- SKILLS (/api/skills) ---

export interface ApiSkill {
  id: string;
  skillType: 'Class' | 'Common' | 'Faction';
  level1: {
    levelName: string;
    description: string;
    icon: string;
    subSkillChoices: ApiSubSkillChoice[];
  };
  level2?: {
    levelName: string;
    description: string;
    icon: string;
    subSkillChoices: ApiSubSkillChoice[];
  };
  level3?: {
    levelName: string;
    description: string;
    icon: string;
    subSkillChoices: ApiSubSkillChoice[];
  };
  statLabels?: Record<string, string>;
}

export interface ApiSubSkillChoice {
  id: string;
  name: string;
  description: string;
  icon: string;
  grantedSpell: null;
  grantedBattleAbility: null;
}

// --- SUBCLASSES (/api/subclasses) ---

export interface ApiSubclass {
  id: string;
  name: string;
  description: string;
  faction: string;
  factionDisplay: string;
  factionIcon: string;
  classType: string;
  classDisplay: string;
  classIcon: string;
  icon: string;
  requiredSkills: ApiRequiredSkill[];
}

export interface ApiRequiredSkill {
  skillId: string;
  skillName: string;
  icon: string;
}

// --- HEROES (/api/heroes) ---

export interface ApiHero {
  id: string;
  name: string;
  localizedName: string;
  icon: string;
}

// --- UNITS (/api/units) ---

export interface ApiUnit {
  id: string;
  name: string;
  localizedName: string;
  icon: string;
  rarity: string;
}

// --- SPELLS (/api/spells) ---

export interface ApiSpell {
  id: string;
  name: string;
  localizedName: string;
  icon: string;
}
// TIPOS LOCALES EXTENDIDOS (preservan campos no presentes en la API)
// =====================================================================

export interface ArtifactInfo extends ApiArtifact {
  isOrphan?: boolean;
  prefabPath?: string | null;
  idealSlot?: string;
  metaTier?: string;
  synergyTags?: string[];
}
