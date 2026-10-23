import * as React from 'react';

import { cn } from '@/lib/utils';

export type BadgeProps = React.ComponentProps<'span'> & {
  dot?: boolean;
};

export function Badge({
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-sans',
        'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold tracking-wide select-none',
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      {children}
    </span>
  );
}
