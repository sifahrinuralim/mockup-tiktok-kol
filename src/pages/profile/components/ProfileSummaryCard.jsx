import { BadgeCheck, CalendarDays, ShieldCheck } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { formatRupiahShort } from '@/utils/currency';
import { formatDateLong } from '@/utils/date';

/** User identity card + a short summary of their activity stats. */
export const ProfileSummaryCard = ({ profile }) => (
  <Card>
    <CardContent className="flex flex-col items-center p-6 text-center">
      <div className="relative">
        <img
          src={profile.avatarUrl}
          alt={`Photo of ${profile.name}`}
          className="h-24 w-24 rounded-2xl object-cover ring-4 ring-slate-100"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 ring-2 ring-white"
        >
          <BadgeCheck className="h-4 w-4 text-white" />
        </span>
      </div>

      <h2 className="mt-4 text-lg font-bold text-slate-900">{profile.name}</h2>
      <p className="text-sm text-slate-500">{profile.role}</p>

      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Verified Agency Account
      </span>

      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
        Joined {formatDateLong(profile.joinedAt)}
      </p>

      <dl className="mt-5 grid w-full grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <dt className="text-[11px] font-medium text-slate-400">Campaigns</dt>
          <dd className="mt-0.5 text-xl font-bold text-slate-800">
            {profile.stats.campaignsManaged}
          </dd>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <dt className="text-[11px] font-medium text-slate-400">Currently Active</dt>
          <dd className="mt-0.5 text-xl font-bold text-emerald-600">
            {profile.stats.activeCampaigns}
          </dd>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <dt className="text-[11px] font-medium text-slate-400">Total Budget</dt>
          <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">
            {formatRupiahShort(profile.stats.totalSpend)}
          </dd>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <dt className="text-[11px] font-medium text-slate-400">Avg ER</dt>
          <dd className="mt-0.5 text-xl font-bold text-primary-700">
            {profile.stats.averageEngagement}
          </dd>
        </div>
      </dl>
    </CardContent>
  </Card>
);
