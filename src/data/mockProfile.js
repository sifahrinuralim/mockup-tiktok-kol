/**
 * Data dummy profil pengguna & preferensi untuk modul Profile.
 * Identitas inti (nama, email, inisial) disinkronkan dengan CURRENT_USER di
 * constants/app.js agar Navbar dan halaman Profile selalu menampilkan sama.
 */

import { CURRENT_USER } from '@/constants/app';

/** Preferensi notifikasi aplikasi (mock) dengan urutan tetap untuk di-render. */
export const NOTIFICATION_PREFERENCES = {
  campaignUpdates: {
    label: 'Pembaruan Kampanye',
    description: 'Status brief, konten, dan laporan kampanye yang Anda kelola.',
    enabled: true,
  },
  newTalentMatches: {
    label: 'Kreator Baru yang Cocok',
    description: 'Rekomendasi kreator baru sesuai daftar & kategori yang Anda ikuti.',
    enabled: true,
  },
  weeklyReport: {
    label: 'Ringkasan Mingguan',
    description: 'Ringkasan performa kampanye dan kreator setiap hari Senin pagi.',
    enabled: false,
  },
  productNews: {
    label: 'Info Fitur Terbaru',
    description: 'Pengumuman fitur baru TalentPulse dan tips singkat penggunaannya.',
    enabled: false,
  },
};

/** Pengaturan akun lain (bahasa, zona waktu) yang belum berbentuk toggle. */
export const PROFILE_SETTINGS = {
  language: 'Bahasa Indonesia',
  timezone: 'Asia/Jakarta (WIB)',
  weeklyDigest: NOTIFICATION_PREFERENCES.weeklyReport.enabled,
};

/**
 * Profil lengkap halaman Profile. Field `agency`, `stats`, dan `joinedAt`
 * adalah tambahan mock di luar identitas inti yang dipakai Navbar.
 */
export const MOCK_PROFILE = {
  ...CURRENT_USER,
  phone: '+62 812-3456-7890',
  avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=sarah.talentpulse&backgroundColor=d1d4f9',
  joinedAt: '2026-01-12',
  bio: 'Agency Manager yang bertanggung jawab atas eksekusi campaign TikTok dari brief hingga laporan performa.',
  agency: {
    name: 'PT TalentPulse Media',
    legalName: 'PT Talentpulse Media Nusantara',
    address: 'Gedung Creatif Hub Lt. 8, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan',
    verified: true,
    teamSize: '12 orang',
  },
  stats: {
    campaignsManaged: 14,
    activeCampaigns: 3,
    totalSpend: 1_680_000_000,
    averageEngagement: '8.4%',
  },
};

/** Riwayat aktivitas akun terakhir (mock). */
export const RECENT_ACTIVITY = [
  { id: 1, label: 'Membuat kampanye “Lip Tint Sensation”', time: '2 hari lalu' },
  { id: 2, label: 'Menyetujui konten @citraayu untuk “Kuliner Legendaris Nusantara”', time: '4 hari lalu' },
  { id: 3, label: 'Mengunduh daftar “Beauty Macro Creator”', time: '1 minggu lalu' },
  { id: 4, label: 'Memperbarui profil agensi', time: '2 minggu lalu' },
];
