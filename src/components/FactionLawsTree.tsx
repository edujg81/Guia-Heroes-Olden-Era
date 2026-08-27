import React, { useMemo } from 'react';
import { 
  MAX_FACTION_LAW_POINTS, 
  MAX_OLDEN_ERA_LAW_SEALS,
  LAW_POINT_SOURCES
} from '../data/factionLawsData';
import { 
  FactionId, 
  getFactionLawsForFaction, 
  getFactionLawPresetsForFaction, 
  FACTIONS_METADATA,
  getFactionTheme
} from '../data/factionDataProvider';
import { FactionLaw, FactionLawPreset, LawRank, PresetStep } from '../types';
import { useStickyState } from '../utils/useStickyState';
import { 
  Scroll, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Shield, 
  Coins, 
  Flame, 
  ArrowRight, 
  Zap, 
  Target, 
  Award, 
  Eye, 
  Lock, 
  Unlock, 
  RotateCcw, 
  Sliders, 
  Layers, 
  ListOrdered, 
  Info, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Crown,
  BookOpen,
  Sword,
  TrendingUp,
  Wand2,
  Compass,
  Landmark,
  Swords,
  Clock,
  Calendar,
  Filter,
  CheckCheck,
  Plus,
  Minus
} from 'lucide-react';

interface FactionLawsTreeProps {
  selectedFaction?: FactionId;
}

