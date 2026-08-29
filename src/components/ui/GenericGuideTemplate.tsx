import React from 'react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../../data/factionDataProvider';

export interface GenericGuideTemplateProps {
  /** Facción activa para aplicar paleta y metadatos dinámicos */
  selectedFaction: FactionId;
  /** Modo oscuro / claro */
  themeMode?: 'dark' | 'light';
  /** Título de la sección (ej. "Catálogo de Héroes", "Matriz de Unidades", "Estructuras de Ciudad") */
  title: string;
  /** Subtítulo o categoría técnica superior */
  categorySubtitle?: string;
  /** Descripción introductoria o contexto estratégico */
  description?: string;
  /** Controles adicionales en la esquina superior derecha del banner (ej. botón comparar, exportar) */
  headerActions?: React.ReactNode;
  /** Barra de filtros (búsqueda, chips, ordenación) */
  filterBar?: React.ReactNode;
  /** Contenido principal de la guía (Grid de tarjetas, árbol interactivo, tabla) */
  children: React.ReactNode;
  /** Panel inferior complementario (estadísticas, consejos rápidos o notas de parche) */
  footerNotes?: React.ReactNode;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

export const GenericGuideTemplate: React.FC<GenericGuideTemplateProps> = ({
  selectedFaction,
  themeMode = 'dark',
  title,
  categorySubtitle = 'Heroes of Might and Magic: Olden Era • Compendio Oficial',
  description,
  headerActions,
  filterBar,
  children,
  footerNotes,
  className = '',
}) => {
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Header Banner Dinámico y Tematizado por Facción */}
      <section
        className={`border rounded-2xl p-6 ${theme.shadowAccent} backdrop-blur-md transition-colors duration-300 ${
          themeMode === 'light'
            ? 'bg-white border-slate-200 shadow-md text-slate-900'
            : `bg-slate-950/80 ${theme.border} text-white`
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div
              className={`text-[10px] uppercase font-mono tracking-widest font-bold mb-1.5 flex items-center gap-2 ${
                themeMode === 'light' ? 'text-purple-800' : theme.textAccent
              }`}
            >
              <span>{categorySubtitle}</span>
              <span className="opacity-40">•</span>
              <span className="font-sans px-2 py-0.5 rounded bg-black/20 border border-current">
                {meta.name}
              </span>
            </div>

            <h1
              className={`text-xl sm:text-2xl font-serif uppercase tracking-wide font-bold ${
                themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              {title} <span className={themeMode === 'light' ? 'text-purple-700' : theme.textAccent}>({meta.name})</span>
            </h1>

            {description && (
              <p
                className={`text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed ${
                  themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {description}
              </p>
            )}
          </div>

          {headerActions && (
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              {headerActions}
            </div>
          )}
        </div>
      </section>

      {/* 2. Barra de Filtros & Búsqueda (Opcional) */}
      {filterBar && (
        <div
          className={`p-4 rounded-xl border transition-colors ${
            themeMode === 'light'
              ? 'bg-slate-50 border-slate-200 shadow-sm'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          {filterBar}
        </div>
      )}

      {/* 3. Contenido Principal de la Guía */}
      <main>{children}</main>

      {/* 4. Pie de Página / Consejos Estratégicos */}
      {footerNotes && (
        <aside
          className={`p-4 rounded-xl border text-xs leading-relaxed transition-colors ${
            themeMode === 'light'
              ? 'bg-purple-50/60 border-purple-200 text-slate-800'
              : `bg-slate-900/40 ${theme.borderSubtle} text-slate-300`
          }`}
        >
          {footerNotes}
        </aside>
      )}
    </div>
  );
};
