import React, { useState } from 'react';
import {
  FactionId,
  FACTIONS_METADATA,
  getFactionTheme,
  getBuildStepsForFaction,
  getUnitsForFaction,
  getFactionLawsForFaction,
} from '../../../data/factionDataProvider';
import { OFFICIAL_SPELLS_DATA } from '../../../data/spellsData';
import { getFactionSpellPriority, getFactionMagicProfile } from '../../../data/factionSpellData';
import { useStickyState } from '../../../utils/useStickyState';
import {
  X,
  Maximize2,
  Minimize2,
  Calendar,
  Swords,
  BookOpen,
  Scroll,
  CheckCircle2,
  Circle,
  Coins,
  Castle,
  Sparkles,
  Zap,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  PanelRightClose,
} from 'lucide-react';

interface TacticalCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFaction: FactionId;
  onSelectFaction: (faction: FactionId) => void;
  onNavigateToDay?: (day: number) => void;
  themeMode?: 'dark' | 'light';
}

export const TacticalCheatSheet: React.FC<TacticalCheatSheetProps> = ({
  isOpen,
  onClose,
  selectedFaction,
  onSelectFaction,
  onNavigateToDay,
  themeMode = 'dark',
}) => {
  const [displayMode, setDisplayMode] = useState<'drawer' | 'modal' | 'fullscreen'>('drawer');
  const [activeSection, setActiveSection] = useState<'opening' | 'initiative' | 'magic' | 'laws'>('opening');
  const [unitSort, setUnitSort] = useState<'initiative_desc' | 'speed_desc' | 'tier_asc'>('initiative_desc');
  const [completedDays, setCompletedDays] = useStickyState<Record<number, boolean>>(
    {},
    `planner_completed_days_${selectedFaction}`
  );

  const theme = getFactionTheme(selectedFaction, themeMode);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const openingSteps = getBuildStepsForFaction(selectedFaction).slice(0, 7);
  const units = getUnitsForFaction(selectedFaction);
  const laws = getFactionLawsForFaction(selectedFaction).slice(0, 4);
  const magicProfile = getFactionMagicProfile(selectedFaction);

  if (!isOpen) return null;

  const factionList: FactionId[] = ['Mazmorra', 'Templo', 'Foresta', 'Necrópolis', 'Colmena', 'Cisma'];

  const toggleDayCheck = (day: number) => {
    setCompletedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Sort units for tactical turn order comparison
  const sortedUnits = [...units].sort((a, b) => {
    const aBaseStats = a.variants?.base?.stats || { initiative: 10, speed: a.speed || 5 };
    const bBaseStats = b.variants?.base?.stats || { initiative: 10, speed: b.speed || 5 };

    if (unitSort === 'initiative_desc') {
      return (bBaseStats.initiative || 0) - (aBaseStats.initiative || 0);
    }
    if (unitSort === 'speed_desc') {
      return (bBaseStats.speed || 0) - (aBaseStats.speed || 0);
    }
    return (a.tier || 1) - (b.tier || 1);
  });

  // Top meta spells for faction
  const metaSpells = OFFICIAL_SPELLS_DATA.filter((sp) => {
    const prio = getFactionSpellPriority(sp.id, selectedFaction);
    return (
      prio &&
      (prio.priority === 'Imprescindible (P1)' ||
        prio.priority === 'Muy Alta (P2)' ||
        prio.priority === 'Alta (P3)')
    );
  }).slice(0, 4);

  // Layout container classes based on displayMode
  const containerClasses =
    displayMode === 'fullscreen'
      ? 'fixed inset-0 z-50 p-3 sm:p-6 overflow-hidden flex flex-col'
      : displayMode === 'modal'
      ? 'fixed inset-4 sm:inset-10 z-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col border-2'
      : 'fixed top-0 right-0 bottom-0 w-full sm:w-[540px] md:w-[620px] z-50 shadow-2xl overflow-hidden flex flex-col border-l-2';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tactical-sheet-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${containerClasses} transition-all duration-300 ${
          themeMode === 'light'
            ? 'bg-slate-50 text-slate-900 border-slate-300'
            : 'bg-[#0f0d16] text-slate-100 border-slate-800'
        }`}
        style={{
          borderColor: theme.hexPrimary,
        }}
      >
        {/* TOP BAR: Title, Faction Switcher [1-6], Display Mode, Close */}
        <div
          className={`p-3 sm:p-4 border-b flex flex-col gap-2.5 ${
            themeMode === 'light' ? 'bg-white border-slate-200' : 'bg-black/50 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shadow-md shrink-0"
                style={{
                  backgroundColor: `${theme.hexPrimary}25`,
                  color: theme.hexPrimary,
                  border: `1px solid ${theme.hexPrimary}60`,
                }}
              >
                <Zap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2
                    id="tactical-sheet-title"
                    className="text-sm sm:text-base font-serif font-bold uppercase tracking-tight text-white dark:text-white truncate"
                  >
                    Ficha Táctica: <span style={{ color: theme.hexPrimary }}>{selectedFaction}</span>
                  </h2>
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded border hidden sm:inline-block font-bold"
                    style={{
                      borderColor: `${theme.hexPrimary}50`,
                      color: theme.hexPrimary,
                      backgroundColor: `${theme.hexPrimary}15`,
                    }}
                  >
                    Segunda Pantalla
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono truncate flex items-center gap-2">
                  <span>Oro: <strong className="text-yellow-400">{meta.startingGold}</strong></span>
                  <span>•</span>
                  <span className="truncate">{meta.primaryMechanic}</span>
                </div>
              </div>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() =>
                  setDisplayMode((prev) =>
                    prev === 'drawer' ? 'modal' : prev === 'modal' ? 'fullscreen' : 'drawer'
                  )
                }
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Cambiar Modo de Vista (Lateral / Modal / Pantalla Completa)"
                aria-label="Cambiar tamaño de ventana"
              >
                {displayMode === 'fullscreen' ? (
                  <Minimize2 className="w-4 h-4" />
                ) : displayMode === 'modal' ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Layers className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Cerrar Ficha Táctica (Esc)"
                aria-label="Cerrar ficha táctica"
              >
                {displayMode === 'drawer' ? (
                  <PanelRightClose className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Quick Faction Selector Buttons (1-6) */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
            {factionList.map((fId, idx) => {
              const isCurrent = selectedFaction === fId;
              const fTheme = getFactionTheme(fId, themeMode);
              return (
                <button
                  key={fId}
                  onClick={() => onSelectFaction(fId)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 bg-black/30 border-slate-800'
                  }`}
                  style={{
                    backgroundColor: isCurrent ? fTheme.hexPrimary : undefined,
                    borderColor: isCurrent ? fTheme.hexPrimary : undefined,
                  }}
                >
                  <span className="opacity-70 text-[9px]">[{idx + 1}]</span>
                  <span>{fId}</span>
                </button>
              );
            })}
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1 border-t border-slate-800/60 pt-2 text-xs font-mono">
            <button
              onClick={() => setActiveSection('opening')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSection === 'opening'
                  ? 'bg-amber-600/90 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-yellow-400" />
              <span>Día 1-7 ({Object.keys(completedDays).filter((k) => Number(k) <= 7 && completedDays[Number(k)]).length}/7)</span>
            </button>

            <button
              onClick={() => setActiveSection('initiative')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSection === 'initiative'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-cyan-400" />
              <span>Iniciativa & Hex</span>
            </button>

            <button
              onClick={() => setActiveSection('magic')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSection === 'magic'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Grimorio Meta</span>
            </button>

            <button
              onClick={() => setActiveSection('laws')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSection === 'laws'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Scroll className="w-3.5 h-3.5 text-emerald-400" />
              <span>Leyes</span>
            </button>
          </div>
        </div>

        {/* MAIN BODY: ACTIVE SECTION CONTENT */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {/* SECTION 1: APERTURA DÍA 1 AL 7 (BUILD ORDER EXPRESS) */}
          {activeSection === 'opening' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="font-bold uppercase tracking-wider text-slate-300">
                  Secuencia Canónica Semana 1 (Día 1 al 7)
                </span>
                <button
                  onClick={() => {
                    const reset: Record<number, boolean> = { ...completedDays };
                    for (let i = 1; i <= 7; i++) delete reset[i];
                    setCompletedDays(reset);
                  }}
                  className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  Desmarcar Semana 1
                </button>
              </div>

              {openingSteps.map((step) => {
                const isDone = !!completedDays[step.day];
                return (
                  <div
                    key={step.day}
                    onClick={() => toggleDayCheck(step.day)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isDone
                        ? themeMode === 'light'
                          ? 'bg-emerald-50/80 border-emerald-300 text-slate-700'
                          : 'bg-emerald-950/20 border-emerald-800/60 text-slate-300'
                        : themeMode === 'light'
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-black/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDayCheck(step.day);
                      }}
                      className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
                      aria-label={`Marcar Día ${step.day}`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${theme.hexPrimary}20`,
                              color: theme.hexPrimary,
                            }}
                          >
                            Día {step.day}
                          </span>
                          <h4
                            className={`text-xs font-serif font-bold uppercase ${
                              isDone ? 'line-through text-slate-400' : 'text-white dark:text-white'
                            }`}
                          >
                            {step.building}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-yellow-400 font-bold">
                          <Coins className="w-3 h-3" />
                          <span>{step.cost.gold.toLocaleString()} Oro</span>
                          {step.cost.wood && <span className="text-emerald-400">+{step.cost.wood}M</span>}
                          {step.cost.ore && <span className="text-slate-300">+{step.cost.ore}P</span>}
                          {step.cost.gems && <span className="text-cyan-300">+{step.cost.gems}G</span>}
                          {step.cost.crystal && <span className="text-purple-300">+{step.cost.crystal}C</span>}
                          {step.cost.mercury && <span className="text-red-300">+{step.cost.mercury}Hg</span>}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 font-sans leading-snug line-clamp-2">
                        {step.heroActions[0] || step.criticalTip}
                      </p>

                      {step.combatTactic && (
                        <div className="mt-1.5 text-[10px] font-mono text-cyan-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-cyan-900/40">
                          <Swords className="w-3 h-3 shrink-0 text-cyan-400" />
                          <span className="truncate">{step.combatTactic}</span>
                        </div>
                      )}
                    </div>

                    {onNavigateToDay && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToDay(step.day);
                          onClose();
                        }}
                        className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                        title="Ver en Cronograma Detallado"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTION 2: MATRIZ DE INICIATIVA Y VELOCIDAD (COMBATE HEXAGONAL) */}
          {activeSection === 'initiative' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold uppercase tracking-wider">
                  Orden de Turnos en Cuadrícula Hexagonal
                </span>
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-slate-400">Ordenar por:</span>
                  <button
                    onClick={() => setUnitSort('initiative_desc')}
                    className={`px-2 py-0.5 rounded border font-mono ${
                      unitSort === 'initiative_desc'
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'text-slate-400 border-slate-700'
                    }`}
                  >
                    Iniciativa
                  </button>
                  <button
                    onClick={() => setUnitSort('speed_desc')}
                    className={`px-2 py-0.5 rounded border font-mono ${
                      unitSort === 'speed_desc'
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'text-slate-400 border-slate-700'
                    }`}
                  >
                    Velocidad
                  </button>
                  <button
                    onClick={() => setUnitSort('tier_asc')}
                    className={`px-2 py-0.5 rounded border font-mono ${
                      unitSort === 'tier_asc'
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'text-slate-400 border-slate-700'
                    }`}
                  >
                    Tier
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {sortedUnits.map((u) => {
                  const baseStats = u.variants?.base?.stats || {
                    hp: 15,
                    attack: 5,
                    defense: 5,
                    damage: '2-4',
                    speed: u.speed || 5,
                    initiative: 10,
                    weeklyGrowth: 15,
                  };
                  const branchAStats = u.variants?.branchA?.stats;
                  const maxInit = 16;
                  const initPercent = Math.min(100, Math.round(((baseStats.initiative || 10) / maxInit) * 100));

                  return (
                    <div
                      key={u.tier}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 ${
                        themeMode === 'light'
                          ? 'bg-white border-slate-200'
                          : 'bg-black/40 border-slate-800/80'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-sm"
                            style={{ backgroundColor: theme.hexPrimary }}
                          >
                            T{u.tier}
                          </span>
                          <h4 className="text-xs font-serif font-bold text-white dark:text-white truncate">
                            {u.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono truncate hidden sm:inline">
                            ({u.role})
                          </span>
                        </div>

                        {/* Initiative Visual Bar */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-400 w-14 shrink-0">Iniciativa:</span>
                          <div className="flex-1 bg-black/60 h-2 rounded-full overflow-hidden border border-slate-700/60 max-w-[140px]">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${initPercent}%`,
                                backgroundColor:
                                  baseStats.initiative >= 12
                                    ? '#ec4899'
                                    : baseStats.initiative >= 10
                                    ? '#a855f7'
                                    : '#3b82f6',
                              }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-purple-300">
                            {baseStats.initiative}
                            {branchAStats && branchAStats.initiative !== baseStats.initiative && (
                              <span className="text-[10px] text-amber-400 ml-1">
                                (↑{branchAStats.initiative})
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Speed (Movement on Hex) and HP */}
                      <div className="text-right shrink-0 font-mono">
                        <div className="text-xs font-bold text-cyan-300 flex items-center justify-end gap-1">
                          <span>{baseStats.speed} hex</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          HP: <strong className="text-slate-200">{baseStats.hp}</strong> | Daño: <strong className="text-slate-200">{baseStats.damage}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 3: GRIMORIO META & RECORDATORIOS DE COFRADÍA */}
          {activeSection === 'magic' && (
            <div className="space-y-3">
              {/* Cofradía canonical cost formula */}
              <div
                className={`p-3 rounded-xl border text-xs font-mono space-y-1.5 ${
                  themeMode === 'light'
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                    : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold uppercase text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Costes Canónicos de Cofradía & Observatorio</span>
                </div>
                <div className="text-[11px] font-sans text-slate-300 leading-snug">
                  • <strong>Desbloqueo Nivel</strong>: <code>Tier × (2 Cristales, 2 Gemas, 2 Mercurio) + Oro</code>
                </div>
                <div className="text-[11px] font-sans text-slate-300 leading-snug">
                  • <strong>Progresión Polvo Alquímico</strong>: Nivel 1 (0 Polvo) → Nivel 2 (25 Polvo + 1.000 Oro) → Nivel 3 (25 Polvo + 1.500 Oro + 2 Raros) → Nivel 4 Magistral (25 Polvo + 2.000 Oro + 4 Raros).
                </div>
              </div>

              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Hechizos Imprescindibles para {selectedFaction}
              </div>

              <div className="space-y-2">
                {metaSpells.map((spell) => {
                  const prio = getFactionSpellPriority(spell.id, selectedFaction);
                  return (
                    <div
                      key={spell.id}
                      className={`p-3 rounded-xl border ${
                        themeMode === 'light'
                          ? 'bg-white border-slate-200'
                          : 'bg-black/40 border-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white"
                            style={{ backgroundColor: theme.hexPrimary }}
                          >
                            Tier {spell.tier}
                          </span>
                          <h4 className="text-xs font-serif font-bold text-white dark:text-white">
                            {spell.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({spell.school})
                          </span>
                        </div>

                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {spell.levels[0]?.manaCost || 5} Maná
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 font-sans leading-snug mb-1.5">
                        {prio?.synergyTip || spell.tacticalUtility || spell.effect}
                      </p>

                      <div className="text-[10px] font-mono text-amber-300 bg-amber-950/30 px-2 py-1 rounded border border-amber-900/40 flex items-center justify-between">
                        <span>Efecto Base (N1): {spell.levels[0]?.effect || '-'}</span>
                        <span className="font-bold text-amber-400">N4: {spell.levels[3]?.effect || '-'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 4: LEYES CÍVICAS PRIORITARIAS */}
          {activeSection === 'laws' && (
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Leyes Cívicas Prioritarias para {selectedFaction}
              </div>

              <div className="space-y-2">
                {laws.map((law) => (
                  <div
                    key={law.id}
                    className={`p-3 rounded-xl border ${
                      themeMode === 'light'
                        ? 'bg-white border-slate-200'
                        : 'bg-black/40 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
                          {law.category}
                        </span>
                        <h4 className="text-xs font-serif font-bold text-white dark:text-white">
                          {law.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        Tier {law.tier} • {law.costLaws} Puntos
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-sans leading-snug mb-1">
                      {law.effect || law.tacticalImpact || (law.ranks && law.ranks[0]?.effect) || 'Mejora cívica estratégica para la facción.'}
                    </p>

                    <div className="text-[10px] font-mono text-emerald-300 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/40">
                      {law.ranks && law.ranks[0]
                        ? `Rango 1: ${law.ranks[0].effect}`
                        : law.synergy
                        ? `Sinergia: ${law.synergy}`
                        : `Desbloqueo recomendado: ${law.recommendedUnlockTime || 'Semana 1-2'}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER: Status and Quick Advice */}
        <div
          className={`p-3 border-t flex items-center justify-between text-[11px] font-mono ${
            themeMode === 'light' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-black/60 border-slate-800 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.hexPrimary }} />
            <span>Ficha Táctica Competitiva Activa</span>
          </div>
          <span className="text-slate-400">Atajo: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 text-[10px]">C</kbd></span>
        </div>
      </div>
    </div>
  );
};
