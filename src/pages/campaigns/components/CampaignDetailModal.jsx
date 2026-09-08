import { useMemo } from 'react';
import { CalendarRange, CircleDollarSign, UserRound } from 'lucide-react';

import { TalentIdentity } from '@/components/common/TalentIdentity';
import { Modal } from '@/components/ui/Modal';
import { CAMPAIGN_TIMELINE_STEPS } from '@/constants/campaigns';
import { cn } from '@/utils/cn';
import { formatRupiah } from '@/utils/currency';
import { formatDateShort } from '@/utils/date';

import { CampaignStatusBadge } from './CampaignStatusBadge';
import { ProgressBar } from './ProgressBar';

/** Menentukan status tahap (selesai/aktif/belum) dari progress kampanye. */
const resolveStepState = (threshold, progress) => {
  if (progress >= threshold) return 'done';
  if (progress > 0 && progress >= threshold - 15) return 'current';
  return 'todo';
};

/**
 * Modal detail kampanye: informasi umum, progres, kreator, dan timeline
 * alur kerja dari brief hingga laporan akhir.
 */
export const CampaignDetailModal = ({ campaign, open, onClose }) => {
  const steps = useMemo(
    () =>
      CAMPAIGN_TIMELINE_STEPS.map((step) => ({
        ...step,
        state: resolveStepState(step.threshold, campaign?.progress ?? 0),
      })),
    [campaign],
  );

  if (!campaign) return null;

  const hasSchedule = Boolean(campaign.startDate && campaign.endDate);
  const budgetText = campaign.budget > 0 ? formatRupiah(campaign.budget) : 'Belum disetel';

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={campaign.name}
      description={`${campaign.code} • ${campaign.brand}`}
    >
      <div className="space-y-6">
        {/* Info ringkas */}
        <div className="flex flex-wrap items-center gap-2">
          <CampaignStatusBadge status={campaign.status} />
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {campaign.category}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <UserRound className="h-3.5 w-3.5" aria-hidden="true" /> PIC
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-800">{campaign.manager.name}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <CalendarRange className="h-3.5 w-3.5" aria-hidden="true" /> Jadwal
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-800">
              {hasSchedule
                ? `${formatDateShort(campaign.startDate)} – ${formatDateShort(campaign.endDate)}`
                : 'Belum dijadwalkan'}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <CircleDollarSign className="h-3.5 w-3.5" aria-hidden="true" /> Budget
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-800">{budgetText}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-400">Deliverable</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-800">
              {campaign.deliverableLabel}
            </dd>
          </div>
        </dl>

        {/* Tujuan & KPI */}
        <div className="rounded-xl bg-slate-50 p-4">
          <h4 className="text-sm font-semibold text-slate-800">Tujuan Kampanye</h4>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{campaign.goal}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">
            Target KPI: <span className="font-semibold text-primary-700">{campaign.kpi}</span>
          </p>
        </div>

        {/* Progres */}
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-800">Progres</h4>
            <span className="text-xs font-semibold text-slate-500">{campaign.progress}%</span>
          </div>
          <ProgressBar value={campaign.progress} className="mt-2" />
        </div>

        {/* Timeline alur kerja */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Alur Kerja</h4>
          <ol className="mt-3">
            {steps.map((step, index) => (
              <li key={step.key} className="relative flex gap-3 pb-5 last:pb-0">
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-[11px] top-6 h-full w-0.5',
                      step.state === 'done' ? 'bg-emerald-400' : 'bg-slate-200',
                    )}
                  />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                    step.state === 'done' && 'bg-emerald-500 text-white',
                    step.state === 'current' && 'bg-primary-600 text-white',
                    step.state === 'todo' && 'bg-slate-200 text-slate-500',
                  )}
                >
                  {step.state === 'done' ? '✓' : index + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-slate-800">{step.label}</p>
                  <p className="text-xs text-slate-500">{step.hint}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Daftar kreator */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800">
            Talenta ({campaign.talents.length})
          </h4>
          {campaign.talents.length === 0 ? (
            <p className="mt-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
              Belum ada kreator yang ditambahkan ke kampanye ini.
            </p>
          ) : (
            <ul
              role="list"
              className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200"
            >
              {campaign.talents.map((talent) => (
                <li key={talent.id} className="flex items-center gap-3 px-4 py-3">
                  <TalentIdentity talent={talent} imageClassName="h-9 w-9 rounded-lg" />
                  <div className="ml-auto flex shrink-0 items-center gap-4 text-xs text-slate-500">
                    <span>{talent.followers}</span>
                    <span className="font-semibold text-emerald-600">{talent.engagementRate}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};
