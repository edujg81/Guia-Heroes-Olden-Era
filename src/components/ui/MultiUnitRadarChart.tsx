import React from 'react';
import { UnitVariant, UnitInfo } from '../../types';
import { FactionId, getFactionTheme } from '../../data/factionDataProvider';
import { parseAverageDamage } from './UnitStatRadarChart';

export interface MultiUnitSlot {
  id: string;
  factionId: FactionId;
  factionName: string;
  unitName: string;
  tier: number;
  variantKey: 'base' | 'branchA' | 'branchB';
  variantLabel: string;
  variant: UnitVariant;
  unit?: UnitInfo;
  color: string;
}

interface MultiUnitRadarChartProps {
  units: MultiUnitSlot[];
  themeMode?: 'dark' | 'light';
  onHighlightUnit?: (id: string | null) => void;
  highlightedUnitId?: string | null;
}

export const MultiUnitRadarChart: React.FC<MultiUnitRadarChartProps> = ({
  units,
  themeMode = 'dark',
  onHighlightUnit,
  highlightedUnitId,
}) => {
  const isDark = themeMode === 'dark';

  // 6 canonical combat attributes forming a regular hexagon
  const statsKeys = [
    { label: 'Ataque', key: 'attack', icon: '⚔️' },
    { label: 'Daño Medio', key: 'avgDamage', icon: '🗡️' },
    { label: 'Defensa', key: 'defense', icon: '🛡️' },
    { label: 'Salud', key: 'hp', icon: '❤️' },
    { label: 'Velocidad', key: 'speed', icon: '⚡' },
    { label: 'Iniciativa', key: 'initiative', icon: '⏱️' },
  ] as const;

  const getStatValue = (variant: UnitVariant, key: string): number => {
    if (key === 'avgDamage') {
      return parseAverageDamage(variant.stats.damage);
    }
    return Number(variant.stats[key as keyof typeof variant.stats]) || 0;
  };

  const formatStatDisplay = (variant: UnitVariant, key: string): string => {
    if (key === 'avgDamage') {
      const avg = parseAverageDamage(variant.stats.damage);
      return Number.isInteger(avg) ? `${avg}` : avg.toFixed(1);
    }
    return `${variant.stats[key as keyof typeof variant.stats] ?? 0}`;
  };

  // Find maximum across all selected units for scaling + 15% buffer
  const maxValues = statsKeys.map(({ key }) => {
    const values = units.map((u) => getStatValue(u.variant, key));
    const max = Math.max(...values, 1);
    return max * 1.15;
  });

  const size = 390;
  const center = size / 2;
  const radius = size * 0.31;
  const numAxes = statsKeys.length;
  const angleStep = (Math.PI * 2) / numAxes;

  const getCoordinates = (axisIndex: number, normalizedVal: number) => {
    const angle = -Math.PI / 2 + axisIndex * angleStep;
    const r = radius * Math.min(Math.max(normalizedVal, 0.05), 1);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const computePolygonPoints = (variant: UnitVariant) => {
    return statsKeys
      .map(({ key }, i) => {
        const val = getStatValue(variant, key);
        const norm = val / (maxValues[i] || 1);
        const { x, y } = getCoordinates(i, norm);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isDark ? 'bg-black/60 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
      } flex flex-col items-center justify-center relative`}
    >
      {/* Header & Legend */}
      <div className="flex items-center justify-between flex-wrap gap-2 w-full mb-3 pb-3 border-b border-slate-800/40">
        <div>
          <span
            className={`text-xs font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            Radar Hexagonal Cruzado de Combate
          </span>
          <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
            Compara los 6 atributos clave escalados a escala relativa entre las unidades seleccionadas.
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono font-semibold flex-wrap">
          {units.map((slot) => {
            const isHighlighted = highlightedUnitId === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onMouseEnter={() => onHighlightUnit?.(slot.id)}
                onMouseLeave={() => onHighlightUnit?.(null)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  isHighlighted
                    ? 'scale-105 ring-2 ring-white/50 brightness-125'
                    : 'opacity-90 hover:opacity-100'
                } ${
                  isDark ? 'bg-black/40 border-slate-800' : 'bg-white border-slate-300'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full inline-block shadow-sm shrink-0"
                  style={{ backgroundColor: slot.color }}
                />
                <span className="truncate max-w-[160px] font-bold" style={{ color: slot.color }}>
                  {slot.variant.name}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  (T{slot.tier} • {slot.factionName})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-[360px] sm:w-[390px] h-[370px] select-none flex items-center justify-center overflow-visible">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Radar background rings */}
          {rings.map((ring, rIdx) => {
            const rPoints = Array.from({ length: numAxes })
              .map((_, aIdx) => {
                const { x, y } = getCoordinates(aIdx, ring);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
              })
              .join(' ');
            return (
              <polygon
                key={rIdx}
                points={rPoints}
                fill={rIdx === rings.length - 1 ? (isDark ? '#0b1120' : '#f8fafc') : 'none'}
                stroke={isDark ? '#334155' : '#cbd5e1'}
                strokeWidth={rIdx === rings.length - 1 ? '1.5' : '0.75'}
                strokeDasharray={rIdx === rings.length - 1 ? 'none' : '3 3'}
                opacity={isDark ? 0.8 : 0.95}
              />
            );
          })}

          {/* Axes lines */}
          {statsKeys.map((_, aIdx) => {
            const { x, y } = getCoordinates(aIdx, 1);
            return (
              <line
                key={aIdx}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={isDark ? '#475569' : '#94a3b8'}
                strokeWidth="1.2"
              />
            );
          })}

          {/* Unit Polygons */}
          {units.map((slot) => {
            const points = computePolygonPoints(slot.variant);
            const isHighlighted = highlightedUnitId === slot.id;
            const isAnyHighlighted = Boolean(highlightedUnitId);
            const opacity = isHighlighted ? 0.5 : isAnyHighlighted ? 0.1 : 0.25;
            const strokeWidth = isHighlighted ? '3.5' : '2';

            return (
              <g key={slot.id} className="transition-all duration-300">
                <polygon
                  points={points}
                  fill={slot.color}
                  fillOpacity={opacity}
                  stroke={slot.color}
                  strokeWidth={strokeWidth}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => onHighlightUnit?.(slot.id)}
                  onMouseLeave={() => onHighlightUnit?.(null)}
                />
                {/* Vertex Dots */}
                {statsKeys.map(({ key }, idx) => {
                  const val = getStatValue(slot.variant, key);
                  const norm = val / (maxValues[idx] || 1);
                  const { x, y } = getCoordinates(idx, norm);
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r={isHighlighted ? 4 : 2.5}
                      fill={slot.color}
                      stroke={isDark ? '#000' : '#fff'}
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Axis Labels & Values */}
          {statsKeys.map((item, aIdx) => {
            const { x, y } = getCoordinates(aIdx, 1.35);

            return (
              <g key={aIdx} transform={`translate(${x}, ${y})`}>
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight ${
                    isDark ? 'fill-slate-100' : 'fill-slate-900'
                  }`}
                >
                  {item.icon} {item.label}
                </text>
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  y="14"
                  className="text-[10px] sm:text-[11px] font-mono font-semibold"
                >
                  {units.map((slot, sIdx) => {
                    const val = formatStatDisplay(slot.variant, item.key);
                    return (
                      <React.Fragment key={slot.id}>
                        {sIdx > 0 && <tspan className="fill-slate-500"> / </tspan>}
                        <tspan
                          style={{ fill: slot.color }}
                          className={highlightedUnitId === slot.id ? 'font-black underline' : 'font-bold'}
                        >
                          {val}
                        </tspan>
                      </React.Fragment>
                    );
                  })}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
