/**
 * Catálogo canónico de iconos de unidades y facciones para Heroes of Might and Magic: Olden Era.
 * Mapea nombres de unidades (castellano, inglés y unit_id) con sus respectivos assets de alta fidelidad.
 */

export interface UnitAssetEntry {
  unit_id: string;
  icon: string;
  visual_3d?: string;
  faction: string;
  faction_id: string;
  faction_image: string;
  nameEs: string;
  nameEn: string;
}

// Iconos canónicos oficiales de cada facción de Jadame
export const FACTION_ICONS: Record<string, string> = {
  // Mazmorra
  Mazmorra: '/src/assets/factions/icons/dungeon_icon.png',
  Dungeon: '/src/assets/factions/icons/dungeon_icon.png',
  dungeon: '/src/assets/factions/icons/dungeon_icon.png',

  // Templo
  Templo: '/src/assets/factions/icons/human_icon.png',
  Temple: '/src/assets/factions/icons/human_icon.png',
  human: '/src/assets/factions/icons/human_icon.png',

  // Foresta / Arboleda
  Foresta: '/src/assets/factions/icons/spring_icon.png',
  Arboleda: '/src/assets/factions/icons/spring_icon.png',
  Grove: '/src/assets/factions/icons/spring_icon.png',
  Sylvan: '/src/assets/factions/icons/spring_icon.png',
  nature: '/src/assets/factions/icons/spring_icon.png',

  // Necrópolis
  Necrópolis: '/src/assets/factions/icons/undead_icon.png',
  Necropolis: '/src/assets/factions/icons/undead_icon.png',
  undead: '/src/assets/factions/icons/undead_icon.png',

  // Colmena / Enjambre
  Colmena: '/src/assets/factions/icons/hive_icon.png',
  Enjambre: '/src/assets/factions/icons/hive_icon.png',
  Hive: '/src/assets/factions/icons/hive_icon.png',
  Swarm: '/src/assets/factions/icons/hive_icon.png',
  demon: '/src/assets/factions/icons/hive_icon.png',

  // Cisma
  Cisma: '/src/assets/factions/icons/unfrozen_icon.png',
  Schism: '/src/assets/factions/icons/unfrozen_icon.png',
  unfrozen: '/src/assets/factions/icons/unfrozen_icon.png',

  // Neutral
  Neutral: '/src/assets/factions/icons/unicorn.png',
  neutral: '/src/assets/factions/icons/unicorn.png',
};

/**
 * Obtiene la ruta al icono canónico de la facción
 */
export function getFactionIcon(faction: string): string {
  if (!faction) return '/src/assets/factions/icons/unicorn.png';
  return FACTION_ICONS[faction] || '/src/assets/factions/icons/unicorn.png';
}

/**
 * Tabla canónica de todas las unidades con su unit_id, ruta de imagen y nombres en ES / EN
 */
