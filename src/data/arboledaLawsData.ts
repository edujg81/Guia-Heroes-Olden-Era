import { FactionLaw, FactionLawPreset } from '../types';

export const ARBOLEDA_LAW_PRESETS: FactionLawPreset[] = [
  {
    id: 'preset-arboleda-rush-dragons',
    name: 'Rush a Tier 7: Dragones & Vínculo Silvano',
    archetype: 'Competitivo / Meta Rush',
    description: 'Enfoque optimizado para acelerar la extracción de Madera, Gemas y Cristales para asegurar el Acantilado de Dragones en el Día 14.',
    totalCost: 50,
    steps: [
      { stepNumber: 1, lawId: 'law-arboleda-t1-elven-woodcraft', level: 1, dayWindow: 'Día 1-3', notes: '+2 Madera diaria y reducción del coste de construcción de viviendas.' },
      { stepNumber: 2, lawId: 'law-arboleda-t1-precision-archery', level: 1, dayWindow: 'Día 4-6', notes: '+15% Daño de los Cazadores Elfos para acelerar la limpieza del mapa.' },
      { stepNumber: 3, lawId: 'law-arboleda-t2-forest-stride', level: 1, dayWindow: 'Día 7-9', notes: 'Movimiento libre sin penalización a través de bosques densos.' },
      { stepNumber: 4, lawId: 'law-arboleda-t2-ancient-wisdom', level: 1, dayWindow: 'Día 10-12', notes: 'Incrementa la tasa de obtención de Cristales y Gemas en minas y tesoros.' },
      { stepNumber: 5, lawId: 'law-arboleda-t3-emerald-majesty', level: 1, dayWindow: 'Día 13-14', notes: 'Reduce los costes de los Dragones Verdes y otorga iniciativa extra.' },
    ],
  },
  {
    id: 'preset-arboleda-double-archery',
    name: 'Supremacía de Cazadores & Control de Terreno',
    archetype: 'DPS a Distancia & Desgaste',
    description: 'Especialización centrada en maximizar el rendimiento de Cazadores y Druidas con munición infinita y reducción de daño.',
    totalCost: 48,
    steps: [
      { stepNumber: 1, lawId: 'law-arboleda-t1-precision-archery', level: 2, dayWindow: 'Semana 1', notes: 'Daño crítico aumentado para tropas de proyectiles.' },
      { stepNumber: 2, lawId: 'law-arboleda-t2-entangling-roots', level: 1, dayWindow: 'Semana 2', notes: 'Aumenta la duración del Enraizamiento de los Treants.' },
      { stepNumber: 3, lawId: 'law-arboleda-t3-canopy-blessing', level: 1, dayWindow: 'Semana 3', notes: 'Aura de regeneración para unidades silvanas en combate.' },
    ],
  },
];

export const ARBOLEDA_FACTION_LAWS: FactionLaw[] = [
  // =======================================================================
  // TIER 1 (0 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-arboleda-t1-elven-woodcraft',
    priorityOrder: 1,
    tier: 1,
    tierMinPoints: 0,
    name: 'Artesanía del Bosque (Elven Woodcraft)',
    nameEn: 'Elven Woodcraft',
    category: 'Economía',
    branch: 'Ciudad',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Genera +2 de Madera adicional al día y reduce el coste de madera de todos los edificios en un 15%.',
        tacticalImpact: 'Vital en Días 1-3 para erigir la Cabaña de Cazadores y el Nido de Pegasos sin agotar reservas.',
        recommendedUnlockTime: 'Día 1-2 (Semana 1)',
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 5,
        effect: 'Genera +4 de Madera al día y reduce el coste de madera de todos los edificios en un 25%.',
        tacticalImpact: 'Asegura la madera necesaria para la Arboleda de Treants y el Castillo.',
        recommendedUnlockTime: 'Día 4-5 (Semana 1)',
      },
    ],
  },
  {
    id: 'law-arboleda-t1-precision-archery',
    priorityOrder: 2,
    tier: 1,
    tierMinPoints: 0,
    name: 'Puntería Silvana de Élite',
    nameEn: 'Sylvan Precision',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 2,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Los Cazadores Elfos y Hadas infligen un +15% de daño adicional y ganan +1 de Iniciativa.',
        tacticalImpact: 'Permite a los Cazadores eliminar unidades neutrales de un solo disparo desde el Turno 1.',
        recommendedUnlockTime: 'Día 3-4 (Semana 1)',
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 5,
        effect: 'Los Cazadores Elfos ignoran penalizaciones de distancia y obstáculos de cobertura en un 50%.',
        tacticalImpact: 'Impacto total en asedios y mapas cerrados.',
        recommendedUnlockTime: 'Día 6-7 (Semana 1)',
      },
    ],
  },

  // =======================================================================
  // TIER 2 (5 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-arboleda-t2-forest-stride',
    priorityOrder: 3,
    tier: 2,
    tierMinPoints: 5,
    name: 'Senda de los Espíritus del Bosque',
    nameEn: 'Forest Stride',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 3,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Todos los héroes y unidades de Arboleda se mueven sin penalización de terreno en bosque y ganan +200 de movimiento diario en el mapa.',
        tacticalImpact: 'Multiplica la velocidad de exploración y captura de minas.',
        recommendedUnlockTime: 'Día 8-9 (Semana 2)',
      },
    ],
  },
  {
    id: 'law-arboleda-t2-ancient-wisdom',
    priorityOrder: 4,
    tier: 2,
    tierMinPoints: 5,
    name: 'Erudición de los Robles Sagrados',
    nameEn: 'Oak Wisdom',
    category: 'Economía',
    branch: 'Ciudad',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Las minas de Gemas y Cristales controladas rinden un +1 de recurso adicional al día.',
        tacticalImpact: 'Financia directamente el Acantilado de Dragones del Día 14.',
        recommendedUnlockTime: 'Día 10-11 (Semana 2)',
      },
    ],
  },

  // =======================================================================
  // TIER 3 (15 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-arboleda-t3-emerald-majesty',
    priorityOrder: 5,
    tier: 3,
    tierMinPoints: 15,
    name: 'Majestad de los Dragones Esmeralda',
    nameEn: 'Emerald Majesty',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 4,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: 'Reduce el coste de oro de los Dragones Verdes y Esmeralda en un 20% y aumenta sus puntos de vida en +30.',
        tacticalImpact: 'Convierte a los Dragones en colosos aún más económicos y demoledores.',
        recommendedUnlockTime: 'Día 13-14 (Semana 2)',
      },
    ],
  },
];
