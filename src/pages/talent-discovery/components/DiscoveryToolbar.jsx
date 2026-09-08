import { LayoutGrid, RotateCcw, Search, Table as TableIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  DISCOVERY_CATEGORY_OPTIONS,
  DISCOVERY_SORT_OPTIONS,
} from '@/constants/discovery';
import { cn } from '@/utils/cn';

/** Options for the results view-mode segmented control. */
const VIEW_OPTIONS = [
  { value: 'grid', label: 'Grid', icon: LayoutGrid },
  { value: 'table', label: 'Table', icon: TableIcon },
];

/**
 * Creator search & filter bar: keyword (name/@username), category filter,
 * sorting, and the grid/table view-mode toggle.
 */
export const DiscoveryToolbar = ({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sortKey,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFilterCount,
  onResetFilters,
}) => (
  <Card>
    <CardContent className="space-y-3 p-4 sm:p-5">
      {/* Search row */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search name or @username…"
          aria-label="Search creators by name or username"
          className="min-h-11 pl-10"
          rightElement={
            query ? (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search keyword"
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : undefined
          }
        />
      </div>

      {/* Filter controls row */}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3">
        <div className="w-full sm:w-44">
          <Select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            aria-label="Filter creator category"
            className="min-h-11 bg-white"
          >
            {DISCOVERY_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full sm:w-56">
          <Select
            value={sortKey}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort results"
            className="min-h-11 bg-white"
          >
            {DISCOVERY_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onResetFilters} className="min-h-11 shrink-0">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </Button>
        )}

        {/* Grid vs Table toggle */}
        <div
          role="group"
          aria-label="Results view mode"
          className="ml-auto flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 bg-white p-0.5 shadow-sm"
        >
          {VIEW_OPTIONS.map(({ value, label, icon: Icon }) => {
            const isActive = viewMode === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() => onViewModeChange(value)}
                aria-pressed={isActive}
                title={label}
                className={cn(
                  'inline-flex min-h-11 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </CardContent>
  </Card>
);
