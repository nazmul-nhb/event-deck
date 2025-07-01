import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { configs } from '@/configs/site_configs';
import { Calendar, MapPin, Plus, Users } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const features = [
	{
		icon: Calendar,
		title: 'Event Management',
		description: 'Create, manage, and organize events with ease',
	},
	{
		icon: Users,
		title: 'Community Engagement',
		description: 'Connect with attendees and build your community',
	},
	{
		icon: MapPin,
		title: 'Location Tracking',
		description: 'Keep track of event locations and venues',
	},
];

export default function HomePage() {
	const { user } = useAuth();

	useDocumentTitle(`Home - ${configs.site_title}`);
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">
						Welcome to{' '}
						<span className="text-primary">{configs.site_title}</span>
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Your ultimate platform for creating, managing, and discovering
						amazing events. Connect with your community and make every event
						memorable.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						{user ? (
							<>
								<Button asChild size="lg">
									<Link to="/events">
										<Calendar className="mr-2 h-5 w-5" />
										Browse Events
									</Link>
								</Button>
								<Button asChild variant="outline" size="lg">
									<Link to="/add-event">
										<Plus className="mr-2 h-5 w-5" />
										Create Event
									</Link>
								</Button>
							</>
						) : (
							<>
								<Button asChild size="lg">
									<Link to="/register">Get Started</Link>
								</Button>
								<Button asChild variant="outline" size="lg">
									<Link to="/login">Sign In</Link>
								</Button>
							</>
						)}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Why Choose {configs.site_title}?
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Discover the features that make event management simple and
							effective
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<Card key={index} className="text-center">
								<CardHeader>
									<div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
										<feature.icon className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Get Started?
					</h2>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Join thousands of event organizers who trust {configs.site_title} to
						manage their events
					</p>
					{!user && (
						<Button asChild size="lg">
							<Link to="/register">Create Your Account</Link>
						</Button>
					)}
				</div>
			</section>
		</div>
	);
}
