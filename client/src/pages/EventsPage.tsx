import { useGetAllEventsQuery } from '@/app/api/eventApi';
import EventCard from '@/components/EventCard';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { isNotEmptyObject, isValidArray } from 'nhb-toolbox';
import SkeletonGrid from '@/components/ui/skeleton-grid';
import { useEventFilters } from '@/hooks/useEventFilters';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { configs } from '@/configs/site_configs';

export default function EventsPage() {
	const { filterObject, EventFilters } = useEventFilters();

	const { data, isLoading, error } = useGetAllEventsQuery(filterObject);

	useDocumentTitle(`Events - ${configs.site_title}`);

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card>
					<CardContent className="pt-6">
						<p className="text-center text-muted-foreground">
							Failed to load events. Please try again later.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Discover Events</h1>
				<p className="text-muted-foreground">
					Find and join amazing events in your community
				</p>
			</div>

			{/* Search and Filter */}
			<EventFilters />

			{isLoading ? (
				<SkeletonGrid />
			) : isValidArray(data?.data?.events) ? (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{data?.data?.events.map((event) => (
						<EventCard key={event._id} event={event} />
					))}
				</div>
			) : (
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
							<h3 className="text-lg font-semibold mb-2">No events found</h3>
							<p className="text-muted-foreground">
								{isNotEmptyObject(filterObject)
									? 'Try adjusting your search or filter criteria'
									: 'No events are currently available'}
							</p>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
