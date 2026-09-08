import { Badge } from '@/components/ui/Badge';
import { CAMPAIGN_STATUS_META } from '@/constants/campaigns';

/**
 * Badge status kampanye dengan label & varian warna terpusat di
 * constants/campaigns.js agar seragam di tabel, filter, dan modal detail.
 */
export const CampaignStatusBadge = ({ status }) => {
  const meta = CAMPAIGN_STATUS_META[status] ?? { label: status, variant: 'secondary' };

  return <Badge variant={meta.variant}>{meta.label}</Badge>;
};
