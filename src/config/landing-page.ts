// src/config/landing-page-config.ts 

import type { LandingPageConfig } from '@/types/layout/page-schema';

export const landingPageConfig = {
  sections: [
    { id: 'hero', className: 'bg-reza-100' },
    { id: 'tailored', className: 'bg-primary-200' },
    { id: 'expertise', className: 'bg-reza-100' },
    { id: 'tracking', className: 'bg-primary-200' },
    { id: 'network', className: 'bg-reza-100' },
    { id: 'eco', className: 'bg-primary-200' },
    { id: 'services', className: 'bg-reza-100' },
    { id: 'process', className: 'bg-primary-200' },
    { id: 'explore', className: 'bg-reza-100' },
    { id: 'team', className: 'bg-primary-200' },
    { id: 'footer', className: 'bg-reza-100' },
  ],
} satisfies LandingPageConfig;
