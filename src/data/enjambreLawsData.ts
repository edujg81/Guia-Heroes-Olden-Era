import { FactionLaw, FactionLawPreset } from '../types';

export const ENJAMBRE_LAW_PRESETS: FactionLawPreset[] = [
  {
    id: 'preset-enjambre-rush-leviathan',
    name: 'Rush a Tier 7: Leviatán del Enjambre & Eclosión Acelerada',
    archetype: 'Competitivo / Meta Rush',
    description: 'Enfoque diseñado para optimizar la recolección de Azufre y Biomasa para erigir la Fosa de Leviatanes en el Día 14.',
    totalCost: 50,
    steps: [
      { stepNumber: 1, lawId: 'law-enjambre-t1-mass-hatching', level: 1, dayWindow: 'Día 1-3', notes: '+25% de crecimiento de Larvas y reducción de costes de nidos.' },
      { stepNumber: 2, lawId: 'law-enjambre-t1-chitin-armor', level: 1, dayWindow: 'Día 4-6', notes: '+2 Armadura a todas las criaturas insectoides para reducir bajas.' },
      { stepNumber: 3, lawId: 'law-enjambre-t2-sulfur-metabolism', level: 1, dayWindow: 'Día 7-9', notes: '+1 de Azufre diario por cada mina de azufre controlada.' },
      { stepNumber: 4, lawId: 'law-enjambre-t2-predatory-leap', level: 1, dayWindow: 'Día 10-12', notes: 'Aumenta el daño de salto de las Mantis Cazadoras.' },
      { stepNumber: 5, lawId: 'law-enjambre-t3-leviathan-hunger', level: 1, dayWindow: 'Día 13-14', notes: 'Reduce los costes del Leviatán del Enjambre y potencia su Fauce.' },
    ],
  },
  {
    id: 'preset-enjambre-endless-swarm',
    name: 'Colmena Infinita & Toxinas Cáusticas',
    archetype: 'Enjambre Masivo & Desgaste',
    description: 'Enfoque centrado en triplicar el crecimiento de Larvas y Avispas e inundar el mapa con toxinas que corroen defensas.',
    totalCost: 48,
    steps: [
      { stepNumber: 1, lawId: 'law-enjambre-t1-mass-hatching', level: 2, dayWindow: 'Semana 1', notes: 'Eclosión masiva de larvas en fase temprana.' },
      { stepNumber: 2, lawId: 'law-enjambre-t2-caustic-corrosion', level: 1, dayWindow: 'Semana 2', notes: 'Disolución acelerada de armaduras enemigas.' },
      { stepNumber: 3, lawId: 'law-enjambre-t3-hivemind-synapse', level: 1, dayWindow: 'Semana 3', notes: 'Inmunidad compartida a efectos mentales para toda la colmena.' },
    ],
  },
];

export const ENJAMBRE_FACTION_LAWS: FactionLaw[] = [
  // =======================================================================
  // TIER 1 (0 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-enjambre-t1-mass-hatching',
    priorityOrder: 1,
    tier: 1,
    tierMinPoints: 0,
    name: 'Eclosión Masiva de la Colmena (Mass Hatching)',
    nameEn: 'Mass Hatching',
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
        effect: 'Aumenta el crecimiento semanal de Larvas en un +25% y reduce su coste de reclutamiento en un 15%.',
        tacticalImpact: 'Acelera la acumulación de masa militar en Días 1-4.',
        recommendedUnlockTime: 'Día 1-2 (Semana 1)',
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 5,
        effect: 'Aumenta el crecimiento semanal de Larvas en un +50% y otorga +1 de velocidad a los Zánganos.',
        tacticalImpact: 'Crea una marea imparable de tropas en fase de apertura.',
        recommendedUnlockTime: 'Día 4-5 (Semana 1)',
      },
    ],
  },
  {
    id: 'law-enjambre-t1-chitin-armor',
    priorityOrder: 2,
    tier: 1,
    tierMinPoints: 0,
    name: 'Endurecimiento Quinoso',
    nameEn: 'Chitin Hardening',
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
        effect: 'Todas las criaturas del Enjambre obtienen +2 de Defensa y un 10% de resistencia a proyectiles.',
        tacticalImpact: 'Permite a los Escarabajos tanquear proyectiles enemigos sin sufrir apenas daño.',
        recommendedUnlockTime: 'Día 3-4 (Semana 1)',
      },
    ],
  },

  // =======================================================================
  // TIER 2 (5 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-enjambre-t2-sulfur-metabolism',
    priorityOrder: 3,
    tier: 2,
    tierMinPoints: 5,
    name: 'Metabolismo de Azufre Primigenio',
    nameEn: 'Sulfur Metabolism',
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
        effect: 'Las minas de Azufre controladas generan +1 de recurso adicional al día y reduce el coste de azufre de los edificios en un 20%.',
        tacticalImpact: 'Asegura los 10 de Azufre requeridos para el Leviatán del Día 14.',
        recommendedUnlockTime: 'Día 8-9 (Semana 2)',
      },
    ],
  },
  {
    id: 'law-enjambre-t2-predatory-leap',
    priorityOrder: 4,
    tier: 2,
    tierMinPoints: 5,
    name: 'Salto Depredador de las Mantis',
    nameEn: 'Predatory Leap',
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
        effect: 'Las Mantis Cazadoras infligen un +25% de daño tras realizar un salto de emboscada e ignoran armaduras ligeras.',
        tacticalImpact: 'Eliminación en un solo asalto de los tiradores contrarios.',
        recommendedUnlockTime: 'Día 10-11 (Semana 2)',
      },
    ],
  },

  // =======================================================================
  // TIER 3 (15 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-enjambre-t3-leviathan-hunger',
    priorityOrder: 5,
    tier: 3,
    tierMinPoints: 15,
    name: 'Hambre Titánica del Leviatán',
    nameEn: 'Titanic Leviathan Hunger',
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
        effect: 'Reduce el coste de oro del Leviatán del Enjambre en un 20% y aumenta el daño de su Pisada Sísmica en un 35%.',
        tacticalImpact: 'Consolida la victoria militar absoluta en el Día 14.',
        recommendedUnlockTime: 'Día 13-14 (Semana 2)',
      },
    ],
  },
];
