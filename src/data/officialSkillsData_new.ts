import { ApiSkill } from "../types-api";
import { SKILL_SELECTION_GUIDES } from "./subskillsRecommendationData";

const OFFICIAL_SKILLS_RAW_DATA: ApiSkill[] = [
  {
    id: "skill_assault",
    name: "Ofensiva",
    icon: "icons/hero_skills/skill_assault",
    skillType: "Common",
    level1: {
      levelName: "Ofensiva básica",
      description: "Los ataques básicos de las criaturas amistosas infligen +<resolved>10</resolved> % de daño.",
      icon: "icons/hero_skills/skill_assault",
      subSkillChoices: [],
    },
    level2: {
      levelName: "Ofensiva avanzada",
      description: "Los ataques básicos de las criaturas amistosas infligen +<resolved>15</resolved> % de daño.",
      icon: "icons/hero_skills/skill_assault_2",
      subSkillChoices: [
        { id: "sub_skill_assault_2", name: "Tiro con arco", description: "Los ataques a distancia y de largo alcance de las criaturas amistosas infligen +<resolved>15</resolved> % de daño.", icon: "icons/hero_sub_skills/sub_skill_assault_2_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_assault_3", name: "Marcha de batalla", description: "Las criaturas amistosas generan +<resolved>1</resolved> punto(s) de concentración por cada ataque. Esta bonificación se duplica si el héroe conoce \"Suerte\".", icon: "icons/hero_sub_skills/sub_skill_assault_3_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_assault_6", name: "Frenesí de batalla", description: "Las criaturas amistosas obtienen +<resolved>2</resolved> de ataque por cada punto de moral.", icon: "icons/hero_sub_skills/sub_skill_assault_6_icon", grantedSpell: null, grantedBattleAbility: null },
      ],
    },
    level3: {
      levelName: "Ofensiva experta",
      description: "Los ataques básicos de las criaturas amistosas infligen +<resolved>20</resolved> % de daño.",
      icon: "icons/hero_skills/skill_assault_3",
      subSkillChoices: [
        { id: "sub_skill_assault_1", name: "Filos sombríos", description: "Las criaturas amistosas infligen +<resolved>1</resolved> de daño.", icon: "icons/hero_sub_skills/sub_skill_assault_1_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_assault_4", name: "Guardianes de la realidad", description: "-<resolved>10</resolved> % de poder de hechizo para el héroe enemigo. Esta bonificación se duplica si el héroe conoce \"Magia de nochesombra\".", icon: "icons/hero_sub_skills/sub_skill_summoner_4_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_assault_5", name: "Firmeza", description: "-<resolved>15</resolved> % de defensa a las criaturas enemigas.", icon: "icons/hero_sub_skills/sub_skill_protection_5_icon", grantedSpell: null, grantedBattleAbility: null },
      ],
    },
    statLabels: { heroesStartingWithSkill: "Héroes que empiezan con esta Habilidad" },
  },
  {
    id: "skill_battle_artistry",
    name: "Combate",
    icon: "icons/hero_skills/skill_battle_artistry",
    skillType: "Class",
    level1: {
      levelName: "Combate básico",
      description: "Golpe heroico inflige +<resolved>10</resolved> de daño básico.",
      icon: "icons/hero_skills/skill_battle_artistry",
      subSkillChoices: [],
    },
    level2: {
      levelName: "Combate avanzado",
      description: "Golpe heroico inflige +<resolved>15</resolved> de daño básico.",
      icon: "icons/hero_skills/skill_battle_artistry_2",
      subSkillChoices: [
        { id: "sub_skill_battle_artistry_3", name: "Esgrima", description: "+<resolved>2</resolved> de ataque y defensa.", icon: "icons/hero_sub_skills/sub_skill_battle_artistry_3_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battle_artistry_2", name: "Venganza", description: "Una vez por ronda, después de la primera muerte de una formación amistosa, permite usar un golpe heroico nuevamente.", icon: "icons/hero_sub_skills/sub_skill_battle_artistry_2_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battle_artistry_4", name: "Golpe poderoso", description: "El golpe heroico inflige +<resolved>10</resolved> % de daño (según el nivel del héroe).", icon: "icons/hero_sub_skills/sub_skill_battle_artistry_4_icon", grantedSpell: null, grantedBattleAbility: null },
      ],
    },
    level3: {
      levelName: "Combate experto",
      description: "Golpe heroico inflige +<resolved>20</resolved> de daño básico.",
      icon: "icons/hero_skills/skill_battle_artistry_3",
      subSkillChoices: [
        { id: "sub_skill_battle_artistry_1", name: "Golpe sin esfuerzo", description: "Golpe heroico cuesta -<resolved>1</resolved> carga(s) de concentración.", icon: "icons/hero_sub_skills/sub_skill_battle_artistry_1_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battle_artistry_5", name: "Emoción de la batalla", description: "Una vez por ronda, después de matar a una formación enemiga con un golpe heroico, el héroe puede usarlo una vez más.", icon: "icons/hero_sub_skills/sub_skill_battle_artistry_5_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battle_artistry_6", name: "Golpe de confusión", description: "El golpe heroico reduce los contraataques del objetivo en <resolved>1</resolved>.", icon: "icons/hero_sub_skills/sub_skill_battle_artistry_6_icon", grantedSpell: null, grantedBattleAbility: null },
      ],
    },
    statLabels: { heroesStartingWithSkill: "Héroes que empiezan con esta Habilidad" },
  },
  {
    id: "skill_battlemage",
    name: "Magia de batalla",
    icon: "icons/hero_skills/skill_battlemage",
    skillType: "Common",
    level1: {
      levelName: "Magia de batalla básica",
      description: "El ataque y la defensa de las criaturas amistosas aumentan un <resolved>15</resolved> % del poder de hechizo y el conocimiento del héroe respectivamente.",
      icon: "icons/hero_skills/skill_battlemage",
      subSkillChoices: [],
    },
    level2: {
      levelName: "Magia de batalla avanzada",
      description: "El ataque y la defensa de las criaturas amistosas aumentan un <resolved>20</resolved> % del poder de hechizo y el conocimiento del héroe respectivamente.",
      icon: "icons/hero_skills/skill_battlemage_2",
      subSkillChoices: [
        { id: "sub_skill_battlemage_1", name: "Aura de destrucción", description: "Cada vez que el héroe usa un hechizo en combate, su ataque aumenta en <resolved>1</resolved> hasta el final de esa batalla.", icon: "icons/hero_sub_skills/sub_skill_battlemage_1_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battlemage_2", name: "Aura de protección", description: "Cada vez que el héroe usa un hechizo en combate, su defensa aumenta en <resolved>1</resolved> hasta el final de esa batalla.", icon: "icons/hero_sub_skills/sub_skill_battlemage_2_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battlemage_3", name: "Aura de hechicería", description: "Cada vez que el héroe usa un hechizo en combate, su poder de hechizo aumenta en <resolved>1</resolved> hasta el final de esa batalla.", icon: "icons/hero_sub_skills/sub_skill_battlemage_3_icon", grantedSpell: null, grantedBattleAbility: null },
      ],
    },
    level3: {
      levelName: "Magia de batalla experta",
      description: "El ataque y la defensa de las criaturas amistosas aumentan un <resolved>25</resolved> % del poder de hechizo y el conocimiento del héroe respectivamente.",
      icon: "icons/hero_skills/skill_battlemage_3",
      subSkillChoices: [
        { id: "sub_skill_battlemage_4", name: "Autoridad del mago de batalla", description: "El ataque de las criaturas amistosas aumenta un <resolved>15</resolved> % del poder de hechizo del héroe. Esta bonificación se duplica si el héroe conoce \"Hechicería\".", icon: "icons/hero_sub_skills/sub_skill_battlemage_4_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battlemage_5", name: "Autoridad del mago protector", description: "La defensa de las criaturas amistosas aumenta un <resolved>15</resolved> % del conocimiento del héroe. Esta bonificación se duplica si el héroe conoce \"Resistencia\".", icon: "icons/hero_sub_skills/sub_skill_battlemage_5_icon", grantedSpell: null, grantedBattleAbility: null },
        { id: "sub_skill_battlemage_6", name: "Tiempo mágico", description: "Las recargas de todos los hechizos de batalla del héroe se reducen en <resolved>1</resolved> ronda(s).", icon: "icons/hero_sub_skills/sub_skill_battlemage_6_icon", grantedSpell: null, grantedBattleAbility: null },
      ],
    },
    statLabels: { heroesStartingWithSkill: "Héroes que empiezan con esta Habilidad" },
  },
];

