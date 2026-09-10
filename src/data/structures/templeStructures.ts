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
      'Estructura económica suprema de Olden Era (Tesorería / Bonificación Financiera de +2.000 Oro/día).',
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
    id: 'temple-crossbowman-range',
    name: 'Campo de Tiro de Ballesteros (Crossbowman Range)',
    nameEn: 'Crossbowman Range',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Ballestero (Crossbowman)',
    unitRecruited: 'Ballestero / Tirador Certero / Halconero',
    unitUpgrades: {
      branchA: 'Tirador Certero (Mayor cadencia y perforación de armadura a distancia)',
      branchB: 'Halconero (Hostigamiento con rapaz adiestrado y anulación de penalización por distancia)',
      branchADetails: {
        unitName: 'Tirador Certero',
        nameEn: 'Marksman',
        role: 'Tirador de Perforación',
        keyAbilities: ['Disparo Doble', 'Perforación de Armadura'],
        statsBonus: '+3 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Halconero',
        nameEn: 'Falconer',
        role: 'Tirador de Reconocimiento y Hostigamiento',
        keyAbilities: ['Ataque de Halcón', 'Sin penalización por distancia'],
        statsBonus: '+2 Ataque, +2 Defensa, +1 Velocidad'
      }
    },
    effects: [
      'Recluta los tiradores básicos de Tier 1 del Templo.',
      'Producción base: 14 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Núcleo fundamental de daño a distancia temprano para el creeping sin bajas en los Días 1 a 4.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'temple-infantry-barracks',
    name: 'Barracones de Infantería (Infantry Barracks)',
    nameEn: 'Infantry Barracks',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Campo de Tiro de Ballesteros (Crossbowman Range)'],
    unitRecruitedBase: 'Espadachín (Swordsman)',
    unitRecruited: 'Espadachín / Égida del Sol / Capitán de la Guardia',
    unitUpgrades: {
      branchA: 'Égida del Sol (Muro de escudos bendito con reducción de daño a distancia)',
      branchB: 'Capitán de la Guardia (Aura de disciplina que incrementa la moral e iniciativa de tropas adyacentes)',
      branchADetails: {
        unitName: 'Égida del Sol',
        nameEn: 'Sun Aegis',
        role: 'Línea de Escudo Defensiva',
        keyAbilities: ['Muro de Escudos (-30% daño de proyectiles)', 'Guardia Radiante'],
        statsBonus: '+4 Defensa, +6 Vida'
      },
      branchBDetails: {
        unitName: 'Capitán de la Guardia',
        nameEn: 'Guard Captain',
        role: 'Infantería Ofensiva de Mando',
        keyAbilities: ['Aura de Disciplina (+1 Moral a adyacentes)', 'Contragolpe Firme'],
        statsBonus: '+3 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta la infantería acorazada de Tier 2 del Templo.',
      'Producción base: 9 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Infantería barata y resistente para proteger a los ballesteros y resistir cargas enemigas.',
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
    prerequisites: ['Barracones de Infantería (Infantry Barracks)'],
    unitRecruitedBase: 'Grifo (Griffin)',
    unitRecruited: 'Grifo / Grifo Guardián / Grifo de Templo',
    unitUpgrades: {
      branchA: 'Grifo Guardián (Contragolpes infinitos y picado aéreo)',
      branchB: 'Grifo de Templo (Aura sagrada que mitiga proyectiles contra tropas aliadas adyacentes)',
      branchADetails: {
        unitName: 'Grifo Guardián',
        nameEn: 'Guardian Griffin',
        role: 'Volador de Contragolpe Total',
        keyAbilities: ['Contragolpes Ilimitados', 'Picado en Vuelo'],
        statsBonus: '+3 Ataque, +2 Defensa, +8 Vida'
      },
      branchBDetails: {
        unitName: 'Grifo de Templo',
        nameEn: 'Temple Griffin',
        role: 'Guardián Aéreo de la Luz',
        keyAbilities: ['Escudo de Plumas Radiantes', 'Inmunidad a Miedo'],
        statsBonus: '+4 Defensa, +1 Moral'
      }
    },
    effects: [
      'Recluta los voladores pesados de Tier 3.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'El Grifo Guardián con contragolpes ilimitados es letal cuando se lanza contra grupos masivos de tropas débiles.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'temple-sundrop-chapel',
    name: 'Capilla de la Gota Solar (Sundrop Chapel)',
    nameEn: 'Sundrop Chapel',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, wood: 5, ore: 5, crystal: 2 },
    dwellingUpgradeCost: { gold: 2000, wood: 5, crystal: 3 },
    prerequisites: ['Nido de Grifos (Griffin Rookery)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Tejedora de Luz (Lightweaver)',
    unitRecruited: 'Tejedora de Luz / Heraldo del Sol / Hierofante',
    unitUpgrades: {
      branchA: 'Heraldo del Sol (Canaliza destellos cegadores y proyectiles radiantes de alta potencia)',
      branchB: 'Hierofante (Lanza bendiciones solares y cura a aliados caídos cada ronda)',
      branchADetails: {
        unitName: 'Heraldo del Sol',
        nameEn: 'Sun Herald',
        role: 'Canalizador Radiante Ofensivo',
        keyAbilities: ['Destello Solar Cegador', 'Disparo de Luz Sagrada'],
        statsBonus: '+4 Ataque, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Hierofante',
        nameEn: 'Hierophant',
        role: 'Sanador y Buffer Sagrado',
        keyAbilities: ['Rayo Sanador Divino', 'Aura de Bendición Permanente'],
        statsBonus: '+3 Defensa, +15 Vida'
      }
    },
    effects: [
      'Recluta las magas y sanadoras solares de Tier 4 del Templo.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Mantiene vivo al ejército mediante sanación pasiva y desactiva colosos rivales con ceguera.',
    timingRecommendation: 'Día 5-6.',
  },
  {
    id: 'temple-hippodrome',
    name: 'Hipódromo (Hippodrome)',
    nameEn: 'Hippodrome',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, wood: 10, ore: 5 },
    dwellingUpgradeCost: { gold: 3000, wood: 5, ore: 5 },
    prerequisites: ['Capilla de la Gota Solar (Sundrop Chapel)'],
    unitRecruitedBase: 'Caballería (Cavalry)',
    unitRecruited: 'Caballería / Caballería de Lanza Solar / Caballería Noble',
    unitUpgrades: {
      branchA: 'Caballería de Lanza Solar (Carga de caballería que escala con la distancia recorrida)',
      branchB: 'Caballería Noble (Aura de mando caballeresco que reduce el daño recibido durante la carga)',
      branchADetails: {
        unitName: 'Caballería de Lanza Solar',
        nameEn: 'Sunlance Cavalry',
        role: 'Caballería Pesada de Choque',
        keyAbilities: ['Carga de Lanza Devastadora (+5% daño por casilla recorrida)', 'Pisotón Ecuestre'],
        statsBonus: '+6 Ataque, +4 Defensa, +20 Vida'
      },
      branchBDetails: {
        unitName: 'Caballería Noble',
        nameEn: 'Noble Cavalry',
        role: 'Caballería Acorazada de Ruptura',
        keyAbilities: ['Armadura de Jinete (-20% daño en carrera)', 'Inmunidad a Ralentización'],
        statsBonus: '+5 Ataque, +5 Defensa, +25 Vida'
      }
    },
    effects: [
      'Recluta la caballería de choque de Tier 5 del Templo.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Cruza el campo de batalla de lado a lado en un turno; maximiza la distancia recorrida para multiplicar el daño de carga.',
    timingRecommendation: 'Final de Semana 1 o inicio de Semana 2.',
  },
  {
    id: 'temple-threshold-basilica',
    name: 'Basílica del Umbral (Threshold Basilica)',
    nameEn: 'Threshold Basilica',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, wood: 5, ore: 10, crystal: 4 },
    dwellingUpgradeCost: { gold: 4000, wood: 5, crystal: 4 },
    prerequisites: ['Hipódromo (Hippodrome)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Inquisidor (Inquisitor)',
    unitRecruited: 'Inquisidor / Excomulgador / Madre Superiora',
    unitUpgrades: {
      branchA: 'Excomulgador (Tirador sagrado sin penalización de melé que purga bendiciones enemigas y magia oscura)',
      branchB: 'Madre Superiora (Lanza fuegos celestiales en cruz y potencia la resistencia mágica aliada)',
      branchADetails: {
        unitName: 'Excomulgador',
        nameEn: 'Excommunicator',
        role: 'Inquisidor Purificador de Magia Oscura',
        keyAbilities: ['Sin penalización cuerpo a cuerpo', 'Purga Sagrada (+50% daño vs No-Muertos/Vacío)'],
        statsBonus: '+6 Ataque, +4 Defensa, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Madre Superiora',
        nameEn: 'Mother Superior',
        role: 'Artillera Celestial de Área',
        keyAbilities: ['Fuego Sagrado en Cruz (Daño en área)', 'Aura de Fe Implacable'],
        statsBonus: '+5 Ataque, +6 Defensa, +35 Vida'
      }
    },
    effects: [
      'Recluta los inquisidores sagrados de Tier 6 del Templo.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Núcleo de daño a distancia y disipación mágica de Tier 6; letal contra criaturas de la Necrópolis y el Cisma.',
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
    prerequisites: ['Basílica del Umbral (Threshold Basilica)', 'Gremio de Magos Nivel 2'],
    unitRecruitedBase: 'Ángel (Angel)',
    unitRecruited: 'Ángel / Arcángel / Apoteosis',
    unitUpgrades: {
      branchA: 'Arcángel (Resurrección de tropas caídas una vez por combate y máxima moral)',
      branchB: 'Apoteosis (Espada sagrada de daño puro que desintegra defensas y desata tormentas radiantes)',
      branchADetails: {
        unitName: 'Arcángel',
        nameEn: 'Archangel',
        role: 'Coloso Celestial de Resurrección',
        keyAbilities: ['Resurrección Divina', 'Moral Máxima (+1 permanente al ejército)', 'Espada Sagrada'],
        statsBonus: '+10 Ataque, +10 Defensa, +100 Vida'
      },
      branchBDetails: {
        unitName: 'Apoteosis',
        nameEn: 'Apotheosis',
        role: 'Aniquilador Radiante de Luz Pura',
        keyAbilities: ['Daño Sagrado Puro (Ignora 50% de defensa)', 'Furia Celestial', 'Velocidad Divina'],
        statsBonus: '+12 Ataque, +4 Iniciativa, +80 Vida'
      }
    },
    effects: [
      'Recluta los Ángeles supremos de Tier 7 del Templo.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'El Arcángel puede revivir Caballeros o Inquisidores caídos en el combate final, evitando pérdidas irremplazables.',
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
