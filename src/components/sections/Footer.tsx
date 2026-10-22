// src/components/sections/Footer.tsx

// Static Image Import untuk jaminan performa anti-lag di laptop low-spec PC
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { landingPageData } from '@/data/landing-page';
import { cn } from '@/lib/utils';

import { ContentStack } from '../layout/ContentStack';
import { SectionStack } from '../layout/SectionStack';
//props cN definition
type FooterProps = {
  className?: string;
};
export function Footer({ className }: FooterProps) {
  // Menarik pasokan data murni dari satu-satunya pusat kebenaran tunggal (SSOT)
  const { section, content, detail } = landingPageData.footer;

  return (
    // <PageSection id={section.layout.id} sectionClass={section.layout.sectionClass}>
    <PageSection id={section.layout.id} className={cn('', className)}>
      <CustomContainer>
        <SectionStack config={section.layout}>
          <SectionHeader config={section.header} />
          <ContentStack config={content.layout}>
            <SectionHeader config={content.header} />
            <SectionHeader config={detail.header} />
          </ContentStack>
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}
