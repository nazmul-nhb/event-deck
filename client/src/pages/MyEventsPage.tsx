import { useGetUserEventsQuery } from '@/app/api/eventApi';
import MyEventCard from '@/components/MyEventCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Plus } from 'lucide-react';
import { isNotEmptyObject, isValidArray } from 'nhb-toolbox';
import { Link } from 'react-router';
import SkeletonGrid from '@/components/ui/skeleton-grid';
import { useEventFilters } from '@/hooks/useEventFilters';

export default function MyEventsPage() {
	const { filterObject, EventFilters } = useEventFilters();

	const { data, isLoading, error } = useGetUserEventsQuery(filterObject);

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card>
					<CardContent className="pt-6">
						<p className="text-center text-muted-foreground">
							Failed to load your events. Please try again later.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold mb-2">My Events</h1>
					<p className="text-muted-foreground">
						Manage and track your created events
					</p>
				</div>
				<Button asChild>
					<Link to="/add-event">
						<Plus className="mr-2 h-4 w-4" />
						Create Event
					</Link>
				</Button>
			</div>

			{/* Search and Filter */}
			<EventFilters />

			{isLoading ? (
				<SkeletonGrid />
			) : isValidArray(data?.data?.events) ? (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{data?.data?.events?.map((event) => (
						<MyEventCard key={event._id} event={event} />
					))}
				</div>
			) : (
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
							<h3 className="text-lg font-semibold mb-2">No events yet</h3>
							<p className="text-muted-foreground mb-4">
								{isNotEmptyObject(filterObject)
									? 'Try adjusting your search or filter criteria'
									: "You haven't created any events yet. Start by creating your first event!"}
							</p>
							<Button asChild>
								<Link to="/add-event">
									<Plus className="mr-2 h-4 w-4" />
									Create Your First Event
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
