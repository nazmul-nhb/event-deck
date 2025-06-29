import { chronos, sanitizeData } from 'nhb-toolbox';
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

	const events = await eventQuery.modelQuery;

	return {
		total,
		current_page: Number(page),
		total_pages: Math.ceil(total / Number(limit)),
		events,
	};
};

export const eventServices = { getAllEventsFromDB, createEventInDB };
