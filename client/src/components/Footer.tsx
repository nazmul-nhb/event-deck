import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { configs } from '@/configs/site_configs';
import {
	CalendarIcon as CalendarCog,
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Send,
	Twitter,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const footerLinks = {
	product: [
		{ name: 'Features', href: '#' },
		{ name: 'Pricing', href: '#' },
		{ name: 'Templates', href: '#' },
		{ name: 'Integrations', href: '#' },
	],
	company: [
		{ name: 'About Us', href: '#' },
		{ name: 'Careers', href: '#' },
		{ name: 'Blog', href: '#' },
		{ name: 'Press', href: '#' },
	],
	resources: [
		{ name: 'Help Center', href: '#' },
		{ name: 'Documentation', href: '#' },
		{ name: 'API Reference', href: '#' },
		{ name: 'Community', href: '#' },
	],
	legal: [
		{ name: 'Privacy Policy', href: '#' },
		{ name: 'Terms of Service', href: '#' },
		{ name: 'Cookie Policy', href: '#' },
		{ name: 'GDPR', href: '#' },
	],
};

const Footer = () => {
	const [email, setEmail] = useState('');
	const [isSubscribing, setIsSubscribing] = useState(false);

	const handleNewsletterSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubscribing(true);

		await new Promise((resolve) => setTimeout(resolve, 1000));

		setEmail('');
		setIsSubscribing(false);

		toast.success('Newsletter subscribed successfully!');
	};

	const socialLinks = [
		{ name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
		{ name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
		{ name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
		{ name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
		{ name: 'GitHub', icon: Github, href: 'https://github.com' },
	];

	return (
		<footer className="bg-background border-t">
			<div className="container mx-auto px-4 py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
					{/* Company Info */}
					<div className="lg:col-span-2">
						<div className="flex items-center space-x-2 mb-4">
							<CalendarCog className="h-8 w-8 text-primary" />
							<span className="text-2xl font-bold">{configs.site_title}</span>
						</div>
						<p className="text-muted-foreground mb-6 max-w-sm">
							Streamline your event management with our comprehensive
							platform. Create, manage, and promote events with ease.
						</p>

						{/* Contact Info */}
						<div className="space-y-3">
							<div className="flex items-center space-x-3 text-sm text-muted-foreground">
								<Mail className="h-4 w-4" />
								<span>hello@eventmanager.com</span>
							</div>
							<div className="flex items-center space-x-3 text-sm text-muted-foreground">
								<Phone className="h-4 w-4" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center space-x-3 text-sm text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span>San Francisco, CA</span>
							</div>
						</div>
					</div>

					{/* Product Links */}
					<div>
						<h3 className="font-semibold text-foreground mb-4">Product</h3>
						<ul className="space-y-3">
							{footerLinks.product.map((link) => (
								<li key={link.name}>
									<Link
										to={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h3 className="font-semibold text-foreground mb-4">Company</h3>
						<ul className="space-y-3">
							{footerLinks.company.map((link) => (
								<li key={link.name}>
									<Link
										to={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources Links */}
					<div>
						<h3 className="font-semibold text-foreground mb-4">Resources</h3>
						<ul className="space-y-3">
							{footerLinks.resources.map((link) => (
								<li key={link.name}>
									<Link
										to={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter Signup */}
					<div>
						<h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Get the latest updates and event management tips.
						</p>
						<form onSubmit={handleNewsletterSubmit} className="space-y-3">
							<Input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full"
							/>
							<Button
								type="submit"
								className="w-full"
								disabled={isSubscribing}
							>
								{isSubscribing ? (
									'Subscribing...'
								) : (
									<>
										<Send className="h-4 w-4 mr-2" />
										Subscribe
									</>
								)}
							</Button>
						</form>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Bottom Footer */}
				<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					{/* Copyright */}
					<div className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} {configs.site_title}. All rights
						reserved.
					</div>

					{/* Legal Links */}
					<div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
						{footerLinks.legal.map((link) => (
							<Link
								key={link.name}
								to={link.href}
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								{link.name}
							</Link>
						))}
					</div>

					{/* Social Links */}
					<div className="flex items-center space-x-4">
						{socialLinks.map((social) => {
							const Icon = social.icon;
							return (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-foreground transition-colors"
									aria-label={social.name}
								>
									<Icon className="h-5 w-5" />
								</a>
							);
						})}
					</div>
				</div>

				{/* Mobile Social Links - Show only on mobile */}
				<div className="md:hidden mt-6 pt-6 border-t">
					<div className="flex justify-center items-center space-x-6">
						{socialLinks.map((social) => {
							const Icon = social.icon;
							return (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-foreground transition-colors"
									aria-label={social.name}
								>
									<Icon className="h-6 w-6" />
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
