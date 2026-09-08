/**
 * Konstanta domain Campaign Manager:
 * daftar status, filter, opsi kategori brand, dan tahap alur kampanye.
 * Status dipetakan ke varian <Badge> agar warna label seragam di seluruh halaman.
 */

/** Nilai-nilai status kampanye (pipeline). */
export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  AWAITING: 'awaiting',
  ACTIVE: 'active',
  REVIEW: 'review',
  COMPLETED: 'completed',
};

/** Metadata tiap status: label Bahasa Indonesia + varian warna Badge. */
export const CAMPAIGN_STATUS_META = {
  [CAMPAIGN_STATUS.DRAFT]: { label: 'Draft', variant: 'outline' },
  [CAMPAIGN_STATUS.AWAITING]: { label: 'Menunggu Talenta', variant: 'warning' },
  [CAMPAIGN_STATUS.ACTIVE]: { label: 'Berjalan', variant: 'success' },
  [CAMPAIGN_STATUS.REVIEW]: { label: 'Review Konten', variant: 'primary' },
  [CAMPAIGN_STATUS.COMPLETED]: { label: 'Selesai', variant: 'secondary' },
};

/** Urutan status pada filter & penghitungan ringkasan (bukan abjad). */
export const CAMPAIGN_STATUS_ORDER = [
  CAMPAIGN_STATUS.DRAFT,
  CAMPAIGN_STATUS.AWAITING,
  CAMPAIGN_STATUS.ACTIVE,
  CAMPAIGN_STATUS.REVIEW,
  CAMPAIGN_STATUS.COMPLETED,
];

/** Opsi filter status (tab) pada halaman: 'all' + seluruh status terurut. */
export const CAMPAIGN_STATUS_FILTERS = [
  { value: 'all', label: 'Semua' },
  ...CAMPAIGN_STATUS_ORDER.map((value) => ({
    value,
    label: CAMPAIGN_STATUS_META[value].label,
  })),
];

/** Kategori industri brand untuk kampanye (opsi form & label tabel). */
export const CAMPAIGN_CATEGORIES = [
  'Skincare & Beauty',
  'Fashion',
  'Food & Beverage',
  'Gaming',
  'Teknologi',
  'Entertainment',
  'Travel',
  'Keuangan',
];

/**
 * Tahapan alur kerja kampanye (timeline di modal detail).
 * `threshold` menunjukkan progress minimum agar tahap dianggap selesai.
 */
export const CAMPAIGN_TIMELINE_STEPS = [
  { key: 'brief', label: 'Brief Disusun', hint: 'Konsep, deliverable, dan rate disepakati.', threshold: 10 },
  { key: 'talent', label: 'Talenta Terkonfirmasi', hint: 'Kreator setuju dan kontrak ditandatangani.', threshold: 35 },
  { key: 'content', label: 'Produksi Konten', hint: 'Kreator mengirim draf konten sesuai brief.', threshold: 65 },
  { key: 'approval', label: 'Review & Revisi', hint: 'Konten disetujui brand sebelum tayang.', threshold: 85 },
  { key: 'report', label: 'Tayang & Laporan', hint: 'Konten live lalu laporan performa dikirim.', threshold: 100 },
];
