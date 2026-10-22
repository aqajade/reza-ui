// src/components/sections/Explore.tsx

// Static Image Import untuk jaminan performa anti-lag di laptop low-spec PC
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { landingPageData } from '@/data/landing-page';
import { cn } from '@/lib/utils';

import { CardStack } from '../layout/CardStack';
import { ContentStack } from '../layout/ContentStack';
import { DetailStack } from '../layout/DetailStack';
import { ImageContainer } from '../layout/ImageContainer';
import { SectionStack } from '../layout/SectionStack';
//props cN definition
type ExploreProps = {
  className?: string;
};
export function Explore({ className }: ExploreProps) {
  // Menarik pasokan data murni dari satu-satunya pusat kebenaran tunggal (SSOT)
  const { section, content, detail } = landingPageData.explore;

  return (
    // <PageSection id={section.layout.id} sectionClass={section.layout.sectionClass}>
    <PageSection id={section.layout.id} className={cn('', className)}>
      <CustomContainer containerClass={section.layout.containerClass}>
        {/* 🟢 STRUKTUR ROW-STACK: Mengalirkan 'row' secara dinamis dari data agar layout otomatis menyamping di desktop */}
        <SectionStack config={section.layout}>
          {/* SISI KIRI: Wadah Visual Ilustrasi Truk Merah Muda */}
          {/* <div className='h-172'>
            <Image
              src={img}
              alt='TUI Logistik Explore Our Solutions Truck'
              className='h-full w-auto'
            />
          </div> */}
          <ImageContainer config={section.image} />

          {/* SISI KANAN: Wadah Judul Utama + Tumpukan 3 List Kartu Hijau Gelap */}
          <ContentStack config={content.layout} className=''>
            {/* Judul Seksi Luar (Explore Our Solutions) */}
            <SectionHeader config={section.header} />

            {/* Kontainer Tumpukan Kartu Hijau Gelap */}
            <DetailStack config={detail.layout}>
              {detail.data.map((item, index) => (
                // Pembungkus fisik kartu list hijau gelap (bg-[#1b4332])
                <CardStack key={index} config={detail.card.layout}>
                  <SectionHeader
                    config={{
                      ...detail.card.header, // ambil template styling kartu (titleClass, descriptionClass, dll)
                      title: item.title, // ambil isi teks dari data looping
                      description: item.description,
                    }}
                  />
                </CardStack>
              ))}
            </DetailStack>
          </ContentStack>
        </SectionStack>
      </CustomContainer>
    </PageSection>
  );
}
