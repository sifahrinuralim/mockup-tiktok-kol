import { TalentCard } from './TalentCard';

/**
 * Grid of creator cards.
 * Responsive: 1 column on mobile, 2 on tablet, 3 on laptop, 4 on wide desktop.
 * `selectedIds` & `onToggleCampaign` forward the shortlist state from the page.
 */
export const TalentGrid = ({ talents, selectedIds, onToggleCampaign }) => (
  <ul
    role="list"
    className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
  >
    {talents.map((talent) => (
      <li key={talent.id} className="h-full">
        <TalentCard
          talent={talent}
          isInCampaign={selectedIds.includes(talent.id)}
          onToggleCampaign={() => onToggleCampaign(talent.id)}
        />
      </li>
    ))}
  </ul>
);
