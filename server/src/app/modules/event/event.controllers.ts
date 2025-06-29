import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { eventServices } from './event.services';

const createEvent = catchAsync(async (req, res) => {
	const event = await eventServices.createEventInDB(
		req.body,
		req?.user?.email,
	);

	sendResponse(res, 'Event', 'POST', event);
});

const getAllEvents = catchAsync(async (_req, res) => {
	const events = await eventServices.getAllEventsFromDB();

	sendResponse(res, 'Event', 'GET', events);
});

export const eventControllers = { getAllEvents, createEvent };
