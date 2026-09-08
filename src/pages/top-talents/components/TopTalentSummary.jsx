import { Activity, Eye, TrendingUp, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { MOCK_TOP_TALENTS } from '@/data/mockTopTalents';
import { cn } from '@/utils/cn';
import { formatCompactNumber, parseCompactNumber } from '@/utils/metrics';

/** Menghitung ringkasan hero halaman dari data peringkat (10 kreator teratas). */
const buildSummary = (talents) => {
  const topTen = talents.slice(0, 10);
  const count = talents.length;

  const averageEngagement = topTen.length
    ? topTen.reduce((sum, talent) => sum + parseCompactNumber(talent.engagementRate), 0) /
      topTen.length
    : 0;

  const totalViews = topTen.reduce(
    (sum, talent) => sum + parseCompactNumber(talent.totalViews),
    0,
  );

  const risers = talents.filter((talent) => talent.growthPct > 0).length;

  return [
    {
      key: 'total',
      label: 'Kreator Terpantau',
      value: `${count}`,
      note: 'Total kreator pada database',
      icon: Users,
      iconClass: 'bg-primary-100 text-primary-700',
    },
    {
      key: 'engagement',
      label: 'Rata-rata ER Top 10',
      value: `${averageEngagement.toFixed(1)}%`,
      note: 'Engagement rate 10 kreator terbaik',
      icon: Activity,
      iconClass: 'bg-emerald-100 text-emerald-700',
    },
    {
      key: 'views',
      label: 'Total Views Top 10',
      value: formatCompactNumber(totalViews),
      note: 'Akumulasi views kreator terbaik',
      icon: Eye,
      iconClass: 'bg-sky-100 text-sky-600',
    },
    {
      key: 'risers',
      label: 'Naik dalam 30 Hari',
      value: `${risers} kreator`,
      note: 'Mengalami pertumbuhan views positif',
      icon: TrendingUp,
      iconClass: 'bg-fuchsia-100 text-fuchsia-600',
    },
  ];
};

/**
 * Hero ringkasan statistik Top Talents.
 * Nilai dihitung langsung dari mock data agar selalu sinkron dengan peringkat.
 */
export const TopTalentSummary = ({ talents = MOCK_TOP_TALENTS }) => {
  const summary = buildSummary(talents);

  return (
    <section
      aria-label="Ringkasan statistik top talents"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {summary.map(({ key, label, value, note, icon: Icon, iconClass }) => (
        <Card key={key}>
          <CardContent className="flex items-start gap-4 p-5">
            <span
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                iconClass,
              )}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">{value}</p>
              <p className="mt-1 truncate text-xs text-slate-400">{note}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
