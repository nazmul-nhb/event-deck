import { Fragment } from 'react';
import { Outlet } from 'react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Root = () => {
	return (
		<Fragment>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer/>
		</Fragment>
	);
};

export default Root;
