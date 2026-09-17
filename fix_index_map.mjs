import { readFileSync, writeFileSync } from 'node:fs';

const filePath = 'd:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data/heroAssetsData.ts';
let content = readFileSync(filePath, 'utf8');

// Insertar el mapa de índices de facciones después de FACTION_PREFIX_MAP
const insertAfter = `const FACTION_PREFIX_MAP: Record<string, string[]> = {`;
const insertPoint = content.indexOf('};', content.indexOf(insertAfter)) + 2;

const indexMap = `

// Mapeo de orden canónico de héroes por facción a índices de archivo PNG
// (los archivos usan hero_[prefix]_[número]_[nombre_normalizado].png)
const HERO_ASSET_INDEX_MAP: Record<string, Record<string, number>> = {
  Mazmorra: {
    'hero-enatee': 1, 'hero-devir': 6, 'hero-tellaris': 2, 'hero-kieran': 4,
    'hero-mouaren': 5, 'hero-creta': 7, 'hero-rhea': 8, 'hero-aguijon': 9,
    'hero-gleard': 9, 'hero-zakron': 11, 'hero-typhona': 16, 'hero-motley': 13,
    'hero-lodos': 18, 'hero-deira': 12, 'hero-kelarr': 10, 'hero-sunny': 17,
    'hero-ylwari': 14, 'hero-glastor': 15,
  },
  Templo: {
    'hero-viejo-lord-mandall': 9, 'hero-kestrel': 4, 'hero-keandra': 7,
    'hero-john-johnson': 3, 'hero-leon-manospegajosas': 8, 'hero-ister': 1,
    'hero-aeos-exaltada': 5, 'hero-lord-edgar': 8, 'hero-el-hereje-avis': 6,
    'hero-julius': 14, 'hero-zenith': 12, 'hero-merry-elias': 13,
    'hero-pip': 11, 'hero-clarissa': 18, 'hero-anastasia-la-mansa': 16,
    'hero-vesper': 15, 'hero-lia-desatada': 7, 'hero-nadir': 17,
  },
  Arboleda: {
    'hero-eith': 1, 'hero-gorel-punta-de-lanza': 2, 'hero-colajengibre': 3,
    'hero-viejo-peregrino': 4, 'hero-octavia': 5, 'hero-mreowa': 6,
    'hero-faleor': 7, 'hero-seductora-sha': 8, 'hero-tia-daliar': 9,
    'hero-vatawna': 10, 'hero-anciano-tsskish': 11, 'hero-aeliniel': 3,
    'hero-glacia': 13, 'hero-vim': 14, 'hero-halon': 15,
    'hero-echolily': 16, 'hero-suli': 17, 'hero-el-juglar': 13,
  },
  Necrópolis: {
    'hero-baluarte': 1, 'hero-rey-de-reyes': 2, 'hero-onkos': 3,
    'hero-tarius': 4, 'hero-marl': 7, 'hero-laura': 15,
    'hero-kel-ghul': 4, 'hero-natalida': 5, 'hero-artorius-veritas': 6,
    'hero-funerella': 17, 'hero-lord-rufus': 16, 'hero-oona-tejesombras': 14,
    'hero-maestro-klastor': 13, 'hero-milossa-la-dorada': 18,
    'hero-adahn': 11, 'hero-zam': 9, 'hero-ethric': 12,
    'hero-mag': 10,
  },
  Enjambre: {
    'hero-abigor-enjambre': 1, 'hero-curson-enjambre': 2, 'hero-zoran-enjambre': 3,
    'hero-niev-enjambre': 4, 'hero-nor-enjambre': 5, 'hero-goldentongue-enjambre': 8,
    'hero-lo-enjambre': 7, 'hero-pauper-enjambre': 18, 'hero-zixx-enjambre': 9,
    'hero-khariseth-enjambre': 13, 'hero-mila-enjambre': 15, 'hero-groo-enjambre': 14,
    'hero-bathym-enjambre': 12, 'hero-oriax-enjambre': 16, 'hero-fleu-enjambre': 10,
    'hero-leira-enjambre': 13, 'hero-tavi-enjambre': 6, 'hero-xirr-enjambre': 11,
  },
  Cisma: {
    'hero-nihil': 1, 'hero-cuerno-negro': 2, 'hero-matastala-la-blanca': 3,
    'hero-janhei': 4, 'hero-mara-matha': 5, 'hero-el-doncel-de-hierro': 6,
    'hero-walkha': 7, 'hero-urgo-el-cambiante': 4, 'hero-martir-tho': 9,
    'hero-grellekh-el-traidor': 10, 'hero-reina-de-hielo-helghat': 11,
    'hero-kwinri': 12, 'hero-la-mirada-colectiva': 13, 'hero-tolketh': 15,
    'hero-ulkuth': 15, 'hero-radavok': 16, 'hero-hermana-keiri': 12,
    'hero-dhuvri': 18,
  },
};
`;

content = content.slice(0, insertPoint) + indexMap + content.slice(insertPoint);

// Reemplazar getHeroPortrait para usar el índice primero
const oldFunc = `export function getHeroPortrait(nameOrId: string, faction?: string): string | undefined {
  if (!nameOrId) return undefined;

  // Usar findHeroImage que busca en los módulos importados
  const found = findHeroImage(nameOrId, faction);
  if (found) return found;

  // Fallback: construir ruta manualmente
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

const newFunc = `export function getHeroPortrait(nameOrId: string, faction?: string): string | undefined {
  if (!nameOrId) return undefined;

  // Intentar con índice canónico primero (más confiable para archivos con números)
  if (faction && HERO_ASSET_INDEX_MAP[faction]) {
    const indexMap = HERO_ASSET_INDEX_MAP[faction];
    const index = indexMap[nameOrId] || indexMap[nameOrId.replace('hero-', '')];
    if (index) {
      const prefixes = FACTION_PREFIX_MAP[faction] || [faction.toLowerCase()];
      for (const prefix of prefixes) {
        const path = \`/src/assets/icons/heroes/hero_\${prefix}_\${index}_\${normalizeStr(nameOrId)}.png\`;
        if (heroImageModules[path]) return path;
        // Intentar con nombre simplificado del archivo
        const fileName = \`hero_\${prefix}_\${index}_\`;
        for (const [modPath] of Object.entries(heroImageModules)) {
          if (modPath.includes(fileName)) return modPath;
        }
      }
    }
  }

  // Intentar con findHeroImage (búsqueda por coincidencia de nombre)
  const found = findHeroImage(nameOrId, faction);
  if (found) return found;

  // Fallback manual
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

writeFileSync(filePath, content.replace(oldFunc, newFunc), 'utf8');
console.log('Updated heroAssetsData.ts with index map');
