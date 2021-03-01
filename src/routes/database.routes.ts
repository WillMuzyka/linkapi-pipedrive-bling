import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import DatabaseController from '../controllers/DatabaseController';

const router = Router();
const databaseController = new DatabaseController();

router.get(
  '/all',
  databaseController.index,
);

router.get(
  '/:days',
  celebrate({
    [Segments.PARAMS]: {
      days: Joi.number().required(),
    },
  }),
  databaseController.getByDays,
);

router.post(
  '/',
  databaseController.post,
);

export default router;
