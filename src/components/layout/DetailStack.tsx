import * as React from 'react';

import { cn } from '@/lib/utils';
import type { LayoutConfig } from '@/types/layout/base';

import { StackLayout } from './StackLayout';

// Pola seragam untuk SectionStack / ContentStack / DetailStack / CardStack:
type StackProps = React.ComponentProps<typeof StackLayout> & {
  config?: LayoutConfig;
};

export function DetailStack({ config, className, children, ...props }: StackProps) {
  const { stackDirection, stackClass } = config || {};

  return (
    <StackLayout
      stackDirection={stackDirection}
      stackClass={stackClass}
      className={cn('detail-stack', className)}
      {...props}
    >
      {children}
    </StackLayout>
  );
}