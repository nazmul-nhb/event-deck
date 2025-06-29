import type { Document, Types } from 'mongoose';
import type { IUserDoc } from '../user/user.types';

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
