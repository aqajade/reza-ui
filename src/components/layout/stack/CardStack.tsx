import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseStack, type BaseStackProps } from './BaseStack';

export type CardStackProps = BaseStackProps;

export function CardStack({ className, ...props }: CardStackProps) {
  return (
    <BaseStack
      className={cn('card-stack', className)}
      {...props}
    />
  );
}
