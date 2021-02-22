import axios from 'axios';
import qs from 'qs';
import convert from 'xml-js';
import GetPipedriveWonDealsService from './GetPipedriveWonDealsService';
import { formattedTodayDate } from '../utils';

interface IBlingDealsResponse {
  data: {
    retorno: {
      pedidos: {
        pedido: {
          numero: string,
        }
      }[]
    }
  }
}

class UpdateDealsBlingService {
  private baseUrl = (method: string) => `https://bling.com.br/Api/v2/${method}/json`;

  private config = {
    params: {
      apikey: process.env.BLING_API_TOKEN,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  private converterOptions = {
    compact: true,
    ignoreComment: true,
    spaces: 2,
  }

  public async execute(): Promise<any> {
    const newDeals = await this.getDealsNotOnBlingYet();
    if (newDeals.length === 0) return { message: 'Nothing to be updated' };

    const response = [];

    await Promise.all(newDeals.map(async (deal) => {
      const dealOnXML = convert.json2xml(JSON.stringify(deal), this.converterOptions);

      const resp = await axios.post(
        this.baseUrl('pedido'),
        qs.stringify({ xml: `<?xml version="1.0" encoding="UTF-8"?>\n${dealOnXML}` }),
        this.config,
      );

      response.push(resp.data);
    }));

    return response;
  }

  private async getDealsNotOnBlingYet() {
    // Get deals on pipedrive
    const getPipedriveWonDeals = new GetPipedriveWonDealsService();
    const wonDeals = await getPipedriveWonDeals.execute();
    // Get bling already registered deals
    const blingResponse: IBlingDealsResponse = await axios.get(
      this.baseUrl('pedidos'),
      {
        params: {
          ...this.config.params,
          filters: `dataEmissao[${formattedTodayDate()} TO ${formattedTodayDate()}]`,
        },
      },
    );
    const blingDeals = blingResponse.data.retorno?.pedidos || [];

    // Filter Pipedrive won Deals that are not on Bling yet
    const newDeals = wonDeals.filter((wonDeal) => {
      const duplicated = blingDeals.find(
        (blingDeal) => wonDeal.pedido.numero === parseInt(blingDeal.pedido.numero, 10),
      );
      return !duplicated;
    });

    return newDeals;
  }
}

export default UpdateDealsBlingService;
