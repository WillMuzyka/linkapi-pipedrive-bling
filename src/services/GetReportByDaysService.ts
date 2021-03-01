import { inject, injectable } from 'tsyringe';

import IReportsRepository from '../database/repositories/IReportsRepository';

@injectable()
class GetReportByDaysService {
  constructor(
    @inject('ReportsRepository')
    private ReportsRepository: IReportsRepository,
  ) {}

  public async execute(days: number): Promise<any> {
    const reports = await this.ReportsRepository.findByDaysAgo(days);
    return reports;
  }
}

export default GetReportByDaysService;
