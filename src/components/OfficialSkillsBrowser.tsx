import React, { useMemo, useState } from 'react';
import {
  Award,
  Crosshair,
  GitBranch,
  Search,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { OFFICIAL_SKILLS_DATA } from '../data/officialSkillsData';
import type { ApiSkill } from '../types-api';

interface OfficialSkillsBrowserProps {
  themeMode?: 'dark' | 'light';
}

const SKILL_TYPE_LABELS: Record<ApiSkill['skillType'], string> = {
  Class: 'Clase',
  Common: 'Común',
  Faction: 'Facción',
};

const SKILL_TYPE_FILTERS: Array<'Class' | 'Common' | 'Faction'> = [
  'Class',
  'Common',
  'Faction',
];

export const OfficialSkillsBrowser: React.FC<OfficialSkillsBrowserProps> = ({
  themeMode = 'dark',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<ApiSkill | null>(null);
  const [filterType, setFilterType] = useState<'all' | ApiSkill['skillType']>(
    'all'
  );
  const [sortBy, setSortBy] = useState<'name' | 'skillType'>('name');

  const filteredSkills = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('es-ES');

    return OFFICIAL_SKILLS_DATA.filter((skill) => {
      const matchesQuery =
        skill.name.toLocaleLowerCase('es-ES').includes(query) ||
        SKILL_TYPE_LABELS[skill.skillType]
          .toLocaleLowerCase('es-ES')
          .includes(query);

      return matchesQuery && (filterType === 'all' || skill.skillType === filterType);
    });
  }, [filterType, searchTerm]);

  const sortedSkills = useMemo(() => {
    return [...filteredSkills].sort((first, second) => {
      if (sortBy === 'name') {
        return first.name.localeCompare(second.name, 'es');
      }

      return (
        first.skillType.localeCompare(second.skillType) ||
        first.name.localeCompare(second.name, 'es')
      );
    });
  }, [filteredSkills, sortBy]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value as typeof filterType);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as typeof sortBy);
  };

  return (
    <section className="space-y-6" aria-label="Explorador de habilidades oficiales">
      <div
        className={`rounded-2xl border p-4 sm:p-5 ${
          themeMode === 'light'
            ? 'bg-white border-slate-200 shadow-md'
            : 'bg-black/60 border-slate-800'
        }`}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span
                className={`flex items-center gap-1.5 rounded border px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase ${
                  themeMode === 'light'
                    ? 'bg-purple-950/70 text-purple-300 border-purple-800/60'
                    : 'bg-purple-100 text-purple-900 border-purple-300'
                }`}
              >
                <GitBranch className="h-3.5 w-3.5" />
                Árbol oficial de habilidades
              </span>
              <span
                className={`text-xs font-mono ${
                  themeMode === 'light' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {OFFICIAL_SKILLS_DATA.length} habilidades canónicas
              </span>
            </div>

            <h2
              className={`font-serif text-xl font-bold sm:text-2xl ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Explora las habilidades oficiales de Olden Era
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[220px]">
              <Search
                className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                  themeMode === 'light' ? 'text-purple-600' : 'text-amber-400'
                }`}
              />
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar habilidad..."
                className={`w-full rounded-xl border bg-transparent py-2 pl-9 pr-3 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  themeMode === 'light'
                    ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white'
                    : 'border-slate-700 bg-black/60 text-slate-200 placeholder-slate-500'
                }`}
                aria-label="Buscar habilidad"
              />
            </div>

            <label className="sr-only" htmlFor="skill-filter">
              Filtrar por tipo
            </label>
            <select
              id="skill-filter"
              value={filterType}
              onChange={handleFilterChange}
              className={`rounded-lg border px-3 py-2 text-xs font-mono ${
                themeMode === 'light'
                  ? 'border-slate-200 bg-white text-slate-800'
                  : 'border-slate-800 bg-black/50 text-slate-400'
              }`}
            >
              <option value="all">Todas</option>
              {SKILL_TYPE_FILTERS.map((type) => (
                <option key={type} value={type}>
                  {SKILL_TYPE_LABELS[type]}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="skill-sort">
              Ordenar habilidades
            </label>
            <select
              id="skill-sort"
              value={sortBy}
              onChange={handleSortChange}
              className={`rounded-lg border px-3 py-2 text-xs font-mono ${
                themeMode === 'light'
                  ? 'border-slate-200 bg-white text-slate-800'
                  : 'border-slate-800 bg-black/50 text-slate-400'
              }`}
            >
              <option value="name">Nombre</option>
              <option value="skillType">Tipo</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => setSelectedSkill(skill)}
              className={`group rounded-xl border p-4 text-left transition-all hover:shadow-md ${
                themeMode === 'light'
                  ? 'bg-white border-slate-200 hover:bg-slate-50'
                  : 'bg-black/50 border-slate-800 hover:bg-black/60'
              }`}
              aria-label={`Ver detalles de ${skill.name}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                    themeMode === 'light'
                      ? 'border-purple-200 bg-purple-50'
                      : 'border-slate-700 bg-black/40'
                  }`}
                >
                  <Sparkles
                    className={`h-6 w-6 ${
                      themeMode === 'light'
                        ? 'text-purple-600'
                        : 'text-amber-400'
                    }`}
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3
                    className={`truncate font-serif text-base font-semibold ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {skill.name}
                  </h3>
                  <p
                    className={`truncate text-xs font-mono ${
                      themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {SKILL_TYPE_LABELS[skill.skillType]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-modal-title"
        >
          <div
            className={`max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-2 p-5 shadow-2xl sm:p-6 ${
              themeMode === 'light'
                ? 'border-slate-300 bg-white text-slate-900'
                : 'border-slate-700 bg-[#12111b] text-white'
            }`}
          >
            <header className="mb-4 flex items-start justify-between gap-4 border-b border-slate-200 pb-3 dark:border-slate-800">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    themeMode === 'light'
                      ? 'border-purple-300 bg-purple-100 text-purple-900'
                      : 'border-slate-700 bg-black/40 text-amber-400'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3
                    id="skill-modal-title"
                    className={`flex flex-wrap items-center gap-2 text-base font-bold sm:text-lg ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {selectedSkill.name}
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] font-mono ${
                        themeMode === 'light'
                          ? 'border-purple-300 bg-purple-100 text-purple-900'
                          : 'border-slate-700 bg-black/40 text-amber-400'
                      }`}
                    >
                      {SKILL_TYPE_LABELS[selectedSkill.skillType]}
                    </span>
                  </h3>
                  <p
                    className={`mt-1 text-[11px] font-mono ${
                      themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Base de datos oficial • Heroes of Might &amp; Magic: Olden Era
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className={`rounded-lg border p-1.5 transition-colors hover:bg-slate-100 ${
                  themeMode === 'light'
                    ? 'border-slate-300 text-slate-600 hover:text-slate-900'
                    : 'border-slate-700 text-slate-400 hover:bg-black/60 hover:text-white'
                }`}
                aria-label="Cerrar detalles de la habilidad"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <section className="space-y-2" aria-label="Descripción de la habilidad">
              <h4
                className={`text-xs font-mono font-bold uppercase ${
                  themeMode === 'light' ? 'text-purple-900' : 'text-yellow-400'
                }`}
              >
                Descripción oficial
              </h4>
              <p
                className={`text-sm leading-relaxed ${
                  themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {selectedSkill.level1.description}
              </p>
            </section>

            <section className="space-y-2" aria-label="Niveles de maestría">
              <h4
                className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase ${
                  themeMode === 'light' ? 'text-purple-900' : 'text-yellow-400'
                }`}
              >
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Niveles de maestría
              </h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  {
                    level: selectedSkill.level1,
                    label: 'Básico',
                    className:
                      themeMode === 'light'
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-slate-700 bg-black/50',
                    textClass:
                      themeMode === 'light'
                        ? 'text-purple-800'
                        : 'text-yellow-300',
                  },
                  {
                    level: selectedSkill.level2,
                    label: 'Avanzado',
                    className:
                      themeMode === 'light'
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-slate-700 bg-black/50',
                    textClass:
                      themeMode === 'light'
                        ? 'text-purple-800'
                        : 'text-yellow-300',
                  },
                  {
                    level: selectedSkill.level3,
                    label: 'Experto',
                    className:
                      themeMode === 'light'
                        ? 'border-amber-300 bg-amber-50'
                        : 'border-yellow-900/60 bg-black/50',
                    textClass:
                      themeMode === 'light'
                        ? 'text-amber-900'
                        : 'text-yellow-300',
                  },
                ].map((item) => (
                  <div
                    key={item.level.levelName}
                    className={`rounded-lg border p-2.5 ${item.className}`}
                  >
                    <span
                      className={`mb-0.5 block text-[10px] font-mono font-bold ${item.textClass}`}
                    >
                      {item.label}
                    </span>
                    <p
                      className={`text-[11px] leading-relaxed ${
                        themeMode === 'light'
                          ? 'text-slate-700'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.level.levelName}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4
                    className={`flex items-center gap-1.5 text-xs font-mono font-bold ${
                      themeMode === 'light'
                        ? 'text-purple-950'
                        : 'text-purple-300'
                    }`}
                  >
                    <Target className="h-3.5 w-3.5" />
                    Subhabilidades avanzadas
                  </h4>
                  <span
                    className={`text-[10px] font-mono ${
                      themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Selecciona 1 de {selectedSkill.level2.subSkillChoices.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
                  {selectedSkill.level2.subSkillChoices.map((subskill) => (
                    <div
                      key={subskill.id}
                      className={`rounded-lg border p-2.5 ${
                        themeMode === 'light'
                          ? 'border-slate-200 bg-slate-50'
                          : 'border-slate-700 bg-black/60'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[8px] font-mono font-bold ${
                              themeMode === 'light'
                                ? 'border-purple-300 bg-purple-100 text-purple-900'
                                : 'border-slate-700 bg-black/40 text-amber-400'
                            }`}
                          >
                            A{selectedSkill.level2.subSkillChoices.indexOf(subskill) + 1}
                          </span>
                          <span
                            className={`truncate text-xs font-bold ${
                              themeMode === 'light' ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {subskill.name}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`text-[11px] leading-snug ${
                          themeMode === 'light'
                            ? 'text-slate-700'
                            : 'text-slate-300'
                        }`}
                      >
                        {subskill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4
                    className={`flex items-center gap-1.5 text-xs font-mono font-bold ${
                      themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                    }`}
                  >
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    Subhabilidades expertas
                  </h4>
                  <span
                    className={`text-[10px] font-mono ${
                      themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Selecciona 1 de {selectedSkill.level3.subSkillChoices.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
                  {selectedSkill.level3.subSkillChoices.map((subskill) => (
                    <div
                      key={subskill.id}
                      className={`rounded-lg border p-2.5 ${
                        themeMode === 'light'
                          ? 'border-slate-200 bg-slate-50'
                          : 'border-slate-700 bg-black/60'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[8px] font-mono font-bold ${
                              themeMode === 'light'
                                ? 'border-amber-300 bg-amber-100 text-amber-900'
                                : 'border-yellow-700 bg-yellow-950 text-yellow-200'
                            }`}
                          >
                            E{selectedSkill.level3.subSkillChoices.indexOf(subskill) + 1}
                          </span>
                          <span
                            className={`truncate text-xs font-bold ${
                              themeMode === 'light' ? 'text-slate-900' : 'text-yellow-100'
                            }`}
                          >
                            {subskill.name}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`text-[11px] leading-snug ${
                          themeMode === 'light'
                            ? 'text-slate-700'
                            : 'text-slate-300'
                        }`}
                      >
                        {subskill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className={`rounded-lg px-4 py-1.5 text-xs font-mono font-semibold transition-colors ${
                  themeMode === 'light'
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-amber-500 text-black hover:bg-amber-600'
                }`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};