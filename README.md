# 🏛️ Heroes of Might and Magic: Olden Era — Compendio Canónico & Plataforma Táctica de Jadame

> **Manual de Arquitectura, Guía Estratégica Competitiva y Sistema de Simulación Táctica**
> 
> *Versión del Proyecto:* 1.4.0 • *Stack:* React 19 + TypeScript 5.8 + Tailwind CSS v4 + Vite 6 + Motion + Lucide Icons

---

## 📑 Tabla de Contenidos

1. [Visión General del Proyecto](#-visión-general-del-proyecto)
2. [Las 6 Facciones Oficiales de Jadame](#-las-6-facciones-oficiales-de-jadame)
3. [Estructura del Proyecto y Directorios](#-estructura-del-proyecto-y-directorios)
4. [Módulos Principales del Compendio](#-módulos-principales-del-compendio)
   - [Planificador de 56 Días](#1-planificador-cívico-y-militar-de-56-días)
   - [Grimorio de Hechizos y Astrología](#2-grimorio-de-hechizos-astrología-y-mejoras-magistrales)
   - [Árbol de Leyes de Facción](#3-árbol-de-leyes-de-facción-y-sellos)
   - [Matriz de Unidades y Evolución](#4-matriz-de-criaturas-tier-1-7-y-doble-evolución)
   - [Optimizador y Catálogo de Héroes](#5-guía-y-optimizador-de-héroes-competitivos)
   - [Árboles de Habilidades y Subclases](#6-habilidades-oficiales-y-subclases-de-prestigio)
   - [Manual Táctico de Combate](#7-manual-táctico-de-combate-y-formaciones)
5. [Capa de Estado y Design System](#-capa-de-estado-y-design-system)
6. [Flujo Data-Driven y Extensibilidad](#-flujo-data-driven-y-extensibilidad)
7. [Guía de Ejecución y Scripts](#-guía-de-ejecución-y-scripts)

---

## 🎯 Visión General del Proyecto

Esta aplicación es una plataforma web integral, modular y de alto rendimiento diseñada para la comunidad competitiva y estratégica de **Heroes of Might and Magic: Olden Era**, ambientado en el continente de **Jadame**.

Proporciona herramientas de cálculo de tempo económico para los **Días 1 al 7**, optimización de builds de comandantes, catálogo exhaustivo de los 10 árboles de habilidades, matrices de unidades con evoluciones alternativas, simulación de leyes cívicas y un grimorio completo con fórmulas de desbloqueo, costes de astrología y mejoras mágicas con Polvo Alquímico.

---

## 🛡️ Las 6 Facciones Oficiales de Jadame

El compendio cubre de forma exhaustiva y canónica las 6 facciones del juego:

1. 🟡 **Templo (Temple)**: Furia sagrada, caballeros de armadura pesada, clérigos y huestes celestiales.
2. ⚪ **Necrópolis (Necropolis)**: No-muertos, vampiros inmortales, nigromancia acumulativa y magia de sombras.
3. 🟣 **Mazmorra (Dungeon)**: Elfos oscuros, minotauros, hidras, dragones negros y hechicería elemental devastadora.
4. 🟢 **Foresta / Arboleda (Sylvan / Grove)**: Faunos, hoplitas, ninfas iriyads, aqualotls anfibios, herbomantes, qilins celestiales, fénix y magia de la naturaleza.
5. 🟠 **Colmena / Enjambre (Hive / Swarm)**: Horda insectoide de Beelzebub y el Rey Libélula (9 Ejecutores / Might y 9 Heraldos / Magic).
6. 🔵 **Cisma (Schism)**: Cultistas del vacío, moradores de grietas de Vori (Ra'Shoths, Shoths, Jinetes Aga'Shoth), concubos, árbitros y enviados abisales con ritos de invocación permanente y demonología del abismo.

---

## 🌳 Estructura del Proyecto y Directorios

```text
├── index.html                           # Entry-point HTML con metadatos y tipografías
├── package.json                         # Dependencias (React 19, Tailwind v4, Motion, Lucide)
├── tsconfig.json                        # Configuración estricta de TypeScript 5.8
├── vite.config.ts                       # Configuración de empaquetado Vite
├── metadata.json                        # Manifiesto de capacidades y configuración de la app
├── README.md                            # Documentación general y manual técnico
├── ARCHITECTURE.md                      # Blueprint arquitectónico y protocolos de extensión
├── AGENTS.md                            # Instrucciones y reglas para agentes de desarrollo
│
└── src/
    ├── main.tsx                         # Bootstrap del árbol React DOM
    ├── App.tsx                          # Shell principal con persistencia y keep-alive de pestañas
    ├── index.css                        # Estilos globales y variables de tema dinámico Tailwind v4
    ├── types.ts                         # Definiciones de tipos TypeScript principales del dominio
    │
    ├── types/                           # Sistema modular de tipado
    │   └── index.ts                     # Barrel export de tipos
    │
    ├── context/                         # Capa de Estado Global Unificado
    │   ├── AppContext.tsx               # Proveedor principal: facción, tab, themeMode, tema reactivo
    │   ├── ThemeContext.tsx             # Contexto de compatibilidad de tematización
    │   └── index.ts                     # Barrel export de contextos
    │
    ├── hooks/                           # Hooks de Negocio y Utilidades
    │   ├── useStickyState.ts            # Sincronización transparente con localStorage
    │   └── index.ts                     # Barrel export de hooks (useApp, useStickyState)
    │
    ├── components/
    │   ├── layout/                      # Componentes estructurales de layout
    │   │   ├── Header.tsx               # Barra superior reactiva, selector de facciones y tema
    │   │   └── index.ts                 # Barrel export de layout
    │   │
    │   ├── ui/                          # Design System Atómico Reutilizable
    │   │   ├── GenericGuideTemplate.tsx # Plantilla genérica para renderizado uniforme de guías
    │   │   ├── ResourceBadge.tsx        # Badge normalizado para recursos (Oro, Madera, Gemas, etc.)
    │   │   ├── TierBadge.tsx            # Badge distintivo de rangos (T1-T7, Tier S+, S, A)
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
    └── data/                            # Capa de Datos Desacoplada (Data-Driven)
        ├── factionDataProvider.ts       # Proveedor centralizador y selector reactivo de facción
        ├── heroesData.ts                # Catálogo unificado y funciones de búsqueda de héroes
        ├── factionSpellData.ts          # Synergies mágicas, prioridades y combos por facción
        ├── officialSkillsData.ts        # Árboles canónicos de habilidades primarias y secundarias
        ├── subclassesData.ts            # Matriz de subclases de prestigio de Jadame
        ├── dungeonData.ts               # Dataset Mazmorra (56 días, unidades, héroes, tácticas)
        ├── templeData.ts                # Dataset Templo
        ├── arboledaData.ts              # Dataset Foresta / Arboleda
        ├── necropolisData.ts            # Dataset Necrópolis
        ├── enjambreData.ts              # Dataset Colmena / Enjambre
        ├── cismaData.ts                 # Dataset Cisma
        │
        ├── factions/                    # Módulos de datos desacoplados por facción
        │   ├── heroesRegistry.ts        # Registro extensible de héroes en runtime
        │   ├── dungeon/heroes.ts        # Héroes de Mazmorra
        │   ├── temple/heroes.ts         # Héroes de Templo
        │   ├── grove/heroes.ts          # Héroes de Foresta
        │   ├── necropolis/heroes.ts     # Héroes de Necrópolis
        │   ├── hive/heroes.ts           # Héroes de Colmena
        │   └── schism/heroes.ts         # Héroes de Cisma
        │
        ├── structures/                  # Arquitectura de edificios de ciudad
        │   ├── townStructuresData.ts    # Exportador unificado de estructuras
        │   ├── dungeonStructures.ts     # Edificios de Mazmorra
        │   ├── templeStructures.ts      # Edificios de Templo
        │   ├── groveStructures.ts       # Edificios de Foresta
        │   ├── necropolisStructures.ts  # Edificios de Necrópolis
        │   ├── hiveStructures.ts        # Edificios de Colmena
        │   └── schismStructures.ts      # Edificios de Cisma
        │
        └── spells/                      # Compendio de magia y astrología
            ├── spellsData.ts            # Exportador unificado de hechizos
            ├── arcaneSpells.ts          # Magia Arcana
            ├── daylightSpells.ts        # Magia de Luz (Daylight)
            ├── nightshadeSpells.ts      # Magia Nochesombra (Nightshade)
            ├── primalSpells.ts          # Magia Primigenia (Primal)
            └── neutralSpells.ts         # Magia de Aventura / Neutral (Universal)
```

---

## 🧩 Módulos Principales del Compendio

### 1. Planificador Cívico y Militar de 56 Días
* **Desarrollo Día a Día**: Ruta paso a paso optimizada para las 8 semanas de juego (56 días).
* **Priorización de Recursos**: Cálculo exacto de ingresos de oro, madera, mineral y recursos raros.
* **Hitos Críticos**: Identificación de momentos clave como el Capitoliar Día 7 o la primera criatura Tier 7 en la Semana 2.

### 2. Grimorio de Hechizos, Astrología y Mejoras Magistrales
* **5 Escuelas Mágicas**: Luz (*Daylight*), Nochesombra (*Nightshade*), Primigenia (*Primal*), Arcana (*Arcane*) y Aventura (*Universal*).
* **Fórmula de Desbloqueo en Observatorio**: `Tier × (2 Cristales, 2 Gemas, 2 Mercurio) + Oro`.
* **Escala de Niveles 1 al 4**: Progresión con Polvo Alquímico (*Dust*) hasta la forma **Magistral (Masterful)**.
* **Sinergias de Facción**: Consejos tácticos específicos para cada facción y unidades beneficiadas.

### 3. Árbol de Leyes de Facción y Sellos
* **Mecánica de Sellos Cívicos**: Configuración de leyes con sus modificadores económicos y militares.
* **Presets Competitivos**: Configuraciones prediseñadas para aperturas agresivas de Día 1, economías de late game o defensas de asedio.

### 4. Matriz de Criaturas Tier 1-7 y Doble Evolución
* **Evoluciones Alternativas**: Análisis comparativo de ambas variantes de mejora para cada unidad de Tier 1 a 7.
* **Estadísticas Completas**: Ataque, defensa, daño mínimo/máximo, puntos de vida, velocidad e iniciativa.
* **Habilidades Especiales**: Desglose de pasivas, auras, ataques sin represalia y disparos a distancia.

### 5. Guía y Optimizador de Héroes Competitivos
* **Tier List y Roles**: Clasificación (Tier S+, S, A, B) y categorización de roles (Main de Asalto, Farmeo Día 1, Hechicero, Soporte).
* **Especialidades Únicas**: Explicación de cómo escala la pasiva única de cada comandante por nivel.
* **Builds Óptimas**: Secuencia de habilidades recomendada y sinergias con tropas y artefactos.

### 6. Habilidades Oficiales y Subclases de Prestigio
* **10 Árboles Oficiales**: Explorador interactivo con las 6 sub-habilidades por cada rama primaria.
* **Subclases de Prestigio**: Matriz de combinaciones de habilidades que desbloquean clases especiales de Jadame con bonificaciones pasivas.

### 7. Manual Táctico de Combate y Formaciones
* **Secuencia de Turnos e Iniciativa**: Estrategias para ganar el primer movimiento y neutralizar tiradores enemigos.
* **Posicionamiento Hexagonal**: Diagramas y tácticas de colocación en el campo de batalla.

---

## 🎨 Capa de Estado y Design System

* **`AppContext`**: Gestiona de forma centralizada la facción activa (`selectedFaction`), la pestaña activa (`activeTab`), el modo visual (`themeMode`) e inyecta la paleta de colores reactiva en tiempo real.
* **Variables CSS Dinámicas**: Adaptación automática de bordes, brillos, badges y botones al color temático de cada facción.
* **Componentes Atómicos**: `ResourceBadge`, `TierBadge`, `SearchBar` y `FilterChipGroup` aseguran coherencia visual sin duplicación de clases.

---

## 🔄 Flujo Data-Driven y Extensibilidad

1. **Desacoplamiento Total**: Ningún componente de interfaz contiene arrays estáticos de datos.
2. **Carga Reactiva**: Al seleccionar una facción en el `Header`, todas las vistas consultan automáticamente los proveedores de datos (`factionDataProvider.ts`, `heroesData.ts`, `factionSpellData.ts`).
3. **Ampliación Sin Tocar UI**: Para añadir nuevos héroes, hechizos o leyes, basta con agregar el objeto tipado en el fichero de datos correspondiente en `/src/data/`.

---

## 🚀 Guía de Ejecución y Scripts

```bash
# Instalar dependencias del proyecto
npm install

# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Validar tipado y sintaxis estricta con TypeScript
npm run lint

# Compilar paquete de producción optimizado
npm run build
```

