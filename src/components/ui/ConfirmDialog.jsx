import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

/**
 * Dialog konfirmasi destruktif (hapus data) berbasis <Modal> generik.
 */
export const ConfirmDialog = ({
  open = false,
  onClose,
  onConfirm,
  title = 'Konfirmasi Hapus',
  description,
  confirmText = 'Hapus',
  loadingText = 'Menghapus...',
  isLoading = false,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    size="sm"
    footer={
      <>
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Batal
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading} loadingText={loadingText}>
          {confirmText}
        </Button>
      </>
    }
  >
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
        <AlertTriangle className="h-5 w-5 text-rose-600" aria-hidden="true" />
      </span>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  </Modal>
);