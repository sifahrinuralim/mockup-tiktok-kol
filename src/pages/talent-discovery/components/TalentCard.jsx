import { BadgeCheck, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

import { CategoryChip } from './CategoryChip';
import { TalentMetricList } from './TalentMetricList';

const VERIFIED_BADGE = 'Verified';
const MAX_NON_VERIFIED_BADGES = 2;

/**
 * Kartu profil kreator untuk grid view.
 * Menampilkan identitas, kategori, tiga metrik utama, dan badge keunggulan.
 */
export const TalentCard = ({ talent, className }) => {
  const isVerified = talent.badges.includes(VERIFIED_BADGE);
  const extraBadges = talent.badges.filter((badge) => badge !== VERIFIED_BADGE);
  const visibleBadges = extraBadges.slice(0, MAX_NON_VERIFIED_BADGES);
  const hiddenBadgeCount = extraBadges.length - visibleBadges.length;

  return (
    <Card className={cn('h-full transition-shadow hover:shadow-md', className)}>
      <CardContent className="flex h-full flex-col p-5">
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

        <TalentMetricList talent={talent} className="mt-4 rounded-lg bg-slate-50 px-3 py-3" />

        {(visibleBadges.length > 0 || hiddenBadgeCount > 0) && (
          <div className="mt-4 flex flex-1 flex-wrap items-start gap-1.5">
            {visibleBadges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
            {hiddenBadgeCount > 0 && (
              <span className="text-xs font-medium text-slate-400">+{hiddenBadgeCount} lainnya</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
