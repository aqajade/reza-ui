// src/types/layout/page-config.ts
import type { StaticImageData } from 'next/image';


export type StackElement = 'section' | 'header' | 'footer'

export type BaseLayoutConfig = {
  layout: LayoutConfig;
  header?: HeaderConfig;
  image?: RawImageConfig;
};

export type LayoutConfig = {
  id?: string;
  stackElement?: StackElement
  stackDirection?: 'col' | 'row';
  stackClass?: string;
  containerClass?: string;
};



export type HeaderConfig = {
  headerClass?: string;

  title?: string;
  titleId?: string;
  titleClass?: string;
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4';

  subTitle?: string;
  subTitleId?: string;
  subTitleClass?: string;
  subTitleElement?: 'h2' | 'h3' | 'h4';

  description?: string;
  descriptionId?: string;
  descriptionClass?: string;
  descriptionElement?: 'p' | 'span';

  descriptionIntro?: string;
  descriptionIntroId?: string;
  descriptionIntroClass?: string;
  descriptionIntroElement?: 'p' | 'span';

  descriptionOutro?: string;
  descriptionOutroId?: string;
  descriptionOutroClass?: string;
  descriptionOutroElement?: 'p' | 'span';
};

// bip: Tipe data mentah yang ditulis di file landing-page-data.ts
export type RawImageConfig = {
  src: string | StaticImageData;
  alt?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
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
  alt?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes: string;
  containerClass?: string;
  elementClass?: string;
  containerStyle?: React.CSSProperties;
};

// konfigurasi tanpa gambar
export type SectionConfig = BaseLayoutConfig & {
  layout:{
    id: string;
  }
};

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
