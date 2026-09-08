import { useState } from 'react';
import { RotateCcw, SearchX } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { MOCK_TALENTS } from '@/data/mockTalents';

import { CampaignActionModal } from './components/CampaignActionModal';
import { CampaignSelectionBar } from './components/CampaignSelectionBar';
import { DiscoveryStats } from './components/DiscoveryStats';
import { DiscoveryToolbar } from './components/DiscoveryToolbar';
import { TalentGrid } from './components/TalentGrid';
import { TalentTable } from './components/TalentTable';
import { useCampaignSelection } from './useCampaignSelection';
import { useTalentDirectory } from './useTalentDirectory';

/** Skeleton daftar hasil yang ditampilkan selama simulasi loading berjalan. */
const ResultsSkeleton = () => (
  <div
    aria-label="Memuat kreator..."
    className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
  >
    {Array.from({ length: 6 }, (_, index) => (
      <div
        key={index}
        aria-hidden="true"
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <Skeleton className="h-14 w-14 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="mt-4 h-16 w-full rounded-lg" />
        <div className="mt-4 flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Halaman Utama — Talent Discovery Dashboard.
 * Menampilkan ringkasan statistik, pencarian/filter kreator, dan hasil
 * dalam mode grid maupun tabel (responsif). Seluruh data dari mock.
 * Seleksi "Add to Campaign" diangkat ke halaman agar Floating Selection Bar
 * bisa menjumlahkan kreator terpilih lintas kartu/filter.
 */
export default function TalentDiscoveryPage() {
  const [actionModal, setActionModal] = useState(null);
  const { selectedIds, selectedCount, selectedTalents, toggleSelection, clearSelection } =
    useCampaignSelection(MOCK_TALENTS);

  const {
    query,
    setQuery,
    category,
    setCategory,
    sortKey,
    sortDirection,
    onSortChange,
    onSortHeader,
    viewMode,
    setViewMode,
    isLoading,
    results,
    totalCount,
    activeFilterCount,
    resetFilters,
  } = useTalentDirectory(MOCK_TALENTS);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Top Talent Discovery"
        description="Temukan, bandingkan, dan pilih kreator TikTok unggulan untuk kampanye Anda berikutnya."
      />

      <DiscoveryStats />

      <section aria-labelledby="heading-jelajahi-kreator" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="heading-jelajahi-kreator" className="text-lg font-semibold text-slate-100">
              Jelajahi Kreator
            </h2>
            <p className="mt-0.5 text-sm text-slate-400">
              Filter berdasarkan kategori, urutkan metrik, dan ganti mode tampilan.
            </p>
          </div>
          {isLoading ? (
            <p className="text-sm text-slate-500">Memuat hasil…</p>
          ) : (
            <p aria-live="polite" className="text-sm text-slate-400">
              Menampilkan <span className="font-semibold text-slate-100">{results.length}</span> dari{' '}
              {totalCount} kreator
            </p>
          )}
        </div>

        <DiscoveryToolbar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          sortKey={sortKey}
          onSortChange={onSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFilterCount={activeFilterCount}
          onResetFilters={resetFilters}
        />

        {isLoading ? (
          <ResultsSkeleton />
        ) : results.length === 0 ? (
          <Card>
            <EmptyState
              icon={SearchX}
              title="Kreator tidak ditemukan"
              description="Tidak ada kreator yang cocok dengan kata kunci atau filter yang Anda pilih. Coba ubah pencarian atau reset filter."
              action={
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset Filter
                </Button>
              }
            />
          </Card>
        ) : viewMode === 'grid' ? (
          <TalentGrid talents={results} selectedIds={selectedIds} onToggleCampaign={toggleSelection} />
        ) : (
          <TalentTable
            talents={results}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSortHeader={onSortHeader}
          />
        )}
      </section>

      {/* Floating bar shortlist & popup dummy aksinya */}
      <CampaignSelectionBar
        selectedCount={selectedCount}
        onClear={clearSelection}
        onExport={() => setActionModal('export')}
        onCreate={() => setActionModal('create')}
      />
      <CampaignActionModal
        mode={actionModal}
        open={Boolean(actionModal)}
        onClose={() => setActionModal(null)}
        talents={selectedTalents}
      />
    </div>
  );
}
