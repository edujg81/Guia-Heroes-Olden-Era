import React, { createContext, useContext, useEffect } from 'react';
import { FactionId, FactionTheme, FactionMetadata, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { useStickyState } from '../utils/useStickyState';

export type ActiveTab = 'build-order' | 'structures' | 'faction-laws' | 'spells' | 'combat-tactics' | 'units' | 'hero-skills';

export interface AppContextValue {
  themeMode: 'dark' | 'light';
  setThemeMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
  toggleThemeMode: () => void;
  selectedFaction: FactionId;
  setSelectedFaction: (faction: FactionId) => void;
  theme: FactionTheme;
  meta: FactionMetadata;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useStickyState<string>('build-order', 'active_tab');
  const [selectedFaction, setSelectedFaction] = useStickyState<FactionId>('Mazmorra', 'global_selected_faction');
  const [themeMode, setThemeMode] = useStickyState<'dark' | 'light'>('dark', 'color_theme_mode');

  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
    <AppContext.Provider
      value={{
        themeMode,
        setThemeMode,
        toggleThemeMode,
        selectedFaction,
        setSelectedFaction,
        theme,
        meta,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Aliases for backwards compatibility with ThemeContext
export const ThemeContext = AppContext;
export const ThemeProvider = AppProvider;
export const useTheme = useApp;
