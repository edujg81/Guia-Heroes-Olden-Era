import React, { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DayByDayPlanner } from './components/DayByDayPlanner';
import { TownStructuresBrowser } from './components/TownStructuresBrowser';
import { FactionLawsTree } from './components/FactionLawsTree';
import { SpellGrimoire } from './components/SpellGrimoire';
import { CombatTactics } from './components/CombatTactics';
import { UnitMatrix } from './components/UnitMatrix';
import { HeroSkillOptimizer } from './components/HeroSkillOptimizer';
import { HeroGuideView } from './components/features/heroes/HeroGuideView';
import { FactionBackgroundPattern } from './components/ui/FactionBackgroundPattern';
import { FactionAmbientParticles } from './components/ui/FactionAmbientParticles';
import { ZenCommanderController } from './components/ui/ZenCommanderController';
import { FactionRunicTransition } from './components/ui/FactionRunicTransition';
import { ShortcutToast } from './components/ui/ShortcutToast';
import { KeyboardShortcutsModal } from './components/ui/KeyboardShortcutsModal';
import { TacticalCheatSheet } from './components/features/combat/TacticalCheatSheet';
import { useKeyboardShortcuts } from './utils/useKeyboardShortcuts';
import { useStickyState } from './utils/useStickyState';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from './data/factionDataProvider';

const TABS = [
  'build-order',
  'structures',
  'faction-laws',
  'spells',
  'combat-tactics',
  'units',
  'hero-skills',
];

