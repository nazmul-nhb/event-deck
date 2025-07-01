import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { IQueryParams } from '@/types';
import type { IEvent } from '@/types/event.types';
import { CalendarSearch, ChevronDownIcon, Filter, Search, X } from 'lucide-react';
import { chronos, type Chronos } from 'nhb-toolbox';
import { useMemo, useState } from 'react';

const getDate = (date: Chronos) => date.format('YYYY-MM-DD');

export const useUseEventFilters = () => {
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState('');
	const [selectedDate, setSelectedDate] = useState<Date>();

	const filterObject = useMemo(() => {
		const now = chronos();
		const obj: IQueryParams<IEvent> = searchTerm?.trim()
			? { search: searchTerm?.trim() }
			: {};

		if (filterType !== 'all') {
			setSelectedDate(undefined);
			switch (filterType) {
				case 'today':
					return { ...obj, event_date: getDate(now) };
				case 'current-week':
					return {
						...obj,
						from: getDate(now.startOf('week')),
						to: getDate(now.endOf('week')),
					};
				case 'last-week':
					return {
						...obj,
						from: getDate(now.subtract(1, 'week').startOf('week')),
						to: getDate(now.subtract(1, 'week').endOf('week')),
					};
				case 'current-month':
					return {
						...obj,
						from: getDate(now.startOf('month')),
						to: getDate(now.endOf('month')),
					};
				case 'last-month':
					return {
						...obj,
						from: getDate(now.subtract(1, 'month').startOf('month')),
						to: getDate(now.subtract(1, 'month').endOf('month')),
					};
				default:
					return obj;
			}
		}

		return selectedDate ? { ...obj, fixed_date: getDate(chronos(selectedDate)) } : obj;
	}, [filterType, searchTerm, selectedDate]);

	const EventFilters = () => (
		<div className="flex flex-col sm:flex-row  gap-4 mb-8">
			{/* 🔍 Search input with clear */}
			<div className="relative flex-1 w-full md:max-w-96">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search events by title..."
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
					className="pl-10 pr-10 w-full md:w-96"
				/>
				{searchTerm && (
					<Button
						size="icon"
						variant="ghost"
						className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
						onClick={() => setSearchTerm('')}
					>
						<X className="h-4 w-4" />
					</Button>
				)}
			</div>

			{/* 📅 Date picker with clear */}
			<div className="relative">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={cn(
								'w-full md:w-64 justify-between font-normal pr-10',
								selectedDate && 'text-foreground'
							)}
						>
							<div className="flex justify-start items-center gap-2">
								<CalendarSearch />
								{selectedDate
									? chronos(selectedDate).format('DD-MM-YYYY')
									: 'Find events on specific date'}
							</div>
							<ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={(date) => {
								if (!date) return;
								setSelectedDate(date);
								setFilterType('all');
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
				{selectedDate && (
					<Button
						size="icon"
						variant="ghost"
						className="absolute right-8 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
						onClick={() => setSelectedDate(undefined)}
					>
						<X className="h-4 w-4" />
					</Button>
				)}
			</div>

			{/* 📊 Filter select with clear */}
			<div className="w-full md:w-60 text-left">
				<div className="relative">
					<Select value={filterType} onValueChange={setFilterType}>
						<SelectTrigger className="w-full pr-10 cursor-pointer">
							<Filter className="mr-2 h-4 w-4 shrink-0" />
							<SelectValue placeholder="Filter by Range" />
						</SelectTrigger>
						<SelectContent>
							{[
								['all', 'All Events'],
								['today', 'Today'],
								['current-week', 'Current Week'],
								['last-week', 'Last Week'],
								['current-month', 'Current Month'],
								['last-month', 'Last Month'],
							].map(([value, label]) => (
								<SelectItem
									key={value}
									value={value}
									className="cursor-pointer items-start justify-start! text-left"
								>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* X clear button */}
					{filterType !== 'all' && (
						<Button
							size="icon"
							variant="ghost"
							className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 p-0 text-muted-foreground"
							onClick={() => setFilterType('all')}
							tabIndex={-1}
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);

	return { filterObject, EventFilters };
};
