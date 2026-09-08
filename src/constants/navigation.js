import { BarChart3, Bookmark, Home, LayoutDashboard, Megaphone, UserRound, Users } from 'lucide-react';

/**
 * Main navigation menu list.
 * Shared by the Sidebar (NavLink) and other components for route labels.
 */
export const NAV_ITEMS = [
  {
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview of TikTok account performance and agency campaigns in one screen.',
    end: true,
  },
  {
    to: '/top-talents',
    label: 'Top Talents',
    icon: Users,
    description: 'Explore, compare, and pick top TikTok creators for your campaigns.',
  },
  {
    to: '/campaigns',
    label: 'Campaign Manager',
    icon: Megaphone,
    description: 'Manage the campaign workflow from brief to final report.',
  },
  {
    to: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'In-depth analysis of content trends, audiences, and campaign performance.',
  },
  {
    to: '/saved-lists',
    label: 'Saved Lists',
    icon: Bookmark,
    description: 'A collection of creator lists you have saved for upcoming campaigns.',
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: UserRound,
    description: 'Manage your user profile, account preferences, and other settings.',
  },
];

/**
 * Bottom navigation items for mobile screens (below lg).
 * A subset of the main navigation with compact, native-app-style labels.
 */
export const BOTTOM_NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/top-talents', label: 'Talents', icon: Users },
  { to: '/saved-lists', label: 'Saved', icon: Bookmark },
  { to: '/profile', label: 'Profile', icon: UserRound },
];