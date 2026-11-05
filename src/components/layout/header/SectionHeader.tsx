import { cn } from '@/lib/utils';

import { BaseHeader, type BaseHeaderProps } from './BaseHeader';

export type SectionHeaderProps = Omit<BaseHeaderProps, 'variant'>;

export function SectionHeader({ className, ...props }: SectionHeaderProps) {
  return (
    <BaseHeader
      variant='section'
      className={cn('section-header', className)}
      {...props}
    />
  );
}
