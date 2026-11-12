import { SectionBadge } from '@/components/layout/badge/SectionBadge';
import { CustomContainer } from '@/components/layout/CustomContainer';
import { DataInjector } from '@/components/layout/DataInjector';
import { ContentHeader } from '@/components/layout/header/ContentHeader';
import { ImageContainer } from '@/components/layout/ImageContainer';
import { PageSection } from '@/components/layout/PageSection';
import { ContentStack } from '@/components/layout/stack/ContentStack';
import { SectionStack } from '@/components/layout/stack/SectionStack';
import type { LandingPageData } from '@/types/layout/landing-page';

export type HeaderItqanMathProps = {
  data: LandingPageData['headerItqanMath'];
};

/**
 * HeaderItqanMath
 *
 * 100% Server Component murni (RSC) & Data-Driven sesuai doktrin rscoclsddsddryzaapfpsmbip.
 * Menggunakan <DataInjector data={data}> untuk auto-injection zero-props ke primitif semantik.
 * Murni Zero Hardcode Class & Zero Micro-Props Drilling.
 */
export function HeaderItqanMath({ data }: HeaderItqanMathProps) {
  return (
    <DataInjector data={data}>
      <PageSection>
        <CustomContainer>
          <SectionStack>
            {/* Sisi Kiri: Logo + Title & Subtitle */}
            <ContentStack>
              <ImageContainer />
              <ContentHeader />
            </ContentStack>

            {/* Sisi Kanan: SectionBadge Status (Auto-Injected Zero-Props) */}
            <SectionBadge />
          </SectionStack>
        </CustomContainer>
      </PageSection>
    </DataInjector>
  );
}
