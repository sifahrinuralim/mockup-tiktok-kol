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
          <p className="mb-3 text-sm font-semibold text-slate-700">Modal & confirmation dialog</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Delete Data
            </Button>
          </div>
        </div>
      </div>

      <EmptyState
        icon={SearchX}
        title="Data not found"
        description="No data matches your search yet. Try changing the keyword or the filters."
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
        title="Modal Title"
        description="A short description of the modal contents."
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Save</Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-slate-600">
          This is an example modal body. Replace it with a form, data details, or other content as needed.
        </p>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="Confirm Delete"
        description="The selected data will be permanently deleted and cannot be restored. Continue?"
      />
    </div>
  );
};
