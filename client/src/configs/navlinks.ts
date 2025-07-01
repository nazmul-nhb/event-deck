import type { TNavLink } from '@/types';

export const navlinks: TNavLink[] = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'Events',
		path: '/events',
		private: true,
	},
	{
		title: 'Add Event',
		path: '/add-events',
		private: true,
	},
	{
		title: 'My Events',
		path: '/my-events',
		private: true,
	},
];
