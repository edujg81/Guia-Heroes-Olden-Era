import { HeroWithExtras } from './heroesDataProvider';
import { DUNGEON_HEROES } from './dungeonData';
import { TEMPLE_HEROES } from './templeData';
import { ARBOLEDA_HEROES } from './arboledaData';
import { NECROPOLIS_HEROES } from './necropolisData';
import { ENJAMBRE_HEROES } from './enjambreData';
import { CISMA_HEROES } from './cismaData';

export type FactionKey = 'Mazmorra' | 'Templo' | 'Foresta' | 'Necrópolis' | 'Colmena' | 'Cisma';

export interface FactionHeroesCollection {
  faction: FactionKey;
  factionId: string;
  totalHeroes: number;
  classes: {
    warriorClassName: string;
    mageClassName: string;
  };
  heroes: HeroWithExtras[];
}

export const ALL_HEROES_BY_FACTION: Record<string, HeroWithExtras[]> = {
  Mazmorra: DUNGEON_HEROES,
  Templo: TEMPLE_HEROES,
  Foresta: ARBOLEDA_HEROES,
  Necrópolis: NECROPOLIS_HEROES,
  Colmena: ENJAMBRE_HEROES,
  Cisma: CISMA_HEROES,
};

export const ALL_HEROES_FLAT_LIST: HeroWithExtras[] = [
  ...DUNGEON_HEROES,
  ...TEMPLE_HEROES,
  ...ARBOLEDA_HEROES,
  ...NECROPOLIS_HEROES,
  ...ENJAMBRE_HEROES,
  ...CISMA_HEROES,
];

export const getHeroesByFactionKey = (faction: FactionKey | string): HeroWithExtras[] => {
  return ALL_HEROES_BY_FACTION[faction as FactionKey] || DUNGEON_HEROES;
};

export const getHeroById = (heroId: string): HeroWithExtras | undefined => {
  return ALL_HEROES_FLAT_LIST.find(hero => hero.id === heroId);
};
