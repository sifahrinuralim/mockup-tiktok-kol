import { Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table';

const STATUS_STYLES = {
  Aktif: 'success',
  Pending: 'warning',
  Lulus: 'primary',
  Keluar: 'secondary',
};

const ROWS = [
  { nama: 'Budi Santoso', nis: '2025001', status: 'Aktif' },
  { nama: 'Siti Rahmawati', nis: '2025002', status: 'Pending' },
  { nama: 'Andi Wijaya', nis: '2025003', status: 'Lulus' },
  { nama: 'Dewi Lestari', nis: '2025004', status: 'Keluar' },
];

export const DemoTable = () => (
  <Table>
    <THead>
      <Tr>
        <Th>Nama</Th>
        <Th>Nomor Induk</Th>
        <Th>Status</Th>
        <Th className="text-right">Aksi</Th>
      </Tr>
    </THead>
    <TBody>
      {ROWS.map((row) => (
        <Tr key={row.nis}>
          <Td className="font-medium text-slate-800">{row.nama}</Td>
          <Td>{row.nis}</Td>
          <Td>
            <Badge variant={STATUS_STYLES[row.status]}>{row.status}</Badge>
          </Td>
          <Td className="text-right">
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary-600"
                aria-label={`Edit ${row.nama}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                aria-label={`Hapus ${row.nama}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Td>
        </Tr>
      ))}
    </TBody>
  </Table>
);
