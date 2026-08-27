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
}

export const UnitMatrix: React.FC<UnitMatrixProps> = ({ selectedFaction = 'Mazmorra' }) => {
  const [selectedTier, setSelectedTier] = useStickyState<number>(1, `units_selected_tier_${selectedFaction}`);
  const [selectedBranch, setSelectedBranch] = useStickyState<'base' | 'branch_a' | 'branch_b' | 'comparison'>('branch_a', 'units_selected_branch');
  const [showFullDecisionModal, setShowFullDecisionModal] = useState<boolean>(false);

  const units = getUnitsForFaction(selectedFaction);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction);

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
      <div className={`bg-black/40 border ${theme.border} rounded-2xl p-6 ${theme.shadowAccent} backdrop-blur-md transition-colors duration-300`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`text-[10px] uppercase font-mono tracking-widest ${theme.textAccent} font-bold mb-1`}>
              Bestiario & Unidades de Guerra • Heroes of Might and Magic: Olden Era
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white uppercase tracking-wide">
              Matriz de Criaturas y Ramas ({meta.name})
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              En Olden Era, cada criatura de {meta.name} dispone de una forma <strong>Base</strong> y dos mejoras alternativas: <strong>Rama A</strong> (enfoque ofensivo o especializado) y <strong>Rama B</strong> (enfoque táctico, de control o defensivo). Alterna libremente entre ellas para comparar atributos, habilidades y recomendaciones.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              id="toggle-comparison-view"
              onClick={() => setSelectedBranch(selectedBranch === 'comparison' ? 'branch_a' : 'comparison')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                selectedBranch === 'comparison'
                  ? `${theme.primaryButton} text-white shadow-lg`
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
                  ? `${theme.bgBadge} ${theme.border} text-white ${theme.shadowAccent} ring-1 ring-white/30`
                  : `bg-black/40 ${theme.borderSubtle} text-slate-300 hover:bg-white/5`
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 border ${theme.borderSubtle} text-yellow-400`}>
                  T{unit.tier}
                </span>
                <span className={isSelected ? 'text-yellow-400' : theme.textAccent}>
                  {getIcon(unit.iconName)}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-xs font-bold truncate uppercase font-sans tracking-wide text-white">
                  {unit.name}
                </div>
                <div className={`text-[10px] ${theme.textAccent} font-mono truncate mt-0.5`}>
                  {unit.dwelling}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Branch Selector Tabs */}
      <div className={`bg-black/60 border ${theme.borderSubtle} rounded-2xl p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2 shadow-lg backdrop-blur-sm`}>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Base Button */}
          <button
            id="unit-branch-base"
            onClick={() => setSelectedBranch('base')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectedBranch === 'base'
                ? 'bg-slate-700/90 border-slate-400 text-white shadow-[0_0_15px_rgba(148,163,184,0.3)]'
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
                ? `${theme.primaryButton} text-white shadow-lg`
                : `${theme.bgBadge} ${theme.borderSubtle} ${theme.textAccent} hover:brightness-125`
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>⚡ Rama A: {selectedUnit.variants.branchA.name}</span>
          </button>

          {/* Branch B Button */}
          <button
            id="unit-branch-b"
            onClick={() => setSelectedBranch('branch_b')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectedBranch === 'branch_b'
                ? 'bg-emerald-600/90 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.45)] ring-1 ring-emerald-300'
                : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/30 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>✦ Rama B: {selectedUnit.variants.branchB.name}</span>
          </button>
        </div>

        {/* Quick Decision Guide Button */}
        <button
          id="btn-decision-guide"
          onClick={() => setShowFullDecisionModal(!showFullDecisionModal)}
          className="text-xs text-yellow-300 bg-yellow-950/40 hover:bg-yellow-900/40 border border-yellow-700/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-mono cursor-pointer transition-all ml-auto"
        >
          <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
          <span>{showFullDecisionModal ? 'Ocultar Guía Rama A vs B' : '¿Cuándo elegir Rama A vs B?'}</span>
        </button>
      </div>

      {/* Decision Guide Callout (if active or opened) */}
      {(showFullDecisionModal || selectedBranch === 'comparison') && (
        <div className={`bg-gradient-to-br from-black/80 via-black/70 to-black/90 border ${theme.border} rounded-2xl p-5 shadow-2xl space-y-4`}>
          <div className={`flex items-center gap-2.5 border-b ${theme.borderSubtle} pb-3`}>
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm sm:text-base font-serif text-white uppercase tracking-wide">
              Guía de Decisión Estratégica: Tier {selectedUnit.tier} ({selectedUnit.name})
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {selectedUnit.comparison.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* When to pick Branch A */}
            <div className={`bg-black/60 border ${theme.border} rounded-xl p-4 space-y-2`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold ${theme.textAccent} uppercase tracking-wider flex items-center gap-1.5`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¿Cuándo elegir Rama A? ({selectedUnit.variants.branchA.name})</span>
                </span>
                <span className={`text-[10px] font-mono ${theme.bgBadge} ${theme.textAccent} px-2 py-0.5 rounded border ${theme.borderSubtle}`}>
                  Rama A
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedUnit.comparison.whenToPickA}
              </p>
              <div className={`text-[11px] text-yellow-300/90 font-mono bg-black/40 p-2 rounded border ${theme.borderSubtle} flex items-center gap-1.5 mt-2`}>
                <UserCheck className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span><strong>Héroe Afín:</strong> {selectedUnit.comparison.synergyHeroA}</span>
              </div>
            </div>

            {/* When to pick Branch B */}
            <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>¿Cuándo elegir Rama B? ({selectedUnit.variants.branchB.name})</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-900/70 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700/60">
                  Rama B
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedUnit.comparison.whenToPickB}
              </p>
              <div className="text-[11px] text-emerald-300/90 font-mono bg-black/40 p-2 rounded border border-emerald-800/40 flex items-center gap-1.5 mt-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
                  ? `${theme.bgBadge} ${theme.border} ${theme.shadowAccent}`
                  : color === 'emerald'
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-950/40 border-slate-800/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      color === 'faction'
                        ? `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                        : color === 'emerald'
                        ? 'bg-emerald-900/60 text-emerald-200 border-emerald-600'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {badge}
                    </span>
                    <h3 className="text-base font-serif text-white uppercase mt-1.5">{variant.name}</h3>
                    <div className="text-[11px] text-slate-400 font-mono">{variant.nameEn} • {variant.dwellingName}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-yellow-400">{variant.cost.gold} Oro</div>
                    {variant.cost.gems && <div className="text-[10px] text-emerald-400">+{variant.cost.gems} Gemas</div>}
                    {variant.cost.ore && <div className="text-[10px] text-amber-400">+{variant.cost.ore} Mineral</div>}
                    {variant.cost.mercury && <div className="text-[10px] text-red-400">+{variant.cost.mercury} Mercurio</div>}
                    {variant.cost.alchemicalDust && <div className="text-[10px] text-cyan-400">+{variant.cost.alchemicalDust} Polvo</div>}
                  </div>
                </div>

                {/* Comparative Stats Grid */}
                <div className="grid grid-cols-3 gap-2 my-3 text-center font-mono">
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">Salud</div>
                    <div className="text-sm font-bold text-red-400 flex items-center justify-center gap-1">
                      <Heart className="w-3 h-3" /> {variant.stats.hp}
                    </div>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">Ataque / Def</div>
                    <div className="text-sm font-bold text-yellow-400">
                      {variant.stats.attack} / {variant.stats.defense}
                    </div>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">Daño</div>
                    <div className={`text-sm font-bold ${theme.textAccent}`}>{variant.stats.damage}</div>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">Vel / Init</div>
                    <div className="text-sm font-bold text-cyan-300">
                      {variant.stats.speed} / {variant.stats.initiative}
                    </div>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">{variant.stats.shots ? 'Disparos' : 'Alcance'}</div>
                    <div className="text-sm font-bold text-emerald-300">
                      {variant.stats.shots ? `${variant.stats.shots}` : 'Melé'}
                    </div>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400">Crecimiento</div>
                    <div className="text-sm font-bold text-slate-200">{variant.stats.weeklyGrowth}/sem</div>
                  </div>
                </div>

                {/* Stance */}
                <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-1 my-2">
                  <div className="text-[10px] font-mono font-bold text-yellow-400 uppercase">Postura Activa</div>
                  <p className="text-[11px] text-slate-200 leading-relaxed">{variant.combatStance}</p>
                </div>

                {/* Abilities */}
                <div className="space-y-1.5 my-2">
                  <div className={`text-[10px] font-mono font-bold ${theme.textAccent} uppercase`}>Habilidades</div>
                  <ul className="space-y-1">
                    {variant.abilities.map((ab, i) => (
                      <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-snug">
                        <span className={`${theme.textAccent} font-bold font-mono`}>✦</span>
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
                className="w-full py-2 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all cursor-pointer"
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
            ? 'bg-gradient-to-b from-emerald-950/30 via-black/50 to-black/60 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]'
            : selectedBranch === 'branch_a'
            ? `${theme.bgBadge} ${theme.border} ${theme.shadowAccent}`
            : 'bg-black/40 border-slate-800'
        }`}>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${
                selectedBranch === 'branch_b'
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : selectedBranch === 'branch_a'
                  ? `${theme.bgBadge} ${theme.border} ${theme.textAccent} shadow-md`
                  : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}>
                {getIcon(selectedUnit.iconName)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-yellow-400 border border-yellow-700/60 uppercase">
                    Tier {selectedUnit.tier}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    selectedBranch === 'branch_b'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : selectedBranch === 'branch_a'
                      ? `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}>
                    {currentVariant.branchLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Morada: <strong className="text-white">{currentVariant.dwellingName}</strong>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white uppercase mt-1">
                  {currentVariant.name}
                </h3>
                <div className="text-xs text-slate-400 font-mono">
                  {currentVariant.nameEn} • <em>{currentVariant.subtitle}</em>
                </div>
              </div>
            </div>

            {/* Cost and Role Badge */}
            <div className={`bg-black/60 px-4 py-3 rounded-xl border ${theme.borderSubtle} text-left sm:text-right self-start sm:self-auto space-y-1`}>
              <div className={`text-[10px] ${theme.textAccent} font-mono font-bold uppercase tracking-wider`}>
                Coste de Reclutamiento
              </div>
              <div className="flex items-center sm:justify-end gap-2 font-mono">
                <span className="text-sm font-bold text-yellow-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> {currentVariant.cost.gold} Oro
                </span>
                {currentVariant.cost.gems && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Gem className="w-3 h-3" /> +{currentVariant.cost.gems} Gemas
                  </span>
                )}
                {currentVariant.cost.alchemicalDust && (
                  <span className="text-xs font-bold text-cyan-400">
                    +{currentVariant.cost.alchemicalDust} Polvo
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Crecimiento: <strong className="text-white">{currentVariant.stats.weeklyGrowth}/semana</strong>
              </div>
            </div>
          </div>

          {/* Core Numerical Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-400" /> Puntos de Salud
              </div>
              <div className="text-lg font-bold font-mono text-red-400 mt-1">{currentVariant.stats.hp} HP</div>
              <div className="text-[10px] text-slate-500 font-mono">Resistencia base</div>
            </div>

            <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Swords className="w-3 h-3 text-yellow-400" /> Ataque / Defensa
              </div>
              <div className="text-lg font-bold font-mono text-yellow-400 mt-1">
                {currentVariant.stats.attack} / {currentVariant.stats.defense}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Escala de combate</div>
            </div>

            <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Flame className={`w-3 h-3 ${theme.textAccent}`} /> Rango de Daño
              </div>
              <div className={`text-lg font-bold font-mono ${theme.textAccent} mt-1`}>{currentVariant.stats.damage}</div>
              <div className="text-[10px] text-slate-500 font-mono">Impacto por golpe</div>
            </div>

            <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Gauge className="w-3 h-3 text-cyan-400" /> Velocidad
              </div>
              <div className="text-lg font-bold font-mono text-cyan-300 mt-1">{currentVariant.stats.speed}</div>
              <div className="text-[10px] text-slate-500 font-mono">Casillas por turno</div>
            </div>

            <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" /> Iniciativa
              </div>
              <div className="text-lg font-bold font-mono text-emerald-300 mt-1">{currentVariant.stats.initiative}</div>
              <div className="text-[10px] text-slate-500 font-mono">Orden de acción</div>
            </div>

            <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Crosshair className="w-3 h-3 text-blue-400" /> Tipo de Ataque
              </div>
              <div className="text-lg font-bold font-mono text-blue-300 mt-1">
                {currentVariant.stats.shots ? `${currentVariant.stats.shots} Tiros` : 'Melé'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {currentVariant.stats.shots ? 'Ataque a Distancia' : 'Cuerpo a Cuerpo'}
              </div>
            </div>
          </div>

          {/* Combat Stance & Active Ability Callout */}
          <div className={`bg-black/60 border ${theme.border} p-4 rounded-xl shadow-md flex items-start gap-3`}>
            <Zap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] text-yellow-400 font-mono font-bold uppercase tracking-widest">
                Postura de Combate & Habilidad Activa (Mecánica Olden Era)
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {currentVariant.combatStance}
              </div>
            </div>
          </div>

          {/* Abilities & Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`bg-black/40 border ${theme.borderSubtle} p-4 rounded-xl space-y-2`}>
              <h4 className={`text-xs font-bold ${theme.textAccent} uppercase tracking-wider font-mono flex items-center gap-1.5`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Habilidades Especiales & Pasivas</span>
              </h4>
              <ul className="space-y-1.5">
                {currentVariant.abilities.map((ability, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                    <span className={`${theme.textAccent} font-bold font-mono`}>✦</span>
                    <span>{ability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/50 border border-teal-900/40 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>Puntos Fuertes & Matchup Ideal</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentVariant.strengths}
              </p>
              <div className="text-[11px] text-teal-300/90 font-mono bg-teal-950/40 p-2 rounded border border-teal-900/50 mt-2">
                <strong>Emparejamiento Favorable:</strong> {currentVariant.idealMatchup}
              </div>
            </div>
          </div>

          {/* Tactical Deployment & Sinergies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`md:col-span-2 bg-black/50 p-4 rounded-xl border ${theme.borderSubtle} space-y-2`}>
              <h4 className="text-xs font-bold text-yellow-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Instrucciones de Despliegue en Partida</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentVariant.tacticalUsage}
              </p>
            </div>

            <div className={`bg-black/60 p-4 rounded-xl border ${theme.borderSubtle} space-y-2`}>
              <h4 className={`text-xs font-bold ${theme.textAccent} uppercase tracking-wider font-mono`}>
                Sinergias con Leyes
              </h4>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                {currentVariant.synergyLaws.map((law, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-slate-200">
                    <ChevronRight className={`w-3 h-3 ${theme.textAccent} shrink-0`} />
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
