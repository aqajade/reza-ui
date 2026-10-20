import * as React from 'react';

import { getGridClasses } from '@/lib/grid-utils';
import { cn } from '@/lib/utils';
import { GridConfig } from '@/types/layout/grid-config';

type GridProps = React.ComponentProps<'div'> & {
  gridConfig?: GridConfig;
};

export function Grid({ gridConfig, className, ...props }: GridProps) {
  return (
    <div className={cn(getGridClasses(gridConfig), className)} {...props} />
  );
}
