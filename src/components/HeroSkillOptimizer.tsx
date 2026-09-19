import React, { useState } from 'react';
import { RecommendedHeroes } from './RecommendedHeroes';
import { HeroBuildSimulator } from './HeroBuildSimulator';
import { OfficialSkillsBrowser } from './OfficialSkillsBrowser';
import { SubclassesBrowser } from './SubclassesBrowser';
import { useStickyState } from '../utils/useStickyState';
import { Users, Sparkles, BookOpen, Shield, Award, GitBranch } from 'lucide-react';
import { FactionId, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';

interface HeroSkillOptimizerProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
}

export const HeroSkillOptimizer: React.FC<HeroSkillOptimizerProps> = ({ 
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
}) => {
  const [activeSubTab, setActiveSubTab] = useStickyState<'heroes' | 'simulator' | 'subclasses' | 'official-skills'>('heroes', 'active_hero_subtab');
  const [simulatorInitialHero, setSimulatorInitialHero] = useState<string | undefined>(undefined);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  const handleOpenSimulatorForHero = (heroId: string) => {
    setSimulatorInitialHero(heroId);
    setActiveSubTab('simulator');
  };

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
            <span>Ficha de Comandantes ({meta.name})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('simulator')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all cursor-pointer ${
              activeSubTab === 'simulator'
                ? `${theme.primaryButton} shadow-md`
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <GitBranch className="w-4 h-4 text-amber-400" />
            <span>Simulador de Build (1-20)</span>
            <span className="bg-amber-950/90 text-amber-300 border border-amber-600/80 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase animate-pulse">
              Nuevo
            </span>
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
        <RecommendedHeroes 
          selectedFaction={selectedFaction} 
          themeMode={themeMode} 
          onOpenSimulator={handleOpenSimulatorForHero}
        />
      </div>
      <div className={activeSubTab === 'simulator' ? 'block' : 'hidden'}>
        <HeroBuildSimulator 
          selectedFaction={selectedFaction} 
          themeMode={themeMode} 
          initialHeroId={simulatorInitialHero} 
        />
      </div>
      <div className={activeSubTab === 'subclasses' ? 'block' : 'hidden'}>
        <SubclassesBrowser selectedFaction={selectedFaction} themeMode={themeMode} />
      </div>
      <div className={activeSubTab === 'official-skills' ? 'block' : 'hidden'}>
        <OfficialSkillsBrowser themeMode={themeMode} />
      </div>
    </div>
  );
};

