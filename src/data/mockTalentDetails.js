/**
 * Extra creator-profile data for Quick View.
 *
 * Kept separate from MOCK_TALENTS so the core card/table data stays light.
 * Favorite audios are picked deterministically from a global audio library so
 * every creator gets a different but render-stable combination. Rate card
 * estimates & the 30-day views series are computed via src/utils/talentEstimate.js.
 */

import { MOCK_TALENTS } from '@/data/mockTalents';

/** Audio library commonly used by creators (mock). */
const AUDIO_LIBRARY = [
  { title: 'Never Want It to End (Acoustic Version)', creator: '@suara.akustik' },
  { title: 'Viral Kitten Sounds', creator: '@cutecat.official' },
  { title: 'Pantura Dance Remix', creator: '@dj.pantura' },
  { title: 'Cover Song: Ending in Your Arms', creator: '@nadacover.id' },
  { title: 'Original Sound: Just Chill', creator: '@santuy.creator' },
  { title: 'Koplo Dangdut (Editor Pick)', creator: '@koplo.viral' },
  { title: 'Glow Up Challenge Beat', creator: '@beautybeat.id' },
  { title: 'Sunset by the Shore (Piano)', creator: '@pianomood' },
  { title: 'Gaming Beat: Boss Fight', creator: '@gamebeat.id' },
  { title: 'Honest Review Mode On', creator: '@honesttalk.id' },
  { title: 'Maskulin Vibes (Hip Hop)', creator: '@hiphopindo' },
  { title: 'Great Food, No Thinking Needed', creator: '@foodiesound.id' },
  { title: 'Chasing Deadlines (Comedy Sound)', creator: '@officecomedy' },
  { title: 'Aesthetic Lo-fi for Content', creator: '@lofibeats.id' },
  { title: 'Spill the Tea Official', creator: '@spilltea.id' },
  { title: 'Anime Opening Remix', creator: '@otakuremix' },
  { title: 'Chill Bali Vibes', creator: '@balisound' },
  { title: 'TikTok Dance 2024', creator: '@tiktoktrend.id' },
];

/** Number of favorite audios kept per creator. */
const FAVORITE_AUDIO_COUNT = 3;

/** Picks a creator's favorite audios deterministically without duplicates. */
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
 * Per-creator Quick View details, including frequently used favorite audios.
 * The 30-day views series & rate card estimates are derived from each
 * creator's core metrics through utils so numeric data isn't duplicated.
 */
export const MOCK_TALENT_DETAILS = MOCK_TALENTS.map((talent) => ({
  talentId: talent.id,
  favoriteAudios: buildFavoriteAudios(talent),
}));
