import { cn } from '@/utils/cn';

/** Default metric columns shown in compact card/list views. */
const METRIC_FIELDS = [
  { key: 'followers', label: 'Followers' },
  { key: 'totalViews', label: 'Total Views' },
  { key: 'engagementRate', label: 'Eng. Rate' },
];

/**
 * Three-metric grid for a creator (default: followers, total views, engagement rate).
 * Columns can be replaced via the `fields` prop (e.g. cards use avg views);
 * each column may carry a `valueClassName` to accent the value color.
 * Values are read straight from the ready-to-display strings in the mock data.
 */
export const TalentMetricList = ({ talent, fields = METRIC_FIELDS, className }) => (
  <dl className={cn('grid grid-cols-3 gap-2', className)}>
    {fields.map(({ key, label, valueClassName }) => (
      <div key={key} className="min-w-0 text-center">
        <dt className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </dt>
        <dd className={cn('mt-0.5 truncate text-sm font-bold text-slate-800', valueClassName)}>
          {talent[key]}
        </dd>
      </div>
    ))}
  </dl>
);
