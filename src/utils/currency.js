/**
 * Rupiah currency formatter for campaign price estimates.
 * Input values are raw numbers, not ready-to-display strings.
 */

/** Full Rupiah formatter with thousands separators, no decimals. */
const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

/**
 * Formats a full number as Rupiah text, e.g. 18500000 → 'Rp 18.500.000'.
 *
 * @param {number} value
 * @returns {string}
 */
export const formatRupiah = (value) => rupiahFormatter.format(value);

/** Removes trailing zeros from decimals, e.g. '8.50' → '8.5'. */
const trimDecimalZero = (number, decimals) => {
  const fixed = number.toFixed(decimals);
  return fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
};

/**
 * Compact Rupiah format for tight spaces, e.g. 18500000 → 'Rp 18.5M'.
 * Suffixes: 'K' (thousand), 'M' (million), 'B' (billion).
 *
 * @param {number} value
 * @returns {string}
 */
export const formatRupiahShort = (value) => {
  if (!Number.isFinite(value)) return 'Rp 0';

  const absolute = Math.abs(value);
  if (absolute >= 1e9) return `Rp ${trimDecimalZero(value / 1e9, 1)} B`;
  if (absolute >= 1e6) return `Rp ${trimDecimalZero(value / 1e6, 1)} M`;
  if (absolute >= 1e3) return `Rp ${trimDecimalZero(value / 1e3, 0)} K`;
  return `Rp ${trimDecimalZero(value, 0)}`;
};
