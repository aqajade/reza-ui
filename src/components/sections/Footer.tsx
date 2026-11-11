// src/components/sections/Footer.tsx

// Static Image Import untuk jaminan performa anti-lag di laptop low-spec PC
import { CustomContainer } from '@/components/layout/CustomContainer';
import { SectionHeader } from '@/components/layout/header/SectionHeader';
import { PageSection } from '@/components/layout/PageSection';
import { landingPageData } from '@/data/landing-page';
import { cn } from '@/lib/utils';
import type { LandingPageData } from '@/types/layout/landing-page';

import { ContentHeader } from '../layout/header/ContentHeader';
import { DetailHeader } from '../layout/header/DetailHeader';
import { ContentStack } from '../layout/stack/ContentStack';
import { SectionStack } from '../layout/stack/SectionStack';
//props cN definition
type FooterProps = {
  data: LandingPageData['footer'];
  className?: string;
};
export function Footer({ className }: FooterProps) {
  // Menarik pasokan data murni dari satu-satunya pusat kebenaran tunggal (SSOT)
  const { section, content, detail } = landingPageData.footer;

  return (
    // <PageSection id={section.layout.id} sectionClass={section.layout.sectionClass}>
    <PageSection>
      <CustomContainer>
        <SectionStack>
          <SectionHeader />
          <ContentStack>
            <ContentHeader />
            <DetailHeader />
          </ContentStack>
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}
