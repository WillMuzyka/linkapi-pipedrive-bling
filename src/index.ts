import cors from 'cors';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', (_, res) => (res.json({ message: 'Server ok' })));

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
