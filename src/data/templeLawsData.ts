import { FactionLaw, FactionLawPreset } from '../types';

export const TEMPLE_LAW_PRESETS: FactionLawPreset[] = [
  {
    id: 'preset-temple-rush-angels',
    name: 'Rush a Tier 7: Ángeles & Disciplina Sagrada',
    archetype: 'Competitivo / Meta Rush',
    description: 'Enfoque optimizado para acelerar la economía, doble construcción y asegurar la Forja Radiante en el Día 14.',
    totalCost: 50,
    steps: [
      { stepNumber: 1, lawId: 'law-temple-t1-double-build', level: 1, dayWindow: 'Día 1-3', notes: 'Desbloquea aceleración de construcción para erigir infraestructuras clave.' },
      { stepNumber: 2, lawId: 'law-temple-t1-ballistics', level: 1, dayWindow: 'Día 4-6', notes: 'Potencia el daño de los Ballesteros para limpiar minas iniciales sin bajas.' },
      { stepNumber: 3, lawId: 'law-temple-t2-grassland-sanctity', level: 1, dayWindow: 'Día 7-9', notes: 'Inmunidad a efectos negativos en terreno de pradera durante la expansión.' },
      { stepNumber: 4, lawId: 'law-temple-t2-erathian-discipline', level: 1, dayWindow: 'Día 10-12', notes: 'Reduce costes de reclutamiento de infantería pesada y aumenta la moral.' },
      { stepNumber: 5, lawId: 'law-temple-t3-universal-light', level: 1, dayWindow: 'Día 13-14', notes: 'Permite a los héroes de Templo aprender cualquier hechizo independientemente de su nivel.' },
    ],
  },
  {
    id: 'preset-temple-crusade-morale',
    name: 'Cruzada de Moral Inquebrantable & Resurrección',
    archetype: 'Control & Sostenibilidad',
    description: 'Enfoque centrado en maximizar los bonos de moral (+3 garantizado) y la efectividad de los Arcángeles.',
    totalCost: 48,
    steps: [
      { stepNumber: 1, lawId: 'law-temple-t1-encouragement', level: 1, dayWindow: 'Semana 1', notes: 'Aumenta la frecuencia de turnos dobles por alta moral.' },
      { stepNumber: 2, lawId: 'law-temple-t2-griffin-valiance', level: 1, dayWindow: 'Semana 2', notes: 'Contraataques potenciados para los Grifos de Templo.' },
      { stepNumber: 3, lawId: 'law-temple-t3-resurrection-blessing', level: 1, dayWindow: 'Semana 3', notes: 'Reduce el coste de maná de Resurrección y aumenta tropas revividas.' },
    ],
  },
];

