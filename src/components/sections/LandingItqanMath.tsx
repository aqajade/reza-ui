'use client';

import * as React from 'react';
import Image from 'next/image';

import { PageSection } from '@/components/layout/PageSection';
import { CustomContainer } from '@/components/layout/CustomContainer';
import { CardStack } from '@/components/layout/CardStack';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ButtonGroup, type ButtonGroupOption } from '@/components/ui/ButtonGroup';
import { cn } from '@/lib/utils';

export type TotalSoal = 5 | 10 | 15 | 20;
export type TimerOption = 'off' | '5' | '10' | '15';

export type LandingItqanMathProps = {
  className?: string;
  onStart?: (setup: { total: TotalSoal; timer: TimerOption }) => void;
};

const totalOptions: ButtonGroupOption<TotalSoal>[] = [
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

export function LandingItqanMath({ className, onStart }: LandingItqanMathProps) {
  const [total, setTotal] = React.useState<TotalSoal>(10);
  const [timer, setTimer] = React.useState<TimerOption>('off');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStart?.({ total, timer });
  };

  return (
    <PageSection
      sectionElement="section"
      className={cn(
        'h-screen w-screen overflow-hidden flex flex-col justify-between p-2 sm:p-4 bg-[#030D0A] text-gray-100 select-none',
        className
      )}
    >
      <CustomContainer containerClass="w-full max-w-md mx-auto flex flex-col h-full justify-between">
        {/* 1. Header Ringkas (Logo + Title + Badge Status) */}
        <header className="w-full flex-shrink-0 mb-2">
          <div className="rounded-xl px-3 py-2 flex items-center justify-between bg-[#0B2B22]/85 backdrop-blur-md border border-[#123D31]/90 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#0B2B22] border border-emerald-500/40 flex items-center justify-center p-1 shadow-inner flex-shrink-0">
                <Image
                  src="/icons/logo.svg"
                  alt="ItqanMath Logo"
                  width={24}
                  height={24}
                  className="w-auto h-auto"
                  priority
                />
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white leading-none block">
                  Itqan<span className="text-emerald-400">Math</span>
                </span>
                <span className="text-[9px] text-emerald-300/80 uppercase font-medium tracking-wider">
                  Modul 01: Penjumlahan
                </span>
              </div>
            </div>

            <Badge dot>Fase Fondasi</Badge>
          </div>
        </header>

        {/* 2. Main Card Container (Glass Card Form Setup) */}
        <main className="w-full flex-1 flex flex-col min-h-0 justify-center my-auto">
          <CardStack className="rounded-2xl p-4 sm:p-5 border border-emerald-500/30 bg-[#0B2B22]/85 backdrop-blur-md shadow-2xl flex flex-col justify-between gap-4">
            {/* Icon & Judul Topik Utama */}
            <div className="text-center flex flex-col items-center gap-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                <span className="text-2xl font-bold leading-none">+</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
                Latihan Penjumlahan
              </h1>
              <p className="text-xs text-gray-300">
                Bangun ketelitian dan kecepatan berhitung dasar secara bertahap.
              </p>
            </div>

            {/* Form Setup Generator */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
              {/* Parameter 1: Total Soal */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-200">
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <span>Total Soal</span>
                  </span>
                  <span className="text-[10px] text-emerald-300/80 font-normal">
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
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-200">
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 text-sm">⏱</span>
                    <span>Batas Waktu (Timer)</span>
                  </span>
                  <span className="text-[10px] text-emerald-300/80 font-normal">
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
              <Button type="submit" size="md" fullWidth className="mt-2">
                <span>Mulai Latihan Penjumlahan</span>
                <span className="text-xs">→</span>
              </Button>
            </form>
          </CardStack>
        </main>

        {/* 3. Footer Ringkas */}
        <footer className="w-full flex-shrink-0 mt-2 text-center">
          <p className="text-[10px] text-gray-400">
            &copy; 2026 ItqanMath • Belajar Bertahap Tanpa Iklan
          </p>
        </footer>
      </CustomContainer>
    </PageSection>
  );
}
