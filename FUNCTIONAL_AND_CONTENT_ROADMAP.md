# HoMM: Olden Era - Roadmap de Mejoras Funcionales y de Contenido Competitivo

Este documento recoge las propuestas de expansión **no visuales ni de diseño**, centradas exclusivamente en **mecánicas de juego, cálculos matemáticos competitivos, herramientas para torneos, bases de datos canónicas y utilidades de metajuego** para *Heroes of Might and Magic: Olden Era* (Jadame).

---

## 1. Motor de Cálculo de Combate Hexagonal (Combat Math Engine)
**Objetivo**: Ofrecer a los jugadores la certeza matemática exacta del resultado de cualquier interacción de combate antes de realizar el movimiento en el juego.

- **Fórmula de Daño Real Ataque vs Defensa**:
  - Implementar la fórmula canónica de *Olden Era*:
    $$\text{Factor de Ataque/Defensa} = \begin{cases} 1 + (\text{Ataque} - \text{Defensa}) \times 0.05 & \text{si } \text{Ataque} \ge \text{Defensa} \\ \frac{1}{1 + (\text{Defensa} - \text{Ataque}) \times 0.025} & \text{si } \text{Defensa} > \text{Ataque} \end{cases}$$
- **Simulador de Bajas por Stack**:
  - Introducir el número de criaturas del stack atacante y defensor para calcular:
    - Rango de daño mínimo, medio y máximo.
    - Criaturas eliminadas con certeza garantizada (*guaranteed kills*).
    - Contraataque resultante (con verificación de si la unidad defensora dispone de contraataque o tiene la habilidad *Sin represalia*).
- **Modificadores de Alcance, Terreno y Flanqueo**:
  - Penalizador de medio daño por distancia (más de la mitad del tablero hexagonal).
  - Penalizador por disparar cuerpo a cuerpo (a menos que posea la especialidad de combate cerrado).
  - Bonificación de daño por flanqueo y golpe por la espalda (*Backstab / Flank damage*).
  - Efecto de reducción de daño de murallas y fosos en asedios de castillo.

---

## 2. Simulador de Fase de Pick & Ban para Torneos (Drafting System 1v1)
**Objetivo**: Proporcionar a los organizadores de torneos, árbitros y jugadores una plataforma integrada para gestionar la fase previa a la partida.

- **Fase de Veto de Facciones (Ban de Facciones)**:
  - Formato competitivo oficial: Cada jugador veta 1 facción de las 6 de Jadame por turno.
  - Selección de facción final con revelación simultánea o por turnos (formato *Blind Pick* o *Draft Alternado*).
- **Veto de Héroes Titulares (Hero Bans)**:
  - Veto opcional de hasta 2 héroes por facción para evitar inicios abusivos de Día 1 (ej. héroes de farmeo de recursos o con bola de fuego de salida).
- **Temporizador de Turno de Elección**:
  - Reloj de cuenta atrás configurable (30s / 60s / 90s) con sonido de alerta para partidas reglamentadas.
- **Enlace de Sala Compartida o Copiado de Resultado**:
  - Generación de resumen de vetos y selecciones en formato texto/markdown para pegar en el chat del torneo o en Discord.

---

## 3. Serializador y Compartidor de 'Build Codes' (Shareable Deck / Hero Codes)
**Objetivo**: Permitir a la comunidad y creadores de contenido exportar e importar configuraciones completas de héroes y órdenes de construcción con una simple cadena de texto alfanumérica.

- **Codificación Base64 Compacta**:
  - Cadena única que empaqueta:
    1. Facción seleccionada.
    2. Héroe titular.
    3. Secuencia de habilidades asignadas del nivel 1 al 20.
    4. Hechizos aprendidos prioritarios.
    5. Leyes cívicas promulgadas.
    6. Plantilla de orden de construcción de los primeros 14 días.
- **Botón de Importar / Exportar con 1 Clic**:
  - Lectura directa desde el portapapeles o decodificación de parámetros en la URL (`?build=H6-DUN-MAL-A3B2C1...`).
- **Vista Previa de Build Compartida**:
  - Al cargar un código externo, visualización inmediata de la ficha resumen con opción de editar o clonar la build en la cuenta local.

---

## 4. Calculadora de Retorno de Inversión Económica (Town Economy & ROI Analyzer)
**Objetivo**: Resolver el dilema estratégico de si compensa más priorizar el Ayuntamiento/Capitolio o las moradas militares de Tier alto en la primera semana.

- **Tiempo de Amortización (Payback Period en Días)**:
  - Cálculo de cuántos días exactos tarda una estructura económica (Ayuntamiento: +1.000 Oro/día por 5.000 Oro de coste) en recuperar su inversión.
