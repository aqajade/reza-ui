export type GridColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * Nilai gap dalam pixel.
 * Contoh: 10 berarti 10px, lalu dikonversi menjadi gap-2.5.
 */
export type GridGap = number;

export type GridConfig = {
  /** Jumlah kolom default/mobile */
  columns?: GridColumnCount;

  /** Jumlah kolom mulai breakpoint md */
  mdColumns?: GridColumnCount;

  /** Gap umum horizontal dan vertikal, dalam pixel */
  gap?: GridGap;

  /** Gap horizontal mobile, dalam pixel */
  gapX?: GridGap;

  /** Gap horizontal mulai md, dalam pixel */
  mdGapX?: GridGap;

  /** Gap vertikal mobile, dalam pixel */
  gapY?: GridGap;

  /** Gap vertikal mulai md, dalam pixel */
  mdGapY?: GridGap;

  /** Kelas Tailwind khusus untuk kebutuhan layout tertentu */
  gridClass?: string;
};
