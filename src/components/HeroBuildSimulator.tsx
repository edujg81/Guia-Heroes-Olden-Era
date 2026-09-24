import React, { useState, useMemo, useEffect } from 'react';
import { FactionId, getHeroesForFaction, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { OFFICIAL_SKILLS_DATA } from '../data/officialSkillsData';
import { OFFICIAL_SUBCLASSES } from '../data/subclassesData';
import { HERO_SUBSKILL_CHOICES } from '../data/subskillsRecommendationData';
import type { HeroWithExtras, SubclassInfo } from '../types';
import type { ApiSkill } from '../types-api';
import { WaxSealBadge } from './ui/WaxSealBadge';
import { useStickyState } from '../utils/useStickyState';
import {
  Sparkles,
  Zap,
  Shield,
  Crown,
  Award,
  Flame,
  CheckCircle2,
  GitBranch,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  Star,
  Swords,
  BookOpen,
  Users,
  ChevronRight,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface HeroBuildSimulatorProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
  initialHeroId?: string;
}

interface AllocatedSkillState {
  skillId: string;
  tier: 'none' | 'basic' | 'advanced' | 'expert';
  chosenAdvancedSubskill?: string;
  chosenExpertSubskill?: string;
}

export const HeroBuildSimulator: React.FC<HeroBuildSimulatorProps> = ({
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
  initialHeroId,
}) => {
  const heroes = getHeroesForFaction(selectedFaction);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);
  const isDark = themeMode === 'dark';

  const defaultHero = heroes[0] || null;
  const [selectedHeroId, setSelectedHeroId] = useStickyState<string>(
    initialHeroId || defaultHero?.id || 'hero-enatee',
    `sim_selected_hero_${selectedFaction}`
  );

  const selectedHero = heroes.find((h) => h.id === selectedHeroId) || defaultHero;

  // Level range: 1 to 25 (Standard competitive Olden Era matches peak around levels 15-20)
  const [targetLevel, setTargetLevel] = useStickyState<number>(20, 'sim_target_level');
  
  // Skill Allocation State: map of skillId -> AllocatedSkillState
  const [allocations, setAllocations] = useState<Record<string, AllocatedSkillState>>({});
  const [activeModalSkill, setActiveModalSkill] = useState<ApiSkill | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Total points available at target level:
  // Level 1 starts with 2 points (used by the 2 base skills).
  // Each level-up grants +1 point. Level 2 = 3 pts, Level 16 = 17 pts, Level 20 = 21 pts, Level 25 = 26 pts.
  const totalPoints = targetLevel + 1;

  // Calculate spent points (Basic = 1 pt, Advanced = 2 pts, Expert = 3 pts. Subskills do NOT cost points)
  const spentPoints = useMemo(() => {
    let spent = 0;
    (Object.values(allocations) as AllocatedSkillState[]).forEach((alloc) => {
      if (alloc.tier === 'basic') spent += 1;
      else if (alloc.tier === 'advanced') spent += 2;
      else if (alloc.tier === 'expert') spent += 3;
    });
    return spent;
  }, [allocations]);

  const remainingPoints = totalPoints - spentPoints;

  // Count active primary skills (max 8 allowed in Olden Era)
  const activeSkillsCount = useMemo(() => {
    return (Object.values(allocations) as AllocatedSkillState[]).filter((a) => a.tier !== 'none').length;
  }, [allocations]);

  // Normalize helper
  const normalize = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  // Find matching official skill
  const findOfficialSkillByName = (name: string): ApiSkill | undefined => {
    const clean = normalize(name.replace(/\s*\((Experta|Avanzada|Básica)\)/, ''));
    return OFFICIAL_SKILLS_DATA.find((s) => {
      const sNorm = normalize(s.name);
      return sNorm === clean || clean.includes(sNorm) || sNorm.includes(clean);
    });
  };

  // Get initial 2 basic skills for a hero (Level 1 starting state)
  const getInitialAllocationsForHero = (hero: HeroWithExtras): Record<string, AllocatedSkillState> => {
    const initialMap: Record<string, AllocatedSkillState> = {};
hero.startingSkills.forEach((skillObj) => {
      const skillName = typeof skillObj === 'string' ? skillObj : (skillObj as any).skillName || '';
      const isExperta = skillName.includes('(Experta)');
      const isAvanzada = skillName.includes('(Avanzada)');
      const cleanName = skillName.replace(/\s*\((Experta|Avanzada|Básica)\)/, '').trim();
      const offSkill = findOfficialSkillByName(cleanName);
      if (offSkill) {
        const tier = isExperta ? 'expert' : isAvanzada ? 'advanced' : 'basic';
        initialMap[offSkill.id] = {
          skillId: offSkill.id,
          tier,
          chosenAdvancedSubskill: tier !== 'basic' ? (offSkill.level2.subSkillChoices[0]?.name || undefined) : undefined,
          chosenExpertSubskill: tier === 'expert' ? (offSkill.level3.subSkillChoices[0]?.name || undefined) : undefined,
        };
      }
    });
    return initialMap;
  };

  // Initialize with initial skills if empty
  useEffect(() => {
    if (selectedHero && Object.keys(allocations).length === 0) {
      setAllocations(getInitialAllocationsForHero(selectedHero));
    }
  }, [selectedHeroId]);

  // Load Meta Preset for current hero
  const loadMetaPreset = (hero: HeroWithExtras) => {
    const newAllocations: Record<string, AllocatedSkillState> = {};
    const heroChoices = HERO_SUBSKILL_CHOICES[hero.id] || [];

    // Prioritize hero's ideal skill build (max 8 primary skills in game)
    hero.idealSkillBuild.slice(0, 8).forEach((skillStr) => {
      const isExperta = skillStr.includes('(Experta)');
      const isAvanzada = skillStr.includes('(Avanzada)');
      const cleanName = skillStr.replace(/\s*\((Experta|Avanzada|Básica)\)/, '').trim();
      const officialSkill = findOfficialSkillByName(cleanName);

      if (officialSkill) {
        const tier = isExperta ? 'expert' : isAvanzada ? 'advanced' : 'basic';
        const choice = heroChoices.find((c) => normalize(c.skillName).includes(normalize(cleanName)));

        const chosenAdv = choice?.advancedSubskill || officialSkill.level2.subSkillChoices[0]?.name;
        const chosenExp = isExperta ? (choice?.expertSubskill || officialSkill.level3.subSkillChoices[0]?.name) : undefined;

        newAllocations[officialSkill.id] = {
          skillId: officialSkill.id,
          tier,
          chosenAdvancedSubskill: tier !== 'basic' ? chosenAdv : undefined,
          chosenExpertSubskill: tier === 'expert' ? chosenExp : undefined,
        };
      }
    });

    setAllocations(newAllocations);
  };

  // Reset to initial Level 1 skills
  const handleResetToLevel1 = () => {
    if (selectedHero) {
      setAllocations(getInitialAllocationsForHero(selectedHero));
    } else {
      setAllocations({});
    }
  };

  // Clear all allocations
  const handleClearAll = () => {
    setAllocations({});
  };

  // Upgrade / Downgrade skill tier
  const setSkillTier = (skillId: string, targetTier: 'none' | 'basic' | 'advanced' | 'expert') => {
    const current = allocations[skillId] || { skillId, tier: 'none' };
    
    // Check if adding a new skill exceeds the 6-skill cap
    if (current.tier === 'none' && targetTier !== 'none' && activeSkillsCount >= 8) {
      alert('¡Límite alcanzado! Un héroe en Jadame puede aprender un máximo de 8 habilidades primarias.');
      return;
    }

    // Calculate cost delta (Basic = 1, Advanced = 2, Expert = 3)
    const tierCost = (t: string) => (t === 'basic' ? 1 : t === 'advanced' ? 2 : t === 'expert' ? 3 : 0);
    const costDelta = tierCost(targetTier) - tierCost(current.tier);

    if (remainingPoints - costDelta < 0 && costDelta > 0) {
      alert(`No tienes suficientes puntos de habilidad para esta mejora (Faltan ${costDelta - remainingPoints} pts). Sube el nivel objetivo o desasigna otra habilidad.`);
      return;
    }

    // Keep subskills if valid for new tier
    let chosenAdv = current.chosenAdvancedSubskill;
    let chosenExp = current.chosenExpertSubskill;

    if (targetTier === 'none' || targetTier === 'basic') {
      chosenAdv = undefined;
      chosenExp = undefined;
    } else if (targetTier === 'advanced') {
      chosenExp = undefined;
    }

    if (targetTier === 'none') {
      const next = { ...allocations };
      delete next[skillId];
      setAllocations(next);
    } else {
      setAllocations({
        ...allocations,
        [skillId]: {
          skillId,
          tier: targetTier,
          chosenAdvancedSubskill: chosenAdv,
          chosenExpertSubskill: chosenExp,
        },
      });
    }
  };

  // Toggle Subskill (Subskills do not cost skill points; 1 selection allowed per tier)
  const toggleSubskill = (skillId: string, subType: 'advanced' | 'expert', subName: string) => {
    const current = allocations[skillId];
    if (!current) return;

    if (subType === 'advanced') {
      if (current.chosenAdvancedSubskill === subName) {
        // Deselect
        setAllocations({
          ...allocations,
          [skillId]: { ...current, chosenAdvancedSubskill: undefined },
        });
      } else {
        // Select (free, subskills do not cost level points)
        setAllocations({
          ...allocations,
          [skillId]: { ...current, chosenAdvancedSubskill: subName },
        });
      }
    } else {
      if (current.chosenExpertSubskill === subName) {
        // Deselect
        setAllocations({
          ...allocations,
          [skillId]: { ...current, chosenExpertSubskill: undefined },
        });
      } else {
        // Select (free, subskills do not cost level points)
        setAllocations({
          ...allocations,
          [skillId]: { ...current, chosenExpertSubskill: subName },
        });
      }
    }
  };

  // Calculate Subclasses Progress for the current Faction
  const factionSubclasses = useMemo(() => {
    const list = OFFICIAL_SUBCLASSES.filter((sc) => sc.faction === selectedFaction);
    return list.map((sc) => {
      // Check each required skill
      const reqStatus = sc.requiredSkills.map((req) => {
        const offSkill = findOfficialSkillByName(req.name);
        const alloc = offSkill ? allocations[offSkill.id] : undefined;
        const isExpert = alloc?.tier === 'expert';
        const currentTier = alloc?.tier || 'none';
        return {
          reqName: req.name,
          offSkillId: offSkill?.id,
          isExpert,
          currentTier,
        };
      });

      const expertCount = reqStatus.filter((r) => r.isExpert).length;
      const isUnlocked = expertCount >= 5;

      return {
        ...sc,
        reqStatus,
        expertCount,
        isUnlocked,
      };
    });
  }, [selectedFaction, allocations]);

  // Copy Build Summary to Clipboard
  const copyBuildSummary = () => {
    if (!selectedHero) return;

    const allocatedList = (Object.values(allocations) as AllocatedSkillState[])
      .map((a) => {
        const sk = OFFICIAL_SKILLS_DATA.find((s) => s.id === a.skillId);
        if (!sk) return '';
        const tierName = a.tier === 'expert' ? 'Experta' : a.tier === 'advanced' ? 'Avanzada' : 'Básica';
        const subs = [a.chosenAdvancedSubskill, a.chosenExpertSubskill].filter(Boolean).join(', ');
        return `• ${sk.name} (${tierName})${subs ? ` [Sub: ${subs}]` : ''}`;
      })
      .filter(Boolean)
      .join('\n');

    const unlockedSubclasses = factionSubclasses.filter((s) => s.isUnlocked).map((s) => s.name).join(', ') || 'Ninguna aún';

    const text = `=== BUILD DE HÉROE: ${selectedHero.name} (Nivel ${targetLevel}) ===
Facción: ${selectedFaction}
Puntos Invertidos: ${spentPoints} / ${totalPoints}
Subclases Desbloqueadas: ${unlockedSubclasses}

Habilidades Asignadas (${activeSkillsCount}/8):
${allocatedList || 'Sin habilidades asignadas'}

Generado con Compendio Táctico HoMM: Olden Era`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  // Filter skills
  const filteredSkills = useMemo(() => {
    return OFFICIAL_SKILLS_DATA.filter((s) => {
      const matchCat =
        filterCategory === 'all' ||
        (filterCategory === 'Común' && s.skillType === 'Common') ||
        (filterCategory === 'Magia' && s.name.toLowerCase().includes('magia')) ||
        (filterCategory === 'allocated' && allocations[s.id] && allocations[s.id].tier !== 'none');

      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.level1.levelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.level3.levelName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [filterCategory, searchTerm, allocations]);

  return (
    <div className="space-y-6">
      {/* Simulator Control Header */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${
        isDark ? 'bg-black/60 border-slate-800' : 'bg-white border-slate-200 shadow-md'
      } space-y-4`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border flex items-center gap-1.5 ${
                isDark ? 'bg-purple-950/70 text-purple-300 border-purple-800/60' : 'bg-purple-100 text-purple-900 border-purple-300'
              }`}>
                <GitBranch className="w-3.5 h-3.5" />
                Simulador Interactivo de Árbol de Habilidades
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Jadame • Reglas Canónicas Oficiales
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-serif font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Planificador de Builds de Comandante (Nivel 1 al 25)
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {selectedHero && (
              <>
                <button
                  type="button"
                  onClick={() => loadMetaPreset(selectedHero)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                    isDark
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                  }`}
                  title="Carga la ruta de 8 habilidades y subhabilidades recomendadas para este héroe"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cargar Build Meta</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetToLevel1}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isDark
                      ? 'bg-blue-950/40 text-blue-300 hover:bg-blue-950/70 border-blue-900/50'
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200'
                  }`}
                  title="Carga las 2 habilidades básicas de inicio del héroe (Nivel 1: 0 libres de 2)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Inicio (Niv. 1)</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={copyBuildSummary}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Build</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isDark
                  ? 'bg-red-950/40 text-red-300 hover:bg-red-950/70 border-red-900/50'
                  : 'bg-red-50 text-red-800 hover:bg-red-100 border-red-200'
              }`}
              title="Desasigna todas las habilidades"
            >
              <span>Limpiar Todo</span>
            </button>
          </div>
        </div>

        {/* Hero Selector & Level Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-800/60 items-center">
          {/* Hero Selection */}
          <div className="md:col-span-4">
            <label className={`block text-[11px] font-mono font-bold uppercase mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Comandante Base ({selectedFaction}):
            </label>
            <select
              value={selectedHeroId}
              onChange={(e) => {
                setSelectedHeroId(e.target.value);
                const h = heroes.find((hero) => hero.id === e.target.value);
                if (h) setAllocations(getInitialAllocationsForHero(h));
              }}
              className={`w-full p-2 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-black/80 border-slate-700 text-slate-100 focus:border-amber-400'
                  : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
              }`}
            >
              {heroes.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.classType === 'magic' ? 'Magia' : 'Poder'} - {h.role})
                </option>
              ))}
            </select>
          </div>

          {/* Level Slider (1 - 25) */}
          <div className="md:col-span-4">
            <div className="flex items-center justify-between mb-1">
              <label className={`text-[11px] font-mono font-bold uppercase ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Nivel Objetivo:
              </label>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                isDark ? 'bg-amber-950/80 text-amber-300 border-amber-700/60' : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                Nivel {targetLevel} ({totalPoints} pts totales)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={targetLevel}
              onChange={(e) => setTargetLevel(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
              <span>Niv 1 (2 pts)</span>
              <span>Niv 2 (3 pts)</span>
              <span>Niv 16 (17 pts)</span>
              <span>Niv 20 (21 pts)</span>
              <span>Niv 25 (26 pts)</span>
            </div>
          </div>

          {/* Points & Active Slots Metrics */}
          <div className="md:col-span-4 flex items-center gap-2">
            <div className={`p-2.5 rounded-xl border flex-1 text-center font-mono ${
              remainingPoints >= 0
                ? isDark ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : isDark ? 'bg-red-950/50 border-red-800/60 text-red-300' : 'bg-red-50 border-red-300 text-red-900'
            }`}>
              <div className="text-[10px] uppercase font-bold text-slate-400">Puntos Libres</div>
              <div className="text-base font-bold">
                {remainingPoints} <span className="text-xs font-normal">/ {totalPoints} disp.</span>
              </div>
            </div>

            <div className={`p-2.5 rounded-xl border flex-1 text-center font-mono ${
              isDark ? 'bg-black/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <div className="text-[10px] uppercase font-bold text-slate-400">Invertidos</div>
              <div className="text-base font-bold">
                {spentPoints} <span className="text-xs font-normal">pts</span>
              </div>
            </div>

            <div className={`p-2.5 rounded-xl border flex-1 text-center font-mono ${
              activeSkillsCount <= 8
                ? isDark ? 'bg-black/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-red-950/50 border-red-800 text-red-300'
            }`}>
              <div className="text-[10px] uppercase font-bold text-slate-400">Slots Primarios</div>
              <div className="text-base font-bold">
                {activeSkillsCount} <span className="text-xs font-normal">/ 8 máx</span>
              </div>
            </div>
          </div>
        </div>

        {/* Canonical Rules Explanation Banner */}
        <div className={`px-3 py-2 rounded-xl border text-[11px] font-mono flex items-start gap-2 ${
          isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-300/90' : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Regla Canónica de Puntos en Jadame:</strong> El héroe inicia en <strong>Nivel 1 con 2 puntos</strong> (ocupados por sus 2 habilidades básicas iniciales, es decir, 0 libres de 2). Cada nivel adicional otorga <strong>+1 punto de habilidad</strong> (Niv. 2 = 3 pts totales con 1 libre; Niv. 16 = 17 pts totales con 15 libres). Las subhabilidades se seleccionan <strong>sin coste adicional de puntos</strong> al alcanzar rango Avanzado o Experto.
          </div>
        </div>
      </div>

      {/* Subclasses Progress & Unlock Live Panel */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${
        isDark ? 'bg-black/50 border-slate-800' : 'bg-white border-slate-200 shadow-md'
      } space-y-3.5`}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              Progreso de Desbloqueo de Subclases de Prestigio ({selectedFaction})
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Requiere 5 Habilidades Secundarias a nivel <strong>EXPERTO</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {factionSubclasses.map((sc) => {
            return (
              <div
                key={sc.id}
                className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  sc.isUnlocked
                    ? isDark
                      ? 'bg-gradient-to-b from-yellow-950/40 to-black/80 border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.25)] ring-1 ring-yellow-400/50'
                      : 'bg-amber-50 border-amber-400 shadow-md ring-1 ring-amber-300'
                    : isDark
                    ? 'bg-black/40 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-xs font-bold font-serif line-clamp-1 ${
                      sc.isUnlocked
                        ? isDark ? 'text-yellow-300' : 'text-amber-950'
                        : isDark ? 'text-slate-300' : 'text-slate-800'
                    }`}>
                      {sc.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-bold ${
                      sc.isUnlocked
                        ? 'bg-yellow-400 text-black border-yellow-300 animate-pulse'
                        : 'bg-black/30 text-slate-400 border-slate-700'
                    }`}>
                      {sc.isUnlocked ? '¡DESBLOQUEADA!' : `${sc.expertCount}/5`}
                    </span>
                  </div>

                  <div className={`text-[10px] font-mono mb-2 ${
                    isDark ? 'text-amber-400/90' : 'text-amber-700 font-semibold'
                  }`}>
                    {sc.bonusTitle}
                  </div>

                  {/* Requirements List with live checks */}
                  <div className="space-y-1 my-2">
                    {sc.reqStatus.map((req, rIdx) => (
                      <div
                        key={rIdx}
                        className={`text-[11px] font-mono flex items-center justify-between px-1.5 py-0.5 rounded ${
                          req.isExpert
                            ? isDark ? 'bg-emerald-950/40 text-emerald-300 font-bold' : 'bg-emerald-100 text-emerald-900 font-bold'
                            : isDark ? 'text-slate-500' : 'text-slate-600'
                        }`}
                      >
                        <span className="truncate">{req.reqName}</span>
                        <span className="shrink-0 text-[10px]">
                          {req.isExpert ? '✓ Experta' : req.currentTier !== 'none' ? `(${req.currentTier})` : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className={`text-[10px] leading-tight mt-1 pt-1.5 border-t line-clamp-2 ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}>
                  {sc.bonusEffect}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Skills Matrix */}
      <div className="space-y-4">
        {/* Category Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: 'all', label: 'Todas (30)' },
              { id: 'allocated', label: `Asignadas (${activeSkillsCount})` },
              { id: 'Común', label: 'Comunes' },
              { id: 'Magia', label: 'Escuelas Mágicas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors shrink-0 cursor-pointer border ${
                  filterCategory === tab.id
                    ? isDark
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                    : isDark
                    ? 'bg-black/40 text-slate-400 border-slate-800 hover:text-slate-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar habilidad o efecto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-3 py-1.5 rounded-xl text-xs font-mono border transition-colors ${
                isDark
                  ? 'bg-black/60 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-amber-400'
                  : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
              }`}
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSkills.map((skill) => {
            const currentAlloc = allocations[skill.id] || { skillId: skill.id, tier: 'none' };
            const isAllocated = currentAlloc.tier !== 'none';
            const tier = currentAlloc.tier;

            return (
              <div
                key={skill.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isAllocated
                    ? isDark
                      ? 'bg-black/80 border-purple-500/50 shadow-md ring-1 ring-purple-500/20'
                      : 'bg-purple-50/50 border-purple-300 shadow-sm ring-1 ring-purple-200'
                    : isDark
                    ? 'bg-black/40 border-slate-800/80 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Skill Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className={`text-sm font-bold font-serif ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {skill.name}
                      </h4>
                      <span className={`text-[10px] font-mono ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {skill.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalSkill(skill)}
                      className={`p-1 rounded-lg border text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                        isDark ? 'bg-black/40 border-slate-700 text-slate-300 hover:bg-white/10' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      }`}
                      title="Inspeccionar las 6 subhabilidades completas"
                    >
                      <Info className="w-3 h-3" />
                      <span>Detalles</span>
                    </button>
                  </div>

                  {/* Level Progression Buttons */}
                  <div className="grid grid-cols-4 gap-1 font-mono text-[11px] mb-3">
                    {[
                      { id: 'none', label: 'Ninguno', cost: 0 },
                      { id: 'basic', label: 'Básica', cost: 1 },
                      { id: 'advanced', label: 'Avanzada', cost: 2 },
                      { id: 'expert', label: 'Experta', cost: 3 },
                    ].map((lvl) => {
                      const isCurrent = tier === lvl.id;
                      return (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setSkillTier(skill.id, lvl.id as any)}
                          className={`py-1 rounded border text-center transition-all cursor-pointer font-semibold ${
                            isCurrent
                              ? lvl.id === 'expert'
                                ? 'bg-yellow-500 text-black border-yellow-400 font-bold shadow-xs'
                                : lvl.id === 'advanced'
                                ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-xs'
                                : lvl.id === 'basic'
                                ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-xs'
                                : isDark
                                ? 'bg-slate-800 text-slate-300 border-slate-600'
                                : 'bg-slate-200 text-slate-700 border-slate-400'
                              : isDark
                              ? 'bg-black/50 text-slate-400 border-slate-800 hover:bg-white/5 hover:text-slate-200'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Current Active Effect Description */}
                  <p className={`text-xs leading-relaxed mb-3 line-clamp-3 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {tier === 'expert'
                      ? skill.level3.levelName
                      : tier === 'advanced'
                      ? skill.level2.levelName
                      : tier === 'basic'
                      ? skill.level1.levelName
                      : 'No aprendida. Asigna al menos nivel Básico (1 pt) para activarla.'}
                  </p>

                  {/* Subskills Selection Triggers (When Advanced or Expert) */}
                  {tier !== 'none' && tier !== 'basic' && (
                    <div className={`p-2.5 rounded-lg border space-y-2 mb-2 ${
                      isDark ? 'bg-black/60 border-purple-900/40' : 'bg-purple-50 border-purple-200'
                    }`}>
                      <div className="text-[10px] font-mono font-bold uppercase text-purple-400">
                        Subhabilidad Avanzada:
                      </div>
                      <div className="space-y-1">
                        {skill.level2.subSkillChoices.map((sub, sIdx) => {
                          const isSelected = currentAlloc.chosenAdvancedSubskill === sub.name;
                          return (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => toggleSubskill(skill.id, 'advanced', sub.name)}
                              className={`w-full p-1.5 rounded text-left text-[11px] font-mono transition-all flex items-center justify-between border cursor-pointer ${
                                isSelected
                                  ? 'bg-purple-700 text-white border-purple-400 font-bold shadow-xs'
                                  : isDark
                                  ? 'bg-black/40 text-slate-300 border-slate-800 hover:bg-white/5'
                                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                              }`}
                            >
                              <span className="truncate">{sub.name}</span>
                              <span className="text-[10px] shrink-0">{isSelected ? '✓ Activa' : 'Elegir'}</span>
                            </button>
                          );
                        })}
                      </div>

                      {tier === 'expert' && (
                        <>
                          <div className="text-[10px] font-mono font-bold uppercase text-yellow-400 pt-1 border-t border-purple-900/30">
                            Subhabilidad Experta:
                          </div>
                          <div className="space-y-1">
                            {skill.level3.subSkillChoices.map((sub, sIdx) => {
                              const isSelected = currentAlloc.chosenExpertSubskill === sub.name;
                              return (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={() => toggleSubskill(skill.id, 'expert', sub.name)}
                                  className={`w-full p-1.5 rounded text-left text-[11px] font-mono transition-all flex items-center justify-between border cursor-pointer ${
                                    isSelected
                                      ? 'bg-yellow-500 text-black border-yellow-300 font-bold shadow-xs'
                                      : isDark
                                      ? 'bg-black/40 text-slate-300 border-slate-800 hover:bg-white/5'
                                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                                  }`}
                                >
                                  <span className="truncate">{sub.name}</span>
                                  <span className="text-[10px] shrink-0">{isSelected ? '✓ Activa' : 'Elegir'}</span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Detail Modal */}
      {activeModalSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`max-w-2xl w-full p-5 sm:p-6 rounded-2xl border ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
          } shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                  {activeModalSkill.name}
                </span>
                <h3 className="text-xl font-bold font-serif">{activeModalSkill.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalSkill(null)}
                className="p-1 rounded-lg hover:bg-white/10 font-mono text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Niveles de Maestría */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Niveles de Maestría:</h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className={`p-2 rounded border ${isDark ? 'bg-black/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-blue-400 font-bold">Básica (1 pt):</span> {activeModalSkill.level1.levelName}
                </div>
                <div className={`p-2 rounded border ${isDark ? 'bg-black/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-purple-400 font-bold">Avanzada (2 pts):</span> {activeModalSkill.level2.levelName}
                </div>
                <div className={`p-2 rounded border ${isDark ? 'bg-black/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-yellow-400 font-bold">Experta (3 pts):</span> {activeModalSkill.level3.levelName}
                </div>
              </div>
            </div>

            {/* Subskills Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase text-purple-400">
                3 Subhabilidades Avanzadas:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeModalSkill.level2.subSkillChoices.map((sub, sIdx) => (
                  <div key={sIdx} className={`p-2.5 rounded-lg border text-xs ${isDark ? 'bg-black/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-200 mb-1">{sub.name}</div>
                    <p className="text-[11px] text-slate-400 leading-tight">{sub.description}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-mono font-bold uppercase text-yellow-400 pt-2">
                3 Subhabilidades Expertas:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeModalSkill.level3.subSkillChoices.map((sub, sIdx) => (
                  <div key={sIdx} className={`p-2.5 rounded-lg border text-xs ${isDark ? 'bg-black/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-200 mb-1">{sub.name}</div>
                    <p className="text-[11px] text-slate-400 leading-tight">{sub.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setActiveModalSkill(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-mono font-bold text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