- **Coste de Oportunidad de Reclutamiento Semanal**:
  - Alerta de oro retenido: aviso al jugador de si construir una morada un viernes (Día 5 o 6) le dejará sin oro suficiente el Día 7/Día 1 para comprar las tropas producidas.
- **Simulador de Minería y Conversión en Puesto Comercial**:
  - Cálculo de eficiencia al intercambiar madera y mineral excedente por recursos raros (Mercurio, Gemas, Cristales, Polvo) según el número de mercados construidos en el reino.

---

## 5. Compendio Canónico de Artefactos de Jadame y Bonificaciones de Conjunto (Sets)
**Objetivo**: Base de datos completa y exhaustiva de todos los artefactos de *Olden Era* con filtros por rareza, slot y sinergia.

- **Clasificación por Ranura de Equipamiento**:
  - Cabeza (Yelmos, Coronas).
  - Cuello (Amuletos, Collares).
  - Torso (Armaduras, Corazas, Capas).
  - Manos (Armas de mano derecha, Escudos y Tomos de mano izquierda).
  - Pies (Botas de velocidad, Sandalias místicas).
  - Dedos (Anillos de poder, Sellos mágicos).
  - Bolsillos / Miscelánea (Talismanes, Catalejos, Balastos).
- **Sets de Artefactos y Efectos de Conjunto**:
  - Identificación de piezas de set y cálculo acumulativo de las bonificaciones activadas al portar 2, 3 o el conjunto completo.
- **Calculadora de Atributos Totales del Héroe**:
  - Panel para equipar artefactos en la silueta del héroe y ver la suma total de Ataque, Defensa, Poder Mágico, Conocimiento, Moral y Suerte.

---

## 6. Motor de Cálculo de Puntos de Movimiento y Rutas de Creeping (Logistics Engine)
**Objetivo**: Maximizar la eficiencia de exploración del mapa de aventura en los primeros 7 días sin desperdiciar pasos.

- **Coste de Movimiento por Terreno**:
  - Llanura/Hierba: 100 puntos de movimiento por casilla.
  - Bosque / Terreno quebrado: 125 puntos.
  - Pantano / Nieve / Páramo: 150 - 175 puntos (reducido por habilidades de orientación o afinidad de facción nativa).
  - Camino de tierra / Pavimento: 75 puntos de movimiento.
- **Calculadora de 'Turno de Recogida'**:
  - Indicador de cuántos puntos de movimiento resta desviarse a recoger un cofre o pila de madera en función de la velocidad del héroe y su unidad más lenta.
- **Penalización por Unidad Lenta en el Ejército**:
  - Cálculo dinámico de la velocidad base del héroe en el mapa de aventura determinado por la criatura con menor velocidad del ejército (o el beneficio de dejar unidades lentas en la guarnición para explorar con un 'scout').

---

## 7. Matriz de Emparejamientos Competitivos (Matchup Matrix 6x6)
**Objetivo**: Guía de confrontación directa entre cada facción frente a las otras 5 de Jadame en las distintas fases de la partida.

- **Desglose 1 contra 1 por Facción**:
  - *Templo vs Necrópolis*: Ventaja de moral y daño de Luz contra No-Muertos; gestión de la plaga de esqueletos en partidas largas.
  - *Mazmorra vs Foresta*: Choque de daño explosivo y magia elemental vs velocidad de iniciativa y control de ninfas/faunos.
  - *Colmena vs Cisma*: Horda rápida de enjambre e infestación temprana vs invocaciones del vacío y escudos protectores de fallas.
- **Puntos de Inflexión Temporal (Power Spikes)**:
  - Gráfico conceptual de potencia por semana (Semana 1: Temprano | Semana 2-3: Medio | Semana 4+: Late Game) para saber cuándo debe forzar la batalla decisiva cada bando.
- **Counters Específicos de Criaturas**:
  - Lista de unidades clave que neutralizan mecánicas del rival (ej. tiradores sin penalización cuerpo a cuerpo contra voladores acosadores, unidades resistentes a magia contra héores hechiceros).

---

## 8. Asistente de Partida en Tiempo Real (In-Match Tracker & Scout Log)
**Objetivo**: Bloc de notas táctico interactivo para que el jugador registre el estado de la partida competitiva sin salir del navegador.

- **Checklist de Minas Aseguradas**:
  - Selector rápido para marcar qué minas de su territorio ya están capturadas (Aserradero, Cantera, Mina de Mercurio, Gema, Cristal, Polvo).
- **Contador de Tiempo de Respawn de Bancos de Criaturas**:
  - Registro de bancos limpiados (Criptas, Tumbas, Torres de Magos) y recuento de tesoros obtenidos.
- **Estimador de Ejército Rival**:
  - Herramienta para deducir el tamaño probable del ejército enemigo basándose en el nivel del héroe avistado en la taberna y la semana de juego actual.
