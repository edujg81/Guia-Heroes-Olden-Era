import React from 'react';

interface MedievalCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  isInteractive?: boolean;
  themeMode?: 'dark' | 'light';
  id?: string;
  onClick?: () => void;
}


const MedievalCard: React.FC<MedievalCardProps> = ({
  title,
  subtitle,
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
      <h3 className="text-xl font-bold text-white">{title}</h3>
      {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default MedievalCard;