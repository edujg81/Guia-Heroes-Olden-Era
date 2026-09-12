import React, { useState, useMemo } from 'react';
import { DungeonHero, UnitInfo } from '../../../types';
import { FactionId, getFactionTheme, getHeroesForFaction, getUnitsForFaction } from '../../../data/factionDataProvider';
import { TierBadge } from '../../ui/TierBadge';
import {
  Swords,
  Wand2,
  Shield,
  Sparkles,
  ArrowRightLeft,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trophy,
  Flame,
  Award,
  ChevronRight,
  RotateCcw,
  Target,
  Crown,
  HeartHandshake,
} from 'lucide-react';

interface HeroComparatorSplitScreenProps {
  initialHeroA?: DungeonHero | null;
  initialHeroB?: DungeonHero | null;
  defaultFaction?: FactionId;
  themeMode?: 'dark' | 'light';
  onBackToRoster?: () => void;
}

const FACTIONS: { id: FactionId; name: string }[] = [
  { id: 'Mazmorra', name: 'Mazmorra' },
  { id: 'Templo', name: 'Templo' },
  { id: 'Foresta', name: 'Foresta / Arboleda' },
  { id: 'Necrópolis', name: 'Necrópolis' },
  { id: 'Colmena', name: 'Colmena / Enjambre' },
  { id: 'Cisma', name: 'Cisma' },
];

