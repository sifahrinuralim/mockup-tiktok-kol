import { Search } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Toggle } from '@/components/ui/Toggle';

export const DemoForms = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [notify, setNotify] = useState(false);

  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
      <div className="space-y-5">
        <Input label="Nama Lengkap" placeholder="cth: Budi Santoso" />
        <Input
          label="Email"
          type="email"
          defaultValue="budi@contoh.id"
          hint="Email tidak akan dipublikasikan."
        />
        <Input
          label="Nomor Induk"
          defaultValue="1234"
          error="Nomor induk harus 10 digit."
        />
        <Input
          label="Cari data"
          placeholder="Ketik kata kunci..."
          rightElement={<Search className="h-4 w-4 text-slate-400" aria-hidden="true" />}
        />
      </div>

      <div className="space-y-5">
        <Select label="Status Keaktifan" defaultValue="">
          <option value="" disabled>
            Pilih status...
          </option>
          <option value="aktif">Aktif</option>
          <option value="pending">Pending</option>
          <option value="nonaktif">Nonaktif</option>
        </Select>
        <Textarea label="Catatan" rows={3} placeholder="Tuliskan catatan tambahan di sini..." />
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-700">Simpan otomatis</p>
              <p className="text-xs text-slate-500">Menyimpan perubahan secara berkala.</p>
            </div>
            <Toggle checked={autoSave} onChange={setAutoSave} aria-label="Simpan otomatis" />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
            <div>
              <p className="text-sm font-medium text-slate-700">Notifikasi email</p>
              <p className="text-xs text-slate-500">Kirim pemberitahuan ke email Anda.</p>
            </div>
            <Toggle checked={notify} onChange={setNotify} aria-label="Notifikasi email" />
          </div>
        </div>
      </div>
    </div>
  );
};
