import { ClipboardList, FileDown, Users, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';

/**
 * Floating action bar shortlist kampanye yang muncul di bawah layar ketika
 * satu atau lebih kreator terpilih lewat "Add to Campaign".
 *
 * Posisi sengaja berada di atas Bottom Navigation mobile (util `dock-offset`,
 * hanya aktif di bawah lg) dan mengambang bebas pada layar lebar.
 */
export const CampaignSelectionBar = ({ selectedCount, onClear, onExport, onCreate }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="dock-offset fixed inset-x-0 z-50 px-4 sm:px-6 lg:bottom-6">
      <div className="animate-modal-in mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/15 sm:p-3.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          {/* Ringkasan jumlah talent terpilih */}
          <div className="flex w-full min-w-0 items-center gap-3 lg:w-auto">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700"
              aria-hidden="true"
            >
              <Users className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p aria-live="polite" className="truncate text-sm font-bold text-slate-800">
                {selectedCount} Talents Selected
              </p>
              <p className="truncate text-xs text-slate-500">Siap diekspor atau dibuatkan kampanye.</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="min-h-11 shrink-0"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear
            </Button>
          </div>

          {/* Aksi mock: export shortlist & buat kampanye */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end lg:flex-none">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onExport}
              className="min-h-11 w-full sm:w-auto"
            >
              <FileDown className="h-4 w-4 shrink-0" aria-hidden="true" />
              Export Shortlist
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onCreate}
              className="min-h-11 w-full sm:w-auto"
            >
              <ClipboardList className="h-4 w-4 shrink-0" aria-hidden="true" />
              Create Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
