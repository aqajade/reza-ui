// src/components/layout/badge/ContentBadge.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseBadge, type BaseBadgeProps } from './BaseBadge';

export type ContentBadgeProps = Omit<BaseBadgeProps, 'variant'>;

export function ContentBadge({ className, ...props }: ContentBadgeProps) {
  return (
    <BaseBadge
      variant='content'
      className={cn('content-badge', className)}
      {...props}
    />
  );
}
