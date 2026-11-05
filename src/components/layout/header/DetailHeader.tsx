import { cn } from '@/lib/utils';

import { BaseHeader, type BaseHeaderProps } from './BaseHeader';

export type DetailHeaderProps = Omit<BaseHeaderProps, 'variant'>;

export function DetailHeader({ className, ...props }: DetailHeaderProps) {
  return (
    <BaseHeader
      variant='detail'
      className={cn('detail-header', className)}
      {...props}
    />
  );
}
