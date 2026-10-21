// src/components/sections/Services.tsx

// 🟢 KUNCI SAKTI BIP: Static Image Import agar VS Code auto-detect super lancar!
import { CustomContainer } from '@/components/layout/CustomContainer';
import { PageSection } from '@/components/layout/PageSection';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { StackLayout } from '@/components/layout/StackLayout';
import { landingPageData } from '@/data/landing-page-data';
import { cn } from '@/lib/utils';

import { CardStack } from '../layout/CardStack';
import { Grid } from '../layout/Grid';
//props cN definition
type ServicesProps = {
  className?: string;
};
export function Services({ className }: ServicesProps) {
  // Ambil pasokan data murni dari single source of truth (SSOT)
  const { section } = landingPageData.services;
  return (
    <PageSection id={section.layout.id} className={cn('', className)} >
      <CustomContainer className=''>
        <StackLayout
          className={cn(
            'gap-[clamp(24px,11.9885px+3.0564vw,56px)]'// Responsive: Otomatis tumpuk vertikal di layar HP
          )}
        >
          <SectionHeader config={section.header} />
          <Grid gridConfig={section.grid}>
            {section.data.map((item, index) => (
              // Pembungkus Kotak Kartu Hijau Mint
              // <CardStack
              //   key={index}
              //   className={section.card.layout.stackClass}
              // >
              <CardStack
                key={index}
                className={section.card.layout.stackClass}
              >
                {/* Distribusi 3 teks internal kartu (Mendukung auto-highlight span) */}
                <SectionHeader
                  config={{
                    ...section.card.header, // ambil template styling kartu (titleClass, descriptionClass, dll)
                    title: item.title, // ambil isi teks dari data looping
                    description: item.description,
                  }}
                />{' '}
              </CardStack>
            ))}
          </Grid>
        </StackLayout>
      </CustomContainer>
    </PageSection>
  );
}
