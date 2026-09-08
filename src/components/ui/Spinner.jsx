import { Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export const Spinner = ({ size = 'md', className, label = 'Loading...' }) => (
  <Loader2
    role="status"
    aria-label={label}
    className={cn('animate-spin text-primary-600', spinnerSizes[size], className)}
  />
);