import { useState } from 'react';
import { LogOut, ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

/**
 * Zona bahaya akun: keluar dari akun (mockup).
 * Aksi tidak benar-benar menghapus sesi — frontend ini belum punya auth.
 */
export const DangerZone = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    setConfirmOpen(false);
    setMessage('Keluar dari akun tidak aktif pada mockup — sesi demo tetap berjalan.');
    window.setTimeout(() => setMessage(''), 5000);
  };

  return (
    <Card className="border-rose-200">
      <CardHeader>
        <CardTitle>Zona Berbahaya</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl bg-rose-50 px-4 py-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-rose-700">
            Aksi keluar hanya simulasi pada mockup ini. Halaman tidak membutuhkan sesi
            autentikasi sungguhan.
          </p>
        </div>

        {message && (
          <p role="status" className="text-sm font-medium text-rose-600">
            {message}
          </p>
        )}

        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Keluar dari Akun
        </Button>

        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleLogout}
          title="Keluar dari Akun"
          description="Yakin ingin keluar? Pada mockup ini Anda akan tetap berada di aplikasi karena belum ada autentikasi sungguhan."
          confirmText="Keluar"
        />
      </CardContent>
    </Card>
  );
};
