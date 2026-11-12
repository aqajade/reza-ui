import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseStack, type BaseStackProps } from './BaseStack';

export type DetailStackProps = BaseStackProps;

export function DetailStack({ className, ...props }: DetailStackProps) {
  return (
    <BaseStack
      className={cn('detail-stack', className)}
      {...props}
    />
  );
}
