import { SearchX, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';

export const DemoFeedback = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">Loading (spinner & skeleton)</p>
          <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
          <div className="mt-3 space-y-2 rounded-lg border border-slate-200 p-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">Modal & dialog konfirmasi</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setModalOpen(true)}>Buka Modal</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Hapus Data
            </Button>
          </div>
        </div>
      </div>

      <EmptyState
        icon={SearchX}
        title="Data tidak ditemukan"
        description="Belum ada data yang cocok dengan pencarian Anda. Coba ubah kata kunci atau filter."
        action={
          <Button variant="outline" size="sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Reset Filter
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Judul Modal"
        description="Deskripsi singkat isi modal."
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setModalOpen(false)}>Simpan</Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-slate-600">
          Ini contoh konten modal. Ganti dengan formulir, detail data, atau konten lain sesuai kebutuhan.
        </p>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="Konfirmasi Hapus"
        description="Data yang dipilih akan dihapus permanen dan tidak dapat dikembalikan. Lanjutkan?"
      />
    </div>
  );
};
