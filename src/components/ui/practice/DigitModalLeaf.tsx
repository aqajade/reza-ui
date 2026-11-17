'use client';
// src/components/ui/practice/DigitModalLeaf.tsx
// Sub-leaf: Modal Kustomisasi Spesifikasi Digit
// Doktrin: rscoClsDdSdDryZaapeiFpSMbBip
//   - CLS: 'use client' — daun interaktif murni (tab state, temp state, validasi).
//   - ZAAPEI: Zero interface, zero any/as, zero raw HTML wrapper di luar modal shell.
//   - DD: Semua data preset dari SSOT (itqanDigitPresets, itqanDefaultCombinations).
//   - 1-Viewport Safe: modal max-h-[85dvh], scroll internal combination list.

import { useState } from 'react';
import { calculateAutoBalance } from '@/lib/math-engine/addition-generator';
import { itqanDigitPresets } from '@/data/itqan-math/digits';
import { cn } from '@/lib/utils';
import { Button } from '@/components/layout/button/button';
import type {
  DigitCombinationItem,
  DigitConfig,
  DigitPresetId,
  TranslationSchema,
} from '@/types/math/itqan-math';

// ==========================================
// Tipe Internal
// ==========================================

type DigitModalTab = 'preset' | 'custom';

export type DigitModalLeafProps = {
  t: TranslationSchema;
  digitConfig: DigitConfig;
  onSave: (newDigitConfig: DigitConfig) => void;
  onCancel: () => void;
};

// ==========================================
// DigitModalLeaf Component
// ==========================================

