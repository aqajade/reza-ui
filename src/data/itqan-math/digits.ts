// src/data/itqan-math/digits.ts
// SSOT Preset & Kombinasi Digit untuk Modul Penjumlahan ItqanMath
// Bebas JSX, serializable (ADR 1 & ADR 5)

import type {
  DigitCombinationItem,
  DigitPreset,
} from '@/types/math/itqan-math';

export const itqanDigitPresets: DigitPreset[] = [
  {
    id: 'satuan',
    label: 'Satuan + Satuan',
    description: 'Angka 1-9 (Hasil maks 18)',
    min: 1,
    max: 9,
  },
  {
    id: 'puluhan',
    label: 'Puluhan + Puluhan',
    description: 'Angka 10-99 (Hasil maks 198)',
    min: 10,
    max: 99,
  },
  {
    id: 'ratusan',
    label: 'Ratusan + Ratusan',
    description: 'Angka 100-999 (Hasil maks 1998)',
    min: 100,
    max: 999,
  },
  {
    id: 'ribuan',
    label: 'Ribuan + Ribuan',
    description: 'Angka 1000-9999 (Hasil maks 19998)',
    min: 1000,
    max: 9999,
  },
  {
    id: 'campuran',
    label: 'Campuran Acak',
    description: 'Kombinasi acak 1 sampai 4 digit',
    min: 1,
    max: 9999,
  },
];

export const itqanDefaultCombinations: DigitCombinationItem[] = [
  // Kelompok Satuan (1d)
  {
    key: '1-1',
    group: '1d',
    label: 'Satuan + Satuan (1d + 1d)',
    maxDigitDescription: 'Maks 2 digit',
    digitA: 1,
    digitB: 1,
    weightPercent: 20,
    enabled: true,
  },
  {
    key: '1-2',
    group: '1d',
    label: 'Satuan + Puluhan (1d + 2d)',
    maxDigitDescription: 'Maks 2 digit',
    digitA: 1,
    digitB: 2,
    weightPercent: 20,
    enabled: true,
  },
  {
    key: '1-3',
    group: '1d',
    label: 'Satuan + Ratusan (1d + 3d)',
    maxDigitDescription: 'Maks 3 digit',
    digitA: 1,
    digitB: 3,
    weightPercent: 10,
    enabled: true,
  },
  {
    key: '1-4',
    group: '1d',
    label: 'Satuan + Ribuan (1d + 4d)',
    maxDigitDescription: 'Maks 4 digit',
    digitA: 1,
    digitB: 4,
    weightPercent: 10,
    enabled: true,
  },
  {
    key: '1-5',
    group: '1d',
    label: 'Satuan + Puluh Ribu (1d + 5d)',
    maxDigitDescription: 'Maks 5 digit',
    digitA: 1,
    digitB: 5,
    weightPercent: 10,
    enabled: true,
  },
  // Kelompok Puluhan (2d)
  {
    key: '2-2',
    group: '2d',
    label: 'Puluhan + Puluhan (2d + 2d)',
    maxDigitDescription: 'Maks 3 digit',
    digitA: 2,
    digitB: 2,
    weightPercent: 10,
    enabled: true,
  },
  {
    key: '2-3',
    group: '2d',
    label: 'Puluhan + Ratusan (2d + 3d)',
    maxDigitDescription: 'Maks 4 digit',
    digitA: 2,
    digitB: 3,
    weightPercent: 10,
    enabled: true,
  },
  {
    key: '2-4',
    group: '2d',
    label: 'Puluhan + Ribuan (2d + 4d)',
    maxDigitDescription: 'Maks 5 digit',
    digitA: 2,
    digitB: 4,
    weightPercent: 10,
    enabled: true,
  },
  // Kelompok Ratusan (3d)
  {
    key: '3-3',
    group: '3d',
    label: 'Ratusan + Ratusan (3d + 3d)',
    maxDigitDescription: 'Maks 4 digit',
    digitA: 3,
    digitB: 3,
    weightPercent: 0,
    enabled: false,
  },
  {
    key: '3-4',
    group: '3d',
    label: 'Ratusan + Ribuan (3d + 4d)',
    maxDigitDescription: 'Maks 5 digit',
    digitA: 3,
    digitB: 4,
    weightPercent: 0,
    enabled: false,
  },
  // Kelompok Ribuan (4d)
  {
    key: '4-4',
    group: '4d',
    label: 'Ribuan + Ribuan (4d + 4d)',
    maxDigitDescription: 'Maks 5 digit',
    digitA: 4,
    digitB: 4,
    weightPercent: 0,
    enabled: false,
  },
];
