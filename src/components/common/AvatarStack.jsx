import { cn } from '@/utils/cn';

/**
 * Overlapping stack of creator avatars + a count indicator for the hidden
 * remainder. Returns null when the creator list is empty.
 */
export const AvatarStack = ({ talents, max = 3, imageClassName = 'h-7 w-7', className }) => {
  if (!talents || talents.length === 0) return null;

  const visible = talents.slice(0, max);
  const hiddenCount = talents.length - visible.length;

  return (
    <div className={cn('flex items-center -space-x-2', className)} aria-label={`${talents.length} creators`}>
      {visible.map((talent) => (
        <img
          key={talent.id}
          src={talent.avatarUrl}
          alt=""
          loading="lazy"
          className={cn('rounded-full object-cover ring-2 ring-white', imageClassName)}
        />
      ))}
      {hiddenCount > 0 && (
        <span className="flex min-w-7 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[11px] font-semibold text-slate-600 ring-2 ring-white">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
