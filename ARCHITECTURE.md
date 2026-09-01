# 🏛️ Architecture Blueprint & Modular Refactoring Guide
## *Heroes of Might and Magic: Olden Era — Compendium Platform*

> **Documento de Diseño Técnico, Guía de Reestructuración y Arquitectura Escalable Data-Driven**
> 
> *Target Stack:* React 19 + TypeScript 5.8 (Strict) + Vite 6 + Tailwind CSS v4 + Motion
> *Architectural Pattern:* Feature-Sliced Modular + Data-Driven Plugin Architecture

---

## 📑 Tabla de Contenidos

1. [Visión y Principios Arquitectónicos](#1-visión-y-principios-arquitectónicos)
2. [Estructura del Árbol de Directorios](#2-estructura-del-árbol-de-directorios)
3. [Implementación de la Capa de Estado y Design System](#3-implementación-de-la-capa-de-estado-y-design-system)
   - [Estado Global Unificado (`/src/context/AppContext.tsx`)](#estado-global-unificado-srccontextappcontexttsx)
   - [Design System Atómico (`/src/components/ui/`)](#design-system-atómico-srccomponentsui)
   - [Plantilla Genérica Universal (`GenericGuideTemplate.tsx`)](#plantilla-genérica-universal-genericguidetemplatetsx)
4. [Modelos de Dominio y Contratos TypeScript](#4-modelos-de-dominio-y-contratos-typescript)
5. [Estrategia de Escalabilidad Data-Driven (Zero-Code Additions)](#5-estrategia-de-escalabilidad-data-driven-zero-code-additions)
   - [Protocolo para Añadir o Modificar un Héroe](#protocolo-para-añadir-o-modificar-un-héroe)
   - [Protocolo para Añadir o Modificar un Hechizo](#protocolo-para-añadir-o-modificar-un-hechizo)
   - [Protocolo para Añadir una Nueva Facción](#protocolo-para-añadir-una-nueva-facción)
6. [Matriz de Estado y Verificación Técnica](#6-matriz-de-estado-y-verificación-técnica)

---

## 1. Visión y Principios Arquitectónicos

1. **Separation of Concerns (SoC):** Desacoplamiento estricto entre la presentación visual (componentes de interfaz en `/src/components/`), la lógica de estado y persistencia (`/src/context/` y `/src/hooks/`), y el modelo de datos (archivos en `/src/data/`).
2. **Data-Driven Dynamic Ingestion:** La interfaz de usuario opera como un motor de renderizado universal. Cada módulo (Héroes, Unidades, Estructuras, Leyes, Hechizos, Tácticas) renderiza dinámicamente según la facción activa seleccionada sin lógica hardcodeada.
3. **Strict Type Safety:** Contratos tipados con TypeScript 5.8 en `src/types.ts` y `src/types/index.ts`, garantizando validación estricta y autocompletado en tiempo de compilación.
4. **Reutilización y Consistencia Visual:** Eliminación de clases duplicadas mediante componentes atómicos (`ResourceBadge`, `TierBadge`, `SearchBar`, `FilterChipGroup`).
5. **Fidelidad Canónica con Jadame:** Todos los datos de unidades, comandantes, habilidades y hechizos se ajustan exclusivamente al lore y las mecánicas oficiales de *Heroes of Might and Magic: Olden Era*.

---

## 2. Estructura del Árbol de Directorios

```text
src/
├── main.tsx                         # Bootstrap de React DOM
├── App.tsx                          # Shell principal con persistencia y keep-alive de vistas
├── index.css                        # Estilos globales y variables de tema dinámico Tailwind v4
├── types.ts                         # Tipos de dominio para todo el compendio
│
├── types/                           # Sistema modular de tipado
│   └── index.ts                     # Barrel export de tipos
│
├── context/                         # Capa de Estado Global
│   ├── AppContext.tsx               # Contexto centralizado (facción, tab, tema, paleta de color)
│   ├── ThemeContext.tsx             # Contexto de compatibilidad
│   └── index.ts                     # Barrel export de contextos
│
├── hooks/                           # Hooks y Utilidades
│   ├── useStickyState.ts            # Persistencia reactiva en localStorage
│   └── index.ts                     # Barrel export de hooks (useApp, useStickyState)
│
├── components/
│   ├── layout/                      # Estructura del Shell
│   │   ├── Header.tsx               # Barra superior con selector de facciones y switch de tema
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
│   ├── SpellGrimoire.tsx            # Grimorio de hechizos (5 escuelas de magia)
│   ├── UnitMatrix.tsx               # Matriz de criaturas y evoluciones alternativas
│   ├── CombatTactics.tsx            # Tácticas de combate y enfrentamientos
│   ├── HeroSkillOptimizer.tsx       # Sub-navegador de héroes y habilidades
│   ├── RecommendedHeroes.tsx        # Recomendaciones de comandantes
│   ├── OfficialSkillsBrowser.tsx    # 10 árboles oficiales de habilidades
│   └── SubclassesBrowser.tsx        # Subclases de prestigio
│
└── data/                            # Capa de Datos Desacoplada
    ├── factionDataProvider.ts       # Proveedor centralizador y selector reactivo
    ├── heroesData.ts                # Catálogo unificado de héroes
    ├── factionSpellData.ts          # Prioridades de magia y combos por facción
    ├── officialSkillsData.ts        # Árboles oficiales de habilidades
    ├── subclassesData.ts            # Matriz de subclases de Jadame
    ├── dungeonData.ts               # Mazmorra (Dungeon)
    ├── templeData.ts                # Templo (Temple)
    ├── arboledaData.ts              # Foresta / Arboleda (Sylvan)
    ├── necropolisData.ts            # Necrópolis (Necropolis)
    ├── enjambreData.ts              # Colmena / Enjambre (Hive)
    ├── cismaData.ts                 # Cisma (Schism)
    │
    ├── factions/                    # Módulos específicos por facción
    │   ├── heroesRegistry.ts        # Registro extensible en runtime
    │   ├── dungeon/heroes.ts        # Héroes de Mazmorra
    │   ├── temple/heroes.ts         # Héroes de Templo
    │   ├── grove/heroes.ts          # Héroes de Foresta
    │   ├── necropolis/heroes.ts     # Héroes de Necrópolis
    │   ├── hive/heroes.ts           # Héroes de Colmena
    │   └── schism/heroes.ts         # Héroes de Cisma
    │
    ├── structures/                  # Edificios por facción
    └── spells/                      # Hechizos por escuela de magia
```

---

## 3. Implementación de la Capa de Estado y Design System

### Estado Global Unificado (`/src/context/AppContext.tsx`)

Centraliza el estado de la aplicación, evitando prop-drilling y actualizando reactivamente las variables CSS de tema en `:root`:

```tsx
import { useApp } from '../hooks';

export function MyComponent() {
  const { selectedFaction, setSelectedFaction, themeMode, theme } = useApp();
  // ...
}
```

### Design System Atómico (`/src/components/ui/`)

* **`ResourceBadge`**: Normaliza visualmente los costes y ganancias de recursos (🪙 Oro, 🪵 Madera, ⛏️ Mineral, 💧 Mercurio, 💎 Gemas, 🔮 Cristal, ✨ Maná, 📜 Puntos de Ley).
* **`TierBadge`**: Formatea rangos de tropas (Tier 1 a 7) y héroes (Tier S+, S, A) con contraste accesible (WCAG AA).
* **`SearchBar`**: Campo de búsqueda reactivo con icono de lupa y botón de limpieza inmediata.
* **`FilterChipGroup`**: Botones de selección de filtros por categorías con conteo de elementos y soporte de iconos.

### Plantilla Genérica Universal (`GenericGuideTemplate.tsx`)

Proporciona la estructura visual estándar para todas las guías del compendio:
1. **Banner dinámico**: Inyecta el nombre, región y paleta de la facción activa.
2. **Slot `filterBar`**: Espacio estandarizado para búsqueda y filtros.
3. **Slot `children`**: Contenido principal (grid de tarjetas, árboles, tablas).
4. **Slot `footerNotes`**: Consejos estratégicos y estadísticas de la sección.

---

## 4. Modelos de Dominio y Contratos TypeScript

El sistema de tipos en `src/types.ts` garantiza la integridad de todos los datasets:

* **`DungeonHero`**: Comandante con nombre canónico, clase, tipo (Might / Magic), tier competitivo, especialidad con escalado por nivel, habilidades iniciales, ejército de salida, build recomendada y combo de sinergia.
* **`UnitInfo`**: Criatura de Tier 1-7 con sus 2 variantes de evolución alternativa, estadísticas de combate (ataque, defensa, daño, salud, velocidad, iniciativa) y pasivas especiales.
* **`BuildStep`**: Paso del planificador de 56 días con día, semana, estructura a construir, coste exacto de recursos, ruta de exploración y objetivo militar.
* **`FactionLaw`**: Ley cívica con sello, efectos pasivos, prerrequisitos y modificadores.
* **`SpellData` / `SpellLevel`**: Hechizo con escuela mágica, tier (1-5), coste de maná, coste de astrología, fórmula de compra en Observatorio y desglose de progresión Nivel 1 a Nivel 4 (Magistral).

---

## 5. Estrategia de Escalabilidad Data-Driven (Zero-Code Additions)

### Protocolo para Añadir o Modificar un Héroe

1. Localizar el fichero correspondiente en `/src/data/factions/{faction}/heroes.ts` o el dataset principal en `src/data/`.
2. Añadir la entrada respetando la interfaz `DungeonHero`:

```typescript
{
  id: 'hero-khashar',
  name: 'Khashar',
  title: 'El Estratega de Sombras',
  heroClass: 'Ejecutor',
  heroType: 'Poder',
  role: 'Main de Asalto',
  tierRank: 'Tier S (Competitivo)',
  specialtyName: 'Enjambre Implacable',
  specialtyEffect: 'Aumenta el daño de las Avispas Asesinas en +5% por cada 2 niveles del héroe.',
  initialSkills: ['Liderazgo básico', 'Tácticas básicas'],
  initialArmy: 'Avispas 25, Larvas 40',
  recommendedStartingTier: 'Excelente para limpiar campamentos neutrales en Semana 1 sin bajas.',
  statGrowth: { attack: 40, defense: 30, spellPower: 15, knowledge: 15 },
  tacticalPlaystyle: 'Lanza a las tropas rápidas en Turno 1 para trabar a los arqueros enemigos.',
  idealSkillBuild: ['Liderazgo (Experto)', 'Ataque (Experto)', 'Logística (Experta)'],
  synergyCombo: 'Sinergia con Avispas y Mantis devoradoras.'
}
```

3. El héroe aparecerá inmediatamente en `HeroGuideView`, en el modal flotante y en los filtros de búsqueda sin necesidad de alterar código React.

### Protocolo para Añadir o Modificar un Hechizo

1. Ubicar la escuela mágica en `/src/data/spells/` (`daylightSpells.ts`, `nightshadeSpells.ts`, `primalSpells.ts`, `arcaneSpells.ts`, `neutralSpells.ts`).
2. Implementar los 4 niveles de progresión y los costes canónicos:
   - **Coste de Desbloqueo Base**: `Tier × (2 Cristales, 2 Gemas, 2 Mercurio) + Oro`.
   - **Progresión de Polvo Alquímico**:
     - Nivel 1: Desbloqueo base (0 Polvo).
     - Nivel 2: 25 Polvo + 1.000 Oro.
     - Nivel 3: 25 Polvo + 1.500 Oro + 2 Recursos Raros.
     - Nivel 4 (Magistral): 25 Polvo + 2.000 Oro + 4 Recursos Raros.
3. Registrar la sinergia por facción en `src/data/factionSpellData.ts`.

### Protocolo para Añadir una Nueva Facción

1. Añadir el identificador en `FactionId` (`src/data/factionDataProvider.ts`).
2. Configurar la paleta de colores y metadatos en `FACTION_THEMES` y `FACTIONS_METADATA`.
3. Crear el archivo de datos correspondiente en `/src/data/` (unidades, 56 días, leyes, estructuras).
4. El selector del `Header` y todas las vistas del compendio renderizarán la nueva facción automáticamente.

---

## 6. Matriz de Estado y Verificación Técnica

| Requisito Arquitectónico | Estado | Módulo Responsable |
| :--- | :--- | :--- |
| **Separación de Datos de Héroes** | ✅ Implementado | `/src/data/heroesData.ts` & `/src/data/factions/` |
| **Grimorio de 5 Escuelas Mágicas** | ✅ Implementado | `/src/data/spells/` & `/src/data/factionSpellData.ts` |
| **Design System Atómico** | ✅ Implementado | `/src/components/ui/` |
| **Plantilla Genérica de Guías** | ✅ Implementado | `/src/components/ui/GenericGuideTemplate.tsx` |
| **Estado Global Centralizado** | ✅ Implementado | `/src/context/AppContext.tsx` |
| **Verificación de Tipos Estricta** | ✅ Verificado (0 errores) | `tsc --noEmit` |
| **Compilación de Producción** | ✅ Verificado | `vite build` |

---

*Documento sincronizado y validado según los estándares de ingeniería de software para aplicaciones React 19 + TypeScript modernas.*

