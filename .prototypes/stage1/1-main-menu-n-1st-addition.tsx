import React, { useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent, WheelEvent } from 'react';

// ==========================================
// 1. TYPES & SCHEMAS (Strict TypeScript Definitions)
// Mandat: Memakai `type` secara konsisten (Anti-interface)
// ==========================================

export type AppState = 'home-menu' | 'module-setup' | 'practicing' | 'result';
export type ModuleId = 'addition' | 'multiplication' | 'fractions' | 'algebra';
export type TimerOption = 'off' | '5' | '10' | '15';
export type TotalSoalOption = 5 | 10 | 15 | 20;
export type InteractiveModeOption = 'interactive' | 'jembreng';

// Mode Kustomisasi Digit
export type DigitMode = 'preset' | 'custom';
export type DigitPresetId = 'satuan' | 'puluhan' | 'ratusan' | 'ribuan' | 'campuran';

// Tipe Pasangan Kombinasi Digit
export type DigitCombinationKey = 
  | '1-1' | '1-2' | '1-3' | '1-4' | '1-5'
  | '2-2' | '2-3' | '2-4'
  | '3-3' | '3-4'
  | '4-4';

export type DigitCombinationItem = {
  key: DigitCombinationKey;
  group: '1d' | '2d' | '3d' | '4d';
  label: string;
  maxDigitDesc: string;
  digitA: number; // 1 to 4
  digitB: number; // 1 to 5
  weightPercent: number; // Porsi dalam %
  enabled: boolean;
};

export type DigitPreset = {
  id: DigitPresetId;
  label: string;
  desc: string;
  min: number;
  max: number;
};

export type DigitConfig = {
  mode: DigitMode;
  presetId: DigitPresetId;
  combinations: DigitCombinationItem[];
};

export type ModuleItem = {
  id: ModuleId;
  title: string;
  subtitle: string;
  icon: string;
  badgeLabel: string;
  isAvailable: boolean;
};

export type QuizConfig = {
  totalSoal: TotalSoalOption;
  timer: TimerOption;
  interactiveMode: InteractiveModeOption; // Explicit menu parameter (Interaktif 1-per-1 vs Jembreng)
  digitConfig: DigitConfig;
};

export type QuestionItem = {
  id: string;
  num1: number;
  num2: number;
  operator: string;
  correctAnswer: number;
  userAnswer?: string;
  isCorrect?: boolean;
};

// ==========================================
// MULTILANGUAGE SCHEMA & DICTIONARY
// ==========================================
export type Language = 'en' | 'id';

export type LanguageOption = {
  code: Language;
  label: string;
};

