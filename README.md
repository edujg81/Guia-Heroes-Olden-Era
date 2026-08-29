# 🏛️ Heroes of Might and Magic: Olden Era — Strategy & City Planning Compendium

> **Guía Técnica de Arquitectura, Manual de Componentes y Diagnóstico de Calidad de Software**
> 
> *Versión del Proyecto:* 1.2.0 • *Stack:* React 19 + TypeScript 5.8 + Tailwind CSS v4 + Vite 6

---

## 📑 Tabla de Contenidos

1. [Visión General del Proyecto](#-visión-general-del-proyecto)
2. [Árbol Visual de Estructura de Directorios](#-árbol-visual-de-estructura-de-directorios)
3. [Responsabilidad de Módulos y Componentes](#-responsabilidad-de-módulos-y-componentes)
   - [Núcleo de la Aplicación (`/src`)](#núcleo-de-la-aplicación-src)
   - [Capa de Presentación e Interfaz (`/src/components`)](#capa-de-presentación-e-interfaz-srccomponents)
   - [Capa de Datos y Dominio (`/src/data`)](#capa-de-datos-y-dominio-srcdata)
   - [Utilidades y Estado Persistente (`/src/utils` & `/src/context`)](#utilidades-y-estado-persistente-srcutils--srccontext)
4. [Diagnóstico de Puntos Críticos y Deuda Técnica](#-diagnóstico-de-puntos-críticos-y-deuda-técnica)
   - [1. Componentes Monolíticos ("God Components")](#1-componentes-monolíticos-god-components)
   - [2. Desconexión de Context y Prop Drilling Innecesario](#2-desconexión-de-context-y-prop-drilling-innecesario)
   - [3. Sobrecarga del Bundle por Carga Estática de Datos](#3-sobrecarga-del-bundle-por-carga-estática-de-datos)
   - [4. Tipado Débil con Fallback Permisivo (`| string`)](#4-tipado-débil-con-fallback-permisivo--string)
   - [5. Duplicación de Lógica y Patrones UI sin Componentes Atómicos](#5-duplicación-de-lógica-y-patrones-ui-sin-componentes-atómicos)
5. [Plan de Refactorización y Buenas Prácticas Recomendadas](#-plan-de-refactorización-y-buenas-prácticas-recomendadas)

---

## 🎯 Visión General del Proyecto

Esta aplicación es una **plataforma interactiva de estrategia, optimización de héroes, planificación cívica día a día (Campaña de 56 Días) y simulación táctica** para el videojuego *Heroes of Might and Magic: Olden Era*. 

Soporta las **6 facciones canónicas**:
- 🟣 **Mazmorra (Dungeon)**
- 🟡 **Templo (Temple)**
- 🟢 **Arboleda (Grove / Sylvan)**
- ⚪ **Necrópolis (Necropolis)**
- 🟠 **Enjambre (Hive / Swarm)**
- 🔵 **Cisma (Schism)**

Ofrece sincronización de estado local con persistencia automática (`localStorage`), tematización dinámica reactiva por facción y modo oscuro/claro de alto contraste.

---

## 🌳 Árbol Visual de Estructura de Directorios

```text
├── index.html                           # Entry-point HTML con metadatos SEO y tipografías
├── package.json                         # Dependencias (React 19, Tailwind v4, Motion, Lucide)
├── tsconfig.json                        # Configuración estricta de compilación TypeScript
├── vite.config.ts                       # Configuración de empaquetado Vite con soporte Tailwind v4
├── metadata.json                        # Configuración de manifiesto del aplicativo
└── src/
    ├── main.tsx                         # Bootstrap del árbol React DOM
    ├── App.tsx                          # Componente raíz: Shell principal, tabs y temas dinámicos
    ├── index.css                        # Entry point de estilos globales (Tailwind v4 theme variables)
    ├── types.ts                         # Definiciones de tipos TypeScript de todo el dominio
    │
    ├── context/                         # Capa de estado global
    │   └── ThemeContext.tsx             # Contexto de tematización (actualmente en transición)
    │
    ├── utils/                           # Helpers y hooks utilitarios
    │   └── useStickyState.ts            # Hook personalizado de sincronización con localStorage
    │
    ├── components/                      # Vistas y componentes de presentación
    │   ├── Header.tsx                   # Barra de navegación principal y selector de facción/tema
    │   ├── DayByDayPlanner.tsx          # Planificador de 56 días de desarrollo y exploración
    │   ├── TownStructuresBrowser.tsx    # Árbol cívico, fortificaciones y moradas de criaturas
    │   ├── FactionLawsTree.tsx          # Árbol de Leyes de Facción, sellos y presets tácticos
    │   ├── SpellGrimoire.tsx            # Grimorio de hechizos (5 escuelas) y niveles de maestría
    │   ├── UnitMatrix.tsx               # Matriz de tropas Tier 1-7 con evoluciones dobles
    │   ├── CombatTactics.tsx            # Manual táctico de combate y enfrentamientos por facción
    │   ├── HeroSkillOptimizer.tsx       # Contenedor/hub para gestión de héroes y habilidades
    │   ├── RecommendedHeroes.tsx        # Tier list, especialidades y comandantes destacados
    │   ├── OfficialSkillsBrowser.tsx    # Explorador de los 10 árboles oficiales de habilidades
    │   └── SubclassesBrowser.tsx        # Clases de prestigio y combinaciones de maestría
    │
    └── data/                            # Capa de datos estáticos y modelos de simulación
        ├── factionDataProvider.ts       # Proveedor centralizador de datos, paletas y temas
        ├── dungeonData.ts               # Dataset Mazmorra (Dungeon): 56 días, unidades, héroes
        ├── dungeonOpponentTactics.ts    # Tácticas reactivas de oponente día a día (IA vs Humano)
        ├── templeData.ts                # Dataset Templo (Temple)
        ├── arboledaData.ts              # Dataset Arboleda (Grove)
        ├── necropolisData.ts            # Dataset Necrópolis (Necropolis)
        ├── enjambreData.ts              # Dataset Enjambre (Hive)
        ├── cismaData.ts                 # Dataset Cisma (Schism)
        │
        ├── factionLawsData.ts           # Leyes y presets de Mazmorra
        ├── templeLawsData.ts            # Leyes y presets de Templo
        ├── arboledaLawsData.ts          # Leyes y presets de Arboleda
        ├── necropolisLawsData.ts        # Leyes y presets de Necrópolis
        ├── enjambreLawsData.ts          # Leyes y presets de Enjambre
        ├── cismaLawsData.ts             # Leyes y presets de Cisma
        │
        ├── officialSkillsData.ts        # Árboles oficiales de habilidades (10 escuelas primarias)
        ├── subclassesData.ts            # Subclases de héroes (Tier 5 a Experto)
        ├── subskillsRecommendationData.ts # Recomendaciones sinérgicas de subhabilidades
        │
        ├── structures/                  # Arquitectura de edificios de ciudad
        │   ├── townStructuresData.ts    # Exportador unificado de edificios de todas las facciones
        │   ├── dungeonStructures.ts     # Edificios de Mazmorra (Cámara del Consejo, Moradas)
        │   ├── templeStructures.ts      # Edificios de Templo (Cabildo Solar, Forja Radiante)
        │   ├── groveStructures.ts       # Edificios de Arboleda (Palacio de la Arboleda)
        │   ├── necropolisStructures.ts  # Edificios de Necrópolis (Rostro Eterno)
        │   ├── hiveStructures.ts        # Edificios de Enjambre (Corazón del Apiario)
        │   └── schismStructures.ts      # Edificios de Cisma (Remanente Abisal)
        │
        └── spells/                      # Compendio de magia y astrología
            ├── spellsData.ts            # Exportador unificado del catálogo de hechizos
            ├── arcaneSpells.ts          # Magia Arcana
            ├── daylightSpells.ts        # Magia de Luz (Daylight)
            ├── nightshadeSpells.ts      # Magia Nochesombra (Nightshade)
            ├── primalSpells.ts          # Magia Primigenia (Primal / Tierra / Fuego)
            └── neutralSpells.ts         # Magia de Aventura / Neutral (Universal)
```

---

## 🧩 Responsabilidad de Módulos y Componentes

### Núcleo de la Aplicación (`/src`)

* **`App.tsx`**: Orquesta el estado global de pestañas (`activeTab`), facción activa (`selectedFaction`) y modo de color (`themeMode`). Inyecta variables CSS dinámicas al `:root` (`--theme-primary-hex`, scrollbar) y aplica el patrón *keep-alive* con clases `block / hidden` para preservar el estado interactivo del usuario entre cambios de pestaña.
* **`types.ts`**: Fuente única de verdad tipográfica para toda la aplicación. Define contratos de datos: `BuildStep`, `UnitInfo`, `TownStructure`, `FactionLaw`, `RecommendedSpell`, `OfficialSkillCategory`, `SubclassInfo`, etc.
* **`index.css`**: Configura Tailwind v4 (`@import "tailwindcss";`), estilizado del scrollbar dinámico y clases de apoyo para layouts de alta densidad.

### Capa de Presentación e Interfaz (`/src/components`)

| Componente | Responsabilidad Principal |
| :--- | :--- |
| **`Header.tsx`** | Barra superior reactiva; permite conmutar entre las 6 facciones, alternar entre modo oscuro/claro y navegar entre las 7 secciones del sistema. |
| **`DayByDayPlanner.tsx`** | Planificador táctico día a día para 2 meses in-game (56 días). Gestiona checklists interactivos de tareas completadas, rutas de expansión y tácticas frente a IA u oponente humano. |
| **`TownStructuresBrowser.tsx`** | Visualizador de desarrollo urbano. Modela los 3 niveles del Palacio Cívico, los 3 niveles de Fortificaciones, y las moradas de criaturas Tier 1 a 7 con ramificación doble de evolución y cálculo de costes. |
| **`FactionLawsTree.tsx`** | Árbol interactivo de Leyes de Facción (Tier 1 a 4). Permite asignar Puntos de Ley, simular sellos de bonificación y cargar presets competitivos predefinidos. |
| **`SpellGrimoire.tsx`** | Catálogo completo de hechizos agrupados por escuela (Nochesombra, Luz, Arcana, Primigenia, Neutral). Permite inspeccionar los 4 niveles de efecto (Base -> Avanzado -> Magistral) y marcar hechizos aprendidos. |
| **`UnitMatrix.tsx`** | Matriz comparativa de unidades militares (Tier 1 a Tier 7). Modela estadísticas, habilidades pasivas, activas y modos duales de ataque. |
| **`CombatTactics.tsx`** | Manual de combate con sinergias de ejército, formaciones en el tablero hexagonal y estrategias de contragolpe específicas contra cada facción rival. |
| **`HeroSkillOptimizer.tsx`** | Vista contenedora tipo Hub con sub-pestañas para explorar Héroes Recomendados, Árboles de Habilidades Oficiales y Subclases. |
| **`RecommendedHeroes.tsx`** | Catálogo de comandantes destacados por facción, roles tácticos (Apertura Día 1, Principal Mágico/Físico) y especialidades. |
| **`OfficialSkillsBrowser.tsx`** | Desglose de los 10 árboles oficiales de habilidades (Ataque, Defensa, Liderazgo, Magia, etc.) con sus requisitos de maestría. |
| **`SubclassesBrowser.tsx`** | Matriz de especializaciones de prestigio para comandantes que alcanzan rango Experto en combinaciones de habilidades. |

### Capa de Datos y Dominio (`/src/data`)

* **`factionDataProvider.ts`**: Actúa como **Facade Pattern** unificado. Centraliza el acceso a builds, unidades, héroes, leyes y paletas cromáticas temáticas para las 6 facciones.
* **`structures/`**: Archivos de datos independientes por facción con nombres canónicos, requisitos de construcción, modificadores de ingresos y crecimientos semanales.
* **`spells/`**: Archivos categorizados por escuela mágica que contienen costes de maná, descripciones, requisitos de rango y fórmulas numéricas escalables.

### Utilidades y Estado Persistente (`/src/utils` & `/src/context`)

* **`useStickyState.ts`**: Hook reactivo que sincroniza automáticamente cualquier estado con `window.localStorage`, garantizando que filtros, casillas marcadas y selecciones sobrevivan a recargas de página de forma transparente y resiliente a errores de parseo JSON.
* **`ThemeContext.tsx`**: Contexto creado para gestionar el estado visual, pendiente de unificación total para evitar prop-drilling en componentes hijos.

---

## ⚠️ Diagnóstico de Puntos Críticos y Deuda Técnica

Como Arquitecto de Software y Tech Lead, se han identificado los siguientes **puntos críticos de arquitectura, mantenibilidad y rendimiento** en el código actual:

### 1. Componentes Monolíticos ("God Components")
* **Problema:** Varios componentes de la carpeta `src/components/` superan las 600–1600 líneas de código en un solo archivo:
  - `FactionLawsTree.tsx` (~1.640 líneas)
  - `TownStructuresBrowser.tsx` (~810 líneas)
  - `SpellGrimoire.tsx` (~760 líneas)
  - `DayByDayPlanner.tsx` (~620 líneas)
* **Impacto:** Mezclan lógica de filtrado, renderizado de tarjetas, modales flotantes, cálculos de costes y SVG interactivos. Esto dificulta las revisiones de código (*Code Reviews*), incrementa el riesgo de regresiones y complica el testing unitario.
* **Solución recomendada:** Extraer componentes atómicos a subcarpetas (ej. `/src/components/laws/LawNodeCard.tsx`, `/src/components/laws/LawPresetSelector.tsx`, `/src/components/structures/StructureUpgradeCard.tsx`).

### 2. Desconexión de Context y Prop Drilling Innecesario
* **Problema:** En `App.tsx`, las propiedades `selectedFaction` y `themeMode` se pasan manualmente vía props a prácticamente todos los componentes (`<DayByDayPlanner selectedFaction={...} themeMode={...} />`), a pesar de existir un archivo `/src/context/ThemeContext.tsx`.
* **Impacto:** Acopla fuertemente el componente `App.tsx` a las firmas de props de cada hijo y obliga a modificar múltiples capas si se añaden nuevos parámetros globales (como idioma, modo torneo o dificultad).
* **Solución recomendada:** Implementar un **`FactionContext` / `AppContext`** global que provea `{ selectedFaction, setSelectedFaction, theme, themeMode, setThemeMode }` a través de un custom hook `useApp()`.

### 3. Sobrecarga del Bundle por Carga Estática de Datos
* **Problema:** En `factionDataProvider.ts`, se importan estáticamente en la parte superior todos los archivos de datos de las 6 facciones, todas las leyes, todos los hechizos y todas las estructuras.
* **Impacto:** Todo el contenido de texto y matrices de datos de las 6 facciones se empaqueta en el *chunk* JavaScript inicial, aumentando el tiempo de carga y el consumo de memoria inicial del navegador.
* **Solución recomendada:** Utilizar importaciones dinámicas (`React.lazy` / `import()`) o un proveedor de datos asíncrono para cargar bajo demanda únicamente la facción que el usuario está consultando en ese momento.

### 4. Tipado Débil con Fallback Permisivo (`| string`)
* **Problema:** En `src/types.ts`, múltiples enums y tipos unión tienen un comodín al final (`type: 'Combate' | 'Aventura' | ... | string;` o `heroClass: 'Brujo' | 'Adalid' | ... | string;`).
* **Impacto:** Este comodín anula la capacidad del compilador de TypeScript para detectar errores tipográficos o valores obsoletos (como `'Primigenia / Tierra'` frente a `'Primigenia (Primal)'`), degradando la seguridad de tipos (*Type Safety*).
* **Solución recomendada:** Eliminar los comodines `| string` y utilizar exclusivamente uniones estrictas o enums canónicos cerrados.

### 5. Duplicación de Lógica y Patrones UI sin Componentes Atómicos
* **Problema:** Patrones visuales recurrentes (como barras de búsqueda con icono, filtros por chips/pills, badges de coste de recursos [Oro, Madera, Mineral, Gemas], barras de progreso y acordeones colapsables) están implementados con cadenas literales de clases Tailwind duplicadas en 5 componentes distintos.
* **Impacto:** Dificulta la consistencia del diseño. Un cambio en el estilo visual de los badges de recursos requiere modificar 4 o 5 archivos por separado.
* **Solución recomendada:** Crear una capa de componentes UI base reutilizables en `/src/components/ui/`:
  - `ResourceCostBadge.tsx` (muestra costes en Oro, Madera, Mineral, Gemas, etc.)
  - `FilterChipGroup.tsx`
  - `SearchBar.tsx`
  - `AccordionSection.tsx`

---

## 🚀 Plan de Refactorización y Buenas Prácticas Recomendadas

| Fase | Tarea Principal | Beneficio | Prioridad |
| :--- | :--- | :--- | :--- |
| **Fase 1** | **Unificar el Estado Global** creando `src/context/AppContext.tsx` y eliminando el prop-drilling en `App.tsx`. | Código más limpio, desacoplado y fácil de mantener. | 🔴 Alta |
| **Fase 2** | **Descomponer "God Components"**: Modularizar `FactionLawsTree.tsx` y `TownStructuresBrowser.tsx` en subcomponentes de <150 líneas. | Alta legibilidad, testabilidad y menor propensión a errores. | 🔴 Alta |
| **Fase 3** | **Extraer Componentes UI Atómicos** (`ResourceCostBadge`, `FilterPill`, `CardContainer`) en `/src/components/ui/`. | Consistencia de diseño y principio DRY (*Don't Repeat Yourself*). | 🟡 Media |
| **Fase 4** | **Cierre Estricto de Tipos** en `src/types.ts` eliminando los fallbacks permisivos `| string`. | Detección automática de errores en tiempo de compilación. | 🟡 Media |
| **Fase 5** | **Code-Splitting de Datos** para diferir la carga de datos de facciones inactivas mediante lazy loading. | Reducción del tamaño inicial del bundle y mayor velocidad de carga. | 🟢 Baja |

---

*Documento generado y estructurado siguiendo los estándares de arquitectura de software para aplicaciones React + TypeScript modernas.*
