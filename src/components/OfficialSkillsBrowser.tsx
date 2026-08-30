import React, { useState, useMemo } from 'react';
import { Sparkles, Search, Shield, BookOpen, Sword, Users, Star, ChevronDown, ChevronRight, Zap, Target, Award, Crosshair } from 'lucide-react';
import { OFFICIAL_SKILLS_DATA } from '../data/officialSkillsData';
import { OfficialSkill } from '../types';
import { useStickyState } from '../utils/useStickyState';

interface OfficialSkillsBrowserProps {
  themeMode?: 'dark' | 'light';
}

export const OfficialSkillsBrowser: React.FC<OfficialSkillsBrowserProps> = ({
  themeMode = 'dark',
}) => {
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
      const matchesFaction =
        selectedFaction === 'all' ||
        (skill.faction &&
          (skill.faction === selectedFaction ||
            (selectedFaction === 'Foresta' && skill.faction === 'Arboleda') ||
            (selectedFaction === 'Colmena' && skill.faction === 'Enjambre')));

      return matchesSearch && matchesCategory && matchesFaction;
    });
  }, [searchTerm, selectedCategory, selectedFaction]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`border rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden transition-colors ${
        themeMode === 'light'
          ? 'bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-100 border-purple-200 text-slate-800'
          : 'bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-purple-950/80 border-purple-800/50 text-white'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border ${
                themeMode === 'light'
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-purple-900/80 text-purple-200 border-purple-600/60'
              }`}>
                Base Oficial • Heroes of Might & Magic: Olden Era
              </span>
              <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                themeMode === 'light'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-yellow-950/80 text-yellow-300 border-yellow-700/60'
              }`}>
                30 Habilidades • 180 Subhabilidades
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-wide flex items-center gap-2 ${
              themeMode === 'light' ? 'text-purple-950 font-serif' : 'text-white'
            }`}>
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Árbol de Habilidades & Subhabilidades Canónico
            </h2>
            <p className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${
              themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Cada rama de habilidad incluye 3 niveles de maestría (Básico, Avanzado, Experto) y 6 subhabilidades únicas (3 en Avanzado y 3 en Experto) con sus efectos exactos.
            </p>
          </div>

          <div className={`flex items-center gap-2 p-2 rounded-xl text-xs font-mono shrink-0 border ${
            themeMode === 'light'
              ? 'bg-white border-purple-200 text-purple-900 shadow-sm'
              : 'bg-black/50 border-purple-900/60 text-slate-300'
          }`}>
            <Award className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
            <span>Fuente: heroes-olden-era.com/es/skill</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`border rounded-xl p-4 space-y-3 shadow-md backdrop-blur transition-colors ${
        themeMode === 'light'
          ? 'bg-white border-slate-200'
          : 'bg-[#121118]/90 border-purple-900/40'
      }`}>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              themeMode === 'light' ? 'text-purple-600' : 'text-slate-400'
            }`} />
            <input
              type="text"
              placeholder="Buscar habilidad o subhabilidad (ej. Pasajes subterráneos, Esgrima, Fluir, Golpe...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm transition-colors focus:outline-none ${
                themeMode === 'light'
                  ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:bg-white'
                  : 'bg-black/60 border border-purple-900/50 text-slate-100 placeholder-slate-500 focus:border-purple-500'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className={`flex items-center rounded-lg p-1 border text-xs ${
              themeMode === 'light'
                ? 'bg-slate-100 border-slate-200'
                : 'bg-black/60 border-purple-900/50'
            }`}>
              {(['all', 'Común', 'Clase', 'Facción'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded font-mono font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? themeMode === 'light'
                        ? 'bg-purple-700 text-white shadow-sm font-semibold'
                        : 'bg-purple-700 text-white shadow-sm'
                      : themeMode === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
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
                className={`rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none border ${
                  themeMode === 'light'
                    ? 'bg-white border-slate-300 text-purple-900 focus:border-purple-600'
                    : 'bg-black/60 border-purple-900/50 text-purple-300 focus:border-purple-500'
                }`}
              >
                <option value="all">Todas las Facciones</option>
                <option value="Mazmorra">Mazmorra (Fuerza del Triunvirato)</option>
                <option value="Cisma">Cisma (Comunión abisal)</option>
                <option value="Colmena">Colmena (Invocar enjambre)</option>
                <option value="Templo">Templo (Justicia)</option>
                <option value="Foresta">Foresta (Murmullo)</option>
                <option value="Necrópolis">Necrópolis (Nigromancia)</option>
              </select>
            )}
          </div>
        </div>

        <div className={`flex items-center justify-between text-[11px] font-mono pt-1 ${
          themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
        }`}>
          <span>Mostrando {filteredSkills.length} de {OFFICIAL_SKILLS_DATA.length} habilidades</span>
          <span className={themeMode === 'light' ? 'text-purple-700 font-bold' : 'text-purple-400 font-semibold'}>
            Haz clic en cualquier habilidad para ver sus 6 subhabilidades
          </span>
        </div>
      </div>

      {/* Skills Grid / Accordion */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkillId === skill.id;

          return (
            <div
              key={skill.id}
              className={`rounded-xl border transition-all overflow-hidden ${
                isExpanded
                  ? themeMode === 'light'
                    ? 'bg-white border-purple-400 shadow-[0_4px_20px_rgba(147,51,234,0.12)] ring-1 ring-purple-300'
                    : 'bg-[#13121b]/95 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/40'
                  : themeMode === 'light'
                  ? 'bg-white border-slate-200 hover:border-purple-300 shadow-sm'
                  : 'bg-[#13121b]/95 border-purple-900/40 hover:border-purple-700/60 shadow-md'
              }`}
            >
              {/* Header Accordion Bar */}
              <button
                onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}
                className={`w-full p-4 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                  themeMode === 'light'
                    ? isExpanded ? 'bg-purple-50/70' : 'bg-slate-50/60 hover:bg-purple-50/40'
                    : 'bg-gradient-to-r from-purple-950/30 to-transparent hover:bg-purple-900/20'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg border shrink-0 ${
                    skill.category === 'Facción'
                      ? themeMode === 'light'
                        ? 'bg-amber-100 border-amber-300 text-amber-800'
                        : 'bg-amber-950/40 border-amber-600/60 text-amber-300'
                      : skill.category === 'Clase'
                      ? themeMode === 'light'
                        ? 'bg-teal-100 border-teal-300 text-teal-800'
                        : 'bg-cyan-950/40 border-cyan-600/60 text-cyan-300'
                      : themeMode === 'light'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
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
                      <h3 className={`text-base sm:text-lg font-bold font-serif ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {skill.name}
                      </h3>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        skill.category === 'Facción'
                          ? themeMode === 'light'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-amber-950/70 text-amber-300 border-amber-700/60'
                          : skill.category === 'Clase'
                          ? themeMode === 'light'
                            ? 'bg-teal-100 text-teal-900 border-teal-300'
                            : 'bg-cyan-950/70 text-cyan-300 border-cyan-700/60'
                          : themeMode === 'light'
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : 'bg-purple-950/70 text-purple-300 border-purple-700/60'
                      }`}>
                        {skill.category} {skill.faction ? `• ${skill.faction}` : ''}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-1 mt-0.5 ${
                      themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      Básico: {skill.upgrades.basic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded border ${
                    themeMode === 'light'
                      ? 'text-purple-900 bg-purple-100 border-purple-200 font-semibold'
                      : 'text-purple-300 bg-purple-950/60 border-purple-800/40'
                  }`}>
                    6 Subhabilidades
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                    themeMode === 'light'
                      ? 'bg-purple-100 text-purple-800 border-purple-300'
                      : 'bg-purple-900/50 text-purple-200 border-purple-700/60'
                  }`}>
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Expanded Detailed Breakdown */}
              {isExpanded && (
                <div className={`p-4 sm:p-5 border-t space-y-6 ${
                  themeMode === 'light'
                    ? 'border-purple-200 bg-slate-50/50'
                    : 'border-purple-900/40 bg-black/40'
                }`}>
                  {/* Upgrade Levels Section */}
                  <div>
                    <h4 className={`text-xs font-mono uppercase font-bold mb-2.5 flex items-center gap-1.5 ${
                      themeMode === 'light' ? 'text-purple-950' : 'text-purple-300'
                    }`}>
                      <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" />
                      Niveles de Maestría (Skill Upgrades)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className={`rounded-lg p-3 space-y-1 border ${
                        themeMode === 'light'
                          ? 'bg-white border-slate-200 shadow-sm'
                          : 'bg-purple-950/20 border-purple-900/50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-mono font-bold ${
                            themeMode === 'light' ? 'text-purple-900' : 'text-purple-300'
                          }`}>Nivel 1 • Básico</span>
                          <span className={`text-[10px] font-mono ${
                            themeMode === 'light' ? 'text-slate-400' : 'text-slate-500'
                          }`}>Sin subhabilidades</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${
                          themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
                        }`}>
                          {skill.upgrades.basic}
                        </p>
                      </div>

                      <div className={`rounded-lg p-3 space-y-1 border ${
                        themeMode === 'light'
                          ? 'bg-purple-50/60 border-purple-200 shadow-sm'
                          : 'bg-purple-950/30 border-purple-800/60'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-mono font-bold ${
                            themeMode === 'light' ? 'text-purple-950' : 'text-purple-200'
                          }`}>Nivel 2 • Avanzado</span>
                          <span className={`text-[10px] font-mono font-semibold ${
                            themeMode === 'light' ? 'text-purple-700' : 'text-purple-400'
                          }`}>3 Subhabilidades disp.</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${
                          themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
                        }`}>
                          {skill.upgrades.advanced}
                        </p>
                      </div>

                      <div className={`rounded-lg p-3 space-y-1 border ${
                        themeMode === 'light'
                          ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                          : 'bg-purple-950/40 border-yellow-800/50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-mono font-bold ${
                            themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                          }`}>Nivel 3 • Experto</span>
                          <span className={`text-[10px] font-mono font-semibold ${
                            themeMode === 'light' ? 'text-amber-800' : 'text-yellow-400'
                          }`}>3 Subhabilidades disp.</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${
                          themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
                        }`}>
                          {skill.upgrades.expert}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Recommendation Guide Callout */}
                  {skill.selectionGuide && (
                    <div className={`rounded-xl p-4 space-y-2.5 border ${
                      themeMode === 'light'
                        ? 'bg-gradient-to-r from-amber-50 via-purple-50 to-amber-50 border-amber-300 shadow-sm'
                        : 'bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-black/60 border-yellow-600/50'
                    }`}>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500 dark:text-yellow-400 dark:fill-yellow-400" />
                          <h4 className={`text-xs font-mono uppercase font-bold tracking-wide ${
                            themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
                          }`}>
                            Guía Táctica de Selección Recomendada (Meta Olden Era)
                          </h4>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
                          themeMode === 'light'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-yellow-950/80 text-yellow-300 border-yellow-700/60'
                        }`}>
                          Elección Óptima
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className={`p-2.5 rounded-lg border ${
                          themeMode === 'light'
                            ? 'bg-white border-purple-200'
                            : 'bg-black/50 border-purple-800/40'
                        }`}>
                          <div className={`flex items-center gap-1.5 font-bold mb-1 ${
                            themeMode === 'light' ? 'text-purple-950' : 'text-purple-200'
                          }`}>
                            <span className={themeMode === 'light' ? 'text-amber-800' : 'text-yellow-400'}>★ Avanzado (Nivel 2):</span>
                            <span className={themeMode === 'light' ? 'text-purple-900 underline font-semibold' : 'text-white underline decoration-yellow-400/60'}>
                              {skill.selectionGuide.advanced.recommendedName}
                            </span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${
                            themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {skill.selectionGuide.advanced.why}
                          </p>
                          {skill.selectionGuide.advanced.alternativeChoice && (
                            <div className={`mt-1.5 pt-1.5 border-t text-[10px] ${
                              themeMode === 'light' ? 'border-slate-200 text-slate-600' : 'border-purple-900/40 text-slate-400'
                            }`}>
                              <span className={themeMode === 'light' ? 'text-teal-700 font-bold' : 'text-cyan-400 font-semibold'}>
                                Alternativa ({skill.selectionGuide.advanced.alternativeChoice}):
                              </span> {skill.selectionGuide.advanced.alternativeCondition}
                            </div>
                          )}
                        </div>

                        <div className={`p-2.5 rounded-lg border ${
                          themeMode === 'light'
                            ? 'bg-white border-amber-200'
                            : 'bg-black/50 border-yellow-800/40'
                        }`}>
                          <div className={`flex items-center gap-1.5 font-bold mb-1 ${
                            themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
                          }`}>
                            <span className={themeMode === 'light' ? 'text-amber-800' : 'text-yellow-400'}>★ Experto (Nivel 3):</span>
                            <span className={themeMode === 'light' ? 'text-amber-950 underline font-semibold' : 'text-white underline decoration-yellow-400/60'}>
                              {skill.selectionGuide.expert.recommendedName}
                            </span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${
                            themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {skill.selectionGuide.expert.why}
                          </p>
                          {skill.selectionGuide.expert.alternativeChoice && (
                            <div className={`mt-1.5 pt-1.5 border-t text-[10px] ${
                              themeMode === 'light' ? 'border-slate-200 text-slate-600' : 'border-purple-900/40 text-slate-400'
                            }`}>
                              <span className={themeMode === 'light' ? 'text-teal-700 font-bold' : 'text-cyan-400 font-semibold'}>
                                Alternativa ({skill.selectionGuide.expert.alternativeChoice}):
                              </span> {skill.selectionGuide.expert.alternativeCondition}
                            </div>
                          )}
                        </div>
                      </div>

                      {skill.selectionGuide.generalTacticalTip && (
                        <p className={`text-[11px] font-mono italic pt-1 border-t ${
                          themeMode === 'light'
                            ? 'text-amber-900 border-amber-200'
                            : 'text-yellow-200/90 border-purple-900/30'
                        }`}>
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
                        <span className={`text-xs font-mono font-bold flex items-center gap-1.5 ${
                          themeMode === 'light' ? 'text-purple-950' : 'text-purple-300'
                        }`}>
                          <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          Subhabilidades de Nivel Avanzado (Selecciona 1 de 3 en Nivel 2)
                        </span>
                        <span className={`text-[10px] font-mono ${
                          themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}>3 opciones disponibles</span>
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
                                  ? themeMode === 'light'
                                    ? 'bg-amber-50/90 border-2 border-amber-400 shadow-sm ring-1 ring-amber-300'
                                    : 'bg-gradient-to-b from-yellow-950/40 via-[#1c162b] to-[#14101e] border-2 border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-yellow-400/40'
                                  : isAlt
                                  ? themeMode === 'light'
                                    ? 'bg-teal-50/70 border border-teal-300'
                                    : 'bg-[#181524] border border-cyan-700/60'
                                  : themeMode === 'light'
                                  ? 'bg-white border border-slate-200 hover:border-purple-300 shadow-xs'
                                  : 'bg-[#181524] border border-purple-800/40 hover:border-purple-600/70'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-4 h-4 rounded-full font-mono font-bold text-[9px] flex items-center justify-center shrink-0 border ${
                                    isRec
                                      ? themeMode === 'light'
                                        ? 'bg-amber-500 text-black border-amber-600'
                                        : 'bg-yellow-900 text-yellow-200 border-yellow-500'
                                      : themeMode === 'light'
                                      ? 'bg-purple-100 text-purple-900 border-purple-300'
                                      : 'bg-purple-900 text-purple-200 border-purple-700'
                                  }`}>
                                    A{idx + 1}
                                  </span>
                                  <span className={`text-xs font-bold leading-snug ${
                                    isRec
                                      ? themeMode === 'light' ? 'text-amber-950' : 'text-yellow-200'
                                      : themeMode === 'light' ? 'text-slate-900' : 'text-slate-100'
                                  }`}>
                                    {sub.name}
                                  </span>
                                </div>
                                {sub.type && (
                                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                                    themeMode === 'light'
                                      ? 'bg-slate-100 text-slate-600 border-slate-300'
                                      : 'bg-black/50 text-slate-400 border-slate-700/60'
                                  }`}>
                                    {sub.type}
                                  </span>
                                )}
                              </div>

                              {sub.recommendedTag && (
                                <div className="pt-0.5">
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                    isRec
                                      ? themeMode === 'light'
                                        ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                                        : 'bg-yellow-950/90 text-yellow-300 border-yellow-600/70 shadow-sm'
                                      : themeMode === 'light'
                                      ? 'bg-teal-100 text-teal-900 border-teal-300'
                                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-700/70'
                                  }`}>
                                    {sub.recommendedTag}
                                  </span>
                                </div>
                              )}

                              <p className={`text-[11px] leading-relaxed ${
                                themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                              }`}>
                                {sub.effect}
                              </p>

                              {sub.recommendationWhen && (
                                <div className={`text-[10px] p-1.5 rounded border leading-relaxed ${
                                  isRec
                                    ? themeMode === 'light'
                                      ? 'bg-amber-100/60 text-amber-950 border-amber-300 font-sans'
                                      : 'bg-yellow-950/30 text-yellow-200/90 border-yellow-800/40 font-sans'
                                    : themeMode === 'light'
                                    ? 'bg-teal-50 text-teal-950 border-teal-200 font-sans'
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
                        <span className={`text-xs font-mono font-bold flex items-center gap-1.5 ${
                          themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
                        }`}>
                          <Award className="w-3.5 h-3.5 text-amber-600 dark:text-yellow-400" />
                          Subhabilidades de Nivel Experto (Selecciona 1 de 3 en Nivel 3)
                        </span>
                        <span className={`text-[10px] font-mono ${
                          themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}>3 opciones disponibles</span>
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
                                  ? themeMode === 'light'
                                    ? 'bg-amber-50/90 border-2 border-amber-400 shadow-sm ring-1 ring-amber-300'
                                    : 'bg-gradient-to-b from-yellow-950/40 via-[#1c162b] to-[#14101e] border-2 border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-yellow-400/40'
                                  : isAlt
                                  ? themeMode === 'light'
                                    ? 'bg-teal-50/70 border border-teal-300'
                                    : 'bg-[#1b1722] border border-cyan-700/60'
                                  : themeMode === 'light'
                                  ? 'bg-white border border-slate-200 hover:border-amber-300 shadow-xs'
                                  : 'bg-[#1b1722] border border-yellow-900/40 hover:border-yellow-600/70'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-4 h-4 rounded-full font-mono font-bold text-[9px] flex items-center justify-center shrink-0 border ${
                                    isRec
                                      ? themeMode === 'light'
                                        ? 'bg-amber-500 text-black border-amber-600'
                                        : 'bg-yellow-900 text-yellow-200 border-yellow-500'
                                      : themeMode === 'light'
                                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                                      : 'bg-yellow-950 text-yellow-200 border-yellow-700'
                                  }`}>
                                    E{idx + 1}
                                  </span>
                                  <span className={`text-xs font-bold leading-snug ${
                                    isRec
                                      ? themeMode === 'light' ? 'text-amber-950' : 'text-yellow-200'
                                      : themeMode === 'light' ? 'text-slate-900' : 'text-yellow-100'
                                  }`}>
                                    {sub.name}
                                  </span>
                                </div>
                                {sub.type && (
                                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                                    themeMode === 'light'
                                      ? 'bg-slate-100 text-slate-600 border-slate-300'
                                      : 'bg-black/50 text-slate-400 border-slate-700/60'
                                  }`}>
                                    {sub.type}
                                  </span>
                                )}
                              </div>

                              {sub.recommendedTag && (
                                <div className="pt-0.5">
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                    isRec
                                      ? themeMode === 'light'
                                        ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                                        : 'bg-yellow-950/90 text-yellow-300 border-yellow-600/70 shadow-sm'
                                      : themeMode === 'light'
                                      ? 'bg-teal-100 text-teal-900 border-teal-300'
                                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-700/70'
                                  }`}>
                                    {sub.recommendedTag}
                                  </span>
                                </div>
                              )}

                              <p className={`text-[11px] leading-relaxed ${
                                themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                              }`}>
                                {sub.effect}
                              </p>

                              {sub.recommendationWhen && (
                                <div className={`text-[10px] p-1.5 rounded border leading-relaxed ${
                                  isRec
                                    ? themeMode === 'light'
                                      ? 'bg-amber-100/60 text-amber-950 border-amber-300 font-sans'
                                      : 'bg-yellow-950/30 text-yellow-200/90 border-yellow-800/40 font-sans'
                                    : themeMode === 'light'
                                    ? 'bg-teal-50 text-teal-950 border-teal-200 font-sans'
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
                    <div className={`pt-3 border-t flex flex-col sm:flex-row gap-3 text-xs ${
                      themeMode === 'light' ? 'border-slate-200' : 'border-purple-900/30'
                    }`}>
                      {skill.startingHeroes && skill.startingHeroes.length > 0 && (
                        <div className={`flex-1 p-2.5 rounded-lg border ${
                          themeMode === 'light'
                            ? 'bg-white border-purple-200 shadow-xs'
                            : 'bg-black/40 border-purple-900/30'
                        }`}>
                          <span className={`font-mono font-bold block mb-1 text-[11px] ${
                            themeMode === 'light' ? 'text-purple-950' : 'text-purple-300'
                          }`}>
                            Héroes iniciales con esta habilidad:
                          </span>
                          <span className={`text-[11px] leading-relaxed ${
                            themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {skill.startingHeroes.join(', ')}
                          </span>
                        </div>
                      )}

                      {skill.requiredByClasses && skill.requiredByClasses.length > 0 && (
                        <div className={`flex-1 p-2.5 rounded-lg border ${
                          themeMode === 'light'
                            ? 'bg-white border-teal-200 shadow-xs'
                            : 'bg-black/40 border-purple-900/30'
                        }`}>
                          <span className={`font-mono font-bold block mb-1 text-[11px] ${
                            themeMode === 'light' ? 'text-teal-900' : 'text-cyan-300'
                          }`}>
                            Requerido por Clases de Héroe:
                          </span>
                          <span className={`text-[11px] leading-relaxed ${
                            themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                          }`}>
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
