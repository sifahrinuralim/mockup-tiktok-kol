import { parseCompactNumber } from '@/utils/metrics';

/** Estimated rate per view (Rupiah) for a single sponsored video. */
const RATE_PER_VIEW_MIN = 12;
const RATE_PER_VIEW_MAX = 20;

/** Price rounding so estimates look "clean" (500 thousand). */
const ROUND_STEP = 500_000;

/** Rounds a value up to a multiple of the given step. */
const roundToStep = (value, step) => Math.round(value / step) * step;

/**
 * Estimates a creator's rate card (campaign prices) deterministically from
 * the average views per video so the numbers stay consistent and sensible.
 * On a real API these values would usually be stored as separate fields.
 *
 * @param {object} talent
 * @returns {Array<{key: string, label: string, hint: string, min: number, max: number, highlight?: boolean}>}
 */
export const estimateRateCardTiers = (talent) => {
  const averageViews = parseCompactNumber(talent.avgViewsPerVideo);

  const singleMin = roundToStep(averageViews * RATE_PER_VIEW_MIN, ROUND_STEP);
  const singleMax = roundToStep(averageViews * RATE_PER_VIEW_MAX, ROUND_STEP);

  return [
    {
      key: 'single',
      label: '1 Video',
      hint: 'One feed post for a product/service.',
      min: singleMin,
      max: singleMax,
    },
    {
      key: 'package',
      label: '3 Video Package',
      hint: 'Three posts within one month.',
      min: roundToStep(singleMin * 2.4, ROUND_STEP),
      max: roundToStep(singleMax * 2.6, ROUND_STEP),
      highlight: true,
    },
    {
      key: 'live',
      label: 'Live / Event',
      hint: 'A live streaming session or an event appearance.',
      min: roundToStep(singleMin * 0.55, ROUND_STEP),
      max: roundToStep(singleMax * 0.7, ROUND_STEP),
    },
  ];
};

/** Deterministic PRNG (numeric seed) so data series stay stable across renders. */
const pseudoNoise = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Builds a mock daily total-views series from a creator's `totalViews`.
 * The series total roughly matches `totalViews`, with an upward trend so
 * the "last 30 days" chart looks like it is climbing.
 *
 * @param {object} talent
 * @param {number} [points=30]
 * @returns {number[]}
 */
export const buildViewsTrendSeries = (talent, points = 30) => {
  const totalViews = parseCompactNumber(talent.totalViews);
  const dailyAverage = totalViews / Math.max(points, 1);
  const seed = (talent.id ?? 1) * 1000 + 7;

  if (!Number.isFinite(dailyAverage) || dailyAverage <= 0) {
    return Array.from({ length: points }, () => 0);
  }

  return Array.from({ length: points }, (_, index) => {
    const progress = index / Math.max(points - 1, 1);
    const trendRatio = 0.82 + progress * 0.5;
    const fluctuation = (pseudoNoise(seed + index) - 0.5) * 0.16;
    return Math.round(dailyAverage * (trendRatio + fluctuation));
  });
};

/**
 * Percentage growth between the last and the first value of a series.
 * E.g. 23.4 means the series grew 23.4% during that period.
 *
 * @param {number[]} series
 * @returns {number}
 */
export const computeGrowthPercent = (series) => {
  if (!Array.isArray(series) || series.length < 2) return 0;

  const first = series[0];
  const last = series[series.length - 1];
  if (first <= 0) return 0;

  return ((last - first) / first) * 100;
};
