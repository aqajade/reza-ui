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
import type {
  LandingPageConfig,
  LandingPageSectionId,
} from '@/types/layout/page-schema';

type SectionProps = {
  className?: string;
};

const sectionRegistry = {
  hero: Hero,
  tailored: Tailored,
  expertise: Expertise,
  tracking: Tracking,
  network: Network,
  eco: Eco,
  services: Services,
  process: Process,
  explore: Explore,
  team: Team,
  footer: Footer,
} satisfies Record<LandingPageSectionId, ComponentType<SectionProps>>;

type PageRendererProps = {
  config: LandingPageConfig;
};

export function PageRenderer({ config }: PageRendererProps) {
  return (
    <>
      {config.sections.map((section) => {
        if (section.enabled === false) {
          return null;
        }

        const Section = sectionRegistry[section.id];

        return <Section key={section.id} className={section.className} />;
      })}
    </>
  );
}
