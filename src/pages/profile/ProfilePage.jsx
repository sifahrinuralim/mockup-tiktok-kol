/**
 * Profile page — manage your user profile, agency info, notification
 * preferences, recent activity, and account settings.
 * Mock data lives in src/data/mockProfile.js.
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

/** List of recent account activity (mock). */
const RecentActivityCard = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
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
 * Main page of the Profile module.
 */
export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Manage your personal details, agency info, notification preferences, and account settings."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Left column: identity + agency */}
        <div className="space-y-4 lg:col-span-2">
          <ProfileSummaryCard profile={MOCK_PROFILE} />
          <AgencyCard agency={MOCK_PROFILE.agency} />
        </div>

        {/* Right column: form & preferences */}
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
