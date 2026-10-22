// src/types/layout/landing-page-config.ts

/**
 * ==========================================================================
 * 3. SUB-TYPES DATA KONTEN LANDING PAGE (Payload Array Looping & Specific Stucture)
 * ==========================================================================
 */

// import type { GridConfig } from './grid-config';
import type {
  BaseLayoutConfig,
  HeaderConfig,
  LayoutConfig,
  RawImageConfig,
  SectionConfig,
} from './base';
import { GridConfig } from './grid-config';

type FeatureCardConfig = HeaderConfig & {
  title: string;
  subTitle: string;
  descriptionIntro: string;
  descriptionOutro: string;
};

type DataConfig = HeaderConfig & {
  title: string;
  description: string;
};

/**
 * ==========================================================================
 * 4. MAIN LANDINGPAGE BLUEPRINT (The Single Source of Truth / SSOT TUI Logistik)
 * ==========================================================================
 */
export type LandingPageConfig = {
  header: {
    section: BaseLayoutConfig & {
      layout: LayoutConfig & {
        stackElement: 'header';
      };
    };
  };

  hero: {
    section: BaseLayoutConfig & {
      header: HeaderConfig & {
        title: string;
        subTitle: string;
        description: string;
      };
      image: RawImageConfig;
    };
    content: LayoutConfig & {
      image: RawImageConfig;
    };
  };

  /** 3. Tailored Section: Layout Kiri Gambar Kapal, Kanan Teks Deskripsi Panjang */
  tailored: {
    section: SectionConfig & {
      header: HeaderConfig & {
        title: string;
      };
    };
    content: LayoutConfig & {
      image: RawImageConfig;
      header: FeatureCardConfig;
    };
  };

  /** 4. Expertise Section: Layout Kiri Teks Pertanyaan/Pernyataan, Kanan Gambar Kapal Cargo */
  expertise: {
    section: SectionConfig & {
      header: FeatureCardConfig;
      image: RawImageConfig;
    };
  };

  // /** 5. Tracking Section: Layout Kiri Gambar Monitor Map Dunia, Kanan Teks Fitur Real-time Tracking */
  tracking: {
    section: SectionConfig & {
      header: FeatureCardConfig;
      image: RawImageConfig;
    };
  };

  // /** 6. Network Section: Layout Kiri Deskripsi Jaringan Rute, Kanan Gambar Ilustrasi Kapal Berlayar */
  network: {
    section: SectionConfig & {
      header: FeatureCardConfig;
      image: RawImageConfig;
    };
  };

  // /** 7. Eco Section: Layout Kiri Gambar Depan Kapal Kontainer, Kanan Teks Solusi Eco-Friendly Logistics */
  eco: {
    section: SectionConfig & {
      header: FeatureCardConfig;
      image: RawImageConfig;
    };
  };

  // /** 8. Services Section: Menggunakan Susunan Grid 3 Kolom Kartu Berwarna Hijau Toska Sejajar */
  services: {
    section: SectionConfig & {
      header: HeaderConfig & {
        title: string;
      };
      grid: GridConfig;
      card: BaseLayoutConfig;
      data: DataConfig[];
    };
    // card: BaseLayoutConfig;
  };

  // /** 9. Explore Section: Layout Kiri Gambar Truk Cargo Pink Box, Kanan List Tombol/Akordeon Solusi */
  explore: {
    section: SectionConfig & {
      header: HeaderConfig & {
        title: string;
      };
      image: RawImageConfig;
    };
    content: BaseLayoutConfig;
    detail: BaseLayoutConfig & {
      card: BaseLayoutConfig;
      data: DataConfig[];
    };
  };

  //10 process
  process: {
    section: SectionConfig & {
      header: HeaderConfig & {
        title: string;
        description: string;
      };
      image: RawImageConfig;
    };
  };

  // /** 11 team
  team: {
    section: SectionConfig & {
      header: HeaderConfig & {
        title: string;
      };
      image: RawImageConfig;
    };
    // card: BaseLayoutConfig;
  };

  // /** 11. Footer Section: Area CTA Hubungi Kami, Kredit Hak Cipta, dan Detail Alamat Kontak */
  footer: {
    section: SectionConfig & {
      layout: LayoutConfig & {
        stackElement: 'footer';
      };
      header: HeaderConfig & {
        title: string;
        subTitle: string;
      };
    };
    content: BaseLayoutConfig & {
      header: HeaderConfig & {
        title: string;
        descriptionIntro: string;
        description: string;
        descriptionOutro: string;
      };
    };
    detail: LayoutConfig & {
      header: HeaderConfig & {
        descriptionIntro: string;
        descriptionOutro: string;
      };
    };
  };
};
