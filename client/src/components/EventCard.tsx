import { useJoinEventMutation } from '@/app/api/eventApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import type { IEventDetails } from '@/types/event.types';
import { Clock, MapPin, Users } from 'lucide-react';
import { chronos } from 'nhb-toolbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface Props {
	event: IEventDetails;
}

export default function EventCard({ event }: Props) {
	const { user } = useAuth();

	const [joinEvent] = useJoinEventMutation();

	const hasJoined = user && event.attendee.includes(user._id) ? true : false;

	return (
		<Card className="h-full flex flex-col">
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<CardTitle className="line-clamp-2 mb-2">{event.title}</CardTitle>
						<div className="flex items-center gap-2 mb-2">
							<Avatar className="h-6 w-6">
								<AvatarImage
									src={event.created_by.photo_url || '/placeholder.svg'}
								/>
								<AvatarFallback className="text-xs">
									{event.created_by.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span className="text-sm text-muted-foreground">
								{event.created_by.name}
							</span>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Clock className="h-4 w-4" />
						<span>
							{chronos(event.event_date).format('mmmm DD, YYYY [at] hh:mmA')}
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

				<Button
					onClick={() => joinEvent(event._id)}
					disabled={hasJoined}
					className="w-full"
					variant={hasJoined ? 'secondary' : 'default'}
				>
					{hasJoined ? 'Already Joined' : 'Join Event'}
				</Button>
			</CardContent>
		</Card>
	);
}
