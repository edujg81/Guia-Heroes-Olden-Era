import React from 'react';

interface MedievalCardProps {
  children: React.ReactNode;
  className?: string;
  isInteractive?: boolean;
  themeMode?: 'dark' | 'light';
  id?: string;
  onClick?: () => void;
}

export const MedievalCard: React.FC<MedievalCardProps> = ({
  children,
  className = '',
  isInteractive = false,
  themeMode = 'dark',
  id,
  onClick,
}) => {
  const isDark = themeMode === 'dark';

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative rounded-xl border-2 p-5 ${
        isDark
          ? 'bg-[#12161f]/90 border-slate-700/80 text-slate-200 shadow-md'
          : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      } ${
        isInteractive
          ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
