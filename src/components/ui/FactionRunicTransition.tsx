import React, { useEffect, useState, useRef } from 'react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../../data/factionDataProvider';
import { Sparkles, Shield, Skull, Mountain, Trees, Bug, Flame } from 'lucide-react';

interface FactionRunicTransitionProps {
  selectedFaction: FactionId;
  themeMode?: 'dark' | 'light';
}

const FACTION_ICONS: Record<FactionId, React.ComponentType<{ className?: string }>> = {
  Mazmorra: Mountain,
  Templo: Shield,
  Foresta: Trees,
  Necrópolis: Skull,
  Colmena: Bug,
  Cisma: Flame,
} as Record<FactionId, React.ComponentType<{ className?: string }>>;

export const FactionRunicTransition: React.FC<FactionRunicTransitionProps> = ({
  selectedFaction,
  themeMode = 'dark',
}) => {
  const [isActive, setIsActive] = useState(false);
  const prevFactionRef = useRef<FactionId>(selectedFaction);
  const theme = getFactionTheme(selectedFaction, themeMode);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const FactionIcon = FACTION_ICONS[selectedFaction] || Shield;

  useEffect(() => {
    // Only trigger if faction genuinely changed
    if (prevFactionRef.current !== selectedFaction) {
      prevFactionRef.current = selectedFaction;
      setIsActive(true);

      const timer = setTimeout(() => {
        setIsActive(false);
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [selectedFaction]);

  if (!isActive) {
    return (
      <div className="sr-only" role="status" aria-live="polite">
        Facción activa: {meta.name}, {meta.region}. Mecánica: {meta.primaryMechanic}.
      </div>
    );
  }

  return (
    <aside
      aria-label="Notificación de cambio de facción"
      className="fixed inset-x-0 top-16 z-50 flex justify-center pointer-events-none px-4 transition-all duration-500 animate-fadeIn"
    >
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        Facción activa cambiada a {meta.name}, región {meta.region}. Mecánica principal: {meta.primaryMechanic}.
      </div>

      <div
        className={`relative max-w-md w-full p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl flex items-center gap-4 transition-all overflow-hidden ${
          themeMode === 'light'
            ? 'bg-white/95 text-slate-900 border-slate-300'
            : 'bg-[#100d18]/95 text-slate-100 border-slate-700'
        }`}
        style={{
          boxShadow: `0 10px 40px -10px ${theme.hexPrimary}60, 0 0 20px 0 ${theme.hexPrimary}30`,
          borderColor: `${theme.hexPrimary}80`,
        }}
      >
        {/* Background Runic Flare Pulse */}
        <div
          className="absolute -right-10 -top-10 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 animate-pulse"
          style={{ backgroundColor: theme.hexPrimary }}
        />

        {/* Heraldry Icon with Runic Ring */}
        <div className="relative shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg"
            style={{
              backgroundColor: `${theme.hexPrimary}20`,
              borderColor: `${theme.hexPrimary}80`,
              color: theme.hexPrimary,
            }}
          >
            <FactionIcon className="w-6 h-6" />
          </div>
          <div
            className="absolute -inset-1 rounded-xl border border-dashed opacity-50 animate-spin-slow pointer-events-none"
            style={{ borderColor: theme.hexPrimary }}
          />
        </div>

        {/* Lore & Faction Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
              style={{
                backgroundColor: `${theme.hexPrimary}15`,
                color: theme.hexPrimary,
                borderColor: `${theme.hexPrimary}40`,
              }}
            >
              Facción Seleccionada
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {meta.region}
            </span>
          </div>

          <h3 className="text-base font-serif font-bold tracking-tight text-white dark:text-white truncate">
            {meta.name}
          </h3>

          <p className="text-xs font-mono text-slate-300 flex items-center gap-1.5 truncate">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{meta.primaryMechanic}</span>
          </p>
        </div>
      </div>
    </aside>
  );
};
