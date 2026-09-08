import { cn } from '@/utils/cn';

/**
 * Skeleton loader sederhana untuk placeholder konten saat loading.
 */
export const Skeleton = ({ className }) => (
  <div aria-hidden="true" className={cn('animate-pulse rounded-md bg-slate-200', className)} />
);