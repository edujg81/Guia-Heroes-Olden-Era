# 🏛️ Architecture Blueprint & Modular Refactoring Guide
## *Heroes of Might and Magic: Olden Era — Compendium Platform*

> **Documento de Diseño Técnico, Guía de Reestructuración y Arquitectura Escalable Data-Driven**
> 
> *Target Stack:* React 19 + TypeScript 5.8 (Strict) + Vite 6 + Tailwind CSS v4 + Motion
> *Architectural Pattern:* Feature-Sliced Modular + Data-Driven Plugin Architecture

---

## 📑 Tabla de Contenidos

1. [Visión y Principios Arquitectónicos](#1-visión-y-principios-arquitectónicos)
2. [Estructura Actual del Árbol de Directorios](#2-estructura-actual-del-árbol-de-directorios)
3. [Implementación de la Capa de Estado y Design System](#3-implementación-de-la-capa-de-estado-y-design-system)
   - [Estado Global Unificado (`/src/context/AppContext.tsx`)](#estado-global-unificado-srccontextappcontexttsx)
   - [Design System Atómico (`/src/components/ui/`)](#design-system-atómico-srccomponentsui)
   - [Plantilla Genérica Universal (`GenericGuideTemplate.tsx`)](#plantilla-genérica-universal-genericguidetemplatetsx)
4. [Estrategia de Escalabilidad Data-Driven (Zero-Code Additions)](#4-estrategia-de-escalabilidad-data-driven-zero-code-additions)
   - [Registro y Carga Dinámica de Héroes (`heroesData.ts` & `heroesRegistry.ts`)](#registro-y-carga-dinámica-de-héroes-heroesdatats--heroesregistryts)
   - [Protocolo para Añadir un Nuevo Héroe](#protocolo-para-añadir-un-nuevo-héroe)
   - [Protocolo para Añadir una Nueva Facción](#protocolo-para-añadir-una-nueva-facción)
5. [Matriz de Estado y Verificación Técnica](#5-matriz-de-estado-y-verificación-técnica)

---

## 1. Visión y Principios Arquitectónicos

1. **Separation of Concerns (SoC):** Desacoplamiento estricto entre la presentación visual (componentes de interfaz), la lógica de estado y persistencia (hooks y contexts), y el modelo de datos (archivos de dominio).
2. **Data-Driven Dynamic Ingestion:** La interfaz de usuario opera como un motor de renderizado universal. Cada sección (Héroes, Unidades, Estructuras, Leyes, Hechizos) renderiza dinámicamente según la facción activa seleccionada.
3. **Strict Type Safety:** Contratos tipados con TypeScript en `src/types.ts` y `src/types/index.ts`, garantizando validación y autocompletado en tiempo de compilación.
4. **Reutilización y Consistencia Visual:** Eliminación de clases duplicadas mediante componentes atómicos (`ResourceBadge`, `TierBadge`, `SearchBar`, `FilterChipGroup`).

---

## 2. Estructura Actual del Árbol de Directorios

```text
src/
├── main.tsx                         # Bootstrap de React DOM
├── App.tsx                          # Shell principal con persistencia de vistas
├── index.css                        # Estilos globales y variables de tema Tailwind v4
├── types.ts                         # Tipos de dominio para todo el compendio
│
├── types/                           # Sistema modular de tipado
│   └── index.ts                     # Barrel export de tipos
│
├── context/                         # Capa de Estado Global
│   ├── AppContext.tsx               # Contexto centralizado (facción, tab, tema)
│   ├── ThemeContext.tsx             # Contexto de compatibilidad
│   └── index.ts                     # Barrel export de contextos
│
├── hooks/                           # Hooks y Utilidades
│   ├── useStickyState.ts            # Persistencia reactiva en localStorage
│   └── index.ts                     # Barrel export de hooks (useApp, useStickyState)
│
├── components/
│   ├── layout/                      # Estructura del Shell
│   │   ├── Header.tsx               # Barra superior con selector de facciones
│   │   └── index.ts                 # Barrel export de layout
│   │
│   ├── ui/                          # Design System Atómico
│   │   ├── GenericGuideTemplate.tsx # Plantilla genérica para guías
│   │   ├── ResourceBadge.tsx        # Formateador visual de recursos
│   │   ├── TierBadge.tsx            # Badge para niveles y rangos
│   │   ├── SearchBar.tsx            # Input de búsqueda con debouncing
│   │   ├── FilterChipGroup.tsx      # Grupo de chips de filtrado
│   │   └── index.ts                 # Barrel export de componentes UI
│   │
│   ├── features/                    # Módulos Funcionales
│   │   └── heroes/                  # Gestión de Héroes
│   │       ├── HeroGuideCard.tsx    # Tarjeta visual de héroe
│   │       ├── HeroDetailModal.tsx  # Modal de inspección profunda
│   │       ├── HeroGuideView.tsx    # Vista completa conectada a datos
│   │       └── index.ts             # Barrel export del feature de héroes
│   │
│   ├── DayByDayPlanner.tsx          # Planificador 56 días
│   ├── TownStructuresBrowser.tsx    # Edificios de ciudad y moradas
│   ├── FactionLawsTree.tsx          # Árbol de leyes de facción
│   ├── SpellGrimoire.tsx            # Grimorio de hechizos
│   ├── UnitMatrix.tsx               # Matriz de criaturas
│   ├── CombatTactics.tsx            # Tácticas de combate
│   ├── HeroSkillOptimizer.tsx       # Sub-navegador de héroes y habilidades
│   ├── RecommendedHeroes.tsx        # Recomendaciones de comandantes
│   ├── OfficialSkillsBrowser.tsx    # 10 árboles oficiales de habilidades
│   └── SubclassesBrowser.tsx        # Subclases de prestigio
│
└── data/                            # Capa de Datos Desacoplada
    ├── factionDataProvider.ts       # Proveedor centralizador y selector reactivo
    ├── heroesData.ts                # Catálogo unificado de héroes
    ├── dungeonData.ts               # Mazmorra (Dungeon)
    ├── templeData.ts                # Templo (Temple)
    ├── arboledaData.ts              # Arboleda (Grove)
    ├── necropolisData.ts            # Necrópolis (Necropolis)
    ├── enjambreData.ts              # Enjambre (Hive)
    ├── cismaData.ts                 # Cisma (Schism)
    │
    ├── factions/                    # Módulos específicos por facción
    │   ├── heroesRegistry.ts        # Registro extensible en runtime
    │   ├── dungeon/heroes.ts        # Héroes de Mazmorra
    │   ├── temple/heroes.ts         # Héroes de Templo
    │   ├── grove/heroes.ts          # Héroes de Arboleda
    │   ├── necropolis/heroes.ts     # Héroes de Necrópolis
    │   ├── hive/heroes.ts           # Héroes de Enjambre
    │   └── schism/heroes.ts         # Héroes de Cisma
    │
    ├── structures/                  # Edificios por facción
    └── spells/                      # Hechizos por escuela de magia
```

---

## 3. Implementación de la Capa de Estado y Design System

### Estado Global Unificado (`/src/context/AppContext.tsx`)

Centraliza el estado de la aplicación, evitando prop-drilling:

```tsx
import { useApp } from '../hooks';

export function MyComponent() {
  const { selectedFaction, setSelectedFaction, themeMode, theme } = useApp();
  // ...
}
```

### Design System Atómico (`/src/components/ui/`)

* **`ResourceBadge`**: Normaliza visualmente los costes y ganancias de recursos con iconos y colores temáticos.
* **`TierBadge`**: Formatea rangos de tropas (Tier 1 a 7) y héroes (Tier S+, S, A) con alto contraste.
* **`SearchBar`**: Campo de búsqueda reactivo con icono de lupa y botón de limpieza inmediata.
* **`FilterChipGroup`**: Botones de selección de filtros con conteo de elementos y soporte de iconos.

### Plantilla Genérica Universal (`GenericGuideTemplate.tsx`)

Proporciona la estructura visual estándar para todas las guías del compendio:
1. **Banner dinámico**: Inyecta el nombre, región y paleta de la facción activa.
2. **Slot `filterBar`**: Espacio estandarizado para búsqueda y filtros.
3. **Slot `children`**: Contenido principal (grid de tarjetas, árboles, tablas).
4. **Slot `footerNotes`**: Consejos estratégicos y estadísticas de la sección.

---

## 4. Estrategia de Escalabilidad Data-Driven (Zero-Code Additions)

### Registro y Carga Dinámica de Héroes (`heroesData.ts` & `heroesRegistry.ts`)

Los datos de los héroes están desacoplados de la lógica de interfaz. La función `getHeroesByFactionKey(selectedFaction)` obtiene de inmediato el dataset correspondiente para alimentar componentes genéricos como `HeroGuideView`.

### Protocolo para Añadir un Nuevo Héroe

Para añadir un nuevo comandante a una facción:

1. Abrir el archivo correspondiente en `/src/data/factions/{faction}/heroes.ts` (o el dataset principal en `src/data/`).
2. Insertar el objeto con la estructura `DungeonHero`:

```typescript
{
  id: 'hero-malakor',
  name: 'Malakor',
  title: 'El Invocador del Vacío',
  heroClass: 'Brujo',
  heroType: 'Mago',
  role: 'Principal Mágico',
  tierRank: 'Tier S+ (Meta)',
  specialtyName: 'Convocación del Vacío',
  specialtyEffect: '+20% de efectividad en conjuros de invocación.',
  initialSkills: ['Taumaturgia básica', 'Magia primigenia básica'],
  initialArmy: 'Troglodita 20, Infiltrador 8',
  recommendedStartingTier: 'Especialista en control de campo de batalla.',
  statGrowth: { attack: 15, defense: 20, spellPower: 45, knowledge: 20 },
  tacticalPlaystyle: 'Lanza invocaciones en el primer turno para absorber represalias.',
  idealSkillBuild: ['Taumaturgia (Experta)', 'Sabiduría (Experta)'],
  synergyCombo: 'Sinergia con Dragones Negros.'
}
```

3. El sistema lo renderizará inmediatamente en las vistas de héroes, filtros y modales sin necesidad de modificar componentes React.

### Protocolo para Añadir una Nueva Facción

1. Añadir el identificador en `FactionId` (`src/data/factionDataProvider.ts`).
2. Configurar la paleta de colores y metadatos en `FACTION_THEMES` y `FACTIONS_METADATA`.
3. Crear el archivo de datos correspondiente en `/src/data/` o `/src/data/factions/{faction}/`.
4. El selector del `Header` y todas las vistas del compendio renderizarán la nueva facción de forma automática.

---

## 5. Matriz de Estado y Verificación Técnica

| Requisito Arquitectónico | Estado | Módulo Responsable |
| :--- | :--- | :--- |
| **Separación de Datos de Héroes** | ✅ Implementado | `/src/data/heroesData.ts` & `/src/data/factions/` |
| **Design System Atómico** | ✅ Implementado | `/src/components/ui/` |
| **Plantilla Genérica de Guías** | ✅ Implementado | `/src/components/ui/GenericGuideTemplate.tsx` |
| **Estado Global Centralizado** | ✅ Implementado | `/src/context/AppContext.tsx` |
| **Verificación de Tipos Estricta** | ✅ Verificado (0 errors) | `tsc --noEmit` |
| **Compilación de Producción** | ✅ Verificado | `vite build` |

---

*Documento sincronizado y validado según los estándares de ingeniería de software para aplicaciones React + TypeScript modernas.*
