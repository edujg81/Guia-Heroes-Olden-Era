import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Sliders,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Flag,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Zap,
  X,
  Shield,
  Castle,
  Scroll,
  BookOpen,
  Flame,
  Eye,
} from 'lucide-react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../../data/factionDataProvider';

interface ZenCommanderControllerProps {
  isZenMode: boolean;
  onExitZenMode: () => void;
  selectedFaction: FactionId;
  onSelectFaction: (faction: FactionId) => void;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  ambientParticlesEnabled: boolean;
  onToggleAmbientParticles: () => void;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  fontScale?: '100' | '115' | '130';
  onCycleFontScale?: () => void;
}

const FACTIONS: { id: FactionId; name: string; key: string }[] = [
  { id: 'Mazmorra', name: 'Mazmorra', key: '1' },
  { id: 'Templo', name: 'Templo', key: '2' },
  { id: 'Foresta', name: 'Foresta', key: '3' },
  { id: 'Necrópolis', name: 'Necrópolis', key: '4' },
  { id: 'Colmena', name: 'Colmena', key: '5' },
  { id: 'Cisma', name: 'Cisma', key: '6' },
];

const TABS = [
  { id: 'build-order', label: 'Cronograma', icon: Shield },
  { id: 'structures', label: 'Estructuras', icon: Castle },
  { id: 'faction-laws', label: 'Leyes', icon: Scroll },
  { id: 'spells', label: 'Hechizos', icon: BookOpen },
  { id: 'combat-tactics', label: 'Tácticas', icon: Flame },
  { id: 'units', label: 'Unidades', icon: Eye },
  { id: 'hero-skills', label: 'Héroes', icon: Sparkles },
];

