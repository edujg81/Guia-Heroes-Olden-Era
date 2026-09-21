import React, { useState, useMemo } from 'react';
import type { HeroWithExtras } from '../../../types';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';
import { getHeroesByFactionKey } from '../../../data/heroesData';

// Mapeo de nombres de facción en español a claves de facción de la API
const spanishToApiFactionMap: Record<FactionId, string> = {
  'Mazmorra': 'dungeon',
  'Templo': 'human',
  'Foresta': 'nature',
  'Necrópolis': 'necromancer',
  'Colmena': 'demon',
  'Cisma': 'unfrozen',
};
import { GenericGuideTemplate } from '../../ui/GenericGuideTemplate';
import { SearchBar } from '../../ui/SearchBar';
import { FilterChipGroup, FilterOption } from '../../ui/FilterChipGroup';
import { HeroGuideCard } from './HeroGuideCard';
import { HeroDetailModal } from './HeroDetailModal';
import { HeroComparatorSplitScreen } from './HeroComparatorSplitScreen';
import { HeroBuildSimulator } from '../../HeroBuildSimulator';
import { Users, Wand2, Swords, Sparkles, Filter, ArrowRightLeft, GitBranch } from 'lucide-react';

interface HeroGuideViewProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
  customHeroesList?: HeroWithExtras[];
}

