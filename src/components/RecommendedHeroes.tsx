import React, { useState } from 'react';
import { FactionId, getHeroesForFaction, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { HERO_SELECTION_GUIDELINES } from '../data/dungeonData';
import { OFFICIAL_SKILLS_DATA } from '../data/officialSkillsData';
import { OFFICIAL_SUBCLASSES } from '../data/subclassesData';
import { HERO_SUBSKILL_CHOICES, SKILL_SELECTION_GUIDES } from '../data/subskillsRecommendationData';
import { DungeonHero, OfficialSkill, HeroSubskillChoice, SubclassInfo } from '../types';
import { useStickyState } from '../utils/useStickyState';
import {
  Sparkles,
  Zap,
  Shield,
  Compass,
  Star,
  Award,
  Crown,
  Search,
  CheckCircle2,
  GitBranch,
  ArrowRight,
  Flame,
  UserCheck,
  TrendingUp,
  Scale,
  Users,
  X,
  Target,
  BookOpen,
  Check,
  AlertTriangle
} from 'lucide-react';

interface RecommendedHeroesProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
}

const FACTION_CLASS_NAMES: Record<FactionId, { guerrero: string; mago: string }> = {
  Mazmorra: { guerrero: 'Adalid', mago: 'Brujo' },
  Templo: { guerrero: 'Caballero', mago: 'Clérigo' },
  Arboleda: { guerrero: 'Guardián', mago: 'Sabio' },
  Necrópolis: { guerrero: 'Caballero de la muerte', mago: 'Nigromante' },
  Enjambre: { guerrero: 'Ejecutor', mago: 'Canalizador' },
  Cisma: { guerrero: 'Juramentado', mago: 'Portavoz de la Grieta' },
};

const FACTION_HERO_HIGHLIGHTS: Record<FactionId, {
  magicTitle: string;
  magicNames: string;
  magicDesc: string;
  physTitle: string;
  physNames: string;
  physDesc: string;
  econTitle: string;
  econNames: string;
  econDesc: string;
}> = {
  Mazmorra: {
    magicTitle: 'Recomendación Meta: Mágicos',
    magicNames: 'Zakron the Great & Motley (Top Mágicos)',
    magicDesc: 'Zakron inflige daño mágico catastrófico con todos los conjuros directos. Motley acelera y duplica el golpe de las Danzantes de Ónice. Sunny Rauktol potencia la Magia de Luz (Daylight).',
    physTitle: 'Recomendación Meta: Físicos',
    physNames: 'Enatee, Devir & Tellaris the Betrayed (Top Físicos)',
    physDesc: 'Enatee lidera Medusas con petrificación sin contraataque. Devir convierte a los Minotauros en arietes imparables. Tellaris otorga un inicio de batalla aplastante con buffs masivos indisipables.',
    econTitle: 'Economía & Soporte Logístico',
    econNames: 'Glastor (Oro) & Creta (Gemas Pasivas)',
    econDesc: 'Glastor genera oro diario masivo y bonos en cofres. Creta genera +1 Gema/día y reduce costes de gemas para acelerar Dragones e Hidras sin cuellos de botella.',
  },
  Templo: {
    magicTitle: 'Recomendación Meta: Mágicos',
    magicNames: 'Julius, Zenith & Merry Elias (Luz & Resistencia Arcana)',
    magicDesc: 'Julius escala con Resistencia pasiva y coste 0 de maná (Ascendente). Zenith inicia con Tejedoras de Luz y ceguera inmediata. Merry Elias duplica la duración de bendiciones solares.',
    physTitle: 'Recomendación Meta: Físicos',
    physNames: 'Kestrel, Keandra & Old Lord Mandall (Top Físicos)',
    physDesc: 'Kestrel limpia el mapa Día 1 con su horda de 24 Ballesteros. Keandra desata cargas devastadoras con la Caballería de Lanza Solar. Old Lord Mandall y Lord Edgar potencian la infantería y Golpe Heroico.',
    econTitle: 'Economía & Soporte Logístico',
    econNames: 'Clarissa (+Oro y Cofres) & Leon Sticky-Fingers (Exploración)',
    econDesc: 'Clarissa genera +350 de oro diario y +25% en cofres para acelerar la Forja Radiante. Leon Sticky-Fingers despeja la niebla y maximiza la recolección de tesoros.',
  },
  Arboleda: {
    magicTitle: 'Recomendación Meta: Mágicos',
    magicNames: 'Vatawna, Elder Tss\'kish & Aeliniel (Tormentas & Enredo)',
    magicDesc: 'Vatawna desata Tormentas Primordiales y reduce el coste elemental. Elder Tss\'kish hace inmortales a los Hombres Árbol con Piel de Roble. Aeliniel hostiga con Hadas y Polen Cegador.',
    physTitle: 'Recomendación Meta: Físicos',
    physNames: 'Kelarr & Eligor (Puntería Élfica & Emboscada)',
    physDesc: 'Kelarr convierte a los Cazadores Elfos en francotiradores sin penalización por distancia. Eligor otorga +3 Iniciativa y despliegue avanzado en Turno 1.',
    econTitle: 'Economía & Soporte Logístico',
    econNames: 'Robin (Logística Silvana & Marcha de Selva)',
    econDesc: 'Robin elimina penalizaciones por terreno forestal y añade +300 puntos de movimiento diarios para transportar refuerzos a velocidad máxima.',
  },
  Necrópolis: {
    magicTitle: 'Recomendación Meta: Mágicos',
    magicNames: 'Thant & Ethric (Animar a los Muertos & Bombardeo de Liches)',
    magicDesc: 'Thant garantiza batallas con 0 bajas reduciendo el coste de Animar a los Muertos a la mitad. Ethric potencia el radio de las Nubes de Muerte de los Archiliches.',
    physTitle: 'Recomendación Meta: Físicos',
    physNames: 'Bulwark & King-of-Kings (Bastión de Hueso & Desmoralización)',
    physDesc: 'Bulwark otorga +4 Defensa y +20% resistencia física a la infantería no-muerta. King-of-Kings reduce la moral enemiga en -2 y asesta Golpes Heroicos letales.',
    econTitle: 'Economía & Soporte Logístico',
    econNames: 'Laura (Cosecha Temprana) & Onkos (Aura Pestilente)',
    econDesc: 'Laura multiplica la horda de esqueletos desde Semana 1 con +25% nigromancia. Onkos neutraliza atacantes pesados reduciendo su daño con zombis acorazados.',
  },
  Enjambre: {
    magicTitle: 'Recomendación Meta: Mágicos',
    magicNames: 'Psyche & Xilith (Control Psiónico & Avispas Neurotóxicas)',
    magicDesc: 'Psyche aturde unidades enemigas en Turno 1 y abarata hechizos de ácido/feromonas. Xilith aplica veneno paralizante y drena movimiento en mapa al rival.',
    physTitle: 'Recomendación Meta: Físicos',
    physNames: 'Zixx & Neve (Frenesí de Asalto & Mantis Voraces)',
    physDesc: 'Zixx otorga +1 Velocidad y +2 Ataque con Ataque de Manada en Turno 1. Neve salta murallas con Mantis Voraces para aniquilar tiradores.',
    econTitle: 'Economía & Soporte Logístico',
    econNames: 'Skith (Caparazón Quitinoso & Reflejo de Daño)',
    econDesc: 'Skith lidera con Escarabajos Acorazados (+4 Def, +25% PS) que reflejan daño y limpian bancos de recursos con coste cero de tropas.',
  },
  Cisma: {
    magicTitle: 'Recomendación Meta: Mágicos',
    magicNames: 'Lyssara & Tölketh (Rayo de Brecha & Implosión Rúnica)',
    magicDesc: 'Lyssara aniquila formaciones enemigas con Rayo Estelar de Brecha (+25% daño, -30% coste). Tölketh pulveriza colosos y dragones con Implosión y recupera maná.',
    physTitle: 'Recomendación Meta: Físicos',
    physNames: 'Grellekh & Hel\'ghat (Blindaje Rúnico & Rebanadores)',
    physDesc: 'Grellekh blinda a Gólems y Autómatas (+4 Def, +25% resistencia mágica). Hel\'ghat penetra defensas saltando dimensionalmente con Rebanadores Arcanos.',
    econTitle: 'Economía & Soporte Logístico',
    econNames: 'Nihil (Blindaje Anti-Magia & Drenaje de Maná)',
    econDesc: 'Nihil otorga +30% resistencia mágica global y drena 8 de maná al héroe rival al inicio del combate, anulando a cualquier hechicero enemigo.',
  },
};

