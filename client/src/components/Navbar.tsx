import { useAppDispatch } from '@/app/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navlinks } from '@/configs/navlinks';
import { configs } from '@/configs/site_configs';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { logOut } from '../app/features/authSlice';
import NavLinkItem from './NavLinkItem';
import { ToggleTheme } from './ToggleTheme';

const Navbar = () => {
	const { user, isLoading } = useAuth();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logOut());
		navigate('/');
	};

	return (
		<nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo and Site Name */}
					<Link to="/" className="flex items-center space-x-2">
						<Calendar className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">{configs.site_title}</span>
					</Link>
					<div className="hidden md:flex items-center space-x-6">
						{navlinks
							.filter((link) => !link.private || (link.private && user))
							.map(({ title, path }, index) => (
								<NavLinkItem key={index} to={path}>
									{title}
								</NavLinkItem>
							))}
						<ToggleTheme />
					</div>

					<div className="flex items-center space-x-4">
						{isLoading ? (
							<Avatar className="h-8 w-8">
								<AvatarFallback>ED</AvatarFallback>
							</Avatar>
						) : user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-8 w-8 rounded-full"
									>
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={user.photo_url || '/placeholder.svg'}
												alt={user.name}
											/>
											<AvatarFallback>
												{user.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-56"
									align="end"
									forceMount
								>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												{user.name}
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												{user.email}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={handleLogout}
									>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button asChild>
								<Link to="/login">Sign In</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
