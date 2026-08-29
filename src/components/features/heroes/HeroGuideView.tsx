import React, { useState, useMemo } from 'react';
import { DungeonHero } from '../../../types';
import { FactionId, getFactionTheme } from '../../../data/factionDataProvider';
import { getHeroesByFactionKey } from '../../../data/heroesData';
import { GenericGuideTemplate } from '../../ui/GenericGuideTemplate';
import { SearchBar } from '../../ui/SearchBar';
import { FilterChipGroup, FilterOption } from '../../ui/FilterChipGroup';
import { HeroGuideCard } from './HeroGuideCard';
import { HeroDetailModal } from './HeroDetailModal';
import { Users, Wand2, Swords, Sparkles, Filter } from 'lucide-react';

interface HeroGuideViewProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
  customHeroesList?: DungeonHero[];
}

export const HeroGuideView: React.FC<HeroGuideViewProps> = ({
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
  customHeroesList,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<'all' | 'Guerrero' | 'Mago'>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [inspectedHero, setInspectedHero] = useState<DungeonHero | null>(null);

  const theme = getFactionTheme(selectedFaction, themeMode);

  // 1. Carga dinámica de héroes según la facción activa (o lista personalizada)
  const heroes: DungeonHero[] = useMemo(() => {
    return customHeroesList || getHeroesByFactionKey(selectedFaction);
  }, [selectedFaction, customHeroesList]);

  // 2. Filtro reactivo en memoria
  const filteredHeroes = useMemo(() => {
    return heroes.filter((h) => {
      const matchSearch =
        searchTerm === '' ||
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.specialtyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.heroClass.toLowerCase().includes(searchTerm.toLowerCase());

      const matchArchetype =
        selectedArchetype === 'all' || h.heroType === selectedArchetype;

      const matchRole =
        selectedRole === 'all' || h.role.toLowerCase().includes(selectedRole.toLowerCase());

      return matchSearch && matchArchetype && matchRole;
    });
  }, [heroes, searchTerm, selectedArchetype, selectedRole]);

  // 3. Opciones de filtros
  const archetypeOptions: FilterOption<'all' | 'Guerrero' | 'Mago'>[] = [
    { id: 'all', label: 'Todos', count: heroes.length, icon: <Users className="w-3.5 h-3.5" /> },
    {
      id: 'Guerrero',
      label: 'Guerreros',
      count: heroes.filter((h) => h.heroType === 'Guerrero').length,
      icon: <Swords className="w-3.5 h-3.5" />,
    },
    {
      id: 'Mago',
      label: 'Magos',
      count: heroes.filter((h) => h.heroType === 'Mago').length,
      icon: <Wand2 className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <GenericGuideTemplate
      selectedFaction={selectedFaction}
      themeMode={themeMode}
      title="Guía Canónica de Héroes & Especialistas"
      categorySubtitle="Heroes of Might and Magic: Olden Era • Roster & Builds"
      description="Explora todos los comandantes oficiales de la facción, sus especialidades únicas, crecimientos porcentuales de atributos por nivel, habilidades iniciales recomendadas y estilos tácticos de combate."
      filterBar={
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={`Buscar héroe de ${selectedFaction} por nombre, clase o especialidad...`}
              themeMode={themeMode}
            />
            <FilterChipGroup
              options={archetypeOptions}
              selectedValue={selectedArchetype}
              onChange={setSelectedArchetype}
              themeMode={themeMode}
            />
          </div>
        </div>
      }
      footerNotes={
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Mostrando <strong>{filteredHeroes.length}</strong> de {heroes.length} héroes disponibles para la facción <strong>{selectedFaction}</strong>. Los datos se actualizan automáticamente al cambiar de facción.
          </span>
        </div>
      }
    >
      {/* Grid de Tarjetas de Héroes */}
      {filteredHeroes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHeroes.map((hero) => (
            <HeroGuideCard
              key={hero.id}
              hero={hero}
              onSelect={() => setInspectedHero(hero)}
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

      {/* Modal Detallado */}
      <HeroDetailModal
        hero={inspectedHero}
        onClose={() => setInspectedHero(null)}
        themeMode={themeMode}
        themeAccentClass={theme.textAccent}
      />
    </GenericGuideTemplate>
  );
};
