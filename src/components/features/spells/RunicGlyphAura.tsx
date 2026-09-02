import React from 'react';

export interface RunicGlyphAuraProps {
  school: string;
  isTier4?: boolean;
  isMasterful?: boolean;
  className?: string;
  children?: React.ReactNode;
  themeMode?: 'dark' | 'light';
}

// Canonical runes from the ancient magic lore of Jadame
const RUNES_MAP: Record<string, string[]> = {
  Sombras: ['ᚦ', 'ᛟ', 'ᚱ', 'ᛉ'], // Thurisaz, Othala, Raidho, Algiz
  Luz: ['ᛋ', 'ᛞ', 'ᚹ', 'ᚷ'], // Sowilo, Dagaz, Wunjo, Gebo
  Primigenia: ['ᚢ', 'ᛇ', 'ᛒ', 'ᚲ'], // Uruz, Eihwaz, Berkano, Kenaz
  Arcana: ['ᚨ', 'ᛖ', 'ᛗ', 'ᛜ'], // Ansuz, Ehwaz, Mannaz, Ingwaz
  Universal: ['ᛚ', 'ᛃ', 'ᚺ', 'ᛏ'], // Laguz, Jera, Hagalaz, Tiwaz
};

export const RunicGlyphAura: React.FC<RunicGlyphAuraProps> = ({
  school,
  isTier4 = false,
  isMasterful = false,
  className = '',
  children,
  themeMode = 'dark',
}) => {
  if (!isTier4 && !isMasterful) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  // Determine school theme
  const getSchoolKey = (): string => {
    if (school.includes('Sombra')) return 'Sombras';
    if (school.includes('Luz')) return 'Luz';
    if (school.includes('Primigenia')) return 'Primigenia';
    if (school.includes('Arcana')) return 'Arcana';
    return 'Universal';
  };

  const schoolKey = getSchoolKey();
  const runes = RUNES_MAP[schoolKey] || RUNES_MAP.Universal;

  // School color themes for the aura & particles
  const getPalette = () => {
    switch (schoolKey) {
      case 'Sombras':
        return {
          glow: 'rgba(168, 85, 247, 0.45)',
          ringBorder: 'border-purple-500/30',
          runeColor: themeMode === 'light' ? 'text-purple-700' : 'text-purple-300',
          ambientGrad: 'from-purple-600/10 via-purple-900/5 to-transparent',
          badgeText: 'text-purple-400',
        };
      case 'Luz':
        return {
          glow: 'rgba(245, 158, 11, 0.5)',
          ringBorder: 'border-amber-400/30',
          runeColor: themeMode === 'light' ? 'text-amber-700' : 'text-amber-300',
          ambientGrad: 'from-amber-500/15 via-yellow-600/5 to-transparent',
          badgeText: 'text-amber-400',
        };
      case 'Primigenia':
        return {
          glow: 'rgba(16, 185, 129, 0.45)',
          ringBorder: 'border-emerald-500/30',
          runeColor: themeMode === 'light' ? 'text-emerald-700' : 'text-emerald-300',
          ambientGrad: 'from-emerald-500/10 via-emerald-900/5 to-transparent',
          badgeText: 'text-emerald-400',
        };
      case 'Arcana':
        return {
          glow: 'rgba(99, 102, 241, 0.45)',
          ringBorder: 'border-indigo-500/30',
          runeColor: themeMode === 'light' ? 'text-indigo-700' : 'text-indigo-300',
          ambientGrad: 'from-indigo-500/15 via-blue-900/5 to-transparent',
          badgeText: 'text-indigo-400',
        };
      default:
        return {
          glow: 'rgba(6, 182, 212, 0.45)',
          ringBorder: 'border-cyan-500/30',
          runeColor: themeMode === 'light' ? 'text-cyan-700' : 'text-cyan-300',
          ambientGrad: 'from-cyan-500/10 via-cyan-900/5 to-transparent',
          badgeText: 'text-cyan-400',
        };
    }
  };

  const palette = getPalette();

  return (
    <div
      className={`relative group ${className}`}
      style={{
        ['--halo-glow' as string]: palette.glow,
      }}
    >
      {/* Ambient Runic Halo Glow */}
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${palette.ambientGrad} blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform-gpu animate-runic-aura`}
        style={{ zIndex: 0 }}
      />

      {/* Runic Orbit Ring for Tier 4 / Masterful */}
      <div
        className={`absolute -inset-0.5 rounded-2xl border border-dashed ${palette.ringBorder} opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none transform-gpu`}
        style={{ zIndex: 0 }}
      />

      {/* Floating Ancient Runes (GPU-accelerated translate3d particles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
        {/* Top-Left Rune */}
        <span
          className={`absolute top-1.5 left-2 font-serif text-[11px] font-bold select-none transform-gpu animate-rune-a ${palette.runeColor} opacity-70`}
          title="Glifo Rúnico de Poder"
        >
          {runes[0]}
        </span>

        {/* Top-Right Rune */}
        <span
          className={`absolute top-1.5 right-12 font-serif text-[11px] font-bold select-none transform-gpu animate-rune-b ${palette.runeColor} opacity-70`}
          title="Glifo Rúnico de Resonancia"
        >
          {runes[1]}
        </span>

        {/* Bottom-Left Rune */}
        <span
          className={`absolute bottom-3 left-4 font-serif text-[10px] font-bold select-none transform-gpu animate-rune-c ${palette.runeColor} opacity-60`}
          title="Glifo Rúnico Elemental"
        >
          {runes[2]}
        </span>

        {/* Bottom-Right Rune */}
        <span
          className={`absolute bottom-3 right-6 font-serif text-[10px] font-bold select-none transform-gpu animate-rune-d ${palette.runeColor} opacity-65`}
          title="Glifo Rúnico Arcano"
        >
          {runes[3]}
        </span>

        {/* Subtle Runic Crown Indicator */}
        {isTier4 && (
          <div className="absolute top-0 right-14 transform-gpu">
            <span
              className={`inline-block px-1.5 py-0.2 rounded-b text-[8px] font-mono font-bold uppercase tracking-widest border border-t-0 shadow-xs ${
                themeMode === 'light'
                  ? 'bg-amber-100 text-amber-950 border-amber-300'
                  : 'bg-black/80 text-amber-300 border-amber-500/50'
              }`}
            >
              ✦ TIER IV MAGISTRAL ✦
            </span>
          </div>
        )}
      </div>

      {/* Core Children Content */}
      <div className="relative z-1">{children}</div>
    </div>
  );
};
