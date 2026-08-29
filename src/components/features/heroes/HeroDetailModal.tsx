import React from 'react';
import { DungeonHero } from '../../../types';
import { TierBadge } from '../../ui/TierBadge';
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
} from 'lucide-react';

interface HeroDetailModalProps {
  hero: DungeonHero | null;
  onClose: () => void;
  themeMode?: 'dark' | 'light';
  themeAccentClass?: string;
}

export const HeroDetailModal: React.FC<HeroDetailModalProps> = ({
  hero,
  onClose,
  themeMode = 'dark',
  themeAccentClass = 'text-amber-400',
}) => {
  if (!hero) return null;

  const isMage = hero.heroType === 'Mago';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl transition-all ${
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
          <div
            className={`p-3.5 rounded-2xl border ${
              isMage
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {isMage ? <Wand2 className="w-8 h-8" /> : <Swords className="w-8 h-8" />}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-serif font-bold">{hero.name}</h2>
              <TierBadge tier={hero.tierRank.replace('Tier ', '')} />
            </div>
            <p className="text-xs font-mono text-slate-400">
              {hero.title} • <span className="font-semibold text-slate-200">{hero.heroClass}</span> ({hero.heroType})
            </p>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Specialty Box */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Especialidad: {hero.specialtyName}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{hero.specialtyEffect}</p>
          </div>

          {/* Stat Growth Box */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Crecimiento de Atributos por Nivel</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-rose-400 font-mono font-bold">Ataque</div>
                <div className="text-sm font-mono font-bold">{hero.statGrowth?.attack}%</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-blue-400 font-mono font-bold">Defensa</div>
                <div className="text-sm font-mono font-bold">{hero.statGrowth?.defense}%</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-purple-400 font-mono font-bold">Poder</div>
                <div className="text-sm font-mono font-bold">{hero.statGrowth?.spellPower}%</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-amber-400 font-mono font-bold">Conocim.</div>
                <div className="text-sm font-mono font-bold">{hero.statGrowth?.knowledge}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy and Tactical Playstyle */}
        <div className="space-y-4 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-200 mb-1.5">
              <Target className="w-4 h-4 text-rose-400" />
              <span>Estilo de Juego Táctico & Despliegue</span>
            </div>
            <p className="text-slate-300">{hero.tacticalPlaystyle}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-200 mb-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Ruta de Habilidades Recomendada (Build Óptima)</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
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

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-200 mb-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Sinergia de Facción & Tácticas de Apertura</span>
            </div>
            <p className="text-slate-300">{hero.synergyCombo}</p>
            {hero.day1Action && (
              <p className="text-slate-400 mt-1.5">
                <strong className="text-slate-200">Apertura Día 1:</strong> {hero.day1Action}
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
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
