import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SectionConfig, SectionElement } from '@/types/layout/base';

type PageSectionProps = React.ComponentProps<'section'> & {
  config?: SectionConfig;
  sectionElement?: SectionElement;
  sectionClass?: string;
};

export function PageSection({
  config,
  sectionElement,
  sectionClass,
  className,
  children,
  ...props
}: PageSectionProps) {
  const Component = (sectionElement ||
    config?.layout.sectionElement ||
    'section') as React.ElementType;
  const resolvedClass = sectionClass || config?.layout.sectionClass;
  const resolvedId = props.id || config?.layout.id;

  return (
    <Component
      id={resolvedId}
      className={cn('page-section', resolvedClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
