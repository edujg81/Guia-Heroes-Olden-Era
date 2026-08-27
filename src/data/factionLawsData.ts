import { FactionLaw, FactionLawPreset, LawRank } from '../types';

export const MAX_OLDEN_ERA_LAW_SEALS = 100; // Cap oficial del motor de Olden Era (Tope Máximo Absoluto por partida)
export const MAX_FACTION_LAW_POINTS = 50;  // Presupuesto canónico para 50 Sellos de Ley

export const LAW_POINT_SOURCES = [
  { 
    source: 'Estructuras Municipales (Sede, Ayuntamiento, Palacio y Capitolio)', 
    points: 4, 
    detail: '+1 punto por nivel municipal erigido + generación pasiva diaria acumulativa de Puntos de Ley.' 
  },
  { 
    source: 'Victorias en Combate & Experiencia Heroica (EXP)', 
    points: 30, 
    detail: 'Los héroes ganan Puntos de Ley proporcionales a la EXP base de cada batalla ganada en el mapa.' 
  },
  { 
    source: 'Conquista de Ciudades, Castillos y Asentamientos', 
    points: 20, 
    detail: '+2 a +4 Sellos de Ley por cada plaza fuerte enemiga o neutral anexada a tu dominio.' 
  },
  { 
    source: 'Bandereo de Minas, Aserraderos y Moradas Externas', 
    points: 15, 
    detail: '+1 punto al capturar minas de recursos estratégicos (Gemas, Cristal, Mercurio) y cubiles de criaturas.' 
  },
  { 
    source: 'Monumentos, Monolitos y Obeliscos de Ley de Jadame', 
    points: 15, 
    detail: 'Lugares sagrados repartidos por la superficie y el subterráneo que otorgan Sellos de Ley instantáneos.' 
  },
  { 
    source: 'Hitos Arcanos y Utopías de Dragones', 
    points: 16, 
    detail: '+2 por Cofradía de Magos V, +3 por limpiar una Utopía de Dragones, +2 por Héroe a Nivel 15+.' 
  },
];

