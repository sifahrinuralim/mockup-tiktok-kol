import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/common/AppLayout';
import { Spinner } from '@/components/ui/Spinner';

const PagePlaceholder = lazy(() => import('@/pages/PagePlaceholder'));
const ComponentsShowcase = lazy(() => import('@/pages/ComponentsShowcase'));
const TalentDiscoveryPage = lazy(() => import('@/pages/talent-discovery/TalentDiscoveryPage'));

/** Fallback saat halaman lazy masih dimuat. */
const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Spinner label="Memuat halaman..." />
  </div>
);

/**
 * Routing aplikasi TalentPulse TikTok Agency.
 * Halaman produk di bawah AppLayout; setiap modul akan menggantikan
 * PagePlaceholder-nya masing-masing di tahap pengembangan berikutnya.
 */
export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<TalentDiscoveryPage />} />
          <Route path="/top-talents" element={<PagePlaceholder />} />
          <Route path="/campaigns" element={<PagePlaceholder />} />
          <Route path="/analytics" element={<PagePlaceholder />} />
          <Route path="/saved-lists" element={<PagePlaceholder />} />

          {/* Peraga design system starter (dev reference) */}
          <Route path="/ui-kit" element={<ComponentsShowcase />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
