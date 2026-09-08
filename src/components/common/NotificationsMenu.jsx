import { useState } from 'react';
import { Bell, Bookmark, CheckCheck, Megaphone, TrendingUp } from 'lucide-react';

import { NOTIFICATIONS } from '@/data/notifications';
import { useDismiss } from '@/hooks/useDismiss';
import { cn } from '@/utils/cn';

/** Mapping of notification types to icons & icon background colors. */
const metaByType = {
  campaign: { icon: Megaphone, iconClass: 'bg-cyan-100 text-cyan-700' },
  metric: { icon: TrendingUp, iconClass: 'bg-emerald-100 text-emerald-700' },
  list: { icon: Bookmark, iconClass: 'bg-fuchsia-100 text-fuchsia-700' },
  system: { icon: Bell, iconClass: 'bg-slate-100 text-slate-600' },
};

/**
 * Notification bell menu in the Navbar.
 * Data comes from mock (src/data/notifications.js); read/mark-as-read actions
 * only simulate local state.
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
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-haspopup="true"
        aria-expanded={open}
        className="relative flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="region"
          aria-label="Notification list"
          className="animate-fade-in absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 sm:w-80"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 transition-colors hover:text-cyan-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Mark all as read
            </button>
          </div>

          {items.length > 0 ? (
            <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
              {items.map((item) => {
                const meta = metaByType[item.type] ?? metaByType.system;
                const Icon = meta.icon;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => markAsRead(item.id)}
                      className={cn(
                        'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50',
                        item.unread && 'bg-cyan-50/50',
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
                            item.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-600',
                          )}
                        >
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                          {item.body}
                        </span>
                        <span className="mt-1 block text-[11px] text-slate-500">{item.time}</span>
                      </span>
                      {item.unread && (
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-slate-500">No notifications yet.</p>
          )}
        </div>
      )}
    </div>
  );
};