import { TownStructure } from '../../types';

export const GROVE_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (PALACIO DE LA ARBOLEDA) - MULTI-NIVEL
  // =========================================================================
  {
    id: 'grove-grove-palace',
    name: 'Palacio de la Arboleda / Claro Silvano (Grove Palace)',
    nameEn: 'Grove Palace',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 2500, wood: 5, ore: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Sede señorial de los reyes élficos y guardianes del bosque.',
      'Genera oro diario a partir de la armonía con la naturaleza.',
      'Se mejora a lo largo de 4 niveles cívicos (Claro Silvano -> Palacio de la Arboleda -> Ciudadela de los Robles -> Capitolio de la Naturaleza).'
    ],
    strategicTip: 'Mejora a Nivel II (Palacio de la Arboleda) en el Día 2 para acelerar el desarrollo hacia el Thunder Lair y Fénix.',
    timingRecommendation: 'Día 2-4 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Claro Silvano (Village Hall)',
        nameEn: 'Sylvan Glade',
        cost: { gold: 0 },
        prerequisites: [],
        effects: ['Estructura civil base predeterminada.', 'Genera +500 de Oro por día.', 'Permite construir 1 edificio por turno.'],
        bonusIncome: '+500 Oro / día',
        strategicTip: 'Asentamiento inicial básico.'
      },
      {
        level: 2,
        name: 'Nivel II: Palacio de la Arboleda (Town Hall)',
        nameEn: 'Grove Palace Town Hall',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Taberna (Tavern)'],
        effects: ['Aumenta los ingresos a +1.000 de Oro por día (+500 netos).', 'Desbloquea moradas intermedias de la naturaleza.'],
        bonusIncome: '+1.000 Oro / día',
        strategicTip: 'Construir el Día 2 o 3 para asegurar fondos.'
      },
      {
        level: 3,
        name: 'Nivel III: Ciudadela de los Robles (City Hall)',
        nameEn: 'Oak City Hall',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel de Ciudad 9', 'Palacio de la Arboleda', 'Mercado', 'Cofradía de Magos Nivel 1', 'Fortificaciones I (Fuerte)'],
        effects: ['Aumenta los ingresos a +2.000 de Oro por día (+1.000 netos).', 'Financia el reclutamiento de Herbomantes, Águilas del Trueno y Fénix.'],
        bonusIncome: '+2.000 Oro / día',
        strategicTip: 'Prioridad al inicio de la Semana 2.'
      },
      {
        level: 4,
        name: 'Nivel IV: Capitolio de la Naturaleza (Nature Capitol)',
        nameEn: 'Nature Capitol',
        cost: { gold: 10000, wood: 15, ore: 15 },
        prerequisites: ['Nivel de Ciudad 15', 'Ciudadela de los Robles', 'Fortificaciones III (Castillo)'],
        effects: ['Aumenta los ingresos a +4.000 de Oro por día (+2.000 netos).', 'Máxima potencia económica silvana. (Límite: 1 Capitolio por jugador).'],
        bonusIncome: '+4.000 Oro / día',
        strategicTip: 'Erigir en la capital durante la Semana 3.'
      }
    ]
  },

  // =========================================================================
  // FORTIFICACIONES (FUERTE / CIUDADELA MILITAR / CASTILLO) - MULTI-NIVEL
  // =========================================================================
  {
    id: 'grove-fortifications',
    name: 'Fortificaciones de la Arboleda (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Arboleda',
    cost: { gold: 1500, wood: 10, ore: 10 },
    prerequisites: [],
    effects: [
      'Murallas de madera de roble ancestral y zarzas espinosas con foso de agua cristalina.',
      'Habilita la construcción de todas las moradas de criaturas.',
      'Se mejora a Ciudadela Militar (+50% crecimiento de tropas y balista de madera) y Castillo (+100% crecimiento y 3 torres de arqueros silvanos).'
    ],
    strategicTip: 'Mejorar a Ciudadela en el Día 7 para obtener 50% más de tropas en el primer reset semanal.',
    timingRecommendation: 'Fuerte (Día 1) / Ciudadela (Día 7) / Castillo (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fuerte Silvano (Fort)',
        nameEn: 'Sylvan Fort',
        cost: { gold: 1500, wood: 10, ore: 10 },
        prerequisites: [],
        effects: ['Otorga murallas defensivas de madera y piedra.', 'Habilita el mapa de asedio con foso natural.', 'Requisito para construir todas las moradas de criaturas.'],
        defenseBonus: 'Murallas de Asedio + Foso básico',
        growthBonus: 'Habilita producción base de criaturas',
        strategicTip: 'Construir el Día 1 si no se inicia con él.'
      },
      {
        level: 2,
        name: 'Nivel II: Ciudadela Verde (Citadel)',
        nameEn: 'Green Citadel',
        cost: { gold: 3000, ore: 5 },
        prerequisites: ['Nivel I: Fuerte Silvano (Fort)'],
        effects: [
          'Añade una Torre Central de Balista con disparos de troncos perforantes cada ronda.',
          'Aumenta la producción semanal de todas las criaturas en un +50% adicional.'
        ],
        defenseBonus: 'Torre Central de Asedio con Balista Pesada',
        growthBonus: '+50% Crecimiento semanal de tropas',
        strategicTip: 'Construir el Día 7 de la Semana 1.'
      },
      {
        level: 3,
        name: 'Nivel III: Castillo Arbóreo (Castle)',
        nameEn: 'Arboreal Castle',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Ciudadela Verde (Citadel)', 'Nivel de Ciudad 12'],
        effects: [
          'Añade 2 Torres Laterales de Arqueros Silvanos suplementarias.',
          'Refuerza las murallas con raíces vivas regenerativas y zarzas venenosas en el foso.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '3 Torres Defensivas + Murallas de Raíces Vivas + Foso de Espinas',
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
    id: 'grove-menhir-circle',
    name: 'Círculo de Menhires (Menhir Circle)',
    nameEn: 'Menhir Circle',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 3,
    cost: { gold: 2000, wood: 5, ore: 5, crystal: 3 },
    dwellingUpgradeCost: { gold: 1500, crystal: 2 },
    prerequisites: ['Plantación de Lúpulo (Wood Hop Farm)'],
    unitRecruitedBase: 'Elfo Arquero (Wood Elf)',
    unitRecruited: 'Elfo Arquero / Gran Elfo Silvano',
    unitUpgrades: {
      branchA: 'Gran Elfo Tirador (Doble disparo a distancia sin penalización de rango)',
      branchB: 'Arquero Silvano Sombrío (Flechas envenenadas que reducen la velocidad del objetivo)',
      branchADetails: {
        unitName: 'Gran Elfo Tirador (Grand Elf Marksman)',
        role: 'Tirador de Máximo Alcance y Doble Disparo',
        keyAbilities: ['Doble Disparo por turno', 'Sin penalización por distancia en todo el mapa'],
        statsBonus: '+3 Ataque a Distancia, +2 Daño Máximo, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Arquero Silvano Sombrío (Shadowwood Hunter)',
        role: 'Tirador Tóxico y Ralentizador',
        keyAbilities: ['Flechas de Belladona (Veneno y -2 Velocidad al enemigo)', 'Camuflaje en Bosque'],
        statsBonus: '+2 Ataque, +2 Defensa, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los tiradores de élite de Tier 3 de la Arboleda.',
      'Producción base: 7 unidades por semana.'
    ],
    strategicTip: 'El Gran Elfo es el tirador más eficiente de principios de partida; arrasa con tropas lentas antes de que lleguen.',
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
    prerequisites: ['Círculo de Menhires (Menhir Circle)'],
    unitRecruitedBase: 'Aqualotl (Aqualotl)',
    unitRecruited: 'Aqualotl / Dríada Acuática',
    unitUpgrades: {
      branchA: 'Aqualotl Abisal (Regeneración masiva al estar en agua o lluvia y aura curativa)',
      branchB: 'Sirena Torrencial (Chorro de agua a distancia que empuja hacia atrás al objetivo)',
      branchADetails: {
        unitName: 'Aqualotl Abisal (Abyssal Aqualotl)',
        role: 'Anfibio Regenerativo y Protector',
        keyAbilities: ['Aura Hidrófila (Regenera 15% HP por turno)', 'Curación de Aliados Cercanos'],
        statsBonus: '+3 Defensa, +8 Vida'
      },
      branchBDetails: {
        unitName: 'Sirena Torrencial (Torrent Siren)',
        role: 'Hostigadora de Agua y Control de Posición',
        keyAbilities: ['Chorro Torrencial (Empuja 1 casilla al enemigo impactado)', 'Ataque de Agua'],
        statsBonus: '+3 Ataque a Distancia, +1 Velocidad'
      }
    },
    effects: [
      'Recluta unidades acuáticas de Tier 4 con alta versatilidad táctica.',
      'Producción base: 5 unidades por semana.'
    ],
    strategicTip: 'Excelente sinergia con hechizos de Agua y terrenos húmedos.',
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
    id: 'grove-thunder-lair',
    name: 'Guarida del Trueno (Thunder Lair)',
    nameEn: 'Thunder Lair',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 6,
    cost: { gold: 6500, wood: 5, ore: 5, crystal: 5 },
    dwellingUpgradeCost: { gold: 3500, crystal: 5 },
    prerequisites: ['Choza del Bosque de Hongos (Shroomwood Shack)'],
    unitRecruitedBase: 'Águila de Guerra (War Eagle)',
    unitRecruited: 'Águila de Guerra / Pájaro del Trueno',
    unitUpgrades: {
      branchA: 'Pájaro del Trueno (Ataque en picado con probabilidad de invocar relámpagos devastadores)',
      branchB: 'Águila Celestial de los Vientos (Velocidad extrema e inmunidad al daño de proyectiles aéreos)',
      branchADetails: {
        unitName: 'Pájaro del Trueno (Thunderbird)',
        role: 'Volador de Ataque Fulminante',
        keyAbilities: ['Golpe de Relámpago (40% prob. de invocar relámpago con 150% de daño)', 'Vuelo Rápido'],
        statsBonus: '+4 Ataque, +3 Velocidad, +25 Vida'
      },
      branchBDetails: {
        unitName: 'Águila de las Cumbres (Apex Storm Eagle)',
        role: 'Asaltante Aéreo Anti-Tiradores',
        keyAbilities: ['Esquivar Proyectiles (50% prob. de ignorar flechas)', 'Iniciativa Supremanatural'],
        statsBonus: '+2 Velocidad, +3 Iniciativa, +4 Defensa'
      }
    },
    effects: [
      'Recluta tropas voladoras gigantes de Tier 6 con movilidad imparable.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'Cruza el campo de batalla en el Turno 1 y anula a los arqueros enemigos antes de que disparen.',
    timingRecommendation: 'Día 6.',
  },
  {
    id: 'grove-pyre-of-fire',
    name: 'Pira de Fuego (Pyre of Fire)',
    nameEn: 'Pyre of Fire',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 7,
    cost: { gold: 12500, wood: 10, ore: 10, crystal: 15 },
    dwellingUpgradeCost: { gold: 10000, crystal: 10 },
    prerequisites: ['Guarida del Trueno (Thunder Lair)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Fénix (Phoenix)',
    unitRecruited: 'Fénix / Fénix Radiante',
    unitUpgrades: {
      branchA: 'Fénix Radiante (Inmortalidad: Resucita de sus cenizas al 100% una vez por batalla y velocidad máxima)',
      branchB: 'Dragón Esmeralda (Aliento de fuego y ácido que derrite 2 casillas con resistencia mágica extrema)',
      branchADetails: {
        unitName: 'Fénix Renacido (Reborn Phoenix)',
        role: 'Coloso Aéreo con Renacimiento Infinito',
        keyAbilities: ['Renacimiento de Cenizas (Revive al morir con 100% de tropas)', 'Velocidad Absoluta (Iniciativa máxima)', 'Inmunidad al Fuego'],
        statsBonus: '+5 Ataque, +4 Velocidad, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Dragón Esmeralda (Emerald Dragon)',
        role: 'Coloso de Aliento Ácido Devastador',
        keyAbilities: ['Aliento Corrosivo (Daña 2 casillas en línea y reduce armadura)', 'Inmunidad a Hechizos de Nivel 1 a 3'],
        statsBonus: '+7 Ataque, +6 Defensa, +50 Vida'
      }
    },
    effects: [
      'Recluta las criaturas legendarias de Tier 7 de la Arboleda.',
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
    id: 'grove-spirit-of-the-wild',
    name: 'Madre Naturaleza (Mother Nature - Santo Grial)',
    nameEn: 'Mother Nature',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 5000, wood: 10, ore: 5, crystal: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Pira de Fuego (Pyre of Fire)'],
    effects: [
      'Estructura Suprema del Grial de la Arboleda.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Otorga +1.000 Puntos de Movimiento a todos los héroes aliados en terreno boscoso y recarga completamente el maná en cada turno.'
    ],
    strategicTip: 'Dominio absoluto de la movilidad y del crecimiento de tropas tras descubrir el Grial.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];
