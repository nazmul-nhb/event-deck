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
import { chronos, debounceAction, type Chronos } from 'nhb-toolbox';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useQueryParams from './useQueryParams';

const now = chronos();

const getDate = (date: Chronos) => date.format('YYYY-MM-DD');

export const useEventFilters = () => {
	const [open, setOpen] = useState(false);
	const { setQueryParams, getQueryParam } = useQueryParams();
	const [searchQuery, setSearchQuery] = useState(getQueryParam('search') ?? '');
	const [searchInput, setSearchInput] = useState(getQueryParam('search') ?? '');
	const [filterType, setFilterType] = useState('');
	const [selectedDate, setSelectedDate] = useState<Date>();

	const debouncedSearch = useMemo(
		() =>
			debounceAction((value: string) => {
				setSearchQuery(value);
				setQueryParams({ search: value });
			}, 500),
		[setQueryParams]
	);

	const handleSearch = useCallback(
		(value: string) => {
			setSearchInput(value);
			debouncedSearch(value);
		},
		[debouncedSearch]
	);

	const clearSearch = useCallback(() => {
		setSearchInput('');
		setSearchQuery('');
		setQueryParams({ search: '' });
	}, [setQueryParams]);

	const clearDate = useCallback(() => {
		setSelectedDate(undefined);
	}, []);

	const clearType = useCallback(() => {
		setFilterType('all');
	}, []);

	// Memoized filter object with stable reference
	const filterObject = useMemo(() => {
		const result: IQueryParams<IEvent> = {};

		if (filterType !== 'all') {
			if (selectedDate !== undefined) {
				setSelectedDate(undefined);
			}

			switch (filterType) {
				case 'today':
					result.event_date = getDate(now);
					break;
				case 'current-week':
					result.from = getDate(now.startOf('week'));
					result.to = getDate(now.endOf('week'));
					break;
				case 'last-week':
					result.from = getDate(now.subtract(1, 'week').startOf('week'));
					result.to = getDate(now.subtract(1, 'week').endOf('week'));
					break;
				case 'current-month':
					result.from = getDate(now.startOf('month'));
					result.to = getDate(now.endOf('month'));
					break;
				case 'last-month':
					result.from = getDate(now.subtract(1, 'month').startOf('month'));
					result.to = getDate(now.subtract(1, 'month').endOf('month'));
					break;
			}
		} else if (selectedDate) {
			result.fixed_date = getDate(chronos(selectedDate));
		}

		if (searchQuery) {
			result.search = searchQuery;
		}

		return result;
	}, [filterType, selectedDate, searchQuery]);

	const EventFilters = () => {
		const inputRef = useRef<HTMLInputElement>(null);

		useEffect(() => {
			if (inputRef.current && searchInput) {
				inputRef.current.focus();
			}
		}, []);

		return (
			<div className="flex flex-col sm:flex-row gap-4 mb-8">
				{/* Search Input */}
				<div className="relative flex-1 w-full md:max-w-96">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						ref={inputRef}
						placeholder="Search events by title..."
						value={searchInput}
						onChange={(e) => handleSearch(e.target.value?.trim())}
						className="pl-10 pr-10 w-full"
						// key={searchInput}
					/>
					{searchInput && (
						<Button
							size="icon"
							variant="ghost"
							className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
							onClick={clearSearch}
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>

				{/* Date Picker */}
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
						<PopoverContent
							className="w-auto overflow-hidden p-0"
							align="start"
						>
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
							onClick={clearDate}
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>

				{/* Filter Select */}
				<div className="w-full md:w-60 text-left">
					<div className="relative">
						<Select
							value={filterType}
							onValueChange={(val) => {
								setFilterType(val);
								if (val !== 'all') {
									setSelectedDate(undefined); // ✅ This avoids the render loop + focus bug
								}
							}}
						>
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
						{filterType !== 'all' && (
							<Button
								size="icon"
								variant="ghost"
								className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 p-0 text-muted-foreground"
								onClick={clearType}
								tabIndex={-1}
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>
			</div>
		);
	};

	return { filterObject, EventFilters };
};
