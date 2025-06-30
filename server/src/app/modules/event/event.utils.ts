import { chronos, sanitizeData } from 'nhb-toolbox';
import { QueryBuilder } from '../../classes/QueryBuilder';
import { Event } from './event.model';
import type { IEventQuery } from './event.types';
import type { GenericObject } from 'nhb-toolbox/object/types';

export function buildEventQuery(
	query: IEventQuery,
	baseFilter: GenericObject = {},
) {
	const { page = 1, limit = 10, to, from, fixed_date } = query ?? {};

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

	const mergedFilter = {
		...sanitizeData(dateFilter, {
			ignoreFalsy: true,
			ignoreEmpty: true,
		}),
		...baseFilter,
	};

	const eventQuery = new QueryBuilder(
		Event.find(mergedFilter),
		query?.sort_by ? query : { ...query, sort_by: 'event_date' },
	)
		.search(['title'])
		.filter()
		.sort();

	return { eventQuery, page: Number(page), limit: Number(limit) };
}
