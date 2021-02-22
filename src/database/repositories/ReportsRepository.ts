import { getMongoRepository, MongoRepository } from 'typeorm';

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

  public async index(daysAgo: number): Promise<Report[]> {
    const day = new Date();
    day.setDate(day.getDate() - daysAgo);
    const reports = this.ormRepository.find();
    return reports;
  }
}
