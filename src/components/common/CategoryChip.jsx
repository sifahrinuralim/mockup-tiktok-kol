import { cn } from '@/utils/cn';

import { CATEGORY_CHIP_CLASSES } from '@/constants/discovery';

/**
 * Chip kecil berwarna untuk label kategori kreator (dipakai lintas halaman:
 * Talent Discovery, Top Talents, Saved Lists, dan lain-lain).
 * Warna diambil dari CATEGORY_CHIP_CLASSES agar konsisten di seluruh aplikasi.
 */
export const CategoryChip = ({ category, className }) => (
  <span
    className={cn(
      'inline-flex max-w-full items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
      CATEGORY_CHIP_CLASSES[category] ?? 'bg-slate-100 text-slate-600 ring-slate-200',
      className,
    )}
  >
    <span className="truncate">{category}</span>
  </span>
);
