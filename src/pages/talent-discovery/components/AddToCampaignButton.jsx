import { Check, Plus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

/**
 * Tombol aksi "Add to Campaign" (toggle mock).
 * State kepemilikan dipegang pemanggil; tombol hanya menampilkan kondisi.
 * Memiliki tinggi minimum 44px agar nyaman untuk touch target mobile.
 *
 * @param {boolean} isInCampaign Apakah kreator sudah masuk daftar campaign.
 * @param {() => void} onClick Callback saat tombol diklik.
 */
export const AddToCampaignButton = ({ isInCampaign, onClick, size = 'md', className }) => {
  if (isInCampaign) {
    return (
      <Button
        type="button"
        variant="success"
        size={size}
        onClick={onClick}
        aria-pressed="true"
        title="Klik untuk membatalkan penambahan"
        className={cn('min-h-11', className)}
      >
        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        Added
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="primary"
      size={size}
      onClick={onClick}
      aria-pressed="false"
      title="Tambahkan kreator ke daftar campaign"
      className={cn('min-h-11', className)}
    >
      <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
      Add to Campaign
    </Button>
  );
};
