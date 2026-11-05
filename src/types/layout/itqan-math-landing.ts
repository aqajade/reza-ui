import type { StaticImageData } from 'next/image';

import type { BaseLayoutConfig, HeaderConfig } from './base';

export type TotalQuestionOptions = {
  label: string;
  value: number;
};

export type TimerOptions = {
  label: string;
  value: string; // 'off' | '5' | '10' dsb
};

export type ItqanMathLandingData = BaseLayoutConfig & {
  // 1. Data Header Bar
  header: {
    logoSrc: string | StaticImageData;
    title: string; // "Itqan"
    highlight: string; // "Math"
    subtitle: string; // "Modul 01: Penjumlahan"
    badgeText: string; // "Fase Fondasi"
  };

  // 2. Data Card Topik Latihan
  topic: HeaderConfig & {
    iconSymbol: string; // "+" atau "−" atau "×"
  };

  // 3. Konfigurasi Form Generator
  form: {
    totalQuestionLabel: string; // "Total Soal"
    totalQuestionHint?: string; // "Pilih jumlah"
    defaultTotalQuestion: number; // 10
    totalQuestionOptions: TotalQuestionOptions[];

    timerLabel: string; // "Batas Waktu (Timer)"
    timerHint?: string; // "Opsional"
    defaultTimer: string; // 'off'
    timerOptions: TimerOptions[];

    submitText: string; // "Mulai Latihan Penjumlahan"
  };

  // 4. Data Footer
  footer: {
    text: string; // "© 2026 ItqanMath • Belajar Bertahap Tanpa Iklan"
  };
};
