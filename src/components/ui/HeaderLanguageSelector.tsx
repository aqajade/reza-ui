'use client';
// src/components/ui/HeaderLanguageSelector.tsx
// Client Leaf for Language Toggle (Bilingual EN / ID)
// Sesuai Doktrin: rscoClsDdSdDryZaapeiFpSMBip — CLS (Client Leaf System), Zero interface, Zero any/as
// ⚠️ Stacking-Context Safe: Tidak menggunakan backdrop fixed inset-0 yang menjebak event pointer

import type { Language, LanguageOption } from '@/types/math/itqan-math';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

// ==========================================
// SVG Bendera Negara (Minimalist Clean SVG)
// ==========================================

function FlagEN() {
  return (
    <svg
      className='h-3 w-4 shrink-0 rounded-xs object-cover'
      viewBox='0 0 640 480'
      aria-label='English flag'
    >
      <path fill='#012169' d='M0 0h640v480H0z' />
      <path
        fill='#FFF'
        d='m75 0 245 180L565 0h75v55L395 240l245 185v55h-75L320 295 75 480H0v-55l245-185L0 55V0h75z'
      />
      <path
        fill='#C8102E'
        d='m424 281 216 163v36h-48L376 317l48-36zM216 199 0 36v-36h48l216 163-48 36zm0 82L0 444v36h48l216-163-48-36zm208-82L640 36v-36h-48L376 163l48 36z'
      />
      <path fill='#FFF' d='M240 0h160v480H240zM0 160h640v160H0z' />
      <path fill='#C8102E' d='M272 0h96v480h-96zM0 192h640v96H0z' />
    </svg>
  );
}

function FlagID() {
  return (
    <svg
      className='h-3 w-4 shrink-0 rounded-xs border border-emerald-900/60 object-cover'
      viewBox='0 0 640 480'
      aria-label='Bendera Indonesia'
    >
      <path fill='#E70011' d='M0 0h640v240H0z' />
      <path fill='#FFFFFF' d='M0 240h640v240H0z' />
    </svg>
  );
}

// ==========================================
// Opsi Bahasa Tersedia
// ==========================================

const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Indonesia' },
] as const;

export type HeaderLanguageSelectorProps = {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
};

// ==========================================
// HeaderLanguageSelector Component (Client Leaf)
// ==========================================

export default function HeaderLanguageSelector({
  currentLang,
  onLanguageChange,
}: HeaderLanguageSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const urlLang = searchParams?.get('lang') === 'id' ? 'id' : 'en';
  const effectiveLang: Language = currentLang ?? urlLang;

  const [activeLang, setActiveLang] = useState<Language>(effectiveLang);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sinkronisasi jika URL atau props berubah
  useEffect(() => {
    setActiveLang(effectiveLang);
  }, [effectiveLang]);

  // Outside click listener berbasis useRef (Bebas Stacking Context trap)
  useEffect(() => {
    function handlePointerDownOutside(event: MouseEvent | TouchEvent) {
      const target = event.target;
      if (
        containerRef.current &&
        target instanceof Node &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handlePointerDownOutside);
      document.addEventListener('touchstart', handlePointerDownOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handlePointerDownOutside);
      document.removeEventListener('touchstart', handlePointerDownOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setActiveLang(code);
    setIsOpen(false);
    onLanguageChange?.(code);

    // Sinkronkan ke URL SearchParams tanpa reload penuh (RSC transition)
    const currentParam = searchParams?.get('lang');
    if (currentParam !== code) {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      params.set('lang', code);
      startTransition(() => {
        router.push(`/?${params.toString()}`, { scroll: false });
      });
    }
  };

  return (
    <div ref={containerRef} className='relative inline-block text-left'>
      {/* Pill Trigger Button */}
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex cursor-pointer items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#0B2B22] px-2 py-0.5 text-emerald-300 shadow-sm transition-all hover:border-emerald-400 active:scale-95'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-label='Select interface language'
      >
        {activeLang === 'en' ? <FlagEN /> : <FlagID />}
        <span className='font-mono text-[10px] font-bold tracking-wider text-emerald-200 uppercase'>
          {activeLang}
        </span>
        <span className='text-[8px] leading-none text-emerald-400'>▾</span>
      </button>

      {/* Popover Dropdown (Non-trapping Stacking Context) */}
      {isOpen && (
        <div
          role='listbox'
          className='absolute right-0 z-50 mt-1.5 flex w-32 flex-col gap-0.5 rounded-xl border border-emerald-500/40 bg-[#0B2B22]/95 p-1 shadow-2xl backdrop-blur-xl'
        >
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = activeLang === opt.code;
            return (
              <button
                key={opt.code}
                type='button'
                role='option'
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.code)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border border-emerald-500/30 bg-emerald-950/80 text-emerald-300 shadow-xs'
                    : 'text-gray-300 hover:bg-emerald-950/60 hover:text-white'
                }`}
              >
                <div className='flex items-center gap-1.5'>
                  {opt.code === 'en' ? <FlagEN /> : <FlagID />}
                  <span className='text-[11px]'>{opt.label}</span>
                </div>
                {isSelected && (
                  <span className='text-[10px] font-bold text-emerald-400'>
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
