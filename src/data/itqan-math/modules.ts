// src/data/itqan-math/modules.ts
// SSOT Daftar Modul Pembelajaran Tadarruj ItqanMath
// Bebas JSX, serializable (ADR 1 & ADR 5)

import type { ModuleItem } from '@/types/math/itqan-math';

export const itqanModules: ModuleItem[] = [
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
];
