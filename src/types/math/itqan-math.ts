// src/types/math/itqan-math.ts
// Kontrak Tipe Data Murni Math Engine & Lifecycle ItqanMath
// Sesuai Doktrin rscoclsddsddryzaapfpsmbip & ADR 1 (Strict type, Zero interface)
// dan Aturan Emas #13 (Strict English Naming)

export type AppState = 'home-menu' | 'module-setup' | 'practicing' | 'result';

export type ModuleId = 'addition' | 'multiplication' | 'fractions' | 'algebra';

export type TimerOption = 'off' | '5' | '10' | '15';

export type TotalQuestionsOption = 5 | 10 | 15 | 20;

export type InteractiveModeOption = 'interactive' | 'jembreng';

// Digit Specification Mode
export type DigitMode = 'preset' | 'custom';

export type DigitPresetId = 'satuan' | 'puluhan' | 'ratusan' | 'ribuan' | 'campuran';

// Digit Combination Key Pairs (1-1 to 4-4)
export type DigitCombinationKey =
  | '1-1'
  | '1-2'
  | '1-3'
  | '1-4'
  | '1-5'
  | '2-2'
  | '2-3'
  | '2-4'
  | '3-3'
  | '3-4'
  | '4-4';

export type DigitCombinationGroup = '1d' | '2d' | '3d' | '4d';

export type DigitCombinationItem = {
  key: DigitCombinationKey;
  group: DigitCombinationGroup;
  label: string;
  maxDigitDescription: string;
  digitA: number; // 1 to 4
  digitB: number; // 1 to 5
  weightPercent: number; // Portion in %
  enabled: boolean;
};

export type DigitPreset = {
  id: DigitPresetId;
  label: string;
  description: string;
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
  subTitle: string;
  icon: string;
  badgeLabel: string;
  isAvailable: boolean;
};

export type QuizConfig = {
  totalQuestions: TotalQuestionsOption;
  timer: TimerOption;
  interactiveMode: InteractiveModeOption;
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
// Multilanguage Types
// ==========================================
export type Language = 'en' | 'id';

export type LanguageOption = {
  code: Language;
  label: string;
};

export type TranslationSchema = {
  header: {
    homeBadge: string;
    modulePrefix: string;
  };
  home: {
    badge: string;
    title: string;
    subTitle: string;
    startBtn: string;
    soonBtn: string;
  };
  setup: {
    changeModule: string;
    title: string;
    subTitle: string;
    settingsHeader: string;
    fitLabel: string;
    modeLabel: string;
    modeSingle: string;
    modeBatch: string;
    digitLabel: string;
    maxDigitNotice: string;
    customPortionPrefix: string;
    combosActive: string;
    changeBtn: string;
    totalLabel: string;
    timerLabel: string;
    timerOff: string;
    timer5: string;
    timer10: string;
    timer15: string;
    startBtn: string;
  };
  practice: {
    quitBtn: string;
    qProgress: string;
    ofProgress: string;
    jembrengTitle: string;
    questionsCount: string;
    placeholderSingle: string;
    nextBtn: string;
    submitBatchBtn: string;
  };
  result: {
    title: string;
    subTitle: string;
    scoreLabel: string;
    accuracyLabel: string;
    recapHeader: string;
    btnSetup: string;
    btnHome: string;
  };
  quitModal: {
    title: string;
    description: string;
    noBtn: string;
    yesBtn: string;
  };
  submitModal: {
    title: string;
    description: string;
    noBtn: string;
    yesBtn: string;
  };
  footer: {
    blessing: string;
  };
  digitModal: {
    title: string;
    subTitle: string;
    tabPreset: string;
    tabCustom: string;
    autoBalance: string;
    totalPortion: string;
    cancelBtn: string;
    saveBtn: string;
  };
};
