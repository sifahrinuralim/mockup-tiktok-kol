/**
 * Halaman Top Talents — papan peringkat kreator unggulan.
 * Menampilkan ringkasan statistik, podium 3 besar, dan tabel peringkat
 * lengkap yang bisa difilter berdasarkan nama & kategori kreator.
 * Seluruh data dummy berasal dari src/data/mockTopTalents.js (turunan MOCK_TALENTS).
 */

import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, SearchX } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SIMULATED_LOAD_DELAY_MS, DISCOVERY_CATEGORY_ALL, DISCOVERY_CATEGORY_OPTIONS } from '@/constants/discovery';
import { MOCK_TOP_TALENTS } from '@/data/mockTopTalents';

import { PodiumRanking } from './components/PodiumRanking';
import { TopTalentsTable } from './components/TopTalentsTable';
import { TopTalentSummary } from './components/TopTalentSummary';

/** Skeleton ringkasan + papan peringkat saat simulasi loading berjalan. */
const TopTalentsSkeleton = () => (
  <div aria-label="Memuat peringkat kreator..." className="space-y-4">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="h-12 w-12 rounded-xl bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 rounded bg-slate-200" />
            <div className="h-5 w-1/2 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-5 w-40 rounded bg-slate-200" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="h-44 rounded-xl bg-slate-100" />
        ))}
      </div>
    </div>
  </div>
);

/** Filter hasil peringkat berdasarkan teks nama/@username dan kategori. */
const filterTalents = (talents, query, category) =>
  talents.filter((talent) => {
    const matchesCategory = category === DISCOVERY_CATEGORY_ALL || talent.category === category;
    const normalizedQuery = query.trim().toLowerCase();

    const matchesQuery =
      !normalizedQuery ||
      talent.name.toLowerCase().includes(normalizedQuery) ||
      talent.username.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

/**
 * Halaman utama modul Top Talents.
 */
export default function TopTalentsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(DISCOVERY_CATEGORY_ALL);
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi request awal agar state loading sempat terlihat seperti aplikasi nyata.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), SIMULATED_LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const results = useMemo(
    () => filterTalents(MOCK_TOP_TALENTS, query, category),
    [query, category],
  );

  const resetFilters = () => {
    setQuery('');
    setCategory(DISCOVERY_CATEGORY_ALL);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Top Talents"
        description="Peringkat kreator TikTok unggulan berdasarkan skor performa gabungan: total views, followers, dan engagement rate."
      />

      {isLoading ? (
        <TopTalentsSkeleton />
      ) : (
        <>
          <TopTalentSummary />

          {/* Podium 3 kreator terbaik */}
          <PodiumRanking talents={MOCK_TOP_TALENTS.slice(0, 3)} />

          {/* Peringkat lengkap */}
          <section aria-labelledby="heading-peringkat-lengkap" className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="heading-peringkat-lengkap" className="text-lg font-semibold text-slate-900">
                  Peringkat Lengkap
                </h2>
                <p className="mt-0.5 text-sm text-slate-600">
                  Semua kreator diurutkan dari skor performa tertinggi. Filter untuk mempersempit hasil.
                </p>
              </div>
              <p aria-live="polite" className="text-sm text-slate-600">
                Menampilkan <span className="font-semibold text-slate-900">{results.length}</span> dari{' '}
                {MOCK_TOP_TALENTS.length} kreator
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]">
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari nama atau @username…"
                aria-label="Cari kreator pada peringkat"
              />
              <Select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter kategori kreator"
              >
                {DISCOVERY_CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            {results.length === 0 ? (
              <Card>
                <EmptyState
                  icon={SearchX}
                  title="Tidak ada kreator yang cocok"
                  description="Coba kata kunci lain atau ubah kategori untuk menampilkan kembali peringkat kreator."
                  action={
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Reset Filter
                    </Button>
                  }
                />
              </Card>
            ) : (
              <TopTalentsTable talents={results} />
            )}
          </section>
        </>
      )}
    </div>
  );
}
