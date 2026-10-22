// src/compositions/landing-page.ts
import { landingPageConfig } from '@/config/landing-page';
import { landingPageData } from '@/data/landing-page';
import type { LandingPage } from '@/types/layout/landing-page';

export const landingPage = {
  config: landingPageConfig,
  data: landingPageData,
} satisfies LandingPage;