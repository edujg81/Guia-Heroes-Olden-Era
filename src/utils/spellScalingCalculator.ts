import { RecommendedSpell, SpellLevelInfo } from '../types';

export interface ParsedSpellFormula {
  rawFormula: string;
  base: number;
  multiplier: number;
  type: 'damage' | 'heal' | 'resurrection' | 'shield' | 'other';
  unit: string;
}

export interface CalculatedSpellLevel {
  level: number;
  title: string;
  manaCost: number;
  baseEffect: string;
  keyBonus: string;
  hasFormula: boolean;
  calculatedValue: number | null;
  formula: ParsedSpellFormula | null;
  manaEfficiency: number | null; // calculatedValue / manaCost
  formattedCalculation: string | null;
}

export interface CalculatedSpell {
  id: string;
  name: string;
  nameEn: string;
  tier: number;
  school: string;
  type: string;
  priority: string;
  levels: CalculatedSpellLevel[];
  level4Damage: number | null;
  level4Efficiency: number | null;
  hasScaling: boolean;
  primaryScalingType: 'damage' | 'heal' | 'resurrection' | 'shield' | 'control' | 'support';
}

/**
 * Extracts and parses a formula like `[40 + 15 × Poder Mágico]` or `[160 + 40 × SP]` from text
 */
export function parseSpellFormula(effectText: string): ParsedSpellFormula | null {
  if (!effectText) return null;

  // Regex pattern matching [Base + Multiplier × Poder Mágico] or variations
  const bracketMatch = effectText.match(/\[\s*(\d+(?:\.\d+)?)\s*\+\s*(\d+(?:\.\d+)?)\s*[×*x]\s*(?:Poder\s*Mágico|Poder|SP|Spell\s*Power)\s*\]/i);

  if (bracketMatch) {
    const base = parseFloat(bracketMatch[1]);
    const multiplier = parseFloat(bracketMatch[2]);
    const rawFormula = bracketMatch[0];

    // Determine type from surrounding context
    const lower = effectText.toLowerCase();
    let type: ParsedSpellFormula['type'] = 'damage';
    let unit = 'Daño';

    if (lower.includes('cura') || lower.includes('sanación') || lower.includes('recupera') || lower.includes('puntos de vida')) {
      type = 'heal';
      unit = 'Curación';
    } else if (lower.includes('resucita') || lower.includes('revive') || lower.includes('cadáveres')) {
      type = 'resurrection';
      unit = 'Vida Resucitada';
    } else if (lower.includes('escudo') || lower.includes('absorbe') || lower.includes('barrera')) {
      type = 'shield';
      unit = 'Escudo';
    }

    return {
      rawFormula,
      base,
      multiplier,
      type,
      unit,
    };
  }

  // Alternative match for percentage or other scaling if present
  const singleMultiplierMatch = effectText.match(/\[\s*(\d+(?:\.\d+)?)\s*[×*x]\s*(?:Poder\s*Mágico|Poder|SP)\s*\]/i);
  if (singleMultiplierMatch) {
    const multiplier = parseFloat(singleMultiplierMatch[1]);
    return {
      rawFormula: singleMultiplierMatch[0],
      base: 0,
      multiplier,
      type: 'damage',
      unit: 'Daño',
    };
  }

  return null;
}

/**
 * Calculates the exact output value for a formula given a specific Spell Power (SP)
 */
export function evaluateSpellFormula(formula: ParsedSpellFormula, spellPower: number): number {
  return Math.round((formula.base + formula.multiplier * spellPower) * 10) / 10;
}

/**
 * Replaces the formula in the effect string with the evaluated number highlighted
 */
export function formatEffectWithSpellPower(effectText: string, spellPower: number): {
  textWithEvaluation: string;
  calculatedValue: number | null;
  formula: ParsedSpellFormula | null;
} {
  const formula = parseSpellFormula(effectText);
  if (!formula) {
    return { textWithEvaluation: effectText, calculatedValue: null, formula: null };
  }

  const calculatedValue = evaluateSpellFormula(formula, spellPower);
  const evaluationString = `${calculatedValue} ${formula.unit} (${formula.base} + ${formula.multiplier} × ${spellPower} SP)`;
  const textWithEvaluation = effectText.replace(formula.rawFormula, `[${evaluationString}]`);

  return {
    textWithEvaluation,
    calculatedValue,
    formula,
  };
}

