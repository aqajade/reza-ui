// src/components/sections/Team.tsx

// 🟢 KUNCI SAKTI BIP: Static Image Import agar VS Code auto-detect super lancar!
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { StackLayout } from '@/components/layout/StackLayout';
import { landingPageData } from '@/data/landing-page-data';
import { cn } from '@/lib/utils';

import { ImageContainer } from '../layout/ImageContainer';
//props cN definition
type TeamProps = {
  className?: string;
};
export function Team({ className }: TeamProps) {
  // Ambil pasokan data murni dari single source of truth (SSOT)
  const { section } = landingPageData.team;
  return (
    <PageSection id={section.layout.id} className={cn('', className)}>
      <CustomContainer className=''>
        <StackLayout
          className={cn(
            'gap-[clamp(24px,11.9885px+3.0564vw,56px)]' // Responsive: Otomatis tumpuk vertikal di layar HP
          )}
        >
          <SectionHeader config={section.header} />
          <ImageContainer config={section.image} />
        </StackLayout>
      </CustomContainer>
    </PageSection>
  );
}