export const RecommendedHeroes: React.FC<RecommendedHeroesProps> = ({ 
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
}) => {
  const heroes = getHeroesForFaction(selectedFaction);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);
  const highlights = FACTION_HERO_HIGHLIGHTS[selectedFaction] || FACTION_HERO_HIGHLIGHTS.Mazmorra;
  const defaultHeroId = heroes[0]?.id || (selectedFaction === 'Templo' ? 'hero-lord-edgar' : 'hero-enatee');

  const [selectedHeroId, setSelectedHeroId] = useStickyState<string>(defaultHeroId, `heroes_selected_hero_id_${selectedFaction}`);
  const [classFilter, setClassFilter] = useStickyState<string>('all', 'heroes_class_filter');
  const [roleFilter, setRoleFilter] = useStickyState<string>('all', 'heroes_role_filter');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [compareHeroId, setCompareHeroId] = useState<string | null>(null);
  const [inspectedSkill, setInspectedSkill] = useState<OfficialSkill | null>(null);
  const [showSubskillsDetails, setShowSubskillsDetails] = useStickyState<boolean>(true, 'heroes_show_subskills');

  const normalize = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const findOfficialSkill = (skillStr: string): OfficialSkill | undefined => {
    const clean = normalize(skillStr.replace(/\s*\((Experta|Avanzada|Básica)\)/, ''));
    return OFFICIAL_SKILLS_DATA.find((s) => {
      const sNorm = normalize(s.name);
      return sNorm === clean || clean.includes(sNorm) || sNorm.includes(clean);
    });
  };

  const getSubskillChoicesForHero = (hero: DungeonHero): HeroSubskillChoice[] => {
    if (HERO_SUBSKILL_CHOICES[hero.id]) {
      return HERO_SUBSKILL_CHOICES[hero.id];
    }
    // Dynamic fallback using SKILL_SELECTION_GUIDES and OFFICIAL_SKILLS_DATA
    return hero.idealSkillBuild.map((skillStr) => {
      const clean = skillStr.replace(/\s*\((Experta|Avanzada|Básica)\)/, '').trim();
      const offSkill = findOfficialSkill(clean);
      const skillId = offSkill?.id || clean.toLowerCase().replace(/\s+/g, '-');
      const guide = SKILL_SELECTION_GUIDES[skillId];

      const advSub = offSkill?.subskills.advanced.find(
        (s) => s.name.toLowerCase() === (guide?.advanced.recommendedName || '').toLowerCase()
      ) || offSkill?.subskills.advanced[0];

      const expSub = offSkill?.subskills.expert.find(
        (s) => s.name.toLowerCase() === (guide?.expert.recommendedName || '').toLowerCase()
      ) || offSkill?.subskills.expert[0];

      return {
        skillName: skillStr,
        advancedSubskill: guide?.advanced.recommendedName || advSub?.name || 'Subhabilidad Avanzada',
        advancedReason: guide?.advanced.why || 'Optimiza el rendimiento del héroe en combate.',
        expertSubskill: guide?.expert.recommendedName || expSub?.name || 'Subhabilidad Experta',
        expertReason: guide?.expert.why || 'Proporciona la ventaja definitiva en combate tardío.',
      };
    });
  };

  const factionClassInfo = FACTION_CLASS_NAMES[selectedFaction] || { guerrero: 'Guerrero', mago: 'Mago' };

  const filteredHeroes = heroes.filter((hero) => {
    const matchesClass = classFilter === 'all' || hero.heroType === classFilter;
    const matchesRole = roleFilter === 'all' || hero.role.includes(roleFilter);
    const matchesSearch =
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.specialtyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.tacticalPlaystyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.heroClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.heroType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesClass && matchesRole && matchesSearch;
  });

  const selectedHero = heroes.find((h) => h.id === selectedHeroId) || heroes[0];
  const compareHero = compareHeroId ? heroes.find((h) => h.id === compareHeroId) : null;

  return (
    <div className="space-y-6">
      {/* Top Banner with Strategy Context */}
      <div className={`border rounded-2xl p-5 ${theme.shadowAccent} backdrop-blur-md transition-colors duration-300 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md'
          : `bg-black/40 border ${theme.border}`
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`${theme.bgBadge} ${theme.textAccent} text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border ${theme.borderSubtle} flex items-center gap-1.5 font-mono`}>
                <Crown className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" />
                Comandantes de {meta.name} • {meta.region}
              </span>
              <span className={`text-xs font-mono ${themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                {heroes.length} Héroes Disponibles
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-serif uppercase tracking-wide font-bold ${
              themeMode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Héroes Oficiales de {meta.name} & Guía de Progresión
            </h2>
            <p className={`text-xs mt-1 max-w-3xl leading-relaxed ${
              themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Catálogo verificado para <em>Heroes of Might and Magic: Olden Era</em>. Análisis completo de los comandantes de {meta.name}, especialidades únicas, orden de habilidades y sinergias con el Árbol de Leyes y tácticas de combate.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <Search className={`w-4 h-4 ${themeMode === 'light' ? 'text-purple-600' : theme.textAccent} absolute left-3 top-1/2 -translate-y-1/2`} />
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs font-sans focus:outline-none transition-colors ${
                themeMode === 'light'
                  ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:bg-white'
                  : `bg-black/60 border ${theme.borderSubtle} text-slate-200 placeholder-slate-500 focus:border-current`
              }`}
            />
          </div>
        </div>

        {/* Filter controls */}
        <div className={`mt-4 pt-4 border-t ${theme.borderSubtle} flex items-center gap-3 overflow-x-auto no-scrollbar pb-1`}>
          {/* Class Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className={`${themeMode === 'light' ? 'text-slate-600' : 'text-slate-500'} font-mono text-[10px] uppercase font-bold`}>
              Clase:
            </span>
            {[
              { id: 'all', label: `Todas (${heroes.length})` },
              {
                id: 'Guerrero',
                label: `Guerrero / ${factionClassInfo.guerrero} (${heroes.filter((h) => h.heroType === 'Guerrero').length})`,
              },
              {
                id: 'Mago',
                label: `Mago / ${factionClassInfo.mago} (${heroes.filter((h) => h.heroType === 'Mago').length})`,
              },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setClassFilter(c.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  classFilter === c.id
                    ? `${theme.primaryButton} shadow-md`
                    : themeMode === 'light'
                    ? 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <span className={`${themeMode === 'light' ? 'text-slate-600' : 'text-slate-500'} font-mono text-[10px] uppercase font-bold`}>
              Rol:
            </span>
            {[
              { id: 'all', label: 'Todos' },
              { id: 'Principal Mágico', label: 'Main Mágico' },
              { id: 'Principal Físico', label: 'Main Físico' },
              { id: 'Apertura Rápida', label: 'Rush Día 1' },
              { id: 'Secundario', label: 'Economía / Logística' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRoleFilter(r.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all font-mono whitespace-nowrap cursor-pointer ${
                  roleFilter === r.id
                    ? `${theme.primaryButton} shadow-md`
                    : themeMode === 'light'
                    ? 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Selection Summary Cards (Meta Recommendations) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-xl p-4 shadow-lg border transition-all ${
          themeMode === 'light'
            ? `${theme.bgCard} ${theme.border} ${theme.glow}`
            : `bg-gradient-to-br ${theme.bgBadge} via-black/60 to-black/80 ${theme.borderSubtle}`
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className={`w-4 h-4 ${theme.textAccent}`} />
            <h4 className={`text-xs font-bold uppercase ${theme.textAccent} font-mono tracking-wider`}>
              {highlights.magicTitle}
            </h4>
          </div>
          <div className={`text-sm font-bold font-serif mb-1 ${themeMode === 'light' ? 'text-amber-800' : 'text-yellow-300'}`}>
            {highlights.magicNames}
          </div>
          <p className={`text-xs leading-relaxed ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
            {highlights.magicDesc}
          </p>
        </div>

        <div className={`rounded-xl p-4 shadow-lg border transition-all ${
          themeMode === 'light'
            ? 'bg-teal-50/90 border-teal-300 shadow-[0_4px_20px_rgba(13,148,136,0.18)]'
            : 'bg-gradient-to-br from-teal-950/50 via-black/60 to-black/80 border-teal-800/60'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Compass className={`w-4 h-4 ${themeMode === 'light' ? 'text-teal-700' : 'text-teal-400'}`} />
            <h4 className={`text-xs font-bold uppercase font-mono tracking-wider ${themeMode === 'light' ? 'text-teal-800' : 'text-teal-200'}`}>
              {highlights.physTitle}
            </h4>
          </div>
          <div className={`text-sm font-bold font-serif mb-1 ${themeMode === 'light' ? 'text-teal-900' : 'text-teal-300'}`}>
            {highlights.physNames}
          </div>
          <p className={`text-xs leading-relaxed ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
            {highlights.physDesc}
          </p>
        </div>

        <div className={`rounded-xl p-4 shadow-lg border transition-all ${
          themeMode === 'light'
            ? 'bg-amber-50/90 border-amber-300 shadow-[0_4px_20px_rgba(217,119,6,0.18)]'
            : 'bg-gradient-to-br from-amber-950/50 via-black/60 to-black/80 border-amber-800/60'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Users className={`w-4 h-4 ${themeMode === 'light' ? 'text-amber-700' : 'text-amber-400'}`} />
            <h4 className={`text-xs font-bold uppercase font-mono tracking-wider ${themeMode === 'light' ? 'text-amber-800' : 'text-amber-200'}`}>
              {highlights.econTitle}
            </h4>
          </div>
          <div className={`text-sm font-bold font-serif mb-1 ${themeMode === 'light' ? 'text-amber-900' : 'text-amber-300'}`}>
            {highlights.econNames}
          </div>
          <p className={`text-xs leading-relaxed ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
            {highlights.econDesc}
          </p>
        </div>
      </div>

      {/* Main Heroes Roster & Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Heroes Roster List (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className={`text-xs font-mono uppercase font-bold tracking-wider ${
              themeMode === 'light' ? 'text-slate-700' : 'text-slate-400'
            }`}>
              Seleccionar Héroe ({filteredHeroes.length})
            </span>
            <span className={`text-[10px] ${themeMode === 'light' ? 'text-purple-700 font-bold' : theme.textAccent} font-mono`}>
              Haz clic para ver detalles
            </span>
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredHeroes.map((hero) => {
              const isSelected = hero.id === selectedHeroId;
              const isComparing = hero.id === compareHeroId;

              const tierBadgeColor =
                hero.tierRank.includes('S+')
                  ? themeMode === 'light'
                    ? 'bg-red-100 text-red-900 border-red-300'
                    : 'bg-red-950/80 text-red-300 border-red-700/60'
                  : hero.tierRank.includes('Tier S')
                  ? themeMode === 'light'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                  : hero.tierRank.includes('Tier A')
                  ? themeMode === 'light'
                    ? 'bg-purple-100 text-purple-900 border-purple-300'
                    : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                  : themeMode === 'light'
                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                  : 'bg-blue-950/80 text-blue-300 border-blue-700/60';

              const classColor = hero.heroType === 'Mago'
                ? themeMode === 'light' ? 'text-purple-700 font-bold' : theme.textAccent
                : themeMode === 'light' ? 'text-teal-700 font-bold' : 'text-teal-400';

              return (
                <div
                  key={hero.id}
                  onClick={() => setSelectedHeroId(hero.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer backdrop-blur-sm relative overflow-hidden ${
                    isSelected
                      ? themeMode === 'light'
                        ? 'bg-purple-50/90 border-purple-400 shadow-md ring-2 ring-purple-300'
                        : `${theme.bgBadge} ${theme.border} ${theme.shadowAccent} ring-1 ring-current`
                      : themeMode === 'light'
                      ? 'bg-white border-slate-200 hover:border-purple-300 hover:bg-slate-50/70 shadow-xs'
                      : `bg-black/50 ${theme.borderSubtle} hover:border-amber-400/50 hover:bg-black/70`
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${tierBadgeColor}`}>
                          {hero.tierRank}
                        </span>
                        <span className={`text-[10px] font-mono font-semibold ${classColor}`}>
                          {hero.heroType} / {hero.heroClass}
                        </span>
                      </div>
                      <h3 className={`text-base font-serif font-bold tracking-wide ${
                        themeMode === 'light' ? 'text-slate-950' : 'text-white'
                      }`}>
                        {hero.name}
                      </h3>
                      <div className={`text-xs font-sans italic ${
                        themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {hero.title}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        themeMode === 'light'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-black/60 text-slate-300 border-slate-800'
                      }`}>
                        {hero.role}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompareHeroId(isComparing ? null : hero.id);
                        }}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all cursor-pointer ${
                          isComparing
                            ? themeMode === 'light'
                              ? 'bg-teal-600 text-white border-teal-600 font-bold'
                              : 'bg-teal-700 text-white border-teal-400'
                            : themeMode === 'light'
                            ? 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
                            : 'bg-black/40 text-slate-400 hover:text-slate-200 border-slate-700'
                        }`}
                      >
                        {isComparing ? '✓ Comparando' : '+ Comparar'}
                      </button>
                    </div>
                  </div>

                  <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-xs ${
                    themeMode === 'light' ? 'border-slate-200' : 'border-purple-900/30'
                  }`}>
                    <span className={`font-mono text-[11px] truncate font-semibold ${
                      themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400/90'
                    }`}>
                      ★ {hero.specialtyName}
                    </span>
                    <span className={`text-[10px] shrink-0 font-mono ${
                      themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {hero.initialArmy.split(',')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Hero Full Dossier (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`border rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-5 transition-colors ${
            themeMode === 'light'
              ? 'bg-white border-slate-200 shadow-xl'
              : `bg-black/60 border ${theme.border}`
          }`}>
            {/* Dossier Header */}
            <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b pb-4 ${
              themeMode === 'light' ? 'border-slate-200' : theme.borderSubtle
            }`}>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border font-mono ${
                    themeMode === 'light'
                      ? 'bg-purple-100 text-purple-900 border-purple-300'
                      : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                  }`}>
                    {selectedHero.heroType} / {selectedHero.heroClass}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border font-mono ${
                    themeMode === 'light'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                  }`}>
                    {selectedHero.role}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border font-mono ${
                    themeMode === 'light'
                      ? 'bg-red-100 text-red-900 border-red-300'
                      : 'bg-red-950/80 text-red-300 border-red-700/60'
                  }`}>
                    {selectedHero.tierRank}
                  </span>
                </div>
                <h3 className={`text-2xl font-serif font-bold tracking-wide ${
                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {selectedHero.name}
                </h3>
                <p className={`text-xs font-sans italic ${
                  themeMode === 'light' ? 'text-purple-800 font-semibold' : theme.textAccent
                }`}>
                  "{selectedHero.title}"
                </p>
              </div>

              <div className={`p-3 rounded-xl min-w-[180px] border ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : `bg-black/70 border ${theme.borderSubtle}`
              }`}>
                <div className={`text-[10px] uppercase font-mono font-bold mb-1 ${
                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Recomendación de Uso
                </div>
                <div className={`text-xs leading-snug font-medium ${
                  themeMode === 'light' ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  {selectedHero.recommendedStartingTier}
                </div>
              </div>
            </div>

            {/* Specialty Callout */}
            <div className={`rounded-xl p-4 border transition-colors ${
              themeMode === 'light'
                ? 'bg-amber-50/90 border-2 border-amber-300 shadow-sm'
                : 'bg-gradient-to-r from-amber-950/40 via-black/40 to-black/60 border border-amber-500/40'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 dark:text-yellow-400 dark:fill-yellow-400" />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
                }`}>
                  Especialidad Única: {selectedHero.specialtyName}
                </span>
              </div>
              <p className={`text-xs leading-relaxed font-sans ${
                themeMode === 'light' ? 'text-slate-700 font-medium' : 'text-slate-200'
              }`}>
                {selectedHero.specialtyEffect}
              </p>
            </div>

            {/* Stat Growth & Initial Assets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stat Growth */}
              <div className={`rounded-xl p-3.5 space-y-2.5 border ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : `bg-black/50 border ${theme.borderSubtle}`
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono uppercase font-bold flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    <TrendingUp className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-teal-600' : 'text-teal-400'}`} />
                    Crecimiento de Atributos (% Nivel 1-20)
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <div className={`flex justify-between text-[11px] font-mono mb-0.5 ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <span className={themeMode === 'light' ? 'text-red-700 font-bold' : 'text-red-400'}>Ataque Físico</span>
                      <span>{selectedHero.statGrowth.attack}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden border ${
                      themeMode === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-black/60 border-slate-800'
                    }`}>
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-red-500"
                        style={{ width: `${selectedHero.statGrowth.attack}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between text-[11px] font-mono mb-0.5 ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <span className={themeMode === 'light' ? 'text-blue-700 font-bold' : 'text-blue-400'}>Defensa</span>
                      <span>{selectedHero.statGrowth.defense}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden border ${
                      themeMode === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-black/60 border-slate-800'
                    }`}>
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
                        style={{ width: `${selectedHero.statGrowth.defense}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between text-[11px] font-mono mb-0.5 ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <span className={themeMode === 'light' ? 'text-purple-700 font-bold' : 'text-purple-400'}>Poder Mágico (SP)</span>
                      <span>{selectedHero.statGrowth.spellPower}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden border ${
                      themeMode === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-black/60 border-slate-800'
                    }`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                        style={{ width: `${selectedHero.statGrowth.spellPower}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between text-[11px] font-mono mb-0.5 ${
                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      <span className={themeMode === 'light' ? 'text-teal-700 font-bold' : 'text-cyan-400'}>Conocimiento (Maná)</span>
                      <span>{selectedHero.statGrowth.knowledge}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden border ${
                      themeMode === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-black/60 border-slate-800'
                    }`}>
                      <div
                        className="h-full bg-gradient-to-r from-teal-600 to-cyan-400"
                        style={{ width: `${selectedHero.statGrowth.knowledge}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Initial Army & Skills */}
              <div className={`rounded-xl p-3.5 space-y-3 border ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : `bg-black/50 border ${theme.borderSubtle}`
              }`}>
                <div>
                  <span className={`text-[10px] font-mono uppercase font-bold block mb-1 ${
                    themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Ejército Inicial en Taberna:
                  </span>
                  <div className={`text-xs font-mono p-2 rounded-lg border font-semibold ${
                    themeMode === 'light'
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : `text-yellow-300 bg-black/60 border ${theme.borderSubtle}`
                  }`}>
                    {selectedHero.initialArmy}
                  </div>
                </div>

                <div>
                  <span className={`text-[10px] font-mono uppercase font-bold block mb-1 ${
                    themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Habilidades de Inicio:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHero.initialSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${
                          themeMode === 'light'
                            ? 'bg-purple-100 text-purple-900 border-purple-200'
                            : `${theme.bgBadge} ${theme.textAccent} border ${theme.borderSubtle}`
                        }`}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Playstyle & Day 1 Action */}
            <div className="space-y-3">
              <div className={`rounded-xl p-3.5 border ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : `bg-black/40 border ${theme.borderSubtle}`
              }`}>
                <span className={`text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 mb-1 ${
                  themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                }`}>
                  <Flame className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-purple-600' : 'text-teal-400'}`} />
                  Estilo de Juego Táctico & Combate:
                </span>
                <p className={`text-xs leading-relaxed ${
                  themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  {selectedHero.tacticalPlaystyle}
                </p>
              </div>

              <div className={`rounded-xl p-3.5 border ${
                themeMode === 'light'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-amber-950/20 border-amber-900/40'
              }`}>
                <span className={`text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 mb-1 ${
                  themeMode === 'light' ? 'text-amber-900' : 'text-amber-400'
                }`}>
                  <Compass className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-amber-600' : 'text-amber-400'}`} />
                  Acción Óptima en Día 1 (Apertura de Partida):
                </span>
                <p className={`text-xs leading-relaxed ${
                  themeMode === 'light' ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  {selectedHero.day1Action}
                </p>
              </div>
            </div>

            {/* Ideal 8-Skill Build */}
            <div className={`rounded-xl p-4 space-y-2.5 border ${
              themeMode === 'light'
                ? 'bg-slate-50 border-slate-200'
                : `bg-black/50 border ${theme.borderSubtle}`
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${
                  themeMode === 'light' ? 'text-purple-950' : theme.textAccent
                }`}>
                  <GitBranch className="w-3.5 h-3.5" />
                  Build Ideal de 8 Habilidades (Nivel 1 a 25)
                </span>
                <span className={`text-[10px] font-mono ${
                  themeMode === 'light' ? 'text-purple-700 font-semibold' : theme.textAccent
                }`}>
                  Haz clic en cualquier habilidad para inspeccionar sus 6 subhabilidades
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedHero.idealSkillBuild.map((skillStr, sIdx) => {
                  const isExperta = skillStr.includes('(Experta)');
                  const isAvanzada = skillStr.includes('(Avanzada)');
                  const cleanName = skillStr.replace(/\s*\((Experta|Avanzada|Básica)\)/, '');
                  const tierLabel = isExperta ? 'Experta' : isAvanzada ? 'Avanzada' : 'Básica';
                  const officialSkill = findOfficialSkill(cleanName);

                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => officialSkill && setInspectedSkill(officialSkill)}
                      className={`p-2.5 rounded-lg border transition-all text-xs flex items-center justify-between gap-2 shadow-xs text-left group cursor-pointer ${
                        themeMode === 'light'
                          ? 'bg-white hover:bg-purple-50/60 border-slate-200 hover:border-purple-300'
                          : `bg-black/60 hover:bg-black/80 border ${theme.borderSubtle} hover:border-amber-400/80`
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded-full font-mono font-bold text-[10px] flex items-center justify-center shrink-0 border ${
                          themeMode === 'light'
                            ? 'bg-purple-100 text-purple-900 border-purple-200 group-hover:border-purple-400'
                            : `${theme.bgBadge} ${theme.textAccent} border ${theme.borderSubtle} group-hover:border-amber-400`
                        }`}>
                          {sIdx + 1}
                        </span>
                        <span className={`font-semibold truncate ${
                          themeMode === 'light'
                            ? 'text-slate-800 group-hover:text-purple-900'
                            : 'text-slate-100 group-hover:text-amber-200'
                        }`}>
                          {cleanName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                            isExperta
                              ? themeMode === 'light'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-yellow-950/60 text-yellow-300 border-yellow-800/60'
                              : themeMode === 'light'
                              ? 'bg-purple-100 text-purple-900 border-purple-200'
                              : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                          }`}
                        >
                          {tierLabel}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dedicated Recommended Subskills Section for the Selected Hero */}
            <div className={`border-2 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl transition-colors ${
              themeMode === 'light'
                ? 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/50 border-amber-300 ring-1 ring-amber-200 shadow-md'
                : 'bg-gradient-to-br from-black/80 via-black/60 to-black/90 border-yellow-600/50 ring-1 ring-yellow-500/20'
            }`}>
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
                themeMode === 'light' ? 'border-amber-200' : theme.borderSubtle
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md border ${
                    themeMode === 'light'
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-yellow-950/80 border-yellow-500/70 text-yellow-300'
                  }`}>
                    <Star className="w-4 h-4 fill-current text-current" />
                  </div>
                  <div>
                    <h4 className={`text-sm sm:text-base font-bold font-serif flex items-center gap-2 ${
                      themeMode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Elección Recomendada de Subhabilidades
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        themeMode === 'light'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-yellow-950 text-yellow-300 border-yellow-700'
                      }`}>
                        Meta Canónico
                      </span>
                    </h4>
                    <p className={`text-[11px] font-sans ${
                      themeMode === 'light' ? 'text-slate-600' : theme.textAccent
                    }`}>
                      Qué subhabilidad elegir en cada nivel de maestría para maximizar a <strong>{selectedHero.name}</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSubskillsDetails(!showSubskillsDetails)}
                  className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-colors shrink-0 self-start sm:self-auto cursor-pointer border ${
                    themeMode === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : `${theme.bgBadge} hover:bg-black/60 border ${theme.borderSubtle} ${theme.textAccent}`
                  }`}
                >
                  {showSubskillsDetails ? 'Contraer Detalles' : 'Ver Todos los Detalles'}
                </button>
              </div>

              {showSubskillsDetails && (
                <div className="grid grid-cols-1 gap-3.5">
                  {getSubskillChoicesForHero(selectedHero).map((choice, idx) => {
                    const cleanName = choice.skillName.replace(/\s*\((Experta|Avanzada|Básica)\)/, '');
                    const offSkill = findOfficialSkill(cleanName);

                    return (
                      <div
                        key={idx}
                        className={`rounded-xl p-3.5 space-y-2.5 transition-all border ${
                          themeMode === 'light'
                            ? 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
                            : `bg-black/60 border ${theme.borderSubtle} hover:border-yellow-600/60`
                        }`}
                      >
                        {/* Skill Header */}
                        <div className={`flex items-center justify-between gap-2 border-b pb-2 ${
                          themeMode === 'light' ? 'border-slate-100' : theme.borderSubtle
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full font-mono font-bold text-[10px] flex items-center justify-center border shrink-0 ${
                              themeMode === 'light'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-yellow-950 text-yellow-300 border-yellow-600/60'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className={`text-xs sm:text-sm font-bold ${
                              themeMode === 'light' ? 'text-slate-900' : 'text-white'
                            }`}>
                              {choice.skillName}
                            </span>
                          </div>

                          {offSkill && (
                            <button
                              type="button"
                              onClick={() => setInspectedSkill(offSkill)}
                              className={`text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                                themeMode === 'light'
                                  ? 'text-purple-700 hover:text-purple-900 font-semibold'
                                  : `${theme.textAccent} hover:text-yellow-300`
                              }`}
                            >
                              <BookOpen className="w-3 h-3" />
                              Ver árbol completo
                            </button>
                          )}
                        </div>

                        {/* Dual Cards: Advanced Pick (Lvl 2) and Expert Pick (Lvl 3) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          {/* Advanced Recommended */}
                          {(() => {
                            const advSubObj = offSkill?.subskills.advanced.find(
                              (s) => normalize(s.name) === normalize(choice.advancedSubskill)
                            );
                            return (
                              <div className={`rounded-lg p-3 space-y-1.5 relative border ${
                                themeMode === 'light'
                                  ? 'bg-purple-50/70 border-purple-200'
                                  : `bg-black/40 border ${theme.borderSubtle}`
                              }`}>
                                <div className="flex items-center justify-between gap-1">
                                  <span className={`text-[10px] font-mono font-bold uppercase flex items-center gap-1 ${
                                    themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                                  }`}>
                                    <Target className="w-3 h-3" />
                                    Nivel 2 • Avanzado
                                  </span>
                                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                                    themeMode === 'light'
                                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                                      : 'bg-yellow-950/90 text-yellow-300 border-yellow-600/70'
                                  }`}>
                                    <Check className="w-2.5 h-2.5" /> Recomendada
                                  </span>
                                </div>

                                <div className={`text-xs font-bold ${
                                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                                }`}>
                                  {choice.advancedSubskill}
                                </div>

                                {advSubObj && (
                                  <p className={`text-[11px] leading-snug ${
                                    themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                                  }`}>
                                    {advSubObj.effect}
                                  </p>
                                )}

                                <div className={`text-[10px] p-2 rounded border leading-relaxed ${
                                  themeMode === 'light'
                                    ? 'bg-amber-100/70 text-amber-950 border-amber-300'
                                    : 'bg-yellow-950/30 text-yellow-200/90 border-yellow-800/40'
                                }`}>
                                  <strong className={`font-mono block mb-0.5 ${
                                    themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                                  }`}>💡 Sinergia Táctica:</strong>
                                  {choice.advancedReason}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Expert Recommended */}
                          {choice.expertSubskill ? (
                            (() => {
                              const expSubObj = offSkill?.subskills.expert.find(
                                (s) => normalize(s.name) === normalize(choice.expertSubskill || '')
                              );
                              return (
                                <div className={`rounded-lg p-3 space-y-1.5 relative border ${
                                  themeMode === 'light'
                                    ? 'bg-amber-50/80 border-amber-300'
                                    : 'bg-yellow-950/20 border-yellow-700/60'
                                }`}>
                                  <div className="flex items-center justify-between gap-1">
                                    <span className={`text-[10px] font-mono font-bold uppercase flex items-center gap-1 ${
                                      themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                                    }`}>
                                      <Award className="w-3 h-3 text-amber-600 dark:text-yellow-400" />
                                      Nivel 3 • Experto
                                    </span>
                                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                                      themeMode === 'light'
                                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                                        : 'bg-yellow-950/90 text-yellow-300 border-yellow-600/70'
                                    }`}>
                                      <Check className="w-2.5 h-2.5" /> Recomendada
                                    </span>
                                  </div>

                                  <div className={`text-xs font-bold ${
                                    themeMode === 'light' ? 'text-slate-900' : 'text-yellow-100'
                                  }`}>
                                    {choice.expertSubskill}
                                  </div>

                                  {expSubObj && (
                                    <p className={`text-[11px] leading-snug ${
                                      themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                                    }`}>
                                      {expSubObj.effect}
                                    </p>
                                  )}

                                  {choice.expertReason && (
                                    <div className={`text-[10px] p-2 rounded border leading-relaxed ${
                                      themeMode === 'light'
                                        ? 'bg-amber-100/70 text-amber-950 border-amber-300'
                                        : 'bg-yellow-950/30 text-yellow-200/90 border-yellow-800/40'
                                    }`}>
                                      <strong className={`font-mono block mb-0.5 ${
                                        themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                                      }`}>💡 Sinergia Táctica:</strong>
                                      {choice.expertReason}
                                    </div>
                                  )}
                                </div>
                              );
                            })()
                          ) : (
                            <div className={`border rounded-lg p-3 flex items-center justify-center text-center ${
                              themeMode === 'light'
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-black/30 border-slate-800'
                            }`}>
                              <span className={`text-[11px] font-mono italic ${
                                themeMode === 'light' ? 'text-slate-500' : 'text-slate-500'
                              }`}>
                                Se mantiene en nivel Avanzado según el build
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dedicated Official Subclasses Section for Selected Hero */}
            {(() => {
              const isMage = selectedHero.heroType === 'Mago';

              const matchedSubclasses = OFFICIAL_SUBCLASSES.filter(
                (s) => s.faction === selectedFaction && (isMage ? s.classType === 'Mago' : s.classType === 'Guerrero')
              );
              const relevantSubclasses = matchedSubclasses.length > 0
                ? matchedSubclasses
                : OFFICIAL_SUBCLASSES.filter((s) => s.faction === selectedFaction);

              return (
                <div className={`border-2 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl ${theme.shadowAccent} transition-colors ${
                  themeMode === 'light'
                    ? 'bg-white border-slate-200 shadow-md'
                    : `bg-gradient-to-br from-black/90 via-black/70 to-black/90 ${theme.border}`
                }`}>
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
                    themeMode === 'light' ? 'border-slate-200' : theme.borderSubtle
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shadow-md ${
                        themeMode === 'light'
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : `${theme.bgBadge} border ${theme.borderSubtle} ${theme.textAccent}`
                      }`}>
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className={`text-sm sm:text-base font-bold font-serif flex items-center gap-2 ${
                          themeMode === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>
                          Rutas Oficiales de Subclase (Clase de Prestigio)
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            themeMode === 'light'
                              ? 'bg-purple-100 text-purple-900 border-purple-200'
                              : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                          }`}>
                            {selectedHero.heroClass}
                          </span>
                        </h4>
                        <p className={`text-[11px] font-sans ${
                          themeMode === 'light' ? 'text-slate-600' : theme.textAccent
                        }`}>
                          Desbloqueo automático al llevar a <strong>Experto</strong> las 5 habilidades requeridas (Nivel 16-20+)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relevantSubclasses.map((sub) => {
                      // Check how many of the 5 required skills are in the hero's ideal build
                      const heroSkillsClean = selectedHero.idealSkillBuild.map((s) =>
                        s.replace(/\s*\((Experta|Avanzada|Básica)\)/, '').trim().toLowerCase()
                      );

                      const matchingCount = sub.requiredSkills.filter((req) =>
                        heroSkillsClean.some((hs) => hs.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(hs))
                      ).length;

                      const isPrimaryRecommendation = matchingCount >= 3;

                      return (
                        <div
                          key={sub.id}
                          className={`rounded-xl p-4 space-y-3 border transition-all ${
                            isPrimaryRecommendation
                              ? themeMode === 'light'
                                ? 'bg-amber-50/80 border-2 border-amber-300 shadow-sm ring-1 ring-amber-300'
                                : `bg-black/70 ${theme.border} shadow-md ring-1 ring-current`
                              : themeMode === 'light'
                              ? 'bg-slate-50 border-slate-200'
                              : `bg-black/50 ${theme.borderSubtle} opacity-90`
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-xs sm:text-sm font-bold font-serif ${
                                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                                }`}>
                                  {sub.name}
                                </span>
                                <span className={`text-[10px] font-mono ${
                                  themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                                }`}>
                                  ({sub.nameEn})
                                </span>
                              </div>
                              <span className={`text-[10px] font-mono font-bold block mt-0.5 ${
                                themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
                              }`}>
                                ★ {sub.bonusTitle}
                              </span>
                            </div>

                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                                isPrimaryRecommendation
                                  ? themeMode === 'light'
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : 'bg-yellow-950 text-yellow-300 border-yellow-600'
                                  : themeMode === 'light'
                                  ? 'bg-slate-200 text-slate-700 border-slate-300'
                                  : 'bg-slate-900 text-slate-400 border-slate-700'
                              }`}
                            >
                              {isPrimaryRecommendation ? '⭐ Ruta Recomendada' : 'Ruta Alternativa'}
                            </span>
                          </div>

                          <p className={`text-[11px] leading-snug ${
                            themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {sub.bonusEffect}
                          </p>

                          {/* 5 Skills Progress Tracker */}
                          <div className={`space-y-1.5 pt-1 border-t ${
                            themeMode === 'light' ? 'border-slate-200' : theme.borderSubtle
                          }`}>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className={`font-bold uppercase ${
                                themeMode === 'light' ? 'text-slate-700' : theme.textAccent
                              }`}>5 Habilidades Requeridas a Experto:</span>
                              <span className={`font-bold ${
                                matchingCount >= 4
                                  ? themeMode === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                                  : themeMode === 'light' ? 'text-amber-800' : 'text-yellow-400'
                              }`}>
                                {matchingCount}/5 en la Build
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-1">
                              {sub.requiredSkills.map((req, rIdx) => {
                                const isPresent = heroSkillsClean.some(
                                  (hs) => hs.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(hs)
                                );
                                return (
                                  <div
                                    key={rIdx}
                                    className={`text-[10px] font-mono px-2 py-1 rounded flex items-center justify-between border ${
                                      isPresent
                                        ? themeMode === 'light'
                                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                                          : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                                        : themeMode === 'light'
                                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                                        : 'bg-black/40 text-slate-400 border-slate-800'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5 truncate">
                                      <span className={`w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center shrink-0 font-bold ${
                                        themeMode === 'light'
                                          ? 'bg-purple-200 text-purple-900'
                                          : `${theme.bgBadge} text-yellow-300`
                                      }`}>
                                        {rIdx + 1}
                                      </span>
                                      <span className="truncate">{req.name} ({req.nameEn})</span>
                                    </div>
                                    <span className="text-[9px] shrink-0 font-semibold">
                                      {isPresent ? '✓ Incluida' : 'Opcional'}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Synergies with Laws and Guild Spells */}
            <div className={`rounded-xl p-3.5 text-xs leading-relaxed border ${
              themeMode === 'light'
                ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                : `bg-black/40 border ${theme.borderSubtle} text-slate-300`
            }`}>
              <strong className={`font-mono block mb-1 ${
                themeMode === 'light' ? 'text-amber-900 font-bold' : 'text-yellow-400'
              }`}>
                ⚡ Sinergia de Leyes & Hechizos Neutrales de Cofradía:
              </strong>
              {selectedHero.synergyCombo}
            </div>
          </div>

          {/* Modal / Popup for Inspected Official Skill & Subskills */}
          {inspectedSkill && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className={`border-2 rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh] ${theme.shadowAccent} ${
                themeMode === 'light'
                  ? 'bg-white border-slate-300 text-slate-900'
                  : `bg-[#12111b] border-2 ${theme.border} text-white`
              }`}>
                <div className={`flex items-center justify-between border-b pb-3 ${
                  themeMode === 'light' ? 'border-slate-200' : theme.borderSubtle
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                      themeMode === 'light'
                        ? 'bg-purple-100 text-purple-900 border-purple-300'
                        : `${theme.bgBadge} border ${theme.borderSubtle} ${theme.textAccent}`
                    }`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {inspectedSkill.name}
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          themeMode === 'light'
                            ? 'bg-purple-100 text-purple-900 border-purple-300'
                            : `${theme.bgBadge} ${theme.textAccent} ${theme.borderSubtle}`
                        }`}>
                          {inspectedSkill.category} {inspectedSkill.faction ? `• ${inspectedSkill.faction}` : ''}
                        </span>
                      </h3>
                      <span className={`text-[11px] font-mono ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        Base de Datos Oficial • Heroes of Might & Magic: Olden Era
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setInspectedSkill(null)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      themeMode === 'light'
                        ? 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
                        : `bg-black/60 border ${theme.borderSubtle} text-slate-400 hover:text-white hover:border-slate-500`
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Selection Guide in Modal */}
                {inspectedSkill.selectionGuide && (
                  <div className={`p-3.5 rounded-xl space-y-2 text-xs border ${
                    themeMode === 'light'
                      ? 'bg-amber-50/80 border-amber-300'
                      : 'bg-gradient-to-r from-amber-950/40 to-black/40 border-yellow-600/50'
                  }`}>
                    <div className={`flex items-center gap-1.5 font-bold font-mono ${
                      themeMode === 'light' ? 'text-amber-950' : 'text-yellow-300'
                    }`}>
                      <Star className="w-3.5 h-3.5 fill-current text-current" />
                      Guía Táctica de Selección Recomendada
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className={`p-2 rounded border ${
                        themeMode === 'light'
                          ? 'bg-white border-amber-200'
                          : `bg-black/50 ${theme.borderSubtle}`
                      }`}>
                        <span className={`font-bold block mb-0.5 ${
                          themeMode === 'light' ? 'text-purple-900' : 'text-yellow-400'
                        }`}>
                          ★ Avanzado: {inspectedSkill.selectionGuide.advanced.recommendedName}
                        </span>
                        <p className={themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                          {inspectedSkill.selectionGuide.advanced.why}
                        </p>
                      </div>
                      <div className={`p-2 rounded border ${
                        themeMode === 'light'
                          ? 'bg-white border-amber-200'
                          : 'bg-black/50 border-yellow-900/60'
                      }`}>
                        <span className={`font-bold block mb-0.5 ${
                          themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
                        }`}>
                          ★ Experto: {inspectedSkill.selectionGuide.expert.recommendedName}
                        </span>
                        <p className={themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                          {inspectedSkill.selectionGuide.expert.why}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mastery Levels */}
                <div className="space-y-2">
                  <span className={`text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                  }`}>
                    <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" />
                    Niveles de Maestría
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className={`p-2.5 rounded-lg border ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200'
                        : `bg-black/50 border ${theme.borderSubtle}`
                    }`}>
                      <span className={`text-[10px] font-mono font-bold block mb-0.5 ${
                        themeMode === 'light' ? 'text-purple-800' : theme.textAccent
                      }`}>Básico</span>
                      <p className={`text-[11px] ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                        {inspectedSkill.upgrades.basic}
                      </p>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${
                      themeMode === 'light'
                        ? 'bg-slate-50 border-slate-200'
                        : `bg-black/50 border ${theme.borderSubtle}`
                    }`}>
                      <span className={`text-[10px] font-mono font-bold block mb-0.5 ${
                        themeMode === 'light' ? 'text-purple-800' : theme.textAccent
                      }`}>Avanzado</span>
                      <p className={`text-[11px] ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                        {inspectedSkill.upgrades.advanced}
                      </p>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${
                      themeMode === 'light'
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-black/50 border-yellow-900/60'
                    }`}>
                      <span className={`text-[10px] font-mono font-bold block mb-0.5 ${
                        themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                      }`}>Experto</span>
                      <p className={`text-[11px] ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                        {inspectedSkill.upgrades.expert}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advanced Subskills */}
                <div className="space-y-2">
                  <span className={`text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'text-purple-900' : theme.textAccent
                  }`}>
                    <Target className="w-3.5 h-3.5" />
                    Subhabilidades de Nivel Avanzado (Selecciona 1 de 3 en Nivel 2)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {inspectedSkill.subskills.advanced.map((sub, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg space-y-1 border ${
                          sub.isRecommendedMeta
                            ? themeMode === 'light'
                              ? 'bg-purple-50 border-2 border-purple-300'
                              : 'bg-yellow-950/30 border-2 border-yellow-500/80'
                            : themeMode === 'light'
                            ? 'bg-slate-50 border-slate-200'
                            : `bg-black/60 border ${theme.borderSubtle}`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-3.5 h-3.5 rounded-full text-[8px] font-mono flex items-center justify-center border ${
                              themeMode === 'light'
                                ? 'bg-purple-100 text-purple-900 border-purple-300'
                                : `${theme.bgBadge} ${theme.textAccent} border ${theme.borderSubtle}`
                            }`}>
                              A{idx + 1}
                            </span>
                            <span className={`text-xs font-bold ${
                              themeMode === 'light' ? 'text-slate-900' : 'text-white'
                            }`}>{sub.name}</span>
                          </div>
                          {sub.isRecommendedMeta && (
                            <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                              themeMode === 'light'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-yellow-950 text-yellow-300 border border-yellow-600'
                            }`}>
                              ⭐ Recomendada
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] leading-snug ${
                          themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                        }`}>{sub.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Subskills */}
                <div className="space-y-2">
                  <span className={`text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${
                    themeMode === 'light' ? 'text-amber-900' : 'text-yellow-300'
                  }`}>
                    <Award className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" />
                    Subhabilidades de Nivel Experto (Selecciona 1 de 3 en Nivel 3)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {inspectedSkill.subskills.expert.map((sub, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg space-y-1 border ${
                          sub.isRecommendedMeta
                            ? themeMode === 'light'
                              ? 'bg-amber-50 border-2 border-amber-300'
                              : 'bg-yellow-950/30 border-2 border-yellow-500/80'
                            : themeMode === 'light'
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-[#1b1722] border border-yellow-900/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-3.5 h-3.5 rounded-full text-[8px] font-mono flex items-center justify-center border ${
                              themeMode === 'light'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-yellow-950 text-yellow-200 border-yellow-700'
                            }`}>
                              E{idx + 1}
                            </span>
                            <span className={`text-xs font-bold ${
                              themeMode === 'light' ? 'text-slate-900' : 'text-yellow-100'
                            }`}>{sub.name}</span>
                          </div>
                          {sub.isRecommendedMeta && (
                            <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                              themeMode === 'light'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-yellow-950 text-yellow-300 border border-yellow-600'
                            }`}>
                              ⭐ Recomendada
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] leading-snug ${
                          themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
                        }`}>{sub.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-right pt-2">
                  <button
                    onClick={() => setInspectedSkill(null)}
                    className={`px-4 py-1.5 ${theme.primaryButton} rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer shadow-md`}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Side-by-Side Compare Panel if active */}
          {compareHero && (
            <div className={`border rounded-2xl p-5 shadow-xl space-y-4 ${
              themeMode === 'light'
                ? 'bg-white border-teal-300'
                : 'bg-black/70 border-teal-800/60'
            }`}>
              <div className={`flex items-center justify-between border-b pb-2 ${
                themeMode === 'light' ? 'border-teal-200' : 'border-teal-900/40'
              }`}>
                <div className="flex items-center gap-2">
                  <Scale className={`w-4 h-4 ${themeMode === 'light' ? 'text-teal-600' : 'text-teal-400'}`} />
                  <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    themeMode === 'light' ? 'text-teal-900' : 'text-teal-200'
                  }`}>
                    Comparativa: {selectedHero.name} vs {compareHero.name}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setCompareHeroId(null)}
                  className={`text-xs cursor-pointer font-mono ${
                    themeMode === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Cerrar
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className={`space-y-2 p-3 rounded-lg border ${
                  themeMode === 'light'
                    ? 'bg-purple-50/70 border-purple-200'
                    : `bg-black/40 ${theme.borderSubtle}`
                }`}>
                  <div className={`font-bold font-serif ${
                    themeMode === 'light' ? 'text-purple-950' : theme.textAccent
                  }`}>{selectedHero.name}</div>
                  <div className={`text-[11px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Rol: {selectedHero.role}</div>
                  <div className={`text-[11px] font-mono ${themeMode === 'light' ? 'text-amber-900 font-semibold' : 'text-yellow-400/90'}`}>Esp: {selectedHero.specialtyName}</div>
                  <div className={`text-[11px] ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Poder Mágico: {selectedHero.statGrowth.spellPower}%</div>
                  <div className={`text-[11px] ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Ataque Físico: {selectedHero.statGrowth.attack}%</div>
                </div>

                <div className={`space-y-2 p-3 rounded-lg border ${
                  themeMode === 'light'
                    ? 'bg-teal-50/70 border-teal-200'
                    : 'bg-black/40 border-teal-900/40'
                }`}>
                  <div className={`font-bold font-serif ${
                    themeMode === 'light' ? 'text-teal-950' : 'text-teal-300'
                  }`}>{compareHero.name}</div>
                  <div className={`text-[11px] ${themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Rol: {compareHero.role}</div>
                  <div className={`text-[11px] font-mono ${themeMode === 'light' ? 'text-amber-900 font-semibold' : 'text-yellow-400/90'}`}>Esp: {compareHero.specialtyName}</div>
                  <div className={`text-[11px] ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Poder Mágico: {compareHero.statGrowth.spellPower}%</div>
                  <div className={`text-[11px] ${themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Ataque Físico: {compareHero.statGrowth.attack}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Strategy Guide: Hero Progression Timeline */}
      <div className={`border rounded-2xl p-5 shadow-xl space-y-4 ${
        themeMode === 'light'
          ? 'bg-white border-slate-200 shadow-md'
          : `bg-black/40 border ${theme.border}`
      }`}>
        <div className={`border-b pb-2 flex items-center justify-between ${
          themeMode === 'light' ? 'border-slate-200' : theme.borderSubtle
        }`}>
          <div>
            <h3 className={`text-base font-serif uppercase tracking-wide flex items-center gap-2 font-bold ${
              themeMode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              <TrendingUp className="w-4 h-4 text-amber-500 dark:text-yellow-400" />
              <span>Hitos de Progresión de Héroes (Nivel 1 a 25)</span>
            </h3>
            <p className={`text-xs font-mono mt-0.5 ${
              themeMode === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Ruta óptima de desarrollo durante los 56 días de campaña.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {HERO_SELECTION_GUIDELINES.keyMilestones.map((ms, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl space-y-1.5 border ${
                themeMode === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : `bg-black/50 border ${theme.borderSubtle}`
              }`}
            >
              <div className={`text-xs font-mono font-bold uppercase ${
                themeMode === 'light' ? 'text-amber-900' : 'text-yellow-400'
              }`}>
                {ms.level}
              </div>
              <p className={`text-xs leading-relaxed ${
                themeMode === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {ms.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
