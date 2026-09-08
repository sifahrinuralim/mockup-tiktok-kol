import { useState } from 'react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

import { CURRENT_USER } from '@/constants/app';
import { useDismiss } from '@/hooks/useDismiss';
import { cn } from '@/utils/cn';

/** Aksi menu akun. Masih placeholder — sambungkan saat halaman terkait dibangun. */
const MENU_ITEMS = [
  { label: 'Lihat Profil', icon: User },
  { label: 'Pengaturan Akun', icon: Settings },
];

/**
 * Blok profil pengguna di Navbar lengkap dengan menu akun dropdown.
 * Identitas pengguna diambil dari CURRENT_USER (mock).
 */
export const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useDismiss(open, () => setOpen(false));

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Akun ${CURRENT_USER.name}`}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-xs font-bold text-white"
          aria-hidden="true"
        >
          {CURRENT_USER.initials}
        </span>
        <span className="hidden min-w-0 text-left lg:block">
          <span className="block truncate text-sm font-semibold leading-tight text-white">
            {CURRENT_USER.name}
          </span>
          <span className="block truncate text-xs leading-tight text-slate-400">
            {CURRENT_USER.role}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'hidden h-4 w-4 shrink-0 text-slate-500 transition-transform sm:block',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Menu akun"
          className="animate-fade-in absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-slate-900 py-1.5 shadow-2xl shadow-black/40"
        >
          <div className="border-b border-white/10 px-4 py-3">
            <p className="truncate text-sm font-semibold text-white">{CURRENT_USER.name}</p>
            <p className="truncate text-xs text-slate-400">{CURRENT_USER.email}</p>
          </div>

          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <item.icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {item.label}
            </button>
          ))}

          <div className="my-1.5 h-px bg-white/10" />

          <button
            type="button"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Keluar
          </button>
        </div>
      )}
    </div>
  );
};