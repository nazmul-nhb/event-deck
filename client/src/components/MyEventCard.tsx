import { Edit, Trash2, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { IEvent } from '@/types/event.types';
import { chronos } from 'nhb-toolbox';
import { useDeleteEventMutation } from '../app/api/eventApi';

interface Props {
	event: IEvent;
}

export default function MyEventCard({ event }: Props) {
	const [deleteEvent, { isLoading }] = useDeleteEventMutation();

	return (
		<Card className="h-full flex flex-col">
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<CardTitle className="line-clamp-2 mb-2">{event.title}</CardTitle>
						<Badge variant="secondary" className="mb-2">
							Your Event
						</Badge>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Clock className="h-4 w-4" />
						<span>
							{chronos(event.event_date).format('mmmm DD, YYYY [at] hh:mm A')}
						</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<MapPin className="h-4 w-4" />
						<span className="line-clamp-1">{event.location}</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Users className="h-4 w-4" />
						<span>{event.attendee_count} attendees</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className="flex-1 flex flex-col">
				<CardDescription className="line-clamp-3 mb-4 flex-1">
					{event.description}
				</CardDescription>

				<div className="flex gap-2">
					<Button variant="outline" size="sm" className="flex-1 bg-transparent">
						<Edit className="mr-2 h-4 w-4" />
						Update
					</Button>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="destructive"
								size="sm"
								className="flex-1"
								disabled={isLoading}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								{isLoading ? 'Deleting...' : 'Delete'}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently
									delete your event "{event.title}" and remove all
									associated data.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => deleteEvent(event._id)}
									className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								>
									Delete Event
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardContent>
		</Card>
	);
}
