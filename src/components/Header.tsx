import React, { useState } from 'react';
import { Shield, Sparkles, Flame, Eye, Coins, Castle, Scroll, BookOpen, ChevronDown, ChevronUp, Check, Flag, Sun, Moon, Zap, Keyboard, Maximize2 } from 'lucide-react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { FactionImage } from './ui/FactionImage';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedFaction: FactionId;
  setSelectedFaction: (faction: FactionId) => void;
  themeMode?: 'dark' | 'light';
  setThemeMode?: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
  onToggleTacticalCheatSheet?: () => void;
  onToggleKeyboardHelp?: () => void;
  onToggleZenMode?: () => void;
  fontScale?: '100' | '115' | '130';
  onCycleFontScale?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedFaction,
  setSelectedFaction,
  themeMode = 'dark',
  setThemeMode,
  onToggleTacticalCheatSheet,
  onToggleKeyboardHelp,
  onToggleZenMode,
  fontScale = '100',
  onCycleFontScale,
}) => {
  const [showMobileHud, setShowMobileHud] = useState(false);
  const [showFactionDropdown, setShowFactionDropdown] = useState(false);

  const tabs = [
    { id: 'build-order', label: 'Cronograma', icon: Shield },
    { id: 'structures', label: 'Estructuras', icon: Castle },
    { id: 'faction-laws', label: 'Leyes', icon: Scroll },
    { id: 'spells', label: 'Hechizos', icon: BookOpen },
    { id: 'combat-tactics', label: 'Tácticas', icon: Flame },
    { id: 'units', label: 'Unidades', icon: Eye },
    { id: 'hero-skills', label: 'Héroes', icon: Sparkles },
  ];

  const currentMeta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  const factionList: FactionId[] = ['Mazmorra', 'Templo', 'Foresta', 'Necrópolis', 'Colmena', 'Cisma'];

  const toggleTheme = () => {
    if (setThemeMode) {
      setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  return (
    <header className={`bg-[#0c0c0e]/95 border-b ${theme.headerBorder} shadow-[0_4px_25px_rgba(0,0,0,0.8)] sticky top-0 z-40 backdrop-blur-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
        {/* Top bar: Título a la izquierda, Selector de Facción y Acciones a la derecha */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 pb-2 border-b ${theme.borderSubtle}`}>
          {/* Izquierda: Título */}
          <div className="flex items-center gap-2 min-w-0">
            <FactionImage faction={selectedFaction} size="sm" className="w-6 h-6" />
            <h1 className="text-sm sm:text-lg md:text-xl font-serif text-white uppercase italic truncate">
              Guía de Conquista: <span className={`${theme.textAccent} font-bold`}>{selectedFaction}</span>
            </h1>
          </div>

          {/* Derecha: Selector de Facción + Ficha Técnica + Zen + Ayuda + Modo Claro + % Fuente */}
          <div className="flex items-center justify-end flex-wrap gap-1 sm:gap-1.5 shrink-0 ml-auto">
            {/* Selector de Facción */}
            <div className="relative">
              <button
                onClick={() => setShowFactionDropdown(!showFactionDropdown)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${theme.bgBadge} ${theme.border} ${theme.textAccent} hover:brightness-125 shadow-sm`}
                title="Cambiar Facción de Jadame"
              >
                <FactionImage faction={selectedFaction} size="xs" className="w-3.5 h-3.5" />
                <span>{selectedFaction}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Menú Desplegable de Facción */}
              {showFactionDropdown && (
                <div className={`absolute right-0 mt-2 w-64 bg-[#101014] border ${theme.dropdownBorder} rounded-xl shadow-2xl z-50 p-2 space-y-1 backdrop-blur-xl`}>
                  <div className={`text-[10px] uppercase font-mono tracking-wider text-slate-400 px-2 py-1 border-b ${theme.borderSubtle}`}>
                    Seleccionar Facción de Jadame
                  </div>
                  {factionList.map((fId) => {
                    const meta = FACTIONS_METADATA[fId];
                    const fTheme = getFactionTheme(fId, themeMode);
                    const isSelected = selectedFaction === fId;
                    return (
                      <button
                        key={fId}
                        onClick={() => {
                          setSelectedFaction(fId);
                          setShowFactionDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono text-left transition-all cursor-pointer ${
                          isSelected ? `${fTheme.tabActive}` : 'text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <FactionImage faction={fId} size="xs" className="w-4 h-4" />
                            <span className="font-semibold">{meta.name}</span>
                            <span
                              className="text-[9px] px-1.5 py-0.2 rounded font-sans font-bold"
                              style={{
                                color: fTheme.hexPrimary,
                                backgroundColor: themeMode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
                                border: `1px solid ${fTheme.hexPrimary}40`,
                              }}
                            >
                              {fTheme.themeName}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-sans">{meta.region}</div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5" style={{ color: fTheme.hexPrimary }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Ficha Técnica */}
            {onToggleTacticalCheatSheet && (
              <button
                onClick={onToggleTacticalCheatSheet}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${theme.bgBadge} ${theme.border} text-amber-400 hover:brightness-125 shadow-sm`}
                title="Abrir Ficha Técnica / Modo Compacto (Atajo: C)"
                aria-label="Abrir ficha técnica de segunda pantalla"
              >
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400/30" />
                <span className="hidden sm:inline font-sans text-xs">Ficha Técnica</span>
                <kbd className="hidden lg:inline px-1 py-0.2 rounded bg-black/50 text-[10px] text-amber-300 font-mono border border-amber-900/60">C</kbd>
              </button>
            )}

            {/* Modo Inmersivo Zen Commander */}
            {onToggleZenMode && (
              <button
                onClick={onToggleZenMode}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${theme.bgBadge} ${theme.borderSubtle} text-emerald-400 hover:brightness-125 shadow-sm`}
                title="Modo Inmersivo Zen Commander a Pantalla Completa (Atajo: Z)"
                aria-label="Activar modo inmersivo Zen Commander"
              >
                <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                <span className="hidden sm:inline font-sans text-xs">Zen</span>
                <kbd className="hidden lg:inline px-1 py-0.2 rounded bg-black/50 text-[10px] text-emerald-300 font-mono border border-emerald-900/60">Z</kbd>
              </button>
            )}

            {/* Atajos / Ayuda */}
            {onToggleKeyboardHelp && (
              <button
                onClick={onToggleKeyboardHelp}
                className={`flex items-center gap-1 px-2 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${theme.bgBadge} ${theme.borderSubtle} text-slate-300 hover:text-white hover:border-slate-500 shadow-sm`}
                title="Guía de Atajos de Teclado (Atajo: ?)"
                aria-label="Ver atajos de teclado"
              >
                <Keyboard className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                <kbd className="px-1 py-0.2 rounded bg-black/50 text-[10px] text-slate-300 font-mono border border-slate-700">?</kbd>
              </button>
            )}

            {/* Modo Claro / Oscuro */}
            {setThemeMode && (
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${theme.bgBadge} ${theme.border} ${theme.textAccent} hover:brightness-110 shadow-sm`}
                title={themeMode === 'dark' ? 'Cambiar a Modo Claro (M)' : 'Cambiar a Modo Oscuro (M)'}
                aria-label="Alternar modo claro y oscuro"
              >
                {themeMode === 'dark' ? (
                  <>
                    <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                    <span className="hidden sm:inline font-sans text-xs">Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                    <span className="hidden sm:inline font-sans text-xs">Oscuro</span>
                  </>
                )}
              </button>
            )}

            {/* Selector % Escala Fuente */}
            {onCycleFontScale && (
              <button
                onClick={onCycleFontScale}
                className={`flex items-center gap-1 px-2 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${theme.bgBadge} ${theme.borderSubtle} text-slate-300 hover:text-white hover:border-slate-500 shadow-sm`}
                title={`Escala de Fuente UI: ${fontScale}% (Clic para alternar 100% → 115% → 130% o tecla 'A')`}
                aria-label={`Ajustar tamaño de fuente, valor actual: ${fontScale}%`}
              >
                <span className="font-serif font-bold text-xs text-amber-400">A</span>
                <span className="text-[10px] font-mono text-slate-300 font-bold">{fontScale}%</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation - Single Row sin barra de desplazamiento horizontal */}
        <div className="pt-1.5 sm:pt-2">
          <nav className="grid grid-cols-7 gap-1 sm:gap-1.5 w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-1.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-tight transition-all whitespace-nowrap cursor-pointer min-h-[28px] sm:min-h-[30px] min-w-0 ${
                    isActive
                      ? theme.tabActive
                      : `bg-black/40 text-slate-400 hover:bg-white/5 hover:text-slate-200 border ${theme.borderSubtle} hover:border-slate-600`
                  }`}
                  title={tab.label}
                >
                  <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-white' : theme.textAccent}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
