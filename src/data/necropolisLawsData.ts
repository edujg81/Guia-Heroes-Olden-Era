import { FactionLaw, FactionLawPreset } from '../types';

export const NECROPOLIS_LAW_PRESETS: FactionLawPreset[] = [
  {
    id: 'preset-necropolis-rush-dragons',
    name: 'Rush a Tier 7: Dragones de Hueso & Cosecha Nigromántica',
    archetype: 'Competitivo / Meta Rush',
    description: 'Enfoque diseñado para maximizar la recolección de Mineral y Mercurio y erigir el Sepulcro de Dragones de Hueso en el Día 14.',
    totalCost: 50,
    steps: [
      { stepNumber: 1, lawId: 'law-necropolis-t1-bone-harvest', level: 1, dayWindow: 'Día 1-3', notes: '+15% de esqueletos adicionales levantados tras cada batalla.' },
      { stepNumber: 2, lawId: 'law-necropolis-t1-crypt-construction', level: 1, dayWindow: 'Día 4-6', notes: 'Reduce los costes de Mineral y Oro de los mausoleos y tumbas.' },
      { stepNumber: 3, lawId: 'law-necropolis-t2-vampiric-bloodline', level: 1, dayWindow: 'Día 7-9', notes: 'Reduce los costes de Mercurio de los Señores Vampiros.' },
      { stepNumber: 4, lawId: 'law-necropolis-t2-death-cloud-amplification', level: 1, dayWindow: 'Día 10-12', notes: 'Incrementa el daño de la Nube de Muerte de los Liches.' },
      { stepNumber: 5, lawId: 'law-necropolis-t3-dread-aura', level: 1, dayWindow: 'Día 13-14', notes: 'Potencia el aura de Desmoralización de los Dragones de Hueso.' },
    ],
  },
  {
    id: 'preset-necropolis-endless-horde',
    name: 'Horda Interminable & Miasma de Plaga',
    archetype: 'Nigromancia Masiva & Desgaste',
    description: 'Enfoque centrado en transformar cada criatura caída en esqueletos y potenciar el debilitamiento por peste y maldición.',
    totalCost: 48,
    steps: [
      { stepNumber: 1, lawId: 'law-necropolis-t1-bone-harvest', level: 2, dayWindow: 'Semana 1', notes: 'Cosecha masiva de esqueletos en fase temprana.' },
      { stepNumber: 2, lawId: 'law-necropolis-t2-plague-miasma', level: 1, dayWindow: 'Semana 2', notes: 'Aura de reducción de estadísticas en combate.' },
      { stepNumber: 3, lawId: 'law-necropolis-t3-eternal-damnation', level: 1, dayWindow: 'Semana 3', notes: 'Inmunidad mejorada y retorno de daño para no-muertos.' },
    ],
  },
];

export const NECROPOLIS_FACTION_LAWS: FactionLaw[] = [
  // =======================================================================
  // TIER 1 (0 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-necropolis-t1-bone-harvest',
    priorityOrder: 1,
    tier: 1,
    tierMinPoints: 0,
    name: 'Cosecha de Huesos (Bone Harvest)',
    nameEn: 'Bone Harvest',
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
        effect: 'Aumenta en un +15% la tasa de resurrección de esqueletos tras batallas y +2 ataque a los Esqueletos.',
        tacticalImpact: 'Acelera la acumulación de masa militar en Días 1-4.',
        recommendedUnlockTime: 'Día 1-2 (Semana 1)',
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 5,
        effect: 'Aumenta en un +30% la tasa de resurrección de esqueletos y otorga +1 de velocidad a los Esqueletos.',
        tacticalImpact: 'Los Esqueletos se convierten en una fuerza de choque veloz.',
        recommendedUnlockTime: 'Día 4-5 (Semana 1)',
      },
    ],
  },
  {
    id: 'law-necropolis-t1-crypt-construction',
    priorityOrder: 2,
    tier: 1,
    tierMinPoints: 0,
    name: 'Arquitectura Sepulcral',
    nameEn: 'Sepulchral Architecture',
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
        effect: 'Reduce el coste de Mineral y Oro de todas las moradas de criaturas en un 20%.',
        tacticalImpact: 'Permite erigir la Fosa de Zombis y Tumba de Fantasmas con mineral mínimo.',
        recommendedUnlockTime: 'Día 2-3 (Semana 1)',
      },
    ],
  },

  // =======================================================================
  // TIER 2 (5 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-necropolis-t2-vampiric-bloodline',
    priorityOrder: 3,
    tier: 2,
    tierMinPoints: 5,
    name: 'Pacto de Sangre de los Señores Vampiros',
    nameEn: 'Vampiric Bloodline Pact',
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
        effect: 'Reduce el coste de reclutamiento de los Vampiros en un 15% y aumenta su daño en un +2.',
        tacticalImpact: 'Facilita la adquisición masiva de Señores Vampiros en la Semana 2.',
        recommendedUnlockTime: 'Día 8-9 (Semana 2)',
      },
    ],
  },
  {
    id: 'law-necropolis-t2-death-cloud-amplification',
    priorityOrder: 4,
    tier: 2,
    tierMinPoints: 5,
    name: 'Miasma de Nube de Muerte',
    nameEn: 'Death Cloud Amplification',
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
        effect: 'La Nube de Muerte de los Liches inflige un +20% de daño a tropas vivas e inflige Maldición por 2 rondas.',
        tacticalImpact: 'Devastación total de ejércitos vivos enemigos.',
        recommendedUnlockTime: 'Día 10-11 (Semana 2)',
      },
    ],
  },

  // =======================================================================
  // TIER 3 (15 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-necropolis-t3-dread-aura',
    priorityOrder: 5,
    tier: 3,
    tierMinPoints: 15,
    name: 'Pesadilla Eterna de los Dragones de Hueso',
    nameEn: 'Eternal Dread of Bone Dragons',
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
        effect: 'El aura de Desmoralización de los Dragones de Hueso y Espectrales reduce la moral enemiga en -3 y su iniciativa en -2.',
        tacticalImpact: 'Anula las respuestas del rival en el combate decisivo.',
        recommendedUnlockTime: 'Día 13-14 (Semana 2)',
      },
    ],
  },
];
