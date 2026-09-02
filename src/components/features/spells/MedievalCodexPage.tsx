import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Feather, ScrollText } from 'lucide-react';
import { CANONICAL_MAGIC_SCHOOLS, CanonicalSchoolMeta } from '../../../utils/spellScalingCalculator';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';

export interface MedievalCodexPageProps {
  selectedSchool: string;
  onSelectSchool: (schoolId: string) => void;
  activeFaction: FactionId;
  children: React.ReactNode;
  themeMode?: 'dark' | 'light';
  codexMode: boolean;
  onToggleCodexMode: () => void;
}

// Brass/Gold Filigree Corner Ornaments (SVG)
const MedievalCornerOrnament: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; color?: string }> = ({
  position,
  color = 'currentColor',
}) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div className={`absolute ${position.replace('-', ' ')} w-6 h-6 pointer-events-none ${rotationClass} z-20 opacity-70`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke={color} strokeWidth="1.5">
        <path d="M2 22V8C2 4.68629 4.68629 2 8 2H22" strokeLinecap="round" />
        <path d="M6 18V9C6 7.34315 7.34315 6 9 6H18" strokeLinecap="round" opacity="0.6" />
        <circle cx="9" cy="9" r="1.5" fill={color} />
        <path d="M2 2L6 6" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const MedievalCodexPage: React.FC<MedievalCodexPageProps> = ({
  selectedSchool,
  onSelectSchool,
  activeFaction,
  children,
  themeMode = 'dark',
  codexMode,
  onToggleCodexMode,
}) => {
  const theme = getFactionTheme(activeFaction, themeMode);

  // Track page turn animation state
  const [animClass, setAnimClass] = useState<string>('');
  const [prevSchool, setPrevSchool] = useState<string>(selectedSchool);

  // Trigger page-flip transition when school changes
  useEffect(() => {
    if (selectedSchool !== prevSchool) {
      // Determine direction based on school index in CANONICAL_MAGIC_SCHOOLS
      const prevIdx = CANONICAL_MAGIC_SCHOOLS.findIndex((s) => s.id === prevSchool);
      const nextIdx = CANONICAL_MAGIC_SCHOOLS.findIndex((s) => s.id === selectedSchool);

      const isNext = nextIdx >= prevIdx;
      setAnimClass(isNext ? 'animate-codex-page-next' : 'animate-codex-page-prev');

      const timer = setTimeout(() => {
        setAnimClass('');
      }, 500);

      setPrevSchool(selectedSchool);
      return () => clearTimeout(timer);
    }
  }, [selectedSchool, prevSchool]);

  const currentSchoolMeta = CANONICAL_MAGIC_SCHOOLS.find((s) => s.id === selectedSchool);
  const currentSchoolIndex = CANONICAL_MAGIC_SCHOOLS.findIndex((s) => s.id === selectedSchool);

  // Handle previous & next school paging
  const handlePrevPage = () => {
    if (selectedSchool === 'all') {
      onSelectSchool(CANONICAL_MAGIC_SCHOOLS[CANONICAL_MAGIC_SCHOOLS.length - 1].id);
      return;
    }
    const nextIdx = currentSchoolIndex <= 0 ? CANONICAL_MAGIC_SCHOOLS.length - 1 : currentSchoolIndex - 1;
    onSelectSchool(CANONICAL_MAGIC_SCHOOLS[nextIdx].id);
  };

  const handleNextPage = () => {
    if (selectedSchool === 'all') {
      onSelectSchool(CANONICAL_MAGIC_SCHOOLS[0].id);
      return;
    }
    const nextIdx = currentSchoolIndex >= CANONICAL_MAGIC_SCHOOLS.length - 1 ? 0 : currentSchoolIndex + 1;
    onSelectSchool(CANONICAL_MAGIC_SCHOOLS[nextIdx].id);
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <div className="space-y-4">
      {/* Top Codex Controls & Style Switcher */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleCodexMode}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              codexMode
                ? themeMode === 'light'
                  ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-sm'
                  : 'bg-amber-950/60 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : themeMode === 'light'
                ? 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                : 'bg-black/50 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5 text-amber-500" />
            <span>{codexMode ? 'Códice Ilustrado Activo' : 'Activar Modo Códice Antiguo'}</span>
          </button>

          {currentSchoolMeta && (
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-flex items-center gap-1 ${
              themeMode === 'light' ? 'bg-amber-50 text-amber-950 border-amber-200' : 'bg-black/40 text-amber-300 border-amber-900/40'
            }`}>
              <Feather className="w-3 h-3 text-amber-500" />
              Folio {romanNumerals[currentSchoolIndex] || 'Omnia'} • {currentSchoolMeta.name}
            </span>
          )}
        </div>

        {/* Previous / Next Page Turn Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevPage}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              themeMode === 'light'
                ? 'bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border-slate-200 shadow-xs'
                : 'bg-black/50 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border-slate-800'
            }`}
            title="Girar a la página/escuela anterior"
          >
            <ChevronLeft className="w-4 h-4 text-amber-500" />
            <span className="hidden xs:inline">Página Anterior</span>
          </button>

          <span className={`text-xs font-mono px-2 py-1 font-bold ${
            themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'
          }`}>
            {selectedSchool === 'all' ? 'Omnia' : `${currentSchoolIndex + 1} / 5`}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              themeMode === 'light'
                ? 'bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border-slate-200 shadow-xs'
                : 'bg-black/50 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border-slate-800'
            }`}
            title="Girar a la página/escuela siguiente"
          >
            <span className="hidden xs:inline">Página Siguiente</span>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>

      {/* Main Codex Container */}
      <div
        className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${
          codexMode
            ? themeMode === 'light'
              ? 'codex-parchment-light border-amber-300/80 shadow-2xl p-5 sm:p-7'
              : 'codex-parchment-dark border-amber-500/30 shadow-2xl p-5 sm:p-7'
            : 'p-0 border-transparent'
        }`}
      >
        {/* Book Binding Crease & Leather Trim in Codex Mode */}
        {codexMode && (
          <>
            {/* Corner Filigree Ornaments */}
            <MedievalCornerOrnament position="top-left" color="#f59e0b" />
            <MedievalCornerOrnament position="top-right" color="#f59e0b" />
            <MedievalCornerOrnament position="bottom-left" color="#f59e0b" />
            <MedievalCornerOrnament position="bottom-right" color="#f59e0b" />

            {/* Left Bound Leather Crease */}
            <div className="absolute top-0 bottom-0 left-0 w-2.5 sm:w-3.5 codex-spine-crease pointer-events-none z-10 border-r border-amber-900/30" />

            {/* Decorative Medieval Header Bookmark */}
            <div className="relative mb-5 pb-3 border-b border-amber-500/30 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3 pl-2 sm:pl-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-serif text-lg font-bold border shadow-inner ${
                  themeMode === 'light'
                    ? 'bg-amber-200/70 border-amber-400 text-amber-950'
                    : 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                }`}>
                  {currentSchoolMeta ? currentSchoolMeta.name.charAt(0) : 'G'}
                </div>
                <div>
                  <h3 className={`font-serif font-bold text-base sm:text-lg uppercase tracking-wider ${
                    themeMode === 'light' ? 'text-amber-950' : 'text-amber-200'
                  }`}>
                    {currentSchoolMeta ? currentSchoolMeta.name : 'Grimorio de Magia y Sinergias de Jadame'}
                  </h3>
                  <p className={`text-xs ${themeMode === 'light' ? 'text-amber-900/80' : 'text-amber-400/80'}`}>
                    {currentSchoolMeta
                      ? `${currentSchoolMeta.sigilName} • Afinidad: ${currentSchoolMeta.primaryFaction.join(', ')}`
                      : 'Compendio canónico de hechizos, escalados y combos tácticos'}
                  </p>
                </div>
              </div>

              {currentSchoolMeta && (
                <div className={`text-[11px] font-mono px-3 py-1 rounded-full border hidden md:block ${
                  themeMode === 'light' ? 'bg-amber-100 text-amber-950 border-amber-300' : 'bg-black/60 text-amber-300 border-amber-500/40'
                }`}>
                  {currentSchoolMeta.description}
                </div>
              )}
            </div>
          </>
        )}

        {/* Animated Page Flip Container */}
        <div className={`transform-gpu ${animClass}`}>{children}</div>
      </div>
    </div>
  );
};
