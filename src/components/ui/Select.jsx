import { forwardRef, useId } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';

/**
 * Labeled Select component, consistent with Input (supports error & hint).
 */
export const Select = forwardRef(function Select(
  { label, error, hint, id, className, children, ...props },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={cn(
            'input-base appearance-none pr-10',
            Boolean(error) && 'input-error',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute inset-y-0 right-3 my-auto h-4 w-4 text-slate-400"
          aria-hidden="true"
        />
      </div>

      {error ? (
        <p
          id={`${selectId}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600"
          role="alert"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});