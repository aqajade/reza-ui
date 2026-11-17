'use client';
// src/components/ui/practice/ModuleSetupView.tsx
// Sub-leaf untuk State 2: 'module-setup' (Konfigurasi Generator Soal)
// Doktrin: rscoClsDdSdDryZaapeiFpSMbBip
//   - CLS: 'use client' — daun interaktif.
//   - ZAAPEI: Zero interface, zero any/as, zero raw HTML wrapper di level layout.
//   - DD: Semua teks dari TranslationSchema SSOT. Semua opsi dari konstanta typed.
//   - Zero Element: Kontrol form menggunakan <fieldset> semantik, bukan div telanjang.
//   - 1-Viewport Safe: Seluruh setup card tanpa scroll eksternal.

import type {
  InteractiveModeOption,
  Language,
  ModuleItem,
  QuizConfig,
  TimerOption,
  TotalQuestionsOption,
  TranslationSchema,
} from '@/types/math/itqan-math';
import { Button } from '@/components/layout/button/button';
import { itqanDigitPresetsMap } from '@/data/itqan-math/digits';
import { cn } from '@/lib/utils';

// ==========================================
// Konstanta Opsi — Zero hardcode di JSX (DD)
// ==========================================

type LabeledOption<T> = { value: T; label: string };

const TOTAL_OPTIONS: readonly LabeledOption<TotalQuestionsOption>[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
];

function getTimerOptions(t: TranslationSchema): readonly LabeledOption<TimerOption>[] {
  return [
    { value: 'off', label: t.setup.timerOff },
    { value: '5', label: t.setup.timer5 },
    { value: '10', label: t.setup.timer10 },
    { value: '15', label: t.setup.timer15 },
  ];
}

// ==========================================
// Props
// ==========================================

export type ModuleSetupViewProps = {
  lang: Language;
  t: TranslationSchema;
  module: ModuleItem;
  config: QuizConfig;
  onChangeConfig: (newConfig: QuizConfig) => void;
  onBackToHome: () => void;
  onOpenDigitModal: () => void;
  onStartPractice: () => void;
};

// ==========================================
// Shared Pill Button untuk parameter toggle
// ==========================================

type PillButtonProps<T extends string | number> = {
  value: T;
  selected: T;
  label: string;
  onClick: (v: T) => void;
};

function PillButton<T extends string | number>({
  value,
  selected,
  label,
  onClick,
}: PillButtonProps<T>) {
  const isActive = value === selected;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        'flex-1 rounded-lg border py-1.5 text-[11px] font-bold transition-all text-center',
        isActive
          ? 'border-emerald-400 bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
          : 'border-emerald-950 bg-[#030D0A] text-gray-300 hover:text-white',
      )}
    >
      {label}
    </button>
  );
}

// ==========================================
// ModuleSetupView Component
// ==========================================

