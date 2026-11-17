// src/compositions/landing-page.ts
import { landingPageConfig } from '@/config/landing-page';
import { getLandingPageData, landingPageData } from '@/data/landing-page';
import type { LandingPage } from '@/types/layout/landing-page';
import type { Language } from '@/types/math/itqan-math';

export function getLandingPage(lang: Language = 'en'): LandingPage {
  return {
    config: landingPageConfig,
    data: getLandingPageData(lang),
  } satisfies LandingPage;
}

export const landingPage = {
  config: landingPageConfig,
  data: landingPageData,
} satisfies LandingPage;
