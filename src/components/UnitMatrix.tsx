import React, { useState } from 'react';
import { FactionId, getUnitsForFaction, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { UnitVariant } from '../types';
import { useStickyState } from '../utils/useStickyState';
import {
  Shield,
  Eye,
  Sparkles,
  Feather,
  Axe,
  Flame,
  Crown,
  Zap,
  Swords,
  Heart,
  Gauge,
  Coins,
  ArrowRightLeft,
  ChevronRight,
  Crosshair,
  UserCheck,
  CheckCircle2,
  Columns3,
  HelpCircle,
  Gem,
  AlertTriangle,
} from 'lucide-react';

interface UnitMatrixProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
}

export const UnitMatrix: React.FC<UnitMatrixProps> = ({ 
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
}) => {
  const [selectedTier, setSelectedTier] = useStickyState<number>(1, `units_selected_tier_${selectedFaction}`);
  const [selectedBranch, setSelectedBranch] = useStickyState<'base' | 'branch_a' | 'branch_b' | 'comparison'>('branch_a', 'units_selected_branch');
  const [showFullDecisionModal, setShowFullDecisionModal] = useState<boolean>(false);

  const units = getUnitsForFaction(selectedFaction);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Feather': return <Feather className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Axe': return <Axe className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Crown': return <Crown className="w-5 h-5" />;
      case 'Crosshair': return <Crosshair className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const selectedUnit = units.find((u) => u.tier === selectedTier) || units[0];

  const currentVariant: UnitVariant =
    selectedBranch === 'base'
      ? selectedUnit.variants.base
      : selectedBranch === 'branch_b'
      ? selectedUnit.variants.branchB
      : selectedUnit.variants.branchA;

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className={`border rounded-2xl p-6 ${theme.shadowAccent} backdrop-blur-md transition-colors duration-300 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md text-slate-900'
          : `bg-black/40 ${theme.border} text-white`
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`text-[10px] uppercase font-mono tracking-widest font-bold mb-1 ${
              themeMode === 'light' ? 'text-purple-800' : theme.textAccent
            }`}>
              Bestiario & Unidades de Guerra • Heroes of Might and Magic: Olden Era
            </div>
            <h2 className={`text-xl sm:text-2xl font-serif uppercase tracking-wide font-bold ${
              themeMode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Matriz de Criaturas y Ramas ({meta.name})
            </h2>
            <p className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${
              themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
              En Olden Era, cada criatura de {meta.name} dispone de una forma <strong>Base</strong> y dos mejoras alternativas: <strong>Rama A</strong> (enfoque ofensivo o especializado) y <strong>Rama B</strong> (enfoque táctico, de control o defensivo). Alterna libremente entre ellas para comparar atributos, habilidades y recomendaciones.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              id="toggle-comparison-view"
              onClick={() => setSelectedBranch(selectedBranch === 'comparison' ? 'branch_a' : 'comparison')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                selectedBranch === 'comparison'
                  ? `${theme.primaryButton} shadow-lg`
                  : themeMode === 'light'
                  ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
                  : `${theme.bgBadge} ${theme.borderSubtle} ${theme.textAccent} hover:brightness-125`
              }`}
            >
              <Columns3 className="w-4 h-4" />
              <span>{selectedBranch === 'comparison' ? 'Vista Ficha Individual' : 'Comparar Base vs A vs B'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier Selector Row (Tiers 1 to 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {units.map((unit) => {
          const isSelected = unit.tier === selectedTier;
          return (
            <button
              key={unit.tier}
              id={`unit-tier-${unit.tier}`}
              onClick={() => {
                setSelectedTier(unit.tier);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? themeMode === 'light'
                    ? 'bg-purple-100/90 border-2 border-purple-400 text-purple-950 shadow-md ring-1 ring-purple-300'
                    : `${theme.bgBadge} ${theme.border} text-white ${theme.shadowAccent} ring-1 ring-white/30`
                  : themeMode === 'light'
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  : `bg-black/40 ${theme.borderSubtle} text-slate-300 hover:bg-white/5`
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  themeMode === 'light'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : `bg-black/60 ${theme.borderSubtle} text-yellow-400`
                }`}>
                  T{unit.tier}
                </span>
                <span className={isSelected ? (themeMode === 'light' ? 'text-purple-800' : 'text-yellow-400') : (themeMode === 'light' ? 'text-slate-600' : theme.textAccent)}>
                  {getIcon(unit.iconName)}
                </span>
              </div>
              <div className="mt-2">
                <div className={`text-xs font-bold truncate uppercase font-sans tracking-wide ${
                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {unit.name}
                </div>
                <div className={`text-[10px] font-mono truncate mt-0.5 ${
                  themeMode === 'light' ? 'text-slate-600 font-semibold' : theme.textAccent
                }`}>
                  {unit.dwelling}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Branch Selector Tabs */}
      <div className={`border rounded-2xl p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2 shadow-lg backdrop-blur-sm ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-xs'
          : `bg-black/60 ${theme.borderSubtle}`
      }`}>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Base Button */}
          <button
            id="unit-branch-base"
            onClick={() => setSelectedBranch('base')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectedBranch === 'base'
                ? themeMode === 'light'
                  ? 'bg-slate-800 border-slate-900 text-white shadow-sm'
                  : 'bg-slate-700/90 border-slate-400 text-white shadow-[0_0_15px_rgba(148,163,184,0.3)]'
                : themeMode === 'light'
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                : 'bg-black/40 border-slate-800/80 text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Base: {selectedUnit.variants.base.name}</span>
          </button>

          {/* Branch A Button */}
          <button
            id="unit-branch-a"
            onClick={() => setSelectedBranch('branch_a')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectedBranch === 'branch_a'
                ? `${theme.primaryButton} shadow-lg`
                : themeMode === 'light'
                ? 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
                : `${theme.bgBadge} ${theme.borderSubtle} ${theme.textAccent} hover:brightness-125`
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-amber-500' : 'text-yellow-400'}`} />
            <span>⚡ Rama A: {selectedUnit.variants.branchA.name}</span>
          </button>

          {/* Branch B Button */}
          <button
            id="unit-branch-b"
            onClick={() => setSelectedBranch('branch_b')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectedBranch === 'branch_b'
                ? themeMode === 'light'
                  ? 'bg-emerald-600 border-emerald-700 text-white shadow-md'
                  : 'bg-emerald-600/90 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.45)] ring-1 ring-emerald-300'
                : themeMode === 'light'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/30 hover:text-white'
            }`}
          >
            <ArrowRightLeft className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-emerald-700' : 'text-emerald-400'}`} />
            <span>✦ Rama B: {selectedUnit.variants.branchB.name}</span>
          </button>
        </div>

        {/* Quick Decision Guide Button */}
        <button
          id="btn-decision-guide"
          onClick={() => setShowFullDecisionModal(!showFullDecisionModal)}
          className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-mono cursor-pointer transition-all ml-auto border ${
            themeMode === 'light'
              ? 'text-amber-950 bg-amber-100 hover:bg-amber-200 border-amber-300 font-semibold'
              : 'text-yellow-300 bg-yellow-950/40 hover:bg-yellow-900/40 border-yellow-700/60'
          }`}
        >
          <HelpCircle className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-amber-700' : 'text-yellow-400'}`} />
          <span>{showFullDecisionModal ? 'Ocultar Guía Rama A vs B' : '¿Cuándo elegir Rama A vs B?'}</span>
        </button>
      </div>

      {/* Decision Guide Callout (if active or opened) */}
      {(showFullDecisionModal || selectedBranch === 'comparison') && (
        <div className={`border rounded-2xl p-5 shadow-2xl space-y-4 ${
          themeMode === 'light'
            ? 'bg-amber-50/80 border-amber-300 text-slate-900'
            : `bg-gradient-to-br from-black/80 via-black/70 to-black/90 ${theme.border}`
        }`}>
          <div className={`flex items-center gap-2.5 border-b pb-3 ${
            themeMode === 'light' ? 'border-amber-200' : theme.borderSubtle
          }`}>
            <Sparkles className={`w-5 h-5 ${themeMode === 'light' ? 'text-amber-600' : 'text-yellow-400'}`} />
            <h3 className={`text-sm sm:text-base font-serif uppercase tracking-wide font-bold ${
              themeMode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Guía de Decisión Estratégica: Tier {selectedUnit.tier} ({selectedUnit.name})
            </h3>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
            themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
          }`}>
            {selectedUnit.comparison.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* When to pick Branch A */}
            <div className={`rounded-xl p-4 space-y-2 border ${
              themeMode === 'light'
                ? 'bg-white border-purple-200 shadow-xs'
                : `bg-black/60 ${theme.border}`
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¿Cuándo elegir Rama A? ({selectedUnit.variants.branchA.name})</span>
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  themeMode === 'light'
                    ? 'bg-purple-100 text-purple-900 border-purple-200 font-bold'
                    : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                }`}>
                  Rama A
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${
                themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
              }`}>
                {selectedUnit.comparison.whenToPickA}
              </p>
              <div className={`text-[11px] font-mono p-2 rounded border flex items-center gap-1.5 mt-2 ${
                themeMode === 'light'
                  ? 'text-amber-950 bg-amber-50 border-amber-200'
                  : `text-yellow-300/90 bg-black/40 ${theme.borderSubtle}`
              }`}>
                <UserCheck className={`w-3.5 h-3.5 shrink-0 ${themeMode === 'light' ? 'text-amber-700' : 'text-yellow-400'}`} />
                <span><strong>Héroe Afín:</strong> {selectedUnit.comparison.synergyHeroA}</span>
              </div>
            </div>

            {/* When to pick Branch B */}
            <div className={`rounded-xl p-4 space-y-2 border ${
              themeMode === 'light'
                ? 'bg-white border-emerald-200 shadow-xs'
                : 'bg-emerald-950/50 border-emerald-500/50'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  themeMode === 'light' ? 'text-emerald-900' : 'text-emerald-300'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${themeMode === 'light' ? 'text-emerald-700' : 'text-emerald-400'}`} />
                  <span>¿Cuándo elegir Rama B? ({selectedUnit.variants.branchB.name})</span>
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  themeMode === 'light'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-200 font-bold'
                    : 'bg-emerald-900/70 text-emerald-200 border-emerald-700/60'
                }`}>
                  Rama B
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${
                themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
              }`}>
                {selectedUnit.comparison.whenToPickB}
              </p>
              <div className={`text-[11px] font-mono p-2 rounded border flex items-center gap-1.5 mt-2 ${
                themeMode === 'light'
                  ? 'text-emerald-950 bg-emerald-50 border-emerald-200'
                  : 'text-emerald-300/90 bg-black/40 border-emerald-800/40'
              }`}>
                <UserCheck className={`w-3.5 h-3.5 shrink-0 ${themeMode === 'light' ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span><strong>Héroe Afín:</strong> {selectedUnit.comparison.synergyHeroB}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON VIEW (3 Columns: Base vs Branch A vs Branch B) */}
      {selectedBranch === 'comparison' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { variant: selectedUnit.variants.base, color: 'slate', badge: 'Base' },
            { variant: selectedUnit.variants.branchA, color: 'faction', badge: 'Rama A (Ofensiva/Élite)' },
            { variant: selectedUnit.variants.branchB, color: 'emerald', badge: 'Rama B (Táctica/Control)' },
          ].map(({ variant, color, badge }, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border flex flex-col justify-between space-y-4 ${
                color === 'faction'
                  ? themeMode === 'light'
                    ? 'bg-purple-50/70 border-2 border-purple-300 shadow-sm'
                    : `${theme.bgBadge} ${theme.border} ${theme.shadowAccent}`
                  : color === 'emerald'
                  ? themeMode === 'light'
                    ? 'bg-emerald-50/70 border-2 border-emerald-300 shadow-sm'
                    : 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                  : themeMode === 'light'
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-slate-950/40 border-slate-800/70'
              }`}
            >
              <div>
                <div className={`flex items-center justify-between gap-2 border-b pb-3 ${
                  themeMode === 'light' ? 'border-slate-200' : 'border-white/10'
                }`}>
                  <div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      color === 'faction'
                        ? themeMode === 'light'
                          ? 'bg-purple-100 text-purple-900 border-purple-200'
                          : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                        : color === 'emerald'
                        ? themeMode === 'light'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                          : 'bg-emerald-900/60 text-emerald-200 border-emerald-600'
                        : themeMode === 'light'
                        ? 'bg-slate-100 text-slate-700 border-slate-300'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {badge}
                    </span>
                    <h3 className={`text-base font-serif uppercase mt-1.5 font-bold ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>{variant.name}</h3>
                    <div className={`text-[11px] font-mono ${
                      themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>{variant.nameEn} • {variant.dwellingName}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className={`text-xs font-bold ${
                      themeMode === 'light' ? 'text-amber-900 font-bold' : 'text-yellow-400'
                    }`}>{variant.cost.gold} Oro</div>
                    {variant.cost.gems && <div className={`text-[10px] ${themeMode === 'light' ? 'text-emerald-700 font-bold' : 'text-emerald-400'}`}>+{variant.cost.gems} Gemas</div>}
                    {variant.cost.ore && <div className={`text-[10px] ${themeMode === 'light' ? 'text-amber-800 font-bold' : 'text-amber-400'}`}>+{variant.cost.ore} Mineral</div>}
                    {variant.cost.mercury && <div className={`text-[10px] ${themeMode === 'light' ? 'text-red-700 font-bold' : 'text-red-400'}`}>+{variant.cost.mercury} Mercurio</div>}
                    {variant.cost.alchemicalDust && <div className={`text-[10px] ${themeMode === 'light' ? 'text-cyan-800 font-bold' : 'text-cyan-400'}`}>+{variant.cost.alchemicalDust} Polvo</div>}
                  </div>
                </div>

                {/* Comparative Stats Grid */}
                <div className="grid grid-cols-3 gap-2 my-3 text-center font-mono">
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-black/50 border-white/5'
                  }`}>
                    <div className={`text-[10px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Salud</div>
                    <div className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-1">
                      <Heart className="w-3 h-3" /> {variant.stats.hp}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-black/50 border-white/5'
                  }`}>
                    <div className={`text-[10px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Ataque / Def</div>
                    <div className={`text-sm font-bold ${
                      themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
                    }`}>
                      {variant.stats.attack} / {variant.stats.defense}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-black/50 border-white/5'
                  }`}>
                    <div className={`text-[10px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Daño</div>
                    <div className={`text-sm font-bold ${
                      themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                    }`}>{variant.stats.damage}</div>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-black/50 border-white/5'
                  }`}>
                    <div className={`text-[10px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Vel / Init</div>
                    <div className={`text-sm font-bold ${
                      themeMode === 'light' ? 'text-cyan-900' : 'text-cyan-300'
                    }`}>
                      {variant.stats.speed} / {variant.stats.initiative}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-black/50 border-white/5'
                  }`}>
                    <div className={`text-[10px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>{variant.stats.shots ? 'Disparos' : 'Alcance'}</div>
                    <div className={`text-sm font-bold ${
                      themeMode === 'light' ? 'text-emerald-900' : 'text-emerald-300'
                    }`}>
                      {variant.stats.shots ? `${variant.stats.shots}` : 'Melé'}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-black/50 border-white/5'
                  }`}>
                    <div className={`text-[10px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Crecimiento</div>
                    <div className={`text-sm font-bold ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-slate-200'
                    }`}>{variant.stats.weeklyGrowth}/sem</div>
                  </div>
                </div>

                {/* Stance */}
                <div className={`p-2.5 rounded-lg border space-y-1 my-2 ${
                  themeMode === 'light'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-black/40 border-white/5'
                }`}>
                  <div className={`text-[10px] font-mono font-bold uppercase ${
                    themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
                  }`}>Postura Activa</div>
                  <p className={`text-[11px] leading-relaxed ${
                    themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'
                  }`}>{variant.combatStance}</p>
                </div>

                {/* Abilities */}
                <div className="space-y-1.5 my-2">
                  <div className={`text-[10px] font-mono font-bold uppercase ${
                    themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                  }`}>Habilidades</div>
                  <ul className="space-y-1">
                    {variant.abilities.map((ab, i) => (
                      <li key={i} className={`text-[11px] flex items-start gap-1.5 leading-snug ${
                        themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        <span className={`font-bold font-mono ${
                          themeMode === 'light' ? 'text-purple-800' : theme.textAccent
                        }`}>✦</span>
                        <span>{ab}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedBranch(variant.id);
                }}
                className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  themeMode === 'light'
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                }`}
              >
                Ver Ficha Detallada de {variant.name} →
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* SINGLE VARIANT DETAILED CARD */
        <div className={`border rounded-2xl p-6 shadow-xl space-y-6 transition-all ${
          selectedBranch === 'branch_b'
            ? themeMode === 'light'
              ? 'bg-emerald-50/70 border-emerald-300 shadow-md'
              : 'bg-gradient-to-b from-emerald-950/30 via-black/50 to-black/60 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]'
            : selectedBranch === 'branch_a'
            ? themeMode === 'light'
              ? 'bg-purple-50/70 border-purple-300 shadow-md'
              : `${theme.bgBadge} ${theme.border} ${theme.shadowAccent}`
            : themeMode === 'light'
            ? 'bg-white border-slate-200 shadow-md'
            : 'bg-black/40 border-slate-800'
        }`}>
          {/* Header Bar */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            themeMode === 'light' ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div className="flex items-center gap-3.5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${
                selectedBranch === 'branch_b'
                  ? themeMode === 'light'
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-sm'
                    : 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : selectedBranch === 'branch_a'
                  ? themeMode === 'light'
                    ? 'bg-purple-100 border-purple-300 text-purple-900 shadow-sm'
                    : `${theme.bgBadge} ${theme.border} ${theme.textAccent} shadow-md`
                  : themeMode === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}>
                {getIcon(selectedUnit.iconName)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    themeMode === 'light'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-black/60 text-yellow-400 border-yellow-700/60'
                  }`}>
                    Tier {selectedUnit.tier}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    selectedBranch === 'branch_b'
                      ? themeMode === 'light'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : selectedBranch === 'branch_a'
                      ? themeMode === 'light'
                        ? 'bg-purple-100 text-purple-900 border-purple-300'
                        : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                      : themeMode === 'light'
                      ? 'bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}>
                    {currentVariant.branchLabel}
                  </span>
                  <span className={`text-xs font-mono ${
                    themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Morada: <strong className={themeMode === 'light' ? 'text-slate-900' : 'text-white'}>{currentVariant.dwellingName}</strong>
                  </span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-serif uppercase mt-1 font-bold ${
                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {currentVariant.name}
                </h3>
                <div className={`text-xs font-mono ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {currentVariant.nameEn} • <em>{currentVariant.subtitle}</em>
                </div>
              </div>
            </div>

            {/* Cost and Role Badge */}
            <div className={`px-4 py-3 rounded-xl border text-left sm:text-right self-start sm:self-auto space-y-1 ${
              themeMode === 'light'
                ? 'bg-slate-50 border-slate-200'
                : `bg-black/60 ${theme.borderSubtle}`
            }`}>
              <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                themeMode === 'light' ? 'text-slate-700' : theme.textAccent
              }`}>
                Coste de Reclutamiento
              </div>
              <div className="flex items-center sm:justify-end gap-2 font-mono">
                <span className={`text-sm font-bold flex items-center gap-1 ${
                  themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
                }`}>
                  <Coins className="w-3.5 h-3.5" /> {currentVariant.cost.gold} Oro
                </span>
                {currentVariant.cost.gems && (
                  <span className={`text-xs font-bold flex items-center gap-1 ${
                    themeMode === 'light' ? 'text-emerald-800' : 'text-emerald-400'
                  }`}>
                    <Gem className="w-3 h-3" /> +{currentVariant.cost.gems} Gemas
                  </span>
                )}
                {currentVariant.cost.alchemicalDust && (
                  <span className={`text-xs font-bold ${
                    themeMode === 'light' ? 'text-cyan-800' : 'text-cyan-400'
                  }`}>
                    +{currentVariant.cost.alchemicalDust} Polvo
                  </span>
                )}
              </div>
              <div className={`text-[10px] font-mono ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                Crecimiento: <strong className={themeMode === 'light' ? 'text-slate-900' : 'text-white'}>{currentVariant.stats.weeklyGrowth}/semana</strong>
              </div>
            </div>
          </div>

          {/* Core Numerical Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className={`border p-3 rounded-xl ${
              themeMode === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/50 border-white/10'
            }`}>
              <div className={`text-[10px] font-mono flex items-center gap-1 ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Heart className="w-3 h-3 text-red-500" /> Puntos de Salud
              </div>
              <div className="text-lg font-bold font-mono text-red-600 dark:text-red-400 mt-1">{currentVariant.stats.hp} HP</div>
              <div className={`text-[10px] font-mono ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>Resistencia base</div>
            </div>

            <div className={`border p-3 rounded-xl ${
              themeMode === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/50 border-white/10'
            }`}>
              <div className={`text-[10px] font-mono flex items-center gap-1 ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Swords className={`w-3 h-3 ${themeMode === 'light' ? 'text-amber-700' : 'text-yellow-400'}`} /> Ataque / Defensa
              </div>
              <div className={`text-lg font-bold font-mono mt-1 ${
                themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
              }`}>
                {currentVariant.stats.attack} / {currentVariant.stats.defense}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Escala de combate</div>
            </div>

            <div className={`border p-3 rounded-xl ${
              themeMode === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/50 border-white/10'
            }`}>
              <div className={`text-[10px] font-mono flex items-center gap-1 ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Flame className={`w-3 h-3 ${themeMode === 'light' ? 'text-purple-700' : theme.textAccent}`} /> Rango de Daño
              </div>
              <div className={`text-lg font-bold font-mono mt-1 ${
                themeMode === 'light' ? 'text-purple-950' : theme.textAccent
              }`}>{currentVariant.stats.damage}</div>
              <div className="text-[10px] text-slate-500 font-mono">Impacto por golpe</div>
            </div>

            <div className={`border p-3 rounded-xl ${
              themeMode === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/50 border-white/10'
            }`}>
              <div className={`text-[10px] font-mono flex items-center gap-1 ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Gauge className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Velocidad
              </div>
              <div className={`text-lg font-bold font-mono mt-1 ${
                themeMode === 'light' ? 'text-cyan-900' : 'text-cyan-300'
              }`}>{currentVariant.stats.speed}</div>
              <div className="text-[10px] text-slate-500 font-mono">Casillas por turno</div>
            </div>

            <div className={`border p-3 rounded-xl ${
              themeMode === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/50 border-white/10'
            }`}>
              <div className={`text-[10px] font-mono flex items-center gap-1 ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Iniciativa
              </div>
              <div className={`text-lg font-bold font-mono mt-1 ${
                themeMode === 'light' ? 'text-emerald-900' : 'text-emerald-300'
              }`}>{currentVariant.stats.initiative}</div>
              <div className="text-[10px] text-slate-500 font-mono">Orden de acción</div>
            </div>

            <div className={`border p-3 rounded-xl ${
              themeMode === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/50 border-white/10'
            }`}>
              <div className={`text-[10px] font-mono flex items-center gap-1 ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Crosshair className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Tipo de Ataque
              </div>
              <div className={`text-lg font-bold font-mono mt-1 ${
                themeMode === 'light' ? 'text-blue-900' : 'text-blue-300'
              }`}>
                {currentVariant.stats.shots ? `${currentVariant.stats.shots} Tiros` : 'Melé'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {currentVariant.stats.shots ? 'Ataque a Distancia' : 'Cuerpo a Cuerpo'}
              </div>
            </div>
          </div>

          {/* Combat Stance & Active Ability Callout */}
          <div className={`p-4 rounded-xl shadow-md flex items-start gap-3 border ${
            themeMode === 'light'
              ? 'bg-amber-50/90 border-amber-300 text-slate-900'
              : `bg-black/60 ${theme.border}`
          }`}>
            <Zap className={`w-5 h-5 shrink-0 mt-0.5 ${themeMode === 'light' ? 'text-amber-600' : 'text-yellow-400'}`} />
            <div>
              <div className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
              }`}>
                Postura de Combate & Habilidad Activa (Mecánica Olden Era)
              </div>
              <div className={`text-xs sm:text-sm font-bold mt-0.5 ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                {currentVariant.combatStance}
              </div>
            </div>
          </div>

          {/* Abilities & Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl space-y-2 border ${
              themeMode === 'light'
                ? 'bg-white border-slate-200 shadow-xs'
                : `bg-black/40 ${theme.borderSubtle}`
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${
                themeMode === 'light' ? 'text-purple-900' : theme.textAccent
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Habilidades Especiales & Pasivas</span>
              </h4>
              <ul className="space-y-1.5">
                {currentVariant.abilities.map((ability, idx) => (
                  <li key={idx} className={`text-xs flex items-start gap-2 ${
                    themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
                  }`}>
                    <span className={`font-bold font-mono ${
                      themeMode === 'light' ? 'text-purple-700' : theme.textAccent
                    }`}>✦</span>
                    <span>{ability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-xl space-y-2 border ${
              themeMode === 'light'
                ? 'bg-teal-50/70 border-teal-200 shadow-xs'
                : 'bg-black/50 border-teal-900/40'
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${
                themeMode === 'light' ? 'text-teal-950' : 'text-teal-300'
              }`}>
                <Shield className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-teal-600' : 'text-teal-400'}`} />
                <span>Puntos Fuertes & Matchup Ideal</span>
              </h4>
              <p className={`text-xs leading-relaxed ${
                themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {currentVariant.strengths}
              </p>
              <div className={`text-[11px] font-mono p-2 rounded border mt-2 ${
                themeMode === 'light'
                  ? 'text-teal-950 bg-white border-teal-300'
                  : 'text-teal-300/90 bg-teal-950/40 border-teal-900/50'
              }`}>
                <strong>Emparejamiento Favorable:</strong> {currentVariant.idealMatchup}
              </div>
            </div>
          </div>

          {/* Tactical Deployment & Sinergies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`md:col-span-2 p-4 rounded-xl space-y-2 border ${
              themeMode === 'light'
                ? 'bg-amber-50/60 border-amber-200'
                : `bg-black/50 ${theme.borderSubtle}`
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${
                themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
              }`}>
                <Sparkles className={`w-4 h-4 ${themeMode === 'light' ? 'text-amber-600' : 'text-yellow-400'}`} />
                <span>Instrucciones de Despliegue en Partida</span>
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'
              }`}>
                {currentVariant.tacticalUsage}
              </p>
            </div>

            <div className={`p-4 rounded-xl space-y-2 border ${
              themeMode === 'light'
                ? 'bg-white border-slate-200'
                : `bg-black/60 ${theme.borderSubtle}`
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                themeMode === 'light' ? 'text-slate-800' : theme.textAccent
              }`}>
                Sinergias con Leyes
              </h4>
              <ul className="space-y-1 text-xs font-mono">
                {currentVariant.synergyLaws.map((law, idx) => (
                  <li key={idx} className={`flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
                  }`}>
                    <ChevronRight className={`w-3 h-3 shrink-0 ${
                      themeMode === 'light' ? 'text-purple-700' : theme.textAccent
                    }`} />
                    <span>{law}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
