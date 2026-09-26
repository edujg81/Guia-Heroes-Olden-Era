import React, { useState } from 'react';
//import { getHeroPortrait } from '../../data/heroAssetsData';
import { Shield } from 'lucide-react';

interface HeroImageProps {
  heroId?: string;
  heroName?: string;
  faction?: string;
  iconPath?: string;
  alt?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fallbackIcon?: React.ReactNode;
}

const SIZE_MAP = {
  xs: 'w-8 h-8',
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
  '2xl': 'w-40 h-40',
};

export const HeroImage: React.FC<HeroImageProps> = ({
  heroId,
  heroName,
  faction,
  iconPath,
  alt,
  className = '',
  size = 'md',
  fallbackIcon,
}) => {
  const [hasError, setHasError] = useState(false);
  // Normaliza iconPath: puede venir sin "src/assets/" y sin ".png".
  const normalizeIconPath = (raw?: string): string | null => {
    if (!raw) return null;
    let p = raw.trim();
    if (!p) return null;
    // Quitar "src/assets/" si lo incluye, para construir la ruta canónica.
    if (p.startsWith('src/assets/')) {
      p = p.substring('src/assets/'.length);
    } else if (p.startsWith('src/assets/')) {
      p = p.substring('src/assets/'.length);
    }
    if (!p.endsWith('.png')) p += '.png';
    return `src/assets/${p}`;
  };

const iconSrc = normalizeIconPath(iconPath) || `src/assets/icons/heroes/${heroId ? heroId.toLowerCase() : 'default'}/${heroId || 'default'}.png`;

  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  if (!iconSrc || hasError) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-lg bg-black/40 border border-white/10 text-amber-400 shrink-0 ${sizeClass} ${className}`}
        title={alt || heroName || heroId}
      >
        {fallbackIcon || <Shield className="w-1/2 h-1/2 opacity-70" />}
      </div>
    );
  }

  return (
    <img
      src={iconSrc}
      alt={alt || heroName || heroId || 'Héroe'}
      onError={() => setHasError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`inline-block object-cover rounded-lg shrink-0 transition-transform duration-200 hover:scale-105 ${sizeClass} ${className}`}
    />
  );
};