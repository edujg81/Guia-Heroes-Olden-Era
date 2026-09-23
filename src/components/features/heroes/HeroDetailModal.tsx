import React, { useState, useMemo } from 'react';
import type { HeroWithExtras, HeroSubskillChoice, SubclassInfo } from '../../../types';
import type { ApiSkill } from '../../../types-api';
import { TierBadge } from '../../ui/TierBadge';
import { ResolvedText } from '../../ui/ResolvedText';
import {
  X,
  Swords,
  Wand2,
  Shield,
  BookOpen,
  Sparkles,
  Zap,
  Target,
  Clock,
  Compass,
  CheckCircle2,
  ArrowRightLeft,
  Flame,
  Award,
  GitBranch,
  RotateCcw,
  Copy,
  Check,
  Star,
  Users,
  Flame as FlameIcon,
  Award as AwardIcon,
} from 'lucide-react';
//import { getHeroPortrait } from '../../../data/heroAssetsData';
import { HeroImage } from '../../ui/HeroImage';
import { OFFICIAL_SKILLS_DATA } from '../../../data/officialSkillsData';
import { OFFICIAL_SUBCLASSES } from '../../../data/subclassesData';
import { HERO_SUBSKILL_CHOICES } from '../../../data/subskillsRecommendationData';
import { useStickyState } from '../../../utils/useStickyState';
import { HeroBuildSimulator } from '../../HeroBuildSimulator';
import type { FactionId } from '../../../data/factionDataProvider';

interface HeroDetailModalProps {
  hero: HeroWithExtras | null;
  onClose: () => void;
  onCompare?: (hero: HeroWithExtras) => void;
  themeMode?: 'dark' | 'light';
  themeAccentClass?: string;
}

const normalize = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const findOfficialSkill = (skillStr: string): ApiSkill | undefined => {
  const clean = normalize(skillStr.replace(/\s*\((Experta|Avanzada|Básica)\)/, ''));
  return OFFICIAL_SKILLS_DATA.find((s) => {
    const sNorm = normalize(s.name);
    return sNorm === clean || clean.includes(sNorm) || sNorm.includes(clean);
  });
};

const getSubskillChoicesForHero = (hero: HeroWithExtras): HeroSubskillChoice[] => {
  if (HERO_SUBSKILL_CHOICES[hero.id]) {
    return HERO_SUBSKILL_CHOICES[hero.id];
  }
  // Dynamic fallback using hero's idealSkillBuild
  return hero.idealSkillBuild.map((skillStr) => {
    const clean = skillStr.replace(/\s*\((Experta|Avanzada|Básica)\)/, '').trim();
    const offSkill = findOfficialSkill(clean);
    const skillId = offSkill?.id || clean.toLowerCase().replace(/\s+/g, '-');

    // Simple fallback - use first subskills if no guide available
    const advSub = offSkill?.level2.subSkillChoices[0] || { name: 'Subhabilidad Avanzada' };
    const expSub = offSkill?.level3.subSkillChoices[0] || { name: 'Subhabilidad Experta' };

    return {
      skillName: skillStr,
      advancedSubskill: advSub.name,
      advancedReason: 'Optimiza el rendimiento del héroe en combate.',
      expertSubskill: expSub.name,
      expertReason: 'Proporciona la ventaja definitiva en combate tardío.',
    };
  });
};

