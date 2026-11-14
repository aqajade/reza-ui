// ⚠️ TANPA 'use client' — ini induk dari pola "Client Leaf".
// Section ini 100% Server Component. Interaktivitas (state, klik, submit)
// DIAMANKAN di <PracticeSetup> (client leaf) di ujung render tree.
import { CustomContainer } from '@/components/layout/CustomContainer';
import { DataInjector } from '@/components/layout/DataInjector';
import { PageSection } from '@/components/layout/PageSection';
import { FooterItqanMath } from '@/components/sections/FooterItqanMath';
import { HeaderItqanMath } from '@/components/sections/HeaderItqanMath';
import { PracticeSetup } from '@/components/ui/PracticeSetup';
import type { LandingPageData } from '@/types/layout/landing-page';

import { SectionHeader } from '../layout/header/SectionHeader';
import { SectionStack } from '../layout/stack/SectionStack';

export type LandingItqanMathProps = {
  data: LandingPageData['landingItqanMath'];
  headerData?: LandingPageData['headerItqanMath'];
  footerData?: LandingPageData['footerItqanMath'];
  className?: string;
};

/**
 * LandingItqanMath
 *
 * 100% Server Component murni (RSC) & Data-Driven sesuai doktrin rscoclsddsddryzaapfpsmbip.
 *
 * Memanfaatkan <DataInjector data={data} slots={...}> untuk auto-injection props
 * deklaratif (Zero-Props) lintas 3 section berbeda:
 *   - data            → landingItqanMath (konteks default: PageSection, SectionStack, SectionHeader)
 *   - slots.HeaderItqanMath → headerItqanMath  (konteks swap: seluruh sub-tree HeaderItqanMath)
 *   - slots.FooterItqanMath → footerItqanMath  (konteks swap: seluruh sub-tree FooterItqanMath)
 *
 * Tidak ada props manual, tidak ada import data langsung di section (ADR 5).
 */
export function LandingItqanMath({
  data,
  headerData,
  footerData,
}: LandingItqanMathProps) {
  return (
    <DataInjector
      data={data}
      slots={{
        HeaderItqanMath: headerData,
        FooterItqanMath: footerData,
      }}
    >
      <PageSection>
        <CustomContainer>
          {/* 1. Header Modular (Logo + Title + Badge Status)
              DataInjector auto-swap ke slots.HeaderItqanMath untuk seluruh sub-tree ini. */}
          <HeaderItqanMath />
          {/* 2. Main Card Container (Glass Card Form Setup)
              Injeksi dari data.section (konteks default landingItqanMath). */}
          <SectionStack>
            {/* Icon & Judul Topik Utama */}
            <SectionHeader />
            {/* 🌱 CLIENT BOUNDARY — satu-satunya daun yang "use client".
                  Form ini di-serialisasi KOSONG ke browser: semua label &
                  opsi dirender di server sebagai children. JS klien hanya
                  memuat state total/timer. */}
            <PracticeSetup />
          </SectionStack>
          {/* 3. Footer Modular
              DataInjector auto-swap ke slots.FooterItqanMath untuk seluruh sub-tree ini. */}
          <FooterItqanMath />
        </CustomContainer>
      </PageSection>
    </DataInjector>
  );
}
