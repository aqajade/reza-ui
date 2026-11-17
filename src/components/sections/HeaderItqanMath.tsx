// src/components/sections/HeaderItqanMath.tsx
import { SectionBadge } from '@/components/layout/badge/SectionBadge';
import { CustomContainer } from '@/components/layout/CustomContainer';
import { ContentHeader } from '@/components/layout/header/ContentHeader';
import { ImageContainer } from '@/components/layout/ImageContainer';
import { PageSection } from '@/components/layout/PageSection';
import { ContentStack } from '@/components/layout/stack/ContentStack';
import { DetailStack } from '@/components/layout/stack/DetailStack';
import { SectionStack } from '@/components/layout/stack/SectionStack';
import HeaderLanguageSelector from '@/components/ui/HeaderLanguageSelector';

/**
 * HeaderItqanMath – Zero‑props Server Component.
 * All layout configuration is injected by the surrounding <DataInjector> in the parent.
 *
 * Mengikuti Doktrin: rscoClsDdSdDryZaapeiFpSMBip
 * - RSCO: 100% Server Component, zero JS runtime dikirim untuk layout header.
 * - CLS: <HeaderLanguageSelector /> bertindak sebagai Client Leaf mandiri di pojok kanan.
 * - ZAAPEI: Zero interface, zero props drilling manual di primitif layout reza-ui.
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

          {/* Right side: Badge status + Client Leaf Language Selector */}
          <DetailStack>
            <SectionBadge />
            <HeaderLanguageSelector />
          </DetailStack>
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}
