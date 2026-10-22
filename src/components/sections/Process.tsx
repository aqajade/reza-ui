// src/components/sections/Process.tsx

// Static Image Import untuk jaminan performa anti-lag di laptop low-spec PC
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { landingPageData } from '@/data/landing-page';
import { cn } from '@/lib/utils';

import { ImageContainer } from '../layout/ImageContainer';
import { SectionStack } from '../layout/SectionStack';
//props cN definition
type ProcessProps = {
  className?: string;
};
export function Process({ className }: ProcessProps) {
  // Menarik pasokan data murni dari satu-satunya pusat kebenaran tunggal (SSOT)
  const { section } = landingPageData.process;

  return (
    // <PageSection id={section.layout.id} sectionClass={section.layout.sectionClass}>
    <PageSection id={section.layout.id} className={cn('', className)}>
      <CustomContainer containerClass={section.layout.containerClass}>
        <SectionStack config={section.layout}>
          {/* SISI KIRI: Teks */}
          <SectionHeader config={section.header} />
          {/* SISI KANAN: Wadah Visual Ilustrasi */}
          <ImageContainer config={section.image} />
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}