export const FACTION_LAWS: FactionLaw[] = [
  // =======================================================================
  // TIER 1 (DESBLOQUEADO A LOS 0 PUNTOS DE FACCIÓN)
  // =======================================================================
  {
    id: 'law-t1-troglodytes',
    priorityOrder: 1,
    tier: 1,
    tierMinPoints: 0,
    name: 'Trogloditas de élite',
    nameEn: 'Elite Troglodytes',
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
        effect: 'Los Trogloditas infligen 1.5x de daño con su Estilo de Lucha y aumentan su daño mínimo de 1 a 2.',
        tacticalImpact: 'Máxima prioridad en Días 1-2: potencia el enjambre inicial para limpiar (creeping) aserraderos y minas sin sufrir bajas.',
        recommendedUnlockTime: 'Día 1-2 (Semana 1)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Los Trogloditas infligen 2.0x de daño con su Estilo, ganan +2 Ataque, +2 PS base y 25% resistencia a daño físico.',
        tacticalImpact: 'Transforma grandes masas de Trogloditas en una trituradora implacable para despejar campamentos pesados.',
        recommendedUnlockTime: 'Día 6-7 (Semana 1)'
      }
    ],
    recommendedUnlockTime: 'Día 1-2 (Semana 1) - Primer Decreto Obligatorio',
    effect: 'Los Trogloditas aliados infligen 1.5x de daño con su Estilo de Lucha y aumentan su daño mínimo de 1 a 2.',
    tacticalImpact: 'Convierte al enjambre inicial de Trogloditas en una temible fuerza de asalto para limpiar el mapa temprano contra neutrales sin bajas en tropas superiores.',
    synergy: 'Sinergia brutal con el héroe Kieran (El Pueblo Ciego) y moradas externas de Trogloditas.',
  },
  {
    id: 'law-t1-leaders-nation',
    priorityOrder: 2,
    tier: 1,
    tierMinPoints: 0,
    name: 'Líderes de la nación',
    nameEn: 'Leaders of the Nation',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Todos los héroes de Mazmorra ganan un +15% de experiencia (EXP) adicional en batallas y eventos.',
        tacticalImpact: 'Vital en Días 1-3: capitaliza la EXP de las primeras batallas contra neutrales para alcanzar niveles 4-6 en Semana 1.',
        recommendedUnlockTime: 'Día 2-3 (Semana 1)'
      },
      {
        level: 3,
        costLaws: 3,
        cumulativeCost: 6,
        effect: 'Todos los héroes ganan un +30% de EXP adicional y +1 Moral base permanente en todas las batallas.',
        tacticalImpact: 'Niveles heroicos ultrarrápidos y turnos adicionales por moral alta.',
        recommendedUnlockTime: 'Día 8-10 (Semana 2)'
      }
    ],
    recommendedUnlockTime: 'Día 2-3 (Semana 1) - Para disparar el nivel del héroe principal',
    effect: 'Todos los héroes de Mazmorra ganan un +15% de experiencia (EXP) adicional en todas las batallas y eventos del mapa.',
    tacticalImpact: 'Acelera el paso a niveles 4-6 durante la Semana 1, desbloqueando maestrías de Logística, Magia y Ataque antes que los rivales.',
    synergy: 'Sinergia con Kelarr (Erudición de Alvar) y héroes principales exploradores.',
  },
  {
    id: 'law-t1-resource-riches-1',
    priorityOrder: 3,
    tier: 1,
    tierMinPoints: 0,
    name: 'Riqueza de recursos I',
    nameEn: 'Resource Riches I',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Otorga una dotación instantánea única de +3.000 de Oro, +10 Madera y +10 Mineral.',
        tacticalImpact: 'Elimina el cuello de botella de materiales para construir el Ayuntamiento y Cofradía I en Días 2-3 sin esperar a despejar minas.',
        recommendedUnlockTime: 'Día 2-3 (Semana 1)'
      }
    ],
    recommendedUnlockTime: 'Día 2-3 (Semana 1) - Impulso inicial para Ayuntamiento',
    effect: 'Otorga una dotación instantánea única de +3.000 de Oro, +10 Madera y +10 Mineral.',
    tacticalImpact: 'Elimina el bloqueo por madera y mineral en los primeros días, permitiendo edificar el Ayuntamiento sin depender del bandereo inmediato de aserraderos.',
    synergy: 'Acelera la construcción del Ayuntamiento, Palacio bizantino y Cofradía de Magos I.',
  },
  {
    id: 'law-t1-dungeon-masters-1',
    priorityOrder: 4,
    tier: 1,
    tierMinPoints: 0,
    name: 'Maestro de las mazmorras I',
    nameEn: 'Dungeon Masters I',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Aumenta el crecimiento semanal en +4 Trogloditas (Tier 1) y +2 Infiltradores (Tier 2) en todas las ciudades de Mazmorra.',
        tacticalImpact: 'Promulgar antes del Día 7 para que aplique al nuevo reclutamiento masivo del Día 8 (Lunes).',
        recommendedUnlockTime: 'Día 3-5 (Semana 1)'
      }
    ],
    recommendedUnlockTime: 'Día 3-5 (Semana 1) - Antes de finalizar la primera semana',
    effect: 'Aumenta el crecimiento semanal en +4 Trogloditas (Tier 1) y +2 Infiltradores (Tier 2) en todas las ciudades de Mazmorra.',
    tacticalImpact: 'Asegura una masa crítica de infantería ligera para la primera gran oleada de expansión del Lunes de la Semana 2.',
    synergy: 'Sinergia con la Sede municipal y reclutamiento temprano de tropas de Tier 1 y 2.',
  },
  {
    id: 'law-t1-celestial-maps',
    priorityOrder: 5,
    tier: 1,
    tierMinPoints: 0,
    name: 'Mapas celestiales',
    nameEn: 'Celestial Maps',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Ciudad',
    costLaws: 6,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 6,
        cumulativeCost: 6,
        effect: 'Revela permanentemente las posiciones de todos los santuarios, monolitos, minas clave y observatorios del mapa de Jadame.',
        tacticalImpact: 'Visión estratégica total sin enviar exploradores a ciegas, optimizando las rutas de marcha desde la primera semana.',
        recommendedUnlockTime: 'Día 4-7 (Semana 1)'
      }
    ],
    recommendedUnlockTime: 'Día 4-7 (Semana 1) - Para planificación de rutas de conquista',
    effect: 'Revela permanentemente las posiciones de todos los santuarios, monolitos, minas clave y observatorios del mapa de Jadame.',
    tacticalImpact: 'Permite trazar rutas perfectas de creeping y emboscada sin perder turnos explorando zonas vacías.',
    synergy: 'Sinergia con Logística y héroes de exploración rápida.',
  },
  {
    id: 'law-t1-arcane-knowledge',
    priorityOrder: 6,
    tier: 1,
    tierMinPoints: 0,
    name: 'Conocimiento arcano',
    nameEn: 'Arcane Knowledge',
    category: 'Mágica',
    branch: 'Mágica',
    branchType: 'Militar',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: '+20 Maná máximo y +5 de regeneración diaria de Maná en el mapa de aventura para todos los héroes.',
        tacticalImpact: 'Permite al héroe lanzar hechizos de daño en combates neutrales consecutivos sin desviarse a pozos arcanos.',
        recommendedUnlockTime: 'Día 4-5 (Semana 1)'
      }
    ],
    recommendedUnlockTime: 'Día 4-5 (Semana 1) - Al construir Cofradía de Magos I',
    effect: '+20 Puntos de Maná iniciales máximos y +5 de regeneración diaria de Maná en el mapa de aventura para todos los héroes.',
    tacticalImpact: 'Permite al héroe lanzar hechizos en cada encuentro del mapa sin tener que regresar a recargar maná.',
    synergy: 'Sinergia directa con Zakron the Great, Lodos y Sister Deira.',
  },
  {
    id: 'law-t1-dragon-scales',
    priorityOrder: 7,
    tier: 1,
    tierMinPoints: 0,
    name: 'Escamas de dragón',
    nameEn: 'Dragon Scales',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 2,
    maxLevel: 3,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Todas las criaturas aliadas reciben un 5% menos de daño mágico directo de hechizos enemigos.',
        tacticalImpact: 'Mitigación inicial frente a proyectiles mágicos y hechizos elementales de neutrales y héroes.',
        recommendedUnlockTime: 'Semana 2-3 (Día 12+)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Todas las criaturas aliadas reciben un 10% menos de daño mágico y ganan +1 Defensa permanente.',
        tacticalImpact: 'Mitigación sólida frente a héroes hechiceros con Bolas de Fuego y Rayos Arcanos.',
        recommendedUnlockTime: 'Semana 4 (Día 25+)'
      },
      {
        level: 3,
        costLaws: 2,
        cumulativeCost: 6,
        effect: 'Todas las criaturas aliadas reciben un 15% menos de daño mágico, +2 Defensa y 20% resistencia a daño de área.',
        tacticalImpact: 'Protección casi total contra daño de hechizos en duelos decisivos de final de partida.',
        recommendedUnlockTime: 'Semana 6+ (Día 40+)'
      }
    ],
    recommendedUnlockTime: 'Semana 2-3 - Al cruzar al territorio disputado',
    effect: 'Todas las criaturas aliadas reciben un 5% menos de daño mágico directo de hechizos enemigos.',
    tacticalImpact: 'Mitiga el daño de hechizos ofensivos (Relámpago, Flecha Mágica, Bola de Fuego).',
    synergy: 'Se acumula con la resistencia mágica inherente de tropas subterráneas y el combo Drago-Armageddon.',
  },

  // =======================================================================
  // TIER 2 (DESBLOQUEADO A LOS 5 PUNTOS DE FACCIÓN)
  // =======================================================================
  {
    id: 'law-t2-tax-collectors',
    priorityOrder: 8,
    tier: 2,
    tierMinPoints: 5,
    name: 'Recaudadores de impuestos',
    nameEn: 'Tax Collectors',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: '+20% de Oro adicional diario generado por Ayuntamiento, Sede y Capitolio (+800g/día con Capitolio).',
        tacticalImpact: 'Máxima prioridad en Semana 2: financia los elevados costes de reclutamiento del Día 8 (Lunes).',
        recommendedUnlockTime: 'Día 8-9 (Semana 2)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: '+40% de Oro municipal diario (+1.600g/día con Capitolio) y +300g pasivo por cada ciudad secundaria.',
        tacticalImpact: 'Sustenta la expansión simultánea de 2 plazas fuertes sin arruinar las arcas.',
        recommendedUnlockTime: 'Día 15 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 8-9 (Semana 2) - Junto a la construcción del Capitolio',
    effect: 'Aumenta los ingresos de oro generados por el Ayuntamiento, Sede y Capitolio en un +20% adicional diario (+800g/día con Capitolio).',
    tacticalImpact: 'Financia los elevados costes semanales de reclutamiento sin asfixiar las arcas ni detener la construcción.',
    synergy: 'Sinergia con Capitolio (4.000g base -> 4.800g/día) y héroe Glastor.',
  },
  {
    id: 'law-t2-mining-gems',
    priorityOrder: 9,
    tier: 2,
    tierMinPoints: 5,
    name: 'Minería: Gemas',
    nameEn: 'Mining: Gems',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: '+1 Gema/día en todas las Minas de Gemas y +1 Gema/día pasiva en la capital.',
        tacticalImpact: 'Resuelve el recurso más restrictivo de Mazmorra para erigir Hogar ctónico (Hidras) y Cofradía III.',
        recommendedUnlockTime: 'Día 9-10 (Semana 2)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: '+2 Gemas/día en Minas y +2 Gemas/día pasivas en la capital.',
        tacticalImpact: 'Garantiza gemas continuas para comprar Dragones de Cueva y Cofradía V.',
        recommendedUnlockTime: 'Día 17 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 9-10 (Semana 2) - Preparando recursos para Hogar ctónico y Dragones',
    effect: 'Aumenta la producción de todas las Minas de Gemas controladas en +1 Gema/día y otorga +1 Gema pasiva diaria en la capital.',
    tacticalImpact: 'Resuelve el cuello de botella más estricto de Mazmorra para erigir Hogar ctónico (Hidras) y Palacio de cueva (Dragones).',
    synergy: 'Sinergia perfecta con Creta (Buscadora de Gemas) y Silo de recursos.',
  },
  {
    id: 'law-t2-infiltrators',
    priorityOrder: 10,
    tier: 2,
    tierMinPoints: 5,
    name: 'Infiltradores de élite',
    nameEn: 'Elite Infiltrators',
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
        effect: 'Infiltradores infligen 1.5x daño con Salto Sombrío (Blink), +1 Velocidad y +1 Iniciativa.',
        tacticalImpact: 'Permite teletransportar Infiltradores tras tiradores neutrales en Turno 1, evitando recibir disparos de castigo.',
        recommendedUnlockTime: 'Día 8-10 (Semana 2)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Infiltradores infligen 2.0x daño con Salto Sombrío, +2 Velocidad, +2 Iniciativa e inoculan Veneno de Sombra (-2 Ataque/Defensa al objetivo).',
        tacticalImpact: 'Ataques relámpago con letalidad de retaguardia para incapacitar tropas clave.',
        recommendedUnlockTime: 'Día 16 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 8-10 (Semana 2) - Al reclutar la hornada de Infiltradores',
    effect: 'Los Infiltradores infligen 1.5x de daño con su Estilo de Lucha (Salto Sombrío / Blink) y ganan +1 Velocidad y +1 Iniciativa.',
    tacticalImpact: 'Permite a los Infiltradores saltar y neutralizar escuadras de arqueros enemigos en el Turno 1 con penetración letal.',
    synergy: 'Sinergia suprema con el héroe Mouaren (Salto Sombrío) y Danzantes.',
  },
  {
    id: 'law-t2-dancers',
    priorityOrder: 11,
    tier: 2,
    tierMinPoints: 5,
    name: 'Danzantes de élite',
    nameEn: 'Elite Dancers',
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
        effect: 'Danzantes infligen 1.5x daño con Doble Golpe y ganan +1 Velocidad.',
        tacticalImpact: 'Tritura infantería neutral pesada de melé con 2 estocadas enérgicas.',
        recommendedUnlockTime: 'Día 10-11 (Semana 2)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Danzantes infligen 2.0x daño con Doble Golpe, +2 Velocidad, +1 Ataque y 20% evasión a contraataques.',
        tacticalImpact: 'Infantería de asalto ultrarrápida que barre frentes enteros en Turno 1.',
        recommendedUnlockTime: 'Día 17 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 10-11 (Semana 2) - Al construir el Salón de las espadas',
    effect: 'Los Danzantes de Ónice infligen 1.5x de daño con su Estilo de Lucha (Danza de Espadas - Doble Golpe) y ganan +1 Velocidad.',
    tacticalImpact: 'Multiplica la letalidad cuerpo a cuerpo de tu infantería ligera de Tier 3, destrozando tanques enemigos con dos estocadas rápidas.',
    synergy: 'Sinergia con Motley (Danza Macabra) y hechizos de Aceleración / Bendición.',
  },
  {
    id: 'law-t2-dungeon-masters-2',
    priorityOrder: 12,
    tier: 2,
    tierMinPoints: 5,
    name: 'Maestro de las mazmorras II',
    nameEn: 'Dungeon Masters II',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Aumenta el crecimiento semanal en +2 Infiltradores (Tier 2) y +2 Danzantes de Ónice (Tier 3) en todas las ciudades.',
        tacticalImpact: 'Multiplica la línea media de choque para la Semana 3.',
        recommendedUnlockTime: 'Día 11-12 (Semana 2)'
      }
    ],
    recommendedUnlockTime: 'Día 11-12 (Semana 2) - Expansión del ejército medio',
    effect: 'Aumenta el crecimiento semanal en +2 Infiltradores (Tier 2) y +2 Danzantes de Ónice (Tier 3) en las ciudades de Mazmorra.',
    tacticalImpact: 'Refuerza la producción del núcleo medio de choque de tu ejército durante la crucial Semana 2.',
    synergy: 'Sinergia con Casa de la agilidad y Salón de las espadas.',
  },
  {
    id: 'law-t2-dungeon-masters-3',
    priorityOrder: 13,
    tier: 2,
    tierMinPoints: 5,
    name: 'Maestro de las mazmorras III',
    nameEn: 'Dungeon Masters III',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Aumenta el crecimiento semanal en +2 Danzantes de Ónice (Tier 3) y +1 Minotauro (Tier 4).',
        tacticalImpact: 'Consolida la llegada temprana de Minotauros como vanguardia.',
        recommendedUnlockTime: 'Día 13-14 (Semana 2)'
      }
    ],
    recommendedUnlockTime: 'Día 13-14 (Semana 2) - Junto a la llegada de Minotauros',
    effect: 'Aumenta el crecimiento semanal en +2 Danzantes de Ónice (Tier 3) y +1 Minotauro (Tier 4).',
    tacticalImpact: 'Consolida la llegada temprana de Minotauros para actuar como vanguardia impenetrable.',
    synergy: 'Sinergia con Laberinto y Palacio bizantino.',
  },
  {
    id: 'law-t2-alchemists-code-1',
    priorityOrder: 14,
    tier: 2,
    tierMinPoints: 5,
    name: 'Código del alquimista I',
    nameEn: 'Alchemist\'s Code I',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Mejora las tasas de intercambio de recursos en el Mercado un 25% y potencia pociones mágicas de combate.',
        tacticalImpact: 'Transmuta madera/mineral sobrante en gemas o mercurio con mínima penalización mercantil.',
        recommendedUnlockTime: 'Día 13-14 (Semana 2)'
      }
    ],
    recommendedUnlockTime: 'Día 13-14 (Semana 2) - Para optimizar intercambios de mercado',
    effect: 'Mejora las tasas de intercambio de recursos en el Mercado un 25% y potencia la efectividad de las pociones mágicas de combate.',
    tacticalImpact: 'Permite transmutar madera/mineral sobrante en gemas o mercurio con mínima penalización mercantil.',
    synergy: 'Sinergia con Mercado, Silo alquímico y Mercader de artefactos.',
  },

  // =======================================================================
  // TIER 3 (DESBLOQUEADO A LOS 15 PUNTOS DE FACCIÓN)
  // =======================================================================
  {
    id: 'law-t3-jadame-maps',
    priorityOrder: 15,
    tier: 3,
    tierMinPoints: 15,
    name: 'Mapas de Jadame',
    nameEn: 'Jadame Maps',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Todos los héroes ganan +10 Puntos de Movimiento diarios permanentes en el mapa de aventura.',
        tacticalImpact: 'Máxima prioridad en Semana 3: expande el radio de marcha para capturar el centro del mapa y cazar exploradores enemigos.',
        recommendedUnlockTime: 'Día 15 (Semana 3)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Todos los héroes ganan +20 Puntos de Movimiento diarios permanentes y revela túneles subterráneos sin niebla.',
        tacticalImpact: 'Movilidad imparable en mapa subterráneo y superficie.',
        recommendedUnlockTime: 'Día 21 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 15 (Semana 3 - Lunes) - Inicio de conquista territorial exterior',
    effect: 'Todos los héroes de Mazmorra ganan +10 Puntos de Movimiento diarios permanentes en el mapa de aventura.',
    tacticalImpact: 'Aumenta drásticamente el radio de marcha diario, permitiendo alcanzar objetivos distantes y atrapar héroes rivales.',
    synergy: 'Se acumula directamente con la habilidad Logística y botas de velocidad.',
  },
  {
    id: 'law-t3-minotaurs',
    priorityOrder: 16,
    tier: 3,
    tierMinPoints: 15,
    name: 'Minotauros de élite',
    nameEn: 'Elite Minotaurs',
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
        effect: 'Minotauros infligen 1.5x daño con Estilo, +1 Velocidad, +1 Iniciativa y +2 Daño base.',
        tacticalImpact: 'Martillo demoledor de primera línea con moral perfecta y contragolpes letales contra monstruos y héroes rivales.',
        recommendedUnlockTime: 'Día 15-16 (Semana 3)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Minotauros infligen 2.0x daño con Estilo, +2 Velocidad, +2 Iniciativa, +4 Daño base y aturden al impactar.',
        tacticalImpact: 'Rompen formaciones enemigas con golpes críticos garantizados.',
        recommendedUnlockTime: 'Día 22 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 15-16 (Semana 3) - Al mejorar a Señores Minotauros / Vanguardia',
    effect: 'Los Minotauros infligen 1.5x de daño con su Estilo de Lucha, ganan +1 Velocidad, +1 Iniciativa y +2 de daño base.',
    tacticalImpact: 'Convierte a los Minotauros en un martillo demoledor de primera línea con moral perfecta y contragolpes letales.',
    synergy: 'Sinergia con Devir (Maestría de Minotauros) y Laberinto.',
  },
  {
    id: 'law-t3-medusae',
    priorityOrder: 17,
    tier: 3,
    tierMinPoints: 15,
    name: 'Medusas de élite',
    nameEn: 'Elite Medusae',
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
        effect: 'Medusas infligen 1.5x daño con Estilo, +1 Iniciativa, +4 Ataque y +4 Defensa.',
        tacticalImpact: 'Aumenta la pegada de sus flechas y la probabilidad de petrificación para neutralizar tropas T6-T7 enemigas.',
        recommendedUnlockTime: 'Día 16-17 (Semana 3)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Medusas infligen 2.0x daño con Estilo, +2 Munición y Mirada Petrificante activa tanto a rango como en melé.',
        tacticalImpact: 'Petrifican a distancia a tiradores y campeones enemigos.',
        recommendedUnlockTime: 'Día 23 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 16-17 (Semana 3) - Al construir Torre de las Medusas',
    effect: 'Las Medusas infligen 1.5x de daño con su Estilo de Lucha, ganan +1 Iniciativa, +4 Ataque y +4 Defensa.',
    tacticalImpact: 'Aumenta la pegada de sus flechas y la probabilidad de petrificación en melé para neutralizar jefes y monstruos T6-T7.',
    synergy: 'Sinergia con Enatee (Reina de las Medusas) y Torre de las Medusas.',
  },
  {
    id: 'law-t3-tactical-advantage',
    priorityOrder: 18,
    tier: 3,
    tierMinPoints: 15,
    name: 'Ventaja táctica',
    nameEn: 'Tactical Advantage',
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
        effect: 'Reduce la penalización de daño de las Posturas de Combate del 50% al 25% y +1 casilla de despliegue.',
        tacticalImpact: 'Alterna entre estilos de combate sin perder letalidad en batallas tácticas contra héroes enemigos.',
        recommendedUnlockTime: 'Día 17 (Semana 3)'
      },
      {
        level: 2,
        costLaws: 2,
        cumulativeCost: 4,
        effect: 'Reduce la penalización de Posturas a 0% (daño pleno) y +2 casillas de despliegue táctico +1 Velocidad en Turno 1.',
        tacticalImpact: 'Máxima maniobrabilidad y ventaja de primer golpe en cualquier terreno.',
        recommendedUnlockTime: 'Día 24 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 17 (Semana 3) - Para combates decisivos contra héroes rivales',
    effect: 'Reduce la penalización de daño de las Posturas de Combate del 50% al 25% y otorga +1 de casilla de despliegue táctico inicial.',
    tacticalImpact: 'Permite alternar entre estilos de lucha con daño pleno, garantizando máxima flexibilidad operativa en batalla.',
    synergy: 'Sinergia con todas las 7 criaturas de Mazmorra y sus posturas alternativas.',
  },
  {
    id: 'law-t3-dungeon-masters-4',
    priorityOrder: 19,
    tier: 3,
    tierMinPoints: 15,
    name: 'Maestro de las mazmorras IV',
    nameEn: 'Dungeon Masters IV',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Aumenta el crecimiento semanal en +1 Minotauro (Tier 4) y +1 Medusa (Tier 5) en todas las ciudades.',
        tacticalImpact: 'Flujo constante de tropas intermedias y pesadas.',
        recommendedUnlockTime: 'Día 15 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 15 (Semana 3 - Lunes) - Al iniciar la Semana 3',
    effect: 'Aumenta el crecimiento semanal en +1 Minotauro (Tier 4) y +1 Medusa (Tier 5) en todas las ciudades.',
    tacticalImpact: 'Garantiza un flujo constante de tropas de Tier 4 y Tier 5 para reforzar el frente de batalla principal.',
    synergy: 'Sinergia con Laberinto y Torre de las Medusas.',
  },
  {
    id: 'law-t3-resource-riches-2',
    priorityOrder: 20,
    tier: 3,
    tierMinPoints: 15,
    name: 'Riqueza de recursos II',
    nameEn: 'Resource Riches II',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Otorga una dotación instantánea de +7.500 de Oro, +8 Gemas, +4 Mercurio y +15 Mineral.',
        tacticalImpact: 'Inyección financiera masiva que asegura la compra inmediata de moradas de Tier 6 (Hidras).',
        recommendedUnlockTime: 'Día 14-16 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 14-16 (Semana 3) - Para financiar Hogar ctónico y Dragones',
    effect: 'Otorga una dotación instantánea de +7.500 de Oro, +8 Gemas, +4 Mercurio y +15 Mineral.',
    tacticalImpact: 'Inyección financiera masiva que asegura la compra inmediata de moradas de Tier 6 y Tier 7.',
    synergy: 'Acelera el salto a Hidras y Dragones de Cueva.',
  },
  {
    id: 'law-t3-or-no-ore',
    priorityOrder: 21,
    tier: 3,
    tierMinPoints: 15,
    name: '¿Sin mineral?',
    nameEn: 'Or No Ore?',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Reduce el coste de Mineral necesario para construir edificios en un 30% en todas las ciudades.',
        tacticalImpact: 'Evita bloqueos por mineral en mapas subterráneos pobres en vetas férreas.',
        recommendedUnlockTime: 'Día 18 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 18 (Semana 3) - Al construir murallas, torres y mejoras avanzadas',
    effect: 'Reduce el coste de Mineral (Ore) necesario para construir edificios en las ciudades en un 30%.',
    tacticalImpact: 'Evita quedar paralizado por escasez de mineral en mapas subterráneos pobres en vetas férreas.',
    synergy: 'Sinergia con la construcción de fortalezas y murallas de asedio.',
  },
  {
    id: 'law-t3-spy-network',
    priorityOrder: 22,
    tier: 3,
    tierMinPoints: 15,
    name: 'Red de espías',
    nameEn: 'Spy Network',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Ciudad',
    costLaws: 2,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 2,
        cumulativeCost: 2,
        effect: 'Aumenta el radio de visión en la niebla de guerra de estructuras, minas y asentamientos en +3 casillas.',
        tacticalImpact: 'Alerta temprana ante aproximaciones de ejércitos rivales.',
        recommendedUnlockTime: 'Día 19 (Semana 3)'
      }
    ],
    recommendedUnlockTime: 'Día 19 (Semana 3) - Para vigilar fronteras y pasos clave',
    effect: 'Aumenta el radio de visión en la niebla de guerra de todas las estructuras externas, minas y asentamientos controlados en +3 casillas.',
    tacticalImpact: 'Proporciona alerta temprana de cualquier ejército enemigo que intente aproximarse a tus dominios.',
    synergy: 'Sinergia con Taberna y hechizo Portal a la Ciudad.',
  },

  // =======================================================================
  // TIER 4 (DESBLOQUEADO A LOS 30 PUNTOS DE FACCIÓN)
  // =======================================================================
  {
    id: 'law-t4-triumvirate-agents',
    priorityOrder: 23,
    tier: 4,
    tierMinPoints: 30,
    name: 'Agentes del Triunvirato',
    nameEn: 'Triumvirate\'s Agents',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Militar',
    costLaws: 3,
    maxLevel: 2,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: '+1 permanente a todos los atributos primarios (Ataque, Defensa, Poder Mágico y Conocimiento).',
        tacticalImpact: 'Bufo global supremo a todos los comandantes para la ofensiva central.',
        recommendedUnlockTime: 'Día 22-24 (Semana 4)'
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 6,
        effect: '+2 permanente a todos los atributos primarios y +10% iniciativa de lanzamiento de hechizos en Turno 1.',
        tacticalImpact: 'Lanzas conjuros antes que los hechiceros rivales en el primer turno.',
        recommendedUnlockTime: 'Día 28 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 22-24 (Semana 4) - Antes de la gran batalla por el centro del mapa',
    effect: 'Otorga a todos los héroes de Mazmorra +1 permanente a todos sus atributos primarios (Ataque, Defensa, Poder Mágico y Conocimiento).',
    tacticalImpact: 'Bufo global que potencia tanto el daño militar como el poder arcano de todos tus comandantes.',
    synergy: 'Sinergia con Zakron, Enatee, Aguijón y todos los héroes de facción.',
  },
  {
    id: 'law-t4-hydras',
    priorityOrder: 24,
    tier: 4,
    tierMinPoints: 30,
    name: 'Hidras de élite',
    nameEn: 'Elite Hydras',
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
        effect: 'Hidras infligen 1.5x daño con Estilo (360º sin represalia), +1 Velocidad y +25 PS.',
        tacticalImpact: 'Picadora de carne al teletransportarlas en medio del ejército enemigo.',
        recommendedUnlockTime: 'Día 22 (Semana 4)'
      },
      {
        level: 2,
        costLaws: 3,
        cumulativeCost: 6,
        effect: 'Hidras infligen 2.0x daño con Estilo, +2 Velocidad, +50 PS, regeneran 10% de PS cada turno y reducen 30% la armadura enemiga.',
        tacticalImpact: 'Autosuficiencia en combates multitudinarios prolongados y devastación de formaciones cerradas.',
        recommendedUnlockTime: 'Día 29 (Semana 5)'
      }
    ],
    recommendedUnlockTime: 'Día 22 (Semana 4) - Al desplegar Hidras Ctónicas / Infernales',
    effect: 'Las Hidras infligen 1.5x de daño con su Estilo de Lucha (Ataque a todos los enemigos circundantes sin represalia), ganan +1 Velocidad y +25 PS.',
    tacticalImpact: 'Convierte a las Hidras en una picadora de carne implacable al teletransportarlas en medio del ejército enemigo.',
    synergy: 'Sinergia brutal con el hechizo Teletransporte y Postura Defensiva.',
  },
  {
    id: 'law-t4-dungeon-masters-5',
    priorityOrder: 25,
    tier: 4,
    tierMinPoints: 30,
    name: 'Maestro de las mazmorras V',
    nameEn: 'Dungeon Masters V',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Aumenta el crecimiento semanal en +1 Medusa (Tier 5) y +1 Hidra (Tier 6) en todas las ciudades.',
        tacticalImpact: 'Duplica la reposición de tropas pesadas para grandes batallas campales.',
        recommendedUnlockTime: 'Día 22 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 22 (Semana 4 - Lunes) - Al iniciar la Semana 4',
    effect: 'Aumenta el crecimiento semanal en +1 Medusa (Tier 5) y +1 Hidra (Tier 6) en las ciudades de Mazmorra.',
    tacticalImpact: 'Duplica la tasa de reposición de tropas pesadas para las grandes batallas campales.',
    synergy: 'Sinergia con Hogar ctónico II y Torre de las Medusas.',
  },
  {
    id: 'law-t4-dungeon-masters-6',
    priorityOrder: 26,
    tier: 4,
    tierMinPoints: 30,
    name: 'Maestro de las mazmorras VI',
    nameEn: 'Dungeon Masters VI',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Aumenta el crecimiento semanal en +1 Hidra adicional (Tier 6) por semana en la capital de Mazmorra.',
        tacticalImpact: 'Masa crítica de Hidras capaz de resistir y barrer asedios simultáneos.',
        recommendedUnlockTime: 'Día 25 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 25 (Semana 4) - Para acumular Hidras de choque',
    effect: 'Aumenta el crecimiento semanal en +1 Hidra adicional (Tier 6) por semana en la capital de Mazmorra.',
    tacticalImpact: 'Permite acumular una masa crítica de Hidras capaz de resistir y barrer asedios simultáneos.',
    synergy: 'Sinergia con Castillo fortificado y Reclutamiento.',
  },
  {
    id: 'law-t4-alchemists-code-2',
    priorityOrder: 27,
    tier: 4,
    tierMinPoints: 30,
    name: 'Código del alquimista II',
    nameEn: 'Alchemist\'s Code II',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Permite transmutar 5 Madera/Mineral en 1 Gema o 1 Polvo Alquímico una vez al día en cada ciudad.',
        tacticalImpact: 'Garantiza suministro de gemas para invocar Dragones y comprar hechizos de Nivel 5.',
        recommendedUnlockTime: 'Día 26-28 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 26-28 (Semana 4) - Para transmutación avanzada de gemas',
    effect: 'Permite transmutar libremente 5 unidades de Madera/Mineral en 1 Gema o 1 Polvo Alquímico una vez por día en cada ciudad.',
    tacticalImpact: 'Garantiza suministro inagotable de gemas para invocar Dragones y comprar hechizos de Nivel 5.',
    synergy: 'Sinergia con Silo alquímico y Palacio de cueva.',
  },
  {
    id: 'law-t4-merchants-guild',
    priorityOrder: 28,
    tier: 4,
    tierMinPoints: 30,
    name: 'Gremio de mercaderes',
    nameEn: 'Merchants Guild',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: 'Establece tasas de intercambio óptimas fijas (1:1.2) en el mercado y genera +500 Oro diario por cada mercado.',
        tacticalImpact: 'Comercio justo y conversión instantánea de recursos a oro.',
        recommendedUnlockTime: 'Día 27 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 27 (Semana 4) - Al gobernar múltiples ciudades',
    effect: 'Establece tasas de intercambio óptimas fijas (1:1.2) en el mercado y genera +500 Oro diario por cada mercado construido en tu reino.',
    tacticalImpact: 'Permite comprar y convertir recursos a discreción sin pérdida patrimonial.',
    synergy: 'Sinergia con expansión territorial y múltiples mercados.',
  },
  {
    id: 'law-t4-peoples-jadame',
    priorityOrder: 29,
    tier: 4,
    tierMinPoints: 30,
    name: 'Pueblos de Jadame',
    nameEn: 'Peoples of Jadame',
    category: 'Héroes & Jadame',
    branch: 'Héroes & Jadame',
    branchType: 'Ciudad',
    costLaws: 3,
    maxLevel: 1,
    ranks: [
      {
        level: 1,
        costLaws: 3,
        cumulativeCost: 3,
        effect: '+15% poder de persuasión en Diplomacia y reduce el coste de soborno de tropas neutrales a la mitad.',
        tacticalImpact: 'Incorpora pilas neutrales de monstruos a tu ejército sin combatir.',
        recommendedUnlockTime: 'Día 28 (Semana 4)'
      }
    ],
    recommendedUnlockTime: 'Día 28 (Semana 4) - Para absorber neutrales del mapa',
    effect: 'Aumenta el poder de persuasión en Diplomacia de los héroes en un +15% y reduce el coste de soborno de neutrales a la mitad.',
    tacticalImpact: 'Permite incorporar pilas neutrales de monstruos a tu ejército sin combatir.',
    synergy: 'Sinergia máxima con el héroe Ylwari (Persuasión de las Cavernas) y Diplomacia.',
  },

  // =======================================================================
  // TIER 5 (DESBLOQUEADO A LOS 50 PUNTOS DE FACCIÓN - LEYES MAESTRAS)
  // =======================================================================
  {
    id: 'law-t5-dragons',
    priorityOrder: 30,
    tier: 5,
    tierMinPoints: 50,
    name: 'Dragones de cueva de élite',
    nameEn: 'Elite Cave Dragons',
    category: 'Militar',
    branch: 'Militar',
    branchType: 'Militar',
    costLaws: 4,
    maxLevel: 2,
    isUltimate: true,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: 'Dragones infligen 1.5x daño con Estilo (Aliento Flamígero), +2 Velocidad, +50 PS y +5 Ataque/Defensa.',
        tacticalImpact: 'Fuerza aérea definitiva inmune a magia de Nivel 1-5 con daño en línea de 2 casillas.',
        recommendedUnlockTime: 'Día 35+ (Semana 5-6)'
      },
      {
        level: 2,
        costLaws: 4,
        cumulativeCost: 8,
        effect: 'Dragones infligen 2.0x daño con Estilo, +3 Velocidad, +100 PS, +10 Ataque/Defensa y Resplandor del Dragón (+2 Moral a tropas aliadas).',
        tacticalImpact: 'Dragones Negros capaces de barrer un ejército rival entero en 2 turnos.',
        recommendedUnlockTime: 'Día 45+ (Mes 2)'
      }
    ],
    recommendedUnlockTime: 'Día 35+ (Semana 5-6 / Mes 2) - Culminación militar',
    effect: 'Los Dragones de Cueva / Negros infligen 1.5x de daño con su Estilo de Lucha (Aliento Flamígero en línea), ganan +2 Velocidad, +50 PS y +5 Ataque y Defensa.',
    tacticalImpact: 'Convierte a los Dragones Negros en la fuerza aérea definitiva: inmunes a magia de Nivel 1-5 y con daño devastador.',
    synergy: 'Combo definitivo de Drago-Armageddon con Zakron o Lodos.',
  },
  {
    id: 'law-t5-dungeon-masters-7',
    priorityOrder: 31,
    tier: 5,
    tierMinPoints: 50,
    name: 'Maestro de las mazmorras VII',
    nameEn: 'Dungeon Masters VII',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 4,
    maxLevel: 1,
    isUltimate: true,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: '+1 Dragón de Cueva (Tier 7) adicional por semana en la capital de Mazmorra.',
        tacticalImpact: 'Permite reclutar 2 a 3 Dragones Negros por semana superando a cualquier rival.',
        recommendedUnlockTime: 'Día 35+ (Semana 5-6)'
      }
    ],
    recommendedUnlockTime: 'Día 35+ (Semana 5-6) - Multiplicación de Tier 7',
    effect: 'Aumenta el crecimiento semanal en +1 Dragón de Cueva (Tier 7) adicional por semana en la capital de Mazmorra.',
    tacticalImpact: 'Permite reclutar 2 a 3 Dragones Negros por semana, superando en volumen a cualquier ejército rival.',
    synergy: 'Sinergia con Palacio de cueva II y Granja de Dragones.',
  },
  {
    id: 'law-t5-resource-riches-3',
    priorityOrder: 32,
    tier: 5,
    tierMinPoints: 50,
    name: 'Riqueza de recursos III',
    nameEn: 'Resource Riches III',
    category: 'Economía',
    branch: 'Economía',
    branchType: 'Ciudad',
    costLaws: 4,
    maxLevel: 1,
    isUltimate: true,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: 'Dotación instantánea de +20.000 de Oro, +20 Gemas, +8 Mercurio, +8 Cristal y +25 Madera/Mineral.',
        tacticalImpact: 'Financia la compra de todas las reservas acumuladas en todas tus ciudades.',
        recommendedUnlockTime: 'Día 40+ (Mes 2)'
      }
    ],
    recommendedUnlockTime: 'Día 40+ (Mes 2) - Inyección final de guerra',
    effect: 'Otorga una dotación instantánea de +20.000 de Oro, +20 Gemas, +8 Mercurio, +8 Cristal y +25 Madera y Mineral.',
    tacticalImpact: 'Financia la compra de todas las reservas de criaturas acumuladas en todas tus ciudades para la ofensiva definitiva.',
    synergy: 'Sinergia con reclutamiento masivo en múltiples plazas.',
  },
  {
    id: 'law-t5-magical-education',
    priorityOrder: 33,
    tier: 5,
    tierMinPoints: 50,
    name: 'Educación mágica',
    nameEn: 'Magical Education',
    category: 'Mágica',
    branch: 'Mágica',
    branchType: 'Militar',
    costLaws: 4,
    maxLevel: 2,
    isUltimate: true,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: 'Todos los hechizos lanzados ganan automáticamente +1 Nivel de efectividad (Nivel 1 -> Nivel 2; Nivel 4 -> Nivel 5).',
        tacticalImpact: 'Convierte hechizos estándar en cataclismos arcanos devastadores.',
        recommendedUnlockTime: 'Día 38+ (Mes 2)'
      },
      {
        level: 2,
        costLaws: 4,
        cumulativeCost: 8,
        effect: 'Todos los hechizos ganan +1 Nivel de efectividad, reduce el coste de maná en un 25% y permite lanzar 2 hechizos en el Turno 1.',
        tacticalImpact: 'Doble cataclismo arcano inicial antes de que el enemigo mueva ficha.',
        recommendedUnlockTime: 'Día 47+ (Mes 2)'
      }
    ],
    recommendedUnlockTime: 'Día 38+ (Mes 2) - Culminación mágica',
    effect: 'Todos los hechizos lanzados por tus héroes ganan automáticamente +1 Nivel de efectividad (los hechizos de Nivel 1 actúan como Nivel 2; los de Nivel 4 como Nivel 5).',
    tacticalImpact: 'Potencia todo el repertorio del grimorio, convirtiendo hechizos estándar en cataclismos arcanos devastadores.',
    synergy: 'Sinergia con Zakron, Cofradía de Magos V y Hechicería Experta.',
  },
  {
    id: 'law-t5-saturation',
    priorityOrder: 34,
    tier: 5,
    tierMinPoints: 50,
    name: 'Saturación',
    nameEn: 'Saturation',
    category: 'Mágica',
    branch: 'Mágica',
    branchType: 'Militar',
    costLaws: 4,
    maxLevel: 2,
    isUltimate: true,
    ranks: [
      {
        level: 1,
        costLaws: 4,
        cumulativeCost: 4,
        effect: '+50 Maná máx., 50% regeneración de maná postcombate y +20% daño mágico directo.',
        tacticalImpact: 'Maná inagotable para encadenar batallas contra múltiples héroes.',
        recommendedUnlockTime: 'Día 42+ (Mes 2)'
      },
      {
        level: 2,
        costLaws: 4,
        cumulativeCost: 8,
        effect: '+100 Maná máx., 75% regeneración postcombate, +35% daño mágico y regenera 10 Maná al inicio de cada ronda de combate.',
        tacticalImpact: 'Poder de fuego arcano destructivo sin límite alguno de recursos.',
        recommendedUnlockTime: 'Día 50+ (Mes 2)'
      }
    ],
    recommendedUnlockTime: 'Día 42+ (Mes 2) - Maná infinito y daño arcano supremo',
    effect: 'Aumenta la reserva máxima de maná en +50, regenera el 50% del maná gastado tras cada combate y amplifica el daño mágico en un +20%.',
    tacticalImpact: 'Garantiza maná inagotable para encadenar batallas contra múltiples héroes enemigos sin pausa.',
    synergy: 'Sinergia con Armageddon, Cadena de Relámpagos y Lodos.',
  },
];

