import React, { createContext, useContext, useEffect } from 'react';
import { FactionId, FactionTheme, FactionMetadata, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { useStickyState } from '../utils/useStickyState';

export interface ThemeContextValue {
  themeMode: 'dark' | 'light';
  setThemeMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
  selectedFaction: FactionId;
  setSelectedFaction: (faction: FactionId) => void;
  theme: FactionTheme;
  meta: FactionMetadata;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        selectedFaction,
        setSelectedFaction,
        theme,
        meta,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
