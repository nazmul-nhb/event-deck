import { QueryBuilder } from '../../classes/QueryBuilder';
import { User } from '../user/user.model';
import { Event } from './event.model';
import type { IEvent } from './event.types';

const createEventInDB = async (payload: IEvent, email: string | undefined) => {
	const user = await User.validateUser(email);

	payload.created_by = user._id;

	const newEvent = await Event.create(payload);

	return newEvent;
};

const getAllEventsFromDB = async (query?: Record<string, unknown>) => {
	const eventQuery = new QueryBuilder(Event.find(), query).sort();

	const events = await eventQuery.modelQuery;

	return events;
};

export const eventServices = { getAllEventsFromDB, createEventInDB };
