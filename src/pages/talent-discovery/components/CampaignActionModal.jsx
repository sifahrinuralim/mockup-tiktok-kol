import { useEffect, useRef, useState } from 'react';
import { BadgeCheck, CheckCircle2, ClipboardList, FileDown } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatCompactNumber, parseCompactNumber } from '@/utils/metrics';

import { CategoryChip } from '@/components/common/CategoryChip';

const VERIFIED_BADGE = 'Verified';

/** Text & icon per shortlist action mode (export vs create). */
const ACTION_META = {
  export: {
    icon: FileDown,
    title: 'Export Shortlist',
    description: 'Simulates exporting the selected creator shortlist as a CSV file.',
    note: 'Exported columns: name, username, category, followers, and engagement rate.',
    confirmLabel: 'Export CSV',
    loadingLabel: 'Exporting…',
    successTitle: 'Shortlist exported successfully',
    successDescription: 'A (mock) CSV file would be ready to download in a real flow.',
  },
  create: {
    icon: ClipboardList,
    title: 'Create New Campaign',
    description: 'Review the selected creators before the campaign draft is created (mock).',
    note: 'The creators below will be attached as the campaign initial shortlist.',
    confirmLabel: 'Create Campaign',
    loadingLabel: 'Creating campaign…',
    successTitle: 'Campaign created successfully',
    successDescription: 'A (mock) campaign draft along with the creator shortlist has been created.',
  },
};

/** Computes the aggregate shortlist summary from each creator's metrics. */
const buildSummary = (talents) => {
  const totalFollowers = talents.reduce(
    (sum, talent) => sum + parseCompactNumber(talent.followers),
    0,
  );
  const totalViews = talents.reduce((sum, talent) => sum + parseCompactNumber(talent.totalViews), 0);
  const averageEngagement = talents.length
    ? talents.reduce((sum, talent) => sum + parseCompactNumber(talent.engagementRate), 0) /
      talents.length
    : 0;

  return {
    followers: formatCompactNumber(totalFollowers),
    views: formatCompactNumber(totalViews),
    engagement: `${averageEngagement.toFixed(1)}%`,
  };
};

/** Creator row in the shortlist list inside the dialog. */
const TalentRow = ({ talent }) => (
  <li className="flex items-center gap-3 px-4 py-3">
    <img
      src={talent.avatarUrl}
      alt={`Photo of ${talent.name}`}
      loading="lazy"
      className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
    />
    <div className="min-w-0 flex-1">
      <p className="flex items-center gap-1 text-sm font-medium text-slate-800">
        <span className="truncate">{talent.name}</span>
        {talent.badges.includes(VERIFIED_BADGE) && (
          <>
            <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
            <span className="sr-only">Verified</span>
          </>
        )}
      </p>
      <p className="truncate text-xs text-slate-400">
        {talent.username} · {talent.location}
      </p>
    </div>
    <div className="hidden shrink-0 sm:block">
      <CategoryChip category={talent.category} />
    </div>
    <span className="shrink-0 text-xs font-semibold text-slate-600">{talent.followers}</span>
  </li>
);

/**
 * Mock popup for shortlist actions: export CSV or create a new campaign.
 * Shows a summary & the selected creator list, then simulates processing
 * with a delay before displaying a success state.
 */
export const CampaignActionModal = ({ mode, open, onClose, talents }) => {
  const meta = ACTION_META[mode] ?? ACTION_META.export;
  const [step, setStep] = useState('idle');
  const timerRef = useRef(null);

  // Reset the dialog each time it opens / switches mode.
  useEffect(() => {
    if (open) setStep('idle');
  }, [open, mode]);

  // Clear the simulation timer when the component unmounts.
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const summary = buildSummary(talents);

  const summaryTiles = [
    { key: 'count', label: 'Creators', value: `${talents.length}` },
    { key: 'followers', label: 'Total Followers', value: summary.followers },
    { key: 'views', label: 'Total Views', value: summary.views },
    { key: 'engagement', label: 'Avg Eng. Rate', value: summary.engagement },
  ];

  const handleConfirm = () => {
    if (step === 'loading') return;
    setStep('loading');
    timerRef.current = window.setTimeout(() => setStep('done'), 900);
  };

  const handleClose = () => {
    if (step === 'loading') return;
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={meta.title}
      description={meta.description}
      size="lg"
      footer={
        step === 'done' ? undefined : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={step === 'loading'}
              className="min-h-11"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={mode === 'create' ? 'primary' : 'secondary'}
              onClick={handleConfirm}
              isLoading={step === 'loading'}
              loadingText={meta.loadingLabel}
              className="min-h-11"
            >
              <meta.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {meta.confirmLabel}
            </Button>
          </>
        )
      }
    >
      {step === 'done' ? (
        <div className="flex flex-col items-center px-2 py-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-base font-semibold text-slate-800">{meta.successTitle}</h3>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500">
            {meta.successDescription} Shortlist of {talents.length} creators.
          </p>
          <Button type="button" className="mt-6" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          <ul
            role="list"
            aria-label="Shortlist summary"
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {summaryTiles.map((tile) => (
              <li key={tile.key} className="rounded-lg border border-slate-200 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {tile.label}
                </p>
                <p className="mt-1 truncate text-lg font-bold text-slate-800">{tile.value}</p>
              </li>
            ))}
          </ul>

          <section aria-labelledby="shortlist-modal-list-title">
            <div className="flex items-center justify-between gap-2">
              <h4 id="shortlist-modal-list-title" className="text-sm font-semibold text-slate-800">
                Selected Creators
              </h4>
              <Badge variant="secondary">{talents.length} creators</Badge>
            </div>
            <p className="mt-1 text-xs text-slate-500">{meta.note}</p>
            <ul
              role="list"
              className="mt-3 max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200"
            >
              {talents.map((talent) => (
                <TalentRow key={talent.id} talent={talent} />
              ))}
            </ul>
          </section>
        </div>
      )}
    </Modal>
  );
};