// Presets tácticos canónicos adaptados al sistema riguroso de niveles reales
export const FACTION_LAW_PRESETS: FactionLawPreset[] = [

  {
    id: 'preset-drago-armageddon',
    name: 'Meta Drago-Armageddon Supremo (50 Pts)',
    description: 'Enfocado en limpieza temprana con tropas básicas, escalado económico veloz a Capitolio y salto a Dragones Negros Nv. 2 con Educación Mágica Nv. 2 y Saturación Nv. 2.',
    strategyFocus: 'Optimización de daño arcano masivo con Dragones Negros inmunes a hechizos y spam de cataclismos elementales.',
    totalCost: 50,
    tag: 'Meta Mágico & Dragones',
    enactedLawIds: [
      'law-t1-leaders-nation',
      'law-t1-troglodytes',
      'law-t1-arcane-knowledge',
      'law-t1-dragon-scales',
      'law-t2-tax-collectors',
      'law-t2-mining-gems',
      'law-t3-jadame-maps',
      'law-t3-tactical-advantage',
      'law-t4-triumvirate-agents',
      'law-t4-alchemists-code-2',
      'law-t5-dragons',
      'law-t5-magical-education',
      'law-t5-saturation',
    ],
    lawLevels: {
      'law-t1-troglodytes': 2,        // 4 Pts (2 * 2)
      'law-t1-arcane-knowledge': 1,   // 2 Pts
      'law-t1-dragon-scales': 2,      // 4 Pts (2 * 2)
      'law-t1-leaders-nation': 1,     // 3 Pts (+15% EXP de héroes)
      'law-t2-tax-collectors': 2,     // 4 Pts (2 * 2)
      'law-t2-mining-gems': 2,        // 4 Pts (2 * 2)
      'law-t3-jadame-maps': 1,        // 2 Pts
      'law-t3-tactical-advantage': 1, // 2 Pts
      'law-t4-triumvirate-agents': 2, // 6 Pts (2 * 3)
      'law-t4-alchemists-code-2': 1,  // 3 Pts
      'law-t5-dragons': 1,            // 4 Pts
      'law-t5-magical-education': 2,  // 8 Pts (costLaws 4 rank 2 = 8: Doble lanzamiento de hechizos Turno 1)
      'law-t5-saturation': 1,         // 4 Pts (costLaws 4 rank 1 = 4)
      // 4+2+4+3+4+4+2+2+6+3+4+8+4 = 50 Pts exactos!
    },
    sequenceSteps: [
      { lawId: 'law-t1-troglodytes', targetLevel: 1, stepName: 'Trogloditas de élite (Nv. 1)', notes: 'Día 1: Daño y aguante para limpiar mapas neutrales sin bajas (2 Sellos)' },
      { lawId: 'law-t1-arcane-knowledge', targetLevel: 1, stepName: 'Conocimiento arcano (Nv. 1)', notes: 'Día 3: +20 Maná para lanzar hechizos de daño en combates neutrales (2 Sellos)' },
      { lawId: 'law-t1-troglodytes', targetLevel: 2, stepName: 'Trogloditas de élite (Nv. 2)', notes: 'Día 6: Daño 2.0x y +2 Ataque para afianzar creeping (2 Sellos)' },
      { lawId: 'law-t2-tax-collectors', targetLevel: 1, stepName: 'Recaudadores de impuestos (Nv. 1)', notes: 'Día 8 (Semana 2): +20% Oro municipal para comprar tropas (2 Sellos)' },
      { lawId: 'law-t2-mining-gems', targetLevel: 1, stepName: 'Minería: Gemas (Nv. 1)', notes: 'Día 9: Flujo de gemas para Cofradía de Magos e Hidras (2 Sellos)' },
      { lawId: 'law-t2-tax-collectors', targetLevel: 2, stepName: 'Recaudadores de impuestos (Nv. 2)', notes: 'Día 11: +40% Oro municipal para asegurar Capitolio (2 Sellos)' },
      { lawId: 'law-t2-mining-gems', targetLevel: 2, stepName: 'Minería: Gemas (Nv. 2)', notes: 'Día 13: +2 Gemas/día para Palacio de Cueva (2 Sellos)' },
      { lawId: 'law-t3-jadame-maps', targetLevel: 1, stepName: 'Mapas de Jadame (Nv. 1)', notes: 'Día 15 (Semana 3): +10 Movimiento para controlar el centro del mapa (2 Sellos)' },
      { lawId: 'law-t1-dragon-scales', targetLevel: 1, stepName: 'Escamas de dragón (Nv. 1)', notes: 'Día 17: Primer contacto con héroes rivales; -5% daño mágico (2 Sellos)' },
      { lawId: 'law-t3-tactical-advantage', targetLevel: 1, stepName: 'Ventaja táctica (Nv. 1)', notes: 'Día 18: Flexibilidad de posturas tácticas en duelo de héroes (2 Sellos)' },
      { lawId: 'law-t1-dragon-scales', targetLevel: 2, stepName: 'Escamas de dragón (Nv. 2)', notes: 'Día 20: -10% daño mágico y +1 Defensa permanente (2 Sellos)' },
      { lawId: 'law-t3-tactical-advantage', targetLevel: 2, stepName: 'Ventaja táctica (Nv. 2)', notes: 'Día 21: Daño pleno en todas las posturas de combate (2 Sellos)' },
      { lawId: 'law-t4-triumvirate-agents', targetLevel: 1, stepName: 'Agentes del Triunvirato (Nv. 1)', notes: 'Día 23: +1 a todos los atributos primarios de todos los héroes (3 Sellos)' },
      { lawId: 'law-t4-alchemists-code-2', targetLevel: 1, stepName: 'Código del alquimista II (Nv. 1)', notes: 'Día 26: Transmutación diaria de gemas y polvos (3 Sellos)' },
      { lawId: 'law-t4-triumvirate-agents', targetLevel: 2, stepName: 'Agentes del Triunvirato (Nv. 2)', notes: 'Día 28: +2 a atributos primarios e iniciativa en Turno 1 (3 Sellos)' },
      { lawId: 'law-t5-dragons', targetLevel: 1, stepName: 'Dragones de cueva de élite (Nv. 1)', notes: 'Día 35: Dragones Negros con 1.5x daño y aliento en línea (4 Sellos)' },
      { lawId: 'law-t5-magical-education', targetLevel: 1, stepName: 'Educación mágica (Nv. 1)', notes: 'Día 38: Todos los hechizos ascienden +1 Nivel de poder (4 Sellos)' },
      { lawId: 'law-t5-saturation', targetLevel: 1, stepName: 'Saturación (Nv. 1)', notes: 'Día 42: +50 Maná y +20% daño mágico directo (4 Sellos)' },
      { lawId: 'law-t5-saturation', targetLevel: 2, stepName: 'Saturación (Nv. 2)', notes: 'Día 48: Regeneración masiva en cada ronda de combate (4 Sellos)' },
    ]
  },
  {
    id: 'preset-fast-capitol-wealth',
    name: 'Dominio Económico & Crecimiento (50 Pts)',
    description: 'Prioriza la acumulación masiva de oro, transmutación de recursos raros y leyes de crecimiento para inundar el mapa con ejércitos de élite continuos.',
    strategyFocus: 'Monopolio de tesorería, producción masiva de infantería y dominio del mercado con Capitolio temprano.',
    totalCost: 50,
    tag: 'Economía & Horda',
    enactedLawIds: [
      'law-t1-resource-riches-1',
      'law-t1-dungeon-masters-1',
      'law-t1-leaders-nation',
      'law-t2-tax-collectors',
      'law-t2-mining-gems',
      'law-t2-dungeon-masters-2',
      'law-t2-dungeon-masters-3',
      'law-t3-jadame-maps',
      'law-t3-resource-riches-2',
      'law-t3-dungeon-masters-4',
      'law-t3-or-no-ore',
      'law-t4-dungeon-masters-5',
      'law-t4-dungeon-masters-6',
      'law-t4-merchants-guild',
      'law-t4-triumvirate-agents',
      'law-t5-dungeon-masters-7',
      'law-t5-resource-riches-3',
    ],
    lawLevels: {
      'law-t1-resource-riches-1': 1, // 2 Pts
      'law-t1-dungeon-masters-1': 1, // 2 Pts
      'law-t1-leaders-nation': 1,    // 3 Pts
      'law-t2-tax-collectors': 2,    // 4 Pts (2 * 2)
      'law-t2-mining-gems': 2,       // 4 Pts (2 * 2)
      'law-t2-dungeon-masters-2': 1, // 2 Pts
      'law-t2-dungeon-masters-3': 1, // 2 Pts
      'law-t3-jadame-maps': 1,        // 2 Pts (+10 Movilidad para caravanas y logística)
      'law-t3-resource-riches-2': 1, // 3 Pts
      'law-t3-dungeon-masters-4': 1, // 2 Pts
      'law-t3-or-no-ore': 1,         // 2 Pts
      'law-t4-dungeon-masters-5': 1, // 3 Pts
      'law-t4-dungeon-masters-6': 1, // 3 Pts
      'law-t4-merchants-guild': 1,   // 3 Pts
      'law-t4-triumvirate-agents': 1,// 3 Pts (+1 Atributos primarios para todos los héroes comerciales)
      'law-t5-dungeon-masters-7': 1, // 4 Pts
      'law-t5-resource-riches-3': 1, // 4 Pts
      // Suma total: 2+2+3+4+4+2+2+2+3+2+2+3+3+3+3+4+4 = 48 -> +1 Líderes de la Nación Nv 2 (+3) = 49 + 1 (50)
      'law-t1-dragon-scales': 1,      // 2 Pts (48 + 2 = 50 Pts exactos)
    },
    sequenceSteps: [
      { lawId: 'law-t1-resource-riches-1', targetLevel: 1, stepName: 'Riqueza de recursos I (Nv. 1)', notes: 'Día 2: +3.000 Oro, +10 Madera y +10 Mineral para Ayuntamiento (2 Sellos)' },
      { lawId: 'law-t1-dungeon-masters-1', targetLevel: 1, stepName: 'Maestro de las mazmorras I (Nv. 1)', notes: 'Día 4: +4 Trogloditas y +2 Infiltradores semanales (2 Sellos)' },
      { lawId: 'law-t1-leaders-nation', targetLevel: 1, stepName: 'Líderes de la nación (Nv. 1)', notes: 'Día 6: +15% EXP para acelerar nivel del héroe principal (3 Sellos)' },
      { lawId: 'law-t2-tax-collectors', targetLevel: 1, stepName: 'Recaudadores de impuestos (Nv. 1)', notes: 'Día 8: +20% Oro municipal diario (2 Sellos)' },
      { lawId: 'law-t2-mining-gems', targetLevel: 1, stepName: 'Minería: Gemas (Nv. 1)', notes: 'Día 10: +1 Gema diaria pasiva (2 Sellos)' },
      { lawId: 'law-t2-tax-collectors', targetLevel: 2, stepName: 'Recaudadores de impuestos (Nv. 2)', notes: 'Día 12: +40% Oro para Capitolio (2 Sellos)' },
      { lawId: 'law-t2-dungeon-masters-2', targetLevel: 1, stepName: 'Maestro de las mazmorras II (Nv. 1)', notes: 'Día 13: +2 Infiltradores y +2 Danzantes semanales (2 Sellos)' },
      { lawId: 'law-t2-dungeon-masters-3', targetLevel: 1, stepName: 'Maestro de las mazmorras III (Nv. 1)', notes: 'Día 14: +2 Danzantes y +1 Minotauro semanales (2 Sellos)' },
      { lawId: 'law-t2-mining-gems', targetLevel: 2, stepName: 'Minería: Gemas (Nv. 2)', notes: 'Día 15: +2 Gemas/día pasivas (2 Sellos)' },
      { lawId: 'law-t3-resource-riches-2', targetLevel: 1, stepName: 'Riqueza de recursos II (Nv. 1)', notes: 'Día 16: +7.500 Oro y +8 Gemas instantáneas (3 Sellos)' },
      { lawId: 'law-t3-dungeon-masters-4', targetLevel: 1, stepName: 'Maestro de las mazmorras IV (Nv. 1)', notes: 'Día 17: +1 Minotauro y +1 Medusa semanales (2 Sellos)' },
      { lawId: 'law-t3-or-no-ore', targetLevel: 1, stepName: '¿Sin mineral? (Nv. 1)', notes: 'Día 18: -30% coste de mineral en edificios (2 Sellos)' },
      { lawId: 'law-t4-dungeon-masters-5', targetLevel: 1, stepName: 'Maestro de las mazmorras V (Nv. 1)', notes: 'Día 22: +1 Medusa y +1 Hidra semanales (3 Sellos)' },
      { lawId: 'law-t4-dungeon-masters-6', targetLevel: 1, stepName: 'Maestro de las mazmorras VI (Nv. 1)', notes: 'Día 24: +1 Hidra extra en capital (3 Sellos)' },
      { lawId: 'law-t4-merchants-guild', targetLevel: 1, stepName: 'Gremio de mercaderes (Nv. 1)', notes: 'Día 27: Tasas de mercado óptimas 1:1.2 y +500g/día (3 Sellos)' },
      { lawId: 'law-t5-dungeon-masters-7', targetLevel: 1, stepName: 'Maestro de las mazmorras VII (Nv. 1)', notes: 'Día 35: +1 Dragón de Cueva semanal en capital (4 Sellos)' },
      { lawId: 'law-t5-resource-riches-3', targetLevel: 1, stepName: 'Riqueza de recursos III (Nv. 1)', notes: 'Día 40: +20.000 Oro y +20 Gemas instantáneas (4 Sellos)' },
    ]
  },
  {
    id: 'preset-shadow-blitz',
    name: 'Asalto Sombrío & Vanguardia de Élite (50 Pts)',
    description: 'Especializado en la máxima letalidad de criaturas de Mazmorra (Infiltradores, Danzantes, Minotauros, Medusas e Hidras) con saltos tácticos y control de posturas.',
    strategyFocus: 'Ataques relámpago con tropas de asalto potenciadas, venenos sombríos y combate cuerpo a cuerpo sin penalización.',
    totalCost: 50,
    tag: 'Táctico & Criaturas',
    enactedLawIds: [
      'law-t1-troglodytes',
      'law-t1-dragon-scales',
      'law-t2-infiltrators',
      'law-t2-dancers',
      'law-t3-jadame-maps',
      'law-t3-minotaurs',
      'law-t3-medusae',
      'law-t3-tactical-advantage',
      'law-t4-hydras',
      'law-t4-triumvirate-agents',
      'law-t5-dragons',
    ],
    lawLevels: {
      'law-t1-troglodytes': 2,        // 4 Pts (2 * 2)
      'law-t1-dragon-scales': 2,      // 4 Pts (2 * 2)
      'law-t2-infiltrators': 2,       // 4 Pts (2 * 2)
      'law-t2-dancers': 2,            // 4 Pts (2 * 2)
      'law-t3-jadame-maps': 1,        // 2 Pts
      'law-t3-minotaurs': 2,          // 4 Pts (2 * 2)
      'law-t3-medusae': 2,            // 4 Pts (2 * 2)
      'law-t3-tactical-advantage': 2, // 4 Pts (2 * 2)
      'law-t4-hydras': 2,             // 6 Pts (2 * 3)
      'law-t4-triumvirate-agents': 2, // 6 Pts (2 * 3)
      'law-t5-dragons': 2,            // 8 Pts (2 * 4)
    },
    sequenceSteps: [
      { lawId: 'law-t1-troglodytes', targetLevel: 1, stepName: 'Trogloditas de élite (Nv. 1)', notes: 'Día 1: Daño x1.5 para creeping veloz (2 Sellos)' },
      { lawId: 'law-t1-troglodytes', targetLevel: 2, stepName: 'Trogloditas de élite (Nv. 2)', notes: 'Día 5: Daño x2.0 y aguante físico (2 Sellos)' },
      { lawId: 'law-t2-infiltrators', targetLevel: 1, stepName: 'Infiltradores de élite (Nv. 1)', notes: 'Día 8: Salto Sombrío x1.5 daño tras tiradores (2 Sellos)' },
      { lawId: 'law-t2-dancers', targetLevel: 1, stepName: 'Danzantes de élite (Nv. 1)', notes: 'Día 10: Doble Golpe x1.5 daño (2 Sellos)' },
      { lawId: 'law-t2-infiltrators', targetLevel: 2, stepName: 'Infiltradores de élite (Nv. 2)', notes: 'Día 12: Veneno de Sombra (-2 Atq/Def) (2 Sellos)' },
      { lawId: 'law-t2-dancers', targetLevel: 2, stepName: 'Danzantes de élite (Nv. 2)', notes: 'Día 13: Evasión 20% y +2 Velocidad (2 Sellos)' },
      { lawId: 'law-t3-jadame-maps', targetLevel: 1, stepName: 'Mapas de Jadame (Nv. 1)', notes: 'Día 15: +10 Movimiento diario (2 Sellos)' },
      { lawId: 'law-t3-minotaurs', targetLevel: 1, stepName: 'Minotauros de élite (Nv. 1)', notes: 'Día 16: Minotauros con 1.5x daño y +2 daño base (2 Sellos)' },
      { lawId: 'law-t3-medusae', targetLevel: 1, stepName: 'Medusas de élite (Nv. 1)', notes: 'Día 17: Medusas con 1.5x daño y petrificación (2 Sellos)' },
      { lawId: 'law-t3-tactical-advantage', targetLevel: 1, stepName: 'Ventaja táctica (Nv. 1)', notes: 'Día 18: -25% penalización de posturas de combate (2 Sellos)' },
      { lawId: 'law-t1-dragon-scales', targetLevel: 1, stepName: 'Escamas de dragón (Nv. 1)', notes: 'Día 19: -5% daño mágico recibido (2 Sellos)' },
      { lawId: 'law-t3-minotaurs', targetLevel: 2, stepName: 'Minotauros de élite (Nv. 2)', notes: 'Día 20: 2.0x daño y aturdimiento al golpear (2 Sellos)' },
      { lawId: 'law-t3-medusae', targetLevel: 2, stepName: 'Medusas de élite (Nv. 2)', notes: 'Día 21: Mirada petrificante en melé y distancia (2 Sellos)' },
      { lawId: 'law-t3-tactical-advantage', targetLevel: 2, stepName: 'Ventaja táctica (Nv. 2)', notes: 'Día 22: Daño pleno 100% en todas las posturas (2 Sellos)' },
      { lawId: 'law-t1-dragon-scales', targetLevel: 2, stepName: 'Escamas de dragón (Nv. 2)', notes: 'Día 23: -10% daño mágico y +1 Defensa (2 Sellos)' },
      { lawId: 'law-t4-hydras', targetLevel: 1, stepName: 'Hidras de élite (Nv. 1)', notes: 'Día 24: Ataque circular 360º x1.5 daño (3 Sellos)' },
      { lawId: 'law-t4-triumvirate-agents', targetLevel: 1, stepName: 'Agentes del Triunvirato (Nv. 1)', notes: 'Día 26: +1 a todos los atributos primarios (3 Sellos)' },
      { lawId: 'law-t4-hydras', targetLevel: 2, stepName: 'Hidras de élite (Nv. 2)', notes: 'Día 29: Regeneración 10% y -30% armadura enemiga (3 Sellos)' },
      { lawId: 'law-t4-triumvirate-agents', targetLevel: 2, stepName: 'Agentes del Triunvirato (Nv. 2)', notes: 'Día 30: +2 a todos los atributos e iniciativa (3 Sellos)' },
      { lawId: 'law-t5-dragons', targetLevel: 1, stepName: 'Dragones de cueva de élite (Nv. 1)', notes: 'Día 35: Dragones con 1.5x daño y aliento en línea (4 Sellos)' },
      { lawId: 'law-t5-dragons', targetLevel: 2, stepName: 'Dragones de cueva de élite (Nv. 2)', notes: 'Día 45: Dragones con 2.0x daño y +100 PS (4 Sellos)' },
    ]
  },
  {
    id: 'preset-balanced-56day',
    name: 'Campaña Equilibrada de Jadame (50 Pts)',
    description: 'La progresión más versátil y balanceada para partidas estándar y competitivas de 2 meses: equilibrio entre economía municipal, movilidad, tropas y magia de destrucción.',
    strategyFocus: 'Flexibilidad militar y económica para adaptarse a cualquier mapa, combinando crecimiento, maná y vanguardia.',
    totalCost: 50,
    tag: 'Recomendada & Versátil',
    enactedLawIds: [
      'law-t1-troglodytes',
      'law-t1-dungeon-masters-1',
      'law-t1-arcane-knowledge',
      'law-t1-dragon-scales',
      'law-t2-tax-collectors',
      'law-t2-mining-gems',
      'law-t2-infiltrators',
      'law-t3-jadame-maps',
      'law-t3-medusae',
      'law-t3-tactical-advantage',
      'law-t4-triumvirate-agents',
      'law-t4-hydras',
      'law-t5-dragons',
      'law-t5-magical-education',
    ],
    lawLevels: {
      'law-t1-troglodytes': 2,        // 4 Pts (2 * 2)
      'law-t1-dungeon-masters-1': 1,  // 2 Pts
      'law-t1-arcane-knowledge': 1,   // 2 Pts
      'law-t1-dragon-scales': 2,      // 4 Pts (2 * 2)
      'law-t2-tax-collectors': 2,     // 4 Pts (2 * 2)
      'law-t2-mining-gems': 2,        // 4 Pts (2 * 2)
      'law-t2-infiltrators': 2,       // 4 Pts (2 * 2)
      'law-t3-jadame-maps': 1,        // 2 Pts
      'law-t3-medusae': 1,            // 2 Pts
      'law-t3-tactical-advantage': 1, // 2 Pts
      'law-t4-triumvirate-agents': 2, // 6 Pts (2 * 3)
      'law-t4-hydras': 2,             // 6 Pts (2 * 3)
      'law-t5-dragons': 1,            // 4 Pts
      'law-t5-magical-education': 1,  // 4 Pts
    },
    sequenceSteps: [
      { lawId: 'law-t1-troglodytes', targetLevel: 1, stepName: 'Trogloditas de élite (Nv. 1)', notes: 'Día 1: Daño base 1-2 y x1.5 estilo de lucha (2 Sellos)' },
      { lawId: 'law-t1-arcane-knowledge', targetLevel: 1, stepName: 'Conocimiento arcano (Nv. 1)', notes: 'Día 3: +20 Maná para hechizos en mapa (2 Sellos)' },
      { lawId: 'law-t1-dungeon-masters-1', targetLevel: 1, stepName: 'Maestro de las mazmorras I (Nv. 1)', notes: 'Día 5: +4 Trogloditas y +2 Infiltradores semanales (2 Sellos)' },
      { lawId: 'law-t1-troglodytes', targetLevel: 2, stepName: 'Trogloditas de élite (Nv. 2)', notes: 'Día 6: x2.0 daño y +2 Ataque (2 Sellos)' },
      { lawId: 'law-t2-tax-collectors', targetLevel: 1, stepName: 'Recaudadores de impuestos (Nv. 1)', notes: 'Día 8: +20% Oro municipal para comprar tropas (2 Sellos)' },
      { lawId: 'law-t2-mining-gems', targetLevel: 1, stepName: 'Minería: Gemas (Nv. 1)', notes: 'Día 10: +1 Gema/día pasiva (2 Sellos)' },
      { lawId: 'law-t2-infiltrators', targetLevel: 1, stepName: 'Infiltradores de élite (Nv. 1)', notes: 'Día 11: Salto Sombrío x1.5 daño (2 Sellos)' },
      { lawId: 'law-t2-tax-collectors', targetLevel: 2, stepName: 'Recaudadores de impuestos (Nv. 2)', notes: 'Día 12: +40% Oro para asegurar Capitolio (2 Sellos)' },
      { lawId: 'law-t2-infiltrators', targetLevel: 2, stepName: 'Infiltradores de élite (Nv. 2)', notes: 'Día 13: Veneno de Sombra y +2 Velocidad (2 Sellos)' },
      { lawId: 'law-t2-mining-gems', targetLevel: 2, stepName: 'Minería: Gemas (Nv. 2)', notes: 'Día 14: +2 Gemas/día para Palacio de Cueva (2 Sellos)' },
      { lawId: 'law-t3-jadame-maps', targetLevel: 1, stepName: 'Mapas de Jadame (Nv. 1)', notes: 'Día 15: +10 Movimiento diario en el mapa (2 Sellos)' },
      { lawId: 'law-t3-medusae', targetLevel: 1, stepName: 'Medusas de élite (Nv. 1)', notes: 'Día 16: Medusas con 1.5x daño y petrificación (2 Sellos)' },
      { lawId: 'law-t1-dragon-scales', targetLevel: 1, stepName: 'Escamas de dragón (Nv. 1)', notes: 'Día 17: -5% daño mágico recibido (2 Sellos)' },
      { lawId: 'law-t3-tactical-advantage', targetLevel: 1, stepName: 'Ventaja táctica (Nv. 1)', notes: 'Día 18: -25% penalización de posturas (2 Sellos)' },
      { lawId: 'law-t4-triumvirate-agents', targetLevel: 1, stepName: 'Agentes del Triunvirato (Nv. 1)', notes: 'Día 22: +1 a todos los atributos primarios (3 Sellos)' },
      { lawId: 'law-t4-hydras', targetLevel: 1, stepName: 'Hidras de élite (Nv. 1)', notes: 'Día 24: Ataque circular 360º de Hidras (3 Sellos)' },
      { lawId: 'law-t4-triumvirate-agents', targetLevel: 2, stepName: 'Agentes del Triunvirato (Nv. 2)', notes: 'Día 28: +2 a atributos primarios e iniciativa (3 Sellos)' },
      { lawId: 'law-t5-dragons', targetLevel: 1, stepName: 'Dragones de cueva de élite (Nv. 1)', notes: 'Día 35: Dragones con 1.5x daño y aliento flamígero (4 Sellos)' },
      { lawId: 'law-t5-magical-education', targetLevel: 1, stepName: 'Educación mágica (Nv. 1)', notes: 'Día 38: Todos los hechizos ganan +1 Nivel de efecto (4 Sellos)' },
      { lawId: 'law-t5-dragons', targetLevel: 2, stepName: 'Dragones de cueva de élite (Nv. 2)', notes: 'Día 46: Dragones con 2.0x daño y +100 PS (4 Sellos)' },
    ]
  },
  {
    id: 'preset-grand-empire-endgame',
    name: 'Imperio Total de Alvar (Endgame 100 Pts Cap)',
    description: 'Simulación del límite absoluto de 100 Sellos de Ley al promulgar todas las leyes clave de Mazmorra a su máximo rango para la supremacía total en partidas extralargas.',
    strategyFocus: 'Promulgación completa de todas las leyes y tecnologías de Mazmorra para dominación total del tablero.',
    totalCost: 100,
    tag: 'Cap Máximo 100 Pts',
    enactedLawIds: FACTION_LAWS.map(l => l.id),
    lawLevels: Object.fromEntries(FACTION_LAWS.map(l => [l.id, l.maxLevel])),
  }
];
