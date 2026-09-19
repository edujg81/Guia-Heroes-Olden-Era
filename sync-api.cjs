// =====================================================================
// GENERADOR DE SINCRONIZACIÓN API → LOCAL
// Fuente de verdad: http://localhost:5176
// Preserva campos locales extendidos (idealSlot, metaTier, synergyTags, etc.)
// =====================================================================
const http = require('http');
const fs = require('fs');

const BASE = 'http://localhost:5176';
const ENDPOINTS = [
  { path: '/api/artifacts', file: 'src/data/artifactsData.ts', count: 298, interface: 'ApiArtifact' },
  { path: '/api/abilities', file: 'src/data/abilitiesData.ts', count: 337, interface: 'ApiAbility' },
  { path: '/api/buildings', file: 'src/data/buildingsData.ts', count: 207, interface: 'ApiBuilding' },
  { path: '/api/map-objects', file: 'src/data/mapObjectsData.ts', count: 201, interface: 'ApiMapObject' },
];

function fetchJson(p) {
  return new Promise((resolve) => {
    http.get(`${BASE}${p}`, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve({ ok: true, data: JSON.parse(body) }); }
        catch { resolve({ ok: false, error: body.slice(0, 200) }); }
      });
    }).on('error', e => resolve({ ok: false, error: e.message }));
  });
}

(async () => {
  console.log('=== SINCRONIZACIÓN API → LOCAL ===');
  for (const ep of ENDPOINTS) {
    const res = await fetchJson(ep.path);
    if (!res.ok) {
      console.log(`${ep.path}: ERROR - ${res.error}`);
      continue;
    }
    const arr = Array.isArray(res.data) ? res.data : [];
    console.log(`${ep.path}: ${arr.length} registros (esperado ${ep.count}) → ${ep.file}`);
    // Escribir archivo completo con datos reales de la API
    // Preserva campos locales existentes por ID
    writeDataFile(ep.file, arr, ep.interface, readExistingData(ep.file));
  }
  console.log('=== SINCRONIZACIÓN COMPLETADA ===');
})();
