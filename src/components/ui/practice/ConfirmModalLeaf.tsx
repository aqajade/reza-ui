'use client';
// src/components/ui/practice/ConfirmModalLeaf.tsx
// Sub-leaf: Reusable Confirmation Modal (Quit & Submit)
// Doktrin: rscoClsDdSdDryZaapeiFpSMBip
//   - CLS: 'use client' daun interaktif murni.
//   - ZAAPEI: Zero interface, zero any/as, zero raw HTML layout.
//   - DD: Teks murni dari SSOT TranslationSchema (quitModal & submitModal).
//   - 1-Viewport Safe: Fixed backdrop z-50, dialog terpusat, kompak.

import { Button } from '@/components/layout/button/button';

export type ConfirmModalLeafProps = {
  isOpen: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  confirmVariant?: 'danger' | 'primary';
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmModalLeaf({
  isOpen,
  title,
  description,
  cancelLabel,
  confirmLabel,
  confirmVariant = 'primary',
  onCancel,
  onConfirm,
}: ConfirmModalLeafProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-xs rounded-2xl border border-gray-700/80 bg-gray-900/95 p-4 shadow-2xl backdrop-blur-md sm:max-w-sm">
        {/* Header Modal */}
        <div className="mb-2 text-center">
          <h3 className="text-sm font-semibold text-white sm:text-base">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-gray-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="flex-1 text-xs py-1.5 h-auto text-gray-300 hover:text-white border-gray-700 hover:bg-gray-800"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant === 'danger' ? 'destructive' : 'default'}
            size="sm"
            onClick={onConfirm}
            className={`flex-1 text-xs py-1.5 h-auto font-medium ${
              confirmVariant === 'danger'
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
