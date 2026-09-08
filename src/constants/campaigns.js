/**
 * Campaign Manager domain constants:
 * statuses, filters, brand category options, and campaign workflow stages.
 * Statuses are mapped to <Badge> variants so label colors stay consistent.
 */

/** Campaign status values (pipeline). */
export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  AWAITING: 'awaiting',
  ACTIVE: 'active',
  REVIEW: 'review',
  COMPLETED: 'completed',
};

/** Per-status metadata: label + Badge color variant. */
export const CAMPAIGN_STATUS_META = {
  [CAMPAIGN_STATUS.DRAFT]: { label: 'Draft', variant: 'outline' },
  [CAMPAIGN_STATUS.AWAITING]: { label: 'Awaiting Talent', variant: 'warning' },
  [CAMPAIGN_STATUS.ACTIVE]: { label: 'Active', variant: 'success' },
  [CAMPAIGN_STATUS.REVIEW]: { label: 'Content Review', variant: 'primary' },
  [CAMPAIGN_STATUS.COMPLETED]: { label: 'Completed', variant: 'secondary' },
};

/** Status order for filters & summary counts (not alphabetical). */
export const CAMPAIGN_STATUS_ORDER = [
  CAMPAIGN_STATUS.DRAFT,
  CAMPAIGN_STATUS.AWAITING,
  CAMPAIGN_STATUS.ACTIVE,
  CAMPAIGN_STATUS.REVIEW,
  CAMPAIGN_STATUS.COMPLETED,
];

/** Status filter options (tabs) on the page: 'all' + all statuses in order. */
export const CAMPAIGN_STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  ...CAMPAIGN_STATUS_ORDER.map((value) => ({
    value,
    label: CAMPAIGN_STATUS_META[value].label,
  })),
];

/** Brand industry categories for campaigns (form options & table labels). */
export const CAMPAIGN_CATEGORIES = [
  'Skincare & Beauty',
  'Fashion',
  'Food & Beverage',
  'Gaming',
  'Technology',
  'Entertainment',
  'Travel',
  'Finance',
];

/**
 * Campaign workflow stages (timeline in the detail modal).
 * `threshold` is the minimum progress for a stage to count as complete.
 */
export const CAMPAIGN_TIMELINE_STEPS = [
  { key: 'brief', label: 'Brief Prepared', hint: 'Concept, deliverables, and rates are agreed.', threshold: 10 },
  { key: 'talent', label: 'Talent Confirmed', hint: 'Creator agrees and the contract is signed.', threshold: 35 },
  { key: 'content', label: 'Content Production', hint: 'Creator submits content drafts per the brief.', threshold: 65 },
  { key: 'approval', label: 'Review & Revision', hint: 'Content is approved by the brand before going live.', threshold: 85 },
  { key: 'report', label: 'Live & Reporting', hint: 'Content goes live, then the performance report is sent.', threshold: 100 },
];
