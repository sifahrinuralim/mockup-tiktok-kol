/**
 * Saved Lists domain constants:
 * segment options (follower targets) and a gradient palette for list cards.
 */

/** Segment / creator-size target options for a list. */
export const LIST_TARGET_OPTIONS = [
  { value: 'micro', label: 'Micro (10K – 100K)' },
  { value: 'mid', label: 'Mid Tier (100K – 500K)' },
  { value: 'macro', label: 'Macro (500K – 1M)' },
  { value: 'mega', label: 'Mega (1M and above)' },
  { value: 'mixed', label: 'Mixed (all sizes)' },
];

/**
 * Gradient palette for list-card header accents (rotated in order).
 * Written out in full so the Tailwind JIT scanner picks them up safely.
 */
export const LIST_GRADIENT_CLASSES = [
  'from-cyan-400 to-sky-500',
  'from-fuchsia-500 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-violet-500 to-indigo-500',
];
