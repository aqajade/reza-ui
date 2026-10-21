export type LandingPageSectionId =
  | 'hero'
  | 'tailored'
  | 'expertise'
  | 'tracking'
  | 'network'
  | 'eco'
  | 'services'
  | 'process'
  | 'explore'
  | 'team'
  | 'footer';

export type LandingPageSectionConfig = {
  id: LandingPageSectionId;
  enabled?: boolean;
  className?: string;
};

export type LandingPageConfig = {
  sections: LandingPageSectionConfig[];
};