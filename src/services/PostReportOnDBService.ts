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
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const todayReport = await this.ReportsRepository.findByDaysAgo(1);
    if (todayReport[0]) {
      const updatedReport = await this.ReportsRepository.update({
        ...todayReport[0],
        sum,
      });
      return updatedReport;
    }

    const reports = await this.ReportsRepository.create(date, sum);
    return reports;
  }
}

export default PostReportOnDBService;
