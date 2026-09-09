/**
 * Mock notifications for the bell menu in the Navbar.
 * `type` is mapped to icons & colors in the NotificationsMenu component.
 * The field structure mimics a notification API contract (id, title, body, time, read status).
 */
export const NOTIFICATIONS = [
  {
    id: 1,
    type: 'campaign',
    title: 'Campaign “Glow Up x @johndoe” approved',
    body: 'Creator content goes live Monday at 09:00 (GMT+7).',
    time: '12 minutes ago',
    unread: true,
  },
  {
    id: 2,
    type: 'metric',
    title: '@jamestaylor metrics are up',
    body: 'Engagement rate is up 24% compared to last week.',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    type: 'list',
    title: 'List “Beauty Micro-Influencer” downloaded',
    body: 'The list was downloaded by a teammate on your campaign.',
    time: '3 hours ago',
    unread: false,
  },
  {
    id: 4,
    type: 'system',
    title: 'Weekly search quota almost reached',
    body: '18 of 25 searches left for this week.',
    time: 'Yesterday',
    unread: false,
  },
];