import React, { useState } from 'react';
import { Coins, Trees, Shield, Gem, Sparkles, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { BuildStep } from '../../types';

interface BuildResourceCalculatorProps {
  allSteps: BuildStep[];
  completedDays: Record<number, boolean>;
  themeMode?: 'dark' | 'light';
  themeAccentColor?: string;
  onToggleWeekCompletion?: (week: number, complete: boolean) => void;
}

export const BuildResourceCalculator: React.FC<BuildResourceCalculatorProps> = ({
  allSteps,
  completedDays,
  themeMode = 'dark',
  themeAccentColor = '#c084fc',
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isDark = themeMode === 'dark';

  // Calculate totals (7 canonical resources of Olden Era: Gold, Wood, Ore, Gems, Crystal, Mercury, Alchemical Dust)
  const totalCost = allSteps.reduce(
    (acc, step) => {
      acc.gold += step.cost.gold || 0;
      acc.wood += step.cost.wood || 0;
      acc.ore += step.cost.ore || 0;
      acc.gems += step.cost.gems || 0;
      acc.crystal += step.cost.crystal || 0;
      acc.mercury += step.cost.mercury || 0;
      acc.alchemicalDust += step.cost.alchemicalDust || 0;
      return acc;
    },
    { gold: 0, wood: 0, ore: 0, gems: 0, crystal: 0, mercury: 0, alchemicalDust: 0 }
  );

  const completedSteps = allSteps.filter((s) => completedDays[s.day]);
  const completedCost = completedSteps.reduce(
    (acc, step) => {
      acc.gold += step.cost.gold || 0;
      acc.wood += step.cost.wood || 0;
      acc.ore += step.cost.ore || 0;
      acc.gems += step.cost.gems || 0;
      acc.crystal += step.cost.crystal || 0;
      acc.mercury += step.cost.mercury || 0;
      acc.alchemicalDust += step.cost.alchemicalDust || 0;
      return acc;
    },
    { gold: 0, wood: 0, ore: 0, gems: 0, crystal: 0, mercury: 0, alchemicalDust: 0 }
  );

  const completedPercent = Math.round((completedSteps.length / (allSteps.length || 1)) * 100);

  return (
    <div className={`rounded-xl border transition-all ${
      isDark ? 'bg-black/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    } overflow-hidden`}>
      {/* Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-3 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
          isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              Calculadora de Costes en Tiempo Real
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className={`px-2 py-0.5 rounded border text-[11px] font-bold ${
              isDark ? 'bg-yellow-950/60 text-yellow-300 border-yellow-700/60' : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              {completedCost.gold.toLocaleString()} / {totalCost.gold.toLocaleString()} Oro
            </span>
            <span className="text-slate-400 text-[11px]">
              ({completedPercent}% completado)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress Mini Bar */}
          <div className="hidden sm:block w-28 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${completedPercent}%` }}
            />
          </div>

          <button
            type="button"
            className={`p-1 rounded-lg border text-xs flex items-center gap-1 font-mono ${
              isDark ? 'bg-black/40 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            <span>{isExpanded ? 'Contraer' : 'Desglose Detallado'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <div className={`p-4 border-t ${
          isDark ? 'border-slate-800 bg-black/40' : 'border-slate-200 bg-slate-50'
        } space-y-4 animate-fadeIn`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 font-mono text-center">
            {/* Gold */}
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-black/60 border-yellow-900/40' : 'bg-white border-amber-200'
            }`}>
              <div className="text-[10px] text-yellow-500 font-bold flex items-center justify-center gap-1">
                <Coins className="w-3 h-3" /> Oro
              </div>
              <div className="text-sm font-bold text-yellow-400 mt-0.5">
                {completedCost.gold.toLocaleString()}
              </div>
              <div className="text-[9px] text-slate-500">
                de {totalCost.gold.toLocaleString()}
              </div>
            </div>

            {/* Wood */}
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-black/60 border-emerald-900/40' : 'bg-white border-emerald-200'
            }`}>
              <div className="text-[10px] text-emerald-500 font-bold flex items-center justify-center gap-1">
                <Trees className="w-3 h-3" /> Madera
              </div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">
                {completedCost.wood}
              </div>
              <div className="text-[9px] text-slate-500">
                de {totalCost.wood}
              </div>
            </div>

            {/* Ore */}
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-black/60 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> Mineral
              </div>
              <div className="text-sm font-bold text-slate-300 mt-0.5">
                {completedCost.ore}
              </div>
              <div className="text-[9px] text-slate-500">
                de {totalCost.ore}
              </div>
            </div>

            {/* Gems */}
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-black/60 border-cyan-900/40' : 'bg-white border-cyan-200'
            }`}>
              <div className="text-[10px] text-cyan-400 font-bold flex items-center justify-center gap-1">
                <Gem className="w-3 h-3" /> Gemas
              </div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">
                {completedCost.gems}
              </div>
              <div className="text-[9px] text-slate-500">
                de {totalCost.gems}
              </div>
            </div>

            {/* Crystal */}
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-black/60 border-purple-900/40' : 'bg-white border-purple-200'
            }`}>
              <div className="text-[10px] text-purple-400 font-bold flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Cristal
              </div>
              <div className="text-sm font-bold text-purple-300 mt-0.5">
                {completedCost.crystal}
              </div>
              <div className="text-[9px] text-slate-500">
                de {totalCost.crystal}
              </div>
            </div>

            {/* Mercury */}
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-black/60 border-red-900/40' : 'bg-white border-red-200'
            }`}>
              <div className="text-[10px] text-red-400 font-bold flex items-center justify-center gap-1">
                🧪 Mercurio
              </div>
              <div className="text-sm font-bold text-red-300 mt-0.5">
                {completedCost.mercury}
              </div>
              <div className="text-[9px] text-slate-500">
                de {totalCost.mercury}
              </div>
            </div>

            {/* Alchemical Dust */}
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-black/60 border-blue-900/40' : 'bg-white border-blue-200'
            }`}>
              <div className="text-[10px] text-blue-400 font-bold flex items-center justify-center gap-1">
                ✨ Polvo
              </div>
              <div className="text-sm font-bold text-blue-300 mt-0.5">
                {completedCost.alchemicalDust}
              </div>
              <div className="text-[9px] text-slate-500">
                de {totalCost.alchemicalDust}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
