import React, { useState, useMemo } from 'react';
import { Sparkles, Search, Shield, BookOpen, Sword, Users, Star, ChevronDown, ChevronRight, Zap, Target, Award, Crosshair } from 'lucide-react';
import { OFFICIAL_SKILLS_DATA } from '../data/officialSkillsData';
import { OfficialSkill } from '../types';
import { useStickyState } from '../utils/useStickyState';

export const OfficialSkillsBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useStickyState<'all' | 'Común' | 'Clase' | 'Facción'>('all', 'skills_selected_category');
  const [selectedFaction, setSelectedFaction] = useStickyState<string>('all', 'skills_selected_faction');
  const [expandedSkillId, setExpandedSkillId] = useStickyState<string | null>('fuerza-del-triunvirato', 'skills_expanded_id');

  const filteredSkills = useMemo(() => {
    return OFFICIAL_SKILLS_DATA.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.upgrades.basic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.upgrades.advanced.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.upgrades.expert.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.subskills.advanced.some((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.effect.toLowerCase().includes(searchTerm.toLowerCase())) ||
        skill.subskills.expert.some((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.effect.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesFaction = selectedFaction === 'all' || (skill.faction && skill.faction === selectedFaction);

      return matchesSearch && matchesCategory && matchesFaction;
    });
  }, [searchTerm, selectedCategory, selectedFaction]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-purple-950/80 border border-purple-800/50 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-purple-900/80 text-purple-200 border border-purple-600/60 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold">
                Base Oficial • Heroes of Might & Magic: Olden Era
              </span>
              <span className="bg-yellow-950/80 text-yellow-300 border border-yellow-700/60 font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                30 Habilidades • 180 Subhabilidades
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              Árbol de Habilidades & Subhabilidades Canónico
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Cada rama de habilidad incluye 3 niveles de maestría (Básico, Avanzado, Experto) y 6 subhabilidades únicas (3 en Avanzado y 3 en Experto) con sus efectos exactos.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/50 border border-purple-900/60 p-2 rounded-xl text-xs font-mono text-slate-300 shrink-0">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Fuente: heroes-olden-era.com/es/skill</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121118]/90 border border-purple-900/40 rounded-xl p-4 space-y-3 shadow-md backdrop-blur">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar habilidad o subhabilidad (ej. Pasajes subterráneos, Esgrima, Fluir, Golpe...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/60 border border-purple-900/50 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-black/60 rounded-lg p-1 border border-purple-900/50 text-xs">
              {(['all', 'Común', 'Clase', 'Facción'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded font-mono font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'Todas' : cat}
                </button>
              ))}
            </div>

            {selectedCategory === 'Facción' && (
              <select
                value={selectedFaction}
                onChange={(e) => setSelectedFaction(e.target.value)}
                className="bg-black/60 border border-purple-900/50 rounded-lg px-3 py-1.5 text-xs text-purple-300 font-mono focus:outline-none focus:border-purple-500"
              >
                <option value="all">Todas las Facciones</option>
                <option value="Mazmorra">Mazmorra (Fuerza del Triunvirato)</option>
                <option value="Cisma">Cisma (Comunión abisal)</option>
                <option value="Enjambre">Enjambre (Invocar enjambre)</option>
                <option value="Templo">Templo (Justicia)</option>
                <option value="Arboleda">Arboleda (Murmullo)</option>
                <option value="Necrópolis">Necrópolis (Nigromancia)</option>
              </select>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <span>Mostrando {filteredSkills.length} de {OFFICIAL_SKILLS_DATA.length} habilidades</span>
          <span className="text-purple-400 font-semibold">Haz clic en cualquier habilidad para ver sus 6 subhabilidades</span>
        </div>
      </div>

      {/* Skills Grid / Accordion */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkillId === skill.id;

          return (
            <div
              key={skill.id}
              className={`bg-[#13121b]/95 rounded-xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/40'
                  : 'border-purple-900/40 hover:border-purple-700/60 shadow-md'
              }`}
            >
              {/* Header Accordion Bar */}
              <button
                onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 bg-gradient-to-r from-purple-950/30 to-transparent hover:bg-purple-900/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg border shrink-0 ${
                    skill.category === 'Facción'
                      ? 'bg-amber-950/40 border-amber-600/60 text-amber-300'
                      : skill.category === 'Clase'
                      ? 'bg-cyan-950/40 border-cyan-600/60 text-cyan-300'
                      : 'bg-purple-950/40 border-purple-600/60 text-purple-300'
                  }`}>
                    {skill.category === 'Facción' ? (
                      <Star className="w-5 h-5" />
                    ) : skill.category === 'Clase' ? (
                      <Crosshair className="w-5 h-5" />
                    ) : (
                      <Shield className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {skill.name}
                      </h3>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        skill.category === 'Facción'
                          ? 'bg-amber-950/70 text-amber-300 border-amber-700/60'
                          : skill.category === 'Clase'
                          ? 'bg-cyan-950/70 text-cyan-300 border-cyan-700/60'
                          : 'bg-purple-950/70 text-purple-300 border-purple-700/60'
                      }`}>
                        {skill.category} {skill.faction ? `• ${skill.faction}` : ''}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      Básico: {skill.upgrades.basic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                    6 Subhabilidades
                  </span>
                  <div className="w-7 h-7 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-200 border border-purple-700/60">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Expanded Detailed Breakdown */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-purple-900/40 bg-black/40 space-y-6">
                  {/* Upgrade Levels Section */}
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-purple-300 mb-2.5 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      Niveles de Maestría (Skill Upgrades)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-purple-300">Nivel 1 • Básico</span>
                          <span className="text-[10px] text-slate-500 font-mono">Sin subhabilidades</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {skill.upgrades.basic}
                        </p>
                      </div>

                      <div className="bg-purple-950/30 border border-purple-800/60 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-purple-200">Nivel 2 • Avanzado</span>
                          <span className="text-[10px] text-purple-400 font-mono font-semibold">3 Subhabilidades disp.</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {skill.upgrades.advanced}
                        </p>
                      </div>

                      <div className="bg-purple-950/40 border border-yellow-800/50 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-yellow-300">Nivel 3 • Experto</span>
                          <span className="text-[10px] text-yellow-400 font-mono font-semibold">3 Subhabilidades disp.</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {skill.upgrades.expert}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Recommendation Guide Callout */}
                  {skill.selectionGuide && (
                    <div className="bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-black/60 border border-yellow-600/50 rounded-xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <h4 className="text-xs font-mono uppercase font-bold text-yellow-300 tracking-wide">
                            Guía Táctica de Selección Recomendada (Meta Olden Era)
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-950/80 text-yellow-300 border border-yellow-700/60 font-semibold">
                          Elección Óptima
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-black/50 p-2.5 rounded-lg border border-purple-800/40">
                          <div className="flex items-center gap-1.5 font-bold text-purple-200 mb-1">
                            <span className="text-yellow-400">★ Avanzado (Nivel 2):</span>
                            <span className="text-white underline decoration-yellow-400/60">{skill.selectionGuide.advanced.recommendedName}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {skill.selectionGuide.advanced.why}
                          </p>
                          {skill.selectionGuide.advanced.alternativeChoice && (
                            <div className="mt-1.5 pt-1.5 border-t border-purple-900/40 text-[10px] text-slate-400">
                              <span className="text-cyan-400 font-semibold">Alternativa ({skill.selectionGuide.advanced.alternativeChoice}):</span> {skill.selectionGuide.advanced.alternativeCondition}
                            </div>
                          )}
                        </div>

                        <div className="bg-black/50 p-2.5 rounded-lg border border-yellow-800/40">
                          <div className="flex items-center gap-1.5 font-bold text-yellow-300 mb-1">
                            <span className="text-yellow-400">★ Experto (Nivel 3):</span>
                            <span className="text-white underline decoration-yellow-400/60">{skill.selectionGuide.expert.recommendedName}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {skill.selectionGuide.expert.why}
                          </p>
                          {skill.selectionGuide.expert.alternativeChoice && (
                            <div className="mt-1.5 pt-1.5 border-t border-purple-900/40 text-[10px] text-slate-400">
                              <span className="text-cyan-400 font-semibold">Alternativa ({skill.selectionGuide.expert.alternativeChoice}):</span> {skill.selectionGuide.expert.alternativeCondition}
                            </div>
                          )}
                        </div>
                      </div>

                      {skill.selectionGuide.generalTacticalTip && (
                        <p className="text-[11px] text-yellow-200/90 font-mono italic pt-1 border-t border-purple-900/30">
                          💡 Consejo: {skill.selectionGuide.generalTacticalTip}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Subskills Section: Advanced & Expert */}
                  <div className="space-y-4">
                    {/* Advanced Subskills */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-purple-400" />
                          Subhabilidades de Nivel Avanzado (Selecciona 1 de 3 en Nivel 2)
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">3 opciones disponibles</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {skill.subskills.advanced.map((sub, idx) => {
                          const isRec = sub.isRecommendedMeta;
                          const isAlt = sub.recommendedTag && !isRec;

                          return (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg space-y-1.5 transition-all relative ${
                                isRec
                                  ? 'bg-gradient-to-b from-yellow-950/40 via-[#1c162b] to-[#14101e] border-2 border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-yellow-400/40'
                                  : isAlt
                                  ? 'bg-[#181524] border border-cyan-700/60'
                                  : 'bg-[#181524] border border-purple-800/40 hover:border-purple-600/70'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-4 h-4 rounded-full font-mono font-bold text-[9px] flex items-center justify-center shrink-0 border ${
                                    isRec
                                      ? 'bg-yellow-900 text-yellow-200 border-yellow-500'
                                      : 'bg-purple-900 text-purple-200 border-purple-700'
                                  }`}>
                                    A{idx + 1}
                                  </span>
                                  <span className={`text-xs font-bold leading-snug ${isRec ? 'text-yellow-200' : 'text-slate-100'}`}>
                                    {sub.name}
                                  </span>
                                </div>
                                {sub.type && (
                                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/50 text-slate-400 border border-slate-700/60 shrink-0">
                                    {sub.type}
                                  </span>
                                )}
                              </div>

                              {sub.recommendedTag && (
                                <div className="pt-0.5">
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                    isRec
                                      ? 'bg-yellow-950/90 text-yellow-300 border-yellow-600/70 shadow-sm'
                                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-700/70'
                                  }`}>
                                    {sub.recommendedTag}
                                  </span>
                                </div>
                              )}

                              <p className="text-[11px] text-slate-300 leading-relaxed">
                                {sub.effect}
                              </p>

                              {sub.recommendationWhen && (
                                <div className={`text-[10px] p-1.5 rounded border leading-relaxed ${
                                  isRec
                                    ? 'bg-yellow-950/30 text-yellow-200/90 border-yellow-800/40 font-sans'
                                    : 'bg-cyan-950/30 text-cyan-200/90 border-cyan-800/40 font-sans'
                                }`}>
                                  <span className="font-bold font-mono block mb-0.5">
                                    {isRec ? '🎯 Por qué elegirla:' : '📌 Situacional:'}
                                  </span>
                                  {sub.recommendationWhen}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Expert Subskills */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-yellow-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-yellow-400" />
                          Subhabilidades de Nivel Experto (Selecciona 1 de 3 en Nivel 3)
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">3 opciones disponibles</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {skill.subskills.expert.map((sub, idx) => {
                          const isRec = sub.isRecommendedMeta;
                          const isAlt = sub.recommendedTag && !isRec;

                          return (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg space-y-1.5 transition-all relative ${
                                isRec
                                  ? 'bg-gradient-to-b from-yellow-950/40 via-[#1c162b] to-[#14101e] border-2 border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-yellow-400/40'
                                  : isAlt
                                  ? 'bg-[#1b1722] border border-cyan-700/60'
                                  : 'bg-[#1b1722] border border-yellow-900/40 hover:border-yellow-600/70'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-4 h-4 rounded-full font-mono font-bold text-[9px] flex items-center justify-center shrink-0 border ${
                                    isRec
                                      ? 'bg-yellow-900 text-yellow-200 border-yellow-500'
                                      : 'bg-yellow-950 text-yellow-200 border-yellow-700'
                                  }`}>
                                    E{idx + 1}
                                  </span>
                                  <span className={`text-xs font-bold leading-snug ${isRec ? 'text-yellow-200' : 'text-yellow-100'}`}>
                                    {sub.name}
                                  </span>
                                </div>
                                {sub.type && (
                                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/50 text-slate-400 border border-slate-700/60 shrink-0">
                                    {sub.type}
                                  </span>
                                )}
                              </div>

                              {sub.recommendedTag && (
                                <div className="pt-0.5">
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                    isRec
                                      ? 'bg-yellow-950/90 text-yellow-300 border-yellow-600/70 shadow-sm'
                                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-700/70'
                                  }`}>
                                    {sub.recommendedTag}
                                  </span>
                                </div>
                              )}

                              <p className="text-[11px] text-slate-300 leading-relaxed">
                                {sub.effect}
                              </p>

                              {sub.recommendationWhen && (
                                <div className={`text-[10px] p-1.5 rounded border leading-relaxed ${
                                  isRec
                                    ? 'bg-yellow-950/30 text-yellow-200/90 border-yellow-800/40 font-sans'
                                    : 'bg-cyan-950/30 text-cyan-200/90 border-cyan-800/40 font-sans'
                                }`}>
                                  <span className="font-bold font-mono block mb-0.5">
                                    {isRec ? '🎯 Por qué elegirla:' : '📌 Situacional:'}
                                  </span>
                                  {sub.recommendationWhen}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Context: Starting heroes and required classes */}
                  {((skill.startingHeroes && skill.startingHeroes.length > 0) || (skill.requiredByClasses && skill.requiredByClasses.length > 0)) && (
                    <div className="pt-3 border-t border-purple-900/30 flex flex-col sm:flex-row gap-3 text-xs">
                      {skill.startingHeroes && skill.startingHeroes.length > 0 && (
                        <div className="flex-1 bg-black/40 p-2.5 rounded-lg border border-purple-900/30">
                          <span className="font-mono text-purple-300 font-bold block mb-1 text-[11px]">
                            Héroes iniciales con esta habilidad:
                          </span>
                          <span className="text-slate-300 text-[11px] leading-relaxed">
                            {skill.startingHeroes.join(', ')}
                          </span>
                        </div>
                      )}

                      {skill.requiredByClasses && skill.requiredByClasses.length > 0 && (
                        <div className="flex-1 bg-black/40 p-2.5 rounded-lg border border-purple-900/30">
                          <span className="font-mono text-cyan-300 font-bold block mb-1 text-[11px]">
                            Requerido por Clases de Héroe:
                          </span>
                          <span className="text-slate-300 text-[11px] leading-relaxed">
                            {skill.requiredByClasses.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
