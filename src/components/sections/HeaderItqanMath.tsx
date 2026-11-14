// src/components/sections/HeaderItqanMath.tsx
import { SectionBadge } from '@/components/layout/badge/SectionBadge';
import { CustomContainer } from '@/components/layout/CustomContainer';
import { ContentHeader } from '@/components/layout/header/ContentHeader';
import { ImageContainer } from '@/components/layout/ImageContainer';
import { PageSection } from '@/components/layout/PageSection';
import { ContentStack } from '@/components/layout/stack/ContentStack';
import { SectionStack } from '@/components/layout/stack/SectionStack';

/**
 * HeaderItqanMath – Zero‑props Server Component.
 * All configuration is injected by the surrounding <DataInjector> in the parent.
 */
export function HeaderItqanMath() {
  return (
    <PageSection>
      <CustomContainer>
        <SectionStack>
          {/* Left side: logo + title & subtitle */}
          <ContentStack>
            <ImageContainer />
            <ContentHeader />
          </ContentStack>
          {/* Right side: auto‑injected SectionBadge */}
          <SectionBadge />
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}