/**
 * Computes calculations for all 4 levels of a recommended spell given current Spell Power
 */
export function calculateSpellAtSpellPower(spell: RecommendedSpell, spellPower: number): CalculatedSpell {
  const levels: CalculatedSpellLevel[] = spell.levels.map((lvl) => {
    const parsed = parseSpellFormula(lvl.effect);
    const calculatedValue = parsed ? evaluateSpellFormula(parsed, spellPower) : null;
    const manaEfficiency = calculatedValue && lvl.manaCost > 0 
      ? Math.round((calculatedValue / lvl.manaCost) * 10) / 10 
      : null;

    let formattedCalculation: string | null = null;
    if (parsed && calculatedValue !== null) {
      formattedCalculation = `${calculatedValue} ${parsed.unit} (${parsed.base} + ${parsed.multiplier} × ${spellPower} SP)`;
    }

    return {
      level: lvl.level,
      title: lvl.title,
      manaCost: lvl.manaCost,
      baseEffect: lvl.effect,
      keyBonus: lvl.keyBonus,
      hasFormula: !!parsed,
      calculatedValue,
      formula: parsed,
      manaEfficiency,
      formattedCalculation,
    };
  });

  const level4 = levels.find((l) => l.level === 4) || levels[levels.length - 1];
  const hasScaling = levels.some((l) => l.hasFormula);

  let primaryScalingType: CalculatedSpell['primaryScalingType'] = 'support';
  if (levels.some((l) => l.formula?.type === 'damage')) {
    primaryScalingType = 'damage';
  } else if (levels.some((l) => l.formula?.type === 'heal')) {
    primaryScalingType = 'heal';
  } else if (levels.some((l) => l.formula?.type === 'resurrection')) {
    primaryScalingType = 'resurrection';
  } else if (levels.some((l) => l.formula?.type === 'shield')) {
    primaryScalingType = 'shield';
  } else if (spell.type.includes('Control')) {
    primaryScalingType = 'control';
  }

  return {
    id: spell.id,
    name: spell.name,
    nameEn: spell.nameEn,
    tier: spell.tier,
    school: spell.school,
    type: spell.type,
    priority: spell.priority,
    levels,
    level4Damage: level4?.calculatedValue ?? null,
    level4Efficiency: level4?.manaEfficiency ?? null,
    hasScaling,
    primaryScalingType,
  };
}

/**
 * Canonical Schools of Jadame metadata with lore colors, sigil icons, and school identities
 */
export interface CanonicalSchoolMeta {
  id: string;
  name: string;
  nameEn: string;
  sigilName: string;
  primaryFaction: string[];
  color: string;
  bgLight: string;
  bgDark: string;
  borderColor: string;
  textColor: string;
  description: string;
  iconType: 'sun' | 'moon' | 'elemental' | 'arcane' | 'astral';
}

