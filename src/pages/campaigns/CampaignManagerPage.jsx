/**
 * Halaman Campaign Manager — kelola alur kampanye dari brief hingga laporan.
 * Menampilkan statistik pipeline, filter status, dan tabel kampanye.
 * Data dummy di src/data/mockCampaigns.js; pembuatan kampanye baru menambah
 * entri ke state lokal dengan status Draft.
 */

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Plus, SearchX, X } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/Input';
import { SIMULATED_LOAD_DELAY_MS } from '@/constants/discovery';
import { CAMPAIGN_STATUS_FILTERS } from '@/constants/campaigns';
import { MOCK_CAMPAIGNS } from '@/data/mockCampaigns';
import { cn } from '@/utils/cn';

import { CampaignDetailModal } from './components/CampaignDetailModal';
import { CampaignStats } from './components/CampaignStats';
import { CampaignTable } from './components/CampaignTable';
import { CreateCampaignModal } from './components/CreateCampaignModal';

/** Penampung baris kampanye (skeleton) selama simulasi loading berjalan. */
const CampaignListSkeleton = () => (
  <div aria-label="Memuat daftar kampanye..." className="space-y-3">
    {Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="h-10 w-10 rounded-lg bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-2/5 rounded bg-slate-200" />
          <div className="h-3 w-1/3 rounded bg-slate-200" />
        </div>
        <div className="h-6 w-24 rounded-full bg-slate-100" />
        <div className="h-2 w-32 rounded-full bg-slate-100" />
      </div>
    ))}
  </div>
);

/** Filter kampanye berdasarkan status dan kata kunci pencarian. */
const filterCampaigns = (campaigns, status, query) => {
  const normalizedQuery = query.trim().toLowerCase();

  return campaigns.filter((campaign) => {
    const matchesStatus = status === 'all' || campaign.status === status;
    const matchesQuery =
      !normalizedQuery ||
      campaign.name.toLowerCase().includes(normalizedQuery) ||
      campaign.brand.toLowerCase().includes(normalizedQuery) ||
      campaign.code.toLowerCase().includes(normalizedQuery) ||
      campaign.category.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
};

/** Menghitung jumlah kampanye per status + total untuk tab filter. */
const countByStatus = (campaigns) =>
  CAMPAIGN_STATUS_FILTERS.map((filter) => ({
    ...filter,
    count:
      filter.value === 'all'
        ? campaigns.length
        : campaigns.filter((campaign) => campaign.status === filter.value).length,
  }));

/** Membangun objek kampanye draft baru dari hasil form modal. */
const buildDraftCampaign = (form, nextId) => ({
  id: nextId,
  name: form.name.trim(),
  brand: form.brand.trim(),
  category: form.category,
  status: 'draft',
  budget: form.budget,
  talentIds: [],
  talents: [],
  deliverables: { videos: 0, lives: 0, stories: 0 },
  deliverableLabel: 'Belum disusun',
  progress: 0,
  startDate: form.startDate || null,
  endDate: form.endDate || null,
  kpi: 'Belum disusun',
  goal: form.goal,
  manager: { name: 'Sarah Rahmawati', initials: 'SR' },
  code: `CMP-${String(nextId).padStart(3, '0')}`,
});

/**
 * Halaman utama modul Campaign Manager.
 */
export default function CampaignManagerPage() {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [activeStatus, setActiveStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailCampaign, setDetailCampaign] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulasi request awal agar skeleton state sempat terlihat nyata.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), SIMULATED_LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const statusTabs = useMemo(() => countByStatus(campaigns), [campaigns]);
  const results = useMemo(
    () => filterCampaigns(campaigns, activeStatus, query),
    [campaigns, activeStatus, query],
  );

  const resetFilters = () => {
    setActiveStatus('all');
    setQuery('');
  };

  const handleCreate = (form) => {
    const nextId = Math.max(...campaigns.map((campaign) => campaign.id)) + 1;
    const newCampaign = buildDraftCampaign(form, nextId);

    setCampaigns((current) => [newCampaign, ...current]);
    setSuccessMessage(`Kampanye “${newCampaign.name}” berhasil dibuat sebagai Draft.`);
    window.setTimeout(() => setSuccessMessage(''), 6000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaign Manager"
        description="Kelola alur kampanye dari brief hingga laporan akhir, pantau progres, dan lacak talenta yang terlibat."
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Buat Kampanye
          </Button>
        }
      />

      {isLoading ? (
        <CampaignListSkeleton />
      ) : (
        <>
          {successMessage && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="flex-1">{successMessage}</p>
              <button
                type="button"
                onClick={() => setSuccessMessage('')}
                className="rounded p-0.5 text-emerald-600 transition-colors hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Tutup notifikasi"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          <CampaignStats campaigns={campaigns} />

          <section aria-labelledby="heading-daftar-kampanye" className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="heading-daftar-kampanye" className="text-lg font-semibold text-slate-900">
                  Daftar Kampanye
                </h2>
                <p className="mt-0.5 text-sm text-slate-600">
                  Saring berdasarkan status atau cari nama kampanye, brand, dan kode.
                </p>
              </div>
              <p aria-live="polite" className="text-sm text-slate-600">
                Menampilkan{' '}
                <span className="font-semibold text-slate-900">{results.length}</span> dari{' '}
                {campaigns.length} kampanye
              </p>
            </div>

            {/* Tab filter status */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter status kampanye">
              {statusTabs.map((tab) => {
                const isActive = activeStatus === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveStatus(tab.value)}
                    aria-pressed={isActive}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                      isActive
                        ? 'border-transparent bg-primary-600 text-white shadow-sm'
                        : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50',
                    )}
                  >
                    {tab.label}
                    <span
                      className={cn(
                        'rounded-full px-1.5 text-xs font-semibold',
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500',
                      )}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama kampanye, brand, atau kode (cth. CMP-001)…"
              aria-label="Cari kampanye"
            />

            {results.length === 0 ? (
              <Card>
                <EmptyState
                  icon={SearchX}
                  title="Kampanye tidak ditemukan"
                  description="Tidak ada kampanye yang cocok dengan status atau kata kunci tersebut. Coba ubah pencarian atau reset filter."
                  action={
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset Filter
                    </Button>
                  }
                />
              </Card>
            ) : (
              <CampaignTable campaigns={results} onView={setDetailCampaign} />
            )}
          </section>
        </>
      )}

      <CreateCampaignModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
      <CampaignDetailModal
        campaign={detailCampaign}
        open={Boolean(detailCampaign)}
        onClose={() => setDetailCampaign(null)}
      />
    </div>
  );
}
