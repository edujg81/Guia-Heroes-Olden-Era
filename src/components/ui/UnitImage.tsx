import React, { useState } from 'react';
import { getUnitIcon } from '../../data/unitAssetsData';
import { Shield, Sparkles } from 'lucide-react';

interface UnitImageProps {
  name: string;
  nameEn?: string;
  alt?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallbackIcon?: React.ReactNode;
}

const SIZE_MAP = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

export const UnitImage: React.FC<UnitImageProps> = ({
  name,
  nameEn,
  alt,
  className = '',
  size = 'md',
  fallbackIcon,
}) => {
  const [hasError, setHasError] = useState(false);
  const iconSrc = getUnitIcon(name, nameEn);

  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  if (!iconSrc || hasError) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-lg bg-black/40 border border-white/10 text-amber-400 shrink-0 ${sizeClass} ${className}`}
        title={alt || name}
      >
        {fallbackIcon || <Shield className="w-1/2 h-1/2 opacity-70" />}
      </div>
    );
  }

  return (
    <img
      src={iconSrc}
      alt={alt || name}
      onError={() => setHasError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`inline-block object-contain rounded-lg shrink-0 transition-transform duration-200 hover:scale-105 ${sizeClass} ${className}`}
    />
  );
};
