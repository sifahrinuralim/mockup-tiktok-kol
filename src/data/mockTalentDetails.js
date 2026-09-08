/**
 * Data pelengkap profil kreator untuk Quick View.
 *
 * Dipisah dari MOCK_TALENTS agar data inti kartu/tabel tetap ringan.
 * Audio favorit dipilih deterministik dari pustaka audio global sehingga tiap
 * kreator mendapat kombinasi berbeda namun stabil antar render. Estimasi rate
 * card & deret views 30 hari dihitung via src/utils/talentEstimate.js.
 */

import { MOCK_TALENTS } from '@/data/mockTalents';

/** Pustaka audio yang umum dipakai kreator (mock). */
const AUDIO_LIBRARY = [
  { title: 'Tak Ingin Usai (Versi Akustik)', creator: '@suara.akustik' },
  { title: 'Suara Viral Anak Kucing', creator: '@cutecat.official' },
  { title: 'Remix Joget Pantura', creator: '@dj.pantura' },
  { title: 'Lagu Cover: Berakhir di Pelukanmu', creator: '@nadacover.id' },
  { title: 'Original Sound: Santuy Saja', creator: '@santuy.creator' },
  { title: 'Dangdut Koplo Pilihan Editor', creator: '@koplo.viral' },
  { title: 'Glow Up Challenge Beat', creator: '@beautybeat.id' },
  { title: 'Senja di Pesisir (Piano)', creator: '@pianomood' },
  { title: 'Beat GAMING: Boss Fight', creator: '@gamebeat.id' },
  { title: 'Review Jujur Mode On', creator: '@honesttalk.id' },
  { title: 'Maskulin Vibes (Hip Hop)', creator: '@hiphopindo' },
  { title: 'Makan Enak Ga Pake Mikir', creator: '@foodiesound.id' },
  { title: 'Kejar Deadline (Comedy Sound)', creator: '@officecomedy' },
  { title: 'Aesthetic Lo-fi untuk Konten', creator: '@lofibeats.id' },
  { title: 'Spill the Tea Official', creator: '@spilltea.id' },
  { title: 'Anime Opening Remix', creator: '@otakuremix' },
  { title: 'Nuansa Bali Santai', creator: '@balisound' },
  { title: 'Joget TikTok 2024', creator: '@tiktoktrend.id' },
];

/** Jumlah audio favorit yang disimpan per kreator. */
const FAVORITE_AUDIO_COUNT = 3;

/** Memilih audio favorit kreator secara deterministik tanpa duplikat. */
const buildFavoriteAudios = (talent) => {
  const selected = [];
  const usedIndices = new Set();
  let cursor = (talent.id * 5) % AUDIO_LIBRARY.length;

  while (selected.length < FAVORITE_AUDIO_COUNT) {
    if (!usedIndices.has(cursor)) {
      usedIndices.add(cursor);
      selected.push({
        ...AUDIO_LIBRARY[cursor],
        usageCount: 4 + ((talent.id * 3 + selected.length) % 10),
      });
    }
    cursor = (cursor + 1) % AUDIO_LIBRARY.length;
  }

  return selected;
};

/**
 * Detail Quick View per kreator, berisi audio favorit yang sering dipakai.
 * Deret views 30 hari & estimasi rate card dihitung dari metrik inti kreator
 * lewat util agar tidak menduplikasi data numerik.
 */
export const MOCK_TALENT_DETAILS = MOCK_TALENTS.map((talent) => ({
  talentId: talent.id,
  favoriteAudios: buildFavoriteAudios(talent),
}));
