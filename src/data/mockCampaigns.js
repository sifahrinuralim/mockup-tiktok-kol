/**
 * Data dummy (mock) kampanye untuk modul Campaign Manager.
 *
 * Nilai tanggal memakai format 'YYYY-MM-DD' agar siap dimigrasikan ke API
 * sungguhan; tampilan diformat lewat src/utils/date.js. Anggaran disimpan
 * sebagai number mentah (Rupiah) dan diformat lewat src/utils/currency.js.
 * Kategori brand memakai konstanta CAMPAIGN_CATEGORIES agar opsinya terpusat.
 */

import { MOCK_TALENTS } from '@/data/mockTalents';

/** Manajer bawaan seluruh kampanye mock (mockup — belum ada auth sungguhan). */
const DEFAULT_MANAGER = { name: 'Sarah Rahmawati', initials: 'SR' };

/** Cari objek talent lengkap dari pustaka kreator berdasarkan id. */
const findTalentById = (id) => MOCK_TALENTS.find((talent) => talent.id === id);

/** Merangkai ringkasan deliverable, mis. '6 video + 1 live'. */
const buildDeliverableLabel = ({ videos = 0, lives = 0, stories = 0 }) => {
  const parts = [];
  if (videos > 0) parts.push(`${videos} video`);
  if (lives > 0) parts.push(`${lives} live`);
  if (stories > 0) parts.push(`${stories} story`);
  return parts.join(' + ');
};

