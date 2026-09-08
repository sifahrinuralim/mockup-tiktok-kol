import { Plus, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const Group = ({ title, children }) => (
  <div>
    <p className="mb-3 text-sm font-semibold text-slate-700">{title}</p>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

export const DemoButtons = () => (
  <div className="space-y-6">
    <Group title="Varian tombol">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </Group>

    <Group title="Ukuran & status">
      <Button size="sm">Kecil</Button>
      <Button size="md">Sedang</Button>
      <Button size="lg">Besar</Button>
      <Button isLoading loadingText="Memproses...">
        Simpan
      </Button>
      <Button variant="outline" disabled>
        Nonaktif
      </Button>
    </Group>

    <Group title="Dengan ikon">
      <Button>
        <Plus className="h-4 w-4" aria-hidden="true" />
        Tambah Baru
      </Button>
      <Button variant="outline">
        <Trash2 className="h-4 w-4 text-rose-600" aria-hidden="true" />
        Hapus
      </Button>
    </Group>

    <Group title="Badge status">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Aktif</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Nonaktif</Badge>
      <Badge variant="outline">Outline</Badge>
    </Group>
  </div>
);
