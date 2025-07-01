import Root from '@/layouts/Root';
import LoginPage from '@/pages/LoginPage';
import NotFound from '@/pages/NotFound';
import RegisterPage from '@/pages/RegisterPage';
import { createBrowserRouter } from 'react-router';

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
		],
	},
]);
