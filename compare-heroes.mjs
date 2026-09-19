import http from "http";

function fetchHero(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5176/api/heroes/${id}`, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

async function main() {
  // Fetch a sample of heroes from different factions
  const ids = [
    "demon_hero_1", "demon_hero_2", "dungeon_hero_1", "dungeon_hero_2",
    "human_hero_1", "human_hero_2", "nature_hero_1", "nature_hero_2",
    "necromancer_hero_1", "necromancer_hero_2", "unfrozen_hero_1", "unfrozen_hero_2"
  ];
  for (const id of ids) {
    try {
      const hero = await fetchHero(id);
      console.log(`=== ${id} (${hero.name}) ===`);
      console.log("Keys:", Object.keys(hero).join(", "));
      console.log("Faction:", hero.faction, "Class:", hero.classDisplay);
      console.log("Attack:", hero.attack, "Defence:", hero.defence, "SpellPower:", hero.spellPower, "Knowledge:", hero.knowledge);
      console.log("Specialization:", hero.specializationName);
      console.log("StartingSkills:", hero.startingSkills ? hero.startingSkills.map((s: any) => s.skillName).join(", ") : "None");
      console.log("StartingSpells:", hero.startingSpells ? hero.startingSpells.map((s: any) => s.spellName).join(", ") : "None");
      console.log("StartingArmy:", hero.startingArmy ? hero.startingArmy.map((a: any) => `${a.unitName} (${a.countInterval})`).join(", ") : "None");
      console.log("Has idealSkillBuild:", Boolean(hero.idealSkillBuild));
      console.log("Has statGrowth:", Boolean(hero.statGrowth));
      console.log("Has tacticalPlaystyle:", Boolean(hero.tacticalPlaystyle));
      console.log("Has synergyCombo:", Boolean(hero.synergyCombo));
      console.log("Has day1Action:", Boolean(hero.day1Action));
      console.log("");
    } catch (e: any) {
      console.error(`Error fetching ${id}:`, e.message);
    }
  }
}

main();