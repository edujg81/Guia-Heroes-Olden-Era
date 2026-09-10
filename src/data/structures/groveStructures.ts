import { TownStructure } from '../../types';

export const GROVE_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO (AYUNTAMIENTO / ALCALDÍA CANÓNICA - 3 NIVELES)
  // =========================================================================
  {
    id: 'grove-grove-palace',
    name: 'Palacio de la Arboleda (Ayuntamiento / Alcaldía - Niveles I, II y III)',
    nameEn: 'Grove Palace (Town Hall / City Hall - Levels I, II & III)',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 2500 },
    prerequisites: [],
    effects: [
      'Sede señorial de los guardianes del bosque y druidas de la Arboleda estructurada en 3 niveles de desarrollo.',
      'Otorga Oro, Puntos de Ley y Puntos de Astrología diarios incrementales, expandiendo la administración de la ciudad y el límite de héroes activos.',
      'Al ascender a Nivel II permite elegir una mejora económica especializada (+1.000 Oro, +1.000 Ley o +1.000 Astrología), y el Nivel III (Grove Palace III) consolida la gran metrópolis silvana.'
    ],
    strategicTip: 'Mejora a Nivel II en el Día 2 para acelerar el desarrollo hacia la Guarida del Trueno (Qilins) y corona con Grove Palace III en Semana 2 para sostener los Fénix.',
    timingRecommendation: 'Día 1 (Nivel I) / Día 2-3 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Asentamiento Silvano (Town Hall)',
        nameEn: 'Sylvan Settlement (Town Hall)',
        cost: { gold: 2500 },
        prerequisites: [],
        effects: [
          'Genera 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite la administración de la ciudad boscosa.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día',
        strategicTip: 'Base cívica inicial de la Arboleda.'
      },
      {
        level: 2,
        name: 'Nivel II: Palacio de la Arboleda II (City Hall)',
        nameEn: 'Grove Palace II (City Hall)',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Mercado (Marketplace)'],
        effects: [
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios.',
          'Permite al propietario elegir una de las 3 mejoras económicas de Nivel 2 (+1.000 Oro/día, +1.000 Puntos de Ley/día, o +1.000 Puntos de Astrología/día).'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día (+ mejora a elección)',
        strategicTip: 'Construir el Día 2 o 3 para estabilizar las finanzas forestales.'
      },
      {
        level: 3,
        name: 'Nivel III: Palacio de la Arboleda III (Metropolis)',
        nameEn: 'Grove Palace III (Metropolis)',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Palacio de la Arboleda II (City Hall)'],
        effects: [
          'Cúspide de la armonía civil y mágica de la Arboleda en Olden Era.',
          'Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios adicionales para el reino.',
          'Consolida la soberanía del bosque y garantiza el flujo económico para las criaturas míticas de Jadame.'
        ],
        bonusIncome: '+1.000 Oro, Puntos de Ley, Puntos de Astrología / día adicionales',
        strategicTip: 'Edificar en Semana 2 para asegurar el continuo reclutamiento de Fénix y Qilins.'
      }
    ]
  },

  // =========================================================================
  // BANCO Y TESORERÍA (ECONOMÍA SUPREMA DE OLDEN ERA)
  // =========================================================================
  {
    id: 'grove-bank',
    name: 'Banco (Bank)',
    nameEn: 'Bank',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)', 'Palacio de la Arboleda (Ayuntamiento / Alcaldía)'],
    effects: [
      'Entidad de ahorro y custodia de las arcas de la Arboleda.',
      'Genera +500 de Oro diario adicional y es prerrequisito indispensable para edificar la Tesorería.'
    ],
    strategicTip: 'Construir para abrir paso a la Tesorería y duplicar los ingresos pasivos.',
    timingRecommendation: 'Semana 1 (Día 5-6).',
  },
  {
    id: 'grove-treasury',
    name: 'Tesorería (Treasury)',
    nameEn: 'Treasury',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 5000, wood: 10, ore: 10 },
    prerequisites: ['Banco (Bank)', 'Mercado (Marketplace)', 'Fortificaciones (Fortifications)'],
    effects: [
      'Estructura económica suprema de Olden Era (Tesorería / Bonificación Financiera de +2.000 Oro/día).',
      'Genera +2.000 de Oro diario adicional de forma permanente para el reino.',
      'Requiere haber consolidado el Banco, el Mercado y las Fortificaciones.'
    ],
    strategicTip: 'Asegura el oro necesario para reclutar Qilins y Fénix sin ahogar la economía.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // FORTIFICACIONES (NIVELES I, II Y III)
  // =========================================================================
  {
    id: 'grove-fortifications',
    name: 'Fortificaciones (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Arboleda',
    cost: { gold: 2500, ore: 5 },
    prerequisites: [],
    effects: [
      'Proporciona murallas protectoras vivientes durante los asedios.',
      'Permite elegir mejoras defensivas de enredaderas y almenas arbóreas.',
      'Al ascender a Niveles II y III duplica la producción de tropas (+50% y +100%).'
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
        defenseBonus: 'Muralla perimetral de roble y piedra',
        strategicTip: 'Defensa base de la ciudadela silvana.'
      },
      {
        level: 2,
        name: 'Nivel II: Fortificaciones II (Citadel)',
        nameEn: 'Fortifications II',
        cost: { gold: 2500, ore: 10 },
        prerequisites: ['Nivel I: Fortificaciones (Fortifications)'],
        effects: [
          'Añade dos torres a las almenas que disparan automáticamente a los atacantes durante los asedios.',
          'Aumenta la producción semanal de todas las criaturas de la Arboleda en un +50%.'
        ],
        defenseBonus: '2 Torres de proyectiles de zarzas',
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
        defenseBonus: 'Torre Central del Gran Roble + foso de espinas',
        growthBonus: '+100% Crecimiento semanal de criaturas (duplica producción)',
        strategicTip: 'Esencial para duplicar la producción de Herbomantes, Qilins y Fénix.'
      }
    ]
  },

  // =========================================================================
  // GREMIO DE MAGOS (MAGE GUILD I A V) & CONEXIÓN AL OBSERVATORIO MÁGICO
  // =========================================================================
  {
    id: 'grove-mage-guild',
    name: 'Gremio de Magos (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Arboleda',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Círculo druídico interconectado con la red del Observatorio Mágico (Celestial Observatory).',
      'Desbloquea hechizos de Tiers 1 a 5 en el Observatorio Mágico del reino, con máxima afinidad hacia la Magia Primigenia (Primal Magic).',
      'Cualquier héroe que visite la ciudad aprende todos los hechizos desbloqueados y recarga su maná al 100%.'
    ],
    strategicTip: 'Acceso prioritario a encantamientos de regeneración, enredo de raíces y relámpagos primigenios.',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6) / Niveles 3-5 (Semanas 2-4).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Gremio de Magos Nivel 1',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Desbloquea hechizos de Nivel 1 en el Observatorio Mágico.', 'Otorga Libro de Hechizos y recarga maná al 100%.'],
        strategicTip: 'Requisito para Choza de Maderahongo (Tier 5).'
      },
      {
        level: 2,
        name: 'Gremio de Magos Nivel 2',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 4 },
        prerequisites: ['Gremio de Magos Nivel 1'],
        effects: ['Desbloquea hechizos de Nivel 2 en el Observatorio Mágico.'],
        strategicTip: 'Acceso a enredo masivo y piel de corteza.'
      },
      {
        level: 3,
        name: 'Gremio de Magos Nivel 3',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 6 },
        prerequisites: ['Gremio de Magos Nivel 2'],
        effects: ['Desbloquea hechizos de Nivel 3 de las escuelas canónicas en el Observatorio Mágico.'],
        strategicTip: 'Invocaciones de bestias y tormentas eléctricas primigenias.'
      },
      {
        level: 4,
        name: 'Gremio de Magos Nivel 4',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 8 },
        prerequisites: ['Gremio de Magos Nivel 3'],
        effects: ['Desbloquea hechizos mayores de Nivel 4 en el Observatorio Mágico.'],
        strategicTip: 'Terremotos y marejadas primordiales que barren ejércitos.'
      },
      {
        level: 5,
        name: 'Gremio de Magos Nivel 5',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, crystal: 10 },
        prerequisites: ['Gremio de Magos Nivel 4'],
        effects: ['Desbloquea hechizos supremos de Nivel 5 de Magia Primigenia.'],
        strategicTip: 'Cataclismos de la naturaleza que cambian el curso de cualquier guerra.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS, COMERCIO Y DEPÓSITOS
  // =========================================================================
  {
    id: 'grove-tavern',
    name: 'Taberna (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de la guarnición en +1.',
      'Permite reclutar héroes adicionales (Guardianes y Druidas) para acelerar la exploración del bosque.',
      'Permite escuchar rumores de taberna e informes de inteligencia.'
    ],
    strategicTip: 'Construir el Día 1 para reclutar un segundo héroe que asegure aserraderos y minas tempranas.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'grove-marketplace',
    name: 'Mercado (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 500, wood: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Permite intercambiar recursos y oro en el mercado de la Arboleda.',
      'Las tasas de intercambio mejoran conforme el jugador controla más Mercados en su reino.',
      'Permite canjear madera excedente por Cristales o Mineral.'
    ],
    strategicTip: 'Construir en Semana 1 para financiar las moradas de Qilins y Fénix.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'grove-artifact-merchant',
    name: 'Comerciante de Artefactos (Artifact Merchant)',
    nameEn: 'Artifact Merchant',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: ['Mercado (Marketplace)'],
    effects: [
      'Establece una tienda permanente de talismanes y artefactos arcanos en la ciudad.',
      'Permite comprar y vender artefactos de distintos tiers para equipar a los héroes de la Arboleda.'
    ],
    strategicTip: 'Permite adquirir reliquias que potencian el Poder Mágico Primigenio o la velocidad en mapa.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-resource-silo',
    name: 'Silo de Recursos (Resource Silo)',
    nameEn: 'Resource Silo',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 0, gems: 3, mercury: 3 },
    prerequisites: ['Mercado (Marketplace)', 'Banco (Bank)'],
    effects: [
      'Genera +1 Cristal diario de forma pasiva (recurso raro principal de la Arboleda).',
      'Asegura el suministro continuo de cristales para la Pira del Fénix y el Gremio de Magos.'
    ],
    strategicTip: 'Requiere Mercado y Banco. Construir en cuanto se tengan 3 de cada recurso raro secundario para asegurar cristales continuos.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-alchemical-silo',
    name: 'Silo Alquímico (Alchemic Silo)',
    nameEn: 'Alchemic Silo',
    category: 'Cívica y Economía',
    faction: 'Arboleda',
    cost: { gold: 2000, ore: 5, crystal: 2 },
    prerequisites: ['Silo de Recursos (Resource Silo)'],
    effects: [
      'Produce Polvo Alquímico (Alchemical Dust) diariamente.',
      'El Polvo Alquímico es el recurso canónico esencial de Olden Era necesario para ascender moradas a niveles magistrales y potenciar hechizos en el Observatorio Mágico.'
    ],
    strategicTip: 'Requiere el Silo de Recursos. Crucial para desbloquear las mejoras maestras de Herbomantes y Qilins.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CANÓNICAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'grove-faun-huts',
    name: 'Cabañas de Faunos (Faun Huts)',
    nameEn: 'Faun Huts',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 1,
    dwellingTier: 1,
    cost: { gold: 500, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Fortificaciones (Fortifications)'],
    unitRecruitedBase: 'Fauno (Faun)',
    unitRecruited: 'Fauno / Arquero Fauno / Guerrero Fauno',
    unitUpgrades: {
      branchA: 'Arquero Fauno (Disparo a distancia con proyectiles impregnados de savia)',
      branchB: 'Guerrero Fauno (Embestida caprina de choque y cimitarras gemelas)',
      branchADetails: {
        unitName: 'Arquero Fauno',
        nameEn: 'Faun Archer',
        role: 'Tirador Ligero de Espinas',
        keyAbilities: ['Tirador', 'Disparo de Espinas', 'Paso Ligero'],
        statsBonus: '+2 Ataque, +1 Defensa, +2 Vida'
      },
      branchBDetails: {
        unitName: 'Guerrero Fauno',
        nameEn: 'Faun Warrior',
        role: 'Asaltante de Choque',
        keyAbilities: ['Embestida (+20% daño si recorre >3 hexágonos)', 'Contraataque Feroz'],
        statsBonus: '+3 Ataque, +2 Defensa, +5 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta las tropas ligeras de Tier 1 de la Arboleda.',
      'Producción base: 14 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Tropas rápidas ideales para acosar y reclamar puntos de control en los turnos iniciales.',
    timingRecommendation: 'Día 1-2.',
  },
  {
    id: 'grove-hop-patch',
    name: 'Semillero de Lúpulo (Hop Patch)',
    nameEn: 'Hop Patch',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 2,
    dwellingTier: 2,
    cost: { gold: 1000, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Cabañas de Faunos (Faun Huts)'],
    unitRecruitedBase: 'Hoplita (Hoplet)',
    unitRecruited: 'Hoplita / Hoplita del Alba / Hoplita del Ocaso',
    unitUpgrades: {
      branchA: 'Hoplita del Alba (Escudo radiante con reducción del 35% de daño de proyectiles)',
      branchB: 'Hoplita del Ocaso (Lanza envenenada con daño residual y doble contragolpe)',
      branchADetails: {
        unitName: 'Hoplita del Alba',
        nameEn: 'Dawn Hoplet',
        role: 'Infantería de Falange Radiante',
        keyAbilities: ['Resistencia a Proyectiles 35%', 'Falange Mejorada', 'Aura de Esperanza'],
        statsBonus: '+2 Ataque, +3 Defensa, +6 Vida'
      },
      branchBDetails: {
        unitName: 'Hoplita del Ocaso',
        nameEn: 'Dusk Hoplet',
        role: 'Infantería Venenosa de Contragolpe',
        keyAbilities: ['Veneno de Ocaso', 'Doble Contragolpe', 'Penetración de Armadura'],
        statsBonus: '+4 Ataque, +1 Defensa, +4 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta la infantería acorazada de falange de Tier 2.',
      'Producción base: 9 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La falange de hoplitas es el ancla defensiva de la Arboleda para proteger a los tiradores e Iriyads.',
    timingRecommendation: 'Día 2-3.',
  },
  {
    id: 'grove-menhir-circle',
    name: 'Círculo de Menhires (Menhir Circle)',
    nameEn: 'Menhir Circle',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 3,
    dwellingTier: 3,
    cost: { gold: 1500, ore: 5 },
    dwellingUpgradeCost: { gold: 1500, ore: 5, crystal: 2 },
    prerequisites: ['Semillero de Lúpulo (Hop Patch)'],
    unitRecruitedBase: 'Iriyad de Enredadera (Vine Iriyad)',
    unitRecruited: 'Iriyad de Enredadera / Iriyad Fúngica / Iriyad de Cristal',
    unitUpgrades: {
      branchA: 'Iriyad Fúngica (Esporas debilitadoras que reducen ataque y velocidad)',
      branchB: 'Iriyad de Cristal (Esquirlas prismáticas perforantes que ignoran 30% de armadura)',
      branchADetails: {
        unitName: 'Iriyad Fúngica',
        nameEn: 'Fungal Iriyad',
        role: 'Hostigadora de Esporas y Debilitamiento',
        keyAbilities: ['Esporas Debilitadoras (-3 Ataque y Velocidad)', 'Enraizamiento 50%', 'Regeneración Fúngica'],
        statsBonus: '+2 Ataque, +2 Defensa, +6 Vida'
      },
      branchBDetails: {
        unitName: 'Iriyad de Cristal',
        nameEn: 'Crystal Iriyad',
        role: 'Hostigadora Perforante de Cristal',
        keyAbilities: ['Perforación de Armadura 30%', 'Resistencia Mágica 25%', 'Velocidad 8'],
        statsBonus: '+4 Ataque, +1 Defensa, +4 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta las ninfas místicas de Tier 3 de la Arboleda.',
      'Producción base: 6 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Inmovilizar con enredaderas a la caballería o tropas de carga enemigas desbarata su plan ofensivo.',
    timingRecommendation: 'Día 3-4.',
  },
  {
    id: 'grove-blooming-pond',
    name: 'Estanque Floreciente (Blooming Pond)',
    nameEn: 'Blooming Pond',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 4,
    dwellingTier: 4,
    cost: { gold: 2500, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 2000, wood: 5, crystal: 2 },
    prerequisites: ['Círculo de Menhires (Menhir Circle)'],
    unitRecruitedBase: 'Aqualotl',
    unitRecruited: 'Aqualotl / Aqualotl Polar / Aqualotl Abisal',
    unitUpgrades: {
      branchA: 'Aqualotl Polar (Aliento glacial que congela y ralentiza a los enemigos a la mitad de velocidad)',
      branchB: 'Aqualotl Abisal (Mordisco corrosivo que destruye el 40% de la armadura enemiga)',
      branchADetails: {
        unitName: 'Aqualotl Polar',
        nameEn: 'Polar Aqualotl',
        role: 'Controlador Gélido Anfibio',
        keyAbilities: ['Aliento Glacial (Ralentiza 50%)', 'Inmunidad a Agua/Frío', 'Armadura Escarchada'],
        statsBonus: '+2 Ataque, +2 Defensa, +10 Vida'
      },
      branchBDetails: {
        unitName: 'Aqualotl Abisal',
        nameEn: 'Abyssal Aqualotl',
        role: 'Destructor de Armaduras Anfibio',
        keyAbilities: ['Mordisco Corrosivo (-40% Defensa)', 'Velocidad 8', 'Sin coste en lodo/agua'],
        statsBonus: '+4 Ataque, +6 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta los anfibios de combate de Tier 4.',
      'Producción base: 4 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Excelente combinación de aguante y capacidad de control territorial mediante empuje.',
    timingRecommendation: 'Día 4-5.',
  },
  {
    id: 'grove-shroomwood-shack',
    name: 'Choza de Maderahongo (Shroomwood Shack)',
    nameEn: 'Shroomwood Shack',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, wood: 10, crystal: 4 },
    dwellingUpgradeCost: { gold: 3000, wood: 5, crystal: 3 },
    prerequisites: ['Estanque Floreciente (Blooming Pond)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Herbomante (Herbomancer)',
    unitRecruited: 'Herbomante / Esporomante / Murmuramante',
    unitUpgrades: {
      branchA: 'Esporomante (Disparo a distancia de área 3x3 con esporas cegadoras)',
      branchB: 'Murmuramante (Aura de regeneración continua y +25% resistencia mágica a aliados)',
      branchADetails: {
        unitName: 'Esporomante',
        nameEn: 'Sporemancer',
        role: 'Tirador Mágico de Área',
        keyAbilities: ['Tirador de Área 3x3', 'Esporas Cegadoras', 'Canalización Arcana'],
        statsBonus: '+3 Ataque, +2 Defensa, +13 Vida'
      },
      branchBDetails: {
        unitName: 'Murmuramante',
        nameEn: 'Murmurmancer',
        role: 'Soporte y Sanador Botánico',
        keyAbilities: ['Aura de Regeneración', 'Resistencia Mágica 25%', 'Tirador Mágico'],
        statsBonus: '+2 Ataque, +4 Defensa, +10 Vida, +1 Velocidad'
      }
    },
    effects: [
      'Recluta los botánicos y druidas miceliales de Tier 5.',
      'Producción base: 3 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'La red micelial permite sostener una línea defensiva casi inquebrantable curando a los Hoplitas cada ronda.',
    timingRecommendation: 'Día 6 o inicio de Semana 2.',
  },
  {
    id: 'grove-thunder-lair',
    name: 'Guarida del Trueno (Thunder Lair)',
    nameEn: 'Thunder Lair',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 6,
    dwellingTier: 6,
    cost: { gold: 5000, wood: 10, crystal: 6 },
    dwellingUpgradeCost: { gold: 4000, wood: 5, crystal: 4 },
    prerequisites: ['Choza de Maderahongo (Shroomwood Shack)'],
    unitRecruitedBase: 'Qilin',
    unitRecruited: 'Qilin / Qilin de la Niebla / Qilin del Trueno',
    unitUpgrades: {
      branchA: 'Qilin de la Niebla (Manto de brumas con 40% de evasión de proyectiles a aliados adyacentes)',
      branchB: 'Qilin del Trueno (Descarga eléctrica en cadena que electrocuta a 2 enemigos contiguos)',
      branchADetails: {
        unitName: 'Qilin de la Niebla',
        nameEn: 'Mist Qilin',
        role: 'Bestia Mística de Cobertura y Niebla',
        keyAbilities: ['Manto de Brumas 40%', 'Paso Etéreo', 'Sin contragolpe en primer ataque'],
        statsBonus: '+2 Ataque, +3 Defensa, +30 Vida, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Qilin del Trueno',
        nameEn: 'Thunder Qilin',
        role: 'Bestia Eléctrica de Choque en Cadena',
        keyAbilities: ['Ataque en Cadena Eléctrico', 'Aturdimiento 25%', 'Velocidad 10'],
        statsBonus: '+4 Ataque, +2 Defensa, +25 Vida, +1 Velocidad, +2 Iniciativa'
      }
    },
    effects: [
      'Recluta las bestias míticas de Tier 6 de la Arboleda.',
      'Producción base: 2 unidades por semana (+50% con Fortificaciones II, +100% con Fortificaciones III).'
    ],
    strategicTip: 'Iniciativa altísima que permite iniciar hostilidades antes que las tropas pesadas rivales.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'grove-pyre',
    name: 'Pira (Pyre)',
    nameEn: 'Pyre',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 7,
    dwellingTier: 7,
    cost: { gold: 10000, wood: 15, crystal: 10 },
    dwellingUpgradeCost: { gold: 8000, wood: 10, crystal: 8 },
    prerequisites: ['Guarida del Trueno (Thunder Lair)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Fénix (Phoenix)',
    unitRecruited: 'Fénix / Fénix de Energía / Fénix Solar',
    unitUpgrades: {
      branchA: 'Fénix de Energía (Velocidad 15, renacimiento al 50% y daño de éter)',
      branchB: 'Fénix Solar (Aura curativa solar que regenera aliados un 20% del daño infligido)',
      branchADetails: {
        unitName: 'Fénix de Energía',
        nameEn: 'Energy Phoenix',
        role: 'Coloso Aéreo de Máxima Iniciativa y Éter',
        keyAbilities: ['Vuelo Supremo (Velocidad 15)', 'Renacimiento 50%', 'Explosión de Éter'],
        statsBonus: '+5 Ataque, +4 Defensa, +60 Vida, +2 Iniciativa, +1 Velocidad'
      },
      branchBDetails: {
        unitName: 'Fénix Solar',
        nameEn: 'Dawn Phoenix',
        role: 'Coloso Aéreo Sagrado de Curación en Área',
        keyAbilities: ['Vuelo', 'Aura Curativa Solar (20% daño infligido)', 'Renacimiento 40%'],
        statsBonus: '+3 Ataque, +7 Defensa, +80 Vida, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta los Fénix legendarios de Tier 7 de la Arboleda.',
      'Producción base: 1 unidad por semana (+1 con Fortificaciones III).'
    ],
    strategicTip: 'La criatura más rápida del juego: asegura el primer turno para lanzar hechizos decisivos antes de que el rival pueda actuar.',
    timingRecommendation: 'Final de Semana 1 o inicio de Semana 2.',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (ARBOLEDA) CONFIRMADAS DE OLDEN ERA
  // =========================================================================
  {
    id: 'grove-grail-sanctuary',
    name: 'Santuario de la Arboleda (Grove Grail Sanctuary)',
    nameEn: 'Grove Grail Sanctuary',
    category: 'Estructuras Especiales de Facción',
    faction: 'Arboleda',
    isFactionUnique: true,
    cost: { gold: 0 },
    prerequisites: ['Descubrimiento del Santo Grial (Mirage)'],
    effects: [
      'Estructura suprema del Santo Grial para la Arboleda (construida portando el Grial arrebatado al Espejismo en el mapa).',
      'Genera +5.000 de Oro diario adicional para el reino.',
      'Aumenta el crecimiento semanal de todas las criaturas de la Arboleda en la ciudad en un +100% adicional.'
    ],
    strategicTip: 'Multiplica la producción de Fénix y Qilins hasta dominar el continente.',
    timingRecommendation: 'Al derrotar el Espejismo (Mirage).',
  },
];
