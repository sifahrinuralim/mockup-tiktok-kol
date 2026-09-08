/** Daftar nama bulan singkat (Indonesia) untuk label tanggal mock. */
const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

/**
 * Mengurai tanggal dari objek Date atau string 'YYYY-MM-DD' ke Date lokal.
 * String diurai manual agar tidak bergeser karena zona waktu (UTC).
 *
 * @param {Date|string} input
 * @returns {Date}
 */
const parseDate = (input) => {
  if (input instanceof Date) return input;

  const match = String(input).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return new Date(input);

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
};

/** Format tanggal singkat, mis. '2 Sep 2026' -> '2 Sep'. */
export const formatDateShort = (input) => {
  const date = parseDate(input);
  return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]}`;
};

/** Format tanggal panjang, mis. '2 Sep 2026'. */
export const formatDateLong = (input) => {
  const date = parseDate(input);
  return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Membuat daftar label tanggal untuk N hari terakhir (tertua → hari ini).
 * Label terakhir diganti 'Hari ini' agar grafik mudah dibaca.
 *
 * @param {number} count
 * @returns {string[]}
 */
export const buildDailyLabels = (count) => {
  const today = new Date();

  return Array.from({ length: count }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (count - 1 - index));
    return index === count - 1 ? 'Hari ini' : formatDateShort(day);
  });
};
