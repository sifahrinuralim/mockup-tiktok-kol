import { useState } from 'react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

import { CURRENT_USER } from '@/constants/app';
import { useDismiss } from '@/hooks/useDismiss';
import { cn } from '@/utils/cn';

/** Account menu actions. Still placeholders — wire them up once the related page is built. */
const MENU_ITEMS = [
  { label: 'View Profile', icon: User },
  { label: 'Account Settings', icon: Settings },
];

/**
 * User profile block in the Navbar with an account dropdown menu.
 * User identity comes from CURRENT_USER (mock).
 */
export const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useDismiss(open, () => setOpen(false));

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Account for ${CURRENT_USER.name}`}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-xs font-bold text-white"
          aria-hidden="true"
        >
          {CURRENT_USER.initials}
        </span>
        <span className="hidden min-w-0 text-left lg:block">
          <span className="block truncate text-sm font-semibold leading-tight text-slate-900">
            {CURRENT_USER.name}
          </span>
          <span className="block truncate text-xs leading-tight text-slate-500">
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
          aria-label="Account menu"
          className="animate-fade-in absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl shadow-slate-900/10"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-900">{CURRENT_USER.name}</p>
            <p className="truncate text-xs text-slate-500">{CURRENT_USER.email}</p>
          </div>

          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <item.icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {item.label}
            </button>
          ))}

          <div className="my-1.5 h-px bg-slate-100" />

          <button
            type="button"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};