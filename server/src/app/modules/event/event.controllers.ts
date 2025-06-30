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

const getAllEvents = catchAsync(async (req, res) => {
	const events = await eventServices.getAllEventsFromDB(req.query);

	sendResponse(res, 'Event', 'GET', events);
});

const getUserEvents = catchAsync(async (req, res) => {
	const events = await eventServices.getUserEventsFromDB(
		req?.user?.email,
		req.query,
	);

	sendResponse(res, 'Event', 'GET', events);
});

const updateEvent = catchAsync(async (req, res) => {
	const event = await eventServices.updateEventInDB(
		req.params.id,
		req.body,
		req?.user?.email,
	);

	sendResponse(res, 'Event', 'PATCH', event);
});

const incrementAttendeeCount = catchAsync(async (req, res) => {
	const event = await eventServices.incrementAttendeeCountInDB(
		req.params.id,
		req?.user?.email,
	);

	sendResponse(res, 'Event', 'PATCH', event, 'Successfully joined the event');
});

const deleteEvent = catchAsync(async (req, res) => {
	await eventServices.deleteEventInDB(req.params.id, req?.user?.email);

	sendResponse(res, 'Event', 'DELETE', null);
});

export const eventControllers = {
	getAllEvents,
	createEvent,
	getUserEvents,
	updateEvent,
	deleteEvent,
	incrementAttendeeCount,
};
