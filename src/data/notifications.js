/**
 * Notifikasi mock untuk menu lonceng di Navbar.
 * `type` dipetakan ke ikon & warna di komponen NotificationsMenu.
 * Struktur field meniru kontrak API notifikasi (id, judul, isi, waktu, status baca).
 */
export const NOTIFICATIONS = [
  {
    id: 1,
    type: 'campaign',
    title: 'Kampanye “Glow Up x @rara.may” disetujui',
    body: 'Penayangan konten kreator dimulai Senin pukul 09.00 WIB.',
    time: '12 menit lalu',
    unread: true,
  },
  {
    id: 2,
    type: 'metric',
    title: 'Metrik @devina.erlita naik',
    body: 'Engagement rate naik 24% dibanding minggu lalu.',
    time: '1 jam lalu',
    unread: true,
  },
  {
    id: 3,
    type: 'list',
    title: 'Daftar “Beauty Micro-Influencer” diunduh',
    body: 'Daftar diunduh oleh rekan tim campaign Anda.',
    time: '3 jam lalu',
    unread: false,
  },
  {
    id: 4,
    type: 'system',
    title: 'Kuota pencarian mingguan hampir habis',
    body: 'Sisa 18 dari 25 pencarian untuk minggu ini.',
    time: 'Kemarin',
    unread: false,
  },
];