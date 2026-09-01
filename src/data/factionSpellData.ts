import { FactionId } from './factionDataProvider';

export type CanonicalFactionKey = 'Templo' | 'Necrópolis' | 'Mazmorra' | 'Foresta' | 'Colmena' | 'Cisma';

export function normalizeFactionKey(faction: FactionId): CanonicalFactionKey {
  if (faction === 'Arboleda') return 'Foresta';
  if (faction === 'Enjambre') return 'Colmena';
  return faction as CanonicalFactionKey;
}

export interface FactionSpellCombo {
  id: string;
  title: string;
  subtitle: string;
  school: string;
  keySpells: {
    spellId: string;
    spellName: string;
    level: string;
    manaCost: number;
  }[];
  beneficiaryUnits: string[];
  recommendedHeroes: string[];
  timing: 'Día 1-7 (Apertura)' | 'Semana 2-3 (Mid Game)' | 'Late Game (Batalla Final)' | 'Asedios';
  executionSteps: string[];
  competitiveAdvantage: string;
  iconType: 'flame' | 'zap' | 'shield' | 'compass' | 'skull' | 'sparkles' | 'swords';
}

export interface FactionMagicProfile {
  factionId: FactionId;
  name: string;
  primarySchool: string;
  secondarySchool: string;
  doctrine: string;
  manaEconomyStrategy: string;
  preferredMasterfulSpells: string[];
  day1EssentialSpells: string[];
  lateGameWinConditionSpells: string[];
}

export interface SpellFactionPriority {
  priority: 'Imprescindible (P1)' | 'Muy Alta (P2)' | 'Alta (P3)' | 'Media (P3)' | 'Situacional' | 'Básica (P4)';
  synergyTip: string;
  keyUnitsBenefited?: string[];
}

// Perfiles mágicos canónicos por facción
export const FACTION_MAGIC_PROFILES: Record<CanonicalFactionKey, FactionMagicProfile> = {
  Templo: {
    factionId: 'Templo',
    name: 'Templo (Temple)',
    primarySchool: 'Luz (Light)',
    secondarySchool: 'Neutral / Aventura & Primigenia',
    doctrine: 'Soporte sagrado, aumento drástico de iniciativa, daño físico maximizado y cero bajas definitivas mediante resurrección masiva.',
    manaEconomyStrategy: 'Alta eficiencia en bufos de bajo coste (Aceleración y Bendición a 5-6 Maná) con reserva guardada para Resurrección de emergencia.',
    preferredMasterfulSpells: [
      'Aceleración Magistral (+4 Velocidad, +20% Iniciativa a todo el ejército)',
      'Bendición Divina Magistral (Daño máx + 15% Sagrado a todo el ejército)',
      'Resurrección Bendita (Revive 750+150xPoder PV + Escudo Sagrado)',
      'Aegis Masiva (-40% daño físico recibido)',
    ],
    day1EssentialSpells: ['Aceleración (Haste)', 'Bendición (Blessing)', 'Aguas Curativas (Cure)'],
    lateGameWinConditionSpells: ['Resurrección Divina', 'Portal a la Ciudad', 'Intervención Divina (Sanctuary)'],
  },
  Necrópolis: {
    factionId: 'Necrópolis',
    name: 'Necrópolis (Necropolis)',
    primarySchool: 'Nochesombra (Nightshade)',
    secondarySchool: 'Arcana & Neutral',
    doctrine: 'Colapso de moral y daño enemigo mediante maldiciones debilitadoras, inmovilización con ceguera y regeneración infinita de filas no-muertas.',
    manaEconomyStrategy: 'Uso de habilidades de nigromancia y recuperación de maná en cementerios; lanzamiento prioritario de Maldición y Ceguera para anular represalias.',
    preferredMasterfulSpells: [
      'Maldición Tenebrosa Magistral (-8 Ataque y daño mínimo -35% a todo el ejército rival)',
      'Tinieblas Paralizantes (Ceguera N4 con -50% ataque residual)',
      'Legión Eterna (100% de tropas reanimadas se conservan post-combate)',
      'Teletransporte Bélico (Señores Vampiros en retaguardia con ataque inmediato)',
    ],
    day1EssentialSpells: ['Maldición de Sombras (Shadow Curse)', 'Ceguera (Blind)', 'Desesperación (Despair)'],
    lateGameWinConditionSpells: ['Reanimar Muertos N4 (Legión Eterna)', 'Armageddon', 'Portal a la Ciudad'],
  },
  Mazmorra: {
    factionId: 'Mazmorra',
    name: 'Mazmorra (Dungeon)',
    primarySchool: 'Nochesombra (Nightshade) & Primigenia (Primal)',
    secondarySchool: 'Arcana & Neutral',
    doctrine: 'Aniquilación total por daño elemental masivo, control del campo con ralentización y el combo destructor Drago-Armageddon.',
    manaEconomyStrategy: 'Vórtice de Maná en ciudad duplica el maná máximo del héroe; permite disparar hechizos de Nivel 4 y 5 de forma consecutiva.',
    preferredMasterfulSpells: [
      'Apocalipsis Devastador Magistral (Armageddon N4 con Dragones Negros inmunes)',
      'Lentitud Masiva Magistral (-4 Velocidad y -25% Iniciativa a todo el ejército rival)',
      'Rayo de Distorsión Magistral (50% de probabilidad de fallo al ataque enemigo)',
      'Salto Dimensional Bélico (Hidra con ataque de 360º gratuito e inmediato)',
    ],
    day1EssentialSpells: ['Lentitud (Slow)', 'Rayo Arcano (Arcane Bolt)', 'Piel Gruesa (Stoneskin)'],
    lateGameWinConditionSpells: ['Armageddon Magistral', 'Implosión Singularidad', 'Puerta Dimensional'],
  },
  Foresta: {
    factionId: 'Foresta',
    name: 'Foresta (Sylvan)',
    primarySchool: 'Primigenia (Primal)',
    secondarySchool: 'Luz (Light) & Neutral',
    doctrine: 'Control táctico mediante enraizamiento botánico de Iriyads, ralentización anfibia de Aqualotls, soporte mágico de Herbomantes y embestidas de Qilins celestiales y Fénix.',
    manaEconomyStrategy: 'Baterías de maná de Herbomantes y armonía de la naturaleza; rotación de Lentitud y Bendición para potenciar a Faunos y Hoplitas.',
    preferredMasterfulSpells: [
      'Lentitud Masiva Magistral (Permite a Faunos y Herbomantes castigar neutrales sin peligro)',
      'Piel de Diamante Masiva (+8 Defensa a Hoplitas y vanguardia)',
      'Aceleración Masiva (Qilins y Fénix cargan en Turno 1 con velocidad celestial)',
      'Aguas Vivificantes Masivas (Sana y remueve toxinas de todo el ejército)',
    ],
    day1EssentialSpells: ['Lentitud (Slow)', 'Piel Gruesa (Stoneskin)', 'Bendición (Blessing)'],
    lateGameWinConditionSpells: ['Lluvia de Meteoros N4', 'Portal a la Ciudad', 'Resurrección Divina'],
  },
  Colmena: {
    factionId: 'Colmena',
    name: 'Colmena (Hive / Enjambre)',
    primarySchool: 'Primigenia (Primal)',
    secondarySchool: 'Arcana & Neutral',
    doctrine: 'Asalto implacable y desbordamiento en Turno 1 por iniciativa superior, feromonas de furia y bloqueo de proyectiles con tanques acorazados.',
    manaEconomyStrategy: 'Gasto explosivo de maná en los Turnos 1 y 2 para forzar el colapso del enemigo antes de que pueda ejecutar su plan de juego.',
    preferredMasterfulSpells: [
      'Aceleración Magistral (+4 Velocidad y +20% Iniciativa a Mantis y Avispas)',
      'Piel de Diamante Masiva (Blindaje absoluto para Escarabajos y Criadoras)',
      'Lentitud Masiva (Evita que la infantería enemiga socorra a sus arqueros asaltados)',
      'Rayo Atronador Magistral (Elimina rápidamente héroes y escuadras de apoyo)',
    ],
    day1EssentialSpells: ['Aceleración (Haste)', 'Piel Gruesa (Stoneskin)', 'Rayo Arcano (Arcane Bolt)'],
    lateGameWinConditionSpells: ['Teletransporte Magistral', 'Implosión Masiva', 'Portal a la Ciudad'],
  },
  Cisma: {
    factionId: 'Cisma',
    name: 'Cisma (Schism)',
    primarySchool: 'Arcana (Arcane)',
    secondarySchool: 'Primigenia (Primal) & Neutral',
    doctrine: 'Demonología del vacío, ritos de invocación permanente sobre cadáveres, frío penetrante de Vori, control mental de Concubis y colosos abisales inmunes a magia.',
    manaEconomyStrategy: 'Poder del Abismo y drenaje de maná; amplificación mágica con Jinetes Aga\'Shoth y ritos de invocación sin coste de oro.',
    preferredMasterfulSpells: [
      'Salto Dimensional Bélico (Enviados Abisales y Shoths asaltan retaguardia con ataque gratis)',
      'Celeridad Temporal Magistral (Todo el ejército actúa en primer lugar con +50% iniciativa)',
      'Reflejo Espejo Perfecto (Réplicas ilusorias de Árbitros y Supervisores inmunes a disipación)',
      'Disipación Universal Masiva (Limpia debuffs propios y roba todos los buffs enemigos a 6 Maná)',
    ],
    day1EssentialSpells: ['Rayo Arcano (Arcane Bolt)', 'Comienzo Temprano (Early Start)', 'Disipar Magia (Dispel)'],
    lateGameWinConditionSpells: ['Teletransporte Magistral', 'Rayo en Cadena N4', 'Puerta Dimensional'],
  },
};

