import React, { useState } from 'react';
import { RecommendedSpell } from '../../../types';
import {
  calculateSpellAtSpellPower,
  CalculatedSpell,
} from '../../../utils/spellScalingCalculator';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';
import { getFactionSpellPriority } from '../../../data/factionSpellData';
import {
  Swords,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Check,
  Target,
  Gem,
} from 'lucide-react';

interface SpellVersusComparatorProps {
  spells: RecommendedSpell[];
  spellPower: number;
  activeFaction: FactionId;
  themeMode?: 'dark' | 'light';
}

export const SpellVersusComparator: React.FC<SpellVersusComparatorProps> = ({
  spells,
  spellPower,
  activeFaction,
  themeMode = 'dark',
}) => {
  const theme = getFactionTheme(activeFaction, themeMode);

  // Pick 2 spells initially (e.g. Arcane Bolt vs Lightning Bolt or Slow vs Haste)
  const [spellAId, setSpellAId] = useState<string>(spells[0]?.id || 'spell-arcane-bolt');
  const [spellBId, setSpellBId] = useState<string>(spells[1]?.id || 'spell-lightning-bolt');

  const spellA = spells.find((s) => s.id === spellAId) || spells[0];
  const spellB = spells.find((s) => s.id === spellBId) || spells[1];

  const calcA = spellA ? calculateSpellAtSpellPower(spellA, spellPower) : null;
  const calcB = spellB ? calculateSpellAtSpellPower(spellB, spellPower) : null;

  const prioA = spellA ? getFactionSpellPriority(spellA.id, activeFaction) : null;
  const prioB = spellB ? getFactionSpellPriority(spellB.id, activeFaction) : null;

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 space-y-5 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md text-slate-800'
          : `bg-black/60 border ${theme.borderSubtle} text-slate-200 shadow-xl`
      }`}
    >
      {/* Header & Selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3 border-slate-700/30">
        <div>
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-500" />
            <h3
              className={`font-serif font-bold text-base sm:text-lg uppercase tracking-wide ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Comparador Táctico 1 vs 1 (Duelo de Hechizos)
            </h3>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                themeMode === 'light'
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-purple-950 text-purple-300 border-purple-700'
              }`}
            >
              Evaluado a {spellPower} SP
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Analiza lado a lado el escalado de daño, coste de maná y sinergias con {activeFaction}.
          </p>
        </div>

        {/* Dual Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Hechizo A:</label>
            <select
              value={spellAId}
              onChange={(e) => setSpellAId(e.target.value)}
              className={`w-full p-2 rounded-lg text-xs font-semibold focus:outline-none ${
                themeMode === 'light'
                  ? 'bg-slate-50 border border-slate-300 text-slate-900'
                  : 'bg-black/80 border border-slate-700 text-white'
              }`}
            >
              {spells.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (T{s.tier} • {s.school})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Hechizo B:</label>
            <select
              value={spellBId}
              onChange={(e) => setSpellBId(e.target.value)}
              className={`w-full p-2 rounded-lg text-xs font-semibold focus:outline-none ${
                themeMode === 'light'
                  ? 'bg-slate-50 border border-slate-300 text-slate-900'
                  : 'bg-black/80 border border-slate-700 text-white'
              }`}
            >
              {spells.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (T{s.tier} • {s.school})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side by Side Comparison Cards */}
      {calcA && calcB && spellA && spellB && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card A */}
          <div
            className={`p-4 rounded-xl border space-y-3.5 ${
              themeMode === 'light'
                ? 'bg-purple-50/50 border-purple-200 text-slate-800'
                : 'bg-black/40 border-purple-900/50 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/20">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
                  {spellA.school} • Tier {spellA.tier}
                </span>
                <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                  {spellA.name} <span className="text-xs font-normal text-slate-400 italic">({spellA.nameEn})</span>
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
                {spellA.levels[0].manaCost} Maná
              </span>
            </div>

            {/* Damage & Efficiency Metric */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Daño Nivel 4 ({spellPower} SP)</span>
                <span className="text-lg font-bold text-amber-400">
                  {calcA.level4Damage !== null ? `${calcA.level4Damage}` : 'Efecto Masivo'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Eficiencia (Dmg/Maná)</span>
                <span className="text-lg font-bold text-cyan-400">
                  {calcA.level4Efficiency !== null ? `${calcA.level4Efficiency} /pt` : 'Soporte'}
                </span>
              </div>
            </div>

            {/* 4 Levels Progression */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Progresión Niveles 1 a 4:</span>
              {calcA.levels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="p-2 rounded-lg bg-black/30 border border-slate-800/80 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-slate-200 font-mono text-[11px]">Niv. {lvl.level}: </span>
                    <span className="text-slate-300 text-[11px] font-sans truncate">{lvl.baseEffect}</span>
                  </div>
                  {lvl.calculatedValue !== null && (
                    <span className="text-xs font-bold font-mono text-amber-300 shrink-0">
                      {lvl.calculatedValue}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Faction Synergy */}
            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs">
              <span className="font-bold text-amber-400 font-mono text-[10px] uppercase block mb-0.5">
                💡 Sinergia con {activeFaction}:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {prioA ? prioA.synergyTip : spellA.tacticalUtility}
              </p>
            </div>
          </div>

          {/* Card B */}
          <div
            className={`p-4 rounded-xl border space-y-3.5 ${
              themeMode === 'light'
                ? 'bg-amber-50/50 border-amber-200 text-slate-800'
                : 'bg-black/40 border-amber-900/50 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/20">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  {spellB.school} • Tier {spellB.tier}
                </span>
                <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                  {spellB.name} <span className="text-xs font-normal text-slate-400 italic">({spellB.nameEn})</span>
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
                {spellB.levels[0].manaCost} Maná
              </span>
            </div>

            {/* Damage & Efficiency Metric */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Daño Nivel 4 ({spellPower} SP)</span>
                <span className="text-lg font-bold text-amber-400">
                  {calcB.level4Damage !== null ? `${calcB.level4Damage}` : 'Efecto Masivo'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Eficiencia (Dmg/Maná)</span>
                <span className="text-lg font-bold text-cyan-400">
                  {calcB.level4Efficiency !== null ? `${calcB.level4Efficiency} /pt` : 'Soporte'}
                </span>
              </div>
            </div>

            {/* 4 Levels Progression */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Progresión Niveles 1 a 4:</span>
              {calcB.levels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="p-2 rounded-lg bg-black/30 border border-slate-800/80 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-slate-200 font-mono text-[11px]">Niv. {lvl.level}: </span>
                    <span className="text-slate-300 text-[11px] font-sans truncate">{lvl.baseEffect}</span>
                  </div>
                  {lvl.calculatedValue !== null && (
                    <span className="text-xs font-bold font-mono text-amber-300 shrink-0">
                      {lvl.calculatedValue}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Faction Synergy */}
            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs">
              <span className="font-bold text-amber-400 font-mono text-[10px] uppercase block mb-0.5">
                💡 Sinergia con {activeFaction}:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {prioB ? prioB.synergyTip : spellB.tacticalUtility}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
