import { cn } from '@/utils/cn';

export const Card = ({ children, className }) => (
  <div className={cn('rounded-xl border border-slate-200 bg-white shadow-sm', className)}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={cn('border-b border-slate-100 px-5 py-4', className)}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={cn('text-base font-semibold text-slate-800', className)}>{children}</h3>
);

export const CardDescription = ({ children, className }) => (
  <p className={cn('mt-0.5 text-sm text-slate-500', className)}>{children}</p>
);

export const CardContent = ({ children, className }) => (
  <div className={cn('p-5', className)}>{children}</div>
);

export const CardFooter = ({ children, className }) => (
  <div className={cn('border-t border-slate-100 px-5 py-4', className)}>{children}</div>
);