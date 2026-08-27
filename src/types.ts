export interface BuildingChoiceOption {
  title: string;
  effect: string;
  isRecommended?: boolean;
}

export interface BuildingChoice {
  type: 'Mejora Defensiva de Fortificación' | 'Especialización de Edificio' | 'Mejora de Unidad (Rama A vs B)' | 'Subida de Nivel Cívico' | 'Elección de Ley / Facción';
  recommendedOption: string;
  alternativeOption?: string;
  options?: BuildingChoiceOption[];
  reason: string;
}

export interface BuildStep {
  day: number;
  month: 1 | 2;
  week: number;
  title: string;
  building: string;
  buildingTierLevel?: string;
  buildingChoice?: BuildingChoice;
  cost: {
    gold: number;
    wood?: number;
    ore?: number;
    gems?: number;
    crystal?: number;
    mercury?: number;
    sulfur?: number;
    alchemicalDust?: number;
  };
  lawProgress?: string;
  heroActions: string[];
  combatTactic: string;
  criticalTip: string;
  priority: 'Crítica' | 'Alta' | 'Media';
  sourceUrl?: string;
}

export interface UnitStats {
  hp: number;
  attack: number;
  defense: number;
  damage: string;
  speed: number;
  initiative: number;
  shots?: number;
  weeklyGrowth: number;
}

export interface UnitVariant {
  id: 'base' | 'branch_a' | 'branch_b';
  branchLabel: 'Base' | 'Rama A' | 'Rama B';
  name: string;
  nameEn: string;
  subtitle: string;
  dwellingName: string;
  cost: {
    gold: number;
    ore?: number;
    wood?: number;
    gems?: number;
    crystal?: number;
    mercury?: number;
    sulfur?: number;
    alchemicalDust?: number;
  };
  stats: UnitStats;
  combatStance: string;
  abilities: string[];
  strengths: string;
  tacticalUsage: string;
  idealMatchup: string;
  synergyLaws: string[];
}

export interface UnitBranchComparison {
  summary: string;
  whenToPickA: string;
  whenToPickB: string;
  synergyHeroA: string;
  synergyHeroB: string;
}

export interface UnitInfo {
  tier: number;
  name: string;
  upgradeName: string;
  altUpgradeName?: string;
  dwelling: string;
  role: string;
  speed: number;
  combatStance: string;
  abilities: string[];
  strengths: string;
  tacticalUsage: string;
  iconName: string;
  variants: {
    base: UnitVariant;
    branchA: UnitVariant;
    branchB: UnitVariant;
  };
  comparison: UnitBranchComparison;
}

export interface LawRank {
  level: number;
  costLaws: number; // Cost of this specific rank upgrade
  cumulativeCost: number; // Total cost up to this rank
  effect: string;
  tacticalImpact: string;
  recommendedUnlockTime?: string;
}

export interface FactionLaw {
  id: string;
  priorityOrder: number;
  tier: 1 | 2 | 3 | 4 | 5;
  tierMinPoints: number; // 0, 5, 15, 30, 50
  name: string;
  nameEn: string;
  category: 'Militar' | 'Economía' | 'Mágica' | 'Héroes & Jadame' | 'Gobernanza' | 'Ciudad' | string;
  branch: 'Militar' | 'Economía' | 'Mágica' | 'Héroes & Jadame' | 'Gobernanza' | 'Ciudad' | string;
  branchType: 'Ciudad' | 'Militar' | string; // Canonical Olden Era main branches: Town/Faction vs Army/Military
  costLaws: number; // Base cost (Level 1)
  maxLevel: number; // Max upgrade level (e.g., 1, 2, or 3)
  ranks?: LawRank[]; // Detailed progression by rank
  recommendedUnlockTime?: string;
  effect?: string;
  tacticalImpact?: string;
  synergy?: string;
  prerequisiteLawId?: string;
  prerequisiteLaws?: string[];
  prerequisiteLawIds?: string[];
  incompatibleLaws?: string[];
  recommendedForHeroes?: string[];
  tags?: string[];
  minBranchPoints?: number;
  isUltimate?: boolean;
}

export interface PresetStep {
  lawId: string;
  targetLevel?: number;
  level?: number;
  stepNumber?: number;
  cost?: number;
  cumulativeCost?: number;
  timing?: string;
  rationale?: string;
  stepName?: string;
  notes?: string;
}

export interface FactionLawPreset {
  id: string;
  name: string;
  description: string;
  archetype?: string;
  totalCost: number;
  tag?: string;
  enactedLawIds?: string[];
  lawLevels?: Record<string, number>;
  sequenceSteps?: PresetStep[];
  steps?: any[];
  strategyFocus?: string;
}

export interface SpellLevelInfo {
  level: 1 | 2 | 3 | 4;
  title: string;
  manaCost: number;
  effect: string;
  keyBonus: string;
  upgradeCost: {
    dust: number; // Polvo Alquímico (Alchemical Dust)
    gold: number; // Oro
    rareResources?: string; // e.g. "2 Cristales, 2 Mercurio"
    insight?: number; // Para hechizos Neutrales / Astrología
    guildCondition?: string; // Alternativa por Cofradía o Habilidad
  };
}

export interface SpellUnlockCost {
  formula: string;
  gold: number;
  crystals?: number;
  gems?: number;
  mercury?: number;
  astrologyPoints?: number;
  insight?: number;
  description: string;
}

