/**
 * Mock data of saved creator lists for the Saved Lists module.
 * Lists store `talentIds`, which are resolved into full talent objects on
 * export so components don't need to look them up themselves.
 * Total budget estimates are derived from each creator's rate card (shared util).
 */

import { MOCK_TALENTS } from '@/data/mockTalents';
import { estimateRateCardTiers } from '@/utils/talentEstimate';

/** Finds the full talent object from the creator library by id. */
const findTalentById = (id) => MOCK_TALENTS.find((talent) => talent.id === id);

const RAW_SAVED_LISTS = [
  {
    id: 1,
    name: 'Beauty Macro Creator',
    category: 'Beauty',
    target: 'mega',
    description:
      'Beauty creators with an engagement rate above 9% — a fit for premium skincare and cosmetics campaigns.',
    tags: ['Skincare', 'ER ≥ 9%', 'Female'],
    talentIds: [1, 12, 6],
    createdAt: '2026-07-12',
    updatedAt: '2026-09-06',
  },
  {
    id: 2,
    name: 'Nusantara Food',
    category: 'Food',
    target: 'mixed',
    description:
      'Food creators covering traditional and modern dishes from cities across Indonesia.',
    tags: ['Food', 'Local', 'Food Review'],
    talentIds: [4, 9, 14],
    createdAt: '2026-06-03',
    updatedAt: '2026-09-01',
  },
  {
    id: 3,
    name: 'Gaming Viral Squad',
    category: 'Gaming',
    target: 'mixed',
    description:
      'Gaming creators with an entertaining content style and high engagement for game & accessory campaigns.',
    tags: ['Mobile Game', 'Live', 'Esports'],
    talentIds: [5, 11],
    createdAt: '2026-05-19',
    updatedAt: '2026-08-28',
  },
  {
    id: 4,
    name: 'Reviewer Tech & Gadget',
    category: 'Tech',
    target: 'macro',
    description:
      'Trusted tech reviewers for honest takes on smartphones, laptops, and smart devices.',
    tags: ['Honest Reviews', 'Gadget', 'Students'],
    talentIds: [2, 7],
    createdAt: '2026-05-02',
    updatedAt: '2026-08-20',
  },
  {
    id: 5,
    name: 'Fashion & Hijab Inspiration',
    category: 'Fashion',
    target: 'mid',
    description:
      'Modest-fashion creators for Muslimah-wear campaigns and women apparel brands.',
    tags: ['Modest Fashion', 'OOTD', 'Women'],
    talentIds: [3, 8],
    createdAt: '2026-04-15',
    updatedAt: '2026-08-11',
  },
  {
    id: 6,
    name: 'Multi-Niche Top Talent',
    category: 'Multi-category',
    target: 'mega',
    description:
      'Top creators across categories for fast campaigns that need maximum reach.',
    tags: ['Top Rated', 'Viral', 'Multi Brand'],
    talentIds: [1, 4, 5, 10, 11, 12],
    createdAt: '2026-03-28',
    updatedAt: '2026-09-08',
  },
];

/**
 * Ready-to-use lists: each list comes with its full talent members, member
 * count, and an estimated minimum total budget (1-video rate card per creator).
 */
export const MOCK_SAVED_LISTS = RAW_SAVED_LISTS.map((list) => {
  const members = list.talentIds.map(findTalentById).filter(Boolean);
  const estimatedBudget = members.reduce(
    (total, member) => total + estimateRateCardTiers(member)[0].min,
    0,
  );

  return {
    ...list,
    members,
    memberCount: members.length,
    estimatedBudget,
  };
});