const DICTIONARY = {
  en: {
    header: {
      homeBadge: 'Main Menu',
      modulePrefix: 'Module:',
    },
    home: {
      badge: '🎯 Progressive & Structured Practice',
      title: 'Select Learning Module',
      subtitle: 'Please select a topic below to start your practice.',
      startBtn: 'Start ➔',
      soonBtn: 'Soon',
    },
    setup: {
      changeModule: '← Change Module',
      title: 'Practice Addition',
      subtitle: 'Short numerical answer (max 5 digits). Designed to train counting accuracy.',
      settingsHeader: '⚙️ Generator Settings',
      fitLabel: '100% Fit 1-Viewport',
      modeLabel: '1. Display Mode',
      modeSingle: '🎯 (One by One)',
      modeBatch: '📑 (All at Once)',
      digitLabel: '2. Digit Specification & Portion',
      maxDigitNotice: 'Max 5 Digits',
      customPortionPrefix: 'Custom Portion (%):',
      combosActive: 'Combinations',
      changeBtn: 'Edit ⚙️',
      totalLabel: '3. Total Questions',
      timerLabel: '4. Time Limit (Timer)',
      timerOff: 'Relaxed',
      timer5: '5 Min',
      timer10: '10 Min',
      timer15: '15 Min',
      startBtn: 'Start Practice',
    },
    practice: {
      quitBtn: '← Quit',
      qProgress: 'Question',
      ofProgress: 'of',
      jembrengTitle: 'All-in-One Mode',
      questionsCount: 'Questions',
      placeholderSingle: 'Type answer...',
      nextBtn: 'Next',
      submitBatchBtn: 'Finish & Submit ➔',
    },
    result: {
      title: 'Alhamdulillah Done! 🎉',
      subtitle: 'Your Addition Practice Results',
      scoreLabel: 'Score:',
      accuracyLabel: 'Accuracy:',
      recapHeader: 'Practice Recap:',
      btnSetup: '📝 Setup Menu',
      btnHome: '🏠 Main Menu',
    },
    quitModal: {
      title: 'Cancel Practice?',
      desc: 'Your current progress will be lost and you will return to the module setup.',
      noBtn: 'Keep Going',
      yesBtn: 'Yes, Quit',
    },
    submitModal: {
      title: 'Submit Answers?',
      desc: 'Are you sure about all your answers and ready to view your score?',
      noBtn: 'Review Again',
      yesBtn: 'Yes, Submit ✓',
    },
    footer: {
      blessing: 'جَزَاكُمُ ٱللَّٰهُ خَيْرًا • May Allah make this platform beneficial for Muslims.',
    },
    digitModal: {
      title: 'Custom Digit Specification',
      subtitle: 'Set portion of digit combinations (Max 5 digits result)',
      tabPreset: 'Instant Presets',
      tabCustom: 'Custom Portion (%)',
      autoBalance: '⚖️ Auto Balance %',
      totalPortion: 'Total Portion:',
      cancelBtn: 'Cancel',
      saveBtn: 'Save ✓',
    },
  },
  id: {
    header: {
      homeBadge: 'Menu Utama',
      modulePrefix: 'Modul:',
    },
    home: {
      badge: '🎯 Latihan Bertahap & Terstruktur',
      title: 'Pilih Modul Pembelajaran',
      subtitle: 'Silakan pilih topik materi di bawah ini untuk memulai latihan mandiri.',
      startBtn: 'Mulai ➔',
      soonBtn: 'Segera',
    },
    setup: {
      changeModule: '← Ganti Modul',
      title: 'Latihan Penjumlahan Dasar',
      subtitle: 'Soal isian singkat angka acak (maksimal 5 digit). Disusun bertahap untuk melatih ketelitian berhitung.',
      settingsHeader: '⚙️ Pengaturan Generator',
      fitLabel: '100% Fit 1-Viewport',
      modeLabel: '1. Mode Tampilan Soal',
      modeSingle: '🎯 (Satu per Satu)',
      modeBatch: '📑 (Semua Soal)',
      digitLabel: '2. Spesifikasi Digit & Porsi',
      maxDigitNotice: 'Max 5 Digit',
      customPortionPrefix: 'Kustom Porsi (%):',
      combosActive: 'Kombinasi',
      changeBtn: 'Ubah ⚙️',
      totalLabel: '3. Total Soal',
      timerLabel: '4. Batas Waktu (Timer)',
      timerOff: 'Santai',
      timer5: '5 Mnt',
      timer10: '10 Mnt',
      timer15: '15 Mnt',
      startBtn: 'Mulai Latihan',
    },
    practice: {
      quitBtn: '← Keluar',
      qProgress: 'Soal',
      ofProgress: 'dari',
      jembrengTitle: 'Mode Jembreng',
      questionsCount: 'Soal',
      placeholderSingle: 'Ketik jawaban...',
      nextBtn: 'Lanjut',
      submitBatchBtn: 'Selesai & Periksa Jawaban ➔',
    },
    result: {
      title: 'Alhamdulillah Selesai! 🎉',
      subtitle: 'Hasil Latihan Penjumlahan Kamu',
      scoreLabel: 'Nilai:',
      accuracyLabel: 'Akurasi:',
      recapHeader: 'Rekap Hasil Latihan:',
      btnSetup: '📝 Setup Soal',
      btnHome: '🏠 Menu Utama',
    },
    quitModal: {
      title: 'Batalkan Latihan?',
      desc: 'Progres jawaban saat ini akan hilang dan kamu akan kembali ke menu pengaturan modul.',
      noBtn: 'Tidak Jadi',
      yesBtn: 'Ya, Keluar',
    },
    submitModal: {
      title: 'Kirim Jawaban?',
      desc: 'Apakah kamu sudah yakin dengan seluruh jawabanmu dan siap melihat hasil nilai?',
      noBtn: 'Periksa Lagi',
      yesBtn: 'Ya, Kirim ✓',
    },
    footer: {
      blessing: 'جَزَاكُمُ ٱللَّٰهُ خَيْرًا • Semoga Allah menjadikan platform ini bermanfaat bagi kaum muslimin.',
    },
    digitModal: {
      title: 'Kustomisasi Spesifikasi Digit',
      subtitle: 'Atur porsi kombinasi digit (Maks hasil 5 digit)',
      tabPreset: 'Preset Instan',
      tabCustom: 'Kustom Porsi (%)',
      autoBalance: '⚖️ Auto Balance %',
      totalPortion: 'Total Porsi:',
      cancelBtn: 'Batal',
      saveBtn: 'Simpan ✓',
    },
  },
};

// SVG Icon Component: Bendera US/UK (EN)
const FlagEN = () => (
  <svg className="w-3.5 h-3.5 rounded-full object-cover shrink-0" viewBox="0 0 640 480">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 245 180L565 0h75v55L395 240l245 185v55h-75L320 295 75 480H0v-55l245-185L0 55V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 163v36h-48L376 317l48-36zM216 199 0 36v-36h48l216 163-48 36zm0 82L0 444v36h48l216-163-48-36zm208-82L640 36v-36h-48L376 163l48 36z"/>
    <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/>
    <path fill="#C8102E" d="M272 0h96v480h-96zM0 192h640v96H0z"/>
  </svg>
);

// SVG Icon Component: Bendera Indonesia (ID)
const FlagID = () => (
  <svg className="w-3.5 h-3.5 rounded-full object-cover shrink-0 border border-slate-700" viewBox="0 0 640 480">
    <path fill="#E70011" d="M0 0h640v240H0z"/>
    <path fill="#FFFFFF" d="M0 240h640v240H0z"/>
  </svg>
);

// ==========================================
// DATA CONSTANTS & DEFAULTS
// ==========================================
const digitPresets: DigitPreset[] = [
  { id: 'satuan', label: 'Satuan + Satuan', desc: 'Angka 1-9 (Hasil maks 18)', min: 1, max: 9 },
  { id: 'puluhan', label: 'Puluhan + Puluhan', desc: 'Angka 10-99 (Hasil maks 198)', min: 10, max: 99 },
  { id: 'ratusan', label: 'Ratusan + Ratusan', desc: 'Angka 100-999 (Hasil maks 1998)', min: 100, max: 999 },
  { id: 'ribuan', label: 'Ribuan + Ribuan', desc: 'Angka 1000-9999 (Hasil maks 19998)', min: 1000, max: 9999 },
  { id: 'campuran', label: 'Campuran Acak', desc: 'Kombinasi acak 1 sampai 4 digit', min: 1, max: 9999 },
];

