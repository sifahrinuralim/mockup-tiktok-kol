import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

/**
 * Destructive confirmation dialog (e.g. delete data) built on the generic <Modal>.
 */
export const ConfirmDialog = ({
  open = false,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  description,
  confirmText = 'Delete',
  loadingText = 'Deleting...',
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
          Cancel
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