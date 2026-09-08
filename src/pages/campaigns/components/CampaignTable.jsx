import { CalendarDays, Eye, UserRound, Wallet } from 'lucide-react';

import { AvatarStack } from '@/components/common/AvatarStack';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table';
import { formatRupiahShort } from '@/utils/currency';
import { formatDateShort } from '@/utils/date';

import { CampaignStatusBadge } from './CampaignStatusBadge';
import { ProgressBar } from './ProgressBar';

const MAX_VISIBLE_AVATARS = 3;

/** Avatar stack for campaign creators (text fallback when there are no talents yet). */
const TalentAvatarStack = ({ talents }) =>
  talents.length === 0 ? (
    <span className="text-sm text-slate-400">None yet</span>
  ) : (
    <AvatarStack talents={talents} max={MAX_VISIBLE_AVATARS} />
  );

/** Campaign schedule range text (or 'Not scheduled'). */
const formatSchedule = (campaign) => {
  if (!campaign.startDate || !campaign.endDate) return 'Not scheduled';
  return `${formatDateShort(campaign.startDate)} – ${formatDateShort(campaign.endDate)}`;
};

/** Campaign table for lg screens and up. */
const DesktopCampaignTable = ({ campaigns, onView }) => (
  <Table>
    <THead>
      <Tr>
        <Th>Campaign</Th>
        <Th>Status</Th>
        <Th>Talent</Th>
        <Th>Schedule</Th>
        <Th className="w-52">Progress</Th>
        <Th className="text-right">Budget</Th>
        <Th>
          <span className="sr-only">Actions</span>
        </Th>
      </Tr>
    </THead>
    <TBody>
      {campaigns.map((campaign) => (
        <Tr key={campaign.id}>
          <Td>
            <p className="font-semibold text-slate-800">{campaign.name}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {campaign.brand} • {campaign.code}
            </p>
          </Td>
          <Td>
            <CampaignStatusBadge status={campaign.status} />
          </Td>
          <Td>
            <TalentAvatarStack talents={campaign.talents} />
          </Td>
          <Td className="text-slate-500">{formatSchedule(campaign)}</Td>
          <Td>
            <ProgressBar value={campaign.progress} showLabel />
          </Td>
          <Td className="text-right font-semibold text-slate-800">
            {campaign.budget > 0 ? formatRupiahShort(campaign.budget) : 'Not set'}
          </Td>
          <Td>
            <Button variant="outline" size="sm" onClick={() => onView(campaign)}>
              <Eye className="h-4 w-4" aria-hidden="true" />
              Detail
            </Button>
          </Td>
        </Tr>
      ))}
    </TBody>
  </Table>
);

/** Card list that replaces the table below lg. */
const MobileCampaignList = ({ campaigns, onView }) => (
  <Card className="lg:hidden">
    <ul role="list" className="divide-y divide-slate-100">
      {campaigns.map((campaign) => (
        <li key={campaign.id} className="space-y-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-slate-800">{campaign.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {campaign.brand} • {campaign.code}
              </p>
            </div>
            <CampaignStatusBadge status={campaign.status} />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              {campaign.talents.length} talents
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatSchedule(campaign)}
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
              <Wallet className="h-4 w-4" aria-hidden="true" />
              {campaign.budget > 0 ? formatRupiahShort(campaign.budget) : 'Not set'}
            </span>
          </div>

          <ProgressBar value={campaign.progress} showLabel />

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
            <TalentAvatarStack talents={campaign.talents} />
            <Button variant="outline" size="sm" onClick={() => onView(campaign)}>
              <Eye className="h-4 w-4" aria-hidden="true" />
              View Details
            </Button>
          </div>
        </li>
      ))}
    </ul>
  </Card>
);

/**
 * Campaign list view (table view).
 * Desktop: full table; mobile: compact card list.
 */
export const CampaignTable = ({ campaigns, onView }) => (
  <>
    <Card className="hidden overflow-hidden lg:block">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Campaign List</h3>
          <p className="text-xs text-slate-500">Click “Details” to see progress & talent.</p>
        </div>
        <Badge variant="secondary">{campaigns.length} campaigns</Badge>
      </div>
      <DesktopCampaignTable campaigns={campaigns} onView={onView} />
    </Card>

    <MobileCampaignList campaigns={campaigns} onView={onView} />
  </>
);
