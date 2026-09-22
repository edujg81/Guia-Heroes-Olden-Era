import React from 'react';
import type { HeroWithExtras } from '../../../types';
import { TierBadge } from '../../ui/TierBadge';
import { Swords, Wand2, Shield, Flame, BookOpen, CheckCircle2, ChevronRight, Zap, ArrowRightLeft } from 'lucide-react';
import { ResolvedText } from '../../ui/ResolvedText';
//import { getHeroPortrait } from '../../../data/heroAssetsData';
import { HeroImage } from '../../ui/HeroImage';

interface HeroGuideCardProps {
  hero: HeroWithExtras;
  isSelected?: boolean;
  onSelect?: () => void;
  onCompare?: (hero: HeroWithExtras) => void;
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
  const isMage = hero.classType === 'magic';

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
      {/* Header: Tier, portrait, name & title */}
      <div className="mb-3">
        <div className="flex items-start gap-3">
          {/* Portrait: ocupa 4 filas verticales */}
          <HeroImage
            heroId={hero.id}
            heroName={hero.name}
            faction={hero.faction}
            iconPath={hero.iconPath}
            alt={`Retrato de ${hero.name}`}
            size="lg"
            className="rounded-xl border-2 border-slate-700 shadow-lg bg-slate-800 shrink-0 self-start"
          />

          {/* Columna derecha: Tier (fila 1) + nombre + título */}
          <div className="min-w-0 flex-1">
            {/* Fila 1: TierBadge alineado arriba */}
            <div className="flex justify-end mb-2">
              <TierBadge
                tier={hero.tierRank}
                size="sm"
                className="max-w-full whitespace-normal text-center"
              />
            </div>

            {/* Fila 2-4: nombre, icono, título */}
            <div className="flex items-start gap-2">
              <span
                className={`mt-0.5 p-1.5 rounded-lg border text-xs shrink-0 ${
                  isMage
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {isMage ? <Wand2 className="w-3.5 h-3.5" /> : <Swords className="w-3.5 h-3.5" />}
              </span>
                <div className="min-w-0">
                <h3
                  className={`font-serif font-bold text-base leading-tight break-words ${
                    themeMode === 'light' ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {hero.name}
                </h3>
                <p className="mt-1 text-[12px] leading-snug break-words text-slate-400 font-mono">
                  {hero.title}
                </p>
              </div>
            </div>
          </div>
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
            {hero.specializationName}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-snug break-words">
          <ResolvedText text={hero.specializationDescription} />
        </p>
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

          {/* Starting Army & Starting Skills */}
          <div className="space-y-1.5 text-[11px] font-sans">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">
                <strong>Inicio:</strong> {hero.startingArmy?.map(u => `${u.unitName} (${u.countInterval})`).join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">
                <strong>Habilidades:</strong> {hero.startingSkills?.map(s => s.skillName).join(', ')}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Role & Recommendation Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Clase: <strong className="text-slate-200 font-sans">{hero.classDisplay}</strong></span>
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
