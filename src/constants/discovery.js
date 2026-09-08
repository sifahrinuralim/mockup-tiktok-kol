import { TALENT_CATEGORIES, TALENT_CATEGORY_LIST } from '@/data/mockTalents';

/**
 * Konstanta khusus fitur Talent Discovery:
 * opsi filter/sortir, kelas warna chip kategori, dan nilai mock pendukung.
 */

/** Nilai opsi kategori "semua" pada dropdown filter. */
export const DISCOVERY_CATEGORY_ALL = 'all';

/** Opsi dropdown filter kategori (All + daftar kategori dari mock data). */
export const DISCOVERY_CATEGORY_OPTIONS = [
  { value: DISCOVERY_CATEGORY_ALL, label: 'Semua Kategori' },
  ...TALENT_CATEGORY_LIST.map((category) => ({ value: category, label: category })),
];

/**
 * Opsi dropdown "Sort By".
 * `value` menunjuk field metrik pada objek talent (mock data).
 */
export const DISCOVERY_SORT_OPTIONS = [
  { value: 'totalViews', label: 'Most Views' },
  { value: 'followers', label: 'Highest Followers' },
  { value: 'engagementRate', label: 'Highest Engagement Rate' },
];

/** Kunci sortir bawaan saat halaman pertama dimuat. */
export const DISCOVERY_DEFAULT_SORT_KEY = 'totalViews';

/** Arah urut bawaan — angka terbesar tampil lebih dulu. */
export const DISCOVERY_DEFAULT_SORT_DIRECTION = 'desc';

/**
 * Kelas Tailwind untuk chip kategori (dipetakan dari nilai kategori).
 * Ditulis lengkap agar aman dideteksi JIT Tailwind.
 */
export const CATEGORY_CHIP_CLASSES = {
  [TALENT_CATEGORIES.BEAUTY]: 'bg-rose-50 text-rose-700 ring-rose-200',
  [TALENT_CATEGORIES.GAMING]: 'bg-violet-50 text-violet-700 ring-violet-200',
  [TALENT_CATEGORIES.TECH]: 'bg-sky-50 text-sky-700 ring-sky-200',
  [TALENT_CATEGORIES.FASHION]: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
  [TALENT_CATEGORIES.FOOD]: 'bg-orange-50 text-orange-700 ring-orange-200',
  [TALENT_CATEGORIES.ENTERTAINMENT]: 'bg-amber-50 text-amber-700 ring-amber-200',
};

/** Jumlah kampanye aktif (mock) — nanti bersumber dari modul Campaign Manager. */
export const ACTIVE_CAMPAIGNS_COUNT = 8;

/** Durasi simulasi loading (ms) agar skeleton state sempat terlihat nyata. */
export const SIMULATED_LOAD_DELAY_MS = 700;
