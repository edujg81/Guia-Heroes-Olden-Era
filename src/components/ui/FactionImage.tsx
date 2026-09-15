import React, { useState } from 'react';
import { getFactionIcon } from '../../data/unitAssetsData';
import { Flag } from 'lucide-react';

interface FactionImageProps {
  faction: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

const SIZE_MAP = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-14 h-14',
};

export const FactionImage: React.FC<FactionImageProps> = ({
  faction,
  className = '',
  size = 'sm',
}) => {
  const [hasError, setHasError] = useState(false);
  const iconSrc = getFactionIcon(faction);
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.sm;

  if (hasError || !iconSrc) {
    return <Flag className={`${sizeClass} ${className} shrink-0 opacity-80`} />;
  }

  return (
    <img
      src={iconSrc}
      alt={faction}
      onError={() => setHasError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`inline-block object-contain shrink-0 drop-shadow-sm transition-transform duration-200 hover:scale-110 ${sizeClass} ${className}`}
    />
  );
};
