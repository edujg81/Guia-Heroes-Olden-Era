import React from 'react';

export interface FilterOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface FilterChipGroupProps<T extends string = string> {
  options: FilterOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  className?: string;
  themeMode?: 'dark' | 'light' | string;
}

export function FilterChipGroup<T extends string = string>({
  options,
  selectedValue,
  onChange,
  className = '',
  themeMode = 'dark',
}: FilterChipGroupProps<T>) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer border ${
              isSelected
                ? themeMode === 'light'
                  ? 'bg-purple-900 text-white border-purple-900 shadow-sm'
                  : 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm shadow-amber-500/20'
                : themeMode === 'light'
                ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {opt.icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
                    ? themeMode === 'light'
                      ? 'bg-purple-800 text-purple-100'
                      : 'bg-slate-950/40 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
