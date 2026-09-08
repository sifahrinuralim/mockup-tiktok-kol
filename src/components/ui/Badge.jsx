import { cn } from '@/utils/cn';

const badgeVariants = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-slate-100 text-slate-600',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  outline: 'border border-slate-200 bg-white text-slate-600',
};

/**
 * Generic badge for short labels (status, role, etc.).
 */
export const Badge = ({ variant = 'secondary', className, children, ...props }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
      badgeVariants[variant],
      className,
    )}
    {...props}
  >
    {children}
  </span>
);