import { Activity, BadgeCheck, Eye, MapPin, Music2, Play, TrendingUp, Users } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { MOCK_TALENT_DETAILS } from '@/data/mockTalentDetails';
import { cn } from '@/utils/cn';
import { formatRupiahShort } from '@/utils/currency';
import {
  buildViewsTrendSeries,
  computeGrowthPercent,
  estimateRateCardTiers,
} from '@/utils/talentEstimate';

import { AddToCampaignButton } from './AddToCampaignButton';
import { CategoryChip } from './CategoryChip';
import { ViewsTrendChart } from './ViewsTrendChart';

const VERIFIED_BADGE = 'Verified';

/** Ikon & warna tiap metrik pada blok ringkasan performa. */
const METRIC_TILES = [
  {
    key: 'followers',
    label: 'Followers',
    icon: Users,
    iconClassName: 'bg-primary-100 text-primary-700',
  },
  {
    key: 'totalViews',
    label: 'Total Views',
    icon: Eye,
    iconClassName: 'bg-sky-100 text-sky-700',
  },
  {
    key: 'avgViewsPerVideo',
    label: 'Avg Views / Video',
    icon: Play,
    iconClassName: 'bg-violet-100 text-violet-700',
  },
  {
    key: 'topVideoViews',
    label: 'Top Video',
    icon: TrendingUp,
    iconClassName: 'bg-amber-100 text-amber-700',
  },
  {
    key: 'engagementRate',
    label: 'Eng. Rate',
    icon: Activity,
    iconClassName: 'bg-emerald-100 text-emerald-700',
  },
];

/** Judul seksi di dalam Quick View (h4 + aksi kanan opsional). */
const SectionHeading = ({ id, title, action }) => (
  <div className="flex flex-wrap items-center justify-between gap-2">
    <h4 id={id} className="text-sm font-semibold text-slate-800">
      {title}
    </h4>
    {action}
  </div>
);

/** Ubin metrik ringkas untuk blok ringkasan performa. */
const MetricTile = ({ label, value, icon: Icon, iconClassName }) => (
  <li className="rounded-lg border border-slate-200 p-3">
    <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', iconClassName)}>
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
    <p className="mt-2.5 truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
      {label}
    </p>
    <p className="mt-0.5 truncate text-base font-bold text-slate-800">{value}</p>
  </li>
);

/** Tanda centang kreator terverifikasi. */
const VerifiedMark = () => (
  <>
    <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
    <span className="sr-only">Terverifikasi</span>
  </>
);

/**
 * Quick View Modal — ringkasan detail kreator.
 * Muncul saat tombol "View Details" diklik pada TalentCard.
 * Responsif: full-screen di mobile, dialog terpusat `xl` di laptop.
 */
export const QuickViewModal = ({
  talent,
  open,
  onClose,
  isInCampaign,
  onToggleCampaign,
}) => {
  const profileDetail = MOCK_TALENT_DETAILS.find((entry) => entry.talentId === talent.id);
  const favoriteAudios = profileDetail?.favoriteAudios ?? [];

  const rateCardTiers = estimateRateCardTiers(talent);
  const viewsTrend = buildViewsTrendSeries(talent);
  const viewsGrowth = computeGrowthPercent(viewsTrend);
  const growthLabel = `${viewsGrowth >= 0 ? '+' : ''}${viewsGrowth.toFixed(1)}%`;

  const isVerified = talent.badges.includes(VERIFIED_BADGE);
  const extraBadges = talent.badges.filter((badge) => badge !== VERIFIED_BADGE);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Profil Kreator"
      description="Ringkasan performa, estimasi harga, audio favorit, dan portofolio video."
      size="xl"
      fullScreenMobile
      footer={
        <>
          <Button type="button" variant="outline" onClick={onClose} className="min-h-11">
            Tutup
          </Button>
          <AddToCampaignButton isInCampaign={isInCampaign} onClick={onToggleCampaign} />
        </>
      }
    >
      <div className="space-y-6 sm:space-y-7">
        <section aria-label="Identitas kreator" className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <img
            src={talent.avatarUrl}
            alt={`Foto ${talent.name}`}
            className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-slate-200 sm:h-24 sm:w-24"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-lg font-bold text-slate-900">{talent.name}</h3>
              {isVerified && <VerifiedMark />}
              <CategoryChip category={talent.category} />
            </div>
            <p className="truncate text-sm text-slate-500">{talent.username}</p>
            <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {talent.location}
            </p>
            {extraBadges.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {extraBadges.map((badge) => (
                  <Badge key={badge} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        <section aria-label="Ringkasan metrik performa">
          <ul role="list" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {METRIC_TILES.map(({ key, label, icon, iconClassName }) => (
              <MetricTile
                key={key}
                label={label}
                value={talent[key]}
                icon={icon}
                iconClassName={iconClassName}
              />
            ))}
          </ul>
        </section>

        <section aria-labelledby="quick-view-trend-title">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h4 id="quick-view-trend-title" className="text-sm font-semibold text-slate-800">
                Pertumbuhan Views
              </h4>
              <p className="mt-0.5 text-xs text-slate-500">
                Total views harian — 30 hari terakhir.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              {growthLabel}
            </span>
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 p-3 sm:p-4">
            <ViewsTrendChart data={viewsTrend} />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="quick-view-rate-title">
            <SectionHeading
              id="quick-view-rate-title"
              title="Estimasi Rate Card"
              action={<Badge variant="outline">Perkiraan</Badge>}
            />
            <p className="mt-0.5 text-xs text-slate-500">
              Kisaran harga per konten berdasar performa kreator saat ini.
            </p>
            <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
              {rateCardTiers.map((tier) => (
                <li
                  key={tier.key}
                  className={cn(
                    'flex flex-col gap-2 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4',
                    tier.highlight && 'bg-primary-50/60',
                  )}
                >
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
                      {tier.label}
                      {tier.highlight && <Badge variant="success">Paling diminati</Badge>}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{tier.hint}</p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-primary-700">
                    {formatRupiahShort(tier.min)} – {formatRupiahShort(tier.max)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-slate-400">
              Estimasi otomatis dari metrik publik; nominal final menunggu negosiasi brand.
            </p>
          </section>

          <section aria-labelledby="quick-view-audio-title">
            <SectionHeading
              id="quick-view-audio-title"
              title="Audio Favorit"
              action={<span className="text-xs text-slate-400">{favoriteAudios.length} audio</span>}
            />
            {favoriteAudios.length > 0 ? (
              <ul className="mt-3 space-y-1" role="list">
                {favoriteAudios.map((audio) => (
                  <li
                    key={`${audio.title}-${audio.creator}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <Music2 className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-700">{audio.title}</p>
                      <p className="truncate text-xs text-slate-400">{audio.creator}</p>
                    </div>
                    <span className="shrink-0 text-xs font-semibold text-slate-500">
                      {audio.usageCount} video
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Belum ada data audio favorit.</p>
            )}
          </section>
        </div>

        <section aria-labelledby="quick-view-portfolio-title">
          <SectionHeading
            id="quick-view-portfolio-title"
            title="Portofolio Video"
            action={<Badge variant="secondary">{talent.recentVideos.length} video</Badge>}
          />
          <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3" role="list">
            {talent.recentVideos.map((video) => (
              <li key={video.id}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <img
                    src={video.thumbnailUrl}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 text-xs font-semibold text-white drop-shadow-sm">
                    <Play className="h-3.5 w-3.5 shrink-0 fill-current" aria-hidden="true" />
                    <span className="truncate">{video.views}</span>
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-medium text-slate-700">{video.title}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Modal>
  );
};
