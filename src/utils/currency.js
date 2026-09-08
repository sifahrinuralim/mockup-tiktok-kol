/**
 * Formatter angka mata uang Rupiah untuk estimasi harga campaign.
 * Nilai input berupa angka mentah (number), bukan string siap-tampil.
 */

/** Formatter Rupiah penuh dengan pemisah ribuan, tanpa desimal. */
const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

/**
 * Format angka penuh menjadi teks Rupiah, mis. 18500000 → 'Rp 18.500.000'.
 *
 * @param {number} value
 * @returns {string}
 */
export const formatRupiah = (value) => rupiahFormatter.format(value);

/** Membuang trailing zero pada desimal, mis. '8.50' → '8.5'. */
const trimDecimalZero = (number, decimals) => {
  const fixed = number.toFixed(decimals);
  return fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
};

/**
 * Format Rupiah ringkas untuk ruang sempit, mis. 18500000 → 'Rp 18,5 jt'.
 * Akhiran Indonesia: 'rb' (ribu), 'jt' (juta), 'M' (miliar).
 *
 * @param {number} value
 * @returns {string}
 */
export const formatRupiahShort = (value) => {
  if (!Number.isFinite(value)) return 'Rp 0';

  const absolute = Math.abs(value);
  if (absolute >= 1e9) return `Rp ${trimDecimalZero(value / 1e9, 1)} M`;
  if (absolute >= 1e6) return `Rp ${trimDecimalZero(value / 1e6, 1)} jt`;
  if (absolute >= 1e3) return `Rp ${trimDecimalZero(value / 1e3, 0)} rb`;
  return `Rp ${trimDecimalZero(value, 0)}`;
};
