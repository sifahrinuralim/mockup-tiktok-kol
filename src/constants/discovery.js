import { TALENT_CATEGORIES, TALENT_CATEGORY_LIST } from '@/data/mockTalents';

/**
 * Talent Discovery feature constants:
 * filter/sort options, category chip color classes, and supporting mock values.
 */

/** Value of the "all" category option in the filter dropdown. */
export const DISCOVERY_CATEGORY_ALL = 'all';

/** Category filter dropdown options (All + list of categories from mock data). */
export const DISCOVERY_CATEGORY_OPTIONS = [
  { value: DISCOVERY_CATEGORY_ALL, label: 'All Categories' },
  ...TALENT_CATEGORY_LIST.map((category) => ({ value: category, label: category })),
];

/**
 * "Sort By" dropdown options.
 * `value` points to a metric field on the talent object (mock data).
 */
export const DISCOVERY_SORT_OPTIONS = [
  { value: 'totalViews', label: 'Most Views' },
  { value: 'followers', label: 'Highest Followers' },
  { value: 'engagementRate', label: 'Highest Engagement Rate' },
];

/** Default sort key when the page first loads. */
export const DISCOVERY_DEFAULT_SORT_KEY = 'totalViews';

/** Default sort direction — largest numbers appear first. */
export const DISCOVERY_DEFAULT_SORT_DIRECTION = 'desc';

/**
 * Tailwind classes for category chips (mapped from the category value).
 * Written out in full so the Tailwind JIT scanner picks them up safely.
 */
export const CATEGORY_CHIP_CLASSES = {
  [TALENT_CATEGORIES.BEAUTY]: 'bg-rose-50 text-rose-700 ring-rose-200',
  [TALENT_CATEGORIES.GAMING]: 'bg-violet-50 text-violet-700 ring-violet-200',
  [TALENT_CATEGORIES.TECH]: 'bg-sky-50 text-sky-700 ring-sky-200',
  [TALENT_CATEGORIES.FASHION]: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
  [TALENT_CATEGORIES.FOOD]: 'bg-orange-50 text-orange-700 ring-orange-200',
  [TALENT_CATEGORIES.ENTERTAINMENT]: 'bg-amber-50 text-amber-700 ring-amber-200',
};

/** Active campaign count (mock) — later sourced from the Campaign Manager module. */
export const ACTIVE_CAMPAIGNS_COUNT = 8;

/** Simulated loading duration (ms) so the skeleton state is visibly rendered. */
export const SIMULATED_LOAD_DELAY_MS = 700;
