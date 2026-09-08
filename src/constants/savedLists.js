/**
 * Konstanta domain Saved Lists:
 * opsi segmen (target followers) dan palet gradien untuk kartu daftar.
 */

/** Opsi segmen / target ukuran kreator pada sebuah daftar. */
export const LIST_TARGET_OPTIONS = [
  { value: 'micro', label: 'Micro (10K – 100K)' },
  { value: 'mid', label: 'Mid Tier (100K – 500K)' },
  { value: 'macro', label: 'Macro (500K – 1M)' },
  { value: 'mega', label: 'Mega (1M ke atas)' },
  { value: 'mixed', label: 'Campuran (semua ukuran)' },
];

/**
 * Palet gradien untuk aksen header kartu daftar (diputar berurutan).
 * Ditulis lengkap agar aman dideteksi JIT Tailwind.
 */
export const LIST_GRADIENT_CLASSES = [
  'from-cyan-400 to-sky-500',
  'from-fuchsia-500 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-violet-500 to-indigo-500',
];
