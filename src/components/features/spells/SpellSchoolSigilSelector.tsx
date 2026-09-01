import React from 'react';
import { Sun, Moon, Flame, Orbit, Compass, Sparkles, Check, BookOpen } from 'lucide-react';
import { CANONICAL_MAGIC_SCHOOLS, CanonicalSchoolMeta } from '../../../utils/spellScalingCalculator';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';
import { RecommendedSpell } from '../../../types';

interface SpellSchoolSigilSelectorProps {
  selectedSchool: string;
  onSelectSchool: (schoolId: string) => void;
  activeFaction: FactionId;
  spells: RecommendedSpell[];
  themeMode?: 'dark' | 'light';
}

export const SpellSchoolSigilSelector: React.FC<SpellSchoolSigilSelectorProps> = ({
  selectedSchool,
  onSelectSchool,
  activeFaction,
  spells,
  themeMode = 'dark',
}) => {
  const theme = getFactionTheme(activeFaction, themeMode);

  const getSchoolIcon = (type: CanonicalSchoolMeta['iconType']) => {
    switch (type) {
      case 'sun':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'moon':
        return <Moon className="w-4 h-4 text-purple-400" />;
      case 'elemental':
        return <Flame className="w-4 h-4 text-emerald-400" />;
      case 'arcane':
        return <Orbit className="w-4 h-4 text-indigo-400" />;
      case 'astral':
        return <Compass className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getSchoolSpellCount = (schoolId: string): number => {
    if (schoolId === 'all') return spells.length;
    return spells.filter((s) => s.school.toLowerCase().includes(schoolId.toLowerCase())).length;
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          Las 5 Escuelas Canónicas de Jadame
        </span>
        <button
          type="button"
          onClick={() => onSelectSchool('all')}
          className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded transition-colors cursor-pointer border ${
            selectedSchool === 'all'
              ? themeMode === 'light'
                ? 'bg-purple-700 text-white border-purple-800'
                : `${theme.primaryButton} text-white border-white/20 shadow-sm`
              : themeMode === 'light'
              ? 'text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
              : 'text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-black/40'
          }`}
        >
          Ver Todas ({spells.length})
        </button>
      </div>

      {/* Grid of 5 School Sigils */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {CANONICAL_MAGIC_SCHOOLS.map((school) => {
          const isSelected = selectedSchool === school.id;
          const count = getSchoolSpellCount(school.id);
          const isAffinity = school.primaryFaction.includes(activeFaction);

          return (
            <button
              key={school.id}
              type="button"
              onClick={() => onSelectSchool(isSelected ? 'all' : school.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? themeMode === 'light'
                    ? 'bg-white border-2 border-purple-600 shadow-md ring-2 ring-purple-400/30'
                    : `${school.bgDark} ring-2 ring-purple-400/40 shadow-[0_0_15px_rgba(147,51,234,0.2)]`
                  : themeMode === 'light'
                  ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
                  : 'bg-black/50 hover:bg-black/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-black/60 border-slate-800'
                    }`}
                  >
                    {getSchoolIcon(school.iconType)}
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                      isSelected
                        ? themeMode === 'light'
                          ? 'bg-purple-100 text-purple-900 border-purple-300 font-bold'
                          : 'bg-purple-950/80 text-purple-300 border-purple-700/60 font-bold'
                        : themeMode === 'light'
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-black/40 text-slate-400 border-slate-800'
                    }`}
                  >
                    {count} {count === 1 ? 'Hechizo' : 'Hechizos'}
                  </span>
                </div>

                <div className="font-serif font-bold text-xs sm:text-sm truncate">
                  {school.name}
                </div>
                <div className="text-[10px] font-sans opacity-70 truncate">
                  {school.nameEn}
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-700/20 flex items-center justify-between">
                <span
                  className={`text-[9px] font-mono font-semibold truncate ${
                    isAffinity
                      ? themeMode === 'light'
                        ? 'text-amber-800 font-bold'
                        : 'text-amber-300 font-bold'
                      : themeMode === 'light'
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  }`}
                >
                  {isAffinity ? `⭐ Afín a ${activeFaction}` : 'Común'}
                </span>

                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
