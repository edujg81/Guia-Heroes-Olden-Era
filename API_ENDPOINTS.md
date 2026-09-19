# Endpoints de la API Descubiertos

Servidor: `http://localhost:5176`

## Endpoints Confirmados (200 OK)

### Catálogos (Arrays)
- `/api/heroes` - 108 héroes (id, name, faction, factionDisplay, classType, classDisplay, iconPath)
- `/api/units` - 148 unidades (id, name, faction, factionDisplay, tier, iconPath, isOrphan, scale, prefabPath)
- `/api/spells` - 115 hechizos (id, name, school, schoolDisplay, schoolTierText, rank, category, icon, isMasterful, baseNameForSort)
- `/api/skills` - 30 habilidades (id, name, icon)
- `/api/subclasses` - 24 subclases (id, name, faction, factionDisplay, classType, classDisplay, icon)
- `/api/abilities` - 337 habilidades (id, name, abilityType, icon)
- `/api/artifacts` - 298 artefactos (id, name, rarity, slot, raritySlotText, icon, isOrphan, prefabPath)
- `/api/buildings` - 207 edificios (id, name, faction, factionDisplay, level, maxLevel, iconPath, category)
- `/api/map-objects` - 201 objetos del mapa (id, name, category, icon, isOrphan, prefabPath, bankType, hasGuards, rewardTypes)
- `/api/faction-laws` - Leyes de facción (confirmado en catálogo)

### Detalles Individuales Confirmados (200 OK)
- `/api/heroes/{id}` - Datos completos del héroe (attack, defence, spellPower, knowledge, specializationName, specializationDescription, startingArmy, startingSkills, startingSpells, description, motto, statLabels, classIcon, specializationIcon, factionIcon)
- `/api/units/{id}` - Datos completos de la unidad (localizedName, factionIcon, attack, defense, minDamage, maxDamage, health, speed, initiative, growth, luck, morale, squadValue, expBonus, description, narrativeDescription, creatureType, passiveAbilities, activeAbilities, costEntries, upgradeCostEntries, usedByHeroes, statLabels)
- `/api/spells/{id}` - Detalle de hechizo
- `/api/skills/{id}` - Detalle de habilidad
- `/api/subclasses/{id}` - Detalle de subclase
- `/api/abilities/{id}` - Detalle de habilidad
- `/api/artifacts/{id}` - Detalle de artefacto
- `/api/buildings/{id}` - Detalle de edificio
- `/api/map-objects/{id}` - Detalle de objeto de mapa
- `/api/faction-laws/{id}` - Detalle de ley de facción

### Endpoints que devuelven HTML (404 o SPA)
- `/api/factions` - Devuelve HTML (SPA / no existe como endpoint JSON independiente)
- `/api/laws` - Devuelve HTML (SPA / no existe como endpoint JSON independiente)
- `/swagger.json` - 404 (no hay documentación Swagger expuesta)
- `/routes` - Devuelve HTML (SPA)

## Datos que NO contiene la API (exclusivos de la aplicación)
- `idealSkillBuild` (builds de habilidades recomendadas)
- `statGrowth` (crecimiento de atributos por nivel)
- `tacticalPlaystyle` (estilo de juego táctico)
- `synergyCombo` (sinergia de facción)
- `day1Action` (acción recomendada Día 1)
- `title` (título del héroe)
- `heroClass` (clase específica del juego)
- `tierRank` (ranking de tier)
- `recommendedStartingTier` (recomendación de inicio)
- `role` (rol del héroe)

## Estrategia de Sincronización Recomendada

1. **Usar `/api/heroes` como catálogo base** para obtener la lista de todos los héroes disponibles
2. **Usar `/api/heroes/{id}` para datos detallados** de cada héroe individual
3. **Mantener datos locales (`heroesData.ts`)** para los campos exclusivos de la aplicación (`idealSkillBuild`, `tacticalPlaystyle`, etc.)
4. **Crear un mecanismo de sincronización** que:
   - Lea los datos de la API (`/api/heroes` para catálogo, `/api/heroes/{id}` para detalle)
   - Actualice los datos locales que coincidan con la API (id, name, faction, classType, iconPath, stats)
   - Preserve los datos exclusivos de la aplicación (`idealSkillBuild`, `statGrowth`, `tacticalPlaystyle`, `synergyCombo`, `day1Action`, `role`, `tierRank`, `recommendedStartingTier`, `title`, `heroClass`)
   - Agregue nuevos héroes que aparezcan en la API (comparación por `id`)
   - Elimine héroes que ya no existan en la API (opcional, según política de retención)
   - Registre cambios en un log de sincronización (`sync-log.md`) para auditoría

## Mapeo de Campos API → Local (`DungeonHero`)

| Campo API (`/api/heroes/{id}`) | Campo Local (`heroesData.ts`) | Origen |
|---|---|---|
| `id` | `id` | API (fuente de verdad) |
| `name` | `name` | API |
| `faction` | `faction` | API |
| `factionDisplay` | `factionDisplay` | API |
| `classType` | `classType` | API |
| `classDisplay` | `classDisplay` | API |
| `iconPath` | `iconPath` | API |
| `attack` | `attack` | API |
| `defence` | `defence` | API |
| `spellPower` | `spellPower` | API |
| `knowledge` | `knowledge` | API |
| `specializationName` | `specializationName` | API |
| `specializationDescription` | `specializationDescription` | API |
| `startingArmy` | `startingArmy` | API |
| `startingSkills` | `startingSkills` | API |
| `startingSpells` | `startingSpells` | API |
| `description` | `description` | API |
| `motto` | `motto` | API |
| `statLabels` | `statLabels` | API |
| `idealSkillBuild` | `idealSkillBuild` | **Local exclusivo** |
| `statGrowth` | `statGrowth` | **Local exclusivo** |
| `tacticalPlaystyle` | `tacticalPlaystyle` | **Local exclusivo** |
| `synergyCombo` | `synergyCombo` | **Local exclusivo** |
| `day1Action` | `day1Action` | **Local exclusivo** |
| `title` | `title` | **Local exclusivo** |
| `heroClass` | `heroClass` | **Local exclusivo** |
| `tierRank` | `tierRank` | **Local exclusivo** |
| `recommendedStartingTier` | `recommendedStartingTier` | **Local exclusivo** |
| `role` | `role` | **Local exclusivo** |
