// src/types/layout/page-config.ts
import type { StaticImageData } from 'next/image';

export type SectionElement = 'section' | 'header' | 'footer' | 'aside' | 'main';

// u/ yg berurusan dg perbedaan semantik container 
export type SectionVariant = 'root' | 'sub';

// Layout Stack primitives
export type StackDirection = 'col' | 'row';
export type StackElement = 'div' | 'main' | 'header' | 'footer' | 'section' | 'aside';

// Typography element primitives
export type TitleElement = 'h1' | 'h2' | 'h3' | 'h4';
export type SubTitleElement = 'h2' | 'h3' | 'h4';
export type DescriptionElement = 'p' | 'span';
export type DescriptionIntroElement = 'p' | 'span';
export type DescriptionOutroElement = 'p' | 'span';

// Image loading primitive
export type ImageLoading = 'lazy' | 'eager';

export type SectionConfig = BaseLayoutConfig & {
  layout: LayoutConfig & {
    id?: string;
    sectionElement?: SectionElement;
    sectionClass?: string;
    containerClass?: string;
    sectionVariant?: SectionVariant;
  };
};

// base disini general yg dipanggil u/ turunan selain section container
export type BaseLayoutConfig = {
  layout?: LayoutConfig;
  header?: HeaderConfig;
  image?: RawImageConfig;
};

//layout disini u/ sistem turunan krn dipake turunan content,detail,&card
export type LayoutConfig = {
  id?: string; //id superoptional u/ case animation aja
  stackDirection?: StackDirection;
  stackClass?: string;
  stackElement?: StackElement;
};

export type HeaderConfig = {
  headerClass?: string;

  title?: string;
  titleId?: string;
  titleClass?: string;
  titleElement?: TitleElement;

  subTitle?: string;
  subTitleId?: string;
  subTitleClass?: string;
  subTitleElement?: SubTitleElement;

  description?: string;
  descriptionId?: string;
  descriptionClass?: string;
  descriptionElement?: DescriptionElement;

  descriptionIntro?: string;
  descriptionIntroId?: string;
  descriptionIntroClass?: string;
  descriptionIntroElement?: DescriptionIntroElement;

  descriptionOutro?: string;
  descriptionOutroId?: string;
  descriptionOutroClass?: string;
  descriptionOutroElement?: DescriptionOutroElement;
};

// bip: Tipe data mentah yang ditulis di file landing-page-data.ts
export type RawImageConfig = {
  src: string | StaticImageData;
  alt?: string;
  priority?: boolean;
  loading?: ImageLoading;
  minWidth: number;
  maxWidth: number;
  minViewport?: number;
  maxViewport?: number;
  containerClass?: string;
  elementClass?: string;
  aspectRatio?: string; //handling u/ data dr API ketika bukan src ny bkn object statis StaticImageData
};

export type ImageConfig = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: ImageLoading;
  sizes: string;
  containerClass?: string;
  elementClass?: string;
  containerStyle?: React.CSSProperties;
};

// konfigurasi tanpa gambar

// export type SectionConfig = BaseLayoutConfig & {
//   layout: {
//     id?: string;
//     sectionElement?: SectionElement; // 🟢 Di sini tempatnya!
//     sectionClass?: string;
//   };
// };

// konfigurasi dengan gambar
// export type ImagedSectionConfig = SectionConfig & {
//   // header: HeaderConfig
//   image: RawImageConfig;
// };
// export type ImagedBaseLayoutConfig = BaseLayoutConfig & {
//   // header: HeaderConfig
//   image: RawImageConfig;
// };
// export type ImagedContentConfig = ContentConfig & ImageConfig
// export type ImagedDetailConfig = DetailConfig & ImageConfig
// export type ImagedCardConfig = CardConfig & ImageConfig
// export type ImagedDataConfig = DataConfig & ImageConfig

// // layouting contentStack
// export type ContentConfig = BaseLayoutConfig;
// // layouting detailStack
// export type DetailConfig = BaseLayoutConfig;
// // u/ layouting card
// export type CardConfig = BaseLayoutConfig;
// // untuk data yg mau di mapping
// export type DataConfig = BaseLayoutConfig;
