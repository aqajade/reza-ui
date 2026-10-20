
/**
 * src/lib/config/grid-utils.ts
 *
 * Konfigurasi dan helper CSS Grid responsif.
 * Semua nilai gap menggunakan angka pixel.
 * Konversi ke skala Tailwind dilakukan dengan membagi 4.
 */

import { GridColumnCount, GridConfig, GridGap } from "@/types/layout/grid-config";


const columnClasses: Record<GridColumnCount, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
};

/**
 * Nilai pixel -> skala spacing Tailwind.
 * Contoh: 10px / 4 = 2.5 -> gap-2.5
 */
function toTailwindSpacing(value: GridGap): string {
  return String(value / 4);
}

/**
 * Menghasilkan kelas Tailwind untuk konfigurasi grid.
 */
export function getGridClasses(config: GridConfig = {}): string {
  const {
    columns,
    mdColumns,
    gap,
    gapX,
    mdGapX,
    gapY,
    mdGapY,
    gridClass,
  } = config;

  const classes: string[] = ['grid'];

  if (columns !== undefined) {
    classes.push(columnClasses[columns]);
  }

  if (mdColumns !== undefined) {
    classes.push(`md:${columnClasses[mdColumns]}`);
  }

  if (gap !== undefined) {
    classes.push(`gap-${toTailwindSpacing(gap)}`);
  }

  if (gapX !== undefined) {
    classes.push(`gap-x-${toTailwindSpacing(gapX)}`);
  }

  if (mdGapX !== undefined) {
    classes.push(`md:gap-x-${toTailwindSpacing(mdGapX)}`);
  }

  if (gapY !== undefined) {
    classes.push(`gap-y-${toTailwindSpacing(gapY)}`);
  }

  if (mdGapY !== undefined) {
    classes.push(`md:gap-y-${toTailwindSpacing(mdGapY)}`);
  }

  if (gridClass) {
    classes.push(gridClass);
  }

  return classes.join(' ');
}
