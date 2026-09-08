import { ClipboardList, GraduationCap, TrendingUp, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';

const STATS = [
  { label: 'Total Pengguna', value: '1.248', icon: Users, iconClass: 'bg-indigo-100 text-indigo-600' },
  { label: 'Registrasi Baru', value: '97', icon: ClipboardList, iconClass: 'bg-emerald-100 text-emerald-600' },
  { label: 'Pengguna Aktif', value: '64', icon: GraduationCap, iconClass: 'bg-amber-100 text-amber-700' },
  { label: 'Tingkat Kepuasan', value: '98%', icon: TrendingUp, iconClass: 'bg-rose-100 text-rose-600' },
];

export const DemoCards = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {STATS.map((stat) => (
      <Card key={stat.label}>
        <CardContent className="flex items-center gap-4 p-5">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${stat.iconClass}`}
          >
            <stat.icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
