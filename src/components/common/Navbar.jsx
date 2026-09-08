import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Music2, Search, X } from 'lucide-react';

import { NotificationsMenu } from '@/components/common/NotificationsMenu';
import { ProfileMenu } from '@/components/common/ProfileMenu';
import { Input } from '@/components/ui/Input';
import { APP } from '@/constants/app';
import { cn } from '@/utils/cn';

/** Class penimpa warna untuk Input agar cocok dengan tema dark header. */
const searchInputClasses = cn(
  'border-white/10 bg-white/5 py-2 text-slate-100 placeholder:text-slate-500',
  'hover:border-white/20',
  'focus:border-cyan-400/70 focus:bg-white/[0.07] focus:ring-cyan-400/25',
);

/** Brand aplikasi: logo mark + nama & tagline. */
const Brand = () => (
  <Link
    to="/"
    aria-label={`${APP.brand} — beranda`}
    className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
  >
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20">
      <Music2 className="h-5 w-5 text-white" aria-hidden="true" />
    </span>
    <span className="min-w-0 leading-tight">
      <span className="block truncate text-sm font-bold text-white">{APP.name}</span>
      <span className="block truncate text-[11px] text-slate-400">{APP.tagline}</span>
    </span>
  </Link>
);

/** Field pencarian global (mockup) dengan ikon cari di kiri. */
const SearchField = ({ autoFocus = false, className }) => (
  <div className={cn('relative', className)}>
    <Search
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
      aria-hidden="true"
    />
    <Input
      type="search"
      autoFocus={autoFocus}
      aria-label="Pencarian global"
      placeholder="Cari kreator atau kampanye…"
      className={cn('pl-10', searchInputClasses)}
    />
  </div>
);

/**
 * Header aplikasi (fixed di atas layar):
 * brand, pencarian global, notifikasi, dan profil pengguna.
 */
export const Navbar = ({ onMenuClick }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-white/10 bg-slate-950/95">
      <div className="flex h-full items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 lg:hidden"
          aria-label="Buka menu navigasi"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <Brand />

        {/* Pencarian global — tampil penuh mulai md */}
        <div className="hidden flex-1 md:block">
          <SearchField className="mx-auto w-full max-w-md" />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Tombol cari untuk layar di bawah md */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label={mobileSearchOpen ? 'Tutup pencarian' : 'Buka pencarian'}
            aria-expanded={mobileSearchOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 md:hidden"
          >
            {mobileSearchOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Search className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <NotificationsMenu />

          <span className="hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />

          <ProfileMenu />
        </div>
      </div>

      {/* Panel pencarian untuk layar di bawah md */}
      {mobileSearchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-slate-950/95 px-4 py-3 shadow-lg shadow-black/20 md:hidden">
          <SearchField autoFocus className="w-full" />
        </div>
      )}
    </header>
  );
};
