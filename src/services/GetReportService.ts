import { inject, injectable } from 'tsyringe';

import IReportsRepository from '../database/repositories/IReportsRepository';

@injectable()
class GetReportService {
  constructor(
    @inject('ReportsRepository')
    private ReportsRepository: IReportsRepository,
  ) {}

  public async execute(): Promise<any> {
    const reports = await this.ReportsRepository.index(1);
    return reports;
  }
}

export default GetReportService;
