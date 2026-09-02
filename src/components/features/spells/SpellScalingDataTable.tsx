import React, { useState, useMemo } from 'react';
import { RecommendedSpell } from '../../../types';
import {
  calculateSpellAtSpellPower,
  CalculatedSpell,
} from '../../../utils/spellScalingCalculator';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';
import { SmartSpellHoverCard } from './SmartSpellHoverCard';
import {
  ArrowUpDown,
  Zap,
  Flame,
  Award,
  Sparkles,
  Search,
  Filter,
  TrendingUp,
  Info,
} from 'lucide-react';

interface SpellScalingDataTableProps {
  spells: RecommendedSpell[];
  spellPower: number;
  activeFaction: FactionId;
  themeMode?: 'dark' | 'light';
  onSelectSpell?: (spellId: string) => void;
}

type SortField = 'name' | 'tier' | 'manaCost' | 'level1Dmg' | 'level4Dmg' | 'efficiency';
type SortOrder = 'asc' | 'desc';

export const SpellScalingDataTable: React.FC<SpellScalingDataTableProps> = ({
  spells,
  spellPower,
  activeFaction,
  themeMode = 'dark',
  onSelectSpell,
}) => {
  const theme = getFactionTheme(activeFaction, themeMode);

  const [sortField, setSortField] = useState<SortField>('level4Dmg');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const calculatedSpells: CalculatedSpell[] = useMemo(() => {
    return spells.map((s) => calculateSpellAtSpellPower(s, spellPower));
  }, [spells, spellPower]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'name' || field === 'tier' || field === 'manaCost' ? 'asc' : 'desc');
    }
  };

  const filteredAndSortedSpells = useMemo(() => {
    let list = calculatedSpells.filter((s) => {
      if (filterType === 'scalingOnly' && !s.hasScaling) return false;
      if (filterType === 'damage' && s.primaryScalingType !== 'damage') return false;
      if (filterType === 'heal' && s.primaryScalingType !== 'heal' && s.primaryScalingType !== 'resurrection') return false;
      if (filterType === 'control' && s.primaryScalingType !== 'control') return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.nameEn.toLowerCase().includes(q) || s.school.toLowerCase().includes(q);
      }
      return true;
    });

    list.sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (sortField) {
        case 'name':
          valA = a.name;
          valB = b.name;
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        case 'tier':
          valA = a.tier;
          valB = b.tier;
          break;
        case 'manaCost':
          valA = a.levels[0]?.manaCost || 0;
          valB = b.levels[0]?.manaCost || 0;
          break;
        case 'level1Dmg':
          valA = a.levels[0]?.calculatedValue ?? -1;
          valB = b.levels[0]?.calculatedValue ?? -1;
          break;
        case 'level4Dmg':
          valA = a.level4Damage ?? -1;
          valB = b.level4Damage ?? -1;
          break;
        case 'efficiency':
          valA = a.level4Efficiency ?? -1;
          valB = b.level4Efficiency ?? -1;
          break;
        default:
          valA = 0;
          valB = 0;
      }

      if (sortOrder === 'asc') {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    });

    return list;
  }, [calculatedSpells, filterType, searchQuery, sortField, sortOrder]);

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 space-y-4 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md text-slate-800'
          : `bg-black/60 border ${theme.borderSubtle} text-slate-200 shadow-xl`
      }`}
    >
      {/* Header with Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3 border-slate-700/30">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h3
              className={`font-serif font-bold text-base sm:text-lg uppercase tracking-wide ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Tabla de Escalado & Eficiencia de Maná
            </h3>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                themeMode === 'light'
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-purple-950 text-purple-300 border-purple-700'
              }`}
            >
              {spellPower} SP
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compara el rendimiento numérico en vivo de cada hechizo según el Poder Mágico actual.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Filters */}
          <div className="flex items-center gap-1 text-xs font-mono">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'scalingOnly', label: 'Con Escalado SP' },
              { id: 'damage', label: 'Solo Daño' },
              { id: 'heal', label: 'Curación / Res' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer border ${
                  filterType === f.id
                    ? themeMode === 'light'
                      ? 'bg-purple-700 text-white border-purple-800 font-bold'
                      : `${theme.primaryButton} text-white border-white/20 font-bold shadow-xs`
                    : themeMode === 'light'
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                    : 'bg-black/40 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar hechizo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-lg pl-8 pr-2.5 py-1 text-xs font-sans placeholder-slate-400 focus:outline-none ${
                themeMode === 'light'
                  ? 'bg-slate-50 border border-slate-300 text-slate-900'
                  : 'bg-black/60 border border-slate-800 text-slate-200'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700/30">
        <table className="w-full text-left text-xs font-sans">
          <thead
            className={`font-mono text-[11px] uppercase border-b ${
              themeMode === 'light'
                ? 'bg-slate-100/90 text-slate-700 border-slate-200'
                : 'bg-black/80 text-slate-400 border-slate-800'
            }`}
          >
            <tr>
              <th className="p-3 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  <span>Hechizo</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="p-3 cursor-pointer hover:text-white transition-colors text-center" onClick={() => handleSort('tier')}>
                <div className="flex items-center justify-center gap-1">
                  <span>Tier</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="p-3 cursor-pointer hover:text-white transition-colors text-center" onClick={() => handleSort('manaCost')}>
                <div className="flex items-center justify-center gap-1">
                  <span>Maná</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="p-3 cursor-pointer hover:text-white transition-colors text-right" onClick={() => handleSort('level1Dmg')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Nivel 1 (Base)</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="p-3 text-right">
                <span>Nivel 2 (Avanz)</span>
              </th>
              <th className="p-3 text-right">
                <span>Nivel 3 (Exp)</span>
              </th>
              <th className="p-3 cursor-pointer hover:text-amber-400 transition-colors text-right" onClick={() => handleSort('level4Dmg')}>
                <div className="flex items-center justify-end gap-1 text-amber-500 font-bold">
                  <span>Niv. 4 (Magistral)</span>
                  <ArrowUpDown className="w-3 h-3 opacity-80" />
                </div>
              </th>
              <th className="p-3 cursor-pointer hover:text-cyan-400 transition-colors text-right" onClick={() => handleSort('efficiency')}>
                <div className="flex items-center justify-end gap-1 text-cyan-600 dark:text-cyan-400 font-bold">
                  <span>Eficiencia (Dmg/Maná)</span>
                  <ArrowUpDown className="w-3 h-3 opacity-80" />
                </div>
              </th>
              <th className="p-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/20 font-mono">
            {filteredAndSortedSpells.map((s) => {
              const rawSpell = spells.find((orig) => orig.id === s.id);
              const l1 = s.levels[0];
              const l2 = s.levels[1];
              const l3 = s.levels[2];
              const l4 = s.levels[3] || s.levels[s.levels.length - 1];

              return (
                <tr
                  key={s.id}
                  className={`transition-colors ${
                    themeMode === 'light'
                      ? 'hover:bg-purple-50/50 text-slate-800'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  {/* Name & School */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {rawSpell ? (
                        <SmartSpellHoverCard
                          spell={rawSpell}
                          currentSpellPower={spellPower}
                          activeFaction={activeFaction}
                          themeMode={themeMode}
                        >
                          <div className="cursor-help group">
                            <div className="font-bold text-xs sm:text-sm font-serif group-hover:text-amber-500 transition-colors flex items-center gap-1.5">
                              <span>{s.name}</span>
                              <Sparkles className="w-3 h-3 text-amber-500 opacity-60 group-hover:opacity-100" />
                            </div>
                            <div className="text-[10px] text-slate-400 font-sans italic">{s.nameEn} • {s.school}</div>
                          </div>
                        </SmartSpellHoverCard>
                      ) : (
                        <div>
                          <div className="font-bold text-xs sm:text-sm font-serif">{s.name}</div>
                          <div className="text-[10px] text-slate-400 font-sans italic">{s.nameEn} • {s.school}</div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="p-3 text-center">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700">
                      T{s.tier}
                    </span>
                  </td>

                  {/* Mana Cost */}
                  <td className="p-3 text-center">
                    <span className="text-xs font-bold text-cyan-400 flex items-center justify-center gap-0.5">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      {l4?.manaCost || l1?.manaCost}
                    </span>
                  </td>

                  {/* Level 1 Damage */}
                  <td className="p-3 text-right">
                    {l1?.calculatedValue !== null ? (
                      <span className="font-bold text-slate-200">{l1.calculatedValue}</span>
                    ) : (
                      <span className="text-slate-500 italic text-[11px] font-sans">Efecto / Buff</span>
                    )}
                  </td>

                  {/* Level 2 Damage */}
                  <td className="p-3 text-right">
                    {l2?.calculatedValue !== null ? (
                      <span className="text-slate-300">{l2.calculatedValue}</span>
                    ) : (
                      <span className="text-slate-500 italic text-[11px] font-sans">-</span>
                    )}
                  </td>

                  {/* Level 3 Damage */}
                  <td className="p-3 text-right">
                    {l3?.calculatedValue !== null ? (
                      <span className="text-purple-300 font-semibold">{l3.calculatedValue}</span>
                    ) : (
                      <span className="text-slate-500 italic text-[11px] font-sans">-</span>
                    )}
                  </td>

                  {/* Level 4 Magistral Damage */}
                  <td className="p-3 text-right">
                    {s.level4Damage !== null ? (
                      <span className="font-bold text-sm text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                        {s.level4Damage}
                      </span>
                    ) : (
                      <span className="text-amber-300/80 italic text-[11px] font-sans">Magistral Global</span>
                    )}
                  </td>

                  {/* Mana Efficiency */}
                  <td className="p-3 text-right">
                    {s.level4Efficiency !== null ? (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded border ${
                          s.level4Efficiency >= 30
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                            : s.level4Efficiency >= 18
                            ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700/60'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {s.level4Efficiency} /pt
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">-</span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="p-3 text-center">
                    {onSelectSpell && (
                      <button
                        type="button"
                        onClick={() => onSelectSpell(s.id)}
                        className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer border ${
                          themeMode === 'light'
                            ? 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200'
                            : 'bg-black/50 hover:bg-black/80 text-purple-300 border-purple-800/60'
                        }`}
                      >
                        Ver Ficha
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
        <span>Mostrando {filteredAndSortedSpells.length} de {calculatedSpells.length} hechizos evaluados a {spellPower} SP</span>
        <span>Eficiencia = Daño Magistral N4 / Coste de Maná</span>
      </div>
    </div>
  );
};
