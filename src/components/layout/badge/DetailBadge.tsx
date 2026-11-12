// src/components/layout/badge/DetailBadge.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseBadge, type BaseBadgeProps } from './BaseBadge';

export type DetailBadgeProps = Omit<BaseBadgeProps, 'variant'>;

export function DetailBadge({ className, ...props }: DetailBadgeProps) {
  return (
    <BaseBadge
      variant='detail'
      className={cn('detail-badge', className)}
      {...props}
    />
  );
}