export const TEMPLE_FACTION_LAWS: FactionLaw[] = [
  // =======================================================================
  // TIER 1 (0 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-temple-t1-double-build',
    priorityOrder: 1,
    tier: 1,
    tierMinPoints: 0,
    name: 'Doble Construcción de la Corona',
    nameEn: 'Double Construction (Official Law)',
    category: 'Ciudad',
    branch: 'Ciudad',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Permite construir estructuras dos veces por día en ciudades de Templo al alcanzar ciertos umbrales de recursos.',
        tacticalImpact: 'Acelerador económico clave para desbloquear Forja Radiante y edificios cívicos rápidamente.',
        recommendedUnlockTime: 'Días 1-4 (Semana 1)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Reduce el coste de oro de la segunda construcción en un 15%.',
        tacticalImpact: 'Multiplica la velocidad de desarrollo en las primeras 2 semanas.',
        recommendedUnlockTime: 'Días 6-8 (Semana 2)'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Lord Edgar', 'Sir Galahad', 'Valentina'],
    tags: ['Economía', 'Construcción', 'Rush Tier 7']
  },
  {
    id: 'law-temple-t1-ballistics',
    priorityOrder: 2,
    tier: 1,
    tierMinPoints: 0,
    name: 'Puntería de Erathia',
    nameEn: 'Marksmen Precision',
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
        effect: 'Los Ballesteros y Tiradores aumentan su daño a distancia en +1 y su alcance de visión en +1 casilla.',
        tacticalImpact: 'Permite limpiar neutrales tempranos sin que alcancen la línea de fuego.',
        recommendedUnlockTime: 'Días 2-3 (Semana 1)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Disparo Perforante aumenta el daño que el objetivo recibe en un 35% (en lugar de 25%).',
        tacticalImpact: 'Destruye objetivos prioritarios blindados en combinación con la Caballería.',
        recommendedUnlockTime: 'Días 7-10 (Semana 2)'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Sir Galahad', 'Lord Edgar'],
    tags: ['Tiradores', 'Daño Físico', 'Tier 1']
  },
  {
    id: 'law-temple-t1-encouragement',
    priorityOrder: 3,
    tier: 1,
    tierMinPoints: 0,
    name: 'Ley de Aliento & Moral',
    nameEn: 'Encouragement Law (Official Law)',
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
        effect: 'Todas las tropas vivas de Templo obtienen +1 de Moral base y un +10% de probabilidad de turno extra tras abatir a un enemigo.',
        tacticalImpact: 'Multiplica la cadencia de ataques y contraataques en batallas tempranas.',
        recommendedUnlockTime: 'Semana 1'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Los turnos dobles por Moral otorgan además +2 de Velocidad y +10% de daño en ese turno extra.',
        tacticalImpact: 'Permite que la infantería cruce el mapa y aseste golpes decisivos.',
        recommendedUnlockTime: 'Semana 2'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Sir Galahad', 'Aeos'],
    tags: ['Moral', 'Ofensiva']
  },

  // =======================================================================
  // TIER 2 (10 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-temple-t2-grassland-sanctity',
    priorityOrder: 4,
    tier: 2,
    tierMinPoints: 10,
    name: 'Santidad en Pradera',
    nameEn: 'Grassland Sanctity (Official Law)',
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
        effect: 'Las tropas de Templo son completamente inmunes a efectos negativos y maldiciones al luchar en terreno de Pradera.',
        tacticalImpact: 'Invalida el repertorio de maldiciones de Brujos y Nigromantes en el bioma nativo de Templo.',
        recommendedUnlockTime: 'Días 8-12 (Semana 2)'
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 6,
        effect: 'Otorga además +2 Ataque y +2 Defensa a todas las tropas en Pradera.',
        tacticalImpact: 'Supremacía absoluta en defensa territorial en el mapa natal.',
        recommendedUnlockTime: 'Semana 3'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Valentina', 'Lord Edgar'],
    tags: ['Inmunidad', 'Terreno Nativo']
  },
  {
    id: 'law-temple-t2-erathian-discipline',
    priorityOrder: 5,
    tier: 2,
    tierMinPoints: 10,
    name: 'Disciplina de Erathia',
    nameEn: 'Erathian Discipline',
    category: 'Ciudad',
    branch: 'Ciudad',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Reduce el coste de reclutamiento de todas las unidades de Templo en un 10% y aumenta la producción de oro en +250/día.',
        tacticalImpact: 'Ahorro masivo de oro para financiar compras de Ángeles.',
        recommendedUnlockTime: 'Semana 2'
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 6,
        effect: 'Aumenta el crecimiento semanal de Espadachines y Grifos en +2 adicionales.',
        tacticalImpact: 'Engrosa la vanguardia del ejército.',
        recommendedUnlockTime: 'Semana 3'
      }
    ],
    prerequisiteLaws: ['law-temple-t1-double-build'],
    incompatibleLaws: [],
    recommendedForHeroes: ['Lord Edgar', 'Sister Rebecca'],
    tags: ['Economía', 'Crecimiento']
  },
  {
    id: 'law-temple-t2-griffin-valiance',
    priorityOrder: 6,
    tier: 2,
    tierMinPoints: 10,
    name: 'Alas de la Corona',
    nameEn: 'Wings of the Crown',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 3,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Los Grifos ganan +1 Velocidad en combate y su habilidad Grito Valeroso activa un bono de moral inmediata al resto del ejército.',
        tacticalImpact: 'Sinergia brutal con Sir Galahad.',
        recommendedUnlockTime: 'Semana 2'
      }
    ],
    prerequisiteLaws: ['law-temple-t1-encouragement'],
    incompatibleLaws: [],
    recommendedForHeroes: ['Sir Galahad'],
    tags: ['Grifos', 'Velocidad']
  },

  // =======================================================================
  // TIER 3 (20 PUNTOS REQUERIDOS)
  // =======================================================================
  {
    id: 'law-temple-t3-universal-light',
    priorityOrder: 7,
    tier: 3,
    tierMinPoints: 20,
    name: 'Doctrina Universal de la Luz',
    nameEn: 'Universal Light Doctrine (Official Law)',
    category: 'Ciudad',
    branch: 'Ciudad',
    branchType: 'Ciudad',
    costLaws: 4,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: 'Permite a los héroes de Templo aprender cualquier hechizo de cualquier nivel sin importar las restricciones normales de escuela.',
        tacticalImpact: 'Permite a comandantes físicos como Sir Galahad o Lord Edgar aprender hechizos de alto nivel de apoyo.',
        recommendedUnlockTime: 'Días 13-16 (Semana 2-3)'
      },
      {
        level: 2,
        costLaws: 4,
        cumulativeCost: 8,
        effect: 'Reduce el coste de maná de todos los hechizos aprendidos en un 20%.',
        tacticalImpact: 'Permite spam continuo de hechizos de bendición y protección.',
        recommendedUnlockTime: 'Semana 4'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Valentina', 'Inquisitor Alistair', 'Sir Galahad'],
    tags: ['Magia', 'Grimorio Universal']
  },
  {
    id: 'law-temple-t3-resurrection-blessing',
    priorityOrder: 8,
    tier: 3,
    tierMinPoints: 20,
    name: 'Gracia Divina & Resurrección',
    nameEn: 'Divine Grace & Resurrection',
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
        effect: 'La habilidad de Resurrección de los Arcángeles revive un +30% más de puntos de salud de tropas caídas.',
        tacticalImpact: 'Garantiza restaurar pilas de Caballería o Grifos enteras sin coste alguno.',
        recommendedUnlockTime: 'Semana 3'
      },
      {
        level: 2,
        costLaws: 4,
        cumulativeCost: 8,
        effect: 'Los Arcángeles obtienen un segundo uso de Resurrección si el combate dura más de 4 rondas.',
        tacticalImpact: 'Inmortalidad táctica en asedios prolongados contra capitales enemigas.',
        recommendedUnlockTime: 'Semana 5'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Valentina', 'Sir Galahad'],
    tags: ['Ángeles', 'Resurrección']
  },

  // =======================================================================
  // TIER 4 & 5 (SLOTS EN DESARROLLO POR UNFROZEN SEGÚN INSTRUCCIÓN DEL USUARIO)
  // =======================================================================
  {
    id: 'law-temple-t4-in-development-1',
    priorityOrder: 9,
    tier: 4,
    tierMinPoints: 30,
    name: 'Baluarte de la Fe Inquebrantable',
    nameEn: 'Bastion of Unyielding Faith (En desarrollo)',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 4,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: 'En desarrollo (Parámetros y balance en proceso de confirmación oficial por Unfrozen para Early Access).',
        tacticalImpact: 'En desarrollo: Bonos previstos para la resistencia de la Caballería pesada y la Forja Radiante.',
        recommendedUnlockTime: 'Semana 4-5'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Lord Edgar'],
    tags: ['En desarrollo', 'Militar']
  },
  {
    id: 'law-temple-t4-in-development-2',
    priorityOrder: 10,
    tier: 4,
    tierMinPoints: 30,
    name: 'Tratado de Karigor & Gran Tesorería',
    nameEn: 'Karigor Treaty (En desarrollo)',
    category: 'Ciudad',
    branch: 'Ciudad',
    branchType: 'Ciudad',
    costLaws: 4,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: 'En desarrollo (Parámetros de interés semanal y conversión de tributos en proceso de revelación).',
        tacticalImpact: 'En desarrollo: Enfoque en ingresos y multiplicadores de Banco.',
        recommendedUnlockTime: 'Semana 5'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Sister Rebecca'],
    tags: ['En desarrollo', 'Economía']
  },
  {
    id: 'law-temple-t5-in-development-1',
    priorityOrder: 11,
    tier: 5,
    tierMinPoints: 40,
    name: 'Supremacía Solar de Jadame',
    nameEn: 'Solar Supremacy of Jadame (En desarrollo)',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 5,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 5,
        cumulativeCost: 5,
        effect: 'En desarrollo (Decreto de cúspide de Tier 5 pendiente de especificación de datos oficiales).',
        tacticalImpact: 'En desarrollo: Capacidad de invocar intervención divina en asedios mayores.',
        recommendedUnlockTime: 'Semana 6-8'
      }
    ],
    prerequisiteLaws: [],
    incompatibleLaws: [],
    recommendedForHeroes: ['Valentina', 'Sir Galahad'],
    tags: ['En desarrollo', 'Tier 5']
  }
];
