// src/components/layout/DetailStack.tsx

import { cn } from '@/lib/utils';
import type { LayoutConfig } from '@/types/layout/page-config';

import { StackLayout, type StackLayoutProps } from './StackLayout';

type DetailStackProps = Omit<StackLayoutProps, 'as'> & {
  config?: LayoutConfig;
};

export function DetailStack({
  config,
  className,
  children,
  ...props
}: DetailStackProps) {
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
