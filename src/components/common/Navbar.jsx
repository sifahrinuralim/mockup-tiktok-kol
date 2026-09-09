import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Music2, Search, X } from 'lucide-react';

import { NotificationsMenu } from '@/components/common/NotificationsMenu';
import { ProfileMenu } from '@/components/common/ProfileMenu';
import { Input } from '@/components/ui/Input';
import { APP } from '@/constants/app';
import { cn } from '@/utils/cn';

/** Color override classes for Input so it blends with the light header. */
const searchInputClasses = cn(
  'border-slate-200 bg-slate-100 py-2 text-slate-900 placeholder:text-slate-400',
  'hover:border-slate-300',
  'focus:border-primary-500 focus:bg-white focus:ring-primary-500/20',
);

/** App brand: logo mark + name (and an optional tagline). */
const Brand = () => (
  <Link
    to="/"
    aria-label={`${APP.brand} — home`}
    className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
  >
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20">
      <Music2 className="h-5 w-5 text-white" aria-hidden="true" />
    </span>
    <span className="min-w-0 leading-tight">
      <span className="block truncate text-sm font-bold text-slate-900">{APP.name}</span>
      {APP.tagline && (
        <span className="block truncate text-[11px] text-slate-500">{APP.tagline}</span>
      )}
    </span>
  </Link>
);

/** Global search field (mockup) with a search icon on the left. */
const SearchField = ({ autoFocus = false, className }) => (
  <div className={cn('relative', className)}>
    <Search
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
      aria-hidden="true"
    />
    <Input
      type="search"
      autoFocus={autoFocus}
      aria-label="Global search"
      placeholder="Search creators or campaigns…"
      className={cn('pl-10', searchInputClasses)}
    />
  </div>
);

/**
 * App header (fixed at the top of the screen):
 * brand, global search, notifications, and the user profile.
 */
export const Navbar = ({ onMenuClick }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex h-full items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <Brand />

        {/* Global search — fully visible from md up */}
        <div className="hidden flex-1 md:block">
          <SearchField className="mx-auto w-full max-w-md" />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Search button for screens below md */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
            aria-expanded={mobileSearchOpen}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:hidden"
          >
            {mobileSearchOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Search className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <NotificationsMenu />

          <span className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden="true" />

          <ProfileMenu />
        </div>
      </div>

      {/* Search panel for screens below md */}
      {mobileSearchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-900/10 md:hidden">
          <SearchField autoFocus className="w-full" />
        </div>
      )}
    </header>
  );
};
