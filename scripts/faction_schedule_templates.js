
const FACTION_CONFIGS = {
  temple: {
    file: 'src/data/templeData.ts',
    varName: 'TEMPLE_56_DAY_BUILD_STEPS',
    capital: 'Karigor (Capital)',
    secondCity: 'Segunda Ciudad de Karigor',
    thirdCity: 'Tercera Ciudad Fronteriza',
    dwellings: {
      t1: 'Campo de Tiro de Ballesteros',
      t2: 'Barracones de Infantería',
      t3: 'Nido de Grifos',
      t4: 'Capilla de la Gota Solar',
      t5: 'Hipódromo',
      t6: 'Basílica del Umbral',
      t7: 'Forja Radiante (Ángeles)',
      t1_t2_third: 'Campo de Ballesteros y Barracones',
      t3_t5_third: 'Nido de Grifos e Hipódromo',
    },
    grail: 'Catedral de la Luz Eterna',
    rareResource: 'crystal',
    rareResource2: 'gems',
    rareName: 'Cristal y Gemas',
  },
  necropolis: {
    file: 'src/data/necropolisData.ts',
    varName: 'NECROPOLIS_56_DAY_BUILD_STEPS',
    capital: 'Shadowspire (Capital)',
    secondCity: 'Segunda Necrópolis de las Sombras',
    thirdCity: 'Tercer Osario Fronterizo',
    dwellings: {
      t1: 'Criptas y Tumbas',
      t2: 'Pabellón Silencioso',
      t3: 'Perrera de Sabuesos',
      t4: 'Cámara de Saqueatumbas',
      t5: 'Mansión Intemporal (Vampiros)',
      t6: 'Tumba de Guerreros',
      t7: 'Château de los Festines (Segadores)',
      t1_t2_third: 'Criptas y Pabellón Silencioso',
      t3_t5_third: 'Perrera de Sabuesos y Mansión Intemporal',
    },
    grail: 'Monolito del Osario Eterno',
    rareResource: 'mercury',
    rareResource2: 'mercury',
    rareName: 'Mercurio',
  },
  dungeon: {
    file: 'src/data/dungeonData.ts',
    varName: 'FULL_56_DAY_BUILD_STEPS',
    capital: 'Alvar (Capital)',
    secondCity: 'Segunda Ciudad de Alvar',
    thirdCity: 'Tercera Ciudad Subterránea',
    dwellings: {
      t1: 'Cubil de Trogloditas',
      t2: 'Refugio de Infiltradores',
      t3: 'Anfiteatro de Bailarinas de Ónice',
      t4: 'Laberinto de Minotauros',
      t5: 'Voces Silenciadas (Medusas)',
      t6: 'Hogar Ctónico (Hidras)',
      t7: 'Palacio de las Cavernas (Dragones)',
      t1_t2_third: 'Cubil y Refugio Subterráneo',
      t3_t5_third: 'Anfiteatro y Laberinto de Minotauros',
    },
    grail: 'Pilar del Dragón Primordial',
    rareResource: 'gems',
    rareResource2: 'gems',
    rareName: 'Gemas',
  },
  arboleda: {
    file: 'src/data/arboledaData.ts',
    varName: 'ARBOLEDA_56_DAY_BUILD_STEPS',
    capital: 'Bosque Antiguo (Capital)',
    secondCity: 'Segundo Claro Silvano',
    thirdCity: 'Tercer Santuario Arbóreo',
    dwellings: {
      t1: 'Cabañas de Faunos',
      t2: 'Semillero de Lúpulo',
      t3: 'Círculo de Menhires',
      t4: 'Estanque Floreciente',
      t5: 'Choza de Herbomantes',
      t6: 'Guarida del Trueno (Qilins)',
      t7: 'Segunda Pira Sagrada (Fénix)',
      t1_t2_third: 'Cabañas de Faunos y Semillero',
      t3_t5_third: 'Círculo de Menhires y Choza Herbomante',
    },
    grail: 'Trono de los Fénix',
    rareResource: 'gems',
    rareResource2: 'crystal',
    rareName: 'Gemas y Cristal',
  },
  cisma: {
    file: 'src/data/cismaData.ts',
    varName: 'CISMA_56_DAY_BUILD_STEPS',
    capital: 'Falla de Vori (Capital)',
    secondCity: 'Segunda Falla Abisal',
    thirdCity: 'Tercer Baluarte del Vacío',
    dwellings: {
      t1: 'Rito Menor de Invocación',
      t2: 'Aguja de los Cultistas',
      t3: 'Establos de Aga\'Shoth',
      t4: 'Casa de las Cadenas',
      t5: 'Mansión Hinchada (Concubos)',
      t6: 'Santuario del Abismo',
      t7: 'Segunda Cripta del Ojo Cósmico',
      t1_t2_third: 'Ritos Menores y Aguja de Cultistas',
      t3_t5_third: 'Establos de Aga\'Shoth y Casa de Cadenas',
    },
    grail: 'Trono del Ojo Cósmico',
    rareResource: 'mercury',
    rareResource2: 'crystal',
    rareName: 'Mercurio y Cristal',
  },
  enjambre: {
    file: 'src/data/enjambreData.ts',
    varName: 'ENJAMBRE_56_DAY_BUILD_STEPS',
    capital: 'Gran Apiario de Beelzebub (Capital)',
    secondCity: 'Segunda Colmena de Jadame',
    thirdCity: 'Tercer Nido del Enjambre',
    dwellings: {
      t1: 'Vivienda Descuidada',
      t2: 'Guarida de Carroña',
      t3: 'Nido de Papel',
      t4: 'Zigurat Quitináceo',
      t5: 'Cúspide de Zánganos',
      t6: 'Madrigueras de Almas Ardientes',
      t7: 'Segunda Torre del Amor (Reinas)',
      t1_t2_third: 'Vivienda Descuidada y Guarida de Carroña',
      t3_t5_third: 'Nido de Papel y Zigurat Quitináceo',
    },
    grail: 'Trono de la Supermente',
    rareResource: 'crystal',
    rareResource2: 'gems',
    rareName: 'Cristal y Gemas',
  },
};

