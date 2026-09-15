import { UnitInfo, UnitVariant } from '../types';

/**
 * Extracts a normalized key representing the core identity of an ability.
 * Strips HTML tags, [Activa]/[Pasiva] prefixes, and normalizes colons/spacing.
 */
export function extractAbilityKey(abilityStr: string): string {
  if (!abilityStr) return '';
  // Strip HTML tags like <b>, </b>
  let s = abilityStr.replace(/<[^>]+>/g, '').trim();
  // Strip [Activa] or [Pasiva] tag prefixes
  s = s.replace(/^\[(activa|pasiva)\]\s*/i, '').trim();

  const colon = s.indexOf(':');
  if (colon !== -1) {
    const firstPart = s.slice(0, colon).trim();
    const secondPart = s.slice(colon + 1).trim();

    // Handle compound categories like "Estilo de lucha: Asalto sulfúrico", "Mirada del abismo: Lentitud", "Rito de invocación: Shoth"
    if (['estilo de lucha', 'mirada del abismo', 'rito de invocación'].includes(firstPart.toLowerCase())) {
      const secondColon = secondPart.indexOf(':');
      if (secondColon !== -1) {
        return (firstPart + ': ' + secondPart.slice(0, secondColon).trim()).toLowerCase();
      }
    }
    return firstPart.toLowerCase();
  }
  return s.toLowerCase();
}

export interface ParsedAbility {
  prefix?: string;
  title: string;
  description: string;
  raw: string;
}

/**
 * Parses an ability string into its prefix, title and description components.
 */
export function parseAbility(abilityStr: string): ParsedAbility {
  if (!abilityStr) {
    return { title: '', description: '', raw: '' };
  }

  let s = abilityStr.trim();
  let prefix: string | undefined = undefined;

  if (s.startsWith('[Activa]')) {
    prefix = '[Activa]';
    s = s.slice(8).trim();
  } else if (s.startsWith('[Pasiva]')) {
    prefix = '[Pasiva]';
    s = s.slice(8).trim();
  }

  const colon = s.indexOf(':');
  if (colon !== -1) {
    const firstPart = s.slice(0, colon).trim();
    const secondPart = s.slice(colon + 1).trim();

    // Compound prefix like "Estilo de lucha: Asalto sulfúrico"
    if (['estilo de lucha', 'mirada del abismo', 'rito de invocación'].includes(firstPart.toLowerCase())) {
      const secondColon = secondPart.indexOf(':');
      if (secondColon !== -1) {
        return {
          prefix,
          title: `${firstPart}: ${secondPart.slice(0, secondColon).trim()}`,
          description: secondPart.slice(secondColon + 1).trim(),
          raw: abilityStr,
        };
      }
    }

    return {
      prefix,
      title: firstPart,
      description: secondPart,
      raw: abilityStr,
    };
  }

  return {
    prefix,
    title: s,
    description: '',
    raw: abilityStr,
  };
}

/**
 * Checks whether an ability in a variant is exclusive to that specific variant
 * (i.e. neither of the other two variants in the same unit has this ability).
 */
export function isAbilityExclusiveToBranch(
  abilityStr: string,
  variantId: 'base' | 'branch_a' | 'branch_b',
  unit: UnitInfo
): boolean {
  if (!abilityStr || !unit || !unit.variants) return false;
  const targetKey = extractAbilityKey(abilityStr);

  const otherVariants: UnitVariant[] = [];
  if (variantId !== 'base' && unit.variants.base) {
    otherVariants.push(unit.variants.base);
  }
  if (variantId !== 'branch_a' && unit.variants.branchA) {
    otherVariants.push(unit.variants.branchA);
  }
  if (variantId !== 'branch_b' && unit.variants.branchB) {
    otherVariants.push(unit.variants.branchB);
  }

  for (const other of otherVariants) {
    if (!other.abilities) continue;
    for (const otherAb of other.abilities) {
      if (extractAbilityKey(otherAb) === targetKey) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Returns all abilities of a variant that are exclusive to that branch.
 */
export function getExclusiveAbilitiesForBranch(
  variantId: 'base' | 'branch_a' | 'branch_b',
  unit: UnitInfo
): string[] {
  if (!unit || !unit.variants) return [];
  const variant =
    variantId === 'base'
      ? unit.variants.base
      : variantId === 'branch_a'
      ? unit.variants.branchA
      : unit.variants.branchB;

  if (!variant || !variant.abilities) return [];

  return variant.abilities.filter((ab) =>
    isAbilityExclusiveToBranch(ab, variantId, unit)
  );
}
