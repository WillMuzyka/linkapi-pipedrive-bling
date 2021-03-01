import { getMongoRepository, MongoRepository } from 'typeorm';
import { isAfter } from 'date-fns';

import IReportsRepository from './IReportsRepository';

import Report from '../schemas/Report';

export default class ReportsRepository
implements IReportsRepository {
  private ormRepository: MongoRepository<Report>;

  constructor() {
    this.ormRepository = getMongoRepository(Report);
  }

  public async create(date: Date, sum: number): Promise<Report> {
    const report = this.ormRepository.create({
      date,
      sum,
    });
    await this.ormRepository.save(report);

    return report;
  }

  public async index(): Promise<Report[]> {
    const reports = this.ormRepository.find();
    return reports;
  }

  public async findByDaysAgo(daysAgo: number): Promise<Report[]> {
    const day = new Date();
    day.setDate(day.getDate() - daysAgo);
    day.setHours(0, 0, 0, 0);

    const reports = await this.ormRepository.find();

    const reportsFiltered = reports.filter((report) => isAfter(new Date(report.date), day));
    return reportsFiltered;
  }

  public async update(report: Report): Promise<Report> {
    return this.ormRepository.save(report);
  }
}
