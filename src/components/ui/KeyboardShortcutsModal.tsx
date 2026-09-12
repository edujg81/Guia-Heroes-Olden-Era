import React, { useEffect, useRef } from 'react';
import { X, Keyboard, Flag, Calendar, Layout, Info } from 'lucide-react';
import { FactionId, getFactionTheme } from '../../data/factionDataProvider';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFaction: FactionId;
  themeMode?: 'dark' | 'light';
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  selectedFaction,
  themeMode = 'dark',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const theme = getFactionTheme(selectedFaction, themeMode);

  useEffect(() => {
    if (isOpen) {
      // Focus the modal container for accessibility
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const shortcutSections = [
    {
      title: 'Cambio Rápido de Facción',
      icon: Flag,
      shortcuts: [
        { key: '1', label: 'Mazmorra (Dungeon)', desc: 'Magia elemental destructiva, elfos oscuros y dragones' },
        { key: '2', label: 'Templo (Temple)', desc: 'Furia sagrada, caballeros humanos y clérigos celestiales' },
        { key: '3', label: 'Foresta (Sylvan)', desc: 'Faunos, ninfas, herbomantes y qilins celestiales' },
        { key: '4', label: 'Necrópolis (Necropolis)', desc: 'Nigromancia acumulativa, vampiros y magia de sombras' },
        { key: '5', label: 'Colmena (Hive)', desc: 'Enjambre insectoide de Beelzebub y el Rey Libélula' },
        { key: '6', label: 'Cisma (Schism)', desc: 'Cultistas del vacío, moradores de Vori y demonología' },
      ],
    },
    {
      title: 'Campaña y Cronograma (56 Días)',
      icon: Calendar,
      shortcuts: [
        { key: 'J', label: 'Día Anterior', desc: 'Retrocede un día en el cronograma competitivo (Día 1..56)' },
        { key: 'K', label: 'Día Siguiente', desc: 'Avanza un día en el cronograma de construcción y táctica' },
      ],
    },
    {
      title: 'Vistas y Herramientas Competitivas',
      icon: Layout,
      shortcuts: [
        { key: 'Z', label: 'Modo Inmersivo Zen Commander', desc: 'Oculta la interfaz para maximizar el área al 100% de la pantalla y activa partículas ambientales' },
        { key: 'C / T', label: 'Ficha Táctica / Modo Compacto', desc: 'Activa la vista condensada de segunda pantalla (Día 1-7 + Iniciativa)' },
        { key: 'Q / E', label: 'Pestaña Anterior / Siguiente', desc: 'Navega secuencialmente entre los módulos de la guía' },
        { key: 'M', label: 'Modo Claro / Oscuro', desc: 'Alterna instantáneamente entre paleta medieval diurna y nocturna' },
        { key: 'A', label: 'Escalado de Fuente UI', desc: 'Alterna en tiempo real entre tamaños de tipografía (100% → 115% → 130%) para televisores o pantallas lejanas' },
      ],
    },
    {
      title: 'Sistema y Navegación',
      icon: Info,
      shortcuts: [
        { key: '?', label: 'Guía de Atajos', desc: 'Abre o cierra esta ventana informativa de teclas rápidas' },
        { key: 'Esc', label: 'Cerrar Ventana', desc: 'Cierra cualquier modal, ficha táctica o menú desplegable abierto' },
      ],
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden focus:outline-none ${
          themeMode === 'light'
            ? 'bg-slate-50 text-slate-900 border-slate-300 shadow-slate-900/20'
            : 'bg-[#100e17] text-slate-100 border-slate-800 shadow-black/80'
        }`}
        style={{
          borderTopWidth: '4px',
          borderTopColor: theme.hexPrimary,
        }}
      >
        {/* Modal Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 ${
            themeMode === 'light' ? 'border-slate-200 bg-white' : 'border-slate-800/80 bg-black/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md border"
              style={{
                backgroundColor: `${theme.hexPrimary}20`,
                color: theme.hexPrimary,
                borderColor: `${theme.hexPrimary}50`,
              }}
            >
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 id="shortcuts-modal-title" className="text-lg font-serif font-bold text-white dark:text-white">
                Atajos de Teclado & Accesibilidad
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Navegación ultra-rápida optimizada para teoría competitiva
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {shortcutSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  <Icon className="w-4 h-4" style={{ color: theme.hexPrimary }} />
                  <span>{sec.title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sec.shortcuts.map((item, sIdx) => (
                    <div
                      key={sIdx}
                      className={`p-2.5 rounded-xl border flex items-start gap-3 transition-colors ${
                        themeMode === 'light'
                          ? 'bg-white border-slate-200 hover:border-slate-300'
                          : 'bg-black/40 border-slate-800/70 hover:border-slate-700'
                      }`}
                    >
                      <kbd
                        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border shadow-sm shrink-0 ${
                          themeMode === 'light'
                            ? 'bg-slate-100 border-slate-300 text-slate-800 shadow-slate-300'
                            : 'bg-slate-800 border-slate-600 text-amber-300 shadow-black'
                        }`}
                        style={{
                          borderBottomWidth: '2px',
                        }}
                      >
                        {item.key}
                      </kbd>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold font-mono text-white dark:text-slate-100">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div
          className={`p-4 border-t flex items-center justify-between text-xs font-mono ${
            themeMode === 'light' ? 'border-slate-200 bg-slate-100/80 text-slate-600' : 'border-slate-800 bg-black/60 text-slate-400'
          }`}
        >
          <span>Presiona <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200 text-[10px]">Esc</kbd> para salir</span>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl font-bold font-mono text-xs transition-all cursor-pointer ${theme.primaryButton}`}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
