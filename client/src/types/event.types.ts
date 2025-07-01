import type { DBItem } from '@/types';
import type { Merge } from 'nhb-toolbox/utils/types';
import type { TSingleUser } from './user.types';
import type { z } from 'zod';
import type { eventSchema } from '@/schema';

export type TEventData = z.infer<typeof eventSchema>;

export type IEvent = Merge<
	DBItem & TEventData,
	{ created_by: string; attendee_count: number; attendee: string[] }
>;

export type IEventDetails = Merge<Omit<IEvent, 'created_by'>, { created_by: TSingleUser }>;

export interface IEventResponse {
	total: number;
	current_page: number;
	total_pages: number;
	events: IEventDetails[];
}
