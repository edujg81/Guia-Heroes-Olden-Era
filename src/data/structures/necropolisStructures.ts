import { TownStructure } from '../../types';

export const NECROPOLIS_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (ROSTRO ETERNO) - MULTI-NIVEL (1 a 3)
  // =========================================================================
  {
    id: 'necropolis-eternal-visage',
    name: 'Rostro Eterno',
    nameEn: 'Eternal Visage',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 5000 },
    prerequisites: [],
    effects: [
      'Sede principal de la corona no-muerta y centro de canalización nigromántica.',
      'Otorga al reino oro, puntos de ley y puntos de astrología al día. Aumenta el límite de héroes (si lo permite el escenario)',
      'Se mejora a lo largo de 3 niveles cívicos (Rostro Eterno -> Rostro Eterno II -> Rostro Eterno III).'
    ],
    strategicTip: 'Mejora a Nivel II (Rostro Eterno II) en el Día 2 para acumular oro para las moradas de nigromancia.',
    timingRecommendation: 'Día 2-4 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Rostro Eterno',
        nameEn: 'Eternal Visage',
        cost: { gold: 5000 },
        prerequisites: [],
        effects: ['Otorga al reino 500 de oro, puntos de ley y puntos de astrología al día.', '+1 al límite de héroes.'],
        bonusIncome: '+500 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Asentamiento inicial básico.'
      },
      {
        level: 2,
        name: 'Nivel II: Rostro Eterno II',
        nameEn: 'Eternal Visage II',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Rostro Eterno'],
        effects: ['Otorga al reino 750 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora económica de nivel 1.'],
        bonusIncome: '+750 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Construir el Día 2 o 3 para acelerar la compra de tropas.'
      },
      {
        level: 3,
        name: 'Nivel III: Rostro Eterno III',
        nameEn: 'Eternal Visage III',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Rostro Eterno II'],
        effects: ['Otorga al reino 1000 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora de nivel 2.'],
        bonusIncome: '+1000 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Prioridad al inicio de la Semana 2.'
      }
    ]
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II y III)
  // =========================================================================
  {
    id: 'necropolis-fortifications',
    name: 'Fortificaciones',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Necrópolis',
    cost: { gold: 2500, wood: 0, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona una muralla durante los asedios.',
      'Permite al constructor elegir mejoras defensivas.',
      'Al mejorarse aumenta el crecimiento de tropas.'
    ],
    strategicTip: 'Mejorar a Fortificaciones II en el Día 7 para multiplicar la generación semanal de esqueletos y espectros.',
    timingRecommendation: 'Fortificaciones (Día 1) / Fortificaciones II (Día 7) / Fortificaciones III (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fortificaciones',
        nameEn: 'Bone Fort',
        cost: { gold: 2500, wood: 0, ore: 5 },
        prerequisites: [],
        effects: ['Proporciona una muralla durante los asedios.', 'Permite al constructor elegir una mejora defensiva de nivel 1.'],
        defenseBonus: 'Refuerzo de murallas, trampas o más salidas',
        growthBonus: '',
        strategicTip: 'Construir el Día 1 si no se inicia con él.'
      },
      {
        level: 2,
        name: 'Nivel II: Fortificaciones II',
        nameEn: 'Necrotic Citadel',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones'],
        effects: [
          'Añade dos torres a las almenas que disparan a los atacantes durante los asedios.',
          'Permite al constructor elegir una mejora defensiva de nivel 2.',
          'Aumenta la producción semanal de todas las tropas no-muertas en un +50% adicional.'
        ],
        defenseBonus: '2 Torres Defensivas',
        growthBonus: '+50% Crecimiento semanal de tropas',
        strategicTip: 'Construir el Día 7 de la Semana 1 para cosechar hordas el Día 8.'
      },
      {
        level: 3,
        name: 'Nivel III: Fortificaciones III',
        nameEn: 'Dread Castle',
        cost: { gold: 5000, wood: 0, ore: 15 },
        prerequisites: ['Nivel II: Fortificaciones II'],
        effects: [
          'Añade una gran torre más a las almenas que dispara a los atacantes durante los asedios y se asienta junto a la muralla.',
          'Permite al constructor elegir una mejora defensiva de nivel 3.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '1 Torre Defensiva',
        growthBonus: '+100% Crecimiento semanal de tropas (Duplica producción)',
        strategicTip: 'Multiplica la horda no-muerta exponencialmente.'
      }
    ]
  },

  // =========================================================================
  // COFRADÍA DE MAGOS DE LA OSCURIDAD - MULTI-NIVEL (1 a 5)
  // =========================================================================
  {
    id: 'necropolis-mage-guild',
    name: 'Cofradía de Magos de la Muerte (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Necrópolis',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio nigromántico consagrado a la magia de Sombras, Muerte, Tierra y Veneno.',
      'Enseña maleficios, maldiciones y drenajes de vida a lo largo de 5 niveles.',
      'Recarga el maná del héroe visitante al 100%.'
    ],
    strategicTip: 'El Nivel 2 es requisito directo para la Bóveda de la Oscuridad (Dragones de Hueso / Colosos).',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel 1: Círculo de Nigromantes',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Enseña 5 hechizos de Nivel 1 (Maldición, Drenar Maná, Flecha Sombría, etc.).', 'Otorga Libro de Hechizos.'],
        strategicTip: 'Requisito para Mansión Funeraria y Ciudadela.'
      },
      {
        level: 2,
        name: 'Nivel 2: Osario de Hechicería',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 4 },
        prerequisites: ['Nivel 1: Círculo de Nigromantes'],
        effects: ['Enseña 4 hechizos de Nivel 2 (Nube Tóxica, Lentitud, Descomposición, etc.).', 'Requisito para Tier 7.'],
        strategicTip: 'Construir antes del Día 6 para Tier 7 Rush.'
      },
      {
        level: 3,
        name: 'Nivel 3: Cámara de Maleficios',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 6 },
        prerequisites: ['Nivel 2: Osario de Hechicería'],
        effects: ['Enseña 3 hechizos de Nivel 3 (Animar Muertos, Rayo de Muerte, Plaga, etc.).'],
        strategicTip: 'Animar Muertos permite sostener batallas sin pérdidas permanentes.'
      },
      {
        level: 4,
        name: 'Nivel 4: Cónclave de las Sombras',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 8 },
        prerequisites: ['Nivel 3: Cámara de Maleficios'],
        effects: ['Enseña 2 hechizos de Nivel 4 (Onda Mortal, Cadenas del Alma, etc.).'],
        strategicTip: 'Onda Mortal daña a todos los vivos sin tocar a tus no-muertos.'
      },
      {
        level: 5,
        name: 'Nivel 5: Cima del Apocalipsis Fúnebre',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 10 },
        prerequisites: ['Nivel 4: Cónclave de las Sombras'],
        effects: ['Enseña 2 hechizos de Nivel 5 de máxima destrucción (Armagedón de Sombras, Extinción Masiva).'],
        strategicTip: 'Destrucción absoluta de ejércitos vivos.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS & ECONOMÍA
  // =========================================================================
  {
    id: 'necropolis-tavern',
    name: 'Taberna de los Condenados (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite contratar nuevos héroes nigromantes y caballeros de la muerte.',
      'Desbloquea la red de espionaje y rumores.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe que levante esqueletos por todo el territorio.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'necropolis-marketplace',
    name: 'Mercado de Almas (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite intercambiar recursos y oro.',
      'Mejora las tasas de cambio conforme se controlan más mercados.',
      'Permite canjear madera y mineral por Mercurio y Oro.'
    ],
    strategicTip: 'Construir en Semana 1 para canjear recursos por Mercurio para la Bóveda de la Oscuridad.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'necropolis-alchemical-depot',
    name: 'Depósito Alquímico de Mercurio (Alchemic Depot)',
    nameEn: 'Alchemic Depot',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 0, gems: 3, crystal: 3, mercury: 3 },
    prerequisites: ['Mercado de Almas (Marketplace)'],
    effects: [
      'Genera +1 Mercurio diario de forma pasiva (recurso raro principal de Necrópolis).',
      'Asegura el suministro continuo de mercurio para la Cofradía de Magos y criaturas de Tier 6-7.'
    ],
    strategicTip: 'Construir en cuanto se tengan 3 de cada recurso raro secundario.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CON MEJORAS Y DOBLE RAMA
  // =========================================================================
  {
    id: 'necropolis-crypt',
    name: 'Cripta (Crypt)',
    nameEn: 'Crypt',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 1,
    cost: { gold: 1250, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones I (Fuerte)'],
    unitRecruitedBase: 'Esqueleto (Skeleton)',
    unitRecruited: 'Esqueleto / Guerrero Esquelético',
    unitUpgrades: {
      branchA: 'Guerrero Esqueleto (Escudo de hueso y mayor absorción de daño)',
      branchB: 'Arquero Esqueleto (Ataque a distancia sin penalización de alcance)',
      branchADetails: {
        unitName: 'Guerrero Esqueleto (Skeleton Warrior)',
        role: 'Infantería de Choque y Bloqueo de Horda',
        keyAbilities: ['Escudo de Hueso (-25% daño de proyectiles)', 'Inmunidad a Sangrado y Veneno'],
        statsBonus: '+3 Defensa, +2 Vida'
      },
      branchBDetails: {
        unitName: 'Arquero Esqueleto (Skeleton Archer)',
        role: 'Tirador a Distancia Inmune al Miedo',
        keyAbilities: ['Disparo Esquelético (Sin penalización en lluvia)', 'Inmunidad a Moral Negativa'],
        statsBonus: '+3 Ataque a Distancia, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 no-muertas para formar la masa de la horda.',
      'Producción base: 15 unidades por semana (+50% con Ciudadela, +100% con Castillo).'
    ],
    strategicTip: 'Se complementa directamente con la habilidad pasiva de Nigromancia tras cada combate.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'necropolis-mausoleum',
    name: 'Mausoleo (Mausoleum)',
    nameEn: 'Mausoleum',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 2,
    cost: { gold: 1750, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1250, wood: 5 },
    prerequisites: ['Cripta (Crypt)'],
    unitRecruitedBase: 'Zombi (Zombie)',
    unitRecruited: 'Zombi / Mutante Putrefacto',
    unitUpgrades: {
      branchA: 'Zombi de la Peste (Contagia enfermedad reduciendo ataque y defensa enemigos)',
      branchB: 'Engendro Acorazado (Inmensa cantidad de vida y provocación)',
      branchADetails: {
        unitName: 'Zombi de la Peste (Plague Zombie)',
        role: 'Debilitador de Vanguardia',
        keyAbilities: ['Aura de Putrefacción (-2 Ataque y -2 Defensa al enemigo al golpear)', 'Inmune a Veneno'],
        statsBonus: '+4 Vida, +1 Ataque'
      },
      branchBDetails: {
        unitName: 'Engendro Putrefacto (Rotting Abomination)',
        role: 'Muro de Carne Absorbente',
        keyAbilities: ['Piel Necrótica (+35% Resistencia a daño físico)', 'Presencia Amenazante'],
        statsBonus: '+10 Vida, +4 Defensa'
      }
    },
    effects: [
      'Recluta tropas de Tier 2 con alto aguante de vida.',
      'Producción base: 8 unidades por semana.'
    ],
    strategicTip: 'Úsalos como pantalla defensiva para proteger a tus tiradores y nigromantes.',
    timingRecommendation: 'Día 2.',
  },
  {
    id: 'necropolis-barrow',
    name: 'Túmulo (Barrow)',
    nameEn: 'Barrow',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 3,
    cost: { gold: 2000, ore: 5, mercury: 3 },
    dwellingUpgradeCost: { gold: 1500, mercury: 2 },
    prerequisites: ['Mausoleo (Mausoleum)'],
    unitRecruitedBase: 'Espíritu / Espectro (Wight)',
    unitRecruited: 'Fantasma / Espectro Aullador',
    unitUpgrades: {
      branchA: 'Espectro Voraz (Regeneración pasiva al inicio de cada turno)',
      branchB: 'Poltergeist (Drena 2 puntos de maná al héroe enemigo por cada ataque)',
      branchADetails: {
        unitName: 'Espectro Voraz (Wraith)',
        role: 'Volador Etéreo Autoregenerable',
        keyAbilities: ['Cuerpo Etéreo (50% de probabilidad de esquivar ataques físicos)', 'Regeneración Espectral'],
        statsBonus: '+2 Velocidad, +2 Ataque'
      },
      branchBDetails: {
        unitName: 'Poltergeist Drenador (Mana Poltergeist)',
        role: 'Antimagia y Drenador de Maná',
        keyAbilities: ['Drenar Maná (-3 Maná al enemigo / +3 al héroe propio)', 'Incorpóreo'],
        statsBonus: '+2 Iniciativa, +3 Defensa'
      }
    },
    effects: [
      'Recluta unidades voladoras de Tier 3 con mecánica etérea.',
      'Producción base: 7 unidades por semana.'
    ],
    strategicTip: 'Su capacidad de esquivar daño físico los hace excelentes para absorber represalias enemigas.',
    timingRecommendation: 'Día 3.',
  },
  {
    id: 'necropolis-manor',
    name: 'Mansión Funeraria (Estate)',
    nameEn: 'Estate',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 4,
    cost: { gold: 2500, wood: 5, ore: 5, mercury: 5 },
    dwellingUpgradeCost: { gold: 2000, mercury: 3 },
    prerequisites: ['Túmulo (Barrow)', 'Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    unitRecruitedBase: 'Vampiro (Vampire)',
    unitRecruited: 'Vampiro / Señor Vampiro',
    unitUpgrades: {
      branchA: 'Señor Vampiro (Drena vida para resucitar tropas caídas en combate y sin contraataque)',
      branchB: 'Nosferatu (Inflige terror impidiendo que el enemigo actúe en su siguiente turno)',
      branchADetails: {
        unitName: 'Señor Vampiro (Vampire Lord)',
        role: 'Asesino Autoresucitable Implacable',
        keyAbilities: ['Robo de Vida (Cura y revive vampiros con el 100% del daño infligido)', 'Sin Contraataque Enemigo', 'Vuelo Veloz'],
        statsBonus: '+3 Ataque, +2 Velocidad, +5 Vida'
      },
      branchBDetails: {
        unitName: 'Nosferatu Acechador (Nosferatu Stalker)',
        role: 'Control de Masas y Terror',
        keyAbilities: ['Mirada de Terror (30% prob. de congelar al objetivo)', 'Golpe Paralizante'],
        statsBonus: '+4 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas de Tier 4 de máxima autosuficiencia.',
      'Producción base: 4 unidades por semana.'
    ],
    strategicTip: 'El Señor Vampiro es la mejor unidad del juego para limpiar mapas en solitario sin perder tropas.',
    timingRecommendation: 'Día 4.',
  },
  {
    id: 'necropolis-ossuary',
    name: 'Osario (Ossuary)',
    nameEn: 'Ossuary',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 5,
    cost: { gold: 4000, ore: 10, mercury: 5 },
    dwellingUpgradeCost: { gold: 2500, mercury: 4 },
    prerequisites: ['Mansión Funeraria (Estate)'],
    unitRecruitedBase: 'Sacerdote Funerario / Liche (Lich)',
    unitRecruited: 'Liche / Archimago No-Muerto',
    unitUpgrades: {
      branchA: 'Liche de la Plaga (Disparo de área en nube mortal sin dañar a no-muertos)',
      branchB: 'Archiliche Nigromante (Resucita esqueletos al derrotar unidades enemigas)',
      branchADetails: {
        unitName: 'Liche de la Plaga (Plague Lich)',
        role: 'Artillería Mágica en Área',
        keyAbilities: ['Nube Mortal (Daño a distancia en cruz de 5 casillas, no afecta a no-muertos)', 'Sin penalización a corta distancia'],
        statsBonus: '+4 Ataque a Distancia, +2 Daño Base'
      },
      branchBDetails: {
        unitName: 'Archiliche del Velo (Veil Archlich)',
        role: 'Invocador y Maleficiador',
        keyAbilities: ['Levantamiento Inmediato (Crea esqueletos temporales de cada baja enemiga)', 'Aura de Maldición'],
        statsBonus: '+3 Poder Mágico, +3 Defensa'
      }
    },
    effects: [
      'Recluta tiradores mágicos de Tier 5 con daño de área masivo.',
      'Producción base: 3 unidades por semana.'
    ],
    strategicTip: 'Colócalos junto a tus unidades no-muertas y dispara a los enemigos adyacentes sin miedo a fuego amigo.',
    timingRecommendation: 'Día 5.',
  },
  {
    id: 'necropolis-lab',
    name: 'Laboratorio Nigromántico (Necromantic Lab)',
    nameEn: 'Necromantic Lab',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 6,
    cost: { gold: 4500, ore: 10, mercury: 10 },
    dwellingUpgradeCost: { gold: 3500, mercury: 5 },
    prerequisites: ['Osario (Ossuary)'],
    unitRecruitedBase: 'Caballero Negro (Black Knight)',
    unitRecruited: 'Caballero Negro / Caballero de la Muerte',
    unitUpgrades: {
      branchA: 'Caballero de la Muerte (Probabilidad de Golpe Letal que duplica el daño e inflige maldición)',
      branchB: 'Señor del Terror (Aura que reduce en -2 la moral de todo el ejército enemigo)',
      branchADetails: {
        unitName: 'Caballero de la Muerte (Dread Knight)',
        role: 'Coloso de Choque y Daño Crítico Masivo',
        keyAbilities: ['Golpe Letal (20% prob. de infligir 200% de daño)', 'Maldición en cada impacto físico'],
        statsBonus: '+4 Ataque, +4 Defensa, +20 Vida'
      },
      branchBDetails: {
        unitName: 'Señor del Pavor (Terror Lord)',
        role: 'Destructor de Moral Enemiga',
        keyAbilities: ['Aura de Desesperación (-2 Moral al enemigo)', 'Impacto Implacable (Ignora 30% de defensa)'],
        statsBonus: '+5 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas de Tier 6 de asalto pesado.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'Una de las unidades Tier 6 más letales de todo Olden Era; puede destruir unidades enteras de un solo golpe crítico.',
    timingRecommendation: 'Día 6.',
  },
  {
    id: 'necropolis-vault-of-darkness',
    name: 'Bóveda de la Oscuridad (Vault of Darkness)',
    nameEn: 'Vault of Darkness',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 7,
    cost: { gold: 15000, wood: 10, ore: 10, mercury: 15 },
    dwellingUpgradeCost: { gold: 10000, mercury: 10 },
    prerequisites: ['Laboratorio Nigromántico (Necromantic Lab)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Dragón de Hueso (Bone Dragon)',
    unitRecruited: 'Dragón de Hueso / Dragón Fantasma',
    unitUpgrades: {
      branchA: 'Dragón Fantasma (Aura de envejecimiento que reduce a la mitad la vida máxima de la unidad enemiga)',
      branchB: 'Dragón de Ceniza (Aliento venenoso de 2 casillas con daño residual)',
      branchADetails: {
        unitName: 'Dragón Fantasma (Ghost Dragon)',
        role: 'Coloso Aéreo con Envejecimiento Decisivo',
        keyAbilities: ['Envejecimiento (20% prob. de reducir un 50% la vida máxima de todo el stack enemigo)', 'Aura de Terror (-1 Moral)', 'Vuelo Etéreo'],
        statsBonus: '+5 Ataque, +5 Defensa, +40 Vida, +3 Velocidad'
      },
      branchBDetails: {
        unitName: 'Dragón de Ceniza (Ash Dragon)',
        role: 'Coloso de Aliento Fúnebre',
        keyAbilities: ['Aliento Corrosivo de Hueso (Golpea 2 casillas en línea)', 'Inmunidad a Magia de Sombras'],
        statsBonus: '+7 Ataque, +50 Vida'
      }
    },
    effects: [
      'Recluta los dragones colosales de Tier 7 de la Necrópolis.',
      'Producción base: 1 unidad por semana (+1 con Castillo).'
    ],
    strategicTip: 'El aliento y la habilidad de envejecimiento del Dragón Fantasma liquidan a los colosos enemigos en un instante.',
    timingRecommendation: 'Semana 1 (Día 7) o Semana 2 (Día 1).',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (NECRÓPOLIS)
  // =========================================================================
  {
    id: 'necropolis-amplifier',
    name: 'Amplificador Nigromántico (Necromancy Amplifier)',
    nameEn: 'Necromancy Amplifier',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, mercury: 2 },
    prerequisites: ['Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    effects: [
      'Aumenta la habilidad de Nigromancia de todos los héroes aliados en un +10% permanente.',
      'Se acumula con los amplificadores de otras ciudades conquistadas.'
    ],
    strategicTip: 'Construir en cada ciudad Necrópolis que controles para multiplicar las hordas levantadas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-transformer',
    name: 'Transformador de Esqueletos (Skeleton Transformer)',
    nameEn: 'Skeleton Transformer',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 2000, ore: 5, mercury: 3 },
    prerequisites: ['Cripta (Crypt)'],
    effects: [
      'Permite convertir cualquier criatura viva o neutral capturada en Esqueletos (o Dragones de Hueso si se transforman dragones vivos).',
      'No tiene coste adicional de recursos para la conversión.'
    ],
    strategicTip: 'Recluta tropas neutrales no deseadas en el mapa y transfórmalas en hordas de esqueletos homogéneas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-shroud-of-darkness',
    name: 'Velo de las Tinieblas (Shroud of Darkness - Santo Grial)',
    nameEn: 'Shroud of Darkness',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 5000, ore: 10, mercury: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Bóveda de la Oscuridad (Vault of Darkness)'],
    effects: [
      'Estructura Suprema del Grial de la Necrópolis.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Oculta permanentemente el territorio de tu reino bajo una niebla de guerra perpetua para todos los enemigos y otorga +20% a Nigromancia.'
    ],
    strategicTip: 'Ciega por completo a los rivales e impide que rastreen tus movimientos en el mapa de campaña.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];
