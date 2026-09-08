import { Activity, Eye, Megaphone, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { ACTIVE_CAMPAIGNS_COUNT } from '@/constants/discovery';
import { MOCK_TALENTS } from '@/data/mockTalents';
import { cn } from '@/utils/cn';
import { formatCompactNumber, parseCompactNumber } from '@/utils/metrics';

/** Menghitung nilai ringkasan platform langsung dari daftar talent mock. */
const buildStats = (talents) => {
  const total = talents.length;

  const totalEngagementRate = talents.reduce(
    (sum, talent) => sum + parseCompactNumber(talent.engagementRate),
    0,
  );
  const averageEngagementRate = total ? totalEngagementRate / total : 0;

  const totalViews = talents.reduce(
    (sum, talent) => sum + parseCompactNumber(talent.totalViews),
    0,
  );

  return [
    {
      key: 'talents',
      label: 'Total Talents Available',
      value: `${total}`,
      note: total ? 'Kreator siap untuk kampanye' : 'Belum ada kreator terdaftar',
      icon: Users,
      iconClass: 'bg-primary-100 text-primary-700',
    },
    {
      key: 'engagement',
      label: 'Avg Engagement Rate',
      value: `${averageEngagementRate.toFixed(1)}%`,
      note: 'Rata-rata engagement seluruh kreator',
      icon: Activity,
      iconClass: 'bg-emerald-100 text-emerald-700',
    },
    {
      key: 'views',
      label: 'Total Views Reached',
      value: formatCompactNumber(totalViews),
      note: 'Akumulasi total views semua kreator',
      icon: Eye,
      iconClass: 'bg-sky-100 text-sky-600',
    },
    {
      key: 'campaigns',
      label: 'Active Campaigns',
      value: `${ACTIVE_CAMPAIGNS_COUNT}`,
      note: 'Sedang berjalan pada bulan ini',
      icon: Megaphone,
      iconClass: 'bg-fuchsia-100 text-fuchsia-600',
    },
  ];
};

/**
 * Hero ringkasan (stats summary) halaman utama.
 * Nilai dihitung dari mock data agar selalu sinkron dengan isi direktori.
 */
export const DiscoveryStats = ({ talents = MOCK_TALENTS }) => {
  const stats = buildStats(talents);

  return (
    <section
      aria-label="Ringkasan statistik talent"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map(({ key, label, value, note, icon: Icon, iconClass }) => (
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
              {note && <p className="mt-1 truncate text-xs text-slate-400">{note}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
