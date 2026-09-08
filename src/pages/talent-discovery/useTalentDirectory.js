import { useEffect, useMemo, useState } from 'react';

import {
  DISCOVERY_CATEGORY_ALL,
  DISCOVERY_DEFAULT_SORT_DIRECTION,
  DISCOVERY_DEFAULT_SORT_KEY,
  SIMULATED_LOAD_DELAY_MS,
} from '@/constants/discovery';
import { parseCompactNumber } from '@/utils/metrics';

/** Cek apakah query cocok dengan nama atau @username kreator. */
const matchesQuery = (talent, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return (
    talent.name.toLowerCase().includes(normalizedQuery) ||
    talent.username.toLowerCase().includes(normalizedQuery)
  );
};

/** Filter daftar talent berdasarkan query teks dan kategori terpilih. */
const applyFilters = (talents, query, category) =>
  talents.filter((talent) => {
    const matchesCategory = category === DISCOVERY_CATEGORY_ALL || talent.category === category;
    return matchesCategory && matchesQuery(talent, query);
  });

/**
 * Sortir salinan daftar talent berdasarkan nilai metrik (parsing angka ringkas).
 * Bila nilainya sama, urut abjad nama sebagai tie-breaker agar stabil.
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
 * State & logika direktori talent di halaman utama:
 * search by name/@username, filter kategori, sortir (dropdown & klik header),
 * mode tampilan grid/table, dan simulasi loading awal.
 */
export const useTalentDirectory = (talents) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(DISCOVERY_CATEGORY_ALL);
  const [sortKey, setSortKey] = useState(DISCOVERY_DEFAULT_SORT_KEY);
  const [sortDirection, setSortDirection] = useState(DISCOVERY_DEFAULT_SORT_DIRECTION);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi request awal agar skeleton state sempat terlihat seperti aplikasi nyata.
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

  /** Ubah metrik sortir dari dropdown (selalu urut menurun terlebih dahulu). */
  const handleSortChange = (key) => {
    setSortKey(key);
    setSortDirection(DISCOVERY_DEFAULT_SORT_DIRECTION);
  };

  /** Sortir dari klik header tabel: pilih kolom baru atau balik arah urut. */
  const handleSortHeader = (key) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection(DISCOVERY_DEFAULT_SORT_DIRECTION);
  };

  /** Bersihkan kata kunci & kategori (sortir dan mode tampilan dipertahankan). */
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
