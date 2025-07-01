import { navlinks } from '@/configs/navlinks';
import { configs } from '../configs/site_configs';
import { useAuth } from '../hooks/useAuth';
import NavLinkItem from './NavLinkItem';
import { ToggleTheme } from './ToggleTheme';

const Navbar = () => {
	const { user } = useAuth();

	return (
		<nav className="flex items-center justify-between gap-2 px-3 sm:px-8 py-2">
			<div className="flex items-center gap-2">
				<h1 className="text-red-700 text-2xl sm:text-3xl font-bold">
					{configs.site_title}
				</h1>
			</div>
			<div className="flex items-center gap-3 text-">
				{navlinks
					.filter((link) => !link.private || (link.private && user))
					.map(({ title, path }, index) => (
						<NavLinkItem key={index} to={path}>
							{title}
						</NavLinkItem>
					))}
				<ToggleTheme />
			</div>
		</nav>
	);
};

export default Navbar;
