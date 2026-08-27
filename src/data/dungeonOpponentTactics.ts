export interface DayOpponentTactic {
  humanPvP: string;
  aiPvE: string;
  pvpFocusTag: string;
  pveFocusTag: string;
}

/**
 * Directivas tácticas específicas por día para Jugador Humano (PvP) vs IA / Monstruos Neutrales (PvE)
 * adaptadas estrictamente al lore y mecánicas de Mazmorra en Heroes of Might and Magic: Olden Era.
 */
export const DAY_OPPONENT_TACTICS: Record<number, DayOpponentTactic> = {
  1: {
    pvpFocusTag: 'Anti-Scout & Control',
    pveFocusTag: 'Creeping 0 Bajas',
    humanPvP: 'Los jugadores humanos mandarán exploradores a cortar tus rutas. Usa a tu héroe secundario para bloquear accesos y no expongas a tu ejército principal.',
    aiPvE: 'Divide 1 Troglodita para que reciba el primer golpe de los monstruos neutrales; ataca después con tus tropas principales sin recibir contragolpe.',
  },
  2: {
    pvpFocusTag: 'Ocultar Estrategia',
    pveFocusTag: 'Limpieza de Madera/Mineral',
    humanPvP: 'Mantén a tus Infiltradores fuera de la línea de visión enemiga. El rival humano no debe saber si vas a rush de Minotauros o Cofradía.',
    aiPvE: 'Aprovecha el Salto Sombrío de los Infiltradores para posicionarte a la espalda de tiradores neutrales y bloquear sus disparos desde el Turno 1.',
  },
  3: {
    pvpFocusTag: 'Defensa de Mineros',
    pveFocusTag: 'Maximizar Daño Danzantes',
    humanPvP: 'Si un explorador humano intenta robar recursos sueltos, embóscalo con la alta velocidad de movimiento de los Danzantes.',
    aiPvE: 'Los Danzantes de Jaspe tienen contraataque devastador; atráelos hacia tropas lentas de la IA que se agrupen sin apoyo.',
  },
  4: {
    pvpFocusTag: 'Disuasión Temprana',
    pveFocusTag: 'Ruptura de Criptas',
    humanPvP: 'Tener Minotauros en Día 4 intimida a cualquier rival humano que planee un asalto temprano. Muestra 1 Minotauro en la frontera para forzarlo a replegarse.',
    aiPvE: 'Usa la alta defensa y puntos de vida de los Minotauros para tanquear guardianes de tesoros de alto valor sin sufrir bajas en tropas ligeras.',
  },
  5: {
    pvpFocusTag: 'Trampas Anti-Rush',
    pveFocusTag: 'Seguridad en Asedios',
    humanPvP: 'Las Trampas de Fortificaciones I arruinan las cargas de caballería o tropas rápidas humanas en asedio. Si atacan tu capital, morirán en la entrada.',
    aiPvE: 'La IA neutral no sabe evitar las trampas y avanzará en línea recta, perdiendo unidades clave antes de tocar tus muros.',
  },
  6: {
    pvpFocusTag: 'Petrificación a Héroes',
    pveFocusTag: 'Control de Grandes Stacks',
    humanPvP: 'Las Medusas son letales contra humanos: su petrificación incapacita a su criatura más peligrosa, desbaratando su plan de batalla.',
    aiPvE: 'Dispara con Medusas a los monstruos neutrales más resistentes (golems, ogros); la petrificación te da 2 rondas gratis de daño continuo.',
  },
  7: {
    pvpFocusTag: 'Fortaleza Inexpugnable',
    pveFocusTag: 'Preservación de Ejército',
    humanPvP: 'Torres con +150% de daño disuaden cualquier intento de rush humano de fin de semana. El humano perderá su héroe si asedia.',
    aiPvE: 'Mantén todo tu ejército a salvo dentro de la guarnición para recibir el +50% de crecimiento en todas las moradas al amanecer del lunes.',
  },
  8: {
    pvpFocusTag: 'Hechizo de Interrupción',
    pveFocusTag: 'Lentitud a Monstruos',
    humanPvP: 'Aprende Lentitud o Rayo Arcano en Cofradía I. Un rival humano con tropas rápidas queda completamente inutilizado con Lentitud en Turno 1.',
    aiPvE: 'Lanza Lentitud sobre criaturas cuerpo a cuerpo neutrales; tus Medusas y Danzantes las liquidarán antes de que crucen la mitad del campo.',
  },
  9: {
    pvpFocusTag: 'Protección de Rutas',
    pveFocusTag: 'Economía de Oro',
    humanPvP: 'El Banco financia tu expansión. Vigila que el humano no corte tus líneas de suministro con exploradores invisibles.',
    aiPvE: 'Asegura depósitos de oro secundarios sin gastar maná de tu héroe principal.',
  },
  10: {
    pvpFocusTag: 'Ventaja Económica Neta',
    pveFocusTag: 'Bola de Nieve Económica',
    humanPvP: 'Con el Capitolio en Día 10 generas 4.000g/día. Ningún rival humano puede igualar este ritmo de ingresos en Semana 2.',
    aiPvE: 'Invierte el oro masivo del Capitolio en comprar todas las tropas disponibles sin dejar reservas ociosas.',
  },
  11: {
    pvpFocusTag: 'Ceguera vs Tiradores',
    pveFocusTag: 'Ceguera a Jefes de Mapa',
    humanPvP: 'Cofradía II desbloquea Ceguera. Contra un humano, cegar a su stack de tiradores o caballeros en Turno 1 le arruina el combate.',
    aiPvE: 'Ciega al grupo neutral más fuerte mientras eliminas con tranquilidad al resto de monstruos secundarios.',
  },
  12: {
    pvpFocusTag: 'Arbitraje Mercantil Rápido',
    pveFocusTag: 'Canje de Recursos',
    humanPvP: 'Canjea en el Mercado materiales sobrantes para tener las 20 Gemas exactas. No dejes recursos parados que un humano pueda saquear.',
    aiPvE: 'Vende madera y mineral sobrante para garantizar el stock de gemas y oro del gran hito de Tier 7.',
  },
  13: {
    pvpFocusTag: 'Flujo Pasivo de Gemas',
    pveFocusTag: 'Producción de Recursos Raros',
    humanPvP: 'El Silo de recursos te da +1 Gema/día pasiva, reduciendo tu dependencia de minas exteriores que el humano pueda disputar.',
    aiPvE: 'El Silo asegura gemas automáticas todos los días para abastecer el reclutamiento continuo de criaturas de élite.',
  },
  14: {
    pvpFocusTag: '¡Shock Psicológico Tier 7!',
    pveFocusTag: 'Desbloqueo Supremo',
    humanPvP: 'Construir Palacio de cueva en Día 14 sorprenderá por completo al rival humano. No esperará Dragones en Semana 3.',
    aiPvE: 'Palacio de cueva listo en domingo garantiza que el lunes Semana 3 amanezcas con Dragones de las Cavernas para limpiar todo el mapa.',
  },
  15: {
    pvpFocusTag: 'Ruptura Frontal con Dragón',
    pveFocusTag: 'Asalto a Utopías',
    humanPvP: 'Despliega al Dragón de las Cavernas. Su aliento de 2 casillas castigará las formaciones cerradas de cualquier jugador humano.',
    aiPvE: 'Usa el vuelo y los 180 HP del Dragón para asaltar bancos de criaturas y criptas de tesoro masivas sin sufrir ni una sola baja.',
  },
  16: {
    pvpFocusTag: 'Capitalización de Intereses',
    pveFocusTag: 'Riqueza Acumulada',
    humanPvP: 'La Tesorería genera intereses semanales sobre el oro no gastado. Si el humano no ataca, tu economía crecerá exponencialmente más rápido.',
    aiPvE: 'Mantén un colchón de oro al final de la semana para disparar el retorno financiero del lunes.',
  },
  17: {
    pvpFocusTag: 'Muralla Anti-Incursión',
    pveFocusTag: 'Duplicación de Crecimiento',
    humanPvP: 'Fortificaciones III añade torre de doble disparo. Un intento de asedio humano contra tu ciudad equivaldrá a la aniquilación de su héroe.',
    aiPvE: '+100% de crecimiento poblacional en TODAS las moradas para multiplicar tus tropas en cada reinicio semanal.',
  },
  18: {
    pvpFocusTag: 'Teletransporte Quirúrgico',
    pveFocusTag: 'Movilidad en Combate',
    humanPvP: 'Teletransporte en Cofradía III te permite colocar a tus Minotauros o Hidras directamente en la retaguardia de los tiradores humanos.',
    aiPvE: 'Teletransporta a tus tropas pesadas cuerpo a cuerpo junto a los hechiceros neutrales para evitar que lancen maleficios.',
  },
  19: {
    pvpFocusTag: 'Acumular Polvo Alquímico',
    pveFocusTag: 'Investigación Mágica',
    humanPvP: 'El Silo alquímico genera Polvo Alquímico diario para mejorar tus hechizos en el Observatorio antes de que el humano suba su resistencia mágica.',
    aiPvE: 'Acumula los 100 de Polvo Alquímico necesarios para mejorar al Dragón Negro en el Día 21.',
  },
  20: {
    pvpFocusTag: 'Portal de Movilidad',
    pveFocusTag: 'Grimorio Nivel 4',
    humanPvP: 'Cofradía IV te da acceso a magia avanzada. Si el humano intenta flanquearte, podrás teletransportar a tu héroe para defender tus puestos.',
    aiPvE: 'Aprende hechizos de área de Nivel 4 para barrer ejércitos neutrales en un solo asalto.',
  },
  21: {
    pvpFocusTag: '¡Inmunidad Total a Magia!',
    pveFocusTag: 'Supremacía del Dragón Negro',
    humanPvP: 'El Dragón Negro es 100% inmune a la magia de Nivel 1 a 5. El jugador humano no podrá usar Implosión, Rayo ni Ceguera contra él.',
    aiPvE: 'Los Dragones Negros resisten cualquier daño elemental de monstruos mágicos y limpian dragones neutrales sin sufrir bajas.',
  },
  22: {
    pvpFocusTag: '¡COMBO DRAGO-ARMAGEDDON!',
    pveFocusTag: 'Limpieza Masiva en 1 Turno',
    humanPvP: 'Despliega solo Dragones Negros y lanza Armageddon en Turno 1. El ejército del jugador humano morirá en el acto mientras tus dragones quedan ilesos.',
    aiPvE: 'Armageddon borra cualquier ejército neutral de nivel legendario en 1 segundo, acelerando tu conquista de todo el mapa.',
  },
  23: {
    pvpFocusTag: 'Asedio con Hidra Infernal',
    pveFocusTag: 'Ataque en Círculo 360º',
    humanPvP: 'Teletransporta la Hidra Infernal al castillo del rival humano: su ataque en círculo de 360º golpeará a todas sus tropas a la vez mientras recupera vida.',
    aiPvE: 'Rodea a la Hidra de monstruos neutrales; cada golpe circular succionará 35% de vida manteniéndola siempre al 100% de HP.',
  },
  24: {
    pvpFocusTag: 'Artefactos de Iniciativa',
    pveFocusTag: 'Poder de Hechizo',
    humanPvP: 'Compra artefactos de +Iniciativa y +Velocidad en el Mercader para asegurarte de que tu héroe lance Armageddon antes de que el humano actúe.',
    aiPvE: 'Equipa artefactos que aumenten el Poder Mágico para maximizar el daño por casilla de tus conjuros.',
  },
};

