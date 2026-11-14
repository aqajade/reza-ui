import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SectionConfig, SectionElement } from '@/types/layout/base';

type PageSectionProps = React.ComponentProps<'section'> & {
  config?: SectionConfig;
  sectionElement?: SectionElement;
  sectionClass?: string;
  sectionVariant?: import('@/types/layout/base').SectionVariant;
};

export function PageSection({
  config,
  sectionElement,
  sectionClass,
  sectionVariant,
  className,
  children,
  ...props
}: PageSectionProps) {
  const Component = (sectionElement ||
    config?.layout.sectionElement ||
    'section') as React.ElementType;
  const resolvedClass = sectionClass || config?.layout.sectionClass;
  const resolvedId = props.id || config?.layout.id;
  const resolvedVariant = sectionVariant || config?.layout.sectionVariant || 'root';

  return (
    <Component
      id={resolvedId}
      className={cn(
        resolvedVariant === 'sub' ? 'py-0' : 'page-section',
        resolvedClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
