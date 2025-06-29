import { chronos, sanitizeData } from 'nhb-toolbox';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { QueryBuilder } from '../../classes/QueryBuilder';
import { STATUS_CODES } from '../../constants';
import { User } from '../user/user.model';
import { Event } from './event.model';
import type { IEvent, IPopulatedEvent } from './event.types';

const createEventInDB = async (payload: IEvent, email: string | undefined) => {
	const user = await User.validateUser(email);

	payload.created_by = user._id;

	const newEvent = await Event.create(payload);

	return newEvent;
};

const getAllEventsFromDB = async (query?: Record<string, unknown>) => {
	const {
		page = 1,
		limit = 10,
		to,
		from,
		fixed_date,
	} = query as Partial<{
		page: number | string;
		limit: number | string;
		fixed_date: string;
		to: string;
		from: string;
	}>;

	const parsedFrom = from ? new Date(from) : undefined;
	const parsedTo = to ? new Date(to) : undefined;
	const parsedFixed = fixed_date ? new Date(fixed_date) : undefined;

	const hasFrom = Boolean(parsedFrom);
	const hasTo = Boolean(parsedTo);
	const hasFixed = Boolean(parsedFixed);

	let gteDate: Date | undefined;
	let lteDate: Date | undefined;

	if (hasFrom) gteDate = parsedFrom;
	if (hasTo) lteDate = parsedTo;

	if (!hasFrom && !hasTo && hasFixed) {
		gteDate = chronos(fixed_date!).startOf('day').toDate();
		lteDate = chronos(fixed_date!).endOf('day').toDate();
	}

	const dateFilter =
		gteDate || lteDate ?
			{
				event_date: {
					...(gteDate && { $gte: gteDate }),
					...(lteDate && { $lte: lteDate }),
				},
			}
		:	{};

	const eventQuery = new QueryBuilder(
		Event.find(
			sanitizeData(dateFilter, { ignoreFalsy: true, ignoreEmpty: true }),
		),
		query?.sort_by ? query : { ...query, sort_by: 'event_date' },
	)
		.search(['title'])
		.filter()
		.sort();

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

const getUserEventsFromDB = async (email: string | undefined) => {
	const user = await User.validateUser(email);

	const userEvents = await Event.find({ created_by: user._id }).sort({
		event_date: -1,
	});

	return userEvents;
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
