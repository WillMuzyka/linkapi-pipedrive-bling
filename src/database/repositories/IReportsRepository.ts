import Report from '../schemas/Report';

export default interface IReportRepository {
  create(date: Date, sum: number): Promise<Report>;
  index(daysAgo: number): Promise<Report[]>;
};
