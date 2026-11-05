import { cn } from '@/lib/utils';

import { BaseHeader, type BaseHeaderProps } from './BaseHeader';

export type ContentHeaderProps = Omit<BaseHeaderProps, 'variant'>;

export function ContentHeader({ className, ...props }: ContentHeaderProps) {
  return (
    <BaseHeader
      variant='content'
      className={cn('content-header', className)}
      {...props}
    />
  );
}
