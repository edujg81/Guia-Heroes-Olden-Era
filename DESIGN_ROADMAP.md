# HoMM: Olden Era - Roadmap de Diseño UI/UX y Sistema Visual

Este documento registra las mejoras de diseño, identidad visual y experiencia de usuario (UI/UX) para la aplicación **Heroes of Might and Magic: Olden Era - Guía Canónica y Compendio Táctico**.

---

## Estado General del Proyecto

- **Versión Actual**: 1.2.0 (Rediseño Medieval & Sistema Visual de Facciones)
- **Framework**: React 19 / TypeScript 5.8 / Tailwind CSS v4
- **Modos de Visualización**: Modo Oscuro / Modo Claro con soporte completo de accesibilidad WCAG AA y paleta dinámica para las 6 facciones de Jadame (*Mazmorra, Templo, Necrópolis, Foresta, Colmena, Cisma*).

---

## 📋 Lista de Mejoras y Estado de Implementación

### 1. Marco Estético & Texturización Táctica (HUD Medieval) ✅ [COMPLETADO]
- [x] **Paleta Dinámica por Facciones**: Mapeo estático y seguro de clases Tailwind para las 6 facciones en modos oscuro y claro.
- [x] **Marcos Medievales Limpios y Espaciados**: Estructura de tarjetas con padding generoso (`p-4` / `p-5`), jerarquía de bordes limpia de 2px y contraste óptico sin artefactos esquineros superfluos.
- [x] **Texturas Sutiles de Fondo SVG por Facción**: Patrones geométricos inmersivos e interactivos adaptados al lore de cada facción (`FactionBackgroundPattern.tsx` para Mazmorra, Templo, Necrópolis, Foresta, Colmena y Cisma).
- [x] **Insignias y Sellos de Cera para Estados**: Badges con estética de sello de cera medieval (`WaxSealBadge.tsx`), biselados y relieves tácticos para prioridades (*Crítica*, *Alta*, *Recomendada*, *Opcional*) y rangos de héroe / morada.

---

### 2. Ergonomía Visual en la Visualización de Datos Competitivos ✅ [COMPLETADO]
- [x] **Matriz de Unidades Comparativa con Gráficos Radar/Proporción**: Visualización comparativa inmediata de estadísticas (Ataque, Defensa, Daño, Salud, Velocidad, Iniciativa) entre la criatura base y sus dos ramas de mejora alternativas (`UnitStatRadarChart.tsx`).
- [x] **Línea de Tiempo Interactiva para el Planner Día a Día (56 Días)**: Visor tipo árbol de expansión con hitos clave (Día 1, Día 7, Rush Día 14, Día 21) y selector rápido de fase táctica (Semana 1: Apertura, Semana 2: Rush, Semana 3+: Expansión) (`InteractivePlannerTimeline.tsx`).
- [x] **Calculadora de Costes y Recursos en Tiempo Real**: Panel interactivo flotante o de cabecera que calcula en vivo el coste acumulado (Oro, Madera, Mineral, Mercurio, Gemas, Cristales, Polvo Alquímico) al marcar estructuras completadas (`BuildResourceCalculator.tsx`).

---

### 3. Simulador de Árbol de Habilidades y Especialidades de Héroes ✅ [COMPLETADO]
- [x] **Selector Visual del Árbol de Habilidades de Jadame**: Cuadrícula interactiva con conectores visuales para habilidades primarias/secundarias y cálculo de prerrequisitos de subclases.
- [x] **Simulador de Asignación de Puntos (Nivel 1 al 20)**: Contador interactivo de puntos restantes para planificar builds completas antes de jugar (`HeroBuildSimulator.tsx`).
- [x] **Tarjetas de Héroe con Vista 'Ficha de Comandante'**: Pestañas de acceso rápido por héroe (Estadísticas, Ruta 1-20, Tácticas de Creeping y Sinergias en `RecommendedHeroes.tsx`).

---

### 4. Grimorio de Hechizos & Tablas de Daño Interactivas ✅ [COMPLETADO]
- [x] **Simulador de Escalado de Poder Mágico (Spell Power Slider)**: Deslizador interactivo de Poder (1 a 30) para recalcular en vivo el daño o unidades revividas/curadas en los 4 niveles de maestría (`SpellPowerSlider.tsx`, `spellScalingCalculator.ts`).
- [x] **Filtros por Escuela Mágica Canónica**: Selector táctil con los 5 sellos mágicos de Jadame (*Luz*, *Nochesombra*, *Primigenia*, *Arcana*, *Universal*) con conteo y sinergia de facción (`SpellSchoolSigilSelector.tsx`).
- [x] **Tabla de Escalado y Eficiencia & Comparador 1 vs 1**: Matriz interactiva de daño por maná (`SpellScalingDataTable.tsx`) y duelo comparativo directo de hechizos (`SpellVersusComparator.tsx`).

---

