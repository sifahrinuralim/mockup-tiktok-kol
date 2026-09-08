import { Badge } from '@/components/ui/Badge';
import { CAMPAIGN_STATUS_META } from '@/constants/campaigns';

/**
 * Campaign status badge with labels & color variants centralized in
 * constants/campaigns.js so tables, filters, and detail modals stay uniform.
 */
export const CampaignStatusBadge = ({ status }) => {
  const meta = CAMPAIGN_STATUS_META[status] ?? { label: status, variant: 'secondary' };

  return <Badge variant={meta.variant}>{meta.label}</Badge>;
};
