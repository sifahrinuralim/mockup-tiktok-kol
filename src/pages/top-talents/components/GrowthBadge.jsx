import { TrendingDown, TrendingUp } from 'lucide-react';

import { cn } from '@/utils/cn';

/**
 * 30-day creator growth badge: up/down arrow + percentage.
 * Green for positive growth, red for negative, neutral when flat.
 */
export const GrowthBadge = ({ value, className }) => {
  const isPositive = value > 0.05;
  const isNegative = value < -0.05;
  const formattedValue = `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : TrendingUp;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
        isPositive && 'bg-emerald-50 text-emerald-700',
        isNegative && 'bg-rose-50 text-rose-700',
        !isPositive && !isNegative && 'bg-slate-100 text-slate-500',
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {formattedValue}
    </span>
  );
};
