import { BarChart3, Bookmark, Home, LayoutDashboard, Megaphone, UserRound, Users } from 'lucide-react';

/**
 * Daftar menu navigasi utama.
 * Dipakai bersama oleh Sidebar (NavLink) dan komponen lain untuk label rute.
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
  {
    to: '/profile',
    label: 'Profile',
    icon: UserRound,
    description: 'Kelola profil pengguna, preferensi akun, dan pengaturan lainnya.',
  },
];

/**
 * Item bottom navigation untuk layar mobile (di bawah lg).
 * Subset navigasi utama dengan label ringkas ala aplikasi native.
 */
export const BOTTOM_NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/top-talents', label: 'Talents', icon: Users },
  { to: '/saved-lists', label: 'Saved', icon: Bookmark },
  { to: '/profile', label: 'Profile', icon: UserRound },
];