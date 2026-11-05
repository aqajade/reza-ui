// src/components/ui/PracticeSetup.tsx
// 🍃 CLIENT LEAF — satu-satunya titik 'use client' di render tree beranda.
//
// Kenapa di sini dan bukan di PageRenderer / LandingItqanMath?
// 1. Komponen induk (PageRenderer, LandingItqanMath) tetap Server Component:
//    HTML-nya dikirim langsung dari server → LCP maksimal, hemat memori HP.
// 2. Label, heading, dan daftar opsi (TOTAL_TABS / TIMER_TABS) TIDAK ikut
//    di-serialisasi ke browser. Form di-serialize KOSONG — justru inilah
//    alasan ia child dari Server Component.
// 3. Yang diturunkan ke klien hanyalah state `total` & `timer` + handler klik.
'use client';

import * as React from 'react';

import { ButtonGroup, type ButtonGroupOption } from '@/components/ui/ButtonGroup';
import { cn } from '@/lib/utils';

import { Button } from './button';

export type TotalQuestion = 5 | 10 | 15 | 20;
export type TimerOption = 'off' | '5' | '10' | '15';

export type PracticeSetupValue = {
  total: TotalQuestion;
  timer: TimerOption;
};

export type PracticeSetupProps = {
  /** Default awal; harus salah satu dari TOTAL_TABS / TIMER_TABS. */
  defaultTotal?: TotalQuestion;
  defaultTimer?: TimerOption;
  /** Dipanggil saat user menekan CTA "Mulai Latihan". */
  onStart?: (value: PracticeSetupValue) => void;
  className?: string;
};

const TOTAL_TABS: readonly ButtonGroupOption<TotalQuestion>[] = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
];

const TIMER_TABS: readonly ButtonGroupOption<TimerOption>[] = [
  { label: 'Santai', value: 'off' },
  { label: '5 Mnt', value: '5' },
  { label: '10 Mnt', value: '10' },
  { label: '15 Mnt', value: '15' },
];

export function PracticeSetup({
  defaultTotal = 10,
  defaultTimer = 'off',
  onStart,
  className,
}: PracticeSetupProps) {
  const [total, setTotal] = React.useState<TotalQuestion>(defaultTotal);
  const [timer, setTimer] = React.useState<TimerOption>(defaultTimer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onStart?.({ total, timer });
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4 pt-1', className)}>
      {/* Parameter 1: Total Soal */}
      <fieldset className='flex flex-col gap-1.5 border-0 p-0'>
        <legend className='flex w-full items-center justify-between text-xs font-bold text-gray-200'>
          <span className='flex items-center gap-1.5'>
            <span aria-hidden className='text-sm text-emerald-400'>
              ✓
            </span>
            <span>Total Soal</span>
          </span>
          <span className='text-[10px] font-normal text-emerald-300/80'>
            Pilih jumlah
          </span>
        </legend>
        <ButtonGroup
          options={[...TOTAL_TABS]}
          value={total}
          onChange={setTotal}
          columns={4}
        />
      </fieldset>

      {/* Parameter 2: Timer */}
      <fieldset className='flex flex-col gap-1.5 border-0 p-0'>
        <legend className='flex w-full items-center justify-between text-xs font-bold text-gray-200'>
          <span className='flex items-center gap-1.5'>
            <span aria-hidden className='text-sm text-emerald-400'>
              ⏱
            </span>
            <span>Batas Waktu (Timer)</span>
          </span>
          <span className='text-[10px] font-normal text-emerald-300/80'>
            Opsional
          </span>
        </legend>
        <ButtonGroup
          options={[...TIMER_TABS]}
          value={timer}
          onChange={setTimer}
          columns={4}
        />
      </fieldset>

      {/* Action Button CTA */}
      <Button type='submit' size='md' fullWidth className='mt-2'>
        <span>Mulai Latihan Penjumlahan</span>
        <span aria-hidden className='text-xs'>
          →
        </span>
      </Button>
    </form>
  );
}
