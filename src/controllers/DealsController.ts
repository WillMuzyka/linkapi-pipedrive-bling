import { Request, Response, NextFunction } from 'express';
import UpdateDealsBlingService from '../services/UpdateDealsBlingService';
import GetPipedriveWonDealsService from '../services/GetPipedriveWonDealsService';

class DealsController {
  // eslint-disable-next-line consistent-return
  public async index(_: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const getPipedriveWonDeals = new GetPipedriveWonDealsService();
      const message = await getPipedriveWonDeals.execute();
      return res.json(message);
    } catch (error) {
      next(new Error(
        error.message || 'Internal Server Error',
      ));
    }
  }

  // eslint-disable-next-line consistent-return
  public async put(_: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const updateDealsBling = new UpdateDealsBlingService();
      const message = await updateDealsBling.execute();
      return res.json(message);
    } catch (error) {
      next(new Error(
        error.message || 'Internal Server Error',
      ));
    }
  }
}

export default DealsController;
