# Sincronización de Endpoints API → Datos Locales

Servidor: `http://localhost:5176`
Estado: API = fuente de verdad absoluta para datos del juego

---

## Endpoints con Estructura Local Existente

| Endpoint API | Archivo Local | Estado | Notas |
|---|---|---|---|
| `/api/heroes` | `src/data/heroesData.ts` | ✅ Completo | 108 héroes, 6 facciones, `DungeonHero` interface |
| `/api/units` | `src/data/unitAssetsData.ts` | ✅ Completo | 148 unidades, `UNIT_ASSETS_CATALOG`, `UnitAssetEntry` |
| `/api/spells` | `src/data/spellsData.ts` | ✅ Completo | 115 hechizos, 5 escuelas (`DAYLIGHT`, `NIGHTSHADE`, `PRIMAL`, `ARCANE`, `NEUTRAL`) |
| `/api/skills` | `src/data/officialSkillsData.ts` | ✅ Completo | 30 habilidades, `OFFICIAL_SKILLS_RAW_DATA`, `OfficialSkill` |
| `/api/subclasses` | `src/data/subclassesData.ts` | ✅ Completo | 24 subclases, `OFFICIAL_SUBCLASSES`, `SubclassInfo` |
| `/api/faction-laws` | `src/data/factionLawsData.ts` | ✅ Completo | Leyes por facción, `FACTION_LAWS` |

---

## Endpoints SIN Estructura Local (Requieren Creación)

| Endpoint API | Registros | Archivo Propuesto | Interfaz Propuesta | Prioridad |
|---|---|---|---|---|
| `/api/artifacts` | 298 | `src/data/artifactsData.ts` | `ArtifactInfo` | Alta |
| `/api/abilities` | 337 | `src/data/abilitiesData.ts` | `AbilityInfo` | Alta |
| `/api/buildings` | 207 | `src/data/buildingsData.ts` | `BuildingInfo` | Media |
| `/api/map-objects` | 201 | `src/data/mapObjectsData.ts` | `MapObjectInfo` | Media |

---

## Mapeo Completo API → Local (Todos los Endpoints)

### 1. `/api/heroes` → `heroesData.ts`
- **Campos API**: `id`, `name`, `faction`, `factionDisplay`, `classType`, `classDisplay`, `iconPath`
- **Campos locales adicionales**: `idealSkillBuild`, `statGrowth`, `tacticalPlaystyle`, `synergyCombo`, `day1Action`, `title`, `heroClass`, `tierRank`, `recommendedStartingTier`, `role`
- **Estado**: Sincronizado (API = catálogo, local = extensión)

### 2. `/api/units` → `unitAssetsData.ts`
- **Campos API**: `id`, `name`, `faction`, `factionDisplay`, `tier`, `iconPath`, `isOrphan`, `scale`, `prefabPath`
- **Campos locales adicionales**: `nameEs`, `nameEn`, `faction_id`, `faction_image`, `visual_3d`
- **Estado**: Sincronizado (API = datos canónicos, local = assets + nombres ES/EN)

### 3. `/api/spells` → `spellsData.ts`
- **Campos API**: `id`, `name`, `school`, `schoolDisplay`, `schoolTierText`, `rank`, `category`, `icon`, `isMasterful`, `baseNameForSort`
- **Campos locales adicionales**: `description`, `effect`, `manaCost`, `duration`, `targetType`
- **Estado**: Sincronizado (API = catálogo oficial, local = efectos y descripciones)

### 4. `/api/skills` → `officialSkillsData.ts`
- **Campos API**: `id`, `name`, `icon`
- **Campos locales adicionales**: `category`, `upgrades` (basic/advanced/expert), `subskills`, `startingHeroes`
- **Estado**: Sincronizado (API = catálogo básico, local = árbol completo de subhabilidades)

### 5. `/api/subclasses` → `subclassesData.ts`
- **Campos API**: `id`, `name`, `faction`, `factionDisplay`, `classType`, `classDisplay`, `icon`
- **Campos locales adicionales**: `baseClass`, `bonusTitle`, `bonusEffect`, `requiredSkills`, `recommendedHeroes`, `tacticalTier`, `strategicAnalysis`, `synergyNotes`
- **Estado**: Sincronizado (API = catálogo básico, local = análisis táctico completo)

### 6. `/api/faction-laws` → `factionLawsData.ts`
- **Campos API**: `id`, `name`, `faction`, `factionDisplay`, `level`, `maxLevel`, `iconPath`, `category`
- **Campos locales adicionales**: `description`, `effect`, `sealRequirements`, `tierProgression`
- **Estado**: Sincronizado

---

## Endpoints que Requieren Creación de Estructuras

### `/api/artifacts` (298 registros)
**Archivo**: `src/data/artifactsData.ts`
**Interfaz propuesta**:
```typescript
export interface ArtifactInfo {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  slot: 'weapon' | 'armor' | 'helmet' | 'shield' | 'ring' | 'amulet' | 'boots' | 'gloves';
  raritySlotText: string;
  icon: string;
  isOrphan: boolean;
  prefabPath: string | null;
  // Campos locales adicionales
  description?: string;
  effect?: string;
  faction?: string;
}
```
**Estado**: ❌ No existe archivo local. Requiere creación.

