import Root from '@/layouts/Root';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import NotFound from '@/pages/NotFound';
import RegisterPage from '@/pages/RegisterPage';
import { createBrowserRouter } from 'react-router';
import AddEventPage from '../pages/AddEventPage';
import EventsPage from '../pages/EventsPage';
import Private from './Private';
import MyEventsPage from '../pages/MyEventsPage';

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
			{
				path: '/events',
				element: <Private children={<EventsPage />} />,
			},
			{
				path: '/add-event',
				element: <Private children={<AddEventPage />} />,
			},
			{
				path: '/my-events',
				element: <Private children={<MyEventsPage />} />,
			},
		],
	},
]);
