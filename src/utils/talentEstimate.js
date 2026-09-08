import { parseCompactNumber } from '@/utils/metrics';

/** Perkiraan tarif per view (Rupiah) untuk satu video sponsorship. */
const RATE_PER_VIEW_MIN = 12;
const RATE_PER_VIEW_MAX = 20;

/** Pembulatan harga agar angka estimasi tampak "rapi" (500 ribu). */
const ROUND_STEP = 500_000;

/** Membulatkan nilai ke kelipatan langkah tertentu. */
const roundToStep = (value, step) => Math.round(value / step) * step;

/**
 * Estimasi rate card (harga campaign) kreator, dihitung deterministik dari
 * rata-rata views per video agar selalu konsisten & masuk akal. Pada API
 * sungguhan, nilai ini umumnya disimpan sebagai field terpisah.
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
      hint: 'Satu konten feed untuk produk/layanan.',
      min: singleMin,
      max: singleMax,
    },
    {
      key: 'package',
      label: 'Paket 3 Video',
      hint: 'Tiga konten dalam rentang satu bulan.',
      min: roundToStep(singleMin * 2.4, ROUND_STEP),
      max: roundToStep(singleMax * 2.6, ROUND_STEP),
      highlight: true,
    },
    {
      key: 'live',
      label: 'Live / Event',
      hint: 'Sesi live streaming atau hadir di acara.',
      min: roundToStep(singleMin * 0.55, ROUND_STEP),
      max: roundToStep(singleMax * 0.7, ROUND_STEP),
    },
  ];
};

/** PRNG deterministik (seed numerik) agar deret data tidak berubah antar render. */
const pseudoNoise = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Membangun deret total views harian (mock) dari `totalViews` kreator.
 * Total deret kira-kira mendekati `totalViews` dengan tren menanjak sehingga
 * grafik "30 hari terakhir" terlihat sedang naik.
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
 * Pertumbuhan persen antara nilai terakhir dan pertama deret.
 * Misal 23.4 berarti naik 23.4% selama periode tersebut.
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