export const HeroGuideView: React.FC<HeroGuideViewProps> = ({
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
  customHeroesList,
}) => {
  const [viewMode, setViewMode] = useState<'roster' | 'comparator' | 'simulator'>('roster');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<'all' | 'Guerrero' | 'Mago'>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [inspectedHero, setInspectedHero] = useState<HeroWithExtras | null>(null);

  const [compareHeroA, setCompareHeroA] = useState<HeroWithExtras | null>(null);
  const [compareHeroB, setCompareHeroB] = useState<HeroWithExtras | null>(null);

  const theme = getFactionTheme(selectedFaction, themeMode);

  // 1. Carga dinámica de héroes según la facción activa (o lista personalizada)
  const heroes: HeroWithExtras[] = useMemo(() => {
    return customHeroesList || getHeroesByFactionKey(selectedFaction);
  }, [selectedFaction, customHeroesList]);

  const handleStartCompare = (hero: HeroWithExtras) => {
    setCompareHeroA(hero);
    const otherHero = heroes.find((h) => h.id !== hero.id) || null;
    setCompareHeroB(otherHero);
    setViewMode('comparator');
  };

  // 2. Filtro reactivo en memoria
  const filteredHeroes = useMemo(() => {
    return heroes.filter((h) => {
      const matchSearch =
        searchTerm === '' ||
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.specializationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.classDisplay.toLowerCase().includes(searchTerm.toLowerCase());

      const matchArchetype =
        selectedArchetype === 'all' || h.classType === selectedArchetype;

      const matchRole =
        selectedRole === 'all' || h.role.toLowerCase().includes(selectedRole.toLowerCase());

      return matchSearch && matchArchetype && matchRole;
    });
  }, [heroes, searchTerm, selectedArchetype, selectedRole]);

  // 3. Opciones de filtros
  const archetypeOptions: FilterOption<'all' | 'Poder' | 'Magia'>[] = [
    { id: 'all', label: 'Todos', count: heroes.length, icon: <Users className="w-3.5 h-3.5" /> },
    {
      id: 'Poder',
      label: 'Poder',
      count: heroes.filter((h) => h.classType === 'might').length,
      icon: <Swords className="w-3.5 h-3.5" />,
    },
    {
      id: 'Magia',
      label: 'Magia',
      count: heroes.filter((h) => h.classType === 'magic').length,
      icon: <Wand2 className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <GenericGuideTemplate
      selectedFaction={selectedFaction}
      themeMode={themeMode}
      title={
        viewMode === 'comparator'
          ? 'Comparador Visual de Comandantes (Split-Screen)'
          : viewMode === 'simulator'
          ? 'Simulador de Builds de Comandante'
          : 'Guía Canónica de Héroes & Especialistas'
      }
      categorySubtitle="Heroes of Might and Magic: Olden Era • Roster & Builds"
      description={
        viewMode === 'comparator'
          ? 'Contrasta 2 héroes lado a lado en tiempo real: simula atributos por nivel, visualiza gráficas diferenciales de barras y audita la sinergia temática de criaturas.'
          : viewMode === 'simulator'
          ? 'Construye y compara árboles de habilidades para cada comandante, desde el nivel 1 hasta el 25.'
          : 'Explora todos los comandantes oficiales de la facción, sus especialidades únicas, crecimientos porcentuales de atributos por nivel, habilidades iniciales recomendadas y estilos tácticos de combate.'
      }
      filterBar={
        <div className="space-y-3">
          {/* Switcher de Modos: Roster, Comparador y Simulador */}
          <div className="flex items-center justify-between gap-3 pb-1 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('roster')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'roster'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Héroes de Facción ({heroes.length})</span>
              </button>

              <button
                onClick={() => setViewMode('comparator')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'comparator'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>Comparador de Héroes</span>
              </button>

              <button
                onClick={() => setViewMode('simulator')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'simulator'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Builds de Habilidades</span>
              </button>
            </div>

            {viewMode === 'roster' && (
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                Haz clic en <strong>Comparar</strong> en cualquier héroe para abrir el duelo lado a lado.
              </span>
            )}
          </div>

          {viewMode === 'roster' && (
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-1">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={`Buscar héroe de ${selectedFaction} por nombre, clase o especialidad...`}
                themeMode={themeMode}
              />
              <FilterChipGroup
                options={archetypeOptions}
                selectedValue={selectedArchetype}
                onChange={(v) => setSelectedArchetype(v as 'all' | 'Guerrero' | 'Mago')}
                themeMode={themeMode}
              />
            </div>
          )}
        </div>
      }
      footerNotes={
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {viewMode === 'comparator'
              ? 'El comparador simula estadísticas primarias escalando con la tasa de crecimiento canónica de Olden Era.'
              : viewMode === 'simulator'
              ? 'Configura el comandante, el nivel objetivo y la distribución de habilidades para cada facción.'
              : `Mostrando ${filteredHeroes.length} de ${heroes.length} héroes disponibles para la facción ${selectedFaction}. Los datos se actualizan automáticamente al cambiar de facción.`}
          </span>
        </div>
      }
    >
      {viewMode === 'comparator' ? (
        <HeroComparatorSplitScreen
          initialHeroA={compareHeroA}
          initialHeroB={compareHeroB}
          defaultFaction={selectedFaction}
          themeMode={themeMode}
          onBackToRoster={() => setViewMode('roster')}
        />
      ) : viewMode === 'simulator' ? (
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold mb-4">Simulador de Builds de Comandante</h2>
          <HeroBuildSimulator
            selectedFaction={selectedFaction}
            themeMode={themeMode}
            initialHeroId={inspectedHero?.id}
          />
        </div>
      ) : (
        <>
          {/* Grid de Tarjetas de Héroes */}
          {filteredHeroes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHeroes.map((hero) => (
                <HeroGuideCard
                  key={hero.id}
                  hero={hero}
                  onSelect={() => setInspectedHero(hero)}
                  onCompare={handleStartCompare}
                  themeMode={themeMode}
                  themeAccentClass={theme.textAccent}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-2xl border-dashed border-slate-800 text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No se encontraron héroes que coincidan con la búsqueda.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedArchetype('all');
                }}
                className="mt-2 text-xs text-amber-400 hover:underline cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal Detallado */}
      <HeroDetailModal
        hero={inspectedHero}
        onClose={() => setInspectedHero(null)}
        onCompare={handleStartCompare}
        themeMode={themeMode}
        themeAccentClass={theme.textAccent}
      />
    </GenericGuideTemplate>
  );
};
