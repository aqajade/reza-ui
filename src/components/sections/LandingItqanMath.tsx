// ⚠️ TANPA 'use client' — ini induk dari pola "Client Leaf".
// Section ini 100% Server Component. Interaktivitas (state, klik, submit)
// DIAMANKAN di <PracticeSetup> (client leaf) di ujung render tree.
import Image from 'next/image';
import * as React from 'react';

import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { CardStack } from '@/components/layout/stack/CardStack';
import { Badge } from '@/components/ui/Badge';
import { PracticeSetup } from '@/components/ui/PracticeSetup';
import { cn } from '@/lib/utils';

export type LandingItqanMathProps = {
  /**
   * Sengaja kosong (Record<string, never>) — kontrak SSOT di
   * `LandingPageData['landingItqanMath']`. Semua teks di-hardcode server-side
   * supaya tetap RSC-friendly.
   */
  data: Record<string, never>;
  className?: string;
};

export function LandingItqanMath({ className }: LandingItqanMathProps) {
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

            {/* 🌱 CLIENT BOUNDARY — satu-satunya daun yang "use client".
                Form ini di-serialisasi KOSONG ke browser: semua label &
                opsi dirender di server sebagai children. JS klien hanya
                memuat state total/timer. */}
            <PracticeSetup />
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
