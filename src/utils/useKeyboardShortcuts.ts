import { useEffect, useState, useCallback } from 'react';
import { FactionId } from '../data/factionDataProvider';

export interface ShortcutEvent {
  keyLabel: string;
  description: string;
  category: 'faction' | 'timeline' | 'view' | 'system';
  timestamp: number;
}

interface UseKeyboardShortcutsProps {
  onSelectFaction: (faction: FactionId) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToggleCompactMode: () => void;
  onToggleTheme: () => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  onToggleHelp: () => void;
  onClose: () => void;
  isEnabled?: boolean;
}

const FACTION_KEYS: Record<string, FactionId> = {
  '1': 'Mazmorra',
  '2': 'Templo',
  '3': 'Foresta',
  '4': 'Necrópolis',
  '5': 'Colmena',
  '6': 'Cisma',
};

export const useKeyboardShortcuts = ({
  onSelectFaction,
  onPrevDay,
  onNextDay,
  onToggleCompactMode,
  onToggleTheme,
  onPrevTab,
  onNextTab,
  onToggleHelp,
  onClose,
  isEnabled = true,
}: UseKeyboardShortcutsProps) => {
  const [lastShortcut, setLastShortcut] = useState<ShortcutEvent | null>(null);

  const clearLastShortcut = useCallback(() => {
    setLastShortcut(null);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Avoid triggering when user is focused inside text input, textarea or select
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        // Only allow Escape inside inputs to blur or close
        if (event.key === 'Escape') {
          target.blur();
          onClose();
        }
        return;
      }

      // Modifier keys check: ignore if Ctrl, Alt or Meta is held (allow natural browser shortcuts)
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const key = event.key;

      // 1-6: Direct Faction Switching
      if (FACTION_KEYS[key]) {
        event.preventDefault();
        const faction = FACTION_KEYS[key];
        onSelectFaction(faction);
        setLastShortcut({
          keyLabel: key,
          description: `Facción: ${faction}`,
          category: 'faction',
          timestamp: Date.now(),
        });
        return;
      }

      // J: Previous Day / Step in Day-by-Day campaign
      if (key === 'j' || key === 'J') {
        event.preventDefault();
        onPrevDay();
        setLastShortcut({
          keyLabel: 'J',
          description: 'Día Anterior',
          category: 'timeline',
          timestamp: Date.now(),
        });
        return;
      }

      // K: Next Day / Step in Day-by-Day campaign
      if (key === 'k' || key === 'K') {
        event.preventDefault();
        onNextDay();
        setLastShortcut({
          keyLabel: 'K',
          description: 'Día Siguiente',
          category: 'timeline',
          timestamp: Date.now(),
        });
        return;
      }

      // C or T: Toggle Compact Tactical Cheat Sheet
      if (key === 'c' || key === 'C' || key === 't' || key === 'T') {
        event.preventDefault();
        onToggleCompactMode();
        setLastShortcut({
          keyLabel: key.toUpperCase(),
          description: 'Alternar Ficha Táctica',
          category: 'view',
          timestamp: Date.now(),
        });
        return;
      }

      // M: Toggle Light/Dark Mode
      if (key === 'm' || key === 'M') {
        event.preventDefault();
        onToggleTheme();
        setLastShortcut({
          keyLabel: 'M',
          description: 'Alternar Modo Claro/Oscuro',
          category: 'view',
          timestamp: Date.now(),
        });
        return;
      }

      // Q: Previous Navigation Tab
      if (key === 'q' || key === 'Q') {
        event.preventDefault();
        onPrevTab();
        setLastShortcut({
          keyLabel: 'Q',
          description: 'Pestaña Anterior',
          category: 'view',
          timestamp: Date.now(),
        });
        return;
      }

      // E: Next Navigation Tab
      if (key === 'e' || key === 'E') {
        event.preventDefault();
        onNextTab();
        setLastShortcut({
          keyLabel: 'E',
          description: 'Pestaña Siguiente',
          category: 'view',
          timestamp: Date.now(),
        });
        return;
      }

      // ? or H: Toggle Keyboard Shortcuts Modal
      if (key === '?' || key === 'h' || key === 'H') {
        event.preventDefault();
        onToggleHelp();
        setLastShortcut({
          keyLabel: key,
          description: 'Guía de Atajos',
          category: 'system',
          timestamp: Date.now(),
        });
        return;
      }

      // Escape: Close any open modal or return to default
      if (key === 'Escape') {
        event.preventDefault();
        onClose();
        setLastShortcut({
          keyLabel: 'Esc',
          description: 'Cerrar Ventanas',
          category: 'system',
          timestamp: Date.now(),
        });
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isEnabled,
    onSelectFaction,
    onPrevDay,
    onNextDay,
    onToggleCompactMode,
    onToggleTheme,
    onPrevTab,
    onNextTab,
    onToggleHelp,
    onClose,
  ]);

  return {
    lastShortcut,
    clearLastShortcut,
  };
};
