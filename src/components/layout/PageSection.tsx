// src/components/layout/PageSection.tsx
import * as React from 'react';

import { cn } from '@/lib/utils'; // Fungsi gabungan sakti bawaan Shadcn UI

/**
 * 1. DEFINISI TIPE PROPS (BIP MODERN USING TYPE)
 * Menggabungkan properti bawaan dari tag HTML <section> asli
 * dengan properti kustom 'as' agar tag elemennya bisa fleksibel berubah.
 */
type PageSectionProps = React.ComponentProps<'section'> & {
  /** Mengizinkan komponen menyamar menjadi tag HTML lain (contoh: as="header" atau as="footer") */
  as?: React.ElementType;
    /** 🟢 BARU & BIP: Menyerap langsung string kelas kustom penjinak visual sekat luar dari Excel */
  sectionClass?: string;
};

/**
 * 2. KOMPONEN UTAMA PAGESECTION (PASCALCASE)
 */
export function PageSection({
  className, sectionClass,
  as: Component = 'section', // Jika di spreadsheet tidak diisi kustom, otomatis pakai <section> bawaan pabrik
  ...props // Menampung sisa properti otomatis seperti id, onClick, aria-labels, dll.
}: PageSectionProps) {
  return (
    <Component
      // 'page-section' adalah hukum dasar SSOT dari globals.css kamu yang mengatur padding vertikal
      className={cn('page-section',sectionClass, className)}
      {...props}
    />
  );
}