export const HeroDetailModal: React.FC<HeroDetailModalProps> = ({
  hero,
  onClose,
  onCompare,
  themeMode = 'dark',
  themeAccentClass = 'text-amber-400',
}) => {
  if (!hero) return null;

  const isMage = hero.classType === 'magic';
  const [activeTab, setActiveTab] = useStickyState<'overview' | 'skills' | 'tactics' | 'subclasses' | 'simulator'>('overview', `hero_detail_tab_${hero.id}`);
  const [inspectedSkill, setInspectedSkill] = useState<ApiSkill | null>(null);
  const [showSubskillsDetails, setShowSubskillsDetails] = useStickyState<boolean>(true, 'hero_show_subskills_details');

  // Calculate subclasses progress for this hero's faction and class
  const factionSubclasses = useMemo(() => {
    const list = OFFICIAL_SUBCLASSES.filter(
      (sc) => sc.faction === hero.faction && sc.classType === (isMage ? 'Magia' : 'Poder')
    );
    return list.map((sc) => {
      // Check each required skill
      const reqStatus = sc.requiredSkills.map((req) => {
        const offSkill = findOfficialSkill(req.name);
        const alloc = offSkill ? { tier: 'expert' } : undefined; // Simplified - in reality would check hero's ideal build
        const isExpert = alloc?.tier === 'expert';
        const currentTier = alloc?.tier || 'none';
        return {
          reqName: req.name,
          offSkillId: offSkill?.id,
          isExpert,
          currentTier,
        };
      });

      const expertCount = reqStatus.filter((r) => r.isExpert).length;
      const isUnlocked = expertCount >= 5;

      return {
        ...sc,
        reqStatus,
        expertCount,
        isUnlocked,
      };
    });
  }, [hero.faction, isMage]);

  // Get skill recommendations for this hero
  const skillRecommendations = useMemo(() => {
    return getSubskillChoicesForHero(hero);
  }, [hero.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl transition-all ${
          themeMode === 'light'
            ? 'bg-white border-slate-300 text-slate-900'
            : 'bg-slate-950 border-slate-800 text-slate-100'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-28 shrink-0">
            <HeroImage
              heroId={hero.id}
              heroName={hero.name}
              faction={hero.faction}
              iconPath={hero.iconPath}
              alt={`Retrato de ${hero.name}`}
              size="xl"
              className="rounded-2xl border-2 border-slate-700 shadow-xl bg-slate-800"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-serif font-bold text-white">{hero.name}</h2>
              <span className="text-sm font-mono text-slate-400">({hero.classDisplay})</span>
              <TierBadge tier={hero.tierRank} size="sm" className="max-w-full whitespace-normal text-center" />
            </div>

            <p className="mt-1 text-[16px] leading-snug break-words text-slate-400 font-mono">
              {hero.title}
            </p>

            <div className="flex items-center gap-2 mb-1 text-sm font-mono text-slate-400">
              {hero.classType === 'magic' ? 'Magia' : 'Poder'}
            </div>

            <div className="grid grid-cols-8 gap-1.5 mt-3">
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/offence.png" alt="ATQ" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.attack}</div>
                <div className="text-[10px] text-slate-500">{hero.statGrowth.attack > 0 ? `+${hero.statGrowth.attack}` : ''}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/defence.png" alt="DEF" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.defence}</div>
                <div className="text-[10px] text-slate-500">{hero.statGrowth.defense > 0 ? `+${hero.statGrowth.defense}` : ''}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/spellpower.png" alt="PODER" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.spellPower}</div>
                <div className="text-[10px] text-slate-500">{hero.statGrowth.spellPower > 0 ? `+${hero.statGrowth.spellPower}` : ''}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/intelligence.png" alt="CONOC" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.knowledge}</div>
                <div className="text-[10px] text-slate-500">{hero.statGrowth.knowledge > 0 ? `+${hero.statGrowth.knowledge}` : ''}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-slate-700/50">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === 'overview'
                  ? `bg-slate-800/50 text-slate-200 border-b-2 border-amber-400`
                  : 'hover:bg-slate-700/50 text-slate-400'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" /> Ficha
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === 'skills'
                  ? `bg-slate-800/50 text-slate-200 border-b-2 border-amber-400`
                  : 'hover:bg-slate-700/50 text-slate-400'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Habilidades
            </button>
            <button
              onClick={() => setActiveTab('tactics')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === 'tactics'
                  ? `bg-slate-800/50 text-slate-200 border-b-2 border-amber-400`
                  : 'hover:bg-slate-700/50 text-slate-400'
              }`}
            >
              <Target className="w-4 h-4 mr-2" /> Tácticas
            </button>
            <button
              onClick={() => setActiveTab('subclasses')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === 'subclasses'
                  ? `bg-slate-800/50 text-slate-200 border-b-2 border-amber-400`
                  : 'hover:bg-slate-700/50 text-slate-400'
              }`}
            >
              <Award className="w-4 h-4 mr-2" /> Subclases
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === 'simulator'
                  ? `bg-slate-800/50 text-slate-200 border-b-2 border-amber-400`
                  : 'hover:bg-slate-700/50 text-slate-400'
              }`}
            >
              <GitBranch className="w-4 h-4 mr-2" /> Simulador
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab hero={hero} onCompare={onCompare} themeMode={themeMode} themeAccentClass={themeAccentClass} />
        )}
        {activeTab === 'skills' && (
          <SkillsTab hero={hero} skillRecommendations={skillRecommendations} inspectedSkill={inspectedSkill} setInspectedSkill={setInspectedSkill} showSubskillsDetails={showSubskillsDetails} setShowSubskillsDetails={setShowSubskillsDetails} themeMode={themeMode} themeAccentClass={themeAccentClass} />
        )}
        {activeTab === 'tactics' && (
          <TacticsTab hero={hero} themeMode={themeMode} themeAccentClass={themeAccentClass} />
        )}
        {activeTab === 'subclasses' && (
          <SubclassesTab hero={hero} factionSubclasses={factionSubclasses} themeMode={themeMode} themeAccentClass={themeAccentClass} />
        )}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="w-4 h-4" />
              <h3 className="text-lg font-semibold font-serif">Simulador de Build para {hero.name}</h3>
            </div>
            
            <HeroBuildSimulator
              selectedFaction={hero.faction as FactionId}
              themeMode={themeMode}
              initialHeroId={hero.id}
            />
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          {onCompare && activeTab === 'overview' ? (
            <button
              onClick={() => {
                onCompare(hero);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg shadow-amber-600/20"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Comparar en Pantalla Dividida</span>
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{
  hero: HeroWithExtras;
  onCompare?: (hero: HeroWithExtras) => void;
  themeMode?: 'dark' | 'light';
  themeAccentClass?: string;
}> = ({ hero, onCompare, themeMode, themeAccentClass }) => {
  const isMage = hero.classType === 'magic';

  return (
    <div className="space-y-6">
      {/* 2-Column Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Specialty Box */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-3 text-sm font-bold text-amber-400 mb-2">
            {hero.specializationIcon ? (
              <img src={`/src/assets/${hero.specializationIcon}`} alt="Especialidad" className="w-6 h-6 rounded-md object-cover" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Especialidad: {hero.specializationName}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed"><ResolvedText text={hero.specializationDescription} /></p>
        </div>

        {/* Starting Army Box */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
            <Shield className="w-4 h-4 text-rose-400" />
            <span>Ejército Inicial</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hero.startingArmy?.map((unit, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px]">
                {unit.icon ? (
                  <img src={`/src/assets/${unit.icon}`} alt={unit.unitName} className="w-4 h-4 rounded-sm object-cover" />
                ) : null}
                <span>{unit.unitName} ({unit.countInterval})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Starting Skills & Starting Spells */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Habilidades & Hechizos Iniciales</span>
          </div>
          <div className="space-y-2">
            {hero.startingSkills && hero.startingSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {hero.startingSkills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px]">
                    {skill.icon ? (
                      <img src={`/src/assets/${skill.icon}`} alt={skill.skillName} className="w-4 h-4 rounded-sm object-cover" />
                    ) : null}
                    <span>{skill.skillName}</span>
                  </span>
                ))}
              </div>
            )}
            {hero.startingSpells && hero.startingSpells.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {hero.startingSpells.map((spell, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px]">
                    {spell.icon ? (
                      <img src={`/src/assets/${spell.icon}`} alt={spell.spellName} className="w-4 h-4 rounded-sm object-cover" />
                    ) : null}
                    <span>{spell.spellName}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Biography - full row */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Biografía</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed"><ResolvedText text={hero.description} /></p>
        </div>

        {/* Motto - full row */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Lema</span>
          </div>
          <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{hero.motto}&rdquo;</p>
        </div>

        {/* Recommendation & Role - shared row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Recomendación de Inicio</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{hero.recommendedStartingTier}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span>Rol Competitivo</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{hero.role}</p>
          </div>
        </div>
      </div>


    </div>
  );
};

// Skills Tab Component
const SkillsTab: React.FC<{
  hero: HeroWithExtras;
  skillRecommendations: HeroSubskillChoice[];
  inspectedSkill: ApiSkill | null;
  setInspectedSkill: (skill: ApiSkill | null) => void;
  showSubskillsDetails: boolean;
  setShowSubskillsDetails: (show: boolean) => void;
  themeMode?: 'dark' | 'light';
  themeAccentClass?: string;
}> = ({ hero, skillRecommendations, inspectedSkill, setInspectedSkill, showSubskillsDetails, setShowSubskillsDetails, themeMode, themeAccentClass }) => {
  return (
    <div className="space-y-6">
      {/* Skill Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-lg font-semibold font-serif">{hero.name}'s Skill Build Recommendations</h3>
        </div>
        
        {skillRecommendations.map((rec, index) => (
          <div key={index} className="border rounded-xl p-4 mb-4 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-full text-slate-400">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <h4 className="font-semibold text-slate-200">{rec.skillName}</h4>
                  <p className="text-xs text-slate-400">{rec.advancedReason}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="font-mono text-sm">Avanzada:</span>
                    </div>
                    <button
                      onClick={() => {
                        const skill = findOfficialSkill(rec.skillName);
                        if (skill) setInspectedSkill(skill);
                      }}
                      className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                        showSubskillsDetails
                          ? 'bg-slate-800/50 text-slate-200'
                          : 'hover:bg-slate-700/50 text-slate-400'
                      }`}
                    >
                      Ver Subskills
                    </button>
                    <span className="text-sm font-mono">{rec.advancedSubskill}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="font-mono text-sm">Experta:</span>
                    </div>
                    <button
                      onClick={() => {
                        const skill = findOfficialSkill(rec.skillName);
                        if (skill) setInspectedSkill(skill);
                      }}
                      className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                        showSubskillsDetails
                          ? 'bg-slate-800/50 text-slate-200'
                          : 'hover:bg-slate-700/50 text-slate-400'
                      }`}
                    >
                      Ver Subskills
                    </button>
                    <span className="text-sm font-mono">{rec.expertSubskill}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subskill Details Modal */}
      {inspectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl bg-slate-950 text-slate-100">
            <button
              onClick={() => setInspectedSkill(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5" />
                <h2 className="text-xl font-serif font-bold">{inspectedSkill.name}</h2>
              </div>
              
              <div className="space-y-3">
                <div className="border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-slate-200">Básica</span>
                  </div>
                  <p className="text-slate-300">{inspectedSkill.level1.levelName}</p>
                </div>
                
                <div className="border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-slate-200">Avanzada</span>
                  </div>
                  <p className="text-slate-300">{inspectedSkill.level2.levelName}</p>
                  {showSubskillsDetails && inspectedSkill.level2.subSkillChoices.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 mb-1 text-xs font-mono">
                        <Sparkles className="w-3 h-3" />
                        <span>Subskills Avanzadas:</span>
                      </div>
                      {inspectedSkill.level2.subSkillChoices.map((sub, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-slate-300">{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold text-slate-200">Experta</span>
                  </div>
                  <p className="text-slate-300">{inspectedSkill.level3.levelName}</p>
                  {showSubskillsDetails && inspectedSkill.level3.subSkillChoices.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 mb-1 text-xs font-mono">
                        <Award className="w-3 h-3 text-yellow-400" />
                        <span>Subskills Expertas:</span>
                      </div>
                      {inspectedSkill.level3.subSkillChoices.map((sub, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-slate-300">{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowSubskillsDetails(!showSubskillsDetails)}
                className="px-3 py-1 rounded text-xs font-mono transition-all hover:bg-slate-700/50"
              >
                {showSubskillsDetails ? 'Ocultar Subskills' : 'Mostrar Subskills'}
              </button>
              <button
                onClick={() => setInspectedSkill(null)}
                className="ml-3 px-3 py-1 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tactics Tab Component
const TacticsTab: React.FC<{
  hero: HeroWithExtras;
  themeMode?: 'dark' | 'light';
  themeAccentClass?: string;
}> = ({ hero, themeMode, themeAccentClass }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4" />
          <h3 className="text-lg font-semibold font-serif">Análisis Táctico de {hero.name}</h3>
        </div>
        
        <div className="border rounded-xl p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">Sinergia de Facción</span>
            </div>
            <p className="text-slate-300">{hero.synergyCombo}</p>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-slate-200">Apertura Día 1</span>
          </div>
          {hero.day1Action ? (
            <p className="text-slate-300">{hero.day1Action}</p>
          ) : (
            <p className="text-slate-400 italic">No tiene una acción específica de apertura definida.</p>
          )}
          
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-rose-400" />
            <span className="font-semibold text-slate-200">Estilo de Juego</span>
          </div>
          <p className="text-slate-300">{hero.tacticalPlaystyle}</p>
          
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-slate-200">Build Recomendada</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {hero.idealSkillBuild?.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Subclasses Tab Component
const SubclassesTab: React.FC<{
  hero: HeroWithExtras;
  factionSubclasses: any[];
  themeMode?: 'dark' | 'light';
  themeAccentClass?: string;
}> = ({ hero, factionSubclasses, themeMode, themeAccentClass }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4" />
          <h3 className="text-lg font-semibold font-serif">Progresión de Subclases para {hero.name}</h3>
        </div>
        
        {factionSubclasses.length > 0 ? (
          <div className="space-y-4">
            {factionSubclasses.map((subclass, index) => (
              <div key={subclass.id} className="border rounded-xl p-4 mb-4 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-full text-slate-400">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-200">{subclass.name}</h4>
                      <p className="text-xs text-slate-400">{subclass.bonusTitle}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3" />
                          <span className="font-mono text-sm">Requisitos:</span>
                        </div>
                        <span className="text-sm font-mono">{subclass.expertCount}/5 habilidades a Experto</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {subclass.isUnlocked ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <X className="w-3 h-3 text-rose-400" />
                          )}
                          <span className="font-mono text-sm">Estado:</span>
                        </div>
                        <span className={`font-mono text-sm font-bold ${
                          subclass.isUnlocked ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {subclass.isUnlocked ? 'Desbloqueada' : 'Bloqueada'}
                        </span>
                      </div>
                    </div>
                    {!subclass.isUnlocked && subclass.reqStatus.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 mb-1 text-xs font-mono">
                          <BookOpen className="w-3 h-3" />
                          <span>Detalles de Requisitos:</span>
                        </div>
                        {subclass.reqStatus.map((req: { reqName: string; offSkillId?: string; isExpert: boolean; currentTier: string }, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono font-bold ${
                                req.isExpert ? 'text-emerald-400' : 'text-slate-400'
                              }`}>
                                {req.reqName}
                              </span>
                              <span className="text-xs">({req.currentTier})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-400">No hay subclases disponibles para la combinación de facción y clase de este héroe.</p>
          </div>
        )}
      </div>
    </div>
  );
};
