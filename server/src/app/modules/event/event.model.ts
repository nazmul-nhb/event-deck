import { Schema, model } from 'mongoose';
import type { IEventDoc } from './event.types';

const eventSchema = new Schema<IEventDoc>(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		event_date: {
			type: Date,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		attendee_count: {
			type: Number,
			default: 0,
			required: false,
		},
		created_by: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		attendee: {
			type: [Schema.ObjectId],
			ref: 'User',
			default: [],
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		versionKey: false,
	},
);

export const Event = model<IEventDoc>('Event', eventSchema);
