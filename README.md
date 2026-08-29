# 🏛️ Heroes of Might and Magic: Olden Era — Compendio de Estrategia & Planificación

> **Guía Técnica de Arquitectura, Manual de Componentes y Sistema de Simulación Táctica**
> 
> *Versión del Proyecto:* 1.3.0 • *Stack:* React 19 + TypeScript 5.8 + Tailwind CSS v4 + Vite 6 + Motion

---

## 📑 Tabla de Contenidos

1. [Visión General del Proyecto](#-visión-general-del-proyecto)
2. [Estructura Actual del Proyecto](#-estructura-actual-del-proyecto)
3. [Módulos Principales y Responsabilidad de Componentes](#-módulos-principales-y-responsabilidad-de-componentes)
   - [Núcleo y Shell (`/src/context`, `/src/hooks`, `/src/App.tsx`)](#núcleo-y-shell)
   - [Design System Atómico (`/src/components/ui`)](#design-system-atómico)
   - [Vistas de Características (`/src/components/features`)](#vistas-de-características)
   - [Capa de Datos Desacoplada (`/src/data`)](#capa-de-datos-desacoplada)
4. [Flujo de Carga Dinámica (Data-Driven Engine)](#-flujo-de-carga-dinámica-data-driven-engine)
5. [Guía de Ejecución y Scripts](#-guía-de-ejecución-y-scripts)

---

## 🎯 Visión General del Proyecto

Esta aplicación es una plataforma interactiva de estrategia competitiva, optimización de héroes, planificación cívica día a día (Campaña de 56 Días) y simulación táctica para el videojuego *Heroes of Might and Magic: Olden Era*.

Soporta las **6 facciones canónicas**:
- 🟣 **Mazmorra (Dungeon)**
- 🟡 **Templo (Temple)**
- 🟢 **Arboleda (Grove / Sylvan)**
- ⚪ **Necrópolis (Necropolis)**
- 🟠 **Enjambre (Hive / Swarm)**
- 🔵 **Cisma (Schism)**

---

## 🌳 Estructura Actual del Proyecto

```text
├── index.html                           # Entry-point HTML con metadatos SEO y tipografías
├── package.json                         # Dependencias (React 19, Tailwind v4, Motion, Lucide)
├── tsconfig.json                        # Configuración estricta de compilación TypeScript
├── vite.config.ts                       # Configuración de empaquetado Vite con soporte Tailwind v4
├── metadata.json                        # Manifiesto de capacidades y configuración de la app
├── README.md                            # Documentación técnica general y manual de usuario
├── ARCHITECTURE.md                      # Blueprint arquitectónico y reglas de diseño estricto
│
└── src/
    ├── main.tsx                         # Bootstrap del árbol React DOM
    ├── App.tsx                          # Shell principal con persistencia y conmutación de vistas
    ├── index.css                        # Entry point de estilos globales (Tailwind v4 theme variables)
    ├── types.ts                         # Definiciones de tipos TypeScript de todo el dominio
    │
    ├── types/                           # Sistema modular de tipado
    │   └── index.ts                     # Barrel export de tipos
    │
    ├── context/                         # Capa de Estado Global Unificado
    │   ├── AppContext.tsx               # Proveedor principal: facción, tab, themeMode, tema dinámico
    │   ├── ThemeContext.tsx             # Contexto de compatibilidad de tematización
    │   └── index.ts                     # Barrel export de contextos
    │
    ├── hooks/                           # Hooks de Negocio y Utilidades
    │   ├── useStickyState.ts            # Sincronización transparente con localStorage
    │   └── index.ts                     # Barrel export de hooks
    │
    ├── components/
    │   ├── layout/                      # Componentes estructurales de layout
    │   │   ├── Header.tsx               # Barra superior reactiva, selector de facciones y tema
    │   │   └── index.ts                 # Barrel export de layout
    │   │
    │   ├── ui/                          # Design System Atómico Reutilizable
    │   │   ├── GenericGuideTemplate.tsx # Plantilla genérica para renderizado uniforme de guías
    │   │   ├── ResourceBadge.tsx        # Badge normalizado para recursos (Oro, Madera, Gemas, etc.)
    │   │   ├── TierBadge.tsx            # Badge distintivo de rangos y niveles (T1-T7, S+, S, A)
    │   │   ├── SearchBar.tsx            # Input de búsqueda con debouncing e icono de limpieza
    │   │   ├── FilterChipGroup.tsx      # Selector de filtros por píldoras con conteo dinámico
    │   │   └── index.ts                 # Barrel export del Design System
    │   │
    │   ├── features/                    # Módulos Funcionales
    │   │   └── heroes/                  # Gestión de Héroes y Especialistas
    │   │       ├── HeroGuideCard.tsx    # Ficha técnica visual de héroe
    │   │       ├── HeroDetailModal.tsx  # Modal flotante para inspección profunda
    │   │       ├── HeroGuideView.tsx    # Vista completa conectada a datos dinámicos
    │   │       └── index.ts             # Barrel export del feature de héroes
    │   │
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
    └── data/                            # Capa de Datos y Modelos de Simulación
        ├── factionDataProvider.ts       # Proveedor centralizador y selector reactivo de facción
        ├── heroesData.ts                # Catálogo unificado y funciones de búsqueda de héroes
        ├── dungeonData.ts               # Dataset Mazmorra (Dungeon): 56 días, unidades, héroes
        ├── templeData.ts                # Dataset Templo (Temple)
        ├── arboledaData.ts              # Dataset Arboleda (Grove)
        ├── necropolisData.ts            # Dataset Necrópolis (Necropolis)
        ├── enjambreData.ts              # Dataset Enjambre (Hive)
        ├── cismaData.ts                 # Dataset Cisma (Schism)
        │
        ├── factions/                    # Módulos de datos desacoplados por facción
        │   ├── heroesRegistry.ts        # Registro extensible de héroes en runtime
        │   ├── dungeon/heroes.ts        # Héroes de Mazmorra
        │   ├── temple/heroes.ts         # Héroes de Templo
        │   ├── grove/heroes.ts          # Héroes de Arboleda
        │   ├── necropolis/heroes.ts     # Héroes de Necrópolis
        │   ├── hive/heroes.ts           # Héroes de Enjambre
        │   └── schism/heroes.ts         # Héroes de Cisma
        │
        ├── structures/                  # Arquitectura de edificios de ciudad
        │   ├── townStructuresData.ts    # Exportador unificado de estructuras
        │   ├── dungeonStructures.ts     # Edificios de Mazmorra
        │   ├── templeStructures.ts      # Edificios de Templo
        │   ├── groveStructures.ts       # Edificios de Arboleda
        │   ├── necropolisStructures.ts  # Edificios de Necrópolis
        │   ├── hiveStructures.ts        # Edificios de Enjambre
        │   └── schismStructures.ts      # Edificios de Cisma
        │
        └── spells/                      # Compendio de magia y astrología
            ├── spellsData.ts            # Exportador unificado de hechizos
            ├── arcaneSpells.ts          # Magia Arcana
            ├── daylightSpells.ts        # Magia de Luz (Daylight)
            ├── nightshadeSpells.ts      # Magia Nochesombra (Nightshade)
            ├── primalSpells.ts          # Magia Primigenia (Primal / Tierra / Fuego)
            └── neutralSpells.ts         # Magia de Aventura / Neutral (Universal)
```

---

## 🧩 Módulos Principales y Responsabilidad de Componentes

### Núcleo y Shell
* **`AppContext.tsx`**: Administra de forma centralizada la facción activa (`selectedFaction`), la pestaña activa (`activeTab`), el modo visual (`themeMode`) y computa la paleta de colores reactiva correspondiente.
* **`App.tsx`**: Monta la jerarquía principal y preserva el estado de navegación del usuario mediante el patrón *keep-alive* con clases `block / hidden`.

### Design System Atómico
* **`GenericGuideTemplate.tsx`**: Contenedor estándar que inyecta automáticamente el encabezado tematizado de facción, barra de búsqueda, chips de filtrado y área de contenido.
* **`ResourceBadge.tsx`**: Formateador visual con iconos y colores para los recursos del juego (🪙 Oro, 🪵 Madera, ⛏️ Mineral, 🧪 Azufre, 💧 Mercurio, 💎 Gemas, 🔮 Cristal, ✨ Maná, 📜 Ley).
* **`TierBadge.tsx`**: Badge con contraste cromático adaptado para niveles Tier 1 a 7 y rangos competitivos (Tier S+, S, A).

### Capa de Datos Desacoplada
* **`heroesData.ts`**: Fuente unificada para el consumo de héroes de las 6 facciones, con helpers de búsqueda por ID y filtrado por facción.
* **`heroesRegistry.ts`**: Capa de registro extensible que permite agregar nuevos comandantes en tiempo de compilación o ejecución.

---

## 🔄 Flujo de Carga Dinámica (Data-Driven Engine)

1. El usuario selecciona una facción en el `Header` (ejemplo: *Arboleda*).
2. `AppContext` actualiza el estado global y las variables CSS en `:root` (`--theme-primary-hex`, scrollbar).
3. Cada vista de la aplicación (Héroes, Unidades, Estructuras, Leyes, Hechizos) consulta automáticamente el dataset correspondiente a la facción activa a través de los proveedores de datos (`factionDataProvider.ts`, `heroesData.ts`).
4. La interfaz se re-renderiza con los datos específicos de la facción sin recargas de página ni bifurcaciones complejas en la UI.

---

## 🚀 Guía de Ejecución y Scripts

```bash
# Instalación de dependencias
npm install

# Ejecución en modo desarrollo
npm run dev

# Verificación de tipos TypeScript
npm run lint

# Compilación para producción
npm run build
```
