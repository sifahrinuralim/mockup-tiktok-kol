/**
 * Halaman Saved Lists — kumpulan daftar kreator untuk campaign mendatang.
 * Menampilkan kartu daftar, detail anggota (hapus member), pembuatan daftar
 * baru, dan penghapusan daftar dengan konfirmasi.
 * Data dummy di src/data/mockSavedLists.js.
 */

import { useEffect, useState } from 'react';
import { Bookmark, CheckCircle2, Plus, X } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { SIMULATED_LOAD_DELAY_MS } from '@/constants/discovery';
import { MOCK_SAVED_LISTS } from '@/data/mockSavedLists';
import { estimateRateCardTiers } from '@/utils/talentEstimate';

import { CreateListModal } from './components/CreateListModal';
import { SavedListCard } from './components/SavedListCard';
import { SavedListDetail } from './components/SavedListDetail';

/** Skeleton grid daftar saat simulasi loading berjalan. */
const ListsGridSkeleton = () => (
  <div
    aria-label="Memuat daftar tersimpan..."
    className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
  >
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-2 w-1/3 rounded-full bg-slate-200" />
        <div className="mt-4 h-4 w-3/4 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-full rounded bg-slate-100" />
        <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
        <div className="mt-5 h-8 w-full rounded-lg bg-slate-100" />
      </div>
    ))}
  </div>
);

/** Tanggal hari ini format 'YYYY-MM-DD' untuk metadata list baru. */
const getTodayString = () => new Date().toISOString().slice(0, 10);

/** Hitung ulang estimasi budget daftar dari daftar member terkini. */
const sumEstimatedBudget = (members) =>
  members.reduce((total, member) => total + estimateRateCardTiers(member)[0].min, 0);

/**
 * Halaman utama modul Saved Lists.
 */
export default function SavedListsPage() {
  const [lists, setLists] = useState(MOCK_SAVED_LISTS);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [pendingMember, setPendingMember] = useState(null); // { listId, member }
  const [pendingDeleteList, setPendingDeleteList] = useState(null);

  // Simulasi request awal agar skeleton state sempat terlihat nyata.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), SIMULATED_LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const selectedList = lists.find((list) => list.id === selectedId) ?? null;

  const notify = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleCreate = (form) => {
    const nextId = lists.length > 0 ? Math.max(...lists.map((list) => list.id)) + 1 : 1;
    const today = getTodayString();

    const newList = {
      id: nextId,
      name: form.name,
      category: form.category,
      target: form.target,
      description: form.description || 'Belum ada deskripsi — tambahkan kriteria daftar ini.',
      tags: [],
      members: [],
      memberCount: 0,
      estimatedBudget: 0,
      createdAt: today,
      updatedAt: today,
    };

    setLists((current) => [newList, ...current]);
    notify(`Daftar “${newList.name}” berhasil dibuat.`);
  };

  const handleRemoveMember = (listId, member) => {
    setLists((current) =>
      current.map((list) => {
        if (list.id !== listId) return list;

        const members = list.members.filter((item) => item.id !== member.id);
        return {
          ...list,
          members,
          memberCount: members.length,
          estimatedBudget: sumEstimatedBudget(members),
          updatedAt: getTodayString(),
        };
      }),
    );
    setPendingMember(null);
    notify(`${member.name} dihapus dari daftar.`);
  };

  const handleDeleteList = (list) => {
    setLists((current) => current.filter((item) => item.id !== list.id));
    if (selectedId === list.id) setSelectedId(null);
    setPendingDeleteList(null);
    notify(`Daftar “${list.name}” berhasil dihapus.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Lists"
        description="Simpan dan kelompokkan kreator favorit Anda untuk campaign mendatang."
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Buat Daftar Baru
          </Button>
        }
      />
      {isLoading ? (
        <ListsGridSkeleton />
      ) : (
        <>
          {successMessage && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="flex-1">{successMessage}</p>
              <button
                type="button"
                onClick={() => setSuccessMessage('')}
                className="rounded p-0.5 text-emerald-600 transition-colors hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Tutup notifikasi"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {selectedList ? (
            <SavedListDetail
              list={selectedList}
              onBack={() => setSelectedId(null)}
              onRemoveMember={(member) => setPendingMember({ listId: selectedList.id, member })}
              onRequestDelete={() => setPendingDeleteList(selectedList)}
            />
          ) : (
            <section aria-labelledby="heading-daftar" className="space-y-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 id="heading-daftar" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Bookmark className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    Daftar Kreator Anda
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {lists.length} daftar tersimpan untuk campaign mendatang.
                  </p>
                </div>
              </div>

              {lists.length === 0 ? (
                <Card>
                  <EmptyState
                    icon={Bookmark}
                    title="Belum ada daftar tersimpan"
                    description="Buat daftar pertama Anda untuk mengelompokkan kreator sesuai kebutuhan campaign."
                    action={
                      <Button size="sm" onClick={() => setCreateOpen(true)}>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Buat Daftar Baru
                      </Button>
                    }
                  />
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {lists.map((list, index) => (
                    <SavedListCard
                      key={list.id}
                      list={list}
                      accentIndex={index}
                      onOpen={setSelectedId}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}

      <CreateListModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <ConfirmDialog
        open={Boolean(pendingMember)}
        onClose={() => setPendingMember(null)}
        onConfirm={() =>
          pendingMember &&
          handleRemoveMember(pendingMember.listId, pendingMember.member)
        }
        title="Hapus Kreator dari Daftar"
        description={`Yakin ingin menghapus ${pendingMember?.member.name ?? ''} dari daftar ini? Anda tetap bisa mencarinya kembali di Talent Discovery.`}
        confirmText="Hapus"
      />

      <ConfirmDialog
        open={Boolean(pendingDeleteList)}
        onClose={() => setPendingDeleteList(null)}
        onConfirm={() => pendingDeleteList && handleDeleteList(pendingDeleteList)}
        title="Hapus Daftar"
        description={`Daftar “${pendingDeleteList?.name ?? ''}” beserta seluruh anggotanya akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus Daftar"
      />
    </div>
  );
}