const defaultCombinations: DigitCombinationItem[] = [
  // Kelompok Satuan (1d)
  { key: '1-1', group: '1d', label: 'Satuan + Satuan (1d + 1d)', maxDigitDesc: 'Maks 2 digit', digitA: 1, digitB: 1, weightPercent: 20, enabled: true },
  { key: '1-2', group: '1d', label: 'Satuan + Puluhan (1d + 2d)', maxDigitDesc: 'Maks 2 digit', digitA: 1, digitB: 2, weightPercent: 20, enabled: true },
  { key: '1-3', group: '1d', label: 'Satuan + Ratusan (1d + 3d)', maxDigitDesc: 'Maks 3 digit', digitA: 1, digitB: 3, weightPercent: 10, enabled: true },
  { key: '1-4', group: '1d', label: 'Satuan + Ribuan (1d + 4d)', maxDigitDesc: 'Maks 4 digit', digitA: 1, digitB: 4, weightPercent: 10, enabled: true },
  { key: '1-5', group: '1d', label: 'Satuan + Puluh Ribu (1d + 5d)', maxDigitDesc: 'Maks 5 digit', digitA: 1, digitB: 5, weightPercent: 10, enabled: true },
  // Kelompok Puluhan (2d)
  { key: '2-2', group: '2d', label: 'Puluhan + Puluhan (2d + 2d)', maxDigitDesc: 'Maks 3 digit', digitA: 2, digitB: 2, weightPercent: 10, enabled: true },
  { key: '2-3', group: '2d', label: 'Puluhan + Ratusan (2d + 3d)', maxDigitDesc: 'Maks 4 digit', digitA: 2, digitB: 3, weightPercent: 10, enabled: true },
  { key: '2-4', group: '2d', label: 'Puluhan + Ribuan (2d + 4d)', maxDigitDesc: 'Maks 5 digit', digitA: 2, digitB: 4, weightPercent: 10, enabled: true },
  // Kelompok Ratusan (3d)
  { key: '3-3', group: '3d', label: 'Ratusan + Ratusan (3d + 3d)', maxDigitDesc: 'Maks 4 digit', digitA: 3, digitB: 3, weightPercent: 0, enabled: false },
  { key: '3-4', group: '3d', label: 'Ratusan + Ribuan (3d + 4d)', maxDigitDesc: 'Maks 5 digit', digitA: 3, digitB: 4, weightPercent: 0, enabled: false },
  // Kelompok Ribuan (4d)
  { key: '4-4', group: '4d', label: 'Ribuan + Ribuan (4d + 4d)', maxDigitDesc: 'Maks 5 digit', digitA: 4, digitB: 4, weightPercent: 0, enabled: false },
];

const modules: ModuleItem[] = [
  {
    id: 'addition',
    title: 'Penjumlahan Dasar',
    subtitle: 'Maksimal 5 digit',
    icon: '➕',
    badgeLabel: 'Penjumlahan',
    isAvailable: true,
  },
  {
    id: 'multiplication',
    title: 'Perkalian Cepat',
    subtitle: 'Tabel perkalian dasar & logika',
    icon: '✖️',
    badgeLabel: 'Perkalian',
    isAvailable: false,
  },
  {
    id: 'fractions',
    title: 'Pecahan Sederhana',
    subtitle: 'Pengenalan nilai & penyebut',
    icon: '🍕',
    badgeLabel: 'Pecahan',
    isAvailable: false,
  },
  {
    id: 'algebra',
    title: 'Aljabar Pengantar',
    subtitle: 'Mencari variabel tersembunyi',
    icon: '🧩',
    badgeLabel: 'Aljabar',
    isAvailable: false,
  },
];

// Helper untuk konversi tingkat digit ke min/max range
const getMinMaxByDigit = (digit: number): { min: number; max: number } => {
  switch (digit) {
    case 1: return { min: 1, max: 9 };
    case 2: return { min: 10, max: 99 };
    case 3: return { min: 100, max: 999 };
    case 4: return { min: 1000, max: 9999 };
    case 5: return { min: 10000, max: 50000 };
    default: return { min: 1, max: 9 };
  }
};

