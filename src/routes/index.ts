import { Router } from 'express';
import DealsController from '../controllers/DealsController';
import DatabaseController from '../controllers/DatabaseController';

const router = Router();
const dealsController = new DealsController();
const databaseController = new DatabaseController();

router.get(
  '/all',
  databaseController.index,
);

router.post(
  '/database',
  databaseController.post,
);

router.get(
  '/deals',
  dealsController.index,
);

router.put(
  '/bling',
  dealsController.put,
);

export default router;
