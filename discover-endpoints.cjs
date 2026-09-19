const http = require("http");

const endpoints = [
  "/api/heroes",
  "/api/heroes/unfrozen_hero_1",
  "/api/units",
  "/api/units/dragon",
  "/api/spells",
  "/api/skills",
  "/api/factions",
  "/api/artifacts",
  "/api/buildings",
  "/api/laws",
  "/api/subclasses",
  "/api/abilities",
  "/api/map-objects",
];

async function checkEndpoint(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5176${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        let isJson = false;
        let parsed = null;
        try {
          parsed = JSON.parse(data);
          isJson = true;
        } catch (e) {
          // Not JSON
        }
        resolve({ path, status: res.statusCode, isJson, contentType: res.headers["content-type"], data: isJson ? parsed : data.slice(0, 200) });
      });
    }).on("error", (e) => resolve({ path, error: e.message }));
  });
}

async function main() {
  console.log("Discovering API endpoints...\n");
  for (const endpoint of endpoints) {
    const result = await checkEndpoint(endpoint);
    if (result.error) {
      console.log(`${result.path}: ERROR - ${result.error}`);
    } else if (result.isJson) {
      if (Array.isArray(result.data)) {
        console.log(`${result.path}: ${result.status} - JSON Array (${result.data.length} items)`);
        if (result.data.length > 0) {
          console.log(`  Keys: ${Object.keys(result.data[0]).join(", ")}`);
        }
      } else if (typeof result.data === "object" && result.data !== null) {
        console.log(`${result.path}: ${result.status} - JSON Object`);
        console.log(`  Keys: ${Object.keys(result.data).join(", ")}`);
      } else {
        console.log(`${result.path}: ${result.status} - JSON: ${JSON.stringify(result.data).slice(0, 100)}`);
      }
    } else {
      console.log(`${result.path}: ${result.status} - ${result.contentType} (HTML/Other)`);
    }
  }
}

main();