import React, { useMemo } from 'react';
import { OFFICIAL_SUBCLASSES } from '../data/subclassesData';
import { SubclassInfo } from '../types';
import { useStickyState } from '../utils/useStickyState';
import { FactionId, getFactionTheme } from '../data/factionDataProvider';
import { Award, Shield, Zap, Sparkles, Filter, ChevronRight, CheckCircle2, AlertCircle, Coins, Flame, BookOpen, Star } from 'lucide-react';

interface SubclassesBrowserProps {
  selectedFaction?: FactionId;
}

export const SubclassesBrowser: React.FC<SubclassesBrowserProps> = ({ selectedFaction: defaultFactionProp }) => {
  const [selectedFaction, setSelectedFaction] = useStickyState<string>(
    defaultFactionProp || 'Todas',
    'subclasses_selected_faction'
  );
  const [selectedClassType, setSelectedClassType] = useStickyState<string>('Todos', 'subclasses_selected_classtype');
  const [activeSubclassId, setActiveSubclassId] = useStickyState<string>(OFFICIAL_SUBCLASSES[0].id, 'subclasses_active_id');

  const themeFaction = (selectedFaction !== 'Todas' ? selectedFaction : defaultFactionProp || 'Mazmorra') as FactionId;
  const theme = getFactionTheme(themeFaction);

  const factions = ['Todas', 'Mazmorra', 'Templo', 'Arboleda', 'Necrópolis', 'Enjambre', 'Cisma'];
  const classTypes = ['Todos', 'Guerrero', 'Mago'];

  const filteredSubclasses = useMemo(() => {
    return OFFICIAL_SUBCLASSES.filter((sub) => {
      const matchFaction = selectedFaction === 'Todas' || sub.faction === selectedFaction;
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
      <div className={`bg-gradient-to-r from-black/80 via-black/60 to-black/80 border-2 ${theme.border} rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden`}>
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-950/90 text-yellow-300 border border-yellow-600/80 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                Sistema Canónico Oficial
              </span>
              <span className={`text-xs font-mono ${theme.textAccent}`}>
                Regla de las 5 Habilidades a Experto
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-wide">
              Subclases Oficiales & Clases de Prestigio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              En <em>Heroes of Might and Magic: Olden Era</em>, cada clase base de héroe (Guerrero o Mago) puede desbloquear <strong>2 Subclases avanzadas</strong> al alcanzar el nivel <strong>Experto en 5 habilidades secundarias específicas</strong> (desbloqueo entre niveles 16 y 20+), concediendo un multiplicador legendario pasivo permanente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0 text-center font-mono">
            <div className={`bg-black/50 border ${theme.borderSubtle} p-2.5 rounded-xl`}>
              <div className="text-lg font-bold text-yellow-300">5</div>
              <div className={`text-[10px] ${theme.textAccent} uppercase`}>Habilidades a Experto</div>
            </div>
            <div className={`bg-black/50 border ${theme.borderSubtle} p-2.5 rounded-xl`}>
              <div className="text-lg font-bold text-cyan-300">2</div>
              <div className="text-[10px] text-cyan-300 uppercase">Subclases por Clase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 bg-black/60 border ${theme.borderSubtle} p-3.5 rounded-xl`}>
        <div className="flex flex-wrap items-center gap-2">
          <div className={`flex items-center gap-1.5 text-xs font-mono ${theme.textAccent} pr-2`}>
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
                  : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono ${theme.textAccent}`}>Arquetipo:</span>
          {classTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedClassType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedClassType === t
                  ? 'bg-yellow-600 text-black font-bold border border-yellow-400'
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
          <div className={`text-xs font-mono uppercase font-bold ${theme.textAccent} flex items-center justify-between`}>
            <span>Subclases Disponibles ({filteredSubclasses.length})</span>
            <span className="text-[10px] text-slate-400">Selecciona para inspeccionar</span>
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
                      ? `bg-black/80 ${theme.border} shadow-lg ring-1 ring-yellow-500/40`
                      : `bg-black/50 hover:bg-black/70 ${theme.borderSubtle} hover:border-slate-600`
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-serif">
                          {sub.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          ({sub.nameEn})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${theme.bgBadge} ${theme.textAccent} border ${theme.borderSubtle}`}>
                          {sub.faction}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-700">
                          {sub.baseClass}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-yellow-950 text-yellow-300 border border-yellow-700 font-bold">
                          {sub.tacticalTier}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 mt-1 ${isSelected ? 'text-yellow-400 translate-x-0.5' : 'text-slate-600'}`} />
                  </div>

                  <div className={`mt-2.5 pt-2 border-t ${theme.borderSubtle} text-xs text-yellow-300/90 font-mono flex items-center gap-1.5`}>
                    <Sparkles className="w-3 h-3 text-yellow-400 shrink-0" />
                    <span className="truncate">{sub.bonusTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Subclass Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`bg-black/70 border-2 ${theme.border} rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl relative`}>
            {/* Header */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${theme.borderSubtle} pb-4`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-300 text-[10px] font-mono font-bold border border-yellow-600">
                    {activeSubclass.tacticalTier}
                  </span>
                  <span className={`text-xs font-mono ${theme.textAccent}`}>
                    {activeSubclass.faction} • {activeSubclass.baseClass}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  {activeSubclass.name}
                  <span className="text-sm font-mono text-slate-400 font-normal ml-2">
                    ({activeSubclass.nameEn})
                  </span>
                </h3>
              </div>

              <div className={`px-3 py-1.5 rounded-xl ${theme.bgBadge} border ${theme.borderSubtle} text-right self-start sm:self-auto`}>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Arquetipo</span>
                <span className="text-xs font-bold text-yellow-300 font-mono">{activeSubclass.classType}</span>
              </div>
            </div>

            {/* Legendary Signature Bonus */}
            <div className="bg-gradient-to-r from-yellow-950/40 via-black/40 to-black/60 border-2 border-yellow-500/80 rounded-xl p-4 space-y-2 shadow-lg ring-1 ring-yellow-500/20">
              <div className="flex items-center gap-2 text-yellow-300 font-bold font-mono text-xs uppercase tracking-wide">
                <Award className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Bonificación Legendaria de Subclase
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-serif">
                {activeSubclass.bonusTitle}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeSubclass.bonusEffect}
              </p>
            </div>

            {/* 5 Required Skills to Expert */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase ${theme.textAccent} flex items-center gap-1.5`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  5 Habilidades Requeridas a Nivel Experto
                </span>
                <span className="text-[10px] font-mono text-yellow-400 bg-yellow-950 px-2 py-0.5 rounded border border-yellow-800">
                  Desbloqueo al completarlas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeSubclass.requiredSkills.map((req, idx) => (
                  <div
                    key={idx}
                    className={`bg-black/50 border ${theme.borderSubtle} hover:border-yellow-500/60 rounded-xl p-3 flex items-center justify-between gap-2 transition-colors`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full ${theme.bgBadge} text-yellow-300 font-mono font-bold text-xs flex items-center justify-center border ${theme.borderSubtle} shrink-0`}>
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white">{req.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{req.nameEn}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-yellow-950/80 text-yellow-300 border border-yellow-700 shrink-0">
                      ★ Experta
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Analysis & Best Heroes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className={`bg-black/50 border ${theme.borderSubtle} rounded-xl p-3.5 space-y-1.5`}>
                <span className={`text-xs font-bold ${theme.textAccent} font-mono flex items-center gap-1.5`}>
                  <Flame className="w-3.5 h-3.5" />
                  Análisis Estratégico Meta
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {activeSubclass.strategicAnalysis}
                </p>
              </div>

              <div className={`bg-black/50 border ${theme.borderSubtle} rounded-xl p-3.5 space-y-1.5`}>
                <span className="text-xs font-bold text-yellow-300 font-mono flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400" />
                  Héroes Recomendados
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeSubclass.recommendedHeroes.map((hero, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-mono ${theme.bgBadge} ${theme.textAccent} px-2 py-0.5 rounded border ${theme.borderSubtle} font-semibold`}
                    >
                      {hero}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 pt-1 leading-snug">
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
