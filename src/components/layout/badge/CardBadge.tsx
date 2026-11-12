// src/components/layout/badge/CardBadge.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseBadge, type BaseBadgeProps } from './BaseBadge';

export type CardBadgeProps = Omit<BaseBadgeProps, 'variant'>;

export function CardBadge({ className, ...props }: CardBadgeProps) {
  return (
    <BaseBadge
      variant='card'
      className={cn('card-badge', className)}
      {...props}
    />
  );
}
