import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CATEGORY_PERFORMANCE } from '@/data/mockAnalytics';
import { cn } from '@/utils/cn';

/** Warna bar tiap kategori — dipetakan berurutan agar konsisten antar render. */
const BAR_COLORS = [
  'bg-violet-500',
  'bg-rose-400',
  'bg-amber-400',
  'bg-orange-400',
  'bg-fuchsia-400',
  'bg-sky-500',
];

/**
 * Performa konten per kategori (30 hari): daftar horizontal bar ringkas.
 * Nilai engagement rate memakai skala terhadap nilai tertinggi.
 */
export const CategoryPerformanceCard = ({ categories = CATEGORY_PERFORMANCE }) => {
  const maxEr = Math.max(...categories.map((category) => category.er), 1);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Engagement per Kategori</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ul role="list" className="space-y-4">
          {categories.map((category, index) => {
            const isRising = category.deltaPp >= 0;
            const barWidth = `${(category.er / maxEr) * 100}%`;

            return (
              <li key={category.category}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium text-slate-700">{category.category}</p>
                  <p className="text-sm font-bold text-slate-800">
                    {category.er}%
                    <span
                      className={cn(
                        'ml-2 text-xs font-semibold',
                        isRising ? 'text-emerald-600' : 'text-rose-500',
                      )}
                    >
                      {isRising ? '▲' : '▼'} {Math.abs(category.deltaPp).toFixed(1)} pt
                    </span>
                  </p>
                </div>
                <div
                  role="progressbar"
                  aria-label={`Engagement kategori ${category.category}`}
                  aria-valuenow={Math.round((category.er / maxEr) * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100"
                >
                  <div
                    className={cn('h-full rounded-full', BAR_COLORS[index % BAR_COLORS.length])}
                    style={{ width: barWidth }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">{category.videoCount} konten diunggah</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
