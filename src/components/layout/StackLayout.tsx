
import * as React from 'react';

import { cn } from '@/lib/utils';

type StackLayoutElement = 'div' | 'section' | 'header' | 'footer';

export type StackLayoutProps = React.ComponentProps<'div'> & {
  stackDirection?: 'col' | 'row';
  stackClass?: string;
  as?: StackLayoutElement;
};

export function StackLayout({
  as = 'div',
  className,
  stackDirection = 'col',
  stackClass,
  children,
  ...props
}: StackLayoutProps) {
  return React.createElement(
    as,
    {
      ...props,
      className: cn(
        'flex',
        stackDirection === 'col' ? 'flex-col' : 'flex-row',
        'stack-layout',
        stackClass,
        className
      ),
    },
    children
  );
}
