const fs = require('fs');

async function main() {
  console.log('Fetching canonical units from oldeneradb...');
  const res = await fetch('https://oldeneradb.com/data/lang/spanish/units_data.js');
  const text = await res.text();
  const fn = new Function(text + '; return UNITS_DATA;');
  const dbUnits = fn();
  console.log(`Loaded ${dbUnits.length} canonical units.`);

  const mapMove = (m) => m === 'fly' ? 'Volador' : (m === 'teleport' ? 'Traslación' : 'Terrestre');
  const mapRange = (r) => r === 'ranged' ? 'A distancia' : (r === 'reach' ? 'Largo alcance' : 'Melé');
  const mapCost = (c) => {
    const res = { gold: c.gold || 0 };
    if (c.gemstones) res.gems = c.gemstones;
    if (c.crystals) res.crystal = c.crystals;
    if (c.mercury) res.mercury = c.mercury;
    return res;
  };

  const FACTION_MAP = {
    temple: {
      dbFaction: 'Temple',
      exportName: 'TEMPLE_UNITS',
      file: 'src/data/templeData.ts',
      dwellings: [
        'Barracones de Infantería',
        'Campo de Tiro de Ballesteros',
        'Nido de Grifos',
        'Capilla de Gota Solar',
        'Hipódromo',
        'Basílica del Umbral',
        'Forja Radiante'
      ],
      icons: ['Shield', 'Crosshair', 'Feather', 'Sparkles', 'Flame', 'Zap', 'Crown']
    },
    necropolis: {
      dbFaction: 'Necropolis',
      exportName: 'NECROPOLIS_UNITS',
      file: 'src/data/necropolisData.ts',
      dwellings: [
        'Criptas y Tumbas',
        'Pabellón Silencioso',
        'Perrera de Sabuesos',
        'Cámara de los Ladrones de Tumbas',
        'Mansión Intemporal',
        'Tumba de Guerreros',
        'Château de los Festines'
      ],
      icons: ['Shield', 'Feather', 'Axe', 'Crosshair', 'Sparkles', 'Flame', 'Crown']
    },
    dungeon: {
      dbFaction: 'Dungeon',
      exportName: 'DUNGEON_UNITS',
      file: 'src/data/dungeonData.ts',
      dwellings: [
        'Cubil (Warren)',
        'Refugio (Safehouse)',
        'Anfiteatro (Amphitheatre)',
        'Laberinto (Labyrinth)',
        'Voces Silenciadas (Stilled Voices)',
        'Hogar Ctónico (Chthonic Home)',
        'Palacio de las Cavernas (Cave Palace)'
      ],
      icons: ['Eye', 'Zap', 'Crosshair', 'Shield', 'Crosshair', 'Flame', 'Crown']
    },
    grove: {
      dbFaction: 'Grove',
      exportName: 'ARBOLEDA_UNITS',
      file: 'src/data/arboledaData.ts',
      dwellings: [
        'Cabañas de Faunos',
        'Semillero de Lúpulo',
        'Círculo de Menhires',
        'Estanque Floreciente',
        'Choza de Maderahongo',
        'Guarida del Trueno',
        'Pira'
      ],
      icons: ['Crosshair', 'Feather', 'Shield', 'Crosshair', 'Sparkles', 'Flame', 'Crown']
    },
    hive: {
      dbFaction: 'Hive',
      exportName: 'ENJAMBRE_UNITS',
      file: 'src/data/enjambreData.ts',
      dwellings: [
        'Vivienda Descuidada',
        'Guarida de Carroña',
        'Nido de Papel',
        'Zigurat Quitináceo',
        'Cúspide',
        'Madrigueras de Almas Ardientes',
        'Torre del Amor'
      ],
      icons: ['Eye', 'Axe', 'Feather', 'Shield', 'Zap', 'Flame', 'Crown']
    },
    schism: {
      dbFaction: 'Schism',
      exportName: 'CISMA_UNITS',
      file: 'src/data/cismaData.ts',
      dwellings: [
        'Rito Menor de Invocación',
        'Aguja de los Cultistas',
        "Establos de Aga'shoth",
        'Rito Inquietante de Invocación',
        'Casa de las Cadenas',
        'Mansión Hinchada',
        'Santuario del Abismo'
      ],
      icons: ['Feather', 'Sparkles', 'Shield', 'Zap', 'Crosshair', 'Crosshair', 'Crown']
    }
  };

  for (const [key, cfg] of Object.entries(FACTION_MAP)) {
    console.log(`\nProcessing ${key} (${cfg.dbFaction})...`);
    const fUnits = dbUnits.filter(u => u.faction === cfg.dbFaction);

    // Group by tier 1..7
    const tiersData = [];
    for (let t = 1; t <= 7; t++) {
      const uBase = fUnits.find(u => u.tier === t && u.variant === 'base');
      const uBranchA = fUnits.find(u => u.tier === t && u.variant === 'upg');
      const uBranchB = fUnits.find(u => u.tier === t && u.variant === 'alt');

      if (!uBase || !uBranchA || !uBranchB) {
        console.error(`Missing tier ${t} units for ${cfg.dbFaction}`);
        continue;
      }

      const dwelling = cfg.dwellings[t - 1];
      const iconName = cfg.icons[t - 1];

      const cleanStr = (s) => (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n+/g, ' ');

      const formatVariantAbilities = (u) => {
        const list = [];
        (u.passives || []).forEach(p => {
          const desc = p.description ? `: ${cleanStr(p.description)}` : '';
          list.push(`${cleanStr(p.name)}${desc}`);
        });
        (u.abilities || []).forEach(a => {
          const desc = a.description ? `: ${cleanStr(a.description)}` : '';
          list.push(`[Activa] ${cleanStr(a.name)}${desc}`);
        });
        return list;
      };

      const makeVariantObj = (u, varId, label) => {
        const mv = mapMove(u.moveType);
        const at = mapRange(u.rangeType);
        const cost = mapCost(u.cost || {});
        const stats = {
          hp: u.stats.hp,
          attack: u.stats.attack,
          defense: u.stats.defense,
          damage: `'${u.stats.damageMin}-${u.stats.damageMax}'`,
          speed: u.stats.speed,
          initiative: u.stats.initiative,
          attackType: `'${at}'`,
          weeklyGrowth: u.weeklyGrowth
        };
        if (u.rangeType === 'ranged' && u.stats.shots) {
          stats.shots = u.stats.shots;
        }

        const abList = formatVariantAbilities(u);

        return `      ${varId}: {
        id: '${varId === 'branchA' ? 'branch_a' : (varId === 'branchB' ? 'branch_b' : 'base')}',
        branchLabel: '${label}',
        name: '${cleanStr(u.name)}',
        nameEn: '${cleanStr(u.nameEn)}',
        subtitle: '${cleanStr(u.role || u.nameEn)}',
        dwellingName: '${cleanStr(dwelling)}',
        unitClass: '${u.creatureTypeLabel}',
        movementType: '${mv}',
        attackType: '${at}',
        squadValue: ${u.squadValue || 0},
        cost: ${JSON.stringify(cost).replace(/"/g, '')},
        stats: {
          hp: ${stats.hp},
          attack: ${stats.attack},
          defense: ${stats.defense},
          damage: ${stats.damage},
          speed: ${stats.speed},
          initiative: ${stats.initiative},
          attackType: ${stats.attackType},
          weeklyGrowth: ${stats.weeklyGrowth}${stats.shots ? `,\n          shots: ${stats.shots}` : ''}
        },
        combatStance: '${at} - Movilidad ${mv}',
        abilities: [
${abList.map(a => `          '${a}',`).join('\n')}
        ],
        strengths: 'Especialista de Tier ${t} con ${u.creatureTypeLabel} y movimiento ${mv}.',
        tacticalUsage: 'Despliegue táctico optimizado según iniciativa (${u.stats.initiative}) y velocidad (${u.stats.speed}).',
        idealMatchup: '${at === 'A distancia' ? 'Objetivos lentos o unidades sin cobertura' : (at === 'Largo alcance' ? 'Líneas enemigas sin contraataque directo' : 'Unidades vulnerables en combate cuerpo a cuerpo')}',
        synergyLaws: ['Doctrina de Combate de Tier ${t}']
      }`;
      };

      const unitSummary = `  // TIER ${t}: ${cleanStr(uBase.name).toUpperCase()} (${cleanStr(uBase.nameEn).toUpperCase()})
  {
    tier: ${t},
    name: '${cleanStr(uBase.name)}',
    upgradeName: '${cleanStr(uBranchA.name)}',
    altUpgradeName: '${cleanStr(uBranchB.name)}',
    unitClass: '${uBase.creatureTypeLabel}',
    movementType: '${mapMove(uBase.moveType)}',
    attackType: '${mapRange(uBase.rangeType)}',
    squadValue: ${uBase.squadValue || 0},
    dwelling: '${cleanStr(dwelling)}',
    role: '${cleanStr(uBase.role || `${mapRange(uBase.rangeType)} / ${uBase.creatureTypeLabel}`)}',
    speed: ${uBase.stats.speed},
    combatStance: '${mapRange(uBase.rangeType)} (${mapMove(uBase.moveType)})',
    abilities: [
${formatVariantAbilities(uBase).slice(0, 4).map(a => `      '${a}',`).join('\n')}
    ],
    strengths: 'Unidad base de Tier ${t} de ${cfg.dbFaction} (${uBase.creatureTypeLabel}, ${mapMove(uBase.moveType)}).',
    tacticalUsage: 'Aprovechar sus ${uBase.stats.speed} puntos de velocidad y ${uBase.stats.initiative} de iniciativa.',
    iconName: '${iconName}',
    variants: {
${makeVariantObj(uBase, 'base', 'Base')},
${makeVariantObj(uBranchA, 'branchA', 'Rama A')},
${makeVariantObj(uBranchB, 'branchB', 'Rama B')}
    },
    comparison: {
      summary: 'La Rama A (${cleanStr(uBranchA.name)}) frente a la Rama B (${cleanStr(uBranchB.name)}) define el enfoque táctico.',
      whenToPickA: 'Cuando se prioriza ${uBranchA.stats.attack > uBranchB.stats.attack ? 'mayor pegada ofensiva' : (uBranchA.stats.speed > uBranchB.stats.speed ? 'mayor velocidad de maniobra' : 'su set de habilidades de Rama A')}.',
      whenToPickB: 'Cuando se requiere ${uBranchB.stats.defense > uBranchA.stats.defense ? 'mayor resistencia defensiva' : (uBranchB.stats.initiative > uBranchA.stats.initiative ? 'iniciativa superior' : 'su set de habilidades de Rama B')}.',
      synergyHeroA: 'Héroes orientados a asalto y ritmo dinámico.',
      synergyHeroB: 'Héroes orientados a control o aguante táctico.'
    }
  }`;

      tiersData.push(unitSummary);
    }

    const generatedArrayCode = `export const ${cfg.exportName}: UnitInfo[] = [\n` + tiersData.join(',\n\n') + '\n];\n';

    // Replace in file
    const fileContent = fs.readFileSync(cfg.file, 'utf8');
    const startIdx = fileContent.indexOf(`export const ${cfg.exportName}`);
    if (startIdx === -1) {
      console.error(`Could not find export const ${cfg.exportName} in ${cfg.file}`);
      continue;
    }

    // Find end index (next export)
    const nextExportIdx = fileContent.indexOf('export const ', startIdx + 20);
    if (nextExportIdx === -1) {
      console.error(`Could not find next export after ${cfg.exportName} in ${cfg.file}`);
      continue;
    }

    const newContent = fileContent.slice(0, startIdx) + generatedArrayCode + '\n' + fileContent.slice(nextExportIdx);
    fs.writeFileSync(cfg.file, newContent, 'utf8');
    console.log(`Successfully updated ${cfg.file}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
