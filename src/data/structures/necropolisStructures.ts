import { TownStructure } from '../../types';

export const NECROPOLIS_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (ROSTRO ETERNO) - MULTI-NIVEL (1 a 3)
  // =========================================================================
  {
    id: 'necropolis-eternal-visage',
    name: 'Rostro Eterno',
    nameEn: 'Eternal Visage',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 5000 },
    prerequisites: [],
    effects: [
      'Sede principal de la corona no-muerta y centro de canalización nigromántica.',
      'Otorga al reino oro, puntos de ley y puntos de astrología al día. Aumenta el límite de héroes (si lo permite el escenario)',
      'Se mejora a lo largo de 3 niveles cívicos (Rostro Eterno -> Rostro Eterno II -> Rostro Eterno III).'
    ],
    strategicTip: 'Mejora a Nivel II (Rostro Eterno II) en el Día 2 para acumular oro para las moradas de nigromancia.',
    timingRecommendation: 'Día 2-4 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Rostro Eterno',
        nameEn: 'Eternal Visage',
        cost: { gold: 5000 },
        prerequisites: [],
        effects: ['Otorga al reino 500 de oro, puntos de ley y puntos de astrología al día.', '+1 al límite de héroes.'],
        bonusIncome: '+500 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Asentamiento inicial básico.'
      },
      {
        level: 2,
        name: 'Nivel II: Rostro Eterno II',
        nameEn: 'Eternal Visage II',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Rostro Eterno'],
        effects: ['Otorga al reino 750 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora económica de nivel 1.'],
        bonusIncome: '+750 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Construir el Día 2 o 3 para acelerar la compra de tropas.'
      },
      {
        level: 3,
        name: 'Nivel III: Rostro Eterno III',
        nameEn: 'Eternal Visage III',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Rostro Eterno II'],
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
    id: 'necropolis-fortifications',
    name: 'Fortificaciones',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Necrópolis',
    cost: { gold: 2500, wood: 0, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona una muralla durante los asedios.',
      'Permite al constructor elegir mejoras defensivas.',
      'Al mejorarse aumenta el crecimiento de tropas.'
    ],
    strategicTip: 'Mejorar a Fortificaciones II en el Día 7 para multiplicar la generación semanal de esqueletos y espectros.',
    timingRecommendation: 'Fortificaciones (Día 1) / Fortificaciones II (Día 7) / Fortificaciones III (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fortificaciones',
        nameEn: 'Bone Fort',
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
        nameEn: 'Necrotic Citadel',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones'],
        effects: [
          'Añade dos torres a las almenas que disparan a los atacantes durante los asedios.',
          'Permite al constructor elegir una mejora defensiva de nivel 2.',
          'Aumenta la producción semanal de todas las tropas no-muertas en un +50% adicional.'
        ],
        defenseBonus: '2 Torres Defensivas',
        growthBonus: '+50% Crecimiento semanal de tropas',
        strategicTip: 'Construir el Día 7 de la Semana 1 para cosechar hordas el Día 8.'
      },
      {
        level: 3,
        name: 'Nivel III: Fortificaciones III',
        nameEn: 'Dread Castle',
        cost: { gold: 5000, wood: 0, ore: 15 },
        prerequisites: ['Nivel II: Fortificaciones II'],
        effects: [
          'Añade una gran torre más a las almenas que dispara a los atacantes durante los asedios y se asienta junto a la muralla.',
          'Permite al constructor elegir una mejora defensiva de nivel 3.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '1 Torre Defensiva',
        growthBonus: '+100% Crecimiento semanal de tropas (Duplica producción)',
        strategicTip: 'Multiplica la horda no-muerta exponencialmente.'
      }
    ]
  },

  // =========================================================================
  // COFRADÍA DE MAGOS DE LA OSCURIDAD - MULTI-NIVEL (1 a 5)
  // =========================================================================
  {
    id: 'necropolis-mage-guild',
    name: 'Cofradía de Magos de la Muerte (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Necrópolis',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio nigromántico consagrado a la magia de Sombras, Muerte, Tierra y Veneno.',
      'Enseña maleficios, maldiciones y drenajes de vida a lo largo de 5 niveles.',
      'Recarga el maná del héroe visitante al 100%.'
    ],
    strategicTip: 'El Nivel 2 es requisito directo para el Palacio de los Vampiros (Tier 7 de Necrópolis).',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 11-12).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel 1: Círculo de Nigromantes',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Enseña 5 hechizos de Nivel 1 (Maldición, Drenar Maná, Flecha Sombría, etc.).', 'Otorga Libro de Hechizos.'],
        strategicTip: 'Requisito para moradas avanzadas y Ciudadela.'
      },
      {
        level: 2,
        name: 'Nivel 2: Osario de Hechicería',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 4 },
        prerequisites: ['Nivel 1: Círculo de Nigromantes'],
        effects: ['Enseña 4 hechizos de Nivel 2 (Nube Tóxica, Lentitud, Descomposición, etc.).', 'Requisito para Tier 7.'],
        strategicTip: 'Construir antes del Día 14 para el Palacio de los Vampiros.'
      },
      {
        level: 3,
        name: 'Nivel 3: Cámara de Maleficios',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 6 },
        prerequisites: ['Nivel 2: Osario de Hechicería'],
        effects: ['Enseña 3 hechizos de Nivel 3 (Animar Muertos, Rayo de Muerte, Plaga, etc.).'],
        strategicTip: 'Animar Muertos permite sostener batallas sin pérdidas permanentes.'
      },
      {
        level: 4,
        name: 'Nivel 4: Cónclave de las Sombras',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 8 },
        prerequisites: ['Nivel 3: Cámara de Maleficios'],
        effects: ['Enseña 2 hechizos de Nivel 4 (Onda Mortal, Cadenas del Alma, etc.).'],
        strategicTip: 'Onda Mortal daña a todos los vivos sin tocar a tus no-muertos.'
      },
      {
        level: 5,
        name: 'Nivel 5: Cima del Apocalipsis Fúnebre',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, mercury: 10 },
        prerequisites: ['Nivel 4: Cónclave de las Sombras'],
        effects: ['Enseña 2 hechizos de Nivel 5 de máxima destrucción (Armagedón de Sombras, Extinción Masiva).'],
        strategicTip: 'Destrucción absoluta de ejércitos vivos.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS & ECONOMÍA
  // =========================================================================
  {
    id: 'necropolis-tavern',
    name: 'Taberna de los Condenados (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite contratar nuevos héroes nigromantes y caballeros de la muerte.',
      'Desbloquea la red de espionaje y rumores.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe que levante esqueletos por todo el territorio.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'necropolis-marketplace',
    name: 'Mercado de Almas (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite intercambiar recursos y oro.',
      'Mejora las tasas de cambio conforme se controlan más mercados.',
      'Permite canjear madera y mineral por Mercurio y Oro.'
    ],
    strategicTip: 'Construir en Semana 1 para canjear recursos por Mercurio para el Palacio de los Vampiros.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'necropolis-alchemical-depot',
    name: 'Depósito Alquímico de Mercurio (Alchemic Depot)',
    nameEn: 'Alchemic Depot',
    category: 'Cívica y Economía',
    faction: 'Necrópolis',
    cost: { gold: 0, gems: 3, crystal: 3, mercury: 3 },
    prerequisites: ['Mercado de Almas (Marketplace)'],
    effects: [
      'Genera +1 Mercurio diario de forma pasiva (recurso raro principal de Necrópolis).',
      'Asegura el suministro continuo de mercurio para la Cofradía de Magos y Vampiros de Tier 7.'
    ],
    strategicTip: 'Construir en cuanto se tengan 3 de cada recurso raro secundario.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CON MEJORAS Y DOBLE RAMA (CANON OLDEN ERA)
  // =========================================================================
  {
    id: 'necropolis-crypt',
    name: 'Cripta Maldita (Cursed Crypt)',
    nameEn: 'Cursed Crypt',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 1,
    cost: { gold: 1000, ore: 5 },
    dwellingUpgradeCost: { gold: 800, ore: 5 },
    prerequisites: ['Fortificaciones I (Fuerte)'],
    unitRecruitedBase: 'Esqueleto (Skeleton)',
    unitRecruited: 'Esqueleto / Guerrero Esqueleto / Arquero Esqueleto',
    unitUpgrades: {
      branchA: 'Guerrero Esqueleto (Escudo de hueso, tanque acorazado con reducción de proyectiles)',
      branchB: 'Arquero Esqueleto (Tirador con flechas de hueso a distancia)',
      branchADetails: {
        unitName: 'Guerrero Esqueleto (Skeleton Warrior)',
        role: 'Infantería de Choque y Bloqueo de Horda',
        keyAbilities: ['Escudo Óseo (-30% daño de proyectiles)', 'Armadura Reforzada', 'No-muerto'],
        statsBonus: '+2 Ataque, +4 Defensa, +4 Vida'
      },
      branchBDetails: {
        unitName: 'Arquero Esqueleto (Skeleton Archer)',
        role: 'Tirador a Distancia Inmune a Moral',
        keyAbilities: ['Disparo Necrótico (18 disparos)', 'Sin penalización por melé reducido', 'No-muerto'],
        statsBonus: '+2 Ataque, +1 Defensa, +2 Vida'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 no-muertas para formar la masa de la horda.',
      'Producción base: 20 unidades por semana (+50% con Ciudadela, +100% con Castillo).'
    ],
    strategicTip: 'Se complementa directamente con la habilidad pasiva de Nigromancia tras cada combate.',
    timingRecommendation: 'Día 2.',
  },
  {
    id: 'necropolis-wight-tomb',
    name: 'Tumba de Apariciones (Wight Tomb)',
    nameEn: 'Wight Tomb',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 2,
    cost: { gold: 1500, ore: 5 },
    dwellingUpgradeCost: { gold: 1200, ore: 5 },
    prerequisites: ['Cripta Maldita (Cursed Crypt)'],
    unitRecruitedBase: 'Aparición (Wight)',
    unitRecruited: 'Aparición / Espectro / Fantasma',
    unitUpgrades: {
      branchA: 'Espectro (Drena 4 de Maná al héroe enemigo por asalto e impone silencio)',
      branchB: 'Fantasma (Forma Etérea con 35% de evasión física y regeneración pasiva)',
      branchADetails: {
        unitName: 'Espectro (Wraith)',
        role: 'Hostigador Aéreo y Drenador de Maná',
        keyAbilities: ['Vuelo Veloz', 'Drena 4 de Maná', 'Silencio Mágico por 1 turno', 'No-muerto'],
        statsBonus: '+2 Ataque, +2 Defensa, +6 Vida, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Fantasma (Phantasm)',
        role: 'Volador Etéreo con Alta Evasión',
        keyAbilities: ['Forma Etérea (35% evasión física)', 'Regeneración Pasiva', 'Vuelo', 'No-muerto'],
        statsBonus: '+1 Ataque, +2 Defensa, +4 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta unidades voladoras de Tier 2 rápidas con sabotaje mágico o evasión.',
      'Producción base: 12 unidades por semana.'
    ],
    strategicTip: 'Vuelan directo a magos y tiradores enemigos para anular su capacidad en Turno 1.',
    timingRecommendation: 'Día 3.',
  },
  {
    id: 'necropolis-kennel',
    name: 'Perrera Maldita (Cursed Kennel)',
    nameEn: 'Cursed Kennel',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 3,
    cost: { gold: 1800, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1400, wood: 5 },
    prerequisites: ['Tumba de Apariciones (Wight Tomb)'],
    unitRecruitedBase: 'Sabueso No-Muerto (Undead Pet)',
    unitRecruited: 'Sabueso No-Muerto / Barghest / Armadillo Óseo',
    unitUpgrades: {
      branchA: 'Barghest (Aullido del Averno reduciendo -1 moral y +25% daño infligido)',
      branchB: 'Armadillo Óseo (Caparazón espinoso que refleja un 30% del daño cuerpo a cuerpo)',
      branchADetails: {
        unitName: 'Barghest (Barghest)',
        role: 'Vanguardia Bestial y Desmoralizador',
        keyAbilities: ['Aullido Desmoralizador (-1 Moral)', 'Desgarro Crítico', 'Velocidad 9', 'No-muerto'],
        statsBonus: '+3 Ataque, +2 Defensa, +8 Vida, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Armadillo Óseo (Bone Armadillo)',
        role: 'Tanque Espinoso Reflectante',
        keyAbilities: ['Caparazón Espinoso (30% daño reflejado)', 'Defensa Acorazada', 'No-muerto'],
        statsBonus: '+1 Ataque, +6 Defensa, +13 Vida'
      }
    },
    effects: [
      'Recluta bestias de Tier 3 veloces para flanquear y hostigar las líneas rivales.',
      'Producción base: 9 unidades por semana.'
    ],
    strategicTip: 'Su alta velocidad (8-9) permite trabar tiradores enemigos antes de que disparen.',
    timingRecommendation: 'Día 4.',
  },
  {
    id: 'necropolis-graverobber-den',
    name: 'Cámara de los Saqueatumbas (Graverobber Den)',
    nameEn: 'Graverobber Den',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 4,
    cost: { gold: 2500, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 2000, wood: 5, mercury: 2 },
    prerequisites: ['Perrera Maldita (Cursed Kennel)'],
    unitRecruitedBase: 'Saqueatumbas (Graverobber)',
    unitRecruited: 'Saqueatumbas / Mercader de la Muerte / Amo de la Jauría',
    unitUpgrades: {
      branchA: 'Mercader de la Muerte (Tiro Maldito que aplica Maldición y Debilitamiento al 50% de daño)',
      branchB: 'Amo de la Jauría (Invoca una escuadra extra de Sabuesos No-Muertos al inicio de la batalla)',
      branchADetails: {
        unitName: 'Mercader de la Muerte (Merchant of Death)',
        role: 'Tirador Maldito y Control de Daño',
        keyAbilities: ['Tiro Maldito (Maldición y Debilitamiento)', 'Sin penalización melé', 'No-muerto'],
        statsBonus: '+3 Ataque, +2 Defensa, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Amo de la Jauría (Kennel Master)',
        role: 'Invocador de Vanguardia Canina',
        keyAbilities: ['Llamada de Jauría (Invoca Sabuesos gratis)', 'Tirador a Distancia', 'No-muerto'],
        statsBonus: '+2 Ataque, +3 Defensa, +8 Vida'
      }
    },
    effects: [
      'Recluta tiradores y soportes de Tier 4 indispensables para la cadencia de fuego no-muerta.',
      'Producción base: 6 unidades por semana.'
    ],
    strategicTip: 'El Mercader de la Muerte neutraliza a los colosos enemigos reduciendo su daño a la mitad.',
    timingRecommendation: 'Día 8.',
  },
  {
    id: 'necropolis-lich-mausoleum',
    name: 'Mausoleo de los Liches (Lich Mausoleum)',
    nameEn: 'Lich Mausoleum',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 5,
    cost: { gold: 4000, ore: 10, mercury: 5 },
    dwellingUpgradeCost: { gold: 2800, mercury: 3 },
    prerequisites: ['Cámara de los Saqueatumbas (Graverobber Den)'],
    unitRecruitedBase: 'Liche (Lich)',
    unitRecruited: 'Liche / Liche Pestilente / Liche Sanguíneo',
    unitUpgrades: {
      branchA: 'Liche Pestilente (Nube Tóxica Persistente que envenena el terreno en área de 3x3)',
      branchB: 'Liche Sanguíneo (Drenaje Colectivo que transfiere un 40% del daño para sanar y reanimar aliados no-muertos)',
      branchADetails: {
        unitName: 'Liche Pestilente (Pestilent Lich)',
        role: 'Artillería Mágica de Área Persistente',
        keyAbilities: ['Miasma Mortal (Área venenosa 3x3 persistente)', 'Sin penalización melé', 'No-muerto'],
        statsBonus: '+3 Ataque, +3 Defensa, +15 Vida'
      },
      branchBDetails: {
        unitName: 'Liche Sanguíneo (Sanguine Lich)',
        role: 'Soporte Nigromántico y Sanación Aliada',
        keyAbilities: ['Drenaje Colectivo (Cura tropas no-muertas)', 'Tirador Mágico de Área', 'No-muerto'],
        statsBonus: '+2 Ataque, +4 Defensa, +12 Vida'
      }
    },
    effects: [
      'Recluta tiradores mágicos de Tier 5 con Nube de Muerte que no daña a no-muertos.',
      'Producción base: 4 unidades por semana.'
    ],
    strategicTip: 'Dispara directamente sobre tus propias unidades trabadas: los enemigos perecerán y tus no-muertos quedarán ilesos.',
    timingRecommendation: 'Día 10.',
  },
  {
    id: 'necropolis-dread-knight-hall',
    name: 'Salón de los Caballeros del Terror (Dread Knight Hall)',
    nameEn: 'Dread Knight Hall',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 6,
    cost: { gold: 5000, ore: 10, mercury: 5 },
    dwellingUpgradeCost: { gold: 3500, ore: 5, mercury: 3 },
    prerequisites: ['Mausoleo de los Liches (Lich Mausoleum)'],
    unitRecruitedBase: 'Caballero del Terror (Dread Knight)',
    unitRecruited: 'Caballero del Terror / Avatar de la Guerra / Segador Hueco',
    unitUpgrades: {
      branchA: 'Avatar de la Guerra (30% prob. de Golpe Mortal con 2.5x daño y gana +3 Ataque por cada enemigo caído)',
      branchB: 'Segador Hueco (Mirada de Muerte que siega tropas extra y reduce la moral rival en -2)',
      branchADetails: {
        unitName: 'Avatar de la Guerra (Avatar of War)',
        role: 'Coloso de Choque y Daño Crítico Letal',
        keyAbilities: ['Golpe Mortal (2.5x daño)', 'Furia Acumulativa (+3 Ataque por caída)', 'No-muerto'],
        statsBonus: '+3 Ataque, +3 Defensa, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Segador Hueco (Hollow Reaper)',
        role: 'Destructor de Moral y Siega de Almas',
        keyAbilities: ['Mirada de Muerte (Death Stare)', 'Presencia Aterradora (-2 Moral)', 'No-muerto'],
        statsBonus: '+2 Ataque, +2 Defensa, +25 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta la infantería pesada de asalto cuerpo a cuerpo de Tier 6 más letal de Jadame.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'Su Golpe Mortal y Mirada de Muerte pueden borrar pilas enemigas completas de un solo impacto.',
    timingRecommendation: 'Día 15.',
  },
  {
    id: 'necropolis-vampire-palace',
    name: 'Palacio de los Vampiros de Shadowspire (Vampire Palace)',
    nameEn: 'Vampire Palace',
    category: 'Moradas de Criaturas',
    faction: 'Necrópolis',
    tier: 7,
    cost: { gold: 10000, ore: 15, mercury: 10 },
    dwellingUpgradeCost: { gold: 8000, mercury: 8 },
    prerequisites: ['Salón de los Caballeros del Terror (Dread Knight Hall)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Vampiro (Vampire)',
    unitRecruited: 'Vampiro / Señor de los Vampiros / Erudito Vampiro',
    unitUpgrades: {
      branchA: 'Señor de los Vampiros (Drenaje de Sangre 100% con resurrección total de miembros caídos, vuelo y sin contraataque)',
      branchB: 'Erudito Vampiro (Explosión Cadavérica en área al eliminar objetivos y sanación colectiva aliada)',
      branchADetails: {
        unitName: 'Señor de los Vampiros (Vampire Lord)',
        role: 'Cúspide Suprema de Vanguardia y Resurrección Total',
        keyAbilities: ['Drenaje de Sangre Total (100% de daño cura y resucita miembros)', 'Sin Contraataque', 'Vuelo Veloz', 'No-muerto'],
        statsBonus: '+4 Ataque, +4 Defensa, +70 Vida, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Erudito Vampiro (Vampire Scholar)',
        role: 'Coloso de Detonación en Cadena y Soporte Oscuro',
        keyAbilities: ['Explosión Cadavérica', 'Sanación Masiva Aliada', 'Sin Contraataque', 'Vuelo', 'No-muerto'],
        statsBonus: '+3 Ataque, +3 Defensa, +50 Vida'
      }
    },
    effects: [
      'Recluta los colosos supremos de Tier 7 de la Necrópolis de Olden Era: los aristócratas vampíricos de Shadowspire.',
      'Producción base: 1 unidad por semana (+1 con Castillo).'
    ],
    strategicTip: 'El Señor de los Vampiros resucita con cada mordisco a tropas vivas y no sufre contraataque, garantizando batallas impecables con 0 bajas.',
    timingRecommendation: 'Día 14 (Rush de Semana 2).',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (NECRÓPOLIS)
  // =========================================================================
  {
    id: 'necropolis-amplifier',
    name: 'Amplificador Nigromántico (Necromancy Amplifier)',
    nameEn: 'Necromancy Amplifier',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, mercury: 2 },
    prerequisites: ['Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    effects: [
      'Aumenta la habilidad de Nigromancia de todos los héroes aliados en un +10% permanente.',
      'Se acumula con los amplificadores de otras ciudades conquistadas.'
    ],
    strategicTip: 'Construir en cada ciudad Necrópolis que controles para multiplicar las hordas levantadas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-transformer',
    name: 'Transformador de Esqueletos (Skeleton Transformer)',
    nameEn: 'Skeleton Transformer',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 2000, ore: 5, mercury: 3 },
    prerequisites: ['Cripta Maldita (Cursed Crypt)'],
    effects: [
      'Permite convertir cualquier criatura viva o neutral capturada en Esqueletos homogéneos para alimentar tu horda.',
      'No tiene coste adicional de recursos para la conversión.'
    ],
    strategicTip: 'Recluta tropas neutrales no deseadas en el mapa y transfórmalas en hordas de esqueletos homogéneas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'necropolis-shroud-of-darkness',
    name: 'Velo de las Tinieblas (Shroud of Darkness - Santo Grial)',
    nameEn: 'Shroud of Darkness',
    category: 'Estructuras Especiales de Facción',
    faction: 'Necrópolis',
    isFactionUnique: true,
    cost: { gold: 5000, ore: 10, mercury: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Palacio de los Vampiros de Shadowspire (Vampire Palace)'],
    effects: [
      'Estructura Suprema del Grial de la Necrópolis.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Oculta permanentemente el territorio de tu reino bajo una niebla de guerra perpetua para todos los enemigos y otorga +20% a Nigromancia.'
    ],
    strategicTip: 'Ciega por completo a los rivales e impide que rastreen tus movimientos en el mapa de campaña.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];

