/**
 * Mock Top Talents ranking data.
 *
 * All values are derived deterministically from MOCK_TALENTS through shared
 * utils (parseCompactNumber, buildViewsTrendSeries, computeGrowthPercent,
 * estimateRateCardTiers) so numbers stay consistent across pages and stable
 * across renders. `score` combines total views, followers, and engagement
 * rate to determine the ranking.
 */

import { MOCK_TALENTS } from '@/data/mockTalents';
import { parseCompactNumber } from '@/utils/metrics';
import {
  buildViewsTrendSeries,
  computeGrowthPercent,
  estimateRateCardTiers,
} from '@/utils/talentEstimate';

/** Computes the combined performance score used for ranking. */
const computeScore = (talent) => {
  const viewsMillion = parseCompactNumber(talent.totalViews) / 1e6;
  const followersMillion = parseCompactNumber(talent.followers) / 1e6;
  const engagementRate = parseCompactNumber(talent.engagementRate);

  return Math.round(viewsMillion * 3.5 + engagementRate * 3 + followersMillion * 2);
};

/**
 * Best creator ranking (mock): sorted from highest to lowest score and given
 * a `rank` of 1..N. 30-day growth & rate card estimates are included so the
 * ranking table doesn't need to recompute them in components.
 */
export const MOCK_TOP_TALENTS = MOCK_TALENTS.map((talent) => {
  const trendSeries = buildViewsTrendSeries(talent, 30);

  return {
    ...talent,
    score: computeScore(talent),
    growthPct: computeGrowthPercent(trendSeries),
    trendSeries: trendSeries.slice(-14),
    feeSingleMin: estimateRateCardTiers(talent)[0].min,
  };
})
  .sort((first, second) => second.score - first.score)
  .map((entry, index) => ({ ...entry, rank: index + 1 }));

/** Page summary config: the number of top creators used in the hero stats. */
export const TOP_TALENTS_PODIUM_COUNT = 3;
