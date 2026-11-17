'use client';
// src/components/ui/practice/HomeMenuView.tsx
// Sub-leaf untuk State 1: 'home-menu' (Pemilihan Modul Pembelajaran Tadarruj)
// Mengikuti Doktrin: rscoClsDdSdDryZaapeiFpSMbBip (CLS, Zero Interface, Strict English Naming)

import type { Language, ModuleId, ModuleItem, TranslationSchema } from '@/types/math/itqan-math';

export type HomeMenuViewProps = {
  lang: Language;
  t: TranslationSchema;
  modules: readonly ModuleItem[];
  onSelectModule: (moduleId: ModuleId) => void;
};

export function HomeMenuView({
  t,
  modules,
  onSelectModule,
}: HomeMenuViewProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Module List Container (max-h fit 1-viewport, internal scroll) */}
      <div className="flex max-h-[340px] flex-col gap-2 overflow-y-auto pr-0.5">
        {modules.map((mod) => (
          <button
            key={mod.id}
            type="button"
            onClick={() => onSelectModule(mod.id)}
            disabled={!mod.isAvailable}
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-2.5 text-left transition-all ${
              mod.isAvailable
                ? 'border-emerald-800/80 bg-[#030D0A]/80 hover:border-emerald-400 hover:bg-[#061A14] active:scale-[0.99]'
                : 'cursor-not-allowed border-slate-900 bg-slate-950/40 opacity-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-800/60 bg-emerald-950/60 text-lg">
                {mod.icon}
              </span>
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-white leading-snug">
                  {mod.title}
                </h3>
                <p className="text-[10px] text-emerald-300/70 leading-tight">
                  {mod.subTitle}
                </p>
              </div>
            </div>
            <div>
              {mod.isAvailable ? (
                <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                  {t.home.startBtn}
                </span>
              ) : (
                <span className="rounded bg-slate-900 px-2 py-0.5 text-[9px] font-semibold text-gray-500">
                  {t.home.soonBtn}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
