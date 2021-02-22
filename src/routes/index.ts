import { Router } from 'express';
import DealsController from '../controllers/DealsController';

const router = Router();
const dealsController = new DealsController();

router.put(
  '/bling',
  dealsController.put,
);

export default router;
