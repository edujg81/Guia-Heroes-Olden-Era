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
      'Estructura económica suprema de Olden Era (Tesorería / Bonificación Financiera de +2.000 Oro/día).',
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
    name: 'Cubil (Warren)',
    nameEn: 'Warren',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Troglodita (Troglodyte)',
    unitRecruited: 'Troglodita / Troglodita Infernal / Troglodita Tóxico',
    unitUpgrades: {
      branchA: 'Troglodita Infernal (Asalto ígneo, resistencia al fuego y sed de sangre)',
      branchB: 'Troglodita Tóxico (Garras emponzoñadas y nube tóxica cavernaria)',
      branchADetails: {
        unitName: 'Troglodita Infernal',
        nameEn: 'Infernal Troglodyte',
        role: 'Infantería Ofensiva Inmune a Efectos Oculares',
        keyAbilities: ['Sin Ojos (Inmunidad absoluta a Ceguera y Petrificación)', 'Piel Ígnea (50% resistencia a daño de Fuego)', 'Sed de Sangre'],
        statsBonus: '+2 Ataque, +1 Defensa, +2 Vida'
      },
      branchBDetails: {
        unitName: 'Troglodita Tóxico',
        nameEn: 'Toxic Troglodyte',
        role: 'Hostigador Emponzoñado',
        keyAbilities: ['Sin Ojos (Inmune a Ceguera y Petrificación)', 'Ataque Tóxico (Veneno acumulable)', 'Miasma Cavernario'],
        statsBonus: '+1 Ataque, +2 Defensa, +3 Vida'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 de la Mazmorra.',
      'Producción base: 15 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Unidades baratas e inmunes a ceguera ideales para absorber contraataques enemigos tempranos.',
    timingRecommendation: 'Preconstruido en capital / Día 1.',
  },
  {
    id: 'dungeon-safe-house',
    name: 'Refugio (Safehouse)',
    nameEn: 'Safehouse',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1500, wood: 5 },
    dwellingUpgradeCost: { gold: 1200, wood: 5 },
    prerequisites: ['Cubil (Warren)'],
    unitRecruitedBase: 'Infiltrador (Infiltrator)',
    unitRecruited: 'Infiltrador / Infiltrador Astuto / Infiltrador Sombrío',
    unitUpgrades: {
      branchA: 'Infiltrador Astuto (Mayor evasión, salto sombrío de mayor alcance y contraataque furtivo)',
      branchB: 'Infiltrador Sombrío (Ataque con veneno umbral y golpe traicionero por la espalda)',
      branchADetails: {
        unitName: 'Infiltrador Astuto',
        nameEn: 'Sly Infiltrator',
        role: 'Hostigador Evasivo de Salto Sombrío',
        keyAbilities: ['Salto Sombrío (Blink táctico)', 'Paso de Evasión (25% esquiva física)', 'Golpe Furtivo'],
        statsBonus: '+2 Ataque, +1 Velocidad, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Infiltrador Sombrío',
        nameEn: 'Umbral Infiltrator',
        role: 'Asesino de Retaguardia Venenoso',
        keyAbilities: ['Salto Sombrío (Blink táctico)', 'Filo de Sombra (Veneno que debilita al rival)', 'Emboscar Tiradores'],
        statsBonus: '+3 Ataque, +4 Vida'
      }
    },
    effects: [
      'Recluta unidades de asalto y salto táctico de Tier 2.',
      'Producción base: 9 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Su habilidad de Salto Sombrío (Blink) les permite flanquear y neutralizar tiradores enemigos desde el primer asalto.',
    timingRecommendation: 'Día 1 de la Semana 1.',
  },
  {
    id: 'dungeon-amphitheater',
    name: 'Anfiteatro (Amphitheatre)',
    nameEn: 'Amphitheatre',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 3,
    dwellingTier: 3,
    cost: { gold: 1000, ore: 5, gems: 2, crystal: 2, mercury: 2 },
    dwellingUpgradeCost: { gold: 1500, ore: 5, gems: 2 },
    prerequisites: ['Refugio (Safehouse)'],
    unitRecruitedBase: 'Bailarina de Ónice (Onyx Dancer)',
    unitRecruited: 'Bailarina de Ónice / Bailarina de Jaspe / Bailarina Áurea',
    unitUpgrades: {
      branchA: 'Bailarina de Jaspe (Doble golpe perforante que ignora el 30% de armadura y postura de torbellino)',
      branchB: 'Bailarina Áurea (Contraataque infinito sin límite de usos por ronda y postura de reflejo de daño)',
      branchADetails: {
        unitName: 'Bailarina de Jaspe',
        nameEn: 'Jasper Dancer',
        role: 'Duelista Ofensiva Rompe-Líneas',
        keyAbilities: ['Danza de Espadas (Doble impacto consecutivo)', 'Postura de Torbellino (Golpea 2 casillas adyacentes)', 'Ignora 30% Armadura'],
        statsBonus: '+3 Ataque, +1 Velocidad, +2 Iniciativa, +5 Vida'
      },
      branchBDetails: {
        unitName: 'Bailarina Áurea',
        nameEn: 'Aureate Dancer',
        role: 'Duelista Defensiva con Contraataque Infinito',
        keyAbilities: ['Danza de Espadas (Doble golpe consecutivo)', 'Contraataque Infinito (Responde a todos los ataques de melé)', 'Postura de Reflejo (50% reflejo de daño)'],
        statsBonus: '+1 Ataque, +4 Defensa, +9 Vida'
      }
    },
    effects: [
      'Recluta duelistas ágiles de doble hoja de Tier 3.',
      'Producción base: 7 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La Danza de Espadas asesta dos impactos completos por orden de ataque; letal tras agotar la represalia enemiga con Trogloditas.',
    timingRecommendation: 'Día 3 de la Semana 1.',
  },
  {
    id: 'dungeon-labyrinth',
    name: 'Laberinto (Labyrinth)',
    nameEn: 'Labyrinth',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 4000, wood: 5, ore: 10 },
    dwellingUpgradeCost: { gold: 3000, ore: 5, gems: 2 },
    prerequisites: ['Refugio (Safehouse)'],
    unitRecruitedBase: 'Minotauro (Minotaur)',
    unitRecruited: 'Minotauro / Señor Minotauro / Vanguardia Minotauro',
    unitUpgrades: {
      branchA: 'Señor Minotauro (Furia creciente con +10% de daño acumulable por ronda y aura de señorío aliada)',
      branchB: 'Vanguardia Minotauro (Carga rompedora que aturde al objetivo y destruye el 50% de la armadura enemiga)',
      branchADetails: {
        unitName: 'Señor Minotauro',
        nameEn: 'Minotaur Lord',
        role: 'Choque Pesado con Daño Escalonado y Aura',
        keyAbilities: ['Moral Implacable (Inmune a miedo y turnos dobles frecuentes)', 'Furia Creciente (+10% daño acumulable por asalto)', 'Aura de Señorío (+1 Moral, +2 Ataque a tropas adyacentes)'],
        statsBonus: '+4 Ataque, +3 Defensa, +10 Vida, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Vanguardia Minotauro',
        nameEn: 'Minotaur Vanguard',
        role: 'Ariete Demoledor Rompe-Blindajes',
        keyAbilities: ['Moral Implacable', 'Carga Rompedora (Aturde 1 ronda)', 'Fractura de Blindaje (-50% armadura enemiga permanente)'],
        statsBonus: '+2 Ataque, +5 Defensa, +17 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta la infantería pesada más temida y consistente de la Mazmorra (Tier 4).',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Eje central del ejército; su Moral Implacable garantiza moral positiva permanente y turnos dobles de alta frecuencia.',
    timingRecommendation: 'Día 4 de la Semana 1.',
  },
  {
    id: 'dungeon-stilled-voices',
    name: 'Voces Silenciadas (Stilled Voices)',
    nameEn: 'Stilled Voices',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 2250, wood: 5, gems: 3, crystal: 3, mercury: 3 },
    dwellingUpgradeCost: { gold: 3000, wood: 5, gems: 3 },
    prerequisites: ['Anfiteatro (Amphitheatre)', 'Laberinto (Labyrinth)'],
    unitRecruitedBase: 'Medusa',
    unitRecruited: 'Medusa / Bruja Medusa / Emperatriz Medusa',
    unitUpgrades: {
      branchA: 'Bruja Medusa (10 disparos de munición, flechas venenosas y sin penalización por distancia lejana)',
      branchB: 'Emperatriz Medusa (Petrificación garantizada 100% en primer asalto cuerpo a cuerpo y aura de ralentización)',
      branchADetails: {
        unitName: 'Bruja Medusa',
        nameEn: 'Medusa Witch',
        role: 'Tiradora Francotiradora y Venenosa',
        keyAbilities: ['Proyectil Venenoso (10 disparos)', 'Sin Penalización en Melé', 'Petrificación Mejorada (30% a distancia, 40% en melé)', 'Sin Penalización de Distancia'],
        statsBonus: '+4 Ataque, +2 Defensa, +10 Vida, +4 Disparos'
      },
      branchBDetails: {
        unitName: 'Emperatriz Medusa',
        nameEn: 'Medusa Empress',
        role: 'Controladora de Masas de Melé y Aura Ralentizadora',
        keyAbilities: ['Petrificación Certera (100% prob. en primer golpe melé)', 'Aura de Serpientes (-3 Velocidad a enemigos cercanos)', 'Escamas Pétreas (-20% daño de proyectiles recibidos)'],
        statsBonus: '+2 Ataque, +5 Defensa, +18 Vida, +2 Disparos'
      }
    },
    effects: [
      'Recluta tiradoras arcanas con control de masas por petrificación de Tier 5.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La petrificación inhabilita colosos enemigos durante rondas enteras; luchan cuerpo a cuerpo sin penalización.',
    timingRecommendation: 'Día 6 de la Semana 1 (¡Tier 5 antes de Fortificaciones II!).',
  },
  {
    id: 'dungeon-chthonic-home',
    name: 'Hogar Ctónico (Chthonic Home)',
    nameEn: 'Chthonic Home',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 4000, wood: 10, ore: 5, gems: 10 },
    dwellingUpgradeCost: { gold: 4500, ore: 10, gems: 6 },
    prerequisites: ['Voces Silenciadas (Stilled Voices)'],
    unitRecruitedBase: 'Hidra (Hydra)',
    unitRecruited: 'Hidra / Hidra Abisal / Hidra Ctónica',
    unitUpgrades: {
      branchA: 'Hidra Abisal (Mordisco vampírico con 35% de succión de vida y regeneración ctónica de +20 HP/ronda)',
      branchB: 'Hidra Ctónica (Aliento de ácido negro permanente que destruye 4 de armadura acumulable y 20% prob. de aturdimiento)',
      branchADetails: {
        unitName: 'Hidra Abisal',
        nameEn: 'Abyssal Hydra',
        role: 'Vanguardia Vampírica Multicabezas',
        keyAbilities: ['Ataque 360º a Todos los Adyacentes', 'Sin Contraataque Rival', 'Mordisco Vampírico (35% succión de vida)', 'Regeneración Ctónica (+20 HP/ronda)'],
        statsBonus: '+4 Ataque, +4 Defensa, +35 Vida, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Hidra Ctónica',
        nameEn: 'Chthonic Hydra',
        role: 'Tanque Corrosivo de Máxima Resistencia',
        keyAbilities: ['Ataque 360º a Todos los Adyacentes', 'Sin Contraataque Rival', 'Aliento de Ácido Negro (-4 Defensa permanente acumulable)', 'Cola Demoledora (20% prob. aturdir)'],
        statsBonus: '+2 Ataque, +7 Defensa, +50 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta los monstruos multicabezas de asedio de Tier 6.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Teletransportar a la Hidra en medio de la formación enemiga causa una devastación masiva en 360º sin recibir represalias.',
    timingRecommendation: 'Semana 2 o Día 15 de la Semana 3.',
  },
  {
    id: 'dungeon-cave-palace',
    name: 'Palacio de las Cavernas (Cave Palace)',
    nameEn: 'Cave Palace',
    category: 'Moradas de Criaturas',
    faction: 'Mazmorra',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 17500, wood: 5, ore: 5, gems: 20 },
    dwellingUpgradeCost: { gold: 12000, ore: 15, gems: 12 },
    prerequisites: ['Laberinto (Labyrinth)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Dragón de Cueva (Cave Dragon)',
    unitRecruited: 'Dragón de Cueva / Dragón Negro / Dragón de Ceniza',
    unitUpgrades: {
      branchA: 'Dragón Negro (Inmunidad absoluta a toda la magia del Nivel 1 al 5, aliento ígneo devastador de 2 casillas y habilitador de Drago-Armageddon)',
      branchB: 'Dragón de Ceniza (Aliento de cenizas sofocantes que ciega objetivos y nube debilitante de área)',
      branchADetails: {
        unitName: 'Dragón Negro',
        nameEn: 'Black Dragon',
        role: 'Apex Supremo Inmune a la Magia',
        keyAbilities: ['Inmunidad Mágica Absoluta (Nv 1-5, inmune a Armageddon)', 'Aliento Ígneo Devastador (Penetra 2 casillas)', 'Odio Titánico (+50% daño vs T7)', 'Velocidad 15'],
        statsBonus: '+6 Ataque, +6 Defensa, +80 Vida, +4 Velocidad, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Dragón de Ceniza',
        nameEn: 'Ashen Dragon',
        role: 'Apex de Asedio y Control de Ceniza',
        keyAbilities: ['Aliento de Cenizas (Penetra 2 casillas con ceguera y sofoco)', 'Nube de Humo Debilitante (-30% daño físico a enemigos cercanos)', 'Inmunidad a Magia de Fuego y Maldiciones'],
        statsBonus: '+4 Ataque, +8 Defensa, +90 Vida, +3 Velocidad, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los legendarios Dragones de Tier 7 de la Mazmorra.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'El Dragón Negro inmune a la magia permite la estrategia suprema "Drago-Armageddon": limpiar ejércitos enteros con hechizos de área masivos sin dañar a tus dragones.',
    timingRecommendation: 'Día 14 de la Semana 2 (Tier 7 Rush canónico) o inicio de Semana 3.',
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
