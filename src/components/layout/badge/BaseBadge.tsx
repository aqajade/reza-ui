// src/components/layout/badge/BaseBadge.tsx
import * as React from 'react';

import { parseHighlightText } from '@/lib/text-parser';
import { cn } from '@/lib/utils';
import type { HeaderConfig } from '@/types/layout/base';

export type BaseBadgeProps = React.ComponentProps<'span'> & {
  config?: HeaderConfig;
  variant?: 'section' | 'content' | 'detail' | 'card';
  dot?: boolean;
};

/**
 * BaseBadge
 *
 * Komponen Primitif Badge Modular reza-ui (RSC Murni).
 * Mengikuti doktrin rscoclsddsddryzaapfpsmbip:
 * - Anti-hardcode styling: styling visual default diambil dari config/kontrak data.
 * - Teks ber-span otomatis diproses melalui parseHighlightText.
 * - Menerima variant semantik: 'section' | 'content' | 'detail' | 'card'.
 */
export function BaseBadge({
  config,
  variant = 'section',
  dot = true,
  className,
  children,
  ...props
}: BaseBadgeProps) {
  const content = config?.title ? parseHighlightText(config.title) : children;
  const resolvedClass = config?.titleClass || config?.headerClass;

  if (!content) return null;

  return (
    <span
      className={cn(
        'base-badge',
        `badge-variant-${variant}`,
        resolvedClass,
        className
      )}
      {...props}
    >
      {dot && <span className='badge-dot' />}
      {content}
    </span>
  );
}
