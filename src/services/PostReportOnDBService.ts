import { inject, injectable } from 'tsyringe';

import IReportsRepository from '../database/repositories/IReportsRepository';
import GetPipedriveWonDealsService from './GetPipedriveWonDealsService';

@injectable()
class PostReportOnDBService {
  constructor(
    @inject('ReportsRepository')
    private ReportsRepository: IReportsRepository,
  ) {}

  public async execute(): Promise<any> {
    const getPipedriveWonDeals = new GetPipedriveWonDealsService();
    const wonDeals = await getPipedriveWonDeals.execute();
    const sum = wonDeals.reduce((reduceSum, deal) => reduceSum + deal.pedido.sum, 0);
    const reports = await this.ReportsRepository.create(new Date(), sum);
    return reports;
  }
}

export default PostReportOnDBService;
