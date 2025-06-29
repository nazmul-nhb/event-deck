import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { authControllers } from './auth.controllers';

const router = Router();

router.post(
	'/register',
	validateRequest(userValidations.registrationSchema),
	authControllers.registerUser,
);

router.post(
	'/login',
	validateRequest(userValidations.loginSchema),
	authControllers.loginUser,
);

export const authRoutes = router;
