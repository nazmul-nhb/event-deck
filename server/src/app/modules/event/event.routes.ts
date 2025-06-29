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

export const eventRoutes = router;
