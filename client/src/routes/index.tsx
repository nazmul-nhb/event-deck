import Root from '@/layouts/Root';
import NotFound from '@/pages/NotFound';
import { createBrowserRouter } from 'react-router';

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFound />,
		children: [],
	},
]);
