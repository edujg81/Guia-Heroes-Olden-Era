import React, { useState } from 'react';
import { OFFICIAL_SPELLS_DATA as RECOMMENDED_SPELLS } from '../data/spellsData';
import { RecommendedSpell, SpellLevelInfo } from '../types';
import { useStickyState } from '../utils/useStickyState';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import {
  FACTION_SPELL_COMBOS,
  FACTION_MAGIC_PROFILES,
  getFactionSpellPriority,
  getFactionCombos,
  getFactionMagicProfile,
  FactionSpellCombo,
} from '../data/factionSpellData';
import {
  formatEffectWithSpellPower,
  parseSpellFormula,
  matchSpellSchool,
} from '../utils/spellScalingCalculator';
import {
  SpellPowerSlider,
  SpellSchoolSigilSelector,
  SpellScalingDataTable,
  SpellVersusComparator,
  RunicGlyphAura,
  SmartSpellHoverCard,
} from './features/spells';
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
  Swords,
  Skull,
  Shield,
  Target,
  Check,
  TrendingUp,
  Grid,
  Table,
} from 'lucide-react';

interface SpellGrimoireProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
}

export const SpellGrimoire: React.FC<SpellGrimoireProps> = ({ 
  selectedFaction: initialFaction = 'Mazmorra',
  themeMode = 'dark',
}) => {
  const [activeFaction, setActiveFaction] = useState<FactionId>(initialFaction);

  // Keep synced if parent changes faction
  React.useEffect(() => {
    setActiveFaction(initialFaction);
  }, [initialFaction]);

  const theme = getFactionTheme(activeFaction, themeMode);
  const factionMeta = FACTIONS_METADATA[activeFaction] || FACTIONS_METADATA.Mazmorra;
  const magicProfile = getFactionMagicProfile(activeFaction);
  const factionCombos = getFactionCombos(activeFaction);

  // View mode switcher: 'grimoire' | 'scaling_table' | 'versus'
  const [spellsViewMode, setSpellsViewMode] = useStickyState<'grimoire' | 'scaling_table' | 'versus'>('grimoire', 'spells_view_mode');
  // Spell Power state (1 to 30 SP)
  const [spellPower, setSpellPower] = useStickyState<number>(10, 'spells_spell_power');

  const [selectedSchool, setSelectedSchool] = useStickyState<string>('all', 'spells_selected_school');
  const [selectedType, setSelectedType] = useStickyState<string>('all', 'spells_selected_type');
  const [selectedPriority, setSelectedPriority] = useStickyState<string>('all', 'spells_selected_priority');
  const [selectedTier, setSelectedTier] = useStickyState<string>('all', 'spells_selected_tier');
  const [filterOnlyFactionMeta, setFilterOnlyFactionMeta] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedComboTab, setSelectedComboTab] = useState<number>(0);
  
  const [learnedSpells, setLearnedSpells] = useStickyState<Record<string, boolean>>({
    'spell-slow': true,
    'spell-arcane-bolt': true,
    'spell-blind': true,
    'spell-town-portal': true,
    'spell-armageddon': true,
  }, 'spells_learned_records');
  const [showMechanicsGuide, setShowMechanicsGuide] = useStickyState<boolean>(true, 'spells_show_mechanics_guide');
  const [showFactionProfile, setShowFactionProfile] = useStickyState<boolean>(true, 'spells_show_faction_profile');
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

  // Helper to get priority for currently active faction
  const getEffectivePriority = (spell: RecommendedSpell): string => {
    const factionPrio = getFactionSpellPriority(spell.id, activeFaction);
    return factionPrio ? factionPrio.priority : spell.priority;
  };

  const handleSelectSpellFromTable = (spellId: string) => {
    const sp = RECOMMENDED_SPELLS.find((s) => s.id === spellId);
    if (sp) {
      setSearchTerm(sp.name);
      setSelectedSchool('all');
      setSelectedTier('all');
      setSelectedType('all');
      setSelectedPriority('all');
      setFilterOnlyFactionMeta(false);
    }
    setSpellsViewMode('grimoire');
  };

  const filteredSpells = RECOMMENDED_SPELLS.filter((spell) => {
    const effectivePriority = getEffectivePriority(spell);
    const factionPrioInfo = getFactionSpellPriority(spell.id, activeFaction);

    if (filterOnlyFactionMeta) {
      const isMetaForFaction = effectivePriority.includes('Imprescindible') || effectivePriority.includes('Muy Alta');
      if (!isMetaForFaction) return false;
    }

    const matchesSchool = matchSpellSchool(spell.school, selectedSchool);
    const matchesType = selectedType === 'all' || spell.type === selectedType;
    const matchesPriority =
      selectedPriority === 'all' ||
      effectivePriority.includes(selectedPriority) ||
      spell.priority.includes(selectedPriority);
    const matchesTier = selectedTier === 'all' || spell.tier.toString() === selectedTier;
    
    const matchesSearch =
      spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (spell.masterfulName && spell.masterfulName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      spell.effect.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.tacticalUtility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.schoolRequirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (factionPrioInfo && factionPrioInfo.synergyTip.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSchool && matchesType && matchesPriority && matchesTier && matchesSearch;
  });

  const totalLearned = Object.values(learnedSpells).filter(Boolean).length;

  const renderComboIcon = (iconType: string) => {
    switch (iconType) {
      case 'flame':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-purple-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'compass':
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'skull':
        return <Skull className="w-5 h-5 text-purple-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'swords':
      default:
        return <Swords className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Faction Selector */}
      <div className={`border rounded-2xl p-5 backdrop-blur-md transition-colors duration-300 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md text-slate-800'
          : `bg-black/40 ${theme.border} ${theme.shadowAccent}`
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border flex items-center gap-1.5 font-mono ${
                themeMode === 'light'
                  ? 'bg-purple-100 text-purple-900 border-purple-300 font-semibold'
                  : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
              }`}>
                <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Grimorio Canónico de Hechizos • Olden Era
              </span>
              <span className={`text-xs font-mono flex items-center gap-1 px-2 py-0.5 rounded border ${
                themeMode === 'light'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                  : 'bg-amber-950/40 text-amber-400 border-amber-800/40'
              }`}>
                <Gem className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Niveles 1-4 & Polvo Alquímico
              </span>
              <span className={`text-xs font-mono ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {totalLearned} / {RECOMMENDED_SPELLS.length} Hechizos Marcados
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-serif uppercase tracking-wide flex items-center gap-2 ${
              themeMode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              <span>Grimorio de Magia y Sinergias Tácticas</span>
            </h2>
            <p className={`text-xs mt-1 max-w-3xl leading-relaxed ${
              themeMode === 'light' ? 'text-slate-700' : 'text-slate-400'
            }`}>
              En <em>Heroes of Might and Magic: Olden Era</em>, cada una de las 6 facciones de <strong>Jadame</strong> tiene afinidades elementales únicas, prioridades de desbloqueo en la Cofradía y combos tácticos con versiones <strong>Magistrales (Nivel 4)</strong>.
            </p>
          </div>

          {/* Search bar & Level View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative min-w-[240px]">
              <Search className={`w-4 h-4 ${themeMode === 'light' ? 'text-purple-700' : theme.textAccent} absolute left-3 top-1/2 -translate-y-1/2`} />
              <input
                type="text"
                placeholder="Buscar por nombre, efecto, magistral..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-current font-sans ${
                  themeMode === 'light'
                    ? 'bg-slate-50 border border-slate-300 text-slate-900'
                    : `bg-black/60 border ${theme.borderSubtle} text-slate-200`
                }`}
              />
            </div>
            <button
              onClick={() => setExpandAllLevels(!expandAllLevels)}
              className={`px-3 py-2 text-xs font-mono font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                expandAllLevels
                  ? `${theme.primaryButton} shadow-md`
                  : themeMode === 'light'
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    : `bg-black/60 text-slate-300 ${theme.borderSubtle} hover:text-white`
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              {expandAllLevels ? 'Modo Pestañas' : 'Expandir 4 Niveles'}
            </button>
          </div>
        </div>

        {/* Faction Switcher Ribbon */}
        <div className="mt-4 pt-3 border-t border-slate-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
              themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Facción para Prioridades & Combos:
            </span>
            {(['Templo', 'Necrópolis', 'Mazmorra', 'Foresta', 'Colmena', 'Cisma'] as const).map((fac) => {
              const isSelected = activeFaction === fac;
              const facTheme = getFactionTheme(fac, themeMode);
              return (
                <button
                  key={fac}
                  onClick={() => setActiveFaction(fac)}
                  className={`px-3 py-1 text-xs rounded-lg font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? `${facTheme.primaryButton} shadow-md text-white ring-1 ring-white/30 scale-105`
                      : themeMode === 'light'
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                        : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{fac}</span>
                  {isSelected && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowFactionProfile(!showFactionProfile)}
            className={`text-xs font-mono flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all cursor-pointer self-start sm:self-auto ${
              showFactionProfile
                ? themeMode === 'light'
                  ? 'bg-purple-50 text-purple-900 border-purple-300'
                  : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                : themeMode === 'light'
                  ? 'bg-slate-100 text-slate-600 border-slate-300'
                  : 'bg-black/40 text-slate-400 border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {showFactionProfile ? 'Ocultar Doctrina Mágica' : 'Ver Doctrina Mágica'}
            {showFactionProfile ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>

        {/* Faction Magic Doctrine & Affinities Panel */}
        {showFactionProfile && (
          <div className={`mt-4 rounded-xl p-4 border transition-all ${
            themeMode === 'light'
              ? 'bg-slate-50 border-slate-200 text-slate-800'
              : `bg-black/60 ${theme.borderSubtle} text-slate-300`
          }`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-3 border-b pb-3 border-slate-700/30">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-serif font-bold text-base ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Doctrina Mágica de {magicProfile.name}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  themeMode === 'light'
                    ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-semibold'
                    : 'bg-indigo-950/60 text-indigo-300 border-indigo-800/50'
                }`}>
                  Primaria: {magicProfile.primarySchool}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  themeMode === 'light'
                    ? 'bg-cyan-100 text-cyan-900 border-cyan-300 font-semibold'
                    : 'bg-cyan-950/60 text-cyan-300 border-cyan-800/50'
                }`}>
                  Secundaria: {magicProfile.secondarySchool}
                </span>
              </div>

              <div className={`text-xs font-mono ${themeMode === 'light' ? 'text-purple-900 font-semibold' : theme.textAccent}`}>
                Economía de Maná: {magicProfile.manaEconomyStrategy}
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-3">
              <strong className={themeMode === 'light' ? 'text-slate-900' : 'text-white'}>Estrategia Nuclear: </strong>
              {magicProfile.doctrine}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className={`p-2.5 rounded-lg border ${
                themeMode === 'light' ? 'bg-white border-amber-200' : 'bg-black/40 border-amber-900/40'
              }`}>
                <span className={`text-[10px] font-bold uppercase block mb-1 flex items-center gap-1 ${
                  themeMode === 'light' ? 'text-amber-900' : 'text-amber-400'
                }`}>
                  <Award className="w-3.5 h-3.5" />
                  Hechizos Magistrales Nivel 4 Prioritarios:
                </span>
                <ul className="space-y-1 text-[11px] font-sans">
                  {magicProfile.preferredMasterfulSpells.map((sp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-2.5 rounded-lg border ${
                themeMode === 'light' ? 'bg-white border-emerald-200' : 'bg-black/40 border-emerald-900/40'
              }`}>
                <span className={`text-[10px] font-bold uppercase block mb-1 flex items-center gap-1 ${
                  themeMode === 'light' ? 'text-emerald-900' : 'text-emerald-400'
                }`}>
                  <Target className="w-3.5 h-3.5" />
                  Ruta de Adquisición (Día 1 vs Late Game):
                </span>
                <div className="space-y-1.5 text-[11px] font-sans">
                  <div>
                    <strong className={themeMode === 'light' ? 'text-emerald-800' : 'text-emerald-300'}>Día 1-7 (Apertura): </strong>
                    <span>{magicProfile.day1EssentialSpells.join(', ')}</span>
                  </div>
                  <div>
                    <strong className={themeMode === 'light' ? 'text-purple-800' : 'text-purple-300'}>Win Condition (Late Game): </strong>
                    <span>{magicProfile.lateGameWinConditionSpells.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5 Canonical Magic Schools of Jadame Sigil Selector */}
        <div className="mt-4 pt-4 border-t border-slate-700/30">
          <SpellSchoolSigilSelector
            selectedSchool={selectedSchool}
            onSelectSchool={setSelectedSchool}
            activeFaction={activeFaction}
            spells={RECOMMENDED_SPELLS}
            themeMode={themeMode}
          />
        </div>

        {/* Secondary Filter controls */}
        <div className={`mt-3 pt-3 border-t flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 ${
          themeMode === 'light' ? 'border-slate-200' : theme.borderSubtle
        }`}>
          {/* Faction Meta Quick Toggle */}
          <button
            onClick={() => setFilterOnlyFactionMeta(!filterOnlyFactionMeta)}
            className={`px-3 py-1.5 text-xs rounded-lg font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              filterOnlyFactionMeta
                ? 'bg-amber-500 text-black border border-amber-300 shadow-md ring-2 ring-amber-400/40'
                : themeMode === 'light'
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  : 'bg-black/60 text-slate-300 border border-slate-800 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterOnlyFactionMeta ? 'fill-current' : 'text-amber-500'}`} />
            <span>⭐ Imprescindibles para {activeFaction}</span>
          </button>

          {/* Tier Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className={`font-mono text-[10px] uppercase ${themeMode === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-500'}`}>Tier:</span>
            {(['all', '1', '2', '3', '4', '5'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  selectedTier === t
                    ? 'bg-amber-600 text-white border border-amber-400/50 shadow-sm'
                    : themeMode === 'light'
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t === 'all' ? 'Todos' : `Tier ${t}`}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className={`font-mono text-[10px] uppercase ${themeMode === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-500'}`}>Tipo:</span>
            {(['all', 'Combate', 'Aventura / Mapa', 'Control de Masas', 'Daño Masivo', 'Soporte'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  selectedType === t
                    ? 'bg-indigo-700 text-white border border-indigo-400/50'
                    : themeMode === 'light'
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t === 'all' ? 'Todos' : t}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className={`font-mono text-[10px] uppercase ${themeMode === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-500'}`}>Prioridad:</span>
            {(['all', 'Imprescindible', 'Muy Alta', 'Alta'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  selectedPriority === p
                    ? 'bg-red-800 text-white border border-red-400/50'
                    : themeMode === 'light'
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p === 'all' ? 'Todas' : p}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          {(selectedSchool !== 'all' || selectedTier !== 'all' || selectedType !== 'all' || selectedPriority !== 'all' || filterOnlyFactionMeta || searchTerm) && (
            <button
              onClick={() => {
                setSelectedSchool('all');
                setSelectedTier('all');
                setSelectedType('all');
                setSelectedPriority('all');
                setFilterOnlyFactionMeta(false);
                setSearchTerm('');
              }}
              className="px-2.5 py-1 text-xs rounded-md font-mono text-amber-500 hover:text-amber-400 hover:underline shrink-0 cursor-pointer"
            >
              Limpiar Filtros
            </button>
          )}
        </div>
      </div>

      {/* View Mode Navigation Tabs: Grimoire / Scaling Table / Versus */}
      <div className={`p-1.5 rounded-2xl border flex items-center gap-1.5 overflow-x-auto no-scrollbar transition-colors ${
        themeMode === 'light'
          ? 'bg-slate-100/90 border-slate-300 shadow-inner'
          : 'bg-black/60 border-slate-800 shadow-inner'
      }`}>
        <button
          type="button"
          onClick={() => setSpellsViewMode('grimoire')}
          className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            spellsViewMode === 'grimoire'
              ? themeMode === 'light'
                ? 'bg-white text-purple-900 border border-purple-300 shadow-md ring-1 ring-purple-300/50'
                : `${theme.primaryButton} text-white shadow-md ring-1 ring-white/20`
              : themeMode === 'light'
                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-500" />
          <span>Grimorio Canónico ({filteredSpells.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSpellsViewMode('scaling_table')}
          className={`flex-1 min-w-[210px] py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            spellsViewMode === 'scaling_table'
              ? themeMode === 'light'
                ? 'bg-white text-amber-950 border border-amber-300 shadow-md ring-1 ring-amber-300/50'
                : 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md font-bold'
              : themeMode === 'light'
                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Table className="w-4 h-4 text-amber-500" />
          <span>Tabla de Escalado & Daño ({spellPower} SP)</span>
        </button>

        <button
          type="button"
          onClick={() => setSpellsViewMode('versus')}
          className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            spellsViewMode === 'versus'
              ? themeMode === 'light'
                ? 'bg-white text-indigo-900 border border-indigo-300 shadow-md ring-1 ring-indigo-300/50'
                : `${theme.primaryButton} text-white shadow-md ring-1 ring-white/20`
              : themeMode === 'light'
                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Swords className="w-4 h-4 text-red-500" />
          <span>Comparador 1 vs 1</span>
        </button>
      </div>

      {/* Persistent Interactive Spell Power Slider (1 to 30 SP) */}
      <SpellPowerSlider
        spellPower={spellPower}
        onSpellPowerChange={setSpellPower}
        activeFaction={activeFaction}
        themeMode={themeMode}
      />

      {/* SCALING DATA TABLE VIEW */}
      {spellsViewMode === 'scaling_table' && (
        <SpellScalingDataTable
          spells={RECOMMENDED_SPELLS}
          spellPower={spellPower}
          activeFaction={activeFaction}
          themeMode={themeMode}
          onSelectSpell={handleSelectSpellFromTable}
        />
      )}

      {/* 1 VS 1 VERSUS COMPARATOR VIEW */}
      {spellsViewMode === 'versus' && (
        <SpellVersusComparator
          spells={RECOMMENDED_SPELLS}
          spellPower={spellPower}
          activeFaction={activeFaction}
          themeMode={themeMode}
        />
      )}

      {/* CANONICAL GRIMOIRE VIEW */}
      {spellsViewMode === 'grimoire' && (
        <div className="space-y-6">

      {/* Mechanics & Upgrade Cost System Guide */}
      <div className={`border rounded-2xl p-5 backdrop-blur-md transition-colors duration-300 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md text-slate-800'
          : `bg-black/40 ${theme.border} ${theme.shadowAccent}`
      }`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Orbit className={`w-5 h-5 ${themeMode === 'light' ? 'text-purple-700' : theme.textAccent}`} />
            <h3 className={`font-serif font-bold text-sm sm:text-base uppercase tracking-wide ${
              themeMode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Sistema de Desbloqueo y Niveles 1 a 4 (Polvo Alquímico)
            </h3>
          </div>
          <button
            onClick={() => setShowMechanicsGuide(!showMechanicsGuide)}
            className={`text-xs font-mono flex items-center gap-1 ${themeMode === 'light' ? 'text-slate-600 hover:text-purple-900' : 'text-slate-400 hover:text-white'} transition-colors cursor-pointer`}
          >
            {showMechanicsGuide ? 'Ocultar Guía' : 'Mostrar Guía'}
            {showMechanicsGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showMechanicsGuide && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
            <div className={`rounded-xl p-3.5 space-y-1.5 border ${
              themeMode === 'light' ? 'bg-white border-cyan-200 shadow-sm' : 'bg-black/60 border-cyan-900/40'
            }`}>
              <div className={`flex items-center justify-between font-mono font-bold text-[11px] uppercase ${
                themeMode === 'light' ? 'text-cyan-900' : 'text-cyan-400'
              }`}>
                <span>1. Desbloqueo Base</span>
                <Coins className="w-3.5 h-3.5" />
              </div>
              <p className={`text-[11px] leading-relaxed ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                Construir la Cofradía desbloquea hechizos gratis al azar. También puedes comprarlos en el <strong>Observatorio</strong> gastando <strong>Puntos de Astrología</strong> u Oro + Cristales/Gemas/Mercurio.
              </p>
            </div>

            <div className={`rounded-xl p-3.5 space-y-1.5 border ${
              themeMode === 'light' ? 'bg-white border-amber-200 shadow-sm' : 'bg-black/60 border-amber-900/40'
            }`}>
              <div className={`flex items-center justify-between font-mono font-bold text-[11px] uppercase ${
                themeMode === 'light' ? 'text-amber-900' : 'text-amber-400'
              }`}>
                <span>2. Polvo Alquímico</span>
                <Gem className="w-3.5 h-3.5" />
              </div>
              <p className={`text-[11px] leading-relaxed ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                Cada subida de nivel de un hechizo requiere <strong>25 Polvo Alquímico (Alchemical Dust)</strong> + Oro y recursos raros. El polvo se consigue desmontando artefactos, en eventos de mapa o santuarios.
              </p>
            </div>

            <div className={`rounded-xl p-3.5 space-y-1.5 border ${
              themeMode === 'light' ? 'bg-white border-emerald-200 shadow-sm' : 'bg-black/60 border-emerald-900/40'
            }`}>
              <div className={`flex items-center justify-between font-mono font-bold text-[11px] uppercase ${
                themeMode === 'light' ? 'text-emerald-900' : 'text-emerald-400'
              }`}>
                <span>3. Cofradías Duplicadas</span>
                <Layers className="w-3.5 h-3.5" />
              </div>
              <p className={`text-[11px] leading-relaxed ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                Si construyes una 2ª, 3ª o 4ª Cofradía en otras ciudades y generan el mismo hechizo, <strong>se sube de nivel automáticamente sin gastar Polvo Alquímico</strong>.
              </p>
            </div>

            <div className={`rounded-xl p-3.5 space-y-1.5 border ${
              themeMode === 'light' ? 'bg-white border-red-200 shadow-sm' : 'bg-black/60 border-red-900/40'
            }`}>
              <div className={`flex items-center justify-between font-mono font-bold text-[11px] uppercase ${
                themeMode === 'light' ? 'text-red-900' : 'text-red-300'
              }`}>
                <span>4. Versión Magistral (Niv 4)</span>
                <Award className="w-3.5 h-3.5" />
              </div>
              <p className={`text-[11px] leading-relaxed ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                El <strong>Nivel 4 (Masterful)</strong> transforma el hechizo: <em>Lentitud Masiva</em> a todo el ejército, <em>Teletransporte con ataque inmediato</em>, o <em>Armageddon Supremo</em> sin fuego amigo a Dragones Negros.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Top 3 Faction Tactical Combos Section */}
      <div className={`border rounded-2xl p-5 backdrop-blur-md transition-colors duration-300 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md text-slate-800'
          : `bg-black/40 ${theme.border} ${theme.shadowAccent}`
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Swords className={`w-5 h-5 ${themeMode === 'light' ? 'text-amber-700' : 'text-amber-400'}`} />
              <h3 className={`font-serif font-bold text-base sm:text-lg uppercase tracking-wide ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                Top 3 Combos Mágicos Canónicos • {activeFaction}
              </h3>
            </div>
            <p className={`text-xs mt-0.5 ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              Secuencias tácticas optimizadas paso a paso para dominar combates y asedios en Jadame.
            </p>
          </div>

          {/* Combo Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {factionCombos.map((combo, idx) => (
              <button
                key={combo.id}
                onClick={() => setSelectedComboTab(idx)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  selectedComboTab === idx
                    ? `${theme.primaryButton} text-white shadow-md ring-1 ring-white/20`
                    : themeMode === 'light'
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      : 'bg-black/50 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>Combo {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Combo Detailed Card */}
        {factionCombos[selectedComboTab] && (() => {
          const combo = factionCombos[selectedComboTab];
          return (
            <div className={`rounded-xl p-4 sm:p-5 border transition-all ${
              themeMode === 'light'
                ? 'bg-gradient-to-br from-amber-50/70 via-purple-50/40 to-white border-amber-200 shadow-sm'
                : 'bg-gradient-to-br from-black/80 via-black/60 to-purple-950/20 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3 border-b pb-3 border-slate-700/30">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${
                    themeMode === 'light' ? 'bg-amber-100 border-amber-300' : 'bg-black/60 border-amber-500/40'
                  }`}>
                    {renderComboIcon(combo.iconType)}
                  </div>
                  <div>
                    <h4 className={`text-base sm:text-lg font-serif font-bold ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      {combo.title}
                    </h4>
                    <p className={`text-xs ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      {combo.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border font-semibold ${
                    themeMode === 'light'
                      ? 'bg-purple-100 text-purple-900 border-purple-300'
                      : 'bg-purple-950/60 text-purple-300 border-purple-800/50'
                  }`}>
                    Escuela: {combo.school}
                  </span>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border font-semibold ${
                    themeMode === 'light'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-amber-950/60 text-amber-300 border-amber-800/50'
                  }`}>
                    Fase: {combo.timing}
                  </span>
                </div>
              </div>

              {/* Key Spells Involved & Beneficiaries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs">
                <div className={`p-3 rounded-lg border ${
                  themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-black/50 border-slate-800'
                }`}>
                  <span className={`text-[10px] font-mono font-bold uppercase block mb-1.5 ${
                    themeMode === 'light' ? 'text-cyan-900' : 'text-cyan-400'
                  }`}>
                    🔮 Hechizos Clave del Combo:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {combo.keySpells.map((ks, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono border flex items-center gap-1.5 ${
                          themeMode === 'light'
                            ? 'bg-cyan-50 text-cyan-950 border-cyan-200 font-semibold'
                            : 'bg-cyan-950/40 text-cyan-200 border-cyan-800/40'
                        }`}
                      >
                        <Zap className="w-3 h-3 text-cyan-500" />
                        <strong>{ks.spellName}</strong>
                        <span className="text-[10px] opacity-75">({ks.manaCost} Maná)</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`p-3 rounded-lg border ${
                  themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-black/50 border-slate-800'
                }`}>
                  <span className={`text-[10px] font-mono font-bold uppercase block mb-1.5 ${
                    themeMode === 'light' ? 'text-amber-900' : 'text-amber-400'
                  }`}>
                    ⚔️ Unidades & Héroes Beneficiados:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {combo.beneficiaryUnits.map((u, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-0.5 rounded border font-sans ${
                          themeMode === 'light'
                            ? 'bg-amber-50 text-amber-950 border-amber-200'
                            : 'bg-amber-950/30 text-amber-200 border-amber-900/40'
                        }`}
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Execution Steps */}
              <div className="space-y-2 mb-3">
                <span className={`text-[11px] font-mono font-bold uppercase block flex items-center gap-1 ${
                  themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'
                }`}>
                  <Target className="w-3.5 h-3.5 text-amber-500" />
                  Secuencia de Ejecución Táctica (Turno a Turno):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {combo.executionSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                        themeMode === 'light'
                          ? 'bg-white/80 border-slate-200 text-slate-800'
                          : 'bg-black/40 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        themeMode === 'light' ? 'bg-purple-100 text-purple-900' : 'bg-purple-950/80 text-purple-300'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive Advantage Callout */}
              <div className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                themeMode === 'light'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-mono text-[11px] uppercase tracking-wider mb-0.5">
                    Ventaja Competitiva en el Meta de Olden Era:
                  </strong>
                  <p className="font-sans leading-relaxed">{combo.competitiveAdvantage}</p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 3 Combos Grid Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {factionCombos.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setSelectedComboTab(i)}
              className={`rounded-xl p-3 border transition-all cursor-pointer ${
                selectedComboTab === i
                  ? themeMode === 'light'
                    ? 'bg-amber-100/70 border-amber-400 shadow-sm ring-1 ring-amber-400'
                    : 'bg-amber-950/30 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                  : themeMode === 'light'
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    : 'bg-black/30 hover:bg-black/50 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-amber-500">Combo {i + 1}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                  themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-black/40 border-slate-800'
                }`}>
                  {c.timing}
                </span>
              </div>
              <h5 className={`text-xs font-serif font-bold truncate ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>
                {c.title.replace(/^Combo \d+: /, '')}
              </h5>
              <p className={`text-[11px] line-clamp-2 mt-1 ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {c.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Spells Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredSpells.map((spell) => {
          const isLearned = !!learnedSpells[spell.id];
          const factionPrioInfo = getFactionSpellPriority(spell.id, activeFaction);
          const effectivePriority = factionPrioInfo ? factionPrioInfo.priority : spell.priority;
          const isEssential = effectivePriority.includes('Imprescindible');
          const isVeryHigh = effectivePriority.includes('Muy Alta');
          const isNeutral = !!spell.isNeutral;
          const activeLevelNum = getSpellActiveLevel(spell.id);
          const activeLevel = spell.levels.find((l) => l.level === activeLevelNum) || spell.levels[0];

          const schoolColor =
            isNeutral
              ? themeMode === 'light'
                ? 'text-cyan-900 bg-cyan-100 border-cyan-300 font-semibold'
                : 'text-cyan-300 bg-cyan-950/70 border-cyan-500/60'
              : spell.school.includes('Sombras')
              ? themeMode === 'light'
                ? 'text-purple-900 bg-purple-100 border-purple-300 font-semibold'
                : 'text-purple-400 bg-purple-950/50 border-purple-800/50'
              : spell.school.includes('Arcana')
              ? themeMode === 'light'
                ? 'text-indigo-900 bg-indigo-100 border-indigo-300 font-semibold'
                : 'text-indigo-400 bg-indigo-950/50 border-indigo-800/50'
              : spell.school.includes('Luz')
              ? themeMode === 'light'
                ? 'text-amber-900 bg-amber-100 border-amber-300 font-semibold'
                : 'text-amber-400 bg-amber-950/50 border-amber-800/50'
              : spell.school.includes('Primigenia')
              ? themeMode === 'light'
                ? 'text-emerald-900 bg-emerald-100 border-emerald-300 font-semibold'
                : 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50'
              : themeMode === 'light'
                ? 'text-cyan-900 bg-cyan-100 border-cyan-300 font-semibold'
                : 'text-cyan-400 bg-cyan-950/50 border-cyan-800/50';

          return (
            <RunicGlyphAura
              key={spell.id}
              school={spell.school}
              isTier4={spell.tier === 4}
              isMasterful={activeLevelNum === 4}
              themeMode={themeMode}
              className="h-full"
            >
            <div
              className={`rounded-2xl p-5 border transition-all relative overflow-hidden backdrop-blur-sm flex flex-col justify-between h-full ${
                isLearned
                  ? themeMode === 'light'
                    ? 'bg-purple-50/90 border-purple-300 shadow-md ring-1 ring-purple-300'
                    : `${theme.bgBadge} ${theme.border} ${theme.shadowAccent}`
                  : isNeutral
                  ? themeMode === 'light'
                    ? 'bg-white border-cyan-300 hover:border-cyan-400 shadow-sm'
                    : 'bg-black/60 border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : isEssential
                  ? themeMode === 'light'
                    ? 'bg-white border-amber-300 hover:border-amber-400 shadow-sm ring-1 ring-amber-300/60'
                    : 'bg-black/60 border-amber-500/50 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.12)]'
                  : isVeryHigh
                  ? themeMode === 'light'
                    ? 'bg-white border-indigo-200 hover:border-indigo-300 shadow-sm'
                    : 'bg-black/60 border-indigo-500/40 hover:border-indigo-400'
                  : themeMode === 'light'
                    ? 'bg-white border-slate-200 hover:border-purple-300 shadow-sm'
                    : `bg-black/50 ${theme.borderSubtle} hover:border-amber-400/60`
              }`}
            >
              {/* Header with Title and Favorite Toggle */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <SmartSpellHoverCard
                        spell={spell}
                        currentSpellPower={spellPower}
                        activeFaction={activeFaction}
                        themeMode={themeMode}
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border cursor-help ${schoolColor}`}>
                          {spell.school}
                        </span>
                      </SmartSpellHoverCard>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        themeMode === 'light'
                          ? 'text-amber-900 bg-amber-50 border-amber-200 font-semibold'
                          : 'text-amber-400 bg-black/40 border-amber-900/40'
                      }`}>
                        Cofradía Tier {spell.tier}
                      </span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                        themeMode === 'light'
                          ? 'text-cyan-900 bg-cyan-50 border-cyan-200 font-semibold'
                          : 'text-cyan-300 bg-cyan-950/40 border-cyan-800/40'
                      }`}>
                        <Zap className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        {activeLevel.manaCost} Maná
                      </span>

                      {/* Live scaling calculated badge */}
                      {(() => {
                        const activeCalc = formatEffectWithSpellPower(activeLevel.effect, spellPower);
                        if (activeCalc.calculatedValue === null) return null;
                        return (
                          <SmartSpellHoverCard
                            spell={spell}
                            currentSpellPower={spellPower}
                            activeFaction={activeFaction}
                            themeMode={themeMode}
                          >
                            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border flex items-center gap-1 cursor-help hover:brightness-110 ${
                              themeMode === 'light'
                                ? 'text-amber-950 bg-amber-100 border-amber-300 shadow-sm'
                                : 'text-amber-300 bg-amber-950/60 border-amber-600/50 shadow-sm'
                            }`}>
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              {activeCalc.calculatedValue} {activeCalc.formula?.unit} (@ {spellPower} SP)
                            </span>
                          </SmartSpellHoverCard>
                        );
                      })()}

                      {/* Faction specific priority badge */}
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                        isEssential
                          ? 'bg-amber-500 text-black border-amber-300 font-bold'
                          : isVeryHigh
                          ? themeMode === 'light'
                            ? 'bg-purple-100 text-purple-900 border-purple-300 font-semibold'
                            : 'bg-purple-950/60 text-purple-300 border-purple-700/50'
                          : themeMode === 'light'
                            ? 'bg-slate-100 text-slate-700 border-slate-300'
                            : 'bg-black/50 text-slate-400 border-slate-800'
                      }`}>
                        {isEssential ? '⭐' : '🔷'} {effectivePriority} ({activeFaction})
                      </span>
                    </div>

                    <SmartSpellHoverCard
                      spell={spell}
                      currentSpellPower={spellPower}
                      activeFaction={activeFaction}
                      themeMode={themeMode}
                    >
                      <h3 className={`text-lg font-serif font-bold tracking-wide flex items-center gap-2 flex-wrap cursor-help hover:text-amber-500 transition-colors ${
                        themeMode === 'light' ? 'text-slate-900 hover:text-purple-700' : 'text-white'
                      }`}>
                        <span>{spell.name}</span>
                        <span className={`text-xs font-sans font-normal italic ${
                          themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>({spell.nameEn})</span>
                        {spell.masterfulName && (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            themeMode === 'light'
                              ? 'bg-amber-100 text-amber-950 border-amber-300 font-semibold'
                              : 'text-yellow-300 bg-yellow-950/50 border-yellow-700/50'
                          }`}>
                            {spell.masterfulName}
                          </span>
                        )}
                      </h3>
                    </SmartSpellHoverCard>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleSpellLearned(spell.id, e)}
                    className={`shrink-0 p-1 ${themeMode === 'light' ? 'text-purple-700 hover:text-purple-900' : theme.textAccent} hover:brightness-125 transition-colors cursor-pointer`}
                    title={isLearned ? 'Desmarcar de lista de prioritarios' : 'Marcar como prioritario / aprendido'}
                    aria-label="Marcar hechizo aprendido"
                  >
                    {isLearned ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 drop-shadow-sm" />
                    ) : (
                      <Star className={`w-6 h-6 ${isEssential ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-slate-500'}`} />
                    )}
                  </button>
                </div>

                {/* Priority, School Requirement, and Unlock Cost */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5 text-xs font-mono">
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light' ? 'bg-slate-50 border-slate-200' : `bg-black/50 ${theme.borderSubtle}`
                  }`}>
                    <span className={`text-[10px] uppercase block mb-0.5 ${themeMode === 'light' ? 'text-slate-500 font-semibold' : 'text-slate-400'}`}>Requisito de Escuela:</span>
                    <span className={`font-sans font-semibold text-[11px] ${themeMode === 'light' ? 'text-slate-900' : 'text-slate-200'}`}>
                      {spell.schoolRequirement}
                    </span>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    themeMode === 'light' ? 'bg-slate-50 border-slate-200' : `bg-black/50 ${theme.borderSubtle}`
                  }`}>
                    <span className={`text-[10px] uppercase block mb-0.5 ${themeMode === 'light' ? 'text-amber-800 font-semibold' : 'text-amber-400'}`}>
                      {spell.isNeutral || spell.unlockCost.gold === 0 ? 'Adquisición Neutral / Observatorio:' : 'Coste Desbloqueo Base:'}
                    </span>
                    <span className={`text-[11px] ${themeMode === 'light' ? 'text-amber-900 font-semibold' : 'text-amber-300'}`}>
                      {spell.isNeutral || spell.unlockCost.gold === 0 ? (
                        <span className="text-teal-700 dark:text-cyan-300 font-semibold">
                          {spell.unlockCost.observationPoints !== undefined
                            ? `${spell.unlockCost.observationPoints} Pts de Observación (0 Oro)`
                            : 'Sin definir (Pendiente de confirmación)'}
                        </span>
                      ) : (
                        <>
                          {spell.unlockCost.gold > 0 ? `${spell.unlockCost.gold.toLocaleString()} Oro` : ''}
                          {spell.unlockCost.crystals ? ` • ${spell.unlockCost.crystals} Cristales` : ''}
                          {spell.unlockCost.gems ? ` • ${spell.unlockCost.gems} Gemas` : ''}
                          {spell.unlockCost.mercury ? ` • ${spell.unlockCost.mercury} Mercurio` : ''}
                          {spell.unlockCost.astrologyPoints ? ` • ${spell.unlockCost.astrologyPoints} Pts Astrología` : ''}
                          {spell.unlockCost.insight ? ` • ${spell.unlockCost.insight} Percepción` : ''}
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Faction-Specific Tactical Synergy Callout */}
                <div className={`mb-4 p-3 rounded-xl border text-xs ${
                  factionPrioInfo
                    ? isEssential
                      ? themeMode === 'light'
                        ? 'bg-amber-50/80 border-amber-300 text-slate-800 shadow-sm'
                        : 'bg-gradient-to-r from-amber-950/30 to-black/50 border-amber-500/40 text-slate-200'
                      : themeMode === 'light'
                      ? 'bg-purple-50/70 border-purple-200 text-slate-800'
                      : `${theme.bgBadge} border ${theme.borderSubtle}`
                    : themeMode === 'light'
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-black/40 border-slate-800 text-slate-300'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <span className={`text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 ${
                      isEssential
                        ? themeMode === 'light' ? 'text-amber-900' : 'text-amber-300'
                        : themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Sinergia Táctica Canónica con {activeFaction}:
                    </span>

                    {factionPrioInfo?.keyUnitsBenefited && (
                      <div className="flex items-center gap-1 flex-wrap">
                        {factionPrioInfo.keyUnitsBenefited.map((u, i) => (
                          <span
                            key={i}
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                              themeMode === 'light'
                                ? 'bg-white border-amber-200 text-slate-700'
                                : 'bg-black/60 border-amber-900/40 text-amber-200'
                            }`}
                          >
                            {u}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className={`leading-relaxed font-sans text-xs ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                    {factionPrioInfo ? factionPrioInfo.synergyTip : spell.tacticalUtility}
                  </p>
                </div>

                {/* 4 UPGRADE LEVELS SECTION */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-mono font-bold uppercase flex items-center gap-1.5 ${
                      themeMode === 'light' ? 'text-cyan-900' : 'text-cyan-300'
                    }`}>
                      <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      Niveles de Mejora (1 a 4 Magistral) & Costes de Recursos:
                    </span>
                    {!expandAllLevels && (
                      <span className={`text-[10px] font-mono ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
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
                              ? themeMode === 'light'
                                ? 'bg-amber-50 border-amber-300 shadow-sm text-slate-800'
                                : 'bg-gradient-to-r from-amber-950/40 via-black/40 to-black/60 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                              : lvl.level === 3
                              ? themeMode === 'light'
                                ? 'bg-purple-50/60 border-purple-200'
                                : `${theme.bgBadge} ${theme.borderSubtle}`
                              : lvl.level === 2
                              ? themeMode === 'light'
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-slate-900/60 border-slate-800'
                              : themeMode === 'light'
                                ? 'bg-white border-slate-200'
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
                              <span className={`text-[11px] font-semibold ${
                                themeMode === 'light' ? 'text-cyan-900' : 'text-cyan-300'
                              }`}>
                                {lvl.manaCost} Maná
                              </span>
                            </div>

                            {/* Resource Upgrade Cost */}
                            <div className={`text-[10px] px-2 py-0.5 rounded border flex items-center gap-1 font-sans ${
                              themeMode === 'light'
                                ? 'text-amber-900 bg-amber-50 border-amber-200 font-semibold'
                                : 'text-amber-300 bg-black/50 border-amber-900/40'
                            }`}>
                              <Gem className="w-3 h-3 text-amber-500" />
                              {lvl.level === 1 ? (
                                <span className={themeMode === 'light' ? 'text-slate-600 font-mono' : 'text-slate-400 font-mono'}>
                                  {spell.isNeutral
                                    ? (lvl.upgradeCost.observationPoints !== undefined
                                        ? `${lvl.upgradeCost.observationPoints} Pts de Observación (Confirmado)`
                                        : 'Sin definir (Pendiente de confirmación)')
                                    : 'Desbloqueo Base'}
                                </span>
                              ) : (
                                <span>
                                  {spell.isNeutral ? (
                                    <span className="font-semibold text-teal-700 dark:text-cyan-300">
                                      {lvl.upgradeCost.observationPoints !== undefined || spell.unlockCost.observationPoints !== undefined
                                        ? '+1 Punto de Observación adicional'
                                        : 'Sin definir (Pendiente de confirmación)'}
                                    </span>
                                  ) : (
                                    <>
                                      <strong>{lvl.upgradeCost.dust} Polvo Alquímico</strong> + {lvl.upgradeCost.gold.toLocaleString()} Oro
                                      {lvl.upgradeCost.rareResources ? ` + ${lvl.upgradeCost.rareResources}` : ''}
                                      {lvl.upgradeCost.insight ? ` + ${lvl.upgradeCost.insight} Percepción` : ''}
                                    </>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expanded Level Effect with Live Scaling */}
                          {(() => {
                            const lvlCalc = formatEffectWithSpellPower(lvl.effect, spellPower);
                            return (
                              <div className="space-y-1 mb-1.5">
                                <p className={`text-xs font-sans leading-relaxed ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                                  {lvlCalc.textWithEvaluation}
                                </p>
                                {lvlCalc.calculatedValue !== null && lvlCalc.formula && (
                                  <div className={`p-1.5 px-2 rounded-md border text-[11px] font-mono flex items-center justify-between gap-2 ${
                                    themeMode === 'light'
                                      ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                                      : 'bg-amber-950/30 border-amber-900/40 text-amber-300'
                                  }`}>
                                    <span className="flex items-center gap-1 font-bold">
                                      <Zap className="w-3 h-3 text-amber-500" />
                                      {lvlCalc.calculatedValue} {lvlCalc.formula.unit}
                                    </span>
                                    <span className="text-[10px] opacity-75">
                                      ({lvlCalc.formula.base} + {lvlCalc.formula.multiplier} × {spellPower} SP)
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          <div className={`text-[11px] font-mono px-2 py-1 rounded border flex items-start gap-1.5 ${
                            themeMode === 'light'
                              ? 'text-purple-900 bg-white border-slate-200'
                              : `${theme.textAccent} bg-black/40 ${theme.borderSubtle}`
                          }`}>
                            <span className="text-cyan-600 dark:text-cyan-400 font-bold">★ Mejora Clave:</span>
                            <span className={`font-sans ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{lvl.keyBonus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* TABBED VIEW: Interactive level switcher (Level 1, 2, 3, 4) */
                    <div className={`rounded-xl p-3.5 border space-y-3 ${
                      themeMode === 'light' ? 'bg-slate-50/80 border-slate-200' : `bg-black/60 ${theme.borderSubtle}`
                    }`}>
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
                                    ? 'bg-amber-500 text-black border border-amber-300 shadow-sm'
                                    : lvl.level === 3
                                    ? `${theme.primaryButton} text-white border border-current shadow-sm`
                                    : lvl.level === 2
                                    ? 'bg-indigo-600 text-white border border-indigo-400'
                                    : 'bg-slate-700 text-white border border-slate-500'
                                  : themeMode === 'light'
                                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                      <div className={`p-3 rounded-lg border space-y-2 ${
                        themeMode === 'light' ? 'bg-white border-slate-200 shadow-sm' : `bg-black/40 ${theme.borderSubtle}`
                      }`}>
                        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-bold text-xs ${themeMode === 'light' ? 'text-slate-900' : 'text-white'}`}>
                              {activeLevel.title}
                            </span>
                            <span className={`font-mono text-xs px-2 py-0.5 rounded border ${
                              themeMode === 'light'
                                ? 'text-cyan-900 bg-cyan-50 border-cyan-200 font-semibold'
                                : 'text-cyan-300 bg-cyan-950/60 border-cyan-800/50'
                            }`}>
                              {activeLevel.manaCost} Maná
                            </span>
                          </div>

                          {/* Upgrade Cost */}
                          <div className={`text-[11px] px-2.5 py-1 rounded border font-mono flex items-center gap-1.5 ${
                            themeMode === 'light'
                              ? 'text-amber-900 bg-amber-50 border-amber-200 font-semibold'
                              : 'text-amber-300 bg-amber-950/40 border-amber-800/40'
                          }`}>
                            <Gem className="w-3 h-3 text-amber-500" />
                            {activeLevel.level === 1 ? (
                              <span className={themeMode === 'light' ? 'text-slate-600 font-sans' : 'text-slate-300 font-sans'}>
                                {spell.isNeutral
                                  ? (activeLevel.upgradeCost.observationPoints !== undefined
                                      ? `${activeLevel.upgradeCost.observationPoints} Pts de Observación (Confirmado)`
                                      : 'Sin definir (Pendiente de confirmación)')
                                  : 'Desbloqueo Base'}
                              </span>
                            ) : (
                              <span>
                                {spell.isNeutral ? (
                                  <span className="font-semibold text-teal-700 dark:text-cyan-300">
                                    {activeLevel.upgradeCost.observationPoints !== undefined || spell.unlockCost.observationPoints !== undefined
                                      ? '+1 Punto de Observación adicional'
                                      : 'Sin definir (Pendiente de confirmación)'}
                                  </span>
                                ) : (
                                  <>
                                    <strong>{activeLevel.upgradeCost.dust} Polvo Alquímico</strong> + {activeLevel.upgradeCost.gold.toLocaleString()} Oro
                                    {activeLevel.upgradeCost.rareResources ? ` + ${activeLevel.upgradeCost.rareResources}` : ''}
                                    {activeLevel.upgradeCost.insight ? ` + ${activeLevel.upgradeCost.insight} Percepción` : ''}
                                  </>
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Effect description with live formula evaluation */}
                        {(() => {
                          const activeLevelCalc = formatEffectWithSpellPower(activeLevel.effect, spellPower);
                          return (
                            <div className="space-y-1.5">
                              <p className={`text-xs font-sans leading-relaxed ${themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                                {activeLevelCalc.textWithEvaluation}
                              </p>
                              {activeLevelCalc.calculatedValue !== null && activeLevelCalc.formula && (
                                <div className={`p-2 rounded-lg border text-xs font-mono flex items-center justify-between gap-2 flex-wrap ${
                                  themeMode === 'light'
                                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                                    : 'bg-amber-950/40 border-amber-800/40 text-amber-300'
                                }`}>
                                  <span className="flex items-center gap-1.5 font-bold">
                                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                    <span>Escalado a {spellPower} Poder:</span>
                                    <strong className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                                      {activeLevelCalc.calculatedValue} {activeLevelCalc.formula.unit}
                                    </strong>
                                  </span>
                                  <span className="text-[10px] opacity-80 font-sans">
                                    Base {activeLevelCalc.formula.base} + ({activeLevelCalc.formula.multiplier} × {spellPower} SP)
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* Key Advantage */}
                        <div className={`text-[11px] font-mono p-2 rounded border flex items-start gap-1.5 ${
                          themeMode === 'light'
                            ? 'text-purple-900 bg-purple-50/50 border-purple-200'
                            : `${theme.textAccent} ${theme.bgBadge} ${theme.borderSubtle}`
                        }`}>
                          <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">★ Ventaja de Nivel:</span>
                          <span className={`font-sans ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{activeLevel.keyBonus}</span>
                        </div>

                        {/* Alternate Guild Condition */}
                        {activeLevel.upgradeCost.guildCondition && (
                          <div className={`text-[10px] font-mono ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                            <span className={themeMode === 'light' ? 'text-amber-800 font-semibold' : 'text-amber-400 font-semibold'}>Alternativa: </span>
                            <span>{activeLevel.upgradeCost.guildCondition}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Where to learn footer */}
              <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 flex-wrap text-[11px] ${
                themeMode === 'light' ? 'border-slate-200 text-slate-600' : `${theme.borderSubtle} text-slate-400`
              }`}>
                <div>
                  <span className={`font-mono uppercase text-[10px] ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>Dónde aprender: </span>
                  <span className={themeMode === 'light' ? 'text-slate-800' : 'text-slate-300'}>{spell.whereToLearn}</span>
                </div>
                <div className={`font-mono text-[10px] ${themeMode === 'light' ? 'text-amber-900 font-semibold' : 'text-amber-400'}`}>
                  Fórmula: {spell.unlockCost.formula}
                </div>
              </div>
            </div>
            </RunicGlyphAura>
          );
        })}
        </div>
        </div>
      )}
    </div>
  );
};