const RAW_CAMPAIGNS = [
  {
    id: 1,
    name: 'Glow Up Challenge',
    brand: 'GlowSkin ID',
    category: 'Skincare & Beauty',
    status: 'active',
    budget: 385_000_000,
    talentIds: [1, 12, 6],
    deliverables: { videos: 9, lives: 1, stories: 0 },
    progress: 45,
    startDate: '2026-08-14',
    endDate: '2026-09-30',
    kpi: 'ER ≥ 6% & 12M total views',
    goal: 'Meningkatkan brand awareness serum terbaru GlowSkin ID lewat kreator beauty dengan jangkauan luas.',
  },
  {
    id: 2,
    name: 'Kuliner Legendaris Nusantara',
    brand: 'Dapur Nusantara',
    category: 'Food & Beverage',
    status: 'active',
    budget: 220_000_000,
    talentIds: [4, 9, 14],
    deliverables: { videos: 8, lives: 0, stories: 4 },
    progress: 62,
    startDate: '2026-08-20',
    endDate: '2026-10-05',
    kpi: 'Min. 1,5M views per video & CTR toko 3%',
    goal: 'Mendorong trafik ke gerai & penjualan menu musiman melalui ulasan kuliner autentik.',
  },
  {
    id: 3,
    name: 'Next Gen Gaming Gear',
    brand: 'PlayMax Store',
    category: 'Gaming',
    status: 'active',
    budget: 310_000_000,
    talentIds: [5, 11],
    deliverables: { videos: 6, lives: 2, stories: 0 },
    progress: 28,
    startDate: '2026-08-28',
    endDate: '2026-10-15',
    kpi: '12M impressions & 30K klik link toko',
    goal: 'Meluncurkan lini aksesori gaming baru dengan demo gameplay kreator top gaming.',
  },
  {
    id: 4,
    name: 'Smartphone Midrange 2026',
    brand: 'TeknoCell',
    category: 'Teknologi',
    status: 'awaiting',
    budget: 175_000_000,
    talentIds: [2, 7],
    deliverables: { videos: 5, lives: 1, stories: 0 },
    progress: 10,
    startDate: '2026-09-12',
    endDate: '2026-10-12',
    kpi: 'ER ≥ 5% & review jujur tanpa script berlebih',
    goal: 'Membangun persepsi HP midrange terbaik 2026 untuk audiens mahasiswa & pekerja muda.',
  },
  {
    id: 5,
    name: 'Fashion Hijab Modern',
    brand: 'Aksara Modest',
    category: 'Fashion',
    status: 'review',
    budget: 145_000_000,
    talentIds: [3, 8],
    deliverables: { videos: 6, lives: 0, stories: 6 },
    progress: 80,
    startDate: '2026-07-20',
    endDate: '2026-09-18',
    kpi: 'ER ≥ 7% & 8M views gabungan',
    goal: 'Memperkenalkan koleksi hijab premium dengan padu padan gaya harian.',
  },
  {
    id: 6,
    name: 'Snack Time Challenge',
    brand: 'Krezz Snack',
    category: 'Food & Beverage',
    status: 'review',
    budget: 98_000_000,
    talentIds: [4, 14],
    deliverables: { videos: 4, lives: 0, stories: 2 },
    progress: 75,
    startDate: '2026-08-01',
    endDate: '2026-09-15',
    kpi: '6M views & 4K komentar challenge',
    goal: 'Mengajak audiens ikut membuat video reaksi rasa snack Krezz.',
  },
  {
    id: 7,
    name: 'Beauty Basics Tutorial',
    brand: 'GlowSkin ID',
    category: 'Skincare & Beauty',
    status: 'completed',
    budget: 210_000_000,
    talentIds: [1, 6],
    deliverables: { videos: 8, lives: 0, stories: 0 },
    progress: 100,
    startDate: '2026-05-10',
    endDate: '2026-07-15',
    kpi: '10M views & ER rata-rata 8%',
    goal: 'Edukasi rutinitas skincare dasar untuk calon pengguna baru.',
  },
  {
    id: 8,
    name: 'Standup Comedy Mini Series',
    brand: 'Kopi Senja',
    category: 'Entertainment',
    status: 'completed',
    budget: 165_000_000,
    talentIds: [10, 13],
    deliverables: { videos: 6, lives: 0, stories: 6 },
    progress: 100,
    startDate: '2026-06-01',
    endDate: '2026-08-01',
    kpi: '8M views & 60K mention brand',
    goal: 'Mengangkat suasana brand lewat konten humor anak muda di kafe.',
  },
  {
    id: 9,
    name: 'Food Vlogger Gathering',
    brand: 'GoRasa',
    category: 'Food & Beverage',
    status: 'completed',
    budget: 120_000_000,
    talentIds: [9, 14],
    deliverables: { videos: 5, lives: 1, stories: 8 },
    progress: 100,
    startDate: '2026-06-20',
    endDate: '2026-08-20',
    kpi: '5M views & 25K unduhan kupon',
    goal: 'Merayakan ulang tahun aplikasi GoRasa dengan konten kolaborasi kreator kuliner.',
  },
  {
    id: 10,
    name: 'Lip Tint Sensation',
    brand: 'GlowSkin ID',
    category: 'Skincare & Beauty',
    status: 'awaiting',
    budget: 88_000_000,
    talentIds: [12],
    deliverables: { videos: 3, lives: 0, stories: 3 },
    progress: 15,
    startDate: '2026-09-15',
    endDate: '2026-10-10',
    kpi: 'ER ≥ 8% & 3M views',
    goal: 'Launching lip tint baru dengan demo warna di berbagai tone kulit.',
  },
  {
    id: 11,
    name: 'Back to Campus Gadget Fair',
    brand: 'EduMart',
    category: 'Teknologi',
    status: 'draft',
    budget: 0,
    talentIds: [2, 7],
    deliverables: { videos: 4, lives: 0, stories: 0 },
    progress: 0,
    startDate: null,
    endDate: null,
    kpi: 'Belum disusun',
    goal: 'Paket hemat gadget untuk mahasiswa — menunggu finalisasi budget & jadwal.',
  },
];

/**
 * Kampanye siap pakai: menyisipkan kode unik, label deliverable ringkas,
 * manajer, dan menyelesaikan `talentIds` menjadi array objek talent penuh
 * agar komponen halaman tinggal merender tanpa perlu lookup ulang.
 */
export const MOCK_CAMPAIGNS = RAW_CAMPAIGNS.map((campaign) => ({
  ...campaign,
  code: `CMP-${String(campaign.id).padStart(3, '0')}`,
  manager: DEFAULT_MANAGER,
  deliverableLabel: buildDeliverableLabel(campaign.deliverables),
  talents: campaign.talentIds.map(findTalentById).filter(Boolean),
}));

