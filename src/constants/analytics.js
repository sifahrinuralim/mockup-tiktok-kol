/**
 * Konstanta domain Analytics: opsi rentang waktu pelaporan.
 * Nilai periode dipakai sebagai kunci data di src/data/mockAnalytics.js.
 */

/** Nilai periode yang tersedia pada halaman Analytics. */
export const ANALYTICS_PERIODS = {
  WEEK: '7d',
  MONTH: '30d',
  QUARTER: '90d',
};

/** Opsi tab/segmen kontrol periode (urutan tampilan). */
export const ANALYTICS_PERIOD_OPTIONS = [
  { value: ANALYTICS_PERIODS.WEEK, label: '7 Hari' },
  { value: ANALYTICS_PERIODS.MONTH, label: '30 Hari' },
  { value: ANALYTICS_PERIODS.QUARTER, label: '90 Hari' },
];

/** Periode bawaan saat halaman pertama kali dibuka. */
export const ANALYTICS_DEFAULT_PERIOD = ANALYTICS_PERIODS.MONTH;
