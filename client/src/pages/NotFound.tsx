'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, HelpCircle, Home, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const NotFound = () => {
	const navigate = useNavigate();
	const [canGoBack, setCanGoBack] = useState(false);

	useEffect(() => {
		setCanGoBack(window.history.length > 1);
	}, []);

	const handleGoBack = () => {
		if (canGoBack) {
			navigate(-1);
		} else {
			navigate('/');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 pb-12 bg-gradient-to-br from-background to-muted/20">
			<div className="max-w-2xl mx-auto text-center">
				<div className="relative mb-8">
					<div className="text-[10rem] md:text-[12rem] font-black text-muted/20 leading-none select-none">
						404
					</div>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center">
							<Search className="w-12 h-12 md:w-16 md:h-16 text-primary/60" />
						</div>
					</div>
				</div>

				{/* Content Card */}
				<Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
					<CardContent className="p-8 md:p-12">
						<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							Page Not Found
						</h1>

						<p className="text-lg text-muted-foreground mb-2">
							Oops! The page you're looking for doesn't exist.
						</p>

						<p className="text-muted-foreground mb-8">
							It might have been moved, deleted, or you entered the wrong URL.
						</p>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
							<Button asChild size="lg" className="w-full sm:w-auto">
								<Link to="/">
									<Home className="w-4 h-4 mr-2" />
									Go to Homepage
								</Link>
							</Button>

							<Button
								variant="outline"
								size="lg"
								onClick={handleGoBack}
								className="w-full sm:w-auto bg-transparent"
							>
								<ArrowLeft className="w-4 h-4 mr-2" />
								{canGoBack ? 'Go Back' : 'Go Home'}
							</Button>
						</div>

						{/* Help Section */}
						<div className="border-t pt-6">
							<div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
								<HelpCircle className="w-4 h-4 mr-2" />
								<span>Need help finding what you're looking for?</span>
							</div>

							<div className="flex flex-wrap justify-center gap-4 text-sm">
								<Link
									to="/"
									className="text-primary hover:text-primary/80 transition-colors"
								>
									Help Center
								</Link>
								<span className="text-muted-foreground">•</span>
								<Link
									to="/"
									className="text-primary hover:text-primary/80 transition-colors"
								>
									Contact Support
								</Link>
								<span className="text-muted-foreground">•</span>
								<Link
									to="/"
									className="text-primary hover:text-primary/80 transition-colors"
								>
									Site Map
								</Link>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default NotFound;
