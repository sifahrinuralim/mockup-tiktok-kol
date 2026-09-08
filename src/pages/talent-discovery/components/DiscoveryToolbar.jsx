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

/** Opsi segmented control mode tampilan hasil. */
const VIEW_OPTIONS = [
  { value: 'grid', label: 'Grid', icon: LayoutGrid },
  { value: 'table', label: 'Tabel', icon: TableIcon },
];

/**
 * Filter bar & search kreator: kata kunci (name/@username), filter kategori,
 * sortir, dan toggle mode tampilan grid/table.
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
      {/* Baris pencarian */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari nama atau @username…"
          aria-label="Cari kreator berdasarkan nama atau username"
          className="pl-10"
          rightElement={
            query ? (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Bersihkan kata kunci pencarian"
                className="rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : undefined
          }
        />
      </div>

      {/* Baris kontrol filter */}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3">
        <div className="w-full sm:w-44">
          <Select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            aria-label="Filter kategori kreator"
            className="bg-white"
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
            aria-label="Urutkan hasil"
            className="bg-white"
          >
            {DISCOVERY_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onResetFilters} className="shrink-0">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </Button>
        )}

        {/* Toggle Grid vs Table */}
        <div
          role="group"
          aria-label="Mode tampilan hasil"
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
                  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
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
