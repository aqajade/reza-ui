// src/components/layout/badge/SectionBadge.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseBadge, type BaseBadgeProps } from './BaseBadge';

export type SectionBadgeProps = Omit<BaseBadgeProps, 'variant'>;

export function SectionBadge({ className, ...props }: SectionBadgeProps) {
  return (
    <BaseBadge
      variant='section'
      className={cn('section-badge', className)}
      {...props}
    />
  );
}
