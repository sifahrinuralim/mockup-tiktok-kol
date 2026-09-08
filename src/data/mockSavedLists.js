/**
 * Data dummy (mock) daftar kreator tersimpan untuk modul Saved Lists.
 * Daftar menyimpan `talentIds` lalu diselesaikan menjadi objek talent penuh
 * saat diekspor agar komponen tidak perlu melakukan lookup sendiri.
 * Estimasi total anggaran dihitung dari rate card kreator (util bersama).
 */

import { MOCK_TALENTS } from '@/data/mockTalents';
import { estimateRateCardTiers } from '@/utils/talentEstimate';

/** Cari objek talent lengkap dari pustaka kreator berdasarkan id. */
const findTalentById = (id) => MOCK_TALENTS.find((talent) => talent.id === id);

const RAW_SAVED_LISTS = [
  {
    id: 1,
    name: 'Beauty Macro Creator',
    category: 'Beauty',
    target: 'mega',
    description:
      'Kreator beauty dengan engagement rate di atas 9% — cocok untuk campaign skincare dan kosmetik premium.',
    tags: ['Skincare', 'ER ≥ 9%', 'Female'],
    talentIds: [1, 12, 6],
    createdAt: '2026-07-12',
    updatedAt: '2026-09-06',
  },
  {
    id: 2,
    name: 'Kuliner Nusantara',
    category: 'Food',
    target: 'mixed',
    description:
      'Food creator yang membahas kuliner tradisional dan modern dari berbagai kota di Indonesia.',
    tags: ['Kuliner', 'Lokal', 'Food Review'],
    talentIds: [4, 9, 14],
    createdAt: '2026-06-03',
    updatedAt: '2026-09-01',
  },
  {
    id: 3,
    name: 'Gaming Viral Squad',
    category: 'Gaming',
    target: 'mixed',
    description:
      'Kreator gaming dengan gaya konten menghibur dan engagement tinggi untuk campaign game & aksesori.',
    tags: ['Mobile Game', 'Live', 'Esports'],
    talentIds: [5, 11],
    createdAt: '2026-05-19',
    updatedAt: '2026-08-28',
  },
  {
    id: 4,
    name: 'Reviewer Tech & Gadget',
    category: 'Tech',
    target: 'macro',
    description:
      'Tech reviewer yang dipercaya untuk ulasan jujur smartphone, laptop, dan perangkat pintar.',
    tags: ['Review Jujur', 'Gadget', 'Mahasiswa'],
    talentIds: [2, 7],
    createdAt: '2026-05-02',
    updatedAt: '2026-08-20',
  },
  {
    id: 5,
    name: 'Fashion & Hijab Inspirasi',
    category: 'Fashion',
    target: 'mid',
    description:
      'Kreator fashion modest untuk campaign busana muslimah dan brand apparel perempuan.',
    tags: ['Modest Fashion', 'OOTD', 'Perempuan'],
    talentIds: [3, 8],
    createdAt: '2026-04-15',
    updatedAt: '2026-08-11',
  },
  {
    id: 6,
    name: 'Multi-Niche Top Talent',
    category: 'Multi-kategori',
    target: 'mega',
    description:
      'Kumpulan kreator terbaik lintas kategori untuk kebutuhan campaign cepat dengan jangkauan maksimal.',
    tags: ['Top Rated', 'Viral', 'Multi Brand'],
    talentIds: [1, 4, 5, 10, 11, 12],
    createdAt: '2026-03-28',
    updatedAt: '2026-09-08',
  },
];

/**
 * Daftar siap pakai: tiap daftar dilengkapi anggota talent penuh, jumlah
 * anggota, dan estimasi total budget minimum (rate card 1 video per kreator).
 */
export const MOCK_SAVED_LISTS = RAW_SAVED_LISTS.map((list) => {
  const members = list.talentIds.map(findTalentById).filter(Boolean);
  const estimatedBudget = members.reduce(
    (total, member) => total + estimateRateCardTiers(member)[0].min,
    0,
  );

  return {
    ...list,
    members,
    memberCount: members.length,
    estimatedBudget,
  };
});
