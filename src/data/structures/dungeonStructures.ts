import { TownStructure } from '../../types';

export const DUNGEON_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO (AYUNTAMIENTO / ALCALDÍA CANÓNICA - 3 NIVELES)
  // =========================================================================
  {
    id: 'dungeon-byzantine-palace',
    name: 'Palacio Bizantino (Ayuntamiento / Alcaldía - Niveles I, II y III)',
    nameEn: 'Byzantine Palace (Town Hall / City Hall - Levels I, II & III)',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 2500 },
    prerequisites: [],
    effects: [
      'Sede señorial de los hechiceros oscuros y señores del inframundo estructurada en 3 niveles canónicos de desarrollo.',
      'Otorga Oro, Puntos de Ley y Puntos de Astrología diarios incrementales, expandiendo la administración de la ciudad y el límite de héroes activos.',
      'Al ascender a Nivel II permite elegir una mejora económica especializada (+1.000 Oro, +1.000 Ley o +1.000 Astrología), y el Nivel III (Palacio Bizantino III) consolida la metrópolis con la máxima producción cívica del reino.'
    ],
    strategicTip: 'Construir el Nivel II en Día 2-3 y ascender a Palacio Bizantino III en Semana 2 para sostener los altos costes de Minotauros y Dragones Negros.',
    timingRecommendation: 'Día 1 (Nivel I) / Día 2-3 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento de Alvar (Town Hall)',
        nameEn: 'Alvar Settlement (Town Hall)',
        cost: { gold: 2500 },
        prerequisites: [],
        effects: [
          'Genera 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite reclutar y gobernar la ciudad.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día',
        strategicTip: 'Base cívica inicial de la Mazmorra.'
      },
      {
        level: 2,
        name: 'Nivel II: Palacio Bizantino II (City Hall)',
        nameEn: 'Byzantine Palace II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Mercado (Marketplace)'],
        effects: [
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite al jugador seleccionar una de las 3 mejoras económicas de Nivel 2 (+1.000 Oro/día, +1.000 Puntos de Ley/día, o +1.000 Puntos de Astrología/día).'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día (+ mejora a elección)',
        strategicTip: 'Construir en los primeros turnos para estabilizar las finanzas de la Mazmorra.'
      },
      {
        level: 3,
        name: 'Nivel III: Palacio Bizantino III (Metropolis)',
        nameEn: 'Byzantine Palace III (Metropolis)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Palacio Bizantino II (City Hall)'],
        effects: [
          'Máxima cúspide del centro cívico de la Mazmorra en Olden Era.',
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología adicionales diarios para el reino.',
          'Consolida la administración metropolitana y el potencial económico completo de la ciudad subterránea.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día adicionales',
        strategicTip: 'Edificar en Semana 2 para garantizar un flujo continuo de oro y puntos cívicos para leyes avanzadas.'
      }
    ]
  },

  // =========================================================================
  // BANCO Y TESORERÍA (ECONOMÍA SUPREMA DE OLDEN ERA)
  // =========================================================================
  {
    id: 'dungeon-bank',
    name: 'Banco (Bank)',
    nameEn: 'Bank',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)', 'Palacio Bizantino (Ayuntamiento / Alcaldía)'],
    effects: [
      'Institución financiera que expande el flujo monetario de la Mazmorra.',
      'Genera +500 de Oro diario adicional y es prerrequisito indispensable para edificar la Tesorería.'
    ],
    strategicTip: 'Paso obligatorio para desbloquear la Tesorería y duplicar los ingresos pasivos.',
    timingRecommendation: 'Semana 1 (Día 5-6).',
  },
  {
    id: 'dungeon-treasury',
    name: 'Tesorería (Treasury)',
    nameEn: 'Treasury',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 5000, wood: 10, ore: 10 },
    prerequisites: ['Banco (Bank)', 'Mercado (Marketplace)', 'Fortificaciones (Fortifications)'],
    effects: [
      'Estructura económica suprema de Olden Era (equivalente canónico al Capitolio de la saga).',
      'Genera +2.000 de Oro diario adicional de forma permanente para el reino.',
      'Requiere haber consolidado el Banco, el Mercado y las Fortificaciones.'
    ],
    strategicTip: 'Garantiza la solvencia económica para reclutar Dragones Negros y comprar hechizos en el Observatorio Mágico cada semana.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II Y III)
  // =========================================================================
  {
    id: 'dungeon-fortifications',
    name: 'Fortificaciones (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Mazmorra',
    cost: { gold: 2500, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona murallas protectoras durante los asedios.',
      'Permite al constructor elegir mejoras defensivas (trampas, almenas y aspilleras).',
      'Al ascender a Niveles II y III incrementa masivamente el crecimiento de tropas (+50% y +100%).'
    ],
    strategicTip: 'Mejorar a Nivel II en el Día 7 de la Semana 1 para aumentar la producción de tropas del primer reset semanal.',
    timingRecommendation: 'Fortificaciones I (Día 1) / Fortificaciones II (Día 7) / Fortificaciones III (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fortificaciones (Fortifications)',
        nameEn: 'Fortifications I',
        cost: { gold: 2500, ore: 5 },
        prerequisites: [],
        effects: [
          'Proporciona una muralla defensiva durante los asedios.',
          'Permite elegir una mejora defensiva de nivel 1.'
        ],
        defenseBonus: 'Muralla perimetral de piedra',
        strategicTip: 'Construir el Día 1 si la ciudad no inicia fortificada.'
      },
      {
        level: 2,
        name: 'Nivel II: Fortificaciones II (Citadel)',
        nameEn: 'Fortifications II',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones (Fortifications)'],
        effects: [
          'Añade dos torres a las almenas que disparan automáticamente a los atacantes durante los asedios.',
          'Aumenta la producción semanal de todas las criaturas de la Mazmorra en un +50%.'
        ],
        defenseBonus: '2 Torres de disparo',
        growthBonus: '+50% Crecimiento semanal de criaturas',
        strategicTip: 'Construir el Día 7 de la Semana 1 sin falta.'
      },
      {
        level: 3,
        name: 'Nivel III: Fortificaciones III (Castle)',
        nameEn: 'Fortifications III',
        cost: { gold: 5000, ore: 15 },
        prerequisites: ['Nivel II: Fortificaciones II (Citadel)'],
        effects: [
          'Añade una gran torre central a las almenas con alcance total y mayor cadencia de disparo.',
          'Duplica el crecimiento semanal de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: 'Torre Central Mayor + foso subterráneo',
        growthBonus: '+100% Crecimiento semanal de criaturas (duplica producción)',
        strategicTip: 'Esencial para duplicar la producción de Hidras y Dragones Negros.'
      }
    ]
  },

  // =========================================================================
  // GREMIO DE MAGOS (MAGE GUILD I A V) & CONEXIÓN AL OBSERVATORIO MÁGICO
  // =========================================================================
  {
    id: 'dungeon-mage-guild',
    name: 'Gremio de Magos (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Mazmorra',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio arcano subterráneo interconectado con la red del Observatorio Mágico (Celestial Observatory).',
      'Desbloquea hechizos aleatorios de Tiers 1 a 5 en el Observatorio Mágico del reino.',
      'Cualquier héroe que visite la ciudad con Gremio de Magos aprende todos los hechizos desbloqueados y recarga su maná al 100%.'
    ],
    strategicTip: 'Construir Nivel 1 en Semana 1 para desbloquear hechizos y como requisito para moradas medias; Nivel 2 es requisito para el Palacio de las Cavernas.',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6) / Niveles 3-5 (Semanas 2-4).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Gremio de Magos Nivel 1',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Desbloquea hechizos de Nivel 1 en el Observatorio Mágico.', 'Otorga Libro de Hechizos y recarga maná al 100%.'],
        strategicTip: 'Requisito para Voces Silenciadas (Tier 5).'
      },
      {
        level: 2,
        name: 'Gremio de Magos Nivel 2',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 4 },
        prerequisites: ['Gremio de Magos Nivel 1'],
        effects: ['Desbloquea hechizos de Nivel 2 en el Observatorio Mágico.', 'Requisito para el Palacio de las Cavernas (Dragones Negros).'],
        strategicTip: 'Construir antes del Día 6 para Tier 7 Rush.'
      },
      {
        level: 3,
        name: 'Gremio de Magos Nivel 3',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 6 },
        prerequisites: ['Gremio de Magos Nivel 2'],
        effects: ['Desbloquea hechizos de Nivel 3 de las 5 escuelas canónicas en el Observatorio Mágico.'],
        strategicTip: 'Acceso a hechizos destructivos de área.'
      },
      {
        level: 4,
        name: 'Gremio de Magos Nivel 4',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 8 },
        prerequisites: ['Gremio de Magos Nivel 3'],
        effects: ['Desbloquea hechizos mayores de Nivel 4 en el Observatorio Mágico.'],
        strategicTip: 'Hechizos tácticos decisivos de late game.'
      },
      {
        level: 5,
        name: 'Gremio de Magos Nivel 5',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 10 },
        prerequisites: ['Gremio de Magos Nivel 4'],
        effects: ['Desbloquea hechizos supremos de Nivel 5 de máxima devastación.'],
        strategicTip: 'Magia de aniquilación absoluta combinada con la inmunidad mágica de los Dragones Negros.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS, COMERCIO Y DEPÓSITOS
  // =========================================================================
  {
    id: 'dungeon-tavern',
    name: 'Taberna (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite reclutar héroes adicionales (Overlords y Brujos) para explorar y recolectar en el mapa.',
      'Permite escuchar rumores de taberna e informes de inteligencia.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe recolector inmediatamente.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'dungeon-marketplace',
    name: 'Mercado (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 500, wood: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Permite intercambiar recursos y oro en el mercado subterráneo.',
      'Las tasas de intercambio mejoran conforme el jugador controla más Mercados en su reino.',
      'Permite canjear madera y mineral sobrante por Gemas raras.'
    ],
    strategicTip: 'Construir en Semana 1 para canjear recursos por Gemas para el Palacio de las Cavernas.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'dungeon-artifact-merchant',
    name: 'Comerciante de Artefactos (Artifact Merchant)',
    nameEn: 'Artifact Merchant',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)'],
    effects: [
      'Establece una tienda permanente de artefactos mágicos en la ciudad.',
      'Permite comprar y vender artefactos de distintos tiers para equipar a los comandantes de la Mazmorra.'
    ],
    strategicTip: 'Permite convertir oro excedente en artefactos de poder o vender objetos secundarios para financiar tropas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'dungeon-resource-silo',
    name: 'Silo de Recursos (Resource Silo)',
    nameEn: 'Resource Silo',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 0, crystal: 3, mercury: 3 },
    prerequisites: ['Mercado (Marketplace)', 'Banco (Bank)'],
    effects: [
      'Genera +1 Gema diaria de forma pasiva (recurso raro principal de la Mazmorra).',
      'Asegura el suministro continuo de gemas para la Cofradía de Magos y los Dragones Negros.'
    ],
    strategicTip: 'Requiere Mercado y Banco. Construir en cuanto se tengan 3 de cada recurso raro secundario para asegurar gemas continuas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'dungeon-alchemical-silo',
    name: 'Silo Alquímico (Alchemic Silo)',
    nameEn: 'Alchemic Silo',
    category: 'Cívica y Economía',
    faction: 'Mazmorra',
    cost: { gold: 2000, ore: 5, gems: 2 },
    prerequisites: ['Silo de Recursos (Resource Silo)'],
    effects: [
      'Produce Polvo Alquímico (Alchemical Dust) diariamente.',
      'El Polvo Alquímico es el recurso canónico esencial de Olden Era necesario para mejorar moradas de criaturas y ascender hechizos en el Observatorio Mágico.'
    ],
    strategicTip: 'Requiere el Silo de Recursos. Crucial para desbloquear las mejoras maestras de criaturas sin depender exclusivamente de depósitos en el mapa.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CANÓNICAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'dungeon-warren',
    name: 'Madriguera (Warren)',
    nameEn: 'Warren',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Troglodita (Troglodyte)',
    unitRecruited: 'Troglodita / Troglodita Ciego / Troglodita Feroz',
    unitUpgrades: {
      branchA: 'Troglodita Ciego (Inmunidad a ceguera, mirada petrificante y control mental)',
      branchB: 'Troglodita Feroz (Mayor ataque y frenesí subterráneo ofensivo)',
      branchADetails: {
        unitName: 'Troglodita Ciego',
        nameEn: 'Infernal Troglodyte',
        role: 'Infantería Inmune a Efectos Oculares',
        keyAbilities: ['Ceguera Absoluta (Inmune a Cegar y Mirada Petrificante)', 'Sentido de Eco'],
        statsBonus: '+2 Defensa, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Troglodita Feroz',
        nameEn: 'Feral Troglodyte',
        role: 'Asaltante Ofensivo Rápido',
        keyAbilities: ['Frenesí Subterráneo', 'Garras Afiladas'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 de la Mazmorra.',
      'Producción base: 14 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Unidades baratas e inmunes a ceguera ideales para absorber contraataques enemigos tempranos.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'dungeon-safe-house',
    name: 'Piso Franco (Safe House)',
    nameEn: 'Safe House',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Madriguera (Warren)'],
    unitRecruitedBase: 'Acechador (Stalker)',
    unitRecruited: 'Acechador / Sombra Subterránea / Asesino Oscuro',
    unitUpgrades: {
      branchA: 'Sombra Subterránea (Sigilo e invisibilidad inicial en el campo de batalla)',
      branchB: 'Asesino Oscuro (Ataques venenosos que ignoran un porcentaje de armadura)',
      branchADetails: {
        unitName: 'Sombra Subterránea',
        nameEn: 'Underground Shade',
        role: 'Emboscador Sigiloso',
        keyAbilities: ['Invisibilidad Temporal', 'Primer Golpe Sorpresa'],
        statsBonus: '+2 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Asesino Oscuro',
        nameEn: 'Dark Assassin',
        role: 'Flanqueador Venenoso',
        keyAbilities: ['Veneno Debilitante', 'Disparo de Ballesta Sigilosa'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta unidades de sigilo y escaramuza de Tier 2.',
      'Producción base: 9 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Esenciales para eliminar tiradores enemigos en combates tácticos sin recibir represalias.',
    timingRecommendation: 'Día 2-3.',
  },
  {
    id: 'dungeon-amphitheater',
    name: 'Anfiteatro (Amphitheater)',
    nameEn: 'Amphitheater',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 3,
    dwellingTier: 3,
    cost: { gold: 1500, ore: 5 },
    dwellingUpgradeCost: { gold: 1500, ore: 5 },
    prerequisites: ['Piso Franco (Safe House)'],
    unitRecruitedBase: 'Medusa',
    unitRecruited: 'Medusa / Medusa Petrificadora / Medusa Reina',
    unitUpgrades: {
      branchA: 'Medusa Petrificadora (Mirada petrificante de rango que paraliza a la víctima)',
      branchB: 'Medusa Reina (Tiradora de flechas venenosas con combate cuerpo a cuerpo sin penalización)',
      branchADetails: {
        unitName: 'Medusa Petrificadora',
        nameEn: 'Petrifying Medusa',
        role: 'Controladora de Masas',
        keyAbilities: ['Mirada Petrificante (20% prob. de petrificar al objetivo)', 'Sin penalización de combate cerrado'],
        statsBonus: '+3 Defensa, +5 Vida'
      },
      branchBDetails: {
        unitName: 'Medusa Reina',
        nameEn: 'Medusa Queen',
        role: 'Tiradora Pesada Letal',
        keyAbilities: ['Disparo Venenoso Perforante', 'Munición Expandida'],
        statsBonus: '+4 Ataque, +8 Disparos'
      }
    },
    effects: [
      'Recluta tropas tiradoras y de control de Tier 3.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La petrificación neutraliza colosos enemigos durante rondas enteras permitiendo concentrar daño.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'dungeon-labyrinth',
    name: 'Laberinto (Labyrinth)',
    nameEn: 'Labyrinth',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, ore: 10, gems: 2 },
    dwellingUpgradeCost: { gold: 2000, ore: 5, gems: 2 },
    prerequisites: ['Anfiteatro (Amphitheater)'],
    unitRecruitedBase: 'Minotauro (Minotaur)',
    unitRecruited: 'Minotauro / Minotauro Gladiador / Minotauro del Laberinto',
    unitUpgrades: {
      branchA: 'Minotauro Gladiador (Moral indomable permanente y contragolpe devastador)',
      branchB: 'Minotauro del Laberinto (Ataque en hendidura de hacha que golpea a tres casillas colindantes)',
      branchADetails: {
        unitName: 'Minotauro Gladiador',
        nameEn: 'Gladiator Minotaur',
        role: 'Infantería Pesada Inquebrantable',
        keyAbilities: ['Moral Indomable (Nunca sufre moral negativa)', 'Contragolpe Feroz (+25% daño de contragolpe)'],
        statsBonus: '+4 Ataque, +3 Defensa, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Minotauro del Laberinto',
        nameEn: 'Labyrinth Minotaur',
        role: 'Destructor de Área',
        keyAbilities: ['Hendidura de Hacha (Daña objetivos adyacentes)', 'Rompemuros'],
        statsBonus: '+5 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta la infantería pesada más consistente de la Mazmorra (Tier 4).',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Eje del ejército en combates de media partida; su moral positiva permanente garantiza ataques continuados.',
    timingRecommendation: 'Día 4-5 de la Semana 1.',
  },
  {
    id: 'dungeon-stilled-voices',
    name: 'Voces Silenciadas (Stilled Voices)',
    nameEn: 'Stilled Voices',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, ore: 10, gems: 4 },
    dwellingUpgradeCost: { gold: 3000, ore: 5, gems: 3 },
    prerequisites: ['Laberinto (Labyrinth)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Susurrador / Estrigoi (Whisperer / Strigoi)',
    unitRecruited: 'Susurrador / Estrigoi Sombrío / Espectro Ctónico',
    unitUpgrades: {
      branchA: 'Estrigoi Sombrío (Drenaje vampírico de vida y regeneración en combate)',
      branchB: 'Espectro Ctónico (Aura de silencio que anula conjuros enemigos en casillas colindantes)',
      branchADetails: {
        unitName: 'Estrigoi Sombrío',
        nameEn: 'Shadow Strigoi',
        role: 'Hostigador Vampírico',
        keyAbilities: ['Drenaje de Sangre', 'Vuelo Espectral'],
        statsBonus: '+4 Ataque, +15 Vida'
      },
      branchBDetails: {
        unitName: 'Espectro Ctónico',
        nameEn: 'Chthonic Wraith',
        role: 'Anti-Hechicero',
        keyAbilities: ['Aura de Silencio Arcano', 'Evasión de Ataques Físicos'],
        statsBonus: '+3 Defensa, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta criaturas espectrales voladoras de Tier 5.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Excelente movilidad para anular la hechicería enemiga y flanquear defensas.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'dungeon-chthonic-home',
    name: 'Hogar Ctónico (Chthonic Home)',
    nameEn: 'Chthonic Home',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, ore: 15, gems: 6 },
    dwellingUpgradeCost: { gold: 4000, ore: 10, gems: 4 },
    prerequisites: ['Voces Silenciadas (Stilled Voices)'],
    unitRecruitedBase: 'Hidra (Hydra)',
    unitRecruited: 'Hidra / Hidra del Caos / Hidra de las Profundidades',
    unitUpgrades: {
      branchA: 'Hidra del Caos (Ataque a todos los enemigos circundantes sin recibir contragolpe)',
      branchB: 'Hidra de las Profundidades (Regeneración de cabezas y daño corrosivo por turno)',
      branchADetails: {
        unitName: 'Hidra del Caos',
        nameEn: 'Chaos Hydra',
        role: 'Picadora Multicabezas de Melé',
        keyAbilities: ['Ataque a Todos los Enemigos Adyacentes', 'Sin Contragolpe Enemigo'],
        statsBonus: '+5 Ataque, +3 Defensa, +25 Vida'
      },
      branchBDetails: {
        unitName: 'Hidra de las Profundidades',
        nameEn: 'Deep Hydra',
        role: 'Tanque Regenerativo',
        keyAbilities: ['Regeneración de Cabezas (+20 HP/ronda)', 'Mordedura Ácida'],
        statsBonus: '+6 Defensa, +40 Vida'
      }
    },
    effects: [
      'Recluta los monstruos multicabezas de asedio de Tier 6.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Teletransportar a la Hidra en medio de tres pilas enemigas causa un destrozo masivo sin recibir represalias.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'dungeon-cave-palace',
    name: 'Palacio de las Cavernas (Cave Palace)',
    nameEn: 'Cave Palace',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 10000, ore: 20, gems: 10 },
    dwellingUpgradeCost: { gold: 8000, ore: 15, gems: 8 },
    prerequisites: ['Hogar Ctónico (Chthonic Home)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Dragón Rojo (Red Dragon)',
    unitRecruited: 'Dragón Rojo / Dragón Negro / Dragón de las Sombras',
    unitUpgrades: {
      branchA: 'Dragón Negro (Inmunidad total a toda la magia y aliento ígneo de 2 hexágonos)',
      branchB: 'Dragón de las Sombras (Aura de daño oscuro amplificada y reducción de defensa enemiga)',
      branchADetails: {
        unitName: 'Dragón Negro',
        nameEn: 'Black Dragon',
        role: 'Coloso Aéreo Supremo e Inmune a la Magia',
        keyAbilities: ['Inmunidad Mágica Total', 'Aliento de Fuego (Atraviesa 2 hexágonos)'],
        statsBonus: '+10 Ataque, +10 Defensa, +100 Vida'
      },
      branchBDetails: {
        unitName: 'Dragón de las Sombras',
        nameEn: 'Shadow Dragon',
        role: 'Destructor Arcano de Sombras',
        keyAbilities: ['Aliento de Sombras Corrosivo', 'Aura de Desesperación (-2 Moral enemiga)'],
        statsBonus: '+12 Ataque, +3 Iniciativa, +80 Vida'
      }
    },
    effects: [
      'Recluta los legendarios Dragones de Tier 7 de la Mazmorra.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'El Dragón Negro inmune a la magia permite la táctica clásica definitiva: lanzar hechizos destructivos de área sin dañar a tu vanguardia.',
    timingRecommendation: 'Final de Semana 1 (Tier 7 Rush) o inicio de Semana 2.',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (MAZMORRA) CONFIRMADAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'dungeon-gymnasium',
    name: 'Gimnasio (Gymnasium)',
    nameEn: 'Gymnasium',
    category: 'Estructuras Especiales de Facción',
    faction: 'Mazmorra',
    isFactionUnique: true,
    cost: { gold: 2500, ore: 10, gems: 2 },
    prerequisites: ['Palacio Bizantino (Ayuntamiento / Alcaldía)'],
    effects: [
      'Estructura de entrenamiento físico y marcial para los héroes de la Mazmorra.',
      'Otorga a cualquier héroe aliado que visite la ciudad una bonificación permanente de estadísticas físicas (Ataque y Defensa) o experiencia táctica.'
    ],
    strategicTip: 'Visitar obligatoriamente con el héroe principal y comandantes de apoyo para acumular poder marcial continuo.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'dungeon-grail-sanctuary',
    name: 'Santuario del Grial de la Mazmorra (Grail Sanctuary)',
    nameEn: 'Grail Sanctuary',
    category: 'Estructuras Especiales de Facción',
    faction: 'Mazmorra',
    isFactionUnique: true,
    cost: { gold: 0 },
    prerequisites: ['Descubrimiento del Santo Grial (Mirage)'],
    effects: [
      'Estructura suprema del Santo Grial para la Mazmorra (construida portando el Grial recuperado del Espejismo en el mapa).',
      'Genera +5.000 de Oro diario para el reino.',
      'Aumenta el crecimiento de todas las criaturas de la ciudad en un +100% adicional.'
    ],
    strategicTip: 'Construir en la ciudad con mayor desarrollo de moradas de dragones e hidras para duplicar la masa de tropas legendarias.',
    timingRecommendation: 'Al derrotar el Espejismo (Mirage).',
  },
];
