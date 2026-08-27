import React from 'react';
import { RecommendedHeroes } from './RecommendedHeroes';
import { OfficialSkillsBrowser } from './OfficialSkillsBrowser';
import { SubclassesBrowser } from './SubclassesBrowser';
import { useStickyState } from '../utils/useStickyState';
import { Users, Sparkles, BookOpen, Shield, Award } from 'lucide-react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';

interface HeroSkillOptimizerProps {
  selectedFaction?: FactionId;
}

export const HeroSkillOptimizer: React.FC<HeroSkillOptimizerProps> = ({ selectedFaction = 'Mazmorra' }) => {
  const [activeSubTab, setActiveSubTab] = useStickyState<'heroes' | 'official-skills' | 'subclasses'>('heroes', 'active_hero_subtab');
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction);

  return (
    <div className="space-y-6">
      {/* Sub-tab navigation */}
      <div className={`flex flex-wrap items-center justify-between gap-3 bg-[#110f14] border ${theme.borderSubtle} p-2 rounded-2xl shadow-lg transition-colors duration-300`}>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveSubTab('heroes')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all cursor-pointer ${
              activeSubTab === 'heroes'
                ? `${theme.primaryButton} shadow-md`
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Users className={`w-4 h-4 ${theme.textAccent}`} />
            <span>Comandantes ({meta.name})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('subclasses')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all cursor-pointer ${
              activeSubTab === 'subclasses'
                ? `${theme.primaryButton} shadow-md`
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Subclases & Clases de Prestigio</span>
            <span className="bg-yellow-950/90 text-yellow-300 border border-yellow-700/80 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">
              5 a Experto
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('official-skills')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all cursor-pointer ${
              activeSubTab === 'official-skills'
                ? `${theme.primaryButton} shadow-md`
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span>Árbol Oficial de Habilidades (30/180)</span>
            <span className="bg-yellow-950/80 text-yellow-300 border border-yellow-700/60 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">
              Canónico
            </span>
          </button>
        </div>

        <div className={`text-[11px] font-mono ${theme.textAccent} hidden lg:block pr-2`}>
          Heroes of Might and Magic: Olden Era
        </div>
      </div>

      {/* Active Sub-Tab View (Persisted in DOM) */}
      <div className={activeSubTab === 'heroes' ? 'block' : 'hidden'}>
        <RecommendedHeroes selectedFaction={selectedFaction} />
      </div>
      <div className={activeSubTab === 'subclasses' ? 'block' : 'hidden'}>
        <SubclassesBrowser selectedFaction={selectedFaction} />
      </div>
      <div className={activeSubTab === 'official-skills' ? 'block' : 'hidden'}>
        <OfficialSkillsBrowser />
      </div>
    </div>
  );
};
