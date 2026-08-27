import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { DayByDayPlanner } from './components/DayByDayPlanner';
import { TownStructuresBrowser } from './components/TownStructuresBrowser';
import { FactionLawsTree } from './components/FactionLawsTree';
import { SpellGrimoire } from './components/SpellGrimoire';
import { CombatTactics } from './components/CombatTactics';
import { UnitMatrix } from './components/UnitMatrix';
import { HeroSkillOptimizer } from './components/HeroSkillOptimizer';
import { useStickyState } from './utils/useStickyState';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from './data/factionDataProvider';

export default function App() {
  const [activeTab, setActiveTab] = useStickyState<string>('build-order', 'active_tab');
  const [selectedFaction, setSelectedFaction] = useStickyState<FactionId>('Mazmorra', 'global_selected_faction');
  const [themeMode, setThemeMode] = useStickyState<'dark' | 'light'>('dark', 'color_theme_mode');

  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

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

  return (
    <div 
      className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#0c0c0e] text-slate-300' : 'bg-slate-50 text-slate-800'} flex flex-col font-sans ${theme.selectionClass} transition-colors duration-300`}
      style={{
        backgroundColor: themeMode === 'dark' ? '#0c0c0e' : '#f8fafc',
        backgroundImage: theme.gradientBg,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Top Navigation & Faction Selector */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedFaction={selectedFaction}
        setSelectedFaction={setSelectedFaction}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />

      {/* Main Content Area: Persist mounted views to never lose user match context */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className={activeTab === 'build-order' ? 'block' : 'hidden'}>
          <DayByDayPlanner selectedFaction={selectedFaction} themeMode={themeMode} />
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
          <HeroSkillOptimizer selectedFaction={selectedFaction} themeMode={themeMode} />
        </div>
      </main>

      {/* Immersive Footer Status Bar */}
      <footer className={`bg-black/70 border-t ${theme.borderSubtle} py-5 mt-12 backdrop-blur-md transition-colors duration-300`}>
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

          <div className="text-[11px] text-slate-500 font-mono">
            Heroes of Might and Magic: Olden Era • Progreso Guardado Automáticamente
          </div>
        </div>
      </footer>
    </div>
  );
}
