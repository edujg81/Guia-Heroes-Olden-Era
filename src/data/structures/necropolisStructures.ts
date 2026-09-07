import { TownStructure } from '../../types';

export const NECROPOLIS_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO (AYUNTAMIENTO / ALCALDÍA CANÓNICA - 3 NIVELES)
  // =========================================================================
  {
    id: 'necropolis-eternal-visage',
    name: 'Rostro Eterno (Ayuntamiento / Alcaldía - Niveles I, II y III)',
    nameEn: 'Eternal Visage (Town Hall / City Hall - Levels I, II & III)',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 2500 },
    prerequisites: [],
    effects: [
      'Sede principal de la corona no-muerta y centro de canalización nigromántica estructurado en 3 niveles canónicos.',
      'Otorga Oro, Puntos de Ley y Puntos de Astrología diarios incrementales, expandiendo la administración de la ciudad y el límite de héroes activos.',
      'Al ascender a Nivel II permite elegir una mejora económica especializada (+1.000 Oro, +1.000 Ley o +1.000 Astrología), y el Nivel III (Eternal Visage III) culmina el poder del mausoleo de los muertos vivientes.'
    ],
    strategicTip: 'Mejora a Nivel II en el Día 2 para acelerar la acumulación de oro para moradas y culmina en Rostro Eterno III en Semana 2.',
    timingRecommendation: 'Día 1 (Nivel I) / Día 2-3 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento Tétrico (Town Hall)',
        nameEn: 'Gloomy Settlement (Town Hall)',
        cost: { gold: 2500 },
        prerequisites: [],
        effects: [
          'Genera 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite la administración de la ciudad cadavérica.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día',
        strategicTip: 'Base cívica inicial de la Necrópolis.'
      },
      {
        level: 2,
        name: 'Nivel II: Rostro Eterno II (City Hall)',
        nameEn: 'Eternal Visage II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Mercado (Marketplace)'],
        effects: [
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite al propietario elegir una de las 3 mejoras económicas de Nivel 2 (+1.000 Oro/día, +1.000 Puntos de Ley/día, o +1.000 Puntos de Astrología/día).'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día (+ mejora a elección)',
        strategicTip: 'Construir el Día 2 o 3 para financiar las moradas de Liches y Vampiros.'
      },
      {
        level: 3,
        name: 'Nivel III: Rostro Eterno III (Metropolis)',
        nameEn: 'Eternal Visage III (Metropolis)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Rostro Eterno II (City Hall)'],
        effects: [
          'Máxima cúspide del centro de poder de la Necrópolis en Olden Era.',
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología adicionales diarios para el reino.',
          'Consolida el imperio cadavérico, facilitando el reclutamiento masivo de Dragones de Hueso y Vampiros.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día adicionales',
        strategicTip: 'Edificar en Semana 2 para garantizar el sostenimiento de las legiones de no-muertos.'
      }
    ]
  },

  // =========================================================================
  // BANCO Y TESORERÍA (ECONOMÍA SUPREMA DE OLDEN ERA)
  // =========================================================================
  {
    id: 'necropolis-bank',
    name: 'Banco (Bank)',
    nameEn: 'Bank',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)', 'Rostro Eterno (Ayuntamiento / Alcaldía)'],
    effects: [
      'Cámara de custodia y tasación de tributos óseos del reino no-muerto.',
      'Genera +500 de Oro diario adicional y es prerrequisito indispensable para edificar la Tesorería.'
    ],
    strategicTip: 'Edificar para desbloquear la Tesorería y duplicar los ingresos pasivos.',
    timingRecommendation: 'Semana 1 (Día 5-6).',
  },
  {
    id: 'necropolis-treasury',
    name: 'Tesorería (Treasury)',
    nameEn: 'Treasury',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 5000, wood: 10, ore: 10 },
    prerequisites: ['Banco (Bank)', 'Mercado (Marketplace)', 'Fortificaciones (Fortifications)'],
    effects: [
      'Estructura económica suprema de Olden Era (equivalente canónico al Capitolio).',
      'Genera +2.000 de Oro diario adicional de forma permanente para el reino.',
      'Requiere haber consolidado el Banco, el Mercado y las Fortificaciones.'
    ],
    strategicTip: 'Proporciona el capital necesario para comprar ejércitos enteros de Liches y Vampiros en cada turno.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II Y III)
  // =========================================================================
  {
    id: 'necropolis-fortifications',
    name: 'Fortificaciones (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Necrópolis',
    cost: { gold: 2500, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona murallas protectoras durante los asedios.',
      'Permite elegir mejoras defensivas de fosa y baluartes funerarios.',
      'Al ascender a Niveles II y III incrementa masivamente el crecimiento de no-muertos (+50% y +100%).'
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
          'Proporciona una muralla defensiva durante los asedios.',
          'Permite elegir una mejora defensiva de nivel 1.'
        ],
        defenseBonus: 'Muralla perimetral de piedra osaria',
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
          'Aumenta la producción semanal de todas las criaturas de la Necrópolis en un +50%.'
        ],
        defenseBonus: '2 Torres de proyectiles cadavéricos',
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
        defenseBonus: 'Torre Central Tétrica + foso de miasma',
        growthBonus: '+100% Crecimiento semanal de criaturas (duplica producción)',
        strategicTip: 'Duplica la producción de Liches, Vampiros y Dragones de Hueso.'
      }
    ]
  },

  // =========================================================================
  // GREMIO DE MAGOS (MAGE GUILD I A V) & CONEXIÓN AL OBSERVATORIO MÁGICO
  // =========================================================================
  {
    id: 'necropolis-mage-guild',
    name: 'Gremio de Magos (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Necrópolis',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Cónclave de nigromantes y sacerdotes de sombras interconectado con el Observatorio Mágico (Celestial Observatory).',
      'Desbloquea hechizos de Tiers 1 a 5 en el Observatorio Mágico del reino, con alta afinidad hacia la Escuela de Nochesombra (Nightshade Magic).',
      'Cualquier héroe que visite la ciudad aprende todos los hechizos desbloqueados y recarga su maná al 100%.'
    ],
    strategicTip: 'Desbloquea maldiciones de ralentización, peste y debilidad para desgastar a los ejércitos rivales.',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6) / Niveles 3-5 (Semanas 2-4).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Gremio de Magos Nivel 1',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Desbloquea hechizos de Nivel 1 en el Observatorio Mágico.', 'Otorga Libro de Hechizos y recarga maná al 100%.'],
        strategicTip: 'Requisito para el Pabellón Silencioso (Tier 4).'
      },
      {
        level: 2,
        name: 'Gremio de Magos Nivel 2',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 4 },
        prerequisites: ['Gremio de Magos Nivel 1'],
        effects: ['Desbloquea hechizos de Nivel 2 en el Observatorio Mágico.'],
        strategicTip: 'Acceso a maldiciones de área y debilidad masiva.'
      },
      {
        level: 3,
        name: 'Gremio de Magos Nivel 3',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 6 },
        prerequisites: ['Gremio de Magos Nivel 2'],
        effects: ['Desbloquea hechizos de Nivel 3 de las escuelas canónicas en el Observatorio Mágico.'],
        strategicTip: 'Potencia la hechicería de sombras y pestes en asedios.'
      },
      {
        level: 4,
        name: 'Gremio de Magos Nivel 4',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 8 },
        prerequisites: ['Gremio de Magos Nivel 3'],
        effects: ['Desbloquea hechizos mayores de Nivel 4 en el Observatorio Mágico.'],
        strategicTip: 'Animar muertos masivo y drenajes arcanos letales.'
      },
      {
        level: 5,
        name: 'Gremio de Magos Nivel 5',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 10 },
        prerequisites: ['Gremio de Magos Nivel 4'],
        effects: ['Desbloquea hechizos supremos de Nivel 5 de Nochesombra y Primigenia.'],
        strategicTip: 'Cataclismos de muerte y vacío que aniquilan divisiones enemigas completas.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS, COMERCIO Y DEPÓSITOS
  // =========================================================================
  {
    id: 'necropolis-tavern',
    name: 'Taberna (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite reclutar héroes adicionales (Nigromantes y Caballeros de la Muerte) para expandir la recogida de recursos.',
      'Permite escuchar rumores de taberna e informes de inteligencia.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe que explore y recolecte sin descanso.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'necropolis-marketplace',
    name: 'Mercado (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 500, wood: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Permite intercambiar recursos y oro en el mercado de la ciudad.',
      'Las tasas de intercambio mejoran conforme el jugador controla más Mercados en su reino.',
      'Permite canjear recursos secundarios por Mercurio para las moradas superiores.'
    ],
    strategicTip: 'Construir en Semana 1 para financiar las moradas de Liches y Vampiros.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'necropolis-artifact-merchant',
    name: 'Comerciante de Artefactos (Artifact Merchant)',
    nameEn: 'Artifact Merchant',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)'],
    effects: [
      'Establece una tienda permanente de reliquias malditas y artefactos nigrománticos en la ciudad.',
      'Permite comprar y vender artefactos de diversos tiers para equipar a los nigromantes del reino.'
    ],
    strategicTip: 'Permite adquirir objetos que potencian el Conocimiento, Poder Mágico o la habilidad de Nigromancia.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-resource-silo',
    name: 'Silo de Recursos (Resource Silo)',
    nameEn: 'Resource Silo',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 0, gems: 3, crystal: 3 },
    prerequisites: ['Mercado (Marketplace)', 'Banco (Bank)'],
    effects: [
      'Genera +1 Mercurio diario de forma pasiva (recurso raro principal de la Necrópolis).',
      'Asegura el suministro continuo de mercurio para el Château de los Festines y el Gremio de Magos.'
    ],
    strategicTip: 'Requiere Mercado y Banco. Construir en cuanto se tengan 3 de cada recurso raro secundario para estabilizar la economía de mercurio.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-alchemical-silo',
    name: 'Silo Alquímico (Alchemic Silo)',
    nameEn: 'Alchemic Silo',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 2000, ore: 5, mercury: 2 },
    prerequisites: ['Silo de Recursos (Resource Silo)'],
    effects: [
      'Produce Polvo Alquímico (Alchemical Dust) diariamente.',
      'El Polvo Alquímico es el recurso canónico esencial de Olden Era necesario para ascender moradas a niveles magistrales y potenciar hechizos en el Observatorio Mágico.'
    ],
    strategicTip: 'Requiere el Silo de Recursos. Vital para desbloquear las mejoras maestras de Liches y Vampiros.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CANÓNICAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'necropolis-crypts-and-graves',
    name: 'Criptas y Tumbas (Crypts and Graves)',
    nameEn: 'Crypts and Graves',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Esqueleto (Skeleton)',
    unitRecruited: 'Esqueleto / Guerrero Esqueleto / Esqueleto Centinela',
    unitUpgrades: {
      branchA: 'Guerrero Esqueleto (Escudo óseo con reducción de daño físico y de proyectiles)',
      branchB: 'Esqueleto Centinela (Lanza que ataca a distancia de 2 casillas con contragolpe)',
      branchADetails: {
        unitName: 'Guerrero Esqueleto',
        nameEn: 'Skeleton Warrior',
        role: 'Infantería Ósea Defensiva',
        keyAbilities: ['Resistencia a Proyectiles (-30% daño recibido)', 'No-Muerto (Inmune a veneno y moral)'],
        statsBonus: '+3 Defensa, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Esqueleto Centinela',
        nameEn: 'Skeleton Sentinel',
        role: 'Lancero de Alcance',
        keyAbilities: ['Ataque a 2 Casillas', 'Sin Contragolpe'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta la masa de tropas óseas de Tier 1 de la Necrópolis.',
      'Producción base: 15 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Constituyen el núcleo numérico del ejército gracias a la acumulación pasiva de la Nigromancia.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'necropolis-tomb-of-warriors',
    name: 'Tumba de Guerreros (Tomb of Warriors)',
    nameEn: 'Tomb of Warriors',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Criptas y Tumbas (Crypts and Graves)'],
    unitRecruitedBase: 'Zombi (Zombie)',
    unitRecruited: 'Zombi / Zombi Putrefacto / Momia Decadente',
    unitUpgrades: {
      branchA: 'Zombi Putrefacto (Transmite peste que reduce ataque y defensa de los enemigos)',
      branchB: 'Momia Decadente (Maldice al golpear aumentando el daño que recibe el objetivo)',
      branchADetails: {
        unitName: 'Zombi Putrefacto',
        nameEn: 'Rotten Zombie',
        role: 'Tanque Infeccioso',
        keyAbilities: ['Nube de Peste (-2 Ataque/Defensa al enemigo colindante)', 'Cuerpo Resistente'],
        statsBonus: '+3 Defensa, +12 Vida'
      },
      branchBDetails: {
        unitName: 'Momia Decadente',
        nameEn: 'Decaying Mummy',
        role: 'Hostigador Maldito',
        keyAbilities: ['Maldición de la Tumba (30% prob. de maldecir al impacto)', 'Resistencia Mágica'],
        statsBonus: '+4 Ataque, +8 Vida'
      }
    },
    effects: [
      'Recluta los tanques lentos y resistentes de Tier 2.',
      'Producción base: 8 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Absorben enormes cantidades de daño y bloquean el paso en cuellos de botella.',
    timingRecommendation: 'Día 2-3.',
  },
  {
    id: 'necropolis-kennel',
    name: 'Perrera de Sabuesos (Kennel)',
    nameEn: 'Kennel',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 3,
    dwellingTier: 3,
    cost: { gold: 1500, wood: 5 },
    dwellingUpgradeCost: { gold: 1500, wood: 5 },
    prerequisites: ['Tumba de Guerreros (Tomb of Warriors)'],
    unitRecruitedBase: 'Sabueso de la Peste (Plague Hound)',
    unitRecruited: 'Sabueso de la Peste / Necrosabueso / Bestia Cadavérica',
    unitUpgrades: {
      branchA: 'Necrosabueso (Carga rápida que ignora contraataques y ataca a dos objetivos colindantes)',
      branchB: 'Bestia Cadavérica (Aura de miedo que reduce la moral y velocidad del rival)',
      branchADetails: {
        unitName: 'Necrosabueso',
        nameEn: 'Necro Hound',
        role: 'Hostigador Rápido Sin Contragolpe',
        keyAbilities: ['Sin Contragolpe', 'Mordedura Doble'],
        statsBonus: '+3 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Bestia Cadavérica',
        nameEn: 'Corpse Beast',
        role: 'Cazador Desmoralizador',
        keyAbilities: ['Aullido Terrorífico (-1 Moral enemiga)', 'Salto de Falla'],
        statsBonus: '+4 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta las bestias rápidas de Tier 3.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Aporta la velocidad y agilidad de la que carecen los zombis y esqueletos en los primeros turnos.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'necropolis-quiet-pavilion',
    name: 'Pabellón Silencioso (Quiet Pavilion)',
    nameEn: 'Quiet Pavilion',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, ore: 5, mercury: 2 },
    dwellingUpgradeCost: { gold: 2000, ore: 5, mercury: 2 },
    prerequisites: ['Perrera de Sabuesos (Kennel)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Espíritu (Spirit)',
    unitRecruited: 'Espíritu / Banshee Aulladora / Espectro del Velo',
    unitUpgrades: {
      branchA: 'Banshee Aulladora (Aullido gemebundo que daña a todos los enemigos circundantes e infunde pánico)',
      branchB: 'Espectro del Velo (Cuerpo incorpóreo con 50% de probabilidad de ignorar daño físico)',
      branchADetails: {
        unitName: 'Banshee Aulladora',
        nameEn: 'Wailing Banshee',
        role: 'Controladora Sónica',
        keyAbilities: ['Aullido del Lamento (Dañador en área cónica)', 'Vuelo Incorpóreo'],
        statsBonus: '+3 Ataque, +3 Defensa, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Espectro del Velo',
        nameEn: 'Veil Wraith',
        role: 'Incorpóreo Elusivo',
        keyAbilities: ['Incorpóreo (50% esquiva física)', 'Drenaje de Maná en combate'],
        statsBonus: '+4 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta las criaturas incorpóreas voladoras de Tier 4.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Su capacidad de atravesar murallas y obstáculos las hace ideales en asedios.',
    timingRecommendation: 'Día 4-5.',
  },
  {
    id: 'necropolis-timeless-mansion',
    name: 'Mansión Intemporal (Timeless Mansion)',
    nameEn: 'Timeless Mansion',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, wood: 5, mercury: 4 },
    dwellingUpgradeCost: { gold: 3000, wood: 5, mercury: 3 },
    prerequisites: ['Pabellón Silencioso (Quiet Pavilion)'],
    unitRecruitedBase: 'Liche (Lich)',
    unitRecruited: 'Liche / Archiliche / Liche Maestro de Sombras',
    unitUpgrades: {
      branchA: 'Archiliche (Nube mortal de área que daña a objetivos vivos sin afectar a los no-muertos)',
      branchB: 'Liche Maestro de Sombras (Rayo de muerte concentrado que resucita esqueletos de los caídos)',
      branchADetails: {
        unitName: 'Archiliche',
        nameEn: 'Archlich',
        role: 'Tirador Arcano de Área',
        keyAbilities: ['Nube Mortal de 7 Hexágonos (No daña a no-muertos)', 'Sin penalización cuerpo a cuerpo'],
        statsBonus: '+4 Ataque, +3 Defensa, +15 Vida'
      },
      branchBDetails: {
        unitName: 'Liche Maestro de Sombras',
        nameEn: 'Shadowmaster Lich',
        role: 'Invocador y Artillero Oscuro',
        keyAbilities: ['Levantar Cadáver en Combate', 'Rayo de Sombra'],
        statsBonus: '+5 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta los tiradores arcanos supremos de Tier 5 de la Necrópolis.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La nube mortal del Archiliche es la herramienta más destructiva para limpiar grandes grupos de tropas vivas enemigas sin dañar a tus no-muertos colindantes.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'necropolis-chateau-of-feasts',
    name: 'Château de los Festines (Chateau of Feasts)',
    nameEn: 'Chateau of Feasts',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, wood: 10, mercury: 6 },
    dwellingUpgradeCost: { gold: 4000, wood: 5, mercury: 4 },
    prerequisites: ['Mansión Intemporal (Timeless Mansion)'],
    unitRecruitedBase: 'Vampiro (Vampire)',
    unitRecruited: 'Vampiro / Señor Vampiro / Conde de las Sombras',
    unitUpgrades: {
      branchA: 'Señor Vampiro (Drenaje vampírico total que regenera vida y resucita miembros caídos de la pila)',
      branchB: 'Conde de las Sombras (Teletransporte como murciélago y ataque crítico con desangramiento)',
      branchADetails: {
        unitName: 'Señor Vampiro',
        nameEn: 'Vampire Lord',
        role: 'Infantería Voladora Autoregenerativa',
        keyAbilities: ['Drenaje de Vida (Resucita miembros caídos)', 'Sin Contragolpe Enemigo', 'Forma de Murciélago'],
        statsBonus: '+6 Ataque, +4 Defensa, +25 Vida'
      },
      branchBDetails: {
        unitName: 'Conde de las Sombras',
        nameEn: 'Shadow Count',
        role: 'Asesino Teletransportador',
        keyAbilities: ['Paso Sombrío Instantáneo', 'Desangrado Letal', 'Sin Contragolpe'],
        statsBonus: '+7 Ataque, +2 Velocidad'
      }
    },
    effects: [
      'Recluta los señores no-muertos de Tier 6.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Una pila de Señores Vampiros bien posicionada es virtualmente inmortal contra tropas vivas si no se les aplica control o magia concentrada.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-bone-dragon-lair',
    name: 'Guarida de Dragones de Hueso (Bone Dragon Lair)',
    nameEn: 'Bone Dragon Lair',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 10000, ore: 15, mercury: 10 },
    dwellingUpgradeCost: { gold: 8000, ore: 10, mercury: 8 },
    prerequisites: ['Château de los Festines (Chateau of Feasts)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Dragón de Hueso (Bone Dragon)',
    unitRecruited: 'Dragón de Hueso / Dragón Fantasmal / Coloso de Sombras',
    unitUpgrades: {
      branchA: 'Dragón Fantasmal (Aliento envejecedor que reduce a la mitad la vida del objetivo y aura de pánico)',
      branchB: 'Coloso de Sombras (Resistencia masiva al daño físico y drenaje de almas en combate)',
      branchADetails: {
        unitName: 'Dragón Fantasmal',
        nameEn: 'Ghost Dragon',
        role: 'Coloso Aéreo Decadente',
        keyAbilities: ['Aliento Envejecedor (-50% Vida máxima al objetivo)', 'Aura de Tristeza (-1 Moral enemiga)'],
        statsBonus: '+10 Ataque, +8 Defensa, +90 Vida'
      },
      branchBDetails: {
        unitName: 'Coloso de Sombras',
        nameEn: 'Shadow Colossus',
        role: 'Titán Óseo de la Falla',
        keyAbilities: ['Cuerpo de Hueso Fortificado (-20% daño recibido)', 'Golpe Demoledor'],
        statsBonus: '+12 Ataque, +4 Defensa, +110 Vida'
      }
    },
    effects: [
      'Recluta los colosos no-muertos de Tier 7 de la Necrópolis.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'El efecto de envejecimiento puede partir a la mitad las pilas de Tier 7 enemigas, decantando la balanza en el primer asalto.',
    timingRecommendation: 'Final de Semana 1 o inicio de Semana 2.',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (NECRÓPOLIS) CONFIRMADAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'necropolis-bone-exchange',
    name: 'Intercambio Óseo (Bone Exchange)',
    nameEn: 'Bone Exchange',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 2000, ore: 10 },
    prerequisites: ['Criptas y Tumbas (Crypts and Graves)'],
    effects: [
      'Estructura económica y militar exclusiva de la Necrópolis.',
      'Permite tasar y convertir pilas de restos, osamentas y criaturas caídas en recursos raros u oro adicional para la corona no-muerta.'
    ],
    strategicTip: 'Convierte excedentes de batalla en fondos líquidos inmediatos.',
    timingRecommendation: 'Semana 1-2.',
  },
  {
    id: 'necropolis-undead-transformer',
    name: 'Transformador de No-Muertos (Undead Transformer)',
    nameEn: 'Undead Transformer',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 2500, ore: 5, mercury: 2 },
    prerequisites: ['Rostro Eterno (Ayuntamiento / Alcaldía)'],
    effects: [
      'Permite transmutar prisioneros de guerra y criaturas capturadas de otras facciones en no-muertos equivalentes.',
      'Evita penalizaciones por mezclar tropas de facciones vivas con el ejército de la Necrópolis.'
    ],
    strategicTip: 'Recluta tropas neutrales en el mapa de aventura y conviértelas en unidades homogéneas de tu ejército.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-well-of-souls',
    name: 'Pozo de Almas (Well of Souls)',
    nameEn: 'Well of Souls',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 2000, ore: 5, mercury: 3 },
    prerequisites: ['Gremio de Magos (Mage Guild)'],
    effects: [
      'Canaliza y concentra la esencia de las almas caídas en las batallas libradas en la provincia.',
      'Aumenta el rendimiento de la habilidad de Nigromancia de los héroes aliados y regenera maná adicional al pernoctar en la ciudad.'
    ],
    strategicTip: 'Multiplica la horda que levantas tras combates importantes en tu territorio.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-everserpent',
    name: 'Serpiente Eterna (Everserpent - Santuario del Grial)',
    nameEn: 'Everserpent',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 0 },
    prerequisites: ['Descubrimiento del Santo Grial (Mirage)'],
    effects: [
      'Estructura suprema del Santo Grial para la Necrópolis (construida al portar el Grial arrebatado al Espejismo en el mapa).',
      'Genera +5.000 de Oro diario adicional para el reino.',
      'Aumenta el crecimiento semanal de todas las criaturas de la Necrópolis en la ciudad en un +100% adicional.'
    ],
    strategicTip: 'Inunda el mapa de legiones infinitas de Liches y Vampiros tras erigir la Serpiente Eterna.',
    timingRecommendation: 'Al derrotar el Espejismo (Mirage).',
  },
];
