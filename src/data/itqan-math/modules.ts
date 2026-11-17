// src/data/itqan-math/modules.ts
// SSOT Daftar Modul Pembelajaran Tadarruj ItqanMath Multibahasa (EN & ID)
// Bebas JSX, serializable (ADR 1 & ADR 5)

import type { Language, ModuleItem } from '@/types/math/itqan-math';

export const itqanModulesMap: Record<Language, readonly ModuleItem[]> = {
  en: [
    {
      id: 'addition',
      title: 'Basic Addition',
      subTitle: 'Up to 5 digits result',
      icon: '➕',
      badgeLabel: 'Addition',
      isAvailable: true,
    },
    {
      id: 'multiplication',
      title: 'Fast Multiplication',
      subTitle: 'Multiplication table & logic',
      icon: '✖️',
      badgeLabel: 'Multiplication',
      isAvailable: false,
    },
    {
      id: 'fractions',
      title: 'Simple Fractions',
      subTitle: 'Fractions values & denominators',
      icon: '🍕',
      badgeLabel: 'Fractions',
      isAvailable: false,
    },
    {
      id: 'algebra',
      title: 'Intro to Algebra',
      subTitle: 'Finding hidden variables',
      icon: '🧩',
      badgeLabel: 'Algebra',
      isAvailable: false,
    },
  ],
  id: [
    {
      id: 'addition',
      title: 'Penjumlahan Dasar',
      subTitle: 'Maksimal 5 digit',
      icon: '➕',
      badgeLabel: 'Penjumlahan',
      isAvailable: true,
    },
    {
      id: 'multiplication',
      title: 'Perkalian Cepat',
      subTitle: 'Tabel perkalian dasar & logika',
      icon: '✖️',
      badgeLabel: 'Perkalian',
      isAvailable: false,
    },
    {
      id: 'fractions',
      title: 'Pecahan Sederhana',
      subTitle: 'Pengenalan nilai & penyebut',
      icon: '🍕',
      badgeLabel: 'Pecahan',
      isAvailable: false,
    },
    {
      id: 'algebra',
      title: 'Aljabar Pengantar',
      subTitle: 'Mencari variabel tersembunyi',
      icon: '🧩',
      badgeLabel: 'Aljabar',
      isAvailable: false,
    },
  ],
};

// Default modules (English) untuk kompatibilitas ke belakang
export const itqanModules: readonly ModuleItem[] = itqanModulesMap.en;
