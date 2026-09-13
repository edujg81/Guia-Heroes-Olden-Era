import React, { useState } from 'react';
import { BuildStep } from '../types';
import { FactionId, getBuildStepsForFaction, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { getOpponentTacticForDay } from '../data/dungeonOpponentTactics';
import { WaxSealBadge } from './ui/WaxSealBadge';
import { InteractivePlannerTimeline } from './ui/InteractivePlannerTimeline';
import { BuildResourceCalculator } from './ui/BuildResourceCalculator';
import { useStickyState } from '../utils/useStickyState';
import {
  CheckCircle2,
  Circle,
  Compass,
  Swords,
  Lightbulb,
  Sparkles,
  Filter,
  GitBranch,
  Calendar,
  ExternalLink,
  RotateCcw,
  ShieldAlert,
  Bot,
  UserCheck,
  Flame,
  AlertTriangle,
  X,
  Check,
  Flag,
  Coins,
  Trees,
  Shield,
  Gem,
  Lock,
  Castle,
} from 'lucide-react';

interface DayByDayPlannerProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
  selectedDay?: number;
  onSelectDay?: (day: number) => void;
}

// Canonical resource styling strictly aligned with BuildResourceCalculator.tsx (Cost Calculator)
export const RESOURCE_CALC_STYLES = {
  gold: { label: 'Oro', text: 'text-yellow-400', badge: 'bg-yellow-950/50 border-yellow-900/50 text-yellow-400' },
  wood: { label: 'Madera', text: 'text-emerald-400', badge: 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400' },
  ore: { label: 'Mineral', text: 'text-slate-300', badge: 'bg-slate-900/60 border-slate-700 text-slate-300' },
  gems: { label: 'Gemas', text: 'text-cyan-300', badge: 'bg-cyan-950/50 border-cyan-900/50 text-cyan-300' },
  crystal: { label: 'Cristal', text: 'text-purple-300', badge: 'bg-purple-950/50 border-purple-900/50 text-purple-300' },
  mercury: { label: 'Mercurio', text: 'text-red-300', badge: 'bg-red-950/50 border-red-900/50 text-red-300' },
  alchemicalDust: { label: 'Polvo', text: 'text-blue-300', badge: 'bg-blue-950/50 border-blue-900/50 text-blue-300' },
} as const;

/**
 * Sanitiza cualquier texto de edificio o título para garantizar que se muestre
 * exclusivamente en castellano, eliminando cualquier nombre o sufijo residual en inglés.
 */
export function cleanSpanishName(text: string): string {
  if (!text) return '';
  return text
    .replace(/\s*\((?:Marksman|Austringer|Swordsman|Crusader|Zealot|Griffins|Angels|Treasury|Capitol|Mage\s*Guild|Fort|Citadel|Artifact\s*Merchant|Resource\s*Silo|Town\s*Hall|City\s*Hall)\)/gi, '')
    .replace(/\s*\([A-Za-z0-9\s/'’\-_&+]+\)/g, (match) => {
      if (/^\s*\((?:Opción|Alternativa|Día|Nivel|Tier|\+\d|\d+|Oro|Gemas|Cristal|Mercurio|Capital|Monumento|Segunda|Tercera|Fuerte|Ciudadela|Fortificaciones)/i.test(match)) {
        return match;
      }
      if (/(?:Treasury|Capitol|Mage|Guild|Fort|Citadel|Merchant|Silo|Branch|Marksman|Swordsman|Swarm|Hive|Temple)/i.test(match)) {
        return '';
      }
      return match;
    })
    .replace(/\b(Treasury|Capitol|Mage Guild|Fort|Citadel|Artifact Merchant|Resource Silo|Marksman|Austringer|Swordsman|Crusader|Zealot|Griffins|Angels|Town Hall|City Hall)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export const DayByDayPlanner: React.FC<DayByDayPlannerProps> = ({ 
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
  selectedDay: externalSelectedDay,
  onSelectDay: externalOnSelectDay,
}) => {
  const [completedDays, setCompletedDays] = useStickyState<Record<number, boolean>>({}, `planner_completed_days_${selectedFaction}`);
  const [internalSelectedDay, setInternalSelectedDay] = useStickyState<number>(1, `planner_selected_day_${selectedFaction}`);
  const [selectedCityScope, setSelectedCityScope] = useStickyState<'all' | 'Ciudad Principal' | 'Ciudad Secundaria' | 'Tercera Ciudad'>('all', 'planner_selected_city_scope');
  const [selectedMonth, setSelectedMonth] = useStickyState<1 | 2 | 'all'>('all', 'planner_selected_month');
  const [selectedWeek, setSelectedWeek] = useStickyState<number | 'all'>('all', 'planner_selected_week');
  const [opponentMode, setOpponentMode] = useStickyState<'all' | 'human' | 'ai'>('all', 'planner_opponent_mode');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [prereqNotice, setPrereqNotice] = useState<{ day: number; message: string } | null>(null);

  const selectedDay = externalSelectedDay !== undefined ? externalSelectedDay : internalSelectedDay;
  const setSelectedDay = (day: number) => {
    setInternalSelectedDay(day);
    externalOnSelectDay?.(day);
  };

  const allSteps = getBuildStepsForFaction(selectedFaction);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  const filteredSteps = allSteps.filter((step) => {
    // City Scope filter
    if (selectedCityScope !== 'all' && step.cityScope !== selectedCityScope) {
      return false;
    }
    // Month filter
    if (selectedMonth !== 'all' && step.month !== selectedMonth) {
      return false;
    }
    // Week filter
    if (selectedWeek !== 'all' && step.week !== selectedWeek) {
      return false;
    }
    return true;
  });

  /**
   * Valida exclusivamente si una estructura cumple sus prerrequisitos estructurales canónicos
   * (p. ej., Fortificaciones II requiere Fortificaciones I, Tesorería requiere Banco,
   * Silo Alquímico requiere Silo de Recursos, Cofradía Nivel 2 requiere Cofradía Nivel 1).
   * Solo bloquea si falta erigir el requisito previo directo, sin exigir días intermedios no vinculados.
   */
  const checkPrerequisites = (day: number): { canComplete: boolean; missingDay?: number; missingBuilding?: string; reason?: string } => {
    const step = allSteps.find((s) => s.day === day);
    if (!step) return { canComplete: true };

    const building = step.building.toLowerCase();
    const city = step.cityScope || 'Ciudad Principal';

    // Función auxiliar para buscar pasos en la misma ciudad
    const findStepInCity = (predicate: (s: BuildStep) => boolean): BuildStep | undefined => {
      return allSteps.find((s) => s.day < day && (s.cityScope || 'Ciudad Principal') === city && predicate(s));
    };

    let prereqStep: BuildStep | undefined;

    // 1. Fortificaciones III requiere Fortificaciones II
    if (building.includes('fortificaciones iii') || building.includes('fortificaciones 3')) {
      prereqStep = findStepInCity((s) => {
        const b = s.building.toLowerCase();
        return b.includes('fortificaciones ii') || b.includes('fortificaciones 2') || b.includes('ciudadela');
      });
    }
    // 2. Fortificaciones II requiere Fortificaciones I
    else if (building.includes('fortificaciones ii') || building.includes('fortificaciones 2') || building.includes('ciudadela')) {
      prereqStep = findStepInCity((s) => {
        const b = s.building.toLowerCase();
        return (b.includes('fortificaciones') || b.includes('fuerte')) && !b.includes('ii') && !b.includes('iii') && !b.includes('2') && !b.includes('3');
      });
    }
    // 3. Tesorería requiere Banco
    else if (building.includes('tesorería') || building.includes('tesoreria')) {
      prereqStep = findStepInCity((s) => s.building.toLowerCase().includes('banco'));
    }
    // 4. Silo Alquímico requiere Silo de Recursos
    else if (building.includes('alquímico') || building.includes('alquimico')) {
      prereqStep = findStepInCity((s) => s.building.toLowerCase().includes('silo de recursos'));
    }
    // 5. Banco requiere Mercado
    else if (building.includes('banco')) {
      prereqStep = findStepInCity((s) => s.building.toLowerCase().includes('mercado'));
    }
    // 6. Comerciante de Artefactos requiere Mercado
    else if (building.includes('artefactos')) {
      prereqStep = findStepInCity((s) => s.building.toLowerCase().includes('mercado'));
    }
    // 7. Edificio de Facción Nivel II (Templo Solar II / Rostro Eterno II / Palacio bizantino II / Palacio de la foresta II / Corazón del colmenar II / Remanente abisal II) requiere Nivel I en esa ciudad
    else if (
      building.includes('templo solar ii') ||
      building.includes('rostro eterno ii') ||
      building.includes('palacio bizantino ii') ||
      building.includes('palacio de la foresta ii') ||
      building.includes('corazón del colmenar ii') ||
      building.includes('corazon del colmenar ii') ||
      building.includes('remanente abisal ii')
    ) {
      prereqStep = findStepInCity((s) => {
        const b = s.building.toLowerCase();
        return (
          (b.includes('templo solar') ||
           b.includes('rostro eterno') ||
           b.includes('palacio bizantino') ||
           b.includes('palacio de la foresta') ||
           b.includes('corazón del colmenar') ||
           b.includes('corazon del colmenar') ||
           b.includes('remanente abisal')) &&
          !b.includes('ii') &&
          !b.includes('iii')
        );
      });
    }
    // 8. Edificio de Facción Nivel III requiere Nivel II
    else if (
      building.includes('templo solar iii') ||
      building.includes('rostro eterno iii') ||
      building.includes('palacio bizantino iii') ||
      building.includes('palacio de la foresta iii') ||
      building.includes('corazón del colmenar iii') ||
      building.includes('corazon del colmenar iii') ||
      building.includes('remanente abisal iii')
    ) {
      prereqStep = findStepInCity((s) => {
        const b = s.building.toLowerCase();
        return (
          (b.includes('templo solar ii') ||
           b.includes('rostro eterno ii') ||
           b.includes('palacio bizantino ii') ||
           b.includes('palacio de la foresta ii') ||
           b.includes('corazón del colmenar ii') ||
           b.includes('corazon del colmenar ii') ||
           b.includes('remanente abisal ii')) &&
          !b.includes('iii')
        );
      });
    }
    // 9. Cofradía / Gremio de Magos Nivel 2 a 5
    else if (building.includes('cofradía de magos nivel 2') || building.includes('cofradia de magos nivel 2') || building.includes('cofradía de magos ii') || building.includes('gremio de magos nivel 2')) {
      prereqStep = findStepInCity((s) => {
        const b = s.building.toLowerCase();
        return (b.includes('magos') || b.includes('cofradía') || b.includes('gremio')) && (b.includes('nivel 1') || b.includes('grado 1') || b.includes('cofradía de magos (nivel 1'));
      });
    } else if (building.includes('magos nivel 3') || building.includes('magos iii')) {
      prereqStep = findStepInCity((s) => s.building.toLowerCase().includes('magos nivel 2') || s.building.toLowerCase().includes('magos ii'));
    } else if (building.includes('magos nivel 4') || building.includes('magos iv')) {
      prereqStep = findStepInCity((s) => s.building.toLowerCase().includes('magos nivel 3') || s.building.toLowerCase().includes('magos iii'));
    } else if (building.includes('magos nivel 5') || building.includes('magos v')) {
      prereqStep = findStepInCity((s) => s.building.toLowerCase().includes('magos nivel 4') || s.building.toLowerCase().includes('magos iv'));
    }
    // 10. Mejora de morada (Mejorada / Rama A / Rama B / II) requiere la morada base
    else if (building.includes('mejorad') || building.includes('mejora') || building.includes('rama a') || building.includes('rama b')) {
      const tierMatch = step.buildingTierLevel?.match(/tier\s*(\d)/i) || building.match(/tier\s*(\d)/i);
      if (tierMatch) {
        const tier = tierMatch[1];
        prereqStep = findStepInCity((s) => {
          const b = s.building.toLowerCase();
          const t = s.buildingTierLevel?.toLowerCase() || '';
          return (t.includes(`tier ${tier}`) || b.includes(`tier ${tier}`)) && !b.includes('mejorad') && !b.includes('rama');
        });
      }
    }

    // Si tiene un prerrequisito estructural y aún no está marcado como hecho
    if (prereqStep && !completedDays[prereqStep.day]) {
      const prereqName = cleanSpanishName(prereqStep.building);
      return {
        canComplete: false,
        missingDay: prereqStep.day,
        missingBuilding: prereqName,
        reason: `Requiere haber construido previamente: ${prereqName} (Día ${prereqStep.day}).`,
      };
    }

    return { canComplete: true };
  };

  const toggleDayCompleted = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // Si ya está completado, desmarcarlo
    if (completedDays[day]) {
      setCompletedDays((prev) => {
        const next = { ...prev };
        delete next[day];
        return next;
      });
      setPrereqNotice(null);
      return;
    }

    // Comprobar únicamente si falta el prerrequisito estructural
    const status = checkPrerequisites(day);
    if (!status.canComplete) {
      setPrereqNotice({
        day,
        message: status.reason || 'No se cumplen los prerrequisitos de construcción para este día.',
      });
      setSelectedDay(day);
      return;
    }

    // Prerrequisitos cumplidos: marcar como hecho
    setCompletedDays((prev) => ({
      ...prev,
      [day]: true,
    }));
    setPrereqNotice(null);
  };

  const handleResetAllProgress = () => {
    setCompletedDays({});
    setSelectedDay(1);
    setShowResetConfirm(false);
  };

  const currentStep = allSteps.find((s) => s.day === selectedDay) || allSteps[0];
  const currentOpponentTactic = getOpponentTacticForDay(currentStep.day, currentStep.month, currentStep.week);
  const completedCount = Object.values(completedDays).filter(Boolean).length;

  React.useEffect(() => {
    const el = document.getElementById(`day-step-${selectedDay}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedDay]);

  return (
    <div className="space-y-4">
      {/* Reset Confirmation In-App Modal / Banner */}
      {showResetConfirm && (
        <div className="bg-red-950/90 border-2 border-red-600 rounded-2xl p-4 sm:p-5 shadow-[0_0_50px_rgba(220,38,38,0.4)] backdrop-blur-md animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-900/60 rounded-xl border border-red-500/60 text-red-200 shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-base font-serif text-white font-bold">
                  ¿Confirmar reinicio de casillas del cronograma?
                </h4>
                <p className="text-xs text-red-200/90 font-mono">
                  Se desmarcarán las {completedCount} casillas completadas y se reiniciará el cursor al Día 1 para una nueva partida.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={handleResetAllProgress}
                className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Sí, Reiniciar Todo</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono bg-black/60 hover:bg-black/80 text-slate-300 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Controls Bar: Month / Week / Opponent Filters */}
      <div className={`bg-black/50 border ${theme.borderSubtle} rounded-2xl p-3 sm:p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300`}>
        {/* Título de la Sección & Controles Rápidos */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-serif text-white uppercase tracking-wide flex items-center gap-2">
              <span>Cronograma de Construcción & Acciones</span>
              <span className={`text-sm sm:text-base ${theme.textAccent} font-mono font-bold`}>({meta.name})</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`${theme.bgBadge} ${theme.textAccent} text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border ${theme.borderSubtle} flex items-center gap-1.5 font-mono`}>
              <Sparkles className="w-3 h-3 text-yellow-400" />
              56 Días
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {completedCount} / {allSteps.length} Pasos Realizados
            </span>
            <button
              onClick={() => setShowResetConfirm(true)}
              title="Reiniciar casillas marcadas para nueva partida"
              className={`text-[11px] font-mono flex items-center gap-1.5 transition-all px-2 py-0.5 rounded border cursor-pointer ${
                completedCount > 0
                  ? `${theme.textAccent} hover:text-red-200 ${theme.bgBadge} ${theme.borderSubtle} hover:bg-red-950/60 hover:border-red-600`
                  : 'text-slate-500 bg-black/40 border-slate-800 hover:text-slate-300'
              }`}
            >
              <RotateCcw className="w-3 h-3" style={{ color: theme.hexPrimary }} />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        {/* Hitos o avisos específicos de facción */}
        {selectedFaction === 'Templo' && (
          <div className="mt-2 flex items-center gap-2 text-[11px] font-mono bg-amber-950/70 text-amber-300 border border-amber-600/60 px-2.5 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span>
              <strong>Hito Clave Templo:</strong> Tiers 1, 2 y 3 asegurados en Semana 1 (Día 4) • <strong>Rush a Tier 7 (Ángeles)</strong> completado en el <strong>Día 14</strong> exacto.
            </span>
          </div>
        )}
        {meta.status === 'desarrollo' && (
          <div className="mt-2 flex items-center gap-2 text-[11px] font-mono bg-indigo-950/70 text-indigo-300 border border-indigo-600/60 px-2.5 py-1 rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span>
              <strong>Facción en Desarrollo:</strong> Árboles y datos detallados de {meta.name} en proceso de confirmación por Unfrozen. Mostrando arquitectura base.
            </span>
          </div>
        )}

        {/* Filtros Situados Directamente Debajo del Título (Sin necesidad de scroll) */}
        <div className={`mt-2.5 pt-2 border-t ${theme.borderSubtle} flex items-center flex-wrap gap-2 sm:gap-2.5`}>
          {/* Month Filter */}
          <div className={`flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-xl border ${theme.borderSubtle}`}>
            <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: theme.hexPrimary }} />
            <div className="flex gap-1">
              {(['all', 1, 2] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedMonth(m);
                    setSelectedWeek('all');
                  }}
                  className={`px-2 py-0.5 text-[11px] rounded-md font-semibold transition-all uppercase tracking-wider cursor-pointer font-mono whitespace-nowrap ${
                    selectedMonth === m
                      ? theme.pillActive
                      : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {m === 'all' ? '2 Meses' : `Mes ${m}`}
                </button>
              ))}
            </div>
          </div>

          {/* Week Selector */}
          <div className={`flex items-center gap-1 bg-black/60 px-2 py-1 rounded-xl border ${theme.borderSubtle} flex-wrap`}>
            <span className="text-[10px] text-slate-400 uppercase font-mono pl-0.5">Sem:</span>
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() => setSelectedWeek('all')}
                className={`px-1.5 py-0.5 text-[11px] rounded font-semibold font-mono cursor-pointer ${
                  selectedWeek === 'all'
                    ? theme.pillActive
                    : 'bg-black/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                Todas
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((wk) => {
                if (selectedMonth === 1 && wk > 4) return null;
                if (selectedMonth === 2 && wk <= 4) return null;
                return (
                  <button
                    key={wk}
                    onClick={() => setSelectedWeek(wk)}
                    className={`px-1.5 py-0.5 text-[11px] rounded font-semibold font-mono cursor-pointer ${
                      selectedWeek === wk
                        ? theme.pillActive
                        : 'bg-black/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    S{wk}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rival Filter: Ambos / Humano / IA */}
          <div className={`flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-xl border ${theme.borderSubtle}`}>
            <Filter className="w-3.5 h-3.5 shrink-0" style={{ color: theme.hexPrimary }} />
            <div className="flex gap-1">
              {(['all', 'human', 'ai'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setOpponentMode(mode)}
                  className={`px-2 py-0.5 text-[11px] rounded-md font-semibold transition-all uppercase tracking-wider cursor-pointer font-mono whitespace-nowrap flex items-center gap-1 ${
                    opponentMode === mode
                      ? mode === 'human'
                        ? 'bg-red-700 text-white shadow-[0_0_12px_rgba(239,68,68,0.6)] border border-red-400'
                        : mode === 'ai'
                        ? 'bg-cyan-700 text-white shadow-[0_0_12px_rgba(6,182,212,0.6)] border border-cyan-400'
                        : theme.pillActive
                      : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {mode === 'all' && '⚖️ Ambos'}
                  {mode === 'human' && '⚔️ Humano'}
                  {mode === 'ai' && '🤖 IA'}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Ámbito de Ciudad: 1ª, 2ª o 3ª Ciudad */}
          <div className={`flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-xl border ${theme.borderSubtle}`}>
            <Castle className="w-3.5 h-3.5 shrink-0" style={{ color: theme.hexPrimary }} />
            <div className="flex gap-1 flex-wrap">
              {([
                { id: 'all', label: 'Todas las Urbes' },
                { id: 'Ciudad Principal', label: '1ª Capital' },
                { id: 'Ciudad Secundaria', label: '2ª Ciudad' },
                { id: 'Tercera Ciudad', label: '3ª Ciudad' },
              ] as const).map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityScope(city.id)}
                  className={`px-2 py-0.5 text-[11px] rounded-md font-semibold transition-all uppercase tracking-wider cursor-pointer font-mono whitespace-nowrap ${
                    selectedCityScope === city.id
                      ? theme.pillActive
                      : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {city.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Opponent Mode Banner */}
        <div className={`mt-3.5 pt-3 border-t ${theme.borderSubtle} flex items-center justify-between gap-3 flex-wrap`}>
          <div className="flex items-center gap-2 text-xs font-mono">
            {opponentMode === 'all' && (
              <span className={`flex items-center gap-1.5 ${theme.textAccent} ${theme.bgBadge} px-2.5 py-1 rounded-lg border ${theme.borderSubtle}`}>
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
                <strong>Filtro Activo: Modo Global (Ambos)</strong> — Visualizando directivas tácticas híbridas (PvE creeping + PvP competitivo).
              </span>
            )}
            {opponentMode === 'human' && (
              <span className="flex items-center gap-1.5 text-red-300 bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/50">
                <Swords className="w-3.5 h-3.5 text-red-400" />
                <strong>Filtro Activo: vs Jugador Humano (PvP)</strong> — Adaptado a denegación de mapa, anti-scout, timing de asedio y contra-hechizos.
              </span>
            )}
            {opponentMode === 'ai' && (
              <span className="flex items-center gap-1.5 text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/50">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <strong>Filtro Activo: vs IA & Neutrales (PvE)</strong> — Adaptado a Creeping con 0 bajas, baiting de stacks neutrales y optimización de recursos.
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Día {selectedDay} seleccionado
          </span>
        </div>
      </div>

      {/* Interactive Timeline & Phase Selector */}
      <InteractivePlannerTimeline
        selectedDay={selectedDay}
        onSelectDay={(day) => setSelectedDay(day)}
        selectedFaction={selectedFaction}
        completedDays={completedDays}
        themeMode={themeMode}
      />

      {/* Live Cost & Resource Calculator */}
      <BuildResourceCalculator
        allSteps={allSteps}
        completedDays={completedDays}
        themeMode={themeMode}
      />

      {/* 2-Column Direct Workspace: List of Days + Selected Day Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Day Steps List (56 Days) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[820px] overflow-y-auto pr-1">
          {filteredSteps.map((step) => {
            const isCompleted = !!completedDays[step.day];
            const isSelected = selectedDay === step.day;
            const tactic = getOpponentTacticForDay(step.day, step.month, step.week);

            return (
              <div
                key={step.day}
                id={`day-step-${step.day}`}
                onClick={() => setSelectedDay(step.day)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? opponentMode === 'human'
                      ? 'bg-red-950/50 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                      : opponentMode === 'ai'
                      ? 'bg-cyan-950/50 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                      : `${theme.bgSubtle} ${theme.border} shadow-[0_0_20px_rgba(0,0,0,0.6)]`
                    : isCompleted
                    ? 'bg-black/30 border-emerald-900/50 text-slate-400'
                    : `bg-black/50 ${theme.borderSubtle} hover:border-slate-400 hover:bg-black/70`
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        if (!isCompleted && !checkPrerequisites(step.day).canComplete) {
                          e.stopPropagation();
                          const prereq = checkPrerequisites(step.day);
                          setPrereqNotice({
                            day: step.day,
                            message: prereq.reason || `No se cumplen los prerrequisitos para el Día ${step.day}.`,
                          });
                          setSelectedDay(step.day);
                          return;
                        }
                        toggleDayCompleted(step.day, e);
                      }}
                      disabled={!isCompleted && !checkPrerequisites(step.day).canComplete}
                      className={`${
                        !isCompleted && !checkPrerequisites(step.day).canComplete
                          ? 'cursor-not-allowed opacity-50'
                          : `${theme.textAccent} hover:brightness-125 cursor-pointer`
                      } transition-colors p-1 shrink-0`}
                      aria-label={
                        isCompleted
                          ? 'Día completado (haz clic para desmarcar)'
                          : checkPrerequisites(step.day).canComplete
                          ? 'Marcar día como completado'
                          : `Bloqueado: ${checkPrerequisites(step.day).reason}`
                      }
                      title={
                        isCompleted
                          ? 'Completado (haz clic para desmarcar)'
                          : checkPrerequisites(step.day).canComplete
                          ? 'Marcar como hecho'
                          : `Bloqueado: ${checkPrerequisites(step.day).reason}`
                      }
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : !checkPrerequisites(step.day).canComplete ? (
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <Circle className="w-5 h-5 text-slate-700" />
                          <Lock className="w-2.5 h-2.5 text-amber-500 absolute" />
                        </div>
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${theme.bgBadge} border ${theme.borderSubtle} ${theme.textAccent}`}>
                          M{step.month} • S{step.week} • D{step.day}
                        </span>
                        <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                          {step.cityScope} • {step.cityName}
                        </span>
                        <WaxSealBadge label={step.priority} size="sm" />

                        {/* Opponent Mode Badges on cards */}
                        {opponentMode === 'human' && (
                          <span className="bg-red-950 text-red-300 border border-red-700/60 text-[9px] font-mono px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Swords className="w-2.5 h-2.5 text-red-400" />
                            {tactic.pvpFocusTag}
                          </span>
                        )}
                        {opponentMode === 'ai' && (
                          <span className="bg-cyan-950 text-cyan-300 border border-cyan-700/60 text-[9px] font-mono px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5 text-cyan-400" />
                            {tactic.pveFocusTag}
                          </span>
                        )}
                        {opponentMode === 'all' && (
                          <span className="bg-slate-900 text-slate-300 border border-slate-700 text-[9px] font-mono px-1.5 py-0.2 rounded">
                            PvE+PvP
                          </span>
                        )}

                        {step.buildingChoice && (
                          <span className="bg-amber-950/80 text-amber-300 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border border-amber-700/50 flex items-center gap-1 font-mono">
                            <GitBranch className="w-2.5 h-2.5" />
                            Rama
                          </span>
                        )}
                      </div>
                      <h4 className={`text-sm font-semibold tracking-wide ${isSelected ? 'text-white font-bold' : 'text-slate-200'}`}>
                        {cleanSpanishName(step.building)}
                      </h4>
                    </div>
                  </div>

                  {/* Coste diario original sin recuadros ni iconos */}
                  <div className="text-right shrink-0 font-mono space-y-0.5">
                    <span className="text-xs font-bold text-yellow-400 block">
                      {(step.cost.gold ?? 0).toLocaleString()} Oro
                    </span>
                    {!!step.cost.gems && (
                      <span className="text-[10px] font-semibold text-cyan-300 block">
                        {step.cost.gems} Gemas
                      </span>
                    )}
                    {!!step.cost.crystal && (
                      <span className="text-[10px] font-semibold text-purple-300 block">
                        {step.cost.crystal} Cristal
                      </span>
                    )}
                    {!!step.cost.mercury && (
                      <span className="text-[10px] font-semibold text-red-300 block">
                        {step.cost.mercury} Mercurio
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Day Deep-Dive Details */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className={`bg-black/75 border-2 ${theme.border} rounded-2xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.6)] lg:sticky lg:top-20 backdrop-blur-md relative`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b ${theme.borderSubtle}`}>
              <div>
                <span className={`text-[10px] font-mono ${theme.textAccent} uppercase tracking-widest block font-bold mb-0.5`}>
                  Mes {currentStep.month} • Semana {currentStep.week} • Día {currentStep.day} de 56 • {currentStep.cityScope} ({currentStep.cityName})
                </span>
                <h3 className="text-lg font-serif text-white font-bold">{cleanSpanishName(currentStep.title)}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{cleanSpanishName(currentStep.building)} ({cleanSpanishName(currentStep.buildingTierLevel)})</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {currentStep.sourceUrl && (
                  <a
                    href={currentStep.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono ${theme.bgBadge} hover:brightness-125 ${theme.textAccent} border ${theme.borderSubtle} transition-all flex items-center gap-1 shrink-0`}
                    title="Ver ficha oficial del edificio en Heroes Olden Era Database"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ficha Oficial</span>
                  </a>
                )}
                {completedDays[currentStep.day] ? (
                  <button
                    onClick={(e) => toggleDayCompleted(currentStep.day, e)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer bg-emerald-950 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900 shadow-sm"
                    title="Haz clic para desmarcar este día y dependientes"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>✓ Hecho</span>
                  </button>
                ) : checkPrerequisites(currentStep.day).canComplete ? (
                  <button
                    onClick={(e) => toggleDayCompleted(currentStep.day, e)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${theme.bgBadge} ${theme.textAccent} border ${theme.border} hover:brightness-125 shadow-sm`}
                  >
                    <Circle className="w-3.5 h-3.5" />
                    <span>Marcar Hecho</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 opacity-60 cursor-not-allowed bg-slate-900/90 text-slate-400 border border-slate-700 shadow-sm"
                    title={checkPrerequisites(currentStep.day).reason}
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Prerrequisitos pendientes</span>
                  </button>
                )}
              </div>
            </div>

            {/* Building Tier or Level Info */}
            {currentStep.buildingTierLevel && (
              <div className={`mt-3 text-xs ${theme.textAccent} font-mono ${theme.bgBadge} px-3 py-1.5 rounded-lg border ${theme.borderSubtle}`}>
                🏛️ <strong>Estructura:</strong> {cleanSpanishName(currentStep.buildingTierLevel)}
              </div>
            )}

            {/* Bloque de aviso si los prerrequisitos están pendientes */}
            {!completedDays[currentStep.day] && !checkPrerequisites(currentStep.day).canComplete && (
              <div className="mt-3 bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2.5 shadow-sm">
                <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold font-mono uppercase tracking-wider text-amber-300 block mb-0.5">
                    Construcción Bloqueada por Prerrequisitos
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {checkPrerequisites(currentStep.day).reason}
                  </p>
                </div>
              </div>
            )}

            {/* ADAPTIVE OPPONENT DIRECTIVE BOX */}
            <div className="mt-3 space-y-2">
              {/* If HUMAN or ALL mode */}
              {(opponentMode === 'human' || opponentMode === 'all') && (
                <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-red-300 font-bold uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                      <Swords className="w-3.5 h-3.5 text-red-400" />
                      Directiva PvP (vs Jugador Humano) • {currentOpponentTactic.pvpFocusTag}
                    </span>
                    <span className="text-[10px] font-mono bg-red-950 text-red-400 px-1.5 py-0.2 rounded border border-red-800">
                      PvP
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans">
                    {currentOpponentTactic.humanPvP}
                  </p>
                </div>
              )}

              {/* If AI or ALL mode */}
              {(opponentMode === 'ai' || opponentMode === 'all') && (
                <div className="bg-cyan-950/30 border border-cyan-800/50 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-bold uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                      Directiva PvE (vs IA & Creeping) • {currentOpponentTactic.pveFocusTag}
                    </span>
                    <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.2 rounded border border-cyan-800">
                      PvE
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans">
                    {currentOpponentTactic.aiPvE}
                  </p>
                </div>
              )}
            </div>

            {/* Building Branch Decision Alert */}
            {currentStep.buildingChoice && (
              <div className="mt-3 bg-amber-950/40 border border-amber-700/60 rounded-xl p-3 text-xs space-y-2.5">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold uppercase tracking-wider text-[11px] font-mono">
                  <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentStep.buildingChoice.type}</span>
                </div>

                {/* If multiple explicit options are defined */}
                {currentStep.buildingChoice.options && currentStep.buildingChoice.options.length > 0 ? (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                      3 Opciones Seleccionables del Edificio:
                    </span>
                    <div className="space-y-1.5">
                      {currentStep.buildingChoice.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg border text-xs ${
                            opt.isRecommended
                              ? 'bg-emerald-950/50 border-emerald-600/70 text-slate-200'
                              : `bg-black/40 ${theme.borderSubtle} text-slate-300`
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-bold text-[11px] font-mono text-white">
                              Opción {oIdx + 1}: {opt.title}
                            </span>
                            {opt.isRecommended ? (
                              <span className="bg-emerald-800 text-emerald-100 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded font-mono shrink-0">
                                ★ Recomendada
                              </span>
                            ) : (
                              <span className="bg-black/60 text-slate-400 text-[9px] px-1.5 py-0.2 rounded border border-slate-800 font-mono shrink-0">
                                Alternativa
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {opt.effect}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-emerald-300 font-semibold bg-black/40 p-2 rounded border border-emerald-900/50">
                      ★ {currentStep.buildingChoice.recommendedOption}
                    </div>
                    {currentStep.buildingChoice.alternativeOption && (
                      <div className="text-slate-400 text-[11px]">
                        <span className="font-semibold text-slate-300">Alternativa: </span>
                        {currentStep.buildingChoice.alternativeOption}
                      </div>
                    )}
                  </>
                )}

                <p className="text-[11px] text-slate-300 italic pt-1 border-t border-amber-900/40">
                  <strong>Justificación Táctica:</strong> {currentStep.buildingChoice.reason}
                </p>
              </div>
            )}

            {/* Cost breakdown - Desglose completo de todos los recursos requeridos */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold font-mono text-[11px]">Coste de Construcción:</span>
              <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold flex items-center gap-1.5 shadow-sm ${RESOURCE_CALC_STYLES.gold.badge}`}>
                <Coins className="w-3.5 h-3.5 text-yellow-400" />
                {(currentStep.cost.gold ?? 0).toLocaleString()} Oro
              </span>
              {!!currentStep.cost.wood && (
                <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold flex items-center gap-1.5 shadow-sm ${RESOURCE_CALC_STYLES.wood.badge}`}>
                  <Trees className="w-3.5 h-3.5 text-emerald-400" />
                  {currentStep.cost.wood} Madera
                </span>
              )}
              {!!currentStep.cost.ore && (
                <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold flex items-center gap-1.5 shadow-sm ${RESOURCE_CALC_STYLES.ore.badge}`}>
                  <Shield className="w-3.5 h-3.5 text-slate-300" />
                  {currentStep.cost.ore} Mineral
                </span>
              )}
              {!!currentStep.cost.gems && (
                <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold flex items-center gap-1.5 shadow-sm ${RESOURCE_CALC_STYLES.gems.badge}`}>
                  <Gem className="w-3.5 h-3.5 text-cyan-400" />
                  {currentStep.cost.gems} Gemas
                </span>
              )}
              {!!currentStep.cost.crystal && (
                <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold flex items-center gap-1.5 shadow-sm ${RESOURCE_CALC_STYLES.crystal.badge}`}>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  {currentStep.cost.crystal} Cristal
                </span>
              )}
              {!!currentStep.cost.mercury && (
                <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold flex items-center gap-1.5 shadow-sm ${RESOURCE_CALC_STYLES.mercury.badge}`}>
                  <span className="text-xs">🧪</span>
                  {currentStep.cost.mercury} Mercurio
                </span>
              )}
              {!!currentStep.cost.alchemicalDust && (
                <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold flex items-center gap-1.5 shadow-sm ${RESOURCE_CALC_STYLES.alchemicalDust.badge}`}>
                  <span className="text-xs">✨</span>
                  {currentStep.cost.alchemicalDust} Polvo
                </span>
              )}
            </div>

            {/* Law / Astrology Progress if present */}
            {currentStep.lawProgress && (
              <div className={`mt-3 text-xs ${theme.bgBadge} p-2 rounded-lg border ${theme.borderSubtle} ${theme.textAccent}`}>
                <span className="font-bold text-amber-400 font-mono uppercase text-[10px] block">
                  📜 Progreso de Leyes / Astrología:
                </span>
                <span>{currentStep.lawProgress}</span>
              </div>
            )}

            {/* Hero Actions */}
            <div className="mt-3.5 space-y-1.5">
              <span className={`text-xs font-mono uppercase ${theme.textAccent} font-bold tracking-wider flex items-center gap-1.5`}>
                <Compass className="w-3.5 h-3.5" style={{ color: theme.hexPrimary }} />
                Acciones de Héroes (Mapa de Aventura)
              </span>
              <ul className="text-xs space-y-1.5 text-slate-300">
                {currentStep.heroActions.map((action, idx) => (
                  <li key={idx} className={`flex items-start gap-2 bg-black/40 p-2 rounded border ${theme.borderSubtle}`}>
                    <span className={`${theme.textAccent} font-mono font-bold mt-0.5`}>›</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Combat Tactic */}
            <div className="mt-3.5">
              <span className={`text-xs font-mono uppercase ${theme.textAccent} font-bold tracking-wider flex items-center gap-1.5 mb-1`}>
                <Swords className="w-3.5 h-3.5" style={{ color: theme.hexPrimary }} />
                Táctica de Combate del Día
              </span>
              <p className={`text-xs text-slate-300 ${theme.bgBadge} p-2.5 rounded-lg border ${theme.borderSubtle} leading-relaxed`}>
                {currentStep.combatTactic}
              </p>
            </div>

            {/* Critical Tip */}
            <div className="mt-3.5 p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-200/90">
              <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-yellow-400 font-mono">
                  Consejo Clave:
                </span>
                <span>{currentStep.criticalTip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
