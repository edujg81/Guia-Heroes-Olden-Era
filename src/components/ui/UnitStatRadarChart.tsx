import React from 'react';
import { UnitVariant } from '../../types';

interface UnitStatRadarChartProps {
  baseVariant: UnitVariant;
  branchAVariant: UnitVariant;
  branchBVariant: UnitVariant;
  selectedBranch?: 'base' | 'branch_a' | 'branch_b' | 'comparison';
  themeMode?: 'dark' | 'light';
  themeAccentColor?: string;
}

export const UnitStatRadarChart: React.FC<UnitStatRadarChartProps> = ({
  baseVariant,
  branchAVariant,
  branchBVariant,
  selectedBranch = 'comparison',
  themeMode = 'dark',
  themeAccentColor = '#c084fc',
}) => {
  const isDark = themeMode === 'dark';

  // Normalize stats across the 3 variants so radar chart has relative scale
  const statsKeys = [
    { label: 'Ataque', key: 'attack', icon: '⚔️' },
    { label: 'Defensa', key: 'defense', icon: '🛡️' },
    { label: 'Salud', key: 'hp', icon: '❤️' },
    { label: 'Velocidad', key: 'speed', icon: '⚡' },
    { label: 'Iniciativa', key: 'initiative', icon: '⏱️' },
  ] as const;

  // Find maximum across all 3 variants for scaling + 10% buffer
  const maxValues = statsKeys.map(({ key }) => {
    const vBase = Number(baseVariant.stats[key]) || 1;
    const vA = Number(branchAVariant.stats[key]) || 1;
    const vB = Number(branchBVariant.stats[key]) || 1;
    return Math.max(vBase, vA, vB, 1) * 1.15;
  });

  const size = 340;
  const center = size / 2;
  const radius = size * 0.33;
  const numAxes = statsKeys.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Helper to compute (x, y) given an axis index and normalized value (0 to 1)
  const getCoordinates = (axisIndex: number, normalizedVal: number) => {
    // Start at top (-PI/2)
    const angle = -Math.PI / 2 + axisIndex * angleStep;
    const r = radius * Math.min(Math.max(normalizedVal, 0.05), 1);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const computePolygonPoints = (variant: UnitVariant) => {
    return statsKeys
      .map(({ key }, i) => {
        const val = Number(variant.stats[key]) || 0;
        const norm = val / maxValues[i];
        const { x, y } = getCoordinates(i, norm);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const pointsBase = computePolygonPoints(baseVariant);
  const pointsA = computePolygonPoints(branchAVariant);
  const pointsB = computePolygonPoints(branchBVariant);

  // Background web circles/rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className={`p-4 sm:p-5 rounded-xl border ${
      isDark ? 'bg-black/60 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
    } flex flex-col items-center justify-center relative`}>
      <div className="flex items-center justify-between flex-wrap gap-2 w-full mb-3 pb-2 border-b border-slate-800/40">
        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Gráfico Comparativo de Atributos
        </span>
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono font-semibold flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block shadow-sm" /> Base ({baseVariant.name})
          </span>
          <span className="flex items-center gap-1.5 text-purple-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block shadow-sm" /> Rama A ({branchAVariant.name})
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-sm" /> Rama B ({branchBVariant.name})
          </span>
        </div>
      </div>

      <div className="relative w-[340px] h-[340px] select-none flex items-center justify-center">
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
                fill={rIdx === rings.length - 1 ? (isDark ? '#0f172a' : '#f8fafc') : 'none'}
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

          {/* Base Variant Polygon */}
          <polygon
            points={pointsBase}
            fill="#94a3b8"
            fillOpacity={selectedBranch === 'base' ? 0.45 : 0.15}
            stroke="#94a3b8"
            strokeWidth={selectedBranch === 'base' ? '2.5' : '1.5'}
            className="transition-all duration-300"
          />

          {/* Branch A Polygon */}
          <polygon
            points={pointsA}
            fill="#a855f7"
            fillOpacity={selectedBranch === 'branch_a' ? 0.45 : selectedBranch === 'comparison' ? 0.25 : 0.15}
            stroke="#a855f7"
            strokeWidth={selectedBranch === 'branch_a' || selectedBranch === 'comparison' ? '2.5' : '1.5'}
            className="transition-all duration-300"
          />

          {/* Branch B Polygon */}
          <polygon
            points={pointsB}
            fill="#10b981"
            fillOpacity={selectedBranch === 'branch_b' ? 0.45 : selectedBranch === 'comparison' ? 0.25 : 0.15}
            stroke="#10b981"
            strokeWidth={selectedBranch === 'branch_b' || selectedBranch === 'comparison' ? '2.5' : '1.5'}
            className="transition-all duration-300"
          />

          {/* Axis Labels & Values */}
          {statsKeys.map((item, aIdx) => {
            const { x, y } = getCoordinates(aIdx, 1.34);
            const valBase = baseVariant.stats[item.key];
            const valA = branchAVariant.stats[item.key];
            const valB = branchBVariant.stats[item.key];

            return (
              <g key={aIdx} transform={`translate(${x}, ${y})`}>
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-xs sm:text-[13px] font-mono font-bold tracking-tight ${
                    isDark ? 'fill-slate-100' : 'fill-slate-900'
                  }`}
                >
                  {item.icon} {item.label}
                </text>
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  y="15"
                  className="text-[11px] sm:text-xs font-mono fill-slate-400 font-semibold"
                >
                  {valBase} / <tspan className="fill-purple-400 font-bold">{valA}</tspan> / <tspan className="fill-emerald-400 font-bold">{valB}</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