export function DigitModalLeaf({ t, digitConfig, onSave, onCancel }: DigitModalLeafProps) {
  // Tab aktif: 'preset' | 'custom'
  const [activeTab, setActiveTab] = useState<DigitModalTab>(digitConfig.mode);

  // Temp config — perubahan di modal TIDAK merusak config utama sampai Save ditekan
  const [tempPresetId, setTempPresetId] = useState<DigitPresetId>(digitConfig.presetId);
  const [tempCombinations, setTempCombinations] = useState<DigitCombinationItem[]>(
    digitConfig.combinations,
  );

  // ==========================================
  // Kalkulasi Validasi: total porsi kombinasi aktif
  // ==========================================
  const totalPercent = tempCombinations
    .filter((c) => c.enabled)
    .reduce((acc, c) => acc + c.weightPercent, 0);

  const isSaveDisabled = activeTab === 'custom' && totalPercent !== 100;

  // ==========================================
  // Handler: Toggle kombinasi enabled/disabled
  // ==========================================
  const handleToggleCombination = (key: string) => {
    setTempCombinations((prev) =>
      prev.map((c) =>
        c.key === key
          ? {
              ...c,
              enabled: !c.enabled,
              // Jika di-disable, reset porsi ke 0
              weightPercent: c.enabled ? 0 : c.weightPercent,
            }
          : c,
      ),
    );
  };

  // ==========================================
  // Handler: Ubah nilai weightPercent kombinasi
  // ==========================================
  const handleWeightChange = (key: string, rawValue: string) => {
    const parsed = parseInt(rawValue, 10);
    const clamped = isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed));
    setTempCombinations((prev) =>
      prev.map((c) => (c.key === key ? { ...c, weightPercent: clamped } : c)),
    );
  };

  // ==========================================
  // Handler: Auto Balance %
  // ==========================================
  const handleAutoBalance = () => {
    setTempCombinations((prev) => calculateAutoBalance(prev));
  };

  // ==========================================
  // Handler: Save — commit temp state ke parent
  // ==========================================
  const handleSave = () => {
    onSave({
      mode: activeTab,
      presetId: tempPresetId,
      combinations: tempCombinations,
    });
  };

  // ==========================================
  // Render: Modal Shell
  // Wrapper: fixed overlay backdrop + centered card
  // ==========================================
  return (
    // Backdrop (overlay tipis tanpa memblokir stacking context parent — tidak ada pointer-events-none)
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-3 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t.digitModal.title}
    >
      {/* Modal Card — max-h safe untuk 1-viewport 360px × 680px */}
      <div className="flex w-full max-w-sm flex-col gap-3 overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#030D0A] p-4 shadow-2xl max-h-[85dvh]">

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-extrabold text-white">{t.digitModal.title}</h2>
            <p className="text-[10px] leading-snug text-emerald-300/80">{t.digitModal.subTitle}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close modal"
            className="mt-0.5 shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-emerald-900/40 hover:text-white"
          >
            <span aria-hidden="true" className="text-sm leading-none">✕</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div
          role="tablist"
          className="grid grid-cols-2 gap-1 rounded-xl border border-emerald-900/60 bg-[#030D0A]/80 p-1"
        >
          {(
            [
              { id: 'preset', label: t.digitModal.tabPreset },
              { id: 'custom', label: t.digitModal.tabCustom },
            ] as { id: DigitModalTab; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'rounded-lg py-1.5 text-[11px] font-bold transition-all',
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-gray-400 hover:text-white',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Instant Presets */}
        {activeTab === 'preset' && (
          <div className="flex flex-col gap-1.5 overflow-y-auto min-h-0">
            {itqanDigitPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setTempPresetId(preset.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl border p-2.5 text-left transition-all',
                  tempPresetId === preset.id
                    ? 'border-emerald-500/60 bg-emerald-950/80 text-emerald-200'
                    : 'border-emerald-900/40 bg-[#030D0A]/60 text-gray-300 hover:border-emerald-700 hover:text-white',
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold">{preset.label}</span>
                  <span className="text-[10px] text-emerald-300/70">{preset.description}</span>
                </div>
                {tempPresetId === preset.id && (
                  <span className="shrink-0 text-xs font-bold text-emerald-400">✓</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Tab: Custom Portion (%) */}
        {activeTab === 'custom' && (
          <div className="flex flex-col gap-2 min-h-0">
            {/* Auto Balance + Total Portion Bar */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleAutoBalance}
                className="shrink-0 rounded-lg border border-emerald-700/60 bg-emerald-950/60 px-2 py-1 text-[10px] font-bold text-emerald-300 transition-colors hover:bg-emerald-900/60 hover:text-white"
              >
                {t.digitModal.autoBalance}
              </button>
              <span
                className={cn(
                  'rounded-lg px-2 py-1 text-[10px] font-bold',
                  totalPercent === 100
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-red-500/15 text-red-400',
                )}
              >
                {t.digitModal.totalPortion} {totalPercent}%
              </span>
            </div>

            {/* Combination List — scroll internal */}
            <div className="flex flex-col gap-1 overflow-y-auto min-h-0 max-h-[260px] pr-0.5">
              {tempCombinations.map((combo) => (
                <div
                  key={combo.key}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border p-2 transition-all',
                    combo.enabled
                      ? 'border-emerald-800/60 bg-[#061A14]'
                      : 'border-slate-900/60 bg-slate-950/40 opacity-50',
                  )}
                >
                  {/* Toggle checkbox */}
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={combo.enabled}
                    onClick={() => handleToggleCombination(combo.key)}
                    className={cn(
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[9px] font-bold transition-all',
                      combo.enabled
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                        : 'border-gray-600 bg-transparent text-transparent',
                    )}
                  >
                    ✓
                  </button>

                  {/* Label */}
                  <div className="flex flex-1 flex-col gap-0 min-w-0">
                    <span className="truncate text-[10px] font-bold text-white">
                      {combo.label}
                    </span>
                    <span className="text-[9px] text-emerald-300/60">
                      {combo.maxDigitDescription}
                    </span>
                  </div>

                  {/* Weight Input */}
                  <div className="flex shrink-0 items-center gap-0.5">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={100}
                      disabled={!combo.enabled}
                      value={combo.enabled ? combo.weightPercent : 0}
                      onChange={(e) => handleWeightChange(combo.key, e.target.value)}
                      onKeyDown={(e) => {
                        if (['.', ',', 'e', 'E', '+', '-'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onWheel={(e) => e.currentTarget.blur()}
                      className="w-10 rounded-lg border border-emerald-800/60 bg-[#030D0A] py-0.5 text-center text-[11px] font-bold text-white focus:border-emerald-500 focus:outline-none disabled:opacity-40"
                    />
                    <span className="text-[10px] text-emerald-400/70">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer: Cancel + Save */}
        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            fullWidth
            onClick={onCancel}
          >
            {t.digitModal.cancelBtn}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            fullWidth
            disabled={isSaveDisabled}
            onClick={handleSave}
          >
            {t.digitModal.saveBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
