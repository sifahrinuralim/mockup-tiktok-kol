import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { TALENT_CATEGORY_LIST } from '@/data/mockTalents';
import { LIST_TARGET_OPTIONS } from '@/constants/savedLists';

/** Nilai awal form saat modal dibuka. */
const EMPTY_FORM = {
  name: '',
  category: TALENT_CATEGORY_LIST[0],
  target: LIST_TARGET_OPTIONS[0].value,
  description: '',
};

/** Durasi simulasi proses simpan. */
const SUBMIT_DELAY_MS = 600;

/**
 * Modal pembuatan daftar kreator baru (mockup).
 * Daftar baru dibuat kosong — member ditambahkan dari Talent Discovery nanti.
 */
export const CreateListModal = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bersihkan form setiap modal dibuka.
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [open]);

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setErrors({ name: 'Nama daftar wajib diisi.' });
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      onCreate({
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
      });
      setIsSubmitting(false);
      onClose();
    }, SUBMIT_DELAY_MS);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Buat Daftar Baru"
      description="Kumpulan kreator untuk kebutuhan shortlist kampanye yang dapat diisi belakangan."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button
            type="submit"
            form="form-buat-daftar"
            isLoading={isSubmitting}
            loadingText="Menyimpan..."
          >
            Simpan Daftar
          </Button>
        </>
      }
    >
      <form id="form-buat-daftar" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Nama Daftar"
          placeholder="cth. Beauty Micro-Influencer"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          error={errors.name}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Kategori Fokus"
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            {TALENT_CATEGORY_LIST.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="Multi-kategori">Multi-kategori</option>
          </Select>
          <Select
            label="Target Ukuran Kreator"
            value={form.target}
            onChange={(event) => updateField('target', event.target.value)}
          >
            {LIST_TARGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <Textarea
          label="Deskripsi (opsional)"
          rows={3}
          placeholder="Jelaskan kriteria kreator yang ingin Anda kumpulkan…"
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
        />
      </form>
    </Modal>
  );
};
