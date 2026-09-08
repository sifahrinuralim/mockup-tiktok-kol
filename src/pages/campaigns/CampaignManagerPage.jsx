/**
 * Campaign Manager page — manage the campaign workflow from brief to report.
 * Shows pipeline statistics, status filters, and the campaign table.
 * Mock data lives in src/data/mockCampaigns.js; creating a new campaign adds
 * an entry to the local state with a Draft status.
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

/** Campaign-row skeleton placeholders while the simulated loading runs. */
const CampaignListSkeleton = () => (
  <div aria-label="Loading campaign list..." className="space-y-3">
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

/** Filters campaigns by status and search keyword. */
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

/** Counts campaigns per status + the total for the filter tabs. */
const countByStatus = (campaigns) =>
  CAMPAIGN_STATUS_FILTERS.map((filter) => ({
    ...filter,
    count:
      filter.value === 'all'
        ? campaigns.length
        : campaigns.filter((campaign) => campaign.status === filter.value).length,
  }));

/** Builds a new draft campaign object from the modal form data. */
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
  deliverableLabel: 'Not set yet',
  progress: 0,
  startDate: form.startDate || null,
  endDate: form.endDate || null,
  kpi: 'Not set yet',
  goal: form.goal,
  manager: { name: 'Sarah Rahmawati', initials: 'SR' },
  code: `CMP-${String(nextId).padStart(3, '0')}`,
});

/**
 * Main page of the Campaign Manager module.
 */
export default function CampaignManagerPage() {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [activeStatus, setActiveStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailCampaign, setDetailCampaign] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulate the initial request so the skeleton state is visibly rendered.
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
    setSuccessMessage(`Campaign “${newCampaign.name}” was created as a Draft.`);
    window.setTimeout(() => setSuccessMessage(''), 6000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaign Manager"
        description="Manage the campaign workflow from brief to final report, track progress, and follow the talent involved."
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create Campaign
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
                aria-label="Close notification"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          <CampaignStats campaigns={campaigns} />

          <section aria-labelledby="heading-campaign-list" className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="heading-campaign-list" className="text-lg font-semibold text-slate-900">
                  Campaign List
                </h2>
                <p className="mt-0.5 text-sm text-slate-600">
                  Filter by status or search by campaign name, brand, and code.
                </p>
              </div>
              <p aria-live="polite" className="text-sm text-slate-600">
                Showing{' '}
                <span className="font-semibold text-slate-900">{results.length}</span> of{' '}
                {campaigns.length} campaigns
              </p>
            </div>

            {/* Status filter tabs */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter campaign status">
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
              placeholder="Search campaign name, brand, or code (e.g. CMP-001)…"
              aria-label="Search campaigns"
            />

            {results.length === 0 ? (
              <Card>
                <EmptyState
                  icon={SearchX}
                  title="No campaigns found"
                  description="No campaigns match that status or keyword. Try another search or reset the filters."
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
