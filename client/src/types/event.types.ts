import type { DBItem } from '@/types';
import type { Merge } from 'nhb-toolbox/utils/types';
import type { TSingleUser } from './user.types';

export interface IEventData {
	title: string;
	event_date: string;
	location: string;
	description: string;
}

export type IEvent = Merge<
	DBItem & IEventData,
	{ created_by: string; attendee_count: number; attendee: string[] }
>;

export type IEventDetails = Merge<Omit<IEvent, 'created_by'>, { created_by: TSingleUser }>;

export interface IEventResponse {
	total: number;
	current_page: number;
	total_pages: number;
	events: IEventDetails[];
}
