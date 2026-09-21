import type { HeroWithExtras } from '../../types';
import { DUNGEON_HEROES } from '../dungeonData';
import { TEMPLE_HEROES } from '../templeData';
import { ARBOLEDA_HEROES } from '../arboledaData';
import { NECROPOLIS_HEROES } from '../necropolisData';
import { ENJAMBRE_HEROES } from '../enjambreData';
import { CISMA_HEROES } from '../cismaData';

export type FactionIdentifier = 'Mazmorra' | 'Templo' | 'Foresta' | 'Necrópolis' | 'Colmena' | 'Cisma';

export const FACTION_HEROES_REGISTRY: Record<string, HeroWithExtras[]> = {
  Mazmorra: DUNGEON_HEROES,
  Templo: TEMPLE_HEROES,
  Foresta: ARBOLEDA_HEROES,
  Necrópolis: NECROPOLIS_HEROES,
  Colmena: ENJAMBRE_HEROES,
  Cisma: CISMA_HEROES,
};

/**
 * Custom Hero Registration (Permite añadir dinámicamente héroes en runtime o desde mods/archivos externos)
 */
const customRegisteredHeroes: Record<string, HeroWithExtras[]> = {};

export function registerCustomHeroes(faction: string, heroes: HeroWithExtras[]) {
  if (!customRegisteredHeroes[faction]) {
    customRegisteredHeroes[faction] = [];
  }
  customRegisteredHeroes[faction].push(...heroes);
}

/**
 * Obtiene los héroes de una facción combinando el catálogo base y las incorporaciones dinámicas
 */
export function getHeroesByFaction(faction: string): HeroWithExtras[] {
  const baseHeroes = FACTION_HEROES_REGISTRY[faction as FactionIdentifier] || FACTION_HEROES_REGISTRY.Mazmorra;
  const custom = customRegisteredHeroes[faction] || [];
  return [...baseHeroes, ...custom];
}

/**
 * Búsqueda global de héroe por ID en todo el catálogo
 */
export function findHeroById(heroId: string): HeroWithExtras | undefined {
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