### 5. Microinteracciones, Rendimiento y Accesibilidad ✅ [COMPLETADO]
- [x] **Transiciones de Facción Suaves**: Desvanecimiento cruzado y transiciones de brillo rúnico sin parpadeo al alternar entre facciones (`FactionRunicTransition.tsx`), con lema heráldico y escudo característico.
- [x] **Modo Compacto / Ficha Táctica**: Vista condensada ultraligera optimizada para segundas pantallas o partidas simultáneas (`TacticalCheatSheet.tsx`), con 4 paneles rápidos (Hitos Día 1-7, Iniciativa y Velocidad de Tropas, Hechizos Meta y Leyes Cívicas Prioritarias), seleccionable en formato modal, drawer lateral o pantalla completa con tecla `C` o `T`.
- [x] **Sistema Global de Atajos de Teclado**: Teclas rápidas para cambio directo de facciones (`1` a `6`), navegación de días de campaña (`J` / `K`), navegación de módulos (`Q` / `E`), alternar modo claro/oscuro (`M`), ficha táctica (`C` / `T`) y modal de ayuda (`?` / `H`) (`useKeyboardShortcuts.ts`).
- [x] **Feedback Visual No Intrusivo (HUD Toast)**: Notificaciones flotantes tácticas al activar atajos (`ShortcutToast.tsx`).
- [x] **Accesibilidad Integral WCAG AA**: Enlace de salto rápido al contenido principal (`#main-content`), navegación por foco de teclado completa, compatibilidad con lectores de pantalla y aislamiento estricto en campos de formulario.

---

### 6. Pizarra Táctica Hexagonal Interactiva (Visualizador de Campo de Batalla) ⏸️ [EN SUSPENSO]
- [ ] **Tablero Hexagonal SVG Reactivo**: Malla hexagonal de 11x15 casillas renderizada en SVG vectorial con Tailwind CSS, adaptada al tamaño del viewport con `ResizeObserver`.
- [ ] **Líneas de Visión y Conos de Disparo**: Indicadores visuales de medio daño por distancia, obstrucciones de obstáculos medievales y cobertura de murallas/fosos.
- [ ] **Rango de Amenaza y Radio de Movimiento de Criaturas**: Resaltado dinámico en hexágonos accesibles según la velocidad de la unidad seleccionada y hexágonos en zona de ataque con cálculo de contraataque disponible.
- [ ] **Modo 'Sandwich / Flanqueo'**: Gráficos de vectores direccionales que ilustran las bonificaciones de flanqueo canónicas de *Olden Era*.

---

### 7. Modo Streamer & Overlay Táctico Broadcast (OBS / Segunda Pantalla) ⏸️ [EN SUSPENSO]
- [ ] **Vista 'Clean Broadcast' para Directos de Twitch/YouTube**: Modo de visualización minimalista con fondo transparente (`chroma-key` verde o fondo alfa) para embeber estadísticas del héroe y build order en OBS Studio.
- [ ] **Widget de Comparación de Daño Instantáneo (Pip-in-Pip)**: Ventana flotante PIP en esquina que muestra el cálculo de daño de un ataque o hechizo sobre el objetivo fijado.
- [ ] **Modo Compacto Ultrawide (21:9)**: Distribución bento-grid de 4 columnas optimizada para monitores ultrapanorámicos de jugadores competitivos sin espacios en blanco desaprovechados.

---

### 8. Grimorio Ilustrado con Microanimaciones Rúnicas y Tooltips Inteligentes ✅ [COMPLETADO / EFECTO PÁGINA DESHECHO]
- [x] **Efecto de Paso de Página Medieval**: [DESHECHO / ELIMINADO] Efecto de paso de página 3D y texturas de códice antiguo deshechos a petición del usuario. Se preserva una visualización limpia, directa, sin fricción de navegación y con máxima velocidad de renderizado.
- [x] **Glifos y Partículas Rúnicas Tailwind**: Componente `RunicGlyphAura.tsx` con aceleración GPU (`transform-gpu`) que proyecta un halo de energía y 4 glifos rúnicos flotantes animados (`runeFloatA-D`, `runicRingSpin`) ajustados cromáticamente al elemento mágico canónico de Jadame (Luz, Sombras, Arcana, Primigenia, Neutro) activados en hechizos de Tier 4 y nivel Magistral.
- [x] **Tooltips Holográficos Inteligentes (Smart Floating Cards)**: Componente `SmartSpellHoverCard.tsx` montado en portal (`createPortal`) con detección de colisión en viewport de 4 ejes (*boundary-aware*), efecto holográfico translúcido con desenfoque de fondo, cálculo reactivo en vivo de escalado de daño/curación de 0 a 30 Poder Mágico (SP), desglose de costes de maná y polvo alquímico, y sinergias canónicas de facción. Integrado en las tarjetas del Grimorio, en la Tabla de Escalado y en el Comparador Versus.

---

### 9. Sistema de Impresión y Exportación a PDF de Hojas de Campaña ⏸️ [EN SUSPENSO]
- [ ] **Hoja de Ruta Imprimible en Blanco y Negro de Alto Contraste**: Estilos `@media print` dedicados para imprimir el plan de los primeros 14 días en papel A4 sin gastar tinta, con casillas de verificación manuales.
- [ ] **Tarjeta de Ficha de Torneo Exportable en PNG**: Generación de captura gráfica vectorial de la build de héroe y ejército para compartir en redes sociales, Discord o foros competitivos.

