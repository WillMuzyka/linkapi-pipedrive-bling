import axios from 'axios';
import { isToday } from '../utils';

interface IDealInfo {
  id: number;
  person_id: {
    name: string;
    email: {
      value: string;
    };
    phone: {
      value: string;
    };
  }
  won_time: string;
  value: number;
}

interface IProductInfo {
  item_price: number;
  quantity: number;
  name: string;
  product: {
    code: string;
  }
}

interface IPipedriveWonDeals {
  pedido: {
    numero: number;
    cliente: {
      nome: string;
      email: string;
      fone: string;
    };
    itens: {
      item: {
        descricao: string;
        codigo: string;
        qtde: number;
        vlr_unit: number;
      }
    }[],
    sum: number,
  },
}

class GetPipedriveWonDeals {
  private baseUrl = 'https://nocompany.pipedrive.com/api/v1/deals';

  private params = {
    params: {
      api_token: process.env.PIPEDRIVE_API_TOKEN,
      status: 'won',
      include_product_data: 1,
    },
  };

  public async execute(): Promise<IPipedriveWonDeals[]> {
    const response = await axios.get(this.baseUrl, this.params);
    const dealsData: IDealInfo[] = response.data.data;
    const todayDealsData = this.filterOutOldDeals(dealsData);
    const formattedData = await Promise.all(todayDealsData.map(async (deal) => {
      const relevantProductData = await this.getProductsDetails(deal.id);
      return {
        pedido: {
          numero: deal.id,
          cliente: {
            nome: deal.person_id.name,
            email: deal.person_id.email.value,
            fone: deal.person_id.phone.value,
          },
          itens: relevantProductData,
          sum: deal.value,
        },
      };
    }));

    return formattedData;
  }

  private async getProductsDetails(dealId: number) {
    const response = await axios.get(`${this.baseUrl}/${dealId}/products`, this.params);
    const productsData: IProductInfo[] = response.data.data;
    const relevantProductData = productsData?.map((dealProduct) => ({
      item: {
        descricao: dealProduct.name,
        codigo: dealProduct.product.code,
        qtde: dealProduct.quantity,
        vlr_unit: dealProduct.item_price,
      },
    }));
    return relevantProductData;
  }

  private filterOutOldDeals(deals: IDealInfo[]) {
    return deals.filter((deal) => isToday(new Date(`${deal.won_time}Z`)));
  }
}

export default GetPipedriveWonDeals;
