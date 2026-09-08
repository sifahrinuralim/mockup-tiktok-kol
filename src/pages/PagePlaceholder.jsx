import { Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { NAV_ITEMS } from '@/constants/navigation';

/**
 * Halaman penampung (placeholder) untuk modul yang belum dibangun.
 * Judul & deskripsi diambil dari NAV_ITEMS berdasarkan rute yang aktif.
 */
export default function PagePlaceholder() {
  const { pathname } = useLocation();

  const current =
    NAV_ITEMS.find((item) => item.to === pathname) ??
    NAV_ITEMS.filter((item) => item.to !== '/').find((item) =>
      pathname.startsWith(`${item.to}/`),
    ) ??
    NAV_ITEMS[0];

  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          <span
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
            aria-hidden="true"
          />
          Tahap 1 — Shell Layout
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{current.label}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{current.description}</p>
      </header>

      <section
        aria-label="Status pengembangan modul"
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <Clock className="h-7 w-7 text-slate-500" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-base font-semibold text-slate-900">
          Halaman {current.label} sedang disiapkan
        </h2>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">
          Modul ini akan diisi pada tahap pengembangan berikutnya. Saat ini, shell layout, navigasi
          responsif, dan tema terang sudah tersedia di seluruh bagian aplikasi.
        </p>
      </section>
    </div>
  );
}