// src/lib/math-engine/addition-generator.ts
// Pure Math Engine: Penjumlahan Non-Negatif (BNHS Stage 1 — Step 1.2)
// Doktrin: rscoclsddsddryzaapfpsmbip — Zero any, Zero as, Zero interface
// ⚠️ Fungsi murni agnostik dari React state & AI runtime — wajib tetap di src/lib/

import type {
  DigitCombinationItem,
  DigitPresetId,
  QuestionItem,
  QuizConfig,
} from '@/types/math/itqan-math';

// ==========================================
// Tipe Internal
// ==========================================

type DigitRange = { min: number; max: number };

// ==========================================
// Konstanta
// ==========================================

const MAX_RESULT = 99_999;

// ==========================================
// Helper: Rentang angka berdasarkan jumlah digit (1–5)
// digit=1 → [1,9], digit=2 → [10,99], ..., digit=5 → [10000,99999]
// ==========================================

function getMinMaxByDigit(digit: number): DigitRange {
  if (digit === 1) return { min: 1, max: 9 };
  const min = Math.pow(10, digit - 1);
  const max = Math.pow(10, digit) - 1;
  return { min, max };
}

// ==========================================
// Helper: Rentang angka berdasarkan DigitPresetId
// ==========================================

function getPresetRange(presetId: DigitPresetId): DigitRange {
  switch (presetId) {
    case 'satuan':
      return { min: 1, max: 9 };
    case 'puluhan':
      return { min: 10, max: 99 };
    case 'ratusan':
      return { min: 100, max: 999 };
    case 'ribuan':
      return { min: 1_000, max: 9_999 };
    case 'campuran':
      return { min: 1, max: 9_999 };
  }
}

// ==========================================
// Helper: Random integer inklusif [min, max]
// ==========================================

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// Helper: Weighted Random Selection berbasis kumulatif persentase
// Mengembalikan index item terpilih dari array weights
// ==========================================

function weightedRandomIndex(weights: number[]): number {
  const total = weights.reduce((acc, w) => acc + w, 0);
  if (total === 0) return 0;
  const r = Math.random() * total;
  let accum = 0;
  for (let i = 0; i < weights.length; i++) {
    accum += weights[i];
    if (r < accum) return i;
  }
  return weights.length - 1; // fallback ke item terakhir
}

// ==========================================
// calculateAutoBalance
// Membagi rata 100% ke seluruh kombinasi yang enabled.
// Sisa pembagian (remainder) didistribusikan +1% ke item teratas.
// ⚠️ Guard: jika tidak ada kombinasi aktif, kembalikan tanpa perubahan.
// ==========================================

export function calculateAutoBalance(
  combinations: DigitCombinationItem[]
): DigitCombinationItem[] {
  const enabledItems = combinations.filter((c) => c.enabled);
  if (enabledItems.length === 0) return combinations;

  const basePercent = Math.floor(100 / enabledItems.length);
  let remainder = 100 - basePercent * enabledItems.length;

  const enabledKeys = new Set(enabledItems.map((c) => c.key));

  return combinations.map((combo) => {
    if (!enabledKeys.has(combo.key)) {
      // Kombinasi non-aktif → reset ke 0
      return { ...combo, weightPercent: 0 };
    }
    // Distribusikan +1% dari remainder ke item teratas (urutan array)
    const extra = remainder > 0 ? 1 : 0;
    remainder -= extra;
    return { ...combo, weightPercent: basePercent + extra };
  });
}

// ==========================================
// generateAdditionQuestions — Core Engine
// Menghasilkan array QuestionItem[] sesuai QuizConfig.
//
// Mode 'preset':  kedua operan dari rentang preset yang sama (presetId).
// Mode 'custom':  setiap soal dipilih via Weighted Random Selection
//                 dari kombinasi digit yang enabled & weightPercent > 0,
//                 lalu tiap operan diambil dari rentang digitA / digitB masing-masing.
//
// Batas keamanan: num1 + num2 ≤ 99.999 (max 5 digit hasil).
// Fallback jika tidak ada kombinasi aktif: gunakan range satuan [1,9].
// ==========================================

export function generateAdditionQuestions(config: QuizConfig): QuestionItem[] {
  const { totalQuestions, digitConfig } = config;
  const questions: QuestionItem[] = [];

  // --- Mode Preset ---
  if (digitConfig.mode === 'preset') {
    const { min, max } = getPresetRange(digitConfig.presetId);

    for (let i = 0; i < totalQuestions; i++) {
      let num1 = 0;
      let num2 = 0;
      let attempts = 0;

      do {
        num1 = randomInt(min, max);
        num2 = randomInt(min, max);
        attempts++;
      } while (num1 + num2 > MAX_RESULT && attempts < 20);

      questions.push({
        id: `q-${i + 1}`,
        num1,
        num2,
        operator: '+',
        correctAnswer: num1 + num2,
      });
    }

    return questions;
  }

  // --- Mode Custom (Weighted Random Selection) ---
  const activeCombinations = digitConfig.combinations.filter(
    (c) => c.enabled && c.weightPercent > 0
  );

  // Fallback: tidak ada kombinasi aktif → gunakan satuan [1,9]
  if (activeCombinations.length === 0) {
    const fallback: DigitRange = { min: 1, max: 9 };
    for (let i = 0; i < totalQuestions; i++) {
      const num1 = randomInt(fallback.min, fallback.max);
      const num2 = randomInt(fallback.min, fallback.max);
      questions.push({
        id: `q-${i + 1}`,
        num1,
        num2,
        operator: '+',
        correctAnswer: num1 + num2,
      });
    }
    return questions;
  }

  const weights = activeCombinations.map((c) => c.weightPercent);

  for (let i = 0; i < totalQuestions; i++) {
    const selectedIndex = weightedRandomIndex(weights);
    const selectedCombo = activeCombinations[selectedIndex];

    const rangeA = getMinMaxByDigit(selectedCombo.digitA);
    const rangeB = getMinMaxByDigit(selectedCombo.digitB);

    let num1 = 0;
    let num2 = 0;
    let attempts = 0;

    do {
      num1 = randomInt(rangeA.min, rangeA.max);
      num2 = randomInt(rangeB.min, rangeB.max);
      attempts++;
    } while (num1 + num2 > MAX_RESULT && attempts < 20);

    questions.push({
      id: `q-${i + 1}`,
      num1,
      num2,
      operator: '+',
      correctAnswer: num1 + num2,
    });
  }

  return questions;
}
