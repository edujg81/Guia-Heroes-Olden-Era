import React, { useState } from 'react';
import { RECOMMENDED_SPELLS, ASTROLOGY_POINT_SOURCES, ASTROLOGY_TIER_COSTS } from '../data/dungeonData';
import { RecommendedSpell, SpellLevelInfo } from '../types';
import { useStickyState } from '../utils/useStickyState';
import { FactionId, getFactionTheme } from '../data/factionDataProvider';
import {
  Sparkles,
  Zap,
  Flame,
  Compass,
  BookOpen,
  Search,
  CheckCircle2,
  Star,
  Orbit,
  Layers,
  Award,
  Coins,
  Gem,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';

interface SpellGrimoireProps {
  selectedFaction?: FactionId;
}

export const SpellGrimoire: React.FC<SpellGrimoireProps> = ({ selectedFaction = 'Mazmorra' }) => {
  const theme = getFactionTheme(selectedFaction);
  const [selectedSchool, setSelectedSchool] = useStickyState<string>('all', 'spells_selected_school');
  const [selectedType, setSelectedType] = useStickyState<string>('all', 'spells_selected_type');
  const [selectedPriority, setSelectedPriority] = useStickyState<string>('all', 'spells_selected_priority');
  const [selectedTier, setSelectedTier] = useStickyState<string>('all', 'spells_selected_tier');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [learnedSpells, setLearnedSpells] = useStickyState<Record<string, boolean>>({
    'spell-slow': true,
    'spell-arcane-bolt': true,
    'spell-blind': true,
    'spell-town-portal': true,
    'spell-armageddon': true,
  }, 'spells_learned_records');
  const [showMechanicsGuide, setShowMechanicsGuide] = useStickyState<boolean>(true, 'spells_show_mechanics_guide');
  const [expandAllLevels, setExpandAllLevels] = useStickyState<boolean>(false, 'spells_expand_all_levels');
  const [activeSpellLevels, setActiveSpellLevels] = useState<Record<string, number>>({});

  const toggleSpellLearned = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLearnedSpells((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getSpellActiveLevel = (spellId: string): number => {
    return activeSpellLevels[spellId] || 1;
  };

  const setSpellActiveLevel = (spellId: string, level: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSpellLevels((prev) => ({
      ...prev,
      [spellId]: level,
    }));
  };

  const filteredSpells = RECOMMENDED_SPELLS.filter((spell) => {
    const matchesSchool = selectedSchool === 'all' || spell.school.includes(selectedSchool);
    const matchesType = selectedType === 'all' || spell.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || spell.priority.includes(selectedPriority);
    const matchesTier = selectedTier === 'all' || spell.tier.toString() === selectedTier;
    const matchesSearch =
      spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (spell.masterfulName && spell.masterfulName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      spell.effect.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.tacticalUtility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.schoolRequirement.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSchool && matchesType && matchesPriority && matchesTier && matchesSearch;
  });

  const totalLearned = Object.values(learnedSpells).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`bg-black/40 border ${theme.border} rounded-2xl p-5 ${theme.shadowAccent} backdrop-blur-md transition-colors duration-300`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`${theme.bgBadge} ${theme.textAccent} text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border ${theme.borderSubtle} flex items-center gap-1.5 font-mono`}>
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Grimorio Canónico de Hechizos • Olden Era
              </span>
              <span className="text-xs text-amber-400 font-mono flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                <Gem className="w-3.5 h-3.5 text-amber-400" />
                Niveles 1-4 & Polvo Alquímico
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {totalLearned} / {RECOMMENDED_SPELLS.length} Hechizos Marcados
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white uppercase tracking-wide flex items-center gap-2">
              <span>Grimorio de Magia, Costes de Desbloqueo y Niveles de Mejora</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              En <em>Heroes of Might and Magic: Olden Era</em>, los hechizos se desbloquean en el <strong>Observatorio del Reino</strong> o <strong>Cofradías de Magos</strong> y se potencian hasta el <strong>Nivel 4 (Versión Magistral)</strong> mediante <strong>Polvo Alquímico (Alchemical Dust)</strong>, oro y recursos raros.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative min-w-[240px]">
              <Search className={`w-4 h-4 ${theme.textAccent} absolute left-3 top-1/2 -translate-y-1/2`} />
              <input
                type="text"
                placeholder="Buscar por nombre, efecto, magistral..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-black/60 border ${theme.borderSubtle} rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-current font-sans`}
              />
            </div>
            <button
              onClick={() => setExpandAllLevels(!expandAllLevels)}
              className={`px-3 py-2 text-xs font-mono font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                expandAllLevels
                  ? `${theme.primaryButton} shadow-md`
                  : `bg-black/60 text-slate-300 ${theme.borderSubtle} hover:text-white`
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              {expandAllLevels ? 'Modo Pestañas' : 'Expandir 4 Niveles'}
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className={`mt-4 pt-4 border-t ${theme.borderSubtle} flex items-center gap-3 overflow-x-auto no-scrollbar pb-1`}>
          {/* Tier Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Tier Cofradía:</span>
            {(['all', '1', '2', '3', '4', '5'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  selectedTier === t
                    ? 'bg-amber-600 text-white border border-amber-400/50 shadow-[0_0_10px_rgba(217,119,6,0.3)]'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t === 'all' ? 'Todos' : `Tier ${t}`}
              </button>
            ))}
          </div>

          {/* School Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Escuela:</span>
            {(['all', 'Sombras', 'Arcana', 'Luz', 'Primigenia', 'Neutral'] as const).map((sch) => (
              <button
                key={sch}
                onClick={() => setSelectedSchool(sch)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  selectedSchool === sch
                    ? 'bg-purple-700 text-white border border-purple-400/50 shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {sch === 'all' ? 'Todas' : sch === 'Neutral' ? 'Neutral / Aventura' : sch}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Tipo:</span>
            {(['all', 'Combate', 'Aventura / Mapa', 'Control de Masas', 'Daño Masivo', 'Soporte'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  selectedType === t
                    ? 'bg-indigo-700 text-white border border-indigo-400/50'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t === 'all' ? 'Todos' : t}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className="text-slate-500 font-mono text-[10px] uppercase">Prioridad:</span>
            {(['all', 'Imprescindible', 'Muy Alta'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  selectedPriority === p
                    ? 'bg-red-800 text-white border border-red-400/50'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p === 'all' ? 'Todas' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Magic System & Upgrade Rules Card */}
      <div className={`bg-gradient-to-r ${theme.bgBadge} via-slate-900/60 to-black/70 border ${theme.borderSubtle} rounded-2xl p-5 ${theme.shadowAccent}`}>
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className={`text-sm font-mono font-bold uppercase ${theme.textAccent} tracking-wider`}>
              Mecánicas Oficiales de Magia, Observatorio y Niveles de Mejora en Olden Era
            </h3>
          </div>
          <button
            onClick={() => setShowMechanicsGuide(!showMechanicsGuide)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 cursor-pointer"
          >
            {showMechanicsGuide ? (
              <>Ocultar Sistema <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Ver Sistema Completo <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          En <strong>Olden Era</strong>, el sistema de magia está interconectado con la infraestructura del reino. Cada hechizo progresa a través de <strong>4 Niveles de Eficacia</strong>, alcanzando su forma <strong>Magistral (Masterful)</strong> con efectos masivos o sinergias únicas.
        </p>

        {showMechanicsGuide && (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t ${theme.borderSubtle} text-xs`}>
            <div className={`bg-black/60 border ${theme.borderSubtle} rounded-xl p-3.5 space-y-1.5`}>
              <div className="flex items-center justify-between text-cyan-400 font-mono font-bold text-[11px] uppercase">
                <span>1. Observatorio & Cofradía</span>
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                El <strong>Observatorio</strong> es la biblioteca global de tu reino. Al erigir una Cofradía de Magos, se desbloquean hechizos gratis al azar o puedes comprarlos manualmente mediante la fórmula: <code className="text-amber-300 bg-black/40 px-1 rounded">Tier × (2 Cristales, 2 Gemas, 2 Mercurio) + Oro</code>.
              </p>
            </div>

            <div className="bg-black/60 border border-amber-900/40 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-amber-400 font-mono font-bold text-[11px] uppercase">
                <span>2. Polvo Alquímico</span>
                <Gem className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Cada subida de nivel de un hechizo requiere <strong>25 Polvo Alquímico (Alchemical Dust)</strong> + Oro y recursos raros. El polvo se consigue desmontando artefactos, en eventos de mapa o visitando santuarios alquímicos.
              </p>
            </div>

            <div className="bg-black/60 border border-emerald-900/40 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400 font-mono font-bold text-[11px] uppercase">
                <span>3. Cofradías Duplicadas</span>
                <Layers className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Si construyes una 2ª, 3ª o 4ª Cofradía de Magos en otras ciudades y generan el mismo hechizo, <strong>se sube de nivel automáticamente sin gastar Polvo Alquímico</strong>.
              </p>
            </div>

            <div className="bg-black/60 border border-red-900/40 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-red-300 font-mono font-bold text-[11px] uppercase">
                <span>4. Versión Magistral (Niv 4)</span>
                <Award className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                El <strong>Nivel 4 (Masterful)</strong> transforma el hechizo: <em>Lentitud Masiva</em> a todo el ejército, <em>Teletransporte con ataque inmediato</em>, o <em>Armageddon Supremo</em> sin fuego amigo a Dragones Negros.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Top 3 Combo Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-950/40 to-black/60 border border-red-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-red-400" />
            <h4 className="text-xs font-bold uppercase text-red-200 tracking-wider">Combo 1: Drago-Armageddon Magistral</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Armageddon Nivel 4 (28 Maná)</strong> con Postura Mágica. Los <strong>Dragones Negros</strong> son 100% inmunes a magia Nivel 5; el ejército rival entero es vaporizado en Turno 1 mientras tus Dragones quedan 100% intactos.
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-950/40 to-black/60 border border-cyan-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold uppercase text-cyan-200 tracking-wider">Combo 2: Macro-Movilidad Neutral</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Portal a la Ciudad Nivel 4</strong> (Doble salto diario conservando 60% de movimiento) + <strong>Puerta Dimensional Nivel 4</strong> (4 saltos de 20 casillas). Recluta de todo tu imperio y salta sobre la capital rival en 1 turno.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-950/40 to-black/60 border border-purple-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold uppercase text-purple-200 tracking-wider">Combo 3: Control & Asalto de Hidras</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Lentitud Masiva Nivel 4</strong> (Inmoviliza a todo el ejército rival) seguido de <strong>Teletransporte Magistral Nivel 4</strong> para soltar a la Hidra en medio de 4 escuadras con +20% Ataque y acción inmediata.
          </p>
        </div>
      </div>

      {/* Spells Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredSpells.map((spell) => {
          const isLearned = !!learnedSpells[spell.id];
          const isEssential = spell.priority.includes('Imprescindible');
          const isNeutral = !!spell.isNeutral;
          const activeLevelNum = getSpellActiveLevel(spell.id);
          const activeLevel = spell.levels.find((l) => l.level === activeLevelNum) || spell.levels[0];

          const schoolColor =
            isNeutral
              ? 'text-cyan-300 bg-cyan-950/70 border-cyan-500/60'
              : spell.school.includes('Sombras')
              ? 'text-purple-400 bg-purple-950/50 border-purple-800/50'
              : spell.school.includes('Arcana')
              ? 'text-indigo-400 bg-indigo-950/50 border-indigo-800/50'
              : spell.school.includes('Luz')
              ? 'text-amber-400 bg-amber-950/50 border-amber-800/50'
              : spell.school.includes('Primigenia')
              ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50'
              : 'text-cyan-400 bg-cyan-950/50 border-cyan-800/50';

          return (
            <div
              key={spell.id}
              className={`rounded-2xl p-5 border transition-all relative overflow-hidden backdrop-blur-sm flex flex-col justify-between ${
                isLearned
                  ? `${theme.bgBadge} ${theme.border} ${theme.shadowAccent}`
                  : isNeutral
                  ? 'bg-black/60 border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : isEssential
                  ? 'bg-black/60 border-amber-500/40 hover:border-amber-400'
                  : `bg-black/50 ${theme.borderSubtle} hover:border-amber-400/60`
              }`}
            >
              {/* Header with Title and Favorite Toggle */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${schoolColor}`}>
                        {spell.school}
                      </span>
                      <span className="text-[11px] font-mono text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-amber-900/40">
                        Cofradía Tier {spell.tier}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        {activeLevel.manaCost} Maná
                      </span>
                    </div>

                    <h3 className="text-lg font-serif text-white font-bold tracking-wide flex items-center gap-2 flex-wrap">
                      <span>{spell.name}</span>
                      <span className="text-xs text-slate-400 font-sans font-normal italic">({spell.nameEn})</span>
                      {spell.masterfulName && (
                        <span className="text-[10px] font-mono text-yellow-300 bg-yellow-950/50 px-2 py-0.5 rounded border border-yellow-700/50">
                          {spell.masterfulName}
                        </span>
                      )}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleSpellLearned(spell.id, e)}
                    className={`shrink-0 p-1 ${theme.textAccent} hover:brightness-125 transition-colors cursor-pointer`}
                    title={isLearned ? 'Desmarcar de lista de prioritarios' : 'Marcar como prioritario / aprendido'}
                    aria-label="Marcar hechizo aprendido"
                  >
                    {isLearned ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    ) : (
                      <Star className={`w-6 h-6 ${isEssential ? 'text-amber-400/80 hover:text-amber-300' : 'text-slate-600 hover:text-slate-400'}`} />
                    )}
                  </button>
                </div>

                {/* Priority, School Requirement, and Unlock Cost */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5 text-xs font-mono">
                  <div className={`bg-black/50 p-2 rounded-lg border ${theme.borderSubtle}`}>
                    <span className="text-[10px] text-slate-400 uppercase block mb-0.5">Requisito de Escuela:</span>
                    <span className="text-slate-200 font-sans font-semibold text-[11px]">
                      {spell.schoolRequirement}
                    </span>
                  </div>
                  <div className={`bg-black/50 p-2 rounded-lg border ${theme.borderSubtle}`}>
                    <span className="text-[10px] text-amber-400 uppercase block mb-0.5">Coste Desbloqueo Base:</span>
                    <span className="text-amber-300 text-[11px]">
                      {spell.unlockCost.gold > 0 ? `${spell.unlockCost.gold.toLocaleString()} Oro` : ''}
                      {spell.unlockCost.crystals ? ` • ${spell.unlockCost.crystals} Cristales` : ''}
                      {spell.unlockCost.gems ? ` • ${spell.unlockCost.gems} Gemas` : ''}
                      {spell.unlockCost.mercury ? ` • ${spell.unlockCost.mercury} Mercurio` : ''}
                      {spell.unlockCost.astrologyPoints ? ` • ${spell.unlockCost.astrologyPoints} Pts Astrología` : ''}
                      {spell.unlockCost.insight ? ` • ${spell.unlockCost.insight} Percepción` : ''}
                    </span>
                  </div>
                </div>

                {/* Tactical utility */}
                <div className={`mb-4 ${theme.bgBadge} p-2.5 rounded-xl border ${theme.borderSubtle} text-xs`}>
                  <span className={`text-[10px] uppercase font-bold ${theme.textAccent} tracking-wider block mb-1 flex items-center gap-1`}>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Utilidad Táctica para {selectedFaction}:
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {spell.tacticalUtility}
                  </p>
                </div>

                {/* 4 UPGRADE LEVELS SECTION */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-cyan-300 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-cyan-400" />
                      Niveles de Mejora (1 a 4 Magistral) & Costes de Recursos:
                    </span>
                    {!expandAllLevels && (
                      <span className="text-[10px] font-mono text-slate-400">
                        Selecciona un nivel:
                      </span>
                    )}
                  </div>

                  {expandAllLevels ? (
                    /* EXPANDED VIEW: Shows all 4 levels in stacked cards */
                    <div className="space-y-2.5">
                      {spell.levels.map((lvl) => (
                        <div
                          key={lvl.level}
                          className={`p-3 rounded-xl border text-xs ${
                            lvl.level === 4
                              ? `bg-gradient-to-r from-amber-950/40 via-black/40 to-black/60 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]`
                              : lvl.level === 3
                              ? `${theme.bgBadge} ${theme.borderSubtle}`
                              : lvl.level === 2
                              ? 'bg-slate-900/60 border-slate-800'
                              : 'bg-black/50 border-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap font-mono">
                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                lvl.level === 4
                                    ? 'bg-amber-500 text-black'
                                    : lvl.level === 3
                                    ? `${theme.primaryButton} text-white`
                                    : lvl.level === 2
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-700 text-slate-200'
                              }`}>
                                {lvl.title}
                              </span>
                              <span className="text-[11px] text-cyan-300 font-semibold">
                                {lvl.manaCost} Maná
                              </span>
                            </div>

                            {/* Resource Upgrade Cost */}
                            <div className="text-[10px] text-amber-300 bg-black/50 px-2 py-0.5 rounded border border-amber-900/40 flex items-center gap-1 font-sans">
                              <Gem className="w-3 h-3 text-amber-400" />
                              {lvl.level === 1 ? (
                                <span className="text-slate-400 font-mono">Desbloqueo Base</span>
                              ) : (
                                <span>
                                  <strong>{lvl.upgradeCost.dust} Polvo Alquímico</strong> + {lvl.upgradeCost.gold.toLocaleString()} Oro
                                  {lvl.upgradeCost.rareResources ? ` + ${lvl.upgradeCost.rareResources}` : ''}
                                  {lvl.upgradeCost.insight ? ` + ${lvl.upgradeCost.insight} Percepción` : ''}
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-slate-200 text-xs font-sans leading-relaxed mb-1.5">
                            {lvl.effect}
                          </p>

                          <div className={`text-[11px] ${theme.textAccent} font-mono bg-black/40 px-2 py-1 rounded border ${theme.borderSubtle} flex items-start gap-1.5`}>
                            <span className="text-cyan-400 font-bold">★ Mejora Clave:</span>
                            <span className="font-sans text-slate-300">{lvl.keyBonus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* TABBED VIEW: Interactive level switcher (Level 1, 2, 3, 4) */
                    <div className={`bg-black/60 rounded-xl p-3.5 border ${theme.borderSubtle} space-y-3`}>
                      {/* Level selector buttons */}
                      <div className="grid grid-cols-4 gap-1.5">
                        {spell.levels.map((lvl) => {
                          const isCurrent = lvl.level === activeLevelNum;
                          return (
                            <button
                              key={lvl.level}
                              type="button"
                              onClick={(e) => setSpellActiveLevel(spell.id, lvl.level, e)}
                              className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                                isCurrent
                                  ? lvl.level === 4
                                    ? 'bg-amber-500 text-black border border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                                    : lvl.level === 3
                                    ? `${theme.primaryButton} text-white border border-current shadow-md`
                                    : lvl.level === 2
                                    ? 'bg-indigo-600 text-white border border-indigo-400'
                                    : 'bg-slate-700 text-white border border-slate-500'
                                  : 'bg-black/50 text-slate-400 hover:text-slate-200 border border-slate-800'
                              }`}
                            >
                              <span>Niv. {lvl.level}</span>
                              <span className="text-[9px] font-normal opacity-80">
                                {lvl.level === 4 ? 'Magistral' : `${lvl.manaCost} Maná`}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Level Card */}
                      <div className={`bg-black/40 p-3 rounded-lg border ${theme.borderSubtle} space-y-2`}>
                        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-xs">
                              {activeLevel.title}
                            </span>
                            <span className="text-cyan-300 font-mono text-xs bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                              {activeLevel.manaCost} Maná
                            </span>
                          </div>

                          {/* Upgrade Cost */}
                          <div className="text-[11px] text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/40 font-mono flex items-center gap-1.5">
                            <Gem className="w-3 h-3 text-amber-400" />
                            {activeLevel.level === 1 ? (
                              <span className="text-slate-300 font-sans">Desbloqueo Base</span>
                            ) : (
                              <span>
                                <strong>{activeLevel.upgradeCost.dust} Polvo Alquímico</strong> + {activeLevel.upgradeCost.gold.toLocaleString()} Oro
                                {activeLevel.upgradeCost.rareResources ? ` + ${activeLevel.upgradeCost.rareResources}` : ''}
                                {activeLevel.upgradeCost.insight ? ` + ${activeLevel.upgradeCost.insight} Percepción` : ''}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Effect description */}
                        <p className="text-slate-200 text-xs font-sans leading-relaxed">
                          {activeLevel.effect}
                        </p>

                        {/* Key Advantage */}
                        <div className={`text-[11px] ${theme.textAccent} font-mono ${theme.bgBadge} p-2 rounded border ${theme.borderSubtle} flex items-start gap-1.5`}>
                          <span className="text-cyan-400 font-bold shrink-0">★ Ventaja de Nivel:</span>
                          <span className="font-sans text-slate-300">{activeLevel.keyBonus}</span>
                        </div>

                        {/* Alternate Guild Condition */}
                        {activeLevel.upgradeCost.guildCondition && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            <span className="text-amber-400 font-semibold">Alternativa: </span>
                            <span>{activeLevel.upgradeCost.guildCondition}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Where to learn footer */}
              <div className={`mt-4 pt-3 border-t ${theme.borderSubtle} flex items-center justify-between gap-2 flex-wrap text-[11px] text-slate-400`}>
                <div>
                  <span className="text-slate-500 font-mono uppercase text-[10px]">Dónde aprender: </span>
                  <span className="text-slate-300">{spell.whereToLearn}</span>
                </div>
                <div className="text-amber-400 font-mono text-[10px]">
                  Fórmula: {spell.unlockCost.formula}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
