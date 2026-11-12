import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseStack, type BaseStackProps } from './BaseStack';

export type ContentStackProps = BaseStackProps;

export function ContentStack({ className, ...props }: ContentStackProps) {
  return (
    <BaseStack
      className={cn('content-stack', className)}
      {...props}
    />
  );
}
