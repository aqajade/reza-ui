import * as React from 'react';

import { cn } from '@/lib/utils';
import type { LayoutConfig } from '@/types/layout/base';

import { BaseStack } from './BaseStack';

// Pola seragam untuk SectionStack / ContentStack / DetailStack / CardStack:
type StackProps = React.ComponentProps<typeof BaseStack> & {
  config?: LayoutConfig;
};

export function DetailStack({
  config,
  className,
  children,
  ...props
}: StackProps) {
  const { stackDirection, stackClass } = config || {};

  return (
    <BaseStack
      stackDirection={stackDirection}
      stackClass={stackClass}
      className={cn('detail-stack', className)}
      {...props}
    >
      {children}
    </BaseStack>
  );
}
