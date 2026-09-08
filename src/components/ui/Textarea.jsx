import { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

import { cn } from '@/utils/cn';

/**
 * Textarea ber-label yang seragam dengan <Input> (support error & hint).
 * Dipakai untuk input multi-baris seperti catatan tindak lanjut.
 */
export const Textarea = forwardRef(function Textarea(
  { label, error, hint, id, className, rows = 4, ...props },
  ref,
) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={cn('input-base resize-y', Boolean(error) && 'input-error', className)}
        {...props}
      />

      {error ? (
        <p id={`${textareaId}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});