// Campos locales exclusivos de la aplicación (como se hace con los héroes)
export interface SkillLocalExtras {
  category: 'Común' | 'Clase' | 'Facción';
  faction?: 'Mazmorra' | 'Cisma' | 'Colmena' | 'Templo' | 'Foresta' | 'Necrópolis';
  selectionGuide?: typeof SKILL_SELECTION_GUIDES[string];
  startingHeroes?: string[];
  requiredByClasses?: string[];
}

export const OFFICIAL_SKILLS_DATA: (ApiSkill & SkillLocalExtras)[] = OFFICIAL_SKILLS_RAW_DATA.map((skill) => {
  const guide = SKILL_SELECTION_GUIDES[skill.id];
  const extras: SkillLocalExtras = {
    category: skill.skillType === 'Class' ? 'Clase' : skill.skillType === 'Faction' ? 'Facción' : 'Común',
    faction: skill.id === 'skill_faction_demons' ? 'Colmena' :
             skill.id === 'skill_faction_dungeon' ? 'Mazmorra' :
             skill.id === 'skill_faction_humans' ? 'Templo' :
             skill.id === 'skill_faction_nature' ? 'Foresta' :
             skill.id === 'skill_faction_undead' ? 'Necrópolis' :
             skill.id === 'skill_faction_unfrozen' ? 'Cisma' : undefined,
    selectionGuide: guide,
    startingHeroes: [],
    requiredByClasses: [],
  };
  return { ...skill, ...extras };
});
