import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Props {
	number?: number;
}

export default function SkeletonGrid({ number = 9 }: Props) {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(number)].map((_, i) => (
					<Card key={i} className="animate-pulse">
						<CardHeader>
							<div className="h-4 bg-muted rounded w-3/4"></div>
							<div className="h-3 bg-muted rounded w-1/2"></div>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="h-3 bg-muted rounded"></div>
								<div className="h-3 bg-muted rounded w-5/6"></div>
								<div className="h-3 bg-muted rounded w-5/6"></div>
								<div className="h-3 bg-muted rounded w-5/6"></div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
