/**
 * Halaman Analytics — analisis performa akun & kampanye.
 * Terdiri dari KPI, grafik tren (views/engagement) yang bisa diganti metrik,
 * performa per kategori, konten terbaik, dan demografi audiens.
 * Data dummy di src/data/mockAnalytics.js.
 */

import { useEffect, useMemo, useState } from 'react';

import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ANALYTICS_DEFAULT_PERIOD,
  ANALYTICS_PERIOD_OPTIONS,
} from '@/constants/analytics';
import { MOCK_ANALYTICS } from '@/data/mockAnalytics';
import { cn } from '@/utils/cn';
import { buildDailyLabels } from '@/utils/date';

import { AudienceCard } from './components/AudienceCard';
import { CategoryPerformanceCard } from './components/CategoryPerformanceCard';
import { KpiCards } from './components/KpiCards';
import { TopContentsCard } from './components/TopContentsCard';
import { TrendChart } from './components/TrendChart';

/** Skeleton placeholder halaman saat simulasi loading berjalan. */
const AnalyticsSkeleton = () => (
  <div aria-label="Memuat analytics..." className="space-y-4">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-3 w-1/2 rounded bg-slate-200" />
          <div className="mt-3 h-6 w-2/3 rounded bg-slate-200" />
          <div className="mt-4 h-3 w-full rounded bg-slate-100" />
        </div>
      ))}
    </div>
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-5 w-44 rounded bg-slate-200" />
      <div className="mt-5 h-56 rounded-xl bg-slate-100" />
    </div>
  </div>
);

/** Opsi metrik grafik tren. */
const TREND_METRICS = [
  { value: 'views', label: 'Views' },
  { value: 'engagement', label: 'Engagement' },
];

/** Segmen kontrol kecil (periode / metrik) bergaya pill. */
const SegmentedControl = ({ options, value, onChange, ariaLabel }) => (
  <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5" role="group" aria-label={ariaLabel}>
    {options.map((option) => {
      const isActive = value === option.value;

      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={isActive}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            isActive
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

/**
 * Halaman utama modul Analytics.
 */
export default function AnalyticsPage() {
  const [period, setPeriod] = useState(ANALYTICS_DEFAULT_PERIOD);
  const [metric, setMetric] = useState('views');
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi request awal agar skeleton state sempat terlihat nyata.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const periodData = MOCK_ANALYTICS[period];
  const labels = useMemo(() => buildDailyLabels(periodData.days), [periodData]);

  const chartSeries =
    metric === 'engagement'
      ? { data: periodData.engagement, unit: 'percent', accent: 'cyan' }
      : { data: periodData.views, unit: 'count', accent: 'indigo' };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Pantau tren konten, audiens, dan performa kampanye Anda dalam satu dasbor."
        action={
          <SegmentedControl
            options={ANALYTICS_PERIOD_OPTIONS}
            value={period}
            onChange={setPeriod}
            ariaLabel="Pilih rentang waktu pelaporan"
          />
        }
      />

      {isLoading ? (
        <AnalyticsSkeleton />
      ) : (
        <>
          <KpiCards data={periodData} />

          {/* Grafik tren + kategori */}
          <section aria-label="Grafik performa" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Tren Harian</CardTitle>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {periodData.days} hari terakhir — pilih metrik untuk mengubah grafik.
                  </p>
                </div>
                <SegmentedControl
                  options={TREND_METRICS}
                  value={metric}
                  onChange={setMetric}
                  ariaLabel="Pilih metrik grafik"
                />
              </CardHeader>
              <CardContent>
                <TrendChart
                  data={chartSeries.data}
                  labels={labels}
                  unit={chartSeries.unit}
                  accent={chartSeries.accent}
                />
              </CardContent>
            </Card>

            <CategoryPerformanceCard />
          </section>

          {/* Konten terbaik + audiens */}
          <section aria-label="Konten dan audiens" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TopContentsCard />
            </div>
            <AudienceCard />
          </section>
        </>
      )}
    </div>
  );
}
