// // src/components/layout/ImageContainer.tsx
// import Image from 'next/image';
// import * as React from 'react';

// import { cn } from '@/lib/utils';
// import { ImageConfig } from '@/types/layout/page-config';

// type ImageContainerProps = React.ComponentProps<'div'> & {
//   config: ImageConfig;
//   imageClass?: string; // Menyediakan override tambahan jika dibutuhkan di page level
// };

// export function ImageContainer({
//   config,
//   className,
//   imageClass,
//   style,
//   ...props
// }: ImageContainerProps) {
//   const {
//     src,
//     alt = '',
//     priority = false,
//     sizes,
//     containerClass,
//     elementClass,
//     containerStyle,
//   } = config;

//   if (!src) return null;

//   return (
//     <div
//       className={cn('relative overflow-hidden aspect-auto', containerClass, className)}
//       style={{ ...containerStyle, ...style }} // bip: Rumus clamp otomatis masuk ke sini lewat style.width
//       {...props}
//     >
//       <Image
//         src={src}
//         alt={alt}
//         priority={priority}
//         sizes={sizes} // bip: Atribut sizes otomatis dihitung pixel-perfect oleh helper
//         fill
//         className={cn('', elementClass, imageClass)}
//       />
//     </div>
//   );
// }

// ====================================

// src/components/layout/ImageContainer.tsx
// import Image from 'next/image';
// import * as React from 'react';

// import { cn } from '@/lib/utils';
// import { ImageConfig } from '@/types/layout/page-config';

// type ImageContainerProps = React.ComponentProps<'div'> & {
//   config: ImageConfig;
//   imageClass?: string;
// };

// export function ImageContainer({
//   config,
//   className,
//   imageClass,
//   style,
//   ...props
// }: ImageContainerProps) {
//   const {
//     src,
//     alt = '',
//     priority = false,
//     sizes,
//     containerClass,
//     elementClass,
//     containerStyle,
//   } = config;

//   if (!src) return null;

//   return (
//     <div
//       // containerClass ditempatkan agar aspect ratio dari data masuk ke sini
//       className={cn('relative overflow-hidden block ', containerClass, className)}
//       style={{ ...containerStyle, ...style }}
//       {...props}
//     >
//       <Image
//         src={src}
//         alt={alt}
//         priority={priority}
//         sizes={sizes}
//         fill
//         className={cn('w-full h-full object-cover', elementClass, imageClass)}
//       />
//     </div>
//   );
// }

// ===================================

// src/components/layout/ImageContainer.tsx
import Image from 'next/image';
import * as React from 'react';

import { parseRawImage } from '@/lib/fluid-image';
import { cn } from '@/lib/utils';
import { ImageConfig, RawImageConfig } from '@/types/layout/page-config';

type ImageContainerProps = React.ComponentProps<'div'> & {
  // Mengizinkan komponen menerima data mentah (RawImageConfig) atau yang sudah dikonversi (ImageConfig)
  config: RawImageConfig | ImageConfig;
  imageClass?: string;
};

// Fungsi helper (Type Guard) untuk mengecek apakah data sudah berwujud ImageConfig
function isFluidConfig(
  config: RawImageConfig | ImageConfig
): config is ImageConfig {
  return 'sizes' in config;
}

export function ImageContainer({
  config,
  className,
  imageClass,
  style,
  ...props
}: ImageContainerProps) {
  // Jika data yang masuk masih mentah (RawImageConfig), konversi otomatis di sini
  const finalConfig = isFluidConfig(config) ? config : parseRawImage(config);

  const {
    src,
    alt = '',
    priority = false,
    loading,
    sizes,
    containerClass,
    elementClass,
    containerStyle,
  } = finalConfig;

  if (!src) return null;

    // 🟢 KUNCI BIP: Cek apakah user memasang class w-full / w-[...] secara sengaja
  const combinedClasses = cn(containerClass, className);
  const hasCustomWidth = /\bw-(full|\d+|\[.*?\])/.test(combinedClasses);
  // Jika ada w-full / w- kustom, hapus properti `width: clamp` bawaan fluid helper!
  const finalStyle = {
    ...containerStyle,
    ...(hasCustomWidth ? { width: undefined } : {}),
    ...style,
  };

  return (
    <div
      className={cn(
        'relative block overflow-hidden max-w-full',
        containerClass,
        className
      )}
      // style={{ ...containerStyle, ...style }}
      style={finalStyle}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        loading={priority ? undefined : loading}
        sizes={sizes}
        fill
        className={cn('h-full w-full object-cover', elementClass, imageClass)}
      />
    </div>
  );
}
