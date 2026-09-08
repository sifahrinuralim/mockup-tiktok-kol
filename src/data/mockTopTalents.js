/**
 * Data dummy peringkat Top Talents.
 *
 * Seluruh nilai diturunkan deterministik dari MOCK_TALENTS lewat util
 * bersama (parseCompactNumber, buildViewsTrendSeries, computeGrowthPercent,
 * estimateRateCardTiers) sehingga angka konsisten antar halaman dan stabil
 * antar render. `score` adalah gabungan total views, followers, dan
 * engagement rate untuk menentukan peringkat.
 */

import { MOCK_TALENTS } from '@/data/mockTalents';
import { parseCompactNumber } from '@/utils/metrics';
import {
  buildViewsTrendSeries,
  computeGrowthPercent,
  estimateRateCardTiers,
} from '@/utils/talentEstimate';

/** Hitung skor performa gabungan untuk kebutuhan peringkat. */
const computeScore = (talent) => {
  const viewsMillion = parseCompactNumber(talent.totalViews) / 1e6;
  const followersMillion = parseCompactNumber(talent.followers) / 1e6;
  const engagementRate = parseCompactNumber(talent.engagementRate);

  return Math.round(viewsMillion * 3.5 + engagementRate * 3 + followersMillion * 2);
};

/**
 * Peringkat kreator terbaik (mock): diurutkan dari skor tertinggi ke
 * terendah dan diberi `rank` 1..N. Growth 30 hari & estimasi rate card
 * disertakan agar tabel peringkat tidak perlu menghitung ulang di komponen.
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

/** Konfigurasi ringkasan halaman: jumlah teratas yang dipakai di hero stats. */
export const TOP_TALENTS_PODIUM_COUNT = 3;
