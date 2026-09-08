import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { CategoryChip } from '@/components/common/CategoryChip';
import { TalentIdentity } from '@/components/common/TalentIdentity';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table';
import { cn } from '@/utils/cn';

import { TalentMetricList } from './TalentMetricList';

/** Kolom numerik yang bisa diurutkan lewat header tabel. */
const SORTABLE_COLUMNS = [
  { key: 'followers', label: 'Followers' },
  { key: 'totalViews', label: 'Total Views' },
  { key: 'engagementRate', label: 'Engagement Rate' },
];

/** Header kolom numerik yang bisa diklik untuk mengurutkan hasil. */
const SortableHeader = ({ column, sortKey, sortDirection, onSortHeader }) => {
  const isActive = sortKey === column.key;
  const DirectionIcon = isActive ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <Th
      className="text-right"
      aria-sort={isActive ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
    >
      <button
        type="button"
        onClick={() => onSortHeader(column.key)}
        aria-label={`${column.label} — klik untuk mengubah urutan`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          isActive ? 'text-primary-700' : 'text-slate-500 hover:text-slate-800',
        )}
      >
        {column.label}
        <DirectionIcon
          className={cn('h-3.5 w-3.5', isActive ? 'text-primary-600' : 'text-slate-400')}
          aria-hidden="true"
        />
      </button>
    </Th>
  );
};

/** Tabel lengkap — hanya dirender pada layar laptop/desktop (lg ke atas). */
const DesktopTable = ({ talents, sortKey, sortDirection, onSortHeader }) => (
  <Table>
    <THead>
      <Tr>
        <Th>Kreator</Th>
        <Th>Kategori</Th>
        {SORTABLE_COLUMNS.map((column) => (
          <SortableHeader
            key={column.key}
            column={column}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSortHeader={onSortHeader}
          />
        ))}
        <Th>Lokasi</Th>
      </Tr>
    </THead>
    <TBody>
      {talents.map((talent) => (
        <Tr key={talent.id}>
          <Td>
            <TalentIdentity talent={talent} imageClassName="h-10 w-10 rounded-lg" />
          </Td>
          <Td>
            <CategoryChip category={talent.category} />
          </Td>
          <Td className="text-right font-semibold text-slate-800">{talent.followers}</Td>
          <Td className="text-right font-semibold text-slate-800">{talent.totalViews}</Td>
          <Td className="text-right">
            <span className="font-semibold text-emerald-600">{talent.engagementRate}</span>
          </Td>
          <Td className="text-slate-500">{talent.location}</Td>
        </Tr>
      ))}
    </TBody>
  </Table>
);

/**
 * Card-based list pengganti tabel untuk layar di bawah lg.
 * Setiap baris tabel "dibungkus" menjadi kartu kompak agar tidak terpotong.
 */
const MobileTableList = ({ talents }) => (
  <Card className="lg:hidden">
    <ul role="list" className="divide-y divide-slate-100">
      {talents.map((talent) => (
        <li key={talent.id} className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <TalentIdentity talent={talent} imageClassName="h-12 w-12 rounded-xl" />
            <CategoryChip category={talent.category} className="mt-1 shrink-0" />
          </div>
          <TalentMetricList talent={talent} className="mt-3 border-t border-slate-100 pt-3" />
        </li>
      ))}
    </ul>
  </Card>
);

/**
 * Tampilan tabel (table view).
 * Desktop: tabel penuh dengan header yang bisa diurutkan.
 * Mobile/tablet: otomatis berubah menjadi daftar kartu agar tetap terbaca.
 */
export const TalentTable = ({ talents, sortKey, sortDirection, onSortHeader }) => (
  <>
    <Card className="hidden overflow-hidden lg:block">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Daftar Kreator</h3>
          <p className="text-xs text-slate-500">Klik judul kolom untuk mengubah urutan.</p>
        </div>
        <Badge variant="secondary">{talents.length} kreator</Badge>
      </div>
      <DesktopTable
        talents={talents}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortHeader={onSortHeader}
      />
    </Card>

    <MobileTableList talents={talents} />
  </>
);
