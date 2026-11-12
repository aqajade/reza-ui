// ⚠️ TANPA 'use client' — ini induk dari pola "Client Leaf".
// Section ini 100% Server Component. Interaktivitas (state, klik, submit)
// DIAMANKAN di <PracticeSetup> (client leaf) di ujung render tree.
import * as React from 'react';

import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { CardStack } from '@/components/layout/stack/CardStack';
import { HeaderItqanMath } from '@/components/sections/HeaderItqanMath';
import { PracticeSetup } from '@/components/ui/PracticeSetup';
import { landingPageData } from '@/data/landing-page';
import { cn } from '@/lib/utils';

export type LandingItqanMathProps = {
  data?: Record<string, never>;
  headerData?: typeof landingPageData.headerItqanMath;
  className?: string;
};

export function LandingItqanMath({
  headerData = landingPageData.headerItqanMath,
  className,
}: LandingItqanMathProps) {
  return (
    <PageSection
      sectionElement='section'
      className={cn(
        'flex h-screen w-screen flex-col justify-between overflow-hidden bg-[#030D0A] p-2 text-gray-100 select-none sm:p-4',
        className
      )}
    >
      <CustomContainer containerClass='w-full max-w-md mx-auto flex flex-col h-full justify-between'>
        {/* 1. Header Modular (Logo + Title + Badge Status) */}
        <HeaderItqanMath data={headerData} />

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
