import React, { useState } from 'react';
import { Shield, Sparkles, Flame, Eye, Coins, Castle, Scroll, BookOpen, ChevronDown, ChevronUp, Check, Flag, Sun, Moon, Zap, Keyboard } from 'lucide-react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedFaction: FactionId;
  setSelectedFaction: (faction: FactionId) => void;
  themeMode?: 'dark' | 'light';
  setThemeMode?: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
  onToggleTacticalCheatSheet?: () => void;
  onToggleKeyboardHelp?: () => void;
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
}) => {
  const [showMobileHud, setShowMobileHud] = useState(false);
  const [showFactionDropdown, setShowFactionDropdown] = useState(false);

  const tabs = [
    { id: 'build-order', label: 'Cronograma', mobileLabel: 'Cronograma', icon: Shield },
    { id: 'structures', label: 'Estructuras & Ciudad', mobileLabel: 'Ciudad', icon: Castle },
    { id: 'faction-laws', label: 'Leyes de Facción', mobileLabel: 'Leyes', icon: Scroll },
    { id: 'spells', label: 'Grimorio & Hechizos', mobileLabel: 'Grimorio', icon: BookOpen },
    { id: 'combat-tactics', label: 'Tácticas', mobileLabel: 'Tácticas', icon: Flame },
    { id: 'units', label: 'Unidades', mobileLabel: 'Unidades', icon: Eye },
    { id: 'hero-skills', label: 'Héroes & Habilidades', mobileLabel: 'Héroes', icon: Sparkles },
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        {/* Top bar with title, faction switcher and quick status indicators */}
        <div className={`flex items-center justify-between gap-3 pb-2 sm:pb-3 border-b ${theme.borderSubtle}`}>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              <span className={`${theme.textAccent} text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold uppercase font-mono truncate`}>
                Olden Era • Campaña 56 Días
              </span>
              <a
                href={
                  selectedFaction === 'Templo'
                    ? 'https://wiki.hoodedhorse.com/Heroes_of_Might_and_Magic_Olden_Era/Temple'
                    : selectedFaction === 'Foresta' || selectedFaction === 'Arboleda'
                    ? 'https://wiki.hoodedhorse.com/Heroes_of_Might_and_Magic_Olden_Era/Sylvan'
                    : selectedFaction === 'Necrópolis'
                    ? 'https://wiki.hoodedhorse.com/Heroes_of_Might_and_Magic_Olden_Era/Necropolis'
                    : selectedFaction === 'Colmena' || selectedFaction === 'Enjambre'
                    ? 'https://wiki.hoodedhorse.com/Heroes_of_Might_and_Magic_Olden_Era/Hive'
                    : selectedFaction === 'Cisma'
                    ? 'https://wiki.hoodedhorse.com/Heroes_of_Might_and_Magic_Olden_Era/Schism'
                    : 'https://wiki.hoodedhorse.com/Heroes_of_Might_and_Magic_Olden_Era/Dungeon'
                }
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 text-[10px] ${theme.bgBadge} ${theme.borderSubtle} hover:brightness-125 ${theme.textAccent} px-2 py-0.5 rounded border font-mono transition-colors`}
                title="Wiki Oficial de Heroes of Might and Magic: Olden Era"
              >
                <BookOpen className="w-2.5 h-2.5 text-yellow-400" />
                <span>Wiki Oficial</span>
              </a>
              <a
                href="https://heroes-olden-era.com/es/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 text-[10px] ${theme.bgBadge} ${theme.borderSubtle} hover:brightness-125 ${theme.textAccent} px-2 py-0.5 rounded border font-mono transition-colors`}
                title="Heroes Olden Era ES"
              >
                <BookOpen className="w-2.5 h-2.5 text-cyan-400" />
                <span>Olden-Era ES</span>
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-2xl md:text-3xl font-serif text-white uppercase italic truncate">
                Guía de Conquista: <span className={`${theme.textAccent} font-bold`}>{selectedFaction}</span>
              </h1>

              {/* Faction selector badge / dropdown button */}
              <div className="relative">
                <button
                  onClick={() => setShowFactionDropdown(!showFactionDropdown)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${theme.bgBadge} ${theme.border} ${theme.textAccent} hover:brightness-125 shadow-md`}
                  title="Cambiar Facción"
                >
                  <Flag className="w-3 h-3" />
                  <span>{selectedFaction}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {/* Dropdown Menu */}
                {showFactionDropdown && (
                  <div className={`absolute left-0 mt-2 w-64 bg-[#101014] border ${theme.dropdownBorder} rounded-xl shadow-2xl z-50 p-2 space-y-1 backdrop-blur-xl`}>
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
                            isSelected
                              ? `${fTheme.tabActive}`
                              : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold">{meta.name}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-sans font-bold" style={{ color: fTheme.hexPrimary, backgroundColor: themeMode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)', border: `1px solid ${fTheme.hexPrimary}40` }}>
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
            </div>
          </div>

          {/* Desktop Quick HUD Metrics & Theme Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Metrics */}
            <div className="hidden lg:flex items-center gap-2.5">
              <div className={`bg-black/50 border ${theme.borderSubtle} px-3 py-1 rounded-lg flex items-center gap-2 shadow-inner`}>
                <Coins className="w-3.5 h-3.5 text-yellow-500" />
                <div>
                  <span className={`text-[9px] block ${theme.textAccent} uppercase tracking-wider font-semibold`}>Oro Inicial</span>
                  <span className="text-xs font-mono text-yellow-400 font-bold">{currentMeta.startingGold}</span>
                </div>
              </div>

              <div className={`bg-black/50 border ${theme.borderSubtle} px-3 py-1 rounded-lg flex items-center gap-2 shadow-inner`}>
                <Castle className="w-3.5 h-3.5" style={{ color: theme.hexPrimary }} />
                <div>
                  <span className={`text-[9px] block ${theme.textAccent} uppercase tracking-wider font-semibold`}>Facción</span>
                  <span className={`text-xs font-mono italic font-bold ${theme.textAccent}`}>
                    {currentMeta.name}
                  </span>
                </div>
              </div>

              <div className={`bg-black/50 border ${theme.borderSubtle} px-3 py-1 rounded-lg flex items-center gap-2 shadow-inner`}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: theme.hexPrimary }} />
                <div>
                  <span className={`text-[9px] block ${theme.textAccent} uppercase tracking-wider font-semibold`}>Mecánica Central</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{currentMeta.primaryMechanic}</span>
                </div>
              </div>
            </div>

            {/* Compact Tactical Cheat Sheet Button */}
            {onToggleTacticalCheatSheet && (
              <button
                onClick={onToggleTacticalCheatSheet}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${theme.bgBadge} ${theme.border} text-amber-400 hover:brightness-125 shadow-sm`}
                title="Abrir Ficha Táctica / Modo Compacto (Atajo: C)"
                aria-label="Abrir ficha táctica de segunda pantalla"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                <span className="hidden sm:inline font-sans">Ficha Táctica</span>
                <kbd className="hidden md:inline px-1 py-0.2 rounded bg-black/50 text-[10px] text-amber-300 font-mono border border-amber-900/60">C</kbd>
              </button>
            )}

            {/* Keyboard Shortcuts Help Button */}
            {onToggleKeyboardHelp && (
              <button
                onClick={onToggleKeyboardHelp}
                className={`hidden sm:flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${theme.bgBadge} ${theme.borderSubtle} text-slate-300 hover:text-white hover:border-slate-500 shadow-sm`}
                title="Guía de Atajos de Teclado (Atajo: ?)"
                aria-label="Ver atajos de teclado"
              >
                <Keyboard className="w-3.5 h-3.5 text-slate-400" />
                <kbd className="px-1 py-0.2 rounded bg-black/50 text-[10px] text-slate-300 font-mono border border-slate-700">?</kbd>
              </button>
            )}

            {/* Light / Dark Mode Switcher */}
            {setThemeMode && (
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${theme.bgBadge} ${theme.border} ${theme.textAccent} hover:brightness-110 shadow-sm`}
                title={themeMode === 'dark' ? 'Cambiar a Modo Claro (M)' : 'Cambiar a Modo Oscuro (M)'}
                aria-label="Alternar modo claro y oscuro"
              >
                {themeMode === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    <span className="hidden md:inline font-sans text-xs">Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-purple-600" />
                    <span className="hidden md:inline font-sans text-xs">Modo Oscuro</span>
                  </>
                )}
              </button>
            )}

            {/* Mobile HUD Toggle Button */}
            <button
              onClick={() => setShowMobileHud(!showMobileHud)}
              className={`lg:hidden flex items-center gap-1.5 ${theme.bgBadge} border ${theme.borderSubtle} px-2.5 py-1 rounded-lg text-[11px] ${theme.textAccent} font-mono`}
              aria-label="Toggle datos rápidos de facción"
            >
              <span className="font-semibold">HUD</span>
              {showMobileHud ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Expandable HUD */}
        {showMobileHud && (
          <div className={`lg:hidden space-y-2 py-2 border-b ${theme.borderSubtle} text-[10px]`}>
            <div className="grid grid-cols-3 gap-2">
              <div className={`bg-black/60 border ${theme.borderSubtle} p-1.5 rounded-lg text-center`}>
                <span className={`${theme.textAccent} block text-[9px] uppercase`}>Oro Inicial</span>
                <span className="text-yellow-400 font-bold font-mono">{currentMeta.startingGold}</span>
              </div>
              <div className={`bg-black/60 border ${theme.borderSubtle} p-1.5 rounded-lg text-center`}>
                <span className={`${theme.textAccent} block text-[9px] uppercase`}>Facción</span>
                <span className={`font-bold ${theme.textAccent}`}>
                  {currentMeta.name}
                </span>
              </div>
              <div className={`bg-black/60 border ${theme.borderSubtle} p-1.5 rounded-lg text-center`}>
                <span className={`${theme.textAccent} block text-[9px] uppercase`}>Mecánica</span>
                <span className="text-slate-200 font-bold font-mono truncate block">{currentMeta.primaryMechanic}</span>
              </div>
            </div>

            {/* Mobile Actions Row */}
            <div className="flex items-center gap-2 pt-1">
              {onToggleTacticalCheatSheet && (
                <button
                  onClick={() => {
                    onToggleTacticalCheatSheet();
                    setShowMobileHud(false);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-mono font-bold flex items-center justify-center gap-1.5 ${theme.bgBadge} ${theme.border} text-amber-400`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Ficha Táctica (C)</span>
                </button>
              )}
              {onToggleKeyboardHelp && (
                <button
                  onClick={() => {
                    onToggleKeyboardHelp();
                    setShowMobileHud(false);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 ${theme.bgBadge} ${theme.borderSubtle} text-slate-300`}
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Atajos (?)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab Navigation - Single Row with Horizontal Scroll on Mobile */}
        <div className="pt-2 sm:pt-2.5">
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] sm:min-h-[42px] ${
                    isActive
                      ? theme.tabActive
                      : `bg-black/40 text-slate-400 hover:bg-white/5 hover:text-slate-200 border ${theme.borderSubtle} hover:border-slate-600`
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : theme.textAccent}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