export const UNIT_ASSETS_CATALOG: UnitAssetEntry[] = [
  // Cisma / Schism
  { unit_id: 'unspeakable', icon: '/src/assets/icons/units/unspeakable.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Enviado abisal', nameEn: 'Abyssal Envoy' },
  { unit_id: 'unspeakable_upg', icon: '/src/assets/icons/units/unspeakable_upg.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Supervisor abisal', nameEn: 'Abyssal Overseer' },
  { unit_id: 'unspeakable_upg_alt', icon: '/src/assets/icons/units/unspeakable_upg_alt.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Ejecutor abisal', nameEn: 'Abyssal Executor' },
  { unit_id: 'frostworm_rider', icon: '/src/assets/icons/units/frostworm_rider.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: "Jinete de aga'shoth", nameEn: "Aga’Shoth Rider" },
  { unit_id: 'frostworm_rider_upg', icon: '/src/assets/icons/units/frostworm_rider_upg.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: "Domador de aga'shoth", nameEn: "Aga’Shoth Tamer" },
  { unit_id: 'frostworm_rider_upg_alt', icon: '/src/assets/icons/units/frostworm_rider_upg_alt.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: "Mat'ha aga'shoth", nameEn: "Aga’Shoth Mat’ha" },
  { unit_id: 'arbitrator', icon: '/src/assets/icons/units/arbitrator.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Árbitro', nameEn: 'Arbitrator' },
  { unit_id: 'arbitrator_upg', icon: '/src/assets/icons/units/arbitrator_upg.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Árbitro de la Grieta', nameEn: 'Rift Arbitrator' },
  { unit_id: 'arbitrator_upg_alt', icon: '/src/assets/icons/units/arbitrator_upg_alt.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Árbitro hinchado', nameEn: 'Bloated Arbitrator' },
  { unit_id: 'succubus', icon: '/src/assets/icons/units/succubus.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Cóncubo', nameEn: 'Concubus' },
  { unit_id: 'succubus_upg', icon: '/src/assets/icons/units/succubus_upg.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Señora de las cadenas', nameEn: 'Mistress of Chains' },
  { unit_id: 'succubus_upg_alt', icon: '/src/assets/icons/units/succubus_upg_alt.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Embrujadora', nameEn: 'Bewitcher' },
  { unit_id: 'unfrozen_cultist', icon: '/src/assets/icons/units/unfrozen_cultist.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Cultor', nameEn: 'Cultist' },
  { unit_id: 'unfrozen_cultist_upg', icon: '/src/assets/icons/units/unfrozen_cultist_upg.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Vinculador', nameEn: 'Binder' },
  { unit_id: 'unfrozen_cultist_upg_alt', icon: '/src/assets/icons/units/unfrozen_cultist_upg_alt.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Devoto', nameEn: 'Votary' },
  { unit_id: 'lesser_eldritch', icon: '/src/assets/icons/units/lesser_eldritch.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: "Ra'shoth", nameEn: "Ra’Shoth" },
  { unit_id: 'lesser_eldritch_upg', icon: '/src/assets/icons/units/lesser_eldritch_upg.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: "Ra'shoth punzante", nameEn: "Stinging Ra’Shoth" },
  { unit_id: 'lesser_eldritch_upg_alt', icon: '/src/assets/icons/units/lesser_eldritch_upg_alt.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: "Ra'shoth feroz", nameEn: "Ferocious Ra’Shoth" },
  { unit_id: 'eldritch_flyer', icon: '/src/assets/icons/units/eldritch_flyer.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Shoth majestuoso', nameEn: 'Grand Shoth' },
  { unit_id: 'eldritch_flyer_upg', icon: '/src/assets/icons/units/eldritch_flyer_upg.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Shoth innombrable', nameEn: 'Unspeakable Shoth' },
  { unit_id: 'eldritch_flyer_upg_alt', icon: '/src/assets/icons/units/eldritch_flyer_upg_alt.png', faction: 'Schism', faction_id: 'unfrozen', faction_image: '/src/assets/factions/icons/unfrozen_icon.png', nameEs: 'Shoth impensable', nameEn: 'Unthinkable Shoth' },

  // Templo / Temple
  { unit_id: 'angel', icon: '/src/assets/icons/units/angel.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Ángel', nameEn: 'Angel' },
  { unit_id: 'angel_upg', icon: '/src/assets/icons/units/angel_upg.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Arcángel', nameEn: 'Archangel' },
  { unit_id: 'angel_upg_alt', icon: '/src/assets/icons/units/angel_upg_alt.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Apoteosis', nameEn: 'Apotheosis' },
  { unit_id: 'esquire', icon: '/src/assets/icons/units/esquire.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Espadachín', nameEn: 'Swordsman' },
  { unit_id: 'esquire_upg', icon: '/src/assets/icons/units/esquire_upg.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Capitán de la guardia', nameEn: 'Guard Captain' },
  { unit_id: 'esquire_upg_alt', icon: '/src/assets/icons/units/esquire_upg_alt.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Égida del Sol', nameEn: "Sun’s Aegis" },
  { unit_id: 'crossbowman', icon: '/src/assets/icons/units/crossbowman.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Saetero', nameEn: 'Crossbowman' },
  { unit_id: 'crossbowman_upg', icon: '/src/assets/icons/units/crossbowman_upg.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Azorero', nameEn: 'Austringer' },
  { unit_id: 'crossbowman_upg_alt', icon: '/src/assets/icons/units/crossbowman_upg_alt.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Ballestero', nameEn: 'Marksman' },
  { unit_id: 'griffin', icon: '/src/assets/icons/units/griffin.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Grifo', nameEn: 'Griffin' },
  { unit_id: 'griffin_upg', icon: '/src/assets/icons/units/griffin_upg.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Grifo del Templo', nameEn: 'Temple Griffin' },
  { unit_id: 'griffin_upg_alt', icon: '/src/assets/icons/units/griffin_upg_alt.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Grifo guardián', nameEn: 'Guardian Griffin' },
  { unit_id: 'inquisitor', icon: '/src/assets/icons/units/inquisitor.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Inquisidor', nameEn: 'Inquisitor' },
  { unit_id: 'inquisitor_upg', icon: '/src/assets/icons/units/inquisitor_upg.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Madre superiora', nameEn: 'Mother Superior' },
  { unit_id: 'inquisitor_upg_alt', icon: '/src/assets/icons/units/inquisitor_upg_alt.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Excomulgador', nameEn: 'Excommunicator' },
  { unit_id: 'sunlight_cavalry', icon: '/src/assets/icons/units/sunlight_cavalry.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Caballería', nameEn: 'Cavalry' },
  { unit_id: 'sunlight_cavalry_upg', icon: '/src/assets/icons/units/sunlight_cavalry_upg.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Caballería noble', nameEn: 'Noble Cavalry' },
  { unit_id: 'sunlight_cavalry_upg_alt', icon: '/src/assets/icons/units/sunlight_cavalry_upg_alt.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Caballería de la Lanza del Sol', nameEn: 'Sunspear Cavalry' },
  { unit_id: 'lightweaver', icon: '/src/assets/icons/units/lightweaver.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Tejedora de Luz', nameEn: 'Lightweaver' },
  { unit_id: 'lightweaver_upg', icon: '/src/assets/icons/units/lightweaver_upg.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Hierofante', nameEn: 'Hierophant' },
  { unit_id: 'lightweaver_upg_alt', icon: '/src/assets/icons/units/lightweaver_upg_alt.png', faction: 'Temple', faction_id: 'human', faction_image: '/src/assets/factions/icons/human_icon.png', nameEs: 'Heraldo del Sol', nameEn: 'Sun Herald' },

  // Mazmorra / Dungeon
  { unit_id: 'trogl', icon: '/src/assets/icons/units/trogl.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Troglodita', nameEn: 'Troglodyte' },
  { unit_id: 'trogl_upg', icon: '/src/assets/icons/units/trogl_upg.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Troglodita infernal', nameEn: 'Infernal Troglodyte' },
  { unit_id: 'trogl_upg_alt', icon: '/src/assets/icons/units/trogl_upg_alt.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Troglodita tóxico', nameEn: 'Toxic Troglodyte' },
  { unit_id: 'assassin', icon: '/src/assets/icons/units/assassin.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Infiltrado', nameEn: 'Infiltrator' },
  { unit_id: 'assassin_upg', icon: '/src/assets/icons/units/assassin_upg.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Infiltrado astuto', nameEn: 'Guile Infiltrator' },
  { unit_id: 'assassin_upg_alt', icon: '/src/assets/icons/units/assassin_upg_alt.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Infiltrado lúgubre', nameEn: 'Bleak Infiltrator' },
  { unit_id: 'blade_dancer', icon: '/src/assets/icons/units/blade_dancer.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Bailarina de ónice', nameEn: 'Onyx Dancer' },
  { unit_id: 'blade_dancer_upg', icon: '/src/assets/icons/units/blade_dancer_upg.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Bailarina de jaspe', nameEn: 'Jasper Dancer' },
  { unit_id: 'blade_dancer_upg_alt', icon: '/src/assets/icons/units/blade_dancer_upg_alt.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Bailarina áurea', nameEn: 'Aureate Dancer' },
  { unit_id: 'minos', icon: '/src/assets/icons/units/minos.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Minotauro', nameEn: 'Minotaur' },
  { unit_id: 'minos_upg', icon: '/src/assets/icons/units/minos_upg.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Señor minotauro', nameEn: 'Minotaur Lord' },
  { unit_id: 'minos_upg_alt', icon: '/src/assets/icons/units/minos_upg_alt.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Minotauro de la Vanguardia', nameEn: 'Minotaur Vanguard' },
  { unit_id: 'medusa', icon: '/src/assets/icons/units/medusa.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Medusa', nameEn: 'Medusa' },
  { unit_id: 'medusa_upg', icon: '/src/assets/icons/units/medusa_upg.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Medusa escultora', nameEn: 'Medusa Sculptor' },
  { unit_id: 'medusa_upg_alt', icon: '/src/assets/icons/units/medusa_upg_alt.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Medusa reina', nameEn: 'Medusa Queen' },
  { unit_id: 'hydra', icon: '/src/assets/icons/units/hydra.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Hidra', nameEn: 'Hydra' },
  { unit_id: 'hydra_upg', icon: '/src/assets/icons/units/hydra_upg.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Hidra ctónica', nameEn: 'Chthonic Hydra' },
  { unit_id: 'hydra_upg_alt', icon: '/src/assets/icons/units/hydra_upg_alt.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Hidra infernal', nameEn: 'Infernal Hydra' },
  { unit_id: 'black_dragon', icon: '/src/assets/icons/units/black_dragon.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Dragón de cueva', nameEn: 'Cave Dragon' },
  { unit_id: 'black_dragon_upg', icon: '/src/assets/icons/units/black_dragon_upg.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Dragón negro', nameEn: 'Black Dragon' },
  { unit_id: 'black_dragon_upg_alt', icon: '/src/assets/icons/units/black_dragon_upg_alt.png', faction: 'Dungeon', faction_id: 'dungeon', faction_image: '/src/assets/factions/icons/dungeon_icon.png', nameEs: 'Dragón de ceniza', nameEn: 'Ashen Dragon' },

  // Necrópolis / Necropolis
  { unit_id: 'skeleton', icon: '/src/assets/icons/units/skeleton.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Esqueleto', nameEn: 'Skeleton' },
  { unit_id: 'skeleton_upg', icon: '/src/assets/icons/units/skeleton_upg.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Esqueleto guerrero', nameEn: 'Skeleton Warrior' },
  { unit_id: 'skeleton_upg_alt', icon: '/src/assets/icons/units/skeleton_upg_alt.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Esqueleto arquero', nameEn: 'Skeleton Archer' },
  { unit_id: 'flicker', icon: '/src/assets/icons/units/flicker.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Aparición', nameEn: 'Wight' },
  { unit_id: 'flicker_upg', icon: '/src/assets/icons/units/flicker_upg.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Espectro', nameEn: 'Wraith' },
  { unit_id: 'flicker_upg_alt', icon: '/src/assets/icons/units/flicker_upg_alt.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Fantasma', nameEn: 'Phantasm' },
  { unit_id: 'pet', icon: '/src/assets/icons/units/pet.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Mascota no muerta', nameEn: 'Undead Pet' },
  { unit_id: 'pet_upg', icon: '/src/assets/icons/units/pet_upg.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Barghest', nameEn: 'Barghest' },
  { unit_id: 'pet_upg_alt', icon: '/src/assets/icons/units/pet_upg_alt.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Sabueso blindado', nameEn: 'Armored Hound' },
  { unit_id: 'graverobber', icon: '/src/assets/icons/units/graverobber.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Ladrón de tumbas', nameEn: 'Graverobber' },
  { unit_id: 'graverobber_upg', icon: '/src/assets/icons/units/graverobber_upg.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Mercader de muerte', nameEn: 'Merchant of Death' },
  { unit_id: 'graverobber_upg_alt', icon: '/src/assets/icons/units/graverobber_upg_alt.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Maestro de perrera', nameEn: 'Kennelmaster' },
  { unit_id: 'lich', icon: '/src/assets/icons/units/lich.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Liche', nameEn: 'Lich' },
  { unit_id: 'lich_upg', icon: '/src/assets/icons/units/lich_upg.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Liche pestilente', nameEn: 'Pestilent Lich' },
  { unit_id: 'lich_upg_alt', icon: '/src/assets/icons/units/lich_upg_alt.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Liche sanguino', nameEn: 'Sanguine Lich' },
  { unit_id: 'vampire', icon: '/src/assets/icons/units/vampire.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Vampiro', nameEn: 'Vampire' },
  { unit_id: 'vampire_upg', icon: '/src/assets/icons/units/vampire_upg.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Señor vampiro', nameEn: 'Vampire Lord' },
  { unit_id: 'vampire_upg_alt', icon: '/src/assets/icons/units/vampire_upg_alt.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Vampiro erudito', nameEn: 'Vampire Scholar' },
  { unit_id: 'avatar_of_war', icon: '/src/assets/icons/units/avatar_of_war.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Caballero del terror', nameEn: 'Dread Knight' },
  { unit_id: 'avatar_of_war_upg', icon: '/src/assets/icons/units/avatar_of_war_upg.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Avatar de guerra', nameEn: 'Avatar of War' },
  { unit_id: 'avatar_of_war_upg_alt', icon: '/src/assets/icons/units/avatar_of_war_upg_alt.png', faction: 'Necropolis', faction_id: 'undead', faction_image: '/src/assets/factions/icons/undead_icon.png', nameEs: 'Segador vacuo', nameEn: 'Hollow Reaper' },

  // Foresta / Grove
  { unit_id: 'twinkle', icon: '/src/assets/icons/units/twinkle.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Lupuciérnaga', nameEn: 'Hoplet' },
  { unit_id: 'twinkle_upg', icon: '/src/assets/icons/units/twinkle_upg.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Lupuciérnaga del alba', nameEn: 'Dawn Hoplet' },
  { unit_id: 'twinkle_upg_alt', icon: '/src/assets/icons/units/twinkle_upg_alt.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Lupuciérnaga del ocaso', nameEn: 'Dusk Hoplet' },
  { unit_id: 'elf_tracker', icon: '/src/assets/icons/units/elf_tracker.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Fauno', nameEn: 'Faun' },
  { unit_id: 'elf_tracker_upg', icon: '/src/assets/icons/units/elf_tracker_upg.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Fauno arquero', nameEn: 'Faun Archer' },
  { unit_id: 'elf_tracker_upg_alt', icon: '/src/assets/icons/units/elf_tracker_upg_alt.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Fauno guerrero', nameEn: 'Faun Warrior' },
  { unit_id: 'ent', icon: '/src/assets/icons/units/ent.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Íriyad de enredadera', nameEn: 'Vine Iriyad' },
  { unit_id: 'ent_upg', icon: '/src/assets/icons/units/ent_upg.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Íriyad fúngico', nameEn: 'Fungal Iriyad' },
  { unit_id: 'ent_upg_alt', icon: '/src/assets/icons/units/ent_upg_alt.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Íriyad de cristal', nameEn: 'Crystal Iriyad' },
  { unit_id: 'aqualotl', icon: '/src/assets/icons/units/aqualotl.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Náyade', nameEn: 'Naiad' },
  { unit_id: 'aqualotl_upg', icon: '/src/assets/icons/units/aqualotl_upg.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Náyade vernal', nameEn: 'Vernal Naiad' },
  { unit_id: 'aqualotl_upg_alt', icon: '/src/assets/icons/units/aqualotl_upg_alt.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Náyade brumal', nameEn: 'Brumal Naiad' },
  { unit_id: 'druid', icon: '/src/assets/icons/units/druid.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Herbomante', nameEn: 'Herbomancer' },
  { unit_id: 'druid_upg', icon: '/src/assets/icons/units/druid_upg.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Esporamante', nameEn: 'Sporemancer' },
  { unit_id: 'druid_upg_alt', icon: '/src/assets/icons/units/druid_upg_alt.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Murmumante', nameEn: 'Murmurmancer' },
  { unit_id: 'qilin', icon: '/src/assets/icons/units/qilin.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Qilin', nameEn: 'Qilin' },
  { unit_id: 'qilin_upg', icon: '/src/assets/icons/units/qilin_upg.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Qilin de trueno', nameEn: 'Thunder Qilin' },
  { unit_id: 'qilin_upg_alt', icon: '/src/assets/icons/units/qilin_upg_alt.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Qilin de niebla', nameEn: 'Mist Qilin' },
  { unit_id: 'phoenix', icon: '/src/assets/icons/units/phoenix.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Fénix', nameEn: 'Phoenix' },
  { unit_id: 'phoenix_upg', icon: '/src/assets/icons/units/phoenix_upg.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Fénix llameante', nameEn: 'Flaming Phoenix' },
  { unit_id: 'phoenix_upg_alt', icon: '/src/assets/icons/units/phoenix_upg_alt.png', faction: 'Grove', faction_id: 'nature', faction_image: '/src/assets/factions/icons/spring_icon.png', nameEs: 'Fénix de energía', nameEn: 'Energy Phoenix' },

  // Colmena / Hive
  { unit_id: 'lava_larva', icon: '/src/assets/icons/units/lava_larva.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Larva de fuego', nameEn: 'Fire Larva' },
  { unit_id: 'trick_demon', icon: '/src/assets/icons/units/trick_demon.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Parásito', nameEn: 'Parasite' },
  { unit_id: 'trick_demon_upg', icon: '/src/assets/icons/units/trick_demon_upg.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Parásito guardián', nameEn: 'Warden Parasite' },
  { unit_id: 'trick_demon_upg_alt', icon: '/src/assets/icons/units/trick_demon_upg_alt.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Parásito asolador', nameEn: 'Ravager Parasite' },
  { unit_id: 'wasp', icon: '/src/assets/icons/units/wasp.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Avispón', nameEn: 'Hornet' },
  { unit_id: 'wasp_upg', icon: '/src/assets/icons/units/wasp_upg.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Cantor', nameEn: 'Chanter' },
  { unit_id: 'wasp_upg_alt', icon: '/src/assets/icons/units/wasp_upg_alt.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Aguijón', nameEn: 'Stinger' },
  { unit_id: 'locust', icon: '/src/assets/icons/units/locust.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Langosta', nameEn: 'Locust' },
  { unit_id: 'locust_upg', icon: '/src/assets/icons/units/locust_upg.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Langosta gigante', nameEn: 'Overgrown Locust' },
  { unit_id: 'locust_upg_alt', icon: '/src/assets/icons/units/locust_upg_alt.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Langosta cosechadora', nameEn: 'Harvester Locust' },
  { unit_id: 'jaw', icon: '/src/assets/icons/units/jaw.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Escorpio', nameEn: 'Scorpion' },
  { unit_id: 'jaw_upg', icon: '/src/assets/icons/units/jaw_upg.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Escorpión volcánico', nameEn: 'Volcanic Scorpion' },
  { unit_id: 'jaw_upg_alt', icon: '/src/assets/icons/units/jaw_upg_alt.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Escorpi\u00f3n cavernoso', nameEn: 'Spelaean Scorpion' },
  { unit_id: 'olgoi', icon: '/src/assets/icons/units/olgoi.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Verme', nameEn: 'Waurms' },
  { unit_id: 'olgoi_upg', icon: '/src/assets/icons/units/olgoi_upg.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Devorador', nameEn: 'Devourer' },
  { unit_id: 'olgoi_upg_alt', icon: '/src/assets/icons/units/olgoi_upg_alt.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Piróvoro', nameEn: 'Pyroboros' },
  { unit_id: 'godslayer', icon: '/src/assets/icons/units/godslayer.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Salteador', nameEn: 'Reaver' },
  { unit_id: 'godslayer_upg', icon: '/src/assets/icons/units/godslayer_upg.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Salteador amenazante', nameEn: 'Menacing Reaver' },
  { unit_id: 'godslayer_upg_alt', icon: '/src/assets/icons/units/godslayer_upg_alt.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Salteador maníaco', nameEn: 'Maniacal Reaver' },
  { unit_id: 'hive_queen', icon: '/src/assets/icons/units/hive_queen.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Reina de la Colmena', nameEn: 'Hive Queen' },
  { unit_id: 'hive_queen_upg', icon: '/src/assets/icons/units/hive_queen_upg.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Madre de la Colmena', nameEn: 'Hive Mother' },
  { unit_id: 'hive_queen_upg_alt', icon: '/src/assets/icons/units/hive_queen_upg_alt.png', faction: 'Hive', faction_id: 'demon', faction_image: '/src/assets/factions/icons/hive_icon.png', nameEs: 'Cazadora de la Colmena', nameEn: 'Hive Huntress' },

  // Neutrales
  { unit_id: 'animated_armor', icon: '/src/assets/icons/units/animated_armor.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Armadura animada', nameEn: 'Animated Armor' },
  { unit_id: 'avatar', icon: '/src/assets/icons/units/avatar.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Avatar', nameEn: 'Avatar' },
  { unit_id: 'coatl', icon: '/src/assets/icons/units/coatl.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Couatl', nameEn: 'Couatl' },
  { unit_id: 'dragon_hunter', icon: '/src/assets/icons/units/dragon_hunter.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Matadragones', nameEn: 'Dragonslayer' },
  { unit_id: 'dragon', icon: '/src/assets/icons/units/dragon.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Dragón', nameEn: 'Dragon' },
  { unit_id: 'dragon_upg', icon: '/src/assets/icons/units/dragon_upg.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Dragón Rojo', nameEn: 'Red Dragon' },
  { unit_id: 'fairy_dragon', icon: '/src/assets/icons/units/fairy_dragon.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Dragón feérico', nameEn: 'Faerie Dragon' },
  { unit_id: 'undead_peasant', icon: '/src/assets/icons/units/undead_peasant.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Necrófago', nameEn: 'Ghoul' },
  { unit_id: 'giant_frog', icon: '/src/assets/icons/units/giant_frog.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Sapo gigante', nameEn: 'Giant Toad' },
  { unit_id: 'gnat', icon: '/src/assets/icons/units/gnat.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Jején', nameEn: 'Gnat' },
  { unit_id: 'gorilla', icon: '/src/assets/icons/units/gorilla.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Grol', nameEn: 'Groll' },
  { unit_id: 'halfling', icon: '/src/assets/icons/units/halfling.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Mediano', nameEn: 'Halfling' },
  { unit_id: 'kitten_horn', icon: '/src/assets/icons/units/kitten_horn.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Cuernigato', nameEn: 'Kittenhorn' },
  { unit_id: 'lich_dragon', icon: '/src/assets/icons/units/lich_dragon.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Dragón liche', nameEn: 'Lich Dragon' },
  { unit_id: 'peasant', icon: '/src/assets/icons/units/peasant.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Campesino', nameEn: 'Peasant' },
  { unit_id: 'pixie', icon: '/src/assets/icons/units/pixie.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Pixie', nameEn: 'Pixie' },
  { unit_id: 'primal_remnant', icon: '/src/assets/icons/units/primal_remnant.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Remanente primigenio', nameEn: 'Primal Remnant' },
  { unit_id: 'sentinel', icon: '/src/assets/icons/units/sentinel.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Centinela de la gloria', nameEn: 'Sentinel of Glory' },
  { unit_id: 'star_child', icon: '/src/assets/icons/units/star_child.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Niña estrella', nameEn: 'Starchild' },
  { unit_id: 'unicorn', icon: '/src/assets/icons/units/unicorn.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Unicornio', nameEn: 'Unicorn' },
  { unit_id: 'mech_guard', icon: '/src/assets/icons/units/mech_guard.png', faction: 'Neutral', faction_id: 'neutral', faction_image: '/src/assets/factions/icons/unicorn.png', nameEs: 'Observador del mundo', nameEn: 'Worldwatcher' },
];

// Mapas rápidos para resolución O(1)
const NORM_MAP = new Map<string, UnitAssetEntry>();

function normalizeStr(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’\-_]/g, '')
    .trim();
}

UNIT_ASSETS_CATALOG.forEach((entry) => {
  NORM_MAP.set(normalizeStr(entry.nameEs), entry);
  NORM_MAP.set(normalizeStr(entry.nameEn), entry);
  NORM_MAP.set(normalizeStr(entry.unit_id), entry);
  if (entry.unit_id.includes('_')) {
    NORM_MAP.set(entry.unit_id.toLowerCase(), entry);
  }
});

/**
 * Resuelve la URL de la imagen de una unidad por su nombre (español o inglés) o su unit_id.
 */
export function getUnitIcon(nameOrId: string, fallbackEn?: string): string | undefined {
  if (!nameOrId) return undefined;

  const key1 = normalizeStr(nameOrId);
  if (NORM_MAP.has(key1)) {
    return NORM_MAP.get(key1)?.icon;
  }

  if (fallbackEn) {
    const key2 = normalizeStr(fallbackEn);
    if (NORM_MAP.has(key2)) {
      return NORM_MAP.get(key2)?.icon;
    }
  }

  // Comprobar si coincide con algún prefijo de unit_id
  for (const entry of UNIT_ASSETS_CATALOG) {
    if (key1.includes(normalizeStr(entry.nameEs)) || key1.includes(normalizeStr(entry.nameEn))) {
      return entry.icon;
    }
  }

  return undefined;
}
