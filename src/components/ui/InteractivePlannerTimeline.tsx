import React from 'react';
import { Sparkles, Swords, Crown, Flame, Flag, ChevronRight } from 'lucide-react';
import { FactionId } from '../../data/factionDataProvider';

interface InteractivePlannerTimelineProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  selectedFaction: FactionId;
  completedDays: Record<number, boolean>;
  themeMode?: 'dark' | 'light';
  themeAccentColor?: string;
}

export const InteractivePlannerTimeline: React.FC<InteractivePlannerTimelineProps> = ({
  selectedDay,
  onSelectDay,
  selectedFaction,
  completedDays,
  themeMode = 'dark',
  themeAccentColor = '#c084fc',
}) => {
  const isDark = themeMode === 'dark';

  const phases = [
    {
      id: 1,
      name: 'Fase 1: Apertura',
      range: 'Días 1-7 (S1)',
      desc: 'Creeping inicial, Tiers 1-3 y Observatorio',
      days: [1, 7],
      icon: Flag,
      color: 'amber',
    },
    {
      id: 2,
      name: 'Fase 2: Rush Militar',
      range: 'Días 8-14 (S2)',
      desc: 'Ciudadela, Castillo y Rush a Tier 6/7',
      days: [8, 14],
      icon: Swords,
      color: 'red',
    },
    {
      id: 3,
      name: 'Fase 3: Expansión & Capitolio',
      range: 'Días 15-28 (S3-S4)',
      desc: 'Leyes cívicas, 2º héroe y control de minas',
      days: [15, 28],
      icon: Crown,
      color: 'purple',
    },
    {
      id: 4,
      name: 'Fase 4: Campaña & Asedio Final',
      range: 'Días 29-56 (Mes 2)',
      desc: 'Ritos permanentes, full stacks y asedio',
      days: [29, 56],
      icon: Flame,
      color: 'cyan',
    },
  ];

  const milestones = [
    { day: 1, label: 'D1: Apertura', icon: '🚩', tip: 'Hero scouting & Tier 1' },
    { day: 4, label: 'D4: Tiers 1-3', icon: '🛡️', tip: 'Unidades tempranas aseguradas' },
    { day: 7, label: 'D7: Ciudadela', icon: '🏰', tip: 'Crecimiento semanal S1' },
    { day: 14, label: 'D14: Rush T7', icon: '⚡', tip: 'Tier 7 / Castillo edificado' },
    { day: 21, label: 'D21: Capitolio', icon: '💰', tip: 'Economía +4.000 Oro/día' },
    { day: 28, label: 'D28: Fin Mes 1', icon: '🔮', tip: 'Revisión general de ejército' },
    { day: 42, label: 'D42: Asedios', icon: '⚔️', tip: 'Captura de fortalezas rivales' },
    { day: 56, label: 'D56: Victoria', icon: '👑', tip: 'Encuentro final late-game' },
  ];

  return (
    <div className={`p-4 rounded-xl border ${
      isDark ? 'bg-black/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    } space-y-3.5`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            Línea de Tiempo Táctica & Selector de Fases (56 Días)
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Haz clic en cualquier hito o fase para saltar directamente
        </span>
      </div>

      {/* 4 Phase Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {phases.map((phase) => {
          const isCurrentPhase = selectedDay >= phase.days[0] && selectedDay <= phase.days[1];
          const Icon = phase.icon;

          return (
            <button
              key={phase.id}
              onClick={() => onSelectDay(phase.days[0])}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isCurrentPhase
                  ? isDark
                    ? 'bg-slate-800/90 border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.2)] ring-1 ring-amber-400/50'
                    : 'bg-amber-50 border-amber-400 shadow-sm ring-1 ring-amber-300'
                  : isDark
                  ? 'bg-black/40 border-slate-800/80 hover:bg-white/5 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`text-xs font-bold font-mono uppercase flex items-center gap-1.5 ${
                  isCurrentPhase
                    ? isDark ? 'text-amber-300' : 'text-amber-900'
                    : isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{phase.name}</span>
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                  isCurrentPhase
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 font-bold'
                    : 'bg-black/20 text-slate-400 border-slate-800'
                }`}>
                  {phase.range}
                </span>
              </div>
              <p className={`text-[11px] leading-tight line-clamp-2 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {phase.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Visual Timeline Track with Milestones */}
      <div className="pt-2">
        <div className="relative flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-2">
          {/* Background Connecting Line */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-800/80 z-0 rounded-full" />

          {milestones.map((m) => {
            const isSelected = selectedDay === m.day;
            const isCompleted = !!completedDays[m.day];
            const isPast = selectedDay > m.day;

            return (
              <button
                key={m.day}
                onClick={() => onSelectDay(m.day)}
                title={m.tip}
                className={`relative z-10 flex flex-col items-center gap-1 shrink-0 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'scale-105'
                    : 'opacity-90 hover:opacity-100 hover:scale-102'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all shadow-md ${
                  isSelected
                    ? 'bg-amber-500 border-white text-black ring-4 ring-amber-400/30'
                    : isCompleted
                    ? 'bg-emerald-700 border-emerald-400 text-white'
                    : isPast
                    ? isDark ? 'bg-slate-800 border-slate-600 text-slate-300' : 'bg-slate-200 border-slate-400 text-slate-700'
                    : isDark ? 'bg-black border-slate-800 text-slate-400' : 'bg-white border-slate-300 text-slate-500'
                }`}>
                  {m.icon}
                </div>
                <span className={`text-[10px] font-mono whitespace-nowrap font-bold ${
                  isSelected
                    ? isDark ? 'text-amber-300' : 'text-amber-900'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
