// src/components/sections/Footer.tsx

import { CustomContainer } from '@/components/layout/CustomContainer';
import { DataInjector } from '@/components/layout/DataInjector';
import { ContentHeader } from '@/components/layout/header/ContentHeader';
import { DetailHeader } from '@/components/layout/header/DetailHeader';
import { SectionHeader } from '@/components/layout/header/SectionHeader';
import { PageSection } from '@/components/layout/PageSection';
import { ContentStack } from '@/components/layout/stack/ContentStack';
import { SectionStack } from '@/components/layout/stack/SectionStack';
import type { LandingPageData } from '@/types/layout/landing-page';

type FooterProps = {
  data: LandingPageData['footer'];
};

export function Footer({ data }: FooterProps) {
  return (
    <DataInjector data={data}>
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
    </DataInjector>
  );
}
