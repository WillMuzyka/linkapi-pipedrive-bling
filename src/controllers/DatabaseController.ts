import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import GetReportService from '../services/GetReportService';
import GetReportByDaysService from '../services/GetReportByDaysService';
import PostReportOnDBService from '../services/PostReportOnDBService';

class DatabaseController {
  // eslint-disable-next-line consistent-return
  public async index(_: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const getReport = container.resolve(GetReportService);
      const report = await getReport.execute();
      return res.json({ report });
    } catch (error) {
      next(new Error(
        error.message || 'Internal Server Error',
      ));
    }
  }

  // eslint-disable-next-line consistent-return
  public async getByDays(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const getReportByDays = container.resolve(GetReportByDaysService);
      const days = parseInt(req.params.days, 10);
      const report = await getReportByDays.execute(days);
      return res.json({ report });
    } catch (error) {
      next(new Error(
        error.message || 'Internal Server Error',
      ));
    }
  }

  // eslint-disable-next-line consistent-return
  public async post(_: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const postReportOnDB = container.resolve(PostReportOnDBService);
      const message = await postReportOnDB.execute();
      return res.json({ message });
    } catch (error) {
      next(new Error(
        error.message || 'Internal Server Error',
      ));
    }
  }
}

export default DatabaseController;
