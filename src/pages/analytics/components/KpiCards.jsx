import { Activity, Clock3, Eye, UserPlus, TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import { formatCompactNumber } from '@/utils/metrics';

/** Assembles the KPI cards from one selected period's data. */
const buildKpis = (data) => [
  {
    key: 'views',
    label: 'Total Views',
    value: formatCompactNumber(data.totalViews, 1),
    delta: data.changes.views,
    deltaSuffix: '%',
    icon: Eye,
    iconClass: 'bg-sky-100 text-sky-600',
  },
  {
    key: 'engagement',
    label: 'Average Engagement',
    value: `${data.averageEngagement}%`,
    delta: data.changes.engagement,
    deltaSuffix: ' pt',
    icon: Activity,
    iconClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    key: 'followers',
    label: 'New Followers',
    value: formatCompactNumber(data.followersGained, 1),
    delta: data.changes.followers,
    deltaSuffix: '%',
    icon: UserPlus,
    iconClass: 'bg-primary-100 text-primary-700',
  },
  {
    key: 'watch',
    label: 'Total Watch Time',
    value: `${formatCompactNumber(data.watchHours, 0)} hours`,
    delta: data.changes.watch,
    deltaSuffix: '%',
    icon: Clock3,
    iconClass: 'bg-fuchsia-100 text-fuchsia-600',
  },
];

/** Change badge vs the previous period (icon + percent). */
const DeltaBadge = ({ value, suffix }) => (
  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
    <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
    +{value.toFixed(1)}
    {suffix}
    <span className="font-normal text-slate-400">vs previous period</span>
  </span>
);

/**
 * Grid of the four main Analytics KPIs. All values are formatted from the
 * active period's mock data so they stay in sync with the trend chart.
 */
export const KpiCards = ({ data }) => {
  const kpis = buildKpis(data);

  return (
    <section
      aria-label="Analytics KPI summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {kpis.map(({ key, label, value, delta, deltaSuffix, icon: Icon, iconClass }) => (
        <Card key={key}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">{value}</p>
              </div>
              <span
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                  iconClass,
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <DeltaBadge value={delta} suffix={deltaSuffix} />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
