import { BadgeCheck } from 'lucide-react';

import { cn } from '@/utils/cn';

const VERIFIED_BADGE = 'Verified';

/** Small checkmark shown next to a verified creator's name. */
const VerifiedMark = () => (
  <>
    <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
    <span className="sr-only">Verified</span>
  </>
);

/**
 * Creator identity row (avatar + name + @username) reused across tables and
 * lists on many pages (Top Talents, Saved Lists, Campaign).
 * Avatar size can be changed via the `imageClassName` prop.
 */
export const TalentIdentity = ({ talent, imageClassName = 'h-10 w-10 rounded-lg', className }) => (
  <div className={cn('flex min-w-0 items-center gap-3', className)}>
    <img
      src={talent.avatarUrl}
      alt={`Photo of ${talent.name}`}
      loading="lazy"
      className={cn('shrink-0 object-cover ring-1 ring-slate-200', imageClassName)}
    />
    <div className="min-w-0">
      <p className="flex items-center gap-1 font-medium text-slate-800">
        <span className="truncate">{talent.name}</span>
        {talent.badges?.includes(VERIFIED_BADGE) && <VerifiedMark />}
      </p>
      <p className="truncate text-xs text-slate-500">{talent.username}</p>
    </div>
  </div>
);
