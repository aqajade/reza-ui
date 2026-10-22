// src/components/layout/StackLayout.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

export type StackLayoutProps = React.ComponentProps<'div'> & {
  stackDirection?: 'col' | 'row';
  stackClass?: string;
};

export function StackLayout({
  className,
  stackDirection = 'col',
  stackClass,
  children,
  ...props
}: StackLayoutProps) {
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
