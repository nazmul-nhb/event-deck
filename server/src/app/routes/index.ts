import { Router } from 'express';
import type { IRoute } from '../types/interfaces';

const router = Router();

const routes: IRoute[] = [];

routes.forEach((item) => router.use(item.path, item.route));

export default router;
