import React from 'react';

interface TierBadgeProps {
  tier: number | string;
  variant?: 'tier' | 'rank' | 'priority';
  className?: string;
  size?: 'sm' | 'md';
}

export const TierBadge: React.FC<TierBadgeProps> = ({
  tier,
  variant = 'tier',
  className = '',
  size = 'md',
}) => {
  const getBadgeStyle = () => {
    const tierStr = String(tier).toUpperCase();

    if (tierStr.includes('S+') || tierStr === '1' || tierStr.includes('P1')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-500/10 shadow-sm';
    }
    if (tierStr.includes('S') || tierStr === '2' || tierStr.includes('P2')) {
      return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
    }
    if (tierStr.includes('A') || tierStr === '3' || tierStr.includes('P3')) {
      return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    }
    if (tierStr.includes('B') || tierStr === '4') {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    }
    if (tierStr === '5' || tierStr === '6' || tierStr === '7') {
      return 'bg-rose-500/20 text-rose-300 border-rose-500/50';
    }
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  const prefix = variant === 'tier' && !String(tier).toLowerCase().includes('tier') ? 'Tier ' : '';

  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-bold uppercase rounded-md border tracking-wider ${getBadgeStyle()} ${sizeClasses} ${className}`}
    >
      {prefix}{tier}
    </span>
  );
};
