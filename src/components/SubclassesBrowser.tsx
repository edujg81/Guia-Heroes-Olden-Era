import React, { useMemo } from 'react';
import { OFFICIAL_SUBCLASSES } from '../data/subclassesData';
import { SubclassInfo } from '../types';
import { useStickyState } from '../utils/useStickyState';
import { FactionId, getFactionTheme } from '../data/factionDataProvider';
import { Award, Shield, Zap, Sparkles, Filter, ChevronRight, CheckCircle2, AlertCircle, Coins, Flame, BookOpen, Star } from 'lucide-react';

interface SubclassesBrowserProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
}

export const SubclassesBrowser: React.FC<SubclassesBrowserProps> = ({ 
  selectedFaction: defaultFactionProp,
  themeMode = 'dark',
}) => {
  const [selectedFaction, setSelectedFaction] = useStickyState<string>(
    defaultFactionProp || 'Todas',
    'subclasses_selected_faction'
  );
  const [selectedClassType, setSelectedClassType] = useStickyState<string>('Todos', 'subclasses_selected_classtype');
  const [activeSubclassId, setActiveSubclassId] = useStickyState<string>(OFFICIAL_SUBCLASSES[0].id, 'subclasses_active_id');

  const themeFaction = (selectedFaction !== 'Todas' ? selectedFaction : defaultFactionProp || 'Mazmorra') as FactionId;
  const theme = getFactionTheme(themeFaction, themeMode);

  const factions = ['Todas', 'Mazmorra', 'Templo', 'Foresta', 'Necrópolis', 'Colmena', 'Cisma'];
  const classTypes = ['Todos', 'Poder', 'Magia'];

  const filteredSubclasses = useMemo(() => {
    return OFFICIAL_SUBCLASSES.filter((sub) => {
      const matchFaction =
        selectedFaction === 'Todas' ||
        sub.faction === selectedFaction;
      const matchType = selectedClassType === 'Todos' || sub.classType === selectedClassType;
      return matchFaction && matchType;
    });
  }, [selectedFaction, selectedClassType]);

  const activeSubclass: SubclassInfo = useMemo(() => {
    return OFFICIAL_SUBCLASSES.find((s) => s.id === activeSubclassId) || OFFICIAL_SUBCLASSES[0];
  }, [activeSubclassId]);

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className={`border-2 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-colors ${
        themeMode === 'light'
          ? 'bg-gradient-to-r from-amber-50/90 via-white to-amber-50/70 border-amber-300 shadow-md'
          : `bg-gradient-to-r from-black/80 via-black/60 to-black/80 ${theme.border}`
      }`}>
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 border ${
                themeMode === 'light'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-yellow-950/90 text-yellow-300 border-yellow-600/80'
              }`}>
                <Star className="w-3 h-3 fill-current text-current" />
                Sistema Canónico Oficial
              </span>
              <span className={`text-xs font-mono ${
                themeMode === 'light' ? 'text-slate-600' : theme.textAccent
              }`}>
                Regla de las 5 Habilidades a Experto
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold font-serif tracking-wide ${
              themeMode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Subclases Oficiales & Clases de Prestigio
            </h2>
            <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
              themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
              En <em>Heroes of Might and Magic: Olden Era</em>, cada clase base de héroe (Guerrero o Mago) puede desbloquear <strong>2 Subclases avanzadas</strong> al alcanzar el nivel <strong>Experto en 5 habilidades secundarias específicas</strong> (desbloqueo entre niveles 16 y 20+), concediendo un multiplicador legendario pasivo permanente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0 text-center font-mono">
            <div className={`p-2.5 rounded-xl border ${
              themeMode === 'light'
                ? 'bg-amber-50 border-amber-300'
                : `bg-black/50 ${theme.borderSubtle}`
            }`}>
              <div className={`text-lg font-bold ${
                themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
              }`}>5</div>
              <div className={`text-[10px] uppercase ${
                themeMode === 'light' ? 'text-slate-600' : theme.textAccent
              }`}>Habilidades a Experto</div>
            </div>
            <div className={`p-2.5 rounded-xl border ${
              themeMode === 'light'
                ? 'bg-cyan-50 border-cyan-300'
                : `bg-black/50 ${theme.borderSubtle}`
            }`}>
              <div className={`text-lg font-bold ${
                themeMode === 'light' ? 'text-cyan-900' : 'text-cyan-300'
              }`}>2</div>
              <div className={`text-[10px] uppercase ${
                themeMode === 'light' ? 'text-cyan-800' : 'text-cyan-300'
              }`}>Subclases por Clase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-xs'
          : `bg-black/60 ${theme.borderSubtle}`
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <div className={`flex items-center gap-1.5 text-xs font-mono pr-2 ${
            themeMode === 'light' ? 'text-slate-700 font-bold' : theme.textAccent
          }`}>
            <Filter className="w-3.5 h-3.5" />
            <span>Facción:</span>
          </div>
          {factions.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFaction(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedFaction === f
                  ? `${theme.primaryButton} shadow-sm`
                  : themeMode === 'light'
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono ${
            themeMode === 'light' ? 'text-slate-700 font-bold' : theme.textAccent
          }`}>Arquetipo:</span>
          {classTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedClassType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedClassType === t
                  ? themeMode === 'light'
                    ? 'bg-amber-500 text-slate-950 font-bold border border-amber-600'
                    : 'bg-yellow-600 text-black font-bold border border-yellow-400'
                  : themeMode === 'light'
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Master-Detail List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Subclasses list */}
        <div className="lg:col-span-5 space-y-3">
          <div className={`text-xs font-mono uppercase font-bold flex items-center justify-between ${
            themeMode === 'light' ? 'text-slate-800' : theme.textAccent
          }`}>
            <span>Subclases Disponibles ({filteredSubclasses.length})</span>
            <span className={`text-[10px] ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Selecciona para inspeccionar</span>
          </div>

          <div className="space-y-2.5">
            {filteredSubclasses.map((sub) => {
              const isSelected = activeSubclass.id === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => setActiveSubclassId(sub.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? themeMode === 'light'
                        ? 'bg-amber-50/90 border-2 border-amber-400 shadow-md ring-1 ring-amber-300'
                        : `bg-black/80 ${theme.border} shadow-lg ring-1 ring-yellow-500/40`
                      : themeMode === 'light'
                      ? 'bg-white hover:bg-slate-50 border-slate-200'
                      : `bg-black/50 hover:bg-black/70 ${theme.borderSubtle} hover:border-slate-600`
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold font-serif ${
                          themeMode === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>
                          {sub.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                          themeMode === 'light'
                            ? 'bg-purple-100 text-purple-900 border-purple-200'
                            : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                        }`}>
                          {sub.faction}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                          themeMode === 'light'
                            ? 'bg-slate-200 text-slate-700 border-slate-300'
                            : 'bg-slate-900 text-slate-300 border border-slate-700'
                        }`}>
                          {sub.baseClass}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-bold ${
                          themeMode === 'light'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-yellow-950 text-yellow-300 border-yellow-700'
                        }`}>
                          {sub.tacticalTier}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 mt-1 ${
                      isSelected
                        ? themeMode === 'light' ? 'text-amber-700 translate-x-0.5 font-bold' : 'text-yellow-400 translate-x-0.5'
                        : themeMode === 'light' ? 'text-slate-400' : 'text-slate-600'
                    }`} />
                  </div>

                  <div className={`mt-2.5 pt-2 border-t text-xs font-mono flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'border-slate-200 text-slate-700' : `${theme.borderSubtle} text-yellow-300/90`
                  }`}>
                    <Sparkles className={`w-3 h-3 shrink-0 ${themeMode === 'light' ? 'text-amber-600' : 'text-yellow-400'}`} />
                    <span className="truncate">{sub.bonusTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Subclass Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`border-2 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl relative ${
            themeMode === 'light'
              ? 'bg-white border-slate-300 shadow-md'
              : `bg-black/70 ${theme.border}`
          }`}>
            {/* Header */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
              themeMode === 'light' ? 'border-slate-200' : theme.borderSubtle
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    themeMode === 'light'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-yellow-950 text-yellow-300 border-yellow-600'
                  }`}>
                    {activeSubclass.tacticalTier}
                  </span>
                  <span className={`text-xs font-mono ${
                    themeMode === 'light' ? 'text-slate-600' : theme.textAccent
                  }`}>
                    {activeSubclass.faction} • {activeSubclass.baseClass}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold font-serif mt-1 ${
                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {activeSubclass.name}
                </h3>
              </div>

              <div className={`px-3 py-1.5 rounded-xl border text-right self-start sm:self-auto ${
                themeMode === 'light'
                  ? 'bg-amber-50 border-amber-300'
                  : `${theme.bgBadge} ${theme.borderSubtle}`
              }`}>
                <span className={`text-[10px] font-mono uppercase block ${
                  themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>Arquetipo</span>
                <span className={`text-xs font-bold font-mono ${
                  themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                }`}>{activeSubclass.classType}</span>
              </div>
            </div>

            {/* Legendary Signature Bonus */}
            <div className={`border-2 rounded-xl p-4 space-y-2 shadow-lg ${
              themeMode === 'light'
                ? 'bg-gradient-to-r from-amber-100/90 via-amber-50/90 to-white border-amber-400 ring-1 ring-amber-300'
                : 'bg-gradient-to-r from-yellow-950/40 via-black/40 to-black/60 border-yellow-500/80 ring-1 ring-yellow-500/20'
            }`}>
              <div className={`flex items-center gap-2 font-bold font-mono text-xs uppercase tracking-wide ${
                themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
              }`}>
                <Award className={`w-4 h-4 ${themeMode === 'light' ? 'text-amber-700 fill-amber-700' : 'text-yellow-400 fill-yellow-400'}`} />
                Bonificación Legendaria de Subclase
              </div>
              <div className={`text-base sm:text-lg font-bold font-serif ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                {activeSubclass.bonusTitle}
              </div>
              <p className={`text-xs leading-relaxed font-sans ${
                themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'
              }`}>
                {activeSubclass.bonusEffect}
              </p>
            </div>

            {/* 5 Required Skills to Expert */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
                  themeMode === 'light' ? 'text-slate-800' : theme.textAccent
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  5 Habilidades Requeridas a Nivel Experto
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  themeMode === 'light'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                    : 'text-yellow-400 bg-yellow-950 border-yellow-800'
                }`}>
                  Desbloqueo al completarlas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeSubclass.requiredSkills.map((req, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-xl p-3 flex items-center justify-between gap-2 transition-colors ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200 hover:border-amber-400'
                        : `bg-black/50 ${theme.borderSubtle} hover:border-yellow-500/60`
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full font-mono font-bold text-xs flex items-center justify-center border shrink-0 ${
                        themeMode === 'light'
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : `${theme.bgBadge} text-yellow-300 ${theme.borderSubtle}`
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <div className={`text-xs font-bold ${
                          themeMode === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>{req.name}</div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                      themeMode === 'light'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-yellow-950/80 text-yellow-300 border-yellow-700'
                    }`}>
                      ★ Experta
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Analysis & Best Heroes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className={`border rounded-xl p-3.5 space-y-1.5 ${
                themeMode === 'light'
                  ? 'bg-purple-50/70 border-purple-200'
                  : `bg-black/50 ${theme.borderSubtle}`
              }`}>
                <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${
                  themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                }`}>
                  <Flame className="w-3.5 h-3.5" />
                  Análisis Estratégico Meta
                </span>
                <p className={`text-[11px] leading-relaxed font-sans ${
                  themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {activeSubclass.strategicAnalysis}
                </p>
              </div>

              <div className={`border rounded-xl p-3.5 space-y-1.5 ${
                themeMode === 'light'
                  ? 'bg-amber-50/70 border-amber-200'
                  : `bg-black/50 ${theme.borderSubtle}`
              }`}>
                <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${
                  themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
                }`}>
                  <Star className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-amber-600' : 'text-yellow-400'}`} />
                  Héroes Recomendados
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeSubclass.recommendedHeroes.map((hero, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                        themeMode === 'light'
                          ? 'bg-white text-amber-950 border-amber-300'
                          : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                      }`}
                    >
                      {hero}
                    </span>
                  ))}
                </div>
                <p className={`text-[10px] pt-1 leading-snug ${
                  themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {activeSubclass.synergyNotes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
