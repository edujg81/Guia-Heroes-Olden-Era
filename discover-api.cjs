const http = require("http");

// Check API root
http.get("http://localhost:5176/api", (res) => {
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => {
    console.log("=== /api ===");
    console.log("Status:", res.statusCode);
    console.log("Content-Type:", res.headers["content-type"]);
    console.log("Body (first 3000 chars):");
    console.log(data.slice(0, 3000));
  });
}).on("error", (e) => console.error("Error:", e.message));

// Check for swagger
http.get("http://localhost:5176/swagger.json", (res) => {
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => {
    console.log("\n=== /swagger.json ===");
    console.log("Status:", res.statusCode);
    if (res.statusCode === 200) {
      try {
        const json = JSON.parse(data);
        console.log("Paths:", Object.keys(json.paths || {}));
      } catch (e) {
        console.log("Not JSON, first 500 chars:", data.slice(0, 500));
      }
    }
  });
}).on("error", (e) => console.error("Swagger error:", e.message));

// Check for routes
http.get("http://localhost:5176/routes", (res) => {
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => {
    console.log("\n=== /routes ===");
    console.log("Status:", res.statusCode);
    console.log(data.slice(0, 1000));
  });
}).on("error", (e) => console.error("Routes error:", e.message));