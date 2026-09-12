import React from 'react';

interface ResourceBadgeProps {
  type: 'gold' | 'wood' | 'ore' | 'mercury' | 'gems' | 'crystal' | 'mana' | 'lawPoints';
  amount: number | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ResourceBadge: React.FC<ResourceBadgeProps> = ({
  type,
  amount,
  className = '',
  size = 'md',
}) => {
  const getResourceConfig = () => {
    switch (type) {
      case 'gold':
        return { label: 'Oro', icon: '🪙', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' };
      case 'wood':
        return { label: 'Madera', icon: '🪵', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'ore':
        return { label: 'Mineral', icon: '⛏️', color: 'bg-slate-500/10 text-slate-300 border-slate-500/30' };
      case 'mercury':
        return { label: 'Mercurio', icon: '🧪', color: 'bg-red-500/10 text-red-400 border-red-500/30' };
      case 'gems':
        return { label: 'Gemas', icon: '💎', color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' };
      case 'crystal':
        return { label: 'Cristal', icon: '🔮', color: 'bg-purple-500/10 text-purple-300 border-purple-500/30' };
      case 'mana':
        return { label: 'Maná', icon: '✨', color: 'bg-blue-500/10 text-blue-300 border-blue-500/30' };
      case 'lawPoints':
        return { label: 'Ley', icon: '📜', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' };
      default:
        return { label: 'Recurso', icon: '📦', color: 'bg-slate-700 text-slate-200 border-slate-600' };
    }
  };

  const config = getResourceConfig();
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold rounded-lg border backdrop-blur-sm ${config.color} ${sizeClasses} ${className}`}
    >
      <span>{config.icon}</span>
      <span>{amount}</span>
    </span>
  );
};
