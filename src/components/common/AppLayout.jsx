import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { BottomNav } from '@/components/common/BottomNav';
import { Navbar } from '@/components/common/Navbar';
import { Sidebar } from '@/components/common/Sidebar';

/**
 * Layout utama aplikasi (protected area).
 * Header penuh di atas + sidebar di kiri; pada layar di bawah lg, sidebar
 * menjadi drawer yang dipicu tombol menu di header.
 */
export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tutup drawer otomatis saat layar melewati breakpoint lg (>=1024px).
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event) => {
      if (event.matches) setSidebarOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Kunci scroll body selama drawer mobile terbuka.
  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      <a
        href="#konten-utama"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('konten-utama');
          if (main) main.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Lewati ke konten utama
      </a>

      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />

      {/* Konten utama — digeser ke kanan pada lg karena sidebar menetap */}
      <div className="pt-16 lg:pl-64">
        <main
          id="konten-utama"
          tabIndex={-1}
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-28 pt-6 outline-none sm:px-6 lg:px-8 lg:pb-8 lg:pt-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