// ==========================================
// 2. MAIN APP COMPONENT (TypeScript Version)
// ==========================================
export default function App() {
  // Navigation State
  const [state, setState] = useState<AppState>('home-menu');
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);

  // Language State (Default: 'en' Bahasa Inggris)
  const [lang, setLang] = useState<Language>('en');
  const t = DICTIONARY[lang]; // Shortcut kamus aktif

  // Modal State untuk Kustomisasi Digit
  const [isDigitModalOpen, setIsDigitModalOpen] = useState<boolean>(false);

  // Practice State (4 Menu Setup Parameters)
  const [config, setConfig] = useState<QuizConfig>({
    totalSoal: 5,
    timer: 'off',
    interactiveMode: 'interactive', // Default Interactive
    digitConfig: {
      mode: 'preset',
      presetId: 'satuan',
      combinations: defaultCombinations,
    },
  });

  const [tempDigitConfig, setTempDigitConfig] = useState<DigitConfig>(config.digitConfig);

  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>(''); // Single interactive input
  const [batchInputs, setBatchInputs] = useState<{ [key: string]: string }>({}); // Jembreng inputs
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Modal Confirmation States
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Countdown Timer Effect
  useEffect(() => {
    if (state !== 'practicing' || config.timer === 'off') return;

    const minutes = parseInt(config.timer, 10);
    if (isNaN(minutes)) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, config.timer]);

  // Handler Select Module
  const handleSelectModule = (mod: ModuleItem) => {
    setActiveModule(mod);
    setState('module-setup');
  };

  // Helper Auto-Balance Persentase Kustom
  const handleBalancePercentages = () => {
    const activeCombs = tempDigitConfig.combinations.filter((c) => c.enabled);
    if (activeCombs.length === 0) return;

    const equalShare = Math.floor(100 / activeCombs.length);
    const remainder = 100 % activeCombs.length;

    const updated = tempDigitConfig.combinations.map((c, idx) => {
      if (!c.enabled) return { ...c, weightPercent: 0 };
      const extra = idx < remainder ? 1 : 0;
      return { ...c, weightPercent: equalShare + extra };
    });

    setTempDigitConfig({ ...tempDigitConfig, combinations: updated });
  };

  // Math Engine: Generator Soal Berdasarkan Kustomisasi Digit / Porsi Kombinasi
  const handleStartPractice = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dConfig = config.digitConfig;
    const generated: QuestionItem[] = [];

    if (dConfig.mode === 'preset') {
      let minVal = 1;
      let maxVal = 9;
      const preset = digitPresets.find((p) => p.id === dConfig.presetId) || digitPresets[0];

      for (let i = 0; i < config.totalSoal; i++) {
        let num1: number;
        let num2: number;

        if (dConfig.presetId === 'campuran') {
          num1 = Math.floor(Math.random() * 9999) + 1;
          num2 = Math.floor(Math.random() * 9999) + 1;
        } else {
          minVal = preset.min;
          maxVal = preset.max;
          num1 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
          num2 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        }

        const sum = num1 + num2;
        generated.push({
          id: `q-${i + 1}`,
          num1,
          num2,
          operator: '+',
          correctAnswer: sum > 99999 ? 99999 : sum,
        });
      }
    } else {
      // MODE KUSTOM: Berdasarkan Alokasi Porsi Persentase (%)
      const enabledCombs = dConfig.combinations.filter((c) => c.enabled && c.weightPercent > 0);
      const pool = enabledCombs.length > 0 ? enabledCombs : [dConfig.combinations[0]];

      for (let i = 0; i < config.totalSoal; i++) {
        const rand = Math.random() * 100;
        let cumulative = 0;
        let chosen = pool[0];

        for (const item of pool) {
          cumulative += item.weightPercent;
          if (rand <= cumulative) {
            chosen = item;
            break;
          }
        }

        const rangeA = getMinMaxByDigit(chosen.digitA);
        const rangeB = getMinMaxByDigit(chosen.digitB);

        const num1 = Math.floor(Math.random() * (rangeA.max - rangeA.min + 1)) + rangeA.min;
        const num2 = Math.floor(Math.random() * (rangeB.max - rangeB.min + 1)) + rangeB.min;

        generated.push({
          id: `q-${i + 1}`,
          num1,
          num2,
          operator: '+',
          correctAnswer: num1 + num2,
        });
      }
    }

    setQuestions(generated);
    setCurrentIndex(0);
    setInputValue('');
    setBatchInputs({});
    setScore(0);

    if (config.timer !== 'off') {
      setTimeLeft(parseInt(config.timer, 10) * 60);
    }

    setState('practicing');
  };

  // Handler Submit Single Answer (Mode Interaktif)
  const handleSubmitSingleAnswer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentQ = questions[currentIndex];
    const parsedUserNum = parseInt(inputValue, 10);
    const sanitizedUserAnswer = isNaN(parsedUserNum) ? 0 : parsedUserNum;
    const isCorrect = sanitizedUserAnswer === currentQ.correctAnswer;

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...currentQ,
      userAnswer: String(sanitizedUserAnswer),
      isCorrect,
    };

    setQuestions(updatedQuestions);
    if (isCorrect) setScore((s) => s + 1);
    setInputValue('');

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Buka modal konfirmasi sebelum submit akhir soal terakhir di mode interaktif
      setIsSubmitModalOpen(true);
    }
  };

  // Handler Submit Batch (Mode Jembreng)
  const handleSubmitBatchAnswers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitModalOpen(true);
  };

  // Eksekusi akhir pemeriksaan jawaban setelah dikonfirmasi
  const handleConfirmFinalSubmit = () => {
    setIsSubmitModalOpen(false);

    if (config.interactiveMode === 'jembreng') {
      let calculatedScore = 0;
      const updatedQuestions = questions.map((q) => {
        const userValRaw = batchInputs[q.id] || '';
        const parsedUserNum = parseInt(userValRaw, 10);
        const sanitizedUserAnswer = isNaN(parsedUserNum) ? 0 : parsedUserNum;
        const isCorrect = sanitizedUserAnswer === q.correctAnswer;

        if (isCorrect) calculatedScore += 1;

        return {
          ...q,
          userAnswer: userValRaw.trim() === '' ? '-' : String(sanitizedUserAnswer),
          isCorrect,
        };
      });

      setQuestions(updatedQuestions);
      setScore(calculatedScore);
    }

    setState('result');
  };

  const handleReset = () => {
    setState('home-menu');
    setActiveModule(null);
    setCurrentIndex(0);
    setInputValue('');
    setBatchInputs({});
    setScore(0);
    setQuestions([]);
    setIsQuitModalOpen(false);
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#030D0A] text-gray-100 flex flex-col justify-between p-3 sm:p-5 select-none font-sans relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* HEADER WITH DYNAMIC STACKING CONTEXT (z-30 relative) */}
      <header className="relative w-full max-w-md mx-auto z-30">
        <div className="bg-[#0B2B22]/90 backdrop-blur-md rounded-xl px-3 py-2 flex items-center justify-between border border-emerald-800/80 shadow-lg">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-900/80 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs shadow-inner">
              IM
            </div>
            <div className="flex flex-col gap-[3px]">
              <p className="text-sm font-extrabold tracking-tight text-white leading-none block">
                Itqan<span className="text-emerald-400">Math</span>
              </p>
              <p className="text-[6px] text-emerald-300/80 uppercase font-medium tracking-wider">
                v0.1.0-alpha
              </p>
            </div>
          </div>

          {/* SISI KANAN HEADER: BADGE STATUS & PILL DROPDOWN BAHASA */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {state === 'home-menu'
                  ? t.header.homeBadge
                  : `${t.header.modulePrefix} ${activeModule?.badgeLabel}`}
              </span>
            </span>

            {/* Custom Modern Pill Dropdown Bahasa */}
            <HeaderLanguageSelector lang={lang} setLang={setLang} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA (z-10 relative) */}
      <main className="relative w-full max-w-md mx-auto flex-1 flex flex-col justify-center my-auto z-10 py-3">
        {/* STATE 1: HOME MENU */}
        {state === 'home-menu' && (
          <div className="space-y-3">
            <div className="text-center px-2 space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold">
                {t.home.badge}
              </span>
              <h1 className="text-base font-extrabold text-white tracking-wide">
                {t.home.title}
              </h1>
              <p className="text-[11px] text-gray-300 leading-snug">
                {t.home.subtitle}
              </p>
            </div>

            <div className="bg-[#0B2B22]/85 backdrop-blur-md rounded-2xl p-3 border border-emerald-500/30 shadow-2xl space-y-2 max-h-[360px] overflow-y-auto">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => handleSelectModule(mod)}
                  disabled={!mod.isAvailable}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                    mod.isAvailable
                      ? 'bg-[#030D0A]/80 border-emerald-800/80 hover:border-emerald-400 hover:bg-[#061A14] active:scale-[0.98] cursor-pointer'
                      : 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-emerald-950/60 rounded-lg border border-emerald-800/60">
                      {mod.icon}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-white">{mod.title}</h3>
                      <p className="text-[10px] text-emerald-300/70">{mod.subtitle}</p>
                    </div>
                  </div>
                  <div>
                    {mod.isAvailable ? (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                        {t.home.startBtn}
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-gray-500 bg-slate-900 px-2 py-0.5 rounded">
                        {t.home.soonBtn}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* STATE 2: MODULE SETUP */}
        {state === 'module-setup' && activeModule && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <button
                onClick={() => setState('home-menu')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                {t.setup.changeModule}
              </button>
              <span className="text-[10px] text-gray-400 font-mono">Modul 01</span>
            </div>

            <div className="text-center px-2 space-y-0.5">
              <h1 className="text-base font-extrabold text-white tracking-wide">
                {t.setup.title}
              </h1>
              <p className="text-[11px] text-gray-300 leading-snug">
                {t.setup.subtitle}
              </p>
            </div>

            <div className="bg-[#0B2B22]/85 backdrop-blur-md rounded-2xl p-3 border border-emerald-500/30 shadow-2xl space-y-2 font-sans">
              <div className="flex items-center justify-between border-b border-emerald-900/80 pb-1">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>{t.setup.settingsHeader}</span>
                </span>
                <span className="text-[9px] text-emerald-300/70 font-medium">{t.setup.fitLabel}</span>
              </div>

              <form onSubmit={handleStartPractice} className="space-y-2">
                
                {/* MENU 1: Mode Tampilan Soal */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-200 flex justify-between items-center">
                    <span>{t.setup.modeLabel}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, interactiveMode: 'interactive' })}
                      className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition-all text-center ${
                        config.interactiveMode === 'interactive'
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-[#030D0A] border-emerald-950 text-gray-300 hover:text-white'
                      }`}
                    >
                      {t.setup.modeSingle}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, interactiveMode: 'jembreng' })}
                      className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition-all text-center ${
                        config.interactiveMode === 'jembreng'
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-[#030D0A] border-emerald-950 text-gray-300 hover:text-white'
                      }`}
                    >
                      {t.setup.modeBatch}
                    </button>
                  </div>
                </div>

                {/* MENU 2: Kustomisasi Digit & Porsi Soal */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-200 flex justify-between items-center">
                    <span>{t.setup.digitLabel}</span>
                    <span className="text-[9px] text-emerald-400 font-normal">{t.setup.maxDigitNotice}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTempDigitConfig(config.digitConfig);
                      setIsDigitModalOpen(true);
                    }}
                    className="w-full px-2.5 py-1.5 bg-[#030D0A] border border-emerald-700/80 rounded-xl flex items-center justify-between hover:border-emerald-400 transition-all text-left group"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-emerald-300 group-hover:text-emerald-200">
                        {config.digitConfig.mode === 'preset'
                          ? digitPresets.find((p) => p.id === config.digitConfig.presetId)?.label
                          : `${t.setup.customPortionPrefix} ${config.digitConfig.combinations.filter(c => c.enabled).length} ${t.setup.combosActive}`}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold rounded-lg group-hover:bg-emerald-900">
                      {t.setup.changeBtn}
                    </span>
                  </button>
                </div>

                {/* MENU 3: Total Soal */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-200 flex justify-between">
                    <span>{t.setup.totalLabel}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {([5, 10, 15, 20] as TotalSoalOption[]).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setConfig({ ...config, totalSoal: val })}
                        className={`py-1 text-xs font-bold rounded-lg border transition-all text-center ${
                          config.totalSoal === val
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md'
                            : 'bg-[#030D0A] border-emerald-950 text-gray-300 hover:text-white'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MENU 4: Batas Waktu (Timer) */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-200 flex justify-between">
                    <span>{t.setup.timerLabel}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: t.setup.timerOff, val: 'off' as TimerOption },
                      { label: t.setup.timer5, val: '5' as TimerOption },
                      { label: t.setup.timer10, val: '10' as TimerOption },
                      { label: t.setup.timer15, val: '15' as TimerOption },
                    ].map((tItem) => (
                      <button
                        key={tItem.val}
                        type="button"
                        onClick={() => setConfig({ ...config, timer: tItem.val })}
                        className={`py-1 text-xs font-bold rounded-lg border transition-all text-center ${
                          config.timer === tItem.val
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md'
                            : 'bg-[#030D0A] border-emerald-950 text-gray-300 hover:text-white'
                        }`}
                      >
                        {tItem.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] mt-1"
                >
                  <span>{t.setup.startBtn} 🚀</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STATE 3: PRACTICING */}
        {state === 'practicing' && questions.length > 0 && (
          <div className="bg-[#0B2B22]/90 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30 shadow-2xl flex flex-col justify-between h-[340px]">
            <div className="flex justify-between items-center w-full text-xs text-emerald-300 font-medium border-b border-emerald-900/60 pb-2">
              <button
                type="button"
                onClick={() => setIsQuitModalOpen(true)}
                className="flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/50 px-2 py-0.5 rounded-lg transition-all"
              >
                <span>{t.practice.quitBtn}</span>
              </button>

              <span>
                {config.interactiveMode === 'interactive'
                  ? `${t.practice.qProgress} ${currentIndex + 1} ${t.practice.ofProgress} ${questions.length}`
                  : `${t.practice.jembrengTitle} (${questions.length} ${t.practice.questionsCount})`}
              </span>

              {config.timer !== 'off' && (
                <span className="text-amber-400 font-mono font-bold">
                  ⏱️ {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                </span>
              )}
            </div>

            {config.interactiveMode === 'interactive' ? (
              <div className="flex flex-col justify-between flex-1 py-2">
                <div className="flex items-center justify-center gap-4 my-auto">
                  <span className="text-4xl font-extrabold text-white font-mono">{questions[currentIndex].num1}</span>
                  <span className="text-3xl font-bold text-emerald-400">{questions[currentIndex].operator}</span>
                  <span className="text-4xl font-extrabold text-white font-mono">{questions[currentIndex].num2}</span>
                  <span className="text-3xl font-bold text-emerald-400">=</span>
                </div>

                <form onSubmit={handleSubmitSingleAnswer} className="flex gap-2 w-full">
                  <input
                    autoFocus
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value;
                      if (val.startsWith('-')) return;
                      setInputValue(val);
                    }}
                    onWheel={(e: WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault();
                    }}
                    placeholder={t.practice.placeholderSingle}
                    className="w-full px-3 py-2 bg-slate-950/90 border border-emerald-600/60 rounded-xl text-center text-lg font-bold text-emerald-100 focus:outline-none focus:border-emerald-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all active:scale-95"
                  >
                    {t.practice.nextBtn}
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleSubmitBatchAnswers} className="flex flex-col justify-between flex-1 pt-2 space-y-2">
                <div className="space-y-1.5 overflow-y-auto max-h-[230px] pr-1 custom-scrollbar">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="p-2 rounded-xl bg-[#030D0A]/80 border border-emerald-950 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold text-[10px] w-4">{idx + 1}.</span>
                        <span className="font-bold text-white text-sm">
                          {q.num1} {q.operator} {q.num2} =
                        </span>
                      </div>
                      <input
                        autoFocus={idx === 0}
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={batchInputs[q.id] || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const val = e.target.value;
                          if (val.startsWith('-')) return;
                          setBatchInputs({ ...batchInputs, [q.id]: val });
                        }}
                        onWheel={(e: WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault();
                        }}
                        placeholder="?"
                        className="w-20 px-2 py-1 bg-[#0B2B22] border border-emerald-600/60 rounded-lg text-center text-sm font-bold text-emerald-100 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
                >
                  {t.practice.submitBatchBtn}
                </button>
              </form>
            )}
          </div>
        )}

        {/* STATE 4: RESULT SCREEN */}
        {state === 'result' && (
          <div className="bg-[#0B2B22]/90 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30 shadow-2xl flex flex-col gap-3">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-extrabold text-white">{t.result.title}</h2>
              <p className="text-xs text-emerald-300">{t.result.subtitle}</p>
            </div>

            <div className="bg-[#030D0A]/80 p-3 rounded-xl border border-emerald-950 text-center space-y-1">
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {t.result.scoreLabel} {Math.round((score / questions.length) * 100)}
              </div>
              <div className="text-[11px] font-semibold text-emerald-200">
                {t.result.accuracyLabel} {score} / {questions.length} = {Math.round((score / questions.length) * 100)}%
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block px-1 text-left">
                {t.result.recapHeader}
              </span>
              <div className="max-h-[140px] overflow-y-auto space-y-1.5 pr-1 text-xs">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`p-2 rounded-xl border flex items-center justify-between text-xs font-mono font-medium transition-all ${
                      q.isCorrect
                        ? 'bg-[#061A14]/90 border-emerald-800/80 text-emerald-300'
                        : 'bg-[#1C0A0E]/90 border-rose-900/80 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-[11px] font-bold w-4">{idx + 1}.</span>
                      <span className="tracking-wide font-bold">
                        {q.num1} {q.operator} {q.num2} =
                      </span>
                    </div>

                    <div className="text-right flex items-center gap-1.5 font-bold">
                      {q.isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span>✓</span>
                          <span>{q.userAnswer}</span>
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="line-through text-rose-400/90 decoration-rose-400 decoration-2">
                            {q.userAnswer || '-'}
                          </span>
                          <span className="text-emerald-400 font-bold">
                            ({q.correctAnswer})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setState('module-setup')}
                className="w-1/2 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
              >
                {t.result.btnSetup}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-1/2 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md active:scale-95"
              >
                {t.result.btnHome}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODAL KONFIRMASI KELUAR LATIHAN */}
      {isQuitModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-[#0B2B22] border border-rose-500/40 rounded-2xl w-full max-w-xs p-4 space-y-3 shadow-2xl text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-lg font-bold">
              ⚠️
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">{t.quitModal.title}</h3>
              <p className="text-[11px] text-gray-300 mt-1 leading-snug">
                {t.quitModal.desc}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsQuitModalOpen(false)}
                className="w-1/2 py-2 bg-slate-900 hover:bg-slate-800 text-gray-300 font-bold text-xs rounded-xl border border-slate-700"
              >
                {t.quitModal.noBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsQuitModalOpen(false);
                  setState('module-setup');
                }}
                className="w-1/2 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md"
              >
                {t.quitModal.yesBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI SUBMIT AKHIR JAWABAN */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-[#0B2B22] border border-emerald-500/40 rounded-2xl w-full max-w-xs p-4 space-y-3 shadow-2xl text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg font-bold">
              📝
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">{t.submitModal.title}</h3>
              <p className="text-[11px] text-gray-300 mt-1 leading-snug">
                {t.submitModal.desc}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-1/2 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl border border-slate-700"
              >
                {t.submitModal.noBtn}
              </button>
              <button
                type="button"
                onClick={handleConfirmFinalSubmit}
                className="w-1/2 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md"
              >
                {t.submitModal.yesBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KUSTOMISASI SPESIFIKASI DIGIT & PORSI (%) */}
      {isDigitModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-[#0B2B22] border border-emerald-500/40 rounded-2xl w-full max-w-sm p-4 space-y-3 shadow-2xl max-h-[540px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-emerald-900/80 pb-2">
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">Kustomisasi Spesifikasi Digit</h2>
                <p className="text-[10px] text-emerald-300/80">Atur porsi kombinasi digit (Maks hasil 5 digit)</p>
              </div>
              <button
                type="button"
                onClick={() => setIsDigitModalOpen(false)}
                className="text-gray-400 hover:text-white text-sm font-bold px-1.5"
              >
                ✕
              </button>
            </div>

            {/* Mode Tab: Preset vs Custom */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#030D0A] rounded-xl border border-emerald-950">
              <button
                type="button"
                onClick={() => setTempDigitConfig({ ...tempDigitConfig, mode: 'preset' })}
                className={`py-1 text-[11px] font-bold rounded-lg transition-all ${
                  tempDigitConfig.mode === 'preset'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Preset Instan
              </button>
              <button
                type="button"
                onClick={() => setTempDigitConfig({ ...tempDigitConfig, mode: 'custom' })}
                className={`py-1 text-[11px] font-bold rounded-lg transition-all ${
                  tempDigitConfig.mode === 'custom'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Kustom Porsi (%)
              </button>
            </div>

            {/* CONTENT PRESET */}
            {tempDigitConfig.mode === 'preset' ? (
              <div className="space-y-1.5 overflow-y-auto max-h-[300px] pr-1">
                {digitPresets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setTempDigitConfig({ ...tempDigitConfig, presetId: p.id })}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      tempDigitConfig.presetId === p.id
                        ? 'bg-emerald-950/80 border-emerald-400 text-white'
                        : 'bg-[#030D0A]/70 border-emerald-950 text-gray-300 hover:border-emerald-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-emerald-300">{p.label}</div>
                      <div className="text-[10px] text-gray-400">{p.desc}</div>
                    </div>
                    {tempDigitConfig.presetId === p.id && (
                      <span className="text-emerald-400 font-bold text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              /* CONTENT CUSTOM PORSI (%) */
              <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] text-emerald-300 font-medium">Bagi Rata Otomatis:</span>
                  <button
                    type="button"
                    onClick={handleBalancePercentages}
                    className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold rounded-lg hover:bg-emerald-900"
                  >
                    ⚖️ Auto Balance %
                  </button>
                </div>

                {(['1d', '2d', '3d', '4d'] as const).map((grp) => {
                  const items = tempDigitConfig.combinations.filter((c) => c.group === grp);
                  const grpNames = { '1d': 'Kelompok Satuan (1d)', '2d': 'Kelompok Puluhan (2d)', '3d': 'Kelompok Ratusan (3d)', '4d': 'Kelompok Ribuan (4d)' };
                  return (
                    <div key={grp} className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-1">
                        {grpNames[grp]}
                      </span>
                      {items.map((item) => (
                        <div
                          key={item.key}
                          className="p-2 rounded-xl bg-[#030D0A]/80 border border-emerald-950 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.enabled}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const updated = tempDigitConfig.combinations.map((c) =>
                                  c.key === item.key ? { ...c, enabled: checked, weightPercent: checked ? c.weightPercent : 0 } : c
                                );
                                setTempDigitConfig({ ...tempDigitConfig, combinations: updated });
                              }}
                              className="w-3.5 h-3.5 accent-emerald-500 rounded cursor-pointer"
                            />
                            <div>
                              <div className="font-bold text-white text-[11px]">{item.label}</div>
                              <div className="text-[9px] text-gray-400">{item.maxDigitDesc}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              disabled={!item.enabled}
                              min="0"
                              max="100"
                              value={item.weightPercent}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10) || 0;
                                const updated = tempDigitConfig.combinations.map((c) =>
                                  c.key === item.key ? { ...c, weightPercent: Math.max(0, Math.min(100, val)) } : c
                                );
                                setTempDigitConfig({ ...tempDigitConfig, combinations: updated });
                              }}
                              className="w-10 px-1 py-0.5 bg-slate-950 border border-emerald-800 rounded text-center font-mono font-bold text-emerald-300 text-xs disabled:opacity-40"
                            />
                            <span className="text-[10px] text-gray-400">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Modal Actions */}
            <div className="border-t border-emerald-900/80 pt-2 flex justify-between items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono">
                Total Porsi:{' '}
                <strong
                  className={
                    tempDigitConfig.mode === 'preset' ||
                    tempDigitConfig.combinations.filter(c => c.enabled).reduce((sum, c) => sum + c.weightPercent, 0) === 100
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }
                >
                  {tempDigitConfig.mode === 'preset'
                    ? '100%'
                    : `${tempDigitConfig.combinations.filter(c => c.enabled).reduce((sum, c) => sum + c.weightPercent, 0)}%`}
                </strong>
              </span>

              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsDigitModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-900 text-gray-300 text-xs font-bold rounded-lg border border-slate-800"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={
                    tempDigitConfig.mode === 'custom' &&
                    tempDigitConfig.combinations.filter(c => c.enabled).reduce((sum, c) => sum + c.weightPercent, 0) !== 100
                  }
                  onClick={() => {
                    setConfig({ ...config, digitConfig: tempDigitConfig });
                    setIsDigitModalOpen(false);
                  }}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-800 disabled:text-gray-500 text-slate-950 text-xs font-bold rounded-lg shadow-md transition-all"
                >
                  Simpan ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full max-w-md mx-auto z-10 text-center space-y-0.5">
        <p className="text-[10px] text-emerald-300/80 font-medium">
          {t.footer.blessing}
        </p>
        <p className="text-[9px] text-gray-400">
          &copy; 2026 ItqanMath • Built with reza-ui
        </p>
      </footer>
    </div>
  );
}

// ==========================================
// HELPER COMPONENT: STACKING-CONTEXT PROOF LANGUAGE SELECTOR
// ==========================================
function HeaderLanguageSelector({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Tutup dropdown otomatis ketika mengklik di luar area container (tanpa backdrop overlay)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Pill Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 border border-emerald-700/60 hover:border-emerald-400 rounded-full text-emerald-300 shadow-sm transition-all cursor-pointer active:scale-95"
      >
        {lang === 'en' ? <FlagEN /> : <FlagID />}
        <span className="text-[10px] font-mono font-bold uppercase">{lang}</span>
        <span className="text-[8px] text-emerald-400 leading-none">▾</span>
      </button>

      {/* Floating Menu Popover (z-[9999] without backdrop block) */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 bg-[#0B2B22] border border-emerald-500/50 rounded-xl shadow-2xl z-[9999] p-1 flex flex-col gap-1 pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={() => {
              setLang('en');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer pointer-events-auto select-none transition-all text-gray-300 hover:bg-emerald-950/80 hover:text-white"
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <FlagEN />
              <span>English (EN)</span>
            </div>
            {lang === 'en' && <span className="text-emerald-400 text-[10px]">✓</span>}
          </button>

          <button
            type="button"
            onClick={() => {
              setLang('id');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer pointer-events-auto select-none transition-all text-gray-300 hover:bg-emerald-950/80 hover:text-white"
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <FlagID />
              <span>Indonesia (ID)</span>
            </div>
            {lang === 'id' && <span className="text-emerald-400 text-[10px]">✓</span>}
          </button>
        </div>
      )}
    </div>
  );
}