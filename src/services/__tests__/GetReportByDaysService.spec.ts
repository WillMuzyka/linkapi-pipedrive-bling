import 'reflect-metadata';

import FakeReportsRepository from '../../database/repositories/fakes/FakeReportsRepository';
import GetReportByDaysService from '../GetReportByDaysService';

let fakeReportsRepository: FakeReportsRepository;
let getReportByDays: GetReportByDaysService;

describe('GetPipedriveWonDeals', () => {
  beforeEach(() => {
    fakeReportsRepository = new FakeReportsRepository();
    getReportByDays = new GetReportByDaysService(fakeReportsRepository);
  });

  it('should be able to get a report from database', async () => {
    const report = await getReportByDays.execute(1);
    expect(report).toMatchObject([]);
  });
});
