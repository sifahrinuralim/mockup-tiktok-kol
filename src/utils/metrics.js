/** Faktor pengali untuk angka ringkas berakhiran K/M/B. */
const COMPACT_SUFFIX_MULTIPLIERS = {
  K: 1e3,
  M: 1e6,
  B: 1e9,
};

/**
 * Mengubah angka ringkas siap-tampil ('2.8M', '890K', '9.4%') menjadi
 * angka mentah untuk keperluan sorting/perhitungan.
 *
 * @param {string|number} value
 * @returns {number}
 */
export const parseCompactNumber = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  const normalized = String(value ?? '')
    .replace(/[%,\s]/g, '')
    .trim()
    .toUpperCase();

  const match = normalized.match(/^(\d+(?:\.\d+)?)([KMB])?$/);
  if (!match) return 0;

  const number = Number.parseFloat(match[1]);
  const suffix = match[2];
  return suffix ? number * COMPACT_SUFFIX_MULTIPLIERS[suffix] : number;
};

/** Membuang trailing zero pada desimal hasil toFixed, mis. '8.50' → '8.5'. */
const trimFixed = (number, decimals) => {
  const fixed = number.toFixed(decimals);
  return fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
};

/**
 * Memformat angka mentah menjadi angka ringkas ('930.7M', '1.2B').
 *
 * @param {number} value
 * @param {number} [decimals=1]
 * @returns {string}
 */
export const formatCompactNumber = (value, decimals = 1) => {
  if (!Number.isFinite(value)) return '0';

  const absolute = Math.abs(value);
  if (absolute >= 1e12) return `${trimFixed(value / 1e12, 2)}T`;
  if (absolute >= 1e9) return `${trimFixed(value / 1e9, decimals)}B`;
  if (absolute >= 1e6) return `${trimFixed(value / 1e6, decimals)}M`;
  if (absolute >= 1e3) return `${trimFixed(value / 1e3, decimals)}K`;
  return trimFixed(value, 0);
};