- **Registro de Bajas y Eficiencia**:
  - Métrica de pérdidas sufridas durante el creeping para calcular el ratio de salud/oro preservado antes del combate final.

---

## 9. Base de Datos de Bancos de Criaturas y Neutrales de Jadame
**Objetivo**: Conocer con exactitud qué tropas custodian cada estructura neutral del mapa de aventura y qué recompensa económica otorgan antes de entrar en combate.

- **Niveles de Guardia de Bancos de Criaturas (Tier 1 a 4)**:
  - Detalle de la composición mínima y máxima de defensores para saber si el ejército del Día 2 o Día 3 es suficiente para limpiarlo sin bajas.
- **Recompensa en Oro, Recursos y Artefactos**:
  - Probabilidades porcentuales de obtención de artefactos menores, mayores o reliquias en cada tipo de morada neutral.
- **Nivel de Dificultad Recomendado**:
  - Semáforo táctico: Verde (Fácil / Día 1-3), Amarillo (Medio / Día 4-7 con tropas de Tier 2-3), Rojo (Peligro / Requiere Tier 4+ o magia de área).

---

## 10. Calculadora de Cadena de Nigromancia y Conversión de Almas (Necromancy Yield & Soul Harvesting Engine)
**Objetivo**: Proporcionar al jugador de Necrópolis la predicción exacta de esqueletos, espectros o vampiros levantados tras cada combate para planificar el crecimiento de su ejército sin pérdidas.

- **Fórmula de Rendimiento de Nigromancia de Olden Era**:
  - Cálculo basado en el porcentaje de habilidad de Nigromancia del héroe (Básica 10%, Avanzada 20%, Experta 30%), bonificaciones de especialidad de héroe y el multiplicador del edificio *Amplificador de Nigromancia*.
- **Conversor de Salud a Criaturas No-Muertas**:
  - Algoritmo que procesa el pool de salud total de las criaturas enemigas derrotadas y calcula:
    - Cantidad de unidades de Tier 1 levantadas automáticamente.
    - Cuotas de almas necesarias para transmutar en unidades de Tier 2 o Tier 3.
- **Ruta de Farmeo Óptima para Acumulación de No-Muertos**:
  - Clasificación de neutrales del mapa por ratio de Salud/Dificultad (identificación de 'stacks de comida' con alto HP y baja pegada, ideales para inflar el ejército de esqueletos en la primera quincena).

---

## 11. Planificador de Cadena de Héroes y Relevos de Mapa (Hero Chain & Chaining Logistics Optimizer)
**Objetivo**: Maximizar el tiempo de combate del héroe principal eliminando el tiempo de viaje de regreso a la ciudad para recoger tropas.

- **Simulador de Relevos de Tropas (Chaining de 2 a 4 Héroes)**:
  - Definición de posiciones clave de héroes secundarios en el mapa (Scout 1 en puertas de la ciudad, Scout 2 en cruce de caminos, Héroe Principal en el frente).
  - Cálculo de casillas de movimiento exactas requeridas para que cada héroe entregue el stack de refuerzos al siguiente sin que ninguno se quede sin puntos de acción.
- **Verificación de 'Cero Pérdida de Movimiento'**:
  - Alertas automáticas si un intercambio de tropas reduce la velocidad del héroe por transferir criaturas lentas antes del movimiento.

---

## 12. Calculadora de Costes de Astrología, Cofradía y Respec de Habilidades (Guild & Astrology Cost Calculator)
**Objetivo**: Optimizar la gestión de oro y recursos raros destinados al grimorio mágico y a la adaptación de builds de habilidades en torneos.

- **Fórmulas Canónicas de Desbloqueo en Observatorio**:
  - Cálculo del coste estricto: $\text{Coste} = \text{Tier} \times (2\text{ Cristales} + 2\text{ Gemas} + 2\text{ Mercurio}) + \text{Oro}$.
- **Progresión de Polvo Alquímico (*Alchemical Dust*)**:
  - Nivel 1 (Base, 0 Polvo).
  - Nivel 2 (25 Polvo + 1.000 Oro).
  - Nivel 3 (25 Polvo + 1.500 Oro + 2 Raros).
  - Nivel 4 Magistral (25 Polvo + 2.000 Oro + 4 Raros).
- **Simulador de Respec y Reentrenamiento**:
  - Coste en oro y puntos de experiencia para reasignar puntos de habilidad secundarios en las Cofradías de Reentrenamiento o Altares de Jadame.

---

## 13. Motor de Detección Automática de Sinergias Héroe-Unidad-Hechizo (Synergy Recommender Engine)
**Objetivo**: Evaluar cuantitativamente la compatibilidad entre héroes, tropas y escuelas de magia para guiar al jugador hacia combinaciones de alto rendimiento.

