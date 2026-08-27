import { TownStructure } from '../../types';

export const TEMPLE_STRUCTURES: TownStructure[] = [
  // =========================================================================
  // CENTRO CÍVICO & PALACIO DE GOBIERNO (TEMPLO SOLAR) - MULTI-NIVEL
  // =========================================================================
  {
    id: 'temple-solar-temple',
    name: 'Templo Solar / Palacio Cívico (Solar Temple)',
    nameEn: 'Solar Temple',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 2500, wood: 5, ore: 5 },
    prerequisites: ['Taberna (Tavern)'],
    effects: [
      'Sede principal de gobierno y centro ceremonial de la fe de la Luz.',
      'Genera oro diario para financiar ejércitos y expansiones.',
      'Se puede mejorar a lo largo de 4 niveles cívicos (Aldea -> Ayuntamiento -> Ciudadela -> Capitolio).'
    ],
    strategicTip: 'Mejora a Nivel II (Ayuntamiento Solar) en el Día 2 para acelerar el flujo de oro hacia las moradas.',
    timingRecommendation: 'Día 2-4 (Nivel II) / Semana 2 (Nivel III).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Aldea Solar (Village Hall)',
        nameEn: 'Solar Village Hall',
        cost: { gold: 0 },
        prerequisites: [],
        effects: ['Estructura civil base predeterminada.', 'Genera +500 de Oro por día.', 'Permite construir 1 edificio por turno.'],
        bonusIncome: '+500 Oro / día',
        strategicTip: 'Asentamiento inicial básico.'
      },
      {
        level: 2,
        name: 'Nivel II: Ayuntamiento Solar (Town Hall)',
        nameEn: 'Solar Town Hall',
        cost: { gold: 2500, wood: 5, ore: 5 },
        prerequisites: ['Taberna (Tavern)'],
        effects: ['Aumenta los ingresos a +1.000 de Oro por día (+500 netos).', 'Desbloquea moradas de tropas de Tier intermedio.'],
        bonusIncome: '+1.000 Oro / día',
        strategicTip: 'Construir el Día 2 o 3 para estabilizar las finanzas.'
      },
      {
        level: 3,
        name: 'Nivel III: Ciudadela Solar (City Hall)',
        nameEn: 'Solar City Hall',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel de Ciudad 9', 'Ayuntamiento Solar', 'Mercado', 'Cofradía de Magos Nivel 1', 'Fortificaciones I (Fuerte)'],
        effects: ['Aumenta los ingresos a +2.000 de Oro por día (+1.000 netos).', 'Consolida la renta necesaria para sostener tropas de Tier 5, 6 y 7.'],
        bonusIncome: '+2.000 Oro / día',
        strategicTip: 'Prioridad máxima al inicio de la Semana 2.'
      },
      {
        level: 4,
        name: 'Nivel IV: Capitolio Solar (Solar Capitol)',
        nameEn: 'Solar Capitol',
        cost: { gold: 10000, wood: 15, ore: 15 },
        prerequisites: ['Nivel de Ciudad 15', 'Ciudadela Solar', 'Fortificaciones III (Castillo)'],
        effects: ['Aumenta los ingresos a +4.000 de Oro por día (+2.000 netos).', 'Máxima potencia económica del reino. (Límite: 1 Capitolio por jugador).'],
        bonusIncome: '+4.000 Oro / día',
        strategicTip: 'Erigir en la capital durante la Semana 3 para reclutar ángeles sin descanso.'
      }
    ]
  },

  // =========================================================================
  // FORTIFICACIONES (FUERTE / CIUDADELA MILITAR / CASTILLO) - MULTI-NIVEL
  // =========================================================================
  {
    id: 'temple-fortifications',
    name: 'Fortificaciones del Templo (Fortifications)',
    nameEn: 'Fortifications',
    category: 'Fortificaciones',
    faction: 'Templo',
    cost: { gold: 1500, wood: 10, ore: 10 },
    prerequisites: [],
    effects: [
      'Sistema de defensa amurallado con murallas bendecidas y torres de ballesteros.',
      'Habilita la construcción de todas las moradas de criaturas.',
      'Se mejora a Ciudadela Militar (+50% crecimiento de tropas y catapulta) y Castillo (+100% crecimiento y 3 torres defensivas).'
    ],
    strategicTip: 'Mejorar a Ciudadela en el Día 7 de la Semana 1 para aumentar la producción de tropas del primer reset semanal.',
    timingRecommendation: 'Fuerte (Día 1) / Ciudadela (Día 7) / Castillo (Semana 2).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel I: Fuerte del Templo (Fort)',
        nameEn: 'Temple Fort',
        cost: { gold: 1500, wood: 10, ore: 10 },
        prerequisites: [],
        effects: ['Otorga murallas defensivas de piedra.', 'Habilita el mapa de asedio con foso defensivo.', 'Requisito para construir todas las moradas de criaturas.'],
        defenseBonus: 'Murallas de Asedio + Foso básico',
        growthBonus: 'Habilita producción base de criaturas',
        strategicTip: 'Construir el Día 1 si no se inicia con él.'
      },
      {
        level: 2,
        name: 'Nivel II: Ciudadela Militar (Citadel)',
        nameEn: 'Temple Citadel',
        cost: { gold: 3000, ore: 5 },
        prerequisites: ['Nivel I: Fuerte del Templo (Fort)'],
        effects: [
          'Añade una Torre Central de Catapulta con artillería pesada que dispara automáticamente cada ronda.',
          'Aumenta la producción semanal de todas las tropas de la ciudad en un +50% adicional.'
        ],
        defenseBonus: 'Torre Central de Asedio (disparo automático pesado)',
        growthBonus: '+50% Crecimiento semanal de tropas',
        strategicTip: 'Construir el Día 7 de la Semana 1 para acumular un 50% más de tropas el Día 1 de la Semana 2.'
      },
      {
        level: 3,
        name: 'Nivel III: Castillo Sagrado (Castle)',
        nameEn: 'Holy Castle',
        cost: { gold: 5000, wood: 10, ore: 10 },
        prerequisites: ['Nivel II: Ciudadela Militar (Citadel)', 'Nivel de Ciudad 12'],
        effects: [
          'Añade 2 Torres Laterales de Ballesteros suplementarias.',
          'Refuerza las murallas con más puntos de vida y ensancha el foso con agua bendita.',
          'Duplica el crecimiento de todas las criaturas de la ciudad (+100% total).'
        ],
        defenseBonus: '3 Torres Defensivas + Murallas Fortificadas + Foso Bendito',
        growthBonus: '+100% Crecimiento semanal de tropas (Duplica producción)',
        strategicTip: 'Esencial en Semana 2 o 3 para mantener superioridad numérica en masa de campeones y ángeles.'
      }
    ]
  },

  // =========================================================================
  // COFRADÍA DE MAGOS DE LA LUZ - MULTI-NIVEL (1 a 5)
  // =========================================================================
  {
    id: 'temple-mage-guild',
    name: 'Cofradía de Magos de la Luz (Mage Guild)',
    nameEn: 'Mage Guild',
    category: 'Magia & Cofradía',
    faction: 'Templo',
    cost: { gold: 2000, wood: 5, ore: 5 },
    prerequisites: [],
    effects: [
      'Gremio arcano consagrado a la magia de Luz, Fuego y Éter.',
      'Enseña hechizos progresivamente a los héroes visitantes a lo largo de 5 niveles.',
      'Recarga el maná del héroe visitante al 100% al finalizar el turno en la ciudad.'
    ],
    strategicTip: 'El Nivel 1 es requisito para la Ciudadela Solar; el Nivel 2 es requisito para el Portal Celestial (Ángeles).',
    timingRecommendation: 'Nivel 1 (Semana 1) / Nivel 2 (Día 5-6).',
    upgradeLevels: [
      {
        level: 1,
        name: 'Nivel 1: Cofradía Menor',
        nameEn: 'Mage Guild Level 1',
        cost: { gold: 2000, wood: 5, ore: 5 },
        prerequisites: [],
        effects: ['Enseña 5 hechizos de Nivel 1 (Bendición, Flecha Mágica, Escudo Sagrado, etc.).', 'Otorga Libro de Hechizos a los héroes visitantes si no lo poseen.'],
        strategicTip: 'Requisito para moradas intermedias y Ciudadela Cívica.'
      },
      {
        level: 2,
        name: 'Nivel 2: Cofradía Media',
        nameEn: 'Mage Guild Level 2',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 4 },
        prerequisites: ['Nivel 1: Cofradía Menor'],
        effects: ['Enseña 4 hechizos de Nivel 2 (Celeridad, Rayo de Luz, Curación, etc.).', 'Requisito para el Portal Celestial (Tier 7).'],
        strategicTip: 'Construir antes del Día 6 si vas a rushear Ángeles.'
      },
      {
        level: 3,
        name: 'Nivel 3: Cofradía Superior',
        nameEn: 'Mage Guild Level 3',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 6 },
        prerequisites: ['Nivel 2: Cofradía Media'],
        effects: ['Enseña 3 hechizos de Nivel 3 (Bola de Fuego, Cegar, Piel de Piedra, etc.).'],
        strategicTip: 'Otorga acceso a hechizos de control de masas cruciales.'
      },
      {
        level: 4,
        name: 'Nivel 4: Círculo de Archimago',
        nameEn: 'Mage Guild Level 4',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 8 },
        prerequisites: ['Nivel 3: Cofradía Superior'],
        effects: ['Enseña 2 hechizos de Nivel 4 (Lluvia de Meteoros, Resurrección Menor, etc.).'],
        strategicTip: 'Resurrección y hechizos de asedio devastadores.'
      },
      {
        level: 5,
        name: 'Nivel 5: Sanctasanctórum Arcana',
        nameEn: 'Mage Guild Level 5',
        cost: { gold: 1000, wood: 5, ore: 5, gems: 10 },
        prerequisites: ['Nivel 4: Círculo de Archimago'],
        effects: ['Enseña 2 hechizos de Nivel 5 de máximo poder (Resurrección Suprema, Ira Solar, etc.).'],
        strategicTip: 'Poder arcano absoluto para late-game.'
      }
    ]
  },

  // =========================================================================
  // SERVICIOS CÍVICOS & ECONOMÍA
  // =========================================================================
  {
    id: 'temple-tavern',
    name: 'Taberna Sagrada (Tavern)',
    nameEn: 'Tavern',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Aumenta la moral de las tropas de la guarnición en +1.',
      'Permite contratar nuevos héroes para explorar el mapa, recolectar recursos y liderar ejércitos.',
      'Desbloquea la Ventana de Rumores y el Ladrón de la Taberna con información de espionaje.'
    ],
    strategicTip: 'Construir el Día 1 en casi todas las aperturas para reclutar un segundo héroe recolector inmediatamente.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'temple-marketplace',
    name: 'Mercado del Templo (Marketplace)',
    nameEn: 'Marketplace',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 500, wood: 5 },
    prerequisites: [],
    effects: [
      'Permite intercambiar recursos y oro en el mercado del reino.',
      'Cada mercado adicional en tu imperio mejora las tasas de conversión.',
      'Permite enviar tributos y recursos a aliados en partidas multijugador.'
    ],
    strategicTip: 'Construir en Semana 1 para canjear recursos sobrantes por Gemas y Oro para el Portal Celestial.',
    timingRecommendation: 'Semana 1 (Día 3-5).',
  },
  {
    id: 'temple-alchemical-depot',
    name: 'Depósito Alquímico Sagrado (Alchemic Depot)',
    nameEn: 'Alchemic Depot',
    category: 'Cívica y Economía',
    faction: 'Templo',
    cost: { gold: 0, gems: 3, crystal: 3, mercury: 3 },
    prerequisites: ['Mercado del Templo (Marketplace)'],
    effects: [
      'Genera +1 Gema diaria de forma pasiva (recurso raro principal del Templo).',
      'Reduce la dependencia de minas de gemas exteriores para el mantenimiento de Ángeles y Campeones.'
    ],
    strategicTip: 'Construir tan pronto tengas 3 de cada recurso raro secundario para asegurar gemas continuas.',
    timingRecommendation: 'Semana 2.',
  },

  // =========================================================================
  // MORADAS DE CRIATURAS (TIER 1 A 7) CON MEJORAS Y DOBLE RAMA
  // =========================================================================
  {
    id: 'temple-barracks',
    name: 'Barracones (Barracks)',
    nameEn: 'Barracks',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 1,
    cost: { gold: 1250, wood: 5 },
    dwellingUpgradeCost: { gold: 1000, wood: 5 },
    prerequisites: ['Fortificaciones I (Fuerte)'],
    unitRecruitedBase: 'Miliciano (Militia)',
    unitRecruited: 'Miliciano / Espadachín de la Fe',
    unitUpgrades: {
      branchA: 'Soldado de Infantería / Escudero (Escudo reflectante y guardia de choque)',
      branchB: 'Fanático Devoto (Ataque frenético con bonificación de moral divina)',
      branchADetails: {
        unitName: 'Escudero de la Fe (Shieldbearer)',
        role: 'Tanque Protector de Línea Frontal',
        keyAbilities: ['Postura de Bloqueo (-30% daño a distancia)', 'Intercepción de Aliados'],
        statsBonus: '+2 Defensa, +3 Vida'
      },
      branchBDetails: {
        unitName: 'Fanático Devoto (Zealot Fanatic)',
        role: 'Asaltante Ofensivo Rápido',
        keyAbilities: ['Fervor Sagrado (+20% daño si la moral es alta)', 'Contraataque Feroz'],
        statsBonus: '+3 Ataque, +1 Iniciativa'
      }
    },
    effects: [
      'Recluta tropas de Tier 1 de infantería para la primera línea.',
      'Producción base: 14 unidades por semana (+50% con Ciudadela, +100% con Castillo).'
    ],
    strategicTip: 'Construcción obligatoria en Día 1 o Día 2 para iniciar la limpieza de mapas tempranos.',
    timingRecommendation: 'Día 1.',
  },
  {
    id: 'temple-shooting-range',
    name: 'Campo de Tiro (Shooting Range)',
    nameEn: 'Shooting Range',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 2,
    cost: { gold: 1750, wood: 5, ore: 5 },
    dwellingUpgradeCost: { gold: 1250, wood: 5 },
    prerequisites: ['Barracones (Barracks)'],
    unitRecruitedBase: 'Arquero Novicio (Archer)',
    unitRecruited: 'Arquero / Ballestero del Templo',
    unitUpgrades: {
      branchA: 'Tirador de Élite (Doble disparo a distancia)',
      branchB: 'Ballestero Pesado (Ignora 50% de la armadura enemiga)',
      branchADetails: {
        unitName: 'Tirador de Élite (Marksman)',
        role: 'Daño Constante a Distancia',
        keyAbilities: ['Doble Disparo en rango medio/corto', 'Ojo Avizor (+2 Alcance)'],
        statsBonus: '+2 Daño Máximo, +1 Iniciativa'
      },
      branchBDetails: {
        unitName: 'Ballestero Pesado (Heavy Crossbowman)',
        role: 'Anti-Acorazados y Destructor de Colosos',
        keyAbilities: ['Disparo Perforante (Ignora 50% armadura)', 'Disparo sin penalizador en cuerpo a cuerpo'],
        statsBonus: '+3 Ataque, +2 Defensa'
      }
    },
    effects: [
      'Recluta tropas de Tier 2 de proyectiles para hostigar a distancia.',
      'Producción base: 10 unidades por semana.'
    ],
    strategicTip: 'Esencial para limpiar criaturas neutrales lentas sin sufrir bajas tempranas.',
    timingRecommendation: 'Día 2.',
  },
  {
    id: 'temple-belfry',
    name: 'Campanario Sagrado (Belfry)',
    nameEn: 'Belfry',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 3,
    cost: { gold: 2000, ore: 5, gems: 3 },
    dwellingUpgradeCost: { gold: 1500, ore: 5, gems: 2 },
    prerequisites: ['Campo de Tiro (Shooting Range)'],
    unitRecruitedBase: 'Gárgola del Campanario / Celador (Ward)',
    unitRecruited: 'Celador Alado / Grifo',
    unitUpgrades: {
      branchA: 'Gárgola Vengativa (Contraataques infinitos y vuelo veloz)',
      branchB: 'Ángel de Piedra (Aura protectora que reduce el daño recibido por tropas adyacentes)',
      branchADetails: {
        unitName: 'Celador Vengativo (Avenging Ward)',
        role: 'Volador de Intercepción Rápida',
        keyAbilities: ['Contraataque Ilimitado', 'Inmunidad a Venenos'],
        statsBonus: '+2 Velocidad, +2 Ataque'
      },
      branchBDetails: {
        unitName: 'Custodio Pétreo (Stone Custodian)',
        role: 'Baluarte Defensivo de Apoyo',
        keyAbilities: ['Aura de Bastión (+3 Def a aliados adyacentes)', 'Piel de Mármol'],
        statsBonus: '+4 Defensa, +6 Vida'
      }
    },
    effects: [
      'Recluta criaturas voladoras de Tier 3 con alta movilidad de asedio.',
      'Producción base: 8 unidades por semana.'
    ],
    strategicTip: 'Permite saltar murallas en asedios y cazar arqueros enemigos en el Turno 1.',
    timingRecommendation: 'Día 3.',
  },
  {
    id: 'temple-monastery',
    name: 'Monasterio (Monastery)',
    nameEn: 'Monastery',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 4,
    cost: { gold: 2500, wood: 5, gems: 5 },
    dwellingUpgradeCost: { gold: 2000, gems: 3 },
    prerequisites: ['Campanario Sagrado (Belfry)', 'Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    unitRecruitedBase: 'Clérigo (Cleric)',
    unitRecruited: 'Clérigo / Monje Radiante',
    unitUpgrades: {
      branchA: 'Sacerdote Solar (Ataque a distancia que cura a aliados)',
      branchB: 'Inquisidor Marcial (Combate cuerpo a cuerpo sin penalizadores con purga de maleficios)',
      branchADetails: {
        unitName: 'Sacerdote Solar (Sun Priest)',
        role: 'Tirador y Sanador de Soporte',
        keyAbilities: ['Rayo Sanador (Cura 60 HP a aliados)', 'Disparo Sagrado'],
        statsBonus: '+2 Poder Mágico, +3 Ataque a Distancia'
      },
      branchBDetails: {
        unitName: 'Inquisidor Marcial (Inquisitor Warden)',
        role: 'Antimagia y Purga de Estados',
        keyAbilities: ['Purga de Beneficios Enemigos', 'Sin penalización en combate cuerpo a cuerpo'],
        statsBonus: '+3 Ataque, +3 Defensa'
      }
    },
    effects: [
      'Recluta tropas mágicas de Tier 4 con facultades de daño a distancia y bendiciones.',
      'Producción base: 5 unidades por semana.'
    ],
    strategicTip: 'Construir tras asegurar la Cofradía de Magos Nivel 1 en el Día 4.',
    timingRecommendation: 'Día 4.',
  },
  {
    id: 'temple-inquisition-hall',
    name: 'Salón de la Inquisición (Inquisition Hall)',
    nameEn: 'Inquisition Hall',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 5,
    cost: { gold: 4000, wood: 5, ore: 10 },
    dwellingUpgradeCost: { gold: 2500, ore: 5, gems: 3 },
    prerequisites: ['Monasterio (Monastery)'],
    unitRecruitedBase: 'Cruzado Pesado (Crusader)',
    unitRecruited: 'Cruzado / Paladín Sagrado',
    unitUpgrades: {
      branchA: 'Paladín Justiciero (Doble golpe y aura de resistencia mágica)',
      branchB: 'Templario Inquebrantable (Inmunidad al miedo, aturdimiento y control mental)',
      branchADetails: {
        unitName: 'Paladín Justiciero (Righteous Paladin)',
        role: 'Atacante Pesado de Doble Golpe',
        keyAbilities: ['Doble Ataque en cada acometida', 'Aura de Resistencia Sagrada (+20% vs Magia)'],
        statsBonus: '+3 Ataque, +2 Daño Base'
      },
      branchBDetails: {
        unitName: 'Templario Inquebrantable (Steadfast Templar)',
        role: 'Baluarte Implacable Anti-Control',
        keyAbilities: ['Inmunidad a Cegar, Miedo y Control Mental', 'Provocación a Unidades Adyacentes'],
        statsBonus: '+5 Defensa, +12 Vida'
      }
    },
    effects: [
      'Recluta unidades pesadas de choque de Tier 5.',
      'Producción base: 4 unidades por semana.'
    ],
    strategicTip: 'El núcleo de choque cuerpo a cuerpo del Templo; arrasa con tropas intermedias.',
    timingRecommendation: 'Día 5.',
  },
  {
    id: 'temple-champions-hall',
    name: 'Salón de Campeones (Champions Hall)',
    nameEn: 'Champions Hall',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 6,
    cost: { gold: 4000, wood: 10, ore: 5, gems: 10 },
    dwellingUpgradeCost: { gold: 3000, gems: 5 },
    prerequisites: ['Salón de la Inquisición (Inquisition Hall)'],
    unitRecruitedBase: 'Caballero / Campeón (Champion)',
    unitRecruited: 'Campeón / Caballero de la Orden',
    unitUpgrades: {
      branchA: 'Caballero de la Justa (Bonificación masiva de daño por casillas recorridas en carga)',
      branchB: 'Cruzado Sagrado (Aura de moral para todas las tropas aliadas en combate)',
      branchADetails: {
        unitName: 'Caballero de la Justa (Jousting Knight)',
        role: 'Caballería de Carga Destructiva',
        keyAbilities: ['Carga de Lanza (+10% daño adicional por cada casilla recorrida antes de impactar)'],
        statsBonus: '+2 Velocidad, +4 Ataque en Carga'
      },
      branchBDetails: {
        unitName: 'Cruzado de la Orden (Order Crusader)',
        role: 'Líder Táctico y Moralizador',
        keyAbilities: ['Aura de Inspiración (+2 Moral a todo el ejército)', 'Carga Imparable (No sufre represalia en el primer turno de carga)'],
        statsBonus: '+4 Defensa, +15 Vida'
      }
    },
    effects: [
      'Recluta caballería pesada de Tier 6 de impacto demoledor.',
      'Producción base: 2 unidades por semana.'
    ],
    strategicTip: 'Ideal para eliminar unidades enemigas clave en el primer turno de combate con su bonificación por carga.',
    timingRecommendation: 'Día 6.',
  },
  {
    id: 'temple-celestial-portal',
    name: 'Portal Celestial (Celestial Portal)',
    nameEn: 'Celestial Portal',
    category: 'Moradas de Criaturas',
    faction: 'Templo',
    tier: 7,
    cost: { gold: 15000, wood: 10, ore: 10, gems: 15 },
    dwellingUpgradeCost: { gold: 10000, gems: 10 },
    prerequisites: ['Salón de Campeones (Champions Hall)', 'Cofradía de Magos Nivel 2 (Mage Guild Level 2)'],
    unitRecruitedBase: 'Ángel (Angel)',
    unitRecruited: 'Ángel / Arcángel Celestial',
    unitUpgrades: {
      branchA: 'Arcángel Supremo (Resurrección de aliados caídos y +1 a la moral de todo el ejército)',
      branchB: 'Serafín Vengador (Daño radiante masivo en área y vuelo con espada de fuego)',
      branchADetails: {
        unitName: 'Arcángel Supremo (Archangel)',
        role: 'Coloso Sagrado y Resucitador Supremo',
        keyAbilities: ['Resurrección Divina (Revive 100 HP x número de Arcángeles una vez por batalla)', '+1 Moral Permanente a todo el ejército', 'Vuelo Iluminado'],
        statsBonus: '+5 Ataque, +5 Defensa, +50 Vida, +3 Velocidad'
      },
      branchBDetails: {
        unitName: 'Serafín Vengador (Avenging Seraph)',
        role: 'Coloso Ofensivo de Fuego Divino',
        keyAbilities: ['Espada de Llamas Radiantes (Daño sagrado en arco frontal de 3 casillas)', 'Aura de Castigo (+15% daño contra no-muertos y demonios)'],
        statsBonus: '+8 Ataque, +3 Iniciativa, +40 Vida'
      }
    },
    effects: [
      'Recluta las criaturas legendarias de Tier 7 del Templo.',
      'Producción base: 1 unidad por semana (+1 con Castillo).'
    ],
    strategicTip: 'El objetivo definitivo del Rush Semana 1. Los Arcángeles garantizan 0 pérdidas gracias a su habilidad de Resurrección.',
    timingRecommendation: 'Semana 1 (Día 7) o Semana 2 (Día 1).',
  },

  // =========================================================================
  // ESTRUCTURAS ESPECIALES DE FACCIÓN (TEMPLO)
  // =========================================================================
  {
    id: 'temple-reliquary',
    name: 'Relicario de la Luz (Reliquary of Light)',
    nameEn: 'Reliquary of Light',
    category: 'Estructuras Especiales de Facción',
    faction: 'Templo',
    isFactionUnique: true,
    cost: { gold: 2500, wood: 5, ore: 5, gems: 2 },
    prerequisites: ['Cofradía de Magos Nivel 1 (Mage Guild Level 1)'],
    effects: [
      'Otorga +1 Moral permanente a todas las criaturas del Templo en la provincia.',
      'Aumenta la probabilidad de ataques de Moral Alta (turnos dobles) en un +15%.'
    ],
    strategicTip: 'Construir para maximizar la sinergia de moral divina y turnos dobles en batallas decisivas.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'temple-altar-of-glory',
    name: 'Altar de la Gloria (Altar of Glory)',
    nameEn: 'Altar of Glory',
    category: 'Estructuras Especiales de Facción',
    faction: 'Templo',
    isFactionUnique: true,
    cost: { gold: 2000, ore: 5, gems: 3 },
    prerequisites: ['Barracones (Barracks)'],
    effects: [
      'Aumenta la producción semanal de todas las moradas de Tier 1 a 4 en un +15%.',
      'Reduce en un -10% el coste de reclutamiento en oro de infantes y arqueros.'
    ],
    strategicTip: 'Acelera la masa de tropas baratas para sostener múltiples frentes de asedio.',
    timingRecommendation: 'Semana 2.',
  },
  {
    id: 'temple-cathedral-of-light',
    name: 'Catedral de la Luz Eterna (Cathedral of Light - Santo Grial)',
    nameEn: 'Cathedral of Light',
    category: 'Estructuras Especiales de Facción',
    faction: 'Templo',
    isFactionUnique: true,
    cost: { gold: 5000, wood: 10, ore: 10, gems: 5 },
    prerequisites: ['Descubrimiento del Santo Grial', 'Portal Celestial (Celestial Portal)'],
    effects: [
      'Estructura Suprema del Grial del Templo.',
      'Genera +5.000 de Oro diario adicional y +50% al crecimiento de todas las criaturas de la ciudad.',
      'Otorga Moral Máxima (+3) y +20% de resistencia a la magia a todas las tropas aliadas del reino.'
    ],
    strategicTip: 'Convierte tu capital en un bastión inexpugnable e imparable una vez descubierto el Grial.',
    timingRecommendation: 'Al descubrir el Grial.',
  },
];
