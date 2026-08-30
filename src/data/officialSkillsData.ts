import { OfficialSkill } from '../types';
import { SKILL_SELECTION_GUIDES } from './subskillsRecommendationData';

const OFFICIAL_SKILLS_RAW_DATA: OfficialSkill[] = [
  {
    id: 'arte-de-asedio',
    name: 'Arte de asedio',
    category: 'Común',
    upgrades: {
      basic: 'La catapulta inflige +50 de daño.',
      advanced: 'La catapulta inflige +100 de daño.',
      expert: 'La catapulta inflige +150 de daño.',
    },
    subskills: {
      advanced: [
        {
          name: 'Asalto implacable',
          tierLevel: 'Avanzado',
          effect: 'Durante el asedio a una ciudad, las criaturas amistosas obtienen +1 de velocidad e iniciativa.',
        },
        {
          name: 'Observadores avanzados',
          tierLevel: 'Avanzado',
          effect: 'Los muros no reducen el daño a distancia de las criaturas amistosas durante un asedio.',
        },
        {
          name: 'Andanada',
          tierLevel: 'Avanzado',
          effect: 'Otorga una aptitud de asedio nueva. Ataca una casilla seleccionada y todas las casillas adyacentes. Se puede usar una vez por ronda.',
        },
      ],
      expert: [
        {
          name: 'Falange',
          tierLevel: 'Experto',
          effect: 'Durante el asedio a una ciudad, las criaturas amistosas reciben -50 % de daño de las torres del defensor.',
        },
        {
          name: 'Túnel',
          tierLevel: 'Experto',
          effect: 'Otorga una aptitud de asedio nueva. Teletransporta a una criatura amistosa a una casilla libre seleccionada hasta 3 casillas de distancia. Se puede usar una vez por ronda.',
        },
        {
          name: 'Sabotaje',
          tierLevel: 'Experto',
          effect: 'Mientras el héroe está asediando una ciudad, la puerta enemiga siempre está abierta.',
        },
      ],
    },
    startingHeroes: [],
    requiredByClasses: [],
  },
  {
    id: 'arte-de-batalla',
    name: 'Arte de batalla',
    category: 'Común',
    upgrades: {
      basic: 'Cuando una criatura amistosa espera en su turno, obtiene +20 % de ataque hasta el final de la ronda. Cuando se salta un turno, obtiene +20 % de defensa hasta el final de la ronda.',
      advanced: 'Cuando una criatura amistosa espera en su turno, obtiene +30 % de ataque hasta el final de la ronda. Cuando se salta un turno, obtiene +30 % de defensa hasta el final de la ronda.',
      expert: 'Cuando una criatura amistosa espera en su turno, obtiene +40 % de ataque hasta el final de la ronda. Cuando se salta un turno, obtiene +40 % de defensa hasta el final de la ronda.',
    },
    subskills: {
      advanced: [
        {
          name: 'Maestría en cuerpo a cuerpo',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas infligen +10% y reciben -10% de daño cuerpo a cuerpo.',
        },
        {
          name: 'Maestría a distancia',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas infligen +10 % y reciben -10 % de daño a distancia y de largo alcance.',
        },
        {
          name: 'Vigilancia',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas obtienen Vigilancia cuando eligen esperar en combate. Mientras dura Vigilancia, contraatacarán cuando un enemigo entre dentro de su alcance de combate cuerpo a cuerpo.',
        },
      ],
      expert: [
        {
          name: 'Concentración en combate',
          tierLevel: 'Experto',
          effect: 'Genera +1 carga(s) de concentración al comienzo de cada ronda, excepto la primera. Esta bonificación se duplica si el héroe conoce "Magia de batalla".',
        },
        {
          name: 'Ataque preventivo',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas se preparan para realizar un ataque preventivo cuando deciden saltar su turno. Si les atacan, su contraataque impactará antes del primer golpe enemigo.',
        },
        {
          name: 'Manamancia',
          tierLevel: 'Experto',
          effect: 'El maná máximo del héroe aumenta en 2 según su ataque y defensa. Esta bonificación se duplica si el héroe conoce "Reclutamiento".',
        },
      ],
    },
    startingHeroes: ['Jänhei', 'Pauper', 'Tellaris el Traicionado', 'Adahn', 'Lord Edgar'],
    requiredByClasses: ['Furia del cielo (Arboleda)', 'Imparable (Cisma)', 'Madre de cría (Enjambre)', 'Heredero de Amelchia (Mazmorra)', 'Tejedor de almas (Necrópolis)', 'Dechado (Templo)'],
  },
  {
    id: 'combate',
    name: 'Combate',
    category: 'Clase',
    upgrades: {
      basic: 'Golpe heroico inflige +10 de daño básico.',
      advanced: 'Golpe heroico inflige +15 de daño básico.',
      expert: 'Golpe heroico inflige +20 de daño básico.',
    },
    subskills: {
      advanced: [
        {
          name: 'Esgrima',
          tierLevel: 'Avanzado',
          effect: '+2 de ataque y defensa.',
        },
        {
          name: 'Venganza',
          tierLevel: 'Avanzado',
          effect: 'Una vez por ronda, después de la primera muerte de una formación amistosa, permite usar un golpe heroico nuevamente.',
        },
        {
          name: 'Golpe poderoso',
          tierLevel: 'Avanzado',
          effect: 'El golpe heroico inflige +10 % de daño (según el nivel del héroe).',
        },
      ],
      expert: [
        {
          name: 'Golpe sin esfuerzo',
          tierLevel: 'Experto',
          effect: 'Golpe heroico cuesta -1 carga(s) de concentración.',
        },
        {
          name: 'Emoción de la batalla',
          tierLevel: 'Experto',
          effect: 'Una vez por ronda, después de matar a una formación enemiga con un golpe heroico, el héroe puede usarlo una vez más.',
        },
        {
          name: 'Golpe de confusión',
          tierLevel: 'Experto',
          effect: 'El golpe heroico reduce los contraataques del objetivo en 1.',
        },
      ],
    },
    startingHeroes: ['Mreowa', 'Curson, Duque de la Ira', 'Aguijón', 'Viejo lord Mandall'],
    requiredByClasses: [],
  },
  {
    id: 'comunion-abisal',
    name: 'Comunión abisal',
    category: 'Facción',
    faction: 'Cisma',
    upgrades: {
      basic: 'Tras cada victoria, el héroe aumenta su nivel de comunión en 1 (hasta máx. 3). Cada nivel aumenta un 2.5 % las unidades amistosas hasta el final de la batalla. Cada mañana, el nivel de comunión de todos los héroes se reduce a la mitad.',
      advanced: 'Tras cada victoria, el héroe aumenta su nivel de comunión en 1 (hasta máx. 4). Cada nivel aumenta un 2.5 % las unidades amistosas hasta el final de la batalla. Cada mañana, el nivel de comunión de todos los héroes se reduce a la mitad.',
      expert: 'Tras cada victoria, el héroe aumenta su nivel de comunión en 1 (hasta máx. 5). Cada nivel aumenta un 2.5 % las unidades amistosas hasta el final de la batalla. Cada mañana, el nivel de comunión de todos los héroes se reduce a la mitad.',
    },
    subskills: {
      advanced: [
        {
          name: 'Nuestro verdadero hogar',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas del Cisma amistosas infligen +10 % y reciben -10 % de daño en terreno nativo.',
        },
        {
          name: 'Profundidades comprensibles',
          tierLevel: 'Avanzado',
          effect: 'El nivel de comunión máximo del héroe aumenta en 1.',
        },
        {
          name: 'Llamada del vacío',
          tierLevel: 'Avanzado',
          effect: 'Cada mañana, antes de que el nivel de comunión se reduzca a la mitad, restaura 2 de maná por cada nivel de comunión.',
        },
      ],
      expert: [
        {
          name: 'Hielo negro',
          tierLevel: 'Experto',
          effect: 'Los hechizos enemigos cuestan +1 por cada nivel de comunión activo.',
        },
        {
          name: 'Abisopelágico',
          tierLevel: 'Experto',
          effect: 'Cada victoria en combate aumenta el nivel de comunión en 1 más.',
        },
        {
          name: 'Abismo celestial',
          tierLevel: 'Experto',
          effect: 'Aumenta un 0.5 % adicional la cantidad de unidades amistosas por cada nivel de comunión.',
        },
      ],
    },
    startingHeroes: ['Cuerno Negro', 'Dhüvri', 'El Doncel de Hierro', 'Grellekh el Traidor', 'Hermana Keiri', 'Jänhei', 'Kwinri', 'La Mirada Colectiva', 'Mara Mat\'ha', 'Mártir Tho', 'Matastala la Blanca', 'Nihil', 'Ra\'Davok', 'Reina de Hielo Hel\'Ghat', 'Tölketh', 'Ulkuth', 'Urgo el Cambiante', 'Wal\'kha'],
    requiredByClasses: [],
  },
  {
    id: 'defensa',
    name: 'Defensa',
    category: 'Común',
    upgrades: {
      basic: 'Las criaturas amistosas reciben -10 % de daño de los ataques básicos.',
      advanced: 'Las criaturas amistosas reciben -15 % de daño de los ataques básicos.',
      expert: 'Las criaturas amistosas reciben -20 % de daño de los ataques básicos.',
    },
    subskills: {
      advanced: [
        {
          name: 'Cobertura',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas reciben -20 % de daño de ataques a distancia y de largo alcance.',
        },
        {
          name: 'Himno a los mártires',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas generan +1 punto(s) de concentración cuando reciben daño. Esta bonificación se duplica si el héroe conoce "Reclutamiento".',
        },
        {
          name: 'Por voluntad de la suerte',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas obtienen +2 de defensa por cada punto de suerte.',
        },
      ],
      expert: [
        {
          name: 'Escudos y conchas',
          tierLevel: 'Experto',
          effect: 'Las criaturas enemigas infligen -1 de daño.',
        },
        {
          name: 'Contrato de hechicero',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas reciben -10 % de daño mágico. Esta bonificación se duplica si el héroe conoce "Diplomacia".',
        },
        {
          name: 'Fuerza imparable',
          tierLevel: 'Experto',
          effect: '-15 % de ataque a las criaturas enemigas.',
        },
      ],
    },
    startingHeroes: ['Reina de Hielo Hel\'Ghat', 'Zoran el Autofundado', 'Enatee', 'Baluarte', 'John Johnson', 'Julius'],
    requiredByClasses: ['Enviado celestial (Arboleda)', 'Insondable (Cisma)', 'Progenitor (Enjambre)', 'Enviado de Lengua de Plata (Mazmorra)', 'Heraldo de la perdición (Necrópolis)', 'Gran Inquisidor (Templo)'],
  },
  {
    id: 'diplomacia',
    name: 'Diplomacia',
    category: 'Común',
    upgrades: {
      basic: 'Otorga una probabilidad de que las formaciones neutrales se ofrezcan a unirse al ejército del héroe a cambio de oro en lugar de luchar contra él.',
      advanced: 'Otorga una probabilidad de que las formaciones neutrales se ofrezcan a unirse al ejército del héroe a cambio de oro en lugar de luchar contra él. +25 % de poder de persuasión en Diplomacia.',
      expert: 'Otorga una probabilidad de que las formaciones neutrales se ofrezcan a unirse al ejército del héroe a cambio de oro en lugar de luchar contra él. +50 % de poder de persuasión en Diplomacia.',
    },
    subskills: {
      advanced: [
        {
          name: 'Más grande que la vida',
          tierLevel: 'Avanzado',
          effect: 'Las formaciones neutrales ven el ejército del héroe un 25 % más poderoso de lo que es, lo que hace más probable que se unan o huyan. Esta bonificación se duplica si el héroe conoce "Arte de batalla".',
        },
        {
          name: 'Elocuencia',
          tierLevel: 'Avanzado',
          effect: '-75 % al coste de la rendición.',
        },
        {
          name: 'Héroe del pueblo',
          tierLevel: 'Avanzado',
          effect: '+50% de poder de persuasión en Diplomacia con formaciones neutrales de la facción del héroe.',
        },
      ],
      expert: [
        {
          name: 'Arte de negociar',
          tierLevel: 'Experto',
          effect: 'Las formaciones neutrales requieren -15% de oro para ser reclutadas. Esta bonificación se duplica si el héroe conoce "Economía".',
        },
        {
          name: 'Ejército errante',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas con afinidad neutral aumentan su ataque y defensa un +100 % adicional del ataque y la defensa del héroe.',
        },
        {
          name: 'Negociador',
          tierLevel: 'Experto',
          effect: '+20 % al número de unidades a partir de formaciones neutrales que se unen al ejército del héroe.',
        },
      ],
    },
    startingHeroes: ['Seductora Sh\'a', 'Ylwari', 'Rey de Reyes', 'Elias el Alegre'],
    requiredByClasses: ['Favorecidos por el azar (Arboleda)', 'Insensible (Cisma)', 'Progenitor (Enjambre)', 'Guardaespaldas de Baltasar (Mazmorra)', 'Podredumbre ambulante (Necrópolis)', 'Dechado (Templo)'],
  },
  {
    id: 'economia',
    name: 'Economía',
    category: 'Común',
    upgrades: {
      basic: '+500 de oro al día.',
      advanced: '+750 de oro al día.',
      expert: '+1000 de oro al día.',
    },
    subskills: {
      advanced: [
        {
          name: 'Recaudador de impuestos',
          tierLevel: 'Avanzado',
          effect: '+250 de oro al día. Esta bonificación se duplica si el héroe conoce "Logística".',
        },
        {
          name: 'Contrabandista',
          tierLevel: 'Avanzado',
          effect: '+1 de cristales, gemas o mercurio al día (en función de la facción del héroe).',
        },
        {
          name: 'Maestro constructor',
          tierLevel: 'Avanzado',
          effect: '+1 de madera y mineral al día.',
        },
      ],
      expert: [
        {
          name: 'Experimentador',
          tierLevel: 'Experto',
          effect: '+5 de polvo alquímico al día. Esta bonificación se duplica si el héroe conoce "Percepción".',
        },
        {
          name: 'Mercader',
          tierLevel: 'Experto',
          effect: 'Este héroe cuenta como un mercado adicional al calcular los precios.',
        },
        {
          name: 'Anticuario',
          tierLevel: 'Experto',
          effect: 'Este héroe vende artefactos por un 25 % más de oro y los compra por un 25 % menos.',
        },
      ],
    },
    startingHeroes: ['Bathym, Duque de las Joyas', 'Creta, hija de Navarr', 'Glastor', 'Clarissa'],
    requiredByClasses: ['Enviado celestial (Arboleda)', 'Insensible (Cisma)', 'Madre de cría (Enjambre)', 'Gran mercader (Mazmorra)', 'Cronomante (Necrópolis)', 'Ascendente (Templo)'],
  },
  {
    id: 'exploracion',
    name: 'Exploración',
    category: 'Común',
    upgrades: {
      basic: 'El héroe obtiene 1 de radio de visión.',
      advanced: 'El héroe obtiene 2 de radio de visión.',
      expert: 'El héroe obtiene 3 de radio de visión.',
    },
    subskills: {
      advanced: [
        {
          name: 'Vista a gran distancia',
          tierLevel: 'Avanzado',
          effect: 'El radio de visión aumenta en 1 más. Esta bonificación se duplica si el héroe conoce "Suerte".',
        },
        {
          name: 'Caminos familiares',
          tierLevel: 'Avanzado',
          effect: '+10 de puntos de movimiento cuando el héroe comienza el día en una zona que controlas. Esta bonificación se duplica si el héroe conoce "Sabiduría".',
        },
        {
          name: 'Rastreo',
          tierLevel: 'Avanzado',
          effect: 'Las penalizaciones de terreno se reducen un 50 %.',
        },
      ],
      expert: [
        {
          name: 'Reconocimiento',
          tierLevel: 'Experto',
          effect: 'Elimina la niebla de guerra en un radio de [ 150 % × radio de visión del héroe ] cuadro(s) del héroe cada mañana.',
        },
        {
          name: 'Visiones',
          tierLevel: 'Experto',
          effect: 'Muestra la composición exacta del ejército de cualquier enemigo dentro de [ 300 % × radio de visión del héroe ] cuadro(s) del héroe.',
        },
        {
          name: 'Contraespionaje',
          tierLevel: 'Experto',
          effect: 'Los enemigos no pueden ver información detallada sobre tu ejército. Cuando lo intentan, ven una cantidad aleatoria de criaturas aleatorias de tu facción.',
        },
      ],
    },
    startingHeroes: ['Eith', 'Ulkuth', 'Mouaren', 'Natalida', 'Leon Dedos Pegajosos'],
    requiredByClasses: ['Enviado celestial (Arboleda)', 'Sin límites (Cisma)', 'Señor del caos (Enjambre)', 'Enviado de Lengua de Plata (Mazmorra)', 'Heraldo de la perdición (Necrópolis)', 'Gran Inquisidor (Templo)'],
  },
  {
    id: 'fuerza-del-triunvirato',
    name: 'Fuerza del Triunvirato',
    category: 'Facción',
    faction: 'Mazmorra',
    upgrades: {
      basic: 'Una vez por ronda, el héroe puede activar una de las tres posturas en combate. La postura activa otorga al héroe +2 al atributo correspondiente de la postura.',
      advanced: 'Una vez por ronda, el héroe puede activar una de las tres posturas en combate. La postura activa otorga al héroe +4 al atributo correspondiente de la postura.',
      expert: 'Una vez por ronda, el héroe puede activar una de las tres posturas en combate. La postura activa otorga al héroe +6 al atributo correspondiente de la postura.',
    },
    subskills: {
      advanced: [
        {
          name: 'Pasajes subterráneos',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas de Mazmorra amistosas infligen +10 % y reciben -10 % de daño en terreno nativo.',
        },
        {
          name: 'Experiencia alvariana',
          tierLevel: 'Avanzado',
          effect: 'Al seleccionar una postura, el atributo correspondiente del héroe enemigo se reduce parcialmente mientras la postura está activa.',
        },
        {
          name: 'Reservas de maná subterráneas',
          tierLevel: 'Avanzado',
          effect: 'Al seleccionar una postura, el héroe obtiene 3 de maná temporal.',
        },
      ],
      expert: [
        {
          name: 'Maestro de todos los oficios',
          tierLevel: 'Experto',
          effect: 'Al seleccionar una postura, el atributo correspondiente del héroe aumenta un 5 % hasta el final de la batalla.',
        },
        {
          name: 'Fluir',
          tierLevel: 'Experto',
          effect: 'Genera 1 carga(s) de concentración cada vez que el héroe selecciona una postura.',
        },
        {
          name: 'Oportunistas',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas obtienen 1 de iniciativa.',
        },
      ],
    },
    startingHeroes: [
      'Aguijón',
      'Creta, hija de Navarr',
      'Devir, hijo de Devir',
      'Enatee',
      'Glastor',
      'Gleard el Gris',
      'Hermana Deira',
      'Kelarr, hijo de Navarr',
      'Kieran',
      'Lodos',
      'Motley',
      'Mouaren',
      'Rauktol el Soleado',
      'Rhea',
      'Tellaris el Traicionado',
      'Typhona',
      'Ylwari',
      'Zakron el Grande',
    ],
    requiredByClasses: [],
  },
  {
    id: 'hechiceria',
    name: 'Hechicería',
    category: 'Común',
    upgrades: {
      basic: '+10 % de daño mágico infligido.',
      advanced: '+20 % de daño mágico infligido.',
      expert: '+30 % de daño mágico infligido.',
    },
    subskills: {
      advanced: [
        {
          name: 'Hechicería de invocación',
          tierLevel: 'Avanzado',
          effect: 'Todas las criaturas invocadas en combate obtienen +25 % de salud e infligen +25 %de daño.',
        },
        {
          name: 'Flecha mágica',
          tierLevel: 'Avanzado',
          effect: 'Otorga un nuevo hechizo de batalla. Inflige daño mágico a un solo objetivo, no tiene recarga y no cuesta maná.',
        },
        {
          name: 'Energía sin procesar',
          tierLevel: 'Avanzado',
          effect: '+10 % adicional de daño mágico infligido. Esta bonificación se duplica si el héroe conoce "Ofensiva".',
        },
      ],
      expert: [
        {
          name: 'Hechizos perforantes',
          tierLevel: 'Experto',
          effect: 'Los hechizos ofensivos ignoran el 25 % de la resistencia mágica del objetivo.',
        },
        {
          name: 'Alto mago',
          tierLevel: 'Experto',
          effect: 'Todos tus hechizos de escuelas de magia obtienen 1 nivel(es).',
        },
        {
          name: 'Magia pegajosa',
          tierLevel: 'Experto',
          effect: 'Los efectos aplicados por el héroe duran +2 ronda(s). Esta bonificación se duplica si el héroe conoce "Sabiduría".',
        },
      ],
    },
    startingHeroes: ['El juglar', 'Cuerno Negro', 'Zakron el Grande', 'Laura'],
    requiredByClasses: ['Furia del cielo (Arboleda)', 'Sin límites (Cisma)', 'Señor del caos (Enjambre)', 'Enviado de Lengua de Plata (Mazmorra)', 'Heraldo de la perdición (Necrópolis)', 'Ascendente (Templo)'],
  },
  {
    id: 'invocar-avatar',
    name: 'Invocar avatar',
    category: 'Común',
    upgrades: {
      basic: 'Otorga un nuevo hechizo de batalla. Invoca un avatar que se destruye al recibir tres golpes de cualquier fuente. Aunque no obtiene ninguna bonificación del ataque y la defensa del héroe, obtiene +1 de ataque e inflige +6 de daño por cada punto del poder de hechizo del héroe.',
      advanced: 'Otorga un nuevo hechizo de batalla. Invoca un avatar que se destruye al recibir tres golpes de cualquier fuente. Aunque no obtiene ninguna bonificación del ataque y la defensa del héroe, obtiene +1 de ataque e inflige +8 de daño por cada punto del poder de hechizo del héroe.',
      expert: 'Otorga un nuevo hechizo de batalla. Invoca un avatar que se destruye al recibir tres golpes de cualquier fuente. Aunque no obtiene ninguna bonificación del ataque y la defensa del héroe, obtiene +1 de ataque e inflige +10 de daño por cada punto del poder de hechizo del héroe.',
    },
    subskills: {
      advanced: [
        {
          name: 'Avatar de furia',
          tierLevel: 'Avanzado',
          effect: 'El avatar inflige +40 % de daño. Esta bonificación se duplica si el héroe conoce "Liderazgo".',
        },
        {
          name: 'Avatar de dureza',
          tierLevel: 'Avanzado',
          effect: 'El avatar puede resistir un golpe adicional. Esta bonificación se duplica si el héroe conoce "Defensa".',
        },
        {
          name: 'Avatar de celeridad',
          tierLevel: 'Avanzado',
          effect: 'La iniciativa y la velocidad del avatar aumentan en 2. Esta bonificación se duplica si el héroe conoce "Percepción".',
        },
      ],
      expert: [
        {
          name: 'Estabilización',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas invocadas se vuelven inmunes a los efectos que disipan criaturas invocadas.',
        },
        {
          name: 'Son legión',
          tierLevel: 'Experto',
          effect: 'El héroe y las criaturas amistosas invocan +30 % de unidades.',
        },
        {
          name: 'Invocación de destrucción',
          tierLevel: 'Experto',
          effect: 'El héroe y las criaturas amistosas infligen +50 % de daño a todas las criaturas invocadas.',
        },
      ],
    },
    startingHeroes: ['Suli', 'Urgo el Cambiante', 'Funerella', 'Zenith'],
    requiredByClasses: ['Enviado celestial (Arboleda)', 'Insondable (Cisma)', 'Progenitor (Enjambre)', 'Heredero de Amelchia (Mazmorra)', 'Tejedor de almas (Necrópolis)', 'Dechado (Templo)'],
  },
  {
    id: 'invocar-enjambre',
    name: 'Invocar enjambre',
    category: 'Facción',
    faction: 'Enjambre',
    upgrades: {
      basic: 'Una vez por ronda, pone huevos. Al comenzar la siguiente ronda, generan una formación de larvas de fuego con el 8 % de los PV totales de los engendros de la Colmena del ejército. La fuerza de sus aptitudes aumenta con el nivel del héroe.',
      advanced: 'Una vez por ronda, pone huevos. Al comenzar la siguiente ronda, generan una formación de larvas de fuego con el 12 % de los PV totales de los engendros de la Colmena del ejército. La fuerza de sus aptitudes aumenta con el nivel del héroe.',
      expert: 'Una vez por ronda, pone huevos. Al comenzar la siguiente ronda, generan una formación de larvas de fuego con el 16 % de los PV totales de los engendros de la Colmena del ejército. La fuerza de sus aptitudes aumenta con el nivel del héroe.',
    },
    subskills: {
      advanced: [
        {
          name: 'Calor del nido',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas de la Colmena amistosas infligen +10 % y reciben -10 % de daño en terreno nativo.',
        },
        {
          name: 'Tu descendencia',
          tierLevel: 'Avanzado',
          effect: '+1 larvas de fuego por cada nivel de héroe.',
        },
        {
          name: 'Asolar',
          tierLevel: 'Avanzado',
          effect: 'Las larvas de fuego infligen +1 de daño.',
        },
      ],
      expert: [
        {
          name: 'Poder de colmena',
          tierLevel: 'Experto',
          effect: 'El héroe obtiene 1 de suerte y moral.',
        },
        {
          name: 'Conchas endurecidas',
          tierLevel: 'Experto',
          effect: 'La nidada de huevos puede resistir +1 golpe(s).',
        },
        {
          name: 'Llama de la Colmena',
          tierLevel: 'Experto',
          effect: 'Las larvas de fuego invocadas duran una ronda más.',
        },
      ],
    },
    startingHeroes: [
      'Abigor, Duque de la Batalla',
      'Bathym, Duque de las Joyas',
      'Curson, Duque de la Ira',
      'Fleu',
      'Groo',
      'Khariseth',
      'Leira',
      'Lengua de Oro',
      'Lo',
      'Mila',
      'Niev',
      'Nor',
      'Oriax',
      'Pauper',
      'Tavi',
      'Vorágine',
      'Xirr',
      'Zoran el Autofundado',
    ],
    requiredByClasses: [],
  },
  {
    id: 'justicia',
    name: 'Justicia',
    category: 'Facción',
    faction: 'Templo',
    upgrades: {
      basic: '¡Los caídos en combate lo hacen en nombre del héroe! Cuando una criatura amistosa muere o mata a un enemigo, el ataque, la defensa, el poder de hechizo y el conocimiento del héroe aumentan en 1 durante dos rondas. Este efecto se puede acumular.',
      advanced: '¡Los caídos en combate lo hacen en nombre del héroe! Cuando una criatura amistosa muere o mata a un enemigo, el ataque, la defensa, el poder de hechizo y el conocimiento del héroe aumentan en 1 durante tres rondas. Este efecto se puede acumular.',
      expert: '¡Los caídos en combate lo hacen en nombre del héroe! Cuando una criatura amistosa muere o mata a un enemigo, el ataque, la defensa, el poder de hechizo y el conocimiento del héroe aumentan en 1 durante cuatro rondas. Este efecto se puede acumular.',
    },
    subskills: {
      advanced: [
        {
          name: 'Campos de serenidad',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas del Templo amistosas infligen +10 % y reciben -10 % de daño en terreno nativo.',
        },
        {
          name: 'Sacrificio justo',
          tierLevel: 'Avanzado',
          effect: 'Cada vez que una formación amistosa muere o mata a una formación enemiga, el héroe obtiene 3 de maná temporal.',
        },
        {
          name: 'Toque purificador',
          tierLevel: 'Avanzado',
          effect: 'Otorga una nueva aptitud. Disipa todos los efectos negativos del objetivo.',
        },
      ],
      expert: [
        {
          name: 'Guardián',
          tierLevel: 'Experto',
          effect: 'Cada vez que una criatura amistosa mata a un enemigo, restaura completamente sus PV. No puede revivir a las unidades caídas.',
        },
        {
          name: 'El elegido',
          tierLevel: 'Experto',
          effect: 'Otorga una nueva aptitud. Aumenta el ataque de una criatura amistosa un 50 % del ataque y poder de hechizo del héroe, y su defensa un 50 % de la defensa y conocimiento del héroe (hasta fin de ronda).',
        },
        {
          name: 'Fe firme',
          tierLevel: 'Experto',
          effect: 'Cada vez que se activa Justicia, el héroe obtiene +1 en todos los atributos hasta el final de la ronda.',
        },
      ],
    },
    startingHeroes: [
      'Aeos la Exaltada',
      'Anastasia la Dócil',
      'Avis el Hereje',
      'Clarissa',
      'Elias el Alegre',
      'Ister',
      'John Johnson',
      'Julius',
      'Keandra',
      'Kestrel',
      'Leon Dedos Pegajosos',
      'Lia la Desatada',
      'Lord Edgar',
      'Nadir',
      'Pip',
      'Vesper',
      'Viejo lord Mandall',
      'Zenith',
    ],
    requiredByClasses: [],
  },
  {
    id: 'liderazgo',
    name: 'Liderazgo',
    category: 'Común',
    upgrades: {
      basic: 'El héroe obtiene 1 de moral.',
      advanced: 'El héroe obtiene 2 de moral.',
      expert: 'El héroe obtiene 3 de moral.',
    },
    subskills: {
      advanced: [
        {
          name: 'Resolución',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas tienen un 1 % más de probabilidad de obtener un turno adicional por cada punto de moral. Esta bonificación se duplica si el héroe conoce "Arte de batalla".',
        },
        {
          name: 'Donde nunca se pone el sol',
          tierLevel: 'Avanzado',
          effect: 'El ataque, la defensa, el poder de hechizo y el radio de visión aumentan en 2 cuando estás en una zona que no controlas. Esta bonificación se duplica si el héroe conoce "Magia de luz solar".',
        },
        {
          name: 'Héroe de leyendas',
          tierLevel: 'Avanzado',
          effect: 'La moral del enemigo se reduce en 1 en combate.',
        },
      ],
      expert: [
        {
          name: 'Golpe inspirador',
          tierLevel: 'Experto',
          effect: 'El héroe obtiene una probabilidad de restablecer instantáneamente la recarga de Golpe heroico cada vez que lo usa: 5 % por cada punto de moral del héroe.',
        },
        {
          name: '¡Marchen!',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas obtienen 1 de iniciativa.',
        },
        {
          name: 'Entusiasmo',
          tierLevel: 'Experto',
          effect: 'Cada vez que una criatura amistosa gane un turno gracias a un efecto de moral positivo, la moral de todas las criaturas amistosas aumenta en 1 hasta el final de la siguiente ronda.',
        },
      ],
    },
    startingHeroes: ['Colajengibre', 'La Mirada Colectiva', 'Lengua de Oro', 'Devir, hijo de Devir', 'Aeos la Exaltada'],
    requiredByClasses: ['Pozo de vigor (Arboleda)', 'Sin límites (Cisma)', 'Madre de cría (Enjambre)', 'Guardaespaldas de Baltasar (Mazmorra)', 'Podredumbre ambulante (Necrópolis)', 'Bravucón (Templo)'],
  },
  {
    id: 'logistica',
    name: 'Logística',
    category: 'Común',
    upgrades: {
      basic: '+10 % de puntos de movimiento en el mapa global.',
      advanced: '+15 % de puntos de movimiento en el mapa global.',
      expert: '+20 % de puntos de movimiento en el mapa global.',
    },
    subskills: {
      advanced: [
        {
          name: 'Pasos agigantados',
          tierLevel: 'Avanzado',
          effect: 'El héroe recupera 5 punto(s) de movimiento después de cada victoria en combate.',
        },
        {
          name: 'Monturas fuertes',
          tierLevel: 'Avanzado',
          effect: 'Los hechizos neutrales del mapa global cuestan -4 de maná. Esta bonificación se duplica si el héroe conoce "Exploración".',
        },
        {
          name: 'Planificación cuidadosa',
          tierLevel: 'Avanzado',
          effect: 'Cada día, el héroe ahorra hasta 50 puntos de movimiento no utilizados para el día siguiente. Esta bonificación se duplica si el héroe conoce "Magia arcana".',
        },
      ],
      expert: [
        {
          name: 'Pasajes secretos',
          tierLevel: 'Experto',
          effect: 'Las penalizaciones de terreno se reducen un 50 %.',
        },
        {
          name: '¡De vuelta a la ciudad!',
          tierLevel: 'Experto',
          effect: 'Otorga un nuevo hechizo del mapa global. Teletransporta al héroe a la ciudad más cercana que controle en un radio de 16 cuadro(s). Se pierden todos los puntos de movimiento restantes al lanzarse.',
        },
        {
          name: 'Logística de combate',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas obtienen +1 de velocidad en terreno nativo.',
        },
      ],
    },
    startingHeroes: ['Nihil', 'Tölketh', 'Fleu', 'Marl', 'Ister'],
    requiredByClasses: ['Furia del cielo (Arboleda)', 'Insondable (Cisma)', 'Devorador de almas (Enjambre)', 'Gran mercader (Mazmorra)', 'Tejedor de almas (Necrópolis)', 'Ascendente (Templo)'],
  },
  {
    id: 'magia-arcana',
    name: 'Magia arcana',
    category: 'Común',
    upgrades: {
      basic: 'El héroe puede aprender hechizos arcanos hasta el rango 5.',
      advanced: 'El héroe puede aprender hechizos arcanos hasta el rango 5. Los hechizos arcanos obtienen +1 nivel(es).',
      expert: 'El héroe puede aprender hechizos arcanos de rango 5 sin tener que visitar una cofradía de magos, siempre y cuando se desbloqueen en el Observatorio. Los hechizos arcanos obtienen +1 nivel(es).',
    },
    subskills: {
      advanced: [
        {
          name: 'Tiempo arcano',
          tierLevel: 'Avanzado',
          effect: 'Las recargas de todos los hechizos arcanos del héroe se reducen en 1 ronda(s).',
        },
        {
          name: 'Toda vida es infinita',
          tierLevel: 'Avanzado',
          effect: '+30 % de curación y resucitación con aptitudes de criaturas amistosas y con hechizos de héroe en combate. Esta bonificación se duplica si el héroe conoce "Invocar avatar".',
        },
        {
          name: 'El pensamiento más puro',
          tierLevel: 'Avanzado',
          effect: '-1 nivel(es) a todos los hechizos arcanos enemigos.',
        },
      ],
      expert: [
        {
          name: 'Enseñanzas arcanas',
          tierLevel: 'Experto',
          effect: '+1 nivel(es) a los hechizos arcanos de este héroe.',
        },
        {
          name: 'Exhibición de maná',
          tierLevel: 'Experto',
          effect: 'Los hechizos cuestan -2 de maná.',
        },
        {
          name: 'Sinergia académica: Doreath',
          tierLevel: 'Experto',
          effect: '+6 de poder de hechizo al lanzar hechizos arcanos. +3 adicional por cada otra habilidad de escuela de magia conocida.',
        },
      ],
    },
    startingHeroes: ['Echolily', 'Mártir Tho', 'Ra\'Davok', 'Gleard el Gris', 'Mag'],
    requiredByClasses: ['Enviado celestial (Arboleda)', 'Insondable (Cisma)', 'Progenitor (Enjambre)', 'Gran mercader (Mazmorra)', 'Tejedor de almas (Necrópolis)', 'Gran Inquisidor (Templo)'],
  },
  {
    id: 'magia-de-batalla',
    name: 'Magia de batalla',
    category: 'Común',
    upgrades: {
      basic: 'El ataque y la defensa de las criaturas amistosas aumentan un 15 % del poder de hechizo y el conocimiento del héroe respectivamente.',
      advanced: 'El ataque y la defensa de las criaturas amistosas aumentan un 20 % del poder de hechizo y el conocimiento del héroe respectivamente.',
      expert: 'El ataque y la defensa de las criaturas amistosas aumentan un 25 % del poder de hechizo y el conocimiento del héroe respectivamente.',
    },
    subskills: {
      advanced: [
        {
          name: 'Aura de destrucción',
          tierLevel: 'Avanzado',
          effect: 'Cada vez que el héroe usa un hechizo en combate, su ataque aumenta en 1 hasta el final de esa batalla.',
        },
        {
          name: 'Aura de protección',
          tierLevel: 'Avanzado',
          effect: 'Cada vez que el héroe usa un hechizo en combate, su defensa aumenta en 1 hasta el final de esa batalla.',
        },
        {
          name: 'Aura de hechicería',
          tierLevel: 'Avanzado',
          effect: 'Cada vez que el héroe usa un hechizo en combate, su poder de hechizo aumenta en 1 hasta el final de esa batalla.',
        },
      ],
      expert: [
        {
          name: 'Autoridad del mago de batalla',
          tierLevel: 'Experto',
          effect: 'El ataque de las criaturas amistosas aumenta un 15 % del poder de hechizo del héroe. Esta bonificación se duplica si el héroe conoce "Hechicería".',
        },
        {
          name: 'Autoridad del mago protector',
          tierLevel: 'Experto',
          effect: 'La defensa de las criaturas amistosas aumenta un 15 % del conocimiento del héroe. Esta bonificación se duplica si el héroe conoce "Resistencia".',
        },
        {
          name: 'Tiempo mágico',
          tierLevel: 'Experto',
          effect: 'Las recargas de todos los hechizos de batalla del héroe se reducen en 1 ronda(s).',
        },
      ],
    },
    startingHeroes: ['Viejo Peregrino', 'Oriax', 'Milossa la Dorada'],
    requiredByClasses: ['Pozo de vigor (Arboleda)', 'Imparable (Cisma)', 'Devorador de almas (Enjambre)', 'Gran mercader (Mazmorra)', 'Cronomante (Necrópolis)', 'Gran Inquisidor (Templo)'],
  },
  {
    id: 'magia-de-luz-solar',
    name: 'Magia de luz solar',
    category: 'Común',
    upgrades: {
      basic: 'El héroe puede aprender hechizos de luz solar hasta el rango 5.',
      advanced: 'El héroe puede aprender hechizos de luz solar de rango 5. Los hechizos de luz solar obtienen +1 nivel(es).',
      expert: 'El héroe puede aprender hechizos de luz solar de rango 5 sin tener que visitar una cofradía de magos, siempre y cuando se desbloqueen en el Observatorio. Los hechizos de luz solar obtienen +1 nivel(es).',
    },
    subskills: {
      advanced: [
        {
          name: 'Tiempo de luz solar',
          tierLevel: 'Avanzado',
          effect: 'Las recargas de todos los hechizos de luz solar del héroe se reducen en 1 ronda(s).',
        },
        {
          name: 'Concentración luminosa',
          tierLevel: 'Avanzado',
          effect: 'Genera 1 carga(s) de concentración al inicio de cada batalla.',
        },
        {
          name: 'El sol más brillante',
          tierLevel: 'Avanzado',
          effect: '-1 nivel(es) a todos los hechizos de luz solar enemigos.',
        },
      ],
      expert: [
        {
          name: 'Enseñanzas de luz solar',
          tierLevel: 'Experto',
          effect: '+1 nivel(es) a los hechizos de luz solar de este héroe.',
        },
        {
          name: 'Velocidad de la luz',
          tierLevel: 'Experto',
          effect: '+10 puntos de movimiento. Esta bonificación se duplica si el héroe conoce "Logística".',
        },
        {
          name: 'Sinergia académica: Arina',
          tierLevel: 'Experto',
          effect: '+6 de poder de hechizo al lanzar hechizos de luz solar. +3 adicional por cada otra habilidad de escuela de magia conocida.',
        },
      ],
    },
    startingHeroes: ['Mila', 'Rauktol el Soleado', 'Lia la Desatada', 'Vesper'],
    requiredByClasses: ['Pozo de vigor (Arboleda)', 'Sin límites (Cisma)', 'Devorador de almas (Enjambre)', 'Enviado de Lengua de Plata (Mazmorra)', 'Cronomante (Necrópolis)', 'Dechado (Templo)'],
  },
  {
    id: 'magia-de-nochesombra',
    name: 'Magia de nochesombra',
    category: 'Común',
    upgrades: {
      basic: 'El héroe puede aprender hechizos de nochesombra hasta el rango 5.',
      advanced: 'El héroe puede aprender hechizos de nochesombra de rango 5. Los hechizos de nochesombra obtienen +1 nivel(es).',
      expert: 'El héroe puede aprender hechizos de nochesombra de rango 5, sin tener que visitar una cofradía de magos, siempre y cuando se desbloqueen en el Observatorio. Los hechizos de nochesombra obtienen +1 nivel(es).',
    },
    subskills: {
      advanced: [
        {
          name: 'Tiempo de nochesombra',
          tierLevel: 'Avanzado',
          effect: 'Las recargas de todos los hechizos de nochesombra del héroe se reducen en 1 ronda(s).',
        },
        {
          name: 'Debilidad crónica',
          tierLevel: 'Avanzado',
          effect: 'Los PV máximos de las criaturas enemigas se reducen en 1. Este efecto se duplica si el héroe conoce "Resistencia".',
        },
        {
          name: 'La noche más oscura',
          tierLevel: 'Avanzado',
          effect: '-1 nivel(es) a todos los hechizos de nochesombra enemigos.',
        },
      ],
      expert: [
        {
          name: 'Enseñanzas de nochesombra',
          tierLevel: 'Experto',
          effect: '+1 nivel(es) a los hechizos de nochesombra de este héroe.',
        },
        {
          name: 'La hora del lobo',
          tierLevel: 'Experto',
          effect: '-10 % de ataque y defensa a las criaturas enemigas.',
        },
        {
          name: 'Sinergia académica: Naira',
          tierLevel: 'Experto',
          effect: '+6 de poder de hechizo al lanzar hechizos de nochesombra. +3 adicional por cada otra habilidad de escuela de magia conocida.',
        },
      ],
    },
    startingHeroes: ['Hermana Keiri', 'Leira', 'Lodos', 'Hilasombras Oona', 'Nadir'],
    requiredByClasses: ['Furia del cielo (Arboleda)', 'Insensible (Cisma)', 'Madre de cría (Enjambre)', 'Guardaespaldas de Baltasar (Mazmorra)', 'Podredumbre ambulante (Necrópolis)', 'Bravucón (Templo)'],
  },
  {
    id: 'magia-primigenia',
    name: 'Magia primigenia',
    category: 'Común',
    upgrades: {
      basic: 'El héroe puede aprender hechizos primigenios hasta el rango 5.',
      advanced: 'El héroe puede aprender hechizos primigenios hasta el rango 5. Los hechizos primigenios obtienen +1 nivel(es).',
      expert: 'El héroe puede aprender hechizos primigenios de rango 5 sin tener que visitar una cofradía de magos, siempre y cuando se desbloqueen en el Observatorio. Los hechizos primigenios obtienen +1 nivel(es).',
    },
    subskills: {
      advanced: [
        {
          name: 'Tiempo primigenio',
          tierLevel: 'Avanzado',
          effect: 'Las recargas de todos los hechizos primigenios del héroe se reducen en 1 ronda(s).',
        },
        {
          name: 'Fuerza primigenia',
          tierLevel: 'Avanzado',
          effect: 'Los efectos negativos y positivos utilizados por el héroe y las criaturas amistosas duran 1 ronda(s) adicional(es).',
        },
        {
          name: 'Dientes afilados',
          tierLevel: 'Avanzado',
          effect: '-1 nivel(es) a todos los hechizos primigenios enemigos.',
        },
      ],
      expert: [
        {
          name: 'Enseñanzas primigenias',
          tierLevel: 'Experto',
          effect: '+1 nivel(es) a los hechizos primigenios de este héroe.',
        },
        {
          name: 'Reina el caos',
          tierLevel: 'Experto',
          effect: 'El héroe y las criaturas amistosas infligen un 50 % más de daño con golpes de suerte. Esta bonificación se duplica si el héroe conoce "Magia de batalla".',
        },
        {
          name: 'Sinergia académica: Hksmilla',
          tierLevel: 'Experto',
          effect: '+6 de poder de hechizo al lanzar hechizos primigenios. +3 adicional por cada otra habilidad de escuela de magia conocida.',
        },
      ],
    },
    startingHeroes: ['Aeliniel', 'Glacia', 'Halon', 'Vim', 'Wal\'kha', 'Khariseth'],
    requiredByClasses: ['Favorecidos por el azar (Arboleda)', 'Imparable (Cisma)', 'Señor del caos (Enjambre)', 'Heredero de Amelchia (Mazmorra)', 'Heraldo de la perdición (Necrópolis)', 'Ascendente (Templo)'],
  },
  {
    id: 'murmullo',
    name: 'Murmullo',
    category: 'Facción',
    faction: 'Arboleda',
    upgrades: {
      basic: 'Genera 1 carga(s) de concentración al inicio de cada batalla.',
      advanced: 'Genera 2 carga(s) de concentración al inicio de cada batalla.',
      expert: 'Genera 3 carga(s) de concentración al inicio de cada batalla.',
    },
    subskills: {
      advanced: [
        {
          name: 'Suelo del Micelio',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas de Foresta amistosas infligen +10 % y reciben -10 % de daño en terreno nativo.',
        },
        {
          name: 'Esencia de vida',
          tierLevel: 'Avanzado',
          effect: 'El límite de cargas de concentración aumenta en 1.',
        },
        {
          name: 'Vástago del bosque',
          tierLevel: 'Avanzado',
          effect: '+20 de maná máximo.',
        },
      ],
      expert: [
        {
          name: 'Solo una vez más',
          tierLevel: 'Experto',
          effect: 'Cada carga de concentración que gasten las criaturas aliadas o el héroe reduce el tiempo de recarga de todos los hechizos del héroe en 1 ronda(s).',
        },
        {
          name: 'Explosión de energía',
          tierLevel: 'Experto',
          effect: 'Cada carga de concentración que gasten las criaturas aliadas o el héroe aumenta el daño de Golpe heroico en un 15% por nivel de héroe hasta el final de la ronda.',
        },
        {
          name: 'Conexión fuerte',
          tierLevel: 'Experto',
          effect: 'Cada carga de concentración que gasten las criaturas aliadas o el héroe aumenta todos los atributos del héroe en 2 hasta el final de la ronda.',
        },
      ],
    },
    startingHeroes: [
      'Aeliniel',
      'Anciano Tss\'kish',
      'Colajengibre',
      'Echolily',
      'Eith',
      'El juglar',
      'Faleor',
      'Glacia',
      'Gorel Punta de Lanza',
      'Halon',
      'Mreowa',
      'Octavia',
      'Seductora Sh\'a',
      'Suli',
      'Tía Daliar',
      'Vatawna',
      'Viejo Peregrino',
      'Vim',
    ],
    requiredByClasses: [],
  },
  {
    id: 'nigromancia',
    name: 'Nigromancia',
    category: 'Facción',
    faction: 'Necrópolis',
    upgrades: {
      basic: 'Tras ganar una batalla, transforma el 10 % de la formación enemiga más fuerte en no muertos amistosos de ese rango. Requiere energía nigromántica, que se acumula hasta 3000 y se recarga cada semana.',
      advanced: 'Tras ganar una batalla, transforma el 15 % de la formación enemiga más fuerte en no muertos amistosos de ese rango. Requiere energía nigromántica, que se acumula hasta 4000 y se recarga cada semana.',
      expert: 'Tras ganar una batalla, transforma el 20 % de la formación enemiga más fuerte en no muertos amistosos de ese rango. Requiere energía nigromántica, que se acumula hasta 5000 y se recarga cada semana.',
    },
    subskills: {
      advanced: [
        {
          name: 'Tierra de sepultura',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas de Necrópolis amistosas infligen +10 % y reciben -10 % de daño en terreno nativo.',
        },
        {
          name: 'Cosecha de almas',
          tierLevel: 'Avanzado',
          effect: 'Restaura 4 de maná tras una victoria en combate.',
        },
        {
          name: 'Heraldo de la muerte',
          tierLevel: 'Avanzado',
          effect: '+1000 al máximo de energía nigromántica del héroe.',
        },
      ],
      expert: [
        {
          name: 'Segador de almas',
          tierLevel: 'Experto',
          effect: '-1 a la moral y suerte del enemigo.',
        },
        {
          name: 'Servicio eterno',
          tierLevel: 'Experto',
          effect: 'Otorga una nueva aptitud. Restaura PV al no muerto amistoso objetivo y puede revivir unidades caídas.',
        },
        {
          name: 'Campos de los muertos',
          tierLevel: 'Experto',
          effect: '+50 % de energía nigromántica obtenida cuando el héroe no tiene no muertos del rango requerido.',
        },
      ],
    },
    startingHeroes: [
      'Adahn',
      'Artorius Veritas',
      'Baluarte',
      'Funerella',
      'Hilasombras Oona',
      'Kel\'Ghul',
      'Laura',
      'Lord Rufus',
      'Maestro Klastor',
      'Mag',
      'Marl',
      'Milossa la Dorada',
      'Natalida',
      'Onkos',
      'Rey de Reyes',
      'Tarius',
      'Zam',
    ],
    requiredByClasses: [],
  },
  {
    id: 'ofensiva',
    name: 'Ofensiva',
    category: 'Común',
    upgrades: {
      basic: 'Los ataques básicos de las criaturas amistosas infligen +10 % de daño.',
      advanced: 'Los ataques básicos de las criaturas amistosas infligen +15 % de daño.',
      expert: 'Los ataques básicos de las criaturas amistosas infligen +20 % de daño.',
    },
    subskills: {
      advanced: [
        {
          name: 'Tiro con arco',
          tierLevel: 'Avanzado',
          effect: 'Los ataques a distancia y de largo alcance de las criaturas amistosas infligen +15 % de daño.',
        },
        {
          name: 'Marcha de batalla',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas generan +1 punto(s) de concentración por cada ataque. Esta bonificación se duplica si el héroe conoce "Suerte".',
        },
        {
          name: 'Frenesí de batalla',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas obtienen +2 de ataque por cada punto de moral.',
        },
      ],
      expert: [
        {
          name: 'Filos sombríos',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas infligen +1 de daño.',
        },
        {
          name: 'Guardianes de la realidad',
          tierLevel: 'Experto',
          effect: '-10 % de poder de hechizo para el héroe enemigo. Esta bonificación se duplica si el héroe conoce "Magia de nochesombra".',
        },
        {
          name: 'Firmeza',
          tierLevel: 'Experto',
          effect: '-15 % de defensa a las criaturas enemigas.',
        },
      ],
    },
    startingHeroes: ['Gorel Punta de Lanza', 'Grellekh el Traidor', 'Niev', 'Onkos', 'Keandra'],
    requiredByClasses: ['Favorecidos por el azar (Arboleda)', 'Sin límites (Cisma)', 'Señor del caos (Enjambre)', 'Guardaespaldas de Baltasar (Mazmorra)', 'Cronomante (Necrópolis)', 'Bravucón (Templo)'],
  },
  {
    id: 'percepcion',
    name: 'Percepción',
    category: 'Común',
    upgrades: {
      basic: 'El héroe obtiene +20 % adicional de EXP.',
      advanced: 'El héroe obtiene +30 % adicional de EXP.',
      expert: 'El héroe obtiene +40 % adicional de EXP.',
    },
    subskills: {
      advanced: [
        {
          name: 'Iluminación',
          tierLevel: 'Avanzado',
          effect: 'El héroe obtiene +10 % adicional de EXP.',
        },
        {
          name: 'Innovación cívica',
          tierLevel: 'Avanzado',
          effect: 'El héroe obtiene +30 % de puntos de ley. Esta bonificación se duplica si el héroe conoce "Liderazgo".',
        },
        {
          name: 'Sagacidad',
          tierLevel: 'Avanzado',
          effect: 'Muestra las intenciones de todas las formaciones neutrales a una distancia de [ 300 % × radio de visión del héroe ] cuadro(s) del héroe.',
        },
      ],
      expert: [
        {
          name: 'Erudito de la magia',
          tierLevel: 'Experto',
          effect: 'Permite que los héroes se enseñen hechizos entre sí cuando interactúan en el mapa global: cada héroe aprenderá todos los hechizos del otro dentro de lo que permitan sus habilidades, nivel y objetos.',
        },
        {
          name: 'Carisma infinito',
          tierLevel: 'Experto',
          effect: '+1 de ataque, defensa, poder de hechizo y conocimiento. Esta bonificación se duplica si el héroe conoce "Tácticas".',
        },
        {
          name: 'Percepción',
          tierLevel: 'Experto',
          effect: 'Permite ver información detallada sobre el héroe enemigo durante la batalla.',
        },
      ],
    },
    startingHeroes: ['Tía Daliar', 'Nor', 'Kelarr, hijo de Navarr', 'Pip'],
    requiredByClasses: ['Pozo de vigor (Arboleda)', 'Imparable (Cisma)', 'Devorador de almas (Enjambre)', 'Heredero de Amelchia (Mazmorra)', 'Tejedor de almas (Necrópolis)', 'Gran Inquisidor (Templo)'],
  },
  {
    id: 'reclutamiento',
    name: 'Reclutamiento',
    category: 'Clase',
    upgrades: {
      basic: '+4 al crecimiento de criaturas de rango 1 en todas tus ciudades.',
      advanced: '+4 al crecimiento de criaturas de rango 1 y +3 a las de rango 2 en todas tus ciudades.',
      expert: '+4 al crecimiento de criaturas de rango 1, +3 a las de rango 2 y +2 a las de rango 3 en todas tus ciudades.',
    },
    subskills: {
      advanced: [
        {
          name: 'Supervisión directa',
          tierLevel: 'Avanzado',
          effect: 'Si el héroe está en una ciudad al inicio de una semana, el crecimiento de todas las criaturas en esa ciudad aumenta un 50 % adicional.',
        },
        {
          name: 'Guardias de élite',
          tierLevel: 'Avanzado',
          effect: 'El ataque y la defensa de las criaturas amistosas de rango 1, 2 y 3 obtienen un 25 % del ataque y la defensa del héroe como ataque y defensa. Esta bonificación se duplica si el héroe conoce "Tácticas".',
        },
        {
          name: 'Veteranos',
          tierLevel: 'Avanzado',
          effect: 'El crecimiento de criaturas de rango 4 en todas tus ciudades aumenta en 2. Esta bonificación se duplica si el héroe conoce "Diplomacia".',
        },
      ],
      expert: [
        {
          name: 'Reubicación',
          tierLevel: 'Experto',
          effect: 'Otorga un nuevo hechizo del mapa global. Permite la interacción con cualquier ciudad controlada, lo que posibilita la transferencia de criaturas hacia o desde esa ciudad. Se puede usar una vez al día.',
        },
        {
          name: 'Entrenamiento extenuante',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas obtienen 2 PV.',
        },
        {
          name: 'Mentores',
          tierLevel: 'Experto',
          effect: 'Permite mejorar las criaturas del ejército del héroe fuera de la ciudad, siempre que el ejército ya contenga la versión mejorada. Mejorar con este método tiene un coste superior al habitual.',
        },
      ],
    },
    startingHeroes: ['Kwinri', 'Lo', 'Motley', 'Zam', 'Avis el Hereje'],
    requiredByClasses: [],
  },
  {
    id: 'resistencia',
    name: 'Resistencia',
    category: 'Común',
    upgrades: {
      basic: 'Las criaturas amistosas reciben -15 % adicional de daño mágico.',
      advanced: 'Las criaturas amistosas reciben -25 % adicional de daño mágico.',
      expert: 'Las criaturas amistosas reciben -35 % adicional de daño mágico.',
    },
    subskills: {
      advanced: [
        {
          name: 'Obstrucción',
          tierLevel: 'Avanzado',
          effect: 'Los hechizos enemigos cuestan un 20 % más de maná. Si el héroe conoce una habilidad de escuela de magia, el coste de los hechizos enemigos de esa escuela aumenta un 20 % adicional.',
        },
        {
          name: 'Aura de impedimento',
          tierLevel: 'Avanzado',
          effect: 'El enemigo pierde 1 carga(s) de concentración al comienzo de cada ronda de batalla, excepto la primera.',
        },
        {
          name: 'Metabolismo rápido',
          tierLevel: 'Avanzado',
          effect: 'Todos los efectos negativos sobre criaturas amistosas duran 2 rondas menos (no menos de 1).',
        },
      ],
      expert: [
        {
          name: 'Supresión mágica',
          tierLevel: 'Experto',
          effect: 'Otorga una nueva aptitud. Inflige daño mágico considerable a la criatura invocada objetivo. El daño aumenta según el nivel del héroe.',
        },
        {
          name: 'Cambio temporal',
          tierLevel: 'Experto',
          effect: '+1 ronda(s) a la recarga de todos los hechizos enemigos.',
        },
        {
          name: 'Drenaje',
          tierLevel: 'Experto',
          effect: 'El enemigo pierde 1 niveles en todos los hechizos de escuela de magia.',
        },
      ],
    },
    startingHeroes: ['Xirr', 'Artorius Veritas'],
    requiredByClasses: ['Pozo de vigor (Arboleda)', 'Insensible (Cisma)', 'Devorador de almas (Enjambre)', 'Gran mercader (Mazmorra)', 'Podredumbre ambulante (Necrópolis)', 'Ascendente (Templo)'],
  },
  {
    id: 'sabiduria',
    name: 'Sabiduría',
    category: 'Común',
    upgrades: {
      basic: 'El héroe puede aprender hechizos de rango máximo 3 sin conocer la habilidad de la escuela de magia correspondiente.',
      advanced: 'El héroe puede aprender hechizos de rango máximo 4 sin conocer la habilidad de la escuela de magia correspondiente.',
      expert: 'El héroe puede aprender hechizos de rango máximo 5 sin conocer la habilidad de la escuela de magia correspondiente.',
    },
    subskills: {
      advanced: [
        {
          name: 'Rito de magia',
          tierLevel: 'Avanzado',
          effect: 'Otorga un nuevo hechizo del mapa global. Permite al héroe convertir todos los puntos de movimiento actuales en maná.',
        },
        {
          name: 'Entre líneas',
          tierLevel: 'Avanzado',
          effect: 'El héroe puede aprender magia neutral alta, independientemente de su nivel.',
        },
        {
          name: 'Acabar el trabajo',
          tierLevel: 'Avanzado',
          effect: 'Golpe heroico mata instantáneamente a todas las unidades temporales en la formación objetivo.',
        },
      ],
      expert: [
        {
          name: 'Cadencia rítmica',
          tierLevel: 'Experto',
          effect: '+40 % de maná máximo. Esta bonificación se duplica si el héroe conoce "Hechicería".',
        },
        {
          name: 'Ojo de águila',
          tierLevel: 'Experto',
          effect: 'Al comienzo de la batalla, el héroe aprende todos los hechizos que conoce el enemigo y que pueda aprender el héroe.',
        },
        {
          name: 'Soñador',
          tierLevel: 'Experto',
          effect: '+500 puntos de astrología al día. Esta bonificación se duplica si el héroe conoce "Exploración".',
        },
      ],
    },
    startingHeroes: ['Vatawna', 'El Doncel de Hierro', 'Groo', 'Funerella'],
    requiredByClasses: ['Favorecidos por el azar (Arboleda)', 'Insensible (Cisma)', 'Madre de cría (Enjambre)', 'Guardaespaldas de Baltasar (Mazmorra)', 'Podredumbre ambulante (Necrópolis)', 'Bravucón (Templo)'],
  },
  {
    id: 'suerte',
    name: 'Suerte',
    category: 'Común',
    upgrades: {
      basic: 'El héroe obtiene 1 de suerte.',
      advanced: 'El héroe obtiene 2 de suerte.',
      expert: 'El héroe obtiene 3 de suerte.',
    },
    subskills: {
      advanced: [
        {
          name: 'Confianza bestial',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas tienen un 1 % más de probabilidad de asestar un golpe de suerte por cada punto de suerte. Esta bonificación se duplica si el héroe conoce "Magia primigenia".',
        },
        {
          name: 'Siempre sale cara',
          tierLevel: 'Avanzado',
          effect: 'El héroe obtiene +25 % de oro y recursos de las pilas en el mapa global. Esta bonificación se duplica si el héroe conoce "Economía".',
        },
        {
          name: 'Elegido de Mearea',
          tierLevel: 'Avanzado',
          effect: 'La suerte del enemigo se reduce en 1 en combate.',
        },
      ],
      expert: [
        {
          name: 'Golpe de suerte',
          tierLevel: 'Experto',
          effect: 'Cuando las criaturas amistosas asestan un golpe de suerte, el enemigo no contraataca.',
        },
        {
          name: 'El rayo golpea dos veces',
          tierLevel: 'Experto',
          effect: 'Los hechizos también pueden asestar un golpe de suerte, que inflige un 200 % de daño. La probabilidad aumenta un 5 % por cada punto de suerte.',
        },
        {
          name: 'Día de suerte',
          tierLevel: 'Experto',
          effect: 'Cada vez que una criatura amistosa acierta un golpe de suerte, todas las criaturas amistosas obtienen +1 de suerte hasta el final de la siguiente ronda.',
        },
      ],
    },
    startingHeroes: ['Octavia', 'Vorágine', 'Rhea', 'Maestro Klastor', 'Kestrel'],
    requiredByClasses: ['Favorecidos por el azar (Arboleda)', 'Insondable (Cisma)', 'Señor del caos (Enjambre)', 'Enviado de Lengua de Plata (Mazmorra)', 'Heraldo de la perdición (Necrópolis)', 'Bravucón (Templo)'],
  },
  {
    id: 'taumaturgia',
    name: 'Taumaturgia',
    category: 'Clase',
    upgrades: {
      basic: 'El héroe puede usar el libro de hechizos una vez más por ronda de batalla, pero solo para lanzar un hechizo de una escuela de magia que no se haya usado en esa ronda. Los hechizos cuestan +100 % de maná por cada uso después del primero.',
      advanced: 'El héroe puede usar el libro de hechizos una vez más por ronda de batalla, pero solo para lanzar un hechizo de una escuela de magia que no se haya usado en esa ronda. Los hechizos cuestan +75 % de maná por cada uso después del primero.',
      expert: 'El héroe puede usar el libro de hechizos una vez más por ronda de batalla, pero solo para lanzar un hechizo de una escuela de magia que no se haya usado en esa ronda. Los hechizos cuestan +50 % de maná por cada uso después del primero.',
    },
    subskills: {
      advanced: [
        {
          name: 'Antimago',
          tierLevel: 'Avanzado',
          effect: 'Los hechizos enemigos cuestan +4 de maná.',
        },
        {
          name: 'Brillo del taumaturgo',
          tierLevel: 'Avanzado',
          effect: '+2 de poder de hechizo y conocimiento.',
        },
        {
          name: 'Encantamientos prácticos',
          tierLevel: 'Avanzado',
          effect: 'Golpe heroico inflige +10 de daño.',
        },
      ],
      expert: [
        {
          name: 'Pergaminos antiguos',
          tierLevel: 'Experto',
          effect: 'Añade todos los hechizos de rango 1 al libro de hechizos del héroe.',
        },
        {
          name: 'Alma vasta',
          tierLevel: 'Experto',
          effect: '+10 % de maná restaurado cada mañana.',
        },
        {
          name: 'Archimago',
          tierLevel: 'Experto',
          effect: 'Todos tus hechizos de escuelas de magia obtienen 1 nivel(es).',
        },
      ],
    },
    startingHeroes: ['Anciano Tss\'kish', 'Hermana Deira', 'Lord Rufus', 'Anastasia la Dócil'],
    requiredByClasses: [],
  },
  {
    id: 'tacticas',
    name: 'Tácticas',
    category: 'Común',
    upgrades: {
      basic: 'En la fase táctica, las criaturas se pueden colocar dentro de un área de 3 línea(s). Si el enemigo también conoce "Táctica", su área de colocación se reduce en 1 línea(s).',
      advanced: 'En la fase táctica, las criaturas se pueden colocar dentro de un área de 4 línea(s). Si el enemigo también conoce "Táctica", su área de colocación se reduce en 2 línea(s).',
      expert: 'En la fase táctica, las criaturas se pueden colocar dentro de un área de 5 línea(s). Si el enemigo también conoce "Táctica", su área de colocación se reduce en 3 línea(s).',
    },
    subskills: {
      advanced: [
        {
          name: 'Uno para todos',
          tierLevel: 'Avanzado',
          effect: 'Las criaturas amistosas obtienen +2 de ataque por cada enemigo adyacente. Esta bonificación se duplica si el héroe conoce "Ofensiva".',
        },
        {
          name: 'Presa fácil',
          tierLevel: 'Avanzado',
          effect: 'Una vez por ronda, cuando un enemigo espera, las criaturas amistosas obtienen +2 de iniciativa hasta el final de la ronda. Este efecto no se acumula.',
        },
        {
          name: 'Maná energizante',
          tierLevel: 'Avanzado',
          effect: 'Genera +1 carga(s) de concentración cada vez que tu enemigo usa un hechizo.',
        },
      ],
      expert: [
        {
          name: 'Todos para uno',
          tierLevel: 'Experto',
          effect: 'Las criaturas amistosas obtienen +2 de defensa por cada aliado adyacente. Esta bonificación se duplica si el héroe conoce "Defensa".',
        },
        {
          name: 'Domino de estocada',
          tierLevel: 'Experto',
          effect: 'Cada vez que una criatura amistosa mata a un enemigo con un contraataque, sus contraataques se reinician durante la ronda.',
        },
        {
          name: 'Táctica de lanzahechizos',
          tierLevel: 'Experto',
          effect: 'Cada vez que las criaturas amistosas o el héroe gastan concentración, obtienen 4 de maná temporal.',
        },
      ],
    },
    startingHeroes: [],
    requiredByClasses: ['Furia del cielo (Arboleda)', 'Imparable (Cisma)', 'Progenitor (Enjambre)', 'Heredero de Amelchia (Mazmorra)', 'Cronomante (Necrópolis)', 'Dechado (Templo)'],
  },
];

