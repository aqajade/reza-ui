// src/components/layout/SectionStack.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { LayoutConfig } from '@/types/layout/base';

import { StackLayout } from './StackLayout';

type SectionStackProps = React.ComponentProps<typeof StackLayout> & {
  /** Objek konfigurasi layout dari page-config */
  config?: LayoutConfig;
};

export function SectionStack({
  config,
  className,
  children,
  ...props
}: SectionStackProps) {
  // Ambil containerClass secara terpisah karena dia dipetakan ke className bawaan React
  const {
    containerClass,
    stackElement = 'section',
    ...restConfig
  } = config || {};

  return (
    <StackLayout
      as={stackElement}
      className={cn(containerClass, className)}
      {...restConfig} // Otomatis mengalirkan id, stackDirection, dan stackClass tanpa perlu ditulis manual!
      {...props} // Mengalirkan sisa props komponen kustom lainnya jika ada
    >
      {children}
    </StackLayout>
  );
}
