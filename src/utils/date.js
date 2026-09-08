/** Short month names used for mock date labels. */
const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Parses a Date object or 'YYYY-MM-DD' string into a local Date.
 * Strings are parsed manually so they don't shift due to timezones (UTC).
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

/** Short date format, e.g. '2 Sep 2026' -> '2 Sep'. */
export const formatDateShort = (input) => {
  const date = parseDate(input);
  return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]}`;
};

/** Long date format, e.g. '2 Sep 2026'. */
export const formatDateLong = (input) => {
  const date = parseDate(input);
  return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Builds date labels for the last N days (oldest → today).
 * The last label becomes 'Today' so the chart is easy to read.
 *
 * @param {number} count
 * @returns {string[]}
 */
export const buildDailyLabels = (count) => {
  const today = new Date();

  return Array.from({ length: count }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (count - 1 - index));
    return index === count - 1 ? 'Today' : formatDateShort(day);
  });
};
