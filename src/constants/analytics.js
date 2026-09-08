/**
 * Analytics domain constants: report time-range options.
 * Period values are used as data keys in src/data/mockAnalytics.js.
 */

/** Available period values on the Analytics page. */
export const ANALYTICS_PERIODS = {
  WEEK: '7d',
  MONTH: '30d',
  QUARTER: '90d',
};

/** Period control tab/segment options (display order). */
export const ANALYTICS_PERIOD_OPTIONS = [
  { value: ANALYTICS_PERIODS.WEEK, label: '7 Days' },
  { value: ANALYTICS_PERIODS.MONTH, label: '30 Days' },
  { value: ANALYTICS_PERIODS.QUARTER, label: '90 Days' },
];

/** Default period when the page first opens. */
export const ANALYTICS_DEFAULT_PERIOD = ANALYTICS_PERIODS.MONTH;
