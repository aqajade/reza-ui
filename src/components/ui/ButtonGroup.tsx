import * as React from 'react';

import { cn } from '@/lib/utils';

export type ButtonGroupOption<T extends string | number = string | number> = {
  label: React.ReactNode;
  value: T;
};

export type ButtonGroupProps<T extends string | number = string | number> = {
  options: ButtonGroupOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: 2 | 3 | 4;
  className?: string;
};

export function ButtonGroup<T extends string | number = string | number>({
  options,
  value,
  onChange,
  columns = 4,
  className,
}: ButtonGroupProps<T>) {
  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns];

  return (
    <div className={cn('grid gap-2', gridColsClass, className)}>
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={String(option.value)}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'py-2 rounded-lg font-sans text-xs transition-all text-center select-none cursor-pointer',
              'active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-400',
              isSelected
                ? 'bg-emerald-600 border border-emerald-400 text-white font-extrabold shadow-md shadow-emerald-950/30'
                : 'bg-emerald-950/80 border border-emerald-900/80 text-gray-300 hover:text-white hover:bg-emerald-900/50 font-semibold'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
