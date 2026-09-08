import { Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';

/**
 * Toggle switch yang dapat diakses (role="switch").
 * Warna Emerald saat aktif — konsisten dengan badge status "Aktif".
 */
export const Toggle = ({
  checked = false,
  onChange,
  disabled = false,
  loading = false,
  id,
  'aria-label': ariaLabel,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        checked ? 'bg-emerald-500' : 'bg-slate-300',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      >
        {loading && <Loader2 className="h-3 w-3 animate-spin text-primary-600" />}
      </span>
    </button>
  );
};