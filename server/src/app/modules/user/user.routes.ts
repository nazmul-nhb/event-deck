import { Router } from 'express';
import { userControllers } from './user.controllers';
import authorizeUser from '../../middlewares/authorizeUser';

const router = Router();

router.get('/profile', authorizeUser(), userControllers.getCurrentUser);

export const userRoutes = router;
