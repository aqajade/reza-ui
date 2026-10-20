// src/components/layout/CardStack.tsx

import { cn } from '@/lib/utils';
import type { LayoutConfig } from '@/types/layout/page-config';

import { StackLayout, type StackLayoutProps } from './StackLayout';

type CardStackProps = Omit<StackLayoutProps, 'as'> & {
  config?: LayoutConfig;
};

export function CardStack({
  config,
  className,
  children,
  ...props
}: CardStackProps) {
  const { containerClass, ...restConfig } = config || {};

  return (
    <StackLayout
      className={cn(containerClass, className)}
      {...restConfig}
      {...props}
    >
      {children}
    </StackLayout>
  );
}
