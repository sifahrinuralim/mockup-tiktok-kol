import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AUDIENCE_AGE_GROUPS, GENDER_SPLIT, TOP_REGIONS } from '@/data/mockAnalytics';
import { cn } from '@/utils/cn';

/**
 * Ringkasan audiens: komposisi umur, gender, dan wilayah teratas.
 * Nilai persen statis dari data mock analytics.
 */
export const AudienceCard = () => {
  const totalGender = GENDER_SPLIT.reduce((sum, item) => sum + item.pct, 0) || 1;
  const femalePct = GENDER_SPLIT[0]?.pct ?? 0;
  const malePct = GENDER_SPLIT[1]?.pct ?? 0;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Audience</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        {/* Rentang umur */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Rentang Umur
          </h4>
          <ul role="list" className="mt-3 space-y-3">
            {AUDIENCE_AGE_GROUPS.map((group) => (
              <li key={group.range}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{group.range}</span>
                  <span className="font-semibold text-slate-800">{group.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
                    style={{ width: `${group.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Gender */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Gender</h4>
          <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${femalePct}% perempuan dan ${malePct}% laki-laki`}>
            <div className="h-full bg-emerald-400" style={{ width: `${(femalePct / totalGender) * 100}%` }} />
            <div className="h-full bg-sky-500" style={{ width: `${(malePct / totalGender) * 100}%` }} />
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            {GENDER_SPLIT.map((gender) => (
              <span key={gender.label} className="inline-flex items-center gap-1.5 text-slate-600">
                <span
                  className={cn(
                    'h-2.5 w-2.5 rounded-full',
                    gender.label === 'Perempuan' ? 'bg-emerald-400' : 'bg-sky-500',
                  )}
                  aria-hidden="true"
                />
                {gender.label} {gender.pct}%
              </span>
            ))}
          </div>
        </div>

        {/* Wilayah teratas */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Wilayah Teratas
          </h4>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-2">
            {TOP_REGIONS.map((region) => (
              <li
                key={region.region}
                className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="font-medium text-slate-600">{region.region}</span>
                <span className="font-semibold text-slate-800">{region.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
