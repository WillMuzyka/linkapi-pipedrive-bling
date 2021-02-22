import 'reflect-metadata';

import FakeReportsRepository from '../../database/repositories/fakes/FakeReportsRepository';
import GetReportService from '../GetReportService';

let fakeReportsRepository: FakeReportsRepository;
let getReport: GetReportService;

describe('GetPipedriveWonDeals', () => {
  beforeEach(() => {
    fakeReportsRepository = new FakeReportsRepository();
    getReport = new GetReportService(fakeReportsRepository);
  });

  it('should be able to get a report from database', async () => {
    const report = await getReport.execute();
    expect(report).toMatchObject([]);
  });
});
