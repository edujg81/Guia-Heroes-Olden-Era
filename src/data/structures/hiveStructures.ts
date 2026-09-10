import { TownStructure } from '../../types';

export const HIVE_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO (AYUNTAMIENTO / ALCALDÍA CANÓNICA - 3 NIVELES)
  // =========================================================================
  {
    id: 'hive-apiarys-heart',
    name: 'Corazón del Apiario (Ayuntamiento / Alcaldía - Niveles I, II y III)',
    nameEn: 'Apiary\'s Heart (Town Hall / City Hall - Levels I, II & III)',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 2500 },
    prerequisites: [],
    effects: [
      'Cámara central de la mente enjambrada y depósito biológico de la colonia estructurada en 3 niveles de desarrollo.',
      'Otorga Oro, Puntos de Ley y Puntos de Astrología diarios incrementales, expandiendo la administración de la colmena y el límite de héroes activos.',
      'Al ascender a Nivel II permite elegir una mejora económica especializada (+1.000 Oro, +1.000 Ley o +1.000 Astrología), y el Nivel III (Apiary\'s Heart III) culmina el desarrollo de la metrópolis insectoide.'
    ],
    strategicTip: 'Mejora a Nivel II en el Día 2 para acelerar la eclosión de zánganos y culmina en Corazón del Apiario III en Semana 2 para sostener la Torre del Amor.',
    timingRecommendation: 'Día 1 (Nivel I) / Día 2-3 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento del Enjambre (Town Hall)',
        nameEn: 'Swarm Settlement (Town Hall)',
        cost: { gold: 2500 },
        prerequisites: [],
        effects: [
          'Genera 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite la administración y expansión de la colmena.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día',
        strategicTip: 'Base cívica inicial del Enjambre.'
      },
      {
        level: 2,
        name: 'Nivel II: Corazón del Apiario II (City Hall)',
        nameEn: 'Apiary\'s Heart II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Mercado (Marketplace)'],
        effects: [
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite al propietario elegir una de las 3 mejoras económicas de Nivel 2 (+1.000 Oro/día, +1.000 Puntos de Ley/día, o +1.000 Puntos de Astrología/día).'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día (+ mejora a elección)',
        strategicTip: 'Construir el Día 2 o 3 para expandir la colonia y alimentar la producción de larvas.'
      },
      {
        level: 3,
        name: 'Nivel III: Corazón del Apiario III (Metropolis)',
        nameEn: 'Apiary\'s Heart III (Metropolis)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Corazón del Apiario II (City Hall)'],
        effects: [
          'Máxima cúspide biológica y administrativa de la Colmena en Olden Era.',
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios adicionales para el reino.',
          'Consolida la supermente enjambrada, proveyendo sustento constante para la horda demoníaca/insectoide.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día adicionales',
        strategicTip: 'Edificar en Semana 2 para garantizar los recursos de reclutamiento de Gusanos de Magma y Beelzebub.'
      }
    ]
  },

  // =========================================================================
  // BANCO Y TESORERÍA (ECONOMÍA SUPREMA DE OLDEN ERA)
  // =========================================================================
  {
    id: 'hive-bank',
    name: 'Banco (Bank)',
    nameEn: 'Bank',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)', 'Corazón del Apiario (Ayuntamiento / Alcaldía)'],
    effects: [
      'Depósito biológico y comercial para el almacenamiento de jalea y tributos del enjambre.',
      'Genera +500 de Oro diario adicional y es prerrequisito indispensable para edificar la Tesorería.'
    ],
    strategicTip: 'Paso obligatorio para desbloquear la Tesorería y duplicar los ingresos pasivos.',
    timingRecommendation: 'Semana 1 (Día 5-6).',
  },
  {
    id: 'hive-treasury',
    name: 'Tesorería (Treasury)',
    nameEn: 'Treasury',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 5000, wood: 10, ore: 10 },
    prerequisites: ['Banco (Bank)', 'Mercado (Marketplace)', 'Fortificaciones (Fortifications)'],
    effects: [
      'Estructura económica suprema de Olden Era (equivalente canónico al Capitolio).',
      'Genera +2.000 de Oro diario adicional de forma permanente para el reino.',
      'Requiere haber consolidado el Banco, el Mercado y las Fortificaciones.'
    ],
    strategicTip: 'Sostiene los costes masivos de eclosión de Gusanos de Magma y la Torre del Amor.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II Y III)
  // =========================================================================
  {
    id: 'hive-fortifications',
    name: 'Fortificaciones (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Enjambre',
    cost: { gold: 2500, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona murallas protectoras quitinosas durante los asedios.',
      'Permite elegir mejoras defensivas de ácido y espinas para la colmena.',
      'Al ascender a Niveles II y III incrementa masivamente el crecimiento de insectoides (+50% y +100%).'
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
          'Proporciona una muralla defensiva quitinosa durante los asedios.',
          'Permite elegir una mejora defensiva de nivel 1.'
        ],
        defenseBonus: 'Muralla perimetral de quitina endurecida',
        strategicTip: 'Defensa base de la colonia.'
      },
      {
        level: 2,
        name: 'Nivel II: Fortificaciones II (Citadel)',
        nameEn: 'Fortifications II',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones (Fortifications)'],
        effects: [
          'Añade dos torres a las almenas que disparan espículas ácidas a los atacantes durante los asedios.',
          'Aumenta la producción semanal de todas las criaturas del Enjambre en un +50%.'
        ],
        defenseBonus: '2 Torres de proyectiles ácidos',
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
          'Duplica el crecimiento semanal de todas las criaturas de la colmena (+100% total).'
        ],
        defenseBonus: 'Torre Central Enjambrada + foso de feromonas ácidas',
        growthBonus: '+100% Crecimiento semanal de criaturas (duplica producción)',
        strategicTip: 'Duplica la eclosión semanal de todas las criaturas del enjambre.'
      }
    ]
  },

  // =========================================================================
  // GREMIO DE MAGOS (MAGE GUILD I A V) & CONEXIÓN AL OBSERVATORIO MÁGICO
  // =========================================================================
  {
    id: 'hive-mage-guild',
    name: 'Gremio de Magos (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Enjambre',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Cámara de resonancia psíquica de los Heraldos interconectada con el Observatorio Mágico (Celestial Observatory).',
      'Desbloquea hechizos de Tiers 1 a 5 en el Observatorio Mágico del reino, con alta afinidad hacia la Magia Primigenia y Nochesombra.',
      'Cualquier héroe que visite la ciudad aprende todos los hechizos desbloqueados y recarga su maná al 100%.'
    ],
    strategicTip: 'Desbloquea neurotoxinas, enjambres cegadores y aceleración de colmena.',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6) / Niveles 3-5 (Semanas 2-4).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Gremio de Magos Nivel 1',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Desbloquea hechizos de Nivel 1 en el Observatorio Mágico.', 'Otorga Libro de Hechizos y recarga maná al 100%.'],
        strategicTip: 'Requisito para el Zigurat Quitináceo (Tier 4).'
      },
      {
        level: 2,
        name: 'Gremio de Magos Nivel 2',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, sulfur: 4 },
        prerequisites: ['Gremio de Magos Nivel 1'],
        effects: ['Desbloquea hechizos de Nivel 2 en el Observatorio Mágico.'],
        strategicTip: 'Acceso a nieblas ácidas y venenos masivos.'
      },
      {
        level: 3,
        name: 'Gremio de Magos Nivel 3',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, sulfur: 6 },
        prerequisites: ['Gremio de Magos Nivel 2'],
        effects: ['Desbloquea hechizos de Nivel 3 de las escuelas canónicas en el Observatorio Mágico.'],
        strategicTip: 'Aumenta el control táctico en asedios.'
      },
      {
        level: 4,
        name: 'Gremio de Magos Nivel 4',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, sulfur: 8 },
        prerequisites: ['Gremio de Magos Nivel 3'],
        effects: ['Desbloquea hechizos mayores de Nivel 4 en el Observatorio Mágico.'],
        strategicTip: 'Ondas biológicas devastadoras e inmunidad temporal a daño.'
      },
      {
        level: 5,
        name: 'Gremio de Magos Nivel 5',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, sulfur: 10 },
        prerequisites: ['Gremio de Magos Nivel 4'],
        effects: ['Desbloquea hechizos supremos de Nivel 5 del Enjambre.'],
        strategicTip: 'Plagas supremas de aniquilación y renacimiento masivo.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS, COMERCIO Y DEPÓSITOS
  // =========================================================================
  {
    id: 'hive-tavern',
    name: 'Taberna (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite reclutar héroes adicionales (Ejecutores y Heraldos) para expandir la colonización del mapa.',
      'Permite escuchar rumores e informes territoriales.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe recolector inmediatamente.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'hive-marketplace',
    name: 'Mercado (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 500, wood: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Permite intercambiar recursos y oro en el mercado de la colmena.',
      'Las tasas de intercambio mejoran conforme el jugador controla más Mercados en su reino.',
      'Permite canjear excedentes por Azufre o Cristales.'
    ],
    strategicTip: 'Construir en Semana 1 para financiar las moradas de Gusanos de Magma y la Torre del Amor.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'hive-artifact-merchant',
    name: 'Comerciante de Artefactos (Artifact Merchant)',
    nameEn: 'Artifact Merchant',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)'],
    effects: [
      'Establece una tienda permanente de artefactos biológicos y reliquias en la colonia.',
      'Permite comprar y vender artefactos de distintos tiers para equipar a los comandantes del Enjambre.'
    ],
    strategicTip: 'Adquiere objetos que potencien la Iniciativa y Velocidad de tus enjambres.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'hive-resource-silo',
    name: 'Silo de Recursos (Resource Silo)',
    nameEn: 'Resource Silo',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 0, gems: 3, crystal: 3 },
    prerequisites: ['Mercado (Marketplace)', 'Banco (Bank)'],
    effects: [
      'Genera +1 Azufre diario de forma pasiva (recurso raro principal del Enjambre).',
      'Asegura el suministro continuo de azufre para la Torre del Amor y el Gremio de Magos.'
    ],
    strategicTip: 'Requiere Mercado y Banco. Construir en cuanto se tengan 3 de cada recurso raro secundario para estabilizar la economía de azufre.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'hive-alchemical-silo',
    name: 'Silo Alquímico (Alchemic Silo)',
    nameEn: 'Alchemic Silo',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 2000, ore: 5, sulfur: 2 },
    prerequisites: ['Silo de Recursos (Resource Silo)'],
    effects: [
      'Produce Polvo Alquímico (Alchemical Dust) diariamente.',
      'El Polvo Alquímico es el recurso canónico esencial de Olden Era necesario para ascender moradas a niveles magistrales y potenciar hechizos en el Observatorio Mágico.'
    ],
    strategicTip: 'Requiere el Silo de Recursos. Crucial para desbloquear las mejoras maestras de Mantis y Gusanos de Magma.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CANÓNICAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'hive-neglected-housing',
    name: 'Vivienda Descuidada (Neglected Housing)',
    nameEn: 'Neglected Housing',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Parásito (Parasite)',
    unitRecruited: 'Parásito / Parásito Guardián / Parásito Devastador',
    unitUpgrades: {
      branchA: 'Parásito Guardián (Alcance largo sin sufrir represalia y bonificación contra tiers superiores)',
      branchB: 'Parásito Devastador (Asalto voraz con daño aumentado y derribo)',
      branchADetails: {
        unitName: 'Parásito Guardián',
        nameEn: 'Warden Parasite',
        role: 'Infantería de Alcance Largo',
        keyAbilities: ['Alcance Largo (Sin represalia)', 'Derribar al Fuerte (+3% daño por dif. Tier)'],
        statsBonus: '+2 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Parásito Devastador',
        nameEn: 'Ravager Parasite',
        role: 'Infantería de Asalto Furioso',
        keyAbilities: ['Asalto Desgarrador', 'Derribar al Fuerte (+3% daño por dif. Tier)'],
        statsBonus: '+3 Ataque, +2 Vida'
      }
    },
    effects: [
      'Recluta los parásitos invasores de Tier 1 de la Colmena.',
      'Producción base: 15 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Unidades muy económicas dotadas de ataque a 2 casillas sin recibir contraataque.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'hive-carrion-lair',
    name: 'Guarida de Carroña (Carrion Lair)',
    nameEn: 'Carrion Lair',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Vivienda Descuidada (Neglected Housing)'],
    unitRecruitedBase: 'Langosta (Locust)',
    unitRecruited: 'Langosta / Langosta Crecida / Langosta Cosechadora',
    unitUpgrades: {
      branchA: 'Langosta Crecida (Dron reforzado con esencia demoníaca y doble ataque)',
      branchB: 'Langosta Cosechadora (Devora cadáveres con Cosechar para ganar bonificaciones temporales)',
      branchADetails: {
        unitName: 'Langosta Crecida',
        nameEn: 'Overgrown Locust',
        role: 'Infantería Ligera de Ataque Doble',
        keyAbilities: ['Ataque Doble', 'Contragolpe Preventivo'],
        statsBonus: '+3 Ataque, +4 Vida'
      },
      branchBDetails: {
        unitName: 'Langosta Cosechadora',
        nameEn: 'Harvester Locust',
        role: 'Carroñero Cosechador',
        keyAbilities: ['Cosechar Cadáver (+Ataque y +HP)', 'Ataque Doble'],
        statsBonus: '+2 Ataque, +2 Defensa, +6 Vida'
      }
    },
    effects: [
      'Recluta las voraces langostas de Tier 2 del Enjambre.',
      'Producción base: 8 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'El ataque doble de las langostas las convierte en una de las mejores unidades ofensivas de apertura.',
    timingRecommendation: 'Día 2-3.',
  },
  {
    id: 'hive-paper-nest',
    name: 'Nido de Papel (Paper Nest)',
    nameEn: 'Paper Nest',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 3,
    dwellingTier: 3,
    cost: { gold: 1500, wood: 5 },
    dwellingUpgradeCost: { gold: 1500, wood: 5 },
    prerequisites: ['Guarida de Carroña (Carrion Lair)'],
    unitRecruitedBase: 'Avispón (Hornet)',
    unitRecruited: 'Avispón / Cantor / Aguijoneador',
    unitUpgrades: {
      branchA: 'Cantor (Zumbido melódico que debilita la resistencia enemiga y acelera al enjambre)',
      branchB: 'Aguijoneador (Aguijonazo penetrante a gran velocidad contra tiradores)',
      branchADetails: {
        unitName: 'Cantor',
        nameEn: 'Chanter',
        role: 'Volador de Apoyo Sónico',
        keyAbilities: ['Zumbido Hipnótico', 'Vuelo Rápido'],
        statsBonus: '+3 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Aguijoneador',
        nameEn: 'Stinger',
        role: 'Hostigador Aéreo Penetrante',
        keyAbilities: ['Aguijón Perforante', 'Vuelo Rápido'],
        statsBonus: '+4 Ataque, +2 Velocidad'
      }
    },
    effects: [
      'Recluta los avispones y cantores voladores de Tier 3.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Cruzan el mapa entero en turno 1 para anular tiradores enemigos antes de que disparen.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'hive-chitinous-ziggurat',
    name: 'Zigurat Quitináceo (Chitinous Ziggurat)',
    nameEn: 'Chitinous Ziggurat',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, ore: 5, sulfur: 2 },
    dwellingUpgradeCost: { gold: 2000, ore: 5, sulfur: 2 },
    prerequisites: ['Nido de Papel (Paper Nest)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Escorpión (Scorpion)',
    unitRecruited: 'Escorpión / Escorpión Volcánico / Escorpión Espeleano',
    unitUpgrades: {
      branchA: 'Escorpión Volcánico (Caparazón ígneo con pinzas ardientes y veneno sulfúrico)',
      branchB: 'Escorpión Espeleano (Coraza de roca subterránea y aguijón petrificante)',
      branchADetails: {
        unitName: 'Escorpión Volcánico',
        nameEn: 'Volcanic Scorpion',
        role: 'Tanque Ofensivo Ígneo',
        keyAbilities: ['Veneno Ígneo', 'Tenazas Trituradoras'],
        statsBonus: '+4 Ataque, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Escorpión Espeleano',
        nameEn: 'Spelaean Scorpion',
        role: 'Tanque Subterráneo Acorazado',
        keyAbilities: ['Caparazón Espeleano', 'Aguijón Paralizante'],
        statsBonus: '+5 Defensa, +14 Vida'
      }
    },
    effects: [
      'Recluta los escorpiones de combate de Tier 4.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Tanques colosales que resisten daño masivo y envenenan a las líneas de vanguardia.',
    timingRecommendation: 'Día 4-5.',
  },
  {
    id: 'hive-apex',
    name: 'Cúspide (Apex)',
    nameEn: 'Apex',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, wood: 5, sulfur: 4 },
    dwellingUpgradeCost: { gold: 3000, wood: 5, sulfur: 3 },
    prerequisites: ['Zigurat Quitináceo (Chitinous Ziggurat)'],
    unitRecruitedBase: 'Saqueador (Reaver)',
    unitRecruited: 'Saqueador / Saqueador Amenazante / Saqueador Maníaco',
    unitUpgrades: {
      branchA: 'Saqueador Amenazante (Depredador ápice con ataque veloz que aterroriza a criaturas inferiores)',
      branchB: 'Saqueador Maníaco (Furia sanguinaria incontrolable con daño devastador a tiers iguales o superiores)',
      branchADetails: {
        unitName: 'Saqueador Amenazante',
        nameEn: 'Menacing Reaver',
        role: 'Depredador Ápice Asesino',
        keyAbilities: ['Depredador Ápice (+Daño a Tiers iguales o superiores)', 'Asalto Rápido (Sin contragolpe)'],
        statsBonus: '+5 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Saqueador Maníaco',
        nameEn: 'Maniacal Reaver',
        role: 'Berserker Quitináceo',
        keyAbilities: ['Furia Maníaca', 'Depredador Ápice'],
        statsBonus: '+7 Ataque, +10 Vida'
      }
    },
    effects: [
      'Recluta los feroces saqueadores predadores de Tier 5.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Su habilidad Depredador Ápice los hace mortíferos contra campeones enemigos de Tier 5, 6 y 7.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'hive-burning-soul-burrows',
    name: 'Madrigueras de Almas Ardientes (Burning Soul Burrows)',
    nameEn: 'Burning Soul Burrows',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, ore: 10, sulfur: 6 },
    dwellingUpgradeCost: { gold: 4000, ore: 5, sulfur: 4 },
    prerequisites: ['Cúspide (Apex)'],
    unitRecruitedBase: 'Waurm (Waurm)',
    unitRecruited: 'Waurm / Devorador / Piroboro',
    unitUpgrades: {
      branchA: 'Devorador (Coloso subterráneo que engulle unidades enemigas y causa sismos)',
      branchB: 'Piroboro (Único tirador a distancia del Enjambre; exhala proyectiles ígneos con daño de área)',
      branchADetails: {
        unitName: 'Devorador',
        nameEn: 'Devourer',
        role: 'Coloso Subterráneo de Melé',
        keyAbilities: ['Fauces Devoradoras', 'Túnel Sísmico'],
        statsBonus: '+6 Ataque, +5 Defensa, +35 Vida'
      },
      branchBDetails: {
        unitName: 'Piroboro',
        nameEn: 'Pyroboros',
        role: 'Artillero Ígneo de Área',
        keyAbilities: ['Disparo Ígneo de Área', 'Fuego Cáustico'],
        statsBonus: '+7 Ataque, +25 Vida, Disparos a Distancia'
      }
    },
    effects: [
      'Recluta los gusanos waurms de Tier 6 del Enjambre.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'El Piroboro es la única unidad de artillería de proyectiles a distancia del Enjambre, indispensable en asedios.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'hive-tower-of-love',
    name: 'Torre del Amor (Tower of Love)',
    nameEn: 'Tower of Love',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 10000, ore: 15, sulfur: 10 },
    dwellingUpgradeCost: { gold: 8000, ore: 10, sulfur: 8 },
    prerequisites: ['Madrigueras de Almas Ardientes (Burning Soul Burrows)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Reina de la Colmena (Hive Queen)',
    unitRecruited: 'Reina de la Colmena / Madre de la Colmena / Cazadora de la Colmena',
    unitUpgrades: {
      branchA: 'Madre de la Colmena (Matriarca colosal que engendra parásitos en combate y emite aura protectora)',
      branchB: 'Cazadora de la Colmena (Monarca predadora de vuelo veloz con aguijón aniquilador y aura de frenesí)',
      branchADetails: {
        unitName: 'Madre de la Colmena',
        nameEn: 'Hive Mother',
        role: 'Generadora y Protectora de Colonia',
        keyAbilities: ['Eclosión en Batalla', 'Aura de la Madre (+Defensa a insectos)'],
        statsBonus: '+8 Defensa, +120 Vida'
      },
      branchBDetails: {
        unitName: 'Cazadora de la Colmena',
        nameEn: 'Hive Huntress',
        role: 'Monarca Asesina Alada',
        keyAbilities: ['Vuelo Veloz', 'Aguijón Aniquilador', 'Aura de Frenesí (+Ataque a insectos)'],
        statsBonus: '+12 Ataque, +4 Velocidad, +100 Vida'
      }
    },
    effects: [
      'Recluta las soberanas reinas de Tier 7 de la Colmena.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'La Madre de la Colmena engendra refuerzos continuos mientras la Cazadora erradica las amenazas aéreas enemigas.',
    timingRecommendation: 'Final de Semana 1 o inicio de Semana 2.',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (ENJAMBRE) CONFIRMADAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'hive-grail-sanctuary',
    name: 'Santuario del Enjambre (Hive Grail Sanctuary)',
    nameEn: 'Hive Grail Sanctuary',
    category: 'Estructuras Especiales de Facción',
    faction: 'Enjambre',
    isFactionUnique: true,
    cost: { gold: 0 },
    prerequisites: ['Descubrimiento del Santo Grial (Mirage)'],
    effects: [
      'Estructura suprema del Santo Grial para el Enjambre (construida al portar el Grial arrebatado al Espejismo en el mapa).',
      'Genera +5.000 de Oro diario adicional para el reino.',
      'Aumenta el crecimiento semanal de todas las criaturas del Enjambre en la ciudad en un +100% adicional.'
    ],
    strategicTip: 'La horda de insectos y gusanos se multiplica exponencialmente tras edificar el Santuario.',
    timingRecommendation: 'Al derrotar el Espejismo (Mirage).',
  },
];
