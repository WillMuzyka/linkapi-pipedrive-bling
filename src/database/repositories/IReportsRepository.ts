import Report from '../schemas/Report';

export default interface IReportRepository {
  create(date: Date, sum: number): Promise<Report>;
  index(): Promise<Report[]>;
  findByDaysAgo(daysAgo: number): Promise<Report[]>;
  update(report: Report): Promise<Report>;
};
