import { TalentCard } from './TalentCard';

/**
 * Kisi (grid) kartu kreator.
 * Responsif: 1 kolom mobile, 2 kolom tablet, 3 kolom laptop, 4 kolom desktop lebar.
 * `selectedIds` & `onToggleCampaign` meneruskan state shortlist dari halaman.
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
