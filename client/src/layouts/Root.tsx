import { Fragment } from 'react';
import { Outlet } from 'react-router';
import Navbar from '@/components/Navbar';

const Root = () => {
	return (
		<Fragment>
			<Navbar />
			<main className="mx-3 sm:mx-8">
				<Outlet />
			</main>
		</Fragment>
	);
};

export default Root;
