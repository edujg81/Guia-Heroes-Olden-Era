import { readFileSync, writeFileSync } from 'node:fs';

const filePath = 'd:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data/heroAssetsData.ts';
let content = readFileSync(filePath, 'utf8');

// Insert import.meta.glob after the FACTION_PREFIX_MAP definition
const insertPoint = content.indexOf('export function getHeroPortrait');
const newContent = content.slice(0, insertPoint) + `
// Importar dinámicamente todos los retratos de héroes con Vite
const heroImageModules = import.meta.glob('/src/assets/icons/heroes/hero_*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/**
 * Normaliza un texto para comparación.
 */
const normalizeStr = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/['’\\-_]/g, '')
    .trim();

/**
 * Busca un archivo de retrato en los módulos importados por coincidencia de nombre.
 */
function findHeroImage(heroName: string, faction?: string): string | undefined {
  const key = normalizeStr(heroName);

  if (faction) {
    const prefixes = FACTION_PREFIX_MAP[faction] || [faction.toLowerCase()];
    for (const prefix of prefixes) {
      for (const [path] of Object.entries(heroImageModules)) {
        const fileName = path.split('/').pop() || '';
        const fileBase = fileName.replace(/^hero_/, '').replace(/\\.png$/, '');
        if (fileBase.includes(prefix) && normalizeStr(fileBase).includes(key)) {
          return path;
        }
      }
    }
  }

  for (const [path] of Object.entries(heroImageModules)) {
    const fileName = path.split('/').pop() || '';
    const fileBase = fileName.replace(/^hero_/, '').replace(/\\.png$/, '');
    if (normalizeStr(fileBase).includes(key)) {
      return path;
    }
  }

  return undefined;
}

` + content.slice(insertPoint);

// Replace getHeroPortrait body
const oldFunc = `export function getHeroPortrait(nameOrId: string, faction?: string): string | undefined {
  if (!nameOrId) return undefined;

  // Intentar con facción primero (usando id como clave de archivo)
  if (faction) {
    const prefixes = FACTION_PREFIX_MAP[faction] || [faction.toLowerCase()];
    for (const prefix of prefixes) {
      // Intentar con id primero (los archivos usan números o nombres normalizados)
      const pathById = \`/src/assets/icons/heroes/hero_\${prefix}_\${nameOrId.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png\`;
      // Intentar con nombre normalizado simple
      const normalizedName = nameOrId.toLowerCase()
        .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_').replace(/^_|_$/g, '');
      const pathByName = \`/src/assets/icons/heroes/hero_\${prefix}_\${normalizedName}.png\`;
      // Devolver la ruta basada en id (más confiable para archivos con números)
      return pathById;
    }
  }

  // Fallback sin facción
  const normalizedName = nameOrId.toLowerCase()
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_').replace(/^_|_$/g, '');
  return \`/src/assets/icons/heroes/hero_\${normalizedName}.png\`;
}`;

const newFunc = `export function getHeroPortrait(nameOrId: string, faction?: string): string | undefined {
  if (!nameOrId) return undefined;

  const found = findHeroImage(nameOrId, faction);
  if (found) return found;

  const key = normalizeStr(nameOrId);
  if (faction) {
    const prefixes = FACTION_PREFIX_MAP[faction] || [faction.toLowerCase()];
    for (const prefix of prefixes) {
      const path = \`/src/assets/icons/heroes/hero_\${prefix}_\${key}.png\`;
      if (heroImageModules[path]) return path;
    }
  }

  return \`/src/assets/icons/heroes/hero_\${key}.png\`;
}`;

writeFileSync(filePath, newContent.replace(oldFunc, newFunc), 'utf8');
console.log('Updated heroAssetsData.ts');
