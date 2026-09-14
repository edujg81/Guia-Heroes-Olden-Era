import React, { useState, useMemo, useEffect } from 'react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { TownStructure, TownStructureCost, StructureUpgradeLevel } from '../types';
import { getStructuresForFaction } from '../data/townStructuresData';
import { WaxSealBadge } from './ui/WaxSealBadge';
import {
  Castle,
  Shield,
  Sparkles,
  BookOpen,
  Coins,
  TreePine,
  Layers,
  Flame,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  GitBranch,
  Crown,
  Zap,
  Hammer,
  HelpCircle,
  TrendingUp,
  Swords,
  ChevronRight,
  ShieldAlert,
  Star
} from 'lucide-react';

interface TownStructuresBrowserProps {
  selectedFaction: FactionId;
  themeMode?: 'dark' | 'light';
  onSelectStructure?: (structure: TownStructure) => void;
}

export const TownStructuresBrowser: React.FC<TownStructuresBrowserProps> = ({
  selectedFaction,
  themeMode = 'dark',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStructureId, setSelectedStructureId] = useState<string>('');
  const [activeUpgradeLevelIndex, setActiveUpgradeLevelIndex] = useState<number>(0);
  const [activeDwellingTab, setActiveDwellingTab] = useState<'branchA' | 'branchB'>('branchA');

  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  const categories = [
    'Todas',
    'Moradas de Criaturas',
    'Cívica y Economía',
    'Fortificaciones',
    'Magia & Cofradía',
    'Estructuras Especiales de Facción',
  ];

  // Get strictly the structures for the globally selected faction
  const factionStructures = useMemo(() => {
    return getStructuresForFaction(selectedFaction);
  }, [selectedFaction]);

  // Reset selected structure and upgrade level when faction changes
  useEffect(() => {
    if (factionStructures.length > 0) {
      setSelectedStructureId(factionStructures[0].id);
      setActiveUpgradeLevelIndex(0);
      setActiveDwellingTab('branchA');
    }
  }, [selectedFaction, factionStructures]);

  const filteredStructures = useMemo(() => {
    return factionStructures.filter((st) => {
      // Category filter
      if (selectedCategory !== 'Todas' && st.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = st.name.toLowerCase().includes(query) || st.nameEn.toLowerCase().includes(query);
        const matchesUnit =
          st.unitRecruited?.toLowerCase().includes(query) ||
          st.unitRecruitedBase?.toLowerCase().includes(query) ||
          st.unitUpgrades?.branchA.toLowerCase().includes(query) ||
          st.unitUpgrades?.branchB.toLowerCase().includes(query);
        const matchesEffects = st.effects.some((e) => e.toLowerCase().includes(query));
        const matchesPrereq = st.prerequisites.some((p) => p.toLowerCase().includes(query));
        const matchesUpgrades = st.upgradeLevels?.some((lvl) =>
          lvl.name.toLowerCase().includes(query) || lvl.effects.some((e) => e.toLowerCase().includes(query))
        );
        return matchesName || matchesUnit || matchesEffects || matchesPrereq || !!matchesUpgrades;
      }
      return true;
    });
  }, [factionStructures, selectedCategory, searchQuery]);

  const selectedStructure = useMemo(() => {
    if (selectedStructureId) {
      return factionStructures.find((s) => s.id === selectedStructureId) || filteredStructures[0] || null;
    }
    return filteredStructures[0] || null;
  }, [selectedStructureId, factionStructures, filteredStructures]);

  // When selected structure changes, reset active level
  useEffect(() => {
    setActiveUpgradeLevelIndex(0);
    setActiveDwellingTab('branchA');
  }, [selectedStructureId]);

  // Find structures that require the currently selected structure
  const unlockedBySelected = useMemo(() => {
    if (!selectedStructure) return [];
    const baseName = (selectedStructure.name || '').split('(')[0].trim().toLowerCase();
    const englishName = (selectedStructure.nameEn || '').toLowerCase();
    return factionStructures.filter((s) =>
      s.prerequisites.some((p) => {
        const pLower = (p || '').toLowerCase();
        return (baseName && pLower.includes(baseName)) || (englishName && pLower.includes(englishName));
      })
    );
  }, [selectedStructure, factionStructures]);

  // Tier 7 Rush Cost Calculator for the globally selected faction
  const tier7RushCosts = useMemo(() => {
    const requiredForT7 = factionStructures.filter((s) =>
      s.category === 'Moradas de Criaturas' ||
      s.category === 'Fortificaciones' ||
      (s.category === 'Magia & Cofradía' && s.id.includes('mage-guild'))
    );

    const total: TownStructureCost = {
      gold: 0,
      wood: 0,
      ore: 0,
      gems: 0,
      crystal: 0,
      mercury: 0,
    };

    requiredForT7.forEach((s) => {
      total.gold = (total.gold || 0) + (s.cost.gold || 0);
      total.wood = (total.wood || 0) + (s.cost.wood || 0);
      total.ore = (total.ore || 0) + (s.cost.ore || 0);
      total.gems = (total.gems || 0) + (s.cost.gems || 0);
      total.crystal = (total.crystal || 0) + (s.cost.crystal || 0);
      total.mercury = (total.mercury || 0) + (s.cost.mercury || 0);
    });

    return {
      faction: selectedFaction,
      total,
      count: requiredForT7.length,
    };
  }, [factionStructures, selectedFaction]);

  const renderCostBadge = (cost: TownStructureCost) => {
    return (
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
        {cost.gold !== undefined && (
          <span className="inline-flex items-center gap-1 bg-amber-950/50 text-amber-300 border border-amber-600/40 px-2 py-0.5 rounded font-bold">
            <Coins className="w-3 h-3 text-yellow-400" />
            {cost.gold === 0 ? 'Gratuito' : `${cost.gold.toLocaleString()} Oro`}
          </span>
        )}
        {!!cost.wood && (
          <span className="inline-flex items-center gap-1 bg-emerald-950/50 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded font-semibold">
            <TreePine className="w-3 h-3 text-emerald-400" />
            {cost.wood} Madera
          </span>
        )}
        {!!cost.ore && (
          <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-200 border border-slate-600 px-2 py-0.5 rounded font-semibold">
            <Layers className="w-3 h-3 text-slate-300" />
            {cost.ore} Mineral
          </span>
        )}
        {!!cost.gems && (
          <span className="inline-flex items-center gap-1 bg-cyan-950/50 text-cyan-300 border border-cyan-600/40 px-2 py-0.5 rounded font-semibold">
            💎 {cost.gems} Gemas
          </span>
        )}
        {!!cost.crystal && (
          <span className="inline-flex items-center gap-1 bg-purple-950/50 text-purple-300 border border-purple-600/40 px-2 py-0.5 rounded font-semibold">
            🔮 {cost.crystal} Cristal
          </span>
        )}
        {!!cost.mercury && (
          <span className="inline-flex items-center gap-1 bg-red-950/50 text-red-300 border border-red-600/40 px-2 py-0.5 rounded font-semibold">
            🧪 {cost.mercury} Mercurio
          </span>
        )}
      </div>
    );
  };

  const activeLevel: StructureUpgradeLevel | null = useMemo(() => {
    if (!selectedStructure?.upgradeLevels || selectedStructure.upgradeLevels.length === 0) {
      return null;
    }
    return selectedStructure.upgradeLevels[activeUpgradeLevelIndex] || selectedStructure.upgradeLevels[0];
  }, [selectedStructure, activeUpgradeLevelIndex]);

  return (
    <div className="space-y-5 animate-fadeIn" id="town-structures-browser-root">
      {/* Header Banner & Rush Summary */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${theme.borderSubtle} ${theme.bgCard} backdrop-blur-md transition-colors duration-300`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border font-mono flex items-center gap-1.5 ${theme.bgBadge} ${theme.borderSubtle} ${theme.textAccent}`}>
                <Castle className="w-3.5 h-3.5 text-yellow-400" />
                Arquitectura & Estructuras de {selectedFaction}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {factionStructures.length} Estructuras y Mejoras de Facción
              </span>
              <a
                href="https://heavenlyforge.gg/es/olden-era/buildings"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-700/50 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
                title="Ver base de datos canónica en Heavenly Forge"
              >
                <span>Fuente: HeavenlyForge.gg</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white uppercase tracking-wide">
              Estructuras, Árbol de Mejoras & Costes (<span className={theme.textAccent}>{selectedFaction}</span>)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Explora los costes exactos, prerrequisitos estrictos y opciones de mejora disponibles para la facción <strong className={theme.textAccent}>{selectedFaction}</strong>: desde los 3 niveles del palacio cívico y los 3 niveles de fortificaciones, hasta las moradas de criaturas Tier 1 a 7 con sus ramas dobles de evolución.
            </p>
          </div>

          {/* Rush Tier 7 Cost Widget */}
          <div className="bg-black/60 border border-amber-500/40 rounded-xl p-3.5 shrink-0 max-w-md shadow-lg" id="tier7-rush-widget">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 font-mono mb-1.5">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span>Coste Acumulado para Rush a Tier 7 ({selectedFaction})</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono mb-2">
              Total acumulado para erigir Fortificaciones + Moradas T1 a T7 + Cofradía de Magos:
            </p>
            {renderCostBadge(tier7RushCosts.total)}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 bg-black/40 p-3 rounded-xl border ${theme.borderSubtle}`} id="structures-filter-bar">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] sm:text-xs rounded-lg font-medium font-mono whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === cat
                  ? theme.pillActive
                  : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="structure-search-input"
            placeholder="Buscar por edificio, tropa, mejora o efecto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-black/60 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>
      </div>

      {/* 2-Column Workspace: Left List of Structures + Right Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Structures Grid / List */}
        <div className="lg:col-span-6 flex flex-col gap-2.5 max-h-[850px] overflow-y-auto pr-1" id="structures-list-container">
          {filteredStructures.map((structure) => {
            const isSelected = selectedStructure?.id === structure.id;
            const isDwelling = structure.category === 'Moradas de Criaturas';
            const isUnique = !!structure.isFactionUnique;
            const hasUpgradeLevels = !!structure.upgradeLevels && structure.upgradeLevels.length > 0;

            return (
              <div
                key={structure.id}
                id={`structure-card-${structure.id}`}
                onClick={() => setSelectedStructureId(structure.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? `${theme.bgSubtle} ${theme.border} shadow-[0_0_20px_rgba(0,0,0,0.6)] ring-1 ${theme.border}`
                    : `bg-black/50 ${theme.borderSubtle} hover:border-slate-400 hover:bg-black/70`
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      {isDwelling && structure.tier && (
                        <WaxSealBadge label={`Tier ${structure.tier}`} size="sm" />
                      )}
                      {hasUpgradeLevels && (
                        <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-600/60 text-[10px] font-bold px-2 py-0.5 rounded font-mono flex items-center gap-1">
                          <TrendingUp className="w-2.5 h-2.5 text-cyan-400" />
                          {structure.upgradeLevels?.length} Niveles
                        </span>
                      )}
                      {isUnique && (
                        <span className="bg-purple-950/80 text-purple-200 border border-purple-500/80 text-[10px] font-bold px-2 py-0.5 rounded font-mono flex items-center gap-1 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                          <Crown className="w-2.5 h-2.5 text-amber-300" />
                          Exclusivo
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-400">
                        {structure.category}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-serif font-bold text-white flex items-center gap-1.5">
                      {structure.name}
                    </h4>

                    {structure.unitRecruited && (
                      <p className="text-[11px] font-mono text-slate-300 mt-0.5">
                        Tropa: <span className="text-amber-300 font-semibold">{structure.unitRecruited}</span>
                      </p>
                    )}
                  </div>

                  {/* Timing Recommendation Badge */}
                  <span className="text-[10px] font-mono text-slate-300 bg-black/70 px-2 py-0.5 rounded border border-slate-700 shrink-0 font-semibold">
                    {structure.timingRecommendation}
                  </span>
                </div>

                {/* Costs Row */}
                <div className="mt-2.5">
                  {renderCostBadge(structure.cost)}
                </div>

                {/* Prerequisites Snippet */}
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-300 font-semibold">Prerrequisitos:</span>
                  {structure.prerequisites.length === 0 ? (
                    <span className="text-emerald-400 font-semibold">Sin requisitos previos</span>
                  ) : (
                    <span className="text-slate-300 truncate">
                      {structure.prerequisites.join(' • ')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredStructures.length === 0 && (
            <div className="p-8 text-center bg-black/40 rounded-xl border border-slate-800">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-mono">
                No se encontraron estructuras con los filtros seleccionados para {selectedFaction}.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Structure Inspector with Upgrade Levels */}
        <div className="lg:col-span-6" id="structure-detail-inspector">
          {selectedStructure ? (
            <div className={`p-5 sm:p-6 rounded-2xl border-2 ${theme.border} bg-black/80 shadow-2xl space-y-4 sticky top-20 backdrop-blur-md max-h-[850px] overflow-y-auto relative`}>
              {/* Header Details */}
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded border ${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`}>
                    {selectedStructure.category}
                  </span>
                  {selectedStructure.tier && (
                    <WaxSealBadge label={`Tier ${selectedStructure.tier}`} size="sm" />
                  )}
                  {selectedStructure.isFactionUnique && (
                    <span className="bg-purple-950/80 text-purple-200 border border-purple-500/80 text-[10px] font-bold px-2 py-0.5 rounded font-mono flex items-center gap-1 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                      <Crown className="w-3 h-3 text-amber-300" />
                      Estructura Única ({selectedStructure.faction})
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  {selectedStructure.name}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Facción: <strong className={theme.textAccent}>{selectedStructure.faction}</strong>
                </p>
              </div>

              {/* ========================================================= */}
              {/* MULTI-LEVEL UPGRADE OPTIONS (FORTIFICATIONS, CIVIC PALACE, MAGE GUILD) */}
              {/* ========================================================= */}
              {selectedStructure.upgradeLevels && selectedStructure.upgradeLevels.length > 0 && (
                <div className="bg-black/60 p-4 rounded-xl border border-cyan-700/40 space-y-3.5" id="upgrade-levels-container">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>Opciones de Mejora y Niveles Disponibles ({selectedStructure.upgradeLevels.length} Niveles)</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Haz clic en cada nivel para ver costes y efectos
                    </span>
                  </div>

                  {/* Level Selector Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {selectedStructure.upgradeLevels.map((lvl, idx) => {
                      const isActive = idx === activeUpgradeLevelIndex;
                      return (
                        <button
                          key={lvl.level}
                          id={`upgrade-level-btn-${lvl.level}`}
                          onClick={() => setActiveUpgradeLevelIndex(idx)}
                          className={`p-2 rounded-lg text-left transition-all border cursor-pointer ${
                            isActive
                              ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-500/50'
                              : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                          }`}
                        >
                          <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block">
                            Nivel {lvl.level}
                          </span>
                          <span className="text-xs font-semibold truncate block">
                            {(lvl.name || '').split(':')[1]?.trim() || lvl.name || `Nivel ${lvl.level}`}
                          </span>
                          {lvl.bonusIncome && (
                            <span className="text-[10px] text-amber-300 font-mono block mt-0.5">
                              {lvl.bonusIncome}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Upgrade Level Inspector Card */}
                  {activeLevel && (
                    <div className="bg-black/70 p-3.5 rounded-xl border border-slate-700 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                            Detalles de la Mejora seleccionada:
                          </span>
                          <h5 className="text-sm font-serif font-bold text-white">
                            {activeLevel.name}
                          </h5>
                        </div>
                        {activeLevel.bonusIncome && (
                          <span className="bg-amber-950/80 text-amber-300 border border-amber-600/60 text-xs font-bold px-2 py-0.5 rounded font-mono shrink-0">
                            {activeLevel.bonusIncome}
                          </span>
                        )}
                        {activeLevel.growthBonus && (
                          <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 text-xs font-bold px-2 py-0.5 rounded font-mono shrink-0">
                            {activeLevel.growthBonus}
                          </span>
                        )}
                      </div>

                      {/* Cost of this upgrade level */}
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold block mb-1">
                          Coste de Construcción / Mejora a este Nivel:
                        </span>
                        {renderCostBadge(activeLevel.cost)}
                      </div>

                      {/* Prerequisites for this upgrade level */}
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold block mb-1">
                          Requisitos para desbloquear este nivel:
                        </span>
                        {activeLevel.prerequisites.length === 0 ? (
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/40 inline-block">
                            ✓ Sin requisitos previos (Disponible desde el inicio)
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {activeLevel.prerequisites.map((p, i) => (
                              <span
                                key={i}
                                className="text-xs font-mono text-amber-200 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40 flex items-center gap-1"
                              >
                                <ChevronRight className="w-3 h-3 text-amber-400 shrink-0" />
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Defense / Growth bonuses */}
                      {(activeLevel.defenseBonus || activeLevel.growthBonus) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                          {activeLevel.defenseBonus && (
                            <div className="bg-slate-900/80 p-2 rounded border border-slate-700 text-slate-200">
                              <span className="text-[10px] text-cyan-400 font-bold uppercase block flex items-center gap-1">
                                <Shield className="w-3 h-3" /> Defensa de Asedio:
                              </span>
                              {activeLevel.defenseBonus}
                            </div>
                          )}
                          {activeLevel.growthBonus && (
                            <div className="bg-slate-900/80 p-2 rounded border border-slate-700 text-slate-200">
                              <span className="text-[10px] text-emerald-400 font-bold uppercase block flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Crecimiento Semanal:
                              </span>
                              {activeLevel.growthBonus}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Effects of this level */}
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold block mb-1">
                          Efectos otorgados por este nivel:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-200">
                          {activeLevel.effects.map((eff, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{eff}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Exact Cost Matrix (Default or Base structure) */}
              {!selectedStructure.upgradeLevels && (
                <div className="bg-black/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      Coste de Construcción
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {selectedStructure.timingRecommendation}
                    </span>
                  </div>
                  {renderCostBadge(selectedStructure.cost)}

                  {selectedStructure.dwellingUpgradeCost && (
                    <div className="pt-2 border-t border-slate-800 mt-2">
                      <span className="text-[11px] font-mono text-amber-300 font-semibold block mb-1">
                        Coste de Mejora de Morada (Dwelling Upgrade):
                      </span>
                      {renderCostBadge(selectedStructure.dwellingUpgradeCost)}
                    </div>
                  )}
                </div>
              )}

              {/* Strict Prerequisites Tree */}
              {!selectedStructure.upgradeLevels && (
                <div className="bg-black/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 font-bold">
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                    Prerrequisitos de Construcción
                  </div>
                  {selectedStructure.prerequisites.length === 0 ? (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/50">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Sin prerrequisitos previos. Se puede erigir desde el primer turno con Fuerte.</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {selectedStructure.prerequisites.map((prereq, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs font-mono text-amber-200 bg-amber-950/40 p-2 rounded-lg border border-amber-800/40"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{prereq}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Unlocked Structures */}
              {unlockedBySelected.length > 0 && (
                <div className="bg-black/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 font-bold">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Desbloquea Directamente en {selectedFaction}
                  </div>
                  <div className="space-y-1">
                    {unlockedBySelected.map((unl) => (
                      <button
                        key={unl.id}
                        id={`unlocked-by-${unl.id}`}
                        onClick={() => setSelectedStructureId(unl.id)}
                        className="w-full text-left text-xs font-mono text-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/50 p-1.5 rounded border border-cyan-800/30 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{unl.name}</span>
                        <span className="text-[10px] text-slate-400">{unl.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Effects & In-game Bonuses */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  Efectos y Producción
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {selectedStructure.effects.map((eff, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{eff}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ========================================================= */}
              {/* DWELLING UNIT UPGRADE BRANCHES (RAMA A VS RAMA B) */}
              {/* ========================================================= */}
              {selectedStructure.unitUpgrades && (
                <div className="bg-amber-950/30 border border-amber-700/50 p-3.5 rounded-xl space-y-3" id="dwelling-branches-container">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                      <Swords className="w-3.5 h-3.5 text-yellow-400" />
                      Mejoras Alternativas de Criatura (Rama A vs Rama B)
                    </div>
                    {selectedStructure.dwellingUpgradeCost && (
                      <span className="text-[10px] font-mono text-slate-300">
                        Mejora de morada: {selectedStructure.dwellingUpgradeCost.gold?.toLocaleString()} Oro
                      </span>
                    )}
                  </div>

                  {/* Branch Tab Switcher */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="branch-a-tab"
                      onClick={() => setActiveDwellingTab('branchA')}
                      className={`p-2 rounded-lg text-left transition-all border cursor-pointer ${
                        activeDwellingTab === 'branchA'
                          ? 'bg-amber-950/80 border-amber-500 text-white shadow-md ring-1 ring-amber-500/40'
                          : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                        Opción de Evolución 1
                      </span>
                      <span className="text-xs font-bold block truncate">
                        {selectedStructure.unitUpgrades.branchADetails?.unitName || 'Rama A'}
                      </span>
                    </button>

                    <button
                      id="branch-b-tab"
                      onClick={() => setActiveDwellingTab('branchB')}
                      className={`p-2 rounded-lg text-left transition-all border cursor-pointer ${
                        activeDwellingTab === 'branchB'
                          ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md ring-1 ring-cyan-500/40'
                          : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                        Opción de Evolución 2
                      </span>
                      <span className="text-xs font-bold block truncate">
                        {selectedStructure.unitUpgrades.branchBDetails?.unitName || 'Rama B'}
                      </span>
                    </button>
                  </div>

                  {/* Active Branch Detailed Card */}
                  {activeDwellingTab === 'branchA' && selectedStructure.unitUpgrades.branchADetails ? (
                    <div className="bg-black/60 p-3 rounded-lg border border-amber-600/40 space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-300 text-sm">
                          {selectedStructure.unitUpgrades.branchADetails.unitName}
                        </span>
                        <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50">
                          {selectedStructure.unitUpgrades.branchADetails.role}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        {selectedStructure.unitUpgrades.branchA}
                      </p>
                      {selectedStructure.unitUpgrades.branchADetails.statsBonus && (
                        <div className="text-[11px] text-emerald-300 font-semibold">
                          Bonificación de Atributos: {selectedStructure.unitUpgrades.branchADetails.statsBonus}
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                          Habilidades Clave:
                        </span>
                        <ul className="space-y-0.5 text-[11px] text-slate-200">
                          {selectedStructure.unitUpgrades.branchADetails.keyAbilities.map((ab, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Star className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>{ab}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : activeDwellingTab === 'branchB' && selectedStructure.unitUpgrades.branchBDetails ? (
                    <div className="bg-black/60 p-3 rounded-lg border border-cyan-600/40 space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-300 text-sm">
                          {selectedStructure.unitUpgrades.branchBDetails.unitName}
                        </span>
                        <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-700/50">
                          {selectedStructure.unitUpgrades.branchBDetails.role}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        {selectedStructure.unitUpgrades.branchB}
                      </p>
                      {selectedStructure.unitUpgrades.branchBDetails.statsBonus && (
                        <div className="text-[11px] text-emerald-300 font-semibold">
                          Bonificación de Atributos: {selectedStructure.unitUpgrades.branchBDetails.statsBonus}
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                          Habilidades Clave:
                        </span>
                        <ul className="space-y-0.5 text-[11px] text-slate-200">
                          {selectedStructure.unitUpgrades.branchBDetails.keyAbilities.map((ab, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Star className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span>{ab}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-200">
                      <div className="bg-black/50 p-2 rounded border border-slate-800">
                        <span className="text-[10px] text-amber-400 uppercase font-bold block">Rama A:</span>
                        {selectedStructure.unitUpgrades.branchA}
                      </div>
                      <div className="bg-black/50 p-2 rounded border border-slate-800">
                        <span className="text-[10px] text-cyan-400 uppercase font-bold block">Rama B:</span>
                        {selectedStructure.unitUpgrades.branchB}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Strategic Tip */}
              <div className="bg-black/60 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 font-mono space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" />
                  Directiva Táctica & Timing ({selectedFaction})
                </div>
                <p>{selectedStructure.strategicTip}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-black/40 rounded-2xl border border-slate-800">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-mono">
                Selecciona una estructura de la lista para inspeccionar sus costes, niveles y prerrequisitos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