export function ModuleSetupView({
  lang = 'en',
  t,
  module,
  config,
  onChangeConfig,
  onBackToHome,
  onOpenDigitModal,
  onStartPractice,
}: ModuleSetupViewProps) {
  const timerOptions = getTimerOptions(t);

  // ==========================================
  // Helper updater untuk partial config changes
  // ==========================================
  const setInteractiveMode = (interactiveMode: InteractiveModeOption) =>
    onChangeConfig({ ...config, interactiveMode });

  const setTotalQuestions = (totalQuestions: TotalQuestionsOption) =>
    onChangeConfig({ ...config, totalQuestions });

  const setTimer = (timer: TimerOption) => onChangeConfig({ ...config, timer });

  // ==========================================
  // Digit display: label untuk tombol Digit Specification
  // ==========================================
  const currentPresets = itqanDigitPresetsMap[lang ?? 'en'] ?? itqanDigitPresetsMap.en;
  const activePreset = currentPresets.find((p) => p.id === config.digitConfig.presetId);

  const digitBtnLabel =
    config.digitConfig.mode === 'preset'
      ? activePreset?.label ??
        config.digitConfig.presetId.charAt(0).toUpperCase() +
          config.digitConfig.presetId.slice(1)
      : (() => {
          const activeCount = config.digitConfig.combinations.filter((c) => c.enabled).length;
          return `${activeCount} ${t.setup.combosActive}`;
        })();

  return (
    <div className="flex flex-col gap-3">
      {/* Navigation Bar: ← Change Module */}
      <div className="flex items-center justify-between px-0.5">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300 active:scale-95"
        >
          {t.setup.changeModule}
        </button>
        <span className="font-mono text-[10px] uppercase text-gray-400">
          {module.badgeLabel}
        </span>
      </div>

      {/* Module Overview Header */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <div className="mb-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xl">
          {module.icon}
        </div>
        <h2 className="text-base font-extrabold tracking-wide text-white">{t.setup.title}</h2>
        <p className="text-[11px] leading-snug text-gray-300">{t.setup.subTitle}</p>
      </div>

      {/* Settings Card */}
      <div className="flex flex-col gap-2.5 rounded-2xl border border-emerald-500/30 bg-[#0B2B22]/85 p-3 shadow-2xl backdrop-blur-md">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/80 pb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white">
            {t.setup.settingsHeader}
          </span>
          <span className="text-[9px] font-medium text-emerald-300/70">{t.setup.fitLabel}</span>
        </div>

        {/* ——————————————————————————————————————————————
            Checklist 2 & 4: 4 Kontrol <fieldset> semantik
            (Zero Element — tidak ada div telanjang sebagai wrapper kontrol)
            —————————————————————————————————————————————— */}

        {/* PARAM 1: Display Mode */}
        <fieldset className="flex flex-col gap-1.5 border-0 p-0 m-0">
          <legend className="w-full text-[11px] font-bold text-gray-200">
            {t.setup.modeLabel}
          </legend>
          <div className="flex gap-1.5">
            <PillButton<InteractiveModeOption>
              value="interactive"
              selected={config.interactiveMode}
              label={t.setup.modeSingle}
              onClick={setInteractiveMode}
            />
            <PillButton<InteractiveModeOption>
              value="jembreng"
              selected={config.interactiveMode}
              label={t.setup.modeBatch}
              onClick={setInteractiveMode}
            />
          </div>
        </fieldset>

        {/* PARAM 2: Digit Specification */}
        <fieldset className="flex flex-col gap-1.5 border-0 p-0 m-0">
          <legend className="flex w-full items-center justify-between text-[11px] font-bold text-gray-200">
            <span>{t.setup.digitLabel}</span>
            <span className="text-[9px] font-medium text-emerald-400/80">
              {t.setup.maxDigitNotice}
            </span>
          </legend>
          <button
            type="button"
            onClick={onOpenDigitModal}
            className="flex w-full items-center justify-between rounded-xl border border-emerald-800/60 bg-[#030D0A]/80 px-3 py-2 text-left transition-all hover:border-emerald-600"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-white">{digitBtnLabel}</span>
              {config.digitConfig.mode === 'custom' && (
                <span className="text-[9px] text-emerald-300/70">
                  {t.setup.customPortionPrefix}
                </span>
              )}
            </div>
            <span className="rounded-lg border border-emerald-700/50 bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
              {t.setup.changeBtn}
            </span>
          </button>
        </fieldset>

        {/* PARAM 3: Total Questions */}
        <fieldset className="flex flex-col gap-1.5 border-0 p-0 m-0">
          <legend className="w-full text-[11px] font-bold text-gray-200">
            {t.setup.totalLabel}
          </legend>
          <div className="flex gap-1.5">
            {TOTAL_OPTIONS.map((opt) => (
              <PillButton<TotalQuestionsOption>
                key={opt.value}
                value={opt.value}
                selected={config.totalQuestions}
                label={opt.label}
                onClick={setTotalQuestions}
              />
            ))}
          </div>
        </fieldset>

        {/* PARAM 4: Time Limit (Timer) */}
        <fieldset className="flex flex-col gap-1.5 border-0 p-0 m-0">
          <legend className="w-full text-[11px] font-bold text-gray-200">
            {t.setup.timerLabel}
          </legend>
          <div className="flex gap-1.5">
            {timerOptions.map((opt) => (
              <PillButton<TimerOption>
                key={opt.value}
                value={opt.value}
                selected={config.timer}
                label={opt.label}
                onClick={setTimer}
              />
            ))}
          </div>
        </fieldset>

        {/* CTA: Start Practice */}
        <Button
          type="button"
          onClick={onStartPractice}
          size="md"
          fullWidth
          className="mt-0.5"
        >
          <span>{t.setup.startBtn}</span>
          <span aria-hidden="true" className="text-xs">🚀</span>
        </Button>
      </div>
    </div>
  );
}
