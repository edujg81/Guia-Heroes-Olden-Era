# 🏛️ Architecture Blueprint & Modular Refactoring Guide
## *Heroes of Might and Magic: Olden Era — Compendium Platform*

> **Documento de Diseño Técnico, Guía de Reestructuración y Arquitectura Escalable Data-Driven**
> 
> *Target Stack:* React 19 + TypeScript 5.8 (Strict) + Vite 6 + Tailwind CSS v4 + Motion
> *Architectural Pattern:* Feature-Sliced Modular + Data-Driven Plugin Architecture

---

## 📑 Tabla de Contenidos

1. [Visión y Principios Arquitectónicos](#1-visión-y-principios-arquitectónicos)
2. [Propuesta del Árbol de Directorios Ideal](#2-propuesta-del-árbol-de-directorios-ideal)
3. [Guía de Refactorización Paso a Paso](#3-guía-de-refactorización-paso-a-paso)
   - [Paso 1: Desacoplamiento del Estado Global (App Context & Theme Engine)](#paso-1-desacoplamiento-del-estado-global-app-context--theme-engine)
   - [Paso 2: Creación del Design System Atómico (`/src/components/ui`)](#paso-2-creación-del-design-system-atómico-srccomponentsui)
   - [Paso 3: Descomposición Quirúrgica de los "God Components"](#paso-3-descomposición-quirúrgica-de-los-god-components)
   - [Paso 4: Extracción de Lógica de Negocio a Custom Hooks (`/src/hooks`)](#paso-4-extracción-de-lógica-de-negocio-a-custom-hooks-srchooks)
   - [Paso 5: Tipado Estricto sin Fallbacks (`types/`)](#paso-5-tipado-estricto-sin-fallbacks-types)
4. [Plan de Escalabilidad Data-Driven (Zero-Code-Change Expansion)](#4-plan-de-escalabilidad-data-driven-zero-code-change-expansion)
   - [Esquema de Facción Plug-and-Play](#esquema-de-facción-plug-and-play)
   - [Registro Automático de Facciones mediante `import.meta.glob`](#registro-automático-de-facciones-mediante-importmetaglob)
   - [Añadir una Nueva Facción en 3 Pasos](#añadir-una-nueva-facción-en-3-pasos)
   - [Añadir un Nuevo Héroe o Tropa sin Modificar Código](#añadir-un-nuevo-héroe-o-tropa-sin-modificar-código)
5. [Matriz de Transición: Estado Actual vs. Estado Ideal](#5-matriz-de-transición-estado-actual-vs-estado-ideal)

---

## 1. Visión y Principios Arquitectónicos

Para transformar la base de código actual en una arquitectura mantenible, escalable y de alto rendimiento, aplicaremos los siguientes principios fundamentales:

1. **Separation of Concerns (SoC):** Separación tajante entre la **capa visual de presentación** (dumb components), la **lógica de estado y filtrado** (custom hooks), y la **capa de datos estáticos** (domain models).
2. **Data-Driven Architecture (Zero-Code Additions):** La interfaz de usuario debe actuar como un motor de renderizado universal. Agregar una nueva facción (ej. *Cónclave/Conflux*), héroe, edificio o hechizo se realizará **exclusivamente agregando un archivo de datos**, sin requerir modificaciones en componentes React ni sentencias `switch/case` hardcodeadas.
3. **Strict Type Safety:** Eliminación de comodines permisivos (`| string`), garantizando autocompletado total y validación en tiempo de compilación.
4. **Atomic Component Hierarchy:** Componentes UI reutilizables (<150 líneas) con estilos centralizados.

---

## 2. Propuesta del Árbol de Directorios Ideal

```text
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── ARCHITECTURE.md
│
└── src/
    ├── main.tsx                         # Bootstrap con ErrorBoundary y Providers
    ├── App.tsx                          # Router/Layout shell simplificado (<60 líneas)
    ├── index.css                        # Variables CSS globales y tokens de diseño
    │
    ├── types/                           # Sistema de Tipado Modular Estricto
    │   ├── index.ts                     # Barrel export de tipos
    │   ├── faction.types.ts             # Tipos de facción, colores y temas
    │   ├── planner.types.ts             # Pasos de construcción, checklist de 56 días
    │   ├── structures.types.ts          # Edificios, fortificaciones y moradas
    │   ├── laws.types.ts                # Árbol de leyes, sellos y presets
    │   ├── spells.types.ts              # Grimorio, escuelas de magia y maestrías
    │   ├── units.types.ts               # Matriz de tropas y modos de combate
    │   └── heroes.types.ts              # Héroes, habilidades oficiales y subclases
    │
    ├── context/                         # Estado Global y Proveedores
    │   ├── AppContext.tsx               # Estado activo: facción, tab, filtros globales
    │   ├── ThemeContext.tsx             # Tema dinámico (oscuro/claro, paletas cromáticas)
    │   └── ProgressContext.tsx          # Progreso persistente (días completados, builds)
    │
    ├── hooks/                           # Lógica de Negocio y Estado Reutilizable
    │   ├── useApp.ts                    # Hook de acceso rápido a AppContext
    │   ├── useTheme.ts                  # Hook de acceso a ThemeContext y variables CSS
    │   ├── useStickyState.ts            # Sincronización robusta con localStorage
    │   ├── useFactionData.ts            # Consumo reactivo de datos de la facción activa
    │   ├── useDayPlanner.ts             # Lógica de checklist, filtros de día y oponentes
    │   ├── useLawsTree.ts               # Lógica de asignación de Puntos de Ley y presets
    │   ├── useSpellFilter.ts            # Filtrado por escuela, tier y coste de maná
    │   └── useStructureCosts.ts         # Cálculo y agregación de recursos requeridos
    │
    ├── components/
    │   ├── layout/                      # Estructura del Shell
    │   │   ├── Header.tsx               # Barra superior, selector de facción y tema
    │   │   ├── TabNavigation.tsx        # Selector de pestañas principales
    │   │   └── FactionHeroBanner.tsx    # Banner visual dinámico según facción activa
    │   │
    │   ├── ui/                          # Design System Atómico Reutilizable
    │   │   ├── ResourceBadge.tsx        # Indicador de Oro, Madera, Mineral, Gemas
    │   │   ├── SearchBar.tsx            # Input de búsqueda con debouncing e icono
    │   │   ├── FilterChipGroup.tsx      # Selector de filtros por píldoras/chips
    │   │   ├── StatProgressBar.tsx      # Barra de progreso visual animada
    │   │   ├── Accordion.tsx            # Contenedor colapsable animado con Motion
    │   │   ├── ModalDialog.tsx          # Modal flotante con backdrop y focus trap
    │   │   ├── TierBadge.tsx            # Badge distintivo de Tier (T1 a T7, S+, S, A)
    │   │   └── SectionContainer.tsx     # Card envolvente estándar con bordes temáticos
    │   │
    │   └── features/                    # Módulos Funcionales (Descompuestos)
    │       ├── planner/                 # Planificador Día a Día (56 Días)
    │       │   ├── DayByDayPlanner.tsx  # Vista principal (<120 líneas)
    │       │   ├── DayCard.tsx          # Tarjeta individual de día con checklist
    │       │   ├── DayFilterBar.tsx     # Filtro por semana (S1 a S8) y modo oponente
    │       │   └── OpponentTactics.tsx  # Panel reactivo IA vs Humano
    │       │
    │       ├── structures/              # Árbol de Ciudad y Moradas
    │       │   ├── TownStructures.tsx   # Vista principal (<120 líneas)
    │       │   ├── CivicPalaceView.tsx  # Palacio Cívico (Nivel I, II, III)
    │       │   ├── FortificationsView.tsx # Fortificaciones (Nivel I, II, III)
    │       │   ├── DwellingCard.tsx     # Morada de criaturas con evoluciones dobles
    │       │   └── StructureCostSummary.tsx # Resumen acumulativo de recursos
    │       │
    │       ├── laws/                    # Leyes de Facción
    │       │   ├── FactionLawsTree.tsx  # Vista principal (<150 líneas)
    │       │   ├── LawTierColumn.tsx    # Columna interactiva por Tier (1 a 4)
    │       │   ├── LawNodeCard.tsx      # Tarjeta interactiva de ley y sellos
    │       │   └── LawPresetSelector.tsx# Carga y guardado de presets de build
    │       │
    │       ├── spells/                  # Grimorio de Hechizos
    │       │   ├── SpellGrimoire.tsx    # Vista principal (<120 líneas)
    │       │   ├── SchoolFilterTabs.tsx # Selector de escuela mágica
    │       │   └── SpellCard.tsx        # Ficha de hechizo con 4 rangos de maestría
    │       │
    │       ├── units/                   # Matriz de Tropas
    │       │   ├── UnitMatrix.tsx       # Grid comparativo de criaturas
    │       │   └── UnitDetailModal.tsx  # Ficha técnica con stats y modos duales
    │       │
    │       ├── combat/                  # Tácticas de Combate
    │       │   ├── CombatTactics.tsx    # Guía táctica por match-up
    │       │   └── MatchupAdvice.tsx    # Consejos específicos contra facciones rivales
    │       │
    │       └── heroes/                  # Desarrollo de Héroes
    │           ├── HeroHub.tsx          # Sub-navegador de héroes y habilidades
    │           ├── HeroRoster.tsx       # Catálogo de comandantes destacados
    │           ├── HeroDetailCard.tsx   # Ficha de héroe, rol y build recomendada
    │           ├── SkillTreeBrowser.tsx # 10 árboles oficiales de habilidades
    │           └── SubclassesMatrix.tsx # Clases de prestigio y especializaciones
    │
    └── data/                            # Capa de Datos Desacoplada (Data-Driven)
        ├── registry.ts                  # Registro dinámico e indexador de facciones
        │
        ├── shared/                      # Datos transversales del juego
        │   ├── officialSkills.json      # 10 árboles de habilidades oficiales
        │   ├── subclasses.json          # Especializaciones de prestigio
        │   ├── subskillsSuggestions.json # Recomendaciones tácticas
        │   └── spells/                  # Catálogo de hechizos universal
        │       ├── arcane.json
        │       ├── daylight.json
        │       ├── nightshade.json
        │       ├── primal.json
        │       └── neutral.json
        │
        └── factions/                    # Módulos de Facción 100% Autónomos
            ├── dungeon/                 # 🟣 Mazmorra (Dungeon)
            │   ├── meta.json            # Identidad, paleta, icono, descripción
            │   ├── buildPlan.json       # Plan de 56 días y tácticas de oponente
            │   ├── structures.json      # Cámara del Consejo, Fortificaciones, Moradas
            │   ├── laws.json            # Árbol de leyes y presets canónicos
            │   ├── units.json           # Tropas Tier 1 a 7 con ramas dobles
            │   ├── heroes.json          # Comandantes y especialidades
            │   └── tactics.json         # Matchups tácticos contra rivales
            │
            ├── temple/                  # 🟡 Templo (Temple)
            │   └── [meta, buildPlan, structures, laws, units, heroes, tactics].json
            ├── grove/                   # 🟢 Arboleda (Grove)
            │   └── [meta, buildPlan, structures, laws, units, heroes, tactics].json
            ├── necropolis/              # ⚪ Necrópolis (Necropolis)
            │   └── [meta, buildPlan, structures, laws, units, heroes, tactics].json
            ├── hive/                    # 🟠 Enjambre (Hive)
            │   └── [meta, buildPlan, structures, laws, units, heroes, tactics].json
            └── schism/                  # 🔵 Cisma (Schism)
                └── [meta, buildPlan, structures, laws, units, heroes, tactics].json
```

---

## 3. Guía de Refactorización Paso a Paso

### Paso 1: Desacoplamiento del Estado Global (App Context & Theme Engine)

**Objetivo:** Eliminar el prop-drilling en `App.tsx` y centralizar la gestión de estado.

1. Crear `/src/context/AppContext.tsx`:
```tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { FactionId, ActiveTab, ThemeMode } from '../types';
import { useStickyState } from '../hooks/useStickyState';
import { getFactionMeta } from '../data/registry';

interface AppContextType {
  selectedFaction: FactionId;
  setSelectedFaction: (faction: FactionId) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  factionTheme: ReturnType<typeof getFactionMeta>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedFaction, setSelectedFaction] = useStickyState<FactionId>('dungeon', 'homm_oe_faction');
  const [activeTab, setActiveTab] = useStickyState<ActiveTab>('planner', 'homm_oe_tab');
  const [themeMode, setThemeMode] = useStickyState<ThemeMode>('dark', 'homm_oe_theme_mode');

  const toggleThemeMode = () => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  const factionTheme = useMemo(() => getFactionMeta(selectedFaction), [selectedFaction]);

  return (
    <AppContext.Provider value={{
      selectedFaction, setSelectedFaction,
      activeTab, setActiveTab,
      themeMode, setThemeMode, toggleThemeMode,
      factionTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp debe utilizarse dentro de un AppProvider');
  return context;
};
```

2. Simplificar `App.tsx` a un Shell limpio:
```tsx
export default function App() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 pb-20">
        <div className={activeTab === 'planner' ? 'block' : 'hidden'}><DayByDayPlanner /></div>
        <div className={activeTab === 'structures' ? 'block' : 'hidden'}><TownStructures /></div>
        <div className={activeTab === 'laws' ? 'block' : 'hidden'}><FactionLawsTree /></div>
        <div className={activeTab === 'spells' ? 'block' : 'hidden'}><SpellGrimoire /></div>
        <div className={activeTab === 'units' ? 'block' : 'hidden'}><UnitMatrix /></div>
        <div className={activeTab === 'combat' ? 'block' : 'hidden'}><CombatTactics /></div>
        <div className={activeTab === 'heroes' ? 'block' : 'hidden'}><HeroHub /></div>
      </main>
    </div>
  );
}
```

---

### Paso 2: Creación del Design System Atómico (`/src/components/ui`)

Crear componentes visuales reutilizables para unificar el estilo y eliminar cientos de líneas duplicadas:

* **`ResourceBadge.tsx`**: Renderiza iconos normalizados y cantidades de Oro, Madera, Mineral, Azufre, Mercurio, Gemas y Cristal.
* **`TierBadge.tsx`**: Formatea visualmente los niveles (Tier 1 a 7, Tier S+, S, A) con colores contrastados.
* **`SearchBar.tsx`**: Input estandarizado con botón de limpieza y debounce integrado.
* **`FilterChipGroup.tsx`**: Botones tipo píldora para seleccionar filtros simples o múltiples.

---

### Paso 3: Descomposición Quirúrgica de los "God Components"

#### Ejemplo: Descomposición de `TownStructuresBrowser.tsx` (de 810 líneas a 4 módulos)

1. **`TownStructures.tsx` (Contenedor Principal, ~90 líneas):** Maneja la barra de búsqueda, selector de categorías (Todas, Cívica, Fortificaciones, Moradas) y el renderizado condicional.
2. **`CivicPalaceView.tsx` (~80 líneas):** Renderiza la progresión de 3 niveles del Centro Cívico con sus ingresos en Oro, Puntos de Ley y Astrología.
3. **`FortificationsView.tsx` (~80 líneas):** Renderiza los 3 niveles de Fortificaciones con sus bonos de muralla, torres defensivas y multiplicadores de crecimiento de tropas (+50%, +100%).
4. **`DwellingCard.tsx` (~110 líneas):** Renderiza cada morada de criatura de Tier 1 a 7, mostrando los dos caminos de mejora alternativos (Upgrade A / Upgrade B) con sus respectivos costes y estadísticas comparadas.

---

### Paso 4: Extracción de Lógica de Negocio a Custom Hooks (`/src/hooks`)

Mover los cálculos, persistencia y filtros fuera de los componentes React:

* **`useDayPlanner.ts`:**
  - Controla la semana seleccionada (Semana 1 a 8).
  - Almacena el checklist de tareas completadas en `localStorage`.
  - Conmuta entre tácticas contra IA y tácticas contra Jugador Humano.
* **`useLawsTree.ts`:**
  - Gestiona los Puntos de Ley gastados.
  - Valida prerrequisitos de Tier anterior antes de permitir la activación de una ley.
  - Carga y aplica presets estratégicos ("Expansión Rápida", "Boom Económico", "Late Game").

---

### Paso 5: Tipado Estricto sin Fallbacks (`types/`)

Reemplazar uniones permisivas por uniones discriminadas estrictas en `/src/types/`:

```typescript
// ❌ Antes (permisivo e inseguro)
export type MagicSchool = 'Nochesombra (Nightshade)' | 'Arcana' | 'Luz (Light)' | string;

// ✅ Ahora (estricto y canónico)
export type FactionId = 'dungeon' | 'temple' | 'grove' | 'necropolis' | 'hive' | 'schism';

export type MagicSchool = 
  | 'nightshade'
  | 'daylight'
  | 'arcane'
  | 'primal'
  | 'neutral';

export type HeroRole = 
  | 'starter_day1'
  | 'main_magic'
  | 'main_might'
  | 'scout_logistics'
  | 'anti_mage';

export type TierRank = 'S+' | 'S' | 'A' | 'B' | 'Secondary';
```

---

## 4. Plan de Escalabilidad Data-Driven (Zero-Code-Change Expansion)

La clave para que la aplicación escale sin fricciones es el **Patrón Registro + Dynamic Data Ingestion**.

### Esquema de Facción Plug-and-Play

Cada facción se aloja en su propia carpeta en `/src/data/factions/{factionId}/` con 6 archivos JSON estandarizados:

```text
/src/data/factions/dungeon/
  ├── meta.json         # ID, Nombre, Lore, Paleta de Colores Tailwind, Icono
  ├── buildPlan.json    # Array de los 56 días estructurados con tareas y objetivos
  ├── structures.json   # Palacio Cívico (3 niv), Fortificaciones (3 niv), Moradas T1-T7
  ├── laws.json         # Árbol de Leyes (T1 a T4), Sellos de Facción y Presets
  ├── units.json        # 7 Criaturas con estadísticas base y dos ramas de evolución
  ├── heroes.json       # Lista de Héroes con roles, builds recomendadas y tier
  └── tactics.json      # Consejos de combate y sinergias contra otras facciones
```

### Registro Automático de Facciones mediante `import.meta.glob`

En `/src/data/registry.ts`, Vite importa automáticamente cualquier facción presente en la carpeta sin requerir imports manuales:

```typescript
// /src/data/registry.ts
import { FactionData, FactionMeta } from '../types';

// Carga automática de metadatos de todas las facciones
const metaModules = import.meta.glob<FactionMeta>('./factions/*/meta.json', { eager: true, import: 'default' });

export const FACTION_REGISTRY: Record<string, FactionMeta> = {};

Object.entries(metaModules).forEach(([path, meta]) => {
  const factionId = path.split('/')[2];
  FACTION_REGISTRY[factionId] = meta;
});

export const getAllFactions = (): FactionMeta[] => Object.values(FACTION_REGISTRY);

export const getFactionMeta = (id: string): FactionMeta => {
  const meta = FACTION_REGISTRY[id];
  if (!meta) throw new Error(`Facción no encontrada en el registro: ${id}`);
  return meta;
};

// Carga perezosa (Lazy Loading) de los datos pesados de la facción activa
export const loadFactionData = async (factionId: string): Promise<FactionData> => {
  const [buildPlan, structures, laws, units, heroes, tactics] = await Promise.all([
    import(`./factions/${factionId}/buildPlan.json`),
    import(`./factions/${factionId}/structures.json`),
    import(`./factions/${factionId}/laws.json`),
    import(`./factions/${factionId}/units.json`),
    import(`./factions/${factionId}/heroes.json`),
    import(`./factions/${factionId}/tactics.json`),
  ]);

  return {
    meta: getFactionMeta(factionId),
    buildPlan: buildPlan.default,
    structures: structures.default,
    laws: laws.default,
    units: units.default,
    heroes: heroes.default,
    tactics: tactics.default,
  };
};
```

---

### Añadir una Nueva Facción en 3 Pasos (Zero Code Touched)

Cuando el juego *Heroes of Might and Magic: Olden Era* lance una nueva facción (por ejemplo, **Cónclave Elemental / Conflux**):

1. **Paso 1:** Crear el directorio `/src/data/factions/conflux/`.
2. **Paso 2:** Añadir los archivos `meta.json`, `buildPlan.json`, `structures.json`, `laws.json`, `units.json`, `heroes.json` y `tactics.json`.
3. **Paso 3:** ¡Listo! El selector de facciones en el `Header`, las paletas de colores, las 7 pestañas de contenido y el árbol de leyes renderizarán la nueva facción inmediatamente de forma automática y con persistencia en `localStorage`.

---

### Añadir un Nuevo Héroe o Tropa sin Modificar Código

* **Para un nuevo héroe:** Abrir `/src/data/factions/{factionId}/heroes.json` e insertar un nuevo objeto en el array:
```json
{
  "id": "dungeon-malakor",
  "name": "Malakor",
  "title": "El Señor del Vacío",
  "heroClass": "Brujo (Warlock)",
  "heroType": "Mago",
  "role": "Principal Mágico",
  "tierRank": "S+",
  "specialty": "Vórtice de Sombras",
  "specialtyDescription": "Aumenta el daño de hechizos de Nochesombra en +5% por nivel.",
  "recommendedSkills": ["Magia de Sombras", "Astrología", "Lógica", "Ataque"],
  "signatureTroopTier": 7
}
```
* El componente `HeroRoster.tsx` y los filtros de búsqueda lo detectarán y renderizarán instantáneamente con soporte de badges, animaciones y búsqueda en tiempo real.

---

## 5. Matriz de Transición: Estado Actual vs. Estado Ideal

| Dimensión | Estado Actual (Monolítico) | Estado Ideal (Modular Data-Driven) |
| :--- | :--- | :--- |
| **Tamaño de Componentes** | 4 componentes gigantes de 600–1.640 líneas. | Componentes atómicos especializados de 50–140 líneas. |
| **Paso de Parámetros** | Prop-drilling de `selectedFaction` y `themeMode` en cada nivel. | `useApp()` y `useTheme()` mediante Context API centralizada. |
| **Extensibilidad de Facciones** | Requiere modificar `types.ts`, `factionDataProvider.ts`, `App.tsx` y crear nuevos `.ts`. | Agregar una carpeta con archivos `.json` en `/src/data/factions/`. |
| **Rendimiento del Bundle** | Carga estática síncrona de las 6 facciones en el inicio. | Carga asíncrona segmentada (*Code-Splitting* con `React.lazy`). |
| **Tipado TypeScript** | Uniones híbridas permisivas (`... \| string`). | Uniones discriminadas estrictas sin comodines. |
| **Reutilización UI** | Cadenas literales de Tailwind duplicadas en múltiples vistas. | Design System en `/src/components/ui/` (`ResourceBadge`, `TierBadge`, etc.). |

---

*Arquitectura diseñada para garantizar máxima mantenibilidad, rendimiento óptimo y escalabilidad a largo plazo.*
