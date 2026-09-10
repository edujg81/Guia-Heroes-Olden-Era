import { TownStructure } from '../../types';

export const SCHISM_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO (AYUNTAMIENTO / ALCALDÍA CANÓNICA - 3 NIVELES)
  // =========================================================================
  {
    id: 'schism-abyssal-remnant',
    name: 'Remanente Abisal (Ayuntamiento / Alcaldía - Niveles I, II y III)',
    nameEn: 'Abyssal Remnant (Town Hall / City Hall - Levels I, II & III)',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 2500 },
    prerequisites: [],
    effects: [
      'Núcleo de energía de la falla interdimensional y trono de los señores cósmicos estructurado en 3 niveles de desarrollo.',
      'Otorga Oro, Puntos de Ley y Puntos de Astrología diarios incrementales, expandiendo la administración de la ciudad de la falla y el límite de héroes activos.',
      'Al ascender a Nivel II permite elegir una mejora económica especializada (+1.000 Oro, +1.000 Ley o +1.000 Astrología), y el Nivel III (Abyssal Remnant III) consolida el pináculo del dominio del vacío.'
    ],
    strategicTip: 'Mejora a Nivel II en el Día 2 para acelerar los ritos de invocación cósmica y corona con Remanente Abisal III en Semana 2 para sostener a los Devoradores Cósmicos.',
    timingRecommendation: 'Día 1 (Nivel I) / Día 2-3 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento del Vacío (Town Hall)',
        nameEn: 'Void Settlement (Town Hall)',
        cost: { gold: 2500 },
        prerequisites: [],
        effects: [
          'Genera 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite la administración de la ciudad de la falla.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día',
        strategicTip: 'Base cívica inicial del Cisma.'
      },
      {
        level: 2,
        name: 'Nivel II: Remanente Abisal II (City Hall)',
        nameEn: 'Abyssal Remnant II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Mercado (Marketplace)'],
        effects: [
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite al propietario elegir una de las 3 mejoras económicas de Nivel 2 (+1.000 Oro/día, +1.000 Puntos de Ley/día, o +1.000 Puntos de Astrología/día).'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día (+ mejora a elección)',
        strategicTip: 'Construir el Día 2 o 3 para financiar los ritos de invocación.'
      },
      {
        level: 3,
        name: 'Nivel III: Remanente Abisal III (Metropolis)',
        nameEn: 'Abyssal Remnant III (Metropolis)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Remanente Abisal II (City Hall)'],
        effects: [
          'Máxima manifestación cívica y dimensional del Cisma en Olden Era.',
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios adicionales para el reino.',
          'Desbloquea el poder pleno del vacío y el sustento de los ritos de invocación supremos de Jadame.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día adicionales',
        strategicTip: 'Edificar en Semana 2 para sostener los enormes costes de maná y oro de los Titanes del Vacío.'
      }
    ]
  },

  // =========================================================================
  // BANCO Y TESORERÍA (ECONOMÍA SUPREMA DE OLDEN ERA)
  // =========================================================================
  {
    id: 'schism-bank',
    name: 'Banco (Bank)',
    nameEn: 'Bank',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)', 'Remanente Abisal (Ayuntamiento / Alcaldía)'],
    effects: [
      'Cámara de condensación de tesoros astrales y tributos del vacío.',
      'Genera +500 de Oro diario adicional y es prerrequisito indispensable para edificar la Tesorería.'
    ],
    strategicTip: 'Construir para abrir paso a la Tesorería y duplicar los ingresos pasivos.',
    timingRecommendation: 'Semana 1 (Día 5-6).',
  },
  {
    id: 'schism-treasury',
    name: 'Tesorería (Treasury)',
    nameEn: 'Treasury',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 5000, wood: 10, ore: 10 },
    prerequisites: ['Banco (Bank)', 'Mercado (Marketplace)', 'Fortificaciones (Fortifications)'],
    effects: [
      'Estructura económica suprema de Olden Era (Tesorería / Bonificación Financiera de +2.000 Oro/día).',
      'Genera +2.000 de Oro diario adicional de forma permanente para el reino.',
      'Requiere haber consolidado el Banco, el Mercado y las Fortificaciones.'
    ],
    strategicTip: 'Asegura el oro necesario para costear los ritos supremos de la Casa de Cadenas y la Mansión Abotagada.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II Y III)
  // =========================================================================
  {
    id: 'schism-fortifications',
    name: 'Fortificaciones (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Cisma',
    cost: { gold: 2500, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona murallas protectoras nacidas de la distorsión del vacío durante los asedios.',
      'Permite elegir mejoras defensivas dimensionales.',
      'Al ascender a Niveles II y III incrementa masivamente el crecimiento de tropas abisales (+50% y +100%).'
    ],
    strategicTip: 'Mejorar a Nivel II en el Día 7 de la Semana 1 para aumentar la producción del primer reset semanal.',
    timingRecommendation: 'Fortificaciones I (Día 1) / Fortificaciones II (Día 7) / Fortificaciones III (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fortificaciones (Fortifications)',
        nameEn: 'Fortifications I',
        cost: { gold: 2500, ore: 5 },
        prerequisites: [],
        effects: [
          'Proporciona una muralla defensiva dimensional durante los asedios.',
          'Permite elegir una mejora defensiva de nivel 1.'
        ],
        defenseBonus: 'Muralla perimetral de piedra astral',
        strategicTip: 'Defensa base de la falla.'
      },
      {
        level: 2,
        name: 'Nivel II: Fortificaciones II (Citadel)',
        nameEn: 'Fortifications II',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones (Fortifications)'],
        effects: [
          'Añade dos torres a las almenas que disparan descargas del vacío a los atacantes durante los asedios.',
          'Aumenta la producción semanal de todas las criaturas del Cisma en un +50%.'
        ],
        defenseBonus: '2 Torres de proyectiles astrales',
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
          'Añade una gran torre central a las almenas con alcance total.',
          'Duplica el crecimiento semanal de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: 'Torre Central Abisal + foso de distorsión',
        growthBonus: '+100% Crecimiento semanal de criaturas (duplica producción)',
        strategicTip: 'Duplica la invocación semanal de Enviados Abisales y Devoradores.'
      }
    ]
  },

  // =========================================================================
  // GREMIO DE MAGOS (MAGE GUILD I A V) & CONEXIÓN AL OBSERVATORIO MÁGICO
  // =========================================================================
  {
    id: 'schism-mage-guild',
    name: 'Gremio de Magos (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Cisma',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Convento de cultistas interconectado con el Observatorio Mágico (Celestial Observatory).',
      'Desbloquea hechizos de Tiers 1 a 5 en el Observatorio Mágico del reino, con alta afinidad hacia la Magia Arcana y Nochesombra.',
      'Cualquier héroe que visite la ciudad aprende todos los hechizos desbloqueados y recarga su maná al 100%.'
    ],
    strategicTip: 'Desbloquea distorsiones de teletransporte, agujeros negros y rayos cósmicos.',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6) / Niveles 3-5 (Semanas 2-4).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Gremio de Magos Nivel 1',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Desbloquea hechizos de Nivel 1 en el Observatorio Mágico.', 'Otorga Libro de Hechizos y recarga maná al 100%.'],
        strategicTip: 'Requisito para Rito Inquietante de Invocación (Tier 4).'
      },
      {
        level: 2,
        name: 'Gremio de Magos Nivel 2',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 4 },
        prerequisites: ['Gremio de Magos Nivel 1'],
        effects: ['Desbloquea hechizos de Nivel 2 en el Observatorio Mágico.'],
        strategicTip: 'Acceso a distorsiones espaciales y ralentización cósmica.'
      },
      {
        level: 3,
        name: 'Gremio de Magos Nivel 3',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 6 },
        prerequisites: ['Gremio de Magos Nivel 2'],
        effects: ['Desbloquea hechizos de Nivel 3 de las escuelas canónicas en el Observatorio Mágico.'],
        strategicTip: 'Aumenta el poder de combate en asedios.'
      },
      {
        level: 4,
        name: 'Gremio de Magos Nivel 4',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 8 },
        prerequisites: ['Gremio de Magos Nivel 3'],
        effects: ['Desbloquea hechizos mayores de Nivel 4 en el Observatorio Mágico.'],
        strategicTip: 'Rupturas espaciales y disipaciones arcanas absolutas.'
      },
      {
        level: 5,
        name: 'Gremio de Magos Nivel 5',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 10 },
        prerequisites: ['Gremio de Magos Nivel 4'],
        effects: ['Desbloquea hechizos supremos de Nivel 5 del Cisma.'],
        strategicTip: 'Aniquilación dimensional total que desintegra ejércitos.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS, COMERCIO Y DEPÓSITOS
  // =========================================================================
  {
    id: 'schism-tavern',
    name: 'Taberna (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite reclutar héroes adicionales (Cultistas y Señores del Vacío) para explorar y asegurar nodos de recursos.',
      'Permite escuchar rumores cósmicos e informes del reino.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe de exploración de inmediato.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'schism-marketplace',
    name: 'Mercado (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 500, wood: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Permite intercambiar recursos y oro en el mercado del Cisma.',
      'Las tasas de intercambio mejoran conforme el jugador controla más Mercados en su reino.',
      'Permite convertir recursos secundarios en Mercurio para los ritos mayores.'
    ],
    strategicTip: 'Construir en Semana 1 para financiar las moradas de Enviados Abisales y Devoradores.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'schism-artifact-merchant',
    name: 'Comerciante de Artefactos (Artifact Merchant)',
    nameEn: 'Artifact Merchant',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)'],
    effects: [
      'Establece una tienda permanente de reliquias del vacío y artefactos arcanos en la ciudad.',
      'Permite comprar y vender artefactos de distintos tiers para equipar a los hechiceros del Cisma.'
    ],
    strategicTip: 'Adquiere artefactos que amplifiquen el Poder Mágico o la regeneración de Maná.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-resource-silo',
    name: 'Silo de Recursos (Resource Silo)',
    nameEn: 'Resource Silo',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 0, gems: 3, crystal: 3 },
    prerequisites: ['Mercado (Marketplace)', 'Banco (Bank)'],
    effects: [
      'Genera +1 Mercurio diario de forma pasiva (recurso raro principal del Cisma).',
      'Asegura el suministro continuo de mercurio para la Mansión Abotagada y el Gremio de Magos.'
    ],
    strategicTip: 'Requiere Mercado y Banco. Construir en cuanto se tengan 3 de cada recurso raro secundario para estabilizar la economía de mercurio.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-alchemical-silo',
    name: 'Silo Alquímico (Alchemic Silo)',
    nameEn: 'Alchemic Silo',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 2000, ore: 5, mercury: 2 },
    prerequisites: ['Silo de Recursos (Resource Silo)'],
    effects: [
      'Produce Polvo Alquímico (Alchemical Dust) diariamente.',
      'El Polvo Alquímico es el recurso canónico esencial de Olden Era necesario para ascender moradas a niveles magistrales y potenciar hechizos en el Observatorio Mágico.'
    ],
    strategicTip: 'Requiere el Silo de Recursos. Crucial para desbloquear las mejoras maestras de Árbitros y Enviados Abisales.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CANÓNICAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'schism-lesser-summoning-rite',
    name: 'Rito Menor de Invocación (Lesser Summoning Rite)',
    nameEn: 'Lesser Summoning Rite',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Ra\'Shoth (Ra\'Shoth)',
    unitRecruited: 'Ra\'Shoth / Ra\'Shoth Punzante / Ra\'Shoth Feroz',
    unitUpgrades: {
      branchA: 'Ra\'Shoth Punzante (Espinas de hielo astral que infligen daño de penetración y ralentización)',
      branchB: 'Ra\'Shoth Feroz (Ataque frenético con doble mordisco en combate cerrado)',
      branchADetails: {
        unitName: 'Ra\'Shoth Punzante',
        nameEn: 'Barbed Ra\'Shoth',
        role: 'Hostigador de Escarcha',
        keyAbilities: ['Espinas de Falla', 'Ralentización Glacial'],
        statsBonus: '+2 Ataque, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Ra\'Shoth Feroz',
        nameEn: 'Fierce Ra\'Shoth',
        role: 'Infantería Ligera de Asalto',
        keyAbilities: ['Frenesí de Grieta', 'Mordisco Doble'],
        statsBonus: '+3 Ataque, +4 Vida'
      }
    },
    effects: [
      'Recluta los Ra\'Shoth de Tier 1 del Cisma.',
      'Producción base: 14 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Infantería de choque barata con daño de frío ideal para el creeping inicial de Semana 1.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'schism-cultist-spire',
    name: 'Aguja de los Cultistas (Cultist Spire)',
    nameEn: 'Cultist Spire',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Rito Menor de Invocación (Lesser Summoning Rite)'],
    unitRecruitedBase: 'Cultista (Cultist)',
    unitRecruited: 'Cultista / Vinculador / Devoto',
    unitUpgrades: {
      branchA: 'Vinculador (Lanza proyectiles oscuros a distancia y vincula el daño recibido a tropas enemigas)',
      branchB: 'Devoto (Canaliza maná pasivo para el héroe y bendice los ritos de invocación permanente)',
      branchADetails: {
        unitName: 'Vinculador',
        nameEn: 'Binder',
        role: 'Tirador Astral y Vinculador de Daño',
        keyAbilities: ['Disparo del Vacío', 'Vínculo de Dolor'],
        statsBonus: '+3 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Devoto',
        nameEn: 'Devotee',
        role: 'Soporte y Batería de Maná',
        keyAbilities: ['Canalización de Maná (+3 Maná por turno)', 'Rito de Entrega'],
        statsBonus: '+3 Defensa, +5 Vida'
      }
    },
    effects: [
      'Recluta los cultistas y acólitos de Tier 2 del Cisma.',
      'Producción base: 9 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Proporciona la primera fuente de ataque a distancia y combustible de maná para los héroes invocadores.',
    timingRecommendation: 'Día 2-3.',
  },
  {
    id: 'schism-agashoth-stables',
    name: 'Establos de Aga\'Shoth (Aga\'Shoth Stables)',
    nameEn: 'Aga\'Shoth Stables',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 3,
    dwellingTier: 3,
    cost: { gold: 1500, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1500, wood: 5, mercury: 2 },
    prerequisites: ['Aguja de los Cultistas (Cultist Spire)'],
    unitRecruitedBase: 'Jinete Aga\'Shoth (Aga\'Shoth Rider)',
    unitRecruited: 'Jinete Aga\'Shoth / Domador Aga\'Shoth / Aga\'Shoth Matha',
    unitUpgrades: {
      branchA: 'Domador Aga\'Shoth (Carga rápida que derriba defensas y genera miedo en unidades vivas)',
      branchB: 'Aga\'Shoth Matha (Salto dimensional a través de fallas espaciales ignorando obstáculos de terreno)',
      branchADetails: {
        unitName: 'Domador Aga\'Shoth',
        nameEn: 'Aga\'Shoth Tamer',
        role: 'Caballería Pesada de Ruptura',
        keyAbilities: ['Carga Devastadora', 'Aura de Pánico'],
        statsBonus: '+4 Ataque, +2 Defensa, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Aga\'Shoth Matha',
        nameEn: 'Aga\'Shoth Matha',
        role: 'Caballería Dimensional de Flanqueo',
        keyAbilities: ['Paso Dimensional (Teletransporte de carga)', 'Corte de Falla'],
        statsBonus: '+3 Ataque, +2 Velocidad, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los jinetes monstruosos de Tier 3.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Su alta velocidad y capacidad de carga dimensional les permite anular tiradores enemigos en el primer asalto.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'schism-disturbing-summoning-rite',
    name: 'Rito Inquietante de Invocación (Disturbing Summoning Rite)',
    nameEn: 'Disturbing Summoning Rite',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, ore: 5, mercury: 2 },
    dwellingUpgradeCost: { gold: 2000, ore: 5, mercury: 2 },
    prerequisites: ['Establos de Aga\'Shoth (Aga\'Shoth Stables)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Gran Shoth (Great Shoth)',
    unitRecruited: 'Gran Shoth / Shoth Innombrable / Shoth Impensable',
    unitUpgrades: {
      branchA: 'Shoth Innombrable (Tentáculos cósmicos que atacan a múltiples casillas y desgarran armaduras)',
      branchB: 'Shoth Impensable (Aura de horror que reduce la moral del enemigo e inflige daño psíquico continuo)',
      branchADetails: {
        unitName: 'Shoth Innombrable',
        nameEn: 'Unnameable Shoth',
        role: 'Coloso de Asalto Multi-Tentáculo',
        keyAbilities: ['Ataque de Azote Múltiple', 'Desgarro de Armadura (-3 Def)'],
        statsBonus: '+5 Ataque, +3 Defensa, +18 Vida'
      },
      branchBDetails: {
        unitName: 'Shoth Impensable',
        nameEn: 'Unthinkable Shoth',
        role: 'Hostigador Mental y Debuffer',
        keyAbilities: ['Horror del Vacío (-2 Moral)', 'Distorsión de Proyectiles'],
        statsBonus: '+4 Ataque, +5 Defensa, +20 Vida'
      }
    },
    effects: [
      'Recluta los horrores Shoth de Tier 4 del Cisma.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Núcleo de control de masas y resistencia de primera línea del Cisma.',
    timingRecommendation: 'Día 4-5.',
  },
  {
    id: 'schism-house-of-chains',
    name: 'Casa de las Cadenas (House of Chains)',
    nameEn: 'House of Chains',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, ore: 10, mercury: 4 },
    dwellingUpgradeCost: { gold: 3000, ore: 5, mercury: 3 },
    prerequisites: ['Rito Inquietante de Invocación (Disturbing Summoning Rite)'],
    unitRecruitedBase: 'Concubo (Concubus)',
    unitRecruited: 'Concubo / Señora de las Cadenas / Hechicera',
    unitUpgrades: {
      branchA: 'Señora de las Cadenas (Cadenas astrales que inmovilizan y arrastran a las tropas enemigas)',
      branchB: 'Hechicera (Fascinación hipnótica que anula contragolpes y drena energía vital)',
      branchADetails: {
        unitName: 'Señora de las Cadenas',
        nameEn: 'Mistress of Chains',
        role: 'Controladora de Arrastre y Prisión',
        keyAbilities: ['Cadenas del Abismo (Inmoviliza objetivo)', 'Latigazo de Vacío'],
        statsBonus: '+5 Ataque, +3 Defensa, +22 Vida'
      },
      branchBDetails: {
        unitName: 'Hechicera',
        nameEn: 'Sorceress',
        role: 'Hechicera Manipuladora y Drenadora',
        keyAbilities: ['Seducción y Fascinación', 'Drenaje Vital (Cura al golpear)'],
        statsBonus: '+4 Ataque, +4 Defensa, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los Concubos y hechiceras de Tier 5 del Cisma.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Inmovilizar o seducir a las tropas más peligrosas del oponente desbarata por completo su formación.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'schism-bloated-mansion',
    name: 'Mansión Hinchada (Bloated Mansion)',
    nameEn: 'Bloated Mansion',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, ore: 10, mercury: 6 },
    dwellingUpgradeCost: { gold: 4000, ore: 5, mercury: 4 },
    prerequisites: ['Casa de las Cadenas (House of Chains)'],
    unitRecruitedBase: 'Árbitro (Arbiter)',
    unitRecruited: 'Árbitro / Árbitro de la Grieta / Árbitro Hinchado',
    unitUpgrades: {
      branchA: 'Árbitro de la Grieta (Veredicto de anulación mágica que disipa todas las ventajas del enemigo)',
      branchB: 'Árbitro Hinchado (Baluarte abotagado que absorbe y refleja el daño recibido en un estallido astral)',
      branchADetails: {
        unitName: 'Árbitro de la Grieta',
        nameEn: 'Rift Arbiter',
        role: 'Juez Purificador Anti-Magia',
        keyAbilities: ['Veredicto Silenciador', 'Disipación de Falla'],
        statsBonus: '+6 Ataque, +6 Defensa, +35 Vida'
      },
      branchBDetails: {
        unitName: 'Árbitro Hinchado',
        nameEn: 'Bloated Arbiter',
        role: 'Tanque Colosal de Reflejo de Daño',
        keyAbilities: ['Masa Desbordante', 'Estallido Retaliatorio (Refleja 30% del daño)'],
        statsBonus: '+4 Ataque, +8 Defensa, +50 Vida'
      }
    },
    effects: [
      'Recluta los temibles Árbitros de Tier 6 del Cisma.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Colosos defensivos impenetrables que anulan la magia rival y castigan a quien ose atacarlos cuerpo a cuerpo.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-sanctum-of-the-deep',
    name: 'Santuario del Abismo (Sanctum of the Deep)',
    nameEn: 'Sanctum of the Deep',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 10000, ore: 15, mercury: 10 },
    dwellingUpgradeCost: { gold: 8000, ore: 10, mercury: 8 },
    prerequisites: ['Mansión Hinchada (Bloated Mansion)', 'Gremio de Magos Nivel 2'],
    unitRecruitedBase: 'Enviado Abisal (Abyssal Envoy)',
    unitRecruited: 'Enviado Abisal / Supervisor Abisal / Verdugo Abisal',
    unitUpgrades: {
      branchA: 'Supervisor Abisal (Deformación espacial que abre fallas abisales para teletransportar aliados y dañar enemigos)',
      branchB: 'Verdugo Abisal (Golpe de aniquilación pura que desintegra defensas y ejecuta inmediatamente a unidades debilitadas)',
      branchADetails: {
        unitName: 'Supervisor Abisal',
        nameEn: 'Abyssal Overseer',
        role: 'Manipulador Dimensional Supremo',
        keyAbilities: ['Deformación de Vori', 'Apertura de Falla Permanente', 'Inmunidad a Control'],
        statsBonus: '+10 Ataque, +10 Defensa, +100 Vida'
      },
      branchBDetails: {
        unitName: 'Verdugo Abisal',
        nameEn: 'Abyssal Executioner',
        role: 'Aniquilador de Desintegración Pura',
        keyAbilities: ['Golpe de Juicio Cósmico (Ignora 50% de defensa)', 'Ejecución Inmediata', 'Velocidad Astral'],
        statsBonus: '+12 Ataque, +4 Iniciativa, +90 Vida'
      }
    },
    effects: [
      'Recluta los Enviados Abisales supremos de Tier 7 del Cisma.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'El coloso supremo del Cisma en Olden Era: domina el espacio hexagonal con fallas dimensionales y desintegra las tropas blindadas del rival.',
    timingRecommendation: 'Final de Semana 1 o inicio de Semana 2.',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (CISMA) CONFIRMADAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'schism-grail-sanctuary',
    name: 'Santuario del Abismo (Schism Grail Sanctuary)',
    nameEn: 'Schism Grail Sanctuary',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 0 },
    prerequisites: ['Descubrimiento del Santo Grial (Mirage)'],
    effects: [
      'Estructura suprema del Santo Grial para el Cisma (construida al portar el Grial arrebatado al Espejismo en el mapa).',
      'Genera +5.000 de Oro diario adicional para el reino.',
      'Aumenta el crecimiento semanal de todas las criaturas del Cisma en la ciudad en un +100% adicional.'
    ],
    strategicTip: 'Duplica la invocación semanal de Titanes del Vacío y Enviados Abisales.',
    timingRecommendation: 'Al derrotar el Espejismo (Mirage).',
  },
];
