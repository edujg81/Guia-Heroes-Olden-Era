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
      'Estructura económica suprema de Olden Era (equivalente canónico al Capitolio).',
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
        strategicTip: 'Requisito para Choza de Madetahongo (Tier 5).'
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
    unitRecruited: 'Fauno / Sátiro / Fauno Corredor',
    unitUpgrades: {
      branchA: 'Sátiro (Música cautivadora que duerme o confunde a los atacantes)',
      branchB: 'Fauno Corredor (Velocidad sobresaliente y salto sobre obstáculos en bosque)',
      branchADetails: {
        unitName: 'Sátiro',
        nameEn: 'Satyr',
        role: 'Infantería Ligera de Encanto',
        keyAbilities: ['Flauta Encantada (Prob. de dormir a enemigo colindante)', 'Agilidad del Bosque'],
        statsBonus: '+2 Defensa, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Fauno Corredor',
        nameEn: 'Swift Faun',
        role: 'Asaltante Veloz',
        keyAbilities: ['Zancada de Bosque (Sin coste de terreno)', 'Ataque de Cuerno'],
        statsBonus: '+3 Ataque, +2 Velocidad'
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
    unitRecruitedBase: 'Hoplita (Hoplite)',
    unitRecruited: 'Hoplita / Falangista del Bosque / Hoplita Acorazado',
    unitUpgrades: {
      branchA: 'Falangista del Bosque (Formación de falange con bonus masivo de defensa en grupo)',
      branchB: 'Hoplita Acorazado (Escudo pesado y golpe de pica que empuja a los rivales)',
      branchADetails: {
        unitName: 'Falangista del Bosque',
        nameEn: 'Forest Phalangist',
        role: 'Infantería de Falange',
        keyAbilities: ['Muralla de Picas (+ Defensa por aliados adyacentes)', 'Parada de Carga'],
        statsBonus: '+4 Defensa, +5 Vida'
      },
      branchBDetails: {
        unitName: 'Hoplita Acorazado',
        nameEn: 'Armored Hoplite',
        role: 'Defensor de Choque',
        keyAbilities: ['Golpe de Escudo (Empuja 1 casilla)', 'Armadura Reforzada'],
        statsBonus: '+3 Ataque, +2 Defensa'
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
    unitRecruitedBase: 'Ninfa Iriyad (Iriyad Nymph)',
    unitRecruited: 'Ninfa Iriyad / Iriyad de Enredadera / Iriyad de Cristal',
    unitUpgrades: {
      branchA: 'Iriyad de Enredadera (Ataque a distancia con zarcillos que inmovilizan a la víctima)',
      branchB: 'Iriyad de Cristal (Proyectil prismático que refleja daño mágico hacia el atacante)',
      branchADetails: {
        unitName: 'Iriyad de Enredadera',
        nameEn: 'Vine Iriyad',
        role: 'Tiradora Inmovilizadora',
        keyAbilities: ['Raíces Atrapadoras (Inmoviliza 1 turno)', 'Afinidad Primigenia'],
        statsBonus: '+3 Ataque, +2 Defensa, +8 Vida'
      },
      branchBDetails: {
        unitName: 'Iriyad de Cristal',
        nameEn: 'Crystal Iriyad',
        role: 'Artillera Prismática',
        keyAbilities: ['Disparo Refractario', 'Resistencia Mágica (+25%)'],
        statsBonus: '+4 Ataque, +1 Iniciativa'
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
    unitRecruited: 'Aqualotl / Aqualotl de las Mareas / Aqualotl Místico',
    unitUpgrades: {
      branchA: 'Aqualotl de las Mareas (Ola de agua que empuja y ralentiza a las filas enemigas)',
      branchB: 'Aqualotl Místico (Regeneración anfibia pasiva y resistencia a la magia de agua y frío)',
      branchADetails: {
        unitName: 'Aqualotl de las Mareas',
        nameEn: 'Tide Aqualotl',
        role: 'Hostigador Acuático de Empuje',
        keyAbilities: ['Ola de Empuje', 'Movilidad de Agua (Sin coste en ciénagas/charcos)'],
        statsBonus: '+3 Ataque, +4 Defensa, +12 Vida'
      },
      branchBDetails: {
        unitName: 'Aqualotl Místico',
        nameEn: 'Mystic Aqualotl',
        role: 'Tanque Anfibio Regenerativo',
        keyAbilities: ['Regeneración Acuática (+15 HP/turno)', 'Inmunidad a Ralentización'],
        statsBonus: '+4 Ataque, +1 Iniciativa'
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
    name: 'Choza de Madetahongo (Shroomwood Shack)',
    nameEn: 'Shroomwood Shack',
    category: 'Moradas de Criaturas',
    faction: 'Arboleda',
    tier: 5,
    dwellingTier: 5,
    cost: { gold: 3500, wood: 10, crystal: 4 },
    dwellingUpgradeCost: { gold: 3000, wood: 5, crystal: 3 },
    prerequisites: ['Estanque Floreciente (Blooming Pond)', 'Gremio de Magos (Mage Guild)'],
    unitRecruitedBase: 'Herbomante (Herbomancer)',
    unitRecruited: 'Herbomante / Maestro de Hongos / Guardián del Micelio',
    unitUpgrades: {
      branchA: 'Maestro de Hongos (Esporas venenosas que debilitan el daño y armadura enemiga)',
      branchB: 'Guardián del Micelio (Red micelial que cura a todos los aliados colindantes y levanta brotes defensivos)',
      branchADetails: {
        unitName: 'Maestro de Hongos',
        nameEn: 'Fungal Master',
        role: 'Invocador de Esporas Venenosas',
        keyAbilities: ['Nube de Esporas Tóxicas', 'Debilitamiento Fúngico'],
        statsBonus: '+4 Ataque, +3 Defensa, +15 Vida'
      },
      branchBDetails: {
        unitName: 'Guardián del Micelio',
        nameEn: 'Mycelium Guardian',
        role: 'Sanador y Baluarte Botánico',
        keyAbilities: ['Sanación Micelial de Área', 'Brotes Protectores'],
        statsBonus: '+5 Defensa, +20 Vida'
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
    prerequisites: ['Choza de Madetahongo (Shroomwood Shack)'],
    unitRecruitedBase: 'Qilin',
    unitRecruited: 'Qilin / Qilin de la Tormenta / Qilin Celestial',
    unitUpgrades: {
      branchA: 'Qilin de la Tormenta (Aura eléctrica de relámpagos que electrocuta a enemigos cercanos al atacar)',
      branchB: 'Qilin Celestial (Aura de pureza cósmica que confiere suerte máxima y velocidad celestial)',
      branchADetails: {
        unitName: 'Qilin de la Tormenta',
        nameEn: 'Storm Qilin',
        role: 'Bestia Eléctrica de Choque',
        keyAbilities: ['Paso de Trueno (Daña a objetivos al cruzar)', 'Descarga Eléctrica'],
        statsBonus: '+6 Ataque, +4 Defensa, +30 Vida'
      },
      branchBDetails: {
        unitName: 'Qilin Celestial',
        nameEn: 'Celestial Qilin',
        role: 'Heraldo de la Fortuna Primigenia',
        keyAbilities: ['Aura de Suerte Celestial (+1 a todo el ejército)', 'Carga Ligera'],
        statsBonus: '+7 Ataque, +3 Iniciativa, +2 Velocidad'
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
    unitRecruited: 'Fénix / Fénix Mítico / Fénix Primigenio',
    unitUpgrades: {
      branchA: 'Fénix Mítico (Iniciativa suprema, aliento de fuego atravesador y renacimiento de cenizas)',
      branchB: 'Fénix Primigenio (Explosión de fuego solar al morir que calcina a todos los enemigos circundantes)',
      branchADetails: {
        unitName: 'Fénix Mítico',
        nameEn: 'Mythic Phoenix',
        role: 'Coloso Aéreo de Máxima Iniciativa y Renacimiento',
        keyAbilities: ['Iniciativa Extrema (Turno 1 garantizado)', 'Renacer de las Cenizas', 'Aliento de Fuego'],
        statsBonus: '+10 Ataque, +8 Defensa, +90 Vida'
      },
      branchBDetails: {
        unitName: 'Fénix Primigenio',
        nameEn: 'Primal Phoenix',
        role: 'Bomba Voladora de Fuego Solar',
        keyAbilities: ['Nova de Incineración Mortal', 'Alas de Fuego Solar'],
        statsBonus: '+12 Ataque, +3 Iniciativa, +80 Vida'
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
