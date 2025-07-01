import { useCreateEventMutation } from '@/app/api/eventApi';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { eventSchema } from '@/schema';
import type { TEventData } from '@/types/event.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, FileText, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { configs } from '@/configs/site_configs';

export default function AddEventPage() {
	const [createEvent, { isLoading, error }] = useCreateEventMutation();
	const navigate = useNavigate();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TEventData>({
		resolver: zodResolver(eventSchema),
	});

	const handleAddEvent = async (data: TEventData) => {
		try {
			const { success } = await createEvent(data).unwrap();

			if (success) {
				reset();
				navigate('/my-events');
			}
		} catch (err) {
			console.error('Failed to create event:', err);
		}
	};

	useDocumentTitle(`Add Event - ${configs.site_title}`);

	return (
		<div className="container mx-auto px-4 py-8 max-w-2xl">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Create New Event</h1>
				<p className="text-muted-foreground">
					Fill in the details below to create your event
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CalendarIcon className="h-5 w-5" />
						Event Details
					</CardTitle>
					<CardDescription>
						Provide information about your event to help attendees understand
						what to expect
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(handleAddEvent)} className="space-y-6">
						{error && (
							<Alert variant="destructive">
								<AlertDescription>
									{'data' in error &&
									error.data &&
									typeof error.data === 'object' &&
									'message' in error.data
										? String(error.data.message)
										: 'Failed to create event. Please try again!'}
								</AlertDescription>
							</Alert>
						)}

						<div className="space-y-2">
							<Label htmlFor="title" className="flex items-center gap-2">
								<FileText className="h-4 w-4" />
								Event Title
							</Label>
							<Input
								id="title"
								placeholder="e.g. Graduation Ceremony"
								{...register('title')}
								className={errors.title ? 'border-red-500' : ''}
							/>
							{errors.title && (
								<p className="text-sm text-red-500">
									{errors.title.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="event_date" className="flex items-center gap-2">
								<CalendarIcon className="h-4 w-4" />
								Date and Time
							</Label>
							<DateTimePicker
								name="event_date"
								control={control}
								errorMessage={errors.event_date?.message}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="location" className="flex items-center gap-2">
								<MapPin className="h-4 w-4" />
								Location
							</Label>
							<Input
								id="location"
								placeholder="e.g. Army Stadium, Dhaka"
								{...register('location')}
								className={errors.location ? 'border-red-500' : ''}
							/>
							{errors.location && (
								<p className="text-sm text-red-500">
									{errors.location.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="description"
								className="flex items-center gap-2"
							>
								<FileText className="h-4 w-4" />
								Description
							</Label>
							<Textarea
								id="description"
								placeholder="Describe your event..."
								rows={4}
								{...register('description')}
								className={
									errors.description
										? 'border-red-500max-h-36'
										: 'max-h-36'
								}
							/>
							{errors.description && (
								<p className="text-sm text-red-500">
									{errors.description.message}
								</p>
							)}
						</div>
						{/* 
						<div className="flex flex-col md:flex-row justify-between">
							<div className="space-y-2">
								<Label
									htmlFor="organizer"
									className="flex items-center gap-2"
								>
									<User className="h-4 w-4" />
									Organizer Name
								</Label>
								<Input
									id="organizer"
									value={user?.name || ''}
									disabled
									className="bg-muted"
								/>
								<p className="text-xs text-muted-foreground">
									This will be automatically set to your name
								</p>
							</div>

							<div className="space-y-2">
								<Label className="flex items-center gap-2">
									<User className="h-4 w-4" />
									Attendee Count
								</Label>
								<Input value="0" disabled className="bg-muted" />
								<p className="text-xs text-muted-foreground">
									This will start at 0 and increase as people join your
									event
								</p>
							</div>
						</div> */}

						<div className="flex gap-4 pt-4">
							<Button type="submit" disabled={isLoading} className="flex-1">
								{isLoading ? 'Creating Event...' : 'Create Event'}
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => navigate(-1)}
								className="flex-1"
							>
								Cancel
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
