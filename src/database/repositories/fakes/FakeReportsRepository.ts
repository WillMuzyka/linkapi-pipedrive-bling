import { ObjectID } from 'mongodb';

import IReportsRepository from '../IReportsRepository';

import Report from '../../schemas/Report';

export default class FakeNotificationsRepository
implements IReportsRepository {
  private reports: Report[] = [];

  public async create(date: Date, sum: number): Promise<Report> {
    const report = new Report();

    Object.assign(report, {
      id: new ObjectID(),
      date,
      sum,
    });

    return report;
  }

  public async index(_: number): Promise<Report[]> {
    return this.reports;
  }
}
