// ⚠️ TANPA 'use client' — ini induk dari pola "Client Leaf".
// Section ini 100% Server Component. Interaktivitas (state, klik, submit)
// DIAMANKAN di <PracticeSetup> (client leaf) di ujung render tree.
import Image from 'next/image';

import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export type HeaderItqanMathProps = {
  /**
   * Sengaja kosong (Record<string, never>) — kontrak SSOT di
   * `LandingPageData['HeaderItqanMath']`. Semua teks di-hardcode server-side
   * supaya tetap RSC-friendly.
   */
  data: Record<string, never>;
  className?: string;
};

export function HeaderItqanMath({ className }: HeaderItqanMathProps) {
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
