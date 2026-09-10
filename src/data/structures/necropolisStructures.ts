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
      'Estructura económica suprema de Olden Era (Tesorería / Bonificación Financiera de +2.000 Oro/día).',
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
    unitRecruited: 'Esqueleto / Guerrero Esqueleto / Arquero Esqueleto',
    unitUpgrades: {
      branchA: 'Guerrero Esqueleto (Escudo óseo con reducción de daño físico y de proyectiles)',
      branchB: 'Arquero Esqueleto (Tirador no-muerto a distancia con flechas de hueso)',
      branchADetails: {
        unitName: 'Guerrero Esqueleto',
        nameEn: 'Skeleton Warrior',
        role: 'Infantería Ósea Defensiva',
        keyAbilities: ['Resistencia a Proyectiles (-30% daño recibido)', 'No-Muerto (Inmune a veneno y moral)'],
        statsBonus: '+3 Defensa, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Arquero Esqueleto',
        nameEn: 'Skeleton Archer',
        role: 'Tirador Óseo',
        keyAbilities: ['Tirador a Distancia (18 virotes)', 'Sin penalización melé'],
        statsBonus: '+2 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta la masa de tropas óseas de Tier 1 de la Necrópolis.',
      'Producción base: 20 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Constituyen el núcleo numérico del ejército gracias a la acumulación pasiva de la Nigromancia.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'necropolis-quiet-pavilion',
    name: 'Pabellón Silencioso (Quiet Pavilion)',
    nameEn: 'Quiet Pavilion',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Criptas y Tumbas (Crypts and Graves)'],
    unitRecruitedBase: 'Aparición (Wight)',
    unitRecruited: 'Aparición / Espectro / Fantasma',
    unitUpgrades: {
      branchA: 'Espectro (Drena 4 de maná al héroe enemigo por asalto e impone silencio)',
      branchB: 'Fantasma (Forma etérea con 35% de evasión física y regeneración continua)',
      branchADetails: {
        unitName: 'Espectro',
        nameEn: 'Wraith',
        role: 'Saboteador de Maná Volador',
        keyAbilities: ['Vórtice de Maná (Drena 4 Maná)', 'Silencio Mágico', 'Vuelo Incorpóreo'],
        statsBonus: '+2 Ataque, +2 Defensa, +6 Vida, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Fantasma',
        nameEn: 'Phantasm',
        role: 'Hostigador Etéreo Resiliente',
        keyAbilities: ['Forma Etérea (35% evasión física)', 'Regeneración Pasiva', 'Vuelo'],
        statsBonus: '+1 Ataque, +2 Defensa, +4 Vida, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta las unidades aéreas rápidas de Tier 2 de la Necrópolis.',
      'Producción base: 12 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Esenciales para trabar tiradores enemigos en Turno 1 y drenar el maná de los hechiceros rivales.',
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
    prerequisites: ['Pabellón Silencioso (Quiet Pavilion)'],
    unitRecruitedBase: 'Sabueso No-Muerto (Undead Pet)',
    unitRecruited: 'Sabueso No-Muerto / Barghest / Armadillo Óseo',
    unitUpgrades: {
      branchA: 'Barghest (Aullido aterrador que reduce la moral rival en -1 y desgarro crítico)',
      branchB: 'Armadillo Óseo (Caparazón espinoso acorazado que refleja un 30% del daño cuerpo a cuerpo)',
      branchADetails: {
        unitName: 'Barghest',
        nameEn: 'Barghest',
        role: 'Hostigador Rápido y Desmoralizador',
        keyAbilities: ['Aullido del Averno (-1 Moral enemiga)', 'Desgarro Crítico (+25% daño)'],
        statsBonus: '+3 Ataque, +2 Defensa, +8 Vida, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Armadillo Óseo',
        nameEn: 'Bone Armadillo',
        role: 'Tanque Reflectante Acorazado',
        keyAbilities: ['Caparazón Espinoso (30% daño reflejado)', 'Defensa Acorazada'],
        statsBonus: '+1 Ataque, +6 Defensa, +13 Vida'
      }
    },
    effects: [
      'Recluta las bestias ágiles de vanguardia de Tier 3.',
      'Producción base: 9 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Aportan velocidad extrema de flanqueo para abalanzarse sobre tiradores rezagados.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'necropolis-graverobber-den',
    name: 'Cámara de los Saqueatumbas (Graverobber Den)',
    nameEn: 'Graverobber Den',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, ore: 5, mercury: 2 },
    dwellingUpgradeCost: { gold: 2000, ore: 5, mercury: 2 },
    prerequisites: ['Perrera de Sabuesos (Kennel)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Saqueatumbas (Graverobber)',
    unitRecruited: 'Saqueatumbas / Mercader de la Muerte / Amo de la Jauría',
    unitUpgrades: {
      branchA: 'Mercader de la Muerte (Disparo que inflige Maldición y reduce a la mitad el daño del objetivo)',
      branchB: 'Amo de la Jauría (Invoca una escuadra adicional de Sabuesos No-Muertos al inicio de la batalla)',
      branchADetails: {
        unitName: 'Mercader de la Muerte',
        nameEn: 'Merchant of Death',
        role: 'Tirador Maldiciente',
        keyAbilities: ['Tiro Maldito (Maldición y Debilitamiento)', 'Sin penalización melé'],
        statsBonus: '+3 Ataque, +2 Defensa, +10 Vida, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Amo de la Jauría',
        nameEn: 'Kennel Master',
        role: 'Invocador de Refuerzos',
        keyAbilities: ['Llamada de Jauría (Invoca Sabuesos extra)', 'Aura Bestial'],
        statsBonus: '+2 Ataque, +3 Defensa, +8 Vida, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los tiradores de apoyo nigromántico de Tier 4.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Su capacidad de excavar huesos e invocar refuerzos o maldecir objetivos pesados estabiliza la retaguardia.',
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
    prerequisites: ['Cámara de los Saqueatumbas (Graverobber Den)'],
    unitRecruitedBase: 'Liche (Lich)',
    unitRecruited: 'Liche / Liche Pestilente / Liche Sanguíneo',
    unitUpgrades: {
      branchA: 'Liche Pestilente (Nube de muerte persistente de 3x3 que crea miasma tóxico)',
      branchB: 'Liche Sanguíneo (Transfiere 40% del daño para sanar y reanimar tropas no-muertas aliadas)',
      branchADetails: {
        unitName: 'Liche Pestilente',
        nameEn: 'Pestilent Lich',
        role: 'Artillero de Miasma en Área',
        keyAbilities: ['Miasma Mortal (Área venenosa continua)', 'Sin penalización melé'],
        statsBonus: '+3 Ataque, +3 Defensa, +15 Vida, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Liche Sanguíneo',
        nameEn: 'Sanguine Lich',
        role: 'Sanador y Reanimador Arcano',
        keyAbilities: ['Drenaje Colectivo (Cura no-muertos aliados)', 'Tirador Mágico'],
        statsBonus: '+2 Ataque, +4 Defensa, +12 Vida, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los tiradores arcanos supremos de Tier 5 de la Necrópolis.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La nube de muerte no daña a tus tropas no-muertas, permitiendo disparar al corazón del combate cerrado.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'necropolis-tomb-of-warriors',
    name: 'Tumba de Guerreros (Tomb of Warriors)',
    nameEn: 'Tomb of Warriors',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 6000, ore: 10, mercury: 4 },
    dwellingUpgradeCost: { gold: 5000, ore: 8, mercury: 3 },
    prerequisites: ['Mansión Intemporal (Timeless Mansion)'],
    unitRecruitedBase: 'Caballero del Terror (Dread Knight)',
    unitRecruited: 'Caballero del Terror / Avatar de la Guerra / Segador Hueco',
    unitUpgrades: {
      branchA: 'Avatar de la Guerra (30% Golpe Mortal con 2.5x daño y +3 Ataque por cada enemigo caído)',
      branchB: 'Segador Hueco (Mirada de Muerte que elimina tropas extra y reduce la moral rival en -2)',
      branchADetails: {
        unitName: 'Avatar de la Guerra',
        nameEn: 'Avatar of War',
        role: 'Infantería Pesada de Ruptura Letal',
        keyAbilities: ['Golpe Mortal 2.5x', 'Furia Acumulativa (+3 Ataque/baja)', 'Armadura Pesada'],
        statsBonus: '+3 Ataque, +3 Defensa, +30 Vida, +1 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Segador Hueco',
        nameEn: 'Hollow Reaper',
        role: 'Cosechador y Desmoralizador Supremo',
        keyAbilities: ['Mirada de Muerte (Death Stare)', 'Presencia Aterradora (-2 Moral)', 'Velocidad 9'],
        statsBonus: '+2 Ataque, +2 Defensa, +25 Vida, +1 Velocidad, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta la infantería pesada de choque de Tier 6 de la Necrópolis.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Su capacidad de desencadenar golpes mortales y reducir drásticamente la moral enemiga decanta combates decisivos.',
    timingRecommendation: 'Día 7 o inicio de Semana 2.',
  },
  {
    id: 'necropolis-chateau-of-feasts',
    name: 'Château de los Festines (Chateau of Feasts)',
    nameEn: 'Chateau of Feasts',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 12500, wood: 10, mercury: 10 },
    dwellingUpgradeCost: { gold: 10000, wood: 8, mercury: 8 },
    prerequisites: ['Tumba de Guerreros (Tomb of Warriors)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Vampiro (Vampire)',
    unitRecruited: 'Vampiro / Señor de los Vampiros / Erudito Vampiro',
    unitUpgrades: {
      branchA: 'Señor de los Vampiros (Drenaje de sangre total al 100% que resucita miembros caídos sin sufrir contragolpe)',
      branchB: 'Erudito Vampiro (Explosión cadavérica mágica y robo de maná)',
      branchADetails: {
        unitName: 'Señor de los Vampiros',
        nameEn: 'Vampire Lord',
        role: 'Coloso Supremo Autoregenerativo',
        keyAbilities: ['Drenaje de Sangre 100% (Resurrección de pila)', 'Sin Contragolpe Enemigo', 'Vuelo'],
        statsBonus: '+4 Ataque, +4 Defensa, +70 Vida, +1 Velocidad, +2 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Erudito Vampiro',
        nameEn: 'Vampire Scholar',
        role: 'Coloso Táctico y Lanzahechizos',
        keyAbilities: ['Explosión Cadavérica', 'Drenaje Arcano', 'Sin Contragolpe'],
        statsBonus: '+6 Ataque, +2 Defensa, +60 Vida, +3 Iniciativa'
      }
    },
    effects: [
      'Recluta los colosos supremos de Tier 7 de la Necrópolis de Olden Era.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'Su drenaje de vida y ausencia de contragolpe rival los vuelve virtualmente inmortales contra tropas vivas.',
    timingRecommendation: 'Semana 2.',
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
