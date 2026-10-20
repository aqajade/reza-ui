import { cn } from '@/lib/utils';
import { LayoutConfig } from '@/types/layout/page-config';

import { StackLayout, type StackLayoutProps } from './StackLayout';

type ContentStackProps = Omit<StackLayoutProps, 'as'> & {
  config?: LayoutConfig;
};

export function ContentStack({
  config,
  className,
  children,
  ...props
}: ContentStackProps) {
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
