import { CategoryChip } from '@/components/common/CategoryChip';
import { TalentIdentity } from '@/components/common/TalentIdentity';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table';
import { cn } from '@/utils/cn';
import { formatRupiahShort } from '@/utils/currency';

import { GrowthBadge } from './GrowthBadge';

/** Gaya lingkaran nomor peringkat — tiga teratas diberi warna medali. */
const RANK_CIRCLE_CLASSES = {
  1: 'bg-amber-100 text-amber-700',
  2: 'bg-slate-200 text-slate-600',
  3: 'bg-orange-100 text-orange-700',
};

/** Nomor peringkat berbentuk lingkaran untuk baris tabel/list. */
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

/** Tabel peringkat lengkap untuk layar lg ke atas. */
const DesktopLeaderboard = ({ talents }) => (
  <Table>
    <THead>
      <Tr>
        <Th>Peringkat</Th>
        <Th>Kreator</Th>
        <Th>Kategori</Th>
        <Th className="text-right">Followers</Th>
        <Th className="text-right">Total Views</Th>
        <Th className="text-right">Eng. Rate</Th>
        <Th>Growth 30 Hari</Th>
        <Th className="text-right">Rate 1 Video</Th>
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

/** Daftar kartu pengganti tabel untuk layar di bawah lg. */
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
                Rate 1 Video
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
 * Tampilan daftar peringkat (table view).
 * Desktop: tabel penuh; mobile: daftar kartu agar tetap terbaca.
 */
export const TopTalentsTable = ({ talents }) => (
  <>
    <Card className="hidden overflow-hidden lg:block">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Peringkat Berdasarkan Skor</h3>
          <p className="text-xs text-slate-500">
            Skor gabungan total views, followers, dan engagement rate.
          </p>
        </div>
        <Badge variant="secondary">{talents.length} kreator</Badge>
      </div>
      <DesktopLeaderboard talents={talents} />
    </Card>

    <MobileLeaderboard talents={talents} />
  </>
);
