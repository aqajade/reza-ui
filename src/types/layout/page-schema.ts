import type { StaticImageData } from 'next/image';

type HeroSectionConfig = {
  id: string;
  type: 'hero';
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};

type ServicesSectionConfig = {
  id: string;
  type: 'services';
  title: string;
  items: {
    id: string;
    title: string;
    description: string;
    imageSrc: string | StaticImageData;
    imageAlt: string;
  }[];
};

type TestimonialsSectionConfig = {
  id: string;
  type: 'testimonials';
  title: string;
  items: {
    id: string;
    quote: string;
    author: string;
  }[];
};

export type PageSectionConfig =
  | HeroSectionConfig
  | ServicesSectionConfig
  | TestimonialsSectionConfig;

export type PageConfig = {
  sections: PageSectionConfig[];
};