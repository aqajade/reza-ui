// import { StaticImageData } from 'next/image';

// import { ImageConfig } from '@/types/image';

// interface FluidImageParams {
//   src: string | StaticImageData;
//   alt?: string;
//   minPx: number;
//   maxPx: number;
//   minViewport: number;
//   maxViewport: number;
//   containerClass?: string;
//   elementClass?: string;
// }

// export function createFluidImageConfig({
//   src,
//   alt = '',
//   minPx,
//   maxPx,
//   minViewport = 393,
//   maxViewport = 1440,
//   containerClass = '',
//   elementClass = '',
// }: FluidImageParams): ImageConfig {
//   const slope = (maxPx - minPx) / (maxViewport - minViewport);
//   const vwValue = (slope * 100).toFixed(4);
//   const intersectionPx = (minPx - slope * minViewport).toFixed(4);

//   // bip: Bikin style string clamp murni untuk inline style CSS
//   const clampStyle = `clamp(${minPx}px, ${intersectionPx}px + ${vwValue}vw, ${maxPx}px)`;
//   const dynamicSizes = `(max-width: ${minViewport}px) ${minPx}px, (min-width: ${maxViewport}px) ${maxPx}px, calc(${intersectionPx}px + ${vwValue}vw)`;

//   return {
//     src,
//     alt,
//     layout: 'fill',
//     sizes: dynamicSizes,
//     containerClass, // Utility class Tailwind biasa (misal: "aspect-square rounded-2xl")
//     elementClass: `object-cover ${elementClass}`,
//     // bip: Kirim objek style terpisah untuk menampung properti clamp yang dinamis
//     containerStyle: { width: clampStyle },
//   };
// }

// ==================================

// import { ImageConfig, RawImageConfig } from "@/types/layout/page-config";

// // bip: Menggunakan type alias dengan Omit & Intersection untuk modifikasi prop
// export type FluidImageParams = Omit<RawImageConfig, 'minWidth' | 'maxWidth'> & {
//   minPx: number;
//   maxPx: number;
// };

// export function createFluidImageConfig({
//   src,
//   alt = '',
//   priority = false,
//   minPx,
//   maxPx,
//   minViewport = 393, // bip: Default value batas bawah viewport
//   maxViewport = 1440, // bip: Default value batas atas viewport
//   containerClass = '',
//   elementClass = '',
// }: FluidImageParams): ImageConfig {
//   const slope = (maxPx - minPx) / (maxViewport - minViewport);
//   const vwValue = (slope * 100).toFixed(4);
//   const intersectionPx = (minPx - slope * minViewport).toFixed(4);

//   const clampStyle = `clamp(${minPx}px, ${intersectionPx}px + ${vwValue}vw, ${maxPx}px)`;
//   const dynamicSizes = `(max-width: ${minViewport}px) ${minPx}px, (min-width: ${maxViewport}px) ${maxPx}px, calc(${intersectionPx}px + ${vwValue}vw)`;

//   // 2. Modifikasi logika penentuan aspek rasio di helper kamu
// // let aspectRatioStyle = raw.aspectRatio || '16 / 9'; // Gunakan dari data jika ada, jika tidak ada baru pakai 16/9

// // if (typeof src === 'object' && src && 'width' in src && 'height' in src) {
// //   aspectRatioStyle = `${src.width} / ${src.height}`; // Tetap otomatis jika gambar lokal
// // }

//   return {
//     src,
//     alt,
//     priority,
//     sizes: dynamicSizes,
//     containerClass,
//     elementClass: `object-cover ${elementClass}`,
//     containerStyle: { width: clampStyle },
//   };
// }

// // bip helper tambahan: Untuk mengonversi objek RawImageConfig dari API secara langsung
// export function parseRawImage(raw: RawImageConfig): ImageConfig {
//   return createFluidImageConfig({
//     src: raw.src,
//     alt: raw.alt,
//     priority: raw.priority,
//     minPx: raw.minWidth,
//     maxPx: raw.maxWidth,
//     minViewport: raw.minViewport,
//     maxViewport: raw.maxViewport,
//     containerClass: raw.containerClass,
//     elementClass: raw.elementClass,
//   });
// }

// ==========================================

// src/lib/fluid-image.ts
import { ImageConfig, RawImageConfig } from '@/types/layout/base';

// bip: Menggunakan type alias dengan Omit & Intersection untuk modifikasi prop
export type FluidImageParams = Omit<RawImageConfig, 'minWidth' | 'maxWidth'> & {
  minPx: number;
  maxPx: number;
};

export function createFluidImageConfig({
  src,
  alt = '',
  priority = false,
  loading,
  minPx,
  maxPx,
  minViewport = 393, // bip: Default value batas bawah viewport
  maxViewport = 1440, // bip: Default value batas atas viewport
  containerClass = '',
  elementClass = '',
  aspectRatio, // bip: distrukturkan dari argumen agar bisa diakses langsung
}: FluidImageParams): ImageConfig {
  const slope = (maxPx - minPx) / (maxViewport - minViewport);
  const vwValue = (slope * 100).toFixed(4);
  const intersectionPx = (minPx - slope * minViewport).toFixed(4);

  const clampStyle = `clamp(${minPx}px, ${intersectionPx}px + ${vwValue}vw, ${maxPx}px)`;
  const dynamicSizes = `(max-width: ${minViewport}px) ${minPx}px, (min-width: ${maxViewport}px) ${maxPx}px, calc(${intersectionPx}px + ${vwValue}vw)`;

  // bip: Gunakan langsung properti aspectRatio hasil destructuring, berikan fallback standard 16/9 jika kosong
  // let aspectRatioStyle = aspectRatio || '16 / 9';

  // if (typeof src === 'object' && src && 'width' in src && 'height' in src) {
  //   aspectRatioStyle = `${src.width} / ${src.height}`; // Tetap otomatis jika gambar lokal
  // }

  // 🟢 PRIORITAS 1: Gunakan aspectRatio dari data jika ada (misal '1/1')
  // JIKA TIDAK ADA di data, barulah hitung otomatis dari ukuran asli gambar lokal
  let aspectRatioStyle = aspectRatio;
  if (
    !aspectRatioStyle &&
    typeof src === 'object' &&
    src &&
    'width' in src &&
    'height' in src
  ) {
    aspectRatioStyle = `${src.width} / ${src.height}`;
  }
  // Fallback terakhir jika dua-duanya tidak ada
  if (!aspectRatioStyle) {
    aspectRatioStyle = '16 / 9';
  }

  return {
    src,
    alt,
    priority,
    loading,
    sizes: dynamicSizes,
    containerClass,
    elementClass: `object-cover ${elementClass}`,
    // bip: Gabungkan clamp width dan aspek rasio otomatis ke inline style kontainer
    containerStyle: {
      width: clampStyle,
      aspectRatio: aspectRatioStyle,
    },
  };
}

// bip helper tambahan: Untuk mengonversi objek RawImageConfig dari API secara langsung
export function parseRawImage(raw: RawImageConfig): ImageConfig {
  return createFluidImageConfig({
    src: raw.src,
    alt: raw.alt,
    priority: raw.priority,
    loading: raw.loading,
    minPx: raw.minWidth,
    maxPx: raw.maxWidth,
    minViewport: raw.minViewport,
    maxViewport: raw.maxViewport,
    containerClass: raw.containerClass,
    elementClass: raw.elementClass,
    aspectRatio: raw.aspectRatio, // bip: wajib di-forward agar terbaca oleh createFluidImageConfig
  });
}