// 3 Combos Tácticos Maestros por cada una de las 6 Facciones de Jadame
export const FACTION_SPELL_COMBOS: Record<CanonicalFactionKey, FactionSpellCombo[]> = {
  Templo: [
    {
      id: 'temple-combo-1',
      title: 'Combo 1: Cólera Cruzada Imparable',
      subtitle: 'Arremetida de Caballería Sagrada con Doble Daño Máximo en Turno 1',
      school: 'Luz (Light)',
      iconType: 'swords',
      timing: 'Semana 2-3 (Mid Game)',
      keySpells: [
        { spellId: 'spell-haste', spellName: 'Aceleración Magistral (N4)', level: 'Nivel 4', manaCost: 8 },
        { spellId: 'spell-blessing', spellName: 'Bendición Divina Magistral (N4)', level: 'Nivel 4', manaCost: 7 },
      ],
      beneficiaryUnits: ['Caballeros Templarios', 'Paladines', 'Arcángeles', 'Cruzados Justicieros'],
      recommendedHeroes: ['Valerius', 'Adelaide', 'Seraphina', 'Celeste'],
      executionSteps: [
        'Turno 1: Lanza Aceleración Magistral N4 (+4 Velocidad y +20% Iniciativa a todo el ejército).',
        'Los Caballeros Templarios y Arcángeles cruzan la totalidad de la cuadrícula hexagonal en su primer movimiento.',
        'Turno 2: Lanza Bendición Divina Magistral N4. Todo el daño físico escala al valor máximo superior con un +15% de daño sagrado puro adicional.',
        'La bonificación de Carga de Caballería se multiplica por el daño máximo garantizado, aniquilando escuadras de Tier 6 y 7 de un solo impacto.',
      ],
      competitiveAdvantage: 'Extermina la retaguardia de tiradores y hechiceros rivales antes de que puedan lanzar su primer hechizo o disparo.',
    },
    {
      id: 'temple-combo-2',
      title: 'Combo 2: Inmortalidad Sagrada (0 Bajas)',
      subtitle: 'Bucle Perpetuo de Resurrección Divina y Escudo Radiante',
      school: 'Luz (Light)',
      iconType: 'shield',
      timing: 'Late Game (Batalla Final)',
      keySpells: [
        { spellId: 'spell-resurrection', spellName: 'Resurrección Bendita (N4)', level: 'Nivel 4', manaCost: 20 },
        { spellId: 'spell-holy-shield', spellName: 'Escudo Sagrado Magistral (N4)', level: 'Nivel 4', manaCost: 10 },
      ],
      beneficiaryUnits: ['Arcángeles', 'Paladines', 'Escuderos Pesados', 'Inquisidores'],
      recommendedHeroes: ['Seraphina', 'Valerius', 'Aurelius'],
      executionSteps: [
        'Forma un perímetro defensivo compacto alrededor de los Inquisidores y Sacerdotes.',
        'Aplica Escudo Sagrado Magistral N4 (-40% daño físico a todo el ejército).',
        'Si una escuadra de Paladines o Caballeros sufre bajas, lanza Resurrección Bendita N4 (revive 750 + 150×Poder PV y aplica un escudo del 30% automático).',
        'Combina la resurrección del héroe con la habilidad activa de Resurrección del Arcángel para terminar la batalla con 0 pérdidas definitivas.',
      ],
      competitiveAdvantage: 'Permite asediar castillos de nivel máximo sin desgaste militar, manteniendo la masa de tropas intacta para la siguiente semana.',
    },
    {
      id: 'temple-combo-3',
      title: 'Combo 3: Bastión del Amanecer & Purga',
      subtitle: 'Inmunidad Total contra Maldiciones y Desesperación de Nigromantes',
      school: 'Luz (Light) & Neutral',
      iconType: 'sparkles',
      timing: 'Día 1-7 (Apertura)',
      keySpells: [
        { spellId: 'spell-shorten-shadow', spellName: 'Acortar Sombras / Purga Solar (N4)', level: 'Nivel 4', manaCost: 12 },
        { spellId: 'spell-dispel', spellName: 'Disipación Universal (N4)', level: 'Nivel 4', manaCost: 6 },
      ],
      beneficiaryUnits: ['Cruzados', 'Lanceros Sagrados', 'Tiradores de Élite'],
      recommendedHeroes: ['Adelaide', 'Lucian'],
      executionSteps: [
        'Enfrentamiento directo contra Necrópolis o Mazmorra que intente ralentizar o maldecir tu vanguardia.',
        'Lanza Purga Solar Masiva N4 para inmunizar a todo el ejército contra Maldición de Sombras y Ceguera durante 3 rondas completas.',
        'Si el rival buffó a sus criaturas, usa Disipación Universal Masiva a 6 Maná para limpiar a tus tropas y arrebatar las mejoras enemigas simultáneamente.',
      ],
      competitiveAdvantage: 'Anula por completo la ventaja táctica de las facciones basadas en debuffs, forzándolas a un combate físico donde Templo domina.',
    },
  ],
  Necrópolis: [
    {
      id: 'necro-combo-1',
      title: 'Combo 1: Danza Macabra del Señor Vampiro',
      subtitle: 'Teletransporte Asesino con Regeneración Ininterrumpida de Sangre',
      school: 'Nochesombra & Arcana',
      iconType: 'skull',
      timing: 'Semana 2-3 (Mid Game)',
      keySpells: [
        { spellId: 'spell-teleport', spellName: 'Teletransporte Magistral (N4)', level: 'Nivel 4', manaCost: 12 },
        { spellId: 'spell-shadow-curse', spellName: 'Maldición Tenebrosa (N4)', level: 'Nivel 4', manaCost: 10 },
      ],
      beneficiaryUnits: ['Señores Vampiros', 'Caballeros de la Muerte', 'Segadores de Almas'],
      recommendedHeroes: ['Mortis', 'Vesper', 'Naadir'],
      executionSteps: [
        'Turno 1: Lanza Maldición Tenebrosa Magistral N4; todo el ejército rival pierde -8 de Ataque y su daño se fija en el mínimo menos 35%.',
        'Turno 2: Lanza Teletransporte Magistral N4 soltando la pila de Señores Vampiros en la casilla óptima adyacente a 3 escuadras de arqueros enemigos.',
        'El Nivel 4 de Teletransporte otorga un ataque inmediato gratuito con +20% de daño sin recibir contraataque.',
        'Los Señores Vampiros drenan vida al 100%, reponiendo cualquier pérdida y bloqueando a todos los tiradores enemigos a la vez.',
      ],
      competitiveAdvantage: 'Desarma por completo la formación enemiga sin riesgo de contraataque y con recuperación total de vida de tu tropa élite.',
    },
    {
      id: 'necro-combo-2',
      title: 'Combo 2: Asfixia del Sepulcro & Ceguera',
      subtitle: 'Aislamiento de la Mayor Amenaza y Drenaje Residual con Putrefacción',
      school: 'Nochesombra (Nightshade)',
      iconType: 'flame',
      timing: 'Día 1-7 (Apertura)',
      keySpells: [
        { spellId: 'spell-blind', spellName: 'Tinieblas Paralizantes / Ceguera (N4)', level: 'Nivel 4', manaCost: 12 },
        { spellId: 'spell-fatal-decay', spellName: 'Decadencia Fatal / Peste (N4)', level: 'Nivel 4', manaCost: 9 },
      ],
      beneficiaryUnits: ['Espectros', 'Liches', 'Esqueletos Arqueros'],
      recommendedHeroes: ['Vesper', 'Sarix'],
      executionSteps: [
        'Identifica la unidad más peligrosa del rival (pila gigante de Tier 6 o 7).',
        'Aplica Ceguera N4 (inmovilizada 5 rondas y sin contraataque al romperse).',
        'Lanza Decadencia Fatal N4 en las unidades secundarias; al morir explotan contagiando a los adyacentes.',
        'Tus Liches y Esqueletos acribillan al resto del ejército enemigo mientras su unidad principal permanece ciega e inútil.',
      ],
      competitiveAdvantage: 'Permite a Necrópolis ganar combates contra neutrales brutales o héroes con ejército superior sin perder ni un solo Esqueleto.',
    },
    {
      id: 'necro-combo-3',
      title: 'Combo 3: Legión Eterna Inagotable',
      subtitle: 'Multiplicación Definitiva de Esqueletos y No-Muertos Post-Combate',
      school: 'Nochesombra (Nightshade)',
      iconType: 'zap',
      timing: 'Late Game (Batalla Final)',
      keySpells: [
        { spellId: 'spell-animate-dead', spellName: 'Reanimar Muertos N4 (Legión Eterna)', level: 'Nivel 4', manaCost: 16 },
        { spellId: 'spell-despair', spellName: 'Desesperación Masiva (N4)', level: 'Nivel 4', manaCost: 8 },
      ],
      beneficiaryUnits: ['Esqueletos Guerreros', 'Caballeros del Terror', 'Señores de los Vampiros'],
      recommendedHeroes: ['Baluarte', 'Adahn'],
      executionSteps: [
        'Lanza Desesperación Masiva N4 (-4 Moral y -4 Suerte al rival) para congelar sus turnos por baja moral.',
        'Usa tus falanges de Esqueletos y Sabuesos para absorber el daño de asalto.',
        'En los turnos 3 y 4, lanza Reanimar Muertos Magistral N4 (revive 550 + 110×Poder PV).',
        'El 100% de las criaturas no-muertas reanimadas con el Nivel 4 permanecen de forma permanente tras la victoria.',
      ],
      competitiveAdvantage: 'Genera un ejército de bola de nieve (snowball) que sale de cada gran batalla más numeroso de lo que entró.',
    },
  ],
  Mazmorra: [
    {
      id: 'dungeon-combo-1',
      title: 'Combo 1: Drago-Armageddon Magistral',
      subtitle: 'Exterminio Absoluto en Turno 1 con Inmunidad de Dragones Negros',
      school: 'Nochesombra (Nightshade) & Primigenia',
      iconType: 'flame',
      timing: 'Late Game (Batalla Final)',
      keySpells: [
        { spellId: 'spell-armageddon', spellName: 'Apocalipsis Devastador / Armageddon (N4)', level: 'Nivel 4', manaCost: 28 },
        { spellId: 'spell-early-start', spellName: 'Comienzo Temprano Magistral (N4)', level: 'Nivel 4', manaCost: 8 },
      ],
      beneficiaryUnits: ['Dragones Negros', 'Dragones Rojos'],
      recommendedHeroes: ['Zakron', 'Malakor', 'Jedda'],
      executionSteps: [
        'Despliega únicamente a tus Dragones Negros (o protégelos en primera línea con Postura Mágica del Triunvirato).',
        'Turno 1: Comienzo Temprano asegura la iniciativa absoluta del héroe antes de que cualquier unidad enemiga mueva.',
        'Lanza Armageddon Nivel 4 (Masterful): Inflige 550 + 180×Poder Mágico de daño catastrófico a TODAS las tropas en combate.',
        'Los Dragones Negros son 100% inmunes a la magia de Nivel 5: el ejército rival entero se vaporiza mientras tus Dragones quedan 100% ilesos.',
      ],
      competitiveAdvantage: 'La condición de victoria indiscutible del late game en Jadame. Cierra partidas en 5 segundos contra cualquier composición no inmune.',
    },
    {
      id: 'dungeon-combo-2',
      title: 'Combo 2: Asalto Sorpresivo de Hidras en 360º',
      subtitle: 'Ralentización Masiva y Salto Dimensional en Medio de 4 Escuadras',
      school: 'Primigenia & Arcana',
      iconType: 'zap',
      timing: 'Semana 2-3 (Mid Game)',
      keySpells: [
        { spellId: 'spell-slow', spellName: 'Lentitud Masiva Magistral (N4)', level: 'Nivel 4', manaCost: 10 },
        { spellId: 'spell-teleport', spellName: 'Salto Dimensional Bélico / Teleport (N4)', level: 'Nivel 4', manaCost: 12 },
      ],
      beneficiaryUnits: ['Hidras Infernales', 'Minotauros Furiosos'],
      recommendedHeroes: ['Zakron', 'Thalor'],
      executionSteps: [
        'Turno 1: Lanza Lentitud Masiva N4 (-4 Velocidad y -25% Iniciativa a TODO el ejército rival).',
        'El enemigo queda clavado en su zona de despliegue sin poder avanzar ni reaccionar.',
        'Turno 2: Lanza Teletransporte Magistral N4 posicionando la Hidra Infernal en el centro geométrico de sus 4 escuadras principales.',
        'La Hidra ejecuta de inmediato su ataque circular de 360º con +20% de daño sin recibir contraataque, destrozando toda la formación enemiga.',
      ],
      competitiveAdvantage: 'Compensa la lentitud natural de las Hidras y convierte su ataque multi-cabeza en un arma de destrucción masiva inmediata.',
    },
    {
      id: 'dungeon-combo-3',
      title: 'Combo 3: Creeping Implacable a Distancia (Día 1-7)',
      subtitle: 'Kiting Perfecto con Medusas y Rayo Arcano sin Bajas Aliadas',
      school: 'Arcana & Primigenia',
      iconType: 'sparkles',
      timing: 'Día 1-7 (Apertura)',
      keySpells: [
        { spellId: 'spell-slow', spellName: 'Lentitud Básica/Avanzada (N1-N2)', level: 'Nivel 2', manaCost: 8 },
        { spellId: 'spell-arcane-bolt', spellName: 'Rayo Arcano (N2-N3)', level: 'Nivel 3', manaCost: 4 },
      ],
      beneficiaryUnits: ['Medusas Tenebrosas', 'Asesinos de la Sombra', 'Trogloditas'],
      recommendedHeroes: ['Zakron', 'Alis'],
      executionSteps: [
        'Identifica la mina de oro o cristal custodiada por neutrales lentos cuerpo a cuerpo (Ogros, Zombis, Gólems).',
        'Turno 1: Aplica Lentitud N2 al grupo más adelantado (reduce velocidad en -3 e iniciativa en -10%).',
        'Dispara con las Medusas y Asesinos a distancia máxima mientras retrocedes a tus Trogloditas.',
        'Usa Rayo Arcano N3 (por sólo 4 Maná) para rematar pilas secundarias antes de que entren en rango de ataque.',
      ],
      competitiveAdvantage: 'Limpia el cuadrante completo de recursos raros en la Semana 1 con 0 pérdidas de criaturas.',
    },
  ],
  Foresta: [
    {
      id: 'sylvan-combo-1',
      title: 'Combo 1: Enraizamiento Botánico & Lluvia de Saetas',
      subtitle: 'Lentitud Masiva y Bendición Sagrada para Faunos y Herbomantes',
      school: 'Primigenia & Luz',
      iconType: 'compass',
      timing: 'Día 1-7 (Apertura)',
      keySpells: [
        { spellId: 'spell-slow', spellName: 'Lentitud Masiva Magistral (N4)', level: 'Nivel 4', manaCost: 10 },
        { spellId: 'spell-blessing', spellName: 'Bendición Divina Magistral (N4)', level: 'Nivel 4', manaCost: 7 },
      ],
      beneficiaryUnits: ['Faunos Arqueros', 'Herbomantes', 'Iriyads de Enredadera'],
      recommendedHeroes: ['Thorne', 'Vatawna', 'Kelarr'],
      executionSteps: [
        'Turno 1: Lanza Lentitud Masiva N4; reduce la velocidad del ejército enemigo en -4 casillas.',
        'Las Iriyads de Enredadera clavan al suelo a las unidades más veloces enemigas con su habilidad innata de enredo.',
        'Turno 2: Lanza Bendición Divina N4; cada proyectil de Faunos y Herbomantes inflige daño máximo con +15% de bono sagrado.',
        'Los tiradores y magos botánicos limpian la vanguardia rival antes de que alcancen a los Hoplitas.',
      ],
      competitiveAdvantage: 'Permite limpiar neutrales difíciles en la Semana 1 con 0 pérdidas de tropas gracias al rango y enraizamiento.',
    },
    {
      id: 'sylvan-combo-2',
      title: 'Combo 2: Falange Inquebrantable & Marea Viva',
      subtitle: 'Piel de Diamante Masiva y Aguas Vivificantes con Soporte de Aqualotls',
      school: 'Primigenia & Luz',
      iconType: 'shield',
      timing: 'Semana 2-3 (Mid Game)',
      keySpells: [
        { spellId: 'spell-thick-hide', spellName: 'Piel de Diamante Masiva (N4)', level: 'Nivel 4', manaCost: 7 },
        { spellId: 'spell-cure', spellName: 'Aguas Vivificantes / Sanación Oleada (N4)', level: 'Nivel 4', manaCost: 7 },
      ],
      beneficiaryUnits: ['Hoplitas del Alba', 'Aqualotls Polares', 'Murmuramantes'],
      recommendedHeroes: ['Faleor', 'Thorne', 'Aeliniel'],
      executionSteps: [
        'Despliega a los Hoplitas en formación de falange defensiva protegiendo el centro del tablero.',
        'Lanza Piel de Diamante N4 (+8 Defensa y -15% de reducción de daño plano a todo el ejército).',
        'Los Aqualotls Polares ralentizan y congelan las casillas de carga enemigas con Aliento Glacial.',
        'Cuando los Hoplitas absorban el embate enemigo, lanza Sanación Oleada N4 restaurando salud a todas las tropas.',
      ],
      competitiveAdvantage: 'Crea una línea de contención insuperable que absorbe el daño físico mientras los magos recargan maná.',
    },
    {
      id: 'sylvan-combo-3',
      title: 'Combo 3: Asalto Celestial de Qilins & Fénix',
      subtitle: 'Aceleración Masiva con Rayos en Cadena y Renacimiento Ígneo',
      school: 'Luz & Primigenia',
      iconType: 'zap',
      timing: 'Late Game (Batalla Final)',
      keySpells: [
        { spellId: 'spell-haste', spellName: 'Aceleración Masiva (N4)', level: 'Nivel 4', manaCost: 8 },
        { spellId: 'spell-implosion', spellName: 'Implosión Singularidad (N4)', level: 'Nivel 4', manaCost: 25 },
      ],
      beneficiaryUnits: ['Qilins del Trueno', 'Fénix Solar', 'Fénix de Energía'],
      recommendedHeroes: ['Kelarr', 'Halon', 'Vatawna'],
      executionSteps: [
        'Turno 1: Lanza Aceleración Masiva N4 (+4 Velocidad y +20% Iniciativa).',
        'Los Qilins cruzan el campo dejando Sendero Celestial y descargan rayos en cadena sobre la retaguardia enemiga.',
        'Los Fénix asaltan a los hechiceros rivales con aliento sagrado y capacidad de reencarnación si caen.',
        'Turno 2: Lanza Implosión N4 para fulminar al coloso o héroe restante del ejército rival.',
      ],
      competitiveAdvantage: 'Combina la mayor velocidad de asalto aéreo del compendio con la resiliencia eterna del renacimiento de los Fénix.',
    },
  ],
  Colmena: [
    {
      id: 'hive-combo-1',
      title: 'Combo 1: Frenesí de Asalto del Enjambre',
      subtitle: 'Aceleración Masiva en Turno 1 con Carga Brutal de Mantis y Avispas',
      school: 'Luz (Light) & Primigenia',
      iconType: 'swords',
      timing: 'Día 1-7 (Apertura)',
      keySpells: [
        { spellId: 'spell-haste', spellName: 'Aceleración Magistral (N4)', level: 'Nivel 4', manaCost: 8 },
        { spellId: 'spell-arcane-bolt', spellName: 'Rayo Arcano Magistral (N4)', level: 'Nivel 4', manaCost: 5 },
      ],
      beneficiaryUnits: ['Mantis Voraces', 'Avispas Asesinas', 'Zánganos Guerreros'],
      recommendedHeroes: ['Abigor', 'Zoran', 'Niev', 'Curson'],
      executionSteps: [
        'Turno 1: Lanza Aceleración Magistral N4 (+4 Velocidad y +20% Iniciativa).',
        'Las Mantis Voraces y Avispas cruzan todo el mapa de combate y traban en combate cuerpo a cuerpo a todos los tiradores enemigos.',
        'La habilidad de Ataque de Manada activa bonificaciones de daño por cada aliado contiguo.',
        'Usa Rayo Arcano N4 para rematar cualquier escuadra que intente huir o romper el cerco.',
      ],
      competitiveAdvantage: 'Impide que el rival dispare un solo proyectil o active formaciones defensivas compactas.',
    },
    {
      id: 'hive-combo-2',
      title: 'Combo 2: Muro de Quitina & Proliferación',
      subtitle: 'Blindaje de Escarabajos Tanque para Proteger el Desove de Larvas',
      school: 'Primigenia (Primal)',
      iconType: 'shield',
      timing: 'Semana 2-3 (Mid Game)',
      keySpells: [
        { spellId: 'spell-thick-hide', spellName: 'Piel de Diamante Masiva (N4)', level: 'Nivel 4', manaCost: 7 },
        { spellId: 'spell-slow', spellName: 'Lentitud Masiva (N4)', level: 'Nivel 4', manaCost: 10 },
      ],
      beneficiaryUnits: ['Escarabajos Acorazados', 'Reinas Larvarias', 'Colosos Quitinosos'],
      recommendedHeroes: ['Tavi', 'Khariseth', 'Bathym'],
      executionSteps: [
        'Despliega a los Escarabajos Acorazados en formación de arco protector alrededor de las Reinas.',
        'Lanza Piel de Diamante N4 para elevar la armadura de los Escarabajos a niveles casi inexpugnables.',
        'Lanza Lentitud Masiva para frenar a las tropas enemigas mientras las Reinas desovan larvas explosivas turno tras turno.',
        'El volumen numérico del enjambre se triplica mientras los Escarabajos absorben todo el daño rival.',
      ],
      competitiveAdvantage: 'Genera superioridad numérica masiva sin sufrir desgaste de tropas no reemplazables.',
    },
    {
      id: 'hive-combo-3',
      title: 'Combo 3: Asedio de Feromonas & Teletransporte',
      subtitle: 'Infiltración Inmediata de Colosos y Avispas tras las Murallas de Asedio',
      school: 'Arcana & Primigenia',
      iconType: 'flame',
      timing: 'Asedios',
      keySpells: [
        { spellId: 'spell-teleport', spellName: 'Teletransporte Bélico Magistral (N4)', level: 'Nivel 4', manaCost: 12 },
        { spellId: 'spell-earthquake', spellName: 'Cataclismo Telúrico / Terremoto (N4)', level: 'Nivel 4', manaCost: 16 },
      ],
      beneficiaryUnits: ['Colosos Quitinosos', 'Mantis', 'Avispas'],
      recommendedHeroes: ['Abigor', 'Oriax', 'Groo'],
      executionSteps: [
        'Turno 1 en asedio: Lanza Terremoto N4 destruyendo instantáneamente murallas y torres defensivas.',
        'Turno 2: Lanza Teletransporte Magistral N4 depositando un Coloso dentro de la plaza fuerte con ataque inmediato gratuito (+20% Daño).',
        'Las Avispas vuelan sobre los escombros y rematan a los supervivientes en un asalto de 2 turnos.',
      ],
      competitiveAdvantage: 'Conquista capitales enemigas fuertemente fortificadas en tiempo récord sin perder semanas construyendo catapultas.',
    },
  ],
  Cisma: [
    {
      id: 'schism-combo-1',
      title: 'Combo 1: Salto de la Falla Abisal',
      subtitle: 'Teletransporte Magistral de Enviados Abisales y Shoths con Ataque Inmediato',
      school: 'Arcana & Primigenia',
      iconType: 'zap',
      timing: 'Semana 2-3 (Mid Game)',
      keySpells: [
        { spellId: 'spell-teleport', spellName: 'Salto Dimensional Bélico / Teleport (N4)', level: 'Nivel 4', manaCost: 12 },
        { spellId: 'spell-early-start', spellName: 'Celeridad Temporal Magistral (N4)', level: 'Nivel 4', manaCost: 8 },
      ],
      beneficiaryUnits: ['Enviados Abisales', 'Supervisores Abisales', 'Jinetes Aga\'Shoth'],
      recommendedHeroes: ['Sister Keiri', 'Kyros', 'Malakor'],
      executionSteps: [
        'Turno 1: Lanza Celeridad Temporal N4; todo tu ejército del Cisma recibe +50% de iniciativa y +2 Velocidad.',
        'Lanza Teletransporte Magistral N4 enviando a tus Enviados Abisales directamente a la retaguardia enemiga.',
        'El Enviado Abisal ejecuta su ataque con +20% de daño base y aplica Inmunidad Mágica y presencia demoníaca.',
        'El rival gasta su contraataque en el coloso abisal, dejando desprotegidos a sus tiradores frente a los Shoths.',
      ],
      competitiveAdvantage: 'Convierte a los tanques colosales del Cisma en aniquiladores de Turno 1 con inmunidad a hechizos de daño.',
    },
    {
      id: 'schism-combo-2',
      title: 'Combo 2: Bombardeo Paradójico & Vínculo de Seducción',
      subtitle: 'Rayo en Cadena y Control de Masas de Concubos con Energizar',
      school: 'Arcana (Arcane)',
      iconType: 'sparkles',
      timing: 'Late Game (Batalla Final)',
      keySpells: [
        { spellId: 'spell-chain-lightning', spellName: 'Tempestad en Cadena Magistral (N4)', level: 'Nivel 4', manaCost: 22 },
        { spellId: 'spell-energize', spellName: 'Foco Arcano Ilimitado / Energizar (N4)', level: 'Nivel 4', manaCost: 9 },
      ],
      beneficiaryUnits: ['Árbitros de la Grieta', 'Concubos', 'Señoras de las Cadenas'],
      recommendedHeroes: ['Sister Keiri', 'Nihil', 'Oron'],
      executionSteps: [
        'Turno 1: Descarga Tempestad en Cadena N4 golpeando a hasta 7 escuadras enemigas con un daño colosal de 450 + 105×Poder.',
        'Los Concubos encadenan y seducen a la tropa más peligrosa del rival forzándola a atacar a sus propios aliados.',
        'Turno 2: Lanza Energizar Magistral N4; resetea instantáneamente los tiempos de recarga de las habilidades activas de los Árbitros y Concubos.',
        'Los Árbitros descargan su ráfaga de distorsión por segunda vez consecutiva, colapsando el ejército rival.',
      ],
      competitiveAdvantage: 'Combina el mayor control mental del juego con doble bombardeo arcano en turnos consecutivos.',
    },
    {
      id: 'schism-combo-3',
      title: 'Combo 3: Rito del Abismo Permanente & Réplicas',
      subtitle: 'Duplicación Inmune a Disipación y Cosecha de Invocación Eterna',
      school: 'Arcana & Neutral',
      iconType: 'shield',
      timing: 'Semana 2-3 (Mid Game)',
      keySpells: [
        { spellId: 'spell-optical-illusion', spellName: 'Réplicas Espejo Supremas (N4)', level: 'Nivel 4', manaCost: 14 },
        { spellId: 'spell-dispel', spellName: 'Disipación Universal Masiva (N4)', level: 'Nivel 4', manaCost: 6 },
      ],
      beneficiaryUnits: ['Árbitros de la Grieta', 'Enviados Abisales', 'Grandes Shoths'],
      recommendedHeroes: ['Sister Keiri', 'Blackhorn', 'Kyros'],
      executionSteps: [
        'Lanza Réplicas Espejo Supremas N4 sobre tus Enviados Abisales o Árbitros (crea 2 copias con 100% de ataque que absorben 3 impactos).',
        'Si el enemigo intenta lanzar mejoras o bendiciones para igualar la potencia, usa Disipación Universal Masiva por 6 Maná.',
        'Los cadáveres caídos en el combate son consumidos por el Rito del Abismo de Sister Keiri, generando invocaciones permanentes para el ejército.',
      ],
      competitiveAdvantage: 'Multiplica la presencia en mesa y convierte cada baja enemiga en refuerzos permanentes de alto tier tras la batalla.',
    },
  ],
};