export default function App() {
  const [activeTab, setActiveTab] = useStickyState<string>('build-order', 'active_tab');
  const [selectedFaction, setSelectedFaction] = useStickyState<FactionId>('Mazmorra', 'global_selected_faction');
  const [themeMode, setThemeMode] = useStickyState<'dark' | 'light'>('dark', 'color_theme_mode');
  const [selectedDay, setSelectedDay] = useStickyState<number>(1, `planner_selected_day_${selectedFaction}`);

  const [isCheatSheetOpen, setIsCheatSheetOpen] = useStickyState<boolean>(false, 'is_tactical_cheatsheet_open');
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);
  const [isZenMode, setIsZenMode] = useStickyState<boolean>(false, 'is_zen_commander_mode');
  const [ambientParticlesEnabled, setAmbientParticlesEnabled] = useStickyState<boolean>(true, 'zen_ambient_particles_enabled');
  const [fontScale, setFontScale] = useStickyState<'100' | '115' | '130'>('100', 'app_font_scale');

  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  // Cycle UI typography font scale (100% -> 115% -> 130%)
  const handleCycleFontScale = useCallback(() => {
    setFontScale((prev) => {
      if (prev === '100') return '115';
      if (prev === '115') return '130';
      return '100';
    });
  }, [setFontScale]);

  // Cycle tabs backward (Q)
  const handlePrevTab = useCallback(() => {
    setActiveTab((curr) => {
      const idx = TABS.indexOf(curr);
      if (idx <= 0) return TABS[TABS.length - 1];
      return TABS[idx - 1];
    });
  }, [setActiveTab]);

  // Cycle tabs forward (E)
  const handleNextTab = useCallback(() => {
    setActiveTab((curr) => {
      const idx = TABS.indexOf(curr);
      if (idx === -1 || idx >= TABS.length - 1) return TABS[0];
      return TABS[idx + 1];
    });
  }, [setActiveTab]);

  // Previous Day (J)
  const handlePrevDay = useCallback(() => {
    setSelectedDay((prev) => Math.max(1, prev - 1));
  }, [setSelectedDay]);

  // Next Day (K)
  const handleNextDay = useCallback(() => {
    setSelectedDay((prev) => Math.min(56, prev + 1));
  }, [setSelectedDay]);

  // Toggle Theme (M)
  const handleToggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setThemeMode]);

  // Toggle Compact Tactical Cheat Sheet (C / T)
  const handleToggleCompactMode = useCallback(() => {
    setIsCheatSheetOpen((prev) => !prev);
  }, [setIsCheatSheetOpen]);

  // Toggle Zen Commander Mode (Z / F11)
  const handleToggleZenMode = useCallback(() => {
    setIsZenMode((prev) => !prev);
  }, [setIsZenMode]);

  // Toggle Shortcuts Help (?)
  const handleToggleHelp = useCallback(() => {
    setIsShortcutsModalOpen((prev) => !prev);
  }, []);

  // Close modals / cheat sheet (Escape)
  const handleCloseModals = useCallback(() => {
    if (isShortcutsModalOpen) {
      setIsShortcutsModalOpen(false);
      return;
    }
    if (isCheatSheetOpen) {
      setIsCheatSheetOpen(false);
      return;
    }
    if (isZenMode) {
      setIsZenMode(false);
    }
  }, [isShortcutsModalOpen, isCheatSheetOpen, isZenMode, setIsCheatSheetOpen, setIsZenMode]);

  // Global Keyboard Shortcuts Hook
  const { lastShortcut, clearLastShortcut } = useKeyboardShortcuts({
    onSelectFaction: setSelectedFaction,
    onPrevDay: handlePrevDay,
    onNextDay: handleNextDay,
    onToggleCompactMode: handleToggleCompactMode,
    onToggleZenMode: handleToggleZenMode,
    onToggleTheme: handleToggleTheme,
    onPrevTab: handlePrevTab,
    onNextTab: handleNextTab,
    onToggleHelp: handleToggleHelp,
    onClose: handleCloseModals,
    onCycleFontScale: handleCycleFontScale,
    isEnabled: true,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    root.style.setProperty('--theme-scrollbar-thumb', theme.scrollbarThumbRgba);
    root.style.setProperty('--theme-primary-hex', theme.hexPrimary);
  }, [theme, themeMode]);

  // Scaled UI typography effect (100% = 16px, 115% = 18.4px, 130% = 20.8px)
  useEffect(() => {
    const root = document.documentElement;
    if (fontScale === '115') {
      root.style.fontSize = '18.4px';
    } else if (fontScale === '130') {
      root.style.fontSize = '20.8px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [fontScale]);

  return (
    <div 
      className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#0c0c0e] text-slate-300' : 'bg-slate-50 text-slate-800'} flex flex-col font-sans ${theme.selectionClass} transition-colors duration-500 relative`}
      style={{
        backgroundColor: themeMode === 'dark' ? '#0c0c0e' : '#f8fafc',
        backgroundImage: theme.gradientBg,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Screen reader skip-to-content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Saltar al contenido principal
      </a>

      {/* Dynamic Faction Geometric SVG Texture */}
      <FactionBackgroundPattern faction={selectedFaction} themeMode={themeMode} />

      {/* Dynamic Faction Ambient Particles (Zen Commander) */}
      <FactionAmbientParticles
        faction={selectedFaction}
        isEnabled={isZenMode && ambientParticlesEnabled}
        themeMode={themeMode}
      />

      {/* Smooth Faction Runic Switch Transition Announcement */}
      <FactionRunicTransition selectedFaction={selectedFaction} themeMode={themeMode} />

      {/* Keyboard Shortcut HUD Toast Notification */}
      <ShortcutToast
        shortcut={lastShortcut}
        onDismiss={clearLastShortcut}
        selectedFaction={selectedFaction}
        themeMode={themeMode}
      />

      {/* Compact Tactical Cheat Sheet for Second Screen / Mobile during matches (C) */}
      <TacticalCheatSheet
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        selectedFaction={selectedFaction}
        onSelectFaction={setSelectedFaction}
        onNavigateToDay={(day) => {
          setSelectedDay(day);
          setActiveTab('build-order');
        }}
        themeMode={themeMode}
      />

      {/* Accessible Keyboard Shortcuts Help Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
        selectedFaction={selectedFaction}
        themeMode={themeMode}
      />

      {/* Floating Zen Commander Mini-Controller HUD (Active during Zen Mode) */}
      <ZenCommanderController
        isZenMode={isZenMode}
        onExitZenMode={() => setIsZenMode(false)}
        selectedFaction={selectedFaction}
        onSelectFaction={setSelectedFaction}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        ambientParticlesEnabled={ambientParticlesEnabled}
        onToggleAmbientParticles={() => setAmbientParticlesEnabled((prev) => !prev)}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        fontScale={fontScale}
        onCycleFontScale={handleCycleFontScale}
      />

      {/* Top Navigation & Faction Selector (Minimized/Hidden in Zen Mode to maximize 100% screen utility) */}
      {!isZenMode && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedFaction={selectedFaction}
          setSelectedFaction={setSelectedFaction}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          onToggleTacticalCheatSheet={() => setIsCheatSheetOpen((prev) => !prev)}
          onToggleKeyboardHelp={() => setIsShortcutsModalOpen((prev) => !prev)}
          onToggleZenMode={handleToggleZenMode}
          fontScale={fontScale}
          onCycleFontScale={handleCycleFontScale}
        />
      )}

      {/* Main Content Area: Maximized in Zen Mode, persists views to avoid losing state */}
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 w-full mx-auto space-y-6 focus:outline-none transition-all duration-300 ${
          isZenMode ? 'max-w-none px-3 sm:px-6 lg:px-8 py-4' : 'max-w-7xl px-4 sm:px-6 py-6'
        }`}
      >
        <div className={activeTab === 'build-order' ? 'block' : 'hidden'}>
          <DayByDayPlanner
            selectedFaction={selectedFaction}
            themeMode={themeMode}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>
        <div className={activeTab === 'structures' ? 'block' : 'hidden'}>
          <TownStructuresBrowser selectedFaction={selectedFaction} themeMode={themeMode} />
        </div>
        <div className={activeTab === 'faction-laws' ? 'block' : 'hidden'}>
          <FactionLawsTree selectedFaction={selectedFaction} themeMode={themeMode} />
        </div>
        <div className={activeTab === 'spells' ? 'block' : 'hidden'}>
          <SpellGrimoire selectedFaction={selectedFaction} themeMode={themeMode} />
        </div>
        <div className={activeTab === 'combat-tactics' ? 'block' : 'hidden'}>
          <CombatTactics selectedFaction={selectedFaction} themeMode={themeMode} />
        </div>
        <div className={activeTab === 'units' ? 'block' : 'hidden'}>
          <UnitMatrix selectedFaction={selectedFaction} themeMode={themeMode} />
        </div>
        <div className={activeTab === 'hero-skills' ? 'block' : 'hidden'}>
          <HeroGuideView selectedFaction={selectedFaction} themeMode={themeMode} />
          <HeroSkillOptimizer selectedFaction={selectedFaction} themeMode={themeMode} />
        </div>
      </main>

      {/* Immersive Footer Status Bar (Hidden in Zen Mode to maximize vertical screen area) */}
      {!isZenMode && (
        <footer className={`bg-black/70 border-t ${theme.borderSubtle} py-5 mt-12 backdrop-blur-md transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest text-slate-400">
              <span className="text-slate-300 font-semibold">Campaña 56 Días</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.hexPrimary }}></span>
              <span className={`${theme.textAccent} font-bold font-mono`}>
                Facción {meta.name} ({meta.region}) • {theme.themeName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.hexPrimary }}></span>
              <span className="text-slate-300 font-mono">
                Mecánica: <strong className={theme.textAccent}>{meta.primaryMechanic}</strong>
              </span>
            </div>

            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
              <span>Atajos: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">?</kbd></span>
              <span>•</span>
              <span>Zen: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-emerald-300 text-[10px] border border-slate-700">Z</kbd></span>
              <span>•</span>
              <span>Heroes of Might and Magic: Olden Era</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
