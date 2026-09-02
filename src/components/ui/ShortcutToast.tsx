import React, { useEffect, useState } from 'react';
import { ShortcutEvent } from '../../utils/useKeyboardShortcuts';
import { FactionId, getFactionTheme } from '../../data/factionDataProvider';
import { Sparkles, Command } from 'lucide-react';

interface ShortcutToastProps {
  shortcut: ShortcutEvent | null;
  onDismiss: () => void;
  selectedFaction: FactionId;
  themeMode?: 'dark' | 'light';
}

export const ShortcutToast: React.FC<ShortcutToastProps> = ({
  shortcut,
  onDismiss,
  selectedFaction,
  themeMode = 'dark',
}) => {
  const [visible, setVisible] = useState(false);
  const theme = getFactionTheme(selectedFaction, themeMode);

  useEffect(() => {
    if (!shortcut) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 1800);

    return () => clearTimeout(timer);
  }, [shortcut, onDismiss]);

  if (!shortcut || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100"
    >
      <div
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border shadow-2xl backdrop-blur-xl pointer-events-auto ${
          themeMode === 'light'
            ? 'bg-white/95 text-slate-900 border-slate-300 shadow-slate-400/30'
            : 'bg-[#0f0e14]/95 text-slate-100 border-slate-700 shadow-black/80'
        }`}
        style={{
          borderLeftWidth: '4px',
          borderLeftColor: theme.hexPrimary,
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shadow-inner"
          style={{
            backgroundColor: `${theme.hexPrimary}25`,
            color: theme.hexPrimary,
            border: `1px solid ${theme.hexPrimary}50`,
          }}
        >
          {shortcut.keyLabel === 'Esc' ? <Command className="w-3.5 h-3.5" /> : shortcut.keyLabel}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-mono font-bold tracking-wide">
            {shortcut.description}
          </span>
          <span className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            Atajo de teclado ejecutado
          </span>
        </div>
      </div>
    </div>
  );
};
