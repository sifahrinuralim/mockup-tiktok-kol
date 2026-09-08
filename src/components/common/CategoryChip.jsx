import { cn } from '@/utils/cn';

import { CATEGORY_CHIP_CLASSES } from '@/constants/discovery';

/**
 * Small colored chip for creator category labels (used across pages:
 * Talent Discovery, Top Talents, Saved Lists, and others).
 * Colors come from CATEGORY_CHIP_CLASSES so they stay consistent app-wide.
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
