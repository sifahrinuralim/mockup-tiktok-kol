import { cn } from '@/utils/cn';

/**
 * Simple skeleton loader placeholder shown while content is loading.
 */
export const Skeleton = ({ className }) => (
  <div aria-hidden="true" className={cn('animate-pulse rounded-md bg-slate-200', className)} />
);