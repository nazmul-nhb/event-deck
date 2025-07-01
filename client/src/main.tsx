import { store } from '@/app/store/index.ts';
import ThemeProvider from '@/providers/ThemeProvider';
import { routes } from '@/routes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Toaster } from '@/components/ui/sonner';

import '@/styles.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider defaultTheme="dark">
				<RouterProvider router={routes} />
			</ThemeProvider>
			<Toaster />
		</Provider>
	</StrictMode>
);
