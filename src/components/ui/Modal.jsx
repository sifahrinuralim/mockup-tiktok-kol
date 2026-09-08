import { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

const modalSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/**
 * Accessible generic modal:
 * - Close via the × button, backdrop click, or the Escape key.
 * - Locks body scroll while the modal is open.
 * - The `fullScreenMobile` prop makes the modal full-screen on mobile and
 *   turns it back into a centered dialog from the `sm` breakpoint up
 *   (used by Quick View).
 */
export const Modal = ({
  open,
  onClose,
  title,
  description,
  size = 'md',
  fullScreenMobile = false,
  footer,
  children,
  className,
}) => {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClassName = modalSizes[size] ?? modalSizes.md;
  const maxWidthClassName = fullScreenMobile
    ? sizeClassName.replace('max-w-', 'sm:max-w-')
    : sizeClassName;
  const shapeClassName = fullScreenMobile
    ? 'h-full w-full rounded-none sm:h-auto sm:max-h-[90vh] sm:rounded-2xl'
    : 'max-h-[90vh] w-full rounded-2xl';

  return createPortal(
    <div
      className={cn(
        'animate-fade-in fixed inset-0 z-[60] flex items-center justify-center',
        fullScreenMobile ? 'p-0 sm:p-6' : 'p-4 sm:p-6',
      )}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="educore-modal-title"
        className={cn(
          'animate-modal-in relative flex flex-col overflow-hidden bg-white shadow-2xl',
          shapeClassName,
          maxWidthClassName,
          className,
        )}
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              {title && (
                <h2 id="educore-modal-title" className="text-base font-semibold text-slate-800">
                  {title}
                </h2>
              )}
              {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-m-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