// Prioridades específicas y notas de sinergia para cada hechizo según cada una de las 6 facciones
export const FACTION_SPELL_PRIORITIES: Record<CanonicalFactionKey, Record<string, SpellFactionPriority>> = {
  Templo: {
    'spell-haste': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Permite a Caballeros Templarios y Arcángeles arrollar en Turno 1 con bonificación de carga completa y Moral +3.',
      keyUnitsBenefited: ['Caballeros Templarios', 'Arcángeles', 'Paladines'],
    },
    'spell-blessing': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Maximiza el daño de Caballeros y Paladines (que poseen gran dispersión entre daño mín/máx), añadiendo daño sagrado.',
      keyUnitsBenefited: ['Caballeros', 'Cruzados', 'Ángeles'],
    },
    'spell-resurrection': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Garantiza batallas de asedio con 0 bajas definitivas al combinarse con la habilidad innata del Arcángel.',
      keyUnitsBenefited: ['Paladines', 'Caballeros', 'Inquisidores'],
    },
    'spell-holy-shield': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Convierte a los Escuderos Pesados y Cruzados en murallas inexpugnables frente a daño físico y proyectiles.',
      keyUnitsBenefited: ['Escuderos', 'Cruzados Justicieros'],
    },
    'spell-cure': {
      priority: 'Alta (P3)',
      synergyTip: 'Mantiene a la vanguardia en pie y purga venenos o maldiciones de daño continuo en los primeros días.',
      keyUnitsBenefited: ['Lanceros', 'Cruzados'],
    },
    'spell-shorten-shadow': {
      priority: 'Alta (P3)',
      synergyTip: 'Neutraliza por completo a héroes de Necrópolis o Mazmorra al otorgar inmunidad masiva a maldiciones de sombras.',
      keyUnitsBenefited: ['Todo el ejército'],
    },
    'spell-town-portal': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Macro-movilidad sagrada. Permite defender múltiples castillos del imperio y concentrar paladines en 1 turno.',
    },
    'spell-dimension-door': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Salto táctico de asalto. Permite flanquear guarniciones enemigas y tomar castillos sin previo aviso.',
    },
    'spell-dispel': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Limpia debuffs oscuros y arrebata bufos rivales por sólo 6 de Maná.',
    },
    'spell-divine-intervention': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Invulnerabilidad y escudo supremo para asegurar la victoria en combates decisivos de final de partida.',
    },
    'spell-radiant-smite': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Daño de luz abrasador con 100% de bonus contra ejércitos de no-muertos y criaturas de sombras.',
      keyUnitsBenefited: ['Inquisidores', 'Paladines'],
    },
    'spell-daylight-clarity': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Aumenta el crítico un +35% y maximiza la moral, garantizando golpes letales en la carga de caballería.',
      keyUnitsBenefited: ['Caballeros', 'Paladines', 'Tiradores'],
    },
    'spell-haste-march': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Expande la movilidad en el mapa en +1.200 puntos, ideal para capturar santuarios en la primera semana.',
    },
    'spell-mana-shield': {
      priority: 'Alta (P3)',
      synergyTip: 'Protege a tiradores de bajo PV convirtiendo el daño en coste de maná.',
    },
    'spell-arcane-bolt': {
      priority: 'Media (P3)',
      synergyTip: 'Útil como ataque a distancia secundario en Día 1 si no se cuenta con tiradores suficientes.',
    },
    'spell-slow': {
      priority: 'Media (P3)',
      synergyTip: 'Ayuda a controlar el mapa en Día 1, aunque Templo prefiere acelerar sus propias tropas.',
    },
    'spell-armageddon': {
      priority: 'Situacional',
      synergyTip: 'Peligroso para Templo: sus tropas no son inmunes a fuego y sombras (salvo que se use Intervención Divina previa).',
    },
  },
  Necrópolis: {
    'spell-shadow-curse': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Colapsa el ataque rival y fija su daño en el mínimo; permite a los Señores Vampiros regenerarse sin sufrir daño.',
      keyUnitsBenefited: ['Señores Vampiros', 'Esqueletos', 'Caballeros de la Muerte'],
    },
    'spell-blind': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Inmoviliza a la mayor amenaza enemiga mientras eliminas al resto del ejército con Liches y Vampiros.',
      keyUnitsBenefited: ['Liches', 'Segadores'],
    },
    'spell-animate-dead': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Reanima pilas caídas de no-muertos; en Nivel 4 las tropas levantadas permanecen al 100% de forma definitiva.',
      keyUnitsBenefited: ['Esqueletos', 'Caballeros del Terror', 'Señores de los Vampiros'],
    },
    'spell-vampiric-touch': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Drena salud masiva al objetivo y sobrecura a todas las tropas no-muertas aliadas.',
      keyUnitsBenefited: ['Señores Vampiros', 'Espectros', 'Liches'],
    },
    'spell-teleport': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Inserta Señores Vampiros en la retaguardia de arqueros rivales con ataque inmediato gratuito.',
      keyUnitsBenefited: ['Señores Vampiros', 'Caballeros de la Muerte'],
    },
    'spell-despair': {
      priority: 'Alta (P3)',
      synergyTip: 'Provoca pérdidas continuas de turno por moral negativa (-4 a Moral) en tropas vivas enemigas.',
      keyUnitsBenefited: ['Todo el ejército'],
    },
    'spell-fatal-decay': {
      priority: 'Alta (P3)',
      synergyTip: 'Infección continua que debilita monstruos gigantescos y explota al matarlos en cadena.',
      keyUnitsBenefited: ['Espectros', 'Liches'],
    },
    'spell-toxic-cloud': {
      priority: 'Alta (P3)',
      synergyTip: 'Sofoca a tropas vivas en un área amplia y ciega a tiradores enemigos sin afectar a tus tropas no-muertas.',
      keyUnitsBenefited: ['Todo el ejército no-muerto'],
    },
    'spell-haste-march': {
      priority: 'Alta (P3)',
      synergyTip: 'Aumenta el rango de movimiento de los héroes nigromantes para recolectar esqueletos en cementerios distantes.',
    },
    'spell-town-portal': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Recoge refuerzos semanales de múltiples necrópolis y defiende criptas en 1 solo turno.',
    },
    'spell-dimension-door': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Desplazamiento relámpago en el mapa de aventura para cazar héroes enemigos sin escapatoria.',
    },
    'spell-armageddon': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Devastador si se sacrifican esqueletos de bajo coste o con héroes especializados en alta resistencia.',
    },
    'spell-dispel': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Vital para eliminar Bendiciones y Aceleraciones enemigas que amenacen a tus tropas lentas.',
    },
    'spell-haste': {
      priority: 'Media (P3)',
      synergyTip: 'Útil para dar movilidad a Zombis y Momias, aunque Necrópolis prioriza debuffs.',
    },
  },
  Mazmorra: {
    'spell-armageddon': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'COMBO DRAGO-ARMAGEDDON: Los Dragones Negros son 100% inmunes a magia N5. Extermina todo el ejército rival en Turno 1.',
      keyUnitsBenefited: ['Dragones Negros', 'Dragones Rojos'],
    },
    'spell-slow': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'El mejor hechizo de control para Días 1-7. Permite a Medusas y Asesinos disparar sin recibir daño de neutrales.',
      keyUnitsBenefited: ['Medusas', 'Asesinos de la Sombra', 'Trogloditas'],
    },
    'spell-teleport': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Coloca a la Hidra Infernal en medio de 4 escuadras enemigas para que descargue su ataque de 360º con +20% daño.',
      keyUnitsBenefited: ['Hidras Infernales', 'Minotauros'],
    },
    'spell-arcane-bolt': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Herramienta vital para Días 1 al 7. Elimina pilas de tiradores neutrales desde lejos con cero bajas aliadas.',
      keyUnitsBenefited: ['Héroe Brujo', 'Zakron'],
    },
    'spell-implosion': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Vaporiza instantáneamente cualquier criatura enemiga de Tier 7 o pila gigante de un solo golpe gravitatorio.',
      keyUnitsBenefited: ['Héroes con alto Poder Mágico'],
    },
    'spell-fire-wall': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Crea barreras de fuego que bloquean cargas directas hacia tus Medusas y Asesinos.',
      keyUnitsBenefited: ['Medusas', 'Asesinos'],
    },
    'spell-quicksand': {
      priority: 'Alta (P3)',
      synergyTip: 'Frena en seco la vanguardia enemiga permitiendo que tus tiradores y magia acaben con ellos.',
    },
    'spell-blind': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Aísla a la mayor amenaza enemiga mientras tus unidades concentran daño en el resto del ejército.',
      keyUnitsBenefited: ['Minotauros', 'Hidras'],
    },
    'spell-town-portal': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Recoge refuerzos de tus ciudades subterráneas y defiende tus Vórtices de Maná al instante.',
    },
    'spell-dimension-door': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Asalto implacable sobre la superficie y castillos rivales en 1 solo turno.',
    },
    'spell-haste': {
      priority: 'Alta (P3)',
      synergyTip: 'Permite que Minotauros e Hidras alcancen las líneas enemigas en el Turno 1 antes de que disparen.',
      keyUnitsBenefited: ['Minotauros', 'Hidras'],
    },
    'spell-thick-hide': {
      priority: 'Alta (P3)',
      synergyTip: 'Convierte a Trogloditas y Minotauros en tanques resistentes frente a daño físico neutral.',
      keyUnitsBenefited: ['Trogloditas', 'Minotauros'],
    },
  },
  Foresta: {
    'spell-slow': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Imprescindible para Faunos Arqueros y Herbomantes. Permite múltiples ráfagas a distancia sin peligro.',
      keyUnitsBenefited: ['Faunos Arqueros', 'Herbomantes', 'Iriyads'],
    },
    'spell-blessing': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Garantiza el daño máximo de Faunos y Hoplitas y añade daño sagrado a cada golpe.',
      keyUnitsBenefited: ['Faunos Arqueros', 'Hoplitas', 'Herbomantes'],
    },
    'spell-thick-hide': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Convierte a los Hoplitas en una muralla impenetrable con +8 de Defensa y -15% daño físico plano.',
      keyUnitsBenefited: ['Hoplitas', 'Aqualotls'],
    },
    'spell-quicksand': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Bloquea los caminos hacia los Faunos y Herbomantes; las Iriyads enraízan a quien cruce.',
      keyUnitsBenefited: ['Faunos Arqueros', 'Iriyads'],
    },
    'spell-fire-wall': {
      priority: 'Alta (P3)',
      synergyTip: 'Protege las posiciones defensivas de la falange silvana.',
    },
    'spell-haste': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Permite a Qilins celestiales y Fénix cruzar el campo en Turno 1 y hostigar a tiradores rivales.',
      keyUnitsBenefited: ['Qilins del Trueno', 'Fénix'],
    },
    'spell-cure': {
      priority: 'Alta (P3)',
      synergyTip: 'Sana a la falange de Hoplitas y Aqualotls, purgando venenos en combates prolongados.',
      keyUnitsBenefited: ['Hoplitas', 'Aqualotls', 'Qilins'],
    },
    'spell-meteor-shower': {
      priority: 'Alta (P3)',
      synergyTip: 'Castiga a ejércitos compactos que intenten romper las líneas silvanas.',
      keyUnitsBenefited: ['Héroes de Foresta'],
    },
    'spell-implosion': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Permite fulminar amenazas colosales que resistan el fuego a distancia.',
    },
    'spell-town-portal': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Fundamental para defender arboledas sagradas y concentrar huestes de Jadame.',
    },
    'spell-dimension-door': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Movilidad absoluta para sortear ríos y bosques densos sin penalización.',
    },
    'spell-dispel': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Limpia ralentizaciones enemigas sobre tus Qilins y Faunos.',
    },
  },
  Colmena: {
    'spell-haste': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Crucial para Mantis y Avispas: cruzan todo el mapa en Turno 1 y bloquean a los tiradores rivales.',
      keyUnitsBenefited: ['Mantis Voraces', 'Avispas Asesinas', 'Zánganos'],
    },
    'spell-thick-hide': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Convierte a los Escarabajos Acorazados en tanques absorbentes de daño mientras las larvas crecen.',
      keyUnitsBenefited: ['Escarabajos Acorazados', 'Colosos Quitinosos'],
    },
    'spell-slow': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Impide que la infantería pesada enemiga acuda al rescate de sus arqueros asaltados.',
      keyUnitsBenefited: ['Todo el enjambre'],
    },
    'spell-teleport': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Teletransporta a los Colosos Quitinosos detrás de las murallas enemigas con ataque gratis inmediato.',
      keyUnitsBenefited: ['Colosos Quitinosos', 'Mantis'],
    },
    'spell-quicksand': {
      priority: 'Alta (P3)',
      synergyTip: 'Inmoviliza a la vanguardia enemiga mientras las Avispas vuelan libremente por encima de las trampas.',
      keyUnitsBenefited: ['Avispas Asesinas', 'Mantis'],
    },
    'spell-arcane-bolt': {
      priority: 'Alta (P3)',
      synergyTip: 'Herramienta de daño directo para apoyar el asalto de las tropas ligeras en Día 1-7.',
      keyUnitsBenefited: ['Héroes Heraldos de Magia'],
    },
    'spell-earthquake': {
      priority: 'Alta (P3)',
      synergyTip: 'Destruye murallas en asedios para facilitar el paso de la horda insectoide.',
    },
    'spell-town-portal': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Permite concentrar enjambres masivos de múltiples colmenas en 1 solo turno de invasión.',
    },
    'spell-dimension-door': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Salto de enjambre relámpago para atacar capitales enemigas desprevenidas.',
    },
    'spell-dispel': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Limpia muros de fuego y ralentizaciones que frenen el avance del enjambre.',
    },
  },
  Cisma: {
    'spell-arcane-bolt': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'En Nivel 4 causa Distorsión de Realidad, haciendo que el próximo ataque enemigo tenga 50% de fallar.',
      keyUnitsBenefited: ['Sister Keiri', 'Héroes del Cisma'],
    },
    'spell-teleport': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Desplaza a los Enviados Abisales y Shoths directamente a la retaguardia enemiga con ataque gratis.',
      keyUnitsBenefited: ['Enviados Abisales', 'Supervisores', 'Jinetes Aga\'Shoth'],
    },
    'spell-early-start': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Adelanta el turno de todo el ejército del Cisma un +50% en la barra de iniciativa.',
      keyUnitsBenefited: ['Todo el ejército de Cisma'],
    },
    'spell-time-warp': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Permite que Enviados Abisales y Árbitros actúen dos veces consecutivas en el mismo turno.',
      keyUnitsBenefited: ['Enviados Abisales', 'Árbitros de la Grieta'],
    },
    'spell-mana-drain': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Drena el maná del héroe rival antes de que lance sus conjuros y otorga lanzamiento gratuito.',
      keyUnitsBenefited: ['Sister Keiri', 'Héroes del Vacío'],
    },
    'spell-dispel': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Disipación Universal Masiva a 6 Maná purga debuffs aliados y despoja buffs enemigos.',
      keyUnitsBenefited: ['Todo el ejército'],
    },
    'spell-energize': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Resetea instantáneamente las recargas de habilidades de Concubos y Árbitros con +30% daño.',
      keyUnitsBenefited: ['Concubos', 'Árbitros de la Grieta'],
    },
    'spell-optical-illusion': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Duplica Enviados Abisales y Árbitros con réplicas inmunes a disipación que absorben 3 impactos.',
      keyUnitsBenefited: ['Enviados Abisales', 'Árbitros de la Grieta'],
    },
    'spell-chain-lightning': {
      priority: 'Muy Alta (P2)',
      synergyTip: 'Descarga un rayo en cadena sobre 7 objetivos enemigos con daño masivo devastador.',
      keyUnitsBenefited: ['Héroes del Cisma'],
    },
    'spell-town-portal': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Conexión instantánea entre templos del vacío y santuarios de Vori.',
    },
    'spell-dimension-door': {
      priority: 'Imprescindible (P1)',
      synergyTip: 'Salto dimensional a través de las fallas espaciales de Jadame.',
    },
    'spell-dusk-dampening': {
      priority: 'Alta (P3)',
      synergyTip: 'Protege a las tropas del Cisma frente a magia enemiga y absorbe maná residual.',
      keyUnitsBenefited: ['Cultistas', 'Jinetes Aga\'Shoth', 'Ra\'Shoths'],
    },
  },
};

// Funciones selectoras y de ayuda
export function getFactionSpellPriority(spellId: string, faction: FactionId): SpellFactionPriority | null {
  const canonical = normalizeFactionKey(faction);
  const factionData = FACTION_SPELL_PRIORITIES[canonical];
  if (!factionData) return null;
  return factionData[spellId] || null;
}

export function getFactionCombos(faction: FactionId): FactionSpellCombo[] {
  const canonical = normalizeFactionKey(faction);
  return FACTION_SPELL_COMBOS[canonical] || FACTION_SPELL_COMBOS.Mazmorra;
}

export function getFactionMagicProfile(faction: FactionId): FactionMagicProfile {
  const canonical = normalizeFactionKey(faction);
  return FACTION_MAGIC_PROFILES[canonical] || FACTION_MAGIC_PROFILES.Mazmorra;
}
