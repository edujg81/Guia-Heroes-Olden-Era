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
    unitRecruitedBase: 'Larva (Grub)',
    unitRecruited: 'Larva / Zángano / Larva Ácida',
    unitUpgrades: {
      branchA: 'Zángano (Obrero veloz con aguijón debilitante)',
      branchB: 'Larva Ácida (Explosión ácida al morir que corroe a los atacantes)',
      branchADetails: {
        unitName: 'Zángano',
        nameEn: 'Swarm Drone',
        role: 'Infantería Ligera Rápida',
        keyAbilities: ['Picadura Rápida', 'Movilidad de Colonia'],
        statsBonus: '+2 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Larva Ácida',
        nameEn: 'Acid Grub',
        role: 'Bomba Biológica',
        keyAbilities: ['Estallido Ácido (Daña al morir)', 'Baba Ralentizadora'],
        statsBonus: '+3 Ataque, +3 Vida'
      }
    },
    effects: [
      'Recluta las larvas e insectos básicos de Tier 1 de la Colmena.',
      'Producción base: 15 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Unidades muy económicas para absorber represalias y explorar el frente.',
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
    unitRecruitedBase: 'Carroñero (Scavenger)',
    unitRecruited: 'Carroñero / Escarabajo Devorador / Carroñero Acorazado',
    unitUpgrades: {
      branchA: 'Escarabajo Devorador (Devora restos de caídos para sanar vida en combate)',
      branchB: 'Carroñero Acorazado (Caparazón grueso que reduce daño frontal y rechaza proyectiles)',
      branchADetails: {
        unitName: 'Escarabajo Devorador',
        nameEn: 'Devourer Beetle',
        role: 'Carroñero Regenerativo',
        keyAbilities: ['Consumir Cadáver (+HP en combate)', 'Mandíbulas Trituradoras'],
        statsBonus: '+3 Ataque, +8 Vida'
      },
      branchBDetails: {
        unitName: 'Carroñero Acorazado',
        nameEn: 'Armored Scavenger',
        role: 'Tanque Quitinoso',
        keyAbilities: ['Caparazón Reforzado (-20% daño recibido)', 'Cuerpo Pesado'],
        statsBonus: '+4 Defensa, +10 Vida'
      }
    },
    effects: [
      'Recluta los escarabajos carroñeros de Tier 2.',
      'Producción base: 8 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Tanques económicos ideales para avanzar en primera línea protegiendo a los tiradores.',
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
    unitRecruitedBase: 'Avispa (Wasp)',
    unitRecruited: 'Avispa / Aguijoneador Gigante / Avispa Voraz',
    unitUpgrades: {
      branchA: 'Aguijoneador Gigante (Vuelo rápido con neurotoxina que paraliza durante 1 turno)',
      branchB: 'Avispa Voraz (Ataque y retirada sin contraataque enemiga y velocidad supersónica)',
      branchADetails: {
        unitName: 'Aguijoneador Gigante',
        nameEn: 'Giant Stinger',
        role: 'Volador Neurotóxico',
        keyAbilities: ['Aguijón Paralizante (25% prob. de parálisis)', 'Vuelo Rápido'],
        statsBonus: '+3 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Avispa Voraz',
        nameEn: 'Voracious Wasp',
        role: 'Hostigador Aéreo',
        keyAbilities: ['Golpear y Escapar (Sin contragolpe)', 'Ataque en Picado'],
        statsBonus: '+4 Ataque, +2 Velocidad'
      }
    },
    effects: [
      'Recluta las avispas y aguijoneadores voladores de Tier 3.',
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
    unitRecruitedBase: 'Mantis (Mantis)',
    unitRecruited: 'Mantis / Mirmidón Asesino / Mantis Segadora',
    unitUpgrades: {
      branchA: 'Mirmidón Asesino (Ataque doble con cuchillas quitinosas y salto acrobático)',
      branchB: 'Mantis Segadora (Ataque de barrido que corta a dos objetivos adyacentes ignorando armadura)',
      branchADetails: {
        unitName: 'Mirmidón Asesino',
        nameEn: 'Myrmidon Assassin',
        role: 'Infantería de Ataque Doble',
        keyAbilities: ['Ataque Doble', 'Salto Acrobático (Ignora obstáculos)'],
        statsBonus: '+4 Ataque, +3 Defensa, +12 Vida'
      },
      branchBDetails: {
        unitName: 'Mantis Segadora',
        nameEn: 'Reaper Mantis',
        role: 'Asesino Perforador de Armadura',
        keyAbilities: ['Corte Perforante (Ignora 30% defensa)', 'Barrido Doble'],
        statsBonus: '+5 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los feroces luchadores de melé de Tier 4.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'El ataque doble de los Mirmidones multiplica exponencialmente el beneficio de bendiciones y furia.',
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
    unitRecruitedBase: 'Horror / Madre de la Colmena (Hive Horror)',
    unitRecruited: 'Horror / Madre del Enjambre / Horror Psíquico',
    unitUpgrades: {
      branchA: 'Madre del Enjambre (Eclosiona larvas aliadas cada ronda de combate)',
      branchB: 'Horror Psíquico (Ataque mental a distancia que desorienta y drena maná)',
      branchADetails: {
        unitName: 'Madre del Enjambre',
        nameEn: 'Swarm Mother',
        role: 'Generadora de Tropas en Combate',
        keyAbilities: ['Eclosión de Larvas en Combate', 'Aura de Maternidad Feromonal'],
        statsBonus: '+4 Defensa, +20 Vida'
      },
      branchBDetails: {
        unitName: 'Horror Psíquico',
        nameEn: 'Psychic Horror',
        role: 'Tirador Mental',
        keyAbilities: ['Proyección Mental de Área', 'Drenaje de Concentración Arcano'],
        statsBonus: '+5 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta las matriarcas biológicas y terrores de Tier 5.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La invocación continua de larvas abruma la economía de acción enemiga en combates prolongados.',
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
    unitRecruitedBase: 'Gusano de Magma (Magma Worm)',
    unitRecruited: 'Gusano de Magma / Coloso de Fuego Subterráneo / Excavador Ígneo',
    unitUpgrades: {
      branchA: 'Coloso de Fuego Subterráneo (Erupción ígnea en línea que calcina casillas)',
      branchB: 'Excavador Ígneo (Túnel subterráneo que reaparece tras las líneas enemigas causando terremoto)',
      branchADetails: {
        unitName: 'Coloso de Fuego Subterráneo',
        nameEn: 'Subterranean Fire Colossus',
        role: 'Artillero Ígneo Pesado',
        keyAbilities: ['Erupción de Magma (Daña en línea recta)', 'Inmunidad al Fuego'],
        statsBonus: '+6 Ataque, +4 Defensa, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Excavador Ígneo',
        nameEn: 'Igneous Burrower',
        role: 'Emboscador Terrestre',
        keyAbilities: ['Túnel Sísmico (Reaparición instantánea)', 'Ola de Calor'],
        statsBonus: '+7 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los gusanos gigantes de magma de Tier 6.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Pueden excavar por debajo de las murallas de la ciudad enemiga en asedios para destruir tiradores protegidos.',
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
    unitRecruitedBase: 'Rey Libélula / Beelzebub (Dragonfly King / Beelzebub)',
    unitRecruited: 'Beelzebub / Rey Libélula / Abominación del Enjambre',
    unitUpgrades: {
      branchA: 'Rey Libélula (Vuelo hipersónico, aura de frenesí para todos los insectos y veneno mortal)',
      branchB: 'Abominación del Enjambre (Coloso demoníaco que devora tropas caídas y emite aura de descomposición)',
      branchADetails: {
        unitName: 'Rey Libélula',
        nameEn: 'Dragonfly King',
        role: 'Monarca Aéreo del Enjambre',
        keyAbilities: ['Frenesí de la Colmena (+2 Ataque a todos los insectos)', 'Aguijón de la Extinción'],
        statsBonus: '+10 Ataque, +8 Defensa, +90 Vida'
      },
      branchBDetails: {
        unitName: 'Abominación del Enjambre',
        nameEn: 'Swarm Abomination',
        role: 'Monstruo Demoniaco Colosal',
        keyAbilities: ['Aura de Podredumbre', 'Devorador de Vida'],
        statsBonus: '+12 Ataque, +4 Defensa, +110 Vida'
      }
    },
    effects: [
      'Recluta los monarcas y abominaciones de Tier 7 del Enjambre.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'El Rey Libélula eleva la efectividad de todo el ejército insectoide gracias a su aura de frenesí global.',
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
