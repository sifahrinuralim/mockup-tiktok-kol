import { useState } from 'react';
import { Bell, Bookmark, CheckCheck, Megaphone, TrendingUp } from 'lucide-react';

import { NOTIFICATIONS } from '@/data/notifications';
import { useDismiss } from '@/hooks/useDismiss';
import { cn } from '@/utils/cn';

/** Pemetaan jenis notifikasi ke ikon & warna latar ikon. */
const metaByType = {
  campaign: { icon: Megaphone, iconClass: 'bg-cyan-500/10 text-cyan-300' },
  metric: { icon: TrendingUp, iconClass: 'bg-emerald-500/10 text-emerald-300' },
  list: { icon: Bookmark, iconClass: 'bg-fuchsia-500/10 text-fuchsia-300' },
  system: { icon: Bell, iconClass: 'bg-white/10 text-slate-300' },
};

/**
 * Menu lonceng notifikasi di Navbar.
 * Data bersumber dari mock (src/data/notifications.js); aksi baca/tandai-dibaca
 * hanya simulasi state lokal.
 */
export const NotificationsMenu = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(NOTIFICATIONS);
  const containerRef = useDismiss(open, () => setOpen(false));

  const unreadCount = items.filter((item) => item.unread).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const markAsRead = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Notifikasi (${unreadCount} belum dibaca)`}
        aria-haspopup="true"
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-slate-950">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="region"
          aria-label="Daftar notifikasi"
          className="animate-fade-in absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 sm:w-80"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold text-white">Notifikasi</h2>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 transition-colors hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Tandai dibaca
            </button>
          </div>

          {items.length > 0 ? (
            <ul className="max-h-80 divide-y divide-white/5 overflow-y-auto">
              {items.map((item) => {
                const meta = metaByType[item.type] ?? metaByType.system;
                const Icon = meta.icon;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => markAsRead(item.id)}
                      className={cn(
                        'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5',
                        item.unread && 'bg-white/[0.03]',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          meta.iconClass,
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block text-sm',
                            item.unread ? 'font-semibold text-white' : 'font-medium text-slate-300',
                          )}
                        >
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">
                          {item.body}
                        </span>
                        <span className="mt-1 block text-[11px] text-slate-500">{item.time}</span>
                      </span>
                      {item.unread && (
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-slate-400">Belum ada notifikasi.</p>
          )}
        </div>
      )}
    </div>
  );
};