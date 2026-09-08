/**
 * Mock profile & preferences data for the Profile module.
 * Core identity (name, email, initials) is kept in sync with CURRENT_USER in
 * constants/app.js so the Navbar and the Profile page always show the same.
 */

import { CURRENT_USER } from '@/constants/app';

/** App notification preferences (mock) with a fixed render order. */
export const NOTIFICATION_PREFERENCES = {
  campaignUpdates: {
    label: 'Campaign Updates',
    description: 'Status of briefs, content, and reports for campaigns you manage.',
    enabled: true,
  },
  newTalentMatches: {
    label: 'New Matching Creators',
    description: 'Recommendations for new creators that match the lists & categories you follow.',
    enabled: true,
  },
  weeklyReport: {
    label: 'Weekly Summary',
    description: 'A performance summary of your campaigns and creators every Monday morning.',
    enabled: false,
  },
  productNews: {
    label: 'New Feature Updates',
    description: 'Announcements about new TalentPulse features and quick usage tips.',
    enabled: false,
  },
};

/** Other account settings (language, timezone) that aren't toggles yet. */
export const PROFILE_SETTINGS = {
  language: 'English',
  timezone: 'Asia/Jakarta (UTC+7)',
  weeklyDigest: NOTIFICATION_PREFERENCES.weeklyReport.enabled,
};

/**
 * Full profile data for the Profile page. The `agency`, `stats`, and
 * `joinedAt` fields are extra mock additions beyond the core identity
 * used by the Navbar.
 */
export const MOCK_PROFILE = {
  ...CURRENT_USER,
  phone: '+62 812-3456-7890',
  avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=sarah.talentpulse&backgroundColor=d1d4f9',
  joinedAt: '2026-01-12',
  bio: 'Agency Manager responsible for running TikTok campaigns end-to-end, from brief to performance reports.',
  agency: {
    name: 'PT TalentPulse Media',
    legalName: 'PT Talentpulse Media Nusantara',
    address: 'Creatif Hub Building, 8th Floor, Jl. Jend. Sudirman Kav. 52-53, South Jakarta',
    verified: true,
    teamSize: '12 people',
  },
  stats: {
    campaignsManaged: 14,
    activeCampaigns: 3,
    totalSpend: 1_680_000_000,
    averageEngagement: '8.4%',
  },
};

/** Recent account activity history (mock). */
export const RECENT_ACTIVITY = [
  { id: 1, label: 'Created the “Lip Tint Sensation” campaign', time: '2 days ago' },
  { id: 2, label: 'Approved @citraayu content for “Nusantara Legendary Food”', time: '4 days ago' },
  { id: 3, label: 'Downloaded the “Beauty Macro Creator” list', time: '1 week ago' },
  { id: 4, label: 'Updated the agency profile', time: '2 weeks ago' },
];
