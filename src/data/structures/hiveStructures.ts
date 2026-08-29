import { TownStructure } from '../../types';

export const HIVE_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (CORAZÓN DEL APIARIO) - MULTI-NIVEL (1 a 3)
  // =========================================================================
  {
    id: 'hive-apiarys-heart',
    name: 'Corazón del Apiario',
    nameEn: 'Apiary\'s Heart',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 5000 },
    prerequisites: [],
    effects: [
      'Cámara central de la mente enjambrada y depósito de miel biológica y recursos.',
      'Otorga al reino oro, puntos de ley y puntos de astrología al día. Aumenta el límite de héroes (si lo permite el escenario)',
      'Se mejora a lo largo de 3 niveles cívicos (Corazón del Apiario -> Corazón del Apiario II -> Corazón del Apiario III).'
    ],
    strategicTip: 'Mejora a Nivel II (Corazón del Apiario II) en el Día 2 para acelerar la eclosión de zánganos y larvas.',
    timingRecommendation: 'Día 2-4 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Corazón del Apiario',
        nameEn: 'Apiary\'s Heart',
        cost: { gold: 5000 },
        prerequisites: [],
        effects: ['Otorga al reino 500 de oro, puntos de ley y puntos de astrología al día.', '+1 al límite de héroes.'],
        bonusIncome: '+500 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Asentamiento inicial del enjambre.'
      },
      {
        level: 2,
        name: 'Nivel II: Corazón del Apiario II',
        nameEn: 'Apiary\'s Heart II',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Corazón del Apiario'],
        effects: ['Otorga al reino 750 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora económica de nivel 1.'],
        bonusIncome: '+750 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Construir el Día 2 o 3 para expandir la colonia.'
      },
      {
        level: 3,
        name: 'Nivel III: Corazón del Apiario III',
        nameEn: 'Apiary\'s Heart III',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Corazón del Apiario II'],
        effects: ['Otorga al reino 1000 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora de nivel 2.'],
        bonusIncome: '+1000 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Prioridad al inicio de la Semana 2.'
      }
    ]
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II y III)
  // =========================================================================
  {
    id: 'hive-fortifications',
    name: 'Fortificaciones',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Enjambre',
    cost: { gold: 2500, wood: 0, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona una muralla durante los asedios.',
      'Permite al constructor elegir mejoras defensivas.',
      'Al mejorarse aumenta el crecimiento de tropas.'
    ],
    strategicTip: 'Mejorar a Fortificaciones II en el Día 7 para multiplicar la eclosión de zánganos e insectos.',
    timingRecommendation: 'Fortificaciones (Día 1) / Fortificaciones II (Día 7) / Fortificaciones III (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fortificaciones',
        nameEn: 'Chitin Fort',
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
        nameEn: 'Hive Citadel',
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
        nameEn: 'Horde Castle',
        cost: { gold: 5000, wood: 0, ore: 15 },
        prerequisites: ['Nivel II: Fortificaciones II'],
        effects: [
          'Añade una gran torre más a las almenas que dispara a los atacantes durante los asedios y se asienta junto a la muralla.',
          'Permite al constructor elegir una mejora defensiva de nivel 3.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '1 Torre Defensiva',
        growthBonus: '+100% Crecimiento semanal de tropas (Duplica producción)',
        strategicTip: 'Multiplica la masa de criaturas más grande del juego.'
      }
    ]
  },

  // =========================================================================
  // COFRADÍA DE MAGOS DE FEROMONAS - MULTI-NIVEL (1 a 5)
  // =========================================================================
  {
    id: 'hive-mage-guild',
    name: 'Cofradía de Magos del Enjambre (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Enjambre',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio biológico y psíquico consagrado a la magia de Tierra, Veneno y Feromonas.',
      'Enseña conjuros de envenenamiento, celeridad y control mental a lo largo de 5 niveles.',
      'Recarga el maná del héroe visitante al 100%.'
    ],
    strategicTip: 'El Nivel 2 es requisito para la Torre del Amor (Soberana del Enjambre).',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel 1: Cámara de Feromonas Menor',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Enseña 5 hechizos de Nivel 1 (Picadura Venenosa, Furia de Enjambre, Lentitud, etc.).', 'Otorga Libro de Hechizos.'],
        strategicTip: 'Requisito para Zigurat Quitinoso y Ciudadela Cívica.'
      },
      {
        level: 2,
        name: 'Nivel 2: Conducto de Hormonas Místicas',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 4 },
        prerequisites: ['Nivel 1: Cámara de Feromonas Menor'],
        effects: ['Enseña 4 hechizos de Nivel 2 (Nube de Esporas, Frenesí, Escudo Quitináceo, etc.).', 'Requisito para Tier 7.'],
        strategicTip: 'Construir antes del Día 6 para Tier 7 Rush.'
      },
      {
        level: 3,
        name: 'Nivel 3: Cámara de Bio-Mutaciones',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 6 },
        prerequisites: ['Nivel 2: Conducto de Hormonas Místicas'],
        effects: ['Enseña 3 hechizos de Nivel 3 (Corrosión Ácida, Piel Acorazada, Enjambre Cegador).'],
        strategicTip: 'Potencia el desgaste y la corrosión contra ejércitos acorazados.'
      },
      {
        level: 4,
        name: 'Nivel 4: Mente Colmena Primordial',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 8 },
        prerequisites: ['Nivel 3: Cámara de Bio-Mutaciones'],
        effects: ['Enseña 2 hechizos de Nivel 4 (Onda Ácida Masiva, Invasión de Parásitos).'],
        strategicTip: 'Devasta unidades compactas con daño corrosivo.'
      },
      {
        level: 5,
        name: 'Nivel 5: Núcleo Génesis del Enjambre',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 10 },
        prerequisites: ['Nivel 4: Mente Colmena Primordial'],
        effects: ['Enseña 2 hechizos de Nivel 5 de máxima plaga biológica (Mutación Cósmica, Asfixia Ácida).'],
        strategicTip: 'Poder destructivo total para asedios de late-game.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS & ECONOMÍA
  // =========================================================================
  {
    id: 'hive-tavern',
    name: 'Taberna del Hormiguero (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite contratar nuevos señores del enjambre y tejedores de bio-magia.',
      'Desbloquea la red de espionaje y rumores subterráneos.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe recolector.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'hive-marketplace',
    name: 'Bazar Quitináceo (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite intercambiar recursos y oro.',
      'Mejora las tasas de intercambio conforme se conquistan más asentamientos.',
      'Permite canjear madera y mineral por Cristales y Oro.'
    ],
    strategicTip: 'Construir en Semana 1 para conseguir Cristales para la Torre del Amor.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'hive-alchemical-depot',
    name: 'Depósito Alquímico de Cristales (Alchemic Depot)',
    nameEn: 'Alchemic Depot',
    category: 'Cívica y Economía',
    faction: 'Enjambre',
    cost: { gold: 0, gems: 3, crystal: 3, mercury: 3 },
    prerequisites: ['Bazar Quitináceo (Marketplace)'],
    effects: [
      'Genera +1 Cristal diario de forma pasiva (recurso raro principal del Enjambre).',
      'Suministra cristales para la Cofradía de Magos y moradas de Tier 6-7.'
    ],
    strategicTip: 'Construir en Semana 2 para garantizar cristales constantes.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CON MEJORAS Y DOBLE RAMA
  // =========================================================================
  {
    id: 'hive-squalid-dwelling',
    name: 'Vivienda Descuidada (Squalid Dwelling)',
    nameEn: 'Squalid Dwelling',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 1,
    cost: { gold: 1250, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Fortificaciones I (Fuerte)'],
    unitRecruitedBase: 'Vermis / Larva (Maggot)',
    unitRecruited: 'Vermis / Comecarroña',
    unitUpgrades: {
      branchA: 'Vermis Devorador (Ataque con mordisco ácido que reduce armadura)',
      branchB: 'Larva Parásita (Al morir explota en una nube ácida que daña a enemigos adyacentes)',
      branchADetails: {
        unitName: 'Vermis Devorador (Devouring Grub)',
        role: 'Infantería de Enjambre Voraz',
        keyAbilities: ['Mordisco Ácido (-1 Defensa al enemigo)', 'Apetito Insaciable'],
        statsBonus: '+2 Ataque, +2 Vida'
      },
      branchBDetails: {
        unitName: 'Larva Parásita (Parasitic Maggot)',
        role: 'Bomba Biológica Suicida',
        keyAbilities: ['Explosión Ácida al Morir (Daña a todas las unidades adyacentes)', 'Inmune al Miedo'],
        statsBonus: '+3 Daño de Explosión, +1 Velocidad'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 de reproducción masiva.',
      'Producción base: 18 unidades por semana (+50% con Ciudadela, +100% con Castillo).'
    ],
    strategicTip: 'La producción numérica más alta de Tier 1 de todo el juego; úsalos para rodear al enemigo.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'hive-carrion-lair',
    name: 'Guarida de Carroña (Carrion Lair)',
    nameEn: 'Carrion Lair',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 2,
    cost: { gold: 1750, ore: 6 },
    dwellingUpgradeCost: { gold: 1250, ore: 5 },
    prerequisites: ['Vivienda Descuidada (Squalid Dwelling)'],
    unitRecruitedBase: 'Escarabajo Carroñero (Scavenger Beetle)',
    unitRecruited: 'Escarabajo Carroñero / Perforador Quitináceo',
    unitUpgrades: {
      branchA: 'Escarabajo Acorazado (Caparazón reforzado que reduce el daño a distancia en un 40%)',
      branchB: 'Escarabajo Venenoso (Aguijón corrosivo que aplica veneno duradero)',
      branchADetails: {
        unitName: 'Escarabajo Acorazado (Armored Scarab)',
        role: 'Tanque Blindado Anti-Proyectiles',
        keyAbilities: ['Caparazón Reforzado (-40% daño de arqueros)', 'Resistencia Física'],
        statsBonus: '+4 Defensa, +4 Vida'
      },
      branchBDetails: {
        unitName: 'Escarabajo Tóxico (Noxious Scarab)',
        role: 'Atacante Envenenador Rápido',
        keyAbilities: ['Picadura Tóxica (Veneno persistente por 3 turnos)', 'Iniciativa Mejorada'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas de Tier 2 acorazadas para la primera línea.',
      'Producción base: 10 unidades por semana.'
    ],
    strategicTip: 'Absorben las flechas de los arqueros enemigos mientras tus tropas rápidas avanzan.',
    timingRecommendation: 'Día 2.',
  },
  {
    id: 'hive-paper-nest',
    name: 'Nido de Papel (Paper Nest)',
    nameEn: 'Paper Nest',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 3,
    cost: { gold: 3000, wood: 10 },
    dwellingUpgradeCost: { gold: 1500, wood: 5 },
    prerequisites: ['Guarida de Carroña (Carrion Lair)'],
    unitRecruitedBase: 'Avispa Asesina (Wasp)',
    unitRecruited: 'Avispa Asesina / Avispón Zumbador',
    unitUpgrades: {
      branchA: 'Avispón Aguijoneador (Ataque aéreo con parálisis que aturde al objetivo)',
      branchB: 'Zángano Veloz (Velocidad extrema de vuelo y ataque sin represalia)',
      branchADetails: {
        unitName: 'Avispón Aguijoneador (Stinging Hornet)',
        role: 'Volador Hostigador Paralizante',
        keyAbilities: ['Aguijonazo Paralizante (25% prob. de aturdir 1 turno)', 'Vuelo Veloz'],
        statsBonus: '+3 Ataque, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Zángano Zumbador (Buzzing Drone)',
        role: 'Asaltante Ágil Sin Represalia',
        keyAbilities: ['Golpe y Huida (No sufre contraataque)', 'Iniciativa Relámpago'],
        statsBonus: '+2 Velocidad, +2 Iniciativa, +3 Ataque'
      }
    },
    effects: [
      'Recluta unidades voladoras de Tier 3 de gran maniobrabilidad.',
      'Producción base: 8 unidades por semana.'
    ],
    strategicTip: 'Llegan a las líneas traseras enemigas en el primer turno para neutralizar tiradores.',
    timingRecommendation: 'Día 3.',
  },
  {
    id: 'hive-chitin-ziggurat',
    name: 'Zigurat Quitinoso (Chitin Ziggurat)',
    nameEn: 'Chitin Ziggurat',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 4,
    cost: { gold: 2500, ore: 10, crystal: 5 },
    dwellingUpgradeCost: { gold: 2000, crystal: 3 },
    prerequisites: ['Nido de Papel (Paper Nest)', 'Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    unitRecruitedBase: 'Ciempiés de Guerra (Centipede)',
    unitRecruited: 'Ciempiés de Guerra / Escolopendra Gigante',
    unitUpgrades: {
      branchA: 'Escolopendra Constrictora (Envuelve a su presa impidiendo que se mueva)',
      branchB: 'Ciempiés Escupidor (Ataque a distancia escupiendo proyectiles ácidos)',
      branchADetails: {
        unitName: 'Escolopendra Constrictora (Constrictor Centipede)',
        role: 'Asaltante de Choque e Inmovilización',
        keyAbilities: ['Constricción (Inmoviliza al enemigo adyacente)', 'Cuerpo Segmentado (+15% Resistencia a ataques de flanco)'],
        statsBonus: '+4 Defensa, +6 Vida'
      },
      branchBDetails: {
        unitName: 'Escolopendra Cáustica (Caustic Centipede)',
        role: 'Tirador Ácido a Media Distancia',
        keyAbilities: ['Escupitajo Ácido (Ataque a distancia que corroe armadura)', 'Disparo sin penalización a corta distancia'],
        statsBonus: '+4 Ataque a Distancia, +1 Velocidad'
      }
    },
    effects: [
      'Recluta tropas monstruosas de Tier 4 versátiles y resistentes.',
      'Producción base: 5 unidades por semana.'
    ],
    strategicTip: 'Permite atrapar y fijar a las unidades clave del enemigo.',
    timingRecommendation: 'Día 4.',
  },
  {
    id: 'hive-apex',
    name: 'Ápex (Apex)',
    nameEn: 'Apex',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 5,
    cost: { gold: 5500, wood: 10, crystal: 5 },
    dwellingUpgradeCost: { gold: 2500, crystal: 4 },
    prerequisites: ['Zigurat Quitinoso (Chitin Ziggurat)'],
    unitRecruitedBase: 'Mantis Depredadora (Mantis)',
    unitRecruited: 'Mantis Depredadora / Mantis Reina',
    unitUpgrades: {
      branchA: 'Mantis Reina (Doble guadañazo letal y salto que ignora obstáculos)',
      branchB: 'Mantis Fantasma (Camuflaje que la hace invisible hasta que ataca y ataque con daño crítico)',
      branchADetails: {
        unitName: 'Mantis Reina (Mantis Matriarch)',
        role: 'Segadora de Doble Golpe y Asalto Rápido',
        keyAbilities: ['Doble Golpe de Guadaña', 'Salto Depredador (Salta sobre obstáculos y tropas intermedias)'],
        statsBonus: '+4 Ataque, +2 Velocidad, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Mantis Espectral (Ghost Mantis)',
        role: 'Asesina Sigilosa de Máximo Daño Crítico',
        keyAbilities: ['Invisibilidad en Primer Turno', 'Embosca con +50% de daño en su primer ataque'],
        statsBonus: '+5 Ataque, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas depredadoras de Tier 5 de altísimo daño por segundo.',
      'Producción base: 3 unidades por semana.'
    ],
    strategicTip: 'Su doble golpe es capaz de eliminar regimientos enteros en una sola activación.',
    timingRecommendation: 'Día 5.',
  },
  {
    id: 'hive-scorch-soul-burrows',
    name: 'Madrigueras de Almas Ardientes (Scorch Soul Burrows)',
    nameEn: 'Scorch Soul Burrows',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 6,
    cost: { gold: 4500, ore: 10, crystal: 10 },
    dwellingUpgradeCost: { gold: 3500, crystal: 5 },
    prerequisites: ['Ápex (Apex)'],
    unitRecruitedBase: 'Escorpión Abisal (Abyssal Scorpion)',
    unitRecruited: 'Escorpión Abisal / Escorpión de Magma',
    unitUpgrades: {
      branchA: 'Escorpión de Magma (Cola de lava que causa quemaduras residuales y pinzas trituradoras)',
      branchB: 'Escorpión Gigante Acorazado (Armadura pesada impenetrable e inmunidad a veneno y parálisis)',
      branchADetails: {
        unitName: 'Escorpión de Magma (Magma Scorpion)',
        role: 'Monstruo de Asalto y Daño Ígneo Perforante',
        keyAbilities: ['Aguijón de Lava (Daño de fuego continuo por 2 turnos)', 'Pinzas Trituradoras (Ignora 30% defensa)'],
        statsBonus: '+4 Ataque, +3 Daño Base, +20 Vida'
      },
      branchBDetails: {
        unitName: 'Escorpión Acorazado (Ironclad Scorpion)',
        role: 'Baluarte de Combate Pesado',
        keyAbilities: ['Coraza Blindada (Inmune a aturdimiento y penalizadores)', 'Presencia Avasalladora'],
        statsBonus: '+6 Defensa, +30 Vida'
      }
    },
    effects: [
      'Recluta colosos de choque de Tier 6 de gran resistencia.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'Unidades gigantes capaces de aguantar el castigo más duro de las tropas de élite enemigas.',
    timingRecommendation: 'Día 6.',
  },
  {
    id: 'hive-love-tower',
    name: 'Torre del Amor (Love Tower)',
    nameEn: 'Love Tower',
    category: 'Moradas de Criaturas',
    faction: 'Enjambre',
    tier: 7,
    cost: { gold: 12500, wood: 10, ore: 10, crystal: 15 },
    dwellingUpgradeCost: { gold: 10000, crystal: 10 },
    prerequisites: ['Madrigueras de Almas Ardientes (Scorch Soul Burrows)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Soberana del Enjambre (Hive Queen)',
    unitRecruited: 'Soberana del Enjambre / Emperatriz Quitinácea',
    unitUpgrades: {
      branchA: 'Emperatriz del Enjambre (Invoca enjambres de avispas cada turno y emite aura de feromonas que duplica el daño de aliados adyacentes)',
      branchB: 'Coloso Quitináceo Supremo (Monstruosidad acorazada gigantesca con pisotón de área en 3 casillas)',
      branchADetails: {
        unitName: 'Emperatriz del Enjambre (Hive Empress)',
        role: 'Coloso Invocador y Potenciador de la Horda',
        keyAbilities: ['Invocación de Avispas (Crea un stack de avispas cada turno)', 'Aura de Feromonas (+25% daño a todas las tropas del Enjambre)'],
        statsBonus: '+5 Ataque, +5 Defensa, +50 Vida, +2 Velocidad'
      },
      branchBDetails: {
        unitName: 'Coloso Quitináceo (Chitin Colossus)',
        role: 'Destructor Masivo de Área',
        keyAbilities: ['Pisotón Devastador (Golpea a todas las casillas adyacentes)', 'Inmunidad a Magia de Nivel 1 a 4'],
        statsBonus: '+8 Ataque, +8 Defensa, +70 Vida'
      }
    },
    effects: [
      'Recluta las criaturas legendarias de Tier 7 del Enjambre.',
      'Producción base: 1 unidad por semana (+1 con Castillo).'
    ],
    strategicTip: 'La Emperatriz convierte a todo el ejército en una máquina implacable gracias a sus invocaciones y feromonas continuas.',
    timingRecommendation: 'Semana 1 (Día 7) o Semana 2 (Día 1).',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (ENJAMBRE)
  // =========================================================================
  {
    id: 'hive-chitin-incubator',
    name: 'Incubadora Quitinácea (Chitin Incubator)',
    nameEn: 'Chitin Incubator',
    category: 'Estructuras Especiales de Facción',
    faction: 'Enjambre',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, crystal: 2 },
    prerequisites: ['Vivienda Descuidada (Squalid Dwelling)'],
    effects: [
      'Aumenta el crecimiento de todas las criaturas de Tier 1 a 3 en un +25% adicional cada semana.',
      'Reduce en un -15% el coste de reclutamiento de larvas y escarabajos.'
    ],
    strategicTip: 'Dispara la masa de tropas baratas para asediar con números abrumadores.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'hive-pheromone-nest',
    name: 'Nido de Feromonas Primordiales (Pheromone Nest)',
    nameEn: 'Pheromone Nest',
    category: 'Estructuras Especiales de Facción',
    faction: 'Enjambre',
    isFactionUnique: true,
    cost: { gold: 2000, wood: 5, crystal: 3 },
    prerequisites: ['Nido de Papel (Paper Nest)'],
    effects: [
      'Otorga +1 a la Velocidad y +1 a la Iniciativa a todas las criaturas del Enjambre durante los asedios.',
      'Permite ver los movimientos de héroes enemigos en el territorio de la provincia.'
    ],
    strategicTip: 'Garantiza el primer turno en batallas territoriales clave.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'hive-shrine-of-return',
    name: 'Santuario del Retorno (Shrine of Return - Santo Grial)',
    nameEn: 'Shrine of Return',
    category: 'Estructuras Especiales de Facción',
    faction: 'Enjambre',
    isFactionUnique: true,
    cost: { gold: 5000, wood: 10, ore: 5, crystal: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Torre del Amor (Love Tower)'],
    effects: [
      'Estructura Suprema del Grial del Enjambre.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Duplica el número de criaturas producidas por la Incubadora Quitinácea y cura al 100% las tropas aliadas al inicio de cada combate.'
    ],
    strategicTip: 'La horda se vuelve infinita e imparable una vez edificado el Grial.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];
