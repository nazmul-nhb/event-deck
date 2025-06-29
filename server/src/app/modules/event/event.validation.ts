import { z } from 'zod';

const IsoZonedDate = z
	.string()
	.trim()
	.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[+-]\d{2}:\d{2})$/, {
		message: 'Invalid ISO date format with timezone!',
	});

const creationSchema = z
	.object({
		title: z.string(),
		event_date: IsoZonedDate,
		location: z.string(),
		description: z.string(),
		attendee_count: z.number().default(0).optional(),
	})
	.strict();

export const eventValidations = { creationSchema };
