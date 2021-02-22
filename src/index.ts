import 'dotenv/config';
import 'reflect-metadata';
import './container';
import './database';

import cors from 'cors';
import cron from 'node-cron';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';

import routes from './routes';
import UpdateDealsBlingService from './services/UpdateDealsBlingService';

const app = express();

cron.schedule('0 8-18 * * *', async () => {
  const updateDealsBling = new UpdateDealsBlingService();
  await updateDealsBling.execute();
});

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  console.error(err); //eslint-disable-line

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3333!');
});
