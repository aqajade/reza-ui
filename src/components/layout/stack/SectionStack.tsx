import * as React from 'react';

import { cn } from '@/lib/utils';

import { BaseStack, type BaseStackProps } from './BaseStack';

export type SectionStackProps = BaseStackProps;

export function SectionStack({ className, ...props }: SectionStackProps) {
  return (
    <BaseStack
      className={cn('section-stack', className)}
      {...props}
    />
  );
}
