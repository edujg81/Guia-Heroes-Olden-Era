import { TownStructure } from '../../types';

export const DUNGEON_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (PALACIO BIZANTINO) - MULTI-NIVEL
  // =========================================================================
  {
    id: 'dungeon-byzantine-palace',
    name: 'Palacio Bizantino',
    nameEn: 'Byzantine Palace',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 5000 },
    prerequisites: [],
    effects: [
      'Sede señorial de los hechiceros oscuros y señores del inframundo.',
      'Otorga al reino oro, puntos de ley y puntos de astrología al día. Aumenta el límite de héroes (si lo permite el escenario)',
      'Se mejora a lo largo de 3 niveles cívicos (Palacio Bizantino -> Palacio Bizantino II -> Palacio Bizantino III).'
    ],
    strategicTip: 'Mejora a Nivel II (Palacio Bizantino II) en el Día 2 para acelerar el desarrollo hacia Minotauros y Dragones Negros.',
    timingRecommendation: 'Día 2-4 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Palacio Bizantino',
        nameEn: 'Byzantine Palace',
        cost: { gold: 0 },
        prerequisites: [],
        effects: ['Otorga al reino 500 de oro, puntos de ley y puntos de astrología al día.', '+1 al límite de héroes.'],
        bonusIncome: '+500 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Asentamiento subterráneo inicial básico.'
      },
      {
        level: 2,
        name: 'Nivel II: Palacio Bizantino II',
        nameEn: 'Byzantine Palace II',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Palacio Bizantino'],
        effects: ['Otorga al reino 750 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora económica de nivel 1.'],
        bonusIncome: '+750 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Construir el Día 2 o 3 para estabilizar las finanzas de la Mazmorra.'
      },
      {
        level: 3,
        name: 'Nivel III: Palacio Bizantino III',
        nameEn: 'Byzantine Palace III',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Palacio Bizantino II'],
        effects: ['Otorga al reino 1000 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora de nivel 2.'],
        bonusIncome: '+2.000 Oro / día',
        strategicTip: 'Prioridad máxima al inicio de la Semana 2.'
      }
    ]
  },

  // =========================================================================
  // FORTIFICACIONES (FUERTE / CIUDADELA MILITAR / CASTILLO) - MULTI-NIVEL
  // =========================================================================
  {
    id: 'dungeon-fortifications',
    name: 'Fortificaciones de la Mazmorra (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Mazmorra',
    cost: { gold: 1500, wood: 10, ore: 10 },
    prerequisites: [],
    effects: [
      'Murallas excavadas en roca viva con foso de magma volcánico.',
      'Habilita la construcción de todas las moradas de criaturas.',
      'Se mejora a Ciudadela Militar (+50% crecimiento de tropas y balista de azufre) y Castillo (+100% crecimiento y 3 torres de hechicería oscura).'
    ],
    strategicTip: 'Mejorar a Ciudadela en el Día 7 de la Semana 1 para aumentar la producción de tropas del primer reset semanal.',
    timingRecommendation: 'Fuerte (Día 1) / Ciudadela (Día 7) / Castillo (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fuerte Subterráneo (Fort)',
        nameEn: 'Underground Fort',
        cost: { gold: 1500, wood: 10, ore: 10 },
        prerequisites: [],
        effects: ['Otorga murallas defensivas de roca basáltica.', 'Habilita el mapa de asedio con foso de lava.', 'Requisito para construir todas las moradas de criaturas.'],
        defenseBonus: 'Murallas de Asedio + Foso de Magma básico',
        growthBonus: 'Habilita producción base de criaturas',
        strategicTip: 'Construir el Día 1 si no se inicia con él.'
      },
      {
        level: 2,
        name: 'Nivel II: Ciudadela del Inframundo (Citadel)',
        nameEn: 'Underworld Citadel',
        cost: { gold: 3000, ore: 5 },
        prerequisites: ['Nivel I: Fuerte Subterráneo (Fort)'],
        effects: [
          'Añade una Torre Central de Balista Volcánica que dispara bolas de fuego a los sitiadores cada ronda.',
          'Aumenta la producción semanal de todas las criaturas de la Mazmorra en un +50% adicional.'
        ],
        defenseBonus: 'Torre Central de Asedio con Balista Volcánica',
        growthBonus: '+50% Crecimiento semanal de tropas',
        strategicTip: 'Construir el Día 7 de la Semana 1.'
      },
      {
        level: 3,
        name: 'Nivel III: Castillo de Sombras (Castle)',
        nameEn: 'Shadow Castle',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Ciudadela del Inframundo (Citadel)', 'Nivel de Ciudad 12'],
        effects: [
          'Añade 2 Torres Laterales de Hechicería Oscura suplementarias.',
          'Refuerza las murallas con piedra negra irrompible y ensancha el foso con lava abrasadora.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '3 Torres Defensivas + Murallas Reforzadas + Foso de Lava Abrasadora',
        growthBonus: '+100% Crecimiento semanal de tropas (Duplica producción)',
        strategicTip: 'Esencial para duplicar la producción de Hidras y Dragones Negros.'
      }
    ]
  },

  // =========================================================================
  // COFRADÍA DE MAGOS DE LA MAZMORRA - MULTI-NIVEL (1 a 5)
  // =========================================================================
  {
    id: 'dungeon-mage-guild',
    name: 'Cofradía de Magos del Inframundo (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Mazmorra',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio arcano subterráneo consagrado a la magia de Sombras, Fuego, Tierra y Destrucción Pura.',
      'Enseña hechizos de implosión, meteoros y bolas de fuego a lo largo de 5 niveles.',
      'Recarga el maná del héroe visitante al 100%.'
    ],
    strategicTip: 'El Nivel 1 es requisito para Voces Silenciadas (Medusas); el Nivel 2 es requisito para el Palacio de las Cavernas (Dragones Negros).',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel 1: Cámara de Conjuros Oscuros',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Enseña 5 hechizos de Nivel 1 (Flecha Mágica, Maldición, Piel de Piedra, etc.).', 'Otorga Libro de Hechizos.'],
        strategicTip: 'Requisito para Voces Silenciadas y Ciudadela Cívica.'
      },
      {
        level: 2,
        name: 'Nivel 2: Círculo de Hechiceros Ctónicos',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 4 },
        prerequisites: ['Nivel 1: Cámara de Conjuros Oscuros'],
        effects: ['Enseña 4 hechizos de Nivel 2 (Rayo Relámpago, Celeridad, Bola de Fuego, etc.).', 'Requisito para Dragones Negros (Tier 7).'],
        strategicTip: 'Construir antes del Día 6 para Tier 7 Rush.'
      },
      {
        level: 3,
        name: 'Nivel 3: Sanctum de la Tierra Profunda',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 6 },
        prerequisites: ['Nivel 2: Círculo de Hechiceros Ctónicos'],
        effects: ['Enseña 3 hechizos de Nivel 3 (Lluvia de Meteoros, Animar Muertos, Escudo Ígneo).'],
        strategicTip: 'La Lluvia de Meteoros es devastadora en manos de hechiceros de Mazmorra.'
      },
      {
        level: 4,
        name: 'Nivel 4: Cónclave de la Magia Negra',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 8 },
        prerequisites: ['Nivel 3: Sanctum de la Tierra Profunda'],
        effects: ['Enseña 2 hechizos de Nivel 4 (Cadena de Relámpagos, Puerta Dimensional Menor).'],
        strategicTip: 'Cadena de Relámpagos y hechizos de asedio.'
      },
      {
        level: 5,
        name: 'Nivel 5: Abismo del Armagedón',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 10 },
        prerequisites: ['Nivel 4: Cónclave de la Magia Negra'],
        effects: ['Enseña 2 hechizos de Nivel 5 de máxima aniquilación (Armagedón, Implosión Pura).'],
        strategicTip: 'La combinación definitiva: Lanzar Armagedón con Dragones Negros inmunes a la magia.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS & ECONOMÍA
  // =========================================================================
  {
    id: 'dungeon-tavern',
    name: 'Taberna de los Gremios Clandestinos (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite contratar nuevos señores supremos (Overlords) y brujos de las profundidades.',
      'Desbloquea la red clandestina de espionaje.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe recolector inmediatamente.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'dungeon-marketplace',
    name: 'Mercado Negro Subterráneo (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite intercambiar recursos y oro en el mercado clandestino.',
      'Mejora las tasas de intercambio conforme se controlan más ciudades.',
      'Permite canjear madera y mineral por Gemas y Oro.'
    ],
    strategicTip: 'Construir en Semana 1 para canjear recursos por Gemas para el Palacio de las Cavernas.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'dungeon-alchemical-depot',
    name: 'Depósito Alquímico de Gemas (Alchemic Depot)',
    nameEn: 'Alchemic Depot',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 0, gems: 3, crystal: 3, mercury: 3 },
    prerequisites: ['Mercado Negro Subterráneo (Marketplace)'],
    effects: [
      'Genera +1 Gema diaria de forma pasiva (recurso raro principal de la Mazmorra).',
      'Asegura el suministro continuo de gemas para la Cofradía de Magos y Dragones Negros.'
    ],
    strategicTip: 'Construir en cuanto se tengan 3 de cada recurso raro secundario.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CON MEJORAS Y DOBLE RAMA
  // =========================================================================
  {
    id: 'dungeon-warren',
    name: 'Madriguera (Warren)',
    nameEn: 'Warren',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 1,
    cost: { gold: 1250, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones I (Fuerte)'],
    unitRecruitedBase: 'Troglodita (Troglodyte)',
    unitRecruited: 'Troglodita / Troglodita Infernal',
    unitUpgrades: {
      branchA: 'Troglodita Ciego (Inmunidad total a ceguera, mirada petrificante y control mental)',
      branchB: 'Troglodita Feroz (Garras venenosas con daño adicional a unidades aturdidas)',
      branchADetails: {
        unitName: 'Troglodita Ciego (Infernal Troglodyte)',
        role: 'Infantería Inmune a Efectos Oculares',
        keyAbilities: ['Ceguera Absoluta (Inmune a Cegar, Mirada de Medusa y Control Mental)', 'Sentido de Eco'],
        statsBonus: '+2 Defensa, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Troglodita Feroz (Feral Troglodyte)',
        role: 'Asaltante Ofensivo Rápido',
        keyAbilities: ['Garras Venenosas (Daño extra contra unidades con estados negativos)', 'Frenesí Subterráneo'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 inmunes a efectos de ceguera.',
      'Producción base: 14 unidades por semana (+50% con Ciudadela, +100% con Castillo).'
    ],
    strategicTip: 'Perfectos para enfrentarse a criaturas con habilidades de control ocular como Medusas o Gorgonas.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'dungeon-safehouse',
    name: 'Piso Franco (Safehouse)',
    nameEn: 'Safehouse',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 2,
    cost: { gold: 1750, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1250, wood: 5 },
    prerequisites: ['Madriguera (Warren)'],
    unitRecruitedBase: 'Acechador (Stalker)',
    unitRecruited: 'Acechador / Asesino de las Sombras',
    unitUpgrades: {
      branchA: 'Asesino de las Sombras (Invisibilidad en el primer turno y ataque crítico por la espalda)',
      branchB: 'Tirador Venenoso (Ataque a distancia con proyectiles de veneno paralizante)',
      branchADetails: {
        unitName: 'Asesino de las Sombras (Shadow Assassin)',
        role: 'Asesino Sigiloso de Flanqueo',
        keyAbilities: ['Invisibilidad Táctica (Invisible hasta atacar)', 'Puñalada Trapera (+50% daño si golpea por la espalda)'],
        statsBonus: '+4 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Tirador de Sombras (Shadow Sniper)',
        role: 'Tirador Envenenador a Distancia',
        keyAbilities: ['Dardos Envenenados (Aplica veneno de daño continuo)', 'Disparo sin penalización a rango medio'],
        statsBonus: '+3 Ataque a Distancia, +2 Defensa'
      }
    },
    effects: [
      'Recluta tropas de Tier 2 letales con capacidades de sigilo y veneno.',
      'Producción base: 9 unidades por semana.'
    ],
    strategicTip: 'Aprovecha su invisibilidad para rodear a los tiradores rivales y eliminarlos en un turno.',
    timingRecommendation: 'Día 2.',
  },
  {
    id: 'dungeon-amphitheatre',
    name: 'Anfiteatro (Amphitheatre)',
    nameEn: 'Amphitheatre',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 3,
    cost: { gold: 1000, ore: 5, gems: 2, crystal: 2, mercury: 2 },
    dwellingUpgradeCost: { gold: 1500, gems: 2 },
    prerequisites: ['Piso Franco (Safehouse)'],
    unitRecruitedBase: 'Arpía (Harpy)',
    unitRecruited: 'Arpía / Bruja Arpía',
    unitUpgrades: {
      branchA: 'Bruja Arpía (Ataque y regreso inmediato a la casilla de inicio sin contraataque)',
      branchB: 'Arpía Maliciosa (Grito ensordecedor que reduce la iniciativa y el ataque enemigo)',
      branchADetails: {
        unitName: 'Bruja Arpía (Harpy Hag)',
        role: 'Voladora Intocable de Ataque y Regreso',
        keyAbilities: ['Ataque y Regreso (Vuela, golpea y vuelve a su casilla original)', 'Sin Contraataque Enemigo'],
        statsBonus: '+3 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Arpía Chillona (Screeching Harpy)',
        role: 'Hostigadora de Control de Iniciativa',
        keyAbilities: ['Grito Aterrador (-20% Iniciativa al objetivo)', 'Ataque Rápido'],
        statsBonus: '+2 Velocidad, +3 Iniciativa, +4 Vida'
      }
    },
    effects: [
      'Recluta unidades voladoras de Tier 3 con la mejor movilidad táctica del juego.',
      'Producción base: 8 unidades por semana.'
    ],
    strategicTip: 'La Bruja Arpía puede debilitar a cualquier unidad enemiga cuerpo a cuerpo sin sufrir una sola baja.',
    timingRecommendation: 'Día 3.',
  },
  {
    id: 'dungeon-labyrinth',
    name: 'Laberinto (Labyrinth)',
    nameEn: 'Labyrinth',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 4,
    cost: { gold: 4000, wood: 5, ore: 10 },
    dwellingUpgradeCost: { gold: 2000, ore: 5 },
    prerequisites: ['Anfiteatro (Amphitheatre)'],
    unitRecruitedBase: 'Minotauro (Minotaur)',
    unitRecruited: 'Minotauro / Rey Minotauro',
    unitUpgrades: {
      branchA: 'Rey Minotauro (Moral siempre positiva que nunca baja de +1 y doble hachazo demoledor)',
      branchB: 'Minotauro Gladiador (Bloqueo de escudo y contragolpe con daño aumentado)',
      branchADetails: {
        unitName: 'Rey Minotauro (Minotaur King)',
        role: 'Infantería Pesada de Moral Inquebrantable',
        keyAbilities: ['Moral Suprema (Moral siempre positiva en mínimo +1)', 'Doble Hachazo Brutal', 'Fuerza Inmisericorde'],
        statsBonus: '+4 Ataque, +3 Defensa, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Gladiador de Laberinto (Labyrinth Gladiator)',
        role: 'Tanque Ofensivo de Represalia Devastadora',
        keyAbilities: ['Contragolpe Feroz (+30% daño en contraataque)', 'Escudo Pesado (-20% daño recibido)'],
        statsBonus: '+5 Defensa, +12 Vida'
      }
    },
    effects: [
      'Recluta la infantería pesada más consistente y letal de Tier 4.',
      'Producción base: 5 unidades por semana.'
    ],
    strategicTip: 'Su moral siempre positiva garantiza turnos dobles frecuentes y nunca sufre penalizadores de moral.',
    timingRecommendation: 'Día 4.',
  },
  {
    id: 'dungeon-stilled-voices',
    name: 'Voces Silenciadas (Stilled Voices)',
    nameEn: 'Stilled Voices',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 5,
    cost: { gold: 2250, wood: 5, gems: 3, crystal: 3, mercury: 3 },
    dwellingUpgradeCost: { gold: 2500, gems: 4 },
    prerequisites: ['Laberinto (Labyrinth)', 'Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    unitRecruitedBase: 'Medusa (Medusa)',
    unitRecruited: 'Medusa / Reina Medusa',
    unitUpgrades: {
      branchA: 'Reina Medusa (Mirada petrificante en cuerpo a cuerpo y disparos ilimitados sin penalización a corta distancia)',
      branchB: 'Medusa Hechicera (Flechas mágicas que lanzan maldiciones y agotan el maná enemigo)',
      branchADetails: {
        unitName: 'Reina Medusa (Medusa Queen)',
        role: 'Tiradora y Petrificadora en Combate Cercano',
        keyAbilities: ['Mirada Petrificante (25% prob. de petrificar en cuerpo a cuerpo por 3 turnos)', 'Sin penalización en combate cercano', 'Munición Ilimitada'],
        statsBonus: '+4 Ataque, +3 Defensa, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Medusa Arcana (Arcane Gorgon Queen)',
        role: 'Tiradora Maldita y Drenadora',
        keyAbilities: ['Flechas Malditas (Aplica Lentitud o Debilidad)', 'Drena 2 Maná por impacto a distancia'],
        statsBonus: '+3 Ataque a Distancia, +2 Poder Mágico'
      }
    },
    effects: [
      'Recluta tiradoras híbridas de Tier 5 temibles a cualquier distancia.',
      'Producción base: 4 unidades por semana.'
    ],
    strategicTip: 'Si los enemigos se acercan a atacarla cuerpo a cuerpo, la petrificación los dejará congelados 3 turnos.',
    timingRecommendation: 'Día 5.',
  },
  {
    id: 'dungeon-chthonic-home',
    name: 'Hogar Ctónico (Chthonic Home)',
    nameEn: 'Chthonic Home',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 6,
    cost: { gold: 4000, wood: 10, ore: 5, gems: 10 },
    dwellingUpgradeCost: { gold: 3500, gems: 5 },
    prerequisites: ['Voces Silenciadas (Stilled Voices)'],
    unitRecruitedBase: 'Hidra (Hydra)',
    unitRecruited: 'Hidra / Hidra del Caos',
    unitUpgrades: {
      branchA: 'Hidra del Caos (Ataque a todos los enemigos adyacentes a la vez sin recibir contraataque)',
      branchB: 'Hidra de Magma (Regeneración masiva al recibir daño de fuego y aliento de lava en cono)',
      branchADetails: {
        unitName: 'Hidra del Caos (Chaos Hydra)',
        role: 'Coloso de Área Múltiple Sin Represalia',
        keyAbilities: ['Ataque a Todos los Adyacentes (Golpea a todas las casillas circundantes)', 'Sin Contraataque Enemigo'],
        statsBonus: '+4 Ataque, +4 Defensa, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Hidra de Magma (Magma Hydra)',
        role: 'Tanque Volcánico Regenerativo',
        keyAbilities: ['Aliento de Lava en Cono (Daña a 3 casillas frontales)', 'Inmunidad al Fuego y Regenera con Hechizos Ígneos'],
        statsBonus: '+5 Ataque, +40 Vida'
      }
    },
    effects: [
      'Recluta monstruos gigantes de múltiples cabezas de Tier 6.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'Teletranspórtala al centro del ejército enemigo con magia para que sus múltiples cabezas destruyan varios stacks de un solo golpe.',
    timingRecommendation: 'Día 6.',
  },
  {
    id: 'dungeon-cavern-palace',
    name: 'Palacio de las Cavernas (Cavern Palace)',
    nameEn: 'Cavern Palace',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 7,
    cost: { gold: 15000, wood: 10, ore: 10, gems: 15 },
    dwellingUpgradeCost: { gold: 10000, gems: 10 },
    prerequisites: ['Hogar Ctónico (Chthonic Home)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Dragón Rojo (Red Dragon)',
    unitRecruited: 'Dragón Rojo / Dragón Negro',
    unitUpgrades: {
      branchA: 'Dragón Negro (Inmunidad total al 100% de la magia del juego y aliento de fuego abrasador de 2 casillas)',
      branchB: 'Dragón de las Sombras (Aura de oscuridad que potencia los hechizos de Sombras del héroe y vuelo veloz)',
      branchADetails: {
        unitName: 'Dragón Negro (Black Dragon)',
        role: 'Coloso Aéreo Supremo con Inmunidad Mágica Total',
        keyAbilities: ['Inmunidad Mágica Absoluta (100% inmune a todos los hechizos positivos y negativos)', 'Aliento de Fuego (Daña 2 casillas en línea)', 'Vuelo Veloz'],
        statsBonus: '+6 Ataque, +6 Defensa, +60 Vida, +3 Velocidad'
      },
      branchBDetails: {
        unitName: 'Dragón de las Sombras (Shadow Dragon)',
        role: 'Coloso Aéreo y Canalizador de Destrucción',
        keyAbilities: ['Aliento Corrosivo de Sombras (Reduce defensa en un 30%)', 'Aura de Hechicería Oscura (+25% daño de magia de Sombras)', 'Inmunidad a Hechizos de Nivel 1 a 4'],
        statsBonus: '+8 Ataque, +4 Velocidad, +50 Vida'
      }
    },
    effects: [
      'Recluta las criaturas legendarias colosales de Tier 7 de la Mazmorra.',
      'Producción base: 1 unidad por semana (+1 con Castillo).'
    ],
    strategicTip: 'La estrategia reina "Armageddon + Dragones Negros" te permite borrar del mapa a cualquier ejército enemigo sin recibir ni un solo rasguño.',
    timingRecommendation: 'Semana 1 (Día 7) o Semana 2 (Día 1).',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (MAZMORRA)
  // =========================================================================
  {
    id: 'dungeon-mana-vortex',
    name: 'Vórtice de Maná (Mana Vortex)',
    nameEn: 'Mana Vortex',
    category: 'Estructuras Especiales de Facción',
    faction: 'Mazmorra',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, gems: 3 },
    prerequisites: ['Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    effects: [
      'Duplica los puntos de Maná máximos del primer héroe aliado que visite la ciudad cada semana (ej: de 100 pasa a 200 de maná).',
      'El maná duplicado dura hasta que se consuma en batalla.'
    ],
    strategicTip: 'Visita el Vórtice de Maná cada Día 1 con tu héroe principal para lanzar hechizos de alto nivel sin límite.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'dungeon-battle-academy',
    name: 'Academia de Batalla Subterránea (Battle Academy)',
    nameEn: 'Battle Academy',
    category: 'Estructuras Especiales de Facción',
    faction: 'Mazmorra',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 10 },
    prerequisites: ['Laberinto (Labyrinth)'],
    effects: [
      'Otorga +1 Ataque y +1 Defensa permanente al primer héroe que la visite cada semana.',
      'Aumenta la fuerza de combate de Minotauros y Trogloditas en un +5%.'
    ],
    strategicTip: 'Visítala semanalmente para acumular estadísticas ofensivas monstruosas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'dungeon-lyceum',
    name: 'Liceo de las Sombras (Lyceum - Santo Grial)',
    nameEn: 'Lyceum',
    category: 'Estructuras Especiales de Facción',
    faction: 'Mazmorra',
    isFactionUnique: true,
    cost: { gold: 5000, wood: 5, ore: 10, gems: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Palacio de las Cavernas (Cavern Palace)'],
    effects: [
      'Estructura Suprema del Grial de la Mazmorra.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Aumenta el daño de todos los hechizos de Tierra y Fuego en un +25% y restaura +15 puntos de Maná tras ganar cualquier combate.'
    ],
    strategicTip: 'Ideal para potenciar Implosión, Lluvia de Meteoros y Armagedón tras descubrir el Grial.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];
