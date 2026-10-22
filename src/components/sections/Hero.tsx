import { SectionHeader } from '@/components/layout/SectionHeader';
import { cn } from '@/lib/utils';
import type { LandingPageData } from '@/types/layout/landing-page';

import { ContentStack } from '../layout/ContentStack';
import { CustomContainer } from '../layout/CustomContainer';
import { ImageContainer } from '../layout/ImageContainer';
import { PageSection } from '../layout/PageSection';
// import { ImageContainer } from '../layout/ImageContainer';
import { SectionStack } from '../layout/SectionStack';
//props cN definition
type HeroProps = {
  data: LandingPageData['hero'];
  className?: string;
};
export function Hero({ data, className }: HeroProps) {
  const { section, content } = data; // 🟢 Bersih, diambil dari props
  return (
    // <SectionStack id={section.id} stackClass={section.stackClass}>
    <PageSection
      className={cn(
        'pt-[clamp(27px, 23.9971px + 0.7641vw, 35px)] pb-[clamp(65px,58.2436px+1.7192vw,83px)]',
        className
      )}
    >
      <CustomContainer>
        <SectionStack
          className='justify-between gap-[clamp(16px,-13.6533px+7.5454vw,95px)] lg:flex-row'
          config={section.layout}
        >
          <ContentStack className='items-center'>
            <ImageContainer config={section.image} />
            <SectionHeader
              className='items-center text-center'
              config={section.header}
            />
          </ContentStack>
          <ImageContainer config={content.image} className='mx-auto' />
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}

// <SectionHeader
//   title={section.title}
//   titleClass={section.titleClass}
//   subTitle={section.subTitle}
//   subTitleClass={section.subTitleClass}
//   description={section.description}
//   descriptionClass={section.descriptionClass}
// />
