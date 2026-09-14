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

// Utility to parse damage ranges (e.g. "1-3" -> 2, "10-40" -> 25, "18-20" -> 19)
export const parseAverageDamage = (damage: string | number | undefined): number => {
  if (typeof damage === 'number') return damage;
  if (!damage) return 0;
  const parts = String(damage).split('-').map((s) => parseFloat(s.trim()));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return (parts[0] + parts[1]) / 2;
  }
  const single = parseFloat(String(damage));
  return isNaN(single) ? 0 : single;
};

export const UnitStatRadarChart: React.FC<UnitStatRadarChartProps> = ({
  baseVariant,
  branchAVariant,
  branchBVariant,
  selectedBranch = 'comparison',
  themeMode = 'dark',
  themeAccentColor = '#c084fc',
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

  // Find maximum across all 3 variants for scaling + 15% buffer
  const maxValues = statsKeys.map(({ key }) => {
    const vBase = getStatValue(baseVariant, key);
    const vA = getStatValue(branchAVariant, key);
    const vB = getStatValue(branchBVariant, key);
    return Math.max(vBase, vA, vB, 1) * 1.15;
  });

  const size = 380;
  const center = size / 2;
  const radius = size * 0.31;
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
        const val = getStatValue(variant, key);
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
        <div>
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Gráfico Hexagonal Comparativo de Atributos
          </span>
          <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
            Incluye <strong>Daño Medio</strong> (promedio del rango mín-máx de impacto) junto a Ataque, Defensa, Salud, Velocidad e Iniciativa.
          </span>
        </div>
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

      <div className="relative w-[360px] sm:w-[380px] h-[370px] select-none flex items-center justify-center overflow-visible">
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
            const valBase = formatStatDisplay(baseVariant, item.key);
            const valA = formatStatDisplay(branchAVariant, item.key);
            const valB = formatStatDisplay(branchBVariant, item.key);

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
                  className="text-[10px] sm:text-[11px] font-mono fill-slate-400 font-semibold"
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
