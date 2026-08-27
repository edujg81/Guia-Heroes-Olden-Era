import { TownStructure } from '../types';
import { TEMPLE_STRUCTURES } from './structures/templeStructures';
import { NECROPOLIS_STRUCTURES } from './structures/necropolisStructures';
import { GROVE_STRUCTURES } from './structures/groveStructures';
import { HIVE_STRUCTURES } from './structures/hiveStructures';
import { SCHISM_STRUCTURES } from './structures/schismStructures';
import { DUNGEON_STRUCTURES } from './structures/dungeonStructures';

export const TOWN_STRUCTURES_DATA: TownStructure[] = [
  ...TEMPLE_STRUCTURES,
  ...NECROPOLIS_STRUCTURES,
  ...GROVE_STRUCTURES,
  ...HIVE_STRUCTURES,
  ...SCHISM_STRUCTURES,
  ...DUNGEON_STRUCTURES,
];

// Helper functions for easy consumption
export function getStructuresForFaction(factionName: string): TownStructure[] {
  switch (factionName) {
    case 'Templo':
      return TEMPLE_STRUCTURES;
    case 'Necrópolis':
      return NECROPOLIS_STRUCTURES;
    case 'Arboleda':
      return GROVE_STRUCTURES;
    case 'Enjambre':
      return HIVE_STRUCTURES;
    case 'Cisma':
      return SCHISM_STRUCTURES;
    case 'Mazmorra':
    default:
      return DUNGEON_STRUCTURES;
  }
}

export function getDwellingForTier(factionName: string, tier: number): TownStructure | undefined {
  const factionStructures = getStructuresForFaction(factionName);
  return factionStructures.find(
    (structure) =>
      structure.category === 'Moradas de Criaturas' &&
      structure.tier === tier
  );
}
