import { useUpdateEventMutation } from '@/app/api/eventApi';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { eventSchema } from '@/schema';
import type { IEvent, TEventData } from '@/types/event.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { chronos } from 'nhb-toolbox';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
	event: IEvent;
}

export default function UpdateEventModal({ event }: Props) {
	const [open, setOpen] = useState(false);
	const [updateEvent, { isLoading }] = useUpdateEventMutation();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Partial<TEventData>>({
		resolver: zodResolver(eventSchema.partial()),
		defaultValues: {
			title: event.title,
			location: event.location,
			description: event.description,
			event_date: event.event_date,
		},
	});

	const onSubmit = async (data: Partial<TEventData>) => {
		try {
			await updateEvent({ id: event._id, data }).unwrap();
			setOpen(false);
		} catch (error) {
			console.error('Update failed:', error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="flex-1">
					<Edit className="mr-2 h-4 w-4" />
					Update
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Update Event</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							{...register('title')}
							className={errors.title ? 'border-red-500' : ''}
						/>
						{errors.title && (
							<p className="text-sm text-red-500">{errors.title.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="event_date">Date & Time</Label>
						<DateTimePicker
							defaultDate={new Date(event.event_date)}
							defaultTime={chronos(event.event_date).format('HH:mm')}
							name="event_date"
							control={control}
							errorMessage={errors.event_date?.message}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="location">Location</Label>
						<Input
							id="location"
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
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							{...register('description')}
							rows={4}
							className={errors.description ? 'border-red-500' : ''}
						/>
						{errors.description && (
							<p className="text-sm text-red-500">
								{errors.description.message}
							</p>
						)}
					</div>

					<DialogFooter className="flex gap-4 pt-2">
						<Button type="submit" disabled={isLoading}>
							{isLoading ? 'Updating...' : 'Update Event'}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
