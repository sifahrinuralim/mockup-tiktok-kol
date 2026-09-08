/**
 * Analytics mock data: KPI summary + daily series per time range,
 * per-category performance, audience demographics, and top content.
 *
 * Daily series are generated deterministically (fixed seed) so numbers
 * stay stable across renders without writing hundreds of manual data points.
 * Period metadata fields (label & day count) come from constants/analytics.js.
 */

import { MOCK_TALENTS } from '@/data/mockTalents';

/** Simple deterministic PRNG (similar to the talentEstimate util) for data series. */
const noise = (index, seed) => {
  const x = Math.sin(seed * 127.1 + (index + 1) * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Builds an integer daily views series with an upward tendency. */
const buildDailyViews = (days, seed, basePerDay) =>
  Array.from({ length: days }, (_, index) => {
    const progress = index / Math.max(days - 1, 1);
    const trendRatio = 0.9 + progress * 0.22;
    const fluctuation = (noise(index, seed) - 0.5) * 0.14;
    return Math.round(basePerDay * (trendRatio + fluctuation));
  });

/** Builds a daily engagement series (percent, one decimal). */
const buildDailyEngagement = (days, seed, base) =>
  Array.from({ length: days }, (_, index) => {
    const fluctuation = (noise(index + 101, seed) - 0.5) * 0.8;
    return Math.round((base + fluctuation) * 10) / 10;
  });

/** Reporting time-range configuration. */
const RANGE_CONFIG = {
  '7d': { days: 7, viewsBase: 2_600_000, engagementBase: 7.4, seed: 11 },
  '30d': { days: 30, viewsBase: 2_420_000, engagementBase: 7.1, seed: 23 },
  '90d': { days: 90, viewsBase: 2_210_000, engagementBase: 6.9, seed: 37 },
};

/** Main KPI summary per range (values & change vs the previous period). */
const RANGE_SUMMARY = {
  '7d': { followersGained: 42_800, changes: { views: 12.6, engagement: 0.7, followers: 18.4, watch: 8.9 } },
  '30d': { followersGained: 156_900, changes: { views: 9.3, engagement: 0.4, followers: 14.2, watch: 7.1 } },
  '90d': { followersGained: 423_500, changes: { views: 6.8, engagement: 0.2, followers: 11.5, watch: 5.3 } },
};

/** Builds the full data object for one time range. */
const buildRangeData = (period) => {
  const config = RANGE_CONFIG[period];
  const views = buildDailyViews(config.days, config.seed, config.viewsBase);
  const engagement = buildDailyEngagement(config.days, config.seed, config.engagementBase);
  const totalViews = views.reduce((sum, value) => sum + value, 0);
  const summary = RANGE_SUMMARY[period];

  return {
    days: config.days,
    views,
    engagement,
    totalViews,
    averageEngagement:
      Math.round((engagement.reduce((sum, value) => sum + value, 0) / engagement.length) * 10) /
      10,
    watchHours: Math.round(totalViews / 450),
    followersGained: summary.followersGained,
    changes: summary.changes,
  };
};

/** KPI data + daily series for all three available time ranges. */
export const MOCK_ANALYTICS = {
  '7d': buildRangeData('7d'),
  '30d': buildRangeData('30d'),
  '90d': buildRangeData('90d'),
};

/** Content performance per category in the last 30 days (static mock). */
export const CATEGORY_PERFORMANCE = [
  { category: 'Gaming', er: 11.4, deltaPp: 1.9, videoCount: 214 },
  { category: 'Beauty', er: 9.6, deltaPp: 0.8, videoCount: 302 },
  { category: 'Entertainment', er: 8.7, deltaPp: 0.4, videoCount: 486 },
  { category: 'Food', er: 8.4, deltaPp: -0.3, videoCount: 265 },
  { category: 'Fashion', er: 7.9, deltaPp: 0.5, videoCount: 178 },
  { category: 'Tech', er: 6.5, deltaPp: -0.6, videoCount: 141 },
];

/** Audience age breakdown (percent, total 100). */
export const AUDIENCE_AGE_GROUPS = [
  { range: '13 – 17', pct: 16 },
  { range: '18 – 24', pct: 38 },
  { range: '25 – 34', pct: 28 },
  { range: '35 – 44', pct: 12 },
  { range: '45+', pct: 6 },
];

/** Audience gender breakdown (percent). */
export const GENDER_SPLIT = [
  { label: 'Female', pct: 64 },
  { label: 'Male', pct: 36 },
];

/** Top audience regions (percent). */
export const TOP_REGIONS = [
  { region: 'Jabodetabek', pct: 41 },
  { region: 'West Java', pct: 17 },
  { region: 'East Java', pct: 13 },
  { region: 'Sumatra', pct: 12 },
  { region: 'Others', pct: 17 },
];

/** Finds the full talent object from the creator library by id. */
const findTalentById = (id) => MOCK_TALENTS.find((talent) => talent.id === id);

/** Best content across campaigns (raw; talent & thumbnail are resolved below). */
const RAW_TOP_CONTENTS = [
  { id: 901, talentId: 1, campaignName: 'Glow Up Challenge', title: 'GRWM With GlowSkin New Products: the Results Are Stunning', views: '12.4M', likes: '1.18M', comments: '84K', engagementRate: '9.6%', postedAt: '2026-09-06' },
  { id: 902, talentId: 11, campaignName: 'Next Gen Gaming Gear', title: 'Playing 3 Games at Once With This New Mouse?!', views: '9.8M', likes: '960K', comments: '71K', engagementRate: '12.1%', postedAt: '2026-09-03' },
  { id: 903, talentId: 4, campaignName: 'Nusantara Legendary Food', title: 'Trying 10 Legendary Street Foods, the Bill Made Me Cry', views: '8.6M', likes: '820K', comments: '49K', engagementRate: '8.8%', postedAt: '2026-08-30' },
  { id: 904, talentId: 12, campaignName: 'Lip Tint Sensation', title: 'Swatching Every Lip Tint Shade — No. 3 Is a Must-Try', views: '7.2M', likes: '760K', comments: '38K', engagementRate: '10.2%', postedAt: '2026-09-08' },
  { id: 905, talentId: 5, campaignName: 'Next Gen Gaming Gear', title: 'Rank Push With a Cheap Headset, Even Rivals Were Shocked', views: '6.9M', likes: '640K', comments: '52K', engagementRate: '11.5%', postedAt: '2026-09-01' },
  { id: 906, talentId: 14, campaignName: 'Food Vlogger Gathering', title: 'The Biggest Food Event: Free Food for 8 Straight Hours', views: '5.8M', likes: '540K', comments: '29K', engagementRate: '9.1%', postedAt: '2026-08-25' },
];

/** Ready-to-use top content: thumbnails & talent objects already resolved. */
export const MOCK_TOP_CONTENTS = RAW_TOP_CONTENTS.map((content) => ({
  ...content,
  talent: findTalentById(content.talentId),
  thumbnailUrl: `https://picsum.photos/seed/top-content-${content.id}/360/640`,
}));

