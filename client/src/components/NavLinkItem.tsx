import type { FC, ReactNode } from "react";
import { NavLink, type To } from "react-router";

interface Props {
	to: To;
	children: ReactNode;
	className?: string;
}

const NavLinkItem: FC<Props> = ({ to, children, className = "" }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`relative group font-semibold text-nowrap whitespace-nowrap transition-all duration-300 ${className} ${
					isActive
						? "text-red-600 hover:text-red-300 !font-bold"
						: "dark:text-gray-200 hover:dark:text-red-300 text-gray-800 hover:text-red-300"
				}`
			}
		>
			{children}
			<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform origin-center scale-x-0 transition-all duration-500 ease-out group-hover:scale-x-100"></span>
		</NavLink>
	);
};

export default NavLinkItem;