function generateSecondCitySteps(cfg) {
  const d = cfg.dwellings;
  const rareObj = { [cfg.rareResource]: 2 };
  if (cfg.rareResource2 && cfg.rareResource2 !== cfg.rareResource) {
    rareObj[cfg.rareResource2] = 2;
  }

  return [
    {
      day: 32,
      month: 2,
      week: 5,
      title: `Día 32: Asentamiento en 2ª Ciudad (Sede Nivel 1)`,
      building: `Asentamiento en 2ª Ciudad`,
      buildingTierLevel: `Sede Cívica Nivel 1 • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 2000, wood: 5, ore: 5 },
      heroActions: [
        `Funda y activa la administración en la segunda ciudad (${cfg.secondCity}) para recaudar tributos.`,
        `Garantiza un flujo de 500 de Oro adicionales diarios para costear las obras secundarias.`,
        `El héroe principal despeja los accesos viales y asegura canteras y aserraderos locales.`
      ],
      combatTactic: `Protege las inmediaciones de la 2ª ciudad con una guarnición apostada en el camino principal.`,
      criticalTip: `Iniciar la administración urbana en la 2ª ciudad duplica el potencial de expansión económica.`,
      priority: 'Alta'
    },
    {
      day: 33,
      month: 2,
      week: 5,
      title: `Día 33: Fortificaciones en 2ª Ciudad (Fuerte Nivel 1)`,
      building: `Fortificaciones en 2ª Ciudad`,
      buildingTierLevel: `Defensa Urbana • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 2500, ore: 5, wood: 5 },
      heroActions: [
        `Erige la muralla y empalizada protectora de la segunda ciudad.`,
        `Habilita el reclutamiento local de unidades y protege la urbe contra incursiones errantes.`,
        `El héroe secundario transporta suministros de mineral desde las minas cercanas.`
      ],
      combatTactic: `Las murallas impiden que partidas rápidas de exploración rival tomen la ciudad sin asedio.`,
      criticalTip: `Prerrequisito obligatorio para erigir la Ciudadela y las moradas de criaturas secundarias.`,
      priority: 'Alta'
    },
    {
      day: 34,
      month: 2,
      week: 5,
      title: `Día 34: Mercado en 2ª Ciudad (Comercio Regional)`,
      building: `Mercado en 2ª Ciudad`,
      buildingTierLevel: `Comercio Local • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 1500, wood: 5 },
      heroActions: [
        `Construye el Mercado en la segunda ciudad para permitir el canje local de recursos.`,
        `Mejora las tasas de intercambio comercial globales gracias a contar con dos mercados activos.`,
        `El explorador mapea yacimientos de recursos raros del segundo sector.`
      ],
      combatTactic: `Intercambia excedentes de madera y mineral por ${cfg.rareName} para las moradas de alto rango.`,
      criticalTip: `Prerrequisito estructural para el Banco y el Silo de Recursos de la segunda urbe.`,
      priority: 'Media'
    },
    {
      day: 35,
      month: 2,
      week: 5,
      title: `Día 35: Ciudadela en 2ª Ciudad (+50% Crecimiento)`,
      building: `Ciudadela en 2ª Ciudad`,
      buildingTierLevel: `Fortificación Militar • +50% Crecimiento`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 3500, ore: 10 },
      heroActions: [
        `Eleva las fortificaciones a Ciudadela, instalando foso y torreones de tiro automático.`,
        `Otorga un +50% al crecimiento de todas las criaturas de la segunda ciudad antes de finalizar la semana.`,
        `El comandante principal limpia las guaridas neutrales que rodean el valle secundario.`
      ],
      combatTactic: `El fuego de las torres de la Ciudadela rechaza cualquier tentativa de asalto sin tropas pesadas.`,
      criticalTip: `Completar la Ciudadela antes del amanecer del Día 36 garantiza cosechar levas aumentadas.`,
      priority: 'Crítica'
    },
    {
      day: 36,
      month: 2,
      week: 6,
      title: `Día 36: Alcaldía en 2ª Ciudad (+1.000 Oro/Día)`,
      building: `Alcaldía en 2ª Ciudad`,
      buildingTierLevel: `Economía Central • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 2500 },
      heroActions: [
        `Amplía el ayuntamiento a Alcaldía, sumando +1.000 de Oro diarios a las arcas del reino.`,
        `Los ingresos combinados de tus dos urbes alcanzan una cota financiera superior a 5.500 de Oro por día.`,
        `El héroe principal patrulla la frontera asegurando minas de recursos raros.`
      ],
      combatTactic: `La liquidez de oro permite comprar y mantener ejércitos simultáneos en dos teatros de operaciones.`,
      criticalTip: `Consolida la autosuficiencia económica de la segunda ciudad.`,
      priority: 'Alta'
    },
    {
      day: 37,
      month: 2,
      week: 6,
      title: `Día 37: ${d.t1} en 2ª Ciudad (Tier 1)`,
      building: `${d.t1} en 2ª Ciudad`,
      buildingTierLevel: `Morada de Criatura Tier 1 • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 1000, wood: 5 },
      heroActions: [
        `Erige la primera morada de criaturas en la urbe secundaria para reclutamiento local.`,
        `Forma un contingente inicial de infantería para defender la comarca sin depender de la capital.`,
        `El héroe secundario transporta refuerzos hacia las posiciones avanzadas.`
      ],
      combatTactic: `Las tropas Tier 1 secundarias absorben represalias y patrullan caminos neutrales.`,
      criticalTip: `Duplica la reserva acumulativa de reclutas básicos del reino.`,
      priority: 'Media'
    },
    {
      day: 38,
      month: 2,
      week: 6,
      title: `Día 38: ${d.t2} en 2ª Ciudad (Tier 2)`,
      building: `${d.t2} en 2ª Ciudad`,
      buildingTierLevel: `Morada de Criatura Tier 2 • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 1200, ore: 5 },
      heroActions: [
        `Construye la segunda morada militar en la urbe secundaria para tropas de choque de grado 2.`,
        `Asegura una línea de combate sólida para las batallas territoriales del segundo cuadrante.`,
        `El ejército principal despeja ruinas y santuarios ancestrales.`
      ],
      combatTactic: `Combina tropas de Tier 1 y Tier 2 locales para limpiar bancos de criaturas sin bajas de élite.`,
      criticalTip: `Fortalece el núcleo de maniobra del segundo frente.`,
      priority: 'Media'
    },
    {
      day: 39,
      month: 2,
      week: 6,
      title: `Día 39: ${d.t3} en 2ª Ciudad (Tier 3)`,
      building: `${d.t3} en 2ª Ciudad`,
      buildingTierLevel: `Morada de Criatura Tier 3 • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 1500, ore: 5, wood: 5 },
      heroActions: [
        `Levanta la morada de Tier 3 en la segunda ciudad, sumando tropas rápidas o con ataques especializados.`,
        `Aumenta la pegada de la guarnición secundaria para rechazar escaramuzas enemigas.`,
        `El explorador vigila los pasos de montaña hacia el territorio rival.`
      ],
      combatTactic: `Despliega unidades de Tier 3 para flanquear tiradores enemigos en combates locales.`,
      criticalTip: `La tríada básica (Tier 1 a 3) queda completamente operativa en la 2ª urbe.`,
      priority: 'Media'
    },
    {
      day: 40,
      month: 2,
      week: 6,
      title: `Día 40: ${d.t4} en 2ª Ciudad (Tier 4)`,
      building: `${d.t4} en 2ª Ciudad`,
      buildingTierLevel: `Morada de Criatura Tier 4 • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 2000, wood: 5, ...rareObj },
      heroActions: [
        `Consagra la morada de Tier 4 en la base secundaria aportando criaturas con capacidades intermedias de impacto.`,
        `Eleva el poder militar del segundo contingente para asaltos a puestos avanzados.`,
        `El comandante principal recibe pertrechos y refuerzos de la capital.`
      ],
      combatTactic: `Aprovecha las habilidades de Tier 4 para controlar el ritmo de combate en el segundo frente.`,
      criticalTip: `Infraestructura militar intermedia afianzada en la segunda ciudad.`,
      priority: 'Media'
    },
    {
      day: 41,
      month: 2,
      week: 6,
      title: `Día 41: ${d.t5} en 2ª Ciudad (Tier 5)`,
      building: `${d.t5} en 2ª Ciudad`,
      buildingTierLevel: `Morada de Criatura Tier 5 • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 3000, wood: 5, ore: 5, ...rareObj },
      heroActions: [
        `Construye la morada de Tier 5 en la segunda urbe para sumar tropas pesadas de asalto.`,
        `Genera unidades temibles capaces de quebrar defensas rivales por sí solas.`,
        `El héroe principal consolida las líneas fronterizas.`
      ],
      combatTactic: `Las tropas Tier 5 absorben el foco enemigo mientras los tiradores disparan con total impunidad.`,
      criticalTip: `Tier 5 asegurado en ambas urbes: el ejército cuenta con doble fuente de tropas pesadas.`,
      priority: 'Alta'
    },
    {
      day: 42,
      month: 2,
      week: 6,
      title: `Día 42: ${d.t6} en 2ª Ciudad (Tier 6)`,
      building: `${d.t6} en 2ª Ciudad`,
      buildingTierLevel: `Morada de Criatura Tier 6 • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 4000, ore: 5, wood: 5, ...rareObj },
      heroActions: [
        `Erige la morada de Tier 6 en la segunda ciudad desbloqueando colosos de élite pre-supremos.`,
        `Prepara el terreno para la duplicación inminente de la criatura suprema de Tier 7.`,
        `El segundo ejército se posiciona para la apertura del tercer sector de Jadame.`
      ],
      combatTactic: `Despliega unidades de Tier 6 con habilidades de área o ataques demoledores.`,
      criticalTip: `Eslabón previo indispensable para completar el circuito de reclutamiento de élite.`,
      priority: 'Alta'
    },
    {
      day: 43,
      month: 2,
      week: 7,
      title: `Día 43: ${d.t7} en 2ª Ciudad (Segunda Morada Tier 7)`,
      building: `${d.t7} en 2ª Ciudad`,
      buildingTierLevel: `Morada de Criatura Suprema Duplicada • Tier 7`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 8000, wood: 10, ore: 10, ...rareObj },
      heroActions: [
        `Construye la segunda morada de Tier 7 en la urbe secundaria, duplicando el reclutamiento semanal de criaturas supremas.`,
        `Ambas ciudades producen unidades legendarias cada lunes, cimentando una ventaja militar abrumadora.`,
        `El comandante principal concentra las tropas legendarias para aplastar al ejército rival.`
      ],
      combatTactic: `La presencia de criaturas de Tier 7 en dos ejércitos distintos anula la capacidad de maniobra enemiga.`,
      criticalTip: `Punto de inflexión estratégico absoluto: producción duplicada de la unidad suprema.`,
      priority: 'Crítica'
    },
    {
      day: 44,
      month: 2,
      week: 7,
      title: `Día 44: Castillo en 2ª Ciudad (+100% Crecimiento)`,
      building: `Castillo en 2ª Ciudad`,
      buildingTierLevel: `Fortificación Defensiva Máxima • +100% Crecimiento`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 5000, ore: 10, wood: 10 },
      heroActions: [
        `Completa las almenas mayores, foso y tres torres de tiro del Castillo en la segunda urbe.`,
        `Eleva el crecimiento de criaturas de la 2ª ciudad al +100%, equiparando su producción a la capital.`,
        `La segunda ciudad se convierte en una plaza fuerte inexpugnable ante contragolpes enemigos.`
      ],
      combatTactic: `Las torres de asedio y la muralla pesada destruyen partidas invasoras antes de entrar a la plaza.`,
      criticalTip: `Maximiza el rendimiento semanal de todas las moradas construidas en la base secundaria.`,
      priority: 'Crítica'
    },
    {
      day: 45,
      month: 2,
      week: 7,
      title: `Día 45: Banco / Tesorería en 2ª Ciudad (+1.000 Oro/Día)`,
      building: `Banco en 2ª Ciudad`,
      buildingTierLevel: `Economía Avanzada • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 3000, wood: 5, ore: 5 },
      heroActions: [
        `Inaugura la sede bancaria en la segunda ciudad, inyectando otros 1.000 de Oro diarios a la corona.`,
        `Los ingresos diarios totales del imperio superan holgadamente los 7.000 de Oro.`,
        `El ejército principal marcha hacia las inmediaciones de la tercera ciudad.`
      ],
      combatTactic: `Reserva continua de oro para costear el reclutamiento simultáneo de tropas en dos castillos.`,
      criticalTip: `Prerrequisito cívico para erigir el Silo de Recursos de la segunda ciudad.`,
      priority: 'Alta'
    },
    {
      day: 46,
      month: 2,
      week: 7,
      title: `Día 46: Silo de Recursos en 2ª Ciudad (+${cfg.rareName})`,
      building: `Silo de Recursos en 2ª Ciudad`,
      buildingTierLevel: `Generador Diario de Recursos Raros • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 5000, ore: 5 },
      heroActions: [
        `Erige el Silo de Recursos en la segunda urbe para generar ${cfg.rareName} adicional cada amanecer.`,
        `Garantiza el suministro de recursos raros requerido por la segunda morada de Tier 7.`,
        `El héroe secundario asegura la conexión logística entre las dos urbes.`
      ],
      combatTactic: `Elimina la dependencia de minas exteriores vulnerables para el sostenimiento de tropas legendarias.`,
      criticalTip: `Coste canónico estricto de 5.000 de Oro y 5 de Mineral.`,
      priority: 'Alta'
    },
    {
      day: 47,
      month: 2,
      week: 7,
      title: `Día 47: Cofradía de Magos Nivel 1 en 2ª Ciudad`,
      building: `Cofradía de Magos Nivel 1 en 2ª Ciudad`,
      buildingTierLevel: `Magia de Reino • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 1000, wood: 5, ore: 5 },
      heroActions: [
        `Funda la Cofradía de Magos en la segunda ciudad para que los héroes de guardia aprendan hechizos de grado 1.`,
        `Permite la recarga inmediata de maná en la base secundaria sin retornar a la capital.`,
        `El explorador adquiere pergaminos de apoyo táctico local.`
      ],
      combatTactic: `Asegura que los comandantes patrulleros cuenten con conjuros básicos en cada combate.`,
      criticalTip: `Infraestructura arcana local esencial para operaciones en el sector secundario.`,
      priority: 'Media'
    },
    {
      day: 48,
      month: 2,
      week: 7,
      title: `Día 48: Cofradía de Magos Nivel 2 en 2ª Ciudad`,
      building: `Cofradía de Magos Nivel 2 en 2ª Ciudad`,
      buildingTierLevel: `Magia Intermedia • Segunda Ciudad`,
      cityScope: 'Ciudad Secundaria',
      cityName: cfg.secondCity,
      cost: { gold: 2000, wood: 5, ore: 5, ...rareObj },
      heroActions: [
        `Amplía la Cofradía de Magos de la segunda ciudad a nivel 2 desbloqueando conjuros de segundo grado.`,
        `Los generales auxiliares potencian su poder ofensivo y defensivo en campaña.`,
        `El ejército principal toma posiciones en el tercer cuadrante de Jadame.`
      ],
      combatTactic: `Dispone de hechizos de bendición de área y daño elemental en el segundo frente.`,
      criticalTip: `Culmina el desarrollo central de la segunda ciudad con pleno autoabastecimiento militar y mágico.`,
      priority: 'Alta'
    },
  ];
}

function generateThirdCitySteps(cfg) {
  const d = cfg.dwellings;
  const rareObj = { [cfg.rareResource]: 2 };

  return [
    {
      day: 49,
      month: 2,
      week: 7,
      title: `Día 49: Asentamiento en 3ª Ciudad (Sede Nivel 1)`,
      building: `Asentamiento en 3ª Ciudad`,
      buildingTierLevel: `Sede Cívica Nivel 1 • Tercera Ciudad`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 2000, wood: 5, ore: 5 },
      heroActions: [
        `Establece la administración civil en la tercera ciudad del reino (${cfg.thirdCity}).`,
        `Activa la recaudación de oro base y consolida el dominio sobre el tercer cuadrante continental.`,
        `El ejército principal pacifica el territorio perimetral asegurando caminos y pasos.`
      ],
      combatTactic: `Establece una línea de vigilancia con infantería veterana para blindar la fundación.`,
      criticalTip: `Tercera y última ciudad del plan de expansión del reino (tope máximo de 3 ciudades).`,
      priority: 'Alta'
    },
    {
      day: 50,
      month: 2,
      week: 8,
      title: `Día 50: Fortificaciones en 3ª Ciudad (Fuerte Nivel 1)`,
      building: `Fortificaciones en 3ª Ciudad`,
      buildingTierLevel: `Defensa Urbana • Tercera Ciudad`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 2500, ore: 5, wood: 5 },
      heroActions: [
        `Construye la muralla y atalayas defensivas de la tercera ciudad.`,
        `Habilita el reclutamiento local de tropas y protege el asentamiento fronterizo.`,
        `El héroe secundario transporta recursos y pertrechos al nuevo bastión.`
      ],
      combatTactic: `La muralla anula intentos de hostigamiento y captura furtiva por parte de guerrillas errantes.`,
      criticalTip: `Prerrequisito defensivo para desbloquear la Ciudadela y moradas de la 3ª ciudad.`,
      priority: 'Alta'
    },
    {
      day: 51,
      month: 2,
      week: 8,
      title: `Día 51: Mercado en 3ª Ciudad (Intercambio Fronterizo)`,
      building: `Mercado en 3ª Ciudad`,
      buildingTierLevel: `Comercio Local • Tercera Ciudad`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 1500, wood: 5 },
      heroActions: [
        `Instala el Mercado en la tercera urbe para comerciar excedentes locales de materiales.`,
        `Con tres mercados operando en el reino, las tasas de cambio de materias primas alcanzan su ratio óptimo.`,
        `El héroe principal limpia los últimos focos de hostilidad de la zona.`
      ],
      combatTactic: `Canjea madera acumulada por oro y recursos raros para las construcciones finales.`,
      criticalTip: `Prerrequisito indispensable para erigir la Alcaldía en la tercera ciudad.`,
      priority: 'Media'
    },
    {
      day: 52,
      month: 2,
      week: 8,
      title: `Día 52: Ciudadela en 3ª Ciudad (+50% Crecimiento)`,
      building: `Ciudadela en 3ª Ciudad`,
      buildingTierLevel: `Fortificación Militar • +50% Crecimiento`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 3500, ore: 10 },
      heroActions: [
        `Eleva el Fuerte a Ciudadela en la tercera urbe, añadiendo foso y torreones avanzados.`,
        `Otorga un +50% al crecimiento de todas las moradas de la base terciaria.`,
        `El ejército auxiliar integra tropas locales para custodiar los accesos al valle.`
      ],
      combatTactic: `El fuego cruzado de las torres defensivas aniquila incursiones rápidas sin necesidad de trabarse en combate.`,
      criticalTip: `Garantiza producción aumentada en los tres bastiones del imperio.`,
      priority: 'Alta'
    },
    {
      day: 53,
      month: 2,
      week: 8,
      title: `Día 53: Alcaldía en 3ª Ciudad (+1.000 Oro/Día)`,
      building: `Alcaldía en 3ª Ciudad`,
      buildingTierLevel: `Economía Central • Tercera Ciudad`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 2500 },
      heroActions: [
        `Amplía el ayuntamiento a Alcaldía sumando +1.000 de Oro adicionales diarios al tesoro.`,
        `La economía del imperio alcanza su cenit recaudatorio sumando los ingresos de tres alcaldías activas.`,
        `El comandante principal inspecciona el cordón defensivo territorial.`
      ],
      combatTactic: `Los ingresos masivos diarios cubren sin fisuras la compra y mejora de todas las levas del imperio.`,
      criticalTip: `Triple alcaldía operativa: economía continental plenamente asegurada.`,
      priority: 'Alta'
    },
    {
      day: 54,
      month: 2,
      week: 8,
      title: `Día 54: ${d.t1_t2_third} en 3ª Ciudad (Tier 1 y 2)`,
      building: `${d.t1_t2_third} en 3ª Ciudad`,
      buildingTierLevel: `Moradas de Infantería • Tercera Ciudad`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 2000, wood: 5, ore: 5 },
      heroActions: [
        `Construye las moradas de infantería básica en la tercera ciudad para levas locales permanentes.`,
        `Crea una guarnición autosuficiente para patrullar y defender el tercer cuadrante.`,
        `El héroe secundario asegura el flujo ininterrumpido de suministros.`
      ],
      combatTactic: `Forma una línea defensiva de infantería local para defender los caminos de la 3ª ciudad.`,
      criticalTip: `Autonomía defensiva asegurada en la base más alejada de la capital.`,
      priority: 'Media'
    },
    {
      day: 55,
      month: 2,
      week: 8,
      title: `Día 55: ${d.t3_t5_third} en 3ª Ciudad (Tier 3 y 5)`,
      building: `${d.t3_t5_third} en 3ª Ciudad`,
      buildingTierLevel: `Moradas de Choque y Asalto • Tercera Ciudad`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 4000, wood: 5, ore: 5, ...rareObj },
      heroActions: [
        `Erige las moradas avanzadas en la tercera ciudad para reclutamiento de unidades de choque rápido.`,
        `Permite reclutar fuerzas de élite directamente en el sector más avanzado de la frontera.`,
        `El ejército principal concentra las legiones en posición triunfal.`
      ],
      combatTactic: `Tropas pesadas y de respuesta rápida listas para acudir a cualquier punto de la frontera.`,
      criticalTip: `Fuerza de asalto establecida en los tres vértices estratégicos del reino.`,
      priority: 'Alta'
    },
    {
      day: 56,
      month: 2,
      week: 8,
      title: `Día 56: Castillo en 3ª Ciudad (+100% Crecimiento Final)`,
      building: `Castillo en 3ª Ciudad`,
      buildingTierLevel: `Fortificación Defensiva Máxima • Tope 56 Días de Construcción`,
      cityScope: 'Tercera Ciudad',
      cityName: cfg.thirdCity,
      cost: { gold: 5000, ore: 10, wood: 10 },
      heroActions: [
        `Completa las almenas mayores, murallas ciclópeas y foso del Castillo en la tercera ciudad.`,
        `Alcanza el +100% de crecimiento en las tres ciudades del imperio en el Día 56 (tope máximo de la cronología).`,
        `Las tres fortalezas quedan enteramente desarrolladas, inexpugnables y con su ciclo de construcción completado.`
      ],
      combatTactic: `Red de tres castillos infranqueable que domina el territorio continental por completo.`,
      criticalTip: `Día 56 alcanzado (tope máximo canónico). Las tres ciudades quedan plenamente erigidas.`,
      priority: 'Crítica'
    },
  ];
}

export { FACTION_CONFIGS, generateSecondCitySteps, generateThirdCitySteps };
