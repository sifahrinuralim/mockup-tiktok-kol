import { cn } from '@/utils/cn';

/** Kolom metrik yang ditampilkan pada kartu/list kompak. */
const METRIC_FIELDS = [
  { key: 'followers', label: 'Followers' },
  { key: 'totalViews', label: 'Total Views' },
  { key: 'engagementRate', label: 'Eng. Rate' },
];

/**
 * Grid tiga metrik utama kreator (followers, total views, engagement rate).
 * Nilai diambil langsung dari field string siap-tampil di mock data.
 */
export const TalentMetricList = ({ talent, className }) => (
  <dl className={cn('grid grid-cols-3 gap-2', className)}>
    {METRIC_FIELDS.map(({ key, label }) => (
      <div key={key} className="min-w-0 text-center">
        <dt className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </dt>
        <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">{talent[key]}</dd>
      </div>
    ))}
  </dl>
);
