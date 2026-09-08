/**
 * Mock campaign data for the Campaign Manager module.
 *
 * Dates use the 'YYYY-MM-DD' format so they can migrate to a real API later;
 * display formatting is handled by src/utils/date.js. Budgets are stored as
 * raw numbers (Rupiah) and formatted via src/utils/currency.js.
 * Brand categories use the CAMPAIGN_CATEGORIES constants so options stay centralized.
 */

import { MOCK_TALENTS } from '@/data/mockTalents';

/** Default manager for all mock campaigns (mockup — no real auth yet). */
const DEFAULT_MANAGER = { name: 'Sarah Rahmawati', initials: 'SR' };

/** Finds the full talent object from the creator library by id. */
const findTalentById = (id) => MOCK_TALENTS.find((talent) => talent.id === id);

/** Builds a deliverable summary, e.g. '6 videos + 1 live'. */
const buildDeliverableLabel = ({ videos = 0, lives = 0, stories = 0 }) => {
  const parts = [];
  if (videos > 0) parts.push(`${videos} ${videos === 1 ? 'video' : 'videos'}`);
  if (lives > 0) parts.push(`${lives} ${lives === 1 ? 'live' : 'lives'}`);
  if (stories > 0) parts.push(`${stories} ${stories === 1 ? 'story' : 'stories'}`);
  return parts.join(' + ');
};

