import { BarChart3, Bookmark, LayoutDashboard, Megaphone, Users } from 'lucide-react';

/**
 * Daftar menu navigasi utama.
 * Dipakai bersama oleh Sidebar (NavLink) dan PagePlaceholder (judul rute).
 */
export const NAV_ITEMS = [
  {
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Ringkasan performa akun TikTok dan kampanye agensi dalam satu layar.',
    end: true,
  },
  {
    to: '/top-talents',
    label: 'Top Talents',
    icon: Users,
    description: 'Jelajahi, bandingkan, dan pilih kreator TikTok unggulan untuk kampanye.',
  },
  {
    to: '/campaigns',
    label: 'Campaign Manager',
    icon: Megaphone,
    description: 'Kelola alur kampanye dari brief hingga laporan akhir.',
  },
  {
    to: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Analisis tren konten, audiens, dan performa kampanye secara mendalam.',
  },
  {
    to: '/saved-lists',
    label: 'Saved Lists',
    icon: Bookmark,
    description: 'Kumpulan daftar kreator yang Anda simpan untuk kampanye mendatang.',
  },
];