// src/components/sections/network.tsx

// 🟢 KUNCI SAKTI BIP: Static Image Import agar VS Code auto-detect super lancar!
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { landingPageData } from '@/data/landing-page';
import { cn } from '@/lib/utils';

import { CardStack } from '../layout/CardStack';
import { ImageContainer } from '../layout/ImageContainer';
import { SectionHeader } from '../layout/SectionHeader';
import { SectionStack } from '../layout/SectionStack';
//props cN definition
type NetworkProps = {
  className?: string;
};
export function Network({ className }: NetworkProps) {
  const { section } = landingPageData.network;
  return (
    <PageSection id={section.layout.id} className={cn('', className)}>
      <CustomContainer className=''>
        <SectionStack
          className={cn(
            'gap-[clamp(24px,11.9885px+3.0564vw,56px)]' // Responsive: Otomatis tumpuk vertikal di layar HP
          )}
        >
          {/* img & card */}
          <div className='flex flex-col items-center gap-[clamp(24px,10.4871px+3.4384vw,60px)] lg:flex-row lg:items-stretch'>
            <CardStack className='outline-primary-400 flex flex-1 flex-col rounded-2xl px-[clamp(12px,1.49px+2.6743vw,40px)] py-[clamp(32px,28.9971px+0.7641vw,40px)] outline-2'>
              <SectionHeader config={section.header} />
            </CardStack>
            <ImageContainer config={section.image} />
          </div>
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}
