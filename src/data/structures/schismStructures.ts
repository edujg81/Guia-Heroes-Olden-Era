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
      'Estructura económica suprema de Olden Era (equivalente canónico al Capitolio).',
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
    unitRecruitedBase: 'Cultista / Engendro (Cultist)',
    unitRecruited: 'Cultista / Engendro del Vacío / Acólito del Cisma',
    unitUpgrades: {
      branchA: 'Engendro del Vacío (Ataque con energía astral y resistencia a daño físico)',
      branchB: 'Acólito del Cisma (Canaliza maná para los hechiceros aliados al inicio de la ronda)',
      branchADetails: {
        unitName: 'Engendro del Vacío',
        nameEn: 'Void Spawn',
        role: 'Infantería Ligera Astral',
        keyAbilities: ['Ataque Astral', 'Resistencia al Daño Físico (-15%)'],
        statsBonus: '+2 Ataque, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Acólito del Cisma',
        nameEn: 'Schism Acolyte',
        role: 'Canalizador de Maná',
        keyAbilities: ['Tributo de Maná (+3 Maná al héroe al iniciar combate)', 'Daga de Sacrificio'],
        statsBonus: '+2 Defensa, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los cultistas y engendros de Tier 1 del Cisma.',
      'Producción base: 14 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Unidades muy versátiles con la capacidad de recargar maná del héroe en combate.',
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
    cost: { gold: 1000, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Rito Menor de Invocación (Lesser Summoning Rite)'],
    unitRecruitedBase: 'Shoth (Shoth)',
    unitRecruited: 'Shoth / Ra\'Shoth / Shoth Glacial',
    unitUpgrades: {
      branchA: 'Ra\'Shoth (Disparo de proyectiles fríos perforantes con daño aumentado)',
      branchB: 'Shoth Glacial (Ralentiza a los objetivos impactados reduciendo su velocidad e iniciativa)',
      branchADetails: {
        unitName: 'Ra\'Shoth',
        nameEn: 'Ra\'Shoth',
        role: 'Tirador de Falla',
        keyAbilities: ['Disparo Perforante', 'Sin Penalización de Rango'],
        statsBonus: '+3 Ataque, +4 Vida'
      },
      branchBDetails: {
        unitName: 'Shoth Glacial',
        nameEn: 'Glacial Shoth',
        role: 'Tirador de Ralentización',
        keyAbilities: ['Impacto Helado (Reduce -2 Velocidad)', 'Resistencia al Frío'],
        statsBonus: '+2 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los tiradores de hielo y vacío de Tier 2.',
      'Producción base: 8 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Ralentizar tropas pesadas enemigas desde el turno 1 facilita eliminarlas antes de que alcancen tus líneas.',
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
    unitRecruited: 'Jinete Aga\'Shoth / Incursor del Vacío / Jinete de las Fallas',
    unitUpgrades: {
      branchA: 'Incursor del Vacío (Carga a través de fallas espaciales ignorando obstáculos)',
      branchB: 'Jinete de las Fallas (Ataque con cuchillas astrales que inflige daño a 2 casillas en línea)',
      branchADetails: {
        unitName: 'Incursor del Vacío',
        nameEn: 'Void Raider',
        role: 'Caballería Dimensional Ligera',
        keyAbilities: ['Salto de Falla (Ignora obstáculos de terreno)', 'Carga Astral'],
        statsBonus: '+3 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Jinete de las Fallas',
        nameEn: 'Rift Rider',
        role: 'Asaltante de Línea',
        keyAbilities: ['Corte Dimensional (Daña a 2 hexágonos)', 'Evasión Parcial'],
        statsBonus: '+4 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los jinetes rápidos de Tier 3.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Su capacidad de saltar obstáculos les permite flanquear las murallas en asedios fácilmente.',
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
    unitRecruitedBase: 'Cóncubo (Concubus)',
    unitRecruited: 'Cóncubo / Seductor del Abismo / Clamador del Vacío',
    unitUpgrades: {
      branchA: 'Seductor del Abismo (Control mental que obliga a un objetivo enemigo a atacar a sus aliados)',
      branchB: 'Clamador del Vacío (Grito cósmico que silencia la magia del objetivo durante 2 rondas)',
      branchADetails: {
        unitName: 'Seductor del Abismo',
        nameEn: 'Abyssal Seducer',
        role: 'Controlador de Mentes',
        keyAbilities: ['Fascinación (Controla pila enemiga 1 turno)', 'Vuelo Elusivo'],
        statsBonus: '+3 Defensa, +12 Vida'
      },
      branchBDetails: {
        unitName: 'Clamador del Vacío',
        nameEn: 'Void Caller',
        role: 'Anti-Hechicero',
        keyAbilities: ['Silencio Cósmico', 'Descarga de Falla'],
        statsBonus: '+4 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los manipuladores y controladores cósmicos de Tier 4.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'El control mental sobre tropas pesadas enemigas puede cambiar por completo una batalla en el primer turno.',
    timingRecommendation: 'Día 4-5.',
  },
  {
    id: 'schism-house-of-chains',
    name: 'Casa de Cadenas (House of Chains)',
    nameEn: 'House of Chains',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, ore: 10, mercury: 4 },
    dwellingUpgradeCost: { gold: 3000, ore: 5, mercury: 3 },
    prerequisites: ['Rito Inquietante de Invocación (Disturbing Summoning Rite)'],
    unitRecruitedBase: 'Árbitro / Verdugo (Arbiter)',
    unitRecruited: 'Árbitro / Verdugo Abisal / Carcelero del Vacío',
    unitUpgrades: {
      branchA: 'Verdugo Abisal (Cadenas astrales que arrastran a los enemigos hacia él y los atan)',
      branchB: 'Carcelero del Vacío (Aura de supresión de contragolpes y golpe demoledor de maza)',
      branchADetails: {
        unitName: 'Verdugo Abisal',
        nameEn: 'Abyssal Executioner',
        role: 'Controlador de Arrastre Pesado',
        keyAbilities: ['Cadenas del Abismo (Arrastra objetivo)', 'Ejecución (Daño extra a unidades con baja vida)'],
        statsBonus: '+5 Ataque, +3 Defensa, +18 Vida'
      },
      branchBDetails: {
        unitName: 'Carcelero del Vacío',
        nameEn: 'Void Jailer',
        role: 'Baluarte de Contención',
        keyAbilities: ['Supresión de Represalias', 'Grilletes Astrales'],
        statsBonus: '+4 Ataque, +5 Defensa, +25 Vida'
      }
    },
    effects: [
      'Recluta los verdugos acorazados de Tier 5 del Cisma.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Arrastrar tiradores o líderes frágiles fuera de su posición protegida rompe las tácticas de tortuga rivales.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'schism-bloated-mansion',
    name: 'Mansión Abotagada (Bloated Mansion)',
    nameEn: 'Bloated Mansion',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, ore: 10, mercury: 6 },
    dwellingUpgradeCost: { gold: 4000, ore: 5, mercury: 4 },
    prerequisites: ['Casa de Cadenas (House of Chains)'],
    unitRecruitedBase: 'Enviado Abisal (Abyssal Envoy)',
    unitRecruited: 'Enviado Abisal / Heraldo de las Fallas / Horror de Vori',
    unitUpgrades: {
      branchA: 'Heraldo de las Fallas (Distorsiona el espacio absorbiendo el daño recibido para reflejarlo en área)',
      branchB: 'Horror de Vori (Niebla helada del abismo que paraliza a los atacantes colindantes)',
      branchADetails: {
        unitName: 'Heraldo de las Fallas',
        nameEn: 'Rift Herald',
        role: 'Tanque Dimensional Reflejante',
        keyAbilities: ['Reflejo de Distorsión (Refleja 25% daño recibido)', 'Golpe Dimensional'],
        statsBonus: '+6 Ataque, +5 Defensa, +35 Vida'
      },
      branchBDetails: {
        unitName: 'Horror de Vori',
        nameEn: 'Horror of Vori',
        role: 'Paralizador Gélido',
        keyAbilities: ['Frío del Vacío (Prob. de congelar al atacar)', 'Aura de Desolación'],
        statsBonus: '+7 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los colosos abisales de Tier 6.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Extremadamente resistentes; su reflejo de daño desanima a los rivales de atacarlos con sus tropas más fuertes.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-supreme-void-rite',
    name: 'Rito Supremo del Vacío (Supreme Void Rite)',
    nameEn: 'Supreme Void Rite',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 10000, ore: 15, mercury: 10 },
    dwellingUpgradeCost: { gold: 8000, ore: 10, mercury: 8 },
    prerequisites: ['Mansión Abotagada (Bloated Mansion)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Devorador Cósmico (Cosmic Devourer)',
    unitRecruited: 'Devorador Cósmico / Titán del Vacío / Señor de la Ruina',
    unitUpgrades: {
      branchA: 'Titán del Vacío (Colapso gravitatorio que atrae a todos los enemigos de la provincia y devora su esencia)',
      branchB: 'Señor de la Ruina (Desintegra una porción fija de cada pila enemiga ignorando armadura y defensas mágicas)',
      branchADetails: {
        unitName: 'Titán del Vacío',
        nameEn: 'Void Titan',
        role: 'Coloso Gravitatorio Supremo',
        keyAbilities: ['Vórtice Gravitatorio', 'Inmunidad a Control Mental y Parálisis'],
        statsBonus: '+10 Ataque, +10 Defensa, +100 Vida'
      },
      branchBDetails: {
        unitName: 'Señor de la Ruina',
        nameEn: 'Lord of Ruin',
        role: 'Desintegrador Arcano Cósmico',
        keyAbilities: ['Toque de Desintegración (Ignora defensas)', 'Aura de Entropía'],
        statsBonus: '+12 Ataque, +3 Iniciativa, +90 Vida'
      }
    },
    effects: [
      'Recluta los Titanes y Devoradores Cósmicos de Tier 7 del Cisma.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'La cúspide del poder del Cisma: sus ataques ignoran barreras convencionales y desintegran las tropas más blindadas del oponente.',
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
