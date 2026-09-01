import React from 'react';

export type SealPriority = 'Crítica' | 'Alta' | 'Media' | 'Recomendada' | 'Opcional' | 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4' | 'Tier 5' | 'Tier 6' | 'Tier 7' | string;

interface WaxSealBadgeProps {
  label: SealPriority;
  variant?: 'seal' | 'plate' | 'ribbon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const WaxSealBadge: React.FC<WaxSealBadgeProps> = ({
  label,
  variant = 'seal',
  size = 'sm',
  className = '',
}) => {
  const getStyleForLabel = () => {
    const text = label.toLowerCase();
    if (text.includes('crítica') || text.includes('rush') || text.includes('tier 7') || text.includes('p1')) {
      return {
        bg: 'bg-gradient-to-br from-rose-700 via-red-800 to-rose-950',
        text: 'text-rose-100',
        border: 'border-rose-400/80',
        glow: 'shadow-[0_0_10px_rgba(225,29,72,0.45)]',
        accentDot: 'bg-amber-300',
      };
    }
    if (text.includes('alta') || text.includes('tier 6') || text.includes('tier 5') || text.includes('p2')) {
      return {
        bg: 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-950',
        text: 'text-amber-100',
        border: 'border-amber-400/80',
        glow: 'shadow-[0_0_10px_rgba(245,158,11,0.45)]',
        accentDot: 'bg-yellow-200',
      };
    }
    if (text.includes('recomendada') || text.includes('tier 4') || text.includes('tier 3') || text.includes('p3')) {
      return {
        bg: 'bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950',
        text: 'text-emerald-100',
        border: 'border-emerald-400/80',
        glow: 'shadow-[0_0_10px_rgba(16,185,129,0.4)]',
        accentDot: 'bg-emerald-300',
      };
    }
    if (text.includes('opcional') || text.includes('tier 1') || text.includes('tier 2') || text.includes('base')) {
      return {
        bg: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950',
        text: 'text-slate-200',
        border: 'border-slate-400/80',
        glow: 'shadow-[0_0_8px_rgba(148,163,184,0.3)]',
        accentDot: 'bg-slate-400',
      };
    }
    // Default mystical purple/amethyst
    return {
      bg: 'bg-gradient-to-br from-purple-800 via-purple-900 to-slate-950',
      text: 'text-purple-100',
      border: 'border-purple-400/80',
      glow: 'shadow-[0_0_10px_rgba(168,85,247,0.4)]',
      accentDot: 'bg-purple-300',
    };
  };

  const style = getStyleForLabel();

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wider',
    md: 'px-2.5 py-1 text-xs tracking-wide',
    lg: 'px-3 py-1.5 text-sm font-semibold tracking-wide',
  }[size];

  if (variant === 'seal') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-serif font-bold uppercase border ${style.border} ${style.bg} ${style.text} ${style.glow} ${sizeClasses} ${className} select-none transition-transform duration-200 hover:scale-105`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${style.accentDot} shadow-[0_0_4px_currentColor]`} />
        <span>{label}</span>
      </span>
    );
  }

  // Plate variant with rivets
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm font-mono font-bold uppercase border-2 ${style.border} ${style.bg} ${style.text} ${style.glow} ${sizeClasses} ${className} relative select-none`}
    >
      <span className="w-1 h-1 rounded-full bg-slate-200/80 absolute top-0.5 left-0.5" />
      <span className="w-1 h-1 rounded-full bg-slate-200/80 absolute top-0.5 right-0.5" />
      <span className="w-1 h-1 rounded-full bg-slate-200/80 absolute bottom-0.5 left-0.5" />
      <span className="w-1 h-1 rounded-full bg-slate-200/80 absolute bottom-0.5 right-0.5" />
      <span className="px-1">{label}</span>
    </span>
  );
};
