import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { User } from '../user/user.model';
import { Event } from './event.model';
import type { IEvent, IEventQuery, IPopulatedEvent } from './event.types';
import { buildEventQuery } from './event.utils';

const createEventInDB = async (payload: IEvent, email: string | undefined) => {
	const user = await User.validateUser(email);

	payload.created_by = user._id;

	const newEvent = await Event.create(payload);

	return newEvent;
};

const getAllEventsFromDB = async (query: IEventQuery) => {
	const { eventQuery, limit, page } = buildEventQuery(query);

	const total = await Event.countDocuments(eventQuery.modelQuery.getFilter());

	eventQuery.paginate();

	const events = await eventQuery.modelQuery
		.populate<Pick<IPopulatedEvent, 'created_by'>>('created_by')
		.lean<Array<IPopulatedEvent>>();

	return {
		total,
		current_page: Number(page),
		total_pages: Math.ceil(total / Number(limit)),
		events,
	};
};

const getUserEventsFromDB = async (
	email: string | undefined,
	query: IEventQuery,
) => {
	const user = await User.validateUser(email);

	const { eventQuery, limit, page } = buildEventQuery(query, {
		created_by: user._id,
	});

	const total = await Event.countDocuments(eventQuery.modelQuery.getFilter());

	eventQuery.paginate();

	const events = await eventQuery.modelQuery;

	return {
		total,
		current_page: page,
		total_pages: Math.ceil(total / limit),
		events,
	};
};

const updateEventInDB = async (
	id: string,
	payload: Partial<IEvent>,
	email: string | undefined,
) => {
	const user = await User.validateUser(email);

	const previous = await Event.findById(id);

	if (!previous) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No event found!`,
			STATUS_CODES.NOT_FOUND,
			'update_event',
		);
	}

	if (!previous?.created_by.equals(user._id)) {
		throw new ErrorWithStatus(
			'Authorization Error',
			`You are not authorized to update the event!`,
			STATUS_CODES.UNAUTHORIZED,
			'update_event',
		);
	}

	const updateOptions = [
		{ _id: id },
		payload,
		{ new: true, rawResult: true },
	];

	const updatedEvent = await Event.findOneAndUpdate(...updateOptions);

	if (!updatedEvent) {
		throw new ErrorWithStatus(
			'Update Error',
			`Cannot update event with id: ${id}!`,
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'update_event',
		);
	}

	return updatedEvent;
};

const deleteEventInDB = async (id: string, email: string | undefined) => {
	const user = await User.validateUser(email);

	const previous = await Event.findById(id);

	if (!previous) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No event found!`,
			STATUS_CODES.NOT_FOUND,
			'delete_event',
		);
	}

	if (!previous?.created_by.equals(user._id)) {
		throw new ErrorWithStatus(
			'Authorization Error',
			`You are not authorized to delete the event!`,
			STATUS_CODES.UNAUTHORIZED,
			'delete_event',
		);
	}

	const result = await Event.deleteOne({ _id: id });

	if (!(result.deletedCount > 0)) {
		throw new ErrorWithStatus(
			'Delete Error',
			`Cannot delete event with id: ${id}!`,
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'delete_event',
		);
	}
};

export const eventServices = {
	getAllEventsFromDB,
	createEventInDB,
	getUserEventsFromDB,
	updateEventInDB,
	deleteEventInDB,
};