export const FactionLawsTree: React.FC<FactionLawsTreeProps> = ({ selectedFaction = 'Mazmorra' }) => {
  const factionLaws = useMemo(() => getFactionLawsForFaction(selectedFaction), [selectedFaction]);
  const factionLawPresets = useMemo(() => getFactionLawPresetsForFaction(selectedFaction), [selectedFaction]);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction);

  // State for active view mode:
  // 'sequence' = Exact step-by-step chronological order for the selected preset (#1, #2, #3...)
  // 'tiers' = Organized by Tier 1 to 5 (with badges of selection order & branch)
  // 'branches' = Organized by Canonical Olden Era Branches (Ciudad/Economía vs Militar/Ejército)
  // 'matrix' = Full Laws Database & Customizer with multi-level upgrade controls
  const [viewMode, setViewMode] = useStickyState<'sequence' | 'tiers' | 'branches' | 'matrix'>('sequence', 'laws_view_mode');
  
  const defaultPresetId = factionLawPresets[0]?.id || 'preset-default';
  const [activePresetId, setActivePresetId] = useStickyState<string>(defaultPresetId, `laws_active_preset_id_${selectedFaction}`);
  const [selectedBranchFilter, setSelectedBranchFilter] = useStickyState<'all' | 'Ciudad' | 'Militar'>('all', 'laws_branch_filter');
  const [selectedTierFilter, setSelectedTierFilter] = useStickyState<number | 'all'>('all', 'laws_tier_filter');
  const [onlyPresetLaws, setOnlyPresetLaws] = useStickyState<boolean>(false, 'laws_only_preset');
  const [showLawPointRules, setShowLawPointRules] = useStickyState<boolean>(false, 'laws_show_point_rules');
  const [showBuffSummary, setShowBuffSummary] = useStickyState<boolean>(true, 'laws_show_buff_summary');

  // Initial default law levels
  const getDefaultLevels = () => {
    const defaultPreset = factionLawPresets.find(p => p.id === activePresetId) || factionLawPresets[0];
    if (!defaultPreset) return {};
    if (defaultPreset.lawLevels) {
      return { ...defaultPreset.lawLevels };
    }
    const initial: Record<string, number> = {};
    const stepsList = defaultPreset.sequenceSteps || defaultPreset.steps;
    if (stepsList && stepsList.length > 0) {
      stepsList.forEach((s: any) => {
        if (s.lawId) initial[s.lawId] = s.level || s.targetLevel || 1;
      });
      return initial;
    }
    if (defaultPreset.enactedLawIds && Array.isArray(defaultPreset.enactedLawIds)) {
      defaultPreset.enactedLawIds.forEach(id => {
        initial[id] = 1;
      });
    }
    return initial;
  };

  // Map of Law ID -> Current Enacted Level (0 = not enacted, 1..maxLevel)
  const [lawLevels, setLawLevels] = useStickyState<Record<string, number>>(getDefaultLevels(), `laws_enacted_levels_${selectedFaction}`);

  // Current active preset object
  const activePreset: FactionLawPreset = useMemo(() => {
    return factionLawPresets.find(p => p.id === activePresetId) || factionLawPresets[0] || {
      id: 'fallback',
      name: 'Preset Estándar',
      nameEn: 'Standard Preset',
      tag: 'Equilibrado',
      strategyFocus: 'Desarrollo equilibrado de la facción.',
      enactedLawIds: [],
      sequenceSteps: [],
      steps: [],
      totalCost: 50
    };
  }, [activePresetId, factionLawPresets]);

  // Map of law ID -> first selection step index (1-based) in current active preset
  const presetSelectionOrderMap = useMemo(() => {
    const map = new Map<string, number>();
    const stepsList = activePreset.sequenceSteps || activePreset.steps;
    if (stepsList && stepsList.length > 0) {
      stepsList.forEach((step: any, idx: number) => {
        if (step.lawId && !map.has(step.lawId)) {
          map.set(step.lawId, step.stepNumber || (idx + 1));
        }
      });
    } else if (activePreset.enactedLawIds && Array.isArray(activePreset.enactedLawIds)) {
      activePreset.enactedLawIds.forEach((id, idx) => {
        map.set(id, idx + 1);
      });
    }
    return map;
  }, [activePreset]);

  // Preset recommended target level for each law
  const presetTargetLevelMap = useMemo(() => {
    const map = new Map<string, number>();
    if (activePreset.lawLevels) {
      Object.entries(activePreset.lawLevels).forEach(([id, lvl]) => {
        map.set(id, lvl);
      });
    } else {
      const stepsList = activePreset.sequenceSteps || activePreset.steps;
      if (stepsList && stepsList.length > 0) {
        stepsList.forEach((step: any) => {
          if (step.lawId) {
            map.set(step.lawId, step.level || step.targetLevel || 1);
          }
        });
      } else if (activePreset.enactedLawIds && Array.isArray(activePreset.enactedLawIds)) {
        activePreset.enactedLawIds.forEach(id => {
          map.set(id, 1);
        });
      }
    }
    return map;
  }, [activePreset]);

  // Calculate total spent points across all laws based on levels
  const pointsSpent = useMemo(() => {
    return (Object.entries(lawLevels) as [string, number][]).reduce((total, [lawId, level]) => {
      const lvl = Number(level) || 0;
      if (lvl <= 0) return total;
      const law = factionLaws.find(l => l.id === lawId);
      if (!law) return total;

      if (law.ranks && law.ranks.length > 0) {
        const rankIdx = Math.min(lvl - 1, law.ranks.length - 1);
        return total + (law.ranks[rankIdx]?.cumulativeCost || (lvl * law.costLaws));
      }
      return total + (lvl * law.costLaws);
    }, 0);
  }, [lawLevels, factionLaws]);

  // Maximum budget limit (50 Sellos recommended budget, or preset totalCost if higher, up to 100)
  const effectiveMaxPoints = Math.max(MAX_FACTION_LAW_POINTS, activePreset.totalCost || 50);
  const pointsRemaining = Math.max(0, effectiveMaxPoints - pointsSpent);

  // Branch points calculations (Canonical Ciudad vs Militar)
  const canonicalBranchStats = useMemo(() => {
    let ciudadCount = 0;
    let ciudadPoints = 0;
    let militarCount = 0;
    let militarPoints = 0;

    (Object.entries(lawLevels) as [string, number][]).forEach(([lawId, level]) => {
      const lvl = Number(level) || 0;
      if (lvl <= 0) return;
      const law = factionLaws.find(l => l.id === lawId);
      if (!law) return;

      const cost = law.ranks && law.ranks[lvl - 1]
        ? law.ranks[lvl - 1].cumulativeCost
        : lvl * law.costLaws;

      if (law.branchType === 'Ciudad') {
        ciudadCount++;
        ciudadPoints += cost;
      } else {
        militarCount++;
        militarPoints += cost;
      }
    });

    return { ciudadCount, ciudadPoints, militarCount, militarPoints };
  }, [lawLevels, factionLaws]);

  // Detailed branch subcategory points
  const subBranchPoints = useMemo(() => {
    const counts: Record<string, number> = { Militar: 0, Mágica: 0, Economía: 0, 'Héroes & Jadame': 0 };
    (Object.entries(lawLevels) as [string, number][]).forEach(([lawId, level]) => {
      const lvl = Number(level) || 0;
      if (lvl <= 0) return;
      const law = factionLaws.find(l => l.id === lawId);
      if (!law || !law.branch) return;

      const cost = law.ranks && law.ranks[lvl - 1]
        ? law.ranks[lvl - 1].cumulativeCost
        : lvl * law.costLaws;

      counts[law.branch] = (counts[law.branch] || 0) + cost;
    });
    return counts;
  }, [lawLevels, factionLaws]);

  // Check if a law can be unlocked
  const checkLawAvailability = (law: FactionLaw): { available: boolean; reason?: string } => {
    const currentLevel = lawLevels[law.id] || 0;
    if (currentLevel > 0) return { available: true };

    // Check prerequisite law if any
    if (law.prerequisiteLawId) {
      const prereqLevel = lawLevels[law.prerequisiteLawId] || 0;
      if (prereqLevel === 0) {
        const prereqLaw = factionLaws.find(l => l.id === law.prerequisiteLawId);
        return { available: false, reason: `Requiere: ${prereqLaw ? prereqLaw.name : 'Ley previa'}` };
      }
    }

    return { available: true };
  };

  // Toggle or increase/decrease level for a law
  const setLawLevel = (law: FactionLaw, targetLevel: number) => {
    const max = law.maxLevel || 1;
    const clampedLevel = Math.max(0, Math.min(targetLevel, max));

    if (clampedLevel > 0) {
      const { available } = checkLawAvailability(law);
      if (!available) return;
    }

    setLawLevels(prev => {
      const next = { ...prev };
      if (clampedLevel === 0) {
        delete next[law.id];
        // If disabling, also disable laws that have this as prerequisite
        factionLaws.filter(l => l.prerequisiteLawId === law.id).forEach(dep => {
          delete next[dep.id];
        });
      } else {
        next[law.id] = clampedLevel;
      }
      return next;
    });
  };

  const toggleLaw = (law: FactionLaw) => {
    const currentLevel = lawLevels[law.id] || 0;
    if (currentLevel > 0) {
      setLawLevel(law, 0);
    } else {
      const presetTarget = presetTargetLevelMap.get(law.id) || 1;
      setLawLevel(law, presetTarget);
    }
  };

  const increaseLawLevel = (law: FactionLaw, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const current = lawLevels[law.id] || 0;
    const max = law.maxLevel || 1;
    if (current < max) {
      setLawLevel(law, current + 1);
    }
  };

  const decreaseLawLevel = (law: FactionLaw, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const current = lawLevels[law.id] || 0;
    if (current > 0) {
      setLawLevel(law, current - 1);
    }
  };

  // Apply preset
  const applyPreset = (presetId: string) => {
    const preset = factionLawPresets.find(p => p.id === presetId);
    if (preset) {
      if (preset.lawLevels) {
        setLawLevels({ ...preset.lawLevels });
      } else {
        const newLevels: Record<string, number> = {};
        const stepsList = preset.sequenceSteps || preset.steps;
        if (stepsList && stepsList.length > 0) {
          stepsList.forEach((s: any) => {
            if (s.lawId) newLevels[s.lawId] = s.level || s.targetLevel || 1;
          });
        } else if (preset.enactedLawIds && Array.isArray(preset.enactedLawIds)) {
          preset.enactedLawIds.forEach(id => {
            newLevels[id] = 1;
          });
        }
        setLawLevels(newLevels);
      }
      setActivePresetId(presetId);
    }
  };

  // Reset all
  const resetLaws = () => {
    setLawLevels({});
  };

  // Sequence items for the active preset
  const sequenceItems = useMemo(() => {
    const stepsList = activePreset.sequenceSteps || activePreset.steps;
    if (stepsList && stepsList.length > 0) {
      let cumulative = 0;
      return stepsList.map((step: any, idx: number) => {
        const law = factionLaws.find(l => l.id === step.lawId);
        const lvl = step.targetLevel || step.level || 1;
        const currentLevel = lawLevels[step.lawId] || 0;
        const isEnactedAtThisLevel = currentLevel >= lvl;
        const stepNum = step.stepNumber || (idx + 1);
        const rankObj = law?.ranks?.[lvl - 1];
        const cost = step.cost || rankObj?.costLaws || law?.costLaws || 1;
        cumulative += cost;
        const timing = step.timing || step.dayWindow || rankObj?.recommendedUnlockTime || law?.recommendedUnlockTime || `Paso #${stepNum}`;
        const rationale = step.rationale || step.notes || rankObj?.tacticalImpact || law?.tacticalImpact || '';

        return {
          stepNumber: stepNum,
          lawId: step.lawId,
          level: lvl,
          law: law as FactionLaw,
          cost,
          cumulativeCost: step.cumulativeCost || cumulative,
          timing,
          rationale,
          isEnacted: isEnactedAtThisLevel,
          stepName: step.stepName || law?.name,
        };
      }).filter((item: any) => item.law !== undefined);
    }

    // Fallback if sequenceSteps/steps not defined: build from enactedLawIds
    let cumulative = 0;
    const lawIds = activePreset.enactedLawIds || [];
    return lawIds.map((id, idx) => {
      const law = factionLaws.find(l => l.id === id);
      if (!law) return null;
      const lvl = activePreset.lawLevels?.[id] || 1;
      const cost = law.ranks?.[lvl - 1]?.cumulativeCost || law.costLaws;
      cumulative += cost;
      const currentLevel = lawLevels[id] || 0;
      return {
        stepNumber: idx + 1,
        lawId: id,
        level: lvl,
        law,
        cost,
        cumulativeCost: cumulative,
        timing: law.recommendedUnlockTime,
        rationale: law.tacticalImpact,
        isEnacted: currentLevel >= lvl,
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
  }, [activePreset, lawLevels, factionLaws]);

  // Grouped laws by tier for tiers view
  const tiersData = useMemo(() => {
    const tierConfigs = [
      { tier: 1, name: 'Tier 1', minPts: 0, subtitle: `Fundamentos de ${meta.name} (Desbloqueado a 0 Pts Facción)` },
      { tier: 2, name: 'Tier 2', minPts: 5, subtitle: `Expansión de ${meta.name} (Desbloqueado a 5 Pts Facción)` },
      { tier: 3, name: 'Tier 3', minPts: 15, subtitle: `Consolidación de Élite & Tácticas (Desbloqueado a 15 Pts Facción)` },
      { tier: 4, name: 'Tier 4', minPts: 30, subtitle: `Dominio de Guerra & Maestría (Desbloqueado a 30 Pts Facción)` },
      { tier: 5, name: 'Tier 5', minPts: 50, subtitle: `Leyes Maestras & Cúspide de Poder (Desbloqueado a 50 Pts Facción)` },
    ];

    return tierConfigs.map(cfg => {
      let lawsInTier = factionLaws.filter(l => l.tier === cfg.tier);
      if (selectedBranchFilter !== 'all') {
        lawsInTier = lawsInTier.filter(l => l.branchType === selectedBranchFilter);
      }
      if (onlyPresetLaws) {
        lawsInTier = lawsInTier.filter(l => presetSelectionOrderMap.has(l.id));
      }
      // Sort: Preset laws first in order of selection, then by priorityOrder
      lawsInTier.sort((a, b) => {
        const orderA = presetSelectionOrderMap.get(a.id) ?? 999;
        const orderB = presetSelectionOrderMap.get(b.id) ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        return a.priorityOrder - b.priorityOrder;
      });

      return {
        ...cfg,
        laws: lawsInTier,
        totalInTier: factionLaws.filter(l => l.tier === cfg.tier).length,
      };
    });
  }, [selectedBranchFilter, onlyPresetLaws, presetSelectionOrderMap, factionLaws, meta.name]);

  // Grouped laws by canonical branch (Ciudad vs Militar)
  const canonicalBranchesData = useMemo(() => {
    const branches = [
      {
        type: 'Ciudad' as const,
        title: 'Rama de Ciudad & Facción (Economía, Crecimiento y Gobernanza)',
        description: `Multiplica el crecimiento semanal de criaturas, bonifica la producción de recursos e ingresos del Capitolio y optimiza el avance territorial de ${meta.name}.`,
        icon: Landmark,
        colorTheme: 'emerald',
      },
      {
        type: 'Militar' as const,
        title: 'Rama Militar & Ejército (Criaturas de Élite, Magia y Combate)',
        description: `Potencia el daño, supervivencia y habilidades únicas de las unidades de ${meta.name}, y eleva la maestría en combate y hechizos.`,
        icon: Swords,
        colorTheme: 'red',
      },
    ];

    return branches.map(b => {
      let laws = factionLaws.filter(l => l.branchType === b.type);
      if (selectedTierFilter !== 'all') {
        laws = laws.filter(l => l.tier === selectedTierFilter);
      }
      if (onlyPresetLaws) {
        laws = laws.filter(l => presetSelectionOrderMap.has(l.id));
      }
      // Sort: Preset laws first in order of selection, then by tier and priorityOrder
      laws.sort((a, b) => {
        const orderA = presetSelectionOrderMap.get(a.id) ?? 999;
        const orderB = presetSelectionOrderMap.get(b.id) ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.priorityOrder - b.priorityOrder;
      });

      const activeLawsCount = laws.filter(l => (lawLevels[l.id] || 0) > 0).length;

      return {
        ...b,
        laws,
        totalLaws: factionLaws.filter(l => l.branchType === b.type).length,
        enactedCount: activeLawsCount,
      };
    });
  }, [selectedTierFilter, onlyPresetLaws, presetSelectionOrderMap, lawLevels, factionLaws, meta.name]);

  // Helper to get active rank info for a law
  const getLawRankInfo = (law: FactionLaw, level: number): LawRank | null => {
    if (!law.ranks || law.ranks.length === 0) return null;
    const idx = Math.max(0, Math.min(level - 1, law.ranks.length - 1));
    return law.ranks[idx] || null;
  };

  return (
    <div className="space-y-6" id="faction-laws-tree-root">
      {/* Top Banner & Interactive Law Points HUD */}
      <div className={`bg-black/60 border ${theme.border} rounded-2xl p-4 sm:p-6 ${theme.shadowAccent} backdrop-blur-md transition-colors duration-300`}>
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b ${theme.borderSubtle}`}>
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`${theme.bgBadge} ${theme.textAccent} text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border ${theme.borderSubtle} flex items-center gap-1.5 font-mono`}>
                <Scroll className="w-3.5 h-3.5 text-amber-400" />
                Árbol de Leyes de Facción • {meta.name}
              </span>
              <span className="text-[11px] text-amber-400 font-mono font-bold bg-amber-950/70 px-2.5 py-0.5 rounded border border-amber-600/60 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-300" />
                Presupuesto Ampliado: 50 Sellos de Ley
              </span>
              <span className={`text-[11px] ${theme.textAccent} font-mono font-bold ${theme.bgBadge} px-2.5 py-0.5 rounded border ${theme.borderSubtle}`}>
                Cap Máximo Absoluto del Motor: {MAX_OLDEN_ERA_LAW_SEALS} Sellos
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif text-white uppercase tracking-wide flex items-center gap-2">
              <span>Leyes y Decretos de {meta.name}</span>
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-3xl leading-relaxed">
              En <em>Heroes of Might and Magic: Olden Era</em>, el árbol de leyes de <strong>{meta.name}</strong> cuenta con <strong>{factionLaws.length} Decretos multinivel</strong> distribuidos en <strong>5 Tiers</strong> y <strong>2 Ramas Canónicas (Ciudad y Militar)</strong>. Selecciona un Preset táctico para visualizar en <strong>estricto orden de selección (1º, 2º, 3º...)</strong> las leyes recomendadas y sus rangos de mejora con un presupuesto de <strong>50 Sellos de Ley</strong>.
            </p>
          </div>

          {/* Points Progress Gauge */}
          <div className={`flex items-center gap-3 ${theme.bgBadge} border ${theme.borderSubtle} p-3 sm:p-4 rounded-xl shrink-0`}>
            <div className="text-center min-w-[90px]">
              <span className={`text-[10px] uppercase font-mono ${theme.textAccent} font-bold block`}>Sellos Invertidos</span>
              <div className="text-2xl font-mono font-bold text-amber-400">
                {pointsSpent} <span className="text-xs text-slate-400">/ {effectiveMaxPoints}</span>
              </div>
            </div>

            <div className={`w-px h-10 ${theme.borderSubtle}`}></div>

            <div className="text-center min-w-[85px]">
              <span className={`text-[10px] uppercase font-mono ${theme.textAccent} font-bold block`}>Disponibles</span>
              <div className={`text-2xl font-mono font-bold ${pointsRemaining === 0 ? 'text-emerald-400' : 'text-white'}`}>
                {pointsRemaining}
              </div>
            </div>

            <button
              id="btn-show-point-rules"
              onClick={() => setShowLawPointRules(!showLawPointRules)}
              className={`p-2 rounded-lg ${theme.bgBadge} hover:brightness-125 border ${theme.borderSubtle} ${theme.textAccent} transition-all text-xs flex flex-col items-center gap-1 cursor-pointer`}
              title="Ver reglas oficiales y cómo obtener hasta 50 y 100 Sellos de Ley"
            >
              <Info className="w-4 h-4 text-cyan-400" />
              <span className="text-[9px] font-mono uppercase font-bold">Tope & Fuentes</span>
            </button>
          </div>
        </div>

        {/* Collapsible Info Panel on Maximum Law Points & Sources */}
        {showLawPointRules && (
          <div className={`mt-4 p-4 rounded-xl ${theme.bgBadge} border border-amber-600/60 text-xs space-y-3 animate-in fade-in duration-200`}>
            <div className={`flex items-center justify-between border-b ${theme.borderSubtle} pb-2`}>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-300 uppercase font-mono text-xs">
                  Mecánica Oficial: ¿Cuántos Puntos y Sellos de Ley se pueden obtener como máximo?
                </span>
              </div>
              <button 
                onClick={() => setShowLawPointRules(false)}
                className={`text-slate-400 hover:text-white text-xs font-mono cursor-pointer px-2 py-0.5 bg-black/40 rounded border ${theme.borderSubtle}`}
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-200 text-xs leading-relaxed">
              <div className={`bg-black/60 p-3 rounded-lg border ${theme.borderSubtle}`}>
                <div className="text-amber-400 font-bold font-mono text-xs uppercase mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  1. Presupuesto Óptimo de 50 Sellos
                </div>
                <p className="text-[11px] text-slate-300">
                  Con la presencia de <strong>múltiples rangos y mejoras</strong> por decreto, el presupuesto estratégico estándar de la campaña de 56 días se expande a <strong>50 Sellos de Ley</strong>, permitiendo desbloquear tanto leyes maestras de Tier 5 como rangos II y III en unidades clave.
                </p>
              </div>

              <div className={`bg-black/60 p-3 rounded-lg border ${theme.borderSubtle}`}>
                <div className={`${theme.textAccent} font-bold font-mono text-xs uppercase mb-1 flex items-center gap-1.5`}>
                  <Crown className="w-3.5 h-3.5 text-yellow-300" />
                  2. Tope Máximo del Motor (100 Sellos)
                </div>
                <p className="text-[11px] text-slate-300">
                  El motor de <em>Olden Era</em> fija un límite máximo absoluto de <strong>100 Sellos de Ley acumulables</strong> por partida. Esto permite en mapas gigantescos y partidas multijugador prolongadas llegar a promulgar prácticamente todas las leyes y sus rangos máximos.
                </p>
              </div>

              <div className={`bg-black/60 p-3 rounded-lg border ${theme.borderSubtle}`}>
                <div className="text-emerald-400 font-bold font-mono text-xs uppercase mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  3. Generación Diaria & Fuentes
                </div>
                <p className="text-[11px] text-slate-300">
                  Los puntos se acumulan pasivamente cada día a través de los edificios municipales (Sede, Ayuntamiento, Palacio y Capitolio) y por la experiencia (EXP) que ganan los héroes en cada combate victorioso.
                </p>
              </div>
            </div>

            {/* Sources Table */}
            <div className="pt-2">
              <span className={`text-[11px] font-mono font-bold ${theme.textAccent} uppercase block mb-1.5`}>
                Desglose de Fuentes de Obtención de Puntos de Ley:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {LAW_POINT_SOURCES.map((src, idx) => (
                  <div key={idx} className={`bg-black/50 p-2 rounded-lg border ${theme.borderSubtle} flex items-start justify-between gap-2`}>
                    <div>
                      <div className="text-slate-100 font-semibold text-[11px]">{src.source}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{src.detail}</div>
                    </div>
                    <span className={`font-mono font-bold text-amber-400 text-[11px] shrink-0 bg-black/80 px-1.5 py-0.5 rounded border ${theme.borderSubtle}`}>
                      +{src.points} Pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preset Selector Banner */}
        <div className={`mt-4 pt-3 border-t ${theme.borderSubtle}`}>
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                Seleccionar Preset Táctico:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {factionLawPresets.map((preset) => {
                  const isSelected = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      id={`preset-btn-${preset.id}`}
                      onClick={() => applyPreset(preset.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-300'
                          : `${theme.bgBadge} text-slate-300 hover:text-white hover:brightness-125 border ${theme.borderSubtle}`
                      }`}
                    >
                      <span>{preset.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-black/30 text-amber-100' : `bg-black/40 ${theme.textAccent}`}`}>
                        {preset.totalCost} Pts
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end xl:self-auto">
              <button
                onClick={resetLaws}
                className="px-2.5 py-1 text-xs rounded-lg font-mono font-semibold bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 flex items-center gap-1 cursor-pointer transition-all"
                title="Limpiar todas las leyes promulgadas"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Desmarcar Todas</span>
              </button>
            </div>
          </div>

          {/* Active Preset Focus Description */}
          <div className={`mt-3 p-3 rounded-xl ${theme.bgBadge} border ${theme.borderSubtle} flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs`}>
            <div>
              <span className="text-amber-300 font-bold font-mono block mb-0.5">
                ★ Estrategia del Preset: {activePreset.name} ({activePreset.tag}) — Presupuesto: {activePreset.totalCost} Sellos
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {activePreset.strategyFocus}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono">
              <span className="bg-emerald-950/80 text-emerald-300 px-2 py-1 rounded border border-emerald-700/60 flex items-center gap-1">
                <Landmark className="w-3 h-3" /> Ciudad: {canonicalBranchStats.ciudadPoints} Pts ({canonicalBranchStats.ciudadCount} Leyes)
              </span>
              <span className="bg-red-950/80 text-red-300 px-2 py-1 rounded border border-red-700/60 flex items-center gap-1">
                <Swords className="w-3 h-3" /> Militar: {canonicalBranchStats.militarPoints} Pts ({canonicalBranchStats.militarCount} Leyes)
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className={`mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t ${theme.borderSubtle}`}>
          <div className={`flex items-center gap-1 bg-black/70 p-1 rounded-xl border ${theme.borderSubtle} overflow-x-auto no-scrollbar`}>
            <button
              id="view-tab-sequence"
              onClick={() => setViewMode('sequence')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all font-mono cursor-pointer whitespace-nowrap ${
                viewMode === 'sequence'
                  ? 'bg-amber-600 text-black shadow-[0_0_12px_rgba(245,158,11,0.6)] font-extrabold'
                  : `text-slate-300 hover:text-white hover:${theme.bgBadge}`
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>1. Ruta de Selección del Preset (Orden #1 a #N)</span>
            </button>

            <button
              id="view-tab-tiers"
              onClick={() => setViewMode('tiers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all font-mono cursor-pointer whitespace-nowrap ${
                viewMode === 'tiers'
                  ? `${theme.primaryButton} text-white shadow-lg`
                  : `text-slate-300 hover:text-white hover:${theme.bgBadge}`
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Por Tiers (Tier 1 a 5)</span>
            </button>

            <button
              id="view-tab-branches"
              onClick={() => setViewMode('branches')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all font-mono cursor-pointer whitespace-nowrap ${
                viewMode === 'branches'
                  ? `${theme.primaryButton} text-white shadow-lg`
                  : `text-slate-300 hover:text-white hover:${theme.bgBadge}`
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>3. Por Ramas (Ciudad vs Militar)</span>
            </button>

            <button
              id="view-tab-matrix"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all font-mono cursor-pointer whitespace-nowrap ${
                viewMode === 'matrix'
                  ? `${theme.primaryButton} text-white shadow-lg`
                  : `text-slate-300 hover:text-white hover:${theme.bgBadge}`
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>4. Matriz Completa & Niveles ({factionLaws.length} Leyes)</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setOnlyPresetLaws(!onlyPresetLaws)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all border flex items-center gap-1 cursor-pointer ${
                onlyPresetLaws
                  ? 'bg-amber-950 text-amber-300 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : `bg-black/50 text-slate-400 ${theme.borderSubtle} hover:text-slate-200`
              }`}
            >
              <Filter className="w-3 h-3" />
              <span>Solo Leyes del Preset</span>
            </button>

            <div className={`flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border ${theme.borderSubtle} text-xs font-mono`}>
              <span className={`text-[10px] ${theme.textAccent} px-1 uppercase font-bold`}>Rama:</span>
              {(['all', 'Ciudad', 'Militar'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBranchFilter(b)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                    selectedBranchFilter === b
                      ? `${theme.bgBadge} text-white font-bold`
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {b === 'all' ? 'Todas' : b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Buffs & Synergy Live Summary Panel */}
      <div className={`bg-black/50 border ${theme.borderSubtle} rounded-2xl p-4`}>
        <div
          onClick={() => setShowBuffSummary(!showBuffSummary)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className={`text-xs font-bold uppercase tracking-wider ${theme.textAccent} font-mono`}>
              Resumen de Efectos Activos del Preset ({Object.keys(lawLevels).length} Decretos Activos • {pointsSpent} / {effectiveMaxPoints} Sellos Invertidos)
            </span>
          </div>
          <button className={`${theme.textAccent} hover:text-white p-1 cursor-pointer`}>
            {showBuffSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showBuffSummary && (
          <div className={`mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs pt-2 border-t ${theme.borderSubtle}`}>
            {/* Rama Ciudad / Economía */}
            <div className={`${theme.bgBadge} border border-emerald-900/50 rounded-xl p-3`}>
              <span className="text-[11px] text-emerald-400 font-mono font-bold block uppercase mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1"><Landmark className="w-3.5 h-3.5" /> Rama Ciudad ({canonicalBranchStats.ciudadPoints} Pts)</span>
                <span className="text-[10px] text-slate-400">{canonicalBranchStats.ciudadCount} Leyes</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {canonicalBranchStats.ciudadCount > 0 
                  ? `${canonicalBranchStats.ciudadCount} decretos de economía, ingresos de oro y crecimiento de población activos.`
                  : 'Ninguna ley de ciudad promulgada.'}
              </p>
            </div>

            {/* Rama Militar / Ejército */}
            <div className={`${theme.bgBadge} border border-red-900/50 rounded-xl p-3`}>
              <span className="text-[11px] text-red-400 font-mono font-bold block uppercase mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1"><Swords className="w-3.5 h-3.5" /> Rama Militar ({canonicalBranchStats.militarPoints} Pts)</span>
                <span className="text-[10px] text-slate-400">{canonicalBranchStats.militarCount} Leyes</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {canonicalBranchStats.militarCount > 0
                  ? `${canonicalBranchStats.militarCount} decretos de combate, tropas de élite y letalidad de criaturas activos.`
                  : 'Ninguna ley militar promulgada.'}
              </p>
            </div>

            {/* Magia & Grimorio */}
            <div className={`${theme.bgBadge} border border-cyan-900/50 rounded-xl p-3`}>
              <span className="text-[11px] text-cyan-400 font-mono font-bold block uppercase mb-1 flex items-center gap-1">
                <Wand2 className="w-3.5 h-3.5" /> Dominio Arcano ({subBranchPoints.Mágica || 0} Pts)
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {subBranchPoints.Mágica > 0
                  ? 'Potenciación arcana, maná ampliado y letalidad de hechizos de facción.'
                  : 'Capacidad arcana base.'}
              </p>
            </div>

            {/* Héroes & Mapa */}
            <div className={`${theme.bgBadge} border border-amber-900/50 rounded-xl p-3`}>
              <span className="text-[11px] text-amber-400 font-mono font-bold block uppercase mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Héroes & Mapa ({subBranchPoints['Héroes & Jadame'] || 0} Pts)
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {subBranchPoints['Héroes & Jadame'] > 0
                  ? 'Bonificación de experiencia en combate, moral y movilidad en el mapa.'
                  : 'Atributos heroicos base.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: RUTA DE SELECCIÓN CRONOLÓGICA DEL PRESET (#1 a #N) */}
      {/* ========================================================================= */}
      {viewMode === 'sequence' && (
        <div className="space-y-4">
          <div className={`bg-gradient-to-r from-amber-950/60 via-black/40 to-black/60 border border-amber-500/40 rounded-2xl p-4 sm:p-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-900/40">
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-amber-300 flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-amber-400" />
                  Orden Secuencial Recomendado de Promulgación: {activePreset.name}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Secuencia paso a paso recomendada desde el Día 1 de la partida con el presupuesto ampliado de 50 Sellos de Ley, detallando el orden de desbloqueo y mejoras de rango.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-black/60 px-3 py-1 rounded-lg border border-amber-600/50 self-start sm:self-auto shrink-0">
                {sequenceItems.length} Pasos de Secuencia • {activePreset.totalCost} Sellos Totales
              </span>
            </div>

            {/* Step-by-step Ordered List */}
            <div className="mt-4 space-y-3">
              {sequenceItems.map((step) => {
                const law = step.law;
                const isBranchCiudad = law.branchType === 'Ciudad';
                const branchBadgeClass = isBranchCiudad
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                  : 'bg-red-950/80 text-red-300 border-red-700/60';
                
                const rankData = getLawRankInfo(law, step.level);
                const currentLawLevel = lawLevels[law.id] || 0;

                return (
                  <div
                    key={`${step.stepNumber}-${law.id}-${step.level}`}
                    id={`preset-step-${step.stepNumber}-${law.id}`}
                    onClick={() => toggleLaw(law)}
                    className={`rounded-xl p-4 border transition-all cursor-pointer relative overflow-hidden backdrop-blur-sm ${
                      step.isEnacted
                        ? `${theme.bgBadge} border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/40`
                        : `bg-black/50 ${theme.borderSubtle} hover:border-amber-400/60 hover:bg-black/70`
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      {/* Left: Step Badge & Law Identity */}
                      <div className="flex items-start gap-3">
                        {/* Step Number Circle */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-black font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                          #{step.stepNumber}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${branchBadgeClass} flex items-center gap-1`}>
                              {isBranchCiudad ? <Landmark className="w-3 h-3" /> : <Swords className="w-3 h-3" />}
                              Rama {law.branchType} ({law.category})
                            </span>
                            <span className={`text-[10px] font-mono font-bold ${theme.bgBadge} ${theme.textAccent} px-2 py-0.5 rounded border ${theme.borderSubtle}`}>
                              Tier {law.tier} ({law.tierMinPoints} Pts Facción)
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-700/60">
                              Rango / Nivel {step.level}{law.maxLevel > 1 ? ` de ${law.maxLevel}` : ''}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-amber-900/50">
                              Coste: {step.cost} Sello{step.cost > 1 ? 's' : ''} (Acumulado: {step.cumulativeCost} Pts)
                            </span>
                            {law.isUltimate && (
                              <span className="text-[9px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700/60 px-1.5 py-0.2 rounded flex items-center gap-1">
                                <Crown className="w-2.5 h-2.5" /> Ley Maestra
                              </span>
                            )}
                          </div>

                          <h4 className="text-base font-serif font-bold text-white tracking-wide">
                            {law.name} <span className={`text-xs font-mono font-normal ${theme.textAccent}`}>({law.nameEn})</span>
                          </h4>

                          {/* Recommended Unlock Time in Calendar */}
                          <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-300 font-mono">
                            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span><strong>Momento Táctico:</strong> {step.timing}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Enact Toggle Button & Level Adjust */}
                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        {law.maxLevel > 1 && (
                          <div className={`flex items-center gap-1 bg-black/70 p-1 rounded-lg border ${theme.borderSubtle} font-mono text-xs`} onClick={e => e.stopPropagation()}>
                            <button
                              onClick={(e) => decreaseLawLevel(law, e)}
                              disabled={currentLawLevel <= 0}
                              className={`w-6 h-6 rounded ${theme.bgBadge} hover:brightness-125 disabled:opacity-30 ${theme.textAccent} flex items-center justify-center cursor-pointer disabled:cursor-not-allowed`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-bold text-amber-300 text-xs">
                              Nv {currentLawLevel}/{law.maxLevel}
                            </span>
                            <button
                              onClick={(e) => increaseLawLevel(law, e)}
                              disabled={currentLawLevel >= law.maxLevel}
                              className={`w-6 h-6 rounded ${theme.bgBadge} hover:brightness-125 disabled:opacity-30 ${theme.textAccent} flex items-center justify-center cursor-pointer disabled:cursor-not-allowed`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {step.isEnacted ? (
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-700/60 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Promulgada (Nv {currentLawLevel})
                          </span>
                        ) : (
                          <span className={`text-xs font-mono font-semibold ${theme.textAccent} ${theme.bgBadge} px-3 py-1.5 rounded-lg border ${theme.borderSubtle} hover:brightness-125 hover:text-white flex items-center gap-1.5`}>
                            <Circle className="w-4 h-4 text-slate-400" /> Promulgar
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Effect and Tactical Rationale for this rank */}
                    <div className={`mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs pt-2.5 border-t ${theme.borderSubtle}`}>
                      <div className="bg-black/50 p-2.5 rounded-lg border border-slate-900">
                        <span className={`${theme.textAccent} font-mono font-bold text-[11px] block mb-1`}>
                          Efecto del Rango {step.level}:
                        </span>
                        <p className="text-slate-200 leading-relaxed text-[11px]">
                          {rankData ? rankData.effect : law.effect}
                        </p>
                      </div>

                      <div className="bg-black/50 p-2.5 rounded-lg border border-slate-900">
                        <span className="text-amber-300 font-mono font-bold text-[11px] block mb-1">
                          Justificación en este Paso:
                        </span>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          {step.rationale || (rankData ? rankData.tacticalImpact : law.tacticalImpact)} <span className={`${theme.textAccent} italic`}>({law.synergy})</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: ORGANIZADO POR TIERS (TIER 1 A TIER 5) */}
      {/* ========================================================================= */}
      {viewMode === 'tiers' && (
        <div className="space-y-6">
          {tiersData.map((tierBlock) => (
            <div key={tierBlock.tier} className={`bg-black/40 border ${theme.borderSubtle} rounded-2xl p-4 sm:p-5`}>
              {/* Tier Header */}
              <div className={`flex items-center justify-between pb-3 border-b ${theme.borderSubtle} mb-4 flex-wrap gap-2`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded ${theme.bgBadge} border ${theme.borderSubtle} ${theme.textAccent}`}>
                    {tierBlock.name}
                  </span>
                  <span className="text-xs text-slate-300 font-sans font-medium">
                    {tierBlock.subtitle}
                  </span>
                </div>
                <div className={`text-xs font-mono ${theme.textAccent}`}>
                  {tierBlock.laws.filter(l => (lawLevels[l.id] || 0) > 0).length} / {tierBlock.totalInTier} Promulgadas
                </div>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {tierBlock.laws.map((law) => {
                  const currentLevel = lawLevels[law.id] || 0;
                  const isEnacted = currentLevel > 0;
                  const selectionOrder = presetSelectionOrderMap.get(law.id);
                  const presetTargetLevel = presetTargetLevelMap.get(law.id) || 1;
                  const { available, reason } = checkLawAvailability(law);
                  const isBranchCiudad = law.branchType === 'Ciudad';
                  const branchBadgeColor = isBranchCiudad
                    ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50'
                    : 'text-red-400 bg-red-950/50 border-red-800/50';

                  const rankData = getLawRankInfo(law, currentLevel > 0 ? currentLevel : presetTargetLevel);

                  return (
                    <div
                      key={law.id}
                      id={`tier-card-${law.id}`}
                      onClick={() => toggleLaw(law)}
                      className={`rounded-xl p-4 border transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                        isEnacted
                          ? `${theme.bgBadge} ${theme.border} shadow-lg ring-1 ring-amber-400/40`
                          : available
                          ? `bg-black/50 ${theme.borderSubtle} hover:border-amber-400/60 hover:bg-black/70`
                          : 'bg-black/30 border-slate-900 opacity-60 hover:opacity-80'
                      }`}
                    >
                      {/* Selection Order in Active Preset Badge */}
                      {selectionOrder !== undefined && (
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-700 text-black font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-bl-lg shadow-md flex items-center gap-1">
                          <CheckCheck className="w-3 h-3" />
                          #{selectionOrder} en Preset (Nv {presetTargetLevel})
                        </div>
                      )}

                      <div>
                        {/* Top Meta Header */}
                        <div className="flex items-center justify-between gap-2 mb-2 pr-24 flex-wrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${branchBadgeColor}`}>
                              {law.branchType} • {law.category}
                            </span>
                            <span className="text-[10px] font-mono text-amber-400 font-bold">
                              {law.costLaws} Sello{law.costLaws > 1 ? 's' : ''}/nv
                            </span>
                            {law.maxLevel > 1 && (
                              <span className={`text-[10px] font-mono ${theme.textAccent} ${theme.bgBadge} px-1.5 py-0.2 rounded border ${theme.borderSubtle}`}>
                                Max Nv {law.maxLevel}
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="text-sm font-serif font-bold text-white tracking-wide mb-0.5 leading-snug">
                          {law.name}
                        </h4>
                        <div className={`text-[11px] ${theme.textAccent} font-mono mb-2`}>
                          {law.nameEn}
                        </div>

                        {/* Level selector if multi-level */}
                        {law.maxLevel > 1 && (
                          <div className={`mb-2 flex items-center gap-1 bg-black/60 p-1 rounded-lg border ${theme.borderSubtle}`} onClick={e => e.stopPropagation()}>
                            <span className="text-[10px] font-mono text-slate-400 px-1">Rango:</span>
                            {Array.from({ length: law.maxLevel }, (_, i) => i + 1).map(lvl => (
                              <button
                                key={lvl}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLawLevel(law, lvl);
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                  currentLevel === lvl
                                    ? 'bg-amber-600 text-black shadow'
                                    : `${theme.bgBadge} ${theme.textAccent} hover:text-white`
                                }`}
                              >
                                Nv {lvl}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Effect */}
                        <p className={`text-xs text-slate-200 leading-relaxed bg-black/40 p-2 rounded-lg border border-slate-900 mt-1`}>
                          {rankData ? rankData.effect : law.effect}
                        </p>

                        {/* Tactical Impact */}
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                          <strong className={`${theme.textAccent} font-mono`}>Táctica:</strong> {rankData?.tacticalImpact || law.tacticalImpact}
                        </p>

                        {/* Lock Warning if Unavailable */}
                        {!isEnacted && !available && (
                          <div className="mt-2 text-[10px] font-mono text-rose-400 bg-rose-950/30 p-1.5 rounded border border-rose-900/40 flex items-center gap-1">
                            <Lock className="w-3 h-3 shrink-0" />
                            <span>{reason}</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Status */}
                      <div className={`mt-3 pt-2.5 border-t ${theme.borderSubtle} flex items-center justify-between text-[10px]`}>
                        <span className={`${theme.textAccent} font-mono truncate max-w-[140px]`}>
                          {law.recommendedUnlockTime.split('-')[0]}
                        </span>
                        <div className="flex items-center gap-1 font-mono font-bold">
                          {isEnacted ? (
                            <span className="text-emerald-400 flex items-center gap-0.5">
                              <Check className="w-3.5 h-3.5" /> Promulgada (Nv {currentLevel})
                            </span>
                          ) : available ? (
                            <span className={`${theme.textAccent} hover:text-white`}>+ Promulgar</span>
                          ) : (
                            <span className="text-slate-500 flex items-center gap-0.5">
                              <Lock className="w-3 h-3" /> Bloqueada
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 3: ORGANIZADO POR RAMAS CANÓNICAS (CIUDAD VS MILITAR) */}
      {/* ========================================================================= */}
      {viewMode === 'branches' && (
        <div className="space-y-6">
          {canonicalBranchesData.map((branch) => {
            const Icon = branch.icon;
            const isCiudad = branch.type === 'Ciudad';
            const badgeClass = isCiudad
              ? 'text-emerald-400 border-emerald-700/60 bg-emerald-950/60'
              : 'text-red-400 border-red-700/60 bg-red-950/60';

            return (
              <div key={branch.type} className={`bg-black/40 border ${theme.borderSubtle} rounded-2xl p-4 sm:p-5`}>
                {/* Branch Header */}
                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b ${theme.borderSubtle} mb-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded border flex items-center gap-1.5 ${badgeClass}`}>
                        <Icon className="w-4 h-4" />
                        {branch.title}
                      </span>
                      <span className={`text-xs font-mono ${theme.textAccent}`}>
                        {branch.enactedCount} / {branch.totalLaws} Decretos Activos
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                      {branch.description}
                    </p>
                  </div>

                  <div className={`text-xs font-mono font-bold text-amber-400 bg-black/60 px-3 py-1.5 rounded-lg border ${theme.borderSubtle} self-start md:self-auto shrink-0`}>
                    Sellos en {branch.type}: {isCiudad ? canonicalBranchStats.ciudadPoints : canonicalBranchStats.militarPoints} Pts
                  </div>
                </div>

                {/* Grid for this branch */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                  {branch.laws.map((law) => {
                    const currentLevel = lawLevels[law.id] || 0;
                    const isEnacted = currentLevel > 0;
                    const selectionOrder = presetSelectionOrderMap.get(law.id);
                    const presetTargetLevel = presetTargetLevelMap.get(law.id) || 1;
                    const { available, reason } = checkLawAvailability(law);
                    const rankData = getLawRankInfo(law, currentLevel > 0 ? currentLevel : presetTargetLevel);

                    return (
                      <div
                        key={law.id}
                        onClick={() => toggleLaw(law)}
                        className={`rounded-xl p-4 border transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                          isEnacted
                            ? `${theme.bgBadge} ${theme.border} shadow-lg ring-1 ring-amber-400/40`
                            : available
                            ? `bg-black/50 ${theme.borderSubtle} hover:border-amber-400/60 hover:bg-black/70`
                            : 'bg-black/30 border-slate-900 opacity-60 hover:opacity-80'
                        }`}
                      >
                        {selectionOrder !== undefined && (
                          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-700 text-black font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-bl-lg shadow-md flex items-center gap-1">
                            <CheckCheck className="w-3 h-3" />
                            #{selectionOrder} en Preset (Nv {presetTargetLevel})
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5 pr-24">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-black/70 border ${theme.borderSubtle} ${theme.textAccent}`}>
                                Tier {law.tier} ({law.tierMinPoints} Pts)
                              </span>
                              <span className="text-[10px] font-mono text-amber-400 font-bold">
                                {law.costLaws} Sello{law.costLaws > 1 ? 's' : ''}/nv
                              </span>
                            </div>
                          </div>

                          <h4 className="text-sm font-serif font-bold text-white tracking-wide mb-0.5 leading-snug">
                            {law.name}
                          </h4>
                          <div className={`text-[11px] ${theme.textAccent} font-mono mb-2`}>
                            {law.nameEn}
                          </div>

                          {/* Level selector if multi-level */}
                          {law.maxLevel > 1 && (
                            <div className={`mb-2 flex items-center gap-1 bg-black/60 p-1 rounded-lg border ${theme.borderSubtle}`} onClick={e => e.stopPropagation()}>
                              <span className="text-[10px] font-mono text-slate-400 px-1">Rango:</span>
                              {Array.from({ length: law.maxLevel }, (_, i) => i + 1).map(lvl => (
                                <button
                                  key={lvl}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLawLevel(law, lvl);
                                  }}
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                    currentLevel === lvl
                                      ? 'bg-amber-600 text-black shadow'
                                      : `${theme.bgBadge} ${theme.textAccent} hover:text-white`
                                  }`}
                                >
                                  Nv {lvl}
                                </button>
                              ))}
                            </div>
                          )}

                          <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-2 rounded-lg border border-slate-900 mt-1">
                            {rankData ? rankData.effect : law.effect}
                          </p>

                          {!isEnacted && !available && (
                            <div className="mt-2 text-[10px] font-mono text-rose-400 bg-rose-950/30 p-1.5 rounded border border-rose-900/40 flex items-center gap-1">
                              <Lock className="w-3 h-3 shrink-0" />
                              <span>{reason}</span>
                            </div>
                          )}
                        </div>

                        <div className={`mt-3 pt-2.5 border-t ${theme.borderSubtle} flex items-center justify-between text-[10px]`}>
                          <span className={`${theme.textAccent} font-mono truncate max-w-[140px]`}>
                            {law.recommendedUnlockTime.split('-')[0]}
                          </span>
                          <div className="flex items-center gap-1 font-mono font-bold">
                            {isEnacted ? (
                              <span className="text-emerald-400 flex items-center gap-0.5">
                                <Check className="w-3.5 h-3.5" /> Promulgada (Nv {currentLevel})
                              </span>
                            ) : available ? (
                              <span className={`${theme.textAccent} hover:text-white`}>+ Promulgar</span>
                            ) : (
                              <span className="text-slate-500 flex items-center gap-0.5">
                                <Lock className="w-3 h-3" /> Bloqueada
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 4: MATRIZ COMPLETA (33 LEYES FILTRABLES CON NIVELES) */}
      {/* ========================================================================= */}
      {viewMode === 'matrix' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {factionLaws.filter(l => {
              const matchesBranch = selectedBranchFilter === 'all' || l.branchType === selectedBranchFilter;
              const matchesTier = selectedTierFilter === 'all' || l.tier === selectedTierFilter;
              const matchesPreset = !onlyPresetLaws || presetSelectionOrderMap.has(l.id);
              return matchesBranch && matchesTier && matchesPreset;
            }).sort((a, b) => {
              const orderA = presetSelectionOrderMap.get(a.id) ?? 999;
              const orderB = presetSelectionOrderMap.get(b.id) ?? 999;
              if (orderA !== orderB) return orderA - orderB;
              return a.priorityOrder - b.priorityOrder;
            }).map((law) => {
              const currentLevel = lawLevels[law.id] || 0;
              const isEnacted = currentLevel > 0;
              const selectionOrder = presetSelectionOrderMap.get(law.id);
              const presetTargetLevel = presetTargetLevelMap.get(law.id) || 1;
              const { available, reason } = checkLawAvailability(law);
              const isBranchCiudad = law.branchType === 'Ciudad';
              const badgeColor = isBranchCiudad
                ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50'
                : 'text-red-400 bg-red-950/50 border-red-800/50';

              const rankData = getLawRankInfo(law, currentLevel > 0 ? currentLevel : presetTargetLevel);

              return (
                <div
                  key={law.id}
                  onClick={() => toggleLaw(law)}
                  className={`rounded-xl p-4 sm:p-5 border transition-all cursor-pointer relative overflow-hidden backdrop-blur-sm ${
                    isEnacted
                      ? `${theme.bgBadge} ${theme.border} shadow-lg ring-1 ring-amber-400/40`
                      : available
                      ? `bg-black/50 ${theme.borderSubtle} hover:border-amber-400/60 hover:bg-black/70`
                      : 'bg-black/30 border-slate-900 opacity-60'
                  }`}
                >
                  {/* Top Right Order & Checkbox */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {selectionOrder !== undefined && (
                      <span className="text-[10px] font-mono font-bold bg-amber-500 text-black px-2 py-0.5 rounded shadow">
                        #{selectionOrder} en Preset
                      </span>
                    )}
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 border ${theme.borderSubtle} ${theme.textAccent}`}>
                      Tier {law.tier}
                    </span>
                    <button
                      type="button"
                      className={`${theme.textAccent} hover:brightness-125 cursor-pointer`}
                      aria-label="Toggle ley"
                    >
                      {isEnacted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                    </button>
                  </div>

                  {/* Title & Metadata */}
                  <div className="pr-28">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${badgeColor}`}>
                        {law.branchType} • {law.category}
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono font-bold">
                        {law.costLaws} Sello{law.costLaws > 1 ? 's' : ''}/nv ({law.tierMinPoints} Pts Facción)
                      </span>
                      {law.isUltimate && (
                        <span className="text-[9px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700/50 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <Crown className="w-2.5 h-2.5" /> Ley Maestra
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-serif text-white font-bold tracking-wide">
                      {law.name}
                    </h3>
                    <div className={`text-xs ${theme.textAccent} font-mono`}>
                      {law.nameEn}
                    </div>
                  </div>

                  {/* Level selector if multi-level */}
                  {law.maxLevel > 1 && (
                    <div className={`mt-3 flex items-center gap-1 bg-black/60 p-1.5 rounded-lg border ${theme.borderSubtle}`} onClick={e => e.stopPropagation()}>
                      <span className="text-[11px] font-mono text-slate-400 px-1">Nivel:</span>
                      {Array.from({ length: law.maxLevel }, (_, i) => i + 1).map(lvl => (
                        <button
                          key={lvl}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLawLevel(law, lvl);
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-all ${
                            currentLevel === lvl
                              ? 'bg-amber-600 text-black shadow'
                              : `${theme.bgBadge} ${theme.textAccent} hover:text-white`
                          }`}
                        >
                          Nv {lvl} ({law.ranks?.[lvl - 1]?.cumulativeCost || lvl * law.costLaws} Pts)
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Recommended Unlock Time */}
                  <div className={`mt-3 bg-black/40 border ${theme.borderSubtle} rounded-lg px-3 py-1.5 text-xs text-amber-300/90 font-mono flex items-center gap-2`}>
                    <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span><strong>Momento sugerido:</strong> {law.recommendedUnlockTime}</span>
                  </div>

                  {/* Law Effect */}
                  <div className="mt-2.5">
                    <p className={`text-xs text-slate-200 leading-relaxed ${theme.bgBadge} p-2.5 rounded-lg border ${theme.borderSubtle}`}>
                      {rankData ? rankData.effect : law.effect}
                    </p>
                  </div>

                  {/* Tactical Impact */}
                  <div className="mt-2">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className={`${theme.textAccent} font-mono`}>Táctica:</strong> {rankData?.tacticalImpact || law.tacticalImpact}
                    </p>
                  </div>

                  {/* Synergy */}
                  <div className="mt-1">
                    <p className={`text-[11px] ${theme.textAccent} leading-relaxed`}>
                      <strong className={`${theme.textAccent} font-mono`}>Sinergia:</strong> {law.synergy}
                    </p>
                  </div>

                  {!isEnacted && !available && (
                    <div className="mt-2 text-[10px] font-mono text-rose-400 bg-rose-950/30 p-1.5 rounded border border-rose-900/40 flex items-center gap-1">
                      <Lock className="w-3 h-3 shrink-0" />
                      <span>{reason}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
