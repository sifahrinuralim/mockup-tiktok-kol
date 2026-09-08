# Educore UI Starter

Template polosan (blank starter) bertema **Educore UI** — Vite + React 18 + Tailwind CSS v3.
Berisi fondasi tema (warna, font, layout) dan seluruh komponen UI dasar yang siap dipakai untuk project baru.

## Isi Template

```
src/
├── components/
│   ├── ui/          # 13 komponen dasar: Button, Card, Input, Select, Textarea,
│   │                # Toggle, Badge, Table, Modal, ConfirmDialog, EmptyState,
│   │                # Skeleton, Spinner
│   └── common/      # AppLayout, Sidebar, Navbar, PageHeader
├── constants/       # Identitas aplikasi (nama, tagline) — sesuaikan di sini
├── pages/
│   ├── ComponentsShowcase.jsx        # Halaman pratinjau design system
│   └── components-demo/              # Sub-komponen demo per bagian
└── index.css        # Base & komponen global Tailwind (.input-base, animasi modal)
```

## Mulai Pakai

- Jalankan dev server lalu buka halaman utama: di sana seluruh komponen tampil sebagai
  referensi visual (tombol, badge, form, kartu, tabel, modal, empty state).
- Ganti identitas aplikasi di `src/constants/app.js`.
- Ganti menu sidebar di `src/components/common/Sidebar.jsx` (`NAV_GROUPS`).
- Tambah halaman baru di `src/App.jsx` lalu isi konten dengan kombinasi
  `PageHeader` + komponen `ui/*`.

## Konvensi Desain

- Warna: `primary` (Indigo/Navy) untuk aksi utama; `slate` netral;
  `emerald` sukses/aktif; `amber` warning; `rose` danger.
- Font: Inter. Radius: input/button `rounded-lg`, kartu `rounded-xl`, modal `rounded-2xl`.
- Pola halaman: loading (skeleton) → empty state → error; aksi via modal; konfirmasi hapus via `ConfirmDialog`.

## Dependency Opsional

Sesuai kebutuhan project, tambahkan: `react-hook-form` + `zod` (form & validasi),
`@tanstack/react-query` (server state), `axios` (HTTP + interceptor auth),
`react-hot-toast` (notifikasi). Kerangka komponen di template ini sudah siap
dipasangkan dengan library tersebut (tombol punya `isLoading`, form punya `error`/`hint`).
