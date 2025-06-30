import type { Document, Types } from 'mongoose';
import type { Numeric } from 'nhb-toolbox/types';
import type { IUserDoc } from '../user/user.types';
import type { GenericObject } from 'nhb-toolbox/object/types';

export interface IEvent {
	title: string;
	event_date: Date;
	location: string;
	description: string;
	attendee_count: number;
	created_by: Types.ObjectId;
}

export interface IEventDoc extends IEvent, Document {
	_id: Types.ObjectId;
	created_at: string;
	updated_at: string;
}

export interface IPopulatedEvent extends Omit<IEventDoc, 'created_by'> {
	created_by: Omit<IUserDoc, 'password'>;
}

export interface IEventQuery extends GenericObject {
	page?: Numeric;
	limit?: Numeric;
	fixed_date?: string;
	to?: string;
	from?: string;
}
