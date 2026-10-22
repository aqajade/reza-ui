// src/components/sections/Tailored.tsx

// 🟢 KUNCI SAKTI BIP: Static Image Import agar VS Code auto-detect super lancar!
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { StackLayout } from '@/components/layout/StackLayout';
import { landingPageData } from '@/data/landing-page';
import { cn } from '@/lib/utils';

import { CardStack } from '../layout/CardStack';
import { ContentStack } from '../layout/ContentStack';
import { ImageContainer } from '../layout/ImageContainer';
//props cN definition
type TailoredProps = {
  className?: string;
};
export function Tailored({ className }: TailoredProps) {
  // Ambil pasokan data murni dari single source of truth (SSOT)
  const { section, content } = landingPageData.tailored;
  return (
    <PageSection id={section.layout.id} className={cn('', className)}>
      <CustomContainer className=''>
        <StackLayout
          className={cn(
            'gap-[clamp(24px,11.9885px+3.0564vw,56px)]' // Responsive: Otomatis tumpuk vertikal di layar HP
          )}
        >
          <SectionHeader config={section.header} />
          {/* img & card */}
          <ContentStack className='flex flex-col items-center gap-[clamp(24px,10.4871px+3.4384vw,60px)] lg:flex-row lg:items-stretch'>
            {/* tailor img */}
            <ImageContainer config={content.image} />
            {/* tailor card */}
            <CardStack className='outline-primary-400 flex flex-1 flex-col rounded-2xl px-[clamp(12px,1.49px+2.6743vw,40px)] py-[clamp(32px,28.9971px+0.7641vw,40px)] outline-2'>
              <SectionHeader config={content.header} />
            </CardStack>
          </ContentStack>
        </StackLayout>
      </CustomContainer>
    </PageSection>
  );
}
