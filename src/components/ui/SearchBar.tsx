import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  themeMode?: 'dark' | 'light' | string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
  themeMode = 'dark',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm font-sans transition-all duration-200 outline-none border ${
          themeMode === 'light'
            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
            : 'bg-slate-900/90 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
        }`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
          title="Limpiar búsqueda"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
