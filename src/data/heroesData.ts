import { DungeonHero } from '../types';
import { DUNGEON_HEROES } from './dungeonData';
import { TEMPLE_HEROES } from './templeData';
import { ARBOLEDA_HEROES } from './arboledaData';
import { NECROPOLIS_HEROES } from './necropolisData';
import { ENJAMBRE_HEROES } from './enjambreData';
import { CISMA_HEROES } from './cismaData';

export type FactionKey = 'Mazmorra' | 'Templo' | 'Arboleda' | 'Necrópolis' | 'Enjambre' | 'Cisma';

export interface FactionHeroesCollection {
  faction: FactionKey;
  factionId: string;
  totalHeroes: number;
  classes: {
    warriorClassName: string;
    mageClassName: string;
  };
  heroes: DungeonHero[];
}

export const ALL_HEROES_BY_FACTION: Record<FactionKey, DungeonHero[]> = {
  Mazmorra: DUNGEON_HEROES,
  Templo: TEMPLE_HEROES,
  Arboleda: ARBOLEDA_HEROES,
  Necrópolis: NECROPOLIS_HEROES,
  Enjambre: ENJAMBRE_HEROES,
  Cisma: CISMA_HEROES,
};

export const ALL_HEROES_FLAT_LIST: DungeonHero[] = [
  ...DUNGEON_HEROES,
  ...TEMPLE_HEROES,
  ...ARBOLEDA_HEROES,
  ...NECROPOLIS_HEROES,
  ...ENJAMBRE_HEROES,
  ...CISMA_HEROES,
];

export const getHeroesByFactionKey = (faction: FactionKey | string): DungeonHero[] => {
  return ALL_HEROES_BY_FACTION[faction as FactionKey] || DUNGEON_HEROES;
};

export const getHeroById = (heroId: string): DungeonHero | undefined => {
  return ALL_HEROES_FLAT_LIST.find(hero => hero.id === heroId);
};
