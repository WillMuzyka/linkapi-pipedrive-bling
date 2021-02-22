import { container } from 'tsyringe';

import IReportsRepository from '../database/repositories/IReportsRepository';
import ReportsRepository from '../database/repositories/ReportsRepository';

container.registerSingleton<IReportsRepository>(
  'ReportsRepository',
  ReportsRepository,
);
