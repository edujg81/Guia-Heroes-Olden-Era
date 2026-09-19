import { ALL_HEROES_FLAT_LIST } from './src/data/heroesData.ts';
import { getHeroPortrait } from './src/data/heroAssetsData.ts';

function normalizeName(name: string): string {
  return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/['’\-_]/g, '').trim();
}

function fetchHeroDetails(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const http = await import('http');
    http.default.get(`http://localhost:5176/api/heroes/${id}`, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

async function compareHero(apiHero: any, localHero: any) {
  console.log(`\n=== Comparing ${localHero.name} (${localHero.id}) ===`);
  
  // Fetch detailed API data
  let apiDetails;
  try {
    apiDetails = await fetchHeroDetails(apiHero.id);
  } catch (e) {
    console.log(`  ERROR fetching API details for ${apiHero.id}: ${e.message}`);
    return;
  }
  
  const hero = apiDetails.hero;
  
  // Check basic fields that should match
  console.log(`  Name match: ${apiHero.name === localHero.name} (API: "${apiHero.name}", Local: "${localHero.name}")`);
  console.log(`  Faction match: ${apiHero.faction === localHero.faction} (API: "${apiHero.faction}", Local: "${localHero.faction}")`);
  
  // Map API classDisplay to local heroClass (approximate)
  const classMap: Record<string, string> = {
    'Ejecutor': 'Adalid',
    'Heraldo': 'Adalid', 
    'Juramentado': 'Juramentado',
    'Caballero': 'Caballero',
    'Clérigo': 'Clérigo',
    'Explorador / Apoyo': 'Explorador / Apoyo',
    'Principal Mágico': 'Principal Mágico',
    'Principal Físico': 'Principal Físico',
    'Secundario & Logística': 'Secundario & Logística',
    'Apertura Rápida Día 1': 'Apertura Rápida Día 1'
  };
  
  const mappedClass = classMap[apiHero.classDisplay] || apiHero.classDisplay;
  console.log(`  Hero Class match: ${mappedClass === localHero.heroClass} (API classDisplay: "${apiHero.classDisplay}" → mapped: "${mappedClass}", Local: "${localHero.heroClass}")`);
  
  // Check stats (API returns strings, local returns numbers)
  const apiAttack = parseInt(hero.attack);
  const apiDefence = parseInt(hero.defence);
  const apiSpellPower = parseInt(hero.spellPower);
  const apiKnowledge = parseInt(hero.knowledge);
  
  console.log(`  Attack match: ${apiAttack === localHero.statGrowth?.attack} (API: "${hero.attack}" → ${apiAttack}, Local: ${localHero.statGrowth?.attack})`);
  console.log(`  Defence match: ${apiDefence === localHero.statGrowth?.defense} (API: "${hero.defence}" → ${apiDefence}, Local: ${localHero.statGrowth?.defense})`);
  console.log(`  SpellPower match: ${apiSpellPower === localHero.statGrowth?.spellPower} (API: "${hero.spellPower}" → ${apiSpellPower}, Local: ${localHero.statGrowth?.spellPower})`);
  console.log(`  Knowledge match: ${apiKnowledge === localHero.statGrowth?.knowledge} (API: "${hero.knowledge}" → ${apiKnowledge}, Local: ${localHero.statGrowth?.knowledge})`);
  
  // Check specialization
  console.log(`  Specialization match: ${hero.specializationName === localHero.specialtyName} (API: "${hero.specializationName}", Local: "${localHero.specialtyName}")`);
  
  // Check initial skills (API has objects, local has strings)
  const apiSkillNames = hero.startingSkills?.map((s: any) => s.skillName) || [];
  const localSkillNames = localHero.initialSkills || [];
  console.log(`  Starting Skills count: API=${apiSkillNames.length}, Local=${localSkillNames.length}`);
  if (apiSkillNames.length > 0 || localSkillNames.length > 0) {
    console.log(`    API skills: ${apiSkillNames.join(', ')}`);
    console.log(`    Local skills: ${localSkillNames.join(', ')}`);
  }
  
  // Check initial army (API has objects, local has formatted string)
  const apiArmyDesc = hero.startingArmy?.map((a: any) => `${a.unitName} (${a.countInterval})`).join(', ') || '';
  console.log(`  Starting Army: API="${apiArmyDesc}", Local="${localHero.initialArmy}"`);
  
  // Check for missing fields in API that are in local
  console.log(`  Has idealSkillBuild in API: ${!!hero.idealSkillBuild} (Local length: ${localHero.idealSkillBuild?.length || 0})`);
  if (localHero.idealSkillBuild && localHero.idealSkillBuild.length > 0) {
    console.log(`    Local idealSkillBuild: ${localHero.idealSkillBuild.join(', ')}`);
  }
  
  console.log(`  Has tacticalPlaystyle in API: ${!!hero.tacticalPlaystyle} (Local: "${localHero.tacticalPlaystyle?.substring(0, 50) ?? ''}...")`);
  console.log(`  Has synergyCombo in API: ${!!hero.synergyCombo} (Local: "${localHero.synergyCombo ?? ''}")`);
  console.log(`  Has day1Action in API: ${!!hero.day1Action} (Local: "${localHero.day1Action ?? ''}")`);
  
  // Check title, role, tierRank, recommendedStartingTier (only in local)
  console.log(`  Local title: "${localHero.title ?? ''}"`);
  console.log(`  Local role: "${localHero.role ?? ''}"`);
  console.log(`  Local tierRank: "${localHero.tierRank ?? ''}"`);
  console.log(`  Local recommendedStartingTier: "${localHero.recommendedStartingTier ?? ''}"`);
  
  // Summary of missing API fields
  const missingInAPI = [];
  if (!hero.idealSkillBuild) missingInAPI.push('idealSkillBuild');
  if (!hero.tacticalPlaystyle) missingInAPI.push('tacticalPlaystyle');
  if (!hero.synergyCombo) missingInAPI.push('synergyCombo');
  if (!hero.day1Action) missingInAPI.push('day1Action');
  
  if (missingInAPI.length > 0) {
    console.log(`  ⚠️  MISSING in API: ${missingInAPI.join(', ')}`);
  }
  
  // Check for extra fields in API that might be useful
  const extraInAPI = [];
  if (hero.description) extraInAPI.push('description');
  if (hero.motto) extraInAPI.push('motto');
  if (hero.statLabels) extraInAPI.push('statLabels');
  if (hero.startingSpells) extraInAPI.push('startingSpells');
  
  if (extraInAPI.length > 0) {
    console.log(`  ℹ️  EXTRA in API: ${extraInAPI.join(', ')}`);
  }
}

async function main() {
  // Fetch API catalog
  console.log('Fetching API hero catalog...');
  const http = await import('http');
  const catalogRes = await new Promise<string>((resolve, reject) => {
    http.default.get("http://localhost:5176/api/heroes", (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
  
  const apiCatalog = JSON.parse(catalogRes);
  console.log(`API catalog contains ${apiCatalog.length} heroes`);
  
  // Check local hero count
  console.log(`Local heroes data contains ${ALL_HEROES_FLAT_LIST.length} heroes`);
  
  // Create a map of local heroes by normalized name for easy lookup
  const localHeroesByName = new Map<string, any>();
  ALL_HEROES_FLAT_LIST.forEach(hero => {
    const normName = normalizeName(hero.name);
    localHeroesByName.set(normName, hero);
    // Also store by id for direct match
    localHeroesByName.set(hero.id.toLowerCase(), hero);
  });
  
  // Compare each hero in API catalog
  console.log('\nStarting hero-by-hero comparison...');
  let matchCount = 0;
  let mismatchCount = 0;
  
  for (const apiHero of apiCatalog) {
    const normName = normalizeName(apiHero.name);
    const localHero = localHeroesByName.get(normName) || localHeroesByName.get(apiHero.id.toLowerCase());
    
    if (!localHero) {
      console.log(`\n❌ NO LOCAL MATCH for API hero: ${apiHero.name} (${apiHero.id})`);
      mismatchCount++;
      continue;
    }
    
    await compareHero(apiHero, localHero);
    matchCount++;
    
    // Limit output for now - remove this break to process all heroes
    if (matchCount >= 5) break;
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Processed: ${matchCount} heroes`);
  console.log(`Matches: ${matchCount}`);
  console.log(`Mismatches: ${mismatchCount}`);
}

main().catch(console.error);