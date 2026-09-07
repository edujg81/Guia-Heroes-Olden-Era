import { TownStructure } from '../../types';

export const GROVE_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (AYUNTAMIENTO / CAPITOLIO) - MULTI-NIVEL (1 a 4)
  // =========================================================================
  {
    id: 'grove-grove-palace',
    name: 'Palacio de la Arboleda (Ayuntamiento / Capitolio)',
    nameEn: 'Grove Palace (Town Hall / Capitol)',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 5000 },
    prerequisites: [],
    effects: [
      'Sede señorial de los reyes élficos y guardianes del bosque.',
      'Otorga al reino oro, puntos de ley y puntos de astrología al día. Aumenta el límite de héroes (si lo permite el escenario)',
      'Se mejora a lo largo de 4 niveles cívicos: Asentamiento (500) -> Alcaldía (1.000) -> Ciudadela Cívica (2.000) -> Capitolio (4.000 Oro/día).'
    ],
    strategicTip: 'Mejora a Nivel II en el Día 2 para acelerar el desarrollo hacia el Altar de Qilins y el Fénix Mítico.',
    timingRecommendation: 'Día 2-3 (Nivel II) / Semana 2 (Nivel III) / Semana 3 (Capitolio).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento Silvano (Ayuntamiento)',
        nameEn: 'Sylvan Settlement (Town Hall)',
        cost: { gold: 5000 },
        prerequisites: [],
        effects: ['Otorga al reino 500 de oro, puntos de ley y puntos de astrología al día.', '+1 al límite de héroes.'],
        bonusIncome: '+500 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Asentamiento inicial básico.'
      },
      {
        level: 2,
        name: 'Nivel II: Palacio de la Arboleda II (Alcaldía)',
        nameEn: 'Grove Palace II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Palacio de la Arboleda (Ayuntamiento / Capitolio)'],
        effects: ['Otorga al reino 1.000 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora económica de nivel 1.'],
        bonusIncome: '+1.000 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Construir el Día 2 o 3 para asegurar fondos.'
      },
      {
        level: 3,
        name: 'Nivel III: Palacio de la Arboleda III (Ciudadela Cívica)',
        nameEn: 'Grove Palace III (Metropolis Hall)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Palacio de la Arboleda II (Alcaldía)'],
        effects: ['Otorga al reino 2.000 de oro, puntos de ley y puntos de astrología al día.', 'Permite al propietario elegir una mejora de nivel 2.'],
        bonusIncome: '+2.000 Oro, Puntos de ley, Puntos de astrología / día',
        strategicTip: 'Prioridad al inicio de la Semana 2 para sostener el coste de Qilins y Fénix.'
      },
      {
        level: 4,
        name: 'Nivel IV: Gran Capitolio del Bosque Primordial (Capitolio)',
        nameEn: 'Grand Primeval Forest Capitol',
        cost: { gold: 10000, wood: 15, ore: 15 },
        prerequisites: ['Nivel III: Palacio de la Arboleda III (Ciudadela Cívica)', 'Fortificaciones II (Ciudadela Militar)'],
        effects: [
          'Estructura suprema cívica de la Arboleda. Solo se puede edificar 1 Capitolio por reino/jugador.',
          'Otorga al reino 4.000 de oro al día, además de bonificación masiva de puntos de ley y astrología.'
        ],
        bonusIncome: '+4.000 Oro, Puntos de ley supremos, Puntos de astrología / día',
        strategicTip: 'Garantiza el oro necesario para reclutar el ejército de criaturas míticas de la Arboleda.'
      }
    ]
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II y III)
  // =========================================================================
  {
    id: 'grove-fortifications',
    name: 'Fortificaciones',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Arboleda',
    cost: { gold: 2500, wood: 0, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona una muralla durante los asedios.',
      'Permite al constructor elegir mejoras defensivas.',
      'Al mejorarse aumenta el crecimiento de tropas.'
    ],
    strategicTip: 'Mejorar a Fortificaciones II en el Día 7 para obtener 50% más de tropas en el primer reset semanal.',
    timingRecommendation: 'Fortificaciones (Día 1) / Fortificaciones II (Día 7) / Fortificaciones III (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fortificaciones',
        nameEn: 'Sylvan Fort',
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
        nameEn: 'Green Citadel',
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
        nameEn: 'Arboreal Castle',
        cost: { gold: 5000, wood: 0, ore: 15 },
        prerequisites: ['Nivel II: Fortificaciones II'],
        effects: [
          'Añade una gran torre más a las almenas que dispara a los atacantes durante los asedios y se asienta junto a la muralla.',
          'Permite al constructor elegir una mejora defensiva de nivel 3.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '1 Torre Defensiva',
        growthBonus: '+100% Crecimiento semanal de tropas (Duplica producción)',
        strategicTip: 'Duplica el reclutamiento de Fénix y Águilas del Trueno.'
      }
    ]
  },

  // =========================================================================
  // COFRADÍA DE MAGOS DE LA NATURALEZA - MULTI-NIVEL (1 a 5)
  // =========================================================================
  {
    id: 'grove-mage-guild',
    name: 'Cofradía de Magos de la Naturaleza (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Arboleda',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Círculo druídico consagrado a la magia de Tierra, Agua, Aire y Vida silvestre.',
      'Enseña hechizos elementales, bendiciones y regeneración a lo largo de 5 niveles.',
      'Recarga el maná del héroe visitante al 100%.'
    ],
    strategicTip: 'El Nivel 1 es requisito para la Choza de Hongos (Herbomantes); el Nivel 2 es requisito para la Pira de Fuego (Fénix).',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel 1: Círculo de Druidas Novicios',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Enseña 5 hechizos de Nivel 1 (Celeridad, Flecha de Hielo, Raíces Enredaderas, etc.).', 'Otorga Libro de Hechizos.'],
        strategicTip: 'Requisito para Choza de Hongos y Ciudadela Cívica.'
      },
      {
        level: 2,
        name: 'Nivel 2: Círculo Arcano Druídico',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 4 },
        prerequisites: ['Nivel 1: Círculo de Druidas Novicios'],
        effects: ['Enseña 4 hechizos de Nivel 2 (Rayo Relámpago, Fortuna, Niebla Protectora, etc.).', 'Requisito para Pira de Fuego (Tier 7).'],
        strategicTip: 'Construir antes del Día 6 para Tier 7 Rush.'
      },
      {
        level: 3,
        name: 'Nivel 3: Arboleda de Sabiduría',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 6 },
        prerequisites: ['Nivel 2: Círculo Arcano Druídico'],
        effects: ['Enseña 3 hechizos de Nivel 3 (Terremoto, Escudo de Rayos, Santuario Natural, etc.).'],
        strategicTip: 'Excelente sinergia con héroes druidas de alta Sabiduría.'
      },
      {
        level: 4,
        name: 'Nivel 4: Cónclave de los Antiguos',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 8 },
        prerequisites: ['Nivel 3: Arboleda de Sabiduría'],
        effects: ['Enseña 2 hechizos de Nivel 4 (Invocación Elemental, Cadena de Relámpagos, etc.).'],
        strategicTip: 'Cadena de Relámpagos limpia formaciones enteras de enemigos.'
      },
      {
        level: 5,
        name: 'Nivel 5: Corazón de Gaia',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 10 },
        prerequisites: ['Nivel 4: Cónclave de los Antiguos'],
        effects: ['Enseña 2 hechizos de Nivel 5 (Vórtice Elemental, Resurrección de la Naturaleza).'],
        strategicTip: 'Poder de apoyo y daño masivo para partidas largas.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS & ECONOMÍA
  // =========================================================================
  {
    id: 'grove-tavern',
    name: 'Taberna Silvana (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite contratar nuevos héroes guardabosques y druidas.',
      'Desbloquea la red de rumores del bosque y espionaje.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar exploradores veloces en terreno boscoso.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'grove-marketplace',
    name: 'Mercado de la Arboleda (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite intercambiar recursos y oro.',
      'Mejora las tasas de conversión conforme se controlan más mercados.',
      'Permite canjear madera y mineral por Cristales y Oro.'
    ],
    strategicTip: 'Construir en Semana 1 para canjear recursos por Cristales para el Thunder Lair y Pira de Fuego.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'grove-alchemical-depot',
    name: 'Depósito Alquímico de Cristales (Alchemic Depot)',
    nameEn: 'Alchemic Depot',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 0, gems: 3, crystal: 3, mercury: 3 },
    prerequisites: ['Mercado de la Arboleda (Marketplace)'],
    effects: [
      'Genera +1 Cristal diario de forma pasiva (recurso raro principal de la Arboleda).',
      'Reduce la dependencia de minas de cristal exteriores para Fénix y Águilas.'
    ],
    strategicTip: 'Construir en Semana 2 para asegurar flujo ininterrumpido de cristales.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-blacksmith',
    name: 'Taller Silvano y Herrería Natural (Blacksmith)',
    nameEn: 'Blacksmith',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 1000, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite adquirir el Botiquín de Hierbas Silvano (First Aid Tent) y el Carro de Proyectiles Élfico para el héroe por 2.500 de oro.',
      'El Botiquín Silvano cura heridas y elimina venenos y maldiciones automáticamente al inicio de cada ronda de combate.',
      'Otorga munición mágica regenerativa a los tiradores silvestres.'
    ],
    strategicTip: 'Excelente complemento para mantener vivos a los tiradores y Faunos durante la exploración de bosques densos.',
    timingRecommendation: 'Día 2-4.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CON MEJORAS Y DOBLE RAMA
  // =========================================================================
  {
    id: 'grove-faun-huts',
    name: 'Cabañas de Faunos (Faun Huts)',
    nameEn: 'Faun Huts',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 1,
    cost: { gold: 1250, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Fortificaciones I (Fuerte)'],
    unitRecruitedBase: 'Fauno (Faun)',
    unitRecruited: 'Fauno / Sátiro del Bosque',
    unitUpgrades: {
      branchA: 'Fauno Flautista (Música encantadora que reduce la iniciativa enemiga)',
      branchB: 'Sátiro de Vanguardia (Ataque con salto acrobático y bonificación de suerte)',
      branchADetails: {
        unitName: 'Fauno Flautista (Piper Faun)',
        role: 'Controlador de Iniciativa y Soporte',
        keyAbilities: ['Melodía Calmante (-15% Iniciativa al enemigo adyacente)', 'Movilidad Silvana'],
        statsBonus: '+2 Velocidad, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Sátiro Hostigador (Satyric Skirmisher)',
        role: 'Hostigador Ágil de Primer Turno',
        keyAbilities: ['Salto Acrobático (Ignora penalización de terreno)', 'Suerte de la Fortuna (+10% daño crítico)'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas ágiles de Tier 1 con bonificaciones en terreno boscoso.',
      'Producción base: 14 unidades por semana (+50% con Ciudadela, +100% con Castillo).'
    ],
    strategicTip: 'Excelente velocidad de movimiento inicial para rodear tropas neutrales lentas.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'grove-wood-hop-farm',
    name: 'Plantación de Lúpulo (Wood Hop Farm)',
    nameEn: 'Wood Hop Farm',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 2,
    cost: { gold: 1750, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1250, wood: 5 },
    prerequisites: ['Cabañas de Faunos (Faun Huts)'],
    unitRecruitedBase: 'Hoplita Silvano (Wood Hoplite)',
    unitRecruited: 'Hoplita Silvano / Guardián del Bosque',
    unitUpgrades: {
      branchA: 'Falange de Robles (Muro impenetrable de escudos con defensa aumentada)',
      branchB: 'Lancero Guardián (Ataque a 2 casillas con daño extra a caballería)',
      branchADetails: {
        unitName: 'Falange de Robles (Oak Hoplite)',
        role: 'Muro Defensivo Impenetrable',
        keyAbilities: ['Muro de Picas (+4 Def si no se ha movido)', 'Resistencia a Cargas Enemigas'],
        statsBonus: '+4 Defensa, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Lancero Guardián (Guardian Spearman)',
        role: 'Anti-Caballería con Alcance Extendido',
        keyAbilities: ['Ataque de 2 casillas en línea', 'Daño Doble contra Caballería y Voladores que carguen'],
        statsBonus: '+3 Ataque, +1 Daño Base'
      }
    },
    effects: [
      'Recluta tropas de Tier 2 defensivas de primera línea.',
      'Producción base: 9 unidades por semana.'
    ],
    strategicTip: 'Su alcance y resistencia frenan las cargas enemigas en seco.',
    timingRecommendation: 'Día 2.',
  },
  {
    id: 'grove-iriyad-spring',
    name: 'Manantial de Ninfas (Iriyad Spring)',
    nameEn: 'Iriyad Spring',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 3,
    cost: { gold: 2000, wood: 5, ore: 5, crystal: 3 },
    dwellingUpgradeCost: { gold: 1500, crystal: 2 },
    prerequisites: ['Plantación de Lúpulo (Wood Hop Farm)'],
    unitRecruitedBase: 'Ninfa Iriyad (Iriyad Nymph)',
    unitRecruited: 'Ninfa Iriyad / Ninfa Floral / Ninfa del Viento',
    unitUpgrades: {
      branchA: 'Ninfa Floral (Polvo cegador que anula la réplica enemiga y vuelo sin penalización)',
      branchB: 'Ninfa del Viento (Aura de evasión del 35% contra ataques físicos y ráfaga de espinas)',
      branchADetails: {
        unitName: 'Ninfa Floral (Floral Iriyad)',
        role: 'Hostigadora Aérea con Ceguera y Sin Réplica',
        keyAbilities: ['Polvo Cegador (Invalida contraataques)', 'Vuelo Rápido', 'Sin represalia enemiga'],
        statsBonus: '+3 Ataque, +2 Velocidad, +1 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Ninfa del Viento (Zephyr Iriyad)',
        role: 'Voladora Evasiva de Hostigamiento',
        keyAbilities: ['Evasión del Viento (35% prob. esquivar golpes)', 'Ráfaga de Espinas', 'Iniciativa Superior'],
        statsBonus: '+2 Ataque, +2 Defensa, +4 Vida'
      }
    },
    effects: [
      'Recluta tropas voladoras de Tier 3 con ataque sin contraataque.',
      'Producción base: 7 unidades por semana.'
    ],
    strategicTip: 'La Ninfa Iriyad anula la respuesta de colosos enemigos permitiendo a los Faunos y Hoplitas golpear impunemente.',
    timingRecommendation: 'Día 3.',
  },
  {
    id: 'grove-blooming-pond',
    name: 'Estanque Floreciente (Blooming Pond)',
    nameEn: 'Blooming Pond',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 4,
    cost: { gold: 2500, ore: 5, crystal: 5 },
    dwellingUpgradeCost: { gold: 2000, crystal: 3 },
    prerequisites: ['Manantial de Ninfas (Iriyad Spring)'],
    unitRecruitedBase: 'Aqualotl (Aqualotl)',
    unitRecruited: 'Aqualotl / Dríada Acuática',
    unitUpgrades: {
      branchA: 'Aqualotl Abisal (Regeneración masiva al estar en agua o ciénaga y aura curativa)',
      branchB: 'Aqualotl Venenoso (Ataque a distancia que reduce la defensa rival en un 20%)',
      branchADetails: {
        unitName: 'Aqualotl Abisal (Abyssal Aqualotl)',
        role: 'Anfibio Regenerativo y Protector',
        keyAbilities: ['Aura Hidrófila (Regenera 15% HP por turno)', 'Curación de Aliados Cercanos'],
        statsBonus: '+3 Defensa, +8 Vida'
      },
      branchBDetails: {
        unitName: 'Aqualotl Venenoso (Venomous Aqualotl)',
        role: 'Hostigador Tóxico de Posición',
        keyAbilities: ['Mordedura Tóxica (Reduce armadura enemiga)', 'Regeneración Anfibia'],
        statsBonus: '+3 Ataque, +1 Velocidad'
      }
    },
    effects: [
      'Recluta unidades acuáticas de Tier 4 con alta versatilidad táctica.',
      'Producción base: 5 unidades por semana.'
    ],
    strategicTip: 'Excelente sinergia con terrenos pantanosos y sostenimiento de salud prolongado.',
    timingRecommendation: 'Día 4.',
  },
  {
    id: 'grove-shroomwood-shack',
    name: 'Choza del Bosque de Hongos (Shroomwood Shack)',
    nameEn: 'Shroomwood Shack',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 5,
    cost: { gold: 2750, wood: 10, gems: 4, crystal: 4, mercury: 4 },
    dwellingUpgradeCost: { gold: 2500, crystal: 4 },
    prerequisites: ['Estanque Floreciente (Blooming Pond)', 'Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    unitRecruitedBase: 'Herbomante (Herbomancer)',
    unitRecruited: 'Herbomante / Druida del Bosque',
    unitUpgrades: {
      branchA: 'Archidruida del Trueno (Lanza rayos de energía y potencia el maná del héroe)',
      branchB: 'Druida de Espinas (Enreda a enemigos en raíces paralizantes y crea muros de zarzas)',
      branchADetails: {
        unitName: 'Archidruida del Trueno (High Thunder Druid)',
        role: 'Lanzador de Hechizos y Canalizador de Maná',
        keyAbilities: ['Rayo Arcano a Distancia', 'Canalización Mística (-1 coste de maná a hechizos del héroe)'],
        statsBonus: '+3 Poder Mágico, +2 Ataque a Distancia'
      },
      branchBDetails: {
        unitName: 'Druida Espinario (Bramble Druid)',
        role: 'Control de Masas de Campo',
        keyAbilities: ['Enredo de Espinas (Inmoviliza a la unidad objetivo por 1 turno)', 'Espinas Vengativas'],
        statsBonus: '+4 Defensa, +10 Vida'
      }
    },
    effects: [
      'Recluta lanzadores de conjuros de Tier 5 de la Arboleda.',
      'Producción base: 3 unidades por semana.'
    ],
    strategicTip: 'Permite reducir los costes de maná del héroe y lanzar potentes ataques mágicos.',
    timingRecommendation: 'Día 5.',
  },
  {
    id: 'grove-celestial-ridge',
    name: 'Cumbre Celestial (Celestial Ridge)',
    nameEn: 'Celestial Ridge',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 6,
    cost: { gold: 6500, wood: 5, ore: 5, crystal: 5 },
    dwellingUpgradeCost: { gold: 3500, crystal: 5 },
    prerequisites: ['Choza del Bosque de Hongos (Shroomwood Shack)'],
    unitRecruitedBase: 'Qilin Celestial (Celestial Qilin)',
    unitRecruited: 'Qilin Celestial / Qilin de la Fortuna',
    unitUpgrades: {
      branchA: 'Qilin de la Fortuna (Aura de Suerte Suprema que otorga +2 de suerte a tropas adyacentes y salto místico)',
      branchB: 'Qilin de Jade (Piel de jade con 40% de resistencia mágica y pisada que aturde a infantería)',
      branchADetails: {
        unitName: 'Qilin de la Fortuna (Fortune Qilin)',
        role: 'Coloso de Fortuna y Salto Místico',
        keyAbilities: ['Aura de Fortuna (+2 Suerte y +20% críticos a aliados)', 'Salto Sagrado'],
        statsBonus: '+4 Ataque, +3 Velocidad, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Qilin de Jade (Jade Qilin)',
        role: 'Baluarte Sagrado Anti-Magia',
        keyAbilities: ['Piel de Jade (40% resistencia mágica)', 'Pisada Sagrada (Aturdimiento 1 turno)'],
        statsBonus: '+2 Ataque, +6 Defensa, +35 Vida'
      }
    },
    effects: [
      'Recluta bestias celestiales místicas de Tier 6 con aura de bendición.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'El Qilin proporciona un aura que garantiza impactos críticos en casi todos los turnos del ejército.',
    timingRecommendation: 'Día 6.',
  },
  {
    id: 'grove-phoenix-pyre',
    name: 'Pira del Fénix (Phoenix Pyre)',
    nameEn: 'Phoenix Pyre',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 7,
    cost: { gold: 12500, wood: 10, ore: 10, crystal: 15 },
    dwellingUpgradeCost: { gold: 10000, crystal: 10 },
    prerequisites: ['Cumbre Celestial (Celestial Ridge)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Fénix Mítico (Mythic Phoenix)',
    unitRecruited: 'Fénix Mítico / Fénix Radiante / Fénix de Cenizas',
    unitUpgrades: {
      branchA: 'Fénix Radiante (Inmortalidad: Resucita de sus cenizas al 100% una vez por batalla y velocidad máxima)',
      branchB: 'Fénix de Cenizas (Llamarada abrasadora de área al morir y aliento de fuego primigenio)',
      branchADetails: {
        unitName: 'Fénix Radiante (Radiant Phoenix)',
        role: 'Coloso Aéreo con Renacimiento Infinito',
        keyAbilities: ['Renacimiento de Cenizas (Revive al morir con 100% de tropas)', 'Velocidad Absoluta (Iniciativa máxima)', 'Inmunidad al Fuego'],
        statsBonus: '+5 Ataque, +4 Velocidad, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Fénix de Cenizas (Ash Phoenix)',
        role: 'Destructor Aéreo de Fuego Primigenio',
        keyAbilities: ['Llamarada Póstuma (Daño masivo a todos los enemigos adyacentes al morir)', 'Aliento de Fuego Primigenio'],
        statsBonus: '+7 Ataque, +3 Velocidad, +25 Vida'
      }
    },
    effects: [
      'Recluta las criaturas legendarias de Tier 7 de la Arboleda: el Fénix Mítico de Jadame.',
      'Producción base: 1 unidad por semana (+1 con Castillo).'
    ],
    strategicTip: 'El Fénix garantiza la iniciativa en todos los combates, permitiendo que tu héroe lance el primer hechizo antes que el rival.',
    timingRecommendation: 'Semana 1 (Día 7) o Semana 2 (Día 1).',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (ARBOLEDA)
  // =========================================================================
  {
    id: 'grove-fountain-of-fortune',
    name: 'Fuente de la Fortuna (Fountain of Fortune)',
    nameEn: 'Fountain of Fortune',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, crystal: 2 },
    prerequisites: ['Cabañas de Faunos (Faun Huts)'],
    effects: [
      'Otorga +2 de Suerte permanente a todas las tropas de la Arboleda en la provincia.',
      'Aumenta la probabilidad de impactos críticos de suerte en un +20%.'
    ],
    strategicTip: 'Multiplica el daño explosivo de tus Grandes Elfos y Piras de Fuego.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-mystic-pond',
    name: 'Estanque Místico Silvano (Mystic Pond)',
    nameEn: 'Mystic Pond',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 2000, wood: 5, crystal: 3 },
    prerequisites: ['Choza del Bosque de Hongos (Shroomwood Shack)'],
    effects: [
      'Genera recursos aleatorios cada semana (de 1 a 4 unidades de recursos raros o 1.000 de oro extra).',
      'Aumenta la producción semanal de todas las moradas de Tier 1 a 4 en un +15%.'
    ],
    strategicTip: 'Aporte de recursos pasivo muy valioso para financiar las mejoras de criaturas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-faun-grove',
    name: 'Arboleda de los Faunos (Faun Meadow)',
    nameEn: 'Faun Meadow',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 2000, wood: 10 },
    prerequisites: ['Cabañas de Faunos (Faun Huts)'],
    effects: [
      'Aumenta el crecimiento semanal de Faunos y Sátiros (Tier 1) en +6 unidades.',
      'Otorga +1 a la Velocidad a los Faunos en combate en bosques y previene penalizaciones por terreno escabroso.'
    ],
    strategicTip: 'Convierte a los Faunos en la infantería ligera más prolífica para exploraciones tempranas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-menhir-sanctuary',
    name: 'Círculo de Menhires Místicos (Standing Stones)',
    nameEn: 'Standing Stones of the Wild',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 2500, ore: 10, crystal: 2 },
    prerequisites: ['Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    effects: [
      'Otorga +1 Poder Mágico permanente al primer héroe aliado que lo visite cada semana.',
      'Aumenta la eficacia de los hechizos de la escuela Primigenia (Primal Magic) en un +15% dentro del territorio del bosque.'
    ],
    strategicTip: 'Imprescindible para hechiceros y druidas de la Arboleda para disparar la potencia de sus invocaciones primigenias.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-phoenix-perch',
    name: 'Percha del Fénix (Phoenix Roost)',
    nameEn: 'Phoenix Roost',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 3000, wood: 10, crystal: 4 },
    prerequisites: ['Pira del Fénix (Phoenix Pyre)'],
    effects: [
      'Aumenta el crecimiento semanal de Fénix Míticos (Tier 7) en +1 unidad adicional por semana.',
      'Otorga +1 a la Iniciativa a todo el ejército de la Arboleda en batallas defensivas y de asedio.'
    ],
    strategicTip: 'Multiplica la presencia del Tier 7 más rápido del juego, asegurando siempre el primer turno.',
    timingRecommendation: 'Semana 2-3.',
  },
  {
    id: 'grove-nymph-spring',
    name: 'Manantial de las Ninfas (Nymph Spring)',
    nameEn: 'Nymph Spring',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 2000, wood: 5, crystal: 2 },
    prerequisites: ['Bosque Flotante de Lirios (Water Lily Grove)'],
    effects: [
      'Aumenta el crecimiento semanal de Ninfas Iriyads (Tier 3) en +4 unidades.',
      'Las Ninfas purifican automáticamente estados alterados negativos de los aliados colindantes al inicio de cada ronda de combate.'
    ],
    strategicTip: 'Contrarresta maldiciones de sombras y ralentizaciones enemigas sin gastar turnos de maná del héroe.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-spirit-of-the-wild',
    name: 'Madre Naturaleza (Mother Nature - Santo Grial)',
    nameEn: 'Mother Nature',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 5000, wood: 10, ore: 5, crystal: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Pira del Fénix (Phoenix Pyre)'],
    effects: [
      'Estructura Suprema del Grial de la Arboleda.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Otorga +1.000 Puntos de Movimiento a todos los héroes aliados en terreno boscoso y recarga completamente el maná en cada turno.'
    ],
    strategicTip: 'Dominio absoluto de la movilidad y del crecimiento de tropas tras descubrir el Grial.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];
