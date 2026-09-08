import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { APP } from '@/constants/app';
import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/utils/cn';

/**
 * Navigasi samping (sidebar) aplikasi.
 * - lg (>=1024px) ke atas: panel tetap berada di kiri, tepat di bawah header.
 * - di bawah lg: drawer yang bergeser dari kiri (dikendalikan prop `open`).
 */
export const Sidebar = ({ open = false, onClose }) => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Backdrop — hanya tampil untuk drawer mobile */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Navigasi utama"
        className={cn(
          'fixed bottom-0 left-0 top-16 z-40 flex w-64 flex-col border-r border-white/10 bg-slate-950/95 transition-transform duration-200 ease-out lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Tombol tutup drawer (hanya mobile) */}
        <div className="flex justify-end px-3 pt-3 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Tutup menu navigasi"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-2 pt-1 lg:pt-5">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Menu Utama
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
                      isActive
                        ? 'bg-white/[0.07] text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-cyan-400 to-fuchsia-500"
                          aria-hidden="true"
                        />
                      )}
                      <item.icon
                        className={cn(
                          'h-5 w-5 shrink-0 transition-colors',
                          isActive
                            ? 'text-cyan-300'
                            : 'text-slate-500 group-hover:text-slate-300',
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-xs leading-relaxed text-slate-500">© {year} {APP.brand}</p>
          <p className="mt-0.5 text-xs text-slate-600">Mockup frontend — UI only.</p>
        </div>
      </aside>
    </>
  );
};
