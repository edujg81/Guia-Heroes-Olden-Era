import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Zap, Gem, Award, Shield, Target, Compass, Orbit, Flame, Sun, Moon } from 'lucide-react';
import { RecommendedSpell } from '../../../types';
import { formatEffectWithSpellPower, parseSpellFormula, evaluateSpellFormula } from '../../../utils/spellScalingCalculator';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';
import { getFactionSpellPriority } from '../../../data/factionSpellData';

export interface SmartSpellHoverCardProps {
  spell: RecommendedSpell;
  currentSpellPower?: number;
  activeFaction?: FactionId;
  themeMode?: 'dark' | 'light';
  children: React.ReactNode;
  className?: string;
}

export const SmartSpellHoverCard: React.FC<SmartSpellHoverCardProps> = ({
  spell,
  currentSpellPower = 10,
  activeFaction = 'Mazmorra',
  themeMode = 'dark',
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; positionSide: 'top' | 'bottom'; alignSide: 'left' | 'right' }>({
    top: 0,
    left: 0,
    positionSide: 'bottom',
    alignSide: 'left',
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const factionPrio = getFactionSpellPriority(spell.id, activeFaction as FactionId);
  const effectivePriority = factionPrio ? factionPrio.priority : spell.priority;
  const isEssential = effectivePriority.includes('Imprescindible');

  // School sigil icon
  const getSchoolIcon = () => {
    const sc = spell.school.toLowerCase();
    if (sc.includes('luz')) return <Sun className="w-3.5 h-3.5 text-amber-500" />;
    if (sc.includes('sombra')) return <Moon className="w-3.5 h-3.5 text-purple-400" />;
    if (sc.includes('primigenia')) return <Flame className="w-3.5 h-3.5 text-emerald-400" />;
    if (sc.includes('arcana')) return <Orbit className="w-3.5 h-3.5 text-indigo-400" />;
    return <Compass className="w-3.5 h-3.5 text-cyan-400" />;
  };

  // Boundary-aware placement calculation
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const CARD_WIDTH = 340;
    const CARD_HEIGHT = 440;
    const PADDING = 14;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let positionSide: 'top' | 'bottom' = 'bottom';
    let alignSide: 'left' | 'right' = 'left';

    // Vertical boundary detection
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top = rect.bottom + 8;
    if (spaceBelow < CARD_HEIGHT && spaceAbove > spaceBelow) {
      positionSide = 'top';
      top = rect.top - CARD_HEIGHT - 8;
    }

    // Ensure it doesn't bleed off top
    if (top < PADDING) top = PADDING;

    // Horizontal boundary detection
    let left = rect.left;
    if (rect.left + CARD_WIDTH > viewportWidth - PADDING) {
      alignSide = 'right';
      left = Math.max(PADDING, viewportWidth - CARD_WIDTH - PADDING);
    } else {
      left = Math.max(PADDING, rect.left);
    }

    setCoords({ top, left, positionSide, alignSide });
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    updatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 180);
  };

  // Recalculate position on resize/scroll while open
  useEffect(() => {
    if (!isVisible) return;
    const handleRecalc = () => updatePosition();
    window.addEventListener('resize', handleRecalc);
    window.addEventListener('scroll', handleRecalc, true);
    return () => {
      window.removeEventListener('resize', handleRecalc);
      window.removeEventListener('scroll', handleRecalc, true);
    };
  }, [isVisible]);

  // Damage scaling projection at SP 0, 10, 20, 30
  const level1 = spell.levels[0];
  const level4 = spell.levels[spell.levels.length - 1];
  const l4Formula = parseSpellFormula(level4.effect);
  const l1Formula = parseSpellFormula(level1.effect);

  const spProgression = [0, 10, 20, 30].map((sp) => {
    if (!l4Formula) return null;
    const val = evaluateSpellFormula(l4Formula, sp);
    return { sp, val, unit: l4Formula.unit };
  });

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`inline-block cursor-help ${className}`}
      >
        {children}
      </div>

      {isVisible &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={cardRef}
            onMouseEnter={() => {
              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: '340px',
              zIndex: 9999,
            }}
            className={`fixed rounded-2xl border p-4 shadow-2xl transition-all duration-200 transform-gpu animate-in fade-in-0 zoom-in-95 pointer-events-auto ${
              themeMode === 'light'
                ? 'holographic-card-light border-purple-200 text-slate-800'
                : 'holographic-card-dark border-purple-500/40 text-slate-200'
            }`}
          >
            {/* Header with School Crest and Tier */}
            <div className="flex items-start justify-between gap-2 border-b pb-2.5 mb-2.5 border-purple-500/20">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="p-1 rounded-md bg-black/30 border border-purple-500/30">
                    {getSchoolIcon()}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
                    {spell.school}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border bg-black/40 border-amber-500/40 text-amber-400">
                    Tier {spell.tier}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm tracking-wide text-white flex items-center gap-1.5">
                  <span>{spell.name}</span>
                </h4>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  {level1.manaCost} - {level4.manaCost} Maná
                </span>
                {spell.masterfulName && (
                  <span className="text-[9px] font-mono block mt-1 text-amber-300">
                    ★ {spell.masterfulName}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Tactical Priority & School Requirement */}
            <div className="grid grid-cols-2 gap-2 mb-2.5 text-[11px] font-mono">
              <div className="p-1.5 rounded-lg border bg-black/30 border-slate-800">
                <span className="text-[9px] uppercase block opacity-60">Meta {activeFaction}:</span>
                <span className={`font-bold ${isEssential ? 'text-amber-400' : 'text-purple-300'}`}>
                  {effectivePriority}
                </span>
              </div>
              <div className="p-1.5 rounded-lg border bg-black/30 border-slate-800">
                <span className="text-[9px] uppercase block opacity-60">Requisito Escuela:</span>
                <span className="text-slate-300 truncate block">{spell.schoolRequirement}</span>
              </div>
            </div>

            {/* Live Formula Scaling Curve (0 to 30 SP) */}
            {l4Formula && (
              <div className="p-2.5 rounded-xl border mb-2.5 bg-black/40 border-amber-500/30">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-amber-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Proyección de Potencia Magistral (0-30 SP)
                  </span>
                  <span>{l4Formula.unit}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-center font-mono">
                  {spProgression.map(
                    (p, idx) =>
                      p && (
                        <div
                          key={idx}
                          className={`p-1 rounded border text-[10px] ${
                            currentSpellPower >= p.sp && (idx === 3 || currentSpellPower < (spProgression[idx + 1]?.sp || 99))
                              ? 'bg-amber-500 text-black font-bold border-amber-300'
                              : 'bg-black/50 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="text-[9px] opacity-75">{p.sp} SP</div>
                          <div className="font-bold">{p.val}</div>
                        </div>
                      )
                  )}
                </div>
                <div className="text-[9px] font-mono text-center mt-1 text-amber-300/80">
                  Fórmula: {l4Formula.base} + {l4Formula.multiplier} × SP
                </div>
              </div>
            )}

            {/* Comparative Evolution: Level 1 (Base) vs Level 4 (Magistral) */}
            <div className="space-y-1.5 text-xs mb-2.5">
              <div className="p-2 rounded-lg border border-slate-800 bg-black/40">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 mb-0.5">
                  <span>Nivel 1 (Base)</span>
                  <span>{level1.manaCost} Maná</span>
                </div>
                <p className="text-[11px] leading-snug line-clamp-2 text-slate-300">{level1.effect}</p>
              </div>

              <div className="p-2 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-950/40 to-black/60">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-400 mb-0.5">
                  <span>Nivel 4 (Magistral)</span>
                  <span className="text-amber-300">{level4.manaCost} Maná</span>
                </div>
                <p className="text-[11px] leading-snug text-amber-200">{level4.keyBonus}</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Gem className="w-3 h-3 text-amber-500" />
                {spell.isNeutral || spell.unlockCost.gold === 0
                  ? (spell.unlockCost.observationPoints !== undefined
                      ? `Nivel 1: ${spell.unlockCost.observationPoints} Pts Observación (0 Oro)`
                      : 'Nivel 1: Sin definir (Observatorio)')
                  : `Desbloqueo: ${spell.unlockCost.gold.toLocaleString()} Oro`}
              </span>
              {spell.isNeutral || spell.unlockCost.gold === 0 ? (
                <span className="text-teal-400 font-semibold">
                  {spell.unlockCost.observationPoints !== undefined
                    ? '+1 Pto Observación / Nivel'
                    : 'Mejora: Sin definir'}
                </span>
              ) : (
                <span className="text-amber-400 font-semibold">25 Polvo / Nivel</span>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
