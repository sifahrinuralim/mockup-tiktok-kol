import { CheckCircle2, LayoutList, PlayCircle, Wallet } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { CAMPAIGN_STATUS } from '@/constants/campaigns';
import { cn } from '@/utils/cn';
import { formatRupiahShort } from '@/utils/currency';

/** Menghitung ringkasan pipeline dari daftar kampanye. */
const buildStats = (campaigns) => {
  const activeCount = campaigns.filter((campaign) => campaign.status === CAMPAIGN_STATUS.ACTIVE).length;
  const completedCount = campaigns.filter(
    (campaign) => campaign.status === CAMPAIGN_STATUS.COMPLETED,
  ).length;
  const totalBudget = campaigns.reduce(
    (sum, campaign) => sum + (campaign.budget > 0 ? campaign.budget : 0),
    0,
  );

  return [
    {
      key: 'total',
      label: 'Total Kampanye',
      value: `${campaigns.length}`,
      note: 'Termasuk draft & yang selesai',
      icon: LayoutList,
      iconClass: 'bg-primary-100 text-primary-700',
    },
    {
      key: 'budget',
      label: 'Total Anggaran',
      value: formatRupiahShort(totalBudget),
      note: 'Akumulasi budget yang sudah disetel',
      icon: Wallet,
      iconClass: 'bg-emerald-100 text-emerald-700',
    },
    {
      key: 'active',
      label: 'Sedang Berjalan',
      value: `${activeCount} kampanye`,
      note: 'Konten sedang diproduksi/tayang',
      icon: PlayCircle,
      iconClass: 'bg-sky-100 text-sky-600',
    },
    {
      key: 'completed',
      label: 'Selesai',
      value: `${completedCount} kampanye`,
      note: 'Laporan akhir sudah terkirim',
      icon: CheckCircle2,
      iconClass: 'bg-fuchsia-100 text-fuchsia-600',
    },
  ];
};

/**
 * Hero ringkasan statistik Campaign Manager.
 */
export const CampaignStats = ({ campaigns }) => {
  const stats = buildStats(campaigns);

  return (
    <section
      aria-label="Ringkasan statistik kampanye"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map(({ key, label, value, note, icon: Icon, iconClass }) => (
        <Card key={key}>
          <CardContent className="flex items-start gap-4 p-5">
            <span
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                iconClass,
              )}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-800">
                {value}
              </p>
              <p className="mt-1 truncate text-xs text-slate-400">{note}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
