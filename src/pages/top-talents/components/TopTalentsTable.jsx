import { CategoryChip } from '@/components/common/CategoryChip';
import { TalentIdentity } from '@/components/common/TalentIdentity';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table';
import { cn } from '@/utils/cn';
import { formatRupiahShort } from '@/utils/currency';

import { GrowthBadge } from './GrowthBadge';

/** Rank number circle styles — the top three get medal colors. */
const RANK_CIRCLE_CLASSES = {
  1: 'bg-amber-100 text-amber-700',
  2: 'bg-slate-200 text-slate-600',
  3: 'bg-orange-100 text-orange-700',
};

/** Circle rank number for table/list rows. */
const RankBadge = ({ rank }) => (
  <span
    className={cn(
      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
      RANK_CIRCLE_CLASSES[rank] ?? 'bg-slate-100 text-slate-500',
    )}
  >
    {rank}
  </span>
);

/** Full ranking table for lg screens and up. */
const DesktopLeaderboard = ({ talents }) => (
  <Table>
    <THead>
      <Tr>
        <Th>Rank</Th>
        <Th>Creator</Th>
        <Th>Category</Th>
        <Th className="text-right">Followers</Th>
        <Th className="text-right">Total Views</Th>
        <Th className="text-right">Eng. Rate</Th>
        <Th>30-Day Growth</Th>
        <Th className="text-right">1-Video Rate</Th>
      </Tr>
    </THead>
    <TBody>
      {talents.map((talent) => (
        <Tr key={talent.id}>
          <Td>
            <RankBadge rank={talent.rank} />
          </Td>
          <Td>
            <TalentIdentity talent={talent} />
          </Td>
          <Td>
            <CategoryChip category={talent.category} />
          </Td>
          <Td className="text-right font-semibold text-slate-800">{talent.followers}</Td>
          <Td className="text-right font-semibold text-slate-800">{talent.totalViews}</Td>
          <Td className="text-right font-semibold text-emerald-600">{talent.engagementRate}</Td>
          <Td>
            <GrowthBadge value={talent.growthPct} />
          </Td>
          <Td className="text-right font-semibold text-slate-800">
            {formatRupiahShort(talent.feeSingleMin)}
          </Td>
        </Tr>
      ))}
    </TBody>
  </Table>
);

/** Card list that replaces the table below lg. */
const MobileLeaderboard = ({ talents }) => (
  <Card className="lg:hidden">
    <ul role="list" className="divide-y divide-slate-100">
      {talents.map((talent) => (
        <li key={talent.id} className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <RankBadge rank={talent.rank} />
            <div className="min-w-0 flex-1">
              <TalentIdentity talent={talent} imageClassName="h-11 w-11 rounded-xl" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <CategoryChip category={talent.category} />
            <GrowthBadge value={talent.growthPct} />
          </div>

          <dl className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
            <div className="min-w-0 text-center">
              <dt className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Followers
              </dt>
              <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">
                {talent.followers}
              </dd>
            </div>
            <div className="min-w-0 text-center">
              <dt className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Total Views
              </dt>
              <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">
                {talent.totalViews}
              </dd>
            </div>
            <div className="min-w-0 text-center">
              <dt className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
                1-Video Rate
              </dt>
              <dd className="mt-0.5 truncate text-sm font-bold text-primary-700">
                {formatRupiahShort(talent.feeSingleMin)}
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  </Card>
);

/**
 * Ranking list view (table view).
 * Desktop: full table; mobile: card list to stay readable.
 */
export const TopTalentsTable = ({ talents }) => (
  <>
    <Card className="hidden overflow-hidden lg:block">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Ranked by Score</h3>
          <p className="text-xs text-slate-500">
            Combined score of total views, followers, and engagement rate.
          </p>
        </div>
        <Badge variant="secondary">{talents.length} creators</Badge>
      </div>
      <DesktopLeaderboard talents={talents} />
    </Card>

    <MobileLeaderboard talents={talents} />
  </>
);
