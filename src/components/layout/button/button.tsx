import * as React from 'react';

import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = React.ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold shadow-lg shadow-emerald-950/40 border border-emerald-400/30',
  secondary:
    'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 font-semibold',
  outline:
    'bg-transparent hover:bg-emerald-900/40 text-emerald-300 border border-emerald-700/80 font-semibold',
  ghost:
    'bg-transparent hover:bg-emerald-900/30 text-emerald-300 font-medium',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-1.5 px-3 text-xs rounded-lg gap-1.5',
  md: 'py-2.5 px-4 text-xs sm:text-sm rounded-xl gap-2',
  lg: 'py-3.5 px-5 text-sm sm:text-base rounded-xl gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-sans tracking-wide transition-all select-none',
        'active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-emerald-400',
        'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
