/**
 * Halaman Profile — kelola profil pengguna, info agensi, preferensi
 * notifikasi, aktivitas terakhir, dan pengaturan akun.
 * Data dummy di src/data/mockProfile.js.
 */

import { Clock3 } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MOCK_PROFILE, RECENT_ACTIVITY } from '@/data/mockProfile';

import { AgencyCard } from './components/AgencyCard';
import { DangerZone } from './components/DangerZone';
import { NotificationSettings } from './components/NotificationSettings';
import { ProfileForm } from './components/ProfileForm';
import { ProfileSummaryCard } from './components/ProfileSummaryCard';

/** Daftar aktivitas terakhir akun (mock). */
const RecentActivityCard = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle>Aktivitas Terakhir</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ul role="list" className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center gap-3 px-5 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <Clock3 className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </span>
            <p className="min-w-0 flex-1 truncate text-sm text-slate-700">{activity.label}</p>
            <span className="shrink-0 text-xs text-slate-400">{activity.time}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

/**
 * Halaman utama modul Profile.
 */
export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Kelola data diri, informasi agensi, preferensi notifikasi, dan pengaturan akun Anda."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Kolom kiri: identitas + agensi */}
        <div className="space-y-4 lg:col-span-2">
          <ProfileSummaryCard profile={MOCK_PROFILE} />
          <AgencyCard agency={MOCK_PROFILE.agency} />
        </div>

        {/* Kolom kanan: form & preferensi */}
        <div className="space-y-4 lg:col-span-3">
          <ProfileForm profile={MOCK_PROFILE} />
          <NotificationSettings />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentActivityCard activities={RECENT_ACTIVITY} />
        <DangerZone />
      </div>
    </div>
  );
}
