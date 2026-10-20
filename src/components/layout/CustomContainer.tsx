// src/components/layout/CustomContainer.tsx
import * as React from 'react';

import { cn } from '@/lib/utils'; // Fungsi sakti bawaan hasil init Shadcn UI

/**
 * 1. DEFINISI TIPE PROPS (BIP MODERN USING TYPE)
 * Menggabungkan seluruh properti bawaan dari tag HTML <div> asli
 * dengan properti kustom pengatur baju variant dan suntikan rumus Excel.
 */
type CustomContainerProps = React.ComponentProps<'div'> & {
  /** Tempat menampung string rumus max-width pecahan ganjil hasil copy dari kolom Excel kamu */
  containerClass?: string;
};

/**
 * 2. KOMPONEN UTAMA CUSTOMCONTAINER (PASCALCASE)
 */
export function CustomContainer({
  className,
  containerClass,
  ...props // Menampung sisa properti otomatis bawaan div (seperti id, style, aria-attributes)
}: CustomContainerProps) {
  return (
    <div
      className={cn(
        // KONDISI 1: Jika variant 'default', kunci pakai kelas SSOT 'custom-container' di globals.css kamu
        'custom-container',

        // KONDISI 2: Jika variant 'custom', suntikkan string rumus kalkulasi figma dari kolom Excel kamu
        containerClass,

        className // Benteng terakhir: kamu tetep bisa nimpa/nambah kelas kustom secara dadakan via inline Tailwind
      )}
      {...props}
    />
  );
}
