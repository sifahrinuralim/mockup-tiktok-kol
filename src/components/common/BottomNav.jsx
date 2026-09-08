import { NavLink } from 'react-router-dom';

import { BOTTOM_NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/utils/cn';

/**
 * Bottom navigation khusus perangkat mobile (di bawah breakpoint lg) agar
 * pengalaman menjelajah menyerupai aplikasi native. Setiap item memakai
 * touch target setinggi minimal 44px (h-14 = 56px).
 */
export const BottomNav = () => (
  <nav
    aria-label="Navigasi bawah"
    className="pb-safe fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 backdrop-blur-sm lg:hidden"
  >
    <ul className="grid grid-cols-4">
      {BOTTOM_NAV_ITEMS.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'group flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400/60',
                isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-slate-200',
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    'h-5 w-5 shrink-0 transition-colors',
                    isActive ? 'text-cyan-300' : 'text-slate-500 group-hover:text-slate-300',
                  )}
                  aria-hidden="true"
                />
                {item.label}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
