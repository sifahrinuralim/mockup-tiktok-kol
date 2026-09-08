import { BadgeCheck, Building2, MapPin, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

/** Kartu informasi agensi pengguna aktif (mock). */
export const AgencyCard = ({ agency }) => (
  <Card>
    <CardHeader className="flex flex-row items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
        <Building2 className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <CardTitle>{agency.name}</CardTitle>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-emerald-600">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Agen terverifikasi
        </p>
      </div>
    </CardHeader>
    <CardContent>
      <dl className="space-y-3 text-sm">
        <div className="flex gap-3">
          <dt className="w-24 shrink-0 text-slate-400">Legal</dt>
          <dd className="font-medium text-slate-700">{agency.legalName}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="flex w-24 shrink-0 items-start gap-1.5 text-slate-400">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Alamat
          </dt>
          <dd className="leading-relaxed text-slate-700">{agency.address}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="flex w-24 shrink-0 items-center gap-1.5 text-slate-400">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Tim
          </dt>
          <dd className="font-medium text-slate-700">{agency.teamSize}</dd>
        </div>
      </dl>
    </CardContent>
  </Card>
);