export const ZenCommanderController: React.FC<ZenCommanderControllerProps> = ({
  isZenMode,
  onExitZenMode,
  selectedFaction,
  onSelectFaction,
  selectedDay,
  onSelectDay,
  activeTab,
  onSelectTab,
  ambientParticlesEnabled,
  onToggleAmbientParticles,
  themeMode,
  onToggleTheme,
  fontScale = '100',
  onCycleFontScale,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const theme = getFactionTheme(selectedFaction, themeMode);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;

  // Detectar estado de fullscreen nativo
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch {
      // Si el navegador o iframe restringe el API nativo de pantalla completa,
      // el modo Zen UI sigue activo al 100% de la ventana.
    }
  };

  if (!isZenMode) return null;

  return (
    <div
      id="zen-commander-floating-controller"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-auto font-sans animate-fadeIn"
    >
      {/* PANEL EXPANDIDO */}
      {isExpanded && (
        <div
          className={`mb-3 w-84 sm:w-96 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            themeMode === 'light'
              ? 'bg-white/95 border-slate-300 text-slate-900 shadow-slate-900/20'
              : 'bg-[#0f0e17]/95 border-slate-800 text-slate-100 shadow-black/90'
          }`}
          style={{
            borderTopWidth: '3px',
            borderTopColor: theme.hexPrimary,
          }}
        >
          {/* Header del Panel Expandido */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/60 mb-3">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: theme.hexPrimary }}
              />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Zen Commander HUD
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                100% Área Útil
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Colapsar panel flotante"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* 1. Selector de Facción (1..6) */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Flag className="w-3 h-3 text-amber-400" />
                  <span>Facción Activa:</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Teclas: 1-6</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {FACTIONS.map((f) => {
                  const isSelected = selectedFaction === f.id;
                  const fTheme = getFactionTheme(f.id, themeMode);
                  return (
                    <button
                      key={f.id}
                      onClick={() => onSelectFaction(f.id)}
                      className={`px-2 py-1.5 rounded-lg font-mono text-[11px] font-bold flex items-center justify-between gap-1 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                          : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate">{f.name}</span>
                      <kbd className="text-[9px] px-1 py-0.2 rounded bg-black/60 text-slate-400 font-mono border border-slate-700">
                        {f.key}
                      </kbd>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Cronograma de Campaña: Stepper de Día (J / K) */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>Campaña: Día {selectedDay} / 56</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Teclas: J / K</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectDay(Math.max(1, selectedDay - 1))}
                  disabled={selectedDay <= 1}
                  className="p-1.5 rounded-lg bg-black/40 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Día Anterior (J)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Acceso Rápido por Días Clave */}
                <div className="flex-1 grid grid-cols-5 gap-1 text-[10px] font-mono">
                  {[1, 7, 14, 21, 28].map((day) => (
                    <button
                      key={day}
                      onClick={() => onSelectDay(day)}
                      className={`py-1 rounded text-center font-bold border transition-colors cursor-pointer ${
                        selectedDay === day
                          ? 'bg-amber-600 text-white border-amber-500'
                          : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      D{day}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onSelectDay(Math.min(56, selectedDay + 1))}
                  disabled={selectedDay >= 56}
                  className="p-1.5 rounded-lg bg-black/40 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Día Siguiente (K)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. Selector de Pestañas (Q / E) */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Layers className="w-3 h-3 text-amber-400" />
                  <span>Pestaña Activa:</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Teclas: Q / E</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onSelectTab(tab.id)}
                      className={`p-1.5 rounded-lg flex flex-col items-center justify-center gap-1 text-[10px] font-mono font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                          : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-full">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Interruptores de Entorno Zen */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {/* Partículas Ambientales */}
                <button
                  onClick={onToggleAmbientParticles}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    ambientParticlesEnabled
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                  title="Activar o desactivar partículas suaves de facción"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Partículas: {ambientParticlesEnabled ? 'ON' : 'OFF'}</span>
                </button>

                {/* Pantalla Completa Nativa */}
                <button
                  onClick={handleToggleFullscreen}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1.5 bg-black/40 text-slate-300 border border-slate-800 hover:text-white transition-colors cursor-pointer"
                  title="Alternar Pantalla Completa del Navegador"
                >
                  {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  <span>{isFullscreen ? 'Ventana' : 'F11'}</span>
                </button>
              </div>

              {/* Escala de Fuente UI */}
              {onCycleFontScale && (
                <button
                  onClick={onCycleFontScale}
                  className="px-2 py-1 rounded-lg bg-black/40 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-mono font-bold flex items-center gap-1"
                  title={`Escala de Fuente UI: ${fontScale}% (Clic para alternar 100% → 115% → 130%)`}
                >
                  <span className="font-serif text-amber-400">A</span>
                  <span className="text-[10px]">{fontScale}%</span>
                </button>
              )}

              {/* Tema Claro/Oscuro */}
              <button
                onClick={onToggleTheme}
                className="p-1.5 rounded-lg bg-black/40 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Modo Claro/Oscuro (M)"
              >
                {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-purple-400" />}
              </button>
            </div>

            {/* 5. Botón de Salir del Modo Zen */}
            <div className="pt-1">
              <button
                onClick={onExitZenMode}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer shadow-md"
              >
                <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Restaurar Interfaz Estándar (Z / Esc)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCKED PILL (BARRA COLAPSADA SIEMPRE VISIBLE) */}
      <div
        className={`flex items-center gap-1.5 p-1.5 sm:p-2 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          themeMode === 'light'
            ? 'bg-white/95 border-slate-300 text-slate-900 shadow-slate-900/20'
            : 'bg-[#0e0c15]/95 border-slate-800 text-slate-200 shadow-black/90'
        }`}
        style={{
          borderLeftWidth: '3px',
          borderLeftColor: theme.hexPrimary,
        }}
      >
        {/* Zen Badge & Status */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold transition-colors cursor-pointer"
          title="Abrir panel rápido Zen Commander"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline">Zen Commander</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 font-mono text-slate-300 border border-slate-700">
            {selectedFaction} • D{selectedDay}
          </span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {/* Quick Day Stepper */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onSelectDay(Math.max(1, selectedDay - 1))}
            disabled={selectedDay <= 1}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Día Anterior (J)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono font-bold text-slate-300 px-1">
            D{selectedDay}
          </span>
          <button
            onClick={() => onSelectDay(Math.min(56, selectedDay + 1))}
            disabled={selectedDay >= 56}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Día Siguiente (K)"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-[1px] h-4 bg-slate-800 mx-0.5" />

        {/* Exit Zen Button with Z badge */}
        <button
          onClick={onExitZenMode}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 border border-slate-700"
          title="Salir del Modo Zen (Atajo: Z o Esc)"
        >
          <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
          <kbd className="text-[9px] px-1 py-0.2 rounded bg-black/60 text-amber-300 font-mono border border-slate-700">
            Z
          </kbd>
        </button>
      </div>
    </div>
  );
};
