import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { CAMPAIGN_CATEGORIES } from '@/constants/campaigns';

/** Nilai awal form (selalu bersih saat modal dibuka). */
const EMPTY_FORM = {
  name: '',
  brand: '',
  category: CAMPAIGN_CATEGORIES[0],
  budget: '',
  startDate: '',
  endDate: '',
  goal: '',
};

/** Durasi simulasi proses simpan agar tombol isLoading sempat terlihat. */
const SUBMIT_DELAY_MS = 700;

/**
 * Modal pembuatan kampanye baru (mockup): mengumpulkan data inti lalu
 * meneruskannya via `onCreate`. Hasilnya langsung tampil di tabel sebagai
 * kampanye status draft.
 */
export const CreateCampaignModal = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form setiap modal dibuka agar data lama tidak menumpuk.
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [open]);

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Nama kampanye wajib diisi.';
    if (!form.brand.trim()) nextErrors.brand = 'Nama brand wajib diisi.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      onCreate({
        ...form,
        budget: Number(form.budget) > 0 ? Number(form.budget) : 0,
        goal: form.goal.trim() || 'Belum ada deskripsi — lengkapi brief sebelum mengirim ke talenta.',
      });
      setIsSubmitting(false);
      onClose();
    }, SUBMIT_DELAY_MS);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Buat Kampanye Baru"
      description="Kampanye baru dibuat dengan status Draft dan dapat dilengkapi belakangan."
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" form="form-buat-kampanye" isLoading={isSubmitting} loadingText="Menyimpan...">
            Buat Kampanye
          </Button>
        </>
      }
    >
      <form id="form-buat-kampanye" onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Nama Kampanye"
            placeholder="cth. Glow Up Challenge"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            error={errors.name}
          />
          <Input
            label="Brand / Klien"
            placeholder="cth. GlowSkin ID"
            value={form.brand}
            onChange={(event) => updateField('brand', event.target.value)}
            error={errors.brand}
          />
          <Select
            label="Kategori Brand"
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            {CAMPAIGN_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Input
            label="Budget (Rp)"
            type="number"
            min="0"
            step="1000000"
            placeholder="cth. 150000000"
            value={form.budget}
            onChange={(event) => updateField('budget', event.target.value)}
            hint="Kosongkan bila budget belum disetujui."
          />
          <Input
            label="Tanggal Mulai"
            type="date"
            value={form.startDate}
            onChange={(event) => updateField('startDate', event.target.value)}
          />
          <Input
            label="Tanggal Selesai"
            type="date"
            value={form.endDate}
            onChange={(event) => updateField('endDate', event.target.value)}
          />
        </div>
        <Textarea
          label="Deskripsi / Tujuan Singkat"
          rows={3}
          placeholder="Ceritakan tujuan kampanye secara singkat…"
          value={form.goal}
          onChange={(event) => updateField('goal', event.target.value)}
        />
      </form>
    </Modal>
  );
};
