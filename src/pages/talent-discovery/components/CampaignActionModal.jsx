import { useEffect, useRef, useState } from 'react';
import { BadgeCheck, CheckCircle2, ClipboardList, FileDown } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatCompactNumber, parseCompactNumber } from '@/utils/metrics';

import { CategoryChip } from '@/components/common/CategoryChip';

const VERIFIED_BADGE = 'Verified';

/** Teks & ikon per mode aksi shortlist (export vs create). */
const ACTION_META = {
  export: {
    icon: FileDown,
    title: 'Export Shortlist',
    description: 'Simulasikan ekspor shortlist kreator terpilih menjadi berkas CSV.',
    note: 'Kolom yang diekspor: nama, username, kategori, followers, dan engagement rate.',
    confirmLabel: 'Export CSV',
    loadingLabel: 'Mengekspor…',
    successTitle: 'Shortlist berhasil diekspor',
    successDescription: 'Berkas CSV (mock) siap diunduh pada alur sungguhan.',
  },
  create: {
    icon: ClipboardList,
    title: 'Buat Kampanye Baru',
    description: 'Tinjau kreator terpilih sebelum draft kampanye dibuat (mock).',
    note: 'Kreator di bawah akan dilampirkan sebagai shortlist awal kampanye.',
    confirmLabel: 'Buat Kampanye',
    loadingLabel: 'Membuat kampanye…',
    successTitle: 'Kampanye berhasil dibuat',
    successDescription: 'Draft kampanye (mock) beserta shortlist kreator telah dibuat.',
  },
};

/** Menghitung ringkasan agregat shortlist dari metrik masing-masing kreator. */
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

/** Baris kreator pada daftar shortlist di dalam dialog. */
const TalentRow = ({ talent }) => (
  <li className="flex items-center gap-3 px-4 py-3">
    <img
      src={talent.avatarUrl}
      alt={`Foto ${talent.name}`}
      loading="lazy"
      className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
    />
    <div className="min-w-0 flex-1">
      <p className="flex items-center gap-1 text-sm font-medium text-slate-800">
        <span className="truncate">{talent.name}</span>
        {talent.badges.includes(VERIFIED_BADGE) && (
          <>
            <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
            <span className="sr-only">Terverifikasi</span>
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
 * Popup dummy aksi shortlist: export CSV atau buat kampanye baru.
 * Menampilkan ringkasan & daftar kreator terpilih, lalu mensimulasikan
 * pemrosesan dengan delay sebelum menampilkan status sukses.
 */
export const CampaignActionModal = ({ mode, open, onClose, talents }) => {
  const meta = ACTION_META[mode] ?? ACTION_META.export;
  const [step, setStep] = useState('idle');
  const timerRef = useRef(null);

  // Reset dialog setiap kali dibuka / berpindah mode.
  useEffect(() => {
    if (open) setStep('idle');
  }, [open, mode]);

  // Bersihkan timer simulasi saat komponen dilepas.
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const summary = buildSummary(talents);

  const summaryTiles = [
    { key: 'count', label: 'Kreator', value: `${talents.length}` },
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
              Batal
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
            {meta.successDescription} Shortlist berisi {talents.length} kreator.
          </p>
          <Button type="button" className="mt-6" onClick={handleClose}>
            Selesai
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          <ul
            role="list"
            aria-label="Ringkasan shortlist"
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
                Kreator Terpilih
              </h4>
              <Badge variant="secondary">{talents.length} kreator</Badge>
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
