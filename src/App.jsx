import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/common/AppLayout';
import { Spinner } from '@/components/ui/Spinner';

const ComponentsShowcase = lazy(() => import('@/pages/ComponentsShowcase'));
const TalentDiscoveryPage = lazy(() => import('@/pages/talent-discovery/TalentDiscoveryPage'));
const TopTalentsPage = lazy(() => import('@/pages/top-talents/TopTalentsPage'));
const CampaignManagerPage = lazy(() => import('@/pages/campaigns/CampaignManagerPage'));
const AnalyticsPage = lazy(() => import('@/pages/analytics/AnalyticsPage'));
const SavedListsPage = lazy(() => import('@/pages/saved-lists/SavedListsPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));

/** Fallback while a lazy page is still loading. */
const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Spinner label="Loading page..." />
  </div>
);

/**
 * TalentPulse TikTok Agency app routing.
 * Product pages live under AppLayout; each module already has its own
 * page with its own mock data.
 */
export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<TalentDiscoveryPage />} />
          <Route path="/top-talents" element={<TopTalentsPage />} />
          <Route path="/campaigns" element={<CampaignManagerPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/saved-lists" element={<SavedListsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Starter design system showcase (dev reference) */}
          <Route path="/ui-kit" element={<ComponentsShowcase />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
