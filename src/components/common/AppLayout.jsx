import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { BottomNav } from '@/components/common/BottomNav';
import { Navbar } from '@/components/common/Navbar';
import { Sidebar } from '@/components/common/Sidebar';

/**
 * Main app layout (protected area).
 * Full header on top + sidebar on the left; below lg, the sidebar turns
 * into a drawer triggered by the menu button in the header.
 */
export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-close the drawer when the screen crosses the lg breakpoint (>=1024px).
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event) => {
      if (event.matches) setSidebarOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          if (main) main.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />

      {/* Main content — offset to the right on lg since the sidebar is fixed */}
      <div className="pt-16 lg:pl-64">
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-28 pt-6 outline-none sm:px-6 lg:px-8 lg:pb-8 lg:pt-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
