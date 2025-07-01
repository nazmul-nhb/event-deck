import { useState, useMemo } from 'react';
import {
	isToday,
	isThisWeek,
	isThisMonth,
	subWeeks,
	subMonths,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
} from 'date-fns';
import { Search, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useGetAllEventsQuery } from '@/app/api/eventApi';
import EventCard from '@/components/EventCard';

export default function EventsPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState('all');

	const {
		data: eventsData,
		isLoading,
		error,
	} = useGetAllEventsQuery({
		search: searchTerm,
	});

	const filteredEvents = useMemo(() => {
		if (!eventsData?.data?.events) return [];

		let filtered = eventsData.data.events;

		// Apply date filters
		if (filterType !== 'all') {
			filtered = filtered.filter((event) => {
				const eventDate = new Date(event.event_date);

				switch (filterType) {
					case 'today':
						return isToday(eventDate);
					case 'current-week':
						return isThisWeek(eventDate);
					case 'last-week': {
						const lastWeekStart = startOfWeek(subWeeks(new Date(), 1));
						const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1));
						return eventDate >= lastWeekStart && eventDate <= lastWeekEnd;
					}
					case 'current-month':
						return isThisMonth(eventDate);
					case 'last-month': {
						const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
						const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
						return eventDate >= lastMonthStart && eventDate <= lastMonthEnd;
					}
					default:
						return true;
				}
			});
		}

		return filtered;
	}, [eventsData?.data?.events, filterType]);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[...Array(6)].map((_, i) => (
						<Card key={i} className="animate-pulse">
							<CardHeader>
								<div className="h-4 bg-muted rounded w-3/4"></div>
								<div className="h-3 bg-muted rounded w-1/2"></div>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="h-3 bg-muted rounded"></div>
									<div className="h-3 bg-muted rounded w-5/6"></div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

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
			<div className="flex flex-col sm:flex-row gap-4 mb-8">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search events by title..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Select value={filterType} onValueChange={setFilterType}>
					<SelectTrigger className="w-full sm:w-48">
						<Filter className="mr-2 h-4 w-4" />
						<SelectValue placeholder="Filter by date" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Events</SelectItem>
						<SelectItem value="today">Today</SelectItem>
						<SelectItem value="current-week">Current Week</SelectItem>
						<SelectItem value="last-week">Last Week</SelectItem>
						<SelectItem value="current-month">Current Month</SelectItem>
						<SelectItem value="last-month">Last Month</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Events Grid */}
			{filteredEvents.length === 0 ? (
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
							<h3 className="text-lg font-semibold mb-2">No events found</h3>
							<p className="text-muted-foreground">
								{searchTerm || filterType !== 'all'
									? 'Try adjusting your search or filter criteria'
									: 'No events are currently available'}
							</p>
						</div>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredEvents.map((event) => (
						<EventCard key={event._id} event={event} />
					))}
				</div>
			)}
		</div>
	);
}
