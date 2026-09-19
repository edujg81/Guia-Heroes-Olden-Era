import http from "http";

http.get("http://localhost:5176/api/heroes/unfrozen_hero_1", (res) => {
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify({
        status: res.statusCode,
        keys: Object.keys(json),
        hero: json,
        hasIdealSkillBuild: Boolean(json.idealSkillBuild),
        skillCount: json.idealSkillBuild ? json.idealSkillBuild.length : 0
      }, null, 2));
    } catch (e) {
      console.error("Parse error:", e.message);
      console.log(data.slice(0, 1000));
    }
  });
}).on("error", (e) => console.error("Connection error:", e.message));