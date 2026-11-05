import { cn } from '@/lib/utils';

import { BaseHeader, type BaseHeaderProps } from './BaseHeader';

export type CardHeaderProps = Omit<BaseHeaderProps, 'variant'>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <BaseHeader
      variant='card'
      className={cn('card-header', className)}
      {...props}
    />
  );
}