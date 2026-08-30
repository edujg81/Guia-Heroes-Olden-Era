import { DungeonHero } from '../../types';

// Import all faction heroes lists
import dungeonHeroes from './dungeon/heroes';
import templeHeroes from './temple/heroes';
import groveHeroes from './grove/heroes';
import necropolisHeroes from './necropolis/heroes';
import hiveHeroes from './hive/heroes';
import schismHeroes from './schism/heroes';

export type FactionIdentifier = 'Mazmorra' | 'Templo' | 'Foresta' | 'Arboleda' | 'Necrópolis' | 'Colmena' | 'Enjambre' | 'Cisma';

export const FACTION_HEROES_REGISTRY: Record<string, DungeonHero[]> = {
  Mazmorra: dungeonHeroes,
  Templo: templeHeroes,
  Foresta: groveHeroes,
  Arboleda: groveHeroes,
  Necrópolis: necropolisHeroes,
  Colmena: hiveHeroes,
  Enjambre: hiveHeroes,
  Cisma: schismHeroes,
};

/**
 * Custom Hero Registration (Permite añadir dinámicamente héroes en runtime o desde mods/archivos externos)
 */
const customRegisteredHeroes: Record<string, DungeonHero[]> = {};

export function registerCustomHeroes(faction: string, heroes: DungeonHero[]) {
  if (!customRegisteredHeroes[faction]) {
    customRegisteredHeroes[faction] = [];
  }
  customRegisteredHeroes[faction].push(...heroes);
}

/**
 * Obtiene los héroes de una facción combinando el catálogo base y las incorporaciones dinámicas
 */
export function getHeroesByFaction(faction: string): DungeonHero[] {
  const baseHeroes = FACTION_HEROES_REGISTRY[faction as FactionIdentifier] || FACTION_HEROES_REGISTRY.Mazmorra;
  const custom = customRegisteredHeroes[faction] || [];
  return [...baseHeroes, ...custom];
}

/**
 * Búsqueda global de héroe por ID en todo el catálogo
 */
export function findHeroById(heroId: string): DungeonHero | undefined {
  for (const list of Object.values(FACTION_HEROES_REGISTRY)) {
    const match = list.find(h => h.id === heroId);
    if (match) return match;
  }
  for (const list of Object.values(customRegisteredHeroes)) {
    const match = list.find(h => h.id === heroId);
    if (match) return match;
  }
  return undefined;
}