- **Puntuación de Sinergia (Synergy Score 0-100%)**:
  - Algoritmo que contrasta las pasivas del héroe con las etiquetas de las criaturas de la facción (ej. unidades voladoras con bonificador de ataque aéreo, tiradores con bonificación de rango o unidades demoníacas/no-muertas).
- **Recomendación de Hechizos Clave por Especialidad**:
  - Si el héroe potencia unidades resistentes, el motor sugiere bendiciones de armadura y regeneración de Luz; si el héroe es agresivo de alta iniciativa, recomienda hechizos de choque directo de Nochesombra o Primal.
- **Detección de Incompatibilidades y Antisinérgias**:
  - Avisos preventivos al combinar tropas de moral incompatible o habilidades secundarias que se solapan inútilmente.

---

## 14. Compendio Canónico de Hechizos de Aventura y Teletransporte (Adventure Spells & Map Travel Compendium)
**Objetivo**: Base de datos detallada de los hechizos lanzados fuera del combate en el mapa de mundo de Jadame.

- **Mecánicas y Costes de Hechizos de Mapa**:
  - *Portal de la Ciudad (Town Portal)*: Rango de distancia, coste de maná y si permite elegir la ciudad de destino según el nivel de magia.
  - *Vuelo (Fly) y Caminar sobre el Agua (Water Walk)*: Reducción de coste de movimiento y superación de barreras geográficas.
  - *Ver Tierra / Ver Aire (View Earth / Air)*: Revelación de minas, artefactos, monstruos y héroes rivales en la niebla de guerra.
  - *Invocar / Destruir Embarcación*: Reglas de transporte marítimo en costas de Jadame.
- **Filtro de Hechizos Prohibidos en Torneos Oficiales**:
  - Marcado de hechizos restringidos por normativas competitivas estándar para partidas regladas.

---

## 15. Simulador de Probabilidad de Moral y Suerte Acumulativa (Morale & Luck Probability Engine)
**Objetivo**: Calcular el valor esperado del impacto de la Moral y la Suerte en el desenlace de la batalla.

- **Probabilidad Real de Turno Extra por Moral**:
  - Cálculo de la tasa porcentual de actuación adicional por cada nivel de Moral (+1: 4.2%, +2: 8.3%, +3: 12.5% o tabla oficial de *Olden Era*).
  - Factor de pérdida de turno por Moral negativa (-1, -2, -3).
- **Penalizadores por Ejército Mixto**:
  - Regla canónica: -1 Moral al mezclar tropas de dos facciones diferentes, -2 por tres facciones, etc.
  - Excepciones: Inmunidad a moral de criaturas No-Muertas (Necrópolis) y seres mecánicos/del vacío (Cisma).
- **Multiplicador de Golpe de Suerte**:
  - Probabilidad de impacto crítico con bonificación de daño y efecto de suerte desafortunada (*Bad Luck*) que reduce el daño al 50%.

---

## 16. Sistema de Múltiples Perfiles de Partida Local y Copias de Seguridad (Multi-Profile Local Match State)
**Objetivo**: Permitir al jugador gestionar varias campañas o partidas de torneo simultáneas sin sobreescribir su progreso.

- **Gestor de Perfiles de Partida (Hasta 10 Slots Locales)**:
  - Posibilidad de crear perfiles independientes con nombre y fecha (ej. "Torneo Invierno - Mazmorra", "Prueba Creeping Día 7 - Templo", "Ranked 1v1 - Cisma").
  - Almacenamiento aislado de días completados, héroe activo, build planificada y notas de partida.
- **Exportación e Importación de Respaldo en JSON**:
  - Descarga de todas las partidas en un único fichero `.json` para migrar entre dispositivos o guardar partidas históricas de torneos.

---

## 17. Matriz Coste/Beneficio de Leyes Cívicas vs Desarrollo Militar (Civic Laws Cost/Benefit Matrix)
**Objetivo**: Ofrecer un análisis econométrico del impacto de cada Ley de la Ciudad en comparación con la compra directa de tropas.

- **Tasa Interna de Retorno de Leyes Económicas**:
  - Evaluación de leyes que otorgan +150 Oro/día o reducción del 10% en costes de moradas: cálculo de cuántas compras se necesitan para rentabilizar el gasto de Puntos de Ley.
- **Valor Militar Equivalente**:
  - Conversión del beneficio de leyes militares (ej. +1 Ataque a todas las criaturas de Tier 1-3) en oro equivalente en estadísticas para determinar en qué semana es óptimo promulgarlas.
- **Detector de Leyes Excluyentes e Incompatibles**:
  - Mapeo de decisiones éticas y políticas de la ciudad donde promulgar una ley bloquea permanentemente su alternativa en la misma partida.

