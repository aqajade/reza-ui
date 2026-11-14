// src/components/renderer/PageRenderer.tsx
// ============================================================================
// 🏗️ PAGE RENDERER — STATIC REGISTRY (ADR 2)
// ============================================================================
// ⚠️ TANPA 'use client'. File ini adalah BATANG render tree dan harus tetap
// Server Component.
//
// Prinsip "Client Leaf": 'use client' hanya boleh muncul di ujung daun
// (komponen interaktif seperti PracticeSetup.tsx / Counter.tsx).
//
// Kenapa? 
// 1. Sebuah Client Component otomatis MEMBAWA SELURUH ANAKNYA ke client
//    boundary. Menaruh 'use client' di sini berarti SEMUA section halaman
//    ikut ter-hydrate → JS bundle membengkak, LCP turun, memori HP boros.
// 2. PageRenderer tidak butuh state, event, atau browser API sama sekali.
//    Ia murni memetakan config → komponen, pekerjaan yang ideal di server.
// 3. Static registry mengunci kontrak tipe saat COMPILE TIME: menambah key
//    baru di `LandingPageData` tanpa mendaftarkannya di registry = build merah.
//
// 🚫 JANGAN tambahkan 'use client' / next/dynamic di file ini.
//    Kalau suatu section butuh interaksi, taruh 'use client' di file
//    komponen interaktif yang ia import, bukan di sini.
// ============================================================================
import type { ComponentType } from 'react';
import { createElement } from 'react';

import { LandingItqanMath } from '@/components/sections/LandingItqanMath';
import type { LandingPage, LandingPageData } from '@/types/layout/landing-page';
import type { LandingPageSectionId } from '@/types/layout/page-schema';

/**
 * Props standar yang diterima SETIAP section component.
 * `data` sengaja default `never` (bukan `unknown`/`any`) supaya Registry di
 * bawah melakukan verifikasi tipe sungguhan, bukan casts yang membisu.
 */
export type SectionComponentProps<TData = never> = {
  data: TData;
  className?: string;
};

/**
 * Visual registry Land ItqanMath — komponen PEMBUNGKUS tipis yang menelan
 * `data` kosong agar LandingItqanMath bebas dari noise kontrak renderer.
 * headerData & footerData disuntikkan dari page.data di level renderer
 * (satu-satunya tempat yang sah membaca multi-section data sekaligus —
 * sesuai ADR 5: section sendiri DILARANG import landingPageData).
 */
function LandingItqanMathSection({
  data,
  className,
  headerData,
  footerData,
}: SectionComponentProps<LandingPageData['landingItqanMath']> & {
  headerData?: LandingPageData['headerItqanMath'];
  footerData?: LandingPageData['footerItqanMath'];
}) {
  return (
    <LandingItqanMath
      data={data}
      headerData={headerData}
      footerData={footerData}
      className={className}
    />
  );
}

/**
 * Statics registry: id section → komponen.
 * `-?` (mapped type) membuat setiap key WAJIB ada; menambah key di
 * `LandingPageSectionId` tanpa mendaftarkannya di sini akan gagal compile.
 *
 * Section yang membutuhkan interaksi cukup meng-import 'use client' leaf
 * di dalamnya (lihat LandingItqanMath → PracticeSetup). Registry ini TIDAK
 * pernah membawa 'use client'.
 */
const SECTION_REGISTRY: {
  [K in LandingPageSectionId]-?: ComponentType<SectionComponentProps<LandingPageData[K]>>;
} = {
  landingItqanMath: LandingItqanMathSection,
};

export type PageRendererProps = {
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

        const SectionComponent = SECTION_REGISTRY[section.id];

        // Penjaga runtime untuk payload CMS/runtime yang id-nya tidak dikenal
        // (mis. config dari luar TS). Regresi tipe tetap ditangkap compiler.
        if (!SectionComponent) {
          console.warn(
            `[PageRenderer] Section id "${section.id}" tidak terdaftar di SECTION_REGISTRY.`
          );
          return null;
        }

        // Props dasar yang berlaku untuk semua section
        const baseProps = {
          key: section.id,
          data: data[section.id],
          className: section.className,
        };

        // Props tambahan khusus LandingItqanMath: suntikkan data sibling section
        // di sini (satu-satunya tempat sah membaca multi-section — ADR 5).
        if (section.id === 'landingItqanMath') {
          return (
            <LandingItqanMathSection
              key={section.id}
              data={data.landingItqanMath}
              headerData={data.headerItqanMath}
              footerData={data.footerItqanMath}
              className={section.className}
            />
          );
        }

        return createElement(SectionComponent, baseProps);
      })}
    </>
  );
}
