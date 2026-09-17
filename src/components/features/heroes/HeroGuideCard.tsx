import React from 'react';
import { DungeonHero } from '../../../types';
import { TierBadge } from '../../ui/TierBadge';
import { Swords, Wand2, Shield, Flame, BookOpen, CheckCircle2, ChevronRight, Zap, ArrowRightLeft } from 'lucide-react';
import { getHeroPortrait } from '../../../data/heroAssetsData';
import { HeroImage } from '../../ui/HeroImage';

interface HeroGuideCardProps {
  hero: DungeonHero;
  isSelected?: boolean;
  onSelect?: () => void;
  onCompare?: (hero: DungeonHero) => void;
  themeMode?: 'dark' | 'light';
  themeAccentClass?: string;
  isCompact?: boolean;
}

export const HeroGuideCard: React.FC<HeroGuideCardProps> = ({
  hero,
  isSelected = false,
  onSelect,
  onCompare,
  themeMode = 'dark',
  themeAccentClass = 'text-amber-400',
  isCompact = false,
}) => {
  const isMage = hero.heroType === 'Mago';

  return (
    <div
      onClick={onSelect}
      className={`border rounded-2xl p-5 transition-all duration-200 cursor-pointer relative overflow-hidden ${
        isSelected
          ? themeMode === 'light'
            ? 'bg-purple-50/90 border-purple-600 shadow-md ring-2 ring-purple-600/30'
            : 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
          : themeMode === 'light'
          ? 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-sm'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      {/* Header: Name, Title & Archetype Badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          {/* Hero Portrait */}
          <HeroImage
            heroId={hero.id}
            heroName={hero.name}
            faction={hero.faction}
            alt={`Retrato de ${hero.name}`}
            size="lg"
            className="rounded-xl border-2 border-slate-700 shadow-lg bg-slate-800"
          />
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`p-1.5 rounded-lg border text-xs ${
                  isMage
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {isMage ? <Wand2 className="w-3.5 h-3.5" /> : <Swords className="w-3.5 h-3.5" />}
              </span>
              <h3
                className={`font-serif font-bold text-base sm:text-lg ${
                  themeMode === 'light' ? 'text-slate-900' : 'text-white'
                }`}
              >
                {hero.name}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{hero.title}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <TierBadge tier={hero.tierRank.replace('Tier ', '')} size="sm" />
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
            {hero.heroClass}
          </span>
        </div>
      </div>

      {/* Specialty Box */}
      <div
        className={`p-3 rounded-xl border mb-3 text-xs ${
          themeMode === 'light'
            ? 'bg-slate-50 border-slate-200 text-slate-800'
            : 'bg-slate-950/60 border-slate-800/80 text-slate-200'
        }`}
      >
        <div className="flex items-center gap-1.5 font-bold mb-1">
          <SparkleIcon className={`w-3.5 h-3.5 ${themeAccentClass}`} />
          <span className={themeMode === 'light' ? 'text-purple-900' : themeAccentClass}>
            {hero.specialtyName}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-snug">{hero.specialtyEffect}</p>
      </div>

      {!isCompact && (
        <>
          {/* Stat Growth Matrix */}
          <div className="grid grid-cols-4 gap-1.5 mb-3 text-center">
            <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
              <div className="text-[10px] text-rose-400 font-mono uppercase font-bold">Atq</div>
              <div className="text-xs font-mono font-bold text-slate-200">
                {hero.statGrowth?.attack ?? 25}%
              </div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
              <div className="text-[10px] text-blue-400 font-mono uppercase font-bold">Def</div>
              <div className="text-xs font-mono font-bold text-slate-200">
                {hero.statGrowth?.defense ?? 25}%
              </div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
              <div className="text-[10px] text-purple-400 font-mono uppercase font-bold">Poder</div>
              <div className="text-xs font-mono font-bold text-slate-200">
                {hero.statGrowth?.spellPower ?? 25}%
              </div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
              <div className="text-[10px] text-amber-400 font-mono uppercase font-bold">Conoc</div>
              <div className="text-xs font-mono font-bold text-slate-200">
                {hero.statGrowth?.knowledge ?? 25}%
              </div>
            </div>
          </div>

          {/* Initial Army & Starting Skills */}
          <div className="space-y-1.5 text-[11px] font-sans">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">
                <strong>Inicio:</strong> {hero.initialArmy}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">
                <strong>Habilidades:</strong> {hero.initialSkills?.join(', ')}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Role & Recommendation Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Rol: <strong className="text-slate-200 font-sans">{hero.role}</strong></span>
        <div className="flex items-center gap-2.5">
          {onCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompare(hero);
              }}
              className="flex items-center gap-1 text-amber-400/90 hover:text-amber-300 hover:underline cursor-pointer"
              title="Comparar este héroe lado a lado"
            >
              <ArrowRightLeft className="w-3 h-3" />
              <span>Comparar</span>
            </button>
          )}
          <span className="flex items-center gap-1 text-slate-500">
            Detalles <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  );
}