/**
 * Devuelve la táctica personalizada para un día específico.
 * Si el día supera el mapeo directo, calcula una directiva coherente según la fase del juego.
 */
export function getOpponentTacticForDay(day: number, month: 1 | 2, week: number): DayOpponentTactic {
  if (DAY_OPPONENT_TACTICS[day]) {
    return DAY_OPPONENT_TACTICS[day];
  }

  // Mes 2 (Semanas 5 a 8: Días 29 a 56)
  if (month === 2) {
    if (week === 5 || week === 6) {
      return {
        pvpFocusTag: 'Asedio a Capitales Humanas',
        pveFocusTag: 'Control de Monolitos',
        humanPvP: `Día ${day}: Usa Puerta Dimensional para interceptar al ejército principal humano fuera de sus murallas y remátalo con el combo de Dragones y Armageddon.`,
        aiPvE: `Día ${day}: Captura todas las ciudades secundarias de la IA para asfixiar su economía y duplicar tus reservas de maná y criaturas.`,
      };
    } else {
      return {
        pvpFocusTag: 'Exterminio Final PvP',
        pveFocusTag: 'Victoria Absoluta',
        humanPvP: `Día ${day}: Bloquea todos los santuarios de escape del rival humano. Su héroe no podrá retirarse si tus Dragones de Élite dominan la iniciativa.`,
        aiPvE: `Día ${day}: Limpieza total del mapa, captura del 100% de los observatorios y consolidación de la Triple Ley de Facción.`,
      };
    }
  }

  // Semana 4 (Días 25 a 28)
  return {
    pvpFocusTag: 'Consolidación de Fronteras',
    pveFocusTag: 'Caza de Héroes Neutrales',
    humanPvP: `Día ${day}: Mantén a tus héroes secundarios enlazados con Portal de la Ciudad para responder de inmediato a cualquier intento de contragolpe humano.`,
    aiPvE: `Día ${day}: Aprovecha las moradas exteriores capturadas para engrosar tus filas sin coste adicional de transporte.`,
  };
}
