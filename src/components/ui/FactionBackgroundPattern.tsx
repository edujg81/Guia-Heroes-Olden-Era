import React from 'react';
import { FactionId } from '../../data/factionDataProvider';

interface FactionBackgroundPatternProps {
  faction: FactionId;
  themeMode: 'dark' | 'light';
}

export const FactionBackgroundPattern: React.FC<FactionBackgroundPatternProps> = ({
  faction,
  themeMode,
}) => {
  const isDark = themeMode === 'dark';
  // Higher opacity in light mode to ensure contrast on white/light pastel backgrounds
  const baseOpacity = isDark ? 0.045 : 0.09;

  // Colors adapted for dark (glowing lights) vs light (rich saturated inks)
  const palette = {
    Mazmorra: {
      primary: isDark ? '#c084fc' : '#7e22ce',
      secondary: isDark ? '#a855f7' : '#9333ea',
      accent: isDark ? '#7e22ce' : '#6b21a8',
    },
    Templo: {
      primary: isDark ? '#fbbf24' : '#b45309',
      secondary: isDark ? '#f59e0b' : '#d97706',
      accent: isDark ? '#b45309' : '#92400e',
    },
    Necrópolis: {
      primary: isDark ? '#94a3b8' : '#334155',
      secondary: isDark ? '#64748b' : '#475569',
      accent: isDark ? '#475569' : '#1e293b',
    },
    Foresta: {
      primary: isDark ? '#34d399' : '#047857',
      secondary: isDark ? '#10b981' : '#059669',
      accent: isDark ? '#059669' : '#065f46',
    },
    Colmena: {
      primary: isDark ? '#fb923c' : '#c2410c',
      secondary: isDark ? '#f97316' : '#ea580c',
      accent: isDark ? '#ea580c' : '#9a3412',
    },
    Cisma: {
      primary: isDark ? '#38bdf8' : '#0369a1',
      secondary: isDark ? '#0284c7' : '#0284c7',
      accent: isDark ? '#0ea5e9' : '#075985',
    },
  };

  const currentColors = palette[faction as keyof typeof palette] || palette.Mazmorra;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-all duration-700"
      style={{ opacity: baseOpacity }}
    >
      {/* Mazmorra: Obsidian Geometry & Arcane Shards */}
      {(faction === 'Mazmorra') && (
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-dungeon" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M60 0 L120 60 L60 120 L0 60 Z M60 20 L100 60 L60 100 L20 60 Z"
                fill="none"
                stroke={currentColors.primary}
                strokeWidth={isDark ? "1.2" : "1.8"}
              />
              <circle cx="60" cy="60" r="8" fill="none" stroke={currentColors.secondary} strokeWidth={isDark ? "1" : "1.6"} />
              <path d="M0 0 L120 120 M120 0 L0 120" stroke={currentColors.accent} strokeWidth={isDark ? "0.8" : "1.2"} strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-dungeon)" />
        </svg>
      )}

      {/* Templo: Radiant Sunburst & Cathedral Rose Lattice */}
      {(faction === 'Templo') && (
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-temple" width="140" height="140" patternUnits="userSpaceOnUse">
              <circle cx="70" cy="70" r="45" fill="none" stroke={currentColors.primary} strokeWidth={isDark ? "1.2" : "1.8"} />
              <circle cx="70" cy="70" r="20" fill="none" stroke={currentColors.secondary} strokeWidth={isDark ? "1" : "1.6"} />
              <path
                d="M70 10 L70 130 M10 70 L130 70 M28 28 L112 112 M112 28 L28 112"
                stroke={currentColors.secondary}
                strokeWidth={isDark ? "0.9" : "1.4"}
              />
              <path
                d="M70 0 L140 70 L70 140 L0 70 Z"
                fill="none"
                stroke={currentColors.accent}
                strokeWidth={isDark ? "0.8" : "1.2"}
                strokeDasharray="4 4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-temple)" />
        </svg>
      )}

      {/* Necrópolis: Gothic Arches & Crypt Filigree */}
      {(faction === 'Necrópolis') && (
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-necropolis" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M50 0 C25 25 25 75 50 100 C75 75 75 25 50 0 Z"
                fill="none"
                stroke={currentColors.primary}
                strokeWidth={isDark ? "1.2" : "1.8"}
              />
              <path
                d="M0 50 C25 25 75 25 100 50 C75 75 25 75 0 50 Z"
                fill="none"
                stroke={currentColors.secondary}
                strokeWidth={isDark ? "1" : "1.5"}
              />
              <line x1="50" y1="10" x2="50" y2="90" stroke={currentColors.accent} strokeWidth={isDark ? "0.8" : "1.2"} />
              <line x1="10" y1="50" x2="90" y2="50" stroke={currentColors.accent} strokeWidth={isDark ? "0.8" : "1.2"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-necropolis)" />
        </svg>
      )}

      {/* Foresta: Druidic Leaf Veins & Celtic Interlace */}
      {(faction === 'Foresta') && (
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-sylvan" width="110" height="110" patternUnits="userSpaceOnUse">
              <path
                d="M55 0 Q90 55 55 110 Q20 55 55 0 Z"
                fill="none"
                stroke={currentColors.primary}
                strokeWidth={isDark ? "1.2" : "1.8"}
              />
              <path
                d="M0 55 Q55 90 110 55 Q55 20 0 55 Z"
                fill="none"
                stroke={currentColors.secondary}
                strokeWidth={isDark ? "1" : "1.5"}
              />
              <circle cx="55" cy="55" r="14" fill="none" stroke={currentColors.accent} strokeWidth={isDark ? "0.9" : "1.3"} />
              <circle cx="55" cy="55" r="4" fill={currentColors.secondary} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-sylvan)" />
        </svg>
      )}

      {/* Colmena / Enjambre: Chitinous Honeycomb Grid & Demonic Tendrils */}
      {(faction === 'Colmena') && (
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-hive" width="90" height="155.88" patternUnits="userSpaceOnUse">
              <path
                d="M45 0 L90 25.98 L90 77.94 L45 103.92 L0 77.94 L0 25.98 Z M45 51.96 L90 77.94 L90 129.9 L45 155.88 L0 129.9 L0 77.94 Z"
                fill="none"
                stroke={currentColors.primary}
                strokeWidth={isDark ? "1.2" : "1.8"}
              />
              <circle cx="45" cy="25.98" r="5" fill="none" stroke={currentColors.secondary} strokeWidth={isDark ? "0.8" : "1.4"} />
              <circle cx="45" cy="103.92" r="5" fill="none" stroke={currentColors.secondary} strokeWidth={isDark ? "0.8" : "1.4"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-hive)" />
        </svg>
      )}

      {/* Cisma: Dimensional Astral Fractures & Void Glyphs */}
      {(faction === 'Cisma') && (
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-schism" width="130" height="130" patternUnits="userSpaceOnUse">
              <polygon
                points="65,10 120,65 65,120 10,65"
                fill="none"
                stroke={currentColors.primary}
                strokeWidth={isDark ? "1.2" : "1.8"}
              />
              <polygon
                points="65,30 100,65 65,100 30,65"
                fill="none"
                stroke={currentColors.secondary}
                strokeWidth={isDark ? "0.9" : "1.4"}
              />
              <line x1="0" y1="0" x2="130" y2="130" stroke={currentColors.accent} strokeWidth={isDark ? "0.7" : "1.1"} strokeDasharray="5 5" />
              <line x1="130" y1="0" x2="0" y2="130" stroke={currentColors.accent} strokeWidth={isDark ? "0.7" : "1.1"} strokeDasharray="5 5" />
              <circle cx="65" cy="65" r="6" fill="none" stroke={currentColors.primary} strokeWidth={isDark ? "1.2" : "1.6"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-schism)" />
        </svg>
      )}
    </div>
  );
};
