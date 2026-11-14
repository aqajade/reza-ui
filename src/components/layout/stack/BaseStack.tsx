// src/components/layout/BaseStack.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { LayoutConfig, StackDirection } from '@/types/layout/base';

export type StackConfigInput = LayoutConfig | { layout?: LayoutConfig };

export const StackLayout = BaseStack;

export type BaseStackProps = React.ComponentProps<'div'> & {
  config?: StackConfigInput;
  stackDirection?: StackDirection;
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
  const Element = (resolvedLayout?.stackElement || 'div') as React.ElementType;

  return (
    <Element
      className={cn(
        'flex min-h-0',
        direction === 'col' ? 'flex-col' : 'flex-row',
        'stack-layout',
        resolvedClass,
        className
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
