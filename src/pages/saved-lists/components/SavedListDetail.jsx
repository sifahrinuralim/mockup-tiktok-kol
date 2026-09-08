import { useState } from 'react';
import { ArrowLeft, CalendarDays, Download, FolderPlus, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { AvatarStack } from '@/components/common/AvatarStack';
import { CategoryChip } from '@/components/common/CategoryChip';
import { TalentIdentity } from '@/components/common/TalentIdentity';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LIST_TARGET_OPTIONS } from '@/constants/savedLists';
import { formatRupiah } from '@/utils/currency';
import { formatDateLong } from '@/utils/date';

const EXPORT_SUCCESS_MS = 2000;

/** Label target ukuran kreator dari nilai tersimpan. */
const findTargetLabel = (target) =>
  LIST_TARGET_OPTIONS.find((option) => option.value === target)?.label ?? target;

/** Ringkasan statistik daftar (anggota, target, budget, diperbarui). */
const ListSummary = ({ list }) => (
  <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <dt className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
        <Users className="h-3.5 w-3.5" aria-hidden="true" /> Anggota
      </dt>
      <dd className="mt-0.5 text-sm font-bold text-slate-800">{list.memberCount} kreator</dd>
    </div>
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <dt className="text-[11px] font-medium text-slate-400">Target</dt>
      <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">
        {findTargetLabel(list.target)}
      </dd>
    </div>
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <dt className="text-[11px] font-medium text-slate-400">Estimasi Budget</dt>
      <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">
        {formatRupiah(list.estimatedBudget)}
      </dd>
    </div>
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <dt className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Diperbarui
      </dt>
      <dd className="mt-0.5 text-sm font-bold text-slate-800">{formatDateLong(list.updatedAt)}</dd>
    </div>
  </dl>
);

/** Baris satu anggota daftar dengan aksi hapus. */
const MemberRow = ({ member, onRemove }) => (
  <li className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center">
    <div className="min-w-0 flex-1">
      <TalentIdentity talent={member} imageClassName="h-10 w-10 rounded-lg" />
    </div>
    <div className="flex items-center justify-between gap-4 sm:justify-end">
      <CategoryChip category={member.category} className="shrink-0" />
      <dl className="hidden gap-5 text-right text-xs md:flex">
        <div>
          <dt className="text-slate-400">Followers</dt>
          <dd className="mt-0.5 text-sm font-bold text-slate-800">{member.followers}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Eng. Rate</dt>
          <dd className="mt-0.5 text-sm font-bold text-emerald-600">{member.engagementRate}</dd>
        </div>
      </dl>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(member)}
        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Hapus</span>
      </Button>
    </div>
  </li>
);

/**
 * Detail satu daftar tersimpan: info, ringkasan, dan daftar kreator anggota.
 * Aksi hapus member & hapus daftar diangkat ke halaman via callback.
 */
export const SavedListDetail = ({ list, onBack, onRemoveMember, onRequestDelete }) => {
  const [exportState, setExportState] = useState('idle'); // idle | loading | done

  const handleExport = () => {
    if (exportState !== 'idle') return;
    setExportState('loading');
    window.setTimeout(() => setExportState('done'), 900);
    window.setTimeout(() => setExportState('idle'), EXPORT_SUCCESS_MS);
  };

  return (
    <section aria-labelledby="judul-daftar" className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit items-center gap-1.5 rounded text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Semua Daftar
      </button>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 id="judul-daftar" className="text-lg font-bold text-slate-900">
              {list.name}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{list.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <CategoryChip category={list.category} />
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <AvatarStack talents={list.members} imageClassName="h-5 w-5" />
                {list.memberCount} kreator
              </span>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={exportState === 'loading'}
            >
              {exportState === 'loading' ? (
                'Mengunduh…'
              ) : exportState === 'done' ? (
                <>✓ Terunduh</>
              ) : (
                <>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Unduh CSV
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRequestDelete}
              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Hapus Daftar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="border-t border-slate-100">
          <ListSummary list={list} />
        </CardContent>
      </Card>

      <Card>
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-800">Anggota Kreator</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Kreator dalam daftar ini dapat dipakai untuk campaign mendatang.
          </p>
        </div>
        {list.members.length === 0 ? (
          <EmptyState
            icon={FolderPlus}
            title="Daftar masih kosong"
            description="Tambahkan kreator dari Talent Discovery untuk mulai menyusun shortlist campaign Anda."
            action={
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Cari Kreator
              </Link>
            }
          />
        ) : (
          <ul role="list" className="divide-y divide-slate-100" aria-live="polite">
            {list.members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                onRemove={() => onRemoveMember(member)}
              />
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};