export const HeroComparatorSplitScreen: React.FC<HeroComparatorSplitScreenProps> = ({
  initialHeroA,
  initialHeroB,
  defaultFaction = 'Mazmorra',
  themeMode = 'dark',
  onBackToRoster,
}) => {
  // 1. Estados de selección de facción y héroe para ambos comandantes
  const [factionA, setFactionA] = useState<FactionId>(defaultFaction);
  const [factionB, setFactionB] = useState<FactionId>(defaultFaction);

  const heroesA = useMemo(() => getHeroesForFaction(factionA), [factionA]);
  const heroesB = useMemo(() => getHeroesForFaction(factionB), [factionB]);

  const [selectedHeroIdA, setSelectedHeroIdA] = useState<string>(
    initialHeroA?.id || heroesA[0]?.id || ''
  );
  const [selectedHeroIdB, setSelectedHeroIdB] = useState<string>(
    initialHeroB?.id || heroesB[1]?.id || heroesB[0]?.id || ''
  );

  // 2. Nivel simulado de los héroes (1 a 30)
  const [simulatedLevel, setSimulatedLevel] = useState<number>(10);

  // 3. Tab activo en la vista comparativa
  const [activeTab, setActiveTab] = useState<'stats' | 'synergy' | 'verdict'>('stats');

  // Héroes seleccionados
  const heroA = useMemo(() => {
    return heroesA.find((h) => h.id === selectedHeroIdA) || heroesA[0] || null;
  }, [heroesA, selectedHeroIdA]);

  const heroB = useMemo(() => {
    return heroesB.find((h) => h.id === selectedHeroIdB) || heroesB[0] || null;
  }, [heroesB, selectedHeroIdB]);

  // Unidades de cada facción para la matriz de sinergia
  const unitsA = useMemo(() => getUnitsForFaction(factionA), [factionA]);
  const unitsB = useMemo(() => getUnitsForFaction(factionB), [factionB]);

  // Temas visuales de cada facción
  const themeA = useMemo(() => getFactionTheme(factionA, themeMode), [factionA, themeMode]);
  const themeB = useMemo(() => getFactionTheme(factionB, themeMode), [factionB, themeMode]);

  // Intercambiar posiciones entre Comandante A y Comandante B
  const handleSwapCommanders = () => {
    const tempFaction = factionA;
    const tempHeroId = selectedHeroIdA;

    setFactionA(factionB);
    setSelectedHeroIdA(selectedHeroIdB);

    setFactionB(tempFaction);
    setSelectedHeroIdB(tempHeroId);
  };

  // Presets rápidos competitivos
  const applyPreset = (presetType: 'warriorVsMage' | 'mainVsFarmeo' | 'rivalFaction' | 'metaTierS') => {
    if (presetType === 'warriorVsMage') {
      const warrior = heroesA.find((h) => h.heroType === 'Guerrero') || heroesA[0];
      const mage = heroesA.find((h) => h.heroType === 'Mago') || heroesA[1] || heroesA[0];
      if (warrior && mage) {
        setSelectedHeroIdA(warrior.id);
        setSelectedHeroIdB(mage.id);
        setFactionB(factionA);
      }
    } else if (presetType === 'mainVsFarmeo') {
      const main = heroesA.find((h) => h.role.toLowerCase().includes('principal')) || heroesA[0];
      const farmeo = heroesA.find((h) => h.role.toLowerCase().includes('apertura') || h.role.toLowerCase().includes('secundario')) || heroesA[1] || heroesA[0];
      if (main && farmeo) {
        setSelectedHeroIdA(main.id);
        setSelectedHeroIdB(farmeo.id);
        setFactionB(factionA);
      }
    } else if (presetType === 'rivalFaction') {
      // Comparar con facción contraria (e.g. Mazmorra vs Templo, Cisma vs Necrópolis)
      const rivalFaction: FactionId = factionA === 'Mazmorra' ? 'Templo' : factionA === 'Templo' ? 'Necrópolis' : 'Mazmorra';
      setFactionB(rivalFaction);
      const rivalHeroes = getHeroesForFaction(rivalFaction);
      if (rivalHeroes[0]) {
        setSelectedHeroIdB(rivalHeroes[0].id);
      }
    } else if (presetType === 'metaTierS') {
      const tierSHeroesA = heroesA.filter((h) => h.tierRank.includes('Tier S'));
      if (tierSHeroesA.length >= 2) {
        setSelectedHeroIdA(tierSHeroesA[0].id);
        setSelectedHeroIdB(tierSHeroesA[1].id);
        setFactionB(factionA);
      }
    }
  };

  // Cálculo de estadísticas dinámicas según el nivel
  const calculateHeroStats = (hero: DungeonHero | null, level: number) => {
    if (!hero) {
      return {
        attack: 0,
        defense: 0,
        spellPower: 0,
        knowledge: 0,
        mana: 0,
        physicalGrowthTotal: 0,
        magicGrowthTotal: 0,
        estimatedMorale: 1,
        estimatedLuck: 1,
      };
    }

    const isWarrior = hero.heroType === 'Guerrero';
    // Base stats canónicas: Guerreros parten con más Atq/Def, Magos con más Poder/Conocimiento
    const baseAttack = isWarrior ? 2 : 1;
    const baseDefense = isWarrior ? 2 : 1;
    const baseSpellPower = isWarrior ? 1 : 2;
    const baseKnowledge = isWarrior ? 1 : 2;

    const growth = hero.statGrowth || { attack: 25, defense: 25, spellPower: 25, knowledge: 25 };
    const levelDelta = Math.max(0, level - 1);

    // Cada punto de nivel añade probabilidad de atributo según su porcentaje de crecimiento
    const attack = baseAttack + Math.round((levelDelta * growth.attack) / 25);
    const defense = baseDefense + Math.round((levelDelta * growth.defense) / 25);
    const spellPower = baseSpellPower + Math.round((levelDelta * growth.spellPower) / 25);
    const knowledge = baseKnowledge + Math.round((levelDelta * growth.knowledge) / 25);

    const mana = knowledge * 10;
    const physicalGrowthTotal = growth.attack + growth.defense;
    const magicGrowthTotal = growth.spellPower + growth.knowledge;

    // Estimación de moral y suerte basada en especialidades o roles
    let estimatedMorale = 1;
    let estimatedLuck = 1;
    if (hero.specialtyEffect.toLowerCase().includes('moral')) estimatedMorale += 2;
    if (hero.specialtyEffect.toLowerCase().includes('suerte')) estimatedLuck += 2;
    if (isWarrior) estimatedMorale += 1;

    return {
      attack,
      defense,
      spellPower,
      knowledge,
      mana,
      physicalGrowthTotal,
      magicGrowthTotal,
      estimatedMorale,
      estimatedLuck,
    };
  };

  const statsA = useMemo(() => calculateHeroStats(heroA, simulatedLevel), [heroA, simulatedLevel]);
  const statsB = useMemo(() => calculateHeroStats(heroB, simulatedLevel), [heroB, simulatedLevel]);

  // Análisis de sinergia de unidades con el comandante
  const evaluateCreatureSynergy = (hero: DungeonHero | null, unit: UnitInfo) => {
    if (!hero) {
      return {
        level: 'none' as const,
        badge: 'Tropa Estándar',
        description: 'Se beneficia de las estadísticas generales de ataque y defensa del héroe.',
      };
    }

    const heroText = `${hero.name} ${hero.specialtyName} ${hero.specialtyEffect} ${hero.synergyCombo} ${hero.tacticalPlaystyle}`.toLowerCase();
    const unitText = `${unit.name} ${unit.upgradeName} ${unit.dwelling}`.toLowerCase();

    // 1. Sinergia Directa Especialista
    const directKeywords = unit.name.toLowerCase().split(' ').concat(unit.dwelling.toLowerCase().split(' '));
    const isDirect = directKeywords.some((kw) => kw.length > 3 && heroText.includes(kw));

    if (isDirect) {
      return {
        level: 'direct' as const,
        badge: '🌟 Sinergia Directa Especialista',
        description: `Especialidad "${hero.specialtyName}" confiere bonificaciones acumulativas exclusivas por nivel a esta criatura.`,
      };
    }

    // 2. Sinergia de Ejército Inicial (Creeping Temprano Día 1-7)
    if (hero.initialArmy.toLowerCase().includes(unit.name.toLowerCase())) {
      return {
        level: 'starter' as const,
        badge: '🛡️ Tropa de Choque Día 1',
        description: 'Forma parte del contingente inicial del héroe; permite limpieza rápida de aserraderos y minas sin demora.',
      };
    }

    // 3. Sinergia de Arquetipo
    if (hero.heroType === 'Mago' && (unit.role.toLowerCase().includes('tirador') || unit.role.toLowerCase().includes('distancia') || unit.role.toLowerCase().includes('coloso') || unit.tier >= 6)) {
      return {
        level: 'tactical' as const,
        badge: '🔮 Sinergia Mágica & Control',
        description: 'Excelente receptora de encantamientos (Aceleración, Fuerza Sagrada, Protección Sombría) potenciados por su alto Poder Mágico.',
      };
    }

    if (hero.heroType === 'Guerrero' && (unit.role.toLowerCase().includes('choque') || unit.role.toLowerCase().includes('tanque') || unit.role.toLowerCase().includes('vanguardia') || unit.tier <= 4)) {
      return {
        level: 'tactical' as const,
        badge: '⚔️ Sinergia de Choque Frontal',
        description: 'Multiplica su efectividad con la alta estadística física de Ataque y Defensa del héroe en primera línea.',
      };
    }

    return {
      level: 'standard' as const,
      badge: '🛡️ Tropa Estándar',
      description: 'Aporte regular al ejército. Beneficiaria de atributos y bonificaciones de moral estándar.',
    };
  };

  return (
    <div className="space-y-6" id="dual-commander-comparator-root">
      {/* 1. TOP HEADER & QUICK PRESET BAR */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Crown className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                Comparador Dual de Comandantes
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Contrasta 2 héroes lado a lado: compara estadísticas a distintos niveles, gráficas diferenciales superpuestas y matrices de sinergia con tropas.
            </p>
          </div>

          {/* Action Buttons: Back to Roster & Swap */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSwapCommanders}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              title="Intercambiar Comandante Alfa y Comandante Beta"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Intercambiar (A ⇄ B)</span>
            </button>

            {onBackToRoster && (
              <button
                onClick={onBackToRoster}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-amber-600/20"
              >
                <span>Volver al Roster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Level Simulator Slider & Matchup Presets */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Level Slider */}
          <div className="flex items-center gap-3 bg-black/40 px-3.5 py-2 rounded-xl border border-slate-800">
            <Sliders className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300 font-semibold whitespace-nowrap">
              Nivel Simulado:
            </span>
            <input
              type="range"
              min={1}
              max={30}
              value={simulatedLevel}
              onChange={(e) => setSimulatedLevel(Number(e.target.value))}
              className="w-28 sm:w-36 accent-amber-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Nv. {simulatedLevel}
            </span>
            {/* Quick Level Snap Pills */}
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono">
              <button
                onClick={() => setSimulatedLevel(1)}
                className={`px-1.5 py-0.5 rounded border ${simulatedLevel === 1 ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
              >
                1 (Día 1)
              </button>
              <button
                onClick={() => setSimulatedLevel(10)}
                className={`px-1.5 py-0.5 rounded border ${simulatedLevel === 10 ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
              >
                10 (Mid)
              </button>
              <button
                onClick={() => setSimulatedLevel(20)}
                className={`px-1.5 py-0.5 rounded border ${simulatedLevel === 20 ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
              >
                20 (Late)
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-mono text-slate-400 hidden xl:inline">Emparejamientos Rápidos:</span>
            <button
              onClick={() => applyPreset('warriorVsMage')}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-mono whitespace-nowrap border border-slate-700 cursor-pointer transition-colors"
            >
              ⚔️ Guerrero vs Mago
            </button>
            <button
              onClick={() => applyPreset('mainVsFarmeo')}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-mono whitespace-nowrap border border-slate-700 cursor-pointer transition-colors"
            >
              🌾 Main vs Farmeo
            </button>
            <button
              onClick={() => applyPreset('rivalFaction')}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-mono whitespace-nowrap border border-slate-700 cursor-pointer transition-colors"
            >
              ⚔️ Duelo de Facciones
            </button>
            <button
              onClick={() => applyPreset('metaTierS')}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-mono whitespace-nowrap border border-slate-700 cursor-pointer transition-colors"
            >
              ⭐ Meta Tier S
            </button>
          </div>
        </div>
      </div>

      {/* 2. DUAL COMMANDER SPLIT-SCREEN CARDS (COLUMNS A & B) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* COLUMN A: COMANDANTE ALFA */}
        <div className={`rounded-2xl border p-5 transition-all ${themeMode === 'light' ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900/80 border-slate-800 shadow-xl'}`}>
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Comandante Alfa
              </span>
              <span className="text-xs font-mono text-slate-400">Jugador / Tu Héroe</span>
            </div>
            {/* Faction selector A */}
            <select
              value={factionA}
              onChange={(e) => setFactionA(e.target.value as FactionId)}
              className="bg-black/60 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {FACTIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hero Picker Dropdown */}
          <div className="mb-4">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Seleccionar Héroe:</label>
            <select
              value={selectedHeroIdA}
              onChange={(e) => setSelectedHeroIdA(e.target.value)}
              className="w-full bg-black/60 border border-slate-700 rounded-xl text-sm font-serif font-bold text-white px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {heroesA.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} — {h.title} ({h.heroType} • {h.tierRank})
                </option>
              ))}
            </select>
          </div>

          {/* Commander A Identity Card */}
          {heroA && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-slate-800">
                <div
                  className={`p-3 rounded-xl border shrink-0 ${
                    heroA.heroType === 'Mago'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {heroA.heroType === 'Mago' ? <Wand2 className="w-7 h-7" /> : <Swords className="w-7 h-7" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-serif font-bold text-white truncate">{heroA.name}</h3>
                    <TierBadge tier={heroA.tierRank.replace('Tier ', '')} size="sm" />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{heroA.title}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {heroA.heroClass}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {heroA.heroType}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {heroA.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialty Box */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-amber-900/30 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Especialidad: {heroA.specialtyName}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{heroA.specialtyEffect}</p>
              </div>

              {/* Tactical Quick Overview */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Apertura Día 1:</div>
                  <div className="text-slate-200 mt-0.5 line-clamp-2">{heroA.day1Action}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Ejército Inicial:</div>
                  <div className="text-slate-200 mt-0.5 line-clamp-2">{heroA.initialArmy}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* COLUMN B: COMANDANTE BETA */}
        <div className={`rounded-2xl border p-5 transition-all ${themeMode === 'light' ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900/80 border-slate-800 shadow-xl'}`}>
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Comandante Beta
              </span>
              <span className="text-xs font-mono text-slate-400">Rival / Comparado</span>
            </div>
            {/* Faction selector B */}
            <select
              value={factionB}
              onChange={(e) => setFactionB(e.target.value as FactionId)}
              className="bg-black/60 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 px-2.5 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {FACTIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hero Picker Dropdown */}
          <div className="mb-4">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Seleccionar Héroe:</label>
            <select
              value={selectedHeroIdB}
              onChange={(e) => setSelectedHeroIdB(e.target.value)}
              className="w-full bg-black/60 border border-slate-700 rounded-xl text-sm font-serif font-bold text-white px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {heroesB.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} — {h.title} ({h.heroType} • {h.tierRank})
                </option>
              ))}
            </select>
          </div>

          {/* Commander B Identity Card */}
          {heroB && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-slate-800">
                <div
                  className={`p-3 rounded-xl border shrink-0 ${
                    heroB.heroType === 'Mago'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {heroB.heroType === 'Mago' ? <Wand2 className="w-7 h-7" /> : <Swords className="w-7 h-7" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-serif font-bold text-white truncate">{heroB.name}</h3>
                    <TierBadge tier={heroB.tierRank.replace('Tier ', '')} size="sm" />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{heroB.title}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {heroB.heroClass}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {heroB.heroType}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {heroB.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialty Box */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-900/30 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-cyan-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Especialidad: {heroB.specialtyName}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{heroB.specialtyEffect}</p>
              </div>

              {/* Tactical Quick Overview */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Apertura Día 1:</div>
                  <div className="text-slate-200 mt-0.5 line-clamp-2">{heroB.day1Action}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Ejército Inicial:</div>
                  <div className="text-slate-200 mt-0.5 line-clamp-2">{heroB.initialArmy}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. SUB-TABS: STATS BARS COMPARISON / CREATURE SYNERGY / COMPETITIVE VERDICT */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Gráfica Diferencial de Barras Superpuestas</span>
        </button>

        <button
          onClick={() => setActiveTab('synergy')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'synergy'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Matriz de Sinergia de Criaturas con Auras</span>
        </button>

        <button
          onClick={() => setActiveTab('verdict')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'verdict'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Veredicto Táctico Competitivo (Día 1 a Final)</span>
        </button>
      </div>

      {/* SECTION 1: OVERLAID DIFFERENTIAL STATS BARS */}
      {activeTab === 'stats' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                <span>Comparativa de Atributos Simulados a Nivel {simulatedLevel}</span>
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Cálculo en vivo de estadísticas primarias, crecimientos porcentuales por nivel y reservas de maná.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
                {heroA?.name || 'Alfa'}
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-3 h-3 rounded bg-cyan-500 inline-block" />
                {heroB?.name || 'Beta'}
              </span>
            </div>
          </div>

          {/* Differential Bars Grid */}
          <div className="space-y-4">
            {/* 1. ATAQUE */}
            <StatDifferentialBar
              label="Ataque Primario (Attack)"
              statA={statsA.attack}
              statB={statsB.attack}
              heroNameA={heroA?.name || 'Alfa'}
              heroNameB={heroB?.name || 'Beta'}
              unit="pts"
              icon={<Swords className="w-4 h-4 text-rose-400" />}
            />

            {/* 2. DEFENSA */}
            <StatDifferentialBar
              label="Defensa Primaria (Defense)"
              statA={statsA.defense}
              statB={statsB.defense}
              heroNameA={heroA?.name || 'Alfa'}
              heroNameB={heroB?.name || 'Beta'}
              unit="pts"
              icon={<Shield className="w-4 h-4 text-blue-400" />}
            />

            {/* 3. PODER MÁGICO */}
            <StatDifferentialBar
              label="Poder Mágico (Spell Power)"
              statA={statsA.spellPower}
              statB={statsB.spellPower}
              heroNameA={heroA?.name || 'Alfa'}
              heroNameB={heroB?.name || 'Beta'}
              unit="pts"
              icon={<Flame className="w-4 h-4 text-purple-400" />}
            />

            {/* 4. CONOCIMIENTO / RESERVA DE MANÁ */}
            <StatDifferentialBar
              label="Conocimiento (Reserva de Maná)"
              statA={statsA.knowledge}
              statB={statsB.knowledge}
              heroNameA={heroA?.name || 'Alfa'}
              heroNameB={heroB?.name || 'Beta'}
              unit="pts"
              extraA={`(${statsA.mana} Maná)`}
              extraB={`(${statsB.mana} Maná)`}
              icon={<Wand2 className="w-4 h-4 text-amber-400" />}
            />

            {/* 5. CRECIMIENTO FÍSICO (ATQ + DEF) */}
            <StatDifferentialBar
              label="Crecimiento Físico Acumulado (% Atq + Def por nivel)"
              statA={statsA.physicalGrowthTotal}
              statB={statsB.physicalGrowthTotal}
              heroNameA={heroA?.name || 'Alfa'}
              heroNameB={heroB?.name || 'Beta'}
              unit="%"
              icon={<Award className="w-4 h-4 text-rose-300" />}
            />

            {/* 6. CRECIMIENTO MÁGICO (PODER + CONOCIMIENTO) */}
            <StatDifferentialBar
              label="Crecimiento Mágico Acumulado (% SP + Kn por nivel)"
              statA={statsA.magicGrowthTotal}
              statB={statsB.magicGrowthTotal}
              heroNameA={heroA?.name || 'Alfa'}
              heroNameB={heroB?.name || 'Beta'}
              unit="%"
              icon={<Sparkles className="w-4 h-4 text-cyan-300" />}
            />

            {/* 7. MORAL ESTIMADA EN COMBATE */}
            <StatDifferentialBar
              label="Moral Estimada en Formación"
              statA={statsA.estimatedMorale}
              statB={statsB.estimatedMorale}
              heroNameA={heroA?.name || 'Alfa'}
              heroNameB={heroB?.name || 'Beta'}
              unit="pts"
              icon={<Crown className="w-4 h-4 text-yellow-400" />}
            />
          </div>

          {/* Key Stat Takeaway */}
          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Lectura Táctica:</strong>{' '}
                {statsA.attack + statsA.defense > statsB.attack + statsB.defense
                  ? `${heroA?.name || 'Alfa'} ostenta superioridad en el intercambio físico (+${(statsA.attack + statsA.defense) - (statsB.attack + statsB.defense)} pts totales).`
                  : statsB.attack + statsB.defense > statsA.attack + statsA.defense
                  ? `${heroB?.name || 'Beta'} domina en estadísticas de vanguardia física (+${(statsB.attack + statsB.defense) - (statsA.attack + statsA.defense)} pts totales).`
                  : 'Ambos comandantes presentan un balance idéntico en estadísticas de choque físico.'}
                {' '}
                {statsA.spellPower > statsB.spellPower
                  ? `${heroA?.name || 'Alfa'} desata hechizos con mayor daño de impacto.`
                  : statsB.spellPower > statsA.spellPower
                  ? `${heroB?.name || 'Beta'} cuenta con mayor penetración y duración de hechizos mágicos.`
                  : 'Poder de conjuro equilibrado.'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CREATURE SYNERGY MATRIX WITH THEMATIC AURAS */}
      {activeTab === 'synergy' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
              <h4 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-amber-400" />
                <span>Matriz de Sinergia de Criaturas y Auras de Mando</span>
              </h4>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  🌟 Sinergia Directa
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  🔮 Sinergia Mágica
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  ⚔️ Sinergia de Choque
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Identifica de forma instantánea qué tropas de cada facción reciben bonificaciones pasivas de la especialidad, el ejército de apertura o los hechizos favoritos de cada comandante.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Column A Units */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  Tropas de {factionA} bajo el mando de {heroA?.name}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{unitsA.length} Tiers</span>
              </div>

              <div className="space-y-2.5">
                {unitsA.map((unit) => {
                  const synergy = evaluateCreatureSynergy(heroA, unit);
                  const isDirect = synergy.level === 'direct';
                  const isStarter = synergy.level === 'starter';
                  const isTactical = synergy.level === 'tactical';

                  return (
                    <div
                      key={unit.tier}
                      className={`p-3 rounded-xl border transition-all ${
                        isDirect
                          ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                          : isStarter
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : isTactical
                          ? 'bg-blue-950/20 border-blue-500/40'
                          : 'bg-black/40 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                            T{unit.tier}
                          </span>
                          <div>
                            <div className="text-xs font-serif font-bold text-white">
                              {unit.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {unit.dwelling} • Vel: {unit.speed}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border whitespace-nowrap ${
                            isDirect
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : isStarter
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : isTactical
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {synergy.badge}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 mt-2 font-sans leading-snug">
                        {synergy.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column B Units */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                  Tropas de {factionB} bajo el mando de {heroB?.name}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{unitsB.length} Tiers</span>
              </div>

              <div className="space-y-2.5">
                {unitsB.map((unit) => {
                  const synergy = evaluateCreatureSynergy(heroB, unit);
                  const isDirect = synergy.level === 'direct';
                  const isStarter = synergy.level === 'starter';
                  const isTactical = synergy.level === 'tactical';

                  return (
                    <div
                      key={unit.tier}
                      className={`p-3 rounded-xl border transition-all ${
                        isDirect
                          ? 'bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                          : isStarter
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : isTactical
                          ? 'bg-blue-950/20 border-blue-500/40'
                          : 'bg-black/40 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                            T{unit.tier}
                          </span>
                          <div>
                            <div className="text-xs font-serif font-bold text-white">
                              {unit.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {unit.dwelling} • Vel: {unit.speed}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border whitespace-nowrap ${
                            isDirect
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : isStarter
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : isTactical
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {synergy.badge}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 mt-2 font-sans leading-snug">
                        {synergy.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TACTICAL COMPETITIVE MATCHUP VERDICT */}
      {activeTab === 'verdict' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                Veredicto Táctico de Enfrentamiento (Olden Era Meta)
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Análisis comparativo de curvas de poder desde el Día 1 hasta la Gran Batalla Final de Late Game.
              </p>
            </div>
          </div>

          {/* Phase-by-Phase Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1: Día 1 - 7 */}
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                <span>Fase 1: Día 1 al 7</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px]">
                  Apertura
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {heroA?.role.toLowerCase().includes('apertura') || heroA?.role.toLowerCase().includes('físico')
                  ? `🌟 ${heroA?.name} toma ventaja en creeping rápido gracias a su ejército inicial y habilidades de choque directo.`
                  : `🌟 ${heroB?.name} puede acelerar la limpieza si aprovecha sus tropas de vanguardia para asegurar el aserradero en Turno 1.`}
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <strong>Clave:</strong> Minimizar bajas en campamentos neutrales para rush a Tier 4/5.
              </div>
            </div>

            {/* Phase 2: Semanas 2 - 3 */}
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-400">
                <span>Fase 2: Semanas 2 a 3</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px]">
                  Expansión
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                A nivel 8-12, los héroes con magia desbloquean hechizos de Cofradía Nivel 2 y 3. Si uno de los dos es Mago, su daño de área neutraliza escuadras enemigas antes del choque.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <strong>Clave:</strong> Control del Observatorio y desbloqueo de Puntos de Astrología.
              </div>
            </div>

            {/* Phase 3: Batalla Decisiva */}
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-400">
                <span>Fase 3: Late Game</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px]">
                  Choque Colosal
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                En el asedio final con tropas Tier 6 y 7, la victoria dependerá de la iniciativa y la resistencia mágica. Héroes especialistas en unidades de alto tier (Tier 5-7) inclinan decisivamente la balanza.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <strong>Clave:</strong> Posicionamiento en hexágonos y hechizos de control de masas.
              </div>
            </div>
          </div>

          {/* Skill Build Comparison Summary */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono space-y-3">
            <div className="font-bold text-slate-200">Comparativa de Rutas de Habilidades Recomendadas:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-amber-400 font-bold block mb-1">Build Óptima de {heroA?.name}:</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                  {heroA?.idealSkillBuild.slice(0, 5).map((skill, idx) => (
                    <li key={idx} className="truncate">{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-cyan-400 font-bold block mb-1">Build Óptima de {heroB?.name}:</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                  {heroB?.idealSkillBuild.slice(0, 5).map((skill, idx) => (
                    <li key={idx} className="truncate">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SUB-COMPONENTE: BARRA DIFERENCIAL SUPERPUESTA DE ESTADÍSTICAS
// =========================================================================
interface StatDifferentialBarProps {
  label: string;
  statA: number;
  statB: number;
  heroNameA: string;
  heroNameB: string;
  unit?: string;
  extraA?: string;
  extraB?: string;
  icon?: React.ReactNode;
}

const StatDifferentialBar: React.FC<StatDifferentialBarProps> = ({
  label,
  statA,
  statB,
  heroNameA,
  heroNameB,
  unit = 'pts',
  extraA,
  extraB,
  icon,
}) => {
  const maxStat = Math.max(statA, statB, 1);
  const percentA = Math.round((statA / (statA + statB || 1)) * 100);
  const percentB = 100 - percentA;
  const delta = Math.abs(statA - statB);

  const winner = statA > statB ? 'A' : statB > statA ? 'B' : 'TIE';

  return (
    <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 hover:border-slate-700 transition-colors">
      {/* Header: Stat Label and Delta Indicator */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-mono font-bold text-slate-200">{label}</span>
        </div>

        {/* Advantage Badge */}
        <div>
          {winner === 'A' && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              +{delta} {unit} para {heroNameA}
            </span>
          )}
          {winner === 'B' && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              +{delta} {unit} para {heroNameB}
            </span>
          )}
          {winner === 'TIE' && (
            <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              Empate
            </span>
          )}
        </div>
      </div>

      {/* Numeric Values */}
      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
        <span className="font-bold text-amber-400">
          {statA} {unit} {extraA && <span className="text-[10px] font-normal text-slate-400">{extraA}</span>}
        </span>
        <span className="font-bold text-cyan-400">
          {statB} {unit} {extraB && <span className="text-[10px] font-normal text-slate-400">{extraB}</span>}
        </span>
      </div>

      {/* Dual Comparative Bar */}
      <div className="h-3 w-full rounded-full bg-slate-950 overflow-hidden flex border border-slate-800">
        <div
          style={{ width: `${percentA}%` }}
          className={`h-full transition-all duration-300 ${
            winner === 'A' ? 'bg-amber-500 shadow-sm shadow-amber-500/50' : 'bg-amber-600/70'
          }`}
          title={`${heroNameA}: ${statA} (${percentA}%)`}
        />
        <div
          style={{ width: `${percentB}%` }}
          className={`h-full transition-all duration-300 ${
            winner === 'B' ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50' : 'bg-cyan-600/70'
          }`}
          title={`${heroNameB}: ${statB} (${percentB}%)`}
        />
      </div>
    </div>
  );
};
