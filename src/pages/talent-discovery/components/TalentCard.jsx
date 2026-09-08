import { useState } from 'react';
import { BadgeCheck, Eye, MapPin, Play } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

import { AddToCampaignButton } from './AddToCampaignButton';
import { CategoryChip } from './CategoryChip';
import { QuickViewModal } from './QuickViewModal';
import { TalentMetricList } from './TalentMetricList';

const VERIFIED_BADGE = 'Verified';
const MAX_NON_VERIFIED_BADGES = 2;
const MAX_VIDEO_THUMBS = 3;

/** Metrik yang disorot kartu: followers, rata-rata views, engagement rate. */
const CARD_METRIC_FIELDS = [
  { key: 'followers', label: 'Followers' },
  { key: 'avgViewsPerVideo', label: 'Avg Views' },
  { key: 'engagementRate', label: 'Eng. Rate', valueClassName: 'text-emerald-600' },
];

/**
 * Kartu profil kreator untuk grid view.
 * Menampilkan identitas, kategori, metrik utama, tiga video terakhir dengan
 * overlay jumlah view, serta aksi "Add to Campaign" & "View Details" (Quick View).
 */
export const TalentCard = ({ talent, className }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAddedToCampaign, setIsAddedToCampaign] = useState(false);

  const isVerified = talent.badges.includes(VERIFIED_BADGE);
  const extraBadges = talent.badges.filter((badge) => badge !== VERIFIED_BADGE);
  const visibleBadges = extraBadges.slice(0, MAX_NON_VERIFIED_BADGES);
  const hiddenBadgeCount = extraBadges.length - visibleBadges.length;
  const latestVideos = talent.recentVideos.slice(0, MAX_VIDEO_THUMBS);

  const handleToggleCampaign = () => setIsAddedToCampaign((current) => !current);

  return (
    <>
      <Card className={cn('h-full transition-shadow hover:shadow-md', className)}>
        <CardContent className="flex h-full flex-col p-5">
          {/* Identitas kreator */}
          <div className="flex items-start gap-3">
            <img
              src={talent.avatarUrl}
              alt={`Foto ${talent.name}`}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <h3 className="truncate text-sm font-semibold text-slate-800">{talent.name}</h3>
                {isVerified && (
                  <>
                    <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
                    <span className="sr-only">Terverifikasi</span>
                  </>
                )}
              </div>
              <p className="truncate text-sm text-slate-500">{talent.username}</p>
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-400">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                {talent.location}
              </p>
            </div>
            <CategoryChip category={talent.category} className="shrink-0" />
          </div>

          {/* Metrik utama */}
          <TalentMetricList
            talent={talent}
            fields={CARD_METRIC_FIELDS}
            className="mt-4 rounded-lg bg-slate-50 px-3 py-3"
          />

          {/* Badge pendukung */}
          {(visibleBadges.length > 0 || hiddenBadgeCount > 0) && (
            <div className="mt-3 flex flex-wrap items-start gap-1.5">
              {visibleBadges.map((badge) => (
                <Badge key={badge} variant="outline">
                  {badge}
                </Badge>
              ))}
              {hiddenBadgeCount > 0 && (
                <span className="text-xs font-medium text-slate-400">
                  +{hiddenBadgeCount} lainnya
                </span>
              )}
            </div>
          )}

          {/* Cuplikan tiga video terakhir */}
          {latestVideos.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Video Terbaru
                </p>
                <span className="text-xs text-slate-400">{latestVideos.length} konten</span>
              </div>
              <ul className="mt-2 grid grid-cols-3 gap-2" role="list">
                {latestVideos.map((video) => (
                  <li key={video.id}>
                    <div
                      className="group relative aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-slate-100"
                      title={video.title}
                    >
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
                      <span className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1 text-[11px] font-semibold text-white drop-shadow-sm">
                        <Play className="h-3 w-3 shrink-0 fill-current" aria-hidden="true" />
                        <span className="truncate">{video.views}</span>
                      </span>
                      <span className="sr-only">
                        {video.title} — {video.views} views
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Aksi: tambah campaign & lihat detail */}
          <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-4">
            <AddToCampaignButton
              isInCampaign={isAddedToCampaign}
              onClick={handleToggleCampaign}
              size="sm"
              className="w-full"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full"
            >
              <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <QuickViewModal
        talent={talent}
        open={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        isInCampaign={isAddedToCampaign}
        onToggleCampaign={handleToggleCampaign}
      />
    </>
  );
};
