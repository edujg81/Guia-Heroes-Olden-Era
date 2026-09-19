const http = require('node:http');

const BASE_URL = 'http://localhost:5176';
const endpoints = [
  '/api/heroes',
  '/api/units',
  '/api/spells',
  '/api/skills',
  '/api/subclasses',
  '/api/abilities',
  '/api/artifacts',
  '/api/buildings',
  '/api/map-objects',
  '/api/faction-laws',
];

function get(path) {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${path}`, (response) => {
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        let data;
        try {
          data = JSON.parse(body);
        } catch (error) {
          console.log(`\n=== ${path} ===`);
          console.log(`status=${response.statusCode} non-json bytes=${body.length}`);
          console.log(body.slice(0, 500));
          resolve();
          return;
        }

        console.log(`\n=== ${path} ===`);
        console.log(`status=${response.statusCode}`);
        console.log(`type=${Array.isArray(data) ? 'array' : typeof data}`);
        if (Array.isArray(data)) {
          console.log(`count=${data.length}`);
          if (data.length > 0) {
            console.log(`keys=${Object.keys(data[0]).join(', ')}`);
            console.log(JSON.stringify(data[0], null, 2));
          }
        } else {
          console.log(`keys=${Object.keys(data || {}).join(', ')}`);
          console.log(JSON.stringify(data, null, 2).slice(0, 5000));
        }
        resolve();
      });
    }).on('error', (error) => {
      console.log(`\n=== ${path} ===`);
      console.log(`error=${error.message}`);
      resolve();
    });
  });
}

(async () => {
  for (const path of endpoints) {
    await get(path);
  }
})();
