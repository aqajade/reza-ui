'use client';

import Image from 'next/image';
import * as React from 'react';

import { CardStack } from '@/components/layout/CardStack';
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { Badge } from '@/components/ui/Badge';
import {
  ButtonGroup,
  type ButtonGroupOption,
} from '@/components/ui/ButtonGroup';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

export type TotalQuestion = 5 | 10 | 15 | 20;
export type TimerOption = 'off' | '5' | '10' | '15';

export type LandingItqanMathProps = {
  data: Record<string, never>;
  className?: string;
  onStart?: (setup: { total: TotalQuestion; timer: TimerOption }) => void;
};

const totalOptions: ButtonGroupOption<TotalQuestion>[] = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
];

const timerOptions: ButtonGroupOption<TimerOption>[] = [
  { label: 'Santai', value: 'off' },
  { label: '5 Mnt', value: '5' },
  { label: '10 Mnt', value: '10' },
  { label: '15 Mnt', value: '15' },
];

export function LandingItqanMath({
  className,
  onStart,
}: LandingItqanMathProps) {
  const [total, setTotal] = React.useState<TotalQuestion>(10);
  const [timer, setTimer] = React.useState<TimerOption>('off');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStart?.({ total, timer });
  };

  return (
    <PageSection
      sectionElement='section'
      className={cn(
        'flex h-screen w-screen flex-col justify-between overflow-hidden bg-[#030D0A] p-2 text-gray-100 select-none sm:p-4',
        className
      )}
    >
      <CustomContainer containerClass='w-full max-w-md mx-auto flex flex-col h-full justify-between'>
        {/* 1. Header Ringkas (Logo + Title + Badge Status) */}
        <header className='mb-2 w-full shrink-0'>
          <div className='flex items-center justify-between rounded-xl border border-[#123D31]/90 bg-[#0B2B22]/85 px-3 py-2 shadow-md backdrop-blur-md'>
            <div className='flex items-center space-x-2'>
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/40 bg-[#0B2B22] p-1 shadow-inner'>
                <Image
                  src='/icons/logo.svg'
                  alt='ItqanMath Logo'
                  width={12}
                  height={12}
                  // className='h-auto w-auto'
                  priority
                  className='invert' 

                />
              </div>
              <div>
                <span className='block text-base leading-none font-extrabold tracking-tight text-white'>
                  Itqan<span className='text-emerald-400'>Math</span>
                </span>
                <span className='text-[9px] font-medium tracking-wider text-emerald-300/80 uppercase'>
                  Modul 01: Penjumlahan
                </span>
              </div>
            </div>

            <Badge dot>Fase Fondasi</Badge>
          </div>
        </header>

        {/* 2. Main Card Container (Glass Card Form Setup) */}
        <main className='my-auto flex min-h-0 w-full flex-1 flex-col justify-center'>
          <CardStack className='flex flex-col justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-[#0B2B22]/85 p-4 shadow-2xl backdrop-blur-md sm:p-5'>
            {/* Icon & Judul Topik Utama */}
            <div className='flex flex-col items-center gap-1 text-center'>
              <div className='mb-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'>
                <span className='text-2xl leading-none font-bold'>+</span>
              </div>
              <h1 className='text-lg font-extrabold tracking-wide text-white sm:text-xl'>
                Latihan Penjumlahan
              </h1>
              <p className='text-xs text-gray-300'>
                Bangun ketelitian dan kecepatan berhitung dasar secara bertahap.
              </p>
            </div>

            {/* Form Setup Generator */}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 pt-1'>
              {/* Parameter 1: Total Soal */}
              <div className='flex flex-col gap-1.5'>
                <div className='flex items-center justify-between text-xs font-bold text-gray-200'>
                  <span className='flex items-center gap-1.5'>
                    <span className='text-sm text-emerald-400'>✓</span>
                    <span>Total Soal</span>
                  </span>
                  <span className='text-[10px] font-normal text-emerald-300/80'>
                    Pilih jumlah
                  </span>
                </div>
                <ButtonGroup
                  options={totalOptions}
                  value={total}
                  onChange={setTotal}
                  columns={4}
                />
              </div>

              {/* Parameter 2: Timer */}
              <div className='flex flex-col gap-1.5'>
                <div className='flex items-center justify-between text-xs font-bold text-gray-200'>
                  <span className='flex items-center gap-1.5'>
                    <span className='text-sm text-emerald-400'>⏱</span>
                    <span>Batas Waktu (Timer)</span>
                  </span>
                  <span className='text-[10px] font-normal text-emerald-300/80'>
                    Opsional
                  </span>
                </div>
                <ButtonGroup
                  options={timerOptions}
                  value={timer}
                  onChange={setTimer}
                  columns={4}
                />
              </div>

              {/* Action Button CTA */}
              <Button type='submit' size='md' fullWidth className='mt-2'>
                <span>Mulai Latihan Penjumlahan</span>
                <span className='text-xs'>→</span>
              </Button>
            </form>
          </CardStack>
        </main>

        {/* 3. Footer Ringkas */}
        <footer className='mt-2 w-full shrink-0 text-center'>
          <p className='text-[10px] text-gray-400'>
            &copy; 2026 ItqanMath • وَقْفٌ لِلهِ تَعَالَى
          </p>
        </footer>
      </CustomContainer>
    </PageSection>
  );
}