### `/api/abilities` (337 registros)
**Archivo**: `src/data/abilitiesData.ts`
**Interfaz propuesta**:
```typescript
export interface AbilityInfo {
  id: string;
  name: string;
  abilityType: 'Active' | 'Passive' | 'Aura';
  icon: string;
  // Campos locales adicionales
  description?: string;
  effect?: string;
  faction?: string;
  creatureType?: string;
}
```
**Estado**: ❌ No existe archivo local. Requiere creación.

### `/api/buildings` (207 registros)
**Archivo**: `src/data/buildingsData.ts`
**Interfaz propuesta**:
```typescript
export interface BuildingInfo {
  id: string;
  name: string;
  faction: string;
  factionDisplay: string;
  level: number;
  maxLevel: number;
  iconPath: string;
  category: 'mains' | 'creature' | 'magic' | 'defense' | 'economy';
  // Campos locales adicionales
  description?: string;
  cost?: { gold: number; wood?: number; ore?: number; gems?: number };
  prerequisites?: string[];
}
```
**Estado**: ❌ No existe archivo local. Requiere creación.

### `/api/map-objects` (201 registros)
**Archivo**: `src/data/mapObjectsData.ts`
**Interfaz propuesta**:
```typescript
export interface MapObjectInfo {
  id: string;
  name: string;
  category: 'Interact' | 'Resource' | 'Treasure' | 'Obstacle' | 'Event';
  icon: string;
  isOrphan: boolean;
  prefabPath: string | null;
  bankType?: string;
  hasGuards?: boolean;
  rewardTypes?: string[];
  // Campos locales adicionales
  description?: string;
  interactionType?: string;
}
```
**Estado**: ❌ No existe archivo local. Requiere creación.

---

## Estrategia de Creación para Endpoints Faltantes

1. **Artefactos (`/api/artifacts`)**: Crear `src/data/artifactsData.ts` con `ArtifactInfo[]` y exportar `ARTIFACTS_DATA`. Incluir datos mínimos (id, name, rarity, slot, icon) y dejar campos locales (description, effect) como opcionales para completar posteriormente.

2. **Habilidades (`/api/abilities`)**: Crear `src/data/abilitiesData.ts` con `AbilityInfo[]`. Mapear `abilityType` (Active/Passive/Aura) y `icon`. Dejar `description` y `effect` para completar con datos del juego.

3. **Edificios (`/api/buildings`)**: Crear `src/data/buildingsData.ts` con `BuildingInfo[]`. Mapear `category` (mains/creature/magic/defense/economy) y `level/maxLevel`. Dejar `cost` y `prerequisites` para completar.

4. **Objetos del mapa (`/api/map-objects`)**: Crear `src/data/mapObjectsData.ts` con `MapObjectInfo[]`. Mapear `category`, `bankType`, `hasGuards`, `rewardTypes`. Dejar `description` para completar.

---

## Resumen de Estado de Sincronización

| Endpoint | Registros | Archivo Local | Estado | Acción Requerida |
|---|---|---|---|---|
| `/api/heroes` | 108 | `heroesData.ts` | ✅ Sincronizado | Ninguna |
| `/api/units` | 148 | `unitAssetsData.ts` | ✅ Sincronizado | Ninguna |
| `/api/spells` | 115 | `spellsData.ts` | ✅ Sincronizado | Ninguna |
| `/api/skills` | 30 | `officialSkillsData.ts` | ✅ Sincronizado | Ninguna |
| `/api/subclasses` | 24 | `subclassesData.ts` | ✅ Sincronizado | Ninguna |
| `/api/faction-laws` | - | `factionLawsData.ts` | ✅ Sincronizado | Ninguna |
| `/api/artifacts` | 298 | **No existe** | ❌ Falta | **Crear `artifactsData.ts`** |
| `/api/abilities` | 337 | **No existe** | ❌ Falta | **Crear `abilitiesData.ts`** |
| `/api/buildings` | 207 | **No existe** | ❌ Falta | **Crear `buildingsData.ts`** |
| `/api/map-objects` | 201 | **No existe** | ❌ Falta | **Crear `mapObjectsData.ts`** |

---

## Recomendación Final

La API es la fuente de verdad para todos los datos del juego. La aplicación debe:

1. **Mantener** los archivos locales existentes (`heroesData.ts`, `unitAssetsData.ts`, etc.) como extensiones con datos exclusivos de la aplicación.
2. **Crear** los 4 archivos faltantes (`artifactsData.ts`, `abilitiesData.ts`, `buildingsData.ts`, `mapObjectsData.ts`) con estructuras mínimas que mapeen los campos de la API.
3. **Implementar** un mecanismo de sincronización que compare los datos de la API con los locales y actualice los campos canónicos sin perder los datos exclusivos.
4. **Documentar** cualquier cambio en `API_ENDPOINTS.md` y `sync-log.md`.
