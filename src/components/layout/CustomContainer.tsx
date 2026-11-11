// src/components/layout/CustomContainer.tsx
import * as React from 'react';

import { cn } from '@/lib/utils'; // Fungsi sakti bawaan hasil init Shadcn UI
import { SectionConfig } from '@/types/layout/base';

/**
 * 1. DEFINISI TIPE PROPS (BIP MODERN USING TYPE)
 * Menggabungkan seluruh properti bawaan dari tag HTML <div> asli
 * dengan properti kustom pengatur baju variant dan suntikan rumus Excel.
 */
type CustomContainerProps = React.ComponentProps<'div'> & {
  /** Tempat menampung string rumus max-width pecahan ganjil hasil copy dari kolom Excel kamu */
  config?: SectionConfig;
  containerClass?: string;
};

/**
 * 2. KOMPONEN UTAMA CUSTOMCONTAINER (PASCALCASE)
 */
export function CustomContainer({
  config,
  className,
  containerClass,
  ...props // Menampung sisa properti otomatis bawaan div (seperti id, style, aria-attributes)
}: CustomContainerProps) {
  const resolvedClass = containerClass || config?.layout.containerClass;

  return (
    <div
      className={cn(
        // KONDISI 1: Kunci pakai kelas SSOT 'custom-container'
        'custom-container',

        // KONDISI 2: Ambil dari prop langsung atau fallback ke config?.layout.containerClass
        resolvedClass,

        className // Benteng terakhir: nimpa/nambah kelas kustom secara dadakan via inline className
      )}
      {...props}
    />
  );
}
