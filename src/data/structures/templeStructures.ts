import { TownStructure } from '../../types';

export const TEMPLE_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO (AYUNTAMIENTO / ALCALDÍA CANÓNICA - 3 NIVELES)
  // =========================================================================
  {
    id: 'temple-solar-temple',
    name: 'Templo Solar (Ayuntamiento / Alcaldía - Niveles I, II y III)',
    nameEn: 'Solar Temple (Town Hall / City Hall - Levels I, II & III)',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 2500 },
    prerequisites: [],
    effects: [
      'Sede principal de gobierno y centro ceremonial de la fe de la Luz estructurada en 3 niveles de desarrollo.',
      'Otorga Oro, Puntos de Ley y Puntos de Astrología diarios incrementales, expandiendo la administración de la ciudad y el límite de héroes activos.',
      'Al ascender a Nivel II permite elegir una mejora económica especializada (+1.000 Oro, +1.000 Ley o +1.000 Astrología), y el Nivel III (Solar Temple III) consolida la gran metrópolis con el máximo rendimiento cívico de Jadame.'
    ],
    strategicTip: 'Mejora a Nivel II en Día 2-3 para acelerar el flujo cívico hacia la Caballería y culmina con Solar Temple III en Semana 2 para sostener los Ángeles.',
    timingRecommendation: 'Día 1 (Nivel I) / Día 2-3 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento Solar (Town Hall)',
        nameEn: 'Solar Settlement (Town Hall)',
        cost: { gold: 2500 },
        prerequisites: [],
        effects: [
          'Genera 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite la administración y gobierno de la provincia.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día',
        strategicTip: 'Base cívica inicial del Templo.'
      },
      {
        level: 2,
        name: 'Nivel II: Templo Solar II (City Hall)',
        nameEn: 'Solar Temple II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Mercado (Marketplace)'],
        effects: [
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite al propietario elegir una de las 3 mejoras económicas de Nivel 2 (+1.000 Oro/día, +1.000 Puntos de Ley/día, o +1.000 Puntos de Astrología/día).'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día (+ mejora a elección)',
        strategicTip: 'Construir el Día 2 o 3 para acelerar las leyes de facción o la economía dorada.'
      },
      {
        level: 3,
        name: 'Nivel III: Templo Solar III (Metropolis)',
        nameEn: 'Solar Temple III (Metropolis)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Templo Solar II (City Hall)'],
        effects: [
          'Cúspide de la administración civil y eclesiástica del Templo en Olden Era.',
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios adicionales para el reino.',
          'Culmina el desarrollo de la metrópolis santa, afianzando los recursos para las cruzadas celestiales.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día adicionales',
        strategicTip: 'Edificar en Semana 2 para garantizar la economía de reclutamiento de Ángeles y Paladines.'
      }
    ]
  },

  // =========================================================================
  // BANCO Y TESORERÍA (ECONOMÍA SUPREMA DE OLDEN ERA)
  // =========================================================================
  {
    id: 'temple-bank',
    name: 'Banco (Bank)',
    nameEn: 'Bank',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)', 'Templo Solar (Ayuntamiento / Alcaldía)'],
    effects: [
      'Entidad financiera del Templo que canaliza los tributos del reino.',
      'Genera +500 de Oro diario adicional y es prerrequisito indispensable para erigir la Tesorería.'
    ],
    strategicTip: 'Edificar a mediados de la primera semana para abrir paso a la Tesorería.',
    timingRecommendation: 'Semana 1 (Día 5-6).',
  },
  {
    id: 'temple-treasury',
    name: 'Tesorería (Treasury)',
    nameEn: 'Treasury',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 5000, wood: 10, ore: 10 },
    prerequisites: ['Banco (Bank)', 'Mercado (Marketplace)', 'Fortificaciones (Fortifications)'],
    effects: [
      'Estructura económica suprema de Olden Era (equivalente canónico al Capitolio).',
      'Genera +2.000 de Oro diario adicional de forma permanente para el reino.',
      'Requiere haber consolidado el Banco, el Mercado y las Fortificaciones.'
    ],
    strategicTip: 'Proporciona la base económica dorada necesaria para costear el reclutamiento de Ángeles y Justicieros cada semana.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II Y III)
  // =========================================================================
  {
    id: 'temple-fortifications',
    name: 'Fortificaciones (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Templo',
    cost: { gold: 2500, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona murallas protectoras durante los asedios.',
      'Permite elegir mejoras defensivas sagradas para la defensa de la ciudadela.',
      'Al ascender a Niveles II y III duplica la producción de tropas del Templo (+50% y +100%).'
    ],
    strategicTip: 'Mejorar a Nivel II en el Día 7 de la Semana 1 para aumentar la producción de tropas del reset semanal.',
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
        defenseBonus: 'Muralla perimetral de piedra bendita',
        strategicTip: 'Defensa base de la ciudad.'
      },
      {
        level: 2,
        name: 'Nivel II: Fortificaciones II (Citadel)',
        nameEn: 'Fortifications II',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones (Fortifications)'],
        effects: [
          'Añade dos torres a las almenas que disparan automáticamente a los atacantes durante los asedios.',
          'Aumenta la producción semanal de todas las criaturas del Templo en un +50%.'
        ],
        defenseBonus: '2 Torres de arqueros sagrados',
        growthBonus: '+50% Crecimiento semanal de criaturas',
        strategicTip: 'Construir el Día 7 de la Semana 1 para maximizar el reclutamiento.'
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
        defenseBonus: 'Torre Central Solar + foso exterior',
        growthBonus: '+100% Crecimiento semanal de criaturas (duplica producción)',
        strategicTip: 'Permite acumular grandes contingentes de Cruzados y Caballeros.'
      }
    ]
  },

  // =========================================================================
  // GREMIO DE MAGOS (MAGE GUILD I A V) & CONEXIÓN AL OBSERVATORIO MÁGICO
  // =========================================================================
  {
    id: 'temple-mage-guild',
    name: 'Gremio de Magos (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Templo',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio sacerdotal de la Luz interconectado con la red del Observatorio Mágico (Celestial Observatory).',
      'Desbloquea hechizos de Tiers 1 a 5 en el Observatorio Mágico del reino, con alta afinidad hacia la Escuela de Luz (Daylight Magic).',
      'Cualquier héroe que visite la ciudad aprende todos los hechizos desbloqueados y recarga su maná al 100%.'
    ],
    strategicTip: 'Proporciona hechizos esenciales de bendición, sanación y protección divina.',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6) / Niveles 3-5 (Semanas 2-4).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Gremio de Magos Nivel 1',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Desbloquea hechizos de Nivel 1 en el Observatorio Mágico.', 'Otorga Libro de Hechizos y recarga maná al 100%.'],
        strategicTip: 'Requisito para la Basílica del Umbral (Tier 4).'
      },
      {
        level: 2,
        name: 'Gremio de Magos Nivel 2',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 4 },
        prerequisites: ['Gremio de Magos Nivel 1'],
        effects: ['Desbloquea hechizos de Nivel 2 en el Observatorio Mágico.'],
        strategicTip: 'Acceso a bendiciones mayores y curación grupal.'
      },
      {
        level: 3,
        name: 'Gremio de Magos Nivel 3',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 6 },
        prerequisites: ['Gremio de Magos Nivel 2'],
        effects: ['Desbloquea hechizos de Nivel 3 de las escuelas canónicas en el Observatorio Mágico.'],
        strategicTip: 'Potencia los milagros de la Luz en batallas de asedio.'
      },
      {
        level: 4,
        name: 'Gremio de Magos Nivel 4',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 8 },
        prerequisites: ['Gremio de Magos Nivel 3'],
        effects: ['Desbloquea hechizos mayores de Nivel 4 en el Observatorio Mágico.'],
        strategicTip: 'Hechizos sagrados de resurrección y escudos divinos.'
      },
      {
        level: 5,
        name: 'Gremio de Magos Nivel 5',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 10 },
        prerequisites: ['Gremio de Magos Nivel 4'],
        effects: ['Desbloquea hechizos supremos de Nivel 5 de Luz y Primigenia.'],
        strategicTip: 'Milagros supremos que deciden el resultado de la partida.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS, COMERCIO Y DEPÓSITOS
  // =========================================================================
  {
    id: 'temple-tavern',
    name: 'Taberna (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite reclutar héroes adicionales (Caballeros y Clérigos) para acelerar la recogida de cofres y minas.',
      'Permite escuchar rumores e informes del reino.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe de inmediato.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'temple-marketplace',
    name: 'Mercado (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 500, wood: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Permite intercambiar recursos y oro en el mercado de la ciudad.',
      'Las tasas de intercambio mejoran conforme el jugador controla más Mercados en su reino.',
      'Permite convertir recursos secundarios en Cristales o Gemas para la Forja Radiante.'
    ],
    strategicTip: 'Construir en Semana 1 para financiar las moradas de ángeles y caballería.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'temple-artifact-merchant',
    name: 'Comerciante de Artefactos (Artifact Merchant)',
    nameEn: 'Artifact Merchant',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)'],
    effects: [
      'Establece una tienda permanente de reliquias y artefactos sagrados en la ciudad.',
      'Permite comprar y vender artefactos de diversos tiers para equipar a los paladines y clérigos del Templo.'
    ],
    strategicTip: 'Permite adquirir reliquias que potencian la moral o la magia de Luz de tu comandante principal.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'temple-resource-silo',
    name: 'Silo de Recursos (Resource Silo)',
    nameEn: 'Resource Silo',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 0, gems: 3, mercury: 3 },
    prerequisites: ['Mercado (Marketplace)', 'Banco (Bank)'],
    effects: [
      'Genera +1 Cristal diario de forma pasiva (recurso raro principal del Templo).',
      'Asegura el suministro continuo de cristales para la Forja Radiante y el Gremio de Magos.'
    ],
    strategicTip: 'Requiere Mercado y Banco. Construir en cuanto se tengan 3 de cada recurso raro secundario para estabilizar la economía de cristales.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'temple-alchemical-silo',
    name: 'Silo Alquímico (Alchemic Silo)',
    nameEn: 'Alchemic Silo',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 2000, ore: 5, crystal: 2 },
    prerequisites: ['Silo de Recursos (Resource Silo)'],
    effects: [
      'Produce Polvo Alquímico (Alchemical Dust) diariamente.',
      'El Polvo Alquímico es el recurso canónico esencial de Olden Era necesario para ascender moradas a niveles magistrales y potenciar hechizos en el Observatorio Mágico.'
    ],
    strategicTip: 'Requiere el Silo de Recursos. Vital para desbloquear las mejoras maestras de Justicieros y Arcángeles.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CANÓNICAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'temple-garrison',
    name: 'Guarnición (Garrison)',
    nameEn: 'Garrison',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Guardia (Guard)',
    unitRecruited: 'Guardia / Espadachín / Alabardero Real',
    unitUpgrades: {
      branchA: 'Espadachín (Armadura pesada y formación de escudo con reducción de daño a distancia)',
      branchB: 'Alabardero Real (Mayor alcance de ataque y bonificación de daño contra caballería)',
      branchADetails: {
        unitName: 'Espadachín',
        nameEn: 'Swordsman',
        role: 'Línea de Escudo Defensiva',
        keyAbilities: ['Muro de Escudos (-25% daño de proyectiles)', 'Guardia Férrea'],
        statsBonus: '+3 Defensa, +4 Vida'
      },
      branchBDetails: {
        unitName: 'Alabardero Real',
        nameEn: 'Royal Halberdier',
        role: 'Infantería Anticarro',
        keyAbilities: ['Pica contra Carga (Doble daño frente a unidades grandes/rápidas)', 'Alcance de Lanza'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta la infantería básica de Tier 1 del Templo.',
      'Producción base: 14 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Infantería barata y muy resistente cuando se activa el muro de escudos.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'temple-mews',
    name: 'Halconera (Mews)',
    nameEn: 'Mews',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Guarnición (Garrison)'],
    unitRecruitedBase: 'Sabueso de Caza (War Hound)',
    unitRecruited: 'Sabueso de Caza / Sabueso de Guerra / Vigilante Alado',
    unitUpgrades: {
      branchA: 'Sabueso de Guerra (Carga rápida que desgarra armadura enemiga)',
      branchB: 'Vigilante Alado (Acompañante rapaz con iniciativa ultra alta y visión ampliada)',
      branchADetails: {
        unitName: 'Sabueso de Guerra',
        nameEn: 'War Hound',
        role: 'Hostigador Rápido',
        keyAbilities: ['Desgarre de Armadura', 'Carga Veloz (+2 casillas en primer turno)'],
        statsBonus: '+3 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Vigilante Alado',
        nameEn: 'Winged Watcher',
        role: 'Explorador y Anulador de Iniciativa',
        keyAbilities: ['Hostigamiento Aéreo', 'Ataque y Retirada'],
        statsBonus: '+2 Defensa, +3 Iniciativa'
      }
    },
    effects: [
      'Recluta las bestias y exploradores de Tier 2.',
      'Producción base: 9 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Unidades veloces para trabar tiradores enemigos en el primer asalto.',
    timingRecommendation: 'Día 2-3.',
  },
  {
    id: 'temple-griffin-rookery',
    name: 'Nido de Grifos (Griffin Rookery)',
    nameEn: 'Griffin Rookery',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 3,
    dwellingTier: 3,
    cost: { gold: 1500, ore: 5 },
    dwellingUpgradeCost: { gold: 1500, ore: 5 },
    prerequisites: ['Halconera (Mews)'],
    unitRecruitedBase: 'Grifo (Griffin)',
    unitRecruited: 'Grifo / Grifo Real / Grifo Sagrado',
    unitUpgrades: {
      branchA: 'Grifo Real (Contragolpes infinitos y picado aéreo)',
      branchB: 'Grifo Sagrado (Aura sagrada que protege a tropas aliadas adyacentes de proyectiles)',
      branchADetails: {
        unitName: 'Grifo Real',
        nameEn: 'Royal Griffin',
        role: 'Volador de Contragolpe Total',
        keyAbilities: ['Contragolpes Ilimitados', 'Picado en Vuelo'],
        statsBonus: '+3 Ataque, +2 Defensa, +8 Vida'
      },
      branchBDetails: {
        unitName: 'Grifo Sagrado',
        nameEn: 'Sacred Griffin',
        role: 'Guardián Aéreo de la Luz',
        keyAbilities: ['Escudo de Plumas Radiantes', 'Inmunidad a Miedo'],
        statsBonus: '+4 Defensa, +1 Moral'
      }
    },
    effects: [
      'Recluta los voladores pesados de Tier 3.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'El Grifo Real con contragolpes ilimitados es letal cuando se lanza contra grupos masivos de tropas débiles.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'temple-threshold-basilica',
    name: 'Basílica del Umbral (Threshold Basilica)',
    nameEn: 'Threshold Basilica',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 2000, wood: 5, crystal: 2 },
    prerequisites: ['Nido de Grifos (Griffin Rookery)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Inquisidor (Inquisitor)',
    unitRecruited: 'Inquisidor / Gran Inquisidor / Purificador de la Luz',
    unitUpgrades: {
      branchA: 'Gran Inquisidor (Tirador sagrado sin penalización de melé que disipa magia negativa)',
      branchB: 'Purificador de la Luz (Lanza proyectiles de fuego celestial con daño en área de cruz)',
      branchADetails: {
        unitName: 'Gran Inquisidor',
        nameEn: 'Grand Inquisitor',
        role: 'Tirador Mágico de Soporte',
        keyAbilities: ['Sin penalización cuerpo a cuerpo', 'Disipar Maldiciones en aliados'],
        statsBonus: '+3 Ataque, +4 Defensa, +12 Vida'
      },
      branchBDetails: {
        unitName: 'Purificador de la Luz',
        nameEn: 'Light Purifier',
        role: 'Artillero Celestial de Área',
        keyAbilities: ['Fuego Sagrado en Cruz (Daña en área)', 'Daño adicional contra No-Muertos (+50%)'],
        statsBonus: '+5 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los tiradores sagrados de Tier 4 del Templo.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Núcleo de daño a distancia del Templo; letal contra criaturas de la Necrópolis y el Cisma.',
    timingRecommendation: 'Día 4-5.',
  },
  {
    id: 'temple-sundrop-chapel',
    name: 'Capilla de la Gota Solar (Sundrop Chapel)',
    nameEn: 'Sundrop Chapel',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, ore: 5, crystal: 4 },
    dwellingUpgradeCost: { gold: 3000, ore: 5, crystal: 3 },
    prerequisites: ['Basílica del Umbral (Threshold Basilica)'],
    unitRecruitedBase: 'Tejedor de Luz (Lightweaver)',
    unitRecruited: 'Tejedor de Luz / Clérigo Solar / Canalizador Radiante',
    unitUpgrades: {
      branchA: 'Clérigo Solar (Lanza bendiciones y cura a aliados caídos cada ronda)',
      branchB: 'Canalizador Radiante (Haz solar continuo que ciega y daña en línea recta)',
      branchADetails: {
        unitName: 'Clérigo Solar',
        nameEn: 'Solar Cleric',
        role: 'Sanador y Buffer Sagrado',
        keyAbilities: ['Rayo Sanador Divino', 'Aura de Bendición Permanente'],
        statsBonus: '+4 Defensa, +15 Vida'
      },
      branchBDetails: {
        unitName: 'Canalizador Radiante',
        nameEn: 'Radiant Channeler',
        role: 'Ofensivo de Haz Solar',
        keyAbilities: ['Haz de Luz Penetrante', 'Destello Cegador (Prob. de cegar objetivo)'],
        statsBonus: '+5 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los hechiceros y sacerdotes solares de Tier 5.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Mantiene vivo al ejército mediante sanación pasiva y desactiva colosos rivales con ceguera.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'temple-hippodrome',
    name: 'Hipódromo (Hippodrome)',
    nameEn: 'Hippodrome',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, wood: 10, ore: 10 },
    dwellingUpgradeCost: { gold: 4000, wood: 5, crystal: 4 },
    prerequisites: ['Capilla de la Gota Solar (Sundrop Chapel)'],
    unitRecruitedBase: 'Caballero (Knight)',
    unitRecruited: 'Caballero / Caballero del Templo / Justiciero Sagrado',
    unitUpgrades: {
      branchA: 'Caballero del Templo (Carga de caballería que escala con la distancia recorrida)',
      branchB: 'Justiciero Sagrado (Aura de venganza: inflige daño sagrado de represalia al recibir impactos)',
      branchADetails: {
        unitName: 'Caballero del Templo',
        nameEn: 'Temple Knight',
        role: 'Caballería Pesada de Choque',
        keyAbilities: ['Carga de Lanza Devastadora (+5% daño por casilla recorrida)', 'Pisotón Ecuestre'],
        statsBonus: '+6 Ataque, +4 Defensa, +25 Vida'
      },
      branchBDetails: {
        unitName: 'Justiciero Sagrado',
        nameEn: 'Holy Justiciar',
        role: 'Vindicador Acorazado',
        keyAbilities: ['Retribución Radiante (Daño reflejado)', 'Inmunidad a Ralentización'],
        statsBonus: '+7 Ataque, +2 Velocidad'
      }
    },
    effects: [
      'Recluta la caballería de choque de élite de Tier 6.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Cruza el campo de batalla de lado a lado en un turno; maximiza la distancia recorrida para multiplicar el daño de carga.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'temple-radiant-forge',
    name: 'Forja Radiante (Radiant Forge)',
    nameEn: 'Radiant Forge',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 10000, ore: 15, crystal: 10 },
    dwellingUpgradeCost: { gold: 8000, ore: 10, crystal: 8 },
    prerequisites: ['Hipódromo (Hippodrome)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Ángel (Angel)',
    unitRecruited: 'Ángel / Arcángel / Serafín de la Aurora',
    unitUpgrades: {
      branchA: 'Arcángel (Resurrección de tropas caídas una vez por combate y máxima moral)',
      branchB: 'Serafín de la Aurora (Espada de fuego divino que inflige daño sagrado verdadero y vuelo supersónico)',
      branchADetails: {
        unitName: 'Arcángel',
        nameEn: 'Archangel',
        role: 'Coloso Celestial de Resurrección',
        keyAbilities: ['Resurrección Divina', 'Moral Máxima (+1 permanente al ejército)', 'Espada Sagrada'],
        statsBonus: '+10 Ataque, +10 Defensa, +100 Vida'
      },
      branchBDetails: {
        unitName: 'Serafín de la Aurora',
        nameEn: 'Dawn Seraph',
        role: 'Aniquilador Radiante',
        keyAbilities: ['Daño Sagrado Puro (Ignora 50% de defensa)', 'Llama de Purificación', 'Velocidad Celestial'],
        statsBonus: '+12 Ataque, +4 Iniciativa, +80 Vida'
      }
    },
    effects: [
      'Recluta los Ángeles supremos de Tier 7 del Templo.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'El Arcángel puede revivir Justicieros o Cruzados caídos en el combate final, evitando pérdidas irremplazables.',
    timingRecommendation: 'Final de Semana 1 o inicio de Semana 2.',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (TEMPLO) CONFIRMADAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'temple-scouting-skyship',
    name: 'Aeronave de Reconocimiento (Scouting Skyship)',
    nameEn: 'Scouting Skyship',
    category: 'Estructuras Especiales de Facción',
    faction: 'Templo',
    isFactionUnique: true,
    cost: { gold: 2000, wood: 10, crystal: 2 },
    prerequisites: ['Templo Solar (Ayuntamiento / Alcaldía)'],
    effects: [
      'Disipa permanentemente la niebla de guerra en un radio de 20 casillas alrededor de la ciudad.',
      'Permite avistar con antelación cualquier movimiento de ejércitos o héroes rivales en las fronteras de la provincia.'
    ],
    strategicTip: 'Otorga una ventaja de información colosal para anticipar emboscadas enemigas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'temple-guild-six-winds',
    name: 'Gremio de los Seis Vientos (Guild of Six Winds)',
    nameEn: 'Guild of Six Winds',
    category: 'Estructuras Especiales de Facción',
    faction: 'Templo',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, crystal: 3 },
    prerequisites: ['Gremio de Magos (Mage Guild)'],
    effects: [
      'Permite a un héroe elegido pasar un día en la ciudad entrenando para recibir un aumento permanente de +1 a un atributo primario (Ataque, Defensa, Poder Mágico o Conocimiento).',
      'Puede ser utilizado por diferentes héroes aliados a lo largo de la campaña.'
    ],
    strategicTip: 'Ideal para optimizar los atributos del héroe principal antes de los enfrentamientos decisivos.',
    timingRecommendation: 'Semana 2-3.',
  },
  {
    id: 'temple-golden-calf',
    name: 'Becerro de Oro (Golden Calf - Santuario del Grial)',
    nameEn: 'Golden Calf',
    category: 'Estructuras Especiales de Facción',
    faction: 'Templo',
    isFactionUnique: true,
    cost: { gold: 0 },
    prerequisites: ['Descubrimiento del Santo Grial (Mirage)'],
    effects: [
      'Estructura suprema del Santo Grial para el Templo (construida al llevar el Grial obtenido del Espejismo en el mapa).',
      'Genera +5.000 de Oro diario adicional para el reino.',
      'Aumenta el crecimiento semanal de todas las criaturas del Templo en la ciudad en un +100% adicional.'
    ],
    strategicTip: 'Convierte la ciudad en una fuente inagotable de oro y Arcángeles.',
    timingRecommendation: 'Al derrotar el Espejismo (Mirage).',
  },
];
