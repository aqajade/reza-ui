import * as React from 'react';

import { parseHighlightText } from '@/lib/text-parser';
import { cn } from '@/lib/utils';
import type { HeaderConfig } from '@/types/layout/base';

export type BadgeProps = React.ComponentProps<'span'> & {
  config?: HeaderConfig;
  dot?: boolean;
};

export function Badge({
  config,
  dot = true,
  className,
  children,
  ...props
}: BadgeProps) {
  // Konten diambil dari config (Data-Driven SSOT) jika tersedia, fallback ke children
  const content = config?.title ? parseHighlightText(config.title) : children;
  const resolvedClass = config?.titleClass || config?.headerClass;

  if (!content) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-sans',
        'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold tracking-wide select-none',
        resolvedClass,
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      {content}
    </span>
  );
}

