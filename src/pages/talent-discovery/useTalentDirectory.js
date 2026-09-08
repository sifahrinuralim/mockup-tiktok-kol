import { useEffect, useMemo, useState } from 'react';

import {
  DISCOVERY_CATEGORY_ALL,
  DISCOVERY_DEFAULT_SORT_DIRECTION,
  DISCOVERY_DEFAULT_SORT_KEY,
  SIMULATED_LOAD_DELAY_MS,
} from '@/constants/discovery';
import { parseCompactNumber } from '@/utils/metrics';

/** Checks whether the query matches a creator's name or @username. */
const matchesQuery = (talent, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return (
    talent.name.toLowerCase().includes(normalizedQuery) ||
    talent.username.toLowerCase().includes(normalizedQuery)
  );
};

/** Filters the talent list by text query and the selected category. */
const applyFilters = (talents, query, category) =>
  talents.filter((talent) => {
    const matchesCategory = category === DISCOVERY_CATEGORY_ALL || talent.category === category;
    return matchesCategory && matchesQuery(talent, query);
  });

/**
 * Sorts a copy of the talent list by a metric value (parsing compact numbers).
 * When values are equal, names are compared alphabetically as a stable tie-breaker.
 */
const sortTalents = (talents, sortKey, direction) => {
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...talents].sort((first, second) => {
    const difference =
      (parseCompactNumber(first[sortKey]) - parseCompactNumber(second[sortKey])) * multiplier;

    if (difference !== 0) return difference;
    return first.name.localeCompare(second.name);
  });
};

/**
 * Talent directory state & logic for the main page:
 * search by name/@username, category filter, sorting (dropdown & header click),
 * grid/table view mode, and an initial simulated loading state.
 */
export const useTalentDirectory = (talents) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(DISCOVERY_CATEGORY_ALL);
  const [sortKey, setSortKey] = useState(DISCOVERY_DEFAULT_SORT_KEY);
  const [sortDirection, setSortDirection] = useState(DISCOVERY_DEFAULT_SORT_DIRECTION);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate the initial request so the skeleton state is visible like a real app.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), SIMULATED_LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const results = useMemo(
    () => sortTalents(applyFilters(talents, query, category), sortKey, sortDirection),
    [talents, query, category, sortKey, sortDirection],
  );

  const activeFilterCount =
    (query.trim() ? 1 : 0) + (category !== DISCOVERY_CATEGORY_ALL ? 1 : 0);

  /** Changes the sort metric from the dropdown (always starts descending). */
  const handleSortChange = (key) => {
    setSortKey(key);
    setSortDirection(DISCOVERY_DEFAULT_SORT_DIRECTION);
  };

  /** Sorts from a table header click: picks a new column or toggles the order. */
  const handleSortHeader = (key) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection(DISCOVERY_DEFAULT_SORT_DIRECTION);
  };

  /** Clears the keyword & category (sorting and view mode are kept). */
  const resetFilters = () => {
    setQuery('');
    setCategory(DISCOVERY_CATEGORY_ALL);
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    sortKey,
    sortDirection,
    onSortChange: handleSortChange,
    onSortHeader: handleSortHeader,
    viewMode,
    setViewMode,
    isLoading,
    results,
    totalCount: talents.length,
    activeFilterCount,
    resetFilters,
  };
};
