import React from 'react';
import { Zap, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';

interface SpellPowerSliderProps {
  spellPower: number;
  onSpellPowerChange: (sp: number) => void;
  activeFaction: FactionId;
  themeMode?: 'dark' | 'light';
}

export const SpellPowerSlider: React.FC<SpellPowerSliderProps> = ({
  spellPower,
  onSpellPowerChange,
  activeFaction,
  themeMode = 'dark',
}) => {
  const theme = getFactionTheme(activeFaction, themeMode);

  const presets = [
    { label: 'Niv. 1 (2 SP)', value: 2, desc: 'Apertura D1' },
    { label: 'Niv. 5 (7 SP)', value: 7, desc: 'Semana 1-2' },
    { label: 'Niv. 10 (12 SP)', value: 12, desc: 'Mid Game' },
    { label: 'Niv. 18 (20 SP)', value: 20, desc: 'Late Game' },
    { label: 'Archimago (30 SP)', value: 30, desc: 'Mage Cap' },
  ];

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
        themeMode === 'light'
          ? 'bg-gradient-to-r from-purple-50/70 via-white to-amber-50/60 border-purple-200 shadow-sm'
          : `bg-gradient-to-r from-black/80 via-purple-950/20 to-black/80 border ${theme.borderSubtle} shadow-lg`
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-md shrink-0 ${
              themeMode === 'light'
                ? 'bg-purple-100 border-purple-300 text-purple-900'
                : `${theme.bgBadge} border ${theme.borderSubtle} ${theme.textAccent}`
            }`}
          >
            <Wand2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4
                className={`text-sm sm:text-base font-serif font-bold tracking-wide flex items-center gap-2 ${
                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                }`}
              >
                Simulador de Poder Mágico (Spell Power)
              </h4>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  themeMode === 'light'
                    ? 'bg-amber-100 text-amber-950 border-amber-300'
                    : 'bg-amber-950/60 text-amber-300 border-amber-700/50'
                }`}
              >
                Escalado en Vivo
              </span>
            </div>
            <p
              className={`text-xs mt-0.5 ${
                themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Ajusta el Poder Mágico (SP) del héroe para recalcular al instante el daño y curación de los 4 niveles de maestría.
            </p>
          </div>
        </div>

        {/* Big Interactive SP Gauge */}
        <div className="flex items-center gap-3 self-start lg:self-auto shrink-0">
          <div
            className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 font-mono shadow-inner ${
              themeMode === 'light'
                ? 'bg-white border-purple-300 text-purple-950'
                : 'bg-black/80 border-purple-500/50 text-purple-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold block text-slate-400">Poder Mágico Activo</span>
              <span className="text-xl font-bold tracking-tight text-purple-600 dark:text-purple-300">
                {spellPower} <span className="text-xs font-normal text-slate-400">SP</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSpellPowerChange(10)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              themeMode === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-black/50 hover:bg-black/80 text-slate-400 hover:text-white border-slate-800'
            }`}
            title="Restablecer a 10 SP"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slider Bar & Presets */}
      <div className="mt-4 space-y-3">
        {/* Slider Input */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 w-8 text-right font-bold">1 SP</span>
          <div className="relative flex-1">
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={spellPower}
              onChange={(e) => onSpellPowerChange(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none"
            />
            <div
              className="absolute -top-6 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-600 text-white transform -translate-x-1/2 pointer-events-none transition-all hidden sm:block"
              style={{ left: `${((spellPower - 1) / 29) * 100}%` }}
            >
              {spellPower} SP
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 w-10 font-bold">30 SP</span>
        </div>

        {/* Quick Archetype Preset Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className={`text-[10px] font-mono uppercase shrink-0 font-bold mr-1 ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
            Presets Rápidos:
          </span>
          {presets.map((p) => {
            const isSelected = spellPower === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => onSpellPowerChange(p.value)}
                className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? themeMode === 'light'
                      ? 'bg-purple-700 text-white border-purple-800 font-bold shadow-sm'
                      : 'bg-purple-600 text-white border-purple-400 font-bold shadow-md ring-1 ring-purple-400/50'
                    : themeMode === 'light'
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-black/50 hover:bg-black/80 text-slate-300 hover:text-white border-slate-800'
                }`}
              >
                <span>{p.label}</span>
                <span className={`text-[9px] ml-1 opacity-75 ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                  ({p.desc})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
