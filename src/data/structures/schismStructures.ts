import { TownStructure } from '../../types';

export const SCHISM_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (AYUNTAMIENTO / CAPITOLIO) - MULTI-NIVEL (1 a 4)
  // =========================================================================
  {
    id: 'schism-abyssal-remnant',
    name: 'Remanente Abisal (Ayuntamiento / Capitolio)',
    nameEn: 'Abyssal Remnant (Town Hall / Capitol)',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 5000 },
    prerequisites: [],
    effects: [
      'Núcleo de energía de la falla interdimensional y trono de los señores cósmicos.',
      'Otorga al reino oro, puntos de ley y puntos de astrología al día. Aumenta el límite de héroes (si lo permite el escenario)',
      'Se mejora a lo largo de 4 niveles cívicos: Asentamiento (500) -> Alcaldía (1.000) -> Ciudadela Cívica (2.000) -> Capitolio (4.000 Oro/día).'
    ],
    strategicTip: 'Mejora a Nivel II en el Día 2 para acelerar los ritos de invocación cósmica y sostener a los Shoths.',
    timingRecommendation: 'Día 2-3 (Nivel II) / Semana 2 (Nivel III) / Semana 3 (Capitolio).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento del Vacío (Ayuntamiento)',
        nameEn: 'Void Settlement (Town Hall)',
        cost: { gold: 5000 },
        prerequisites: [],
        effects: ['Otorga al reino 500 de oro, puntos de ley y puntos de astrología al día.', '+1 al límite de héroes.'],
        bonusIncome: '+500 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Asentamiento inicial del Cisma.'
      },
      {
        level: 2,
        name: 'Nivel II: Remanente Abisal II (Alcaldía)',
        nameEn: 'Abyssal Remnant II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Remanente Abisal (Ayuntamiento / Capitolio)'],
        effects: ['Otorga al reino 1.000 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora económica de nivel 1.'],
        bonusIncome: '+1.000 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Construir el Día 2 o 3 para financiar los ritos.'
      },
      {
        level: 3,
        name: 'Nivel III: Remanente Abisal III (Ciudadela Cívica)',
        nameEn: 'Abyssal Remnant III (Metropolis Hall)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Remanente Abisal II (Alcaldía)'],
        effects: ['Otorga al reino 2.000 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora de nivel 2.'],
        bonusIncome: '+2.000 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Prioridad al inicio de la Semana 2 para sostener los altos costes de mantenimiento abisal.'
      },
      {
        level: 4,
        name: 'Nivel IV: Gran Capitolio del Vacío Eterno (Capitolio)',
        nameEn: 'Grand Eternal Void Capitol',
        cost: { gold: 10000, wood: 15, ore: 15 },
        prerequisites: ['Nivel III: Remanente Abisal III (Ciudadela Cívica)', 'Fortificaciones II (Ciudadela Militar)'],
        effects: [
          'Estructura suprema cívica del Cisma. Solo se puede edificar 1 Capitolio por reino/jugador.',
          'Otorga al reino 4.000 de oro al día, además de bonificación masiva de puntos de ley y astrología.'
        ],
        bonusIncome: '+4.000 Oro, Puntos de ley supremos, Puntos de astrología / día',
        strategicTip: 'Financia las legiones abisales, Concubos y Heraldos del Vacío.'
      }
    ]
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II y III)
  // =========================================================================
  {
    id: 'schism-fortifications',
    name: 'Fortificaciones',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Cisma',
    cost: { gold: 2500, wood: 0, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona una muralla durante los asedios.',
      'Permite al constructor elegir mejoras defensivas.',
      'Al mejorarse aumenta el crecimiento de tropas.'
    ],
    strategicTip: 'Mejorar a Fortificaciones II en el Día 7 para multiplicar la invocación de tropas cósmicas.',
    timingRecommendation: 'Fortificaciones (Día 1) / Fortificaciones II (Día 7) / Fortificaciones III (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fortificaciones',
        nameEn: 'Void Fort',
        cost: { gold: 2500, wood: 0, ore: 5 },
        prerequisites: [],
        effects: ['Proporciona una muralla durante los asedios.', 'Permite al constructor elegir una mejora defensiva de nivel 1.'],
        defenseBonus: 'Refuerzo de murallas, trampas o más salidas',
        growthBonus: '',
        strategicTip: 'Construir el Día 1 si no se inicia con él.'
      },
      {
        level: 2,
        name: 'Nivel II: Fortificaciones II',
        nameEn: 'Rift Citadel',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones'],
        effects: [
          'Añade dos torres a las almenas que disparan a los atacantes durante los asedios.',
          'Permite al constructor elegir una mejora defensiva de nivel 2.',
          'Aumenta la producción semanal de todas las criaturas en un +50% adicional.'
        ],
        defenseBonus: '2 Torres Defensivas',
        growthBonus: '+50% Crecimiento semanal de tropas',
        strategicTip: 'Construir el Día 7 de la Semana 1.'
      },
      {
        level: 3,
        name: 'Nivel III: Fortificaciones III',
        nameEn: 'Entropy Castle',
        cost: { gold: 5000, wood: 0, ore: 15 },
        prerequisites: ['Nivel II: Fortificaciones II'],
        effects: [
          'Añade una gran torre más a las almenas que dispara a los atacantes durante los asedios y se asienta junto a la muralla.',
          'Permite al constructor elegir una mejora defensiva de nivel 3.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '1 Torre Defensiva',
        growthBonus: '+100% Crecimiento semanal de tropas (Duplica producción)',
        strategicTip: 'Esencial para invocar hordas de horrores de pesadilla.'
      }
    ]
  },

  // =========================================================================
  // COFRADÍA DE MAGOS CÓSMICOS - MULTI-NIVEL (1 a 5)
  // =========================================================================
  {
    id: 'schism-mage-guild',
    name: 'Cofradía de Magos del Caos (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Cisma',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio arcano de alteración de la realidad consagrado a la magia de Caos, Éter, Fuego y Distorsión Temporal.',
      'Enseña hechizos de implosión, teletransporte y ruptura cósmica a lo largo de 5 niveles.',
      'Recarga el maná del héroe visitante al 100%.'
    ],
    strategicTip: 'El Nivel 2 es requisito directo para el Rito Siniestro de Invocación (Señor del Abismo).',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel 1: Nexo de la Falla Menor',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Enseña 5 hechizos de Nivel 1 (Proyectil Entrópico, Distorsión, Celeridad del Vacío, etc.).', 'Otorga Libro de Hechizos.'],
        strategicTip: 'Requisito para Rito Perturbador y Ciudadela Cívica.'
      },
      {
        level: 2,
        name: 'Nivel 2: Círculo de Transmutación Caótica',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 4 },
        prerequisites: ['Nivel 1: Nexo de la Falla Menor'],
        effects: ['Enseña 4 hechizos de Nivel 2 (Teletransporte Menor, Chispa Abisal, Desplazamiento de Fase, etc.).', 'Requisito para Tier 7.'],
        strategicTip: 'Construir antes del Día 6 para Tier 7 Rush.'
      },
      {
        level: 3,
        name: 'Nivel 3: Cámara de la Singularidad',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 6 },
        prerequisites: ['Nivel 2: Círculo de Transmutación Caótica'],
        effects: ['Enseña 3 hechizos de Nivel 3 (Agujero Negro Menor, Escudo de Vacío, Desintegración).'],
        strategicTip: 'El Agujero Negro atrae e inmoviliza a múltiples unidades enemigas.'
      },
      {
        level: 4,
        name: 'Nivel 4: Cónclave de la Falla Abisal',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 8 },
        prerequisites: ['Nivel 3: Cámara de la Singularidad'],
        effects: ['Enseña 2 hechizos de Nivel 4 (Colapso Gravitatorio, Teletransporte Masivo).'],
        strategicTip: 'Permite colocar a tus gigantescos monstruos de asalto directamente tras las líneas enemigas.'
      },
      {
        level: 5,
        name: 'Nivel 5: Vórtice del Fin de los Tiempos',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 10 },
        prerequisites: ['Nivel 4: Cónclave de la Falla Abisal'],
        effects: ['Enseña 2 hechizos de Nivel 5 de destrucción cósmica absoluta (Implosión del Vacío, Singularidad Total).'],
        strategicTip: 'Máximo daño mono-objetivo del juego.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS & ECONOMÍA
  // =========================================================================
  {
    id: 'schism-tavern',
    name: 'Taberna del Vacío (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite contratar nuevos sacerdotes de la falla y heraldos del abismo.',
      'Desbloquea la red de espionaje cósmico y rumores.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe de exploración inmediata.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'schism-marketplace',
    name: 'Mercado de la Entropía (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite intercambiar recursos y oro.',
      'Mejora las tasas de conversión conforme se conquistan más ciudades.',
      'Permite canjear madera y mineral por Mercurio y Oro.'
    ],
    strategicTip: 'Construir en Semana 1 para canjear recursos por Mercurio para el Rito Siniestro.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'schism-alchemical-depot',
    name: 'Depósito Alquímico de Mercurio (Alchemic Depot)',
    nameEn: 'Alchemic Depot',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 0, gems: 3, crystal: 3, mercury: 3 },
    prerequisites: ['Mercado de la Entropía (Marketplace)'],
    effects: [
      'Genera +1 Mercurio diario de forma pasiva (recurso raro principal del Cisma).',
      'Asegura el flujo de mercurio para la Cofradía de Magos y moradas de Tier 6-7.'
    ],
    strategicTip: 'Construir en Semana 2 para garantizar mercurio constante.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-blacksmith',
    name: 'Fragua del Vacío y Herrería Abisal (Blacksmith)',
    nameEn: 'Blacksmith',
    category: 'Cívica y Economía',
    faction: 'Cisma',
    cost: { gold: 1000, ore: 5 },
    prerequisites: [],
    effects: [
      'Permite adquirir el Cañón de Distorsión y el Sifón de Almas para el héroe por 2.500 de oro.',
      'El Cañón de Distorsión dispara proyectiles de energía entrópica que ignoran un 50% de la defensa física de los muros.',
      'El Sifón de Almas drena maná del lanzador enemigo y lo recarga en la reserva del héroe del Cisma.'
    ],
    strategicTip: 'Ideal para asediar fortificaciones y ganar la guerra de desgaste de maná contra héroes hechiceros enemigos.',
    timingRecommendation: 'Día 2-4.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CON MEJORAS Y DOBLE RAMA
  // =========================================================================
  {
    id: 'schism-minor-summoning-rite',
    name: 'Rito Menor de Invocación (Minor Summoning Rite)',
    nameEn: 'Minor Summoning Rite',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 1,
    cost: { gold: 1250, ore: 5 },
    dwellingUpgradeCost: { gold: 1000, ore: 5 },
    prerequisites: ['Fortificaciones I (Fuerte)'],
    unitRecruitedBase: 'Iniciado del Vacío (Void Initiate)',
    unitRecruited: 'Iniciado del Vacío / Cultista de la Falla',
    unitUpgrades: {
      branchA: 'Fanático del Vacío (Ataque con daño psíquico que ignora parte de la armadura)',
      branchB: 'Invocador Menor (Al golpear genera una pequeña copia ilusoria que absorbe un ataque)',
      branchADetails: {
        unitName: 'Fanático del Vacío (Void Fanatic)',
        role: 'Infantería Ofensiva de Choque Psíquico',
        keyAbilities: ['Ataque Mental (Ignora 25% armadura física)', 'Furia Devota'],
        statsBonus: '+3 Ataque, +2 Vida'
      },
      branchBDetails: {
        unitName: 'Adepto de la Falla (Rift Adept)',
        role: 'Ilusionista Hostigador',
        keyAbilities: ['Reflejo Ilusorio (Crea un clon señuelo)', 'Desplazamiento Dimensional'],
        statsBonus: '+2 Iniciativa, +1 Velocidad'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 con daño no físico.',
      'Producción base: 14 unidades por semana (+50% con Ciudadela, +100% con Castillo).'
    ],
    strategicTip: 'Su daño psíquico es muy efectivo contra criaturas fuertemente acorazadas.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'schism-cultist-spire',
    name: 'Aguja de los Cultistas (Cultist Spire)',
    nameEn: 'Cultist Spire',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 2,
    cost: { gold: 2000, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1250, wood: 5 },
    prerequisites: ['Rito Menor de Invocación (Minor Summoning Rite)'],
    unitRecruitedBase: 'Cultista Maldito (Accursed Cultist)',
    unitRecruited: 'Cultista Maldito / Flagelador del Caos',
    unitUpgrades: {
      branchA: 'Flagelador del Caos (Ataque a 2 casillas con látigos de energía que aplican maldición)',
      branchB: 'Sacerdote del Horror (Ataque a distancia psíquico que reduce la moral enemiga)',
      branchADetails: {
        unitName: 'Flagelador del Caos (Chaos Flayer)',
        role: 'Atacante de Látigo Extendido y Debilitador',
        keyAbilities: ['Látigos de Falla (Alcance de 2 casillas)', 'Maldición de Debilidad en cada golpe'],
        statsBonus: '+3 Ataque, +2 Daño Base'
      },
      branchBDetails: {
        unitName: 'Sacerdote del Horror (Horror Priest)',
        role: 'Tirador Psíquico a Distancia',
        keyAbilities: ['Disparo Mental (-1 Moral al blanco alcanzado)', 'Sin penalización en cuerpo a cuerpo'],
        statsBonus: '+3 Ataque a Distancia, +2 Defensa'
      }
    },
    effects: [
      'Recluta tropas de Tier 2 de control y debilitamiento.',
      'Producción base: 9 unidades por semana.'
    ],
    strategicTip: 'Excelente alcance para golpear sin recibir contragolpe.',
    timingRecommendation: 'Día 2.',
  },
  {
    id: 'schism-agashoth-stables',
    name: 'Establos de Aga\'Shoth (Aga\'Shoth Stables)',
    nameEn: 'Aga\'Shoth Stables',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 3,
    cost: { gold: 3000, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1500, ore: 5 },
    prerequisites: ['Aguja de los Cultistas (Cultist Spire)'],
    unitRecruitedBase: 'Bestia de la Falla (Rift Beast)',
    unitRecruited: 'Bestia de la Falla / Corcel de Pesadilla',
    unitUpgrades: {
      branchA: 'Corcel de Pesadilla (Carga que atraviesa a los enemigos y lesiona sus casillas)',
      branchB: 'Engendro de Fase (Teletransporte instantáneo a cualquier casilla libre del mapa)',
      branchADetails: {
        unitName: 'Corcel de Pesadilla (Nightmare Steed)',
        role: 'Caballería de Ruptura Dimensional',
        keyAbilities: ['Carga de Fase (Atraviesa unidades enemigas infligiendo daño)', 'Terror en Carga'],
        statsBonus: '+3 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Acechador de Fase (Phase Stalker)',
        role: 'Asesino Teletransportable de Primer Turno',
        keyAbilities: ['Teletransporte Táctico (Se desplaza a cualquier casilla del mapa)', 'Golpe por la Espalda'],
        statsBonus: '+3 Iniciativa, +4 Ataque'
      }
    },
    effects: [
      'Recluta caballería de Tier 3 de hipermovilidad.',
      'Producción base: 7 unidades por semana.'
    ],
    strategicTip: 'El Engendro de Fase puede saltar directamente sobre los tiradores enemigos desde el Turno 1.',
    timingRecommendation: 'Día 3.',
  },
  {
    id: 'schism-disturbed-summoning-rite',
    name: 'Rito Perturbador de Invocación (Disturbed Summoning Rite)',
    nameEn: 'Disturbed Summoning Rite',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 4,
    cost: { gold: 2500, gems: 3, crystal: 3, mercury: 6 },
    dwellingUpgradeCost: { gold: 2000, mercury: 4 },
    prerequisites: ['Establos de Aga\'Shoth (Aga\'Shoth Stables)', 'Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    unitRecruitedBase: 'Horror Tentacular (Tentacle Horror)',
    unitRecruited: 'Horror Tentacular / Demonio de la Falla',
    unitUpgrades: {
      branchA: 'Demonio Tentacular (Atrapa y arrastra a un enemigo hacia él y le impide atacar)',
      branchB: 'Gorgona del Vacío (Mirada paralizante que petrifica a las unidades enemigas)',
      branchADetails: {
        unitName: 'Demonio Tentacular (Tentacled Fiend)',
        role: 'Controlador de Posición y Arrastre',
        keyAbilities: ['Lazo de Tentáculos (Arrastra a la víctima 2 casillas)', 'Inmovilización'],
        statsBonus: '+4 Defensa, +8 Vida'
      },
      branchBDetails: {
        unitName: 'Gorgona del Vacío (Void Gorgon)',
        role: 'Petrificador Mortal',
        keyAbilities: ['Mirada de Piedra (20% prob. de petrificar al enemigo por 1 turno)', 'Ataque de Rayo Ocular'],
        statsBonus: '+3 Ataque a Distancia, +2 Poder Mágico'
      }
    },
    effects: [
      'Recluta aberraciones de Tier 4 de control absoluto.',
      'Producción base: 5 unidades por semana.'
    ],
    strategicTip: 'Rompe la formación defensiva enemiga arrastrando a sus arqueros o tanques.',
    timingRecommendation: 'Día 4.',
  },
  {
    id: 'schism-house-of-chains',
    name: 'Casa de Cadenas (House of Chains)',
    nameEn: 'House of Chains',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 5,
    cost: { gold: 4750, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 2500, mercury: 4 },
    prerequisites: ['Rito Perturbador de Invocación (Disturbed Summoning Rite)'],
    unitRecruitedBase: 'Atormentador (Tormentor)',
    unitRecruited: 'Atormentador / Verdugo de Almas',
    unitUpgrades: {
      branchA: 'Verdugo de Almas (Cadenas giratorias que dañan a todas las unidades enemigas adyacentes)',
      branchB: 'Martirio del Cisma (Absorbe un porcentaje de daño recibido por los aliados cercanos y aumenta su propio ataque)',
      branchADetails: {
        unitName: 'Verdugo de Almas (Soul Executioner)',
        role: 'Atacante Giratorio de Área',
        keyAbilities: ['Torbellino de Cadenas (Golpea a todas las unidades adyacentes)', 'Sin Contraataque'],
        statsBonus: '+4 Ataque, +2 Daño Base'
      },
      branchBDetails: {
        unitName: 'Mártir Encadenado (Chained Martyr)',
        role: 'Baluarte de Venganza Acumulada',
        keyAbilities: ['Enlace de Dolor (Aumenta su ataque un +2 por cada golpe recibido)', 'Resistencia al Dolor'],
        statsBonus: '+6 Defensa, +15 Vida'
      }
    },
    effects: [
      'Recluta infantería pesada de Tier 5 con capacidades devastadoras de área.',
      'Producción base: 3 unidades por semana.'
    ],
    strategicTip: 'Mételos en el centro del combate para que sus cadenas golpeen a múltiples enemigos sin recibir represalia.',
    timingRecommendation: 'Día 5.',
  },
  {
    id: 'schism-bloated-manor',
    name: 'Mansión Hinchada (Bloated Manor)',
    nameEn: 'Bloated Manor',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 6,
    cost: { gold: 7750, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 3500, mercury: 5 },
    prerequisites: ['Casa de Cadenas (House of Chains)'],
    unitRecruitedBase: 'Engendro Hinchado (Bloated Fiend)',
    unitRecruited: 'Engendro Hinchado / Goliat de la Entropía',
    unitUpgrades: {
      branchA: 'Goliat de la Entropía (Inmensa cantidad de vida, pisotón de choque y regeneración constante)',
      branchB: 'Abominación Cáustica (Al recibir daño escupe bilis corrupta que envenena el suelo)',
      branchADetails: {
        unitName: 'Goliat de la Entropía (Entropy Goliath)',
        role: 'Coloso Tanque Regenerativo',
        keyAbilities: ['Regeneración Caótica (+20 HP por turno)', 'Pisotón de Choque (Aturde a unidades pequeñas)'],
        statsBonus: '+5 Defensa, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Abominación Corrupta (Corrupted Abomination)',
        role: 'Contaminador de Campo de Batalla',
        keyAbilities: ['Erupción de Bilis (Daña a atacantes cuerpo a cuerpo)', 'Aura de Infección'],
        statsBonus: '+4 Ataque, +20 Vida'
      }
    },
    effects: [
      'Recluta monstruosidades gigantes de Tier 6 con una reserva de vida colosal.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'El Goliat es prácticamente indestructible si no se concentra todo el fuego enemigo sobre él.',
    timingRecommendation: 'Día 6.',
  },
  {
    id: 'schism-sinister-summoning-rite',
    name: 'Rito Siniestro de Invocación (Sinister Summoning Rite)',
    nameEn: 'Sinister Summoning Rite',
    category: 'Moradas de Criaturas',
    faction: 'Cisma',
    tier: 7,
    cost: { gold: 15000, wood: 10, ore: 10, mercury: 15 },
    dwellingUpgradeCost: { gold: 10000, mercury: 10 },
    prerequisites: ['Mansión Hinchada (Bloated Manor)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Señor del Abismo (Abyss Lord)',
    unitRecruited: 'Señor del Abismo / Devorador de Mundos',
    unitUpgrades: {
      branchA: 'Devorador de Mundos (Invoca meteoros del vacío sobre todo el campo de batalla y absorbe el maná enemigo)',
      branchB: 'Avatar del Caos Primordial (Teletransporte con explosión de antimateria al aterrizar en cualquier casilla)',
      branchADetails: {
        unitName: 'Devorador de Mundos (World Eater)',
        role: 'Coloso Cósmico y Destructor Apocalíptico',
        keyAbilities: ['Lluvia de Meteoros del Vacío (Ataque en área que daña a 3 stacks)', 'Drenaje de Maná Cósmico', 'Vuelo Dimensional'],
        statsBonus: '+6 Ataque, +6 Defensa, +60 Vida, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Avatar del Caos Primordial (Primordial Chaos Avatar)',
        role: 'Coloso Asaltante con Salto Explosivo',
        keyAbilities: ['Aterrizaje de Antimateria (Explota en la casilla de destino al teletransportarse)', 'Inmunidad a Magia de Sombras y Fuego'],
        statsBonus: '+8 Ataque, +3 Iniciativa, +50 Vida'
      }
    },
    effects: [
      'Recluta las criaturas cósmicas supremas de Tier 7 del Cisma.',
      'Producción base: 1 unidad por semana (+1 con Castillo).'
    ],
    strategicTip: 'Su capacidad de daño en área y teletransporte lo convierten en la pesadilla de cualquier ejército apiñado.',
    timingRecommendation: 'Semana 1 (Día 7) o Semana 2 (Día 1).',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (CISMA)
  // =========================================================================
  {
    id: 'schism-void-rift',
    name: 'Falla del Vacío (Void Rift)',
    nameEn: 'Void Rift',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, mercury: 2 },
    prerequisites: ['Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    effects: [
      'Aumenta el Poder Mágico de todos los héroes del Cisma en +2 en combates dentro de la provincia.',
      'Reduce en un -20% el coste de maná de todos los hechizos de Caos y Falla.'
    ],
    strategicTip: 'Permite lanzar hechizos de alto nivel de forma continuada sin agotar el maná.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-altar-of-sacrifice',
    name: 'Altar de Sacrificio Cósmico (Altar of Sacrifice)',
    nameEn: 'Altar of Sacrifice',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 2000, ore: 5, mercury: 3 },
    prerequisites: ['Rito Menor de Invocación (Minor Summoning Rite)'],
    effects: [
      'Permite sacrificar artefactos o criaturas sobrantes para obtener experiencia instantánea para el héroe.',
      'Aumenta la producción semanal de todas las moradas de Tier 1 a 4 en un +15%.'
    ],
    strategicTip: 'Sube de nivel a tu héroe principal de forma inmediata sacrificando objetos prescindibles.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-warp-portal',
    name: 'Portal de Distorsión (Warp Portal)',
    nameEn: 'Warp Portal',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 2500, ore: 5, mercury: 3 },
    prerequisites: ['Rito de Sangre Helada de Vori (Vori Blood Rite)'],
    effects: [
      'Permite teletransportar instantáneamente unidades entre ciudades aliadas del Cisma que posean un Portal de Distorsión.',
      'Reduce la pérdida de puntos de movimiento por terrenos difíciles en un 50%.'
    ],
    strategicTip: 'Concentra tropas de múltiples castillos en la línea de frente en un solo turno.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-void-monolith',
    name: 'Monolito del Vacío (Void Monolith)',
    nameEn: 'Void Monolith',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 2000, ore: 10, mercury: 2 },
    prerequisites: ['Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    effects: [
      'Otorga +10% de resistencia mágica a todas las tropas de la facción Cisma.',
      'Drena 5 puntos de maná del héroe enemigo al comienzo de cada ronda de combate.'
    ],
    strategicTip: 'Desactiva combos mágicos rivales en batallas prolongadas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'schism-astral-chamber',
    name: 'Cámara de Resonancia Astral (Astral Resonance Chamber)',
    nameEn: 'Astral Resonance Chamber',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, mercury: 4 },
    prerequisites: ['Monolito de la Falla Cósmica (Rift Monolith)'],
    effects: [
      'Aumenta la probabilidad de impacto crítico de hechizos astrales y de distorsión en un +25%.',
      'Otorga +1 de Conocimiento a los héroes del Cisma tras cada victoria en combate contra héroes enemigos.'
    ],
    strategicTip: 'Convierte los hechizos de área en aniquiladores de tropas enemigas en late-game.',
    timingRecommendation: 'Semana 2-3.',
  },
  {
    id: 'schism-rift-nexus',
    name: 'Nexo de Fallas de Vori (Rift Nexus)',
    nameEn: 'Rift Nexus',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 3000, ore: 10, mercury: 5 },
    prerequisites: ['Rito Siniestro de Invocación (Sinister Summoning Rite)'],
    effects: [
      'Incrementa el crecimiento semanal de todas las criaturas de Tier 5 a 7 en un +20%.',
      'Convoca automáticamente una pila de Shoths menores para defender la ciudad durante cualquier asedio.'
    ],
    strategicTip: 'La defensa de base perfecta para evitar que héroes secundarios enemigos capturen tus ciudades del Cisma desprotegidas.',
    timingRecommendation: 'Semana 3.',
  },
  {
    id: 'schism-abyss-firmament',
    name: 'Abismo del Firmamento (Abyss Firmament - Santo Grial)',
    nameEn: 'Abyss Firmament',
    category: 'Estructuras Especiales de Facción',
    faction: 'Cisma',
    isFactionUnique: true,
    cost: { gold: 5000, ore: 10, mercury: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Rito Siniestro de Invocación (Sinister Summoning Rite)'],
    effects: [
      'Estructura Suprema del Grial del Cisma.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Aumenta el daño de todos los hechizos de daño directo en un +30% y otorga maná ilimitado en el primer combate de cada día.'
    ],
    strategicTip: 'Convierte a tus magos del Cisma en fuerzas de destrucción total tras obtener el Grial.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];
