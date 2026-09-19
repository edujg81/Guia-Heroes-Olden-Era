const http = require("http");

const endpoints = [
  "/api/heroes",
  "/api/units",
  "/api/spells",
  "/api/skills",
  "/api/subclasses",
  "/api/abilities",
  "/api/artifacts",
  "/api/buildings",
  "/api/map-objects",
  "/api/faction-laws"
];

async function fetchJson(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5176${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try {
          resolve({ path, data: JSON.parse(data), status: res.statusCode });
        } catch (e) {
          resolve({ path, data: null, error: e.message, status: res.statusCode });
        }
      });
    }).on("error", (e) => resolve({ path, error: e.message }));
  });
}

async function main() {
  console.log("Fetching all API data...\n");
  
  const results = await Promise.all(endpoints.map(fetchJson));
  
  for (const result of results) {
    if (result.error) {
      console.log(`${result.path}: ERROR - ${result.error}`);
      continue;
    }
    if (!result.data) {
      console.log(`${result.path}: No JSON data`);
      continue;
    }
    
    if (Array.isArray(result.data)) {
      console.log(`\n=== ${result.path} ===`);
      console.log(`Total items: ${result.data.length}`);
      
      if (result.data.length > 0) {
        console.log(`Sample item keys: ${Object.keys(result.data[0]).join(", ")}`);
        console.log(`Sample item:`);
        console.log(JSON.stringify(result.data[0], null, 2).slice(0, 1500));
      }
    } else if (typeof result.data === "object") {
      console.log(`\n=== ${result.path} ===`);
      console.log(`Keys: ${Object.keys(result.data).join(", ")}`);
    }
  }
}

main();