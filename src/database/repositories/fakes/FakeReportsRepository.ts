import { isAfter } from 'date-fns';

import IReportsRepository from '../IReportsRepository';

import Report from '../../schemas/Report';

export default class FakeNotificationsRepository
implements IReportsRepository {
  private reports: Report[] = [];

  public async create(date: Date, sum: number): Promise<Report> {
    const report = new Report();

    Object.assign(report, {
      id: 1,
      date,
      sum,
    });

    this.reports.push(report);
    return report;
  }

  public async index(): Promise<Report[]> {
    return this.reports;
  }

  public async findByDaysAgo(daysAgo: number): Promise<Report[]> {
    const day = new Date();
    day.setDate(day.getDate() - daysAgo);
    day.setHours(0, 0, 0, 0);

    const reportsFiltered = this.reports.filter((report) => isAfter(new Date(report.date), day));
    return reportsFiltered;
  }

  public async update(report: Report): Promise<Report> {
    const reportIndex = this.reports.findIndex((findReport) => report.id === findReport.id);
    this.reports[reportIndex] = report;
    return this.reports[reportIndex];
  }
}
