import { Router } from 'express';
import DealsController from '../controllers/DealsController';
import databaseRoutes from './database.routes';

const router = Router();
const dealsController = new DealsController();

router.use('/database', databaseRoutes);

router.get(
  '/deals',
  dealsController.index,
);

router.put(
  '/bling',
  dealsController.put,
);

export default router;