---

### 10. Visualizador de Ciudad y Castillo Isométrico/2.5D (Interactive Town View Model) ⏸️ [EN SUSPENSO]
- [ ] **Esquema de Silueta de Castillo Interactivo**: Representación gráfica vectorial de la ciudad de la facción activa con ranuras interactivas para cada edificio (Ayuntamiento, Metropolis, Fuertes, Cofradía de Magos, Moradas de Tier 1 a 7 y Estructuras de Facción Únicas).
- [ ] **Estados Visuales de Construcción**:
  - *No construido*: Silueta esquemática tenue con bordes discontinuos y coste en tooltip.
  - *En construcción / Disponible*: Efecto de andamio medieval iluminado con el color de acento de la facción.
  - *Completado*: Ilustración de edificio activa con relieve, sello de cera de finalización y producción semanal destacada.
- [ ] **Líneas Conectoras de Árbol de Dependencias de Ciudad**: Diagrama de flujo SVG ortogonal que traza de forma nítida los prerrequisitos entre estructuras (ej. Fuerte -> Ciudadela -> Castillo; Cofradía Nivel 1 -> Nivel 2 -> Nivel 3).

---

### 11. Comparador Visual de Héroes Lado a Lado (Dual Commander Split-Screen) ✅ [COMPLETADO]
- [x] **Vista Dividida de 2 Columnas para Comandantes**: Interfaz para contrastar 2 héroes simultáneamente (ej. Main de Combate vs Héroe de Farmeo, o tu Héroe principal vs el Héroe del rival).
- [x] **Gráfica Diferencial de Barras Superpuestas**: Visualización directa de las diferencias numéricas en Ataque, Defensa, Poder Mágico, Conocimiento, Moral y Suerte con indicadores de ventaja (+/-) y simulador dinámico de nivel (1 a 30).
- [x] **Matriz de Sinergia de Criaturas con Auras Temáticas**: Cuadrícula que resalta qué tropas del ejército se benefician de las especialidades pasivas de cada comandante (🌟 Directa, 🛡️ Apertura Día 1, 🔮 Mágica, ⚔️ Choque).
- [x] **Veredicto Táctico Competitivo y Emparejamientos Rápidos**: Pestaña dedicada con análisis de curvas de poder (Día 1-7, Semanas 2-3, Choque Late Game) y comparativa de builds óptimas de habilidades.

---

### 12. Barra de Iniciativa y Secuencia de Turnos de Combate (Combat Turn Ribbon) ⏸️ [EN SUSPENSO]
- [ ] **Franja Horizontal de Secuencia de Iniciativa**: Barra superior inspirada en los combates tácticos por turnos que lista cronológicamente el orden en que atacarán las 14 unidades (7 aliadas y 7 enemigas).
- [ ] **Animación de Desplazamiento por Efectos de Estado**: Reordenación visual dinámica en vivo al simular hechizos de Aceleración (*Haste*), Lentitud (*Slow*), Moral alta o efectos de aturdimiento.
- [ ] **Indicador del Turno Activo con Borde Pulsante**: Enfoque luminoso sobre el icono de la unidad que tiene la iniciativa con datos flotantes de velocidad y alcance.

---

### 13. Modo Inmersivo 'Zen Commander' a Pantalla Completa ✅ [COMPLETADO]
- [x] **Ocultación Dinámica de Interfaz con 1 Clic (Atajo 'Z' o 'F11')**: Minimizado automático del encabezado superior, selector de pestañas y pie de página para maximizar el área útil al 100% de la pantalla durante torneos o partidas en directo.
- [x] **Fondo Ambiental Dinámico con Partículas Suaves CSS**: Partículas atenuadas de baja carga gráfica temáticas por facción (ascuas volcánicas para Mazmorra, plumas de luz para Templo, niebla espectral para Necrópolis, hojas doradas para Foresta, zumbido de esporas para Colmena y cristales de hielo/vacío para Cisma).
- [x] **Mini-Controlador Flotante Desplegable**: Botón discreto en esquina para cambiar rápidamente de día o facción sin abandonar el modo inmersivo.

---

### 14. Sistema de Paletas de Accesibilidad WCAG AAA y Filtros de Daltonismo ⏳ [PARCIALMENTE COMPLETADO]
- [EN SUSPENSO] **Modos de Alto Contraste para Daltonismo**: Modos preconfigurados para Protanopía, Deuteranopía y Tritanopía en las estadísticas de criaturas, barras de salud y árboles de habilidades.
- [EN SUSPENSO] **Indicadores Geométricos de Estado Universales**: Sustitución de la dependencia exclusiva en color rojo/verde por símbolos medievales estandarizados (triángulos para aumento, rombos para neutral, círculos para penalización).
- [x] **Selector de Tamaño de Tipografía Dinámico (Escalado de Fuente UI)**: Ajuste en tiempo real de escala de texto (100%, 115%, 130%) para optimizar la legibilidad en pantallas lejanas o televisiones de salón. Soporte mediante botón en cabecera, mini-controlador Zen y tecla de acceso rápido 'A'.

