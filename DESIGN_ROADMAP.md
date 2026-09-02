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

### 5. Microinteracciones, Rendimiento y Accesibilidad ⏳ [PENDIENTE]
- [ ] **Transiciones de Facción Suaves**: Desvanecimiento cruzado y transiciones de brillo rúnico sin parpadeo al alternar entre facciones.
- [ ] **Modo Compacto / Ficha Táctica**: Vista condensada optimizada para segundas pantallas o dispositivos móviles durante partidas competitivas.
- [ ] **Atajos de Teclado**: Teclas rápidas para navegación de facciones (1-6), avance de días (J/K) y reseteo de filtros.