export const CANONICAL_MAGIC_SCHOOLS: CanonicalSchoolMeta[] = [
  {
    id: 'Luz',
    name: 'Magia de Luz',
    nameEn: 'Daylight Magic',
    sigilName: 'Sello Solar de Jadame',
    primaryFaction: ['Templo', 'Foresta'],
    color: '#F59E0B',
    bgLight: 'bg-amber-50 text-amber-950 border-amber-300',
    bgDark: 'bg-gradient-to-br from-amber-950/40 via-black/60 to-black/80 border-amber-500/50 text-amber-200',
    borderColor: 'border-amber-400',
    textColor: 'text-amber-400',
    description: 'Magia sagrada y solar de bendición, ceguera, represalias divinas y resurrección celestial.',
    iconType: 'sun',
  },
  {
    id: 'Nochesombra',
    name: 'Magia Nochesombra',
    nameEn: 'Nightshade Magic',
    sigilName: 'Sello Umbrío Abisal',
    primaryFaction: ['Necrópolis', 'Mazmorra', 'Cisma'],
    color: '#9333EA',
    bgLight: 'bg-purple-50 text-purple-950 border-purple-300',
    bgDark: 'bg-gradient-to-br from-purple-950/40 via-black/60 to-black/80 border-purple-500/50 text-purple-200',
    borderColor: 'border-purple-400',
    textColor: 'text-purple-400',
    description: 'Magia umbría y de maldición. Ralentiza, asfixia, reduce moral y alza tropas de cripta.',
    iconType: 'moon',
  },
  {
    id: 'Primigenia',
    name: 'Magia Primigenia',
    nameEn: 'Primal Magic',
    sigilName: 'Sello Elemental de la Tierra',
    primaryFaction: ['Foresta', 'Colmena', 'Mazmorra'],
    color: '#10B981',
    bgLight: 'bg-emerald-50 text-emerald-950 border-emerald-300',
    bgDark: 'bg-gradient-to-br from-emerald-950/40 via-black/60 to-black/80 border-emerald-500/50 text-emerald-200',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-400',
    description: 'Poder de los elementos primigenios: rayos perforantes, escarcha, piel de piedra y terremotos.',
    iconType: 'elemental',
  },
  {
    id: 'Arcana',
    name: 'Magia Arcana',
    nameEn: 'Arcane Magic',
    sigilName: 'Sello Cósmico de Distorsión',
    primaryFaction: ['Cisma', 'Mazmorra'],
    color: '#6366F1',
    bgLight: 'bg-indigo-50 text-indigo-950 border-indigo-300',
    bgDark: 'bg-gradient-to-br from-indigo-950/40 via-black/60 to-black/80 border-indigo-500/50 text-indigo-200',
    borderColor: 'border-indigo-400',
    textColor: 'text-indigo-400',
    description: 'Dominio de la pura energía mágica, distorsión espacio-temporal, teletransporte y Armagedón.',
    iconType: 'arcane',
  },
  {
    id: 'Neutral',
    name: 'Magia Universal & Aventura',
    nameEn: 'Universal / Adventure Magic',
    sigilName: 'Sello Astral de los Caminos',
    primaryFaction: ['Todas las Facciones'],
    color: '#06B6D4',
    bgLight: 'bg-cyan-50 text-cyan-950 border-cyan-300',
    bgDark: 'bg-gradient-to-br from-cyan-950/40 via-black/60 to-black/80 border-cyan-500/50 text-cyan-200',
    borderColor: 'border-cyan-400',
    textColor: 'text-cyan-400',
    description: 'Hechizos neutrales de mapa, portal de ciudad, exploración lejana y astrología de Jadame.',
    iconType: 'astral',
  },
];

/**
 * Canonical helper to check if a spell belongs to a given school ID,
 * supporting all canon aliases (e.g. Sombras / Nochesombra / Nightshade, Universal / Neutral / Aventura).
 */
export function matchSpellSchool(spellSchool: string, targetSchoolId: string): boolean {
  if (!targetSchoolId || targetSchoolId === 'all') return true;
  const s = spellSchool.toLowerCase();
  const t = targetSchoolId.toLowerCase();
  if (t === 'neutral' || t === 'universal' || t === 'aventura') {
    return s.includes('neutral') || s.includes('universal') || s.includes('aventura');
  }
  if (t === 'sombras' || t === 'nochesombra' || t === 'nightshade') {
    return s.includes('sombras') || s.includes('nochesombra') || s.includes('nightshade');
  }
  if (t === 'luz' || t === 'daylight' || t === 'light') {
    return s.includes('luz') || s.includes('daylight') || s.includes('light');
  }
  if (t === 'primigenia' || t === 'primal') {
    return s.includes('primigenia') || s.includes('primal');
  }
  if (t === 'arcana' || t === 'arcane') {
    return s.includes('arcana') || s.includes('arcane');
  }
  return s.includes(t);
}
