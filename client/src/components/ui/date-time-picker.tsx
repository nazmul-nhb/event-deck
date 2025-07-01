import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, type Control } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { chronos } from 'nhb-toolbox';
import type { Any } from 'nhb-toolbox/types';

interface DateTimePickerProps {
	name: string;
	control?: Control<Any, Any, Any>;
	defaultTime?: string;
	errorMessage?: string;
	className?: string;
}

export function DateTimePicker({
	name,
	control,
	defaultTime = '09:00',
	errorMessage,
	className = '',
}: DateTimePickerProps) {
	const [open, setOpen] = useState(false);
	const [calendarDate, setCalendarDate] = useState<Date | undefined>();
	const [timeValue, setTimeValue] = useState(defaultTime);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<div className={`flex gap-4 ${className}`}>
					{/* Date */}
					<div className="flex flex-col gap-2">
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									id={`${name}-date`}
									className="w-40 justify-between font-normal"
								>
									{calendarDate
										? chronos(calendarDate).format('DD-MM-YYYY')
										: 'Select date'}
									<ChevronDownIcon className="ml-2 h-4 w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto overflow-hidden p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={calendarDate}
									onSelect={(date) => {
										if (!date) return;
										setCalendarDate(date);
										setOpen(false);
										const [hh, mm] = timeValue.split(':');
										date.setHours(+hh);
										date.setMinutes(+mm);
										field.onChange(date.toISOString());
									}}
								/>
							</PopoverContent>
						</Popover>
					</div>

					{/* Time */}
					<div className="flex flex-col gap-2">
						<Input
							id={`${name}-time`}
							type="time"
							step="60"
							value={timeValue}
							onChange={(e) => {
								const newTime = e.target.value;
								setTimeValue(newTime);
								if (calendarDate) {
									const [hh, mm] = newTime.split(':');
									const d = new Date(calendarDate);
									d.setHours(+hh);
									d.setMinutes(+mm);
									field.onChange(d.toISOString());
								}
							}}
							className="w-32 bg-background appearance-none"
						/>
					</div>

					{/* Error */}
					{errorMessage && (
						<p className="text-sm text-red-500 col-span-2 w-full">
							{errorMessage}
						</p>
					)}
				</div>
			)}
		/>
	);
}
