// src/components/layout/BaseStack.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { LayoutConfig } from '@/types/layout/base';

export type StackConfigInput = LayoutConfig | { layout?: LayoutConfig };

export type BaseStackProps = React.ComponentProps<'div'> & {
  config?: StackConfigInput;
  stackDirection?: 'col' | 'row';
  stackClass?: string;
};

export function BaseStack({
  config,
  className,
  stackDirection = 'col',
  stackClass,
  children,
  ...props
}: BaseStackProps) {
  const resolvedLayout =
    config && 'layout' in config ? (config.layout as LayoutConfig) : (config as LayoutConfig);
  const direction = resolvedLayout?.stackDirection || stackDirection;
  const resolvedClass = resolvedLayout?.stackClass || stackClass;

  return (
    <div
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        'stack-layout',
        resolvedClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
