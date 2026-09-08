import { cn } from '@/utils/cn';

/**
 * Set komponen tabel generik untuk halaman data.
 * Wrapper <Table> menangani scroll horizontal pada layar kecil.
 */
export const Table = ({ children, className }) => (
  <div className={cn('overflow-x-auto', className)}>
    <table className="min-w-full divide-y divide-slate-200 text-sm">{children}</table>
  </div>
);

export const THead = ({ children, className }) => (
  <thead className={cn('bg-slate-50', className)}>{children}</thead>
);

export const TBody = ({ children, className }) => (
  <tbody className={cn('divide-y divide-slate-100', className)}>{children}</tbody>
);

export const Tr = ({ children, className, ...props }) => (
  <tr className={cn('transition-colors hover:bg-slate-50/70', className)} {...props}>
    {children}
  </tr>
);

export const Th = ({ children, className, ...props }) => (
  <th
    className={cn(
      'whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500',
      className,
    )}
    {...props}
  >
    {children}
  </th>
);

export const Td = ({ children, className, ...props }) => (
  <td className={cn('whitespace-nowrap px-4 py-3.5 text-slate-700', className)} {...props}>
    {children}
  </td>
);