import type { ComponentType } from 'react';

import { Eco } from '@/components/sections/Eco';
import { Expertise } from '@/components/sections/Expertise';
import { Explore } from '@/components/sections/Explore';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Network } from '@/components/sections/Network';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Tailored } from '@/components/sections/Tailored';
import { Team } from '@/components/sections/Team';
import { Tracking } from '@/components/sections/Tracking';
import type { LandingPage, LandingPageData } from '@/types/layout/landing-page';
import type { LandingPageSectionId } from '@/types/layout/page-schema';

import { LandingItqanMath } from '../sections/LandingItqanMath';

// Definisi props standar yang diterima oleh setiap Section Component
export type SectionComponentProps<T = unknown> = {
  data: T;
  className?: string;
};

// Mapping registry yang Type-Safe untuk setiap Section
const sectionRegistry: {
  [K in LandingPageSectionId]: ComponentType<
    SectionComponentProps<LandingPageData[K]>
  >;
} = {
  landingItqanMath: LandingItqanMath,
  // hero: Hero,
  // tailored: Tailored,
  // expertise: Expertise,
  // tracking: Tracking,
  // network: Network,
  // eco: Eco,
  // services: Services,
  // process: Process,
  // explore: Explore,
  // team: Team,
  // footer: Footer,
};

type PageRendererProps = {
  page: LandingPage;
};

export function PageRenderer({ page }: PageRendererProps) {
  const { config, data } = page;

  return (
    <>
      {config.sections.map((section) => {
        if (section.enabled === false) {
          return null;
        }

        // Ambil komponen dari registry berdasarkan section.id
        const SectionComponent = sectionRegistry[section.id] as ComponentType<
          SectionComponentProps<unknown>
        >;

        if (!SectionComponent) {
          console.warn(
            `Section with id "${section.id}" not found in registry.`
          );
          return null;
        }

        // Ambil data payload spesifik untuk section ini
        const sectionData = data[section.id];

        return (
          <SectionComponent
            key={section.id}
            data={sectionData}
            className={section.className}
          />
        );
      })}
    </>
  );
}
