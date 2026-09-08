import { Inbox } from 'lucide-react';

/**
 * Empty state UI for data lists that have no content yet.
 */
export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No data yet',
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
      <Icon className="h-7 w-7 text-slate-400" aria-hidden="true" />
    </span>
    <h3 className="mt-4 text-base font-semibold text-slate-800">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);