export const OFFICIAL_SKILLS_DATA: OfficialSkill[] = OFFICIAL_SKILLS_RAW_DATA.map((skill) => {
  const guide = SKILL_SELECTION_GUIDES[skill.id];
  if (!guide) return skill;
  return {
    ...skill,
    selectionGuide: guide,
    subskills: {
      advanced: skill.subskills.advanced.map((sub) => {
        const isRec = sub.name.toLowerCase() === guide.advanced.recommendedName.toLowerCase();
        const isAlt = guide.advanced.alternativeChoice && sub.name.toLowerCase() === guide.advanced.alternativeChoice.toLowerCase();
        return {
          ...sub,
          isRecommendedMeta: isRec,
          recommendedTag: isRec
            ? '⭐ Elección Recomendada'
            : isAlt
            ? '🎯 Opción Situacional'
            : undefined,
          recommendationWhen: isRec
            ? guide.advanced.why
            : isAlt
            ? guide.advanced.alternativeCondition
            : undefined,
        };
      }),
      expert: skill.subskills.expert.map((sub) => {
        const isRec = sub.name.toLowerCase() === guide.expert.recommendedName.toLowerCase();
        const isAlt = guide.expert.alternativeChoice && sub.name.toLowerCase() === guide.expert.alternativeChoice.toLowerCase();
        return {
          ...sub,
          isRecommendedMeta: isRec,
          recommendedTag: isRec
            ? '⭐ Elección Recomendada'
            : isAlt
            ? '🎯 Opción Situacional'
            : undefined,
          recommendationWhen: isRec
            ? guide.expert.why
            : isAlt
            ? guide.expert.alternativeCondition
            : undefined,
        };
      }),
    },
  };
});

