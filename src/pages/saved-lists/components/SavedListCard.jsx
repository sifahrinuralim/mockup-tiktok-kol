import { ArrowRight, CalendarDays, Users } from 'lucide-react';

import { AvatarStack } from '@/components/common/AvatarStack';
import { CategoryChip } from '@/components/common/CategoryChip';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { LIST_GRADIENT_CLASSES } from '@/constants/savedLists';
import { cn } from '@/utils/cn';
import { formatRupiahShort } from '@/utils/currency';
import { formatDateLong } from '@/utils/date';

/**
 * Kartu satu daftar kreator tersimpan: aksen gradien, ringkasan anggota,
 * estimasi budget, dan aksi membuka detail.
 */
export const SavedListCard = ({ list, accentIndex = 0, onOpen }) => {
  const gradient = LIST_GRADIENT_CLASSES[accentIndex % LIST_GRADIENT_CLASSES.length];

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className={cn('h-2 bg-gradient-to-r', gradient)} aria-hidden="true" />

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900">{list.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              {list.memberCount} kreator
            </p>
          </div>
          <CategoryChip category={list.category} className="shrink-0" />
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {list.description}
        </p>

        {list.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {list.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex flex-col gap-1">
            <AvatarStack talents={list.members} imageClassName="h-7 w-7" />
            <p className="text-[11px] text-slate-400">
              Estimasi mulai{' '}
              <span className="font-semibold text-slate-600">
                {formatRupiahShort(list.estimatedBudget)}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <p className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            Diperbarui {formatDateLong(list.updatedAt)}
          </p>
          <Button variant="outline" size="sm" onClick={() => onOpen(list.id)}>
            Lihat Daftar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
