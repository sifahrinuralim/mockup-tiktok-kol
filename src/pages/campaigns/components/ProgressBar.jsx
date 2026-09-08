import { cn } from '@/utils/cn';

/**
 * Bilah kemajuan (progress bar) generik dengan teks persentase opsional.
 * Warna mengikuti nilai kemajuan: emerald ≥ 100, primary ≥ 60, sisanya slate.
 */
export const ProgressBar = ({ value, showLabel = false, className }) => {
  const percent = Math.min(Math.max(value, 0), 100);
  const barClass = cn(
    'h-2 flex-1 overflow-hidden rounded-full bg-slate-100',
    className,
  );

  const fillClass =
    percent >= 100 ? 'bg-emerald-500' : percent >= 60 ? 'bg-primary-600' : 'bg-slate-400';

  return (
    <div className="flex items-center gap-2">
      <div className={barClass} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Kemajuan kampanye">
        <div className={cn('h-full rounded-full transition-all', fillClass)} style={{ width: `${percent}%` }} />
      </div>
      {showLabel && (
        <span className="w-9 shrink-0 text-right text-xs font-semibold text-slate-500">
          {percent}%
        </span>
      )}
    </div>
  );
};
