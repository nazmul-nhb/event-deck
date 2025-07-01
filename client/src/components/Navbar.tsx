import { logOut } from '@/app/features/authSlice';
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
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { navlinks } from '@/configs/navlinks';
import { configs } from '@/configs/site_configs';
import { useAuth } from '@/hooks/useAuth';
import { CalendarIcon as CalendarCog, LogOut, Menu } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import NavLinkItem from './NavLinkItem';
import { ToggleTheme } from './ToggleTheme';

const Navbar = () => {
	const { user, isLoading } = useAuth();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		dispatch(logOut());
		navigate('/');
		setIsOpen(false);
	};

	const handleNavClick = () => {
		setIsOpen(false);
	};

	const filteredNavLinks = useMemo(() => {
		return navlinks.filter((link) => !link.private || (link.private && user));
	}, [user]);

	return (
		<nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo and Site Name */}
					<Link to="/" className="flex items-center space-x-2">
						<CalendarCog className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">{configs.site_title}</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-4">
						{filteredNavLinks.map(({ title, path }, index) => (
							<NavLinkItem key={index} to={path}>
								{title}
							</NavLinkItem>
						))}
						<ToggleTheme />
					</div>

					{/* Desktop User Menu & Mobile Menu Button */}
					<div className="flex items-center">
						{/* Mobile Menu Button */}
						<div className="md:hidden">
							<Sheet open={isOpen} onOpenChange={setIsOpen}>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon">
										<Menu className="size-5" />
										<span className="sr-only">Toggle menu</span>
									</Button>
								</SheetTrigger>
								<SheetContent
									side="right"
									className="w-[320px] sm:w-[480px]"
								>
									<SheetHeader>
										<SheetTitle className="flex items-center space-x-2">
											<CalendarCog className="size-5 text-primary" />
											<span>{configs.site_title}</span>
										</SheetTitle>
									</SheetHeader>

									<div className="flex flex-col space-y-4">
										{/* Mobile Navigation Links */}
										<div className="flex flex-col space-y-1">
											{filteredNavLinks.map(
												({ title, path }, index) => (
													<Link
														key={index}
														to={path}
														onClick={handleNavClick}
														className="text-lg font-medium text-foreground hover:text-primary transition-colors py-0.5 px-3 rounded-md hover:bg-accent"
													>
														{title}
													</Link>
												)
											)}
										</div>

										{/* Mobile Theme Toggle */}
										<div className="flex items-center justify-between py-2 px-3">
											<span className="text-sm font-medium">
												Theme
											</span>
											<ToggleTheme />
										</div>

										{/* Mobile User Section */}
										{isLoading ? (
											<div className="flex items-center space-x-3 py-2 px-3">
												<Avatar className="h-8 w-8">
													<AvatarFallback>ED</AvatarFallback>
												</Avatar>
												<span className="text-sm">Loading...</span>
											</div>
										) : user ? (
											<div className="border-t pt-4 mt-4">
												<div className="flex items-center space-x-3 py-2 px-3 mb-3">
													<Avatar className="h-10 w-10">
														<AvatarImage
															src={user.photo_url}
															alt={user.name}
														/>
														<AvatarFallback>
															{user.name
																.charAt(0)
																.toUpperCase()}
														</AvatarFallback>
													</Avatar>
													<div className="flex flex-col">
														<p className="text-sm font-medium leading-none">
															{user.name}
														</p>
														<p className="text-xs leading-none text-muted-foreground mt-1">
															{user.email}
														</p>
													</div>
												</div>
												<Button
													variant="ghost"
													className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
													onClick={handleLogout}
												>
													<LogOut className="mr-2 h-4 w-4" />
													<span>Log out</span>
												</Button>
											</div>
										) : (
											<div className="border-t pt-4 mt-4">
												<Button asChild className="w-full">
													<Link
														to="/login"
														onClick={handleNavClick}
													>
														Sign In
													</Link>
												</Button>
											</div>
										)}
									</div>
								</SheetContent>
							</Sheet>
						</div>

						{/* Desktop User Menu */}
						<div className="hidden md:block">
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
													src={user.photo_url}
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
			</div>
		</nav>
	);
};

export default Navbar;
