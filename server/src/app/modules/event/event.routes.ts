import { Router } from 'express';
import authorizeUser from '../../middlewares/authorizeUser';
import validateRequest from '../../middlewares/validateRequest';
import { eventControllers } from './event.controllers';
import { eventValidations } from './event.validation';

const router = Router();

router.post(
	'/',
	authorizeUser(),
	validateRequest(eventValidations.creationSchema),
	eventControllers.createEvent,
);

router.get('/', authorizeUser(), eventControllers.getAllEvents);

router.patch('/:id', authorizeUser(), eventControllers.updateEvent);

router.patch(
	'/join/:id',
	authorizeUser(),
	eventControllers.incrementAttendeeCount,
);

router.delete('/:id', authorizeUser(), eventControllers.deleteEvent);

router.get('/user', authorizeUser(), eventControllers.getUserEvents);

export const eventRoutes = router;