const RAW_CAMPAIGNS = [
  {
    id: 1,
    name: 'Glow Up Challenge',
    brand: 'GlowSkin ID',
    category: 'Skincare & Beauty',
    status: 'active',
    budget: 385_000_000,
    talentIds: [1, 12, 6],
    deliverables: { videos: 9, lives: 1, stories: 0 },
    progress: 45,
    startDate: '2026-08-14',
    endDate: '2026-09-30',
    kpi: 'ER ≥ 6% & 12M total views',
    goal: 'Raising awareness of the newest GlowSkin ID serum through beauty creators with wide reach.',
  },
  {
    id: 2,
    name: 'Nusantara Legendary Food',
    brand: 'Dapur Nusantara',
    category: 'Food & Beverage',
    status: 'active',
    budget: 220_000_000,
    talentIds: [4, 9, 14],
    deliverables: { videos: 8, lives: 0, stories: 4 },
    progress: 62,
    startDate: '2026-08-20',
    endDate: '2026-10-05',
    kpi: 'Min. 1.5M views per video & 3% store CTR',
    goal: 'Driving foot traffic and seasonal menu sales through authentic food reviews.',
  },
  {
    id: 3,
    name: 'Next Gen Gaming Gear',
    brand: 'PlayMax Store',
    category: 'Gaming',
    status: 'active',
    budget: 310_000_000,
    talentIds: [5, 11],
    deliverables: { videos: 6, lives: 2, stories: 0 },
    progress: 28,
    startDate: '2026-08-28',
    endDate: '2026-10-15',
    kpi: '12M impressions & 30K store-link clicks',
    goal: 'Launching a new gaming accessories line with gameplay demos from top gaming creators.',
  },
  {
    id: 4,
    name: 'Smartphone Midrange 2026',
    brand: 'TeknoCell',
    category: 'Technology',
    status: 'awaiting',
    budget: 175_000_000,
    talentIds: [2, 7],
    deliverables: { videos: 5, lives: 1, stories: 0 },
    progress: 10,
    startDate: '2026-09-12',
    endDate: '2026-10-12',
    kpi: 'ER ≥ 5% & honest reviews without over-scripting',
    goal: 'Positioning the best midrange phone of 2026 for students and young professionals.',
  },
  {
    id: 5,
    name: 'Fashion Hijab Modern',
    brand: 'Aksara Modest',
    category: 'Fashion',
    status: 'review',
    budget: 145_000_000,
    talentIds: [3, 8],
    deliverables: { videos: 6, lives: 0, stories: 6 },
    progress: 80,
    startDate: '2026-07-20',
    endDate: '2026-09-18',
    kpi: 'ER ≥ 7% & 8M combined views',
    goal: 'Introducing a premium hijab collection with everyday styling combos.',
  },
  {
    id: 6,
    name: 'Snack Time Challenge',
    brand: 'Krezz Snack',
    category: 'Food & Beverage',
    status: 'review',
    budget: 98_000_000,
    talentIds: [4, 14],
    deliverables: { videos: 4, lives: 0, stories: 2 },
    progress: 75,
    startDate: '2026-08-01',
    endDate: '2026-09-15',
    kpi: '6M views & 4K challenge comments',
    goal: 'Getting the audience to create their own reaction videos to Krezz snacks.',
  },
  {
    id: 7,
    name: 'Beauty Basics Tutorial',
    brand: 'GlowSkin ID',
    category: 'Skincare & Beauty',
    status: 'completed',
    budget: 210_000_000,
    talentIds: [1, 6],
    deliverables: { videos: 8, lives: 0, stories: 0 },
    progress: 100,
    startDate: '2026-05-10',
    endDate: '2026-07-15',
    kpi: '10M views & 8% average ER',
    goal: 'Educating new users on basic skincare routines.',
  },
  {
    id: 8,
    name: 'Standup Comedy Mini Series',
    brand: 'Kopi Senja',
    category: 'Entertainment',
    status: 'completed',
    budget: 165_000_000,
    talentIds: [10, 13],
    deliverables: { videos: 6, lives: 0, stories: 6 },
    progress: 100,
    startDate: '2026-06-01',
    endDate: '2026-08-01',
    kpi: '8M views & 60K brand mentions',
    goal: 'Boosting brand vibe through young-adult humor content at the cafe.',
  },
  {
    id: 9,
    name: 'Food Vlogger Gathering',
    brand: 'GoRasa',
    category: 'Food & Beverage',
    status: 'completed',
    budget: 120_000_000,
    talentIds: [9, 14],
    deliverables: { videos: 5, lives: 1, stories: 8 },
    progress: 100,
    startDate: '2026-06-20',
    endDate: '2026-08-20',
    kpi: '5M views & 25K coupon downloads',
    goal: 'Celebrating the GoRasa app anniversary with collaborative food-creator content.',
  },
  {
    id: 10,
    name: 'Lip Tint Sensation',
    brand: 'GlowSkin ID',
    category: 'Skincare & Beauty',
    status: 'awaiting',
    budget: 88_000_000,
    talentIds: [12],
    deliverables: { videos: 3, lives: 0, stories: 3 },
    progress: 15,
    startDate: '2026-09-15',
    endDate: '2026-10-10',
    kpi: 'ER ≥ 8% & 3M views',
    goal: 'Launching a new lip tint with shade demos across skin tones.',
  },
  {
    id: 11,
    name: 'Back to Campus Gadget Fair',
    brand: 'EduMart',
    category: 'Technology',
    status: 'draft',
    budget: 0,
    talentIds: [2, 7],
    deliverables: { videos: 4, lives: 0, stories: 0 },
    progress: 0,
    startDate: null,
    endDate: null,
    kpi: 'Not set yet',
    goal: 'Affordable gadget bundle for students — waiting for budget & schedule finalization.',
  },
];

/**
 * Ready-to-use campaigns: injects a unique code, a compact deliverable label,
 * the manager, and resolves `talentIds` into an array of full talent objects
 * so page components can render without re-looking them up.
 */
export const MOCK_CAMPAIGNS = RAW_CAMPAIGNS.map((campaign) => ({
  ...campaign,
  code: `CMP-${String(campaign.id).padStart(3, '0')}`,
  manager: DEFAULT_MANAGER,
  deliverableLabel: buildDeliverableLabel(campaign.deliverables),
  talents: campaign.talentIds.map(findTalentById).filter(Boolean),
}));

