import { Crown } from 'lucide-react';

import { CategoryChip } from '@/components/common/CategoryChip';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import { formatRupiahShort } from '@/utils/currency';

import { GrowthBadge } from './GrowthBadge';

/** Visual style per podium rank — written out in full so the Tailwind JIT scanner is safe. */
const RANK_STYLES = {
  1: {
    accent: 'from-amber-300 to-yellow-500',
    avatarRing: 'ring-amber-300',
    rankBadge: 'bg-amber-100 text-amber-700',
    headerText: 'text-amber-700',
  },
  2: {
    accent: 'from-slate-300 to-slate-400',
    avatarRing: 'ring-slate-300',
    rankBadge: 'bg-slate-200 text-slate-700',
    headerText: 'text-slate-600',
  },
  3: {
    accent: 'from-orange-300 to-orange-400',
    avatarRing: 'ring-orange-300',
    rankBadge: 'bg-orange-100 text-orange-700',
    headerText: 'text-orange-700',
  },
};

/** A single podium column: a creator card with a per-rank accent. */
const PodiumCard = ({ talent }) => {
  const style = RANK_STYLES[talent.rank];

  return (
    <Card
      className={cn(
        'relative flex h-full flex-col overflow-hidden text-center transition-shadow hover:shadow-md',
        talent.rank === 1 && 'md:-mt-4',
      )}
    >
      {/* Top gradient accent per rank */}
      <div className={cn('h-1.5 w-full bg-gradient-to-r', style.accent)} aria-hidden="true" />

      <div className="flex flex-1 flex-col items-center px-5 pb-5 pt-6">
        <span
          className={cn(
            'absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
            style.rankBadge,
          )}
        >
          Score {talent.score}
        </span>

        <div className="relative">
          <img
            src={talent.avatarUrl}
            alt={`Photo of ${talent.name}`}
            loading="lazy"
            className={cn(
              'rounded-2xl object-cover ring-4',
              talent.rank === 1 ? 'h-24 w-24' : 'h-20 w-20',
              style.avatarRing,
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-white text-sm font-extrabold shadow ring-1 ring-slate-200',
              style.headerText,
            )}
          >
            {talent.rank}
          </span>
          {talent.rank === 1 && (
            <span className="absolute -right-2 -top-2" aria-hidden="true">
              <Crown className="h-6 w-6 text-amber-400 drop-shadow" />
            </span>
          )}
        </div>

        <h3 className="mt-5 text-base font-bold text-slate-900">{talent.name}</h3>
        <p className="text-sm text-slate-500">{talent.username}</p>
        <CategoryChip category={talent.category} className="mt-2" />

        <dl className="mt-5 grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-50 px-4 py-3">
          <div className="min-w-0">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Followers
            </dt>
            <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">
              {talent.followers}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Eng. Rate
            </dt>
            <dd className="mt-0.5 truncate text-sm font-bold text-emerald-600">
              {talent.engagementRate}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex w-full items-center justify-between gap-2">
          <div className="min-w-0 text-left">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              1-Video Rate
            </p>
            <p className="truncate text-sm font-bold text-slate-800">
              {formatRupiahShort(talent.feeSingleMin)}
            </p>
          </div>
          <GrowthBadge value={talent.growthPct} />
        </div>
      </div>
    </Card>
  );
};

/**
 * Podium for the three best creators.
 * On md+ the rank-1 creator is raised slightly so they stand out.
 */
export const PodiumRanking = ({ talents }) => (
  <section aria-labelledby="heading-podium" className="space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <h2 id="heading-podium" className="text-lg font-semibold text-slate-900">
          Top Creators Podium
        </h2>
        <p className="mt-0.5 text-sm text-slate-600">
          The three creators with the highest performance score this month.
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {talents.map((talent) => (
        <PodiumCard key={talent.id} talent={talent} />
      ))}
    </div>
  </section>
);
