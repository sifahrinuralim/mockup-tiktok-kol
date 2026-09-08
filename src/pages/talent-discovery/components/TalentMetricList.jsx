import { cn } from '@/utils/cn';

/** Kolom metrik bawaan yang ditampilkan pada kartu/list kompak. */
const METRIC_FIELDS = [
  { key: 'followers', label: 'Followers' },
  { key: 'totalViews', label: 'Total Views' },
  { key: 'engagementRate', label: 'Eng. Rate' },
];

/**
 * Grid tiga metrik kreator (default: followers, total views, engagement rate).
 * Kolom bisa diganti lewat prop `fields` (mis. kartu memakai avg views);
 * tiap kolom boleh membawa `valueClassName` untuk memberi aksen warna nilai.
 * Nilai diambil langsung dari field string siap-tampil di mock data.
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
