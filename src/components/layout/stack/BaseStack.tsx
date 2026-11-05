// src/components/layout/BaseStack.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

export type BaseStackProps = React.ComponentProps<'div'> & {
  stackDirection?: 'col' | 'row';
  stackClass?: string;
};

export function BaseStack({
  className,
  stackDirection = 'col',
  stackClass,
  children,
  ...props
}: BaseStackProps) {
  return (
    <div
      className={cn(
        'flex',
        stackDirection === 'col' ? 'flex-col' : 'flex-row',
        'stack-layout',
        stackClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