export interface RecommendedSpell {
  id: string;
  name: string;
  nameEn: string;
  masterfulName?: string;
  tier: number;
  type: 'Combate' | 'Aventura / Mapa' | 'Control de Masas' | 'Daño Masivo' | 'Soporte' | string;
  school: 'Sombras (Nightshade)' | 'Arcana' | 'Luz (Light)' | 'Primigenia (Primal)' | 'Primigenia / Tierra' | 'Universal / Aventura' | 'Neutral / Aventura (Universal)' | string;
  schoolRequirement: string;
  priority: 'Imprescindible (P1)' | 'Muy Alta (P2)' | 'Alta (P3)' | 'Media (P3)' | 'Situacional' | 'Básica (P4)' | string;
  manaCost: number;
  astrologyCost: number; // Puntos de Astrología necesarios para comprarlo en Cofradía / Observatorio
  astrologyPointsCost?: string;
  unlockCost: SpellUnlockCost;
  levels: SpellLevelInfo[];
  effect: string;
  tacticalUtility: string;
  whereToLearn: string;
  isNeutral?: boolean;
  guildPointsCost?: string;
  acquisitionMethod?: string;
}

export interface OfficialSubSkill {
  name: string;
  tierLevel: 'Avanzado' | 'Experto';
  effect: string;
  isRecommendedMeta?: boolean;
  recommendedTag?: string; // e.g. "⭐ Elección Meta", "⚔️ Ideal Físico", "🔮 Ideal Mágico", "🛡️ Defensa & Control", "🏹 Tropas a Distancia"
  recommendationWhen?: string; // Cuándo elegir esta subhabilidad
}

export interface OfficialSkillUpgrade {
  level: 'Básico' | 'Avanzado' | 'Experto';
  effect: string;
}

export interface SubskillSelectionGuide {
  advanced: {
    recommendedName: string;
    why: string;
    alternativeChoice?: string;
    alternativeCondition?: string;
  };
  expert: {
    recommendedName: string;
    why: string;
    alternativeChoice?: string;
    alternativeCondition?: string;
  };
  generalTacticalTip?: string;
}

export interface OfficialSkill {
  id: string;
  name: string;
  category: 'Común' | 'Clase' | 'Facción';
  faction?: 'Mazmorra' | 'Cisma' | 'Enjambre' | 'Templo' | 'Arboleda' | 'Necrópolis';
  upgrades: {
    basic: string;
    advanced: string;
    expert: string;
  };
  subskills: {
    advanced: OfficialSubSkill[];
    expert: OfficialSubSkill[];
  };
  selectionGuide?: SubskillSelectionGuide;
  startingHeroes?: string[];
  requiredByClasses?: string[];
}

export interface SubclassRequiredSkill {
  name: string;
  nameEn: string;
  tier: 'Experta';
}

export interface SubclassInfo {
  id: string;
  name: string;
  nameEn: string;
  faction: 'Mazmorra' | 'Templo' | 'Arboleda' | 'Necrópolis' | 'Cisma' | 'Enjambre';
  baseClass: string;
  classType: 'Guerrero' | 'Mago';
  bonusTitle: string;
  bonusEffect: string;
  requiredSkills: SubclassRequiredSkill[];
  recommendedHeroes: string[];
  tacticalTier: 'Tier S+' | 'Tier S' | 'Tier A+' | 'Tier A' | 'Tier A (Económica)' | 'Tier S (Anti-Mago)';
  strategicAnalysis: string;
  synergyNotes: string;
}

export interface HeroSubskillChoice {
  skillName: string;
  advancedSubskill: string;
  advancedReason: string;
  expertSubskill?: string;
  expertReason?: string;
}

export interface DungeonHero {
  id: string;
  name: string;
  title: string;
  heroClass: 'Brujo (Warlock)' | 'Señor de la Guerra (Overlord)' | 'Explorador / Apoyo' | string;
  heroType: 'Guerrero' | 'Mago';
  role: 'Principal Mágico' | 'Principal Físico' | 'Apertura Rápida Día 1' | 'Secundario & Logística' | string;
  tierRank: 'Tier S+ (Meta)' | 'Tier S' | 'Tier A (Especialista)' | 'Tier Secundario' | 'Tier S (Anti-Mago)' | string;
  specialtyName: string;
  specialtyEffect: string;
  initialSkills: string[];
  initialArmy: string;
  recommendedStartingTier: string;
  statGrowth: {
    attack: number;
    defense: number;
    spellPower: number;
    knowledge: number;
  };
  tacticalPlaystyle: string;
  idealSkillBuild: string[];
  recommendedSubskillPicks?: HeroSubskillChoice[];
  synergyCombo: string;
  day1Action: string;
}

export interface HeroSkill {
  name: string;
  tier: 'Básica' | 'Avanzada' | 'Experta';
  description: string;
  whyCrucial: string;
  subskills: string[];
  category: 'Magia de Sombras & Arcana' | 'Movilidad & Táctica' | 'Economía & Reclutamiento' | 'Combate & Poder';
}

export interface TacticalScenario {
  id: string;
  title: string;
  category?: 'Limpieza Temprana (Creeping)' | 'Defensa & Contrarush' | 'Asedio & Rompemurallas' | 'Duelo Anti-Magia / Colosos' | 'Control de Masas (Nightshade)' | 'Late Game Drago-Armageddon';
  situation: string;
  recommendationAI: string;
  recommendationHuman: string;
  recommendedSpell: string;
  triumvirateStance: 'Postura de Ataque (+4/+6 Atq)' | 'Postura de Defensa (+4/+6 Def)' | 'Postura de Poder Mágico (+4/+6 SP)' | 'Postura de Poder Mágico (+6/+8 SP)' | string;
  recommendedHeroes?: string[];
  recommendedUnits?: string[];
  turnByTurnLoop?: string[];
  counterPlayNote?: string;
}
