const http = require('node:http');

const BASE_URL = 'http://localhost:5176';
const collections = [
  { path: '/api/heroes', detail: '/api/heroes/' },
  { path: '/api/units', detail: '/api/units/' },
  { path: '/api/spells', detail: '/api/spells/' },
  { path: '/api/skills', detail: '/api/skills/' },
  { path: '/api/subclasses', detail: '/api/subclasses/' },
  { path: '/api/abilities', detail: '/api/abilities/' },
  { path: '/api/artifacts', detail: '/api/artifacts/' },
  { path: '/api/buildings', detail: '/api/buildings/' },
  { path: '/api/map-objects', detail: '/api/map-objects/' },
  { path: '/api/faction-laws', detail: '/api/faction-laws/' },
];

function getJson(path) {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${path}`, (response) => {
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
          resolve({ status: response.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: response.statusCode, data: null, body: body.slice(0, 300) });
        }
      });
    }).on('error', (error) => {
      resolve({ status: null, data: null, error: error.message });
    });
  });
}

(async () => {
  for (const collection of collections) {
    const catalog = await getJson(collection.path);
    console.log(`\n=== ${collection.path} ===`);
    if (!Array.isArray(catalog.data)) {
      console.log(`catalog status=${catalog.status} error=${catalog.error || 'invalid JSON'}`);
      continue;
    }
    console.log(`catalog count=${catalog.data.length}`);

    for (const item of catalog.data.slice(0, 3)) {
      const detail = await getJson(`${collection.detail}${encodeURIComponent(item.id)}`);
      console.log(`detail ${item.id}: status=${detail.status}`);
      if (detail.data && typeof detail.data === 'object') {
        console.log(`  keys=${Object.keys(detail.data).join(', ')}`);
        console.log(JSON.stringify(detail.data, null, 2).slice(0, 1800));
      } else {
        console.log(`  ${detail.error || detail.body || 'invalid JSON'}`);
      }
    }
  }
})